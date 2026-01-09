const { runTests } = require('./lib/test-runner.ts');
const { problem } = require('./lib/problems/test-driven-development.ts');

async function test() {
  console.log('Testing test-driven-development...');
  console.log('Test cases:', problem.testCases.map(t => t.description));

  const result = await runTests(problem.solution, problem.testCases);

  console.log('\n=== RESULT ===');
  console.log('All passed:', result.allPassed);

  if (!result.allPassed) {
    console.log('\nFailed tests:');
    result.results.forEach((r, i) => {
      if (!r.passed) {
        console.log(`\nTest ${i + 1}: ${r.description}`);
        console.log('  Input:', JSON.stringify(r.input));
        console.log('  Expected:', JSON.stringify(r.expectedOutput));
        console.log('  Actual:', JSON.stringify(r.actualOutput));
        if (r.error) console.log('  Error:', r.error);
      }
    });
  }
}

test().catch(console.error);
