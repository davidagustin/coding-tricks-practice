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
  starterCode: `// TODO: Implement async error handling utilities

// Utility 1: Try-catch wrapper that returns [error, data] tuple
async function tryCatchAsync<T>(
  promise: Promise<T>
): Promise<[Error | null, T | null]> {
  // TODO: Wrap the promise and return tuple
  return [null, null];
}

// Utility 2: Execute with timeout
async function executeWithTimeout<T>(
  asyncFn: () => Promise<T>,
  timeoutMs: number
): Promise<T> {
  // TODO: Race between the async function and a timeout
  // Throw TimeoutError if timeout wins
  return asyncFn();
}

// Utility 3: Retry async operations with error filtering
async function retryAsync<T>(
  asyncFn: () => Promise<T>,
  options: {
    maxRetries: number;
    retryIf?: (error: Error) => boolean;
  }
): Promise<T> {
  // TODO: Retry only if retryIf returns true (or if not provided)
  return asyncFn();
}

// Utility 4: Execute multiple promises and collect all results (success or failure)
async function executeAll<T>(
  promises: Promise<T>[]
): Promise<Array<{ success: boolean; value?: T; error?: Error }>> {
  // TODO: Similar to Promise.allSettled but with a cleaner interface
  return [];
}

// Test functions (simulated async operations)
async function fetchData(id: number): Promise<{ id: number; data: string }> {
  if (id < 0) throw new Error('Invalid ID');
  return { id, data: \`Data for \${id}\` };
}

// Test
async function runTests() {
  const [err, data] = await tryCatchAsync(fetchData(1));
  console.log('Success:', err, data);

  const [err2, data2] = await tryCatchAsync(fetchData(-1));
  console.log('Failure:', err2, data2);
}

runTests();`,
  solution: `// Custom TimeoutError class
class TimeoutError extends Error {
  constructor(message = 'Operation timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

// Utility 1: Try-catch wrapper that returns [error, data] tuple
async function tryCatchAsync<T>(
  promise: Promise<T>
): Promise<[Error | null, T | null]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    return [err, null];
  }
}

// Utility 2: Execute with timeout
async function executeWithTimeout<T>(
  asyncFn: () => Promise<T>,
  timeoutMs: number
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new TimeoutError(\`Operation timed out after \${timeoutMs}ms\`)), timeoutMs);
  });

  return Promise.race([asyncFn(), timeoutPromise]);
}

// Utility 3: Retry async operations with error filtering
async function retryAsync<T>(
  asyncFn: () => Promise<T>,
  options: {
    maxRetries: number;
    retryIf?: (error: Error) => boolean;
    delay?: number;
  }
): Promise<T> {
  const { maxRetries, retryIf, delay = 0 } = options;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await asyncFn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Check if we should retry
      const shouldRetry = retryIf ? retryIf(lastError) : true;

      if (attempt < maxRetries && shouldRetry) {
        if (delay > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        continue;
      }

      throw lastError;
    }
  }

  throw lastError;
}

// Utility 4: Execute multiple promises and collect all results (success or failure)
async function executeAll<T>(
  promises: Promise<T>[]
): Promise<Array<{ success: boolean; value?: T; error?: Error }>> {
  const results = await Promise.allSettled(promises);

  return results.map(result => {
    if (result.status === 'fulfilled') {
      return { success: true, value: result.value };
    } else {
      const error = result.reason instanceof Error
        ? result.reason
        : new Error(String(result.reason));
      return { success: false, error };
    }
  });
}

// Test functions (simulated async operations)
async function fetchData(id: number): Promise<{ id: number; data: string }> {
  if (id < 0) throw new Error('Invalid ID');
  return { id, data: \`Data for \${id}\` };
}

// Test
async function runTests() {
  const [err, data] = await tryCatchAsync(fetchData(1));
  console.log('Success:', err, data);

  const [err2, data2] = await tryCatchAsync(fetchData(-1));
  console.log('Failure:', err2, data2);
}

runTests();`,
  testCases: [
    {
      input: { utility: 'tryCatchAsync', success: true, id: 1 },
      expectedOutput: [null, { id: 1, data: 'Data for 1' }],
      description: 'tryCatchAsync returns [null, data] on success',
    },
    {
      input: { utility: 'tryCatchAsync', success: false, id: -1 },
      expectedOutput: ['Error: Invalid ID', null],
      description: 'tryCatchAsync returns [error, null] on failure',
    },
    {
      input: { utility: 'executeWithTimeout', timeoutMs: 1000, operationMs: 500 },
      expectedOutput: { completed: true },
      description: 'executeWithTimeout completes before timeout',
    },
    {
      input: { utility: 'executeWithTimeout', timeoutMs: 100, operationMs: 500 },
      expectedOutput: { error: 'TimeoutError' },
      description: 'executeWithTimeout throws TimeoutError when operation exceeds timeout',
    },
    {
      input: { utility: 'retryAsync', maxRetries: 3, failCount: 2 },
      expectedOutput: { success: true, attempts: 3 },
      description: 'retryAsync succeeds after retries',
    },
    {
      input: { utility: 'executeAll', results: ['success', 'failure', 'success'] },
      expectedOutput: [
        { success: true, value: 'data1' },
        { success: false, error: 'Error' },
        { success: true, value: 'data3' }
      ],
      description: 'executeAll collects all results with success/failure flags',
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
