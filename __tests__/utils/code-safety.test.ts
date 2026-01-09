/**
 * Unit tests for lib/utils/code-safety.ts
 * Tests code safety analysis utilities for detecting dangerous patterns
 */

import {
  analyzeCodeSafety,
  hasBrowserAPIs,
  sanitizeErrorMessage,
  SafetyAnalysisResult,
} from '../../lib/utils/code-safety';

describe('code-safety utilities', () => {
  describe('analyzeCodeSafety', () => {
    describe('safe code detection', () => {
      it('should return safe for harmless code', () => {
        const result = analyzeCodeSafety('const x = 1 + 2;');
        expect(result.safe).toBe(true);
        expect(result.issues).toHaveLength(0);
        expect(result.warnings).toHaveLength(0);
      });

      it('should return safe for empty string', () => {
        const result = analyzeCodeSafety('');
        expect(result.safe).toBe(true);
        expect(result.issues).toHaveLength(0);
        expect(result.warnings).toHaveLength(0);
      });

      it('should return safe for complex but safe code', () => {
        const code = `
          function fibonacci(n) {
            if (n <= 1) return n;
            return fibonacci(n - 1) + fibonacci(n - 2);
          }
          const result = fibonacci(10);
        `;
        const result = analyzeCodeSafety(code);
        expect(result.safe).toBe(true);
      });

      it('should return safe for code with class definitions', () => {
        const code = `
          class Calculator {
            add(a, b) { return a + b; }
            subtract(a, b) { return a - b; }
          }
        `;
        const result = analyzeCodeSafety(code);
        expect(result.safe).toBe(true);
      });
    });

    describe('eval detection (security issue)', () => {
      it('should detect eval() usage', () => {
        const result = analyzeCodeSafety('eval("console.log(1)")');
        expect(result.safe).toBe(false);
        expect(result.issues).toContain('Use of eval() detected - this is a security risk');
      });

      it('should detect eval with whitespace', () => {
        const result = analyzeCodeSafety('eval  ("code")');
        expect(result.safe).toBe(false);
        expect(result.issues).toContain('Use of eval() detected - this is a security risk');
      });

      it('should detect eval in multiline code', () => {
        const code = `
          const x = 1;
          eval(userInput);
          const y = 2;
        `;
        const result = analyzeCodeSafety(code);
        expect(result.safe).toBe(false);
        expect(result.issues).toContain('Use of eval() detected - this is a security risk');
      });

      it('should not flag "evaluation" or similar words', () => {
        const result = analyzeCodeSafety('const evaluation = "good";');
        expect(result.safe).toBe(true);
        expect(result.issues).not.toContain('Use of eval() detected - this is a security risk');
      });
    });

    describe('Function constructor detection (security issue)', () => {
      it('should detect Function constructor', () => {
        const result = analyzeCodeSafety('new Function("return 1")');
        expect(result.safe).toBe(false);
        expect(result.issues).toContain('Use of Function constructor detected - this is a security risk');
      });

      it('should detect Function constructor without new', () => {
        const result = analyzeCodeSafety('Function("return x")');
        expect(result.safe).toBe(false);
        expect(result.issues).toContain('Use of Function constructor detected - this is a security risk');
      });

      it('should detect Function with whitespace', () => {
        const result = analyzeCodeSafety('Function  ("code")');
        expect(result.safe).toBe(false);
      });
    });

    describe('__proto__ detection (security issue)', () => {
      it('should detect __proto__ usage', () => {
        const result = analyzeCodeSafety('obj.__proto__ = {}');
        expect(result.safe).toBe(false);
        expect(result.issues).toContain('__proto__ usage detected - this is a security risk');
      });

      it('should detect __proto__ in object literal', () => {
        const result = analyzeCodeSafety('const obj = { __proto__: null };');
        expect(result.safe).toBe(false);
        expect(result.issues).toContain('__proto__ usage detected - this is a security risk');
      });

      it('should detect __proto__ access', () => {
        const result = analyzeCodeSafety('const proto = obj.__proto__;');
        expect(result.safe).toBe(false);
      });
    });

    describe('innerHTML detection (warning)', () => {
      it('should warn about innerHTML assignment', () => {
        const result = analyzeCodeSafety('element.innerHTML = "<div>content</div>"');
        expect(result.safe).toBe(true); // warning, not issue
        expect(result.warnings).toContain('innerHTML usage detected - be careful with user input');
      });

      it('should warn about innerHTML with complex assignment', () => {
        const result = analyzeCodeSafety('document.getElementById("id").innerHTML = userContent');
        expect(result.warnings).toContain('innerHTML usage detected - be careful with user input');
      });

      it('should not warn about innerHTML reading', () => {
        const result = analyzeCodeSafety('const content = element.innerHTML;');
        expect(result.warnings).not.toContain('innerHTML usage detected - be careful with user input');
      });
    });

    describe('document.write detection (warning)', () => {
      it('should warn about document.write', () => {
        const result = analyzeCodeSafety('document.write("<p>Hello</p>")');
        expect(result.safe).toBe(true);
        expect(result.warnings).toContain('document.write() detected - this can cause issues');
      });

      it('should warn about document.writeln', () => {
        const result = analyzeCodeSafety('document.writeln("text")');
        expect(result.warnings).toContain('document.write() detected - this can cause issues');
      });
    });

    describe('window.location detection (warning)', () => {
      it('should warn about window.location assignment', () => {
        const result = analyzeCodeSafety('window.location = "http://evil.com"');
        expect(result.safe).toBe(true);
        expect(result.warnings).toContain('window.location modification detected');
      });

      it('should warn about window.location.href', () => {
        const result = analyzeCodeSafety('window.location.href = url');
        expect(result.warnings).toContain('window.location modification detected');
      });

      it('should warn about window.location.replace', () => {
        const result = analyzeCodeSafety('window.location.replace(url)');
        expect(result.warnings).toContain('window.location modification detected');
      });
    });

    describe('constructor bracket access detection (warning)', () => {
      it('should warn about constructor["property"] access', () => {
        const result = analyzeCodeSafety('obj.constructor["prototype"]');
        expect(result.safe).toBe(true);
        expect(result.warnings).toContain('Constructor bracket access detected - potential prototype pollution');
      });

      it('should warn about constructor[variable] access', () => {
        const result = analyzeCodeSafety('x.constructor[key]');
        expect(result.warnings).toContain('Constructor bracket access detected - potential prototype pollution');
      });
    });

    describe('infinite loop detection (warning)', () => {
      it('should warn about while(true) without break', () => {
        const code = `
          while (true) {
            doSomething();
          }
        `;
        const result = analyzeCodeSafety(code);
        expect(result.warnings).toContain('Potential infinite loop detected (while(true) without break)');
      });

      it('should not warn about while(true) with break', () => {
        const code = `
          while (true) {
            if (condition) break;
            doSomething();
          }
        `;
        const result = analyzeCodeSafety(code);
        expect(result.warnings).not.toContain('Potential infinite loop detected (while(true) without break)');
      });

      it('should warn about for(;;) without break', () => {
        const code = `
          for (;;) {
            doSomething();
          }
        `;
        const result = analyzeCodeSafety(code);
        expect(result.warnings).toContain('Potential infinite loop detected (for(;;) without break)');
      });

      it('should not warn about for(;;) with break', () => {
        const code = `
          for (;;) {
            if (done) break;
            process();
          }
        `;
        const result = analyzeCodeSafety(code);
        expect(result.warnings).not.toContain('Potential infinite loop detected (for(;;) without break)');
      });

      it('should not flag normal while loops', () => {
        const code = 'while (i < 10) { i++; }';
        const result = analyzeCodeSafety(code);
        expect(result.warnings.filter(w => w.includes('infinite loop'))).toHaveLength(0);
      });
    });

    describe('large array allocation detection (warning)', () => {
      it('should warn about very large array allocations (6+ digits)', () => {
        const result = analyzeCodeSafety('const arr = new Array(1000000);');
        expect(result.warnings).toContain('Large array allocation detected - may cause memory issues');
      });

      it('should warn about 7 digit array allocations', () => {
        const result = analyzeCodeSafety('Array(10000000)');
        expect(result.warnings).toContain('Large array allocation detected - may cause memory issues');
      });

      it('should not warn about small array allocations', () => {
        const result = analyzeCodeSafety('const arr = new Array(100);');
        expect(result.warnings).not.toContain('Large array allocation detected - may cause memory issues');
      });

      it('should not warn about 5 digit array allocations', () => {
        const result = analyzeCodeSafety('new Array(99999)');
        expect(result.warnings).not.toContain('Large array allocation detected - may cause memory issues');
      });
    });

    describe('multiple issues detection', () => {
      it('should detect multiple security issues', () => {
        const code = `
          eval(code);
          Function(dynamicCode);
          obj.__proto__ = {};
        `;
        const result = analyzeCodeSafety(code);
        expect(result.safe).toBe(false);
        expect(result.issues).toHaveLength(3);
      });

      it('should detect both issues and warnings', () => {
        const code = `
          eval(code);
          element.innerHTML = content;
          document.write("text");
        `;
        const result = analyzeCodeSafety(code);
        expect(result.safe).toBe(false);
        expect(result.issues.length).toBeGreaterThan(0);
        expect(result.warnings.length).toBeGreaterThan(0);
      });

      it('should return proper result structure', () => {
        const result = analyzeCodeSafety('any code');
        expect(result).toHaveProperty('safe');
        expect(result).toHaveProperty('issues');
        expect(result).toHaveProperty('warnings');
        expect(typeof result.safe).toBe('boolean');
        expect(Array.isArray(result.issues)).toBe(true);
        expect(Array.isArray(result.warnings)).toBe(true);
      });
    });
  });

  describe('hasBrowserAPIs', () => {
    describe('fetch API detection', () => {
      it('should detect fetch() calls', () => {
        expect(hasBrowserAPIs('fetch("/api/data")')).toBe(true);
      });

      it('should detect fetch with await', () => {
        expect(hasBrowserAPIs('await fetch(url)')).toBe(true);
      });

      it('should not flag "fetchData" variable name', () => {
        expect(hasBrowserAPIs('const fetchData = "test";')).toBe(false);
      });
    });

    describe('window object detection', () => {
      it('should detect window.innerWidth', () => {
        expect(hasBrowserAPIs('const width = window.innerWidth;')).toBe(true);
      });

      it('should detect window.addEventListener', () => {
        expect(hasBrowserAPIs('window.addEventListener("resize", fn)')).toBe(true);
      });

      it('should detect window.scrollTo', () => {
        expect(hasBrowserAPIs('window.scrollTo(0, 0)')).toBe(true);
      });
    });

    describe('document object detection', () => {
      it('should detect document.getElementById', () => {
        expect(hasBrowserAPIs('document.getElementById("app")')).toBe(true);
      });

      it('should detect document.querySelector', () => {
        expect(hasBrowserAPIs('document.querySelector(".class")')).toBe(true);
      });

      it('should detect document.body', () => {
        expect(hasBrowserAPIs('document.body.style.color = "red"')).toBe(true);
      });
    });

    describe('localStorage detection', () => {
      it('should detect localStorage.getItem', () => {
        expect(hasBrowserAPIs('localStorage.getItem("key")')).toBe(true);
      });

      it('should detect localStorage.setItem', () => {
        expect(hasBrowserAPIs('localStorage.setItem("key", "value")')).toBe(true);
      });
    });

    describe('sessionStorage detection', () => {
      it('should detect sessionStorage.getItem', () => {
        expect(hasBrowserAPIs('sessionStorage.getItem("key")')).toBe(true);
      });

      it('should detect sessionStorage.clear', () => {
        expect(hasBrowserAPIs('sessionStorage.clear()')).toBe(true);
      });
    });

    describe('navigator detection', () => {
      it('should detect navigator.userAgent', () => {
        expect(hasBrowserAPIs('const ua = navigator.userAgent;')).toBe(true);
      });

      it('should detect navigator.geolocation', () => {
        expect(hasBrowserAPIs('navigator.geolocation.getCurrentPosition(fn)')).toBe(true);
      });
    });

    describe('location detection', () => {
      it('should detect location.href', () => {
        expect(hasBrowserAPIs('const url = location.href;')).toBe(true);
      });

      it('should detect location.pathname', () => {
        expect(hasBrowserAPIs('location.pathname')).toBe(true);
      });
    });

    describe('no browser APIs', () => {
      it('should return false for pure JavaScript', () => {
        const code = `
          function add(a, b) { return a + b; }
          const result = add(1, 2);
        `;
        expect(hasBrowserAPIs(code)).toBe(false);
      });

      it('should return false for empty string', () => {
        expect(hasBrowserAPIs('')).toBe(false);
      });

      it('should return false for Node.js APIs', () => {
        const code = `
          const fs = require('fs');
          const path = require('path');
        `;
        expect(hasBrowserAPIs(code)).toBe(false);
      });

      it('should return false for class with method names similar to browser APIs', () => {
        // The pattern looks for \bfetch\s*\( so this should not match
        const code = `
          class DataFetcher {
            constructor() {}
          }
        `;
        expect(hasBrowserAPIs(code)).toBe(false);
      });
    });

    describe('multiple browser APIs', () => {
      it('should return true when code has multiple browser APIs', () => {
        const code = `
          const data = await fetch('/api');
          document.getElementById('output').textContent = data;
          localStorage.setItem('lastFetch', Date.now());
        `;
        expect(hasBrowserAPIs(code)).toBe(true);
      });
    });
  });

  describe('sanitizeErrorMessage', () => {
    describe('path sanitization', () => {
      it('should sanitize Windows absolute paths', () => {
        const message = 'Error at C:\\Users\\Admin\\project\\file.js:10:5';
        const result = sanitizeErrorMessage(message);
        expect(result).not.toContain('C:\\Users');
        expect(result).toContain('[path]');
      });

      it('should sanitize Windows paths with forward slashes', () => {
        const message = 'Error at C:/Users/Admin/project/file.js:10:5';
        const result = sanitizeErrorMessage(message);
        expect(result).not.toContain('C:/Users');
        expect(result).toContain('[path]');
      });

      it('should sanitize Unix absolute paths', () => {
        const message = 'Error at /home/user/project/src/file.ts:25:10';
        const result = sanitizeErrorMessage(message);
        expect(result).not.toContain('/home/user');
        expect(result).toContain('[path]');
      });

      it('should sanitize macOS paths', () => {
        const message = 'Failed to load /Users/developer/Documents/app/index.js';
        const result = sanitizeErrorMessage(message);
        expect(result).not.toContain('/Users/developer');
        expect(result).toContain('[path]');
      });

      it('should handle multiple paths in one message', () => {
        const message = 'Cannot find /home/user/a.js, tried /home/user/b.js';
        const result = sanitizeErrorMessage(message);
        expect(result.match(/\[path\]/g)?.length).toBe(2);
      });

      it('should preserve non-path parts of message', () => {
        const message = 'SyntaxError: Unexpected token at /path/to/file.js:1:5';
        const result = sanitizeErrorMessage(message);
        expect(result).toContain('SyntaxError: Unexpected token');
      });
    });

    describe('message truncation', () => {
      it('should truncate messages over 500 characters', () => {
        const longMessage = 'A'.repeat(600);
        const result = sanitizeErrorMessage(longMessage);
        expect(result.length).toBe(500);
        expect(result.endsWith('...')).toBe(true);
      });

      it('should not truncate messages at exactly 500 characters', () => {
        const exactMessage = 'B'.repeat(500);
        const result = sanitizeErrorMessage(exactMessage);
        expect(result.length).toBe(500);
        expect(result.endsWith('...')).toBe(false);
      });

      it('should not truncate short messages', () => {
        const shortMessage = 'Short error message';
        const result = sanitizeErrorMessage(shortMessage);
        expect(result).toBe(shortMessage);
      });

      it('should handle message exactly 501 characters', () => {
        const message = 'C'.repeat(501);
        const result = sanitizeErrorMessage(message);
        expect(result.length).toBe(500);
        expect(result.endsWith('...')).toBe(true);
      });
    });

    describe('edge cases', () => {
      it('should handle empty string', () => {
        const result = sanitizeErrorMessage('');
        expect(result).toBe('');
      });

      it('should handle message with no paths', () => {
        const message = 'TypeError: Cannot read property of undefined';
        const result = sanitizeErrorMessage(message);
        expect(result).toBe(message);
      });

      it('should handle paths and long message together', () => {
        const longPath = '/home/user/very/long/path/to/file.js';
        const longMessage = longPath + ' ' + 'x'.repeat(600);
        const result = sanitizeErrorMessage(longMessage);
        expect(result.length).toBe(500);
        expect(result).not.toContain('/home/user');
      });

      it('should handle message with only spaces', () => {
        const result = sanitizeErrorMessage('   ');
        expect(result).toBe('   ');
      });

      it('should handle message with special characters', () => {
        const message = 'Error: <script>alert("xss")</script>';
        const result = sanitizeErrorMessage(message);
        expect(result).toBe(message);
      });

      it('should handle message with newlines', () => {
        const message = 'Error:\n  at function\n  at /path/to/file.js';
        const result = sanitizeErrorMessage(message);
        expect(result).toContain('[path]');
      });
    });

    describe('path pattern edge cases', () => {
      it('should sanitize paths with multiple segments including relative-looking paths', () => {
        // The regex /\/[^\s:]+\/[^\s:]+/g matches paths with at least 2 segments
        const message = 'Error in ./src/file.js';
        const result = sanitizeErrorMessage(message);
        // The regex will match /src/file.js portion
        expect(result).toContain('[path]');
      });

      it('should not sanitize single slash', () => {
        const message = 'Use / as separator';
        const result = sanitizeErrorMessage(message);
        expect(result).toBe('Use / as separator');
      });

      it('should handle drive letters of any case', () => {
        const messageUpper = 'Error at D:\\Projects\\app.js';
        const resultUpper = sanitizeErrorMessage(messageUpper);
        expect(resultUpper).toContain('[path]');

        const messageLower = 'Error at d:\\projects\\app.js';
        const resultLower = sanitizeErrorMessage(messageLower);
        expect(resultLower).toContain('[path]');
      });
    });
  });
});
