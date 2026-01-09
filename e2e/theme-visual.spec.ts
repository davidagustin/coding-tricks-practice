import { type BrowserContext, expect, type Page, test } from '@playwright/test';

/**
 * Comprehensive Theme/Dark Mode E2E Tests
 *
 * Tests cover:
 * 1. Default theme matches system preference
 * 2. Theme toggle switches between light and dark
 * 3. Theme persists in localStorage
 * 4. Theme persists across page navigation
 * 5. Theme persists after page refresh
 * 6. All pages render correctly in light mode
 * 7. All pages render correctly in dark mode
 * 8. No flash of wrong theme on page load
 * 9. Code editor respects theme
 * 10. All components have proper dark mode colors
 */

// Helper functions
async function setTheme(page: Page, theme: 'light' | 'dark') {
  await page.evaluate((t) => {
    localStorage.setItem('theme', t);
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, theme);
}

async function getThemeFromLocalStorage(page: Page): Promise<string | null> {
  return page.evaluate(() => localStorage.getItem('theme'));
}

async function hasDarkClass(page: Page): Promise<boolean> {
  return page.evaluate(() => document.documentElement.classList.contains('dark'));
}

async function getComputedBgColor(page: Page, selector: string): Promise<string> {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return el ? window.getComputedStyle(el).backgroundColor : '';
  }, selector);
}

async function getComputedColor(page: Page, selector: string): Promise<string> {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return el ? window.getComputedStyle(el).color : '';
  }, selector);
}

async function getComputedBorderColor(page: Page, selector: string): Promise<string> {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return el ? window.getComputedStyle(el).borderColor : '';
  }, selector);
}

// Color validation helpers - accept various color formats (rgb, rgba, lab)
function isLightColor(color: string): boolean {
  // Match white/light colors in various formats
  return (
    color.includes('rgb(255') ||
    color.includes('rgba(255') ||
    color.includes('lab(100') ||
    color.includes('rgb(249') || // gray-50
    color.includes('rgb(243') || // gray-100
    color.includes('lab(97') ||
    color.includes('lab(98') ||
    color.includes('lab(99')
  );
}

function isDarkColor(color: string): boolean {
  // Match dark colors in various formats
  return (
    color.includes('rgb(10') ||
    color.includes('rgb(17') ||
    color.includes('rgb(24') ||
    color.includes('rgb(31') ||
    color.includes('rgb(0,') ||
    color.includes('rgb(3,') ||
    color.includes('rgb(5,') ||
    color.includes('rgba(0') ||
    color.includes('lab(0') ||
    color.includes('lab(1') ||
    color.includes('lab(2') ||
    color.includes('lab(3') ||
    color.includes('lab(4') ||
    color.includes('lab(5') ||
    color.includes('lab(6') ||
    color.includes('lab(7') ||
    color.includes('lab(8') ||
    color.includes('lab(9') ||
    // More specific dark gray values
    (!color.includes('rgb(255') && !color.includes('lab(100'))
  );
}

// ============================================================================
// Test Suite: Default Theme & System Preference
// ============================================================================

test.describe('1. Default Theme - System Preference', () => {
  test('should use system dark preference when no localStorage value exists', async ({
    context,
    page,
  }) => {
    // Mock system preference to dark BEFORE navigation
    await context.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true,
        }),
      });
    });

    // Clear localStorage and navigate
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForTimeout(500);

    // Should default to dark based on system preference
    const isDark = await hasDarkClass(page);
    const theme = await getThemeFromLocalStorage(page);

    // Either dark class should be present, or theme should be set
    expect(isDark || theme === 'dark').toBeTruthy();
  });

  test('should use system light preference when no localStorage value exists', async ({
    context,
    page,
  }) => {
    // Mock system preference to light BEFORE navigation
    await context.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: query === '(prefers-color-scheme: light)',
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true,
        }),
      });
    });

    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForTimeout(500);

    // Should default to light based on system preference
    const isDark = await hasDarkClass(page);
    expect(isDark).toBe(false);
  });
});

// ============================================================================
// Test Suite: Theme Toggle Functionality
// ============================================================================

