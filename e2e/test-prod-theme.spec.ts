import { test, expect } from '@playwright/test';

test.describe('Production Theme Toggle Test', () => {
  test('Test dark mode on production after fix', async ({ page }) => {
    await page.goto('https://coding-tricks-practice.vercel.app/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    console.log('\n=== STEP 1: Initial State ===');
    await page.screenshot({ path: 'test-results/prod-fix-1-initial.png', fullPage: true });

    const toggleButton = page.getByRole('button', { name: /switch to/i });
    await expect(toggleButton).toBeVisible();

    console.log('\n=== STEP 2: Click to toggle to dark ===');
    await toggleButton.click();
    await page.waitForTimeout(1000);

    const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    const bg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    console.log('Dark mode:', isDark, '| Background:', bg);

    await page.screenshot({ path: 'test-results/prod-fix-2-dark.png', fullPage: true });

    expect(isDark).toBe(true);
    console.log('\n=== TEST PASSED ===');
  });
});
