import { runTests } from '@/lib/test-runner';

describe('Test Runner Safety Checks', () => {
  const dummyTestCase = [{ input: [], expectedOutput: null }];

  describe('Dangerous Code Detection', () => {
    it('should fail safety check for code with eval()', async () => {
      const code = `
        function unsafeFunction(str) {
          return eval(str);
        }
      `;

      const result = await runTests(code, dummyTestCase);

      expect(result.allPassed).toBe(false);
      expect(result.error).toContain('Code safety check failed');
      expect(result.error).toContain('eval()');
    });

    it('should fail safety check for code with Function constructor', async () => {
      const code = `
        function unsafeFunction(code) {
          const fn = new Function('return ' + code);
          return fn();
        }
      `;

      const result = await runTests(code, dummyTestCase);

      expect(result.allPassed).toBe(false);
      expect(result.error).toContain('Code safety check failed');
      expect(result.error).toContain('Function constructor');
    });

    it('should fail safety check for code with __proto__', async () => {
      const code = `
        function protoAccess(obj) {
          return obj.__proto__;
        }
      `;

      const result = await runTests(code, dummyTestCase);

      expect(result.allPassed).toBe(false);
      expect(result.error).toContain('Code safety check failed');
      expect(result.error).toContain('__proto__');
    });
  });

  describe('Warning Detection (non-blocking)', () => {
    it('should pass but show warnings for innerHTML usage', async () => {
      const code = `
        function setContent(element, content) {
          element.innerHTML = content;
          return true;
        }
      `;

      const result = await runTests(code, dummyTestCase);

      // Should not fail the safety check (innerHTML is a warning, not a blocker)
      expect(result.error).not.toContain('Code safety check failed');
      // Should contain warning in the output
      expect(result.error).toContain('Warnings');
      expect(result.error).toContain('innerHTML');
    });

    it('should pass but show warnings for document.write usage', async () => {
      const code = `
        function writeToDoc(content) {
          document.write(content);
          return true;
        }
      `;

      const result = await runTests(code, dummyTestCase);

      // Should not fail the safety check (document.write is a warning, not a blocker)
      expect(result.error).not.toContain('Code safety check failed');
      // Should contain warning in the output
      expect(result.error).toContain('Warnings');
      expect(result.error).toContain('document.write');
    });
  });

  describe('Safe Code Execution', () => {
    it('should pass safety check for safe code', async () => {
      const code = `
        function add(a, b) {
          return a + b;
        }
      `;

      const result = await runTests(code, [{ input: [1, 2], expectedOutput: 3 }]);

      expect(result.allPassed).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should pass safety check for code with safe string operations', async () => {
      const code = `
        function process(str) {
          return str.toUpperCase();
        }
      `;

      const result = await runTests(code, [{ input: ['hello'], expectedOutput: 'HELLO' }]);

      expect(result.allPassed).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });
});
