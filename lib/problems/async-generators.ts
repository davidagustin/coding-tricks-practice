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
    id: 'async-generators',
    title: 'Async Generators',
    difficulty: 'hard',
    category: 'Async/Promises',
    description: `## In-Depth Explanation

Async generators combine the power of generators (lazy evaluation, pausable execution) with async/await (handling promises). They use \`async function*\` syntax and can \`yield\` promises or values.

The key advantage is that async generators produce values on-demand as they're consumed, allowing you to process data as it arrives rather than waiting for everything to load. This is perfect for pagination, streaming, and processing large datasets.

You consume async generators with \`for await...of\`, which automatically handles the promises and waits for each value. This creates a clean, readable way to process async sequences.

## Importance

Async generators are essential for efficient data processing because:

- **Memory Efficiency**: Process data as it arrives, not all at once
- **Lazy Evaluation**: Only fetch/process what's needed
- **Streaming**: Perfect for streaming data from APIs or files
- **Pagination**: Natural fit for paginated APIs
- **Backpressure**: Consumer controls the pace of production
- **Composability**: Can be chained and transformed like regular generators

## Usefulness & Practical Applications

This pattern is crucial for modern applications:

- **Pagination**: Fetching and processing paginated API responses
- **Streaming**: Processing large files or data streams
- **Real-time Data**: Consuming real-time data feeds (WebSockets, Server-Sent Events)
- **Batch Processing**: Processing large datasets in chunks
- **Infinite Scrolling**: Loading content as user scrolls
- **Data Pipelines**: Building async data processing pipelines
- **API Clients**: Creating efficient API clients that handle pagination
- **File Processing**: Processing large files line-by-line or chunk-by-chunk

**Challenge:** Create an async generator that fetches pages of data.`,
    examples: [
      {
        input: `async function* fetchPages() { ... }`,
        output: `Yields pages one at a time`,
        explanation: 'Process data as it arrives',
      },
    ],
    starterCode: `async function* fetchPages(pageSize = 10) {
  // TODO: Create async generator that yields pages
  // Start at page 0, increment until no more data
  // Yield each page as it's fetched
  // Assume fetchPage(page) returns { data: [...], hasMore: boolean }
  
  let page = 0;
  // Your code here
}

// Helper function (assume this exists)
async function fetchPage(page) {
  // Simulated API call
  return {
    data: Array.from({ length: pageSize }, (_, i) => page * pageSize + i),
    hasMore: page < 2
  };
}

// Test
(async () => {
  for await (const page of fetchPages()) {
    console.log(page);
  }
})();`,
    solution: `async function fetchPage(page) {
  // Simulated API call
  return {
    data: Array.from({ length: 10 }, (_, i) => page * 10 + i),
    hasMore: page < 2
  };
}

async function* fetchPages(pageSize = 10) {
  let page = 0;
  let hasMore = true;
  
  while (hasMore) {
    const result = await fetchPage(page);
    yield result.data;
    hasMore = result.hasMore;
    page++;
  }
}

// Test function
async function testFetchPages() {
  const pages = [];
  for await (const page of fetchPages()) {
    pages.push(page);
    if (pages.length >= 3) break;
  }
  return pages.length > 0;
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'testFetchPages',
      },
    ],
    hints: [
      'Use async function* to create async generator',
      'yield promises or values',
      'Consume with for await...of',
    ],
  },
  {
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
  },
  {
    id: 'retry-pattern',
    title: 'Retry Pattern with Exponential Backoff',
    difficulty: 'hard',
    category: 'Async/Promises',
    description: `## In-Depth Explanation

The retry pattern with exponential backoff is a resilience strategy for handling transient failures. Instead of retrying immediately, you wait progressively longer between attempts (delay doubles each time: 100ms, 200ms, 400ms, etc.).

Exponential backoff is crucial because:
1. Transient failures often resolve themselves (network hiccups, temporary server overload)
2. Immediate retries can overwhelm already-struggling servers
3. Increasing delays give systems time to recover
4. Prevents "thundering herd" problems where many clients retry simultaneously

The pattern typically includes:
- Maximum retry count to prevent infinite loops
- Initial delay that doubles each attempt
- Optional jitter (random variation) to prevent synchronized retries
- Error handling to distinguish retryable vs non-retryable errors

## Importance

