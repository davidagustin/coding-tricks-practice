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
  description: `<h2>In-Depth Explanation</h2>

<p>Error handling in async code requires understanding when and how to catch errors. <code>try/catch</code> works with <code>async/await</code>, while <code>.catch()</code> works with promise chains. The key is catching errors at the right level and providing appropriate fallbacks or user feedback.</p>

<p>Error boundaries (a React concept) can be generalized to any error handling strategy that:</p>
<ol>
  <li>Catches errors from a specific scope</li>
  <li>Provides fallback behavior</li>
  <li>Prevents errors from propagating further</li>
  <li>Logs errors for debugging</li>
</ol>

<p>The pattern involves:</p>
<ul>
  <li>Catching errors at appropriate boundaries</li>
  <li>Providing fallback values or UI</li>
  <li>Logging errors for monitoring</li>
  <li>Distinguishing between retryable and non-retryable errors</li>
</ul>

<h2>Importance</h2>

<p>Proper error handling is critical because:</p>

<ul>
  <li><strong>User Experience</strong>: Prevents applications from crashing, provides graceful degradation</li>
  <li><strong>Debugging</strong>: Error logging helps identify and fix issues</li>
  <li><strong>Reliability</strong>: Applications continue functioning even when parts fail</li>
  <li><strong>Monitoring</strong>: Error tracking enables proactive issue detection</li>
  <li><strong>Security</strong>: Prevents error messages from leaking sensitive information</li>
  <li><strong>Resilience</strong>: Applications can recover from transient failures</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Error handling is essential in all applications:</p>

<ul>
  <li><strong>API Calls</strong>: Handling network errors, timeouts, and API errors</li>
  <li><strong>Form Validation</strong>: Catching and displaying validation errors</li>
  <li><strong>File Operations</strong>: Handling file read/write errors</li>
  <li><strong>Database Operations</strong>: Handling connection and query errors</li>
  <li><strong>Third-Party Services</strong>: Handling failures from external services</li>
  <li><strong>User Input</strong>: Validating and handling invalid user input</li>
  <li><strong>Component Errors</strong>: React error boundaries for component errors</li>
  <li><strong>Async Operations</strong>: Handling errors in async workflows</li>
</ul>

<p><strong>Challenge:</strong> Implement comprehensive error handling.</p>`,
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
  // Try operation, catch errors, return fallback on error
  try {
    return await operation();
  } catch (error) {
    console.error('Operation failed:', error);
    return fallback;
  }
}

async function handleMultipleOperations(operations) {
  // Run all operations, collect errors
  // Return { successes: [...], errors: [...] }
  const results = await Promise.allSettled(operations.map(op => op()));

  const successes = [];
  const errors = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      successes.push({ index, value: result.value });
    } else {
      errors.push({ index, error: result.reason });
    }
  });

  return { successes, errors };
}

// Test
const riskyOp = () => Promise.reject(new Error('Failed'));
const safeOp = () => Promise.resolve('Success');

safeOperation(riskyOp, 'fallback').then(console.log); // 'fallback'
safeOperation(safeOp, 'fallback').then(console.log); // 'Success'

handleMultipleOperations([riskyOp, safeOp, riskyOp])
  .then(console.log);
// { successes: [{ index: 1, value: 'Success' }],
//   errors: [{ index: 0, error: Error }, { index: 2, error: Error }] }`,
  testCases: [
    {
      input: { operation: '() => Promise.resolve("success")', fallback: 'fallback' },
      expectedOutput: 'success',
      description: 'safeOperation should return operation result when successful',
    },
    {
      input: { operation: '() => Promise.reject(new Error("fail"))', fallback: 'fallback' },
      expectedOutput: 'fallback',
      description: 'safeOperation should return fallback when operation fails',
    },
    {
      input: { operations: ['success', 'fail', 'success'] },
      expectedOutput: { successes: 2, errors: 1 },
      description: 'handleMultipleOperations should separate successes and errors',
    },
    {
      input: { operations: ['fail', 'fail'] },
      expectedOutput: { successes: 0, errors: 2 },
      description: 'handleMultipleOperations should handle all failures',
    },
    {
      input: { operations: ['success', 'success'] },
      expectedOutput: { successes: 2, errors: 0 },
      description: 'handleMultipleOperations should handle all successes',
    },
  ],
  hints: [
    'Use try/catch for async/await',
    'Use .catch() for promise chains',
    'Promise.allSettled never rejects',
  ],
};
