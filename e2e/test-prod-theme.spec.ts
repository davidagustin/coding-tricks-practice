import { test, expect } from '@playwright/test';

test.describe('Local Theme Toggle Test', () => {
  test('Test full theme toggle cycle locally with screenshots', async ({ page }) => {
    // Test against localhost (dev server started by Playwright)
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    console.log('\n=== STEP 1: Initial State ===');
    let isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    let bg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    console.log('Dark mode:', isDark, '| Background:', bg);

    // Screenshot 1: Initial state
    await page.screenshot({ path: 'test-results/local-1-initial.png', fullPage: true });
    console.log('Screenshot saved: test-results/local-1-initial.png');

    // Find toggle
    const toggleButton = page.getByRole('button', { name: /switch to/i });
    await expect(toggleButton).toBeVisible();

    console.log('\n=== STEP 2: Click to toggle (should go to dark) ===');
    await toggleButton.click();
    await page.waitForTimeout(1000);
    isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    bg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    let theme = await page.evaluate(() => localStorage.getItem('theme'));
    console.log('Dark mode:', isDark, '| Background:', bg, '| localStorage:', theme);

    // Screenshot 2: After first toggle (should be dark)
    await page.screenshot({ path: 'test-results/local-2-after-toggle-dark.png', fullPage: true });
    console.log('Screenshot saved: test-results/local-2-after-toggle-dark.png');

    console.log('\n=== STEP 3: Click again (should go back to light) ===');
    await toggleButton.click();
    await page.waitForTimeout(1000);
    isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    bg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    theme = await page.evaluate(() => localStorage.getItem('theme'));
    console.log('Dark mode:', isDark, '| Background:', bg, '| localStorage:', theme);

    // Screenshot 3: After second toggle (should be light)
    await page.screenshot({ path: 'test-results/local-3-after-toggle-light.png', fullPage: true });
    console.log('Screenshot saved: test-results/local-3-after-toggle-light.png');

    console.log('\n=== DONE ===');
  });
});
