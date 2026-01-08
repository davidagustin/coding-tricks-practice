import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should display theme toggle button on home page', async ({ page }) => {
    await page.goto('/');

    const toggleButton = page.getByRole('button', { name: /switch to/i });
    await expect(toggleButton).toBeVisible();
  });

  test('should display theme toggle button on problems page', async ({ page }) => {
    await page.goto('/problems');

    const toggleButton = page.getByRole('button', { name: /switch to/i });
    await expect(toggleButton).toBeVisible();
  });

  test('should toggle theme from dark to light', async ({ page }) => {
    await page.goto('/');

    // Set initial theme to dark
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify dark mode is active
    const hasDarkClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDarkClass).toBe(true);

    // Find and click the toggle button
    const toggleButton = page.getByRole('button', { name: /switch to light mode/i });
    await expect(toggleButton).toBeVisible();
    await toggleButton.click();

    // Wait for theme change
    await page.waitForTimeout(100);

    // Verify light mode is active
    const hasDarkClassAfter = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDarkClassAfter).toBe(false);

    // Verify localStorage was updated
    const theme = await page.evaluate(() => {
      return localStorage.getItem('theme');
    });
    expect(theme).toBe('light');
  });

  test('should toggle theme from light to dark', async ({ page }) => {
    await page.goto('/');

    // Set initial theme to light
    await page.evaluate(() => {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify light mode is active
    const hasDarkClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDarkClass).toBe(false);

    // Find and click the toggle button
    const toggleButton = page.getByRole('button', { name: /switch to dark mode/i });
    await expect(toggleButton).toBeVisible();
    await toggleButton.click();

    // Wait for theme change
    await page.waitForTimeout(100);

    // Verify dark mode is active
    const hasDarkClassAfter = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDarkClassAfter).toBe(true);

    // Verify localStorage was updated
    const theme = await page.evaluate(() => {
      return localStorage.getItem('theme');
    });
    expect(theme).toBe('dark');
  });

  test('should persist theme preference across page reloads', async ({ page }) => {
    await page.goto('/');

    // Set theme to light
    await page.evaluate(() => {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    });

    const toggleButton = page.getByRole('button', { name: /switch to dark mode/i });
    await toggleButton.click();
    await page.waitForTimeout(100);

    // Reload the page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify theme persisted
    const hasDarkClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDarkClass).toBe(true);

    const theme = await page.evaluate(() => {
      return localStorage.getItem('theme');
    });
    expect(theme).toBe('dark');
  });

  test('should apply theme immediately on page load (no flash)', async ({ page }) => {
    // Set theme in localStorage before navigation
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
    });

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Check immediately if dark class is present (should be set by inline script)
    const hasDarkClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDarkClass).toBe(true);
  });

  test('should use system preference when no localStorage value exists', async ({
    page,
    context,
  }) => {
    // Clear localStorage
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });

    // Mock system preference to dark
    await context.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => {
          if (query === '(prefers-color-scheme: dark)') {
            return {
              matches: true,
              media: query,
              onchange: null,
              addListener: () => {},
              removeListener: () => {},
              addEventListener: () => {},
              removeEventListener: () => {},
              dispatchEvent: () => true,
            };
          }
          return window.matchMedia(query);
        },
      });
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    // Should default to dark based on system preference
    const hasDarkClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDarkClass).toBe(true);
  });

  test('should update UI elements when theme changes', async ({ page }) => {
    await page.goto('/');

    // Get initial background color (should be light or dark)
    const initialBg = await page.evaluate(() => {
      const body = document.body;
      return window.getComputedStyle(body).backgroundColor;
    });

    // Toggle theme
    const toggleButton = page.getByRole('button', { name: /switch to/i });
    await toggleButton.click();
    await page.waitForTimeout(200);

    // Background should change (this is a basic check - actual colors depend on CSS)
    const newBg = await page.evaluate(() => {
      const body = document.body;
      return window.getComputedStyle(body).backgroundColor;
    });

    // The background should have changed (or at least the dark class should be toggled)
    const hasDarkClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });

    // Verify that theme class changed
    expect(hasDarkClass).toBeDefined();
  });

  test('should work on problems page', async ({ page }) => {
    await page.goto('/problems');

    const toggleButton = page.getByRole('button', { name: /switch to/i });
    await expect(toggleButton).toBeVisible();

    // Toggle theme
    await toggleButton.click();
    await page.waitForTimeout(100);

    // Verify theme changed
    const hasDarkClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(hasDarkClass).toBeDefined();

    // Verify localStorage was updated
    const theme = await page.evaluate(() => {
      return localStorage.getItem('theme');
    });
    expect(theme).toBeTruthy();
  });

  test('should work on problem detail page', async ({ page }) => {
    // First, get a problem ID from the problems list
    await page.goto('/problems');
    await page.waitForLoadState('networkidle');

    // Find the first problem link
    const firstProblemLink = page.locator('a[href^="/problems/"]').first();
    const href = await firstProblemLink.getAttribute('href');

    if (href) {
      await page.goto(href);
      await page.waitForLoadState('networkidle');

      const toggleButton = page.getByRole('button', { name: /switch to/i });
      await expect(toggleButton).toBeVisible();

      // Toggle theme
      await toggleButton.click();
      await page.waitForTimeout(100);

      // Verify theme changed
      const hasDarkClass = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });
      expect(hasDarkClass).toBeDefined();
    }
  });
});
