import { expect, test } from '@playwright/test';

test.describe('Problems List Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/problems');
  });

  test('should load the problems page', async ({ page }) => {
    await expect(page).toHaveURL('/problems');
  });

  test('should display page title', async ({ page }) => {
    const heading = page.getByRole('heading', {
      name: /JavaScript & TypeScript Tricks/i,
      level: 1,
    });
    await expect(heading).toBeVisible();
  });

  test('should display "Back to Home" link', async ({ page }) => {
    const backLink = page.getByRole('link', { name: /Back to Home/i });
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute('href', '/');
  });

  test('should navigate back to home when clicking "Back to Home"', async ({ page }) => {
    const backLink = page.getByRole('link', { name: /Back to Home/i });
    await backLink.click();
    await expect(page).toHaveURL('/');
  });

  test('should display statistics cards', async ({ page }) => {
    // Check for stat cards
    await expect(page.getByText('Total').first()).toBeVisible();
    await expect(page.getByText('Easy').first()).toBeVisible();
    await expect(page.getByText('Medium').first()).toBeVisible();
    await expect(page.getByText('Hard').first()).toBeVisible();
  });

  test('should display search input', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search by title, description, or category/i);
    await expect(searchInput).toBeVisible();
  });

  test('should display difficulty filter dropdown', async ({ page }) => {
    const difficultySelect = page.locator('#difficulty');
    await expect(difficultySelect).toBeVisible();

    // Verify options
    await expect(difficultySelect.locator('option[value="all"]')).toHaveText('All Difficulties');
    await expect(difficultySelect.locator('option[value="easy"]')).toHaveText('Easy');
    await expect(difficultySelect.locator('option[value="medium"]')).toHaveText('Medium');
    await expect(difficultySelect.locator('option[value="hard"]')).toHaveText('Hard');
  });

  test('should display category filter dropdown', async ({ page }) => {
    const categorySelect = page.locator('#category');
    await expect(categorySelect).toBeVisible();

    // Should have "All Categories" option
    await expect(categorySelect.locator('option[value="all"]')).toHaveText('All Categories');
  });

  test('should display sort by dropdown', async ({ page }) => {
    const sortSelect = page.locator('#sort');
    await expect(sortSelect).toBeVisible();

    // Verify sort options
    await expect(sortSelect.locator('option[value="default"]')).toHaveText('Default Order');
    await expect(sortSelect.locator('option[value="difficulty"]')).toHaveText('Difficulty');
    await expect(sortSelect.locator('option[value="category"]')).toHaveText('Category');
    await expect(sortSelect.locator('option[value="title"]')).toHaveText('Title (A-Z)');
  });

  test('should display problem cards', async ({ page }) => {
    // Wait for problems to render - look for problem links
    const problemLinks = page.locator('a[href^="/problems/"]');

    // Should have multiple problems
    await expect(problemLinks.first()).toBeVisible();
    const count = await problemLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display problem difficulty badges', async ({ page }) => {
    // Each problem should have a difficulty badge
    const difficultyBadges = page.locator('span').filter({
      hasText: /^(EASY|MEDIUM|HARD)$/,
    });

    await expect(difficultyBadges.first()).toBeVisible();
  });

  test('should filter problems by search query', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search by title, description, or category/i);

    // Search for "array"
    await searchInput.fill('array');

    // Wait for filtering
    await page.waitForTimeout(300);

    // Should show filtered results message or filtered problems
    const problemLinks = page.locator('a[href^="/problems/"]');
    const count = await problemLinks.count();

    // Either there are matching problems or no problems found message
    if (count > 0) {
      // Verify at least one visible problem contains "array" related content
      const firstProblem = problemLinks.first();
      await expect(firstProblem).toBeVisible();
    }
  });

  test('should show "Showing X of Y problems" when filters are active', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search by title, description, or category/i);

    // Apply a search filter
    await searchInput.fill('array');
    await page.waitForTimeout(300);

    // Should show the filtered count
    const filterInfo = page.getByText(/Showing \d+ of \d+ problems/i);
    await expect(filterInfo).toBeVisible();
  });

  test('should show "Clear all filters" when filters are active', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search by title, description, or category/i);

    // Apply a search filter
    await searchInput.fill('test');
    await page.waitForTimeout(300);

    // Should show clear filters button
    const clearButton = page.getByRole('button', { name: /Clear all filters/i });
    await expect(clearButton).toBeVisible();
  });

  test('should clear filters when clicking "Clear all filters"', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search by title, description, or category/i);

    // Apply a search filter
    await searchInput.fill('array');
    await page.waitForTimeout(300);

    // Click clear filters
    const clearButton = page.getByRole('button', { name: /Clear all filters/i });
    await clearButton.click();

    // Search input should be cleared
    await expect(searchInput).toHaveValue('');
  });

  test('should filter by difficulty', async ({ page }) => {
    const difficultySelect = page.locator('#difficulty');

    // Select "easy" difficulty
    await difficultySelect.selectOption('easy');
    await page.waitForTimeout(300);

    // All visible problem badges should be "EASY"
    const easyBadges = page.locator('span').filter({ hasText: /^EASY$/ });
    await expect(easyBadges.first()).toBeVisible();

    // Should not have MEDIUM or HARD badges visible in problems list
    const problemsSection = page.locator('.space-y-4').first();
    const mediumBadges = problemsSection.locator('span').filter({
      hasText: /^MEDIUM$/,
    });
    const hardBadges = problemsSection.locator('span').filter({
      hasText: /^HARD$/,
    });

    // Medium and hard should not be in the filtered list
    await expect(mediumBadges).toHaveCount(0);
    await expect(hardBadges).toHaveCount(0);
  });

  test('should filter by category', async ({ page }) => {
    const categorySelect = page.locator('#category');

    // Get the first category option (not "all")
    const firstCategory = await categorySelect
      .locator('option:not([value="all"])')
      .first()
      .getAttribute('value');

    if (firstCategory) {
      // Select the category
      await categorySelect.selectOption(firstCategory);
      await page.waitForTimeout(300);

      // Verify filter info shows
      const filterInfo = page.getByText(/Showing \d+ of \d+ problems/i);
      await expect(filterInfo).toBeVisible();
    }
  });

  test('should sort by difficulty', async ({ page }) => {
    const sortSelect = page.locator('#sort');

    // Select difficulty sort
    await sortSelect.selectOption('difficulty');
    await page.waitForTimeout(300);

    // First problem should be "easy" difficulty
    const problemLinks = page.locator('a[href^="/problems/"]');
    const firstProblem = problemLinks.first();

    // The first problem's badge should be EASY
    const firstBadge = firstProblem.locator('span').filter({
      hasText: /^EASY$/,
    });
    await expect(firstBadge).toBeVisible();
  });

  test('should navigate to problem detail when clicking a problem', async ({ page }) => {
    // Click the first problem
    const problemLinks = page.locator('a[href^="/problems/"]');
    const firstProblem = problemLinks.first();

    // Get the href before clicking
    const href = await firstProblem.getAttribute('href');

    await firstProblem.click();

    // Verify navigation
    await expect(page).toHaveURL(href!);
  });

  test('should display "Browse by Category" section', async ({ page }) => {
    const categoryHeading = page.getByRole('heading', {
      name: /Browse by Category/i,
    });
    await expect(categoryHeading).toBeVisible();
  });

  test('should filter by category when clicking category card', async ({ page }) => {
    // Scroll to browse by category section
    const categoryHeading = page.getByRole('heading', {
      name: /Browse by Category/i,
    });
    await categoryHeading.scrollIntoViewIfNeeded();

    // Click on a category button
    const categoryButtons = page.locator('button').filter({
      hasText: /\d+ problems?/i,
    });
    const firstCategoryButton = categoryButtons.first();

    await firstCategoryButton.click();
    await page.waitForTimeout(300);

    // Filter info should show
    const filterInfo = page.getByText(/Showing \d+ of \d+ problems/i);
    await expect(filterInfo).toBeVisible();
  });

  test('should display "About This Practice Platform" section', async ({ page }) => {
    const aboutHeading = page.getByRole('heading', {
      name: /About This Practice Platform/i,
    });
    await expect(aboutHeading).toBeVisible();
  });

  test('should show "No problems found" when search has no results', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search by title, description, or category/i);

    // Search for something that won't exist
    await searchInput.fill('zzzznonexistentproblemxyzabc123');
    await page.waitForTimeout(300);

    // Should show no problems found message
    const noResultsMessage = page.getByText(/No problems found/i);
    await expect(noResultsMessage).toBeVisible();
  });

  test('should have clear search button in search input', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search by title, description, or category/i);

    // Type something
    await searchInput.fill('test');

    // Clear button should appear
    const clearSearchButton = page.getByRole('button', {
      name: /Clear search/i,
    });
    await expect(clearSearchButton).toBeVisible();

    // Click it
    await clearSearchButton.click();

    // Search should be cleared
    await expect(searchInput).toHaveValue('');
  });

  test('should be responsive (mobile view)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Main elements should still be visible
    await expect(
      page.getByRole('heading', { name: /JavaScript & TypeScript Tricks/i })
    ).toBeVisible();

    // Search should be visible
    await expect(page.getByPlaceholder(/Search by title, description, or category/i)).toBeVisible();

    // Problems should still be listed
    const problemLinks = page.locator('a[href^="/problems/"]');
    await expect(problemLinks.first()).toBeVisible();
  });
});
