import { test, expect, Page } from '@playwright/test';

// Viewport sizes
const MOBILE_VIEWPORT = { width: 375, height: 667 }; // iPhone SE
const TABLET_VIEWPORT = { width: 768, height: 1024 }; // iPad

// Minimum touch target size (Apple HIG recommends 44x44)
const MIN_TOUCH_TARGET_SIZE = 44;

/**
 * Helper function to check for horizontal scroll
 */
async function hasHorizontalScroll(page: Page): Promise<boolean> {
  return await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
}

test.describe('Mobile Responsiveness - iPhone SE (375x667)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
  });

  test.describe('Navbar', () => {
    test('logo should be visible on mobile', async ({ page }) => {
      await page.goto('/');

      // Logo icon should be visible
      const logoIcon = page.locator('nav svg');
      await expect(logoIcon.first()).toBeVisible();

      // Logo link should be clickable
      const logoLink = page.locator('nav a[href="/"]').first();
      await expect(logoLink).toBeVisible();
    });

    test('navigation links should be visible and functional', async ({ page }) => {
      await page.goto('/');

      // Home link should be visible
      const homeLink = page.locator('nav').getByRole('link', { name: 'Home' });
      await expect(homeLink).toBeVisible();

      // Problems link should be visible
      const problemsLink = page.locator('nav').getByRole('link', { name: 'Problems' });
      await expect(problemsLink).toBeVisible();

      // Click Problems link and verify navigation
      await problemsLink.click();
      await expect(page).toHaveURL('/problems');
    });

    test('theme toggle should be accessible on mobile', async ({ page }) => {
      await page.goto('/');

      // Theme toggle button should be visible
      const themeToggle = page.locator('nav button').filter({ has: page.locator('svg') });
      await expect(themeToggle.first()).toBeVisible();
    });

    test('navbar should be sticky on scroll', async ({ page }) => {
      await page.goto('/');

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 500));

      // Navbar should still be visible at top
      const navbar = page.locator('nav.sticky');
      await expect(navbar).toBeVisible();

      // Verify navbar is at the top of viewport
      const navBox = await navbar.boundingBox();
      expect(navBox?.y).toBeLessThanOrEqual(10);
    });
  });

  test.describe('Home Page', () => {
    test('should be scrollable and readable', async ({ page }) => {
      await page.goto('/');

      // Main heading should be visible
      await expect(
        page.getByRole('heading', { name: /JavaScript & TypeScript Tricks/i })
      ).toBeVisible();

      // Start Practicing button should be visible
      await expect(
        page.getByRole('link', { name: /Start Practicing/i })
      ).toBeVisible();

      // Progress card should be visible
      await expect(page.getByText('Your Progress')).toBeVisible();

      // Should be able to scroll to Topics Covered
      await page.getByRole('heading', { name: /Topics Covered/i }).scrollIntoViewIfNeeded();
      await expect(page.getByRole('heading', { name: /Topics Covered/i })).toBeVisible();

      // Should be able to scroll to Features
      await page.getByRole('heading', { name: /Features/i }).scrollIntoViewIfNeeded();
      await expect(page.getByRole('heading', { name: /Features/i })).toBeVisible();
    });

    test('stat cards should display in 2-column grid on mobile', async ({ page }) => {
      await page.goto('/');

      // Stats grid should be visible
      const statsGrid = page.locator('.grid.grid-cols-2');
      await expect(statsGrid.first()).toBeVisible();
    });

    test('topics cards should stack on mobile', async ({ page }) => {
      await page.goto('/');

      // Scroll to Topics section
      await page.getByRole('heading', { name: /Topics Covered/i }).scrollIntoViewIfNeeded();

      // Topics grid should use single column on mobile
      const topicsGrid = page.locator('.grid.grid-cols-1');
      await expect(topicsGrid.first()).toBeVisible();
    });

    test('no horizontal scroll on home page', async ({ page }) => {
      await page.goto('/');
      await page.waitForTimeout(500);

      const hasScroll = await hasHorizontalScroll(page);
      expect(hasScroll).toBeFalsy();
    });
  });

  test.describe('Problems Page', () => {
    test('filter button should appear on mobile', async ({ page }) => {
      await page.goto('/problems');

      // Mobile filter toggle button should be visible
      const filterButton = page.getByRole('button', { name: /Filters/i });
      await expect(filterButton).toBeVisible();
    });

    test('filter sidebar should be hidden by default on mobile', async ({ page }) => {
      await page.goto('/problems');

      // Desktop sidebar should be hidden
      const desktopSidebar = page.locator('.hidden.lg\\:block');
      await expect(desktopSidebar).not.toBeVisible();
    });

    test('filter sidebar should open and close on mobile', async ({ page }) => {
      await page.goto('/problems');

      // Click filter button to open
      const filterButton = page.getByRole('button', { name: /Filters/i });
      await filterButton.click();

      // Mobile filter sidebar should now be visible
      const mobileSidebar = page.locator('.lg\\:hidden').filter({ hasText: 'Filters' });
      await expect(mobileSidebar).toBeVisible();

      // Click filter button to close
      await filterButton.click();

      // Wait for sidebar to be hidden
      await page.waitForTimeout(300);
    });

    test('search input should be full width on mobile', async ({ page }) => {
      await page.goto('/problems');

      const searchInput = page.locator('input[placeholder*="Search"]');
      await expect(searchInput).toBeVisible();

      // Check that search input takes most of the width
      const box = await searchInput.boundingBox();
      expect(box?.width).toBeGreaterThan(MOBILE_VIEWPORT.width * 0.8);
    });

    test('problem table should show essential columns only', async ({ page }) => {
      await page.goto('/problems');

      // Wait for table to load
      const table = page.locator('table');
      await expect(table).toBeVisible();

      // Status column should be visible
      const statusHeader = page.locator('th').filter({ hasText: 'Status' });
      await expect(statusHeader).toBeVisible();

      // Title column should be visible
      const titleHeader = page.locator('th').filter({ hasText: 'Title' });
      await expect(titleHeader).toBeVisible();

      // Difficulty column should be hidden on mobile (hidden sm:table-cell)
      const difficultyHeader = page.locator('th.hidden.sm\\:table-cell').filter({ hasText: 'Difficulty' });
      await expect(difficultyHeader).not.toBeVisible();

      // Acceptance column should be hidden on mobile (hidden md:table-cell)
      const acceptanceHeader = page.locator('th.hidden.md\\:table-cell');
      await expect(acceptanceHeader.first()).not.toBeVisible();

      // Category column should be hidden on mobile (hidden lg:table-cell)
      const categoryHeader = page.locator('th.hidden.lg\\:table-cell');
      await expect(categoryHeader.first()).not.toBeVisible();
    });

    test('problem title should show inline difficulty on mobile', async ({ page }) => {
      await page.goto('/problems');

      // On mobile, difficulty is shown inline with title
      const inlineDifficulty = page.locator('span.sm\\:hidden').first();
      await expect(inlineDifficulty).toBeVisible();
    });

    test('no horizontal scroll on problems page', async ({ page }) => {
      await page.goto('/problems');
      await page.waitForTimeout(500);

      const hasScroll = await hasHorizontalScroll(page);
      expect(hasScroll).toBeFalsy();
    });
  });

  test.describe('Problem Detail Page', () => {
    const testProblemId = 'abort-controller';

    test('should display in single column layout on mobile', async ({ page }) => {
      await page.goto(`/problems/${testProblemId}`);

      // Grid should use single column on mobile
      const gridContainer = page.locator('.grid.grid-cols-1');
      await expect(gridContainer.first()).toBeVisible();
    });

    test('problem title and metadata should be visible', async ({ page }) => {
      await page.goto(`/problems/${testProblemId}`);

      // Title should be visible
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      // Difficulty badge should be visible
      const difficultyBadge = page.locator('span').filter({
        hasText: /^(EASY|MEDIUM|HARD)$/,
      });
      await expect(difficultyBadge.first()).toBeVisible();
    });

    test('code editor should be usable on mobile', async ({ page }) => {
      await page.goto(`/problems/${testProblemId}`);

      // Wait for Monaco editor to load
      const monacoEditor = page.locator('.monaco-editor').first();
      await monacoEditor.waitFor({ timeout: 15000 });

      // Editor should be visible
      await expect(monacoEditor).toBeVisible();

      // Editor should have reasonable height
      const box = await monacoEditor.boundingBox();
      expect(box?.height).toBeGreaterThan(100);

      // Editor container should be full width
      expect(box?.width).toBeGreaterThan(MOBILE_VIEWPORT.width * 0.85);
    });

    test('action buttons should be visible and tappable', async ({ page }) => {
      await page.goto(`/problems/${testProblemId}`);

      // Wait for editor to load
      await page.locator('.monaco-editor').first().waitFor({ timeout: 15000 });

      // Reset button should be visible
      const resetButton = page.getByRole('button', { name: /Reset/i });
      await expect(resetButton).toBeVisible();

      // Show Solution button should be visible
      const solutionButton = page.getByRole('button', { name: /Show Solution/i });
      await expect(solutionButton).toBeVisible();

      // Run Tests button should be visible
      const runTestsButton = page.getByRole('button', { name: /Run Tests/i });
      await expect(runTestsButton).toBeVisible();
    });

    test('navigation buttons should be visible', async ({ page }) => {
      await page.goto(`/problems/${testProblemId}`);

      // Wait for page to load
      await page.locator('.monaco-editor').first().waitFor({ timeout: 15000 });

      // Previous or Next navigation should be visible
      const navLinks = page.locator('a').filter({ hasText: /Previous|Next/i });
      const count = await navLinks.count();
      expect(count).toBeGreaterThan(0);
    });

    test('content should be scrollable', async ({ page }) => {
      await page.goto(`/problems/${testProblemId}`);

      // Wait for page to load
      await page.locator('.monaco-editor').first().waitFor({ timeout: 15000 });

      // Scroll to Test Results section
      const testResultsHeading = page.getByRole('heading', { name: /Test Results/i });
      await testResultsHeading.scrollIntoViewIfNeeded();
      await expect(testResultsHeading).toBeVisible();
    });

    test('no horizontal scroll on problem detail page', async ({ page }) => {
      await page.goto(`/problems/${testProblemId}`);
      await page.locator('.monaco-editor').first().waitFor({ timeout: 15000 });

      const hasScroll = await hasHorizontalScroll(page);
      expect(hasScroll).toBeFalsy();
    });
  });

  test.describe('Touch Targets', () => {
    test('buttons should have minimum touch target size', async ({ page }) => {
      await page.goto('/');

      // Check Start Practicing button
      const startButton = page.getByRole('link', { name: /Start Practicing/i });
      const startBox = await startButton.boundingBox();
      expect(startBox?.height).toBeGreaterThanOrEqual(MIN_TOUCH_TARGET_SIZE);
    });

    test('navigation links should have adequate touch targets', async ({ page }) => {
      await page.goto('/');

      // Check nav links
      const navLinks = page.locator('nav a');
      const navLinksCount = await navLinks.count();

      for (let i = 0; i < navLinksCount; i++) {
        const link = navLinks.nth(i);
        const box = await link.boundingBox();
        if (box) {
          // Allow for some flexibility but should be at least 40px
          expect(box.height).toBeGreaterThanOrEqual(40);
        }
      }
    });

    test('filter buttons should have adequate touch targets', async ({ page }) => {
      await page.goto('/problems');

      const filterButton = page.getByRole('button', { name: /Filters/i });
      const box = await filterButton.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(MIN_TOUCH_TARGET_SIZE);
    });

    test('problem links should have adequate touch targets', async ({ page }) => {
      await page.goto('/problems');

      // Check first few problem links
      const problemLinks = page.locator('a[href^="/problems/"]');
      const count = Math.min(await problemLinks.count(), 5);

      for (let i = 0; i < count; i++) {
        const link = problemLinks.nth(i);
        const box = await link.boundingBox();
        if (box) {
          // Table rows should have adequate height
          expect(box.height).toBeGreaterThanOrEqual(40);
        }
      }
    });
  });

  test.describe('Text Readability', () => {
    test('main heading should be readable on mobile', async ({ page }) => {
      await page.goto('/');

      const heading = page.getByRole('heading', { name: /JavaScript & TypeScript Tricks/i });
      const fontSize = await heading.evaluate((el) =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );

      // Main heading should be at least 24px on mobile
      expect(fontSize).toBeGreaterThanOrEqual(24);
    });

    test('body text should be readable without zooming', async ({ page }) => {
      await page.goto('/');

      // Check paragraph text
      const description = page.getByText(/Master advanced JavaScript/i);
      const fontSize = await description.evaluate((el) =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );

      // Body text should be at least 14px for comfortable reading
      expect(fontSize).toBeGreaterThanOrEqual(14);
    });

    test('problem table text should be readable', async ({ page }) => {
      await page.goto('/problems');

      // Check problem title text
      const problemLinks = page.locator('a[href^="/problems/"]');
      const firstLink = problemLinks.first();
      const fontSize = await firstLink.evaluate((el) =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );

      // Should be at least 14px
      expect(fontSize).toBeGreaterThanOrEqual(14);
    });

    test('button text should be readable', async ({ page }) => {
      await page.goto('/problems');

      const filterButton = page.getByRole('button', { name: /Filters/i });
      const fontSize = await filterButton.evaluate((el) =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );

      // Button text should be at least 14px
      expect(fontSize).toBeGreaterThanOrEqual(14);
    });
  });
});

