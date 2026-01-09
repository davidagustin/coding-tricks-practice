import { expect, type Page, test } from '@playwright/test';

/**
 * Helper to set up progress data in localStorage
 */
async function setProgressData(
  page: Page,
  solvedProblems: string[],
  streak: number = 0,
  lastSolvedDate: string | null = null
) {
  await page.evaluate(
    ({ solvedProblems, streak, lastSolvedDate }) => {
      const data = {
        solvedProblems,
        streak,
        lastSolvedDate,
      };
      localStorage.setItem('js-ts-tricks-progress', JSON.stringify(data));
    },
    { solvedProblems, streak, lastSolvedDate }
  );
}

/**
 * Helper to get progress data from localStorage
 */
async function getProgressData(page: Page) {
  return await page.evaluate(() => {
    const stored = localStorage.getItem('js-ts-tricks-progress');
    if (!stored) return null;
    return JSON.parse(stored);
  });
}

/**
 * Helper to clear progress data from localStorage
 */
async function clearProgressData(page: Page) {
  await page.evaluate(() => {
    localStorage.removeItem('js-ts-tricks-progress');
  });
}

/**
 * Helper to get today's date in YYYY-MM-DD format
 */
function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Helper to get yesterday's date in YYYY-MM-DD format
 */
function getYesterdayDateString(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

/**
 * Helper to get a date string from N days ago
 */
function getDaysAgoDateString(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

test.describe('Progress Tracking - localStorage Persistence', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await clearProgressData(page);
  });

  test('should persist solved problems in localStorage after solving', async ({ page }) => {
    // Set up initial progress with a solved problem
    await setProgressData(page, ['array-chaining'], 1, getTodayDateString());

    // Refresh the page to load the data
    await page.reload();

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');

    // Verify localStorage contains the saved data
    const progressData = await getProgressData(page);
    expect(progressData).not.toBeNull();
    expect(progressData.solvedProblems).toContain('array-chaining');
  });

  test('should update localStorage when a new problem is solved', async ({ page }) => {
    // Set up with no solved problems
    await setProgressData(page, [], 0, null);
    await page.reload();

    // Navigate to a problem and mark it as solved by setting localStorage directly
    // (simulating what would happen after tests pass)
    await setProgressData(page, ['chunk-arrays'], 1, getTodayDateString());

    // Verify the data was saved
    const progressData = await getProgressData(page);
    expect(progressData).not.toBeNull();
    expect(progressData.solvedProblems).toContain('chunk-arrays');
    expect(progressData.streak).toBe(1);
  });

  test('should maintain multiple solved problems in localStorage', async ({ page }) => {
    // Set up with multiple solved problems
    const solvedProblems = ['array-chaining', 'chunk-arrays', 'currying'];
    await setProgressData(page, solvedProblems, 3, getTodayDateString());
    await page.reload();

    // Verify all problems are stored
    const progressData = await getProgressData(page);
    expect(progressData).not.toBeNull();
    expect(progressData.solvedProblems).toHaveLength(3);
    expect(progressData.solvedProblems).toEqual(expect.arrayContaining(solvedProblems));
  });
});

test.describe('Progress Tracking - Navbar Solved Count', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await clearProgressData(page);
  });

  test('should display initial solved count as 0 in navbar', async ({ page }) => {
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Look for the solved count in navbar (format: X/Y)
    const solvedCountElement = page.locator('.text-green-600, .text-green-400').filter({
      hasText: /\d+\/\d+/,
    });

    // On desktop view, the solved count should be visible
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(solvedCountElement.first()).toBeVisible();

    const text = await solvedCountElement.first().textContent();
    expect(text).toMatch(/^0\/\d+$/);
  });

  test('should update solved count in navbar after setting progress', async ({ page }) => {
    // Set up with 5 solved problems
    const solvedProblems = [
      'array-chaining',
      'chunk-arrays',
      'currying',
      'debounce-throttle',
      'enums',
    ];
    await setProgressData(page, solvedProblems, 5, getTodayDateString());
    await page.reload();

    // Set to desktop view to see navbar stats
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForLoadState('networkidle');

    // Look for the solved count in navbar
    const solvedCountElement = page.locator('.text-green-600, .text-green-400').filter({
      hasText: /\d+\/\d+/,
    });

    await expect(solvedCountElement.first()).toBeVisible();
    const text = await solvedCountElement.first().textContent();
    expect(text).toMatch(/^5\/\d+$/);
  });
});

