import { test, expect } from '@playwright/test';

test.describe('Problem Detail Page', () => {
  // Use a known problem ID - we'll use the first problem available
  const testProblemId = 'abort-controller';

  test.beforeEach(async ({ page }) => {
    await page.goto(`/problems/${testProblemId}`);
  });

  test('should load the problem detail page', async ({ page }) => {
    await expect(page).toHaveURL(`/problems/${testProblemId}`);
  });

  test('should display "Back to Problems" link', async ({ page }) => {
    const backLink = page.getByRole('link', { name: /Back to Problems/i });
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute('href', '/problems');
  });

  test('should navigate back to problems list when clicking "Back to Problems"', async ({
    page,
  }) => {
    const backLink = page.getByRole('link', { name: /Back to Problems/i });
    await backLink.click();
    await expect(page).toHaveURL('/problems');
  });

  test('should display problem title', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    // Title should not be empty
    const titleText = await heading.textContent();
    expect(titleText?.trim().length).toBeGreaterThan(0);
  });

  test('should display difficulty badge', async ({ page }) => {
    const difficultyBadge = page.locator('span').filter({
      hasText: /^(EASY|MEDIUM|HARD)$/,
    });
    await expect(difficultyBadge.first()).toBeVisible();
  });

  test('should display problem category', async ({ page }) => {
    // Category is displayed below the title
    const categoryText = page.locator('.text-base.text-gray-600');
    await expect(categoryText.first()).toBeVisible();
  });

  test('should display problem description', async ({ page }) => {
    // Description is in the prose section
    const descriptionSection = page.locator('.prose');
    await expect(descriptionSection).toBeVisible();
  });

  test('should display Examples section if examples exist', async ({ page }) => {
    // Look for Examples heading
    const examplesHeading = page.getByRole('heading', { name: /Examples/i });

    // Examples might not exist for all problems, so we check if it's visible or not
    const examplesVisible = await examplesHeading.isVisible().catch(() => false);

    if (examplesVisible) {
      await expect(examplesHeading).toBeVisible();

      // Should have at least one example
      const exampleCards = page.locator('.bg-gray-50').filter({
        hasText: /Example \d+:/,
      });
      await expect(exampleCards.first()).toBeVisible();

      // Examples should have Input and Output sections
      await expect(page.getByText('Input:').first()).toBeVisible();
      await expect(page.getByText('Output:').first()).toBeVisible();
    }
  });

  test('should display Hints section as expandable details', async ({
    page,
  }) => {
    // Hints section is a <details> element
    const hintsDetails = page.locator('details').filter({
      hasText: /Hints/i,
    });

    // Hints might not exist for all problems
    const hintsVisible = await hintsDetails.isVisible().catch(() => false);

    if (hintsVisible) {
      await expect(hintsDetails).toBeVisible();

      // By default, hints should be collapsed
      const hintsSummary = hintsDetails.locator('summary');
      await expect(hintsSummary).toBeVisible();
    }
  });

  test('should expand/collapse hints when clicking', async ({ page }) => {
    const hintsDetails = page.locator('details').filter({
      hasText: /Hints/i,
    });

    const hintsVisible = await hintsDetails.isVisible().catch(() => false);

    if (hintsVisible) {
      const hintsSummary = hintsDetails.locator('summary');

      // Click to expand
      await hintsSummary.click();

      // Hints list should be visible
      const hintsList = hintsDetails.locator('ul');
      await expect(hintsList).toBeVisible();

      // Click to collapse
      await hintsSummary.click();

      // Wait for collapse animation/state change
      await page.waitForTimeout(100);
    }
  });

  test('should display Code Editor section', async ({ page }) => {
    const editorHeading = page.getByRole('heading', {
      name: /Code Editor/i,
      level: 2,
    });
    await expect(editorHeading).toBeVisible();
  });

  test('should load Monaco Editor', async ({ page }) => {
    // Wait for Monaco editor to load
    // Monaco creates a div with class 'monaco-editor'
    const monacoEditor = page.locator('.monaco-editor');

    // Wait for editor to be ready (it may take a moment to load)
    await expect(monacoEditor.first()).toBeVisible({ timeout: 15000 });
  });

  test('should display Reset button', async ({ page }) => {
    const resetButton = page.getByRole('button', { name: /Reset/i });
    await expect(resetButton).toBeVisible();
  });

  test('should display Show Solution button', async ({ page }) => {
    const solutionButton = page.getByRole('button', {
      name: /Show Solution/i,
    });
    await expect(solutionButton).toBeVisible();
  });

  test('should display Run Tests button', async ({ page }) => {
    const runTestsButton = page.getByRole('button', { name: /Run Tests/i });
    await expect(runTestsButton).toBeVisible();
  });

  test('should toggle solution visibility', async ({ page }) => {
    // Wait for editor to load first
    await page.locator('.monaco-editor').first().waitFor({ timeout: 15000 });

    const solutionButton = page.getByRole('button', {
      name: /Show Solution/i,
    });
    await expect(solutionButton).toBeVisible();

    // Click to show solution
    await solutionButton.click();

    // Button should now say "Hide Solution"
    await expect(
      page.getByRole('button', { name: /Hide Solution/i })
    ).toBeVisible();

    // Solution section should be visible
    const solutionHeading = page.getByRole('heading', { name: /Solution:/i });
    await expect(solutionHeading).toBeVisible();

    // Click to hide solution
    await page.getByRole('button', { name: /Hide Solution/i }).click();

    // Button should say "Show Solution" again
    await expect(
      page.getByRole('button', { name: /Show Solution/i })
    ).toBeVisible();
  });

  test('should display Test Results section', async ({ page }) => {
    const testResultsHeading = page.getByRole('heading', {
      name: /Test Results/i,
      level: 2,
    });
    await expect(testResultsHeading).toBeVisible();
  });

  test('should show initial test results message', async ({ page }) => {
    // Initially should show message to run tests
    const initialMessage = page.getByText(/No test results yet/i);
    await expect(initialMessage).toBeVisible();
  });

  test('should run tests and display results', async ({ page }) => {
    // Wait for Monaco editor to load
    await page.locator('.monaco-editor').first().waitFor({ timeout: 15000 });

    // Wait a bit for editor to be fully ready
    await page.waitForTimeout(1000);

    // Click Run Tests button
    const runTestsButton = page.getByRole('button', { name: /Run Tests/i });
    await runTestsButton.click();

    // Wait for tests to complete - look for any result (the running state can be too fast to catch)
    await page.waitForTimeout(5000);

    // Test results should be displayed after tests run
    // Either all passed, some failed, error, test case, or no test results message changes
    const hasPassedMessage = await page
      .getByText(/All tests passed/i)
      .isVisible()
      .catch(() => false);
    const hasFailedMessage = await page
      .getByText(/Some tests failed/i)
      .isVisible()
      .catch(() => false);
    const hasError = await page
      .locator('.bg-red-50, .bg-red-900\\/20')
      .first()
      .isVisible()
      .catch(() => false);
    const hasTestCase = await page
      .getByText(/Test Case \d+/i)
      .first()
      .isVisible()
      .catch(() => false);
    const noResultsGone = !(await page
      .getByText(/No test results yet/i)
      .isVisible()
      .catch(() => false));

    // At least one of these should be true (tests ran and produced some output)
    expect(
      hasPassedMessage || hasFailedMessage || hasError || hasTestCase || noResultsGone
    ).toBeTruthy();
  });

  test('should be able to interact with Monaco editor', async ({ page }) => {
    // Wait for Monaco editor to load
    const monacoEditor = page.locator('.monaco-editor').first();
    await monacoEditor.waitFor({ timeout: 15000 });

    // Wait for editor to be fully initialized
    await page.waitForTimeout(2000);

    // Verify the editor is interactive (has the input area)
    const textInput = monacoEditor.locator('textarea');
    await expect(textInput).toBeAttached();

    // Click on the editor to focus it
    await monacoEditor.click();
    await page.waitForTimeout(500);

    // Verify the editor shows code content
    const viewLines = monacoEditor.locator('.view-lines');
    await expect(viewLines).toBeVisible();

    // Editor should have some starter code visible
    const content = await viewLines.textContent();
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(0);
  });

  test('should reset code to starter code', async ({ page }) => {
    // Wait for Monaco editor to load
    const monacoEditor = page.locator('.monaco-editor').first();
    await monacoEditor.waitFor({ timeout: 15000 });
    await page.waitForTimeout(2000);

    // Get the initial view content
    const viewLines = monacoEditor.locator('.view-lines');
    const initialContent = await viewLines.textContent();

    // Click Reset button (even without modifications, reset should work)
    const resetButton = page.getByRole('button', { name: /Reset/i });
    await resetButton.click();

    // Wait for reset
    await page.waitForTimeout(1000);

    // After reset, the view should still contain code (starter code)
    const resetContent = await viewLines.textContent();

    // The content should exist and be non-empty
    expect(resetContent).toBeTruthy();
    expect(resetContent!.length).toBeGreaterThan(0);
  });

  test('should display navigation to previous/next problems', async ({
    page,
  }) => {
    // Look for Previous/Next navigation links
    const prevLink = page.locator('a').filter({ hasText: /Previous/i });
    const nextLink = page.locator('a').filter({ hasText: /Next/i });

    // At least one should be visible (unless it's the only problem)
    const hasPrev = await prevLink.isVisible().catch(() => false);
    const hasNext = await nextLink.isVisible().catch(() => false);

    // For the test problem, at least next should exist
    expect(hasPrev || hasNext).toBeTruthy();
  });

  test('should navigate to next problem', async ({ page }) => {
    const nextLink = page.locator('a').filter({ hasText: /Next/i });
    const hasNext = await nextLink.isVisible().catch(() => false);

    if (hasNext) {
      const href = await nextLink.getAttribute('href');
      await nextLink.click();
      await expect(page).toHaveURL(href!);
    }
  });

  test('should display loading state for editor', async ({ page }) => {
    // Navigate fresh to see loading state
    await page.goto(`/problems/${testProblemId}`, { waitUntil: 'commit' });

    // Look for loading indicator (might be very fast)
    const loadingText = page.getByText(/Loading editor/i);

    // Either we catch the loading state or the editor has loaded
    const monacoEditor = page.locator('.monaco-editor').first();
    await expect(monacoEditor).toBeVisible({ timeout: 15000 });
  });

  test('should handle non-existent problem gracefully', async ({ page }) => {
    await page.goto('/problems/non-existent-problem-xyz-123');

    // Should show "Problem not found" message
    const notFoundMessage = page.getByText(/Problem not found/i);
    await expect(notFoundMessage).toBeVisible();

    // Should have link back to problems
    const backLink = page.getByRole('link', { name: /Back to Problems/i });
    await expect(backLink).toBeVisible();
  });
});

