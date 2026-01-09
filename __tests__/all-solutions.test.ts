/**
 * Comprehensive test suite to verify all problem solutions pass their test cases.
 * This tests the solution code directly against the test-runner without needing a browser.
 */

import { problems } from '../lib/problems';
import { runTests } from '../lib/test-runner';

// Increase timeout for all tests since some problems have async operations
jest.setTimeout(30000);

// Problems that require browser APIs and cannot be tested in Node.js
const BROWSER_ONLY_PROBLEMS = [
  'abort-controller', // requires fetch, AbortController
  'intersection-observer', // requires IntersectionObserver
  'mutation-observer', // requires MutationObserver
  'local-session-storage', // requires localStorage, sessionStorage
  'custom-events', // requires CustomEvent, document
  'event-delegation', // requires document, addEventListener
  'web-workers', // requires Worker
  'async-await-error', // requires fetch
  'retry-pattern', // requires fetch
  'promise-race-timeout', // requires fetch
  'promise-constructor', // test cases designed for fetch-based scenarios
  'top-level-await', // requires fetch
  'temporal-api', // Temporal API not available in Node.js
];

describe('All Problem Solutions', () => {
  // Test each problem's solution
  for (const problem of problems) {
    const isBrowserOnly = BROWSER_ONLY_PROBLEMS.includes(problem.id);

    describe(`${problem.title} (${problem.id})`, () => {
      if (isBrowserOnly) {
        it.skip('should pass all test cases with the solution code (requires browser APIs)', async () => {
          // Skipped - requires browser APIs
        });
      } else {
        it('should pass all test cases with the solution code', async () => {
          const result = await runTests(problem.solution, problem.testCases);

          // If there's an error, include it in the failure message
          if (result.error) {
            console.log(`Error for ${problem.id}:`, result.error);
          }

          // Show detailed results for failing tests
          if (!result.allPassed) {
            const failedTests = result.results.filter((r) => !r.passed);
            for (const failed of failedTests) {
              console.log(`\nFailed test for ${problem.id}:`);
              console.log(`  Description: ${failed.description}`);
              console.log(`  Input: ${JSON.stringify(failed.input)}`);
              console.log(`  Expected: ${JSON.stringify(failed.expectedOutput)}`);
              console.log(`  Actual: ${JSON.stringify(failed.actualOutput)}`);
              if (failed.error) {
                console.log(`  Error: ${failed.error}`);
              }
            }
          }

          expect(result.allPassed).toBe(true);
        });
      }
    });
  }
});