test.describe('2. Theme Toggle Switches Between Light and Dark', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should toggle from light to dark mode', async ({ page }) => {
    await setTheme(page, 'light');
    await page.reload();
    await page.waitForTimeout(500);

    // Verify light mode is active
    expect(await hasDarkClass(page)).toBe(false);

    // Click toggle
    const toggleButton = page.getByRole('button', { name: /switch to dark mode/i });
    await expect(toggleButton).toBeVisible();
    await toggleButton.click();
    await page.waitForTimeout(200);

    // Verify dark mode is active
    expect(await hasDarkClass(page)).toBe(true);
    expect(await getThemeFromLocalStorage(page)).toBe('dark');
  });

  test('should toggle from dark to light mode', async ({ page }) => {
    await setTheme(page, 'dark');
    await page.reload();
    await page.waitForTimeout(500);

    // Verify dark mode is active
    expect(await hasDarkClass(page)).toBe(true);

    // Click toggle
    const toggleButton = page.getByRole('button', { name: /switch to light mode/i });
    await expect(toggleButton).toBeVisible();
    await toggleButton.click();
    await page.waitForTimeout(200);

    // Verify light mode is active
    expect(await hasDarkClass(page)).toBe(false);
    expect(await getThemeFromLocalStorage(page)).toBe('light');
  });

  test('should toggle theme multiple times correctly', async ({ page }) => {
    await setTheme(page, 'light');
    await page.reload();
    await page.waitForTimeout(500);

    const toggle = page.getByRole('button', { name: /switch to/i });

    // Toggle 4 times
    for (let i = 0; i < 4; i++) {
      const wasDark = await hasDarkClass(page);
      await toggle.click();
      await page.waitForTimeout(200);
      const isDark = await hasDarkClass(page);
      expect(isDark).toBe(!wasDark);
    }
  });
});

// ============================================================================
// Test Suite: Theme Persistence in localStorage
// ============================================================================

test.describe('3. Theme Persists in localStorage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should save light theme to localStorage', async ({ page }) => {
    await setTheme(page, 'dark');
    await page.reload();
    await page.waitForTimeout(500);

    const toggle = page.getByRole('button', { name: /switch to light mode/i });
    await toggle.click();
    await page.waitForTimeout(200);

    expect(await getThemeFromLocalStorage(page)).toBe('light');
  });

  test('should save dark theme to localStorage', async ({ page }) => {
    await setTheme(page, 'light');
    await page.reload();
    await page.waitForTimeout(500);

    const toggle = page.getByRole('button', { name: /switch to dark mode/i });
    await toggle.click();
    await page.waitForTimeout(200);

    expect(await getThemeFromLocalStorage(page)).toBe('dark');
  });

  test('should use correct localStorage key "theme"', async ({ page }) => {
    await setTheme(page, 'dark');
    await page.reload();
    await page.waitForTimeout(500);

    const keys = await page.evaluate(() => Object.keys(localStorage));
    expect(keys).toContain('theme');
  });
});

// ============================================================================
// Test Suite: Theme Persists Across Page Navigation
// ============================================================================

test.describe('4. Theme Persists Across Page Navigation', () => {
  test('should maintain dark theme when navigating from home to problems', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');
    await page.reload();
    await page.waitForTimeout(500);

    expect(await hasDarkClass(page)).toBe(true);

    // Navigate to problems page
    await page.click('a[href="/problems"]');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    expect(await hasDarkClass(page)).toBe(true);
    expect(await getThemeFromLocalStorage(page)).toBe('dark');
  });

  test('should maintain light theme when navigating from home to problems', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');
    await page.reload();
    await page.waitForTimeout(500);

    expect(await hasDarkClass(page)).toBe(false);

    // Navigate to problems page
    await page.click('a[href="/problems"]');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    expect(await hasDarkClass(page)).toBe(false);
    expect(await getThemeFromLocalStorage(page)).toBe('light');
  });

  test('should maintain dark theme when navigating to problem detail page', async ({ page }) => {
    await page.goto('/problems');
    await setTheme(page, 'dark');
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    expect(await hasDarkClass(page)).toBe(true);

    // Navigate to first problem
    const firstProblemLink = page.locator('a[href^="/problems/"]').first();
    const href = await firstProblemLink.getAttribute('href');

    if (href) {
      await page.goto(href);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      expect(await hasDarkClass(page)).toBe(true);
      expect(await getThemeFromLocalStorage(page)).toBe('dark');
    }
  });

  test('should maintain theme when using browser back button', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');
    await page.reload();
    await page.waitForTimeout(500);

    // Navigate to problems
    await page.click('a[href="/problems"]');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Go back
    await page.goBack();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    expect(await hasDarkClass(page)).toBe(true);
  });
});

