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
    id: 'promise-race-timeout',
    title: 'Promise.race for Timeouts',
    difficulty: 'medium',
    category: 'Async/Promises',
    description: `## In-Depth Explanation

\`Promise.race()\` is a powerful method that takes an array of promises and returns a new promise that settles (resolves or rejects) as soon as the first promise in the array settles. This behavior makes it perfect for implementing timeouts.

The timeout pattern works by racing your actual promise against a "timeout promise" that rejects after a specified duration. If your promise completes first, you get its result. If the timeout promise settles first, you get a timeout error. This ensures that operations don't hang indefinitely.

The key insight is that \`Promise.race()\` doesn't wait for all promises - it returns immediately when any promise settles, making it ideal for timeout scenarios where you want to enforce a maximum wait time.

## Importance

Timeouts are critical for building robust applications because:

- **Prevents Hanging**: Ensures operations don't wait indefinitely
- **User Experience**: Provides feedback when operations take too long
- **Resource Management**: Prevents resource leaks from long-running operations
- **Error Handling**: Allows graceful degradation when services are slow
- **Network Resilience**: Essential for handling unreliable network conditions
- **API Reliability**: Protects against slow or unresponsive APIs

## Usefulness & Practical Applications

This pattern is essential in production applications:

- **API Calls**: Adding timeouts to fetch requests, preventing infinite waits
- **Database Queries**: Enforcing maximum query execution time
- **File Operations**: Timeout for file reads/writes that might hang
- **Third-Party Services**: Protecting against slow external API calls
- **User Actions**: Timeout for user-triggered operations (uploads, downloads)
- **WebSocket Connections**: Implementing connection timeouts
- **Authentication**: Timeout for login/authentication flows
- **Data Fetching**: Timeout for data loading in React/Vue applications

**Challenge:** Create a withTimeout function that rejects if the promise takes too long.`,
    examples: [
      {
        input: `await withTimeout(fetch('/api/data'), 5000)`,
        output: `Resolves with data or rejects with timeout error`,
        explanation: 'Promise resolves if fetch completes in time, otherwise times out',
      },
    ],
    starterCode: `function withTimeout(promise, ms) {
  // TODO: Use Promise.race to race the promise against a timeout
  // Create a timeout promise that rejects after ms milliseconds
  // Return Promise.race([promise, timeoutPromise])
  
  return promise;
}

// Test (commented out to prevent immediate execution)
// const fastPromise = new Promise(resolve => setTimeout(() => resolve('Success'), 100));
// const slowPromise = new Promise(resolve => setTimeout(() => resolve('Success'), 2000));
//
// withTimeout(fastPromise, 500)
//   .then(console.log)
//   .catch(console.error);
//
// withTimeout(slowPromise, 500)
//   .then(console.log)
//   .catch(console.error);`,
    solution: `function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(\`Timeout after \${ms}ms\`)), ms)
    )
  ]);
}`,
    testCases: [
      {
        input: [Promise.resolve('success'), 1000],
        expectedOutput: 'success',
        description: 'Promise resolves before timeout',
      },
      {
        input: [Promise.resolve('fast'), 5000],
        expectedOutput: 'fast',
        description: 'Fast promise resolves quickly',
      },
    ],
    hints: [
      'Promise.race returns the first settled promise',
      'Create a timeout promise that rejects after ms',
      'Use setTimeout in the timeout promise',
    ],
  },
  {
    id: 'promise-allsettled',
    title: 'Promise.allSettled for Mixed Results',
    difficulty: 'medium',
    category: 'Async/Promises',
    description: `## In-Depth Explanation

\`Promise.allSettled()\` is a method that waits for all promises to settle (either fulfill or reject) and returns an array of result objects. Unlike \`Promise.all()\`, which rejects immediately on the first failure, \`allSettled()\` waits for all promises to complete regardless of individual outcomes.

Each result object has a \`status\` property that is either \`'fulfilled'\` or \`'rejected'\`. For fulfilled promises, the result includes a \`value\` property. For rejected promises, it includes a \`reason\` property. This structure allows you to process all results and handle successes and failures separately.

This is particularly useful when you need partial results - you want to know what succeeded and what failed, rather than failing entirely if any single operation fails.

## Importance

\`Promise.allSettled()\` is crucial for resilient applications because:

- **Partial Success Handling**: Allows processing successful results even when some operations fail
- **Error Isolation**: Failures in one operation don't prevent others from completing
- **Better UX**: Users see partial results rather than complete failure
- **Data Collection**: Essential when you need to gather results from multiple sources
- **Batch Operations**: Perfect for batch processing where individual failures are acceptable
- **Resilient Systems**: Enables building systems that degrade gracefully

## Usefulness & Practical Applications

This pattern is essential in many real-world scenarios:

- **Multi-API Calls**: Fetching data from multiple APIs where some may be down
- **Batch Processing**: Processing multiple items where individual failures are acceptable
- **Data Aggregation**: Collecting data from multiple sources (databases, APIs, caches)
- **Form Validation**: Validating multiple fields independently
- **File Operations**: Processing multiple files where some may be corrupted
- **Notification Systems**: Sending notifications through multiple channels
- **Analytics**: Collecting analytics from multiple services
- **Microservices**: Calling multiple microservices and handling partial failures

**Challenge:** Process multiple API calls and separate successes from failures.`,
    examples: [
      {
        input: `[fetch('/api/1'), fetch('/api/2'), fetch('/api/3')]`,
        output: `{ successes: [...], failures: [...] }`,
        explanation: 'Get all results even if some fail',
      },
    ],
    starterCode: `async function processMultipleRequests(requests) {
  // TODO: Use Promise.allSettled to handle all promises
  // Separate fulfilled and rejected results
  // Return { successes: [...], failures: [...] }
  
  return { successes: [], failures: [] };
}

// Helper function to check if result is fulfilled
function isFulfilled(result) {
  // TODO: Check if result.status === 'fulfilled'
  return false;
}

// Test
const requests = [
  Promise.resolve('Success 1'),
  Promise.reject('Error 1'),
  Promise.resolve('Success 2')
];

// Test (commented out to prevent immediate execution)
// processMultipleRequests(requests).then(console.log).catch(console.error);`,
    solution: `async function processMultipleRequests(requests) {
  const results = await Promise.allSettled(requests);
  
  const successes = results
    .filter((r): r is PromiseFulfilledResult<string> => r.status === 'fulfilled')
    .map(r => r.value);
  
  const failures = results
    .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
    .map(r => r.reason);
  
  return { successes, failures };
}

function isFulfilled(result) {
  return result.status === 'fulfilled';
}`,
    testCases: [
      {
        input: [
          [Promise.resolve('Success 1'), Promise.reject('Error 1'), Promise.resolve('Success 2')],
        ],
        expectedOutput: {
          successes: ['Success 1', 'Success 2'],
          failures: ['Error 1'],
        },
      },
      {
        input: [[Promise.resolve('A'), Promise.resolve('B'), Promise.resolve('C')]],
        expectedOutput: {
          successes: ['A', 'B', 'C'],
          failures: [],
        },
      },
      {
        input: [[Promise.reject('Error 1'), Promise.reject('Error 2')]],
        expectedOutput: {
          successes: [],
          failures: ['Error 1', 'Error 2'],
        },
      },
    ],
    hints: [
      'Initialize accumulator as empty object: reduce((acc, item) => ..., {})',
      'Check if key exists, create array if not: if (!acc[key]) acc[key] = []',
      'Push item to appropriate group: acc[key].push(item)',
    ],
  };