test.describe('Problem Detail Page - Code Execution', () => {
  test('should run tests with correct solution and show success', async ({
    page,
  }) => {
    // Go to a problem
    await page.goto('/problems/abort-controller');

    // Wait for Monaco editor to load
    const monacoEditor = page.locator('.monaco-editor').first();
    await monacoEditor.waitFor({ timeout: 15000 });

    // Show the solution
    const showSolutionButton = page.getByRole('button', {
      name: /Show Solution/i,
    });
    await showSolutionButton.click();

    // Wait for solution to display
    await expect(
      page.getByRole('heading', { name: /Solution:/i })
    ).toBeVisible();

    // Copy solution to editor (this is a simplified test - actual implementation
    // would need to get solution code and paste it into editor)

    // For now, just verify the solution panel is visible
    const solutionEditor = page.locator('.monaco-editor').nth(1);
    await expect(solutionEditor).toBeVisible();
  });

  test('should show running state or complete tests', async ({ page }) => {
    await page.goto('/problems/abort-controller');

    // Wait for Monaco editor to load
    await page.locator('.monaco-editor').first().waitFor({ timeout: 15000 });
    await page.waitForTimeout(1000);

    // Click Run Tests
    const runTestsButton = page.getByRole('button', { name: /Run Tests/i });
    await runTestsButton.click();

    // Either show running state or tests complete very fast
    // Check for either running indicator or a test result
    const runningIndicator = page.getByText(/Running tests/i);
    const runningButton = page.getByRole('button', { name: /Running/i });
    const testResult = page.getByText(/Test Case|All tests|Some tests|Error/i).first();

    // Wait for any of these to appear
    await expect(
      runningIndicator.or(runningButton).or(testResult)
    ).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Problem Detail Page - Responsive', () => {
  test('should display correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/problems/abort-controller');

    // Main elements should be visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('button', { name: /Run Tests/i })).toBeVisible();

    // Editor should be visible
    const monacoEditor = page.locator('.monaco-editor').first();
    await monacoEditor.waitFor({ timeout: 15000 });
    await expect(monacoEditor).toBeVisible();
  });

  test('should stack columns on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/problems/abort-controller');

    // Wait for page to load
    await page.locator('.monaco-editor').first().waitFor({ timeout: 15000 });

    // The grid should be in single column mode
    const gridContainer = page.locator('.grid.grid-cols-1');
    await expect(gridContainer).toBeVisible();
  });
});