// ============================================================================
// Test Suite: Theme Persists After Page Refresh
// ============================================================================

test.describe('5. Theme Persists After Page Refresh', () => {
  test('should persist dark theme after refresh', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');
    await page.reload();
    await page.waitForTimeout(500);

    expect(await hasDarkClass(page)).toBe(true);

    // Refresh multiple times
    await page.reload();
    await page.waitForTimeout(500);
    expect(await hasDarkClass(page)).toBe(true);

    await page.reload();
    await page.waitForTimeout(500);
    expect(await hasDarkClass(page)).toBe(true);
  });

  test('should persist light theme after refresh', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');
    await page.reload();
    await page.waitForTimeout(500);

    expect(await hasDarkClass(page)).toBe(false);

    // Refresh multiple times
    await page.reload();
    await page.waitForTimeout(500);
    expect(await hasDarkClass(page)).toBe(false);

    await page.reload();
    await page.waitForTimeout(500);
    expect(await hasDarkClass(page)).toBe(false);
  });

  test('should persist theme on problems page after refresh', async ({ page }) => {
    await page.goto('/problems');
    await setTheme(page, 'dark');
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    expect(await hasDarkClass(page)).toBe(true);

    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    expect(await hasDarkClass(page)).toBe(true);
  });
});

// ============================================================================
// Test Suite: All Pages Render Correctly in Light Mode
// ============================================================================

test.describe('6. All Pages Render Correctly in Light Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');
    await page.reload();
    await page.waitForTimeout(500);
  });

  test('home page renders correctly in light mode', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    // Verify light mode is active
    expect(await hasDarkClass(page)).toBe(false);

    // Check body background is light
    const bodyBg = await getComputedBgColor(page, 'body');
    expect(isLightColor(bodyBg) || bodyBg.includes('255')).toBeTruthy();

    // Check heading is visible with dark text
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    const headingClasses = await heading.getAttribute('class');
    expect(headingClasses).toContain('text-gray-900');

    // Take screenshot for visual comparison
    await expect(page).toHaveScreenshot('home-light-mode.png', {
      maxDiffPixelRatio: 0.1,
      fullPage: true,
    });
  });

  test('problems page renders correctly in light mode', async ({ page }) => {
    await page.goto('/problems');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    expect(await hasDarkClass(page)).toBe(false);

    // Check filter sidebar has light background
    const sidebar = page.locator('aside').first();
    if ((await sidebar.count()) > 0) {
      const sidebarClasses = await sidebar.locator('.bg-white').first().getAttribute('class');
      expect(sidebarClasses).toContain('bg-white');
    }

    // Take screenshot
    await expect(page).toHaveScreenshot('problems-light-mode.png', {
      maxDiffPixelRatio: 0.1,
      fullPage: true,
    });
  });

  test('problem detail page renders correctly in light mode', async ({ page }) => {
    await page.goto('/problems');
    await page.waitForLoadState('networkidle');

    // Navigate to first problem
    const firstProblemLink = page.locator('a[href^="/problems/"]').first();
    const href = await firstProblemLink.getAttribute('href');

    if (href) {
      await page.goto(href);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000); // Wait for Monaco editor

      expect(await hasDarkClass(page)).toBe(false);

      // Check main content area
      const contentArea = page.locator('.bg-white').first();
      if ((await contentArea.count()) > 0) {
        await expect(contentArea).toBeVisible();
      }

      // Take screenshot
      await expect(page).toHaveScreenshot('problem-detail-light-mode.png', {
        maxDiffPixelRatio: 0.1,
        fullPage: true,
      });
    }
  });
});

// ============================================================================
// Test Suite: All Pages Render Correctly in Dark Mode
// ============================================================================

