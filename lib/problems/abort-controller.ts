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
  description: `## In-Depth Explanation

\`AbortController\` provides a way to cancel fetch requests and other async operations. It works by creating a controller with a \`signal\` that can be passed to fetch (and other APIs), and then calling \`abort()\` when you want to cancel.

The pattern is:
1. Create an \`AbortController\`
2. Pass \`controller.signal\` to the async operation
3. Call \`controller.abort()\` to cancel
4. The operation throws an \`AbortError\` that you can catch

This is essential for user experience - allowing users to cancel long-running requests, preventing memory leaks from abandoned requests, and implementing timeouts.

## Importance

Cancellation is critical for modern applications because:

- **User Experience**: Users can cancel operations they no longer need
- **Resource Management**: Prevents memory leaks from abandoned requests
- **Performance**: Stops unnecessary network traffic and processing
- **Timeout Implementation**: Essential for implementing request timeouts
- **Race Condition Prevention**: Prevents stale responses from updating UI
- **Cost Control**: Stops API calls that are no longer needed (important for paid APIs)

## Usefulness & Practical Applications

This pattern is essential in production applications:

- **Search**: Cancelling previous search requests when user types new query
- **File Uploads**: Allowing users to cancel file uploads
- **Data Fetching**: Cancelling data fetches when component unmounts (React cleanup)
- **Timeout Implementation**: Implementing request timeouts
- **Race Condition Prevention**: Preventing stale API responses
- **User Actions**: Cancelling operations when user navigates away
- **Batch Operations**: Cancelling batch operations
- **WebSocket Cleanup**: Properly cleaning up WebSocket connections

**Challenge:** Create a cancellable fetch function.`,
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
  solution: `async function fetchWithCancel(url, signal) {
  try {
    // Mock fetch for testing
    const mockFetch = () => Promise.resolve({ json: () => Promise.resolve({ data: 'test' }) });
    const response = await mockFetch();
    return response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request cancelled');
    }
    throw error;
  }
}

function createCancellableFetch(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  const promise = fetchWithCancel(url, controller.signal)
    .finally(() => clearTimeout(timeoutId));
  
  return {
    promise,
    cancel: () => {
      clearTimeout(timeoutId);
      controller.abort();
    }
  };
}

// Test function
function testAbortController() {
  try {
    const controller = new AbortController();
    return typeof controller.abort === 'function';
  } catch (e) {
    return false;
  }
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'testAbortController',
    },
  ],
  hints: [
    'Pass signal to fetch options: { signal }',
    'AbortError is thrown when aborted',
    'Clear timeouts in finally block',
  ],
};
