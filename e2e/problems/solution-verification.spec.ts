import { test, expect, Page } from '@playwright/test';
import { problems } from '../../lib/problems';

/**
 * E2E tests to verify all problem solutions pass their test cases.
 * This test navigates to each problem page, pastes the solution code
 * into the Monaco editor, runs the tests, and verifies all tests pass.
 */

// Helper function to paste solution into Monaco editor and run tests
async function verifySolutionPasses(page: Page, problemId: string, solution: string) {
  // Navigate to the problem page
  await page.goto(`/problems/${problemId}`);
  await expect(page).toHaveURL(`/problems/${problemId}`);

  // Wait for Monaco editor to load (look for actual editor, not loading state)
  // First wait for the loading spinner to disappear
  const loadingText = page.getByText('Loading editor...');
  await loadingText.waitFor({ state: 'hidden', timeout: 30000 });

  // Now wait for Monaco editor container to be visible
  const monacoEditor = page.locator('.monaco-editor');
  await expect(monacoEditor.first()).toBeVisible({ timeout: 30000 });

  // Wait for editor to be fully ready (Monaco needs time to initialize)
  await page.waitForTimeout(2000);

  // Focus the editor by clicking on it (inside the textarea/content area)
  const editorTextArea = page.locator('.monaco-editor textarea.inputarea');
  await editorTextArea.first().click();
  await page.waitForTimeout(200);

  // Select all content (Ctrl+A / Cmd+A)
  const isMac = process.platform === 'darwin';
  const modifier = isMac ? 'Meta' : 'Control';
  await page.keyboard.press(`${modifier}+a`);
  await page.waitForTimeout(100);

  // Try to set Monaco editor content via JavaScript
  // This is the most reliable method
  await page.evaluate((solutionCode) => {
    // Access Monaco editor through the global monaco object
    const monacoGlobal = (window as unknown as { monaco?: { editor?: { getModels: () => Array<{ setValue: (v: string) => void }> } } }).monaco;
    if (monacoGlobal?.editor) {
      const models = monacoGlobal.editor.getModels();
      if (models && models.length > 0) {
        // Set the first model (main editor) to the solution code
        models[0].setValue(solutionCode);
        return true;
      }
    }
    return false;
  }, solution);

  // Wait for Monaco to process the change
  await page.waitForTimeout(500);

  // Click Run Tests button
  const runTestsButton = page.getByRole('button', { name: /Run Tests/i });
  await expect(runTestsButton).toBeVisible();
  await runTestsButton.click();

  // Wait for tests to complete (increased timeout for complex tests)
  // Use polling to check for result rather than fixed timeout
  await page.waitForFunction(
    () => {
      const allPassed = document.querySelector('[data-testid="all-tests-passed"]') ||
        document.body.innerText.includes('All tests passed');
      const someFailed = document.body.innerText.includes('Some tests failed') ||
        document.body.innerText.includes('Test Case');
      const hasError = document.body.innerText.includes('Error');
      return allPassed || someFailed || hasError;
    },
    { timeout: 20000 }
  );

  // Add a small buffer to let UI update
  await page.waitForTimeout(500);

  // Verify "All tests passed" appears
  const pageContent = await page.textContent('body');
  expect(pageContent).toContain('All tests passed');
}

// Get all problem IDs and their solutions
const allProblems = problems.map((p) => ({
  id: p.id,
  title: p.title,
  solution: p.solution,
}));

// Split problems into batches for parallel execution
const BATCH_SIZE = 25;
const batches: typeof allProblems[] = [];
for (let i = 0; i < allProblems.length; i += BATCH_SIZE) {
  batches.push(allProblems.slice(i, i + BATCH_SIZE));
}

// Create test suites for each batch
batches.forEach((batch, batchIndex) => {
  test.describe(`Solution Verification - Batch ${batchIndex + 1}`, () => {
    // Configure parallel execution within this batch
    test.describe.configure({ mode: 'parallel' });

    // Increase timeout for each test since Monaco takes time to load
    test.setTimeout(90000); // 90 seconds per test

    for (const problem of batch) {
      test(`[${problem.id}] "${problem.title}" solution should pass all tests`, async ({ page }) => {
        await verifySolutionPasses(page, problem.id, problem.solution);
      });
    }
  });
});
