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
  id: 'async-error-handling',
  title: 'Error Handling in Async/Await Code',
  difficulty: 'medium',
  category: 'Error Handling',
  description: `<h2>In-Depth Explanation</h2>

<p>Async/await provides a cleaner syntax for handling asynchronous operations, but error handling requires special attention. Unlike synchronous code, async errors can be tricky to catch and may result in unhandled promise rejections.</p>

<p>Key patterns for async error handling:</p>
<ol>
  <li><strong>Try-catch blocks</strong>: Wrap await calls in try-catch for synchronous-looking error handling</li>
  <li><strong>.catch() chaining</strong>: Attach error handlers to individual promises</li>
  <li><strong>Error wrapper functions</strong>: Create utilities that return [error, data] tuples</li>
  <li><strong>Global handlers</strong>: Set up unhandledRejection handlers as a safety net</li>
</ol>

<p>Common pitfalls to avoid:</p>
<ul>
  <li>Forgetting to await promises inside try blocks</li>
  <li>Not handling errors in Promise.all (one failure rejects all)</li>
  <li>Swallowing errors by catching without re-throwing or logging</li>
  <li>Creating floating promises (async operations without await or .catch)</li>
</ul>

<h2>Importance</h2>

<p>Proper async error handling is critical because:</p>

<ul>
  <li><strong>Unhandled Rejections</strong>: Can crash Node.js processes or cause silent failures</li>
  <li><strong>Data Integrity</strong>: Partial operations may leave data in inconsistent states</li>
  <li><strong>User Experience</strong>: Users need feedback when operations fail</li>
  <li><strong>Debugging</strong>: Proper error propagation makes issues easier to diagnose</li>
  <li><strong>Resource Cleanup</strong>: Failed operations must still release resources</li>
</ul>

<h2>Practical Applications</h2>

<ul>
  <li><strong>API Requests</strong>: Handling network failures, timeouts, and invalid responses</li>
  <li><strong>Database Operations</strong>: Managing transaction rollbacks on errors</li>
  <li><strong>File Processing</strong>: Handling I/O errors gracefully</li>
  <li><strong>Parallel Operations</strong>: Using Promise.allSettled for partial success handling</li>
  <li><strong>Event Handlers</strong>: Properly catching errors in async event callbacks</li>
</ul>

<p><strong>Challenge:</strong> Implement various async error handling patterns and utilities.</p>`,
  examples: [
    {
      input: `await tryCatchAsync(fetchUser(1))`,
      output: `[null, { id: 1, name: 'John' }]`,
      explanation: 'Success returns [null, data] tuple',
    },
    {
      input: `await tryCatchAsync(fetchUser(-1))`,
      output: `[Error: User not found, null]`,
      explanation: 'Failure returns [error, null] tuple',
    },
    {
      input: `await executeWithTimeout(slowOperation, 1000)`,
      output: `TimeoutError: Operation timed out`,
      explanation: 'Operations exceeding timeout throw TimeoutError',
    },
  ],
  starterCode: `// TODO: Implement error handling utilities (synchronous versions for testing)

// Utility 1: Try-catch wrapper that returns [error, data] tuple
function tryCatchSync(id) {
  // TODO: Try to get data, return [null, data] on success
  // Return [errorMessage, null] on failure
  // If id < 0, throw an error with message 'Invalid ID'
  return [null, null];
}

// Utility 2: Execute multiple operations and count results
function executeAll(ids) {
  // TODO: Process each id, count successes and failures
  // Return { successCount: number, errorCount: number }
  return { successCount: 0, errorCount: 0 };
}

// Utility 3: Retry an operation that may fail
function retrySync(failuresBeforeSuccess, maxRetries) {
  // TODO: Simulate an operation that fails 'failuresBeforeSuccess' times
  // then succeeds. If it fails more than maxRetries times, return 'failed'
  // Otherwise return 'success after retries'
  return 'failed';
}

// Test
console.log(tryCatchSync(1));     // [null, { id: 1, data: 'Data for 1' }]
console.log(tryCatchSync(-1));    // ['Invalid ID', null]
console.log(executeAll([1, -1, 2])); // { successCount: 2, errorCount: 1 }
console.log(retrySync(2, 3));     // 'success after retries'`,
  solution: `// Utility 1: Try-catch wrapper that returns [error, data] tuple
function tryCatchSync(id) {
  // TODO: Try to fetch data for id
  // If id < 0, throw 'Invalid ID'
  // Return [error, data] tuple
  // If success: [null, { id, data: 'Data for ' + id }]
  // If error: ['Invalid ID', null]
  try {
    if (id < 0) {
      throw 'Invalid ID';
    }
    return [null, { id, data: 'Data for ' + id }];
  } catch (error) {
    return [String(error), null];
  }
}

// Utility 2: Execute multiple operations and count results
function executeAll(ids) {
  // Process each id, count successes and failures
  // Return { successCount: number, errorCount: number }
  let successCount = 0;
  let errorCount = 0;
  
  for (const id of ids) {
    const [error] = tryCatchSync(id);
    if (error) {
      errorCount++;
    } else {
      successCount++;
    }
  }
  
  return { successCount, errorCount };
}

// Utility 3: Retry an operation that may fail
function retrySync(failuresBeforeSuccess, maxRetries) {
  // Simulate an operation that fails 'failuresBeforeSuccess' times
  // then succeeds. If it fails more than maxRetries times, return 'failed'
  // Otherwise return 'success after retries'
  let attempts = 0;
  let failures = 0;
  
  while (attempts < maxRetries) {
    attempts++;
    const [error] = tryCatchSync(attempts);
    if (error) {
      failures++;
      if (failures >= failuresBeforeSuccess && attempts <= maxRetries) {
        return 'success after retries';
      }
    } else {
      return 'success after retries';
    }
  }
  
  return 'failed';
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Use Promise.race to implement timeout - race between the operation and a timeout promise',
    'The [error, data] tuple pattern (Go-style) eliminates try-catch verbosity',
    'Promise.allSettled returns all results, both fulfilled and rejected',
    'Always convert unknown caught values to Error instances with instanceof check',
    'Consider whether to retry based on error type - some errors are not worth retrying',
  ],
};
