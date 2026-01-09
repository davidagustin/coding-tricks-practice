/**
 * Visual theme testing script using Chromatic-style approach
 * Tests light and dark mode across all pages
 */

import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const PAGES = [
  { path: '/', name: 'Home' },
  { path: '/problems', name: 'Problems List' },
];

async function testThemeVisual() {
  console.log('🎨 Starting visual theme testing...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });

  try {
    for (const pageInfo of PAGES) {
      console.log(`\n📄 Testing: ${pageInfo.name} (${pageInfo.path})`);

      // Test Light Mode
      console.log('  ☀️  Testing Light Mode...');
      const lightPage = await context.newPage();
      await lightPage.goto(`${BASE_URL}${pageInfo.path}`);

      // Set light mode
      await lightPage.evaluate(() => {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
      });
      await lightPage.reload({ waitUntil: 'networkidle' });
      await lightPage.waitForTimeout(1000); // Wait for theme to apply

      // Check if dark class is removed
      const hasDarkClassLight = await lightPage.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });

      // Check background color
      const bgColorLight = await lightPage.evaluate(() => {
        const body = document.body;
        return window.getComputedStyle(body).backgroundColor;
      });

      // Check text color
      const textColorLight = await lightPage.evaluate(() => {
        const body = document.body;
        return window.getComputedStyle(body).color;
      });

      console.log(
        `    Dark class: ${hasDarkClassLight ? '❌ Present (should be absent)' : '✅ Absent'}`
      );
      console.log(`    Background: ${bgColorLight}`);
      console.log(`    Text color: ${textColorLight}`);

      // Test Dark Mode
      console.log('  🌙 Testing Dark Mode...');
      const darkPage = await context.newPage();
      await darkPage.goto(`${BASE_URL}${pageInfo.path}`);

      // Set dark mode
      await darkPage.evaluate(() => {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
      });
      await darkPage.reload({ waitUntil: 'networkidle' });
      await darkPage.waitForTimeout(1000); // Wait for theme to apply

      // Check if dark class is present
      const hasDarkClassDark = await darkPage.evaluate(() => {
        return document.documentElement.classList.contains('dark');
      });

      // Check background color
      const bgColorDark = await darkPage.evaluate(() => {
        const body = document.body;
        return window.getComputedStyle(body).backgroundColor;
      });

      // Check text color
      const textColorDark = await darkPage.evaluate(() => {
        const body = document.body;
        return window.getComputedStyle(body).color;
      });

      console.log(
        `    Dark class: ${hasDarkClassDark ? '✅ Present' : '❌ Absent (should be present)'}`
      );
      console.log(`    Background: ${bgColorDark}`);
      console.log(`    Text color: ${textColorDark}`);

      // Check if colors are different
      const colorsDifferent = bgColorLight !== bgColorDark;
      console.log(
        `    Colors change: ${colorsDifferent ? '✅ Yes' : '❌ No (theme not working!)'}`
      );

      // Check specific elements
      const headingColorLight = await lightPage.evaluate(() => {
        const heading = document.querySelector('h1');
        return heading ? window.getComputedStyle(heading).color : null;
      });

      const headingColorDark = await darkPage.evaluate(() => {
        const heading = document.querySelector('h1');
        return heading ? window.getComputedStyle(heading).color : null;
      });

      console.log(
        `    Heading colors different: ${headingColorLight !== headingColorDark ? '✅ Yes' : '❌ No'}`
      );

      await lightPage.close();
      await darkPage.close();
    }

    console.log('\n✅ Visual theme testing complete!');
  } catch (error) {
    console.error('❌ Error during visual testing:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Run if executed directly
if (require.main === module) {
  testThemeVisual().catch(console.error);
}

export { testThemeVisual };