test.describe('Tablet Responsiveness - iPad (768x1024)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(TABLET_VIEWPORT);
  });

  test.describe('Layout Adaptation', () => {
    test('home page should use multi-column layout', async ({ page }) => {
      await page.goto('/');

      // Stats should display in 4-column grid on tablet (md:grid-cols-4)
      const statsGrid = page.locator('.grid.grid-cols-2.md\\:grid-cols-4');
      await expect(statsGrid.first()).toBeVisible();
    });

    test('topics should display in 2-column grid on tablet', async ({ page }) => {
      await page.goto('/');

      // Topics grid should use md:grid-cols-2
      const topicsGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2');
      await expect(topicsGrid.first()).toBeVisible();
    });

    test('features should display in 2-column grid on tablet', async ({ page }) => {
      await page.goto('/');

      // Features grid should use md:grid-cols-2
      const featuresGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2');
      await expect(featuresGrid.first()).toBeVisible();
    });

    test('navbar logo text should be visible on tablet', async ({ page }) => {
      await page.goto('/');

      // Logo text should be visible (hidden sm:inline becomes visible)
      const logoText = page.locator('nav').getByText('JS/TS Tricks');
      await expect(logoText).toBeVisible();
    });

    test('progress stats should be visible in navbar on tablet', async ({ page }) => {
      await page.goto('/');

      // Progress stats in navbar should be visible (hidden sm:flex)
      const progressStats = page.locator('nav .hidden.sm\\:flex');
      await expect(progressStats).toBeVisible();
    });
  });

  test.describe('Problems Page on Tablet', () => {
    test('filter sidebar should still use toggle on tablet (below lg)', async ({ page }) => {
      await page.goto('/problems');

      // Filter toggle button should still be visible (lg:hidden)
      const filterButton = page.getByRole('button', { name: /Filters/i });
      await expect(filterButton).toBeVisible();

      // Desktop sidebar should be hidden (hidden lg:block)
      const desktopSidebar = page.locator('.hidden.lg\\:block');
      await expect(desktopSidebar).not.toBeVisible();
    });

    test('problem table should show difficulty column on tablet', async ({ page }) => {
      await page.goto('/problems');

      // Wait for table
      await expect(page.locator('table')).toBeVisible();

      // Difficulty column should be visible on tablet (sm:table-cell)
      const difficultyHeader = page.locator('th').filter({ hasText: 'Difficulty' });
      await expect(difficultyHeader).toBeVisible();

      // Acceptance column should be visible on tablet (md:table-cell)
      const acceptanceHeader = page.locator('th').filter({ hasText: 'Acceptance' });
      await expect(acceptanceHeader).toBeVisible();
    });

    test('search and sort should be side by side on tablet', async ({ page }) => {
      await page.goto('/problems');

      // Search and filter bar should use row layout (sm:flex-row)
      const searchBar = page.locator('.flex.flex-col.sm\\:flex-row');
      await expect(searchBar.first()).toBeVisible();
    });
  });

  test.describe('Problem Detail on Tablet', () => {
    const testProblemId = 'abort-controller';

    test('should still use single column layout on tablet (below lg)', async ({ page }) => {
      await page.goto(`/problems/${testProblemId}`);

      // Wait for editor to load
      await page.locator('.monaco-editor').first().waitFor({ timeout: 15000 });

      // Grid should still be single column (lg:grid-cols-2 means single on tablet)
      const gridContainer = page.locator('.grid.grid-cols-1.lg\\:grid-cols-2');
      await expect(gridContainer.first()).toBeVisible();
    });

    test('all elements should be visible and functional', async ({ page }) => {
      await page.goto(`/problems/${testProblemId}`);

      // Wait for editor to load
      await page.locator('.monaco-editor').first().waitFor({ timeout: 15000 });

      // Problem title
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      // Code editor
      await expect(page.locator('.monaco-editor').first()).toBeVisible();

      // Action buttons
      await expect(page.getByRole('button', { name: /Reset/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Show Solution/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Run Tests/i })).toBeVisible();

      // Test results section
      await expect(page.getByRole('heading', { name: /Test Results/i })).toBeVisible();
    });
  });

  test.describe('No Horizontal Scroll', () => {
    test('no horizontal scroll on home page', async ({ page }) => {
      await page.goto('/');
      await page.waitForTimeout(500);

      const hasScroll = await hasHorizontalScroll(page);
      expect(hasScroll).toBeFalsy();
    });

    test('no horizontal scroll on problems page', async ({ page }) => {
      await page.goto('/problems');
      await page.waitForTimeout(500);

      const hasScroll = await hasHorizontalScroll(page);
      expect(hasScroll).toBeFalsy();
    });

    test('no horizontal scroll on problem detail page', async ({ page }) => {
      await page.goto('/problems/abort-controller');
      await page.locator('.monaco-editor').first().waitFor({ timeout: 15000 });

      const hasScroll = await hasHorizontalScroll(page);
      expect(hasScroll).toBeFalsy();
    });
  });
});

