import { test, expect } from '@playwright/test';

const problems = [
  'property-descriptors',
  'prototype-chain',
  'proxy-api',
  'proxy-traps',
  'reduce-grouping',
  'reduce-patterns',
  'reduce-right',
  'reflect-api',
  'retry-pattern',
  'short-circuit-evaluation',
  'some-every',
  'sort-comparators',
  'spread-operator-patterns',
  'spread-operator-tricks',
  'string-normalize-unicode',
  'string-padding',
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
