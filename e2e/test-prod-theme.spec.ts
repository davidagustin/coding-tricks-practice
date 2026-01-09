import { expect, test } from '@playwright/test';

test.describe('Production Theme Toggle Test', () => {
  test('Should default to dark mode for new users', async ({ page }) => {
    // Clear localStorage to simulate new user
    await page.goto('https://coding-tricks-practice.vercel.app/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Check that it defaults to dark mode
    const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    const theme = await page.evaluate(() => localStorage.getItem('theme'));
    const bg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);

    console.log('Default dark mode:', isDark);
    console.log('localStorage theme:', theme);
    console.log('Background:', bg);

    await page.screenshot({ path: 'test-results/prod-default-dark.png', fullPage: true });

    expect(isDark).toBe(true);
    expect(theme).toBe('dark');
  });

  test('Should be able to toggle to light mode', async ({ page }) => {
    await page.goto('https://coding-tricks-practice.vercel.app/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Should start in dark mode
    let isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(isDark).toBe(true);

    // Click toggle to switch to light
    const toggleButton = page.getByRole('button', { name: /switch to light/i });
    await toggleButton.click();
    await page.waitForTimeout(500);

    // Should now be light mode
    isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    const theme = await page.evaluate(() => localStorage.getItem('theme'));

    console.log('After toggle - dark mode:', isDark);
    console.log('After toggle - theme:', theme);

    await page.screenshot({ path: 'test-results/prod-toggled-light.png', fullPage: true });

    expect(isDark).toBe(false);
    expect(theme).toBe('light');
  });
});