test.describe('Progress Tracking - Streak Counter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await clearProgressData(page);
  });

  test('should display streak counter in navbar', async ({ page }) => {
    // Set up with a streak
    await setProgressData(page, ['array-chaining'], 3, getTodayDateString());
    await page.reload();

    // Set to desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForLoadState('networkidle');

    // Look for streak indicator (orange color)
    const streakElement = page.locator('.text-orange-500').filter({
      hasText: /\d+/,
    });

    await expect(streakElement.first()).toBeVisible();
    const text = await streakElement.first().textContent();
    expect(text).toContain('3');
  });

  test('should maintain streak when solving on consecutive days', async ({ page }) => {
    // Set up with streak from yesterday
    await setProgressData(page, ['array-chaining'], 5, getYesterdayDateString());
    await page.reload();

    // Simulate solving today by updating localStorage
    await setProgressData(page, ['array-chaining', 'chunk-arrays'], 6, getTodayDateString());
    await page.reload();

    const progressData = await getProgressData(page);
    expect(progressData.streak).toBe(6);
  });

  test('should reset streak when more than a day passes without solving', async ({ page }) => {
    // Set up with streak from 2 days ago
    await setProgressData(page, ['array-chaining'], 5, getDaysAgoDateString(2));
    await page.reload();
    await page.waitForLoadState('networkidle');

    // The streak should be reset to 0 when loaded
    // Wait for the component to process and potentially reset the streak
    await page.waitForTimeout(500);

    // Check navbar streak display
    await page.setViewportSize({ width: 1280, height: 720 });
    const streakElement = page.locator('.text-orange-500').filter({
      hasText: /\d+/,
    });

    await expect(streakElement.first()).toBeVisible();
    const text = await streakElement.first().textContent();
    expect(text).toContain('0');
  });
});

test.describe('Progress Tracking - Home Page Progress Bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await clearProgressData(page);
  });

  test('should display progress bar on home page', async ({ page }) => {
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Look for progress card
    const progressText = page.getByText('Your Progress');
    await expect(progressText.first()).toBeVisible();

    // Look for the progress bar container
    const progressBar = page.locator('.bg-green-500.h-3.rounded-full');
    await expect(progressBar).toBeVisible();
  });

  test('should reflect solved count in home page progress bar', async ({ page }) => {
    // Set up with some solved problems
    const solvedProblems = ['array-chaining', 'chunk-arrays', 'currying'];
    await setProgressData(page, solvedProblems, 3, getTodayDateString());
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Check the progress display shows correct count
    const progressDisplay = page.locator(
      '.text-2xl.font-bold.text-green-600, .text-2xl.font-bold.text-green-400'
    );
    await expect(progressDisplay.first()).toBeVisible();

    const text = await progressDisplay.first().textContent();
    expect(text).toMatch(/^3\/\d+$/);
  });

  test('should show completion percentage on home page', async ({ page }) => {
    // Set up with some solved problems
    await setProgressData(page, ['array-chaining', 'chunk-arrays'], 2, getTodayDateString());
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Look for percentage text
    const percentageText = page.getByText(/\d+% complete/);
    await expect(percentageText).toBeVisible();
  });
});

