import { expect, test } from '@playwright/test';

const problems = [
  'string-replace-replaceall',
  'string-slice-substring',
  'string-template-tricks',
  'symbol-usage',
  'tagged-template-literals',
  'type-aliases',
  'type-assertions',
  'type-guards',
  'type-narrowing',
  'union-intersection',
  'utility-types-basic',
  'keyof-typeof',
  'function-overloads',
  'weak-collections',
  'weakmap-weakset',
  'binary-search',
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
