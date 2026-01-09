import { expect, test } from '@playwright/test';

const problems = [
  'floating-point',
  'number-formatting',
  'date-basics',
  'date-arithmetic',
  'date-formatting',
  'timezone-handling',
  'temporal-api',
  'json-parse-stringify',
  'json-replacer-reviver',
  'circular-references',
  'deep-clone-json',
  'custom-serialization',
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