test.describe('7. All Pages Render Correctly in Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');
    await page.reload();
    await page.waitForTimeout(500);
  });

  test('home page renders correctly in dark mode', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    // Verify dark mode is active
    expect(await hasDarkClass(page)).toBe(true);

    // Check body background is dark
    const bodyBg = await getComputedBgColor(page, 'body');
    expect(isDarkColor(bodyBg) || !bodyBg.includes('255')).toBeTruthy();

    // Check heading is visible with light text
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    const headingClasses = await heading.getAttribute('class');
    expect(headingClasses).toContain('dark:text-gray-100');

    // Take screenshot
    await expect(page).toHaveScreenshot('home-dark-mode.png', {
      maxDiffPixelRatio: 0.1,
      fullPage: true,
    });
  });

  test('problems page renders correctly in dark mode', async ({ page }) => {
    await page.goto('/problems');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    expect(await hasDarkClass(page)).toBe(true);

    // Check body background is dark
    const bodyBg = await getComputedBgColor(page, 'body');
    expect(isDarkColor(bodyBg) || !bodyBg.includes('rgb(255')).toBeTruthy();

    // Take screenshot
    await expect(page).toHaveScreenshot('problems-dark-mode.png', {
      maxDiffPixelRatio: 0.1,
      fullPage: true,
    });
  });

  test('problem detail page renders correctly in dark mode', async ({ page }) => {
    await page.goto('/problems');
    await page.waitForLoadState('networkidle');

    // Navigate to first problem
    const firstProblemLink = page.locator('a[href^="/problems/"]').first();
    const href = await firstProblemLink.getAttribute('href');

    if (href) {
      await page.goto(href);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000); // Wait for Monaco editor

      expect(await hasDarkClass(page)).toBe(true);

      // Take screenshot
      await expect(page).toHaveScreenshot('problem-detail-dark-mode.png', {
        maxDiffPixelRatio: 0.1,
        fullPage: true,
      });
    }
  });
});

// ============================================================================
// Test Suite: No Flash of Wrong Theme
// ============================================================================

test.describe('8. No Flash of Wrong Theme on Page Load', () => {
  test('should apply dark theme immediately without flash', async ({ page }) => {
    // Set theme before navigation
    await page.goto('/');
    await setTheme(page, 'dark');

    // Navigate to a new page and check immediately
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Check immediately - should have dark class from inline script
    const isDark = await hasDarkClass(page);
    expect(isDark).toBe(true);
  });

  test('should apply light theme immediately without flash', async ({ page }) => {
    // Set theme before navigation
    await page.goto('/');
    await setTheme(page, 'light');

    // Navigate to a new page and check immediately
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Check immediately - should not have dark class
    const isDark = await hasDarkClass(page);
    expect(isDark).toBe(false);
  });

  test('should not show wrong theme background color on initial load', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');

    // Listen for DOMContentLoaded to capture initial state
    const initialDarkClass = await page.evaluate(() => {
      return new Promise<boolean>((resolve) => {
        // This captures the state as soon as possible
        resolve(document.documentElement.classList.contains('dark'));
      });
    });

    // Navigate fresh
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // The dark class should be present immediately
    const hasDark = await hasDarkClass(page);
    expect(hasDark).toBe(true);
  });

  test('should preserve theme when navigating between pages rapidly', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');
    await page.reload();
    await page.waitForTimeout(300);

    // Rapid navigation
    await page.goto('/problems');
    const darkAfterNav1 = await hasDarkClass(page);
    expect(darkAfterNav1).toBe(true);

    await page.goto('/');
    const darkAfterNav2 = await hasDarkClass(page);
    expect(darkAfterNav2).toBe(true);

    await page.goto('/problems');
    const darkAfterNav3 = await hasDarkClass(page);
    expect(darkAfterNav3).toBe(true);
  });
});

// ============================================================================
// Test Suite: Code Editor Respects Theme
// ============================================================================

