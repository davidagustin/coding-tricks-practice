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
  id: 'try-catch-patterns',
  title: 'Try-Catch-Finally Patterns and Best Practices',
  difficulty: 'easy',
  category: 'Error Handling',
  description: `<h2>In-Depth Explanation</h2>

<p>The try-catch-finally statement is JavaScript's primary mechanism for handling exceptions. It allows you to "try" code that might throw an error, "catch" any errors that occur, and optionally run cleanup code in "finally" that executes regardless of whether an error occurred.</p>

<p>The structure works as follows:</p>
<ol>
  <li><strong>try block</strong>: Contains code that might throw an exception</li>
  <li><strong>catch block</strong>: Handles the exception if one is thrown</li>
  <li><strong>finally block</strong>: Always executes, used for cleanup (optional)</li>
</ol>

<p>Key behaviors to understand:</p>
<ul>
  <li>The finally block runs even if there's a return statement in try or catch</li>
  <li>You can have try-finally without catch (useful for cleanup-only scenarios)</li>
  <li>Errors in catch or finally can override previous errors</li>
  <li>Nested try-catch blocks allow granular error handling</li>
</ul>

<h2>Importance</h2>

<p>Proper error handling is crucial because:</p>

<ul>
  <li><strong>Robustness</strong>: Prevents application crashes from unexpected errors</li>
  <li><strong>User Experience</strong>: Provides meaningful feedback instead of cryptic failures</li>
  <li><strong>Resource Management</strong>: Ensures cleanup happens even when errors occur</li>
  <li><strong>Debugging</strong>: Proper error handling aids in identifying and fixing issues</li>
  <li><strong>Security</strong>: Prevents sensitive error details from leaking to users</li>
</ul>

<h2>Practical Applications</h2>

<ul>
  <li><strong>File Operations</strong>: Ensuring files are closed after reading/writing</li>
  <li><strong>Database Connections</strong>: Releasing connections back to pool</li>
  <li><strong>API Calls</strong>: Handling network failures gracefully</li>
  <li><strong>User Input Validation</strong>: Catching parsing errors</li>
  <li><strong>Third-party Libraries</strong>: Handling errors from external code</li>
</ul>

<p><strong>Challenge:</strong> Implement a safe execution wrapper that handles errors properly and always performs cleanup.</p>`,
  examples: [
    {
      input: `safeExecute(() => JSON.parse('{"valid": true}'))`,
      output: `{ success: true, data: { valid: true }, error: null }`,
      explanation: 'Successful execution returns the parsed result',
    },
    {
      input: `safeExecute(() => JSON.parse('invalid json'))`,
      output: `{ success: false, data: null, error: 'Unexpected token...' }`,
      explanation: 'Failed execution captures the error message',
    },
    {
      input: `safeExecute(() => { throw new Error('Custom error'); })`,
      output: `{ success: false, data: null, error: 'Custom error' }`,
      explanation: 'Custom thrown errors are captured properly',
    },
  ],
  starterCode: `// TODO: Implement a safe execution wrapper
// It should:
// 1. Check if input is 'error' and throw if so
// 2. Otherwise return the input as data
// 3. Return a result object with success status, data, and error

function safeExecute(input) {
  // Your code here
  // If input === 'error', simulate an error
  // Otherwise return { success: true, data: input, error: null }
  return { success: false, data: null, error: null };
}

// Also implement a function that demonstrates finally always runs
function demonstrateFinally(shouldThrow) {
  const log = [];
  // TODO: Use try-catch-finally
  // Log 'try' when entering try block
  // Throw an error if shouldThrow is true
  // Log 'catch' in catch block
  // Log 'finally' in finally block
  // Return the log array
  return log;
}

// Test
console.log(safeExecute('valid'));
console.log(safeExecute('error'));
console.log(demonstrateFinally(false));
console.log(demonstrateFinally(true));`,
  solution: `function safeExecute(input) {
  try {
    if (input === 'error') {
      throw new Error('Simulated error');
    }
    return { success: true, data: input, error: null };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return { success: false, data: null, error: errorMessage };
  }
}

function demonstrateFinally(shouldThrow) {
  const log = [];

  try {
    log.push('try');
    if (shouldThrow) {
      throw new Error('Test error');
    }
  } catch (error) {
    log.push('catch');
  } finally {
    log.push('finally');
  }

  return log;
}

// Test
console.log(safeExecute('valid'));
console.log(safeExecute('error'));
console.log(demonstrateFinally(false));
console.log(demonstrateFinally(true));`,
  testCases: [
    {
      input: ['valid'],
      expectedOutput: { success: true, data: 'valid', error: null },
      description: 'safeExecute returns success result for valid input',
    },
    {
      input: ['error'],
      expectedOutput: { success: false, data: null, error: 'Simulated error' },
      description: 'safeExecute captures error for error input',
    },
    {
      input: [false],
      expectedOutput: ['try', 'finally'],
      description: 'demonstrateFinally logs try and finally when no throw',
    },
    {
      input: [true],
      expectedOutput: ['try', 'catch', 'finally'],
      description: 'demonstrateFinally logs try, catch, finally when throw',
    },
  ],
  hints: [
    'Use try-catch-finally to structure your error handling',
    'The finally block always runs, even after return statements in try/catch',
    'Use instanceof Error to safely access the error message property',
    'String(err) can convert non-Error throwables to strings',
    'Consider what happens if the cleanup function itself throws',
  ],
};
