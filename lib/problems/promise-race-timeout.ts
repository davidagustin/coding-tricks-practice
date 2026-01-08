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
  description: `<h2>In-Depth Explanation</h2>

<p>\<code>Promise.race()\</code> is a powerful method that takes an array of promises and returns a new promise that settles (resolves or rejects) as soon as the first promise in the array settles. This behavior makes it perfect for implementing timeouts.</p>

<p>The timeout pattern works by racing your actual promise against a "timeout promise" that rejects after a specified duration. If your promise completes first, you get its result. If the timeout promise settles first, you get a timeout error. This ensures that operations don't hang indefinitely.</p>

<p>The key insight is that \<code>Promise.race()\</code> doesn't wait for all promises - it returns immediately when any promise settles, making it ideal for timeout scenarios where you want to enforce a maximum wait time.</p>

<h2>Importance</h2>

<p>Timeouts are critical for building robust applications because:</p>

<ul>
  <li><strong>Prevents Hanging</strong>: Ensures operations don't wait indefinitely</li>
  <li><strong>User Experience</strong>: Provides feedback when operations take too long</li>
  <li><strong>Resource Management</strong>: Prevents resource leaks from long-running operations</li>
  <li><strong>Error Handling</strong>: Allows graceful degradation when services are slow</li>
  <li><strong>Network Resilience</strong>: Essential for handling unreliable network conditions</li>
  <li><strong>API Reliability</strong>: Protects against slow or unresponsive APIs</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This pattern is essential in production applications:</p>

<ul>
  <li><strong>API Calls</strong>: Adding timeouts to fetch requests, preventing infinite waits</li>
  <li><strong>Database Queries</strong>: Enforcing maximum query execution time</li>
  <li><strong>File Operations</strong>: Timeout for file reads/writes that might hang</li>
  <li><strong>Third-Party Services</strong>: Protecting against slow external API calls</li>
  <li><strong>User Actions</strong>: Timeout for user-triggered operations (uploads, downloads)</li>
  <li><strong>WebSocket Connections</strong>: Implementing connection timeouts</li>
  <li><strong>Authentication</strong>: Timeout for login/authentication flows</li>
  <li><strong>Data Fetching</strong>: Timeout for data loading in React/Vue applications</li>
</ul>

<p><strong>Challenge:</strong> Create a withTimeout function that rejects if the promise takes too long.</p>`,
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
};
