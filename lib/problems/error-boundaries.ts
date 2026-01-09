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
  starterCode: `// Synchronous version for testing
function safeOperation(shouldFail, fallback) {
  // TODO: Try operation, catch errors, return fallback on error
  // If shouldFail is true, throw an error and return fallback
  // If shouldFail is false, return 'success'

  if (shouldFail) {
    throw new Error('Operation failed');
  }
  return 'success';
}

function handleMultipleOperations(shouldFailArray) {
  // TODO: Process each item, count successes and errors
  // Return { successCount: number, errorCount: number }

  return { successCount: 0, errorCount: 0 };
}

// Test
console.log(safeOperation(true, 'fallback'));
console.log(safeOperation(false, 'fallback'));
console.log(handleMultipleOperations([true, false, true]));`,
  solution: `// Synchronous version for testing
function safeOperation(shouldFail, fallback) {
  try {
    if (shouldFail) {
      throw new Error('Operation failed');
    }
    return 'success';
  } catch (error) {
    return fallback;
  }
}

function handleMultipleOperations(shouldFailArray) {
  let successCount = 0;
  let errorCount = 0;

  for (const shouldFail of shouldFailArray) {
    try {
      if (shouldFail) {
        throw new Error('Failed');
      }
      successCount++;
    } catch (error) {
      errorCount++;
    }
  }

  return { successCount, errorCount };
}

// Test
console.log(safeOperation(true, 'fallback')); // 'fallback'
console.log(safeOperation(false, 'fallback')); // 'success'
console.log(handleMultipleOperations([true, false, true])); // { successCount: 1, errorCount: 2 }`,
  testCases: [
    {
      input: [true, 'fallback'],
      expectedOutput: 'fallback',
      description: 'safeOperation returns fallback when shouldFail is true',
    },
    {
      input: [false, 'fallback'],
      expectedOutput: 'success',
      description: 'safeOperation returns success when shouldFail is false',
    },
    {
      input: [[true, false, true]],
      expectedOutput: { successCount: 1, errorCount: 2 },
      description: 'handleMultipleOperations counts successes and errors correctly',
    },
  ],
  hints: [
    'Use try/catch for async/await',
    'Use .catch() for promise chains',
    'Promise.allSettled never rejects',
  ],
};
