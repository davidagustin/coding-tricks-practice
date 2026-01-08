import { test, expect } from '@playwright/test';

test.describe('Home Page UI - Comprehensive Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Hero Section', () => {
    test('should display the main title', async ({ page }) => {
      const title = page.getByRole('heading', {
        name: /JavaScript & TypeScript Tricks/i,
        level: 1,
      });
      await expect(title).toBeVisible();
      await expect(title).toHaveClass(/text-5xl.*font-bold/);
    });

    test('should display the description paragraph', async ({ page }) => {
      const description = page.getByText(
        /Master advanced JavaScript and TypeScript patterns through hands-on practice/i
      );
      await expect(description).toBeVisible();
    });

    test('should display description with proper styling', async ({ page }) => {
      const description = page.locator('p').filter({
        hasText: /Master advanced JavaScript and TypeScript patterns/i,
      });
      await expect(description).toBeVisible();
      await expect(description).toHaveClass(/text-xl.*text-gray-600/);
    });

    test('should mention key topics in description', async ({ page }) => {
      const description = page.getByText(/destructuring.*optional chaining.*template literal/i);
      await expect(description).toBeVisible();
    });
  });

  test.describe('Start Practicing Button', () => {
    test('should display "Start Practicing" button with arrow', async ({ page }) => {
      const startButton = page.getByRole('link', { name: /Start Practicing/i });
      await expect(startButton).toBeVisible();
      await expect(startButton).toContainText('→');
    });

    test('should have correct href to problems page', async ({ page }) => {
      const startButton = page.getByRole('link', { name: /Start Practicing/i });
      await expect(startButton).toHaveAttribute('href', '/problems');
    });

    test('should navigate to problems page when clicked', async ({ page }) => {
      const startButton = page.getByRole('link', { name: /Start Practicing/i });
      await startButton.click();
      await expect(page).toHaveURL('/problems');
    });

    test('should have proper button styling', async ({ page }) => {
      const startButton = page.getByRole('link', { name: /Start Practicing/i });
      await expect(startButton).toHaveClass(/bg-blue-600.*text-white.*rounded-lg.*font-semibold/);
    });

    test('should have focus styles for accessibility', async ({ page }) => {
      const startButton = page.getByRole('link', { name: /Start Practicing/i });
      await expect(startButton).toHaveClass(/focus:outline-none.*focus:ring-2/);
    });
  });

  test.describe('Progress Card', () => {
    test('should display "Your Progress" label', async ({ page }) => {
      const progressLabel = page.getByText('Your Progress');
      await expect(progressLabel).toBeVisible();
    });

    test('should display solved count and total count', async ({ page }) => {
      // Progress shows as "X/Y" format
      const progressCard = page.locator('.bg-white.dark\\:bg-gray-800.rounded-lg.shadow-lg.p-6.mb-8');
      await expect(progressCard).toBeVisible();

      // Should contain a ratio like "0/123" or similar
      const progressText = progressCard.locator('span').filter({
        hasText: /\d+\/\d+/,
      });
      await expect(progressText).toBeVisible();
    });

    test('should display progress bar', async ({ page }) => {
      // The progress bar container
      const progressBarContainer = page.locator('.w-full.bg-gray-200.dark\\:bg-gray-700.rounded-full.h-3');
      await expect(progressBarContainer).toBeVisible();

      // The progress bar fill
      const progressBarFill = progressBarContainer.locator('.bg-green-500.h-3.rounded-full');
      await expect(progressBarFill).toBeVisible();
    });

    test('should display encouraging message when no problems solved', async ({ page }) => {
      // Clear localStorage to reset progress
      await page.evaluate(() => {
        localStorage.removeItem('solvedProblems');
      });
      await page.reload();

      const encouragingMessage = page.getByText(/Start solving problems to track your progress/i);
      // This message appears when solvedCount is 0
      await expect(encouragingMessage).toBeVisible();
    });

    test('should display percentage when problems are solved', async ({ page }) => {
      // Set a solved problem in localStorage
      await page.evaluate(() => {
        localStorage.setItem('solvedProblems', JSON.stringify(['abort-controller']));
      });
      await page.reload();

      // Should show percentage
      const percentageText = page.getByText(/\d+% complete/i);
      await expect(percentageText).toBeVisible();
    });

    test('should update progress bar width based on solved count', async ({ page }) => {
      // Set solved problems
      await page.evaluate(() => {
        localStorage.setItem('solvedProblems', JSON.stringify(['abort-controller', 'array-chaining']));
      });
      await page.reload();

      const progressBarFill = page.locator('.bg-green-500.h-3.rounded-full.transition-all');
      const style = await progressBarFill.getAttribute('style');
      expect(style).toContain('width:');
    });
  });

  test.describe('Statistics Cards', () => {
    test('should display all four stat cards', async ({ page }) => {
      // Check for stat grid
      const statsGrid = page.locator('.grid.grid-cols-2.md\\:grid-cols-4.gap-4');
      await expect(statsGrid).toBeVisible();

      // Should have 4 stat cards
      const statCards = statsGrid.locator('.bg-white.dark\\:bg-gray-800.rounded-lg.shadow-lg.p-5');
      await expect(statCards).toHaveCount(4);
    });

    test('should display Total stat card with correct label', async ({ page }) => {
      await expect(page.getByText('Total').first()).toBeVisible();
    });

    test('should display Easy stat card with correct label and color', async ({ page }) => {
      const easyText = page.locator('.text-sm.text-gray-600').filter({ hasText: 'Easy' });
      await expect(easyText).toBeVisible();

      // Easy count should be green
      const easyCount = page.locator('.text-2xl.font-bold.text-green-600');
      await expect(easyCount).toBeVisible();
    });

    test('should display Medium stat card with correct label and color', async ({ page }) => {
      const mediumText = page.locator('.text-sm.text-gray-600').filter({ hasText: 'Medium' });
      await expect(mediumText).toBeVisible();

      // Medium count should be yellow
      const mediumCount = page.locator('.text-2xl.font-bold.text-yellow-600');
      await expect(mediumCount).toBeVisible();
    });

    test('should display Hard stat card with correct label and color', async ({ page }) => {
      const hardText = page.locator('.text-sm.text-gray-600').filter({ hasText: 'Hard' });
      await expect(hardText).toBeVisible();

      // Hard count should be red
      const hardCount = page.locator('.text-2xl.font-bold.text-red-600');
      await expect(hardCount).toBeVisible();
    });

    test('should display non-zero total problems count', async ({ page }) => {
      const statsGrid = page.locator('.grid.grid-cols-2.md\\:grid-cols-4.gap-4');
      const totalCard = statsGrid.locator('.bg-white.dark\\:bg-gray-800').first();
      const totalCount = totalCard.locator('.text-2xl.font-bold');

      const countText = await totalCount.textContent();
      const count = parseInt(countText || '0', 10);
      expect(count).toBeGreaterThan(0);
    });

    test('should have stat counts that sum correctly', async ({ page }) => {
      const statsGrid = page.locator('.grid.grid-cols-2.md\\:grid-cols-4.gap-4');
      const statCounts = statsGrid.locator('.text-2xl.font-bold');

      // Get all four counts
      const counts = await statCounts.allTextContents();
      const total = parseInt(counts[0] || '0', 10);
      const easy = parseInt(counts[1] || '0', 10);
      const medium = parseInt(counts[2] || '0', 10);
      const hard = parseInt(counts[3] || '0', 10);

      // Total should equal sum of difficulties
      expect(easy + medium + hard).toBe(total);
    });
  });

  test.describe('Topics Covered Section', () => {
    test('should display "Topics Covered" heading', async ({ page }) => {
      const heading = page.getByRole('heading', {
        name: /Topics Covered/i,
        level: 2,
      });
      await expect(heading).toBeVisible();
    });

    test('should display category cards grid', async ({ page }) => {
      // Topics section grid
      const topicsGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-4');
      await expect(topicsGrid).toBeVisible();
    });

    test('should display multiple category cards', async ({ page }) => {
      const categoryCards = page.locator(
        'a[href^="/problems?category="]'
      );
      const count = await categoryCards.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display category name on each card', async ({ page }) => {
      const categoryCards = page.locator('a[href^="/problems?category="]');
      const firstCard = categoryCards.first();

      // Each card should have an h3 with the category name
      const categoryName = firstCard.locator('h3');
      await expect(categoryName).toBeVisible();
      await expect(categoryName).not.toBeEmpty();
    });

    test('should display problem count on each category card', async ({ page }) => {
      const categoryCards = page.locator('a[href^="/problems?category="]');
      const firstCard = categoryCards.first();

      // Each card should show "X problems" or "1 problem"
      const problemCount = firstCard.locator('p').filter({
        hasText: /\d+ problems?/i,
      });
      await expect(problemCount).toBeVisible();
    });

    test('should have hover effect on category cards', async ({ page }) => {
      const categoryCard = page.locator('a[href^="/problems?category="]').first();
      await expect(categoryCard).toHaveClass(/hover:shadow-lg.*transition-all/);
    });
  });

  test.describe('Category Card Navigation', () => {
    test('should navigate to problems page with category filter when clicking category card', async ({
      page,
    }) => {
      const categoryCards = page.locator('a[href^="/problems?category="]');
      const firstCard = categoryCards.first();

      // Get the href to know which category we're clicking
      const href = await firstCard.getAttribute('href');
      expect(href).toContain('/problems?category=');

      await firstCard.click();
      await expect(page).toHaveURL(/\/problems\?category=/);
    });

    test('should show filtered problems list after clicking category', async ({ page }) => {
      const categoryCards = page.locator('a[href^="/problems?category="]');
      const firstCard = categoryCards.first();

      await firstCard.click();

      // Should show "Showing X of Y problems" filter info
      const filterInfo = page.getByText(/Showing \d+ of \d+ problems/i);
      await expect(filterInfo).toBeVisible();
    });

    test('should have correct URL encoding for category with spaces', async ({ page }) => {
      // Find a category that likely has spaces (like "JavaScript Basics")
      const categoryCard = page.locator('a[href*="JavaScript%20Basics"]');
      if ((await categoryCard.count()) > 0) {
        const href = await categoryCard.first().getAttribute('href');
        expect(href).toContain('%20'); // URL encoded space
      }
    });
  });

  test.describe('Features Section', () => {
    test('should display "Features" heading', async ({ page }) => {
      const heading = page.getByRole('heading', {
        name: /Features/i,
        level: 2,
      });
      await expect(heading).toBeVisible();
    });

    test('should display Features section in a card container', async ({ page }) => {
      const featuresContainer = page.locator('.bg-white.dark\\:bg-gray-800.rounded-lg.shadow-lg.p-8');
      await expect(featuresContainer).toBeVisible();
    });

    test('should display "Interactive Code Editor" feature', async ({ page }) => {
      const feature = page.getByText('Interactive Code Editor');
      await expect(feature).toBeVisible();

      // Should have description
      const description = page.getByText(/Write and test your code directly in the browser/i);
      await expect(description).toBeVisible();
    });

    test('should display "Automated Testing" feature', async ({ page }) => {
      const feature = page.getByText('Automated Testing');
      await expect(feature).toBeVisible();

      const description = page.getByText(/Run test cases to verify your solution/i);
      await expect(description).toBeVisible();
    });

    test('should display "Detailed Explanations" feature', async ({ page }) => {
      const feature = page.getByText('Detailed Explanations');
      await expect(feature).toBeVisible();

      const description = page.getByText(/Learn from examples, hints, and step-by-step solutions/i);
      await expect(description).toBeVisible();
    });

    test('should display "Progressive Difficulty" feature', async ({ page }) => {
      const feature = page.getByText('Progressive Difficulty');
      await expect(feature).toBeVisible();

      const description = page.getByText(/Start with easy problems and work your way up/i);
      await expect(description).toBeVisible();
    });

    test('should display feature icons', async ({ page }) => {
      // Features section should have SVG icons
      const featuresSection = page.locator('.bg-white.dark\\:bg-gray-800.rounded-lg.shadow-lg.p-8').last();
      const icons = featuresSection.locator('svg');
      const iconCount = await icons.count();
      expect(iconCount).toBeGreaterThanOrEqual(4);
    });

    test('should display features in a 2-column grid on desktop', async ({ page }) => {
      const featuresGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.gap-6');
      await expect(featuresGrid).toBeVisible();
    });
  });

  test.describe('Page Layout and Structure', () => {
    test('should have correct page structure', async ({ page }) => {
      const mainContainer = page.locator('.min-h-screen');
      await expect(mainContainer).toBeVisible();
    });

    test('should have centered content container', async ({ page }) => {
      const contentContainer = page.locator('.max-w-7xl.mx-auto');
      await expect(contentContainer).toBeVisible();
    });

    test('should have gradient background', async ({ page }) => {
      const gradient = page.locator('.bg-gradient-to-br');
      await expect(gradient).toBeVisible();
    });

    test('should have proper padding on content', async ({ page }) => {
      const contentContainer = page.locator('.max-w-7xl.mx-auto.px-4');
      await expect(contentContainer).toBeVisible();
    });
  });

  test.describe('Responsive Design - Mobile', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
    });

    test('should display title on mobile', async ({ page }) => {
      const title = page.getByRole('heading', {
        name: /JavaScript & TypeScript Tricks/i,
        level: 1,
      });
      await expect(title).toBeVisible();
    });

    test('should display Start Practicing button on mobile', async ({ page }) => {
      const startButton = page.getByRole('link', { name: /Start Practicing/i });
      await expect(startButton).toBeVisible();
    });

    test('should display progress card on mobile', async ({ page }) => {
      const progressLabel = page.getByText('Your Progress');
      await expect(progressLabel).toBeVisible();
    });

    test('should display stats cards in 2-column grid on mobile', async ({ page }) => {
      // On mobile, stats should be 2 columns (grid-cols-2)
      const statsGrid = page.locator('.grid.grid-cols-2');
      await expect(statsGrid.first()).toBeVisible();
    });

    test('should display Topics Covered section on mobile', async ({ page }) => {
      const topicsHeading = page.getByRole('heading', {
        name: /Topics Covered/i,
      });
      await expect(topicsHeading).toBeVisible();
    });

    test('should display category cards in single column on mobile', async ({ page }) => {
      const categoryCards = page.locator('a[href^="/problems?category="]');
      await expect(categoryCards.first()).toBeVisible();
    });

    test('should display Features section on mobile', async ({ page }) => {
      const featuresHeading = page.getByRole('heading', {
        name: /Features/i,
      });
      await expect(featuresHeading).toBeVisible();
    });

    test('should navigate correctly on mobile', async ({ page }) => {
      const startButton = page.getByRole('link', { name: /Start Practicing/i });
      await startButton.click();
      await expect(page).toHaveURL('/problems');
    });
  });

  test.describe('Responsive Design - Tablet', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
    });

    test('should display all main sections on tablet', async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: /JavaScript & TypeScript Tricks/i })
      ).toBeVisible();
      await expect(page.getByRole('link', { name: /Start Practicing/i })).toBeVisible();
      await expect(page.getByText('Your Progress')).toBeVisible();
      await expect(page.getByRole('heading', { name: /Topics Covered/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /Features/i })).toBeVisible();
    });

    test('should display stats in 4-column layout on tablet', async ({ page }) => {
      const statsGrid = page.locator('.grid.grid-cols-2.md\\:grid-cols-4');
      await expect(statsGrid).toBeVisible();
    });
  });

  test.describe('Dark Mode Styling', () => {
    test.beforeEach(async ({ page }) => {
      // Set dark mode
      await page.evaluate(() => {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
      });
      await page.reload();
      await page.waitForTimeout(300);
    });

    test('should have dark class on html element', async ({ page }) => {
      const hasDarkClass = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });
      expect(hasDarkClass).toBe(true);
    });

    test('should display title with light text in dark mode', async ({ page }) => {
      const title = page.getByRole('heading', {
        name: /JavaScript & TypeScript Tricks/i,
        level: 1,
      });
      await expect(title).toBeVisible();
      await expect(title).toHaveClass(/dark:text-gray-100/);
    });

    test('should display description with appropriate dark mode color', async ({ page }) => {
      const description = page.locator('p').filter({
        hasText: /Master advanced JavaScript and TypeScript patterns/i,
      });
      await expect(description).toHaveClass(/dark:text-gray-400/);
    });

    test('should display stat cards with dark background', async ({ page }) => {
      const statsGrid = page.locator('.grid.grid-cols-2.md\\:grid-cols-4.gap-4');
      const statCard = statsGrid.locator('.bg-white.dark\\:bg-gray-800').first();
      await expect(statCard).toBeVisible();
    });

    test('should display progress card with dark background', async ({ page }) => {
      const progressCard = page.locator('.bg-white.dark\\:bg-gray-800.rounded-lg.shadow-lg.p-6.mb-8');
      await expect(progressCard).toBeVisible();
    });

    test('should display progress bar with dark background', async ({ page }) => {
      const progressBarBg = page.locator('.bg-gray-200.dark\\:bg-gray-700.rounded-full');
      await expect(progressBarBg).toBeVisible();
    });

    test('should display category cards with dark background', async ({ page }) => {
      const categoryCard = page.locator('a[href^="/problems?category="]').first();
      await expect(categoryCard).toHaveClass(/dark:bg-gray-800/);
    });

    test('should display features section with dark background', async ({ page }) => {
      const featuresSection = page.locator('.bg-white.dark\\:bg-gray-800.rounded-lg.shadow-lg.p-8');
      await expect(featuresSection).toBeVisible();
    });

    test('should have dark gradient background', async ({ page }) => {
      const gradient = page.locator('.dark\\:from-gray-900.dark\\:via-gray-800.dark\\:to-gray-900');
      await expect(gradient).toBeVisible();
    });
  });

  test.describe('Light Mode Styling', () => {
    test.beforeEach(async ({ page }) => {
      // Set light mode
      await page.evaluate(() => {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
      });
      await page.reload();
      await page.waitForTimeout(300);
    });

    test('should not have dark class on html element', async ({ page }) => {
      const hasDarkClass = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });
      expect(hasDarkClass).toBe(false);
    });

    test('should display title with dark text in light mode', async ({ page }) => {
      const title = page.getByRole('heading', {
        name: /JavaScript & TypeScript Tricks/i,
        level: 1,
      });
      await expect(title).toBeVisible();
      await expect(title).toHaveClass(/text-gray-900/);
    });

    test('should display stat cards with light background', async ({ page }) => {
      const statsGrid = page.locator('.grid.grid-cols-2.md\\:grid-cols-4.gap-4');
      const statCard = statsGrid.locator('.bg-white').first();
      await expect(statCard).toBeVisible();
    });

    test('should have light gradient background', async ({ page }) => {
      const gradient = page.locator('.from-blue-50.via-white.to-purple-50');
      await expect(gradient).toBeVisible();
    });
  });

  test.describe('Theme Toggle Integration', () => {
    test('should display theme toggle button', async ({ page }) => {
      const toggleButton = page.getByRole('button', { name: /switch to/i });
      await expect(toggleButton).toBeVisible();
    });

    test('should toggle from light to dark mode', async ({ page }) => {
      // Start in light mode
      await page.evaluate(() => {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
      });
      await page.reload();
      await page.waitForTimeout(300);

      const toggleButton = page.getByRole('button', { name: /switch to dark mode/i });
      await toggleButton.click();
      await page.waitForTimeout(200);

      const hasDarkClass = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });
      expect(hasDarkClass).toBe(true);
    });

    test('should toggle from dark to light mode', async ({ page }) => {
      // Start in dark mode
      await page.evaluate(() => {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
      });
      await page.reload();
      await page.waitForTimeout(300);

      const toggleButton = page.getByRole('button', { name: /switch to light mode/i });
      await toggleButton.click();
      await page.waitForTimeout(200);

      const hasDarkClass = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });
      expect(hasDarkClass).toBe(false);
    });
  });

  test.describe('All Links Functional', () => {
    test('should have functional Start Practicing link', async ({ page }) => {
      const startButton = page.getByRole('link', { name: /Start Practicing/i });
      await expect(startButton).toHaveAttribute('href', '/problems');
      await startButton.click();
      await expect(page).toHaveURL('/problems');
    });

    test('should have functional category links', async ({ page }) => {
      const categoryCards = page.locator('a[href^="/problems?category="]');
      const count = await categoryCards.count();

      // Test first 3 category links to keep test fast
      const linksToTest = Math.min(count, 3);

      for (let i = 0; i < linksToTest; i++) {
        await page.goto('/');
        const categoryCard = page.locator('a[href^="/problems?category="]').nth(i);
        const href = await categoryCard.getAttribute('href');

        await categoryCard.click();
        await expect(page).toHaveURL(href!);

        // Should load problems page with filter
        await expect(page.getByRole('heading', { name: /JavaScript & TypeScript Tricks/i })).toBeVisible();
      }
    });

    test('should not have any broken internal links', async ({ page }) => {
      const links = page.locator('a[href^="/"]');
      const count = await links.count();

      for (let i = 0; i < count; i++) {
        const link = links.nth(i);
        const href = await link.getAttribute('href');

        if (href && href.startsWith('/')) {
          await page.goto(href);

          // Should not show error page
          const errorText = page.getByText(/404|not found|error/i);
          const hasError = await errorText.isVisible().catch(() => false);

          if (hasError) {
            console.error(`Broken link found: ${href}`);
          }
          expect(hasError).toBe(false);
        }
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      // Should have h1 for main title
      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1).toBeVisible();
      const h1Count = await h1.count();
      expect(h1Count).toBe(1); // Only one h1

      // Should have h2 for section headings
      const h2s = page.getByRole('heading', { level: 2 });
      const h2Count = await h2s.count();
      expect(h2Count).toBeGreaterThanOrEqual(2); // Topics Covered and Features
    });

    test('should have accessible link text', async ({ page }) => {
      const startButton = page.getByRole('link', { name: /Start Practicing/i });
      await expect(startButton).toBeVisible();

      // Category links should have descriptive text
      const categoryCards = page.locator('a[href^="/problems?category="]');
      const firstCard = categoryCards.first();
      const linkText = await firstCard.textContent();
      expect(linkText).toBeTruthy();
      expect(linkText!.length).toBeGreaterThan(0);
    });

    test('should support keyboard navigation', async ({ page }) => {
      // Tab to Start Practicing button
      await page.keyboard.press('Tab');

      // Continue tabbing until we reach the Start Practicing link
      for (let i = 0; i < 15; i++) {
        const focused = page.locator(':focus');
        const tagName = await focused.evaluate((el) => el.tagName).catch(() => '');

        if (tagName === 'A') {
          const href = await focused.getAttribute('href');
          if (href === '/problems') {
            // Found the Start Practicing link
            await page.keyboard.press('Enter');
            await expect(page).toHaveURL('/problems');
            return;
          }
        }

        await page.keyboard.press('Tab');
      }
    });

    test('should have focus indicators on interactive elements', async ({ page }) => {
      const startButton = page.getByRole('link', { name: /Start Practicing/i });

      // Focus the button
      await startButton.focus();

      // Should have focus ring classes
      await expect(startButton).toHaveClass(/focus:ring-2/);
    });
  });

  test.describe('Performance', () => {
    test('should load within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      const loadTime = Date.now() - startTime;

      // Page should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test('should render main content quickly', async ({ page }) => {
      await page.goto('/');

      // Main heading should be visible quickly
      const title = page.getByRole('heading', {
        name: /JavaScript & TypeScript Tricks/i,
        level: 1,
      });
      await expect(title).toBeVisible({ timeout: 3000 });
    });

    test('should have no layout shift on load', async ({ page }) => {
      await page.goto('/');

      // Wait for initial render
      await page.waitForLoadState('domcontentloaded');

      // Take initial position of main heading
      const title = page.getByRole('heading', {
        name: /JavaScript & TypeScript Tricks/i,
        level: 1,
      });
      await expect(title).toBeVisible();

      const initialBox = await title.boundingBox();

      // Wait a bit for any potential layout shifts
      await page.waitForTimeout(500);

      const finalBox = await title.boundingBox();

      // Position should not have changed significantly
      if (initialBox && finalBox) {
        expect(Math.abs(initialBox.y - finalBox.y)).toBeLessThan(10);
      }
    });
  });

  test.describe('State Persistence', () => {
    test('should persist progress across page reloads', async ({ page }) => {
      // Set solved problems
      await page.evaluate(() => {
        localStorage.setItem('solvedProblems', JSON.stringify(['abort-controller', 'array-chaining']));
      });
      await page.reload();

      // Progress should reflect solved problems
      const progressCard = page.locator('.bg-white.dark\\:bg-gray-800.rounded-lg.shadow-lg.p-6.mb-8');
      const progressText = progressCard.locator('span').filter({
        hasText: /\d+\/\d+/,
      });
      const text = await progressText.textContent();

      // Should show at least 2 solved
      expect(text).toContain('2/');
    });

    test('should persist theme preference across page reloads', async ({ page }) => {
      // Set dark theme
      await page.evaluate(() => {
        localStorage.setItem('theme', 'dark');
      });
      await page.reload();
      await page.waitForTimeout(300);

      const hasDarkClass = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });
      expect(hasDarkClass).toBe(true);

      // Set light theme
      await page.evaluate(() => {
        localStorage.setItem('theme', 'light');
      });
      await page.reload();
      await page.waitForTimeout(300);

      const hasLightMode = await page.evaluate(() => {
        return !document.documentElement.classList.contains('dark');
      });
      expect(hasLightMode).toBe(true);
    });
  });
});