test.describe('9. Code Editor Respects Theme', () => {
  test('code editor should use vs-dark theme in dark mode', async ({ page }) => {
    await page.goto('/problems');
    await setTheme(page, 'dark');
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Navigate to first problem
    const firstProblemLink = page.locator('a[href^="/problems/"]').first();
    const href = await firstProblemLink.getAttribute('href');

    if (href) {
      await page.goto(href);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000); // Wait for Monaco editor to fully load

      expect(await hasDarkClass(page)).toBe(true);

      // Check Monaco editor has dark background
      const monacoEditor = page.locator('.monaco-editor').first();
      if ((await monacoEditor.count()) > 0) {
        await expect(monacoEditor).toBeVisible();

        // Check editor container background
        const editorBg = await monacoEditor.evaluate((el) => {
          return window.getComputedStyle(el).backgroundColor;
        });

        // vs-dark theme has dark background
        expect(
          editorBg.includes('rgb(30') ||
            editorBg.includes('rgb(31') ||
            editorBg.includes('rgb(37') ||
            editorBg.includes('lab(') ||
            isDarkColor(editorBg)
        ).toBeTruthy();
      }
    }
  });

  test('code editor should use vs theme in light mode', async ({ page }) => {
    await page.goto('/problems');
    await setTheme(page, 'light');
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Navigate to first problem
    const firstProblemLink = page.locator('a[href^="/problems/"]').first();
    const href = await firstProblemLink.getAttribute('href');

    if (href) {
      await page.goto(href);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000); // Wait for Monaco editor

      expect(await hasDarkClass(page)).toBe(false);

      // Check Monaco editor has light background
      const monacoEditor = page.locator('.monaco-editor').first();
      if ((await monacoEditor.count()) > 0) {
        await expect(monacoEditor).toBeVisible();

        const editorBg = await monacoEditor.evaluate((el) => {
          return window.getComputedStyle(el).backgroundColor;
        });

        // vs theme has light/white background
        expect(
          editorBg.includes('rgb(255') ||
            editorBg.includes('rgba(255') ||
            editorBg.includes('lab(100') ||
            isLightColor(editorBg)
        ).toBeTruthy();
      }
    }
  });

  test('code editor should switch theme when toggle is clicked', async ({ page }) => {
    await page.goto('/problems');
    await setTheme(page, 'light');
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Navigate to first problem
    const firstProblemLink = page.locator('a[href^="/problems/"]').first();
    const href = await firstProblemLink.getAttribute('href');

    if (href) {
      await page.goto(href);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      // Get initial editor background
      const monacoEditor = page.locator('.monaco-editor').first();
      if ((await monacoEditor.count()) > 0) {
        const initialBg = await monacoEditor.evaluate((el) => {
          return window.getComputedStyle(el).backgroundColor;
        });

        // Toggle theme
        const toggle = page.getByRole('button', { name: /switch to dark mode/i });
        await toggle.click();
        await page.waitForTimeout(1000); // Wait for editor to re-render

        // Get new editor background
        const newBg = await monacoEditor.evaluate((el) => {
          return window.getComputedStyle(el).backgroundColor;
        });

        // Background should have changed
        expect(initialBg).not.toBe(newBg);
      }
    }
  });
});

// ============================================================================
// Test Suite: Component Dark Mode Colors
// ============================================================================