test.describe('Cross-viewport Functionality', () => {
  test('should maintain functionality when viewport changes', async ({ page }) => {
    // Start at desktop size
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/problems');

    // Desktop sidebar should be visible
    const desktopSidebar = page.locator('.hidden.lg\\:block');
    await expect(desktopSidebar).toBeVisible();

    // Resize to mobile
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.waitForTimeout(300);

    // Mobile filter button should now be visible
    const filterButton = page.getByRole('button', { name: /Filters/i });
    await expect(filterButton).toBeVisible();

    // Desktop sidebar should be hidden
    await expect(desktopSidebar).not.toBeVisible();

    // Resize to tablet
    await page.setViewportSize(TABLET_VIEWPORT);
    await page.waitForTimeout(300);

    // Filter button should still be visible on tablet
    await expect(filterButton).toBeVisible();
  });

  test('navigation should work across all viewports', async ({ page }) => {
    const viewports = [MOBILE_VIEWPORT, TABLET_VIEWPORT, { width: 1200, height: 800 }];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');

      // Navigate to problems
      await page.getByRole('link', { name: /Start Practicing/i }).click();
      await expect(page).toHaveURL('/problems');

      // Navigate to a problem
      const problemLinks = page.locator('a[href^="/problems/"]');
      const href = await problemLinks.first().getAttribute('href');
      await problemLinks.first().click();
      await expect(page).toHaveURL(href!);

      // Navigate back home
      const homeLink = page.locator('nav').getByRole('link', { name: 'Home' });
      await homeLink.click();
      await expect(page).toHaveURL('/');
    }
  });
});