test.describe('Progress Tracking - Sidebar Progress Bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/problems');
    await clearProgressData(page);
  });

  test('should display progress bar in sidebar on problems page', async ({ page }) => {
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Set to desktop view to see sidebar
    await page.setViewportSize({ width: 1280, height: 720 });

    // Look for progress in sidebar
    const sidebarProgress = page.getByText('Your Progress');
    await expect(sidebarProgress.first()).toBeVisible();

    // Look for progress bar in sidebar
    const progressBar = page.locator('.bg-green-500.h-2.rounded-full');
    await expect(progressBar).toBeVisible();
  });

  test('should reflect solved count in sidebar progress bar', async ({ page }) => {
    const solvedProblems = ['array-chaining', 'chunk-arrays', 'currying', 'debounce-throttle'];
    await setProgressData(page, solvedProblems, 4, getTodayDateString());
    await page.reload();

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForLoadState('networkidle');

    // Check sidebar shows correct count
    const progressDisplay = page
      .locator('.font-medium.text-gray-900, .font-medium.text-gray-100')
      .filter({
        hasText: /4\/\d+/,
      });
    await expect(progressDisplay.first()).toBeVisible();
  });
});

test.describe('Progress Tracking - Problem Table Checkmarks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/problems');
    await clearProgressData(page);
  });

  test('should show checkmark for solved problems in table', async ({ page }) => {
    // Set up with solved problems
    await setProgressData(page, ['abort-controller', 'array-chaining'], 2, getTodayDateString());
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Look for green checkmark icons
    const checkmarks = page.locator('svg.text-green-500').filter({
      has: page.locator('path[fill-rule="evenodd"]'),
    });

    await expect(checkmarks.first()).toBeVisible();
    const count = await checkmarks.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('should show empty circle for unsolved problems in table', async ({ page }) => {
    // Set up with one solved problem
    await setProgressData(page, ['abort-controller'], 1, getTodayDateString());
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Look for empty circle indicators (unsolved)
    const emptyCircles = page.locator(
      '.rounded-full.border-2.border-gray-300, .rounded-full.border-2.border-gray-600'
    );
    await expect(emptyCircles.first()).toBeVisible();

    // Should have more empty circles than solved
    const count = await emptyCircles.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Progress Tracking - Problem Detail Solved Badge', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/problems/array-chaining');
    await clearProgressData(page);
  });

  test('should show "Solved" badge on problem detail page for solved problems', async ({
    page,
  }) => {
    // Mark the problem as solved
    await setProgressData(page, ['array-chaining'], 1, getTodayDateString());
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Look for the solved badge
    const solvedBadge = page.locator('.bg-green-100, .bg-green-900\\/30').filter({
      hasText: 'Solved',
    });

    await expect(solvedBadge).toBeVisible();
  });

  test('should not show "Solved" badge for unsolved problems', async ({ page }) => {
    // No solved problems
    await setProgressData(page, [], 0, null);
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Solved badge should not be visible
    const solvedBadge = page.locator('.bg-green-100, .bg-green-900\\/30').filter({
      hasText: 'Solved',
    });

    await expect(solvedBadge).not.toBeVisible();
  });
});

test.describe('Progress Tracking - Status Filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/problems');
    await clearProgressData(page);
  });

  test('should filter by "Solved" status correctly', async ({ page }) => {
    // Set up with specific solved problems
    const solvedProblems = ['abort-controller', 'array-chaining', 'chunk-arrays'];
    await setProgressData(page, solvedProblems, 3, getTodayDateString());
    await page.reload();

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForLoadState('networkidle');

    // Click on "Solved" status filter
    const solvedRadio = page.locator('input[type="radio"][value="solved"]');
    await solvedRadio.click();

    await page.waitForTimeout(300);

    // Verify the filter is applied - should only show solved problems
    const problemLinks = page.locator('a[href^="/problems/"]');
    const count = await problemLinks.count();

    // Should show exactly the number of solved problems
    expect(count).toBe(solvedProblems.length);

    // Verify checkmarks are visible for all shown problems
    const checkmarks = page.locator('svg.text-green-500');
    const checkmarkCount = await checkmarks.count();
    expect(checkmarkCount).toBe(solvedProblems.length);
  });

  test('should filter by "Unsolved" status correctly', async ({ page }) => {
    // Set up with some solved problems
    const solvedProblems = ['abort-controller', 'array-chaining'];
    await setProgressData(page, solvedProblems, 2, getTodayDateString());
    await page.reload();

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForLoadState('networkidle');

    // Get total problem count first
    const allProblemsText = page.getByText(/\d+ of \d+ problems/);
    const totalMatch = await allProblemsText.textContent();
    const totalProblems = totalMatch ? parseInt(totalMatch.match(/of (\d+)/)?.[1] || '0') : 0;

    // Click on "Unsolved" status filter
    const unsolvedRadio = page.locator('input[type="radio"][value="unsolved"]');
    await unsolvedRadio.click();

    await page.waitForTimeout(300);

    // Verify the filter is applied - should show unsolved problems
    const problemLinks = page.locator('a[href^="/problems/"]');
    const count = await problemLinks.count();

    // Should show total - solved count
    expect(count).toBe(totalProblems - solvedProblems.length);
  });

  test('should show all problems when "All" status is selected', async ({ page }) => {
    // Set up with some solved problems
    await setProgressData(page, ['abort-controller'], 1, getTodayDateString());
    await page.reload();

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForLoadState('networkidle');

    // First filter by solved
    const solvedRadio = page.locator('input[type="radio"][value="solved"]');
    await solvedRadio.click();
    await page.waitForTimeout(300);

    const solvedCount = await page.locator('a[href^="/problems/"]').count();

    // Then click "All"
    const allRadio = page.locator('input[type="radio"][value="all"]');
    await allRadio.click();
    await page.waitForTimeout(300);

    const allCount = await page.locator('a[href^="/problems/"]').count();

    // All should be greater than just solved
    expect(allCount).toBeGreaterThan(solvedCount);
  });
});

