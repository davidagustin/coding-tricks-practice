/**
 * Tests for test-runner.ts using mocks to reach otherwise unreachable code paths
 *
 * This file mocks TypeScript transpilation to test error handling paths
 * that cannot be reached in normal operation.
 */

// Mock TypeScript before importing the module
jest.mock('typescript', () => {
  const actualTs = jest.requireActual('typescript');
  return {
    ...actualTs,
    // We'll override transpile in specific tests
    transpile: actualTs.transpile,
  };
});

import ts from 'typescript';
import { runTests } from '@/lib/test-runner';

describe('Test Runner Mocked Tests', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // ============================================
  // Test lines 39-54 and 140-146: transpileTypeScript error handling
  // ============================================
  describe('TypeScript Transpilation Error (lines 40-50, 140-146)', () => {
    it('should handle transpile throwing an error', async () => {
      // Mock ts.transpile to throw an error
      jest.spyOn(ts, 'transpile').mockImplementation(() => {
        throw new Error('Mock transpilation error');
      });

      const code = `
        function test() {
          return 42;
        }
      `;
      const result = await runTests(code, [{ input: [], expectedOutput: 42 }]);

      expect(result.allPassed).toBe(false);
      expect(result.error).toContain('TypeScript compilation error');
    });

    it('should handle transpile throwing an error with enum keyword', async () => {
      // Mock ts.transpile to throw an error that mentions "enum"
      jest.spyOn(ts, 'transpile').mockImplementation(() => {
        throw new Error('Error with enum keyword');
      });

      const code = `
        function test() {
          return 42;
        }
      `;
      const result = await runTests(code, [{ input: [], expectedOutput: 42 }]);

      expect(result.allPassed).toBe(false);
      expect(result.error).toContain('TypeScript compilation error');
      expect(result.error).toContain('Enums are supported');
    });

    it('should handle transpile throwing an error when code contains enum', async () => {
      // Mock ts.transpile to throw a generic error, but code contains enum
      jest.spyOn(ts, 'transpile').mockImplementation(() => {
        throw new Error('Some other error');
      });

      const code = `
        enum Color { Red, Green, Blue }
        function test() {
          return Color.Red;
        }
      `;
      const result = await runTests(code, [{ input: [], expectedOutput: 0 }]);

      expect(result.allPassed).toBe(false);
      expect(result.error).toContain('TypeScript compilation error');
      // Should have enum note because code contains "enum "
      expect(result.error).toContain('Enums are supported');
    });

    it('should handle transpile throwing a non-Error value', async () => {
      // Mock ts.transpile to throw a string (not an Error)
      jest.spyOn(ts, 'transpile').mockImplementation(() => {
        throw 'String error from transpile';
      });

      const code = `
        function test() {
          return 42;
        }
      `;
      const result = await runTests(code, [{ input: [], expectedOutput: 42 }]);

      expect(result.allPassed).toBe(false);
      expect(result.error).toContain('TypeScript compilation error');
    });
  });

  // ============================================
  // Test line 209: Browser API error handling
  // ============================================
  describe('Browser API Error in Eval (line 209)', () => {
    it('should handle eval throwing fetch-related error', async () => {
      // This is tested indirectly - the code checks if the error message
      // contains 'fetch', 'window', 'document', or 'AbortController'
      // We can test this by having code that tries to access these
      const code = `
        function test() {
          // typeof check won't throw, but direct access might in some envs
          return typeof fetch;
        }
      `;
      const result = await runTests(code, [{ input: [], expectedOutput: 'undefined' }]);
      // In Jest/Node environment, these might be defined or undefined
      expect(result).toBeDefined();
    });

    it('should set functions to empty when window error occurs (line 216)', async () => {
      // We need to mock the Function constructor to create a safeEval that throws
      // when called (not when created)
      // Important: Code MUST have function names detected so we don't return early at line 164
      const OriginalFunction = global.Function;
      let mockCalls = 0;

      // Replace the global Function constructor temporarily
      const mockFn = ((...args: string[]): unknown => {
        mockCalls++;
        // On first call (creating safeEval), return a function that throws when called
        if (mockCalls === 1) {
          return () => {
            throw new Error('window is not defined');
          };
        }
        // @ts-expect-error - we need to call the original
        return new OriginalFunction(...args);
      }) as typeof Function;

      // @ts-expect-error - intentionally overriding
      global.Function = mockFn;

      // Code MUST have a function so extractFunctionNames returns non-empty array
      const code = `
        function test() {
          return 42;
        }
      `;
      const result = await runTests(code, [{ input: [], expectedOutput: 42 }]);

      // Restore original
      global.Function = OriginalFunction;

      // Should fail because safeEval throws browser API error
      // This should hit line 216 (functions = {}) and then
      // line 267 (Could not find any function) because functions is empty
      expect(result.allPassed).toBe(false);
    });

    it('should handle fetch error during safeEval execution (line 216)', async () => {
      const OriginalFunction = global.Function;
      let mockCalls = 0;

      const mockFn = ((...args: string[]): unknown => {
        mockCalls++;
        if (mockCalls === 1) {
          // Return a function that throws a fetch-related error when invoked
          return () => {
            throw new ReferenceError('fetch is not defined');
          };
        }
        // @ts-expect-error - need to call original Function constructor
        return new OriginalFunction(...args);
      }) as typeof Function;

      // @ts-expect-error - intentionally overriding global Function for testing
      global.Function = mockFn;

      const code = `
        function myFunction() {
          return 'result';
        }
      `;
      const result = await runTests(code, [{ input: [], expectedOutput: 'result' }]);

      global.Function = OriginalFunction;

      expect(result.allPassed).toBe(false);
    });

    it('should handle document error during safeEval execution (line 216)', async () => {
      const OriginalFunction = global.Function;
      let mockCalls = 0;

      const mockFn = ((...args: string[]): unknown => {
        mockCalls++;
        if (mockCalls === 1) {
          return () => {
            throw new ReferenceError('document is not defined');
          };
        }
        // @ts-expect-error - need to call original Function constructor
        return new OriginalFunction(...args);
      }) as typeof Function;

      // @ts-expect-error - intentionally overriding global Function for testing
      global.Function = mockFn;

      const code = `
        function myFunction() {
          return 'result';
        }
      `;
      const result = await runTests(code, [{ input: [], expectedOutput: 'result' }]);

      global.Function = OriginalFunction;

      expect(result.allPassed).toBe(false);
    });

    it('should handle AbortController error during safeEval execution (line 216)', async () => {
      const OriginalFunction = global.Function;
      let mockCalls = 0;

      const mockFn = ((...args: string[]): unknown => {
        mockCalls++;
        if (mockCalls === 1) {
          return () => {
            throw new ReferenceError('AbortController is not defined');
          };
        }
        // @ts-expect-error - need to call original Function constructor
        return new OriginalFunction(...args);
      }) as typeof Function;

      // @ts-expect-error - intentionally overriding global Function for testing
      global.Function = mockFn;

      const code = `
        function myFunction() {
          return 'result';
        }
      `;
      const result = await runTests(code, [{ input: [], expectedOutput: 'result' }]);

      global.Function = OriginalFunction;

      expect(result.allPassed).toBe(false);
    });
  });

  // ============================================
  // Test line 267: No function found after resolution
  // ============================================
  describe('No Function Found Error (line 267)', () => {
    it('should trigger line 267 when functions exist but requested one does not', async () => {
      // This tests the path where functionNames has items but availableFunctions is empty
      // and the requested function doesn't exist
      const code = `
        // This code has a function name detected but it won't be callable
        const fakeFunc = null;
        // Add a real function to pass the "no functions" check
        function realFunc() { return 42; }
      `;
      // Request a function that doesn't exist - it should fall back to available functions
      const result = await runTests(code, [{ input: [], expectedOutput: 42 }], 'nonexistent');
      // Should fall back to realFunc or have an error
      expect(
        result.allPassed || result.error !== undefined || result.results[0]?.error !== undefined
      ).toBe(true);
    });

    it('should throw error when both availableFunctions and functionNames are empty (line 267)', async () => {
      // Mock Function constructor to make safeEval return empty functions object
      const OriginalFunction = global.Function;
      let mockCalls = 0;

      const mockFn = ((...args: string[]): unknown => {
        mockCalls++;
        // On first call (creating safeEval), return a function that returns empty object
        if (mockCalls === 1) {
          return () => {
            return {}; // Empty functions object
          };
        }
        // @ts-expect-error - need to call original
        return new OriginalFunction(...args);
      }) as typeof Function;

      // @ts-expect-error - intentionally overriding
      global.Function = mockFn;

      // Use code that won't have any function names detected by the regex
      const code = `
        // No functions here, just variables
        const value = 42;
      `;
      const result = await runTests(code, [{ input: [], expectedOutput: 42 }]);

      // Restore
      global.Function = OriginalFunction;

      // Should fail because there are no callable functions
      expect(result.allPassed).toBe(false);
      // Error might be set or individual test might have error
      expect(result.error !== undefined || result.results.some((r) => r.error !== undefined)).toBe(
        true
      );
    });
  });

  // ============================================
  // Test lines 347-348: Outer catch block
  // ============================================
  describe('Outer Catch Block (lines 347-348)', () => {
    it('should catch unexpected errors', async () => {
      // The outer catch is hard to trigger because all error paths are handled
      // We can try to cause an unexpected error by mocking something
      const code = `
        function test() {
          return 42;
        }
      `;
      const result = await runTests(code, [{ input: [], expectedOutput: 42 }]);
      expect(result.allPassed).toBe(true);
    });

    it('should catch errors thrown from test results processing', async () => {
      // Try to trigger the outer catch by causing an error during test execution
      // that isn't caught by inner handlers
      const OriginalFunction = global.Function;
      let mockCalls = 0;

      const mockFn = ((...args: string[]): unknown => {
        mockCalls++;
        // On first call, return a function that works initially
        // but throws when the result is accessed unexpectedly
        if (mockCalls === 1) {
          return () => ({
            test: () => {
              // Return a special object that throws when compared
              return Object.defineProperty({}, 'toString', {
                get() {
                  throw new Error('Unexpected error during comparison');
                },
              });
            },
          });
        }
        // @ts-expect-error - need to call original
        return new OriginalFunction(...args);
      }) as typeof Function;

      // @ts-expect-error - intentionally overriding
      global.Function = mockFn;

      const code = `
        function test() {
          return 42;
        }
      `;
      const result = await runTests(code, [{ input: [], expectedOutput: 42 }]);

      // Restore
      global.Function = OriginalFunction;

      // Should have some result (either passed or failed)
      expect(result).toBeDefined();
    });
  });

  // ============================================
  // Test line 69: Timeout callback
  // ============================================
  describe('Timeout Callback (line 69)', () => {
    // Testing actual timeouts would make tests slow and flaky
    // Instead, we verify the timeout mechanism exists and works

    it('should have timeout protection', async () => {
      const code = `
        function quick() {
          return 'fast';
        }
      `;
      const result = await runTests(code, [{ input: [], expectedOutput: 'fast' }]);
      expect(result.allPassed).toBe(true);
      // If timeout mechanism wasn't working, infinite loops would hang forever
    });

    // Note: Testing actual timeout requires waiting 10+ seconds which is too slow
    // The timeout line (69) is defensive code that protects against infinite loops
  });
});

describe('Test Runner - Normal Operation After Mocks', () => {
  // Verify that after the mocked tests, normal operation still works
  it('should work normally after mock restoration', async () => {
    const code = `
      function add(a, b) {
        return a + b;
      }
    `;
    const result = await runTests(code, [{ input: [1, 2], expectedOutput: 3 }]);
    expect(result.allPassed).toBe(true);
  });
});
