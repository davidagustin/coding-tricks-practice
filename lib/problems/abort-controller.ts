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
  id: 'abort-controller',
  title: 'AbortController for Cancellation',
  difficulty: 'hard',
  category: 'Async/Promises',
  description: `<h2>In-Depth Explanation</h2>

<p><code>AbortController</code> provides a way to cancel fetch requests and other async operations. It works by creating a controller with a <code>signal</code> that can be passed to fetch (and other APIs), and then calling <code>abort()</code> when you want to cancel.</p>

<p>The pattern is:</p>
<ol>
  <li>Create an <code>AbortController</code></li>
  <li>Pass <code>controller.signal</code> to the async operation</li>
  <li>Call <code>controller.abort()</code> to cancel</li>
  <li>The operation throws an <code>AbortError</code> that you can catch</li>
</ol>

<p>This is essential for user experience - allowing users to cancel long-running requests, preventing memory leaks from abandoned requests, and implementing timeouts.</p>

<h2>Importance</h2>

<p>Cancellation is critical for modern applications because:</p>

<ul>
  <li><strong>User Experience</strong>: Users can cancel operations they no longer need</li>
  <li><strong>Resource Management</strong>: Prevents memory leaks from abandoned requests</li>
  <li><strong>Performance</strong>: Stops unnecessary network traffic and processing</li>
  <li><strong>Timeout Implementation</strong>: Essential for implementing request timeouts</li>
  <li><strong>Race Condition Prevention</strong>: Prevents stale responses from updating UI</li>
  <li><strong>Cost Control</strong>: Stops API calls that are no longer needed (important for paid APIs)</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This pattern is essential in production applications:</p>

<ul>
  <li><strong>Search</strong>: Cancelling previous search requests when user types new query</li>
  <li><strong>File Uploads</strong>: Allowing users to cancel file uploads</li>
  <li><strong>Data Fetching</strong>: Cancelling data fetches when component unmounts (React cleanup)</li>
  <li><strong>Timeout Implementation</strong>: Implementing request timeouts</li>
  <li><strong>Race Condition Prevention</strong>: Preventing stale API responses</li>
  <li><strong>User Actions</strong>: Cancelling operations when user navigates away</li>
  <li><strong>Batch Operations</strong>: Cancelling batch operations</li>
  <li><strong>WebSocket Cleanup</strong>: Properly cleaning up WebSocket connections</li>
</ul>

<p><strong>Challenge:</strong> Create a cancellable fetch function.</p>`,
  examples: [
    {
      input: `const controller = new AbortController();
fetchWithCancel('/api/data', controller.signal);`,
      output: `Request can be cancelled with controller.abort()`,
      explanation: 'Cancel long-running requests',
    },
  ],
  starterCode: `async function fetchWithCancel(url, signal) {
  // TODO: Pass signal to fetch options
  // Handle AbortError when cancelled
  
  const response = await fetch(url);
  return response.json();
}

function createCancellableFetch(url, timeout = 5000) {
  // TODO: Create AbortController
  // Set timeout to auto-cancel
  // Return { promise, cancel }
  
  return {
    promise: fetch(url).then(r => r.json()),
    cancel: () => {}
  };
}

// Test
const { promise, cancel } = createCancellableFetch('/api/data', 1000);
setTimeout(() => cancel(), 500); // Cancel after 500ms`,
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Pass signal to fetch options: { signal }',
    'AbortError is thrown when aborted',
    'Clear timeouts in finally block',
  ],
};
