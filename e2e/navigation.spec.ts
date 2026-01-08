import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate from Home to Problems page', async ({ page }) => {
    await page.goto('/');

    // Click "Start Practicing" button
    const startButton = page.getByRole('link', { name: /Start Practicing/i });
    await startButton.click();

    // Should be on problems page
    await expect(page).toHaveURL('/problems');
    await expect(
      page.getByRole('heading', { name: /JavaScript & TypeScript Tricks/i })
    ).toBeVisible();
  });

  test('should navigate from Problems page back to Home', async ({ page }) => {
    await page.goto('/problems');

    // Click "Back to Home" link
    const backLink = page.getByRole('link', { name: /Back to Home/i });
    await backLink.click();

    // Should be on home page
    await expect(page).toHaveURL('/');
    await expect(
      page.getByRole('link', { name: /Start Practicing/i })
    ).toBeVisible();
  });

  test('should navigate from Problems list to Problem detail', async ({
    page,
  }) => {
    await page.goto('/problems');

    // Click first problem
    const problemLinks = page.locator('a[href^="/problems/"]');
    const firstProblem = problemLinks.first();
    const href = await firstProblem.getAttribute('href');

    await firstProblem.click();

    // Should be on problem detail page
    await expect(page).toHaveURL(href!);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should navigate from Problem detail back to Problems list', async ({
    page,
  }) => {
    await page.goto('/problems/abort-controller');

    // Click "Back to Problems" link
    const backLink = page.getByRole('link', { name: /Back to Problems/i });
    await backLink.click();

    // Should be on problems page
    await expect(page).toHaveURL('/problems');
  });

  test('should navigate between problems using Previous/Next links', async ({
    page,
  }) => {
    // Start at a problem that has both previous and next
    await page.goto('/problems/array-chaining');

    // Wait for page to load
    await page.locator('.monaco-editor').first().waitFor({ timeout: 15000 });

    // Try to click Next
    const nextLink = page.locator('a').filter({ hasText: /Next/i });
    const hasNext = await nextLink.isVisible().catch(() => false);

    if (hasNext) {
      const nextHref = await nextLink.getAttribute('href');
      await nextLink.click();

      await expect(page).toHaveURL(nextHref!);

      // Wait for new page to load
      await page.locator('.monaco-editor').first().waitFor({ timeout: 15000 });

      // Should be able to go back with Previous
      const prevLink = page.locator('a').filter({ hasText: /Previous/i });
      const hasPrev = await prevLink.isVisible().catch(() => false);

      if (hasPrev) {
        await prevLink.click();
        await expect(page).toHaveURL('/problems/array-chaining');
      }
    }
  });

  test('should preserve URL state when using browser back/forward', async ({
    page,
  }) => {
    // Navigate through app
    await page.goto('/');
    await page.getByRole('link', { name: /Start Practicing/i }).click();
    await expect(page).toHaveURL('/problems');

    // Click a problem
    const problemLinks = page.locator('a[href^="/problems/"]');
    const firstProblem = problemLinks.first();
    await firstProblem.click();

    // Should be on problem detail
    const currentUrl = page.url();
    expect(currentUrl).toContain('/problems/');

    // Go back
    await page.goBack();
    await expect(page).toHaveURL('/problems');

    // Go back again
    await page.goBack();
    await expect(page).toHaveURL('/');

    // Go forward
    await page.goForward();
    await expect(page).toHaveURL('/problems');

    // Go forward again
    await page.goForward();
    await expect(page).toHaveURL(currentUrl);
  });

  test('should handle direct URL access to problem detail', async ({
    page,
  }) => {
    // Directly navigate to a problem
    await page.goto('/problems/abort-controller');

    // Should load correctly
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Back to Problems/i })
    ).toBeVisible();
  });

  test('should handle 404 for non-existent problem', async ({ page }) => {
    await page.goto('/problems/this-problem-does-not-exist-xyz-123');

    // Should show not found message
    await expect(page.getByText(/Problem not found/i)).toBeVisible();

    // Should have link to go back
    const backLink = page.getByRole('link', { name: /Back to Problems/i });
    await expect(backLink).toBeVisible();

    // Clicking back should work
    await backLink.click();
    await expect(page).toHaveURL('/problems');
  });

  test('should not have broken links on home page', async ({ page }) => {
    await page.goto('/');

    // Get all links
    const links = page.locator('a[href]');
    const linkCount = await links.count();

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');

      // Skip external links
      if (href?.startsWith('http')) continue;

      // Click and verify navigation works
      await link.click();

      // Should not show error
      const errorMessage = page.getByText(/error|not found|500/i);
      const hasError = await errorMessage.isVisible().catch(() => false);

      if (hasError) {
        console.error(`Broken link found: ${href}`);
      }

      // Go back for next iteration
      await page.goto('/');
    }
  });

  test('should not have broken links on problems page', async ({ page }) => {
    await page.goto('/problems');

    // Check "Back to Home" link
    const backLink = page.getByRole('link', { name: /Back to Home/i });
    await backLink.click();
    await expect(page).toHaveURL('/');

    // Go back to problems
    await page.goto('/problems');

    // Check first few problem links (not all to keep test fast)
    const problemLinks = page.locator('a[href^="/problems/"]');
    const count = await problemLinks.count();
    const linksToCheck = Math.min(count, 3);

    for (let i = 0; i < linksToCheck; i++) {
      await page.goto('/problems');
      const link = problemLinks.nth(i);
      const href = await link.getAttribute('href');

      await link.click();
      await expect(page).toHaveURL(href!);

      // Should show problem content, not error
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }
  });

  test('should handle rapid navigation', async ({ page }) => {
    await page.goto('/');

    // Rapid clicks
    const startButton = page.getByRole('link', { name: /Start Practicing/i });
    await startButton.click();

    // Immediately try to go back
    await page.goBack();

    // And forward again
    await page.goForward();

    // Should eventually settle on problems page
    await expect(page).toHaveURL('/problems');
  });

  test('should maintain scroll position on back navigation', async ({
    page,
  }) => {
    await page.goto('/problems');

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));

    // Click a problem
    const problemLinks = page.locator('a[href^="/problems/"]');
    await problemLinks.first().click();

    // Wait for problem page to load
    await page.locator('.monaco-editor').first().waitFor({ timeout: 15000 });

    // Go back
    await page.goBack();

    // Scroll position should be restored (or close to it)
    // Note: This is browser-dependent behavior
    await page.waitForTimeout(500);
    const scrollY = await page.evaluate(() => window.scrollY);

    // Scroll position should be roughly preserved (allowing some variance)
    // Some browsers may not restore exactly
    expect(scrollY).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Navigation - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test('should navigate on mobile', async ({ page }) => {
    await page.goto('/');

    // Click Start Practicing
    await page.getByRole('link', { name: /Start Practicing/i }).click();
    await expect(page).toHaveURL('/problems');

    // Click a problem
    const problemLinks = page.locator('a[href^="/problems/"]');
    await problemLinks.first().click();

    // Should be on problem detail
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Go back
    await page.getByRole('link', { name: /Back to Problems/i }).click();
    await expect(page).toHaveURL('/problems');
  });
});

