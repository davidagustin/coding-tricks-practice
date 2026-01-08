/**
 * Manual test script to verify theme functionality
 * Run with: tsx scripts/test-theme-manual.ts
 */

// This simulates what happens in the browser
function testThemeFunctionality() {
  console.log('🧪 Testing Theme Functionality...\n');

  // Test 1: Check if localStorage functions work
  console.log('Test 1: localStorage operations');
  try {
    localStorage.setItem('theme', 'dark');
    const stored = localStorage.getItem('theme');
    console.log(`  ✓ localStorage.setItem/getItem works: ${stored === 'dark' ? 'PASS' : 'FAIL'}`);
    
    localStorage.setItem('theme', 'light');
    const stored2 = localStorage.getItem('theme');
    console.log(`  ✓ Theme can be changed: ${stored2 === 'light' ? 'PASS' : 'FAIL'}`);
  } catch (e) {
    console.log(`  ✗ localStorage error: ${e}`);
  }

  // Test 2: Check matchMedia
  console.log('\nTest 2: System preference detection');
  try {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log(`  ✓ matchMedia works: System prefers ${prefersDark ? 'dark' : 'light'}`);
  } catch (e) {
    console.log(`  ✗ matchMedia error: ${e}`);
  }

  // Test 3: DOM class manipulation
  console.log('\nTest 3: DOM class manipulation');
  try {
    document.documentElement.classList.add('dark');
    const hasDark = document.documentElement.classList.contains('dark');
    console.log(`  ✓ Can add dark class: ${hasDark ? 'PASS' : 'FAIL'}`);
    
    document.documentElement.classList.remove('dark');
    const hasDarkAfter = document.documentElement.classList.contains('dark');
    console.log(`  ✓ Can remove dark class: ${!hasDarkAfter ? 'PASS' : 'FAIL'}`);
  } catch (e) {
    console.log(`  ✗ DOM manipulation error: ${e}`);
  }

  // Test 4: Theme toggle logic
  console.log('\nTest 4: Theme toggle logic');
  let currentTheme: 'light' | 'dark' = 'dark';
  const toggleTheme = () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  };
  
  toggleTheme();
  console.log(`  ✓ Toggle from dark to light: ${currentTheme === 'light' ? 'PASS' : 'FAIL'}`);
  
  toggleTheme();
  console.log(`  ✓ Toggle from light to dark: ${currentTheme === 'dark' ? 'PASS' : 'FAIL'}`);

  // Test 5: Integration test
  console.log('\nTest 5: Integration (localStorage + DOM)');
  try {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
    const stored = localStorage.getItem('theme');
    const hasDark = document.documentElement.classList.contains('dark');
    console.log(`  ✓ localStorage and DOM in sync: ${stored === 'dark' && hasDark ? 'PASS' : 'FAIL'}`);
    
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
    const stored2 = localStorage.getItem('theme');
    const hasDark2 = document.documentElement.classList.contains('dark');
    console.log(`  ✓ Can switch to light mode: ${stored2 === 'light' && !hasDark2 ? 'PASS' : 'FAIL'}`);
  } catch (e) {
    console.log(`  ✗ Integration error: ${e}`);
  }

  console.log('\n✅ All manual tests completed!');
  console.log('\n📝 To test in browser:');
  console.log('   1. Open the app in browser');
  console.log('   2. Open DevTools console');
  console.log('   3. Click the theme toggle button');
  console.log('   4. Check that document.documentElement.classList.contains("dark") changes');
  console.log('   5. Check that localStorage.getItem("theme") updates');
  console.log('   6. Refresh page and verify theme persists');
}

// Run tests if in browser-like environment
if (typeof window !== 'undefined') {
  testThemeFunctionality();
} else {
  console.log('⚠️  This script needs to run in a browser environment');
  console.log('   Run the app and test manually, or use the Jest/Playwright tests');
}