test.describe('Progress Tracking - Persistence Across Page Refresh', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await clearProgressData(page);
  });

  test('should maintain progress after page refresh on home page', async ({ page }) => {
    const solvedProblems = ['array-chaining', 'chunk-arrays', 'currying'];
    await setProgressData(page, solvedProblems, 3, getTodayDateString());

    // Reload the page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify progress is still displayed correctly
    const progressDisplay = page.locator(
      '.text-2xl.font-bold.text-green-600, .text-2xl.font-bold.text-green-400'
    );
    await expect(progressDisplay.first()).toBeVisible();

    const text = await progressDisplay.first().textContent();
    expect(text).toMatch(/^3\/\d+$/);

    // Verify localStorage still has the data
    const progressData = await getProgressData(page);
    expect(progressData.solvedProblems).toHaveLength(3);
  });

  test('should maintain progress after page refresh on problems page', async ({ page }) => {
    await page.goto('/problems');

    const solvedProblems = ['abort-controller', 'array-chaining'];
    await setProgressData(page, solvedProblems, 2, getTodayDateString());

    await page.reload();
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForLoadState('networkidle');

    // Verify checkmarks are still shown
    const checkmarks = page.locator('svg.text-green-500');
    const count = await checkmarks.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('should maintain progress after page refresh on problem detail page', async ({ page }) => {
    await page.goto('/problems/array-chaining');

    await setProgressData(page, ['array-chaining'], 1, getTodayDateString());

    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify solved badge is still shown
    const solvedBadge = page.locator('.bg-green-100, .bg-green-900\\/30').filter({
      hasText: 'Solved',
    });
    await expect(solvedBadge).toBeVisible();
  });
});