Retry patterns are essential for production applications because:

- **Resilience**: Handles transient network and server failures automatically
- **User Experience**: Transparently retries failed operations without user intervention
- **Server Protection**: Exponential backoff prevents overwhelming struggling servers
- **Cost Efficiency**: Reduces failed API calls and improves success rates
- **Reliability**: Critical for distributed systems and microservices
- **Best Practice**: Industry standard for handling unreliable networks

## Usefulness & Practical Applications

This pattern is used extensively in production:

- **API Clients**: Retrying failed API requests with exponential backoff
- **Database Operations**: Retrying transient database connection failures
- **File Operations**: Retrying file I/O operations that may fail temporarily
- **WebSocket Connections**: Reconnecting WebSocket with backoff
- **Payment Processing**: Retrying payment transactions (with care for idempotency)
- **Data Synchronization**: Retrying sync operations between systems
- **Queue Processing**: Retrying failed queue message processing
- **Service Discovery**: Retrying service discovery lookups

**Challenge:** Retry a function with increasing delays.`,
    examples: [
      {
        input: `retryWithBackoff(fetchData, { maxRetries: 3 })`,
        output: `Retries with delays: 100ms, 200ms, 400ms`,
        explanation: 'Exponential backoff reduces server load',
      },
    ],
    starterCode: `async function retryWithBackoff(fn, options = {}) {
  const { maxRetries = 3, initialDelay = 100 } = options;
  
  // TODO: Implement retry with exponential backoff
  // Try fn(), if it fails, wait and retry
  // Delay doubles each time: initialDelay, initialDelay*2, initialDelay*4, ...
  // Throw error if all retries fail
  
  return fn();
}

// Test
async function fetchData() {
  // Simulated API that might fail
  if (Math.random() > 0.5) throw new Error('Failed');
  return 'Success';
}

// Test (commented out to prevent immediate execution)
// retryWithBackoff(fetchData, { maxRetries: 3, initialDelay: 100 })
//   .then(console.log)
//   .catch(console.error);`,
    solution: `async function retryWithBackoff(fn, options = {}) {
  const { maxRetries = 3, initialDelay = 100 } = options;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      const delay = initialDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Test function
async function testRetryWithBackoff() {
  let attempts = 0;
  const fn = async () => {
    attempts++;
    if (attempts < 2) throw new Error('Failed');
    return 'Success';
  };
  
  try {
    const result = await retryWithBackoff(fn, { maxRetries: 3, initialDelay: 10 });
    return result === 'Success';
  } catch (e) {
    return false;
  }
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'testRetryWithBackoff',
      },
    ],
    hints: [
      'Loop up to maxRetries times',
      'Calculate delay: initialDelay * 2^attempt',
      'Use setTimeout wrapped in Promise for delay',
    ],
  },
  {
    id: 'promise-chaining',
    title: 'Promise Chaining Patterns',
    difficulty: 'medium',
    category: 'Async/Promises',
    description: `## In-Depth Explanation