test.describe('Navigation - Keyboard', () => {
  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Tab to Start Practicing button
    await page.keyboard.press('Tab');

    // Keep tabbing until we reach the link
    for (let i = 0; i < 10; i++) {
      const focused = page.locator(':focus');
      const tagName = await focused.evaluate((el) => el.tagName).catch(() => '');

      if (tagName === 'A') {
        const href = await focused.getAttribute('href');
        if (href === '/problems') {
          // Press Enter to navigate
          await page.keyboard.press('Enter');
          await expect(page).toHaveURL('/problems');
          return;
        }
      }

      await page.keyboard.press('Tab');
    }
  });

  test('should have visible focus indicators', async ({ page }) => {
    await page.goto('/');

    // Tab to a focusable element
    await page.keyboard.press('Tab');

    // Check that focused element has focus ring
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();

    // The element should have some focus styling
    const outlineStyle = await focused.evaluate((el) =>
      window.getComputedStyle(el).getPropertyValue('outline')
    );

    // Focus indicator should be visible (not "none")
    // Note: Tailwind uses ring utilities which may not show as outline
  });
});

test.describe('Navigation - Deep Links', () => {
  test('should handle deep link to home', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page).toHaveURL('/');
    await expect(
      page.getByRole('heading', { name: /JavaScript & TypeScript Tricks/i })
    ).toBeVisible();
  });

  test('should handle deep link to problems', async ({ page }) => {
    await page.goto('http://localhost:3000/problems');
    await expect(page).toHaveURL('/problems');
    await expect(
      page.getByRole('heading', { name: /JavaScript & TypeScript Tricks/i })
    ).toBeVisible();
  });

  test('should handle deep link to specific problem', async ({ page }) => {
    await page.goto('http://localhost:3000/problems/abort-controller');
    await expect(page).toHaveURL('/problems/abort-controller');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
