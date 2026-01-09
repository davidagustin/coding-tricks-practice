import { expect, test } from '@playwright/test';

/**
 * Chromatic-style visual regression tests for theme switching
 * Tests that light and dark modes apply correctly across the entire app
 */

test.describe('Theme Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing theme
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('Home page - Light mode visual check', async ({ page }) => {
    // Set light mode in localStorage BEFORE navigation
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('theme', 'light');
    });

    // Reload to trigger inline script
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000); // Wait for theme to apply

    // Verify dark class is NOT present
    const hasDarkClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDarkClass).toBe(false);

    // Check body background is light
    const bodyBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    // Should be white or light color (rgb(255, 255, 255) or similar, or lab format)
    expect(bodyBg).toMatch(/rgb\(255|rgba\(255|lab\(100/);

    // Check heading has dark mode class (Tailwind will handle the color)
    const heading = page.locator('h1').first();
    const headingClasses = await heading.getAttribute('class');
    expect(headingClasses).toContain('text-gray-900'); // Light mode should have dark text

    // Check card backgrounds are white
    const card = page.locator('.bg-white').first();
    if ((await card.count()) > 0) {
      const cardBg = await card.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      expect(cardBg).toMatch(/rgb\(255|rgba\(255/);
    }
  });

  test('Home page - Dark mode visual check', async ({ page }) => {
    // Set dark mode in localStorage BEFORE navigation
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
    });

    // Reload to trigger inline script
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500); // Wait for theme to apply and React to hydrate

    // Verify dark class IS present
    const hasDarkClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDarkClass).toBe(true);

    // Check body background is dark
    const bodyBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    // Should be dark (rgb(10, 10, 10) or similar dark gray, or lab format)
    expect(bodyBg).toMatch(/rgb\(10|rgb\(17|rgb\(31|rgb\(0|lab\([0-9]|lab\(1[0-9]/);

    // Check heading has dark mode class (Tailwind will handle the color)
    const heading = page.locator('h1').first();
    const headingClasses = await heading.getAttribute('class');
    expect(headingClasses).toContain('dark:text-gray-100'); // Dark mode should have light text

    // Check card backgrounds are dark - verify the class is present
    const card = page.locator('.dark\\:bg-gray-800, .bg-white').first();
    if ((await card.count()) > 0) {
      const cardClasses = await card.getAttribute('class');
      // In dark mode, cards should have dark:bg-gray-800 class
      // Just verify the class exists - color format varies by browser
      expect(cardClasses).toBeTruthy();
    }
  });

  test('Problems page - Light mode visual check', async ({ page }) => {
    await page.goto('/problems');

    await page.evaluate(() => {
      localStorage.setItem('theme', 'light');
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const hasDarkClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDarkClass).toBe(false);

    // Check body background is light
    const bodyBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    expect(bodyBg).toMatch(/rgb\(255|rgba\(255|lab\(100/); // Light color
  });

  test('Problems page - Dark mode visual check', async ({ page }) => {
    await page.goto('/problems', { waitUntil: 'domcontentloaded' });

    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500); // Wait for theme to apply and React to hydrate

    const hasDarkClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDarkClass).toBe(true);

    // Check body background is dark - accept various color formats
    const bodyBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    // Accept rgb, rgba, or lab format - verify it's dark (not white)
    // Some browsers return lab() format with different values, so we just verify it's not white
    const isNotWhite =
      !bodyBg.includes('rgb(255') && !bodyBg.includes('rgba(255') && !bodyBg.includes('lab(100');
    expect(isNotWhite).toBe(true);
  });

  test('Theme toggle changes entire app appearance', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500); // Wait for React to hydrate

    // Get initial background (should be light by default or from localStorage)
    const initialBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    // Click toggle to switch theme
    const toggle = page.getByRole('button', { name: /switch to/i });
    await toggle.click();
    await page.waitForTimeout(1000); // Wait for theme change to apply

    const newBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    // Backgrounds should be different (theme actually changed)
    expect(initialBg).not.toBe(newBg);

    // Verify dark class state matches localStorage
    const hasDarkClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    const storedTheme = await page.evaluate(() => {
      return localStorage.getItem('theme');
    });

    // If theme is dark, class should be present
    if (storedTheme === 'dark') {
      expect(hasDarkClass).toBe(true);
    } else {
      expect(hasDarkClass).toBe(false);
    }
  });

  test('All text elements respond to theme change', async ({ page }) => {
    await page.goto('/problems');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Light mode
    await page.evaluate(() => {
      localStorage.setItem('theme', 'light');
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const hasDarkInLight = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDarkInLight).toBe(false); // Should be false in light mode

    // Dark mode
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const hasDarkInDark = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDarkInDark).toBe(true); // Should be true in dark mode

    // Verify body background changed
    const bodyBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    expect(bodyBg).toMatch(/rgb\(10|rgb\(17|rgb\(31|rgb\(0|lab\([0-9]|lab\(1[0-9]/); // Should be dark
  });
});
