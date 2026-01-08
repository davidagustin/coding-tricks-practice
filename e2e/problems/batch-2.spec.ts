import { test, expect } from '@playwright/test';

const problems = [
  'enums',
  'error-boundaries',
  'event-loop',
  'find-vs-filter',
  'generator-functions',
  'generics-basic',
  'infer-keyword',
  'interfaces',
  'map-deduplication',
  'mapped-types',
  'memoization',
  'memory-management',
  'object-assign-deep',
  'object-entries',
  'object-freeze-seal',
  'object-fromentries',
];

for (const id of problems) {
  test.describe(`Problem: ${id}`, () => {
    test('loads page and runs tests', async ({ page }) => {
      await page.goto(`/problems/${id}`);
      await expect(page.locator('h1')).toBeVisible();
      await page.waitForSelector('.monaco-editor', { timeout: 15000 });
      await page.click('button:has-text("Run Tests")');
      await expect(page.locator('text=/Test Results|passed|failed|Error/i')).toBeVisible({ timeout: 15000 });
    });
  });
}