Promise chaining allows you to transform data through a series of asynchronous operations. Each \`.then()\` receives the result of the previous promise and returns a new promise, creating a pipeline of transformations.

The key insight is that \`.then()\` can return either:
1. A value (wrapped in a resolved promise)
2. A promise (which will be awaited)
3. A rejected promise (which triggers error handling)

This creates a fluent API where complex async workflows read like a sequence of steps. Error handling is centralized with a single \`.catch()\` at the end, making it easy to handle errors from any step in the chain.

## Importance

Promise chaining is fundamental to async JavaScript because:

- **Readability**: Code reads like a sequence of steps
- **Composability**: Build complex workflows from simple functions
- **Error Handling**: Centralized error handling with single catch
- **Transformation Pipeline**: Natural fit for data transformation pipelines
- **Separation of Concerns**: Each step is a separate function
- **Flexibility**: Easy to add, remove, or reorder steps

## Usefulness & Practical Applications

This pattern is used everywhere in async code:

- **API Workflows**: Fetch data, transform, validate, save
- **Data Processing**: Load, transform, enrich, persist
- **Authentication Flows**: Fetch user, validate token, load permissions, update session
- **Form Submission**: Validate, transform, submit, handle response
- **File Processing**: Read file, parse, validate, save
- **E-commerce**: Fetch product, check inventory, calculate price, add to cart
- **Data Pipelines**: ETL (Extract, Transform, Load) operations

**Challenge:** Process data through a pipeline of async transformations.`,
    examples: [
      {
        input: `fetchUser(id).then(validate).then(enrich).then(save)`,
        output: `Data flows through each step`,
        explanation: 'Each then returns a promise for the next step',
      },
    ],
    starterCode: `async function processUser(userId) {
  // TODO: Chain promises to:
  // 1. Fetch user data
  // 2. Validate user (throw if invalid)
  // 3. Enrich with additional data
  // 4. Save to database
  // Return final result
  
  return {};
}

// Helper functions (assume these exist)
async function fetchUser(id) {
  return { id, name: 'John', email: 'john@example.com' };
}

async function validateUser(user) {
  if (!user.email) throw new Error('Invalid user');
  return user;
}

async function enrichUser(user) {
  return { ...user, role: 'admin', permissions: ['read', 'write'] };
}

async function saveUser(user) {
  return { ...user, saved: true };
}

// Test (commented out to prevent immediate execution)
// processUser(1).then(console.log).catch(console.error);`,
    solution: `async function fetchUser(id) {
  return { id, name: 'John', email: 'john@example.com' };
}

async function validateUser(user) {
  if (!user.email) throw new Error('Invalid user');
  return user;
}

async function enrichUser(user) {
  return { ...user, role: 'admin', permissions: ['read', 'write'] };
}

async function saveUser(user) {
  return { ...user, saved: true };
}

async function processUser(userId) {
  return fetchUser(userId)
    .then(validateUser)
    .then(enrichUser)
    .then(saveUser);
}

// Test function
async function testProcessUser() {
  const result = await processUser(1);
  return result && result.id === 1 && result.saved === true;
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'testProcessUser',
      },
    ],
    hints: [
      'Chain .then() calls for sequential async operations',
      'Return value from one becomes input to next',
      'Use .catch() at end to handle errors',
    ],
  },
  {
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
  },
  {
    id: 'promise-constructor',
    title: 'Promise Constructor Pattern',
    difficulty: 'medium',
    category: 'Async/Promises',
    description: `## In-Depth Explanation

The \`Promise\` constructor allows you to create promises from scratch, wrapping callback-based APIs or creating custom async operations. The constructor takes a function (executor) with two parameters: \`resolve\` and \`reject\`.

The pattern is:
1. Create a new Promise with an executor function
2. Perform the async operation inside the executor
3. Call \`resolve(value)\` on success
4. Call \`reject(error)\` on failure

This is essential for "promisifying" callback-based APIs (like setTimeout, event listeners, file operations) and creating custom async operations that don't fit standard patterns.

## Importance

The Promise constructor is fundamental because:

- **API Wrapping**: Converts callback-based APIs to promise-based APIs
- **Custom Async Operations**: Creates promises for operations that don't have built-in promise support
- **Legacy Code Integration**: Bridges old callback code with modern async/await
- **Event Handling**: Converts event-driven code to promises
- **Flexibility**: Full control over when and how the promise resolves/rejects
- **Interoperability**: Enables mixing promises with callback-based code

## Usefulness & Practical Applications

This pattern is used extensively:

- **Timer Wrappers**: Converting setTimeout/setInterval to promises
- **Event Listeners**: Converting DOM events to promises (wait for click, wait for load)
- **File Operations**: Wrapping Node.js fs callbacks in promises
- **Database Operations**: Wrapping database callbacks in promises
- **Animation**: Creating promises that resolve when animations complete
- **User Input**: Creating promises that resolve when user provides input
- **Stream Processing**: Converting streams to promises
- **Legacy Libraries**: Wrapping old callback-based libraries

**Challenge:** Convert setTimeout and event listeners to promises.`,
    examples: [
      {
        input: `delay(1000).then(() => console.log('Done'))`,
        output: `Logs after 1 second`,
        explanation: 'Promise-based delay',
      },
    ],
    starterCode: `function delay(ms) {
  // TODO: Return a Promise that resolves after ms milliseconds
  
  return Promise.resolve();
}

function waitForEvent(element, eventName) {
  // TODO: Return a Promise that resolves when event fires
  // Use addEventListener, resolve on first event, then remove listener
  
  return Promise.resolve();
}

// Test
delay(1000).then(() => console.log('1 second passed'));

const button = document.createElement('button');
waitForEvent(button, 'click').then(() => console.log('Button clicked'));`,
    solution: `function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function waitForEvent(element, eventName) {
  return new Promise(resolve => {
    const handler = () => {
      element.removeEventListener(eventName, handler);
      resolve();
    };
    element.addEventListener(eventName, handler);
  });
}

// Test function
async function testDelay() {
  const start = Date.now();
  await delay(10);
  const elapsed = Date.now() - start;
  return elapsed >= 10;
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'testDelay',
      },
    ],
    hints: [
      'new Promise((resolve, reject) => { ... })',
      'Call resolve() when operation succeeds',
      'Call reject() when operation fails',
    ],
  },
  {
    id: 'async-await-error',
    title: 'Async/Await Error Handling',
    difficulty: 'easy',
    category: 'Async/Promises',
    description: `## In-Depth Explanation

