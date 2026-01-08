export interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  starterCode: string;
  solution: string;
  testCases: Array<{
    input: unknown;
    expectedOutput: unknown;
    description?: string;
  }>;
  hints: string[];
}

export const problem: Problem = {
    id: 'promise-all-vs-allsettled',
    title: 'Promise.all vs Promise.allSettled',
    difficulty: 'medium',
    category: 'Async/Promises',
    description: `## In-Depth Explanation

\`Promise.all()\` and \`Promise.allSettled()\` both handle multiple promises, but with fundamentally different behaviors:

- **Promise.all()**: Returns a promise that resolves when all promises resolve, or rejects immediately when the first promise rejects (fail-fast behavior). All promises must succeed.
- **Promise.allSettled()**: Returns a promise that always resolves (never rejects) after all promises settle, regardless of individual outcomes. You get results for all promises, both successes and failures.

The choice between them depends on your requirements:
- Use \`Promise.all()\` when you need all operations to succeed (all-or-nothing)
- Use \`Promise.allSettled()\` when you want partial results and can handle individual failures

## Importance

Choosing the right method is crucial for application behavior:

- **Error Handling**: Different error handling strategies (fail-fast vs graceful degradation)
- **User Experience**: \`allSettled\` provides better UX by showing partial results
- **Data Integrity**: \`all\` ensures data consistency (all or nothing)
- **Resilience**: \`allSettled\` makes systems more resilient to partial failures
- **Performance**: \`all\` can be faster (stops early on failure), \`allSettled\` always waits for all
- **Debugging**: Different methods provide different information about failures

## Usefulness & Practical Applications

These methods are used in different scenarios:

**Promise.all()** - When all must succeed:
- **Transaction Processing**: All database operations must succeed
- **Form Submission**: All validations must pass
- **Multi-step Workflows**: All steps must complete successfully
- **Data Synchronization**: All data sources must be synchronized

**Promise.allSettled()** - When partial success is acceptable:
- **Multi-API Calls**: Fetching from multiple APIs where some may be down
- **Batch Operations**: Processing multiple items where individual failures are acceptable
- **Analytics Collection**: Collecting analytics from multiple services
- **Notification Systems**: Sending notifications through multiple channels
- **Data Aggregation**: Collecting data from multiple sources

**Challenge:** Use the right method for different scenarios.`,
    examples: [
      {
        input: `const promises = [fetch('/api/1'), fetch('/api/2'), fetch('/api/3')];`,
        output: `all: fails if any fail, allSettled: always resolves`,
        explanation: 'Choose based on whether you need all or can tolerate failures',
      },
    ],
    starterCode: `async function fetchAllOrFail(urls) {
  // TODO: Use Promise.all - should fail if ANY request fails
  // Return array of responses
  
  return [];
}

async function fetchAllWithFailures(urls) {
  // TODO: Use Promise.allSettled - should return all results even if some fail
  // Return array with { status, value/error }
  
  return [];
}

// Test (commented out to prevent immediate execution)
// const urls = ['/api/1', '/api/2', '/api/3'];
// fetchAllOrFail(urls).then(console.log).catch(console.error);
// fetchAllWithFailures(urls).then(console.log).catch(console.error);`,
    solution: `async function fetchAllOrFail(promises) {
  return Promise.all(promises);
}

async function fetchAllWithFailures(promises) {
  return Promise.allSettled(promises);
}

// Test function
async function testFetchAllOrFail() {
  const promises = [Promise.resolve('success1'), Promise.resolve('success2')];
  const result = await fetchAllOrFail(promises);
  return result;
}`,
    testCases: [
      {
        input: [],
        expectedOutput: ['success1', 'success2'],
        description: 'testFetchAllOrFail',
      },
    ],
    hints: [
      'Promise.all rejects if any promise rejects',
      'Promise.allSettled always resolves with status for each',
      'Use all when you need all; allSettled when some can fail',
    ],
  };
