import { test, expect } from '@playwright/test';

/**
 * E2E tests for problems batch 1
 * Tests problem pages load correctly, Monaco editor loads, and tests can be run
 */

const problemIds = [
  'abort-controller',
  'array-chaining',
  'array-from-tricks',
  'array-from',
  'async-await-error',
  'async-generators',
  'async-iteration',
  'async-mutex',
  'basic-typescript-types',
  'branded-types',
  'chunk-arrays',
  'closures-advanced',
  'computed-property-names',
  'conditional-types',
  'currying',
  'debounce-throttle',
];

test.describe('Problems Batch 1 - Page Load and Editor Tests', () => {
  for (const problemId of problemIds) {
    test.describe(`Problem: ${problemId}`, () => {
      test(`should load problem page for ${problemId}`, async ({ page }) => {
        await page.goto(`/problems/${problemId}`);
        await expect(page).toHaveURL(`/problems/${problemId}`);

        // Verify page has loaded with a heading
        const heading = page.getByRole('heading', { level: 1 });
        await expect(heading).toBeVisible();
      });

      test(`should load Monaco editor for ${problemId}`, async ({ page }) => {
        await page.goto(`/problems/${problemId}`);

        // Wait for Monaco editor to load
        const monacoEditor = page.locator('.monaco-editor');
        await expect(monacoEditor.first()).toBeVisible({ timeout: 15000 });
      });

      test(`should run tests and display results for ${problemId}`, async ({ page }) => {
        await page.goto(`/problems/${problemId}`);

        // Wait for Monaco editor to load
        const monacoEditor = page.locator('.monaco-editor');
        await monacoEditor.first().waitFor({ timeout: 15000 });

        // Wait for editor to be fully ready
        await page.waitForTimeout(1000);

        // Click Run Tests button
        const runTestsButton = page.getByRole('button', { name: /Run Tests/i });
        await expect(runTestsButton).toBeVisible();
        await runTestsButton.click();

        // Wait for tests to complete
        await page.waitForTimeout(5000);

        // Verify test results appear (one of these conditions should be true)
        const hasPassedMessage = await page
          .getByText(/All tests passed/i)
          .isVisible()
          .catch(() => false);
        const hasFailedMessage = await page
          .getByText(/Some tests failed/i)
          .isVisible()
          .catch(() => false);
        const hasError = await page
          .locator('.bg-red-50, .bg-red-900\\/20')
          .first()
          .isVisible()
          .catch(() => false);
        const hasTestCase = await page
          .getByText(/Test Case \d+/i)
          .first()
          .isVisible()
          .catch(() => false);
        const noResultsGone = !(await page
          .getByText(/No test results yet/i)
          .isVisible()
          .catch(() => true));

        // At least one of these should be true (tests ran and produced some output)
        expect(
          hasPassedMessage || hasFailedMessage || hasError || hasTestCase || noResultsGone
        ).toBeTruthy();
      });
    });
  }
});
