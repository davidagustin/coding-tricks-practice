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
    id: 'reduce-grouping',
    title: 'Reduce for Grouping',
    difficulty: 'medium',
    category: 'Array Methods',
    description: `Use reduce to group array items by a key, creating an object or Map.

**Challenge:** Group users by their role using reduce.`,
    examples: [
      {
        input: `const users = [
  { id: 1, name: 'John', role: 'admin' },
  { id: 2, name: 'Jane', role: 'user' },
  { id: 3, name: 'Bob', role: 'admin' }
];`,
        output: `{ admin: [...], user: [...] }`,
        explanation: 'Group users by role property'
      }
    ],
    starterCode: `function groupByRole(users) {
  // TODO: Use reduce to group users by role
  // Return an object where keys are roles and values are arrays of users
  
  return {};
}

const users = [
  { id: 1, name: 'John', role: 'admin' },
  { id: 2, name: 'Jane', role: 'user' },
  { id: 3, name: 'Bob', role: 'admin' },
  { id: 4, name: 'Alice', role: 'user' }
];

console.log(groupByRole(users));`,
    solution: `function groupByRole(users) {
  return users.reduce((acc, user) => {
    const role = user.role;
    if (!acc[role]) {
      acc[role] = [];
    }
    acc[role].push(user);
    return acc;
  }, {});
}`,
    testCases: [
      {
        input: [[
          { id: 1, name: 'John', role: 'admin' },
          { id: 2, name: 'Jane', role: 'user' },
          { id: 3, name: 'Bob', role: 'admin' }
        ]],
        expectedOutput: {
          admin: [
            { id: 1, name: 'John', role: 'admin' },
            { id: 3, name: 'Bob', role: 'admin' }
          ],
          user: [
            { id: 2, name: 'Jane', role: 'user' }
          ]
        }
      }
    ],
    hints: [
      'Initialize accumulator as empty object: reduce((acc, item) => ..., {})',
      'Check if key exists, create array if not: if (!acc[key]) acc[key] = []',
      'Push item to appropriate group: acc[key].push(item)'
    ]
  },
  {
    id: 'find-vs-filter',
    title: 'Find vs Filter - When to Use Each',
    difficulty: 'easy',
    category: 'Array Methods',
    description: `Understand when to use find() (returns first match) vs filter() (returns all matches).

**Challenge:** Use find to get the first matching item, and filter to get all matches.`,
    examples: [
      {
        input: `const users = [
  { id: 1, active: true },
  { id: 2, active: false },
  { id: 3, active: true }
];`,
        output: `find: first active user, filter: all active users`,
        explanation: 'find returns one item, filter returns array'
      }
    ],
    starterCode: `function getFirstActiveUser(users) {
  // TODO: Use find() to get the first user where active === true
  return null;
}

function getAllActiveUsers(users) {
  // TODO: Use filter() to get all users where active === true
  return [];
}

const users = [
  { id: 1, name: 'John', active: true },
  { id: 2, name: 'Jane', active: false },
  { id: 3, name: 'Bob', active: true },
  { id: 4, name: 'Alice', active: true }
];

console.log('First active:', getFirstActiveUser(users));
console.log('All active:', getAllActiveUsers(users));`,
    solution: `function getFirstActiveUser(users) {
  return users.find(user => user.active === true);
}

function getAllActiveUsers(users) {
  return users.filter(user => user.active === true);
}`,
    testCases: [
      {
        input: [[
          { id: 1, name: 'John', active: true },
          { id: 2, name: 'Jane', active: false },
          { id: 3, name: 'Bob', active: true }
        ]],
        expectedOutput: { id: 1, name: 'John', active: true },
        description: 'getFirstActiveUser'
      },
      {
        input: [[
          { id: 1, name: 'John', active: true },
          { id: 2, name: 'Jane', active: false },
          { id: 3, name: 'Bob', active: true }
        ]],
        expectedOutput: [
          { id: 1, name: 'John', active: true },
          { id: 3, name: 'Bob', active: true }
        ],
        description: 'getAllActiveUsers'
      }
    ],
    hints: [
      'find() returns the first element that matches, or undefined',
      'filter() returns an array of all matching elements',
      'Use find when you need one item, filter when you need multiple'
    ]
  },
  {
    id: 'array-chaining',
    title: 'Method Chaining with Arrays',
    difficulty: 'medium',
    category: 'Array Methods',
    description: `Chain multiple array methods together for powerful data transformations.

**Challenge:** Transform data through a chain of operations.`,
    examples: [
      {
        input: `const products = [
  { name: 'Laptop', price: 1000, category: 'electronics' },
  { name: 'Book', price: 20, category: 'books' }
];`,
        output: `['LAPTOP', 'BOOK']`,
        explanation: 'Filter expensive items, get names, uppercase them'
      }
    ],
    starterCode: `function getExpensiveProductNames(products) {
  // TODO: Chain methods to:
  // 1. Filter products where price > 100
  // 2. Map to get just the name
  // 3. Map to uppercase each name
  
  return products;
}

const products = [
  { name: 'Laptop', price: 1000, category: 'electronics' },
  { name: 'Book', price: 20, category: 'books' },
  { name: 'Phone', price: 800, category: 'electronics' },
  { name: 'Pen', price: 2, category: 'office' }
];

console.log(getExpensiveProductNames(products));`,
    solution: `function getExpensiveProductNames(products) {
  return products
    .filter(p => p.price > 100)
    .map(p => p.name)
    .map(name => name.toUpperCase());
}`,
    testCases: [
      {
        input: [[
          { name: 'Laptop', price: 1000, category: 'electronics' },
          { name: 'Book', price: 20, category: 'books' },
          { name: 'Phone', price: 800, category: 'electronics' }
        ]],
        expectedOutput: ['LAPTOP', 'PHONE']
      }
    ],
    hints: [
      'Each method returns an array, so you can chain them',
      'Order matters: filter first to reduce items, then transform',
      'You can combine map operations: .map(p => p.name.toUpperCase())'
    ]
  },
  {
    id: 'reduce-right',
    title: 'ReduceRight for Right-to-Left Operations',
    difficulty: 'medium',
    category: 'Array Methods',
    description: `Use reduceRight when you need to process array from right to left.

**Challenge:** Build a function composition pipeline using reduceRight.`,
    examples: [
      {
        input: `const functions = [x => x * 2, x => x + 1, x => x - 5];`,
        output: `Composed function: (x - 5) + 1) * 2`,
        explanation: 'Apply functions from right to left'
      }
    ],
    starterCode: `function compose(...functions) {
  // TODO: Use reduceRight to compose functions
  // compose(f, g, h)(x) should be f(g(h(x)))
  // Process from right to left
  
  return (x) => x;
}

// Test
const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const subtractFive = x => x - 5;

const composed = compose(multiplyByTwo, addOne, subtractFive);
console.log(composed(10)); // Should be: ((10 - 5) + 1) * 2 = 12`,
    solution: `function compose(...functions) {
  return (x) => functions.reduceRight((acc, fn) => fn(acc), x);
}`,
    testCases: [
      {
        input: [10],
        expectedOutput: 12,
        description: 'compose(multiplyByTwo, addOne, subtractFive)(10)'
      }
    ],
    hints: [
      'reduceRight processes array from last to first element',
      'Useful for function composition: f(g(h(x)))',
      'Accumulator starts with initial value, then each function is applied'
    ]
  },
  {
    id: 'some-every',
    title: 'Some and Every for Validation',
    difficulty: 'easy',
    category: 'Array Methods',
    description: `Use some() to check if at least one item matches, and every() to check if all items match.

**Challenge:** Validate arrays using some and every.`,
    examples: [
      {
        input: `const scores = [85, 90, 78, 92];`,
        output: `some > 90: true, every > 70: true`,
        explanation: 'Check if any score is high, or all scores pass threshold'
      }
    ],
    starterCode: `function hasHighScore(scores) {
  // TODO: Use some() to check if any score >= 90
  return false;
}

function allPassing(scores) {
  // TODO: Use every() to check if all scores >= 70
  return false;
}

const scores1 = [85, 90, 78, 92];
const scores2 = [65, 70, 68, 72];

console.log('Has high score:', hasHighScore(scores1));
console.log('All passing:', allPassing(scores1));
console.log('All passing (scores2):', allPassing(scores2));`,
    solution: `function hasHighScore(scores) {
  return scores.some(score => score >= 90);
}

function allPassing(scores) {
  return scores.every(score => score >= 70);
}`,
    testCases: [
      {
        input: [[85, 90, 78, 92]],
        expectedOutput: true,
        description: 'hasHighScore'
      },
      {
        input: [[85, 90, 78, 92]],
        expectedOutput: true,
        description: 'allPassing'
      },
      {
        input: [[65, 70, 68, 72]],
        expectedOutput: false,
        description: 'allPassing with low scores'
      }
    ],
    hints: [
      'some() returns true if at least one element matches',
      'every() returns true only if ALL elements match',
      'Both short-circuit: some stops at first match, every stops at first non-match'
    ]
  },
  {
    id: 'array-from',
    title: 'Array.from with Mapping',
    difficulty: 'medium',
    category: 'Array Methods',
    description: `Use Array.from() to create arrays from iterables, with optional mapping function.

**Challenge:** Create arrays from various sources using Array.from.`,
    examples: [
      {
        input: `Array.from({ length: 5 }, (_, i) => i * 2)`,
        output: `[0, 2, 4, 6, 8]`,
        explanation: 'Create array of even numbers'
      }
    ],
    starterCode: `function createNumberSequence(length, start = 0, step = 1) {
  // TODO: Use Array.from to create sequence
  // Array.from({ length: n }, (_, i) => ...)
  return [];
}

function createAlphabet() {
  // TODO: Use Array.from to create ['a', 'b', 'c', ..., 'z']
  // Hint: String.fromCharCode(97) is 'a', 98 is 'b', etc.
  return [];
}

console.log('Sequence:', createNumberSequence(5, 0, 2));
console.log('Alphabet:', createAlphabet());`,
    solution: `function createNumberSequence(length, start = 0, step = 1) {
  return Array.from({ length }, (_, i) => start + i * step);
}

function createAlphabet() {
  return Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
}`,
    testCases: [
      {
        input: [5, 0, 2],
        expectedOutput: [0, 2, 4, 6, 8],
        description: 'createNumberSequence'
      },
      {
        input: [],
        expectedOutput: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        description: 'createAlphabet'
      }
    ],
    hints: [
      'Array.from({ length: n }, mapFn) creates array with n elements',
      'Second parameter is mapping function: (_, index) => value',
      'Useful for creating sequences, ranges, or transforming iterables'
    ]
  },
  {
    id: 'partition-pattern',
    title: 'Partition Pattern with Reduce',
    difficulty: 'medium',
    category: 'Array Methods',
    description: `Split an array into two groups based on a condition using reduce.

**Challenge:** Partition users into active and inactive groups.`,
    examples: [
      {
        input: `const users = [
  { name: 'John', active: true },
  { name: 'Jane', active: false }
];`,
        output: `{ active: [...], inactive: [...] }`,
        explanation: 'Split array into two groups'
      }
    ],
    starterCode: `function partitionUsers(users) {
  // TODO: Use reduce to partition users into active and inactive
  // Return { active: [...], inactive: [...] }
  
  return { active: [], inactive: [] };
}

const users = [
  { id: 1, name: 'John', active: true },
  { id: 2, name: 'Jane', active: false },
  { id: 3, name: 'Bob', active: true },
  { id: 4, name: 'Alice', active: false }
];

console.log(partitionUsers(users));`,
    solution: `function partitionUsers(users) {
  return users.reduce((acc, user) => {
    if (user.active) {
      acc.active.push(user);
    } else {
      acc.inactive.push(user);
    }
    return acc;
  }, { active: [], inactive: [] });
}`,
    testCases: [
      {
        input: [[
          { id: 1, name: 'John', active: true },
          { id: 2, name: 'Jane', active: false },
          { id: 3, name: 'Bob', active: true }
        ]],
        expectedOutput: {
          active: [
            { id: 1, name: 'John', active: true },
            { id: 3, name: 'Bob', active: true }
          ],
          inactive: [
            { id: 2, name: 'Jane', active: false }
          ]
        }
      }
    ],
    hints: [
      'Initialize accumulator with both groups: { active: [], inactive: [] }',
      'Push to appropriate group based on condition',
      'More efficient than two separate filter() calls'
    ]
  },
  {
    id: 'chunk-arrays',
    title: 'Chunking Arrays into Groups',
    difficulty: 'medium',
    category: 'Array Methods',
    description: `Split an array into chunks of a specific size.

**Challenge:** Create a function to chunk arrays into smaller arrays.`,
    examples: [
      {
        input: `chunk([1, 2, 3, 4, 5], 2)`,
        output: `[[1, 2], [3, 4], [5]]`,
        explanation: 'Split array into chunks of size 2'
      }
    ],
    starterCode: `function chunk(array, size) {
  // TODO: Split array into chunks of given size
  // Use Array.from or reduce
  // chunk([1, 2, 3, 4, 5], 2) => [[1, 2], [3, 4], [5]]
  
  return [];
}

console.log(chunk([1, 2, 3, 4, 5, 6, 7], 3));
console.log(chunk(['a', 'b', 'c', 'd'], 2));`,
    solution: `function chunk(array, size) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}`,
    testCases: [
      {
        input: [[1, 2, 3, 4, 5], 2],
        expectedOutput: [[1, 2], [3, 4], [5]]
      },
      {
        input: [[1, 2, 3, 4, 5, 6, 7], 3],
        expectedOutput: [[1, 2, 3], [4, 5, 6], [7]]
      }
    ],
    hints: [
      'Calculate number of chunks: Math.ceil(array.length / size)',
      'Use slice() to extract chunks: array.slice(start, start + size)',
      'Array.from can create the chunks array with mapping'
    ]
  },
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
        expectedOutput: (expect: any) => {
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
        expectedOutput: (expect: any) => {
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
        expectedOutput: (expect: any) => {
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
        expectedOutput: (expect: any) => {
          return expect !== undefined;
        }
      }
    ],
    hints: [
      '.finally() always runs after promise settles',
      'Useful for cleanup, logging, state updates',
      'Runs even if promise rejects'
    ]
  },
{
    id: 'conditional-types',
    title: 'Basic TypeScript Types',
    difficulty: 'easy',
    category: 'TypeScript Basics',
    description: `TypeScript provides static typing for JavaScript. Learn the basic types: string, number, boolean, null, undefined, and arrays.

**Challenge:** Add proper type annotations to functions and variables.`,
    examples: [
      {
        input: `const name: string = 'John';
const age: number = 30;
const isActive: boolean = true;`,
        output: `Type-safe variables`,
        explanation: 'Type annotations provide compile-time type checking'
      }
    ],
    starterCode: `// TODO: Add type annotations
// Fix the type errors by adding proper types

function greet(name) {
  return \`Hello, \${name}!\`;
}

function calculateArea(width, height) {
  return width * height;
}

function isEven(num) {
  return num % 2 === 0;
}

const numbers: number[] = [1, 2, 3, 4, 5];
const names: string[] = ['Alice', 'Bob'];

// Test
console.log(greet('John'));
console.log(calculateArea(10, 5));
console.log(isEven(4));`,
    solution: `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

function calculateArea(width: number, height: number): number {
  return width * height;
}

function isEven(num: number): boolean {
  return num % 2 === 0;
}

const numbers: number[] = [1, 2, 3, 4, 5];
const names: string[] = ['Alice', 'Bob'];

console.log(greet('John'));
console.log(calculateArea(10, 5));
console.log(isEven(4));`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type annotations work correctly'
      }
    ],
    hints: [
      'Use : type syntax for type annotations',
      'Function parameters and return types need annotations',
      'Arrays can be typed as Type[] or Array<Type>'
    ]
  },
  {
    id: 'interfaces',
    title: 'Interfaces',
    difficulty: 'easy',
    category: 'TypeScript Basics',
    description: `Interfaces define the shape of objects. They provide a contract that objects must follow.

**Challenge:** Create and use interfaces to type objects.`,
    examples: [
      {
        input: `interface User {
  name: string;
  age: number;
}
const user: User = { name: 'John', age: 30 };`,
        output: `Type-safe user object`,
        explanation: 'Interface ensures object has required properties'
      }
    ],
    starterCode: `// TODO: Create interfaces
// 1. Create a Person interface with name, age, and email
// 2. Create a Product interface with id, name, price, and optional description
// 3. Use these interfaces to type variables

interface Person {
  // Your code here
}

interface Product {
  // Your code here
}

// TODO: Create objects that conform to these interfaces
const person: Person = {
  // Your code here
};

const product: Product = {
  // Your code here
};

// Test
function displayPerson(p: Person) {
  console.log(\`\${p.name}, \${p.age} years old\`);
}

displayPerson(person);`,
    solution: `interface Person {
  name: string;
  age: number;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string; // Optional property
}

const person: Person = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com'
};

const product: Product = {
  id: 1,
  name: 'Laptop',
  price: 999.99,
  description: 'High-performance laptop'
};

function displayPerson(p: Person) {
  console.log(\`\${p.name}, \${p.age} years old\`);
}

displayPerson(person);`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Interfaces work correctly'
      }
    ],
    hints: [
      'Use interface keyword to define object shapes',
      'Optional properties use ?: syntax',
      'Interfaces can extend other interfaces'
    ]
  },
  {
    id: 'type-aliases',
    title: 'Type Aliases',
    difficulty: 'easy',
    category: 'TypeScript Basics',
    description: `Type aliases create custom types. They're similar to interfaces but can represent unions, intersections, and primitives.

**Challenge:** Create type aliases for complex types.`,
    examples: [
      {
        input: `type ID = string | number;
type Status = 'pending' | 'approved' | 'rejected';`,
        output: `Custom types`,
        explanation: 'Type aliases can represent unions and literals'
      }
    ],
    starterCode: `// TODO: Create type aliases
// 1. Create a Status type that can be 'loading', 'success', or 'error'
// 2. Create a ID type that can be string or number
// 3. Create a Coordinates type for { x: number, y: number }

type Status = /* Your code here */;
type ID = /* Your code here */;
type Coordinates = /* Your code here */;

// TODO: Use these types
function processStatus(status: Status) {
  // Your code here
}

const userId: ID = 123;
const point: Coordinates = { x: 10, y: 20 };

console.log(processStatus('success'));`,
    solution: `type Status = 'loading' | 'success' | 'error';
type ID = string | number;
type Coordinates = { x: number; y: number };

function processStatus(status: Status) {
  return \`Status: \${status}\`;
}

const userId: ID = 123;
const point: Coordinates = { x: 10, y: 20 };

console.log(processStatus('success'));`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type aliases work correctly'
      }
    ],
    hints: [
      'Use type keyword for type aliases',
      'Union types use | syntax',
      'Type aliases can represent any type'
    ]
  },
  {
    id: 'generics-basic',
    title: 'Generic Functions and Types',
    difficulty: 'medium',
    category: 'TypeScript Basics',
    description: `Generics allow you to create reusable components that work with multiple types. They provide type safety while maintaining flexibility.

**Challenge:** Create generic functions and types.`,
    examples: [
      {
        input: `function identity<T>(arg: T): T {
  return arg;
}
const num = identity<number>(42);`,
        output: `42`,
        explanation: 'Generic function works with any type'
      }
    ],
    starterCode: `// TODO: Create generic functions
// 1. Create a generic identity function
// 2. Create a generic function to get first element of array
// 3. Create a generic Pair type

function identity<T>(arg: T): T {
  // Your code here
}

function getFirst<T>(arr: T[]): T | undefined {
  // Your code here
}

type Pair<T, U> = {
  // Your code here
};

// Test
const num = identity<number>(42);
const str = identity<string>('hello');
const first = getFirst([1, 2, 3]);
const pair: Pair<string, number> = { first: 'age', second: 30 };

console.log(num, str, first, pair);`,
    solution: `function identity<T>(arg: T): T {
  return arg;
}

function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

type Pair<T, U> = {
  first: T;
  second: U;
};

const num = identity<number>(42);
const str = identity<string>('hello');
const first = getFirst([1, 2, 3]);
const pair: Pair<string, number> = { first: 'age', second: 30 };

console.log(num, str, first, pair);`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Generics work correctly'
      }
    ],
    hints: [
      'Use <T> syntax for generic type parameters',
      'Multiple generics: <T, U, V>',
      'TypeScript can often infer generic types'
    ]
  },
  {
    id: 'union-intersection',
    title: 'Union and Intersection Types',
    difficulty: 'medium',
    category: 'TypeScript Basics',
    description: `Union types (|) represent values that can be one of several types. Intersection types (&) combine multiple types.

**Challenge:** Use union and intersection types effectively.`,
    examples: [
      {
        input: `type StringOrNumber = string | number;
type A = { a: number };
type B = { b: string };
type AB = A & B; // { a: number, b: string }`,
        output: `Combined types`,
        explanation: 'Union = one of, Intersection = both'
      }
    ],
    starterCode: `// TODO: Use union and intersection types
// 1. Create a function that accepts string | number
// 2. Create intersection types
// 3. Use type narrowing with typeof

type StringOrNumber = string | number;

function processValue(value: StringOrNumber) {
  // TODO: Use type narrowing to handle both types
  // Your code here
}

type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge; // Intersection

// TODO: Create a function that works with Person
function displayPerson(person: Person) {
  // Your code here
}

// Test
console.log(processValue('hello'));
console.log(processValue(42));
displayPerson({ name: 'Alice', age: 30 });`,
    solution: `type StringOrNumber = string | number;

function processValue(value: StringOrNumber) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else {
    return value * 2;
  }
}

type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge;

function displayPerson(person: Person) {
  console.log(\`\${person.name}, \${person.age} years old\`);
}

console.log(processValue('hello'));
console.log(processValue(42));
displayPerson({ name: 'Alice', age: 30 });`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Union and intersection types work correctly'
      }
    ],
    hints: [
      'Union: A | B means A or B',
      'Intersection: A & B means both A and B',
      'Use typeof or type guards to narrow union types'
    ]
  },
  {
    id: 'optional-readonly',
    title: 'Optional and Readonly Properties',
    difficulty: 'easy',
    category: 'TypeScript Basics',
    description: `TypeScript provides modifiers for object properties: ? for optional, readonly for immutable.

**Challenge:** Use optional and readonly modifiers correctly.`,
    examples: [
      {
        input: `interface Config {
  readonly apiKey: string;
  timeout?: number;
}`,
        output: `Type-safe config`,
        explanation: 'readonly prevents reassignment, ? makes optional'
      }
    ],
    starterCode: `// TODO: Use optional and readonly modifiers
// 1. Create an interface with readonly and optional properties
// 2. Create a function that handles optional properties

interface User {
  // TODO: id should be readonly
  // TODO: email should be optional
  // Your code here
}

function createUser(data: Partial<User>): User {
  // TODO: Return User with defaults for optional properties
  // Your code here
}

// Test
const user = createUser({ id: '123', name: 'Alice' });
// user.id = '456'; // Should cause error (readonly)
console.log(user);`,
    solution: `interface User {
  readonly id: string;
  name: string;
  email?: string;
}

function createUser(data: Partial<User>): User {
  return {
    id: data.id || '',
    name: data.name || '',
    email: data.email
  };
}

const user = createUser({ id: '123', name: 'Alice' });
// user.id = '456'; // Error: Cannot assign to 'id' because it is a read-only property
console.log(user);`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Optional and readonly work correctly'
      }
    ],
    hints: [
      'Use ? for optional properties: prop?: type',
      'Use readonly for immutable properties: readonly prop: type',
      'Partial<T> makes all properties optional'
    ]
  },
  {
    id: 'type-guards',
    title: 'Type Guards',
    difficulty: 'medium',
    category: 'TypeScript Basics',
    description: `Type guards narrow types within conditional blocks. Use typeof, instanceof, or custom type guard functions.

**Challenge:** Create and use type guards to narrow types.`,
    examples: [
      {
        input: `function isString(value: unknown): value is string {
  return typeof value === 'string';
}
if (isString(value)) {
  value.toUpperCase(); // TypeScript knows value is string
}`,
        output: `Narrowed type`,
        explanation: 'Type guard narrows type in if block'
      }
    ],
    starterCode: `// TODO: Create type guards
// 1. Create a type guard for User type
// 2. Use type guards to narrow types

interface User {
  name: string;
  age: number;
}

function isUser(obj: unknown): obj is User {
  // TODO: Check if obj is a User
  // Your code here
}

function processData(data: unknown) {
  // TODO: Use type guard to narrow type
  if (isUser(data)) {
    // TypeScript should know data is User here
    console.log(data.name, data.age);
  } else {
    console.log('Not a user');
  }
}

// Test
processData({ name: 'Alice', age: 30 });
processData('not a user');`,
    solution: `interface User {
  name: string;
  age: number;
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'age' in obj &&
    typeof (obj as any).name === 'string' &&
    typeof (obj as any).age === 'number'
  );
}

function processData(data: unknown) {
  if (isUser(data)) {
    console.log(data.name, data.age);
  } else {
    console.log('Not a user');
  }
}

processData({ name: 'Alice', age: 30 });
processData('not a user');`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type guards work correctly'
      }
    ],
    hints: [
      'Type guard syntax: value is Type',
      'Use typeof, instanceof, or property checks',
      'Type guards narrow types in conditional blocks'
    ]
  },
  {
    id: 'enums',
    title: 'Enums',
    difficulty: 'easy',
    category: 'TypeScript Basics',
    description: `Enums allow you to define a set of named constants. They can be numeric or string-based.

**Challenge:** Create and use enums effectively.`,
    examples: [
      {
        input: `enum Status {
  Pending,
  Approved,
  Rejected
}
const status: Status = Status.Pending;`,
        output: `Type-safe constants`,
        explanation: 'Enums provide named constants'
      }
    ],
    starterCode: `// TODO: Create enums
// 1. Create a numeric enum for Status
// 2. Create a string enum for Direction
// 3. Use enums in functions

enum Status {
  // Your code here
}

enum Direction {
  // Your code here (string enum)
}

function processStatus(status: Status) {
  // TODO: Use enum in switch statement
  // Your code here
}

// Test
console.log(processStatus(Status.Pending));
console.log(Direction.Up);`,
    solution: `enum Status {
  Pending,
  Approved,
  Rejected
}

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

function processStatus(status: Status) {
  switch (status) {
    case Status.Pending:
      return 'Processing...';
    case Status.Approved:
      return 'Approved!';
    case Status.Rejected:
      return 'Rejected.';
    default:
      return 'Unknown';
  }
}

console.log(processStatus(Status.Pending));
console.log(Direction.Up);`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Enums work correctly'
      }
    ],
    hints: [
      'Numeric enums auto-increment from 0',
      'String enums must have explicit values',
      'Enums compile to JavaScript objects'
    ]
  },
{
    id: 'proxy-api',
    title: 'Proxy API for Interception',
    difficulty: 'hard',
    category: 'Object Methods',
    description: `Use Proxy to intercept and customize operations on objects.

**Challenge:** Create a proxy that logs property access and validates assignments.`,
    examples: [
      {
        input: `const obj = new Proxy(target, handler);`,
        output: `Intercepts get, set, and other operations`,
        explanation: 'Proxy enables meta-programming'
      }
    ],
    starterCode: `// TODO: Create a proxy that logs all property access
function createLoggedObject(target) {
  // Return a Proxy that logs when properties are accessed
  // Use 'get' trap to log property reads
  return target;
}

// TODO: Create a proxy that validates property assignments
function createValidatedObject(target, validator) {
  // Return a Proxy that validates before setting properties
  // Use 'set' trap to validate and set values
  // Throw error if validation fails
  return target;
}

// Test
const logged = createLoggedObject({ name: 'John', age: 30 });
console.log(logged.name); // Should log: "Accessing property: name"

const validated = createValidatedObject({}, (key, value) => {
  if (key === 'age' && (value < 0 || value > 150)) {
    throw new Error('Invalid age');
  }
  return true;
});

validated.age = 25; // OK
validated.age = 200; // Should throw error`,
    solution: `function createLoggedObject(target) {
  return new Proxy(target, {
    get(target, prop) {
      console.log(\`Accessing property: \${String(prop)}\`);
      return target[prop];
    }
  });
}

function createValidatedObject(target, validator) {
  return new Proxy(target, {
    set(target, prop, value) {
      if (validator(prop, value)) {
        target[prop] = value;
        return true;
      }
      throw new Error(\`Invalid value for \${String(prop)}\`);
    }
  });
}`,
    testCases: [
      {
        input: [{ name: 'John' }],
        expectedOutput: 'John',
        description: 'createLoggedObject - mock test'
      }
    ],
    hints: [
      'Proxy constructor takes target and handler object',
      'Use get trap for property access: get(target, prop)',
      'Use set trap for property assignment: set(target, prop, value)',
      'Return true from set trap to indicate success'
    ]
  },
  {
    id: 'weakmap-weakset',
    title: 'WeakMap and WeakSet',
    difficulty: 'medium',
    category: 'Object Methods',
    description: `Use WeakMap and WeakSet for memory-efficient associations that don't prevent garbage collection.

**Challenge:** Use WeakMap to store private data and WeakSet to track visited objects.`,
    examples: [
      {
        input: `const privateData = new WeakMap();`,
        output: `Stores data keyed by objects, allows GC`,
        explanation: 'WeakMap keys must be objects, allows garbage collection'
      }
    ],
    starterCode: `// TODO: Use WeakMap to store private data
class User {
  constructor(name) {
    this.name = name;
    // Store private data in WeakMap
    // Use 'this' as the key
  }
  
  getPrivateId() {
    // Retrieve private data from WeakMap
    return null;
  }
  
  setPrivateId(id) {
    // Store private data in WeakMap
  }
}

// TODO: Use WeakSet to track visited objects
function markVisited(obj, visited) {
  // Add object to WeakSet
}

function isVisited(obj, visited) {
  // Check if object is in WeakSet
  return false;
}

// Test
const user = new User('John');
user.setPrivateId('secret-123');
console.log(user.getPrivateId());

const visited = new WeakSet();
const obj1 = {};
const obj2 = {};

markVisited(obj1, visited);
console.log(isVisited(obj1, visited)); // true
console.log(isVisited(obj2, visited)); // false`,
    solution: `const privateData = new WeakMap();

class User {
  constructor(name) {
    this.name = name;
  }
  
  getPrivateId() {
    return privateData.get(this);
  }
  
  setPrivateId(id) {
    privateData.set(this, id);
  }
}

function markVisited(obj, visited) {
  visited.add(obj);
}

function isVisited(obj, visited) {
  return visited.has(obj);
}`,
    testCases: [
      {
        input: ['John'],
        expectedOutput: 'secret-123',
        description: 'User with private data'
      }
    ],
    hints: [
      'WeakMap keys must be objects (not primitives)',
      'WeakMap/WeakSet allow garbage collection when key is no longer referenced',
      'Useful for private data, metadata, or tracking without memory leaks'
    ]
  },
  {
    id: 'symbol-usage',
    title: 'Symbols for Unique Keys',
    difficulty: 'medium',
    category: 'Object Methods',
    description: `Use Symbols to create unique property keys that won't conflict with other properties.

**Challenge:** Use Symbols for private properties and well-known symbols.`,
    examples: [
      {
        input: `const ID = Symbol('id');`,
        output: `Unique symbol that won't conflict`,
        explanation: 'Symbols are always unique, even with same description'
      }
    ],
    starterCode: `// TODO: Create a Symbol for a private property
const PRIVATE_ID = Symbol('privateId'); // Fix: Create symbol

// TODO: Use Symbol in an object
const user = {
  name: 'John',
  // Add privateId property using PRIVATE_ID symbol
};

// TODO: Create a well-known symbol (iterator)
const iterable = {
  data: [1, 2, 3],
  // Add Symbol.iterator method to make it iterable
};

// Test
user[PRIVATE_ID] = 'secret-123';
console.log(user[PRIVATE_ID]);

// Should work with for...of
for (const item of iterable) {
  console.log(item);
}`,
    solution: `const PRIVATE_ID = Symbol('privateId');

const user = {
  name: 'John',
  [PRIVATE_ID]: 'secret-123'
};

const iterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        }
        return { done: true };
      }.bind(this)
    };
  }
};`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Symbol usage - type check'
      }
    ],
    hints: [
      'Symbol() creates unique symbol, Symbol.for() creates shared symbol',
      'Use computed property names: [SYMBOL]: value',
      'Well-known symbols: Symbol.iterator, Symbol.toStringTag, etc.',
      'Symbols are not enumerable in Object.keys() or for...in'
    ]
  },
  {
    id: 'reflect-api',
    title: 'Reflect API for Meta-Programming',
    difficulty: 'hard',
    category: 'Object Methods',
    description: `Use Reflect methods for operations that mirror Proxy traps.

**Challenge:** Use Reflect for property operations and function calls.`,
    examples: [
      {
        input: `Reflect.get(obj, 'prop'), Reflect.set(obj, 'prop', value)`,
        output: `Meta-programming operations`,
        explanation: 'Reflect provides programmatic access to object operations'
      }
    ],
    starterCode: `// TODO: Use Reflect.get to safely get property
function safeGet(obj, path) {
  // Use Reflect.get to get nested properties
  // Handle cases where property doesn't exist
  return undefined;
}

// TODO: Use Reflect.set to set property
function safeSet(obj, prop, value) {
  // Use Reflect.set to set property
  // Return boolean indicating success
  return false;
}

// TODO: Use Reflect.has to check property
function hasProperty(obj, prop) {
  // Use Reflect.has instead of 'prop' in obj
  return false;
}

// TODO: Use Reflect.construct to create instance
function createInstance(Constructor, args) {
  // Use Reflect.construct instead of new Constructor(...args)
  return null;
}

// Test
const obj = { a: { b: { c: 1 } } };
console.log(safeGet(obj, 'a.b.c')); // Should work
console.log(safeSet(obj, 'x', 2)); // Should return true
console.log(hasProperty(obj, 'x')); // Should return true

class User {
  constructor(name) { this.name = name; }
}
const user = createInstance(User, ['John']);
console.log(user.name);`,
    solution: `function safeGet(obj, path) {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current == null) return undefined;
    current = Reflect.get(current, key);
  }
  return current;
}

function safeSet(obj, prop, value) {
  return Reflect.set(obj, prop, value);
}

function hasProperty(obj, prop) {
  return Reflect.has(obj, prop);
}

function createInstance(Constructor, args) {
  return Reflect.construct(Constructor, args);
}`,
    testCases: [
      {
        input: [{ a: { b: 1 } }, 'a.b'],
        expectedOutput: 1,
        description: 'safeGet'
      }
    ],
    hints: [
      'Reflect.get(target, prop) - get property value',
      'Reflect.set(target, prop, value) - set property, returns boolean',
      'Reflect.has(target, prop) - check if property exists',
      'Reflect.construct(Constructor, args) - create instance'
    ]
  },
  {
    id: 'object-freeze-seal',
    title: 'Object.freeze, seal, and preventExtensions',
    difficulty: 'medium',
    category: 'Object Methods',
    description: `Control mutability with Object.freeze, Object.seal, and Object.preventExtensions.

**Challenge:** Understand the differences and use cases for each.`,
    examples: [
      {
        input: `Object.freeze(obj), Object.seal(obj), Object.preventExtensions(obj)`,
        output: `Different levels of immutability`,
        explanation: 'freeze > seal > preventExtensions in restrictiveness'
      }
    ],
    starterCode: `// TODO: Create immutable object with Object.freeze
function createImmutableObject(data) {
  // Freeze the object (no changes allowed)
  return data;
}

// TODO: Create sealed object (can modify, can't add/remove)
function createSealedObject(data) {
  // Seal the object
  return data;
}

// TODO: Check if object is frozen
function isFrozen(obj) {
  // Use Object.isFrozen
  return false;
}

// TODO: Deep freeze nested objects
function deepFreeze(obj) {
  // Freeze object and recursively freeze all properties
  // Return the frozen object
  return obj;
}

// Test
const immutable = createImmutableObject({ a: 1, b: { c: 2 } });
// immutable.a = 2; // Should fail silently or throw in strict mode

const sealed = createSealedObject({ x: 1 });
sealed.x = 2; // Should work
// sealed.y = 3; // Should fail

const deep = deepFreeze({ a: { b: { c: 1 } } });
// deep.a.b.c = 2; // Should fail`,
    solution: `function createImmutableObject(data) {
  return Object.freeze(data);
}

function createSealedObject(data) {
  return Object.seal(data);
}

function isFrozen(obj) {
  return Object.isFrozen(obj);
}

function deepFreeze(obj) {
  Object.freeze(obj);
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === 'object' && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  }
  return obj;
}`,
    testCases: [
      {
        input: [{ a: 1 }],
        expectedOutput: true,
        description: 'isFrozen check'
      }
    ],
    hints: [
      'Object.freeze: no changes, additions, or deletions',
      'Object.seal: can modify, cannot add or delete',
      'Object.preventExtensions: can modify/delete, cannot add',
      'Deep freeze requires recursive freezing of nested objects'
    ]
  },
  {
    id: 'property-descriptors',
    title: 'Property Descriptors',
    difficulty: 'medium',
    category: 'Object Methods',
    description: `Use property descriptors to control property behavior (enumerable, writable, configurable).

**Challenge:** Create properties with specific descriptors.`,
    examples: [
      {
        input: `Object.defineProperty(obj, 'prop', { enumerable: false })`,
        output: `Property with custom descriptor`,
        explanation: 'Control property visibility and mutability'
      }
    ],
    starterCode: `// TODO: Create a non-enumerable property
function addHiddenProperty(obj, key, value) {
  // Use Object.defineProperty with enumerable: false
  return obj;
}

// TODO: Create a read-only property
function addReadOnlyProperty(obj, key, value) {
  // Use Object.defineProperty with writable: false
  return obj;
}

// TODO: Get all property descriptors
function getDescriptors(obj) {
  // Use Object.getOwnPropertyDescriptors
  return {};
}

// TODO: Copy descriptors from one object to another
function copyDescriptors(source, target) {
  // Use Object.defineProperties with descriptors from source
  return target;
}

// Test
const obj = { visible: 1 };
addHiddenProperty(obj, 'hidden', 'secret');
addReadOnlyProperty(obj, 'readonly', 'immutable');

console.log(Object.keys(obj)); // Should not include 'hidden'
// obj.readonly = 'changed'; // Should fail in strict mode

const descriptors = getDescriptors(obj);
console.log(descriptors);`,
    solution: `function addHiddenProperty(obj, key, value) {
  Object.defineProperty(obj, key, {
    value,
    enumerable: false,
    writable: true,
    configurable: true
  });
  return obj;
}

function addReadOnlyProperty(obj, key, value) {
  Object.defineProperty(obj, key, {
    value,
    enumerable: true,
    writable: false,
    configurable: true
  });
  return obj;
}

function getDescriptors(obj) {
  return Object.getOwnPropertyDescriptors(obj);
}

function copyDescriptors(source, target) {
  const descriptors = Object.getOwnPropertyDescriptors(source);
  Object.defineProperties(target, descriptors);
  return target;
}`,
    testCases: [
      {
        input: [{ a: 1 }, 'hidden', 'secret'],
        expectedOutput: { a: 1 },
        description: 'addHiddenProperty - check enumerable'
      }
    ],
    hints: [
      'enumerable: false - hidden from Object.keys, for...in',
      'writable: false - cannot be reassigned',
      'configurable: false - cannot be deleted or reconfigured',
      'Object.getOwnPropertyDescriptors gets all descriptors'
    ]
  },
  {
    id: 'computed-property-names',
    title: 'Computed Property Names',
    difficulty: 'easy',
    category: 'Object Methods',
    description: `Use computed property names in object literals for dynamic keys.

**Challenge:** Create objects with dynamic property names.`,
    examples: [
      {
        input: `const key = 'name'; const obj = { [key]: 'John' };`,
        output: `{ name: 'John' }`,
        explanation: 'Computed property names use bracket notation'
      }
    ],
    starterCode: `// TODO: Create object with computed property names
function createConfig(env) {
  // Return object with properties: [env + 'ApiUrl'], [env + 'ApiKey']
  // Example: { devApiUrl: '...', devApiKey: '...' }
  return {};
}

// TODO: Create object from array of key-value pairs
function fromEntries(entries) {
  // Use computed property names to create object
  // fromEntries([['a', 1], ['b', 2]]) => { a: 1, b: 2 }
  return {};
}

// TODO: Merge objects with prefix
function mergeWithPrefix(obj1, obj2, prefix) {
  // Merge obj2 properties into obj1 with prefix
  // mergeWithPrefix({ a: 1 }, { b: 2 }, 'x') => { a: 1, xb: 2 }
  return {};
}

// Test
console.log(createConfig('prod')); // { prodApiUrl: '...', prodApiKey: '...' }
console.log(fromEntries([['name', 'John'], ['age', 30]]));
console.log(mergeWithPrefix({ a: 1 }, { b: 2, c: 3 }, 'prefix'));`,
    solution: `function createConfig(env) {
  return {
    [\`\${env}ApiUrl\`]: \`https://api.\${env}.com\`,
    [\`\${env}ApiKey\`]: \`key-\${env}\`
  };
}

function fromEntries(entries) {
  return entries.reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
}

function mergeWithPrefix(obj1, obj2, prefix) {
  return {
    ...obj1,
    ...Object.fromEntries(
      Object.entries(obj2).map(([key, value]) => [\`\${prefix}\${key}\`, value])
    )
  };
}`,
    testCases: [
      {
        input: ['prod'],
        expectedOutput: { prodApiUrl: 'https://api.prod.com', prodApiKey: 'key-prod' },
        description: 'createConfig'
      },
      {
        input: [[['a', 1], ['b', 2]]],
        expectedOutput: { a: 1, b: 2 },
        description: 'fromEntries'
      }
    ],
    hints: [
      'Use brackets in object literals: { [expression]: value }',
      'Can use template literals: { [`key${suffix}`]: value }',
      'Useful for dynamic property names based on variables'
    ]
  },
  {
    id: 'spread-operator-patterns',
    title: 'Advanced Spread Operator Patterns',
    difficulty: 'medium',
    category: 'Object Methods',
    description: `Use spread operator for cloning, merging, and transforming objects and arrays.

**Challenge:** Master spread operator for common patterns.`,
    examples: [
      {
        input: `const merged = { ...obj1, ...obj2 };`,
        output: `Merged object with later properties overriding`,
        explanation: 'Spread operator creates shallow copies'
      }
    ],
    starterCode: `// TODO: Deep clone an object (shallow clone with spread)
function shallowClone(obj) {
  // Use spread operator to clone object
  return obj;
}

// TODO: Merge objects with override
function mergeObjects(...objects) {
  // Merge all objects, later ones override earlier ones
  return {};
}

// TODO: Update nested property immutably
function updateNested(obj, path, value) {
  // Update nested property without mutating original
  // updateNested({ a: { b: 1 } }, 'a.b', 2) => { a: { b: 2 } }
  return obj;
}

// TODO: Remove property immutably
function omitProperty(obj, key) {
  // Return new object without the specified key
  // Use destructuring and rest
  return obj;
}

// Test
const original = { a: 1, b: { c: 2 } };
const cloned = shallowClone(original);
cloned.b.c = 3;
console.log(original.b.c); // Should still be 2 (shallow clone)

const merged = mergeObjects({ a: 1 }, { b: 2 }, { a: 3 });
console.log(merged); // { a: 3, b: 2 }

const updated = updateNested({ a: { b: 1 } }, 'a.b', 2);
console.log(updated); // { a: { b: 2 } }

const omitted = omitProperty({ a: 1, b: 2, c: 3 }, 'b');
console.log(omitted); // { a: 1, c: 3 }`,
    solution: `function shallowClone(obj) {
  return { ...obj };
}

function mergeObjects(...objects) {
  return objects.reduce((acc, obj) => ({ ...acc, ...obj }), {});
}

function updateNested(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((acc, key) => acc[key], obj);
  return {
    ...obj,
    [keys[0]]: keys.length > 1 
      ? updateNested(obj[keys[0]], keys.slice(1).join('.'), value)
      : { ...target, [lastKey]: value }
  };
}

function omitProperty(obj, key) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}`,
    testCases: [
      {
        input: [{ a: 1, b: 2 }],
        expectedOutput: { a: 1, b: 2 },
        description: 'shallowClone'
      },
      {
        input: [{ a: 1 }, { b: 2 }, { a: 3 }],
        expectedOutput: { a: 3, b: 2 },
        description: 'mergeObjects'
      },
      {
        input: [{ a: 1, b: 2, c: 3 }, 'b'],
        expectedOutput: { a: 1, c: 3 },
        description: 'omitProperty'
      }
    ],
    hints: [
      'Spread creates shallow copy: { ...obj }',
      'Later properties override: { ...obj1, ...obj2 }',
      'Use destructuring to omit: const { key, ...rest } = obj',
      'For deep updates, spread at each level'
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