\`async/await\` provides a synchronous-looking syntax for asynchronous code, but error handling requires \`try/catch\` blocks (unlike promise chains which use \`.catch()\`). When an \`await\`ed promise rejects, it throws an exception that must be caught.

The key points:
- \`await\` throws exceptions when promises reject
- Use \`try/catch\` to handle these exceptions
- Errors propagate up the call stack if not caught
- Multiple \`await\` calls in a try block: first rejection triggers catch
- Can use \`Promise.allSettled()\` to handle multiple operations independently

This makes error handling more intuitive for developers familiar with synchronous code, but requires understanding that async functions always return promises.

## Importance

Proper async/await error handling is critical because:

- **Unhandled Rejections**: Uncaught errors become unhandled promise rejections
- **User Experience**: Errors must be caught and displayed to users
- **Debugging**: Proper error handling makes debugging easier
- **Application Stability**: Prevents crashes from unhandled errors
- **Error Recovery**: Enables graceful error recovery and fallbacks
- **Best Practice**: Industry standard for modern async JavaScript

## Usefulness & Practical Applications

Error handling is essential in all async operations:

- **API Calls**: Catching network errors, timeouts, and API errors
- **Data Fetching**: Handling fetch failures and parsing errors
- **Form Submission**: Catching validation and submission errors
- **File Operations**: Handling file read/write errors
- **Database Queries**: Handling query errors and connection failures
- **Authentication**: Handling login/authentication errors
- **Third-Party APIs**: Handling failures from external services
- **User Actions**: Catching errors from user-triggered async operations

**Challenge:** Properly catch and handle async errors.`,
    examples: [
      {
        input: `try { const data = await fetchData(); } catch (error) { ... }`,
        output: `Errors are caught`,
        explanation: 'Use try/catch with async/await',
      },
    ],
    starterCode: `async function fetchUserData(userId) {
  // TODO: Fetch user, handle errors
  // If fetch fails, return null
  // If user not found (404), return null
  // Otherwise return user data
  
  const response = await fetch(\`/api/users/\${userId}\`);
  return response.json();
}

async function fetchMultipleUsers(userIds) {
  // TODO: Fetch all users, return array
  // If any fetch fails, skip that user (don't fail entire operation)
  
  return [];
}

// Test (commented out to prevent immediate execution)
// fetchUserData(1).then(console.log).catch(console.error);
// fetchMultipleUsers([1, 2, 3]).then(console.log).catch(console.error);`,
    solution: `async function fetchUserData(userId) {
  try {
    // Mock fetch for testing
    const mockFetch = () => Promise.resolve({ 
      ok: true, 
      json: () => Promise.resolve({ id: userId, name: 'John' }) 
    });
    const response = await mockFetch();
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    return null;
  }
}

async function fetchMultipleUsers(userIds) {
  const results = await Promise.allSettled(
    userIds.map(id => fetchUserData(id))
  );
  
  return results
    .filter(r => r.status === 'fulfilled' && r.value !== null)
    .map(r => r.value);
}

// Test function
async function testFetchUserData() {
  const result = await fetchUserData(1);
  return result !== null && typeof result === 'object';
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'testFetchUserData',
      },
    ],
    hints: [
      'Wrap await in try/catch',
      'Check response.ok for HTTP errors',
      'Use Promise.allSettled for multiple operations',
    ],
  };