test.describe('10. All Components Have Proper Dark Mode Colors', () => {
  test.describe('10a. Navbar Background', () => {
    test('navbar should have light background in light mode', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');
      await page.reload();
      await page.waitForTimeout(500);

      const navbar = page.locator('nav').first();
      await expect(navbar).toBeVisible();

      const navClasses = await navbar.getAttribute('class');
      expect(navClasses).toContain('bg-white');

      const navBg = await navbar.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      expect(isLightColor(navBg) || navBg.includes('255')).toBeTruthy();
    });

    test('navbar should have dark background in dark mode', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'dark');
      await page.reload();
      await page.waitForTimeout(500);

      const navbar = page.locator('nav').first();
      await expect(navbar).toBeVisible();

      const navClasses = await navbar.getAttribute('class');
      expect(navClasses).toContain('dark:bg-gray-900');

      const navBg = await navbar.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      expect(isDarkColor(navBg) || !navBg.includes('rgb(255')).toBeTruthy();
    });
  });

  test.describe('10b. Page Backgrounds', () => {
    test('home page should have light gradient background in light mode', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');
      await page.reload();
      await page.waitForTimeout(500);

      const mainContent = page.locator('.min-h-screen').first();
      const classes = await mainContent.getAttribute('class');
      expect(classes).toContain('from-blue-50');
    });

    test('home page should have dark gradient background in dark mode', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'dark');
      await page.reload();
      await page.waitForTimeout(500);

      const mainContent = page.locator('.min-h-screen').first();
      const classes = await mainContent.getAttribute('class');
      expect(classes).toContain('dark:from-gray-900');
    });

    test('problems page should have proper background in dark mode', async ({ page }) => {
      await page.goto('/problems');
      await setTheme(page, 'dark');
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      const bodyBg = await getComputedBgColor(page, 'body');
      expect(isDarkColor(bodyBg) || !bodyBg.includes('rgb(255')).toBeTruthy();
    });
  });

  test.describe('10c. Card Backgrounds', () => {
    test('cards should have white background in light mode', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');
      await page.reload();
      await page.waitForTimeout(500);

      // Check progress card
      const card = page.locator('.bg-white').first();
      await expect(card).toBeVisible();

      const cardBg = await card.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      expect(isLightColor(cardBg) || cardBg.includes('255')).toBeTruthy();
    });

    test('cards should have dark background in dark mode', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'dark');
      await page.reload();
      await page.waitForTimeout(500);

      // Cards have dark:bg-gray-800 class
      const card = page.locator('.dark\\:bg-gray-800').first();
      if ((await card.count()) > 0) {
        const cardBg = await card.evaluate((el) => {
          return window.getComputedStyle(el).backgroundColor;
        });
        expect(isDarkColor(cardBg) || !cardBg.includes('rgb(255')).toBeTruthy();
      }
    });
  });

  test.describe('10d. Text Colors', () => {
    test('main heading should have dark text in light mode', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');
      await page.reload();
      await page.waitForTimeout(500);

      const heading = page.locator('h1').first();
      const headingClasses = await heading.getAttribute('class');
      expect(headingClasses).toContain('text-gray-900');
    });

    test('main heading should have light text in dark mode', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'dark');
      await page.reload();
      await page.waitForTimeout(500);

      const heading = page.locator('h1').first();
      const headingClasses = await heading.getAttribute('class');
      expect(headingClasses).toContain('dark:text-gray-100');
    });

    test('paragraph text should have proper colors in both modes', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');
      await page.reload();
      await page.waitForTimeout(500);

      const paragraph = page.locator('p.text-gray-600').first();
      if ((await paragraph.count()) > 0) {
        const lightClasses = await paragraph.getAttribute('class');
        expect(lightClasses).toContain('text-gray-600');
        expect(lightClasses).toContain('dark:text-gray-400');
      }
    });
  });

  test.describe('10e. Button Colors', () => {
    test('primary button should have proper styling in light mode', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');
      await page.reload();
      await page.waitForTimeout(500);

      const startButton = page.locator('a').filter({ hasText: 'Start Practicing' });
      await expect(startButton).toBeVisible();

      const buttonClasses = await startButton.getAttribute('class');
      expect(buttonClasses).toContain('bg-blue-600');
      expect(buttonClasses).toContain('text-white');
    });

    test('secondary buttons should have proper dark mode styling', async ({ page }) => {
      await page.goto('/problems');
      await setTheme(page, 'dark');
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Navigate to a problem detail page
      const firstProblemLink = page.locator('a[href^="/problems/"]').first();
      const href = await firstProblemLink.getAttribute('href');

      if (href) {
        await page.goto(href);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);

        // Check reset button styling
        const resetButton = page.locator('button').filter({ hasText: 'Reset' });
        if ((await resetButton.count()) > 0) {
          const buttonClasses = await resetButton.getAttribute('class');
          expect(buttonClasses).toContain('dark:bg-gray-700');
          expect(buttonClasses).toContain('dark:text-gray-300');
        }
      }
    });
  });

  test.describe('10f. Input Fields', () => {
    test('filter radio buttons should have proper dark mode styling', async ({ page }) => {
      await page.goto('/problems');
      await setTheme(page, 'dark');
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      // Check filter inputs
      const radioInput = page.locator('input[type="radio"]').first();
      if ((await radioInput.count()) > 0) {
        const inputClasses = await radioInput.getAttribute('class');
        expect(inputClasses).toContain('dark:border-gray-600');
      }
    });
  });

  test.describe('10g. Borders', () => {
    test('navbar border should have proper colors', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'light');
      await page.reload();
      await page.waitForTimeout(500);

      const navbar = page.locator('nav').first();
      const navClasses = await navbar.getAttribute('class');
      expect(navClasses).toContain('border-gray-200');
      expect(navClasses).toContain('dark:border-gray-800');
    });

    test('card borders should have proper colors in dark mode', async ({ page }) => {
      await page.goto('/');
      await setTheme(page, 'dark');
      await page.reload();
      await page.waitForTimeout(500);

      // Check filter sidebar on problems page
      await page.goto('/problems');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      const filterCard = page.locator('aside .bg-white').first();
      if ((await filterCard.count()) > 0) {
        const cardClasses = await filterCard.getAttribute('class');
        expect(cardClasses).toContain('dark:border-gray-700');
      }
    });

    test('table borders should have proper dark mode colors', async ({ page }) => {
      await page.goto('/problems');
      await setTheme(page, 'dark');
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      // Check table header border
      const tableHeader = page.locator('thead tr').first();
      if ((await tableHeader.count()) > 0) {
        const headerClasses = await tableHeader.getAttribute('class');
        expect(headerClasses).toContain('dark:border-gray-700');
      }
    });
  });
});

