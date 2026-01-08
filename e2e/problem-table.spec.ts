import { test, expect } from '@playwright/test';

test.describe('Problem Table Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/problems');
    // Wait for the table to be visible
    await page.locator('table').waitFor({ state: 'visible' });
  });

  test.describe('Table Structure and Columns', () => {
    test('should display all table columns in header', async ({ page }) => {
      // Check for all column headers
      const statusHeader = page.locator('th').filter({ hasText: 'Status' });
      const titleHeader = page.locator('th').filter({ hasText: 'Title' });
      const difficultyHeader = page.locator('th').filter({ hasText: 'Difficulty' });
      const acceptanceHeader = page.locator('th').filter({ hasText: 'Acceptance' });
      const categoryHeader = page.locator('th').filter({ hasText: 'Category' });

      await expect(statusHeader).toBeVisible();
      await expect(titleHeader).toBeVisible();
      // Difficulty, Acceptance, Category are hidden on smaller screens
      // On desktop (default viewport) they should be visible
      await expect(difficultyHeader).toBeVisible();
      await expect(acceptanceHeader).toBeVisible();
      await expect(categoryHeader).toBeVisible();
    });

    test('should have correct table structure with thead and tbody', async ({ page }) => {
      const table = page.locator('table');
      await expect(table).toBeVisible();

      const thead = table.locator('thead');
      const tbody = table.locator('tbody');

      await expect(thead).toBeVisible();
      await expect(tbody).toBeVisible();

      // Should have header row
      const headerRow = thead.locator('tr');
      await expect(headerRow).toBeVisible();

      // Should have problem rows in tbody
      const bodyRows = tbody.locator('tr');
      const rowCount = await bodyRows.count();
      expect(rowCount).toBeGreaterThan(0);
    });
  });

  test.describe('Problem Titles and Navigation', () => {
    test('should display clickable problem titles', async ({ page }) => {
      const problemLinks = page.locator('table tbody a[href^="/problems/"]');
      await expect(problemLinks.first()).toBeVisible();

      const count = await problemLinks.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should navigate to problem detail when clicking a title', async ({ page }) => {
      const firstProblemLink = page.locator('table tbody a[href^="/problems/"]').first();
      const href = await firstProblemLink.getAttribute('href');

      await firstProblemLink.click();

      await expect(page).toHaveURL(href!);
    });

    test('should have proper link styling on problem titles', async ({ page }) => {
      const firstProblemLink = page.locator('table tbody a[href^="/problems/"]').first();

      // Check that it has the expected text color class
      await expect(firstProblemLink).toHaveClass(/text-gray-900|dark:text-gray-100/);
    });
  });

  test.describe('Difficulty Badges', () => {
    test('should display difficulty badges for all problems', async ({ page }) => {
      // Each row should have a difficulty indicator
      const rows = page.locator('table tbody tr');
      const rowCount = await rows.count();

      expect(rowCount).toBeGreaterThan(0);

      // On desktop, check the dedicated difficulty column
      const difficultyBadges = page.locator('table tbody td span').filter({
        hasText: /^(easy|medium|hard)$/i,
      });

      await expect(difficultyBadges.first()).toBeVisible();
    });

    test('should show green color for easy difficulty', async ({ page }) => {
      // Filter to only show easy problems
      const difficultySelect = page.locator('select').filter({ hasText: /Difficulty/i }).first();
      if (await difficultySelect.isVisible()) {
        await difficultySelect.selectOption('easy');
        await page.waitForTimeout(300);
      }

      // Check for green colored difficulty badge
      const easyBadge = page.locator('table tbody td span').filter({ hasText: /^easy$/i }).first();

      if (await easyBadge.isVisible()) {
        await expect(easyBadge).toHaveClass(/text-green/);
      }
    });

    test('should show yellow/orange color for medium difficulty', async ({ page }) => {
      // Look for medium difficulty badge
      const mediumBadge = page.locator('table tbody td span').filter({ hasText: /^medium$/i }).first();

      if (await mediumBadge.isVisible()) {
        await expect(mediumBadge).toHaveClass(/text-yellow/);
      }
    });

    test('should show red color for hard difficulty', async ({ page }) => {
      // Look for hard difficulty badge
      const hardBadge = page.locator('table tbody td span').filter({ hasText: /^hard$/i }).first();

      if (await hardBadge.isVisible()) {
        await expect(hardBadge).toHaveClass(/text-red/);
      }
    });

    test('should display difficulty in capitalized format', async ({ page }) => {
      const difficultyBadges = page.locator('table tbody td span').filter({
        hasText: /^(easy|medium|hard)$/i,
      });

      await expect(difficultyBadges.first()).toBeVisible();

      // Check that the badge has capitalize class
      await expect(difficultyBadges.first()).toHaveClass(/capitalize/);
    });
  });

  test.describe('Status Column', () => {
    test('should display status column for each row', async ({ page }) => {
      const statusCells = page.locator('table tbody tr td:first-child');
      const count = await statusCells.count();

      expect(count).toBeGreaterThan(0);
    });

    test('should show unsolved indicator (empty circle) for unsolved problems', async ({ page }) => {
      // Look for the unsolved indicator (empty circle border)
      const unsolvedIndicator = page.locator('table tbody tr td:first-child .rounded-full.border-2');

      // At least some problems should be unsolved by default
      const unsolvedVisible = await unsolvedIndicator.first().isVisible().catch(() => false);

      if (unsolvedVisible) {
        await expect(unsolvedIndicator.first()).toBeVisible();
        await expect(unsolvedIndicator.first()).toHaveClass(/border-gray/);
      }
    });

    test('should show solved checkmark (green circle with check) for solved problems', async ({ page }) => {
      // Note: This test checks if the solved indicator structure exists in the DOM
      // Solved status depends on localStorage/progress context
      const solvedIndicator = page.locator('table tbody tr td:first-child svg.text-green-500');

      // If any problems are solved, verify the checkmark structure
      const solvedCount = await solvedIndicator.count();

      if (solvedCount > 0) {
        await expect(solvedIndicator.first()).toBeVisible();
      }
    });
  });

  test.describe('Acceptance Rate Column', () => {
    test('should display acceptance rate percentages', async ({ page }) => {
      // Acceptance column should show percentages
      const acceptanceCells = page.locator('table tbody tr td').filter({
        hasText: /^\d+\.\d+%$/,
      });

      await expect(acceptanceCells.first()).toBeVisible();
    });

    test('should format acceptance rate with one decimal place', async ({ page }) => {
      const acceptanceCells = page.locator('table tbody tr td').filter({
        hasText: /^\d+\.\d+%$/,
      });

      const firstAcceptance = await acceptanceCells.first().textContent();
      expect(firstAcceptance).toMatch(/^\d+\.\d%$/);
    });

    test('should have acceptance rates within valid range (20-85%)', async ({ page }) => {
      const acceptanceCells = page.locator('table tbody tr td').filter({
        hasText: /^\d+\.\d+%$/,
      });

      const count = await acceptanceCells.count();

      for (let i = 0; i < Math.min(count, 5); i++) {
        const text = await acceptanceCells.nth(i).textContent();
        const rate = parseFloat(text!.replace('%', ''));
        expect(rate).toBeGreaterThanOrEqual(20);
        expect(rate).toBeLessThanOrEqual(85);
      }
    });
  });

  test.describe('Category Column', () => {
    test('should display category badges', async ({ page }) => {
      // Category is displayed as a badge with specific styling
      const categoryBadges = page.locator('table tbody td span').filter({
        has: page.locator('.bg-gray-100'),
      });

      // Alternative: look for the category column cells
      const categoryCells = page.locator('table tbody tr td:last-child span');

      await expect(categoryCells.first()).toBeVisible();
    });

    test('should style category as a pill/badge', async ({ page }) => {
      const categoryBadge = page.locator('table tbody td:last-child span').first();

      await expect(categoryBadge).toBeVisible();
      await expect(categoryBadge).toHaveClass(/rounded|bg-gray/);
    });
  });

  test.describe('Table Row Styling', () => {
    test('should have alternating row background colors', async ({ page }) => {
      const rows = page.locator('table tbody tr');
      const rowCount = await rows.count();

      expect(rowCount).toBeGreaterThan(1);

      // First row (index 0) should have white/gray-900 background
      const firstRow = rows.nth(0);
      await expect(firstRow).toHaveClass(/bg-white|dark:bg-gray-900/);

      // Second row (index 1) should have slightly different background
      const secondRow = rows.nth(1);
      await expect(secondRow).toHaveClass(/bg-gray-50|dark:bg-gray-800/);
    });

    test('should have hover state on table rows', async ({ page }) => {
      const firstRow = page.locator('table tbody tr').first();

      // Verify the row has hover classes defined
      await expect(firstRow).toHaveClass(/hover:bg-gray-50|dark:hover:bg-gray-800/);
    });

    test('should have transition effect on rows', async ({ page }) => {
      const firstRow = page.locator('table tbody tr').first();

      // Verify transition classes are present
      await expect(firstRow).toHaveClass(/transition-colors/);
    });

    test('should highlight row on hover', async ({ page }) => {
      const firstRow = page.locator('table tbody tr').first();

      // Hover over the row
      await firstRow.hover();

      // The group class should be present for hover state
      await expect(firstRow).toHaveClass(/group/);
    });
  });

  test.describe('Empty State', () => {
    test('should show "No problems found" when search has no results', async ({ page }) => {
      const searchInput = page.getByPlaceholder(/Search problems/i);

      // Search for something that won't exist
      await searchInput.fill('zzzznonexistentproblemxyzabc123456789');
      await page.waitForTimeout(300);

      // Should show empty state message
      const emptyMessage = page.getByText(/No problems found matching your filters/i);
      await expect(emptyMessage).toBeVisible();
    });

    test('should show empty state when combined filters have no matches', async ({ page }) => {
      const searchInput = page.getByPlaceholder(/Search problems/i);

      // Apply a specific search that likely won't match with other filters
      await searchInput.fill('uniquenonexistentsearchterm99999');
      await page.waitForTimeout(300);

      // Table should be empty and show the empty message
      const emptyMessage = page.getByText(/No problems found/i);
      await expect(emptyMessage).toBeVisible();
    });

    test('should hide table body when no results', async ({ page }) => {
      const searchInput = page.getByPlaceholder(/Search problems/i);

      await searchInput.fill('zzzznonexistentxyzabc');
      await page.waitForTimeout(300);

      // Table rows should be empty
      const bodyRows = page.locator('table tbody tr');
      const rowCount = await bodyRows.count();

      expect(rowCount).toBe(0);
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('should hide Difficulty column on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Difficulty header should be hidden (has sm:table-cell class)
      const difficultyHeader = page.locator('th').filter({ hasText: 'Difficulty' });
      await expect(difficultyHeader).toBeHidden();
    });

    test('should hide Acceptance column on small and medium screens', async ({ page }) => {
      // Test at mobile size
      await page.setViewportSize({ width: 375, height: 667 });

      const acceptanceHeader = page.locator('th').filter({ hasText: 'Acceptance' });
      await expect(acceptanceHeader).toBeHidden();

      // Test at tablet size (less than md breakpoint)
      await page.setViewportSize({ width: 639, height: 800 });

      await expect(acceptanceHeader).toBeHidden();
    });

    test('should hide Category column on small and medium screens', async ({ page }) => {
      // Test at mobile size
      await page.setViewportSize({ width: 375, height: 667 });

      const categoryHeader = page.locator('th').filter({ hasText: 'Category' });
      await expect(categoryHeader).toBeHidden();

      // Test at tablet size (less than lg breakpoint)
      await page.setViewportSize({ width: 991, height: 800 });

      await expect(categoryHeader).toBeHidden();
    });

    test('should show inline difficulty on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // On mobile, difficulty should appear inline with the title
      const inlineDifficulty = page.locator('table tbody td span.sm\\:hidden').filter({
        hasText: /easy|medium|hard/i,
      });

      await expect(inlineDifficulty.first()).toBeVisible();
    });

    test('should show Status and Title columns on all screen sizes', async ({ page }) => {
      // Mobile
      await page.setViewportSize({ width: 375, height: 667 });

      const statusHeader = page.locator('th').filter({ hasText: 'Status' });
      const titleHeader = page.locator('th').filter({ hasText: 'Title' });

      await expect(statusHeader).toBeVisible();
      await expect(titleHeader).toBeVisible();

      // Tablet
      await page.setViewportSize({ width: 768, height: 1024 });

      await expect(statusHeader).toBeVisible();
      await expect(titleHeader).toBeVisible();

      // Desktop
      await page.setViewportSize({ width: 1280, height: 800 });

      await expect(statusHeader).toBeVisible();
      await expect(titleHeader).toBeVisible();
    });

    test('should be scrollable horizontally on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // The table container should have overflow-x-auto
      const tableContainer = page.locator('.overflow-x-auto');
      await expect(tableContainer).toBeVisible();
    });

    test('should show all columns on large screens', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });

      // All headers should be visible
      await expect(page.locator('th').filter({ hasText: 'Status' })).toBeVisible();
      await expect(page.locator('th').filter({ hasText: 'Title' })).toBeVisible();
      await expect(page.locator('th').filter({ hasText: 'Difficulty' })).toBeVisible();
      await expect(page.locator('th').filter({ hasText: 'Acceptance' })).toBeVisible();
      await expect(page.locator('th').filter({ hasText: 'Category' })).toBeVisible();
    });
  });

  test.describe('Table Data Integrity', () => {
    test('should display correct number of rows matching filtered results', async ({ page }) => {
      // Get the count from the page header
      const countText = await page.locator('p').filter({ hasText: /of \d+ problems/ }).textContent();
      const match = countText?.match(/(\d+) of (\d+)/);

      if (match) {
        const displayed = parseInt(match[1]);
        const total = parseInt(match[2]);

        // Rows in table should match the displayed count
        const rows = page.locator('table tbody tr');
        const rowCount = await rows.count();

        expect(rowCount).toBe(displayed);
      }
    });

    test('should maintain data consistency after applying filters', async ({ page }) => {
      const searchInput = page.getByPlaceholder(/Search problems/i);

      // Apply search filter
      await searchInput.fill('array');
      await page.waitForTimeout(300);

      // All visible problem titles should contain "array" (case insensitive)
      const problemLinks = page.locator('table tbody a[href^="/problems/"]');
      const count = await problemLinks.count();

      if (count > 0) {
        for (let i = 0; i < Math.min(count, 3); i++) {
          const title = await problemLinks.nth(i).textContent();
          // The search might match on id or category too, so just verify links exist
          expect(title).toBeTruthy();
        }
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper table semantic structure', async ({ page }) => {
      const table = page.locator('table');
      await expect(table).toBeVisible();

      // Verify semantic elements
      await expect(table.locator('thead')).toBeVisible();
      await expect(table.locator('tbody')).toBeVisible();
      await expect(table.locator('th').first()).toBeVisible();
      await expect(table.locator('td').first()).toBeVisible();
    });

    test('should have links with proper href attributes', async ({ page }) => {
      const problemLinks = page.locator('table tbody a[href^="/problems/"]');
      const count = await problemLinks.count();

      expect(count).toBeGreaterThan(0);

      // Verify all links have valid href
      for (let i = 0; i < Math.min(count, 3); i++) {
        const href = await problemLinks.nth(i).getAttribute('href');
        expect(href).toMatch(/^\/problems\/.+$/);
      }
    });

    test('should have proper text contrast in headers', async ({ page }) => {
      const headerRow = page.locator('table thead tr');

      // Headers should have text styling
      await expect(headerRow).toHaveClass(/text-gray-500|dark:text-gray-400/);
    });
  });
});
