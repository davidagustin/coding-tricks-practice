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
  },
  {
    id: 'basic-types',
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
  { id: '123', name: 'Alice' },
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
    id: 'mapped-types',
    title: 'Mapped Types',
    difficulty: 'hard',
    category: 'Advanced TypeScript',
    description: `Mapped types create new types by transforming properties of existing types. They use the 'in' keyword to iterate over keys.

**Challenge:** Create mapped types to transform object types.`,
    examples: [
      {
        input: `type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};`,
        output: `Readonly version of type`,
        explanation: 'Mapped type makes all properties readonly'
      }
    ],
    starterCode: `// TODO: Create mapped types
// 1. Create a Partial type (makes all properties optional)
// 2. Create a Required type (makes all properties required)
// 3. Create a Pick type (selects specific properties)

type MyPartial<T> = {
  // Your code here
  // Use [P in keyof T]? to make all optional
};

type MyRequired<T> = {
  // Your code here
  // Remove optional modifier
};

type MyPick<T, K extends keyof T> = {
  // Your code here
  // Select only properties in K
};

interface User {
  id: number;
  name: string;
  email?: string;
}

// Test
type PartialUser = MyPartial<User>;
type RequiredUser = MyRequired<User>;
type UserName = MyPick<User, 'name' | 'email'>;`,
    solution: `type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface User {
  id: number;
  name: string;
  email?: string;
}

type PartialUser = MyPartial<User>;
type RequiredUser = MyRequired<User>;
type UserName = MyPick<User, 'name' | 'email'>;`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Mapped types work correctly'
      }
    ],
    hints: [
      'Syntax: [P in keyof T] iterates over all keys',
      'Use ? to add optional, -? to remove optional',
      'K extends keyof T constrains keys to valid properties'
    ]
  },
  {
    id: 'conditional-types',
    title: 'Conditional Types',
    difficulty: 'hard',
    category: 'Advanced TypeScript',
    description: `Conditional types select types based on conditions. They use the ternary operator syntax: T extends U ? X : Y.

**Challenge:** Create conditional types for type transformations.`,
    examples: [
      {
        input: `type NonNullable<T> = T extends null | undefined ? never : T;
type Flatten<T> = T extends Array<infer U> ? U : T;`,
        output: `Transformed types`,
        explanation: 'Conditional types transform based on conditions'
      }
    ],
    starterCode: `// TODO: Create conditional types
// 1. Create a type that extracts return type of a function
// 2. Create a type that checks if T is an array
// 3. Create a type that unwraps Promise

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type IsArray<T> = /* Your code here */;
// Should be: T extends Array<any> ? true : false

type UnwrapPromise<T> = /* Your code here */;
// Should unwrap Promise<T> to T

// Test
type Num = ReturnType<() => number>;
type CheckArray = IsArray<number[]>; // Should be true
type Unwrapped = UnwrapPromise<Promise<string>>; // Should be string`,
    solution: `type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type IsArray<T> = T extends Array<any> ? true : false;

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type Num = ReturnType<() => number>;
type CheckArray = IsArray<number[]>;
type Unwrapped = UnwrapPromise<Promise<string>>;`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Conditional types work correctly'
      }
    ],
    hints: [
      'Syntax: T extends U ? X : Y',
      'Use infer to extract types from conditions',
      'Conditional types distribute over unions'
    ]
  },
  {
    id: 'utility-types',
    title: 'Utility Types',
    difficulty: 'medium',
    category: 'Advanced TypeScript',
    description: `TypeScript provides built-in utility types: Partial, Required, Readonly, Pick, Omit, Record, etc.

**Challenge:** Use utility types to transform types effectively.`,
    examples: [
      {
        input: `type PartialUser = Partial<User>;
type UserKeys = Pick<User, 'name' | 'email'>;
type UserRecord = Record<'id' | 'name', string>;`,
        output: `Transformed types`,
        explanation: 'Utility types provide common transformations'
      }
    ],
    starterCode: `// TODO: Use utility types
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// 1. Make all properties optional
type PartialUser = /* Your code here */;

// 2. Pick only name and email
type UserContact = /* Your code here */;

// 3. Omit id and age
type UserPublic = /* Your code here */;

// 4. Create a record type
type UserMap = /* Your code here */;
// Should be: Record<string, User>

// Test
const partial: PartialUser = { name: 'Alice' };
const contact: UserContact = { name: 'Bob', email: 'bob@example.com' };
const publicUser: UserPublic = { name: 'Charlie', email: 'charlie@example.com' };`,
    solution: `interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type PartialUser = Partial<User>;
type UserContact = Pick<User, 'name' | 'email'>;
type UserPublic = Omit<User, 'id' | 'age'>;
type UserMap = Record<string, User>;

const partial: PartialUser = { name: 'Alice' };
const contact: UserContact = { name: 'Bob', email: 'bob@example.com' };
const publicUser: UserPublic = { name: 'Charlie', email: 'charlie@example.com' };`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Utility types work correctly'
      }
    ],
    hints: [
      'Partial<T> makes all properties optional',
      'Pick<T, K> selects specific properties',
      'Omit<T, K> removes specific properties',
      'Record<K, V> creates object type with keys K and values V'
    ]
  },
  {
    id: 'recursive-types',
    title: 'Recursive Types',
    difficulty: 'hard',
    category: 'Advanced TypeScript',
    description: `TypeScript supports recursive types for structures like trees, linked lists, and nested objects.

**Challenge:** Create recursive types for nested data structures.`,
    examples: [
      {
        input: `type TreeNode = {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
};`,
        output: `Recursive tree structure`,
        explanation: 'Type references itself'
      }
    ],
    starterCode: `// TODO: Create recursive types
// 1. Create a TreeNode type for binary trees
// 2. Create a NestedArray type
// 3. Create a JSON type

type TreeNode<T> = {
  // Your code here
  // Should have value, left?, right?
};

type NestedArray<T> = /* Your code here */;
// Should be: T | NestedArray<T>[]

type JSONValue = /* Your code here */;
// Should represent any JSON value (string | number | boolean | null | JSONObject | JSONArray)

type JSONObject = /* Your code here */;
type JSONArray = /* Your code here */;

// Test
const tree: TreeNode<number> = {
  value: 1,
  left: { value: 2 },
  right: { value: 3, left: { value: 4 } }
};`,
    solution: `type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

type NestedArray<T> = T | NestedArray<T>[];

type JSONValue = 
  | string 
  | number 
  | boolean 
  | null 
  | JSONObject 
  | JSONArray;

type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];

const tree: TreeNode<number> = {
  value: 1,
  left: { value: 2 },
  right: { value: 3, left: { value: 4 } }
};`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Recursive types work correctly'
      }
    ],
    hints: [
      'Types can reference themselves',
      'Use optional properties for recursive structures',
      'Union types can include recursive references'
    ]
  },
  {
    id: 'template-literal-types',
    title: 'Template Literal Types',
    difficulty: 'hard',
    category: 'Advanced TypeScript',
    description: `Template literal types create string types from combinations of other types. They're powerful for creating type-safe APIs.

**Challenge:** Create type-safe string patterns using template literals.`,
    examples: [
      {
        input: `type EventName<T> = \`on\${Capitalize<T>}\`;
type Route = \`/\${string}/\${string}\`;`,
        output: `Type-safe string patterns`,
        explanation: 'Template literals create string type patterns'
      }
    ],
    starterCode: `// TODO: Create template literal types
// 1. Create event handler names: onClick, onHover, etc.
// 2. Create API route types
// 3. Create CSS class names

type EventName<T extends string> = /* Your code here */;
// Should transform 'click' to 'onClick'

type ApiRoute<T extends string> = /* Your code here */;
// Should be: \`/api/\${T}\`

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonClass = /* Your code here */;
// Should be: \`btn-\${ButtonVariant}-\${ButtonSize}\`

// Test
const clickHandler: EventName<'click'> = 'onClick';
const userRoute: ApiRoute<'users'> = '/api/users';
const btnClass: ButtonClass = 'btn-primary-md';`,
    solution: `type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type ApiRoute<T extends string> = \`/api/\${T}\`;

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonClass = \`btn-\${ButtonVariant}-\${ButtonSize}\`;

const clickHandler: EventName<'click'> = 'onClick';
const userRoute: ApiRoute<'users'> = '/api/users';
const btnClass: ButtonClass = 'btn-primary-md';`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Template literal types work correctly'
      }
    ],
    hints: [
      'Use backticks for template literal types',
      'Capitalize, Uncapitalize, Uppercase, Lowercase are built-in',
      'Combine with union types for complex patterns'
    ]
  },
  {
    id: 'branded-types',
    title: 'Branded Types',
    difficulty: 'hard',
    category: 'Advanced TypeScript',
    description: `Branded types create distinct types from primitives to prevent mixing incompatible values (e.g., UserId vs ProductId).

**Challenge:** Create branded types for type safety.`,
    examples: [
      {
        input: `type UserId = string & { __brand: 'UserId' };
const userId = '123' as UserId;`,
        output: `Type-safe ID`,
        explanation: 'Branded type prevents mixing different ID types'
      }
    ],
    starterCode: `// TODO: Create branded types
// 1. Create UserId and ProductId branded types
// 2. Create helper functions to create branded values
// 3. Use branded types in functions

type UserId = /* Your code here */;
type ProductId = /* Your code here */;

function createUserId(id: string): UserId {
  // Your code here
}

function createProductId(id: string): ProductId {
  // Your code here
}

function getUserById(id: UserId) {
  return \`User \${id}\`;
}

// Test
const userId = createUserId('123');
const productId = createProductId('456');
getUserById(userId); // Should work
// getUserById(productId); // Should cause error`,
    solution: `type UserId = string & { __brand: 'UserId' };
type ProductId = string & { __brand: 'ProductId' };

function createUserId(id: string): UserId {
  return id as UserId;
}

function createProductId(id: string): ProductId {
  return id as ProductId;
}

function getUserById(id: UserId) {
  return \`User \${id}\`;
}

const userId = createUserId('123');
const productId = createProductId('456');
getUserById(userId);
// getUserById(productId); // Error: Argument of type 'ProductId' is not assignable to parameter of type 'UserId'`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Branded types work correctly'
      }
    ],
    hints: [
      'Use intersection with unique symbol or object',
      'Branded types prevent mixing similar primitive types',
      'Use type assertions to create branded values'
    ]
  },
  {
    id: 'type-inference',
    title: 'Advanced Type Inference',
    difficulty: 'hard',
    category: 'Advanced TypeScript',
    description: `TypeScript's type inference is powerful. Understand when types are inferred and how to guide inference.

**Challenge:** Master type inference with generics, constraints, and inference helpers.`,
    examples: [
      {
        input: `function identity<T>(arg: T): T {
  return arg;
}
const result = identity('hello'); // inferred as string`,
        output: `Inferred type`,
        explanation: 'TypeScript infers generic types from usage'
      }
    ],
    starterCode: `// TODO: Understand type inference
// 1. Create function with type inference
// 2. Use constraints to guide inference
// 3. Use inference in conditional types

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  // Your code here
}

// TODO: Create a function that infers return type from input
function createApiClient<T extends Record<string, any>>(config: T) {
  // Your code here
  // Should return type that includes config properties
  return {
    config,
    request: (url: string) => \`Requesting \${url}\`
  };
}

// Test
const obj = { name: 'Alice', age: 30 };
const name = getProperty(obj, 'name'); // Should infer as string

const client = createApiClient({ baseUrl: '/api', timeout: 5000 });
// client.config should have baseUrl and timeout`,
    solution: `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

function createApiClient<T extends Record<string, any>>(config: T) {
  return {
    config,
    request: (url: string) => \`Requesting \${url}\`
  };
}

const obj = { name: 'Alice', age: 30 };
const name = getProperty(obj, 'name');

const client = createApiClient({ baseUrl: '/api', timeout: 5000 });`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type inference works correctly'
      }
    ],
    hints: [
      'TypeScript infers types from function arguments',
      'Constraints (extends) guide inference',
      'Return types can be inferred from implementation'
    ]
  },
  {
    id: 'assertion-signatures',
    title: 'Assertion Signatures',
    difficulty: 'hard',
    category: 'Advanced TypeScript',
    description: `Assertion signatures allow functions to assert types. They're more powerful than type guards as they throw if assertion fails.

**Challenge:** Create assertion functions for runtime type checking.`,
    examples: [
      {
        input: `function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') throw new Error();
}`,
        output: `Type assertion`,
        explanation: 'Assertion function narrows type and throws if invalid'
      }
    ],
    starterCode: `// TODO: Create assertion functions
// 1. Create assertIsNumber
// 2. Create assertIsArray
// 3. Use assertions to narrow types

function assertIsNumber(value: unknown): /* Your code here */ {
  if (typeof value !== 'number') {
    throw new Error('Value is not a number');
  }
}

function assertIsArray<T>(value: unknown): /* Your code here */ {
  if (!Array.isArray(value)) {
    throw new Error('Value is not an array');
  }
}

// Test
function processValue(value: unknown) {
  assertIsNumber(value);
  // TypeScript should know value is number here
  return value * 2;
}

console.log(processValue(5)); // 10
// console.log(processValue('5')); // Should throw`,
    solution: `function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number') {
    throw new Error('Value is not a number');
  }
}

function assertIsArray<T>(value: unknown): asserts value is T[] {
  if (!Array.isArray(value)) {
    throw new Error('Value is not an array');
  }
}

function processValue(value: unknown) {
  assertIsNumber(value);
  return value * 2;
}

console.log(processValue(5));
// console.log(processValue('5')); // Throws error`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Assertion signatures work correctly'
      }
    ],
    hints: [
      'Syntax: asserts value is Type',
      'Assertion functions throw if assertion fails',
      'More powerful than type guards as they guarantee type'
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
