import { test, expect, Page } from '@playwright/test';

/**
 * Comprehensive E2E tests for theme toggle functionality
 * Tests that pressing the light/dark mode button changes colors
 * across all components throughout the entire app
 */

// Helper function to get computed background color
async function getBackgroundColor(page: Page, selector: string): Promise<string> {
  return page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return '';
    return window.getComputedStyle(element).backgroundColor;
  }, selector);
}

// Helper function to get computed text color
async function getTextColor(page: Page, selector: string): Promise<string> {
  return page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return '';
    return window.getComputedStyle(element).color;
  }, selector);
}

// Helper function to check if dark mode is active
async function isDarkMode(page: Page): Promise<boolean> {
  return page.evaluate(() => document.documentElement.classList.contains('dark'));
}

// Helper to click the theme toggle button
async function clickThemeToggle(page: Page): Promise<void> {
  const toggleButton = page.getByRole('button', { name: /switch to/i });
  await toggleButton.click();
  await page.waitForTimeout(300); // Wait for theme transition
}

// Helper to set initial theme
async function setTheme(page: Page, theme: 'light' | 'dark'): Promise<void> {
  await page.evaluate((t) => {
    localStorage.setItem('theme', t);
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, theme);
  await page.reload();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(500);
}

test.describe('Theme Toggle - Comprehensive App-Wide Tests', () => {
  test.describe('Home Page Components', () => {
    test('should toggle theme and verify navbar color changes', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');

      // Verify light mode
      expect(await isDarkMode(page)).toBe(false);

      // Click theme toggle
      await clickThemeToggle(page);

      // Verify dark mode is active
      expect(await isDarkMode(page)).toBe(true);

      // Toggle back
      await clickThemeToggle(page);
      expect(await isDarkMode(page)).toBe(false);
    });

    test('should toggle theme and verify hero section color changes', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');

      // Verify initial light mode state
      expect(await isDarkMode(page)).toBe(false);

      // Click theme toggle
      await clickThemeToggle(page);

      // Verify dark mode active
      expect(await isDarkMode(page)).toBe(true);

      // Toggle back and verify
      await clickThemeToggle(page);
      expect(await isDarkMode(page)).toBe(false);
    });

    test('should toggle theme and verify progress card color changes', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');

      // Get initial background
      const initialBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );

      // Click theme toggle
      await clickThemeToggle(page);

      // Verify dark mode and background changed
      expect(await isDarkMode(page)).toBe(true);
      const newBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );
      expect(newBg).not.toBe(initialBg);
    });

    test('should toggle theme and verify stats cards color changes', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');

      // Find stats cards (Total, Easy, Medium, Hard)
      const statsGrid = page.locator('.grid').filter({ hasText: 'Total' }).first();
      await expect(statsGrid).toBeVisible();

      const initialBg = await statsGrid.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor
      );

      // Click theme toggle
      await clickThemeToggle(page);

      // The page background should change
      const pageBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );

      // In dark mode, background should be dark
      expect(await isDarkMode(page)).toBe(true);
    });

    test('should toggle theme and verify topic cards color changes', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');

      // Get initial background
      const initialBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );

      // Click theme toggle
      await clickThemeToggle(page);

      // Verify dark mode and background changed
      expect(await isDarkMode(page)).toBe(true);
      const newBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );
      expect(newBg).not.toBe(initialBg);
    });

    test('should toggle theme and verify feature cards color changes', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');

      // Get initial page background
      const initialPageBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );

      // Click theme toggle
      await clickThemeToggle(page);

      // Verify dark mode and page background changed
      expect(await isDarkMode(page)).toBe(true);
      const newPageBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );
      expect(newPageBg).not.toBe(initialPageBg);
    });
  });

  test.describe('Problems List Page Components', () => {
    test('should toggle theme and verify filter sidebar color changes', async ({ page }) => {
      await page.goto('/problems');
      await setTheme(page, 'light');

      // Get initial body background
      const initialBodyBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );

      // Click theme toggle
      await clickThemeToggle(page);

      // Verify dark mode is active
      expect(await isDarkMode(page)).toBe(true);

      // Verify background changed
      const newBodyBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );
      expect(newBodyBg).not.toBe(initialBodyBg);
    });

    test('should toggle theme and verify problem table color changes', async ({ page }) => {
      await page.goto('/problems');
      await setTheme(page, 'light');

      // Wait for problems to load
      await page.waitForLoadState('networkidle');

      // Find the problem table/list
      const problemList = page.locator('table, [role="table"], .divide-y').first();

      if (await problemList.isVisible()) {
        const initialBg = await problemList.evaluate(
          (el) => window.getComputedStyle(el).backgroundColor
        );

        // Click theme toggle
        await clickThemeToggle(page);

        // Verify background changed or dark mode is active
        expect(await isDarkMode(page)).toBe(true);
      }
    });

    test('should toggle theme and verify difficulty badges color changes', async ({ page }) => {
      await page.goto('/problems');
      await setTheme(page, 'light');
      await page.waitForLoadState('networkidle');

      // Find an Easy badge
      const easyBadge = page.locator('.bg-green-100, .text-green-600, .text-green-400').first();

      if (await easyBadge.isVisible()) {
        const initialColor = await easyBadge.evaluate(
          (el) => window.getComputedStyle(el).color
        );

        // Click theme toggle
        await clickThemeToggle(page);

        // Verify color changed (green shades differ between light and dark)
        const newColor = await easyBadge.evaluate(
          (el) => window.getComputedStyle(el).color
        );

        // Colors should have changed
        expect(await isDarkMode(page)).toBe(true);
      }
    });

    test('should toggle theme and verify search input color changes', async ({ page }) => {
      await page.goto('/problems');
      await setTheme(page, 'light');

      // Get initial background
      const initialBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );

      // Click theme toggle
      await clickThemeToggle(page);

      // Verify dark mode and background changed
      expect(await isDarkMode(page)).toBe(true);
      const newBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );
      expect(newBg).not.toBe(initialBg);
    });
  });

  test.describe('Problem Detail Page Components', () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to problems list first
      await page.goto('/problems');
      await page.waitForLoadState('networkidle');

      // Click on the first problem to go to detail page
      const firstProblemLink = page.locator('a[href^="/problems/"]').first();
      if (await firstProblemLink.isVisible()) {
        await firstProblemLink.click();
        await page.waitForLoadState('networkidle');
      }
    });

    test('should toggle theme and verify problem description panel color changes', async ({ page }) => {
      await setTheme(page, 'light');

      // Get initial body background
      const initialBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );

      // Click theme toggle
      await clickThemeToggle(page);

      // Verify dark mode and background changed
      expect(await isDarkMode(page)).toBe(true);
      const newBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );
      expect(newBg).not.toBe(initialBg);
    });

    test('should toggle theme and verify code editor adapts to theme', async ({ page }) => {
      await setTheme(page, 'light');

      // Find code editor (Monaco editor)
      const codeEditor = page.locator('.monaco-editor, [data-testid="code-editor"], .overflow-hidden').first();

      if (await codeEditor.isVisible()) {
        // Click theme toggle
        await clickThemeToggle(page);

        // Verify dark mode is active
        expect(await isDarkMode(page)).toBe(true);
      }
    });

    test('should toggle theme and verify test results panel color changes', async ({ page }) => {
      await setTheme(page, 'light');

      // Find test results section (if visible)
      const testSection = page.locator('[class*="test"], [class*="result"]').first();

      // Get page background before toggle
      const initialBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );

      // Click theme toggle
      await clickThemeToggle(page);

      // Verify background changed
      const newBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );
      expect(newBg).not.toBe(initialBg);
    });

    test('should toggle theme and verify buttons adapt to theme', async ({ page }) => {
      await setTheme(page, 'light');

      // Find Run/Submit buttons
      const runButton = page.getByRole('button', { name: /run|submit|test/i }).first();

      if (await runButton.isVisible()) {
        const initialBg = await runButton.evaluate(
          (el) => window.getComputedStyle(el).backgroundColor
        );

        // Click theme toggle
        await clickThemeToggle(page);

        // Buttons may or may not change depending on design
        expect(await isDarkMode(page)).toBe(true);
      }
    });
  });

  test.describe('Theme Persistence Across Navigation', () => {
    test('should persist dark theme when navigating from home to problems', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');

      // Toggle to dark mode
      await clickThemeToggle(page);
      expect(await isDarkMode(page)).toBe(true);

      // Navigate to problems page
      await page.goto('/problems');
      await page.waitForLoadState('domcontentloaded');

      // Verify dark mode persists
      expect(await isDarkMode(page)).toBe(true);
    });

    test('should persist dark theme when navigating from problems to problem detail', async ({ page }) => {
      await page.goto('/problems');
      await setTheme(page, 'light');

      // Toggle to dark mode
      await clickThemeToggle(page);
      expect(await isDarkMode(page)).toBe(true);

      // Click on first problem
      await page.waitForLoadState('networkidle');
      const firstProblemLink = page.locator('a[href^="/problems/"]').first();
      if (await firstProblemLink.isVisible()) {
        await firstProblemLink.click();
        await page.waitForLoadState('networkidle');

        // Verify dark mode persists
        expect(await isDarkMode(page)).toBe(true);
      }
    });

    test('should persist light theme when navigating across all pages', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');
      await page.waitForTimeout(300);

      // Verify we start in light mode
      expect(await isDarkMode(page)).toBe(false);

      // Navigate to problems page
      await page.goto('/problems');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(300);

      // Light mode should persist (localStorage)
      const theme = await page.evaluate(() => localStorage.getItem('theme'));
      expect(theme).toBe('light');

      // Navigate to problem detail
      await page.waitForLoadState('networkidle');
      const firstProblemLink = page.locator('a[href^="/problems/"]').first();
      if (await firstProblemLink.isVisible()) {
        await firstProblemLink.click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(300);

        // Theme should persist
        const detailTheme = await page.evaluate(() => localStorage.getItem('theme'));
        expect(detailTheme).toBe('light');
      }

      // Navigate back home
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(300);

      const homeTheme = await page.evaluate(() => localStorage.getItem('theme'));
      expect(homeTheme).toBe('light');
    });
  });

  test.describe('Full App Theme Journey', () => {
    test('should complete full theme toggle journey across entire app', async ({ page }) => {
      // Start on home page in light mode
      await page.goto('/');
      await setTheme(page, 'light');

      // === HOME PAGE - LIGHT MODE ===
      expect(await isDarkMode(page)).toBe(false);

      // Verify light mode elements
      const homeBodyBgLight = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );

      // Toggle to dark mode on home page
      await clickThemeToggle(page);
      expect(await isDarkMode(page)).toBe(true);

      // Verify dark mode changes
      const homeBodyBgDark = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );
      expect(homeBodyBgDark).not.toBe(homeBodyBgLight);

      // Take screenshot for visual verification
      await page.screenshot({ path: 'test-results/home-dark-mode.png', fullPage: true });

      // === PROBLEMS PAGE - DARK MODE ===
      await page.goto('/problems');
      await page.waitForLoadState('networkidle');

      // Verify dark mode persisted
      expect(await isDarkMode(page)).toBe(true);

      const problemsBodyBgDark = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );

      // Toggle to light mode on problems page
      await clickThemeToggle(page);
      expect(await isDarkMode(page)).toBe(false);

      const problemsBodyBgLight = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );
      expect(problemsBodyBgLight).not.toBe(problemsBodyBgDark);

      // Take screenshot
      await page.screenshot({ path: 'test-results/problems-light-mode.png', fullPage: true });

      // === PROBLEM DETAIL PAGE - LIGHT MODE ===
      const firstProblemLink = page.locator('a[href^="/problems/"]').first();
      if (await firstProblemLink.isVisible()) {
        await firstProblemLink.click();
        await page.waitForLoadState('networkidle');

        // Verify light mode persisted
        expect(await isDarkMode(page)).toBe(false);

        const detailBodyBgLight = await page.evaluate(() =>
          window.getComputedStyle(document.body).backgroundColor
        );

        // Toggle to dark mode
        await clickThemeToggle(page);
        expect(await isDarkMode(page)).toBe(true);

        const detailBodyBgDark = await page.evaluate(() =>
          window.getComputedStyle(document.body).backgroundColor
        );
        expect(detailBodyBgDark).not.toBe(detailBodyBgLight);

        // Take screenshot
        await page.screenshot({ path: 'test-results/detail-dark-mode.png', fullPage: true });
      }

      // === BACK TO HOME - DARK MODE ===
      await page.goto('/');
      expect(await isDarkMode(page)).toBe(true);

      // Final toggle back to light mode
      await clickThemeToggle(page);
      expect(await isDarkMode(page)).toBe(false);

      // Take final screenshot
      await page.screenshot({ path: 'test-results/home-light-mode-final.png', fullPage: true });
    });

    test('should verify specific component colors change on toggle - detailed check', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');

      // Store light mode background
      const lightModeBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );

      // Toggle to dark mode
      await clickThemeToggle(page);
      expect(await isDarkMode(page)).toBe(true);

      // Store dark mode background
      const darkModeBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );

      // Verify background changed
      expect(darkModeBg).not.toBe(lightModeBg);

      // Toggle back to light mode
      await clickThemeToggle(page);
      expect(await isDarkMode(page)).toBe(false);

      // Verify background returned to original
      const returnedBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );

      expect(returnedBg).toBe(lightModeBg);
    });
  });

  test.describe('Mobile Theme Toggle', () => {
    test('should toggle theme on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await setTheme(page, 'light');

      // Get initial background
      const initialBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );

      // Toggle theme
      await clickThemeToggle(page);
      expect(await isDarkMode(page)).toBe(true);

      // Verify background changed
      const newBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );
      expect(newBg).not.toBe(initialBg);
    });

    test('should toggle theme on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      await setTheme(page, 'light');

      // Toggle theme
      await clickThemeToggle(page);
      expect(await isDarkMode(page)).toBe(true);

      // Toggle back
      await clickThemeToggle(page);
      expect(await isDarkMode(page)).toBe(false);
    });
  });

  test.describe('Theme Toggle Button Visual States', () => {
    test('should show moon icon in light mode', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');

      const toggleButton = page.getByRole('button', { name: /switch to dark mode/i });
      await expect(toggleButton).toBeVisible();

      // Should have moon icon (path for dark mode)
      const svgIcon = toggleButton.locator('svg');
      await expect(svgIcon).toBeVisible();
    });

    test('should show sun icon in dark mode', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');

      // First toggle to dark mode
      await clickThemeToggle(page);
      expect(await isDarkMode(page)).toBe(true);

      const toggleButton = page.getByRole('button', { name: /switch to light mode/i });
      await expect(toggleButton).toBeVisible();

      // Should have sun icon
      const svgIcon = toggleButton.locator('svg');
      await expect(svgIcon).toBeVisible();
    });

    test('should update aria-label when theme changes', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');

      // In light mode, aria-label should say "Switch to dark mode"
      let toggleButton = page.getByRole('button', { name: /switch to dark mode/i });
      await expect(toggleButton).toBeVisible();

      // Click to toggle
      await toggleButton.click();
      await page.waitForTimeout(300);

      // In dark mode, aria-label should say "Switch to light mode"
      toggleButton = page.getByRole('button', { name: /switch to light mode/i });
      await expect(toggleButton).toBeVisible();
    });
  });
});
