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
  id: 'promise-allsettled',
  title: 'Promise.allSettled for Mixed Results',
  difficulty: 'medium',
  category: 'Async/Promises',
  description: `<h2>In-Depth Explanation</h2>

<p><code>Promise.allSettled()</code> is a method that waits for all promises to settle (either fulfill or reject) and returns an array of result objects. Unlike <code>Promise.all()</code>, which rejects immediately on the first failure, <code>allSettled()</code> waits for all promises to complete regardless of individual outcomes.</p>

<p>Each result object has a <code>status</code> property that is either <code>'fulfilled'</code> or <code>'rejected'</code>. For fulfilled promises, the result includes a <code>value</code> property. For rejected promises, it includes a <code>reason</code> property. This structure allows you to process all results and handle successes and failures separately.</p>

<p>This is particularly useful when you need partial results - you want to know what succeeded and what failed, rather than failing entirely if any single operation fails.</p>

<h2>Importance</h2>

<p><code>Promise.allSettled()</code> is crucial for resilient applications because:</p>

<ul>
  <li><strong>Partial Success Handling</strong>: Allows processing successful results even when some operations fail</li>
  <li><strong>Error Isolation</strong>: Failures in one operation don't prevent others from completing</li>
  <li><strong>Better UX</strong>: Users see partial results rather than complete failure</li>
  <li><strong>Data Collection</strong>: Essential when you need to gather results from multiple sources</li>
  <li><strong>Batch Operations</strong>: Perfect for batch processing where individual failures are acceptable</li>
  <li><strong>Resilient Systems</strong>: Enables building systems that degrade gracefully</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This pattern is essential in many real-world scenarios:</p>

<ul>
  <li><strong>Multi-API Calls</strong>: Fetching data from multiple APIs where some may be down</li>
  <li><strong>Batch Processing</strong>: Processing multiple items where individual failures are acceptable</li>
  <li><strong>Data Aggregation</strong>: Collecting data from multiple sources (databases, APIs, caches)</li>
  <li><strong>Form Validation</strong>: Validating multiple fields independently</li>
  <li><strong>File Operations</strong>: Processing multiple files where some may be corrupted</li>
  <li><strong>Notification Systems</strong>: Sending notifications through multiple channels</li>
  <li><strong>Analytics</strong>: Collecting analytics from multiple services</li>
  <li><strong>Microservices</strong>: Calling multiple microservices and handling partial failures</li>
</ul>

<p><strong>Challenge:</strong> Process multiple API calls and separate successes from failures.</p>`,
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
