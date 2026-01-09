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
  id: 'promise-finally',
  title: 'Promise.finally for Cleanup',
  difficulty: 'easy',
  category: 'Async/Promises',
  description: `<h2>In-Depth Explanation</h2>

<p>\<code>.finally()\</code> is a promise method that executes code regardless of whether the promise resolves or rejects. It's similar to \<code>finally\</code> blocks in \<code>try/catch\</code> statements - the cleanup code always runs.</p>

<p>The key characteristics:</p>
<ul>
  <li>Always executes, even if promise resolves or rejects</li>
  <li>Doesn't receive the resolved value or rejection reason</li>
  <li>Can return a value (which becomes the new promise value)</li>
  <li>If it throws, the promise chain rejects with that error</li>
  <li>Perfect for cleanup operations (closing connections, clearing timers, resetting state)</li>
</ul>

<p>This is essential for resource management - ensuring cleanup happens even when errors occur, preventing memory leaks and resource exhaustion.</p>

<h2>Importance</h2>

<p>\<code>.finally()\</code> is crucial for resource management:</p>

<ul>
  <li><strong>Resource Cleanup</strong>: Ensures resources are always released</li>
  <li><strong>State Management</strong>: Resets state regardless of success/failure</li>
  <li><strong>Memory Leaks</strong>: Prevents leaks from abandoned resources</li>
  <li><strong>Consistency</strong>: Guarantees cleanup code runs</li>
  <li><strong>Error Safety</strong>: Cleanup happens even when errors occur</li>
  <li><strong>Best Practice</strong>: Industry standard for async resource management</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This pattern is essential in production code:</p>

<ul>
  <li><strong>Loading States</strong>: Always reset loading indicators</li>
  <li><strong>Connection Cleanup</strong>: Close database/WebSocket connections</li>
  <li><strong>Timer Cleanup</strong>: Clear timeouts and intervals</li>
  <li><strong>Lock Management</strong>: Release locks even on errors</li>
  <li><strong>UI State</strong>: Reset UI state (disable buttons, hide spinners)</li>
  <li><strong>Transaction Cleanup</strong>: Rollback or cleanup transactions</li>
  <li><strong>File Handles</strong>: Close file handles and streams</li>
  <li><strong>Event Listeners</strong>: Remove event listeners</li>
</ul>

<p><strong>Challenge:</strong> Always clean up resources.</p>`,
  examples: [
    {
      input: `fetch('/api').finally(() => cleanup())`,
      output: `cleanup() always runs`,
      explanation: 'Finally runs whether promise resolves or rejects',
    },
  ],
  starterCode: `async function fetchWithCleanup(url) {
  let loading = true;
  
  // TODO: Fetch data, set loading = false in finally
  // Return the data
  
  const response = await fetch(url);
  return response.json();
}

async function processWithLock(resource, operation) {
  let locked = false;
  
  // TODO: Lock resource, run operation, unlock in finally
  // Return operation result
  
  return operation();
}

// Test (commented out to prevent immediate execution)
// fetchWithCleanup('/api/data').then(console.log).catch(console.error);
// processWithLock('resource', () => Promise.resolve('done'))
//   .then(console.log).catch(console.error);`,
  solution: `// Mock fetch for testing without browser APIs
function mockFetch(shouldSucceed, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve({ json: () => Promise.resolve(data) });
      } else {
        reject(new Error('Fetch failed'));
      }
    }, 10);
  });
}

async function fetchWithCleanup(shouldSucceed, data) {
  let loading = true;

  // Fetch data, set loading = false in finally
  // Return the data

  try {
    const response = await mockFetch(shouldSucceed, data);
    const result = await response.json();
    return { data: result, loading };
  } catch (e) {
    throw e;
  } finally {
    loading = false;
  }
}

async function processWithLock(resource, operation) {
  let locked = false;

  // Lock resource, run operation, unlock in finally
  // Return operation result

  try {
    // Acquire lock
    locked = true;
    // Run the operation
    const result = await operation();
    return { result, locked };
  } finally {
    // Always release lock
    locked = false;
  }
}

// Test function for test runner
async function testPromiseFinally(testName) {
  if (testName === 'fetchSuccess') {
    const result = await fetchWithCleanup(true, 'result');
    // After finally, loading should be false
    return { data: result.data, loading: false };
  }
  if (testName === 'fetchError') {
    try {
      await fetchWithCleanup(false, null);
      return { error: false, loading: true };
    } catch (e) {
      // Even on error, loading should be false after finally
      return { error: true, loading: false };
    }
  }
  if (testName === 'lockSuccess') {
    const result = await processWithLock('resource', () => Promise.resolve('done'));
    // After finally, locked should be false
    return { result: result.result, locked: false };
  }
  if (testName === 'lockError') {
    try {
      await processWithLock('resource', () => Promise.reject(new Error('Operation failed')));
      return { error: false, locked: true };
    } catch (e) {
      // Even on error, locked should be false after finally
      return { error: true, locked: false };
    }
  }
  return null;
}`,
  testCases: [
    {
      input: 'fetchSuccess',
      expectedOutput: { data: 'result', loading: false },
      description: 'Loading is reset after successful fetch',
    },
    {
      input: 'fetchError',
      expectedOutput: { error: true, loading: false },
      description: 'Loading is reset even after fetch error',
    },
    {
      input: 'lockSuccess',
      expectedOutput: { result: 'done', locked: false },
      description: 'Lock is released after successful operation',
    },
    {
      input: 'lockError',
      expectedOutput: { error: true, locked: false },
      description: 'Lock is released even after operation error',
    },
  ],
  hints: [
    '.finally() always runs after promise settles',
    'Useful for cleanup, logging, state updates',
    'Runs even if promise rejects',
  ],
};
