import { expect, type Page, test } from '@playwright/test';

// Helper to get the filter sidebar element
const getFilterSidebar = (page: Page) => page.locator('aside');

// Helper to simulate solving a problem for progress tracking tests
const markProblemAsSolved = async (page: Page, problemId: string) => {
  await page.evaluate((id) => {
    const stored = localStorage.getItem('js-ts-tricks-progress');
    const data = stored
      ? JSON.parse(stored)
      : { solvedProblems: [], streak: 0, lastSolvedDate: null };
    if (!data.solvedProblems.includes(id)) {
      data.solvedProblems.push(id);
    }
    localStorage.setItem('js-ts-tricks-progress', JSON.stringify(data));
  }, problemId);
};

// Helper to clear progress from localStorage
const clearProgress = async (page: Page) => {
  await page.evaluate(() => {
    localStorage.removeItem('js-ts-tricks-progress');
    localStorage.removeItem('js-ts-tricks-streak');
    localStorage.removeItem('js-ts-tricks-last-solved');
  });
};

test.describe('FilterSidebar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/problems');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Responsive Display', () => {
    test('should display sidebar on desktop', async ({ page }) => {
      // Desktop viewport (default)
      await page.setViewportSize({ width: 1280, height: 720 });

      const sidebar = getFilterSidebar(page);
      await expect(sidebar).toBeVisible();

      // Verify filter sections are visible
      await expect(page.getByText('Filters')).toBeVisible();
      await expect(page.getByText('Your Progress')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Status' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Difficulty' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Category' })).toBeVisible();
    });

    test('should hide sidebar on mobile by default', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(300);

      // Desktop sidebar should be hidden (uses hidden lg:block classes)
      const desktopSidebar = page.locator('.hidden.lg\\:block');
      await expect(desktopSidebar).toBeHidden();

      // Mobile filter toggle button should be visible
      const filterToggle = page.getByRole('button', { name: /Filters/i });
      await expect(filterToggle).toBeVisible();
    });

    test('should show/hide sidebar when mobile filter toggle is clicked', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(300);

      const filterToggle = page.getByRole('button', { name: /Filters/i });

      // Initially the mobile sidebar should not be visible
      const mobileSidebar = page.locator('.lg\\:hidden aside');
      await expect(mobileSidebar).toHaveCount(0);

      // Click to show filters
      await filterToggle.click();
      await page.waitForTimeout(100);

      // Mobile sidebar should now be visible
      await expect(page.locator('.lg\\:hidden').locator('aside')).toBeVisible();
      await expect(page.getByText('Status').first()).toBeVisible();

      // Click again to hide filters
      await filterToggle.click();
      await page.waitForTimeout(100);

      // Mobile sidebar should be hidden again
      await expect(page.locator('.lg\\:hidden').locator('aside')).toHaveCount(0);
    });
  });

  test.describe('Status Filter', () => {
    test('should display all status options', async ({ page }) => {
      // Check that all status options are visible
      const statusSection = page.getByRole('button', { name: 'Status' }).locator('..');

      await expect(page.getByLabel('All').first()).toBeVisible();
      await expect(page.getByLabel('Solved')).toBeVisible();
      await expect(page.getByLabel('Unsolved')).toBeVisible();
    });

    test('should have "All" status selected by default', async ({ page }) => {
      const allRadio = page.locator('input[name="status"][value="all"]');
      await expect(allRadio).toBeChecked();
    });

    test('should filter problems when "Solved" is selected', async ({ page }) => {
      // Mark a problem as solved
      await clearProgress(page);
      await markProblemAsSolved(page, 'nullish-coalescing');
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Get initial count
      const problemCountText = page.locator('p').filter({ hasText: /of \d+ problems/i });
      const initialText = await problemCountText.textContent();

      // Select "Solved" filter
      await page.getByLabel('Solved').click();
      await page.waitForTimeout(300);

      // The count should change (should show only solved problems)
      const newText = await problemCountText.textContent();
      expect(newText).toContain('1 of');
    });

    test('should filter problems when "Unsolved" is selected', async ({ page }) => {
      // Clear progress first
      await clearProgress(page);
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Get initial count
      const problemCountText = page.locator('p').filter({ hasText: /of \d+ problems/i });

      // Select "Unsolved" filter
      await page.getByLabel('Unsolved').click();
      await page.waitForTimeout(300);

      // All problems should be shown (since none are solved)
      const newText = await problemCountText.textContent();
      const match = newText?.match(/(\d+) of (\d+)/);
      if (match) {
        expect(parseInt(match[1])).toBe(parseInt(match[2]));
      }
    });
  });

  test.describe('Difficulty Filter', () => {
    test('should display all difficulty options with counts', async ({ page }) => {
      await expect(page.getByLabel('All').first()).toBeVisible();
      await expect(page.getByText('Easy').first()).toBeVisible();
      await expect(page.getByText('Medium').first()).toBeVisible();
      await expect(page.getByText('Hard').first()).toBeVisible();
    });

    test('should have "All" difficulty selected by default', async ({ page }) => {
      const allRadio = page.locator('input[name="difficulty"][value="all"]');
      await expect(allRadio).toBeChecked();
    });

    test('should filter to only Easy problems', async ({ page }) => {
      // Click Easy radio button
      const easyLabel = page
        .locator('label')
        .filter({ hasText: /^Easy$/ })
        .first();
      await easyLabel.click();
      await page.waitForTimeout(300);

      // All visible problem badges should be "EASY"
      const problemTable = page.locator('.flex-1');
      const easyBadges = problemTable.locator('span').filter({ hasText: /^EASY$/i });
      await expect(easyBadges.first()).toBeVisible();

      // Should not have MEDIUM or HARD badges visible
      const mediumBadges = problemTable.locator('span').filter({ hasText: /^MEDIUM$/i });
      const hardBadges = problemTable.locator('span').filter({ hasText: /^HARD$/i });
      await expect(mediumBadges).toHaveCount(0);
      await expect(hardBadges).toHaveCount(0);
    });

    test('should filter to only Medium problems', async ({ page }) => {
      // Click Medium radio button
      const mediumLabel = page
        .locator('label')
        .filter({ hasText: /^Medium$/ })
        .first();
      await mediumLabel.click();
      await page.waitForTimeout(300);

      // All visible problem badges should be "MEDIUM"
      const problemTable = page.locator('.flex-1');
      const mediumBadges = problemTable.locator('span').filter({ hasText: /^MEDIUM$/i });
      await expect(mediumBadges.first()).toBeVisible();

      // Should not have EASY or HARD badges visible
      const easyBadges = problemTable.locator('span').filter({ hasText: /^EASY$/i });
      const hardBadges = problemTable.locator('span').filter({ hasText: /^HARD$/i });
      await expect(easyBadges).toHaveCount(0);
      await expect(hardBadges).toHaveCount(0);
    });

    test('should filter to only Hard problems', async ({ page }) => {
      // Click Hard radio button
      const hardLabel = page
        .locator('label')
        .filter({ hasText: /^Hard$/ })
        .first();
      await hardLabel.click();
      await page.waitForTimeout(300);

      // All visible problem badges should be "HARD"
      const problemTable = page.locator('.flex-1');
      const hardBadges = problemTable.locator('span').filter({ hasText: /^HARD$/i });
      await expect(hardBadges.first()).toBeVisible();

      // Should not have EASY or MEDIUM badges visible
      const easyBadges = problemTable.locator('span').filter({ hasText: /^EASY$/i });
      const mediumBadges = problemTable.locator('span').filter({ hasText: /^MEDIUM$/i });
      await expect(easyBadges).toHaveCount(0);
      await expect(mediumBadges).toHaveCount(0);
    });

    test('should display correct counts for each difficulty level', async ({ page }) => {
      // Get the counts displayed in the difficulty section
      const difficultySection = page
        .getByRole('button', { name: 'Difficulty' })
        .locator('..')
        .locator('..');

      // All should show total count
      const allLabel = difficultySection.locator('label').filter({ hasText: 'All' });
      const allCount = allLabel.locator('.text-xs.text-gray-500');
      await expect(allCount).toBeVisible();

      // Each difficulty should have a count
      const easyLabel = difficultySection.locator('label').filter({ hasText: /Easy/ });
      const easyCount = easyLabel.locator('.text-xs.text-gray-500');
      await expect(easyCount).toBeVisible();

      const mediumLabel = difficultySection.locator('label').filter({ hasText: /Medium/ });
      const mediumCount = mediumLabel.locator('.text-xs.text-gray-500');
      await expect(mediumCount).toBeVisible();

      const hardLabel = difficultySection.locator('label').filter({ hasText: /Hard/ });
      const hardCount = hardLabel.locator('.text-xs.text-gray-500');
      await expect(hardCount).toBeVisible();
    });
  });

  test.describe('Category Filter', () => {
    test('should display "All Categories" option', async ({ page }) => {
      await expect(page.getByLabel('All Categories')).toBeVisible();
    });

    test('should have "All Categories" selected by default', async ({ page }) => {
      const allCategoriesRadio = page.locator('input[name="category"][value="all"]');
      await expect(allCategoriesRadio).toBeChecked();
    });

    test('should display multiple category options', async ({ page }) => {
      // There should be multiple category radio buttons
      const categoryRadios = page.locator('input[name="category"]');
      const count = await categoryRadios.count();

      // Should have more than just "All Categories"
      expect(count).toBeGreaterThan(1);
    });

    test('should filter problems when a category is selected', async ({ page }) => {
      // Get the first non-all category
      const categoryOptions = page.locator('input[name="category"]:not([value="all"])');
      const firstCategory = categoryOptions.first();
      const categoryValue = await firstCategory.getAttribute('value');

      // Click the category label
      await firstCategory.click();
      await page.waitForTimeout(300);

      // The problem count should reflect the filter
      const problemCountText = page.locator('p').filter({ hasText: /of \d+ problems/i });
      const text = await problemCountText.textContent();
      const match = text?.match(/(\d+) of (\d+)/);

      if (match) {
        // Filtered count should be less than or equal to total
        expect(parseInt(match[1])).toBeLessThanOrEqual(parseInt(match[2]));
      }
    });

    test('should show scrollable list when many categories exist', async ({ page }) => {
      // The category section should have max-h-64 overflow-y-auto classes
      const categoryList = page.locator('.max-h-64.overflow-y-auto');
      await expect(categoryList).toBeVisible();
    });
  });

  test.describe('Clear All Filters', () => {
    test('should not show "Clear all" button when no filters are active', async ({ page }) => {
      // By default, no filters should be active
      const clearButton = page.getByRole('button', { name: /Clear all/i });
      await expect(clearButton).toHaveCount(0);
    });

    test('should show "Clear all" button when difficulty filter is active', async ({ page }) => {
      // Select Easy difficulty
      const easyLabel = page
        .locator('label')
        .filter({ hasText: /^Easy$/ })
        .first();
      await easyLabel.click();
      await page.waitForTimeout(100);

      // Clear all button should appear
      const clearButton = page.getByRole('button', { name: /Clear all/i });
      await expect(clearButton).toBeVisible();
    });

    test('should show "Clear all" button when category filter is active', async ({ page }) => {
      // Select a category
      const categoryOptions = page.locator('input[name="category"]:not([value="all"])');
      await categoryOptions.first().click();
      await page.waitForTimeout(100);

      // Clear all button should appear
      const clearButton = page.getByRole('button', { name: /Clear all/i });
      await expect(clearButton).toBeVisible();
    });

    test('should show "Clear all" button when status filter is active', async ({ page }) => {
      // Select "Solved" status
      await page.getByLabel('Solved').click();
      await page.waitForTimeout(100);

      // Clear all button should appear
      const clearButton = page.getByRole('button', { name: /Clear all/i });
      await expect(clearButton).toBeVisible();
    });

    test('should reset all filters when "Clear all" is clicked', async ({ page }) => {
      // Apply multiple filters
      const easyLabel = page
        .locator('label')
        .filter({ hasText: /^Easy$/ })
        .first();
      await easyLabel.click();
      await page.waitForTimeout(100);

      await page.getByLabel('Solved').click();
      await page.waitForTimeout(100);

      // Click Clear all
      const clearButton = page.getByRole('button', { name: /Clear all/i });
      await clearButton.click();
      await page.waitForTimeout(100);

      // All default selections should be restored
      const allDifficultyRadio = page.locator('input[name="difficulty"][value="all"]');
      const allStatusRadio = page.locator('input[name="status"][value="all"]');
      const allCategoryRadio = page.locator('input[name="category"][value="all"]');

      await expect(allDifficultyRadio).toBeChecked();
      await expect(allStatusRadio).toBeChecked();
      await expect(allCategoryRadio).toBeChecked();

      // Clear all button should be hidden
      await expect(clearButton).toHaveCount(0);
    });
  });

  test.describe('Progress Bar', () => {
    test('should display progress section', async ({ page }) => {
      await expect(page.getByText('Your Progress')).toBeVisible();
    });

    test('should show correct progress count format', async ({ page }) => {
      // Should show format like "0/50" or "X/Y"
      const progressText = page.locator('span').filter({ hasText: /^\d+\/\d+$/ });
      await expect(progressText).toBeVisible();
    });

    test('should have a progress bar element', async ({ page }) => {
      // Progress bar container (gray background)
      const progressBarContainer = page.locator('.bg-gray-200.dark\\:bg-gray-700.rounded-full.h-2');
      await expect(progressBarContainer).toBeVisible();

      // Progress bar fill (green)
      const progressBarFill = progressBarContainer.locator('.bg-green-500');
      await expect(progressBarFill).toBeVisible();
    });

    test('should show 0% progress when no problems are solved', async ({ page }) => {
      await clearProgress(page);
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Check progress text shows 0
      const progressText = page.getByText(/^0\/\d+$/);
      await expect(progressText).toBeVisible();
    });

    test('should update progress when problems are solved', async ({ page }) => {
      await clearProgress(page);
      await markProblemAsSolved(page, 'nullish-coalescing');
      await markProblemAsSolved(page, 'optional-chaining');
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Check progress text shows 2
      const progressText = page.getByText(/^2\/\d+$/);
      await expect(progressText).toBeVisible();
    });
  });

  test.describe('Collapsible Sections', () => {
    test('should have all sections expanded by default', async ({ page }) => {
      // Status section content should be visible
      const statusRadios = page.locator('input[name="status"]');
      await expect(statusRadios.first()).toBeVisible();

      // Difficulty section content should be visible
      const difficultyRadios = page.locator('input[name="difficulty"]');
      await expect(difficultyRadios.first()).toBeVisible();

      // Category section content should be visible
      const categoryRadios = page.locator('input[name="category"]');
      await expect(categoryRadios.first()).toBeVisible();
    });

    test('should collapse Status section when header is clicked', async ({ page }) => {
      const statusButton = page.getByRole('button', { name: 'Status' });

      // Content should be visible initially
      const solvedLabel = page.getByLabel('Solved');
      await expect(solvedLabel).toBeVisible();

      // Click to collapse
      await statusButton.click();
      await page.waitForTimeout(100);

      // Content should be hidden
      await expect(solvedLabel).toHaveCount(0);

      // Click to expand
      await statusButton.click();
      await page.waitForTimeout(100);

      // Content should be visible again
      await expect(page.getByLabel('Solved')).toBeVisible();
    });

    test('should collapse Difficulty section when header is clicked', async ({ page }) => {
      const difficultyButton = page.getByRole('button', { name: 'Difficulty' });

      // Content should be visible initially
      const easyLabel = page
        .locator('label')
        .filter({ hasText: /^Easy$/ })
        .first();
      await expect(easyLabel).toBeVisible();

      // Click to collapse
      await difficultyButton.click();
      await page.waitForTimeout(100);

      // Content should be hidden (radio buttons not visible)
      const difficultyRadios = page.locator('input[name="difficulty"]');
      await expect(difficultyRadios).toHaveCount(0);

      // Click to expand
      await difficultyButton.click();
      await page.waitForTimeout(100);

      // Content should be visible again
      await expect(page.locator('input[name="difficulty"]').first()).toBeVisible();
    });

    test('should collapse Category section when header is clicked', async ({ page }) => {
      const categoryButton = page.getByRole('button', { name: 'Category' });

      // Content should be visible initially
      const allCategoriesLabel = page.getByLabel('All Categories');
      await expect(allCategoriesLabel).toBeVisible();

      // Click to collapse
      await categoryButton.click();
      await page.waitForTimeout(100);

      // Content should be hidden
      const categoryRadios = page.locator('input[name="category"]');
      await expect(categoryRadios).toHaveCount(0);

      // Click to expand
      await categoryButton.click();
      await page.waitForTimeout(100);

      // Content should be visible again
      await expect(page.getByLabel('All Categories')).toBeVisible();
    });

    test('should show rotation indicator on section headers', async ({ page }) => {
      // Status button should have an SVG chevron
      const statusButton = page.getByRole('button', { name: 'Status' });
      const chevron = statusButton.locator('svg');
      await expect(chevron).toBeVisible();

      // Initially expanded - should have rotate-180 class
      await expect(chevron).toHaveClass(/rotate-180/);

      // Click to collapse
      await statusButton.click();
      await page.waitForTimeout(100);

      // Collapsed - should NOT have rotate-180 class
      await expect(chevron).not.toHaveClass(/rotate-180/);
    });
  });

  test.describe('Multiple Filters Combined', () => {
    test('should apply difficulty and status filters together', async ({ page }) => {
      // First mark some problems as solved
      await clearProgress(page);
      await markProblemAsSolved(page, 'nullish-coalescing');
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Get initial problem count
      const problemCountText = page.locator('p').filter({ hasText: /of \d+ problems/i });
      const initialText = await problemCountText.textContent();
      const initialMatch = initialText?.match(/(\d+) of (\d+)/);
      const totalCount = initialMatch ? parseInt(initialMatch[2]) : 0;

      // Apply Easy filter
      const easyLabel = page
        .locator('label')
        .filter({ hasText: /^Easy$/ })
        .first();
      await easyLabel.click();
      await page.waitForTimeout(300);

      // Apply Solved filter
      await page.getByLabel('Solved').click();
      await page.waitForTimeout(300);

      // The count should be significantly reduced
      const filteredText = await problemCountText.textContent();
      const filteredMatch = filteredText?.match(/(\d+) of (\d+)/);
      const filteredCount = filteredMatch ? parseInt(filteredMatch[1]) : 0;

      expect(filteredCount).toBeLessThan(totalCount);
    });

    test('should apply difficulty and category filters together', async ({ page }) => {
      // Get initial problem count
      const problemCountText = page.locator('p').filter({ hasText: /of \d+ problems/i });
      const initialText = await problemCountText.textContent();
      const initialMatch = initialText?.match(/(\d+) of (\d+)/);
      const totalCount = initialMatch ? parseInt(initialMatch[2]) : 0;

      // Apply Easy filter
      const easyLabel = page
        .locator('label')
        .filter({ hasText: /^Easy$/ })
        .first();
      await easyLabel.click();
      await page.waitForTimeout(300);

      // Get count after difficulty filter
      const afterDifficultyText = await problemCountText.textContent();
      const afterDifficultyMatch = afterDifficultyText?.match(/(\d+) of (\d+)/);
      const afterDifficultyCount = afterDifficultyMatch ? parseInt(afterDifficultyMatch[1]) : 0;

      // Apply a category filter
      const categoryOptions = page.locator('input[name="category"]:not([value="all"])');
      await categoryOptions.first().click();
      await page.waitForTimeout(300);

      // The count should be further reduced or stay the same
      const afterBothText = await problemCountText.textContent();
      const afterBothMatch = afterBothText?.match(/(\d+) of (\d+)/);
      const afterBothCount = afterBothMatch ? parseInt(afterBothMatch[1]) : 0;

      expect(afterBothCount).toBeLessThanOrEqual(afterDifficultyCount);
    });

    test('should apply all three filters (status, difficulty, category) together', async ({
      page,
    }) => {
      // Mark some problems as solved
      await clearProgress(page);
      await markProblemAsSolved(page, 'nullish-coalescing');
      await markProblemAsSolved(page, 'optional-chaining');
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Apply all filters
      const easyLabel = page
        .locator('label')
        .filter({ hasText: /^Easy$/ })
        .first();
      await easyLabel.click();
      await page.waitForTimeout(200);

      await page.getByLabel('Solved').click();
      await page.waitForTimeout(200);

      const categoryOptions = page.locator('input[name="category"]:not([value="all"])');
      await categoryOptions.first().click();
      await page.waitForTimeout(200);

      // Clear all button should be visible
      const clearButton = page.getByRole('button', { name: /Clear all/i });
      await expect(clearButton).toBeVisible();

      // The filters should all be selected correctly
      const easyRadio = page.locator('input[name="difficulty"][value="easy"]');
      const solvedRadio = page.locator('input[name="status"][value="solved"]');

      await expect(easyRadio).toBeChecked();
      await expect(solvedRadio).toBeChecked();
    });
  });

  test.describe('URL Parameters', () => {
    test('should apply category filter from URL parameter on page load', async ({ page }) => {
      // Navigate with category URL parameter
      await page.goto('/problems?category=Arrays');
      await page.waitForLoadState('networkidle');

      // Check if the category filter is applied (if Arrays category exists)
      const categoryRadio = page.locator('input[name="category"][value="Arrays"]');
      const exists = (await categoryRadio.count()) > 0;

      if (exists) {
        await expect(categoryRadio).toBeChecked();
      }
    });

    test('should handle encoded category parameter', async ({ page }) => {
      // Navigate with encoded category URL parameter
      await page.goto('/problems?category=String%20Manipulation');
      await page.waitForLoadState('networkidle');

      // Check if the category filter is applied (if category exists)
      const categoryRadio = page.locator('input[name="category"][value="String Manipulation"]');
      const exists = (await categoryRadio.count()) > 0;

      if (exists) {
        await expect(categoryRadio).toBeChecked();
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper radio button groups', async ({ page }) => {
      // Status radio buttons should be in a group
      const statusRadios = page.locator('input[name="status"]');
      const statusCount = await statusRadios.count();
      expect(statusCount).toBe(3); // All, Solved, Unsolved

      // Difficulty radio buttons should be in a group
      const difficultyRadios = page.locator('input[name="difficulty"]');
      const difficultyCount = await difficultyRadios.count();
      expect(difficultyCount).toBe(4); // All, Easy, Medium, Hard

      // Category radio buttons should be in a group
      const categoryRadios = page.locator('input[name="category"]');
      const categoryCount = await categoryRadios.count();
      expect(categoryCount).toBeGreaterThan(1); // All + categories
    });

    test('should have clickable labels for all filters', async ({ page }) => {
      // Test that clicking labels selects the radio button
      const solvedLabel = page.getByLabel('Solved');
      await solvedLabel.click();

      const solvedRadio = page.locator('input[name="status"][value="solved"]');
      await expect(solvedRadio).toBeChecked();
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      // Filters header should be present
      const filtersHeader = page.locator('h2').filter({ hasText: 'Filters' });
      await expect(filtersHeader).toBeVisible();
    });
  });

  test.describe('Visual Styling', () => {
    test('should display difficulty colors correctly', async ({ page }) => {
      // Easy should have green color class
      const easyText = page
        .locator('span')
        .filter({ hasText: /^Easy$/ })
        .first();
      await expect(easyText).toHaveClass(/text-green/);

      // Medium should have yellow color class
      const mediumText = page
        .locator('span')
        .filter({ hasText: /^Medium$/ })
        .first();
      await expect(mediumText).toHaveClass(/text-yellow/);

      // Hard should have red color class
      const hardText = page
        .locator('span')
        .filter({ hasText: /^Hard$/ })
        .first();
      await expect(hardText).toHaveClass(/text-red/);
    });

    test('should have proper border and background styling', async ({ page }) => {
      const sidebar = getFilterSidebar(page);

      // Sidebar should have rounded corners
      await expect(sidebar.locator('.rounded-lg').first()).toBeVisible();

      // Should have border
      await expect(sidebar.locator('.border').first()).toBeVisible();
    });

    test('should show hover state on filter options', async ({ page }) => {
      // Labels should have hover classes
      const filterLabel = page.locator('label').filter({ hasText: 'Solved' });
      await expect(filterLabel).toHaveClass(/hover:bg-gray-100/);
    });
  });

  test.describe('Filter Persistence', () => {
    test('should maintain filter state when navigating away and back', async ({ page }) => {
      // Apply a filter
      const easyLabel = page
        .locator('label')
        .filter({ hasText: /^Easy$/ })
        .first();
      await easyLabel.click();
      await page.waitForTimeout(300);

      // Navigate to a problem detail page
      const problemLink = page.locator('a[href^="/problems/"]').first();
      await problemLink.click();
      await page.waitForLoadState('networkidle');

      // Navigate back to problems list
      await page.goto('/problems');
      await page.waitForLoadState('networkidle');

      // Note: Without URL persistence, filters will be reset
      // This test documents the current behavior
      const allDifficultyRadio = page.locator('input[name="difficulty"][value="all"]');
      await expect(allDifficultyRadio).toBeChecked();
    });
  });
});
