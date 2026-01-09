import { expect, test } from '@playwright/test';

test.describe('Navbar Component', () => {
  test.describe('Visibility Across Pages', () => {
    test('should be visible on home page', async ({ page }) => {
      await page.goto('/');

      const navbar = page.locator('nav');
      await expect(navbar).toBeVisible();

      // Logo should be visible
      const logo = navbar.getByRole('link', { name: /JS\/TS Tricks/i });
      await expect(logo).toBeVisible();
    });

    test('should be visible on problems list page', async ({ page }) => {
      await page.goto('/problems');

      const navbar = page.locator('nav');
      await expect(navbar).toBeVisible();

      // Logo should be visible
      const logo = navbar.getByRole('link', { name: /JS\/TS Tricks/i });
      await expect(logo).toBeVisible();
    });

    test('should be visible on problem detail page', async ({ page }) => {
      await page.goto('/problems');

      // Get the first problem link and navigate to it
      const problemLinks = page.locator('a[href^="/problems/"]');
      const href = await problemLinks.first().getAttribute('href');

      if (href) {
        await page.goto(href);

        const navbar = page.locator('nav');
        await expect(navbar).toBeVisible();

        // Logo should be visible
        const logo = navbar.getByRole('link', { name: /JS\/TS Tricks/i });
        await expect(logo).toBeVisible();
      }
    });
  });

  test.describe('Logo Navigation', () => {
    test('logo should link to home page', async ({ page }) => {
      await page.goto('/');

      const logo = page.locator('nav').getByRole('link', { name: /JS\/TS Tricks/i });
      await expect(logo).toHaveAttribute('href', '/');
    });

    test('clicking logo from problems page should navigate to home', async ({ page }) => {
      await page.goto('/problems');

      const logo = page.locator('nav').getByRole('link', { name: /JS\/TS Tricks/i });
      await logo.click();

      await expect(page).toHaveURL('/');
    });

    test('clicking logo from problem detail page should navigate to home', async ({ page }) => {
      await page.goto('/problems/abort-controller');

      // Wait for page to load
      await page.waitForLoadState('domcontentloaded');

      const logo = page.locator('nav').getByRole('link', { name: /JS\/TS Tricks/i });
      await logo.click();

      await expect(page).toHaveURL('/');
    });
  });

  test.describe('Navigation Links - Active State', () => {
    test('Home link should be active on home page', async ({ page }) => {
      await page.goto('/');

      const navbar = page.locator('nav');
      const homeLink = navbar.getByRole('link', { name: 'Home' });

      await expect(homeLink).toBeVisible();

      // Check for active state styling (blue background)
      await expect(homeLink).toHaveClass(/bg-blue-100|bg-blue-900/);
    });

    test('Problems link should not be active on home page', async ({ page }) => {
      await page.goto('/');

      const navbar = page.locator('nav');
      const problemsLink = navbar.getByRole('link', { name: 'Problems' });

      await expect(problemsLink).toBeVisible();

      // Should not have active state styling
      await expect(problemsLink).not.toHaveClass(/bg-blue-100/);
      await expect(problemsLink).not.toHaveClass(/bg-blue-900/);
    });

    test('Problems link should be active on problems list page', async ({ page }) => {
      await page.goto('/problems');

      const navbar = page.locator('nav');
      const problemsLink = navbar.getByRole('link', { name: 'Problems' });

      await expect(problemsLink).toBeVisible();

      // Check for active state styling
      await expect(problemsLink).toHaveClass(/bg-blue-100|bg-blue-900/);
    });

    test('Home link should not be active on problems page', async ({ page }) => {
      await page.goto('/problems');

      const navbar = page.locator('nav');
      const homeLink = navbar.getByRole('link', { name: 'Home' });

      await expect(homeLink).toBeVisible();

      // Should not have active state styling
      await expect(homeLink).not.toHaveClass(/bg-blue-100/);
      await expect(homeLink).not.toHaveClass(/bg-blue-900/);
    });

    test('Problems link should be active on problem detail page', async ({ page }) => {
      await page.goto('/problems/abort-controller');

      const navbar = page.locator('nav');
      const problemsLink = navbar.getByRole('link', { name: 'Problems' });

      await expect(problemsLink).toBeVisible();

      // Check for active state styling (should be active because URL starts with /problems)
      await expect(problemsLink).toHaveClass(/bg-blue-100|bg-blue-900/);
    });

    test('clicking navigation links should navigate correctly', async ({ page }) => {
      await page.goto('/');

      const navbar = page.locator('nav');

      // Click Problems link
      await navbar.getByRole('link', { name: 'Problems' }).click();
      await expect(page).toHaveURL('/problems');

      // Click Home link
      await navbar.getByRole('link', { name: 'Home' }).click();
      await expect(page).toHaveURL('/');
    });
  });

  test.describe('Theme Toggle', () => {
    test.beforeEach(async ({ page }) => {
      // Clear localStorage before each theme test
      await page.goto('/');
      await page.evaluate(() => {
        localStorage.clear();
      });
    });

    test('theme toggle button should be visible in navbar', async ({ page }) => {
      await page.goto('/');

      const navbar = page.locator('nav');
      const themeToggle = navbar.getByRole('button', { name: /switch to/i });

      await expect(themeToggle).toBeVisible();
    });

    test('should toggle from light to dark mode', async ({ page }) => {
      await page.goto('/');

      // Set initial theme to light
      await page.evaluate(() => {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
      });

      await page.reload();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      // Verify light mode is active
      const initialDarkClass = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });
      expect(initialDarkClass).toBe(false);

      // Click the toggle button
      const navbar = page.locator('nav');
      const themeToggle = navbar.getByRole('button', { name: /switch to dark mode/i });
      await themeToggle.click();

      await page.waitForTimeout(100);

      // Verify dark mode is now active
      const hasDarkClass = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });
      expect(hasDarkClass).toBe(true);
    });

    test('should toggle from dark to light mode', async ({ page }) => {
      await page.goto('/');

      // Set initial theme to dark
      await page.evaluate(() => {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
      });

      await page.reload();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      // Verify dark mode is active
      const initialDarkClass = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });
      expect(initialDarkClass).toBe(true);

      // Click the toggle button
      const navbar = page.locator('nav');
      const themeToggle = navbar.getByRole('button', { name: /switch to light mode/i });
      await themeToggle.click();

      await page.waitForTimeout(100);

      // Verify light mode is now active
      const hasDarkClass = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });
      expect(hasDarkClass).toBe(false);
    });

    test('theme toggle should update aria-label after toggling', async ({ page }) => {
      await page.goto('/');

      // Set initial theme to light
      await page.evaluate(() => {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
      });

      await page.reload();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      const navbar = page.locator('nav');

      // Initially should say "Switch to dark mode"
      const themeToggle = navbar.getByRole('button', { name: /switch to dark mode/i });
      await expect(themeToggle).toBeVisible();

      // Click to toggle
      await themeToggle.click();
      await page.waitForTimeout(100);

      // Now should say "Switch to light mode"
      const updatedToggle = navbar.getByRole('button', { name: /switch to light mode/i });
      await expect(updatedToggle).toBeVisible();
    });

    test('navbar should have appropriate colors in dark mode', async ({ page }) => {
      await page.goto('/');

      // Set dark theme
      await page.evaluate(() => {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
      });

      await page.reload();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      const navbar = page.locator('nav');

      // Check that navbar has dark background class
      await expect(navbar).toHaveClass(/dark:bg-gray-900/);
    });

    test('navbar should have appropriate colors in light mode', async ({ page }) => {
      await page.goto('/');

      // Set light theme
      await page.evaluate(() => {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
      });

      await page.reload();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      const navbar = page.locator('nav');

      // Check that navbar has light background class
      await expect(navbar).toHaveClass(/bg-white/);
    });
  });

  test.describe('Progress Stats Display', () => {
    test('should display streak counter in navbar', async ({ page }) => {
      await page.goto('/');

      const navbar = page.locator('nav');

      // Streak counter has orange color and flame icon
      const streakDisplay = navbar.locator('.text-orange-500');
      await expect(streakDisplay).toBeVisible();

      // Should contain a number
      const streakText = await streakDisplay.textContent();
      expect(streakText).toMatch(/\d+/);
    });

    test('should display solved count in navbar', async ({ page }) => {
      await page.goto('/');

      const navbar = page.locator('nav');

      // Solved count has green color
      const solvedDisplay = navbar.locator('.text-green-600, .dark\\:text-green-400');
      await expect(solvedDisplay.first()).toBeVisible();

      // Should contain "X/Y" format
      const solvedText = await solvedDisplay.first().textContent();
      expect(solvedText).toMatch(/\d+\/\d+/);
    });

    test('streak counter should have tooltip', async ({ page }) => {
      await page.goto('/');

      const navbar = page.locator('nav');
      const streakContainer = navbar.locator('[title="Current streak"]');

      await expect(streakContainer).toBeVisible();
    });

    test('solved count should have tooltip', async ({ page }) => {
      await page.goto('/');

      const navbar = page.locator('nav');
      const solvedContainer = navbar.locator('[title="Problems solved"]');

      await expect(solvedContainer).toBeVisible();
    });

    test('progress stats should be visible across pages', async ({ page }) => {
      // Check on home page
      await page.goto('/');
      let navbar = page.locator('nav');
      await expect(navbar.locator('.text-orange-500')).toBeVisible();
      await expect(navbar.locator('.text-green-600, .dark\\:text-green-400').first()).toBeVisible();

      // Check on problems page
      await page.goto('/problems');
      navbar = page.locator('nav');
      await expect(navbar.locator('.text-orange-500')).toBeVisible();
      await expect(navbar.locator('.text-green-600, .dark\\:text-green-400').first()).toBeVisible();
    });
  });

  test.describe('Sticky Behavior', () => {
    test('navbar should be sticky at top', async ({ page }) => {
      await page.goto('/');

      const navbar = page.locator('nav');

      // Check that navbar has sticky positioning classes
      await expect(navbar).toHaveClass(/sticky/);
      await expect(navbar).toHaveClass(/top-0/);
    });

    test('navbar should remain visible when scrolling', async ({ page }) => {
      await page.goto('/problems');

      const navbar = page.locator('nav');

      // Verify navbar is visible initially
      await expect(navbar).toBeVisible();

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 1000));
      await page.waitForTimeout(200);

      // Navbar should still be visible
      await expect(navbar).toBeVisible();

      // Navbar should be at top of viewport
      const navbarBoundingBox = await navbar.boundingBox();
      expect(navbarBoundingBox?.y).toBe(0);
    });

    test('navbar should stay fixed at top after scrolling', async ({ page }) => {
      await page.goto('/');

      const navbar = page.locator('nav');

      // Scroll down significantly
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(200);

      // Check navbar is still at top of viewport
      const navbarBoundingBox = await navbar.boundingBox();
      expect(navbarBoundingBox?.y).toBe(0);

      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);

      // Navbar should still be visible at top
      const navbarBoundingBoxAfter = await navbar.boundingBox();
      expect(navbarBoundingBoxAfter?.y).toBe(0);
    });

    test('navbar has high z-index for proper layering', async ({ page }) => {
      await page.goto('/');

      const navbar = page.locator('nav');

      // Check for z-50 class which ensures navbar is above other content
      await expect(navbar).toHaveClass(/z-50/);
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('navbar should be visible on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      const navbar = page.locator('nav');
      await expect(navbar).toBeVisible();
    });

    test('logo text should be hidden on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // The logo span with text "JS/TS Tricks" has hidden sm:inline classes
      const logoText = page.locator('nav span').filter({ hasText: 'JS/TS Tricks' });

      // The text should not be visible on mobile (width < 640px)
      await expect(logoText).toBeHidden();
    });

    test('logo icon should still be visible on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // The logo SVG icon should still be visible
      const logoIcon = page.locator('nav a[href="/"] svg');
      await expect(logoIcon).toBeVisible();
    });

    test('navigation links should be visible on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      const navbar = page.locator('nav');

      await expect(navbar.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(navbar.getByRole('link', { name: 'Problems' })).toBeVisible();
    });

    test('theme toggle should be visible on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      const themeToggle = page.locator('nav').getByRole('button', { name: /switch to/i });
      await expect(themeToggle).toBeVisible();
    });

    test('progress stats should be hidden on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // Progress stats container has "hidden sm:flex" classes
      const statsContainer = page.locator('nav .hidden.sm\\:flex');

      // Should not be visible on mobile
      await expect(statsContainer).toBeHidden();
    });

    test('progress stats should be visible on larger screens', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');

      const navbar = page.locator('nav');

      // Progress stats should be visible on tablet/desktop
      await expect(navbar.locator('.text-orange-500')).toBeVisible();
      await expect(navbar.locator('.text-green-600, .dark\\:text-green-400').first()).toBeVisible();
    });

    test('logo text should be visible on larger screens', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');

      const logoText = page.locator('nav span').filter({ hasText: 'JS/TS Tricks' });
      await expect(logoText).toBeVisible();
    });

    test('navbar height remains consistent across viewport sizes', async ({ page }) => {
      // Check on mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      const navbar = page.locator('nav');
      const mobileBox = await navbar.boundingBox();

      // Check on desktop
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.waitForTimeout(200);
      const desktopBox = await navbar.boundingBox();

      // Navbar height should be the same (h-14 = 56px)
      expect(mobileBox?.height).toBe(desktopBox?.height);
    });
  });

  test.describe('Accessibility', () => {
    test('navbar should be a semantic nav element', async ({ page }) => {
      await page.goto('/');

      const navbar = page.locator('nav');
      await expect(navbar).toBeVisible();

      // Verify it's actually a nav element
      const tagName = await navbar.evaluate((el) => el.tagName);
      expect(tagName.toLowerCase()).toBe('nav');
    });

    test('all links should be keyboard focusable', async ({ page }) => {
      await page.goto('/');

      // Tab through navbar elements
      await page.keyboard.press('Tab');

      // Should be able to reach navbar links via keyboard
      let foundNavLink = false;
      for (let i = 0; i < 10; i++) {
        const focused = page.locator(':focus');
        const tagName = await focused.evaluate((el) => el.tagName).catch(() => '');

        if (tagName === 'A') {
          const href = await focused.getAttribute('href');
          if (href === '/' || href === '/problems') {
            foundNavLink = true;
            break;
          }
        }
        await page.keyboard.press('Tab');
      }

      expect(foundNavLink).toBe(true);
    });

    test('theme toggle button should be keyboard accessible', async ({ page }) => {
      await page.goto('/');

      // Set initial theme to light for consistent testing
      await page.evaluate(() => {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
      });
      await page.reload();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      // Tab until we reach the theme toggle button
      let foundToggle = false;
      for (let i = 0; i < 15; i++) {
        await page.keyboard.press('Tab');
        const focused = page.locator(':focus');
        const ariaLabel = await focused.getAttribute('aria-label').catch(() => '');

        if (ariaLabel?.includes('Switch to')) {
          foundToggle = true;

          // Press Enter to toggle theme
          await page.keyboard.press('Enter');
          await page.waitForTimeout(100);

          // Verify theme changed
          const hasDarkClass = await page.evaluate(() => {
            return document.documentElement.classList.contains('dark');
          });
          expect(hasDarkClass).toBe(true);
          break;
        }
      }

      expect(foundToggle).toBe(true);
    });

    test('theme toggle should have proper aria-label', async ({ page }) => {
      await page.goto('/');

      const themeToggle = page.locator('nav').getByRole('button', { name: /switch to/i });

      // Should have aria-label
      const ariaLabel = await themeToggle.getAttribute('aria-label');
      expect(ariaLabel).toMatch(/Switch to (dark|light) mode/);
    });

    test('theme toggle should have title attribute', async ({ page }) => {
      await page.goto('/');

      const themeToggle = page.locator('nav').getByRole('button', { name: /switch to/i });

      // Should have title attribute
      const title = await themeToggle.getAttribute('title');
      expect(title).toMatch(/Switch to (dark|light) mode/);
    });

    test('links should have visible focus indicators', async ({ page }) => {
      await page.goto('/');

      // Focus on a navbar link
      const homeLink = page.locator('nav').getByRole('link', { name: 'Home' });
      await homeLink.focus();

      // Verify focus is on the element
      const focused = page.locator(':focus');
      await expect(focused).toBeVisible();
    });

    test('navbar should not trap keyboard focus', async ({ page }) => {
      await page.goto('/');

      // Tab through the navbar multiple times - should eventually reach content outside navbar
      let escapedNavbar = false;

      for (let i = 0; i < 20; i++) {
        await page.keyboard.press('Tab');
        const focused = page.locator(':focus');

        // Check if focused element is outside navbar
        const isInNavbar = await focused.evaluate((el) => {
          const navbar = document.querySelector('nav');
          return navbar?.contains(el) ?? false;
        });

        if (!isInNavbar) {
          escapedNavbar = true;
          break;
        }
      }

      expect(escapedNavbar).toBe(true);
    });
  });

  test.describe('Navigation State Persistence', () => {
    test('active state should update correctly after navigation', async ({ page }) => {
      await page.goto('/');

      const navbar = page.locator('nav');

      // Home should be active initially
      const homeLink = navbar.getByRole('link', { name: 'Home' });
      await expect(homeLink).toHaveClass(/bg-blue-100|bg-blue-900/);

      // Navigate to problems
      await navbar.getByRole('link', { name: 'Problems' }).click();
      await expect(page).toHaveURL('/problems');

      // Problems should now be active
      const problemsLink = navbar.getByRole('link', { name: 'Problems' });
      await expect(problemsLink).toHaveClass(/bg-blue-100|bg-blue-900/);

      // Home should no longer be active
      await expect(homeLink).not.toHaveClass(/bg-blue-100/);
      await expect(homeLink).not.toHaveClass(/bg-blue-900/);
    });

    test('navbar state should be consistent after browser back navigation', async ({ page }) => {
      await page.goto('/');

      const navbar = page.locator('nav');

      // Navigate to problems
      await navbar.getByRole('link', { name: 'Problems' }).click();
      await expect(page).toHaveURL('/problems');

      // Navigate back
      await page.goBack();
      await expect(page).toHaveURL('/');

      // Home should be active again
      const homeLink = navbar.getByRole('link', { name: 'Home' });
      await expect(homeLink).toHaveClass(/bg-blue-100|bg-blue-900/);
    });
  });
});
