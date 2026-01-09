import { expect, test } from '@playwright/test';

const problems = [
  'array-at-method',
  'array-findlast-findlastindex',
  'array-toSorted-toReversed',
  'array-intersection-difference',
  'try-catch-patterns',
  'custom-errors',
  'async-error-handling',
  'error-boundaries-pattern',
  'graceful-degradation',
  'singleton-pattern',
  'factory-pattern',
  'observer-pattern',
  'decorator-pattern',
  'strategy-pattern',
  'mock-functions',
  'test-doubles',
];

for (const id of problems) {
  test.describe(`Problem: ${id}`, () => {
    test('loads page and runs tests', async ({ page }) => {
      await page.goto(`/problems/${id}`);
      await expect(page.locator('h1')).toBeVisible();
      await page.waitForSelector('.monaco-editor', { timeout: 15000 });
      await page.click('button:has-text("Run Tests")');
      await expect(page.locator('text=/Test Results|passed|failed|Error/i')).toBeVisible({
        timeout: 15000,
      });
    });
  });
}
