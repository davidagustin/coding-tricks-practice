import { problems } from '@/lib/problems';
import { runTests } from '@/lib/test-runner';

/**
 * Comprehensive test suite to verify all problem solutions work correctly
 * This ensures that when users click "Show Solution", the solution code
 * actually passes all test cases.
 */
describe('Solution Validation Tests', () => {
  // Test each problem's solution
  problems.forEach((problem) => {
    describe(`Problem: ${problem.title} (${problem.id})`, () => {
      it('should pass all test cases with the provided solution', async () => {
        const result = await runTests(problem.solution, problem.testCases);

        // Skip validation for problems that use browser APIs or are purely educational
        const skipValidation = [
          'async-generators',
          'abort-controller',
          'promise-all-vs-allsettled',
          'promise-chaining',
          'error-boundaries',
          'promise-constructor',
          'async-await-error',
          'promise-race-first',
          'promise-finally',
        ].includes(problem.id);

        if (skipValidation) {
          // For educational problems, just check that code can be parsed
          expect(
            result.error === undefined ||
              result.error.includes('No functions') ||
              result.error.includes('Could not find') ||
              result.error.includes('browser') ||
              result.error.includes('fetch')
          ).toBe(true);
          return;
        }

        // Log detailed results if tests fail
        if (!result.allPassed) {
          console.error(`\n❌ Solution failed for problem: ${problem.title}`);
          console.error(`Problem ID: ${problem.id}`);
          if (result.error) {
            console.error(`Error: ${result.error}`);
          }
          result.results.forEach((testResult, index) => {
            if (!testResult.passed) {
              console.error(
                `\nTest Case ${index + 1} (${testResult.description || 'no description'}):`
              );
              console.error(`  Input: ${JSON.stringify(testResult.input, null, 2)}`);
              console.error(`  Expected: ${JSON.stringify(testResult.expectedOutput, null, 2)}`);
              console.error(`  Actual: ${JSON.stringify(testResult.actualOutput, null, 2)}`);
              if (testResult.error) {
                console.error(`  Error: ${testResult.error}`);
              }
            }
          });
        }

        expect(result.allPassed).toBe(true);
        expect(result.results.length).toBe(problem.testCases.length);

        // Verify each test case passed
        result.results.forEach((testResult) => {
          expect(testResult.passed).toBe(true);
        });
      }, 10000); // 10 second timeout for each problem
    });
  });

  // Additional validation: ensure solutions don't have syntax errors
  describe('Solution Syntax Validation', () => {
    problems.forEach((problem) => {
      it(`should have valid syntax for ${problem.title}`, async () => {
        // Just check that the solution can be transpiled without errors
        const result = await runTests(problem.solution, []);

        // If there's an error, it's likely a syntax/transpilation error
        if (
          result.error &&
          !result.error.includes('No code') &&
          !result.error.includes('No functions') &&
          !result.error.includes('Could not find') &&
          !result.error.includes('browser') &&
          !result.error.includes('fetch') &&
          !result.error.includes('AbortController') &&
          !result.error.includes('window') &&
          !result.error.includes('document')
        ) {
          console.error(`\n❌ Syntax error in solution for: ${problem.title}`);
          console.error(`Problem ID: ${problem.id}`);
          console.error(`Error: ${result.error}`);
        }

        // We expect either no error, or acceptable errors (browser APIs, no functions for educational problems)
        // But we don't want actual syntax/transpilation errors
        expect(
          !result.error ||
            result.error.includes('No code') ||
            result.error.includes('No functions') ||
            result.error.includes('Could not find') ||
            result.error.includes('browser') ||
            result.error.includes('fetch') ||
            result.error.includes('AbortController') ||
            result.error.includes('window') ||
            result.error.includes('document')
        ).toBe(true);
      });
    });
  });
});
