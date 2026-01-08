/**
 * Test script for agents to verify their assigned problems
 * Usage: 
 *   npm run test:agent 1              # Test all Agent 1 problems
 *   npm run test:agent 1 reduce-grouping  # Test specific problem
 *   npm run test:agent all            # Test all problems
 * 
 * Or directly:
 *   npx tsx scripts/test-problems.ts 1
 *   npx tsx scripts/test-problems.ts 1 reduce-grouping
 *   npx tsx scripts/test-problems.ts all
 */

import { getProblemById, problems } from '../lib/problems';
import { runTests } from '../lib/test-runner';

// Agent assignments
const AGENT_ASSIGNMENTS = {
  1: [
    'reduce-grouping',
    'map-deduplication',
    'object-entries',
    'promise-race-timeout',
    'promise-allsettled',
    'find-vs-filter',
    'array-chaining',
    'reduce-right',
    'some-every',
    'array-from',
    'partition-pattern',
    'chunk-arrays',
    'promise-all-vs-allsettled',
    'async-generators',
  ],
  2: [
    'abort-controller',
    'retry-pattern',
    'promise-chaining',
    'error-boundaries',
    'promise-constructor',
    'async-await-error',
    'promise-race-first',
    'promise-finally',
    'basic-typescript-types',
    'interfaces',
    'type-aliases',
    'generics-basic',
    'union-intersection',
    'optional-readonly',
  ],
  3: [
    'type-guards',
    'enums',
    'proxy-api',
    'weakmap-weakset',
    'symbol-usage',
    'reflect-api',
    'object-freeze-seal',
    'property-descriptors',
    'computed-property-names',
    'spread-operator-patterns',
    'spread-operator-tricks',
    'short-circuit-evaluation',
    'tagged-template-literals',
    'reduce-patterns',
  ],
  4: [
    'array-from-tricks',
    'sort-comparators',
    'string-padding',
    'currying',
    'memoization',
    'pipe-compose',
    'debounce-throttle',
    'mapped-types',
    'conditional-types',
    'infer-keyword',
    'branded-types',
    'proxy-traps',
    'generator-functions',
    'weak-collections',
  ],
};

interface TestResult {
  problemId: string;
  problemTitle: string;
  passed: boolean;
  error?: string;
  testResults: any[];
}

async function testProblem(problemId: string): Promise<TestResult> {
  const problem = getProblemById(problemId);
  
  if (!problem) {
    return {
      problemId,
      problemTitle: 'NOT FOUND',
      passed: false,
      error: `Problem with id "${problemId}" not found`,
      testResults: [],
    };
  }

  try {
    const result = await runTests(problem.solution, problem.testCases);
    
    return {
      problemId,
      problemTitle: problem.title,
      passed: result.allPassed,
      error: result.error,
      testResults: result.results,
    };
  } catch (error: any) {
    return {
      problemId,
      problemTitle: problem.title,
      passed: false,
      error: error?.message || String(error),
      testResults: [],
    };
  }
}

async function testAgentProblems(agentNumber: number | 'all') {
  let problemIds: string[] = [];
  
  if (agentNumber === 'all') {
    problemIds = problems.map(p => p.id);
  } else if (agentNumber >= 1 && agentNumber <= 4) {
    problemIds = AGENT_ASSIGNMENTS[agentNumber as keyof typeof AGENT_ASSIGNMENTS];
  } else {
    console.error(`Invalid agent number. Use 1-4 or 'all'`);
    process.exit(1);
  }

  console.log(`\n🧪 Testing ${agentNumber === 'all' ? 'ALL' : `Agent ${agentNumber}`} Problems (${problemIds.length} problems)\n`);
  console.log('='.repeat(80));

  const results: TestResult[] = [];
  
  for (const problemId of problemIds) {
    console.log(`\n📋 Testing: ${problemId}`);
    const result = await testProblem(problemId);
    results.push(result);
    
    if (result.passed) {
      console.log(`   ✅ ${result.problemTitle} - PASSED`);
    } else {
      console.log(`   ❌ ${result.problemTitle} - FAILED`);
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
      if (result.testResults.length > 0) {
        const failedTests = result.testResults.filter(r => !r.passed);
        if (failedTests.length > 0) {
          console.log(`   Failed tests: ${failedTests.length}/${result.testResults.length}`);
          failedTests.forEach((test, idx) => {
            console.log(`     Test ${idx + 1}: ${test.error || 'Output mismatch'}`);
          });
        }
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('\n📊 SUMMARY\n');
  
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  
  console.log(`Total: ${results.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (failed > 0) {
    console.log('\n❌ Failed Problems:');
    results
      .filter(r => !r.passed)
      .forEach(r => {
        console.log(`   - ${r.problemId}: ${r.problemTitle}`);
        if (r.error) {
          console.log(`     Error: ${r.error}`);
        }
      });
  }
  
  console.log('\n');
  
  return results;
}

// Main execution
const args = process.argv.slice(2);
const agentArg = args[0] || '1';
const problemArg = args[1];

if (problemArg) {
  // Test single problem
  testProblem(problemArg).then(result => {
    if (result.passed) {
      console.log(`✅ ${result.problemTitle} - PASSED`);
    } else {
      console.log(`❌ ${result.problemTitle} - FAILED`);
      if (result.error) {
        console.log(`Error: ${result.error}`);
      }
    }
    process.exit(result.passed ? 0 : 1);
  });
} else {
  // Test agent problems
  const agentNumber = agentArg === 'all' ? 'all' : parseInt(agentArg, 10);
  testAgentProblems(agentNumber).then(results => {
    const allPassed = results.every(r => r.passed);
    process.exit(allPassed ? 0 : 1);
  });
}