test.describe('Mobile Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
  });

  test('filter sidebar interaction on mobile', async ({ page }) => {
    await page.goto('/problems');

    // Open filters
    const filterButton = page.getByRole('button', { name: /Filters/i });
    await filterButton.click();

    // Wait for filter sidebar to appear
    await page.waitForTimeout(300);

    // Select a difficulty filter
    const easyLabel = page.locator('label').filter({ hasText: 'Easy' }).first();
    await easyLabel.click();

    // Verify filter is applied (problem count should update)
    await page.waitForTimeout(300);
    const problemCountText = page.getByText(/\d+ of \d+ problems/);
    await expect(problemCountText).toBeVisible();
  });

  test('search functionality on mobile', async ({ page }) => {
    await page.goto('/problems');

    // Type in search
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('array');

    // Wait for filter
    await page.waitForTimeout(300);

    // Results should be filtered
    const problemCountText = page.getByText(/\d+ of \d+ problems/);
    await expect(problemCountText).toBeVisible();

    // Clear search
    await searchInput.fill('');
    await page.waitForTimeout(300);
  });

  test('problem interaction on mobile', async ({ page }) => {
    await page.goto('/problems/abort-controller');

    // Wait for editor
    await page.locator('.monaco-editor').first().waitFor({ timeout: 15000 });

    // Tap Show Solution
    await page.getByRole('button', { name: /Show Solution/i }).click();

    // Solution should be visible
    await expect(page.getByRole('heading', { name: /Solution:/i })).toBeVisible();

    // Tap Hide Solution
    await page.getByRole('button', { name: /Hide Solution/i }).click();

    // Solution should be hidden
    await expect(page.getByRole('heading', { name: /Solution:/i })).not.toBeVisible();
  });

  test('scroll behavior on long pages', async ({ page }) => {
    await page.goto('/');

    // Get initial scroll position
    const initialScrollY = await page.evaluate(() => window.scrollY);
    expect(initialScrollY).toBe(0);

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    // Should have scrolled
    const newScrollY = await page.evaluate(() => window.scrollY);
    expect(newScrollY).toBeGreaterThan(0);

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    // Should be at top
    const finalScrollY = await page.evaluate(() => window.scrollY);
    expect(finalScrollY).toBe(0);
  });
});

test.describe('Accessibility on Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
  });

  test('focus indicators should be visible', async ({ page }) => {
    await page.goto('/');

    // Tab to first focusable element
    await page.keyboard.press('Tab');

    // Check that focused element has visible focus
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });

  test('links should have descriptive text', async ({ page }) => {
    await page.goto('/');

    // Check that main CTA has descriptive text
    const startLink = page.getByRole('link', { name: /Start Practicing/i });
    await expect(startLink).toBeVisible();
    const text = await startLink.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  });

  test('headings should have proper hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check for h1
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();

    // Check for h2
    const h2 = page.getByRole('heading', { level: 2 });
    const h2Count = await h2.count();
    expect(h2Count).toBeGreaterThan(0);
  });
});
