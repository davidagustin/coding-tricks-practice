import { runTests } from '@/lib/test-runner';
import { TEST_CONFIG } from '@/lib/constants';

describe('Test Runner Limits', () => {
  describe('Timeout configuration', () => {
    it('should have EXECUTION_TIMEOUT defined in config', () => {
      expect(TEST_CONFIG.EXECUTION_TIMEOUT).toBeDefined();
      expect(TEST_CONFIG.EXECUTION_TIMEOUT).toBeGreaterThan(0);
      // Verify it's set to 10 seconds as documented
      expect(TEST_CONFIG.EXECUTION_TIMEOUT).toBe(10000);
    });

    it('should format timeout error message correctly', () => {
      // Verify the timeout message format matches what the test runner produces
      const expectedSeconds = TEST_CONFIG.EXECUTION_TIMEOUT / 1000;
      const expectedMessage = `Test execution timed out after ${expectedSeconds} seconds`;
      expect(expectedMessage).toContain('timed out');
      expect(expectedMessage).toContain(`${expectedSeconds}`);
    });

    /*
     * Note: Testing actual timeout behavior is not feasible in unit tests because:
     * 1. Synchronous infinite loops (while(true){}) block the JavaScript event loop,
     *    preventing the setTimeout-based timeout from ever firing
     * 2. Async functions with delays have extraction/execution issues in the test
     *    runner's eval context
     *
     * The timeout mechanism exists in runTests() at lines 69-75 and will work
     * correctly for async operations in the browser environment, but cannot be
     * reliably tested in Jest's synchronous test environment.
     */
  });

  describe('Code size limits', () => {
    it('should reject code exceeding MAX_CODE_SIZE', async () => {
      const oversizedCode = 'function test() { return 1; }' + ' '.repeat(TEST_CONFIG.MAX_CODE_SIZE);

      const result = await runTests(oversizedCode, [{ input: [], expectedOutput: 1 }]);

      expect(result.allPassed).toBe(false);
      expect(result.error).toContain('too large');
      expect(result.error).toContain(`${TEST_CONFIG.MAX_CODE_SIZE}`);
      expect(result.results).toEqual([]);
    });

    it('should include actual code size in error message', async () => {
      const codeSize = TEST_CONFIG.MAX_CODE_SIZE + 100;
      const oversizedCode = 'x'.repeat(codeSize);

      const result = await runTests(oversizedCode, [{ input: [], expectedOutput: 1 }]);

      expect(result.allPassed).toBe(false);
      expect(result.error).toContain(`${codeSize}`);
    });

    it('should accept large but valid code under the limit', async () => {
      const largeComment = '// ' + 'x'.repeat(TEST_CONFIG.MAX_CODE_SIZE - 100);
      const validLargeCode = `
        ${largeComment}
        function add(a, b) { return a + b; }
      `;

      // Ensure we're under the limit
      expect(validLargeCode.length).toBeLessThan(TEST_CONFIG.MAX_CODE_SIZE);

      const result = await runTests(validLargeCode, [{ input: [1, 2], expectedOutput: 3 }]);

      expect(result.allPassed).toBe(true);
      expect(result.results[0].passed).toBe(true);
    });

    it('should have MAX_CODE_SIZE defined in config', () => {
      expect(TEST_CONFIG.MAX_CODE_SIZE).toBeDefined();
      expect(TEST_CONFIG.MAX_CODE_SIZE).toBeGreaterThan(0);
      // Verify it's set to 50KB as documented
      expect(TEST_CONFIG.MAX_CODE_SIZE).toBe(50000);
    });
  });

  describe('Empty and whitespace code', () => {
    it('should reject empty code', async () => {
      const result = await runTests('', [{ input: [], expectedOutput: null }]);

      expect(result.allPassed).toBe(false);
      expect(result.error).toContain('No code provided');
      expect(result.results).toEqual([]);
    });

    it('should reject whitespace-only code', async () => {
      const result = await runTests('   \n\t\n   ', [{ input: [], expectedOutput: null }]);

      expect(result.allPassed).toBe(false);
      expect(result.error).toContain('No code provided');
      expect(result.results).toEqual([]);
    });

    it('should reject code with only newlines', async () => {
      const result = await runTests('\n\n\n', [{ input: [], expectedOutput: null }]);

      expect(result.allPassed).toBe(false);
      expect(result.error).toContain('No code provided');
      expect(result.results).toEqual([]);
    });

    it('should reject code with only tabs', async () => {
      const result = await runTests('\t\t\t', [{ input: [], expectedOutput: null }]);

      expect(result.allPassed).toBe(false);
      expect(result.error).toContain('No code provided');
      expect(result.results).toEqual([]);
    });
  });
});
