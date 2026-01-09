import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the home page with correct title', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/JavaScript & TypeScript Tricks/);
  });

  test('should display main heading', async ({ page }) => {
    const heading = page.getByRole('heading', {
      name: /JavaScript & TypeScript Tricks/i,
      level: 1,
    });
    await expect(heading).toBeVisible();
  });

  test('should display subtitle/description', async ({ page }) => {
    const description = page.getByText(/Master advanced JavaScript and TypeScript patterns/i);
    await expect(description).toBeVisible();
  });

  test('should display statistics cards', async ({ page }) => {
    // Check for Total Problems stat card
    await expect(page.getByText('Total Problems')).toBeVisible();

    // Check for difficulty stat cards
    await expect(page.getByText('Easy').first()).toBeVisible();
    await expect(page.getByText('Medium').first()).toBeVisible();
    await expect(page.getByText('Hard').first()).toBeVisible();
  });

  test('should display stat numbers (non-zero problem counts)', async ({ page }) => {
    // Wait for stats to load - check for the stats grid section
    const statsGrid = page.locator('.grid.grid-cols-1.md\\:grid-cols-4');
    await expect(statsGrid).toBeVisible();

    // The stat cards should contain the total count
    const statCards = statsGrid.locator('.text-3xl.font-bold');
    await expect(statCards).toHaveCount(4); // Total, Easy, Medium, Hard

    // The first stat card should show total problems (should be > 0)
    const totalProblemsCard = statCards.first();
    await expect(totalProblemsCard).toBeVisible();

    // Get the text content and verify it's a number > 0
    const totalText = await totalProblemsCard.textContent();
    expect(Number(totalText)).toBeGreaterThan(0);
  });

  test('should display "Start Practicing" button/link', async ({ page }) => {
    const startButton = page.getByRole('link', { name: /Start Practicing/i });
    await expect(startButton).toBeVisible();
    await expect(startButton).toHaveAttribute('href', '/problems');
  });

  test('should navigate to problems page when clicking "Start Practicing"', async ({ page }) => {
    const startButton = page.getByRole('link', { name: /Start Practicing/i });
    await startButton.click();

    // Verify navigation to problems page
    await expect(page).toHaveURL('/problems');
  });

  test('should display Topics Covered section', async ({ page }) => {
    const topicsHeading = page.getByRole('heading', {
      name: /Topics Covered/i,
      level: 2,
    });
    await expect(topicsHeading).toBeVisible();
  });

  test('should display category cards in Topics Covered section', async ({ page }) => {
    // There should be multiple category cards
    // Each category card contains the category name and problem count
    const categoryCards = page
      .locator('.bg-white.dark\\:bg-gray-800.rounded-lg.shadow.p-6')
      .filter({ hasText: /problems?/i });

    // Should have at least one category
    await expect(categoryCards.first()).toBeVisible();
  });

  test('should display Features section', async ({ page }) => {
    const featuresHeading = page.getByRole('heading', {
      name: /Features/i,
      level: 2,
    });
    await expect(featuresHeading).toBeVisible();
  });

  test('should display feature items', async ({ page }) => {
    // Check for specific feature texts
    await expect(page.getByText('Interactive Code Editor')).toBeVisible();
    await expect(page.getByText('Automated Testing')).toBeVisible();
    await expect(page.getByText('Detailed Explanations')).toBeVisible();
    await expect(page.getByText('Progressive Difficulty')).toBeVisible();
  });

  test('should have correct page structure and layout', async ({ page }) => {
    // Check that main container exists
    const mainContainer = page.locator('.min-h-screen');
    await expect(mainContainer).toBeVisible();

    // Check for centered content container
    const contentContainer = page.locator('.max-w-7xl.mx-auto');
    await expect(contentContainer).toBeVisible();
  });

  test('should be responsive (mobile view)', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    // Main elements should still be visible
    await expect(
      page.getByRole('heading', { name: /JavaScript & TypeScript Tricks/i })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /Start Practicing/i })).toBeVisible();
  });
});
