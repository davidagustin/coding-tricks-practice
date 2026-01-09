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
  starterCode: `// Simulated async operation that can be cancelled
function createCancellableOperation(delayMs = 100) {
  // TODO: Create a cancellable async operation
  // Return { promise, cancel, isCancelled }
  // - promise: resolves to 'completed' after delayMs, or rejects if cancelled
  // - cancel: function to cancel the operation
  // - isCancelled: function that returns true if cancelled

  let cancelled = false;
  let rejectFn = null;

  const promise = new Promise((resolve, reject) => {
    // Your code here
  });

  return {
    promise,
    cancel: () => {},
    isCancelled: () => cancelled
  };
}

// Test if cancellation works properly
async function testCancellation(cancelAfterMs, operationDelayMs) {
  // TODO: Create operation, cancel it after cancelAfterMs
  // Return 'cancelled' if operation was cancelled, 'completed' if it finished
  const op = createCancellableOperation(operationDelayMs);

  // Your code here - set up cancellation and return result
  return 'completed';
}

// Test
(async () => {
  // Should complete (cancel happens after operation finishes)
  console.log(await testCancellation(200, 50)); // 'completed'

  // Should be cancelled (cancel happens before operation finishes)
  console.log(await testCancellation(50, 200)); // 'cancelled'
})();`,
  solution: `// Simulated async operation that can be cancelled
function createCancellableOperation(delayMs = 100) {
  // Create a cancellable async operation
  // Return { promise, cancel, isCancelled }
  let cancelled = false;
  let rejectFn = null;
  let timeoutId = null;

  const promise = new Promise((resolve, reject) => {
    rejectFn = reject;
    timeoutId = setTimeout(() => {
      if (!cancelled) {
        resolve('completed');
      }
    }, delayMs);
  });

  return {
    promise,
    cancel: () => {
      cancelled = true;
      clearTimeout(timeoutId);
      if (rejectFn) {
        rejectFn(new Error('Operation cancelled'));
      }
    },
    isCancelled: () => cancelled
  };
}

// Test if cancellation works properly
async function testCancellation(cancelAfterMs, operationDelayMs) {
  // Create operation, cancel it after cancelAfterMs
  // Return 'cancelled' if operation was cancelled, 'completed' if it finished
  const op = createCancellableOperation(operationDelayMs);

  // Set up cancellation timer
  const cancelTimer = setTimeout(() => {
    op.cancel();
  }, cancelAfterMs);

  try {
    const result = await op.promise;
    clearTimeout(cancelTimer);
    return result;
  } catch (error) {
    clearTimeout(cancelTimer);
    return 'cancelled';
  }
}`,
  testCases: [
    {
      input: [200, 50],
      expectedOutput: 'completed',
      description:
        'testCancellation returns completed when cancel happens after operation finishes',
    },
    {
      input: [50, 200],
      expectedOutput: 'cancelled',
      description:
        'testCancellation returns cancelled when cancel happens before operation finishes',
    },
    {
      input: [100, 100],
      expectedOutput: 'completed',
      description: 'testCancellation returns completed when timings are equal (operation wins)',
    },
  ],
  hints: [
    'Pass signal to fetch options: { signal }',
    'AbortError is thrown when aborted',
    'Clear timeouts in finally block',
  ],
};
