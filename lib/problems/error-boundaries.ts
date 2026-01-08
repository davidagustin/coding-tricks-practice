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
    id: 'error-boundaries',
    title: 'Error Handling Patterns',
    difficulty: 'medium',
    category: 'Async/Promises',
    description: `## In-Depth Explanation

Error handling in async code requires understanding when and how to catch errors. \`try/catch\` works with \`async/await\`, while \`.catch()\` works with promise chains. The key is catching errors at the right level and providing appropriate fallbacks or user feedback.

Error boundaries (a React concept) can be generalized to any error handling strategy that:
1. Catches errors from a specific scope
2. Provides fallback behavior
3. Prevents errors from propagating further
4. Logs errors for debugging

The pattern involves:
- Catching errors at appropriate boundaries
- Providing fallback values or UI
- Logging errors for monitoring
- Distinguishing between retryable and non-retryable errors

## Importance

Proper error handling is critical because:

- **User Experience**: Prevents applications from crashing, provides graceful degradation
- **Debugging**: Error logging helps identify and fix issues
- **Reliability**: Applications continue functioning even when parts fail
- **Monitoring**: Error tracking enables proactive issue detection
- **Security**: Prevents error messages from leaking sensitive information
- **Resilience**: Applications can recover from transient failures

## Usefulness & Practical Applications

Error handling is essential in all applications:

- **API Calls**: Handling network errors, timeouts, and API errors
- **Form Validation**: Catching and displaying validation errors
- **File Operations**: Handling file read/write errors
- **Database Operations**: Handling connection and query errors
- **Third-Party Services**: Handling failures from external services
- **User Input**: Validating and handling invalid user input
- **Component Errors**: React error boundaries for component errors
- **Async Operations**: Handling errors in async workflows

**Challenge:** Implement comprehensive error handling.`,
    examples: [
      {
        input: `try { await riskyOperation(); } catch (error) { handle(error); }`,
        output: `Errors are caught and handled`,
        explanation: 'Prevent unhandled promise rejections',
      },
    ],
    starterCode: `async function safeOperation(operation, fallback) {
  // TODO: Try operation, catch errors, return fallback on error
  
  return operation();
}

async function handleMultipleOperations(operations) {
  // TODO: Run all operations, collect errors
  // Return { successes: [...], errors: [...] }
  
  return { successes: [], errors: [] };
}

// Test
// Test (commented out to prevent immediate execution)
// const riskyOp = () => Promise.reject(new Error('Failed'));
// const safeOp = () => Promise.resolve('Success');
//
// safeOperation(riskyOp, 'fallback').then(console.log).catch(console.error);
//
// handleMultipleOperations([riskyOp, safeOp, riskyOp])
//   .then(console.log).catch(console.error);`,
    solution: `async function safeOperation(operation, fallback) {
  try {
    return await operation();
  } catch (error) {
    return fallback;
  }
}

async function handleMultipleOperations(operations) {
  const results = await Promise.allSettled(
    operations.map(op => op())
  );
  
  const successes = results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
  
  const errors = results
    .filter(r => r.status === 'rejected')
    .map(r => r.reason);
  
  return { successes, errors };
}

// Test function
async function testSafeOperation() {
  const riskyOp = () => Promise.reject(new Error('Failed'));
  const result = await safeOperation(riskyOp, 'fallback');
  return result === 'fallback';
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'testSafeOperation',
      },
    ],
    hints: [
      'Use try/catch for async/await',
      'Use .catch() for promise chains',
      'Promise.allSettled never rejects',
    ],
  };
