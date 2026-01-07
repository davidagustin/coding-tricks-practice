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
    input: any;
    expectedOutput: any;
    description?: string;
  }>;
  hints: string[];
}

export const problems: Problem[] = [
  {
    id: 'promise-all-vs-allsettled',
    title: 'Promise.all vs Promise.allSettled',
    difficulty: 'medium',
    category: 'Async/Promises',
    description: `Promise.all fails fast on first rejection; Promise.allSettled waits for all.

**Challenge:** Use the right method for different scenarios.`,
    examples: [
      {
        input: `const promises = [fetch('/api/1'), fetch('/api/2'), fetch('/api/3')];`,
        output: `all: fails if any fail, allSettled: always resolves`,
        explanation: 'Choose based on whether you need all or can tolerate failures'
      }
    ],
    starterCode: `async function fetchAllOrFail(urls) {
  // TODO: Use Promise.all - should fail if ANY request fails
  // Return array of responses
  
  return [];
}

async function fetchAllWithFailures(urls) {
  // TODO: Use Promise.allSettled - should return all results even if some fail
  // Return array with { status, value/error }
  
  return [];
}

// Test
const urls = ['/api/1', '/api/2', '/api/3'];
fetchAllOrFail(urls).then(console.log).catch(console.error);
fetchAllWithFailures(urls).then(console.log);`,
    solution: `async function fetchAllOrFail(urls) {
  return Promise.all(urls.map(url => fetch(url).then(r => r.json())));
}

async function fetchAllWithFailures(urls) {
  return Promise.allSettled(urls.map(url => fetch(url).then(r => r.json())));
}`,
    testCases: [
      {
        input: [[Promise.resolve('success1'), Promise.resolve('success2')]],
        expectedOutput: ['success1', 'success2'],
        description: 'Promise.all with all successful'
      }
    ],
    hints: [
      'Promise.all rejects if any promise rejects',
      'Promise.allSettled always resolves with status for each',
      'Use all when you need all; allSettled when some can fail'
    ]
  },
  {
    id: 'async-generators',
    title: 'Async Generators',
    difficulty: 'hard',
    category: 'Async/Promises',
    description: `Async generators yield promises and can be consumed with for await...of.

**Challenge:** Create an async generator that fetches pages of data.`,
    examples: [
      {
        input: `async function* fetchPages() { ... }`,
        output: `Yields pages one at a time`,
        explanation: 'Process data as it arrives'
      }
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
    solution: `async function* fetchPages(pageSize = 10) {
  let page = 0;
  let hasMore = true;
  
  while (hasMore) {
    const result = await fetchPage(page);
    yield result.data;
    hasMore = result.hasMore;
    page++;
  }
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type checking - async generator should work'
      }
    ],
    hints: [
      'Use async function* to create async generator',
      'yield promises or values',
      'Consume with for await...of'
    ]
  },
  {
    id: 'abort-controller',
    title: 'AbortController for Cancellation',
    difficulty: 'hard',
    category: 'Async/Promises',
    description: `Use AbortController to cancel fetch requests and other async operations.

**Challenge:** Create a cancellable fetch function.`,
    examples: [
      {
        input: `const controller = new AbortController();
fetchWithCancel('/api/data', controller.signal);`,
        output: `Request can be cancelled with controller.abort()`,
        explanation: 'Cancel long-running requests'
      }
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
    const response = await fetch(url, { signal });
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
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type checking - should work with AbortController'
      }
    ],
    hints: [
      'Pass signal to fetch options: { signal }',
      'AbortError is thrown when aborted',
      'Clear timeouts in finally block'
    ]
  },
  {
    id: 'retry-pattern',
    title: 'Retry Pattern with Exponential Backoff',
    difficulty: 'hard',
    category: 'Async/Promises',
    description: `Implement retry logic with exponential backoff for failed requests.

**Challenge:** Retry a function with increasing delays.`,
    examples: [
      {
        input: `retryWithBackoff(fetchData, { maxRetries: 3 })`,
        output: `Retries with delays: 100ms, 200ms, 400ms`,
        explanation: 'Exponential backoff reduces server load'
      }
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

retryWithBackoff(fetchData, { maxRetries: 3, initialDelay: 100 })
  .then(console.log)
  .catch(console.error);`,
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
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Should retry on failure'
      }
    ],
    hints: [
      'Loop up to maxRetries times',
      'Calculate delay: initialDelay * 2^attempt',
      'Use setTimeout wrapped in Promise for delay'
    ]
  },
  {
    id: 'promise-chaining',
    title: 'Promise Chaining Patterns',
    difficulty: 'medium',
    category: 'Async/Promises',
    description: `Chain promises to transform data through multiple async steps.

**Challenge:** Process data through a pipeline of async transformations.`,
    examples: [
      {
        input: `fetchUser(id).then(validate).then(enrich).then(save)`,
        output: `Data flows through each step`,
        explanation: 'Each then returns a promise for the next step'
      }
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

processUser(1).then(console.log).catch(console.error);`,
    solution: `async function processUser(userId) {
  return fetchUser(userId)
    .then(validateUser)
    .then(enrichUser)
    .then(saveUser);
}`,
    testCases: [
      {
        input: [1],
        expectedOutput: expect => {
          return expect && expect.id === 1 && expect.saved === true;
        }
      }
    ],
    hints: [
      'Chain .then() calls for sequential async operations',
      'Return value from one becomes input to next',
      'Use .catch() at end to handle errors'
    ]
  },
  {
    id: 'error-boundaries',
    title: 'Error Handling Patterns',
    difficulty: 'medium',
    category: 'Async/Promises',
    description: `Handle errors gracefully with try/catch, .catch(), and error boundaries.

**Challenge:** Implement comprehensive error handling.`,
    examples: [
      {
        input: `try { await riskyOperation(); } catch (error) { handle(error); }`,
        output: `Errors are caught and handled`,
        explanation: 'Prevent unhandled promise rejections'
      }
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
const riskyOp = () => Promise.reject(new Error('Failed'));
const safeOp = () => Promise.resolve('Success');

safeOperation(riskyOp, 'fallback').then(console.log);

handleMultipleOperations([riskyOp, safeOp, riskyOp])
  .then(console.log);`,
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
}`,
    testCases: [
      {
        input: [() => Promise.reject('error'), 'fallback'],
        expectedOutput: 'fallback',
        description: 'safeOperation'
      }
    ],
    hints: [
      'Use try/catch for async/await',
      'Use .catch() for promise chains',
      'Promise.allSettled never rejects'
    ]
  },
  {
    id: 'promise-constructor',
    title: 'Promise Constructor Pattern',
    difficulty: 'medium',
    category: 'Async/Promises',
    description: `Use new Promise() to wrap callback-based APIs or create custom async operations.

**Challenge:** Convert setTimeout and event listeners to promises.`,
    examples: [
      {
        input: `delay(1000).then(() => console.log('Done'))`,
        output: `Logs after 1 second`,
        explanation: 'Promise-based delay'
      }
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
}`,
    testCases: [
      {
        input: [100],
        expectedOutput: expect => {
          return expect instanceof Promise;
        }
      }
    ],
    hints: [
      'new Promise((resolve, reject) => { ... })',
      'Call resolve() when operation succeeds',
      'Call reject() when operation fails'
    ]
  },
  {
    id: 'async-await-error',
    title: 'Async/Await Error Handling',
    difficulty: 'easy',
    category: 'Async/Promises',
    description: `Handle errors in async/await with try/catch blocks.

**Challenge:** Properly catch and handle async errors.`,
    examples: [
      {
        input: `try { const data = await fetchData(); } catch (error) { ... }`,
        output: `Errors are caught`,
        explanation: 'Use try/catch with async/await'
      }
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

// Test
fetchUserData(1).then(console.log).catch(console.error);
fetchMultipleUsers([1, 2, 3]).then(console.log);`,
    solution: `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
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
}`,
    testCases: [
      {
        input: [1],
        expectedOutput: expect => {
          return expect === null || typeof expect === 'object';
        }
      }
    ],
    hints: [
      'Wrap await in try/catch',
      'Check response.ok for HTTP errors',
      'Use Promise.allSettled for multiple operations'
    ]
  },
  {
    id: 'promise-race-first',
    title: 'Promise.race for First Result',
    difficulty: 'medium',
    category: 'Async/Promises',
    description: `Use Promise.race to get the first resolved promise from multiple sources.

**Challenge:** Fetch from multiple sources and use the fastest response.`,
    examples: [
      {
        input: `Promise.race([fetch('/api1'), fetch('/api2'), fetch('/api3')])`,
        output: `Returns result from fastest API`,
        explanation: 'Use fastest available source'
      }
    ],
    starterCode: `async function fetchFromFastest(urls) {
  // TODO: Use Promise.race to get result from fastest URL
  // Return the first successful response
  
  return null;
}

async function fetchWithFallback(primaryUrl, fallbackUrls) {
  // TODO: Try primary first, if it fails, race the fallbacks
  // Return first successful result
  
  return null;
}

// Test
fetchFromFastest(['/api/slow', '/api/fast', '/api/medium'])
  .then(console.log);

fetchWithFallback('/api/primary', ['/api/backup1', '/api/backup2'])
  .then(console.log);`,
    solution: `async function fetchFromFastest(urls) {
  const promises = urls.map(url => 
    fetch(url).then(r => r.json())
  );
  return Promise.race(promises);
}

async function fetchWithFallback(primaryUrl, fallbackUrls) {
  try {
    const response = await fetch(primaryUrl);
    if (response.ok) {
      return response.json();
    }
    throw new Error('Primary failed');
  } catch (error) {
    return fetchFromFastest(fallbackUrls);
  }
}`,
    testCases: [
      {
        input: [[Promise.resolve('fast'), Promise.resolve('slow')]],
        expectedOutput: 'fast'
      }
    ],
    hints: [
      'Promise.race resolves/rejects with first settled promise',
      'Useful for timeouts and fastest response',
      'Be careful - other promises continue running'
    ]
  },
  {
    id: 'promise-finally',
    title: 'Promise.finally for Cleanup',
    difficulty: 'easy',
    category: 'Async/Promises',
    description: `Use .finally() to run cleanup code regardless of success or failure.

**Challenge:** Always clean up resources.`,
    examples: [
      {
        input: `fetch('/api').finally(() => cleanup())`,
        output: `cleanup() always runs`,
        explanation: 'Finally runs whether promise resolves or rejects'
      }
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

// Test
fetchWithCleanup('/api/data').then(console.log);
processWithLock('resource', () => Promise.resolve('done'))
  .then(console.log);`,
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
        expectedOutput: expect => {
          return expect !== undefined;
        }
      }
    ],
    hints: [
      '.finally() always runs after promise settles',
      'Useful for cleanup, logging, state updates',
      'Runs even if promise rejects'
    ]
  }
];

export function getProblemById(id: string): Problem | undefined {
  return problems.find(p => p.id === id);
}

export function getProblemsByCategory(category: string): Problem[] {
  return problems.filter(p => p.category === category);
}

export function getProblemsByDifficulty(difficulty: Problem['difficulty']): Problem[] {
  return problems.filter(p => p.difficulty === difficulty);
}