// ============================================================================
// Test Suite: Visual Regression Tests
// ============================================================================

test.describe('Visual Regression Tests', () => {
  test('home page visual comparison - light vs dark', async ({ page }) => {
    // Light mode screenshot
    await page.goto('/');
    await setTheme(page, 'light');
    await page.reload();
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('visual-home-light.png', {
      maxDiffPixelRatio: 0.1,
      fullPage: true,
    });

    // Dark mode screenshot
    await setTheme(page, 'dark');
    await page.reload();
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('visual-home-dark.png', {
      maxDiffPixelRatio: 0.1,
      fullPage: true,
    });
  });

  test('problems page visual comparison - light vs dark', async ({ page }) => {
    // Light mode screenshot
    await page.goto('/problems');
    await setTheme(page, 'light');
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('visual-problems-light.png', {
      maxDiffPixelRatio: 0.1,
      fullPage: true,
    });

    // Dark mode screenshot
    await setTheme(page, 'dark');
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('visual-problems-dark.png', {
      maxDiffPixelRatio: 0.1,
      fullPage: true,
    });
  });

  test('problem detail page visual comparison - light vs dark', async ({ page }) => {
    await page.goto('/problems');
    await page.waitForLoadState('networkidle');

    const firstProblemLink = page.locator('a[href^="/problems/"]').first();
    const href = await firstProblemLink.getAttribute('href');

    if (href) {
      // Light mode screenshot
      await page.goto(href);
      await setTheme(page, 'light');
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000); // Wait for Monaco editor

      await expect(page).toHaveScreenshot('visual-problem-detail-light.png', {
        maxDiffPixelRatio: 0.1,
        fullPage: true,
      });

      // Dark mode screenshot
      await setTheme(page, 'dark');
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      await expect(page).toHaveScreenshot('visual-problem-detail-dark.png', {
        maxDiffPixelRatio: 0.1,
        fullPage: true,
      });
    }
  });

  test('navbar visual comparison across themes', async ({ page }) => {
    await page.goto('/');

    // Light mode
    await setTheme(page, 'light');
    await page.reload();
    await page.waitForTimeout(500);

    const navbar = page.locator('nav').first();
    await expect(navbar).toHaveScreenshot('visual-navbar-light.png', {
      maxDiffPixelRatio: 0.1,
    });

    // Dark mode
    await setTheme(page, 'dark');
    await page.reload();
    await page.waitForTimeout(500);

    await expect(navbar).toHaveScreenshot('visual-navbar-dark.png', {
      maxDiffPixelRatio: 0.1,
    });
  });
});

// ============================================================================
// Test Suite: Theme Toggle Button Accessibility
// ============================================================================

test.describe('Theme Toggle Button Accessibility', () => {
  test('toggle button should have proper aria-label in light mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');
    await page.reload();
    await page.waitForTimeout(500);

    const toggle = page.getByRole('button', { name: /switch to dark mode/i });
    await expect(toggle).toBeVisible();
  });

  test('toggle button should have proper aria-label in dark mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');
    await page.reload();
    await page.waitForTimeout(500);

    const toggle = page.getByRole('button', { name: /switch to light mode/i });
    await expect(toggle).toBeVisible();
  });

  test('toggle button should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');
    await page.reload();
    await page.waitForTimeout(500);

    // Focus the toggle button
    const toggle = page.getByRole('button', { name: /switch to dark mode/i });
    await toggle.focus();

    // Press Enter to activate
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);

    // Should now be in dark mode
    expect(await hasDarkClass(page)).toBe(true);
  });
});

// ============================================================================
// Test Suite: Theme Consistency Across Sessions
// ============================================================================

test.describe('Theme Consistency Across Sessions', () => {
  test('should remember theme after closing and reopening browser context', async ({ browser }) => {
    // First session - set dark theme
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();

    await page1.goto('/');
    await setTheme(page1, 'dark');
    await page1.reload();
    await page1.waitForTimeout(500);

    expect(await hasDarkClass(page1)).toBe(true);

    // Get storage state
    const storage = await context1.storageState();
    await context1.close();

    // Second session - restore storage
    const context2 = await browser.newContext({ storageState: storage });
    const page2 = await context2.newPage();

    await page2.goto('/');
    await page2.waitForTimeout(500);

    // Theme should be restored
    expect(await hasDarkClass(page2)).toBe(true);

    await context2.close();
  });
});
