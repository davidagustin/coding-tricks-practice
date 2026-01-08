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
    description: `## In-Depth Explanation

\`.finally()\` is a promise method that executes code regardless of whether the promise resolves or rejects. It's similar to \`finally\` blocks in \`try/catch\` statements - the cleanup code always runs.

The key characteristics:
- Always executes, even if promise resolves or rejects
- Doesn't receive the resolved value or rejection reason
- Can return a value (which becomes the new promise value)
- If it throws, the promise chain rejects with that error
- Perfect for cleanup operations (closing connections, clearing timers, resetting state)

This is essential for resource management - ensuring cleanup happens even when errors occur, preventing memory leaks and resource exhaustion.

## Importance

\`.finally()\` is crucial for resource management:

- **Resource Cleanup**: Ensures resources are always released
- **State Management**: Resets state regardless of success/failure
- **Memory Leaks**: Prevents leaks from abandoned resources
- **Consistency**: Guarantees cleanup code runs
- **Error Safety**: Cleanup happens even when errors occur
- **Best Practice**: Industry standard for async resource management

## Usefulness & Practical Applications

This pattern is essential in production code:

- **Loading States**: Always reset loading indicators
- **Connection Cleanup**: Close database/WebSocket connections
- **Timer Cleanup**: Clear timeouts and intervals
- **Lock Management**: Release locks even on errors
- **UI State**: Reset UI state (disable buttons, hide spinners)
- **Transaction Cleanup**: Rollback or cleanup transactions
- **File Handles**: Close file handles and streams
- **Event Listeners**: Remove event listeners

**Challenge:** Always clean up resources.`,
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
    solution: `async function fetchWithCleanup(url) {
  let loading = true;
  try {
    const response = await fetch(url);
    return response.json();
  } finally {
    loading = false;
  }
}

async function processWithLock(resource, operation) {
  let locked = false;
  try {
    locked = true;
    return await operation();
  } finally {
    locked = false;
  }
}`,
    testCases: [
      {
        input: ['/api/data'],
        expectedOutput: (expect: unknown) => {
          return expect !== undefined;
        },
      },
    ],
    hints: [
      '.finally() always runs after promise settles',
      'Useful for cleanup, logging, state updates',
      'Runs even if promise rejects',
    ],
  };
