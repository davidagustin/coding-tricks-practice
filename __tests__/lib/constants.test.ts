/**
 * Unit tests for lib/constants.ts
 * Tests all exported constants for existence, types, and reasonable values
 */

import {
  DIFFICULTY_COLORS,
  TYPESCRIPT_COMPILER_OPTIONS,
  TYPESCRIPT_ERROR_CODES,
  TEST_CONFIG,
  BROWSER_API_KEYWORDS,
  DANGEROUS_CODE_PATTERNS,
  DOMPURIFY_CONFIG,
} from '../../lib/constants';

describe('lib/constants', () => {
  describe('DIFFICULTY_COLORS', () => {
    it('should be defined and be an object', () => {
      expect(DIFFICULTY_COLORS).toBeDefined();
      expect(typeof DIFFICULTY_COLORS).toBe('object');
      expect(DIFFICULTY_COLORS).not.toBeNull();
    });

    it('should have an entry for "easy" difficulty', () => {
      expect(DIFFICULTY_COLORS).toHaveProperty('easy');
      expect(typeof DIFFICULTY_COLORS.easy).toBe('string');
      expect(DIFFICULTY_COLORS.easy.length).toBeGreaterThan(0);
    });

    it('should have an entry for "medium" difficulty', () => {
      expect(DIFFICULTY_COLORS).toHaveProperty('medium');
      expect(typeof DIFFICULTY_COLORS.medium).toBe('string');
      expect(DIFFICULTY_COLORS.medium.length).toBeGreaterThan(0);
    });

    it('should have an entry for "hard" difficulty', () => {
      expect(DIFFICULTY_COLORS).toHaveProperty('hard');
      expect(typeof DIFFICULTY_COLORS.hard).toBe('string');
      expect(DIFFICULTY_COLORS.hard.length).toBeGreaterThan(0);
    });

    it('should have exactly three difficulty levels', () => {
      const keys = Object.keys(DIFFICULTY_COLORS);
      expect(keys).toHaveLength(3);
      expect(keys).toContain('easy');
      expect(keys).toContain('medium');
      expect(keys).toContain('hard');
    });

    it('should have Tailwind CSS classes for easy difficulty', () => {
      expect(DIFFICULTY_COLORS.easy).toContain('bg-green');
      expect(DIFFICULTY_COLORS.easy).toContain('text-green');
    });

    it('should have Tailwind CSS classes for medium difficulty', () => {
      expect(DIFFICULTY_COLORS.medium).toContain('bg-yellow');
      expect(DIFFICULTY_COLORS.medium).toContain('text-yellow');
    });

    it('should have Tailwind CSS classes for hard difficulty', () => {
      expect(DIFFICULTY_COLORS.hard).toContain('bg-red');
      expect(DIFFICULTY_COLORS.hard).toContain('text-red');
    });

    it('should include dark mode variants for all difficulties', () => {
      expect(DIFFICULTY_COLORS.easy).toContain('dark:');
      expect(DIFFICULTY_COLORS.medium).toContain('dark:');
      expect(DIFFICULTY_COLORS.hard).toContain('dark:');
    });

    it('should have distinct colors for each difficulty level', () => {
      expect(DIFFICULTY_COLORS.easy).not.toBe(DIFFICULTY_COLORS.medium);
      expect(DIFFICULTY_COLORS.medium).not.toBe(DIFFICULTY_COLORS.hard);
      expect(DIFFICULTY_COLORS.easy).not.toBe(DIFFICULTY_COLORS.hard);
    });
  });

  describe('TYPESCRIPT_COMPILER_OPTIONS', () => {
    it('should be defined and be an object', () => {
      expect(TYPESCRIPT_COMPILER_OPTIONS).toBeDefined();
      expect(typeof TYPESCRIPT_COMPILER_OPTIONS).toBe('object');
      expect(TYPESCRIPT_COMPILER_OPTIONS).not.toBeNull();
    });

    it('should have TARGET_ES2020 property with numeric value', () => {
      expect(TYPESCRIPT_COMPILER_OPTIONS).toHaveProperty('TARGET_ES2020');
      expect(typeof TYPESCRIPT_COMPILER_OPTIONS.TARGET_ES2020).toBe('number');
      expect(TYPESCRIPT_COMPILER_OPTIONS.TARGET_ES2020).toBe(5);
    });

    it('should have MODULE_ESNEXT property with numeric value', () => {
      expect(TYPESCRIPT_COMPILER_OPTIONS).toHaveProperty('MODULE_ESNEXT');
      expect(typeof TYPESCRIPT_COMPILER_OPTIONS.MODULE_ESNEXT).toBe('number');
      expect(TYPESCRIPT_COMPILER_OPTIONS.MODULE_ESNEXT).toBe(99);
    });

    it('should have JSX_REACT property with numeric value', () => {
      expect(TYPESCRIPT_COMPILER_OPTIONS).toHaveProperty('JSX_REACT');
      expect(typeof TYPESCRIPT_COMPILER_OPTIONS.JSX_REACT).toBe('number');
      expect(TYPESCRIPT_COMPILER_OPTIONS.JSX_REACT).toBe(2);
    });

    it('should have valid enum values (positive integers)', () => {
      expect(TYPESCRIPT_COMPILER_OPTIONS.TARGET_ES2020).toBeGreaterThan(0);
      expect(TYPESCRIPT_COMPILER_OPTIONS.MODULE_ESNEXT).toBeGreaterThan(0);
      expect(TYPESCRIPT_COMPILER_OPTIONS.JSX_REACT).toBeGreaterThan(0);
    });
  });

  describe('TYPESCRIPT_ERROR_CODES', () => {
    it('should be defined and be an object', () => {
      expect(TYPESCRIPT_ERROR_CODES).toBeDefined();
      expect(typeof TYPESCRIPT_ERROR_CODES).toBe('object');
      expect(TYPESCRIPT_ERROR_CODES).not.toBeNull();
    });

    it('should have ENUM_IN_JS_FILE error code', () => {
      expect(TYPESCRIPT_ERROR_CODES).toHaveProperty('ENUM_IN_JS_FILE');
      expect(typeof TYPESCRIPT_ERROR_CODES.ENUM_IN_JS_FILE).toBe('number');
      expect(TYPESCRIPT_ERROR_CODES.ENUM_IN_JS_FILE).toBe(8006);
    });

    it('should have CANNOT_REDECLARE_BLOCK_VAR error code', () => {
      expect(TYPESCRIPT_ERROR_CODES).toHaveProperty('CANNOT_REDECLARE_BLOCK_VAR');
      expect(typeof TYPESCRIPT_ERROR_CODES.CANNOT_REDECLARE_BLOCK_VAR).toBe('number');
      expect(TYPESCRIPT_ERROR_CODES.CANNOT_REDECLARE_BLOCK_VAR).toBe(2451);
    });

    it('should have DUPLICATE_IDENTIFIER error code', () => {
      expect(TYPESCRIPT_ERROR_CODES).toHaveProperty('DUPLICATE_IDENTIFIER');
      expect(typeof TYPESCRIPT_ERROR_CODES.DUPLICATE_IDENTIFIER).toBe('number');
      expect(TYPESCRIPT_ERROR_CODES.DUPLICATE_IDENTIFIER).toBe(2300);
    });

    it('should have DUPLICATE_FUNCTION_IMPL error code', () => {
      expect(TYPESCRIPT_ERROR_CODES).toHaveProperty('DUPLICATE_FUNCTION_IMPL');
      expect(typeof TYPESCRIPT_ERROR_CODES.DUPLICATE_FUNCTION_IMPL).toBe('number');
      expect(TYPESCRIPT_ERROR_CODES.DUPLICATE_FUNCTION_IMPL).toBe(2393);
    });

    it('should have all error codes as positive integers', () => {
      Object.values(TYPESCRIPT_ERROR_CODES).forEach((code) => {
        expect(typeof code).toBe('number');
        expect(code).toBeGreaterThan(0);
        expect(Number.isInteger(code)).toBe(true);
      });
    });

    it('should have exactly four error codes', () => {
      const keys = Object.keys(TYPESCRIPT_ERROR_CODES);
      expect(keys).toHaveLength(4);
    });
  });

  describe('TEST_CONFIG', () => {
    it('should be defined and be an object', () => {
      expect(TEST_CONFIG).toBeDefined();
      expect(typeof TEST_CONFIG).toBe('object');
      expect(TEST_CONFIG).not.toBeNull();
    });

    it('should have EXECUTION_TIMEOUT property', () => {
      expect(TEST_CONFIG).toHaveProperty('EXECUTION_TIMEOUT');
      expect(typeof TEST_CONFIG.EXECUTION_TIMEOUT).toBe('number');
    });

    it('should have a positive EXECUTION_TIMEOUT', () => {
      expect(TEST_CONFIG.EXECUTION_TIMEOUT).toBeGreaterThan(0);
    });

    it('should have EXECUTION_TIMEOUT of 10000ms (10 seconds)', () => {
      expect(TEST_CONFIG.EXECUTION_TIMEOUT).toBe(10000);
    });

    it('should have EXECUTION_TIMEOUT that is reasonable (between 1s and 60s)', () => {
      expect(TEST_CONFIG.EXECUTION_TIMEOUT).toBeGreaterThanOrEqual(1000);
      expect(TEST_CONFIG.EXECUTION_TIMEOUT).toBeLessThanOrEqual(60000);
    });

    it('should have MIN_RUN_INTERVAL property', () => {
      expect(TEST_CONFIG).toHaveProperty('MIN_RUN_INTERVAL');
      expect(typeof TEST_CONFIG.MIN_RUN_INTERVAL).toBe('number');
    });

    it('should have a positive MIN_RUN_INTERVAL', () => {
      expect(TEST_CONFIG.MIN_RUN_INTERVAL).toBeGreaterThan(0);
    });

    it('should have MIN_RUN_INTERVAL of 1000ms (1 second)', () => {
      expect(TEST_CONFIG.MIN_RUN_INTERVAL).toBe(1000);
    });

    it('should have MIN_RUN_INTERVAL less than EXECUTION_TIMEOUT', () => {
      expect(TEST_CONFIG.MIN_RUN_INTERVAL).toBeLessThan(TEST_CONFIG.EXECUTION_TIMEOUT);
    });

    it('should have MAX_CODE_SIZE property', () => {
      expect(TEST_CONFIG).toHaveProperty('MAX_CODE_SIZE');
      expect(typeof TEST_CONFIG.MAX_CODE_SIZE).toBe('number');
    });

    it('should have a positive MAX_CODE_SIZE', () => {
      expect(TEST_CONFIG.MAX_CODE_SIZE).toBeGreaterThan(0);
    });

    it('should have MAX_CODE_SIZE of 50000 bytes (50KB)', () => {
      expect(TEST_CONFIG.MAX_CODE_SIZE).toBe(50000);
    });

    it('should have MAX_CODE_SIZE that is reasonable (between 10KB and 1MB)', () => {
      expect(TEST_CONFIG.MAX_CODE_SIZE).toBeGreaterThanOrEqual(10000);
      expect(TEST_CONFIG.MAX_CODE_SIZE).toBeLessThanOrEqual(1000000);
    });

    it('should have all values as positive integers', () => {
      Object.values(TEST_CONFIG).forEach((value) => {
        expect(typeof value).toBe('number');
        expect(value).toBeGreaterThan(0);
        expect(Number.isInteger(value)).toBe(true);
      });
    });

    it('should have exactly three configuration options', () => {
      const keys = Object.keys(TEST_CONFIG);
      expect(keys).toHaveLength(3);
    });
  });

  describe('BROWSER_API_KEYWORDS', () => {
    it('should be defined and be an array', () => {
      expect(BROWSER_API_KEYWORDS).toBeDefined();
      expect(Array.isArray(BROWSER_API_KEYWORDS)).toBe(true);
    });

    it('should have at least one keyword', () => {
      expect(BROWSER_API_KEYWORDS.length).toBeGreaterThan(0);
    });

    it('should contain "fetch" keyword', () => {
      expect(BROWSER_API_KEYWORDS).toContain('fetch');
    });

    it('should contain "window" keyword', () => {
      expect(BROWSER_API_KEYWORDS).toContain('window');
    });

    it('should contain "document" keyword', () => {
      expect(BROWSER_API_KEYWORDS).toContain('document');
    });

    it('should contain "AbortController" keyword', () => {
      expect(BROWSER_API_KEYWORDS).toContain('AbortController');
    });

    it('should contain "localStorage" keyword', () => {
      expect(BROWSER_API_KEYWORDS).toContain('localStorage');
    });

    it('should contain "sessionStorage" keyword', () => {
      expect(BROWSER_API_KEYWORDS).toContain('sessionStorage');
    });

    it('should have exactly six keywords', () => {
      expect(BROWSER_API_KEYWORDS).toHaveLength(6);
    });

    it('should have all keywords as non-empty strings', () => {
      BROWSER_API_KEYWORDS.forEach((keyword) => {
        expect(typeof keyword).toBe('string');
        expect(keyword.length).toBeGreaterThan(0);
      });
    });

    it('should have all unique keywords', () => {
      const uniqueKeywords = new Set(BROWSER_API_KEYWORDS);
      expect(uniqueKeywords.size).toBe(BROWSER_API_KEYWORDS.length);
    });

    it('should not contain empty strings', () => {
      expect(BROWSER_API_KEYWORDS).not.toContain('');
    });

    it('should not contain whitespace-only strings', () => {
      BROWSER_API_KEYWORDS.forEach((keyword) => {
        expect(keyword.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('DANGEROUS_CODE_PATTERNS', () => {
    it('should be defined and be an object', () => {
      expect(DANGEROUS_CODE_PATTERNS).toBeDefined();
      expect(typeof DANGEROUS_CODE_PATTERNS).toBe('object');
      expect(DANGEROUS_CODE_PATTERNS).not.toBeNull();
    });

    it('should have EVAL pattern', () => {
      expect(DANGEROUS_CODE_PATTERNS).toHaveProperty('EVAL');
      expect(DANGEROUS_CODE_PATTERNS.EVAL).toBeInstanceOf(RegExp);
    });

    it('should have FUNCTION_CONSTRUCTOR pattern', () => {
      expect(DANGEROUS_CODE_PATTERNS).toHaveProperty('FUNCTION_CONSTRUCTOR');
      expect(DANGEROUS_CODE_PATTERNS.FUNCTION_CONSTRUCTOR).toBeInstanceOf(RegExp);
    });

    it('should have INNER_HTML pattern', () => {
      expect(DANGEROUS_CODE_PATTERNS).toHaveProperty('INNER_HTML');
      expect(DANGEROUS_CODE_PATTERNS.INNER_HTML).toBeInstanceOf(RegExp);
    });

    it('should have DOCUMENT_WRITE pattern', () => {
      expect(DANGEROUS_CODE_PATTERNS).toHaveProperty('DOCUMENT_WRITE');
      expect(DANGEROUS_CODE_PATTERNS.DOCUMENT_WRITE).toBeInstanceOf(RegExp);
    });

    it('should have WINDOW_LOCATION pattern', () => {
      expect(DANGEROUS_CODE_PATTERNS).toHaveProperty('WINDOW_LOCATION');
      expect(DANGEROUS_CODE_PATTERNS.WINDOW_LOCATION).toBeInstanceOf(RegExp);
    });

    it('should have PROTO pattern', () => {
      expect(DANGEROUS_CODE_PATTERNS).toHaveProperty('PROTO');
      expect(DANGEROUS_CODE_PATTERNS.PROTO).toBeInstanceOf(RegExp);
    });

    it('should have CONSTRUCTOR_ACCESS pattern', () => {
      expect(DANGEROUS_CODE_PATTERNS).toHaveProperty('CONSTRUCTOR_ACCESS');
      expect(DANGEROUS_CODE_PATTERNS.CONSTRUCTOR_ACCESS).toBeInstanceOf(RegExp);
    });

    it('should have exactly seven dangerous patterns', () => {
      const keys = Object.keys(DANGEROUS_CODE_PATTERNS);
      expect(keys).toHaveLength(7);
    });

    it('should have all values as RegExp instances', () => {
      Object.values(DANGEROUS_CODE_PATTERNS).forEach((pattern) => {
        expect(pattern).toBeInstanceOf(RegExp);
      });
    });

    describe('pattern matching tests', () => {
      it('EVAL pattern should match eval() calls', () => {
        expect(DANGEROUS_CODE_PATTERNS.EVAL.test('eval("code")')).toBe(true);
        expect(DANGEROUS_CODE_PATTERNS.EVAL.test('eval  ("code")')).toBe(true);
      });

      it('EVAL pattern should not match "evaluation" word', () => {
        expect(DANGEROUS_CODE_PATTERNS.EVAL.test('evaluation')).toBe(false);
        expect(DANGEROUS_CODE_PATTERNS.EVAL.test('const evaluation = 1')).toBe(false);
      });

      it('FUNCTION_CONSTRUCTOR pattern should match Function() calls', () => {
        expect(DANGEROUS_CODE_PATTERNS.FUNCTION_CONSTRUCTOR.test('Function("code")')).toBe(true);
        expect(DANGEROUS_CODE_PATTERNS.FUNCTION_CONSTRUCTOR.test('new Function("code")')).toBe(true);
      });

      it('INNER_HTML pattern should match innerHTML assignment', () => {
        expect(DANGEROUS_CODE_PATTERNS.INNER_HTML.test('element.innerHTML = "content"')).toBe(true);
        expect(DANGEROUS_CODE_PATTERNS.INNER_HTML.test('.innerHTML = value')).toBe(true);
      });

      it('INNER_HTML pattern should not match innerHTML reading', () => {
        expect(DANGEROUS_CODE_PATTERNS.INNER_HTML.test('const x = element.innerHTML;')).toBe(false);
      });

      it('DOCUMENT_WRITE pattern should match document.write calls', () => {
        expect(DANGEROUS_CODE_PATTERNS.DOCUMENT_WRITE.test('document.write("text")')).toBe(true);
        expect(DANGEROUS_CODE_PATTERNS.DOCUMENT_WRITE.test('document.writeln("text")')).toBe(true);
      });

      it('WINDOW_LOCATION pattern should match window.location usage', () => {
        expect(DANGEROUS_CODE_PATTERNS.WINDOW_LOCATION.test('window.location = url')).toBe(true);
        expect(DANGEROUS_CODE_PATTERNS.WINDOW_LOCATION.test('window.location.href')).toBe(true);
      });

      it('PROTO pattern should match __proto__ usage', () => {
        expect(DANGEROUS_CODE_PATTERNS.PROTO.test('obj.__proto__')).toBe(true);
        expect(DANGEROUS_CODE_PATTERNS.PROTO.test('{ __proto__: null }')).toBe(true);
      });

      it('CONSTRUCTOR_ACCESS pattern should match constructor bracket access', () => {
        expect(DANGEROUS_CODE_PATTERNS.CONSTRUCTOR_ACCESS.test('obj.constructor["prototype"]')).toBe(true);
        expect(DANGEROUS_CODE_PATTERNS.CONSTRUCTOR_ACCESS.test('x.constructor[key]')).toBe(true);
      });
    });
  });

  describe('DOMPURIFY_CONFIG', () => {
    it('should be defined and be an object', () => {
      expect(DOMPURIFY_CONFIG).toBeDefined();
      expect(typeof DOMPURIFY_CONFIG).toBe('object');
      expect(DOMPURIFY_CONFIG).not.toBeNull();
    });

    describe('ALLOWED_TAGS', () => {
      it('should have ALLOWED_TAGS property as an array', () => {
        expect(DOMPURIFY_CONFIG).toHaveProperty('ALLOWED_TAGS');
        expect(Array.isArray(DOMPURIFY_CONFIG.ALLOWED_TAGS)).toBe(true);
      });

      it('should have at least one allowed tag', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS.length).toBeGreaterThan(0);
      });

      it('should contain common text formatting tags', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('p');
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('strong');
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('em');
      });

      it('should contain heading tags', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('h1');
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('h2');
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('h3');
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('h4');
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('h5');
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('h6');
      });

      it('should contain list tags', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('ul');
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('ol');
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('li');
      });

      it('should contain code-related tags', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('code');
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('pre');
      });

      it('should contain table-related tags', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('table');
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('thead');
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('tbody');
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('tr');
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('th');
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('td');
      });

      it('should contain line break tag', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('br');
      });

      it('should contain anchor tag for links', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).toContain('a');
      });

      it('should not contain script tag (security)', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).not.toContain('script');
      });

      it('should not contain style tag (security)', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).not.toContain('style');
      });

      it('should not contain iframe tag (security)', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).not.toContain('iframe');
      });

      it('should not contain object tag (security)', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).not.toContain('object');
      });

      it('should not contain embed tag (security)', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_TAGS).not.toContain('embed');
      });

      it('should have all tags as non-empty strings', () => {
        DOMPURIFY_CONFIG.ALLOWED_TAGS.forEach((tag) => {
          expect(typeof tag).toBe('string');
          expect(tag.length).toBeGreaterThan(0);
        });
      });

      it('should have all unique tags', () => {
        const uniqueTags = new Set(DOMPURIFY_CONFIG.ALLOWED_TAGS);
        expect(uniqueTags.size).toBe(DOMPURIFY_CONFIG.ALLOWED_TAGS.length);
      });
    });

    describe('ALLOWED_ATTR', () => {
      it('should have ALLOWED_ATTR property as an array', () => {
        expect(DOMPURIFY_CONFIG).toHaveProperty('ALLOWED_ATTR');
        expect(Array.isArray(DOMPURIFY_CONFIG.ALLOWED_ATTR)).toBe(true);
      });

      it('should have at least one allowed attribute', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_ATTR.length).toBeGreaterThan(0);
      });

      it('should contain class attribute', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_ATTR).toContain('class');
      });

      it('should contain href attribute for links', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_ATTR).toContain('href');
      });

      it('should contain target attribute for links', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_ATTR).toContain('target');
      });

      it('should contain rel attribute for link security', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_ATTR).toContain('rel');
      });

      it('should not contain onclick attribute (security)', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_ATTR).not.toContain('onclick');
      });

      it('should not contain onerror attribute (security)', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_ATTR).not.toContain('onerror');
      });

      it('should not contain onload attribute (security)', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_ATTR).not.toContain('onload');
      });

      it('should not contain style attribute', () => {
        expect(DOMPURIFY_CONFIG.ALLOWED_ATTR).not.toContain('style');
      });

      it('should have all attributes as non-empty strings', () => {
        DOMPURIFY_CONFIG.ALLOWED_ATTR.forEach((attr) => {
          expect(typeof attr).toBe('string');
          expect(attr.length).toBeGreaterThan(0);
        });
      });

      it('should have all unique attributes', () => {
        const uniqueAttrs = new Set(DOMPURIFY_CONFIG.ALLOWED_ATTR);
        expect(uniqueAttrs.size).toBe(DOMPURIFY_CONFIG.ALLOWED_ATTR.length);
      });
    });

    describe('ALLOW_DATA_ATTR', () => {
      it('should have ALLOW_DATA_ATTR property', () => {
        expect(DOMPURIFY_CONFIG).toHaveProperty('ALLOW_DATA_ATTR');
      });

      it('should have ALLOW_DATA_ATTR as boolean', () => {
        expect(typeof DOMPURIFY_CONFIG.ALLOW_DATA_ATTR).toBe('boolean');
      });

      it('should have ALLOW_DATA_ATTR set to false for security', () => {
        expect(DOMPURIFY_CONFIG.ALLOW_DATA_ATTR).toBe(false);
      });
    });

    it('should have exactly three configuration properties', () => {
      const keys = Object.keys(DOMPURIFY_CONFIG);
      expect(keys).toHaveLength(3);
      expect(keys).toContain('ALLOWED_TAGS');
      expect(keys).toContain('ALLOWED_ATTR');
      expect(keys).toContain('ALLOW_DATA_ATTR');
    });
  });

  describe('all exports have correct structure (as const type safety)', () => {
    // Note: "as const" provides TypeScript compile-time immutability,
    // but does not freeze objects at runtime. These tests verify the
    // constants are defined and have the expected structure.

    it('DIFFICULTY_COLORS should be defined with expected structure', () => {
      expect(DIFFICULTY_COLORS).toBeDefined();
      expect(Object.keys(DIFFICULTY_COLORS)).toEqual(['easy', 'medium', 'hard']);
    });

    it('TYPESCRIPT_COMPILER_OPTIONS should be defined with expected structure', () => {
      expect(TYPESCRIPT_COMPILER_OPTIONS).toBeDefined();
      expect(Object.keys(TYPESCRIPT_COMPILER_OPTIONS)).toEqual([
        'TARGET_ES2020',
        'MODULE_ESNEXT',
        'JSX_REACT',
      ]);
    });

    it('TYPESCRIPT_ERROR_CODES should be defined with expected structure', () => {
      expect(TYPESCRIPT_ERROR_CODES).toBeDefined();
      expect(Object.keys(TYPESCRIPT_ERROR_CODES)).toEqual([
        'ENUM_IN_JS_FILE',
        'CANNOT_REDECLARE_BLOCK_VAR',
        'DUPLICATE_IDENTIFIER',
        'DUPLICATE_FUNCTION_IMPL',
      ]);
    });

    it('TEST_CONFIG should be defined with expected structure', () => {
      expect(TEST_CONFIG).toBeDefined();
      expect(Object.keys(TEST_CONFIG)).toEqual([
        'EXECUTION_TIMEOUT',
        'MIN_RUN_INTERVAL',
        'MAX_CODE_SIZE',
      ]);
    });

    it('BROWSER_API_KEYWORDS should be defined as readonly array', () => {
      expect(BROWSER_API_KEYWORDS).toBeDefined();
      expect(Array.isArray(BROWSER_API_KEYWORDS)).toBe(true);
      // Verify the exact order as defined in the source
      expect([...BROWSER_API_KEYWORDS]).toEqual([
        'fetch',
        'window',
        'document',
        'AbortController',
        'localStorage',
        'sessionStorage',
      ]);
    });

    it('DANGEROUS_CODE_PATTERNS should be defined with expected structure', () => {
      expect(DANGEROUS_CODE_PATTERNS).toBeDefined();
      expect(Object.keys(DANGEROUS_CODE_PATTERNS)).toEqual([
        'EVAL',
        'FUNCTION_CONSTRUCTOR',
        'INNER_HTML',
        'DOCUMENT_WRITE',
        'WINDOW_LOCATION',
        'PROTO',
        'CONSTRUCTOR_ACCESS',
      ]);
    });

    it('DOMPURIFY_CONFIG should be defined with expected structure', () => {
      expect(DOMPURIFY_CONFIG).toBeDefined();
      expect(Object.keys(DOMPURIFY_CONFIG)).toEqual([
        'ALLOWED_TAGS',
        'ALLOWED_ATTR',
        'ALLOW_DATA_ATTR',
      ]);
    });
  });
});
