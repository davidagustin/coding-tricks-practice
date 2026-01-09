import { test, expect } from '@playwright/test';

const problemIds = [
  'async-testing',
  'test-driven-development',
  'property-based-testing',
  'big-o-analysis',
  'lazy-evaluation',
  'batch-processing',
  'caching-strategies',
  'web-workers',
  'iterators-iterables',
  'private-class-fields',
  'static-blocks',
  'top-level-await',
  'logical-assignment',
  'number-methods',
  'math-object',
  'bigint-usage',
];

test.describe('Problems Batch 9', () => {
  for (const problemId of problemIds) {
    test.describe(`Problem: ${problemId}`, () => {
      test('should load the problem page', async ({ page }) => {
        await page.goto(`/problems/${problemId}`);
        await expect(page).toHaveURL(`/problems/${problemId}`);
      });

      test('should load the Monaco editor', async ({ page }) => {
        await page.goto(`/problems/${problemId}`);
        const monacoEditor = page.locator('.monaco-editor');
        await expect(monacoEditor.first()).toBeVisible({ timeout: 15000 });
      });

      test('should run tests and display results', async ({ page }) => {
        await page.goto(`/problems/${problemId}`);

        // Wait for Monaco editor to load
        await page.locator('.monaco-editor').first().waitFor({ timeout: 15000 });

        // Wait for editor to be fully ready
        await page.waitForTimeout(1000);

        // Click Run Tests button
        const runTestsButton = page.getByRole('button', { name: /Run Tests/i });
        await runTestsButton.click();

        // Wait for tests to complete
        await page.waitForTimeout(5000);

        // Test results should be displayed after tests run
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
          .catch(() => false));

        // At least one of these should be true (tests ran and produced some output)
        expect(
          hasPassedMessage || hasFailedMessage || hasError || hasTestCase || noResultsGone
        ).toBeTruthy();
      });
    });
  }
});