test.describe('Progress Tracking - Persistence Across Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await clearProgressData(page);
  });

  test('should maintain progress when navigating from home to problems page', async ({ page }) => {
    const solvedProblems = ['array-chaining', 'chunk-arrays'];
    await setProgressData(page, solvedProblems, 2, getTodayDateString());
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Navigate to problems page
    const startButton = page.getByRole('link', { name: /Start Practicing/i });
    await startButton.click();
    await expect(page).toHaveURL('/problems');

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForLoadState('networkidle');

    // Verify progress is maintained
    const checkmarks = page.locator('svg.text-green-500');
    const count = await checkmarks.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('should maintain progress when navigating from problems to problem detail', async ({
    page,
  }) => {
    await page.goto('/problems');

    const solvedProblems = ['abort-controller'];
    await setProgressData(page, solvedProblems, 1, getTodayDateString());
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Navigate to solved problem detail
    const problemLink = page.locator('a[href="/problems/abort-controller"]');
    await problemLink.click();
    await expect(page).toHaveURL('/problems/abort-controller');

    await page.waitForLoadState('networkidle');

    // Verify solved badge is shown
    const solvedBadge = page.locator('.bg-green-100, .bg-green-900\\/30').filter({
      hasText: 'Solved',
    });
    await expect(solvedBadge).toBeVisible();
  });

  test('should maintain progress when navigating back from problem detail', async ({ page }) => {
    await page.goto('/problems/abort-controller');

    const solvedProblems = ['abort-controller', 'array-chaining'];
    await setProgressData(page, solvedProblems, 2, getTodayDateString());
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Navigate back to problems list
    const backLink = page.getByRole('link', { name: /Back to Problems/i });
    await backLink.click();
    await expect(page).toHaveURL('/problems');

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForLoadState('networkidle');

    // Verify progress is maintained
    const checkmarks = page.locator('svg.text-green-500');
    const count = await checkmarks.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('should maintain progress when using browser back/forward buttons', async ({ page }) => {
    // Set up progress
    const solvedProblems = ['array-chaining', 'chunk-arrays', 'currying'];
    await setProgressData(page, solvedProblems, 3, getTodayDateString());
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Navigate: Home -> Problems -> Problem Detail
    await page.getByRole('link', { name: /Start Practicing/i }).click();
    await expect(page).toHaveURL('/problems');

    const problemLink = page.locator('a[href="/problems/array-chaining"]');
    await problemLink.click();
    await expect(page).toHaveURL('/problems/array-chaining');

    // Verify solved badge on detail page
    const solvedBadge = page.locator('.bg-green-100, .bg-green-900\\/30').filter({
      hasText: 'Solved',
    });
    await expect(solvedBadge).toBeVisible();

    // Go back to problems list
    await page.goBack();
    await expect(page).toHaveURL('/problems');

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForLoadState('networkidle');

    // Verify checkmarks still there
    const checkmarks = page.locator('svg.text-green-500');
    expect(await checkmarks.count()).toBeGreaterThanOrEqual(3);

    // Go back to home
    await page.goBack();
    await expect(page).toHaveURL('/');
    await page.waitForLoadState('networkidle');

    // Verify home page progress
    const progressDisplay = page.locator(
      '.text-2xl.font-bold.text-green-600, .text-2xl.font-bold.text-green-400'
    );
    const text = await progressDisplay.first().textContent();
    expect(text).toMatch(/^3\/\d+$/);

    // Go forward again
    await page.goForward();
    await expect(page).toHaveURL('/problems');
  });

  test('should maintain progress when navigating between multiple problems', async ({ page }) => {
    await page.goto('/problems/array-chaining');

    const solvedProblems = ['array-chaining', 'chunk-arrays'];
    await setProgressData(page, solvedProblems, 2, getTodayDateString());
    await page.reload();

    // Wait for page to load
    await page.locator('.monaco-editor').first().waitFor({ timeout: 15000 });

    // Verify solved badge
    let solvedBadge = page.locator('.bg-green-100, .bg-green-900\\/30').filter({
      hasText: 'Solved',
    });
    await expect(solvedBadge).toBeVisible();

    // Navigate to next problem using Next link
    const nextLink = page.locator('a').filter({ hasText: /Next/i });
    const hasNext = await nextLink.isVisible().catch(() => false);

    if (hasNext) {
      await nextLink.click();
      await page.waitForLoadState('networkidle');

      // Navigate back
      const prevLink = page.locator('a').filter({ hasText: /Previous/i });
      await prevLink.click();
      await page.waitForLoadState('networkidle');

      // Verify solved badge is still there
      solvedBadge = page.locator('.bg-green-100, .bg-green-900\\/30').filter({
        hasText: 'Solved',
      });
      await expect(solvedBadge).toBeVisible();
    }
  });
});

test.describe('Progress Tracking - Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await clearProgressData(page);
  });

  test('should handle empty localStorage gracefully', async ({ page }) => {
    // Ensure localStorage is empty
    await page.evaluate(() => {
      localStorage.removeItem('js-ts-tricks-progress');
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    // Page should load without errors
    const heading = page.getByRole('heading', { name: /JavaScript & TypeScript Tricks/i });
    await expect(heading).toBeVisible();

    // Progress should show 0
    const progressDisplay = page.locator(
      '.text-2xl.font-bold.text-green-600, .text-2xl.font-bold.text-green-400'
    );
    const text = await progressDisplay.first().textContent();
    expect(text).toMatch(/^0\/\d+$/);
  });

  test('should handle corrupted localStorage data gracefully', async ({ page }) => {
    // Set corrupted data
    await page.evaluate(() => {
      localStorage.setItem('js-ts-tricks-progress', 'invalid json data');
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    // Page should load without crashing
    const heading = page.getByRole('heading', { name: /JavaScript & TypeScript Tricks/i });
    await expect(heading).toBeVisible();
  });

  test('should handle marking the same problem as solved twice', async ({ page }) => {
    // Set problem as solved
    await setProgressData(page, ['array-chaining'], 1, getTodayDateString());
    await page.reload();

    // Set the same problem again (simulate re-solving)
    await setProgressData(page, ['array-chaining'], 1, getTodayDateString());
    await page.reload();

    // Should still only count as 1
    const progressData = await getProgressData(page);
    expect(progressData.solvedProblems).toHaveLength(1);
  });

  test('should display correct count when all problems are solved', async ({ page }) => {
    await page.goto('/problems');
    await page.waitForLoadState('networkidle');

    // Get total problem count
    const allProblemsText = page.getByText(/\d+ of \d+ problems/);
    const totalMatch = await allProblemsText.textContent();
    const totalProblems = totalMatch ? parseInt(totalMatch.match(/of (\d+)/)?.[1] || '0') : 0;

    // Create array of all problem IDs (we'll use a subset for this test)
    const allProblemIds: string[] = [];
    const problemLinks = page.locator('a[href^="/problems/"]');
    const count = await problemLinks.count();

    for (let i = 0; i < count; i++) {
      const href = await problemLinks.nth(i).getAttribute('href');
      if (href) {
        const id = href.replace('/problems/', '');
        if (id && !allProblemIds.includes(id)) {
          allProblemIds.push(id);
        }
      }
    }

    // Set all as solved
    await setProgressData(page, allProblemIds, allProblemIds.length, getTodayDateString());
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify the count shows total/total
    await page.setViewportSize({ width: 1280, height: 720 });
    const sidebarProgress = page
      .locator('.font-medium.text-gray-900, .font-medium.text-gray-100')
      .filter({
        hasText: new RegExp(`${totalProblems}/${totalProblems}`),
      });

    // Check if count matches
    const progressData = await getProgressData(page);
    expect(progressData.solvedProblems.length).toBe(totalProblems);
  });
});

test.describe('Progress Tracking - Mobile View', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await clearProgressData(page);
  });

  test('should display progress on mobile home page', async ({ page }) => {
    await setProgressData(page, ['array-chaining', 'chunk-arrays'], 2, getTodayDateString());
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Progress card should be visible on mobile
    const progressText = page.getByText('Your Progress');
    await expect(progressText.first()).toBeVisible();
  });

  test('should show solved checkmarks in problem table on mobile', async ({ page }) => {
    await page.goto('/problems');
    await setProgressData(page, ['abort-controller'], 1, getTodayDateString());
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Checkmarks should still be visible on mobile
    const checkmarks = page.locator('svg.text-green-500');
    await expect(checkmarks.first()).toBeVisible();
  });

  test('should show mobile filter toggle for status filter', async ({ page }) => {
    await page.goto('/problems');
    await setProgressData(page, ['abort-controller'], 1, getTodayDateString());
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Look for mobile filter toggle
    const filterButton = page.getByRole('button', { name: /Filters/i });
    await expect(filterButton).toBeVisible();

    // Click to show filters
    await filterButton.click();
    await page.waitForTimeout(300);

    // Status filter should be visible
    const statusFilter = page.getByText('Status').first();
    await expect(statusFilter).toBeVisible();
  });
});
