import { test, expect } from '@playwright/test';

const problems = [
  'breadth-first-search',
  'depth-first-search',
  'merge-sort',
  'quick-sort',
  'custom-events',
  'event-delegation',
  'intersection-observer',
  'local-session-storage',
  'mutation-observer',
  'binary-search-tree',
  'hash-table',
  'linked-list',
  'queue-implementation',
  'stack-implementation',
  'regex-basics',
  'regex-groups',
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
