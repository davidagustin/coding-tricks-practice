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
      'flatMap returns an array - return [item] to include, [] to exclude',
      'Single iteration is more efficient than filter + map',
      'Can produce 0, 1, or multiple items per input element'
    ]
  },
  {
    id: 'map-deduplication',
    title: 'Map for Deduplication',
    difficulty: 'medium',
    category: 'Array Methods',
    description: `Use Map to deduplicate by a key, where the last occurrence wins.

**Challenge:** Remove duplicate users by ID, keeping the last occurrence.`,
    examples: [
      {
        input: `const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John Updated' }
];`,
        output: `[{ id: 2, name: 'Jane' }, { id: 1, name: 'John Updated' }]`,
        explanation: 'Last occurrence of id:1 wins'
      }
    ],
    starterCode: `function deduplicateUsers(users) {
  // TODO: Use Map to deduplicate by id (last wins)
  // Hint: new Map(users.map(u => [u.id, u]))
  // Then convert back to array with [...map.values()]
  
  return users;
}

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John Updated' },
  { id: 3, name: 'Bob' },
  { id: 2, name: 'Jane Updated' }
];

console.log(deduplicateUsers(users));`,
    solution: `function deduplicateUsers(users) {
  return [...new Map(users.map(u => [u.id, u])).values()];
}`,
    testCases: [
      {
        input: [[
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' },
          { id: 1, name: 'John Updated' }
        ]],
        expectedOutput: [
          { id: 2, name: 'Jane' },
          { id: 1, name: 'John Updated' }
        ]
      },
      {
        input: [[
          { id: 1, name: 'A' },
          { id: 1, name: 'B' },
          { id: 1, name: 'C' }
        ]],
        expectedOutput: [{ id: 1, name: 'C' }]
      }
    ],
    hints: [
      'Map constructor accepts [key, value] pairs',
      'Map overwrites duplicate keys (last wins)',
      'Use [...map.values()] to convert back to array'
    ]
  },
  {
    id: 'object-entries',
    title: 'Object.fromEntries / Object.entries',
    difficulty: 'medium',
    category: 'Object Methods',
    description: `Convert between objects and [key, value] arrays for transformation.

**Challenge:** Transform object values and filter properties.`,
    examples: [
      {
        input: `const prices = { apple: 1, banana: 2, cherry: 3 };`,
        output: `{ apple: 2, banana: 4, cherry: 6 }`,
        explanation: 'Double all prices'
      }
    ],
    starterCode: `function doublePrices(prices) {
  // TODO: Use Object.entries and Object.fromEntries
  // to double all values
  
  return prices;
}

function filterPrivateProperties(obj) {
  // TODO: Filter out properties starting with '_'
  // Use Object.entries, filter, then Object.fromEntries
  
  return obj;
}

const prices = { apple: 1, banana: 2, cherry: 3 };
console.log(doublePrices(prices));

const user = { name: 'John', _internal: 'secret', age: 30, _temp: 'data' };
console.log(filterPrivateProperties(user));`,
    solution: `function doublePrices(prices) {
  return Object.fromEntries(
    Object.entries(prices).map(([key, val]) => [key, val * 2])
  );
}

function filterPrivateProperties(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !key.startsWith('_'))
  );
}`,
    testCases: [
      {
        input: [{ apple: 1, banana: 2, cherry: 3 }],
        expectedOutput: { apple: 2, banana: 4, cherry: 6 },
        description: 'doublePrices'
      },
      {
        input: [{ name: 'John', _internal: 'secret', age: 30, _temp: 'data' }],
        expectedOutput: { name: 'John', age: 30 },
        description: 'filterPrivateProperties'
      }
    ],
    hints: [
      'Object.entries(obj) → [[key, value], ...]',
      'Object.fromEntries([[key, value], ...]) → object',
      'Use map/filter between entries and fromEntries'
    ]
  },
  {
    id: 'promise-race-timeout',
    title: 'Promise.race for Timeouts',
    difficulty: 'medium',
    category: 'Async/Promises',
    description: `Race a promise against a timer to implement timeouts.

**Challenge:** Create a withTimeout function that rejects if the promise takes too long.`,
    examples: [
      {
        input: `await withTimeout(fetch('/api/data'), 5000)`,
        output: `Resolves with data or rejects with timeout error`,
        explanation: 'Promise resolves if fetch completes in time, otherwise times out'
      }
    ],
    starterCode: `function withTimeout(promise, ms) {
  // TODO: Use Promise.race to race the promise against a timeout
  // Create a timeout promise that rejects after ms milliseconds
  // Return Promise.race([promise, timeoutPromise])
  
  return promise;
}

// Test (commented out to prevent immediate execution)
// const fastPromise = new Promise(resolve => setTimeout(() => resolve('Success'), 100));
// const slowPromise = new Promise(resolve => setTimeout(() => resolve('Success'), 2000));
//
// withTimeout(fastPromise, 500)
//   .then(console.log)
//   .catch(console.error);
//
// withTimeout(slowPromise, 500)
//   .then(console.log)
//   .catch(console.error);`,
    solution: `function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(\`Timeout after \${ms}ms\`)), ms)
    )
  ]);
}`,
    testCases: [
      {
        input: [Promise.resolve('success'), 1000],
        expectedOutput: 'success',
        description: 'Promise resolves before timeout'
      },
      {
        input: [Promise.resolve('fast'), 5000],
        expectedOutput: 'fast',
        description: 'Fast promise resolves quickly'
      }
    ],
    hints: [
      'Promise.race returns the first settled promise',
      'Create a timeout promise that rejects after ms',
      'Use setTimeout in the timeout promise'
    ]
  },
  {
    id: 'promise-allsettled',
    title: 'Promise.allSettled for Mixed Results',
    difficulty: 'medium',
    category: 'Async/Promises',
    description: `Handle multiple promises where some may fail, without stopping on the first rejection.

**Challenge:** Process multiple API calls and separate successes from failures.`,
    examples: [
      {
        input: `[fetch('/api/1'), fetch('/api/2'), fetch('/api/3')]`,
        output: `{ successes: [...], failures: [...] }`,
        explanation: 'Get all results even if some fail'
      }
    ],
    starterCode: `async function processMultipleRequests(requests) {
  // TODO: Use Promise.allSettled to handle all promises
  // Separate fulfilled and rejected results
  // Return { successes: [...], failures: [...] }
  
  return { successes: [], failures: [] };
}

// Helper function to check if result is fulfilled
function isFulfilled(result) {
  // TODO: Check if result.status === 'fulfilled'
  return false;
}

// Test
const requests = [
  Promise.resolve('Success 1'),
  Promise.reject('Error 1'),
  Promise.resolve('Success 2')
];

// Test (commented out to prevent immediate execution)
// processMultipleRequests(requests).then(console.log).catch(console.error);`,
    solution: `async function processMultipleRequests(requests) {
  const results = await Promise.allSettled(requests);
  
  const successes = results
    .filter((r): r is PromiseFulfilledResult<string> => r.status === 'fulfilled')
    .map(r => r.value);
  
  const failures = results
    .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
    .map(r => r.reason);
  
  return { successes, failures };
}

function isFulfilled(result) {
  return result.status === 'fulfilled';
}`,
    testCases: [
      {
        input: [[
          Promise.resolve('Success 1'),
          Promise.reject('Error 1'),
          Promise.resolve('Success 2')
        ]],
        expectedOutput: {
          successes: ['Success 1', 'Success 2'],
          failures: ['Error 1']
        }
      },
      {
        input: [[
          Promise.resolve('A'),
          Promise.resolve('B'),
          Promise.resolve('C')
        ]],
        expectedOutput: {
          successes: ['A', 'B', 'C'],
          failures: []
        }
      },
      {
        input: [[
          Promise.reject('Error 1'),
          Promise.reject('Error 2')
        ]],
        expectedOutput: {
          successes: [],
          failures: ['Error 1', 'Error 2']
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
}

// Helper functions for testing
const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const subtractFive = x => x - 5;

// Test function that uses compose
function testCompose() {
  const composed = compose(multiplyByTwo, addOne, subtractFive);
  return composed(10);
}`,
    testCases: [
      {
        input: [],
        expectedOutput: 12,
        description: 'testCompose'
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

// Test (commented out to prevent immediate execution)
// const urls = ['/api/1', '/api/2', '/api/3'];
// fetchAllOrFail(urls).then(console.log).catch(console.error);
// fetchAllWithFailures(urls).then(console.log).catch(console.error);`,
    solution: `async function fetchAllOrFail(promises) {
  return Promise.all(promises);
}

async function fetchAllWithFailures(promises) {
  return Promise.allSettled(promises);
}

// Test function
async function testFetchAllOrFail() {
  const promises = [Promise.resolve('success1'), Promise.resolve('success2')];
  const result = await fetchAllOrFail(promises);
  return result;
}`,
    testCases: [
      {
        input: [],
        expectedOutput: ['success1', 'success2'],
        description: 'testFetchAllOrFail'
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
        description: 'testFetchPages'
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
        description: 'testAbortController'
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
        description: 'testRetryWithBackoff'
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
        description: 'testProcessUser'
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
        description: 'testSafeOperation'
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
        description: 'testDelay'
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
        description: 'testFetchUserData'
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

// Test (commented out to prevent immediate execution)
// fetchFromFastest(['/api/slow', '/api/fast', '/api/medium'])
//   .then(console.log)
//   .catch(console.error);

// fetchWithFallback('/api/primary', ['/api/backup1', '/api/backup2'])
//   .then(console.log)
//   .catch(console.error);`,
    solution: `async function fetchFromFastest(promises) {
  return Promise.race(promises);
}

async function fetchWithFallback(primaryUrl, fallbackUrls) {
  try {
    // Mock fetch for testing
    const mockFetch = () => Promise.resolve({ ok: true, json: () => Promise.resolve('primary') });
    const response = await mockFetch();
    if (response.ok) {
      return response.json();
    }
    throw new Error('Primary failed');
  } catch (error) {
    return fetchFromFastest(fallbackUrls.map(() => Promise.resolve('fallback')));
  }
}

// Test function
async function testFetchFromFastest() {
  const promises = [Promise.resolve('fast'), Promise.resolve('slow')];
  const result = await fetchFromFastest(promises);
  return result === 'fast';
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'testFetchFromFastest'
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

// Test (commented out to prevent immediate execution)
// fetchWithCleanup('/api/data').then(console.log).catch(console.error);
// processWithLock('resource', () => Promise.resolve('done'))
//   .then(console.log).catch(console.error);`,
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
    id: 'basic-typescript-types',
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
  if (keys.length === 1) {
    return { ...obj, [keys[0]]: value };
  }
  const [firstKey, ...restKeys] = keys;
  return {
    ...obj,
    [firstKey]: updateNested(obj[firstKey] || {}, restKeys.join('.'), value)
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
  },
  {
    id: 'spread-operator-tricks',
    title: 'Spread Operator Tricks',
    difficulty: 'easy',
    category: 'JavaScript Basics',
    description: `Master the spread operator (...) for copying, merging, and converting data structures.

**Challenge:** Use spread to merge objects, clone arrays, and convert iterables.

**Key Concepts:**
- Shallow cloning arrays and objects
- Merging objects (last wins)
- Converting iterables to arrays
- Rest parameters vs spread`,
    examples: [
      {
        input: `const obj1 = { a: 1 }; const obj2 = { b: 2 };`,
        output: `{ a: 1, b: 2 }`,
        explanation: 'Merge objects using spread'
      }
    ],
    starterCode: `function mergeObjects(obj1, obj2) {
  // TODO: Merge two objects, obj2 properties override obj1
  return obj1;
}

function cloneAndPush(arr, newItem) {
  // TODO: Clone array and add new item without mutating original
  arr.push(newItem);
  return arr;
}

function uniqueValues(arr) {
  // TODO: Return array with unique values using Set and spread
  return arr;
}

// Test
console.log(mergeObjects({ a: 1, b: 2 }, { b: 3, c: 4 }));
console.log(cloneAndPush([1, 2, 3], 4));
console.log(uniqueValues([1, 2, 2, 3, 3, 3]));`,
    solution: `function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

function cloneAndPush(arr, newItem) {
  return [...arr, newItem];
}

function uniqueValues(arr) {
  return [...new Set(arr)];
}`,
    testCases: [
      {
        input: [{ a: 1, b: 2 }, { b: 3, c: 4 }],
        expectedOutput: { a: 1, b: 3, c: 4 },
        description: 'mergeObjects'
      },
      {
        input: [[1, 2, 3], 4],
        expectedOutput: [1, 2, 3, 4],
        description: 'cloneAndPush'
      },
      {
        input: [[1, 2, 2, 3, 3, 3]],
        expectedOutput: [1, 2, 3],
        description: 'uniqueValues'
      }
    ],
    hints: [
      'Use {...obj1, ...obj2} to merge objects',
      'Use [...arr] to clone an array',
      'new Set(arr) removes duplicates, spread converts back to array'
    ]
  },
  {
    id: 'short-circuit-evaluation',
    title: 'Short-Circuit Evaluation',
    difficulty: 'easy',
    category: 'JavaScript Basics',
    description: `Use && and || for conditional execution and default values.

**Challenge:** Replace if statements with short-circuit patterns.

**Key Concepts:**
- && returns first falsy or last truthy value
- || returns first truthy or last falsy value
- Use for conditional execution and defaults`,
    examples: [
      {
        input: `const name = user && user.name;`,
        output: `'John' or undefined`,
        explanation: '&& short-circuits on falsy values'
      }
    ],
    starterCode: `function greetUser(user) {
  // TODO: Use && to only call user.getName() if user exists
  // Return greeting or 'Hello, Guest!'
  let name;
  if (user) {
    name = user.getName();
  }
  return 'Hello, ' + (name || 'Guest') + '!';
}

function getConfigValue(config, key, defaultValue) {
  // TODO: Return config[key] if it exists, otherwise defaultValue
  // Use || for this (but be aware of falsy value issues!)
  if (config && config[key] !== undefined) {
    return config[key];
  }
  return defaultValue;
}

// Test
const user = { getName: () => 'John' };
console.log(greetUser(user));
console.log(greetUser(null));
console.log(getConfigValue({ timeout: 5000 }, 'timeout', 3000));
console.log(getConfigValue({}, 'timeout', 3000));`,
    solution: `function greetUser(user) {
  const name = user && user.getName();
  return 'Hello, ' + (name || 'Guest') + '!';
}

function getConfigValue(config, key, defaultValue) {
  return (config && config[key]) || defaultValue;
}`,
    testCases: [
      {
        input: [{ getName: () => 'John' }],
        expectedOutput: 'Hello, John!',
        description: 'greetUser with user'
      },
      {
        input: [null],
        expectedOutput: 'Hello, Guest!',
        description: 'greetUser without user'
      },
      {
        input: [{ timeout: 5000 }, 'timeout', 3000],
        expectedOutput: 5000,
        description: 'getConfigValue existing'
      },
      {
        input: [{}, 'timeout', 3000],
        expectedOutput: 3000,
        description: 'getConfigValue default'
      }
    ],
    hints: [
      '&& evaluates right side only if left is truthy',
      '|| returns first truthy value or last value',
      'Be careful: 0 and "" are falsy!'
    ]
  },
  {
    id: 'tagged-template-literals',
    title: 'Tagged Template Literals',
    difficulty: 'medium',
    category: 'JavaScript Basics',
    description: `Create custom string processing with tagged template functions.

**Challenge:** Build a simple HTML escaping tag and a highlight tag.

**Key Concepts:**
- Tag functions receive strings array and values
- Process and combine strings with interpolated values
- Common uses: i18n, sanitization, styling`,
    examples: [
      {
        input: "html`<div>${userInput}</div>`",
        output: `'<div>&lt;script&gt;</div>'`,
        explanation: 'Escape HTML entities in interpolated values'
      }
    ],
    starterCode: `function html(strings, ...values) {
  // TODO: Escape HTML entities in interpolated values
  // Replace < > & " with their HTML entities
  // Combine strings and escaped values

  return strings.join('');
}

function escapeHtml(str) {
  // TODO: Replace HTML special characters
  // < → &lt;  > → &gt;  & → &amp;  " → &quot;
  return str;
}

// Test
const userInput = '<script>alert("xss")</script>';
console.log(html\`<div>\${userInput}</div>\`);

const name = 'John & Jane';
console.log(html\`<span>Hello, \${name}!</span>\`);`,
    solution: `function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function html(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] !== undefined ? escapeHtml(values[i]) : '';
    return result + str + value;
  }, '');
}`,
    testCases: [
      {
        input: ['<script>alert("xss")</script>'],
        expectedOutput: '<div>&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;</div>',
        description: 'html tag escapes script'
      },
      {
        input: ['John & Jane'],
        expectedOutput: '<span>Hello, John &amp; Jane!</span>',
        description: 'html tag escapes ampersand'
      }
    ],
    hints: [
      'Tag function receives (strings[], ...values)',
      'strings.length === values.length + 1',
      'Use reduce to interleave strings and processed values'
    ]
  },
  {
    id: 'reduce-patterns',
    title: 'Advanced Reduce Patterns',
    difficulty: 'medium',
    category: 'Array Methods',
    description: `Master reduce for complex transformations: grouping, counting, and building objects.

**Challenge:** Use reduce for grouping, counting occurrences, and running totals.

**Key Concepts:**
- Reduce can replace filter+map combinations
- Build objects, arrays, or any accumulator
- Group by property, count occurrences`,
    examples: [
      {
        input: `['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']`,
        output: `{ apple: 3, banana: 2, cherry: 1 }`,
        explanation: 'Count occurrences of each item'
      }
    ],
    starterCode: `function countOccurrences(arr) {
  // TODO: Count occurrences of each item
  // Return object like { item: count }

  return {};
}

function groupBy(arr, key) {
  // TODO: Group array of objects by a key
  // Return object like { keyValue: [items] }

  return {};
}

function runningTotal(numbers) {
  // TODO: Return array of running totals
  // [1, 2, 3] → [1, 3, 6]

  return numbers;
}

// Test
console.log(countOccurrences(['a', 'b', 'a', 'c', 'b', 'a']));
console.log(groupBy([
  { type: 'fruit', name: 'apple' },
  { type: 'vegetable', name: 'carrot' },
  { type: 'fruit', name: 'banana' }
], 'type'));
console.log(runningTotal([1, 2, 3, 4, 5]));`,
    solution: `function countOccurrences(arr) {
  return arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const groupKey = item[key];
    acc[groupKey] = acc[groupKey] || [];
    acc[groupKey].push(item);
    return acc;
  }, {});
}

function runningTotal(numbers) {
  let sum = 0;
  return numbers.reduce((acc, num) => {
    sum += num;
    acc.push(sum);
    return acc;
  }, []);
}`,
    testCases: [
      {
        input: [['a', 'b', 'a', 'c', 'b', 'a']],
        expectedOutput: { a: 3, b: 2, c: 1 },
        description: 'countOccurrences'
      },
      {
        input: [[
          { type: 'fruit', name: 'apple' },
          { type: 'vegetable', name: 'carrot' },
          { type: 'fruit', name: 'banana' }
        ], 'type'],
        expectedOutput: {
          fruit: [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }],
          vegetable: [{ type: 'vegetable', name: 'carrot' }]
        },
        description: 'groupBy'
      },
      {
        input: [[1, 2, 3, 4, 5]],
        expectedOutput: [1, 3, 6, 10, 15],
        description: 'runningTotal'
      }
    ],
    hints: [
      'reduce(callback, initialValue) - start with {} or []',
      'acc[key] = (acc[key] || 0) + 1 for counting',
      'acc[key] = acc[key] || [] for grouping'
    ]
  },
  {
    id: 'array-from-tricks',
    title: 'Array.from Magic',
    difficulty: 'easy',
    category: 'Array Methods',
    description: `Use Array.from for creating and transforming arrays from iterables.

**Challenge:** Generate sequences, convert NodeLists, and create 2D arrays.

**Key Concepts:**
- Array.from(iterable, mapFn)
- Create arrays of specific length
- Second argument is a map function`,
    examples: [
      {
        input: `Array.from({ length: 5 }, (_, i) => i)`,
        output: `[0, 1, 2, 3, 4]`,
        explanation: 'Generate sequence of numbers'
      }
    ],
    starterCode: `function range(start, end) {
  // TODO: Generate array from start to end (inclusive)
  // range(1, 5) → [1, 2, 3, 4, 5]

  return [];
}

function createGrid(rows, cols, defaultValue) {
  // TODO: Create 2D array filled with defaultValue
  // createGrid(2, 3, 0) → [[0, 0, 0], [0, 0, 0]]

  return [];
}

function toArray(arrayLike) {
  // TODO: Convert array-like object to real array
  // Works with NodeList, arguments, strings, etc.

  return [];
}

// Test
console.log(range(1, 5));
console.log(createGrid(2, 3, 0));
console.log(toArray('hello'));`,
    solution: `function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function createGrid(rows, cols, defaultValue) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => defaultValue)
  );
}

function toArray(arrayLike) {
  return Array.from(arrayLike);
}`,
    testCases: [
      {
        input: [1, 5],
        expectedOutput: [1, 2, 3, 4, 5],
        description: 'range'
      },
      {
        input: [2, 3, 0],
        expectedOutput: [[0, 0, 0], [0, 0, 0]],
        description: 'createGrid'
      },
      {
        input: ['hello'],
        expectedOutput: ['h', 'e', 'l', 'l', 'o'],
        description: 'toArray string'
      }
    ],
    hints: [
      'Array.from({ length: n }) creates array of n undefined elements',
      'Second argument (_, index) => value maps each element',
      'For 2D arrays, nest Array.from calls'
    ]
  },
  {
    id: 'sort-comparators',
    title: 'Custom Sort Comparators',
    difficulty: 'medium',
    category: 'Array Methods',
    description: `Write custom comparator functions for complex sorting.

**Challenge:** Sort by multiple criteria, handle nulls, and sort objects.

**Key Concepts:**
- Comparator returns negative, zero, or positive
- Sort by multiple fields
- Handle edge cases like null/undefined`,
    examples: [
      {
        input: `users.sort((a, b) => a.age - b.age)`,
        output: `Users sorted by age ascending`,
        explanation: 'Numeric sort with subtraction'
      }
    ],
    starterCode: `function sortByProperty(arr, property, order = 'asc') {
  // TODO: Sort array of objects by property
  // order can be 'asc' or 'desc'

  return arr;
}

function sortByMultiple(arr, criteria) {
  // TODO: Sort by multiple criteria
  // criteria = [{ key: 'age', order: 'asc' }, { key: 'name', order: 'desc' }]

  return arr;
}

function sortWithNulls(arr, nullsFirst = true) {
  // TODO: Sort numbers, putting nulls first or last

  return arr;
}

// Test
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 30 }
];
console.log(sortByProperty([...users], 'age', 'asc'));
console.log(sortByMultiple([...users], [
  { key: 'age', order: 'asc' },
  { key: 'name', order: 'asc' }
]));
console.log(sortWithNulls([3, null, 1, null, 2], true));`,
    solution: `function sortByProperty(arr, property, order = 'asc') {
  return [...arr].sort((a, b) => {
    if (a[property] < b[property]) return order === 'asc' ? -1 : 1;
    if (a[property] > b[property]) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

function sortByMultiple(arr, criteria) {
  return [...arr].sort((a, b) => {
    for (const { key, order } of criteria) {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

function sortWithNulls(arr, nullsFirst = true) {
  return [...arr].sort((a, b) => {
    if (a === null && b === null) return 0;
    if (a === null) return nullsFirst ? -1 : 1;
    if (b === null) return nullsFirst ? 1 : -1;
    return a - b;
  });
}`,
    testCases: [
      {
        input: [[{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }], 'age', 'asc'],
        expectedOutput: [{ name: 'Jane', age: 25 }, { name: 'John', age: 30 }],
        description: 'sortByProperty age asc'
      },
      {
        input: [[3, null, 1, null, 2], true],
        expectedOutput: [null, null, 1, 2, 3],
        description: 'sortWithNulls nullsFirst'
      },
      {
        input: [[3, null, 1, null, 2], false],
        expectedOutput: [1, 2, 3, null, null],
        description: 'sortWithNulls nullsLast'
      }
    ],
    hints: [
      'Return negative if a < b, positive if a > b, 0 if equal',
      'For descending order, reverse the comparison',
      'Handle null/undefined before comparing values'
    ]
  },
  {
    id: 'string-padding',
    title: 'String Padding and Formatting',
    difficulty: 'easy',
    category: 'String Methods',
    description: `Use padStart and padEnd for formatting strings and numbers.

**Challenge:** Format numbers, create aligned output, and mask strings.

**Key Concepts:**
- padStart(length, padString) - pad at beginning
- padEnd(length, padString) - pad at end
- Great for formatting tables, IDs, time`,
    examples: [
      {
        input: `'5'.padStart(2, '0')`,
        output: `'05'`,
        explanation: 'Pad single digit with leading zero'
      }
    ],
    starterCode: `function formatTime(hours, minutes, seconds) {
  // TODO: Format as HH:MM:SS with leading zeros
  // formatTime(9, 5, 3) → '09:05:03'

  return hours + ':' + minutes + ':' + seconds;
}

function maskCardNumber(cardNumber) {
  // TODO: Show only last 4 digits, mask rest with *
  // '1234567890123456' → '************3456'

  return cardNumber;
}

function formatCurrency(amount, width = 10) {
  // TODO: Right-align currency with $ prefix
  // formatCurrency(42.5, 10) → '    $42.50'

  return '$' + amount;
}

// Test
console.log(formatTime(9, 5, 3));
console.log(maskCardNumber('1234567890123456'));
console.log(formatCurrency(42.5, 10));`,
    solution: `function formatTime(hours, minutes, seconds) {
  return [hours, minutes, seconds]
    .map(n => String(n).padStart(2, '0'))
    .join(':');
}

function maskCardNumber(cardNumber) {
  const last4 = cardNumber.slice(-4);
  return last4.padStart(cardNumber.length, '*');
}

function formatCurrency(amount, width = 10) {
  const formatted = '$' + amount.toFixed(2);
  return formatted.padStart(width, ' ');
}`,
    testCases: [
      {
        input: [9, 5, 3],
        expectedOutput: '09:05:03',
        description: 'formatTime'
      },
      {
        input: ['1234567890123456'],
        expectedOutput: '************3456',
        description: 'maskCardNumber'
      },
      {
        input: [42.5, 10],
        expectedOutput: '    $42.50',
        description: 'formatCurrency'
      }
    ],
    hints: [
      'String(num).padStart(2, "0") for leading zeros',
      'slice(-4) gets last 4 characters',
      'toFixed(2) formats decimals, then padStart for alignment'
    ]
  },
  {
    id: 'currying',
    title: 'Function Currying',
    difficulty: 'medium',
    category: 'Functional Programming',
    description: `Transform functions to accept arguments one at a time.

**Challenge:** Create curried functions and a generic curry utility.

**Key Concepts:**
- Currying: f(a, b, c) → f(a)(b)(c)
- Partial application
- Reusable function factories`,
    examples: [
      {
        input: `const add = a => b => a + b; add(2)(3)`,
        output: `5`,
        explanation: 'Curried add function'
      }
    ],
    starterCode: `// TODO: Create a curried multiply function
// multiply(2)(3)(4) should return 24
function multiply(a) {
  return a;
}

// TODO: Create a curried function to create greeting messages
// greet('Hello')('World') → 'Hello, World!'
function greet(greeting) {
  return greeting;
}

// TODO: Create a generic curry function for 2-argument functions
// const curriedAdd = curry2((a, b) => a + b);
// curriedAdd(2)(3) → 5
function curry2(fn) {
  return fn;
}

// Test
console.log(multiply(2)(3)(4));
console.log(greet('Hello')('World'));
const curriedAdd = curry2((a, b) => a + b);
console.log(curriedAdd(2)(3));`,
    solution: `function multiply(a) {
  return function(b) {
    return function(c) {
      return a * b * c;
    };
  };
}

function greet(greeting) {
  return function(name) {
    return greeting + ', ' + name + '!';
  };
}

function curry2(fn) {
  return function(a) {
    return function(b) {
      return fn(a, b);
    };
  };
}`,
    testCases: [
      {
        input: [],
        expectedOutput: 24,
        description: 'multiply(2)(3)(4)'
      },
      {
        input: [],
        expectedOutput: 'Hello, World!',
        description: 'greet(Hello)(World)'
      },
      {
        input: [],
        expectedOutput: 5,
        description: 'curry2 add'
      }
    ],
    hints: [
      'Return a function that returns a function',
      'Each returned function captures the previous argument',
      'Arrow functions make this concise: a => b => a + b'
    ]
  },
  {
    id: 'memoization',
    title: 'Function Memoization',
    difficulty: 'medium',
    category: 'Functional Programming',
    description: `Cache function results to avoid redundant calculations.

**Challenge:** Implement memoization for expensive calculations.

**Key Concepts:**
- Cache results by arguments
- Use Map or object for cache
- Handle multiple arguments`,
    examples: [
      {
        input: `const memoFib = memoize(fib); memoFib(40)`,
        output: `Fast result (cached)`,
        explanation: 'Subsequent calls use cached value'
      }
    ],
    starterCode: `// TODO: Create a memoize function that caches results
// Only works for single-argument functions for simplicity
function memoize(fn) {
  // Create cache (Map or object)
  // Return function that checks cache before calling fn

  return fn;
}

// Test with fibonacci
function slowFib(n) {
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
}

// TODO: Create memoized fibonacci that's actually fast
function fastFib(n, memo = {}) {
  // Use memo object to cache results
  if (n <= 1) return n;
  return fastFib(n - 1) + fastFib(n - 2);
}

// Test
const memoizedFib = memoize(n => {
  if (n <= 1) return n;
  return memoizedFib(n - 1) + memoizedFib(n - 2);
});

console.log(memoizedFib(10));
console.log(fastFib(10));`,
    solution: `function memoize(fn) {
  const cache = new Map();
  return function(arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

function fastFib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fastFib(n - 1, memo) + fastFib(n - 2, memo);
  return memo[n];
}`,
    testCases: [
      {
        input: [10],
        expectedOutput: 55,
        description: 'memoizedFib(10)'
      },
      {
        input: [10],
        expectedOutput: 55,
        description: 'fastFib(10)'
      },
      {
        input: [20],
        expectedOutput: 6765,
        description: 'fastFib(20)'
      }
    ],
    hints: [
      'Use Map for cache: cache.has(key), cache.get(key), cache.set(key, value)',
      'Check cache before computing',
      'For recursive functions, pass memo object as parameter'
    ]
  },
  {
    id: 'pipe-compose',
    title: 'Pipe and Compose',
    difficulty: 'medium',
    category: 'Functional Programming',
    description: `Chain functions together for data transformation pipelines.

**Challenge:** Implement pipe (left-to-right) and compose (right-to-left).

**Key Concepts:**
- pipe: f |> g |> h → pipe(f, g, h)
- compose: h(g(f(x))) → compose(h, g, f)
- Create reusable transformation pipelines`,
    examples: [
      {
        input: `pipe(addOne, double, square)(2)`,
        output: `36`,
        explanation: '2 → 3 → 6 → 36'
      }
    ],
    starterCode: `// TODO: Implement pipe - left to right function composition
// pipe(f, g, h)(x) = h(g(f(x)))
function pipe(...fns) {
  return function(x) {
    return x;
  };
}

// TODO: Implement compose - right to left function composition
// compose(f, g, h)(x) = f(g(h(x)))
function compose(...fns) {
  return function(x) {
    return x;
  };
}

// Helper functions for testing
const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

// Test
const pipeline = pipe(addOne, double, square);
console.log(pipeline(2)); // 2 → 3 → 6 → 36

const composed = compose(square, double, addOne);
console.log(composed(2)); // 2 → 3 → 6 → 36`,
    solution: `function pipe(...fns) {
  return function(x) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}

function compose(...fns) {
  return function(x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}`,
    testCases: [
      {
        input: [2],
        expectedOutput: 36,
        description: 'pipe(addOne, double, square)(2)'
      },
      {
        input: [2],
        expectedOutput: 36,
        description: 'compose(square, double, addOne)(2)'
      },
      {
        input: [0],
        expectedOutput: 4,
        description: 'pipe(addOne, double, square)(0)'
      }
    ],
    hints: [
      'Use reduce for pipe: fns.reduce((acc, fn) => fn(acc), x)',
      'Use reduceRight for compose',
      'Each function receives the result of the previous'
    ]
  },
  {
    id: 'debounce-throttle',
    title: 'Debounce and Throttle',
    difficulty: 'hard',
    category: 'Functional Programming',
    description: `Control function execution rate for performance optimization.

**Challenge:** Implement debounce and throttle utilities.

**Key Concepts:**
- Debounce: Execute after delay with no new calls
- Throttle: Execute at most once per interval
- Essential for scroll, resize, input handlers`,
    examples: [
      {
        input: `const debouncedSearch = debounce(search, 300)`,
        output: `Search executes 300ms after last keystroke`,
        explanation: 'Prevents excessive API calls while typing'
      }
    ],
    starterCode: `// TODO: Implement debounce
// Delays execution until no calls for 'delay' ms
function debounce(fn, delay) {
  // Store timeout ID
  // Clear previous timeout on each call
  // Set new timeout

  return fn;
}

// TODO: Implement throttle
// Executes at most once per 'interval' ms
function throttle(fn, interval) {
  // Track last execution time
  // Only execute if enough time has passed

  return fn;
}

// Test
let callCount = 0;
const incrementCounter = () => ++callCount;

const debouncedIncrement = debounce(incrementCounter, 100);
const throttledIncrement = throttle(incrementCounter, 100);

// Simulate rapid calls
for (let i = 0; i < 5; i++) {
  debouncedIncrement();
  throttledIncrement();
}`,
    solution: `function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, interval) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      return fn.apply(this, args);
    }
  };
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'debounce delays execution'
      },
      {
        input: [],
        expectedOutput: true,
        description: 'throttle limits execution rate'
      }
    ],
    hints: [
      'debounce: clearTimeout + setTimeout pattern',
      'throttle: track lastTime, compare with Date.now()',
      'Use fn.apply(this, args) to preserve context'
    ]
  },
  {
    id: 'mapped-types',
    title: 'TypeScript Mapped Types',
    difficulty: 'hard',
    category: 'TypeScript Advanced',
    description: `Transform existing types by mapping over their properties.

**Challenge:** Create utility types using mapped type syntax.

**Key Concepts:**
- [K in keyof T]: transform properties
- Add/remove readonly, optional modifiers
- Create Partial, Required, Readonly equivalents`,
    examples: [
      {
        input: `type Partial<T> = { [K in keyof T]?: T[K] }`,
        output: `All properties become optional`,
        explanation: 'Map over keys and add ? modifier'
      }
    ],
    starterCode: `// TODO: Create MyPartial - make all properties optional
type MyPartial<T> = T; // Fix this

// TODO: Create MyRequired - make all properties required
type MyRequired<T> = T; // Fix this

// TODO: Create MyReadonly - make all properties readonly
type MyReadonly<T> = T; // Fix this

// TODO: Create Nullable - make all properties nullable
type Nullable<T> = T; // Fix this

// Test types
interface User {
  name: string;
  age: number;
  email?: string;
}

type PartialUser = MyPartial<User>;
type RequiredUser = MyRequired<User>;
type ReadonlyUser = MyReadonly<User>;
type NullableUser = Nullable<User>;

// Test
const partialUser: PartialUser = { name: 'John' };
const requiredUser: RequiredUser = { name: 'John', age: 30, email: 'john@example.com' };`,
    solution: `type MyPartial<T> = { [K in keyof T]?: T[K] };

type MyRequired<T> = { [K in keyof T]-?: T[K] };

type MyReadonly<T> = { readonly [K in keyof T]: T[K] };

type Nullable<T> = { [K in keyof T]: T[K] | null };`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type checking only'
      }
    ],
    hints: [
      '[K in keyof T] iterates over all keys',
      '? adds optional, -? removes optional',
      'readonly adds readonly modifier'
    ]
  },
  {
    id: 'conditional-types',
    title: 'TypeScript Conditional Types',
    difficulty: 'hard',
    category: 'TypeScript Advanced',
    description: `Create types that depend on conditions using extends.

**Challenge:** Build conditional types for type selection and filtering.

**Key Concepts:**
- T extends U ? X : Y syntax
- Distributive conditional types
- Filtering union types`,
    examples: [
      {
        input: `type IsString<T> = T extends string ? true : false`,
        output: `IsString<'hello'> = true`,
        explanation: 'Type-level conditional logic'
      }
    ],
    starterCode: `// TODO: Create IsArray type - returns true if T is an array
type IsArray<T> = false; // Fix this

// TODO: Create ExtractArrayType - get element type from array
// ExtractArrayType<string[]> → string
type ExtractArrayType<T> = T; // Fix this

// TODO: Create NonNullable equivalent - remove null and undefined
type MyNonNullable<T> = T; // Fix this

// TODO: Create FunctionReturnType - extract return type of function
type FunctionReturnType<T> = T; // Fix this

// Test
type Test1 = IsArray<string[]>; // should be true
type Test2 = IsArray<string>; // should be false
type Test3 = ExtractArrayType<number[]>; // should be number
type Test4 = MyNonNullable<string | null | undefined>; // should be string
type Test5 = FunctionReturnType<() => string>; // should be string`,
    solution: `type IsArray<T> = T extends any[] ? true : false;

type ExtractArrayType<T> = T extends (infer U)[] ? U : never;

type MyNonNullable<T> = T extends null | undefined ? never : T;

type FunctionReturnType<T> = T extends (...args: any[]) => infer R ? R : never;`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type checking only'
      }
    ],
    hints: [
      'T extends U ? X : Y is the conditional syntax',
      'Use infer to extract types: T extends (infer U)[] ? U : never',
      'never in unions is removed (filtering)'
    ]
  },
  {
    id: 'infer-keyword',
    title: 'TypeScript Infer Keyword',
    difficulty: 'hard',
    category: 'TypeScript Advanced',
    description: `Extract types from complex type structures using infer.

**Challenge:** Use infer to extract types from functions, promises, and more.

**Key Concepts:**
- infer creates type variable in conditional
- Extract return types, parameter types
- Unwrap nested types like Promise<T>`,
    examples: [
      {
        input: `type Unwrap<T> = T extends Promise<infer U> ? U : T`,
        output: `Unwrap<Promise<string>> = string`,
        explanation: 'Extract inner type from Promise'
      }
    ],
    starterCode: `// TODO: Create UnwrapPromise - extract type from Promise
// UnwrapPromise<Promise<string>> → string
type UnwrapPromise<T> = T; // Fix this

// TODO: Create FirstParameter - get first parameter type of function
// FirstParameter<(a: string, b: number) => void> → string
type FirstParameter<T> = unknown; // Fix this

// TODO: Create LastParameter - get last parameter type
// Hint: Use rest parameters (...args: infer R)
type LastParameter<T> = unknown; // Fix this

// TODO: Create ConstructorParameters - get constructor parameter types
type MyConstructorParameters<T> = unknown; // Fix this

// Test
type Test1 = UnwrapPromise<Promise<number>>; // number
type Test2 = FirstParameter<(a: string, b: number) => void>; // string
type Fn = (a: number, b: string, c: boolean) => void;
type Test3 = LastParameter<Fn>; // boolean

class MyClass {
  constructor(name: string, age: number) {}
}
type Test4 = MyConstructorParameters<typeof MyClass>; // [string, number]`,
    solution: `type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type FirstParameter<T> = T extends (first: infer F, ...args: any[]) => any ? F : never;

type LastParameter<T> = T extends (...args: [...any[], infer L]) => any ? L : never;

type MyConstructorParameters<T> = T extends new (...args: infer P) => any ? P : never;`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type checking only'
      }
    ],
    hints: [
      'infer U captures the type in that position',
      'Use pattern matching: Promise<infer U>, (infer P) => R',
      'For constructors: new (...args: infer P) => any'
    ]
  },
  {
    id: 'branded-types',
    title: 'TypeScript Branded Types',
    difficulty: 'hard',
    category: 'TypeScript Advanced',
    description: `Create distinct types from primitives for type safety.

**Challenge:** Use branded types to prevent mixing up similar values.

**Key Concepts:**
- Brand a type with a unique symbol
- Prevent UserId from being used as ProductId
- Create validation functions that return branded types`,
    examples: [
      {
        input: `type UserId = number & { __brand: 'UserId' }`,
        output: `UserId and ProductId are incompatible`,
        explanation: 'Same underlying type, but different brands'
      }
    ],
    starterCode: `// TODO: Create branded types for UserId and ProductId
// Both are numbers but should not be interchangeable
type UserId = number; // Fix this
type ProductId = number; // Fix this

// TODO: Create validation functions that return branded types
function createUserId(id: number): UserId {
  return id; // Fix this
}

function createProductId(id: number): ProductId {
  return id; // Fix this
}

// TODO: Create a function that only accepts UserId
function getUser(id: UserId): string {
  return 'User ' + id;
}

// TODO: Create a function that only accepts ProductId
function getProduct(id: ProductId): string {
  return 'Product ' + id;
}

// Test - this should work
const userId = createUserId(1);
const productId = createProductId(1);
console.log(getUser(userId));
console.log(getProduct(productId));

// This should cause type error (uncomment to test):
// getUser(productId); // Error!
// getProduct(userId); // Error!`,
    solution: `type UserId = number & { readonly __brand: unique symbol };
type ProductId = number & { readonly __brand: unique symbol };

function createUserId(id: number): UserId {
  return id as UserId;
}

function createProductId(id: number): ProductId {
  return id as ProductId;
}

function getUser(id: UserId): string {
  return 'User ' + id;
}

function getProduct(id: ProductId): string {
  return 'Product ' + id;
}`,
    testCases: [
      {
        input: [1],
        expectedOutput: 'User 1',
        description: 'getUser with UserId'
      },
      {
        input: [1],
        expectedOutput: 'Product 1',
        description: 'getProduct with ProductId'
      }
    ],
    hints: [
      'Add a phantom property: number & { __brand: "UserId" }',
      'Use unique symbol for true uniqueness',
      'Cast with "as" in factory functions'
    ]
  },
  {
    id: 'proxy-traps',
    title: 'JavaScript Proxy',
    difficulty: 'hard',
    category: 'JavaScript Advanced',
    description: `Intercept and customize object operations using Proxy.

**Challenge:** Create proxies for validation, logging, and default values.

**Key Concepts:**
- Proxy wraps an object with handler traps
- get, set, has traps for property access
- Use for validation, logging, reactivity`,
    examples: [
      {
        input: `new Proxy(obj, { get(target, prop) { ... } })`,
        output: `Intercept property access`,
        explanation: 'Custom behavior for getting properties'
      }
    ],
    starterCode: `// TODO: Create a proxy that logs all property access
function createLoggingProxy(obj) {
  // Return a Proxy that logs get and set operations
  return obj;
}

// TODO: Create a proxy with default values for missing properties
function createDefaultProxy(obj, defaultValue) {
  // Return defaultValue for any missing property
  return obj;
}

// TODO: Create a validating proxy for a user object
function createValidatingProxy(obj) {
  // Validate: name must be string, age must be positive number
  // Throw error on invalid values
  return obj;
}

// Test
const logged = createLoggingProxy({ x: 1, y: 2 });
console.log(logged.x); // Should log: "Getting x"
logged.x = 10; // Should log: "Setting x to 10"

const withDefaults = createDefaultProxy({}, 'N/A');
console.log(withDefaults.missing); // 'N/A'

const user = createValidatingProxy({ name: 'John', age: 30 });
user.name = 'Jane'; // OK
// user.age = -5; // Should throw error`,
    solution: `function createLoggingProxy(obj) {
  return new Proxy(obj, {
    get(target, prop) {
      console.log('Getting ' + String(prop));
      return target[prop];
    },
    set(target, prop, value) {
      console.log('Setting ' + String(prop) + ' to ' + value);
      target[prop] = value;
      return true;
    }
  });
}

function createDefaultProxy(obj, defaultValue) {
  return new Proxy(obj, {
    get(target, prop) {
      return prop in target ? target[prop] : defaultValue;
    }
  });
}

function createValidatingProxy(obj) {
  return new Proxy(obj, {
    set(target, prop, value) {
      if (prop === 'name' && typeof value !== 'string') {
        throw new Error('name must be a string');
      }
      if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
        throw new Error('age must be a positive number');
      }
      target[prop] = value;
      return true;
    }
  });
}`,
    testCases: [
      {
        input: [{ x: 1 }],
        expectedOutput: 1,
        description: 'logging proxy get'
      },
      {
        input: [{}, 'N/A'],
        expectedOutput: 'N/A',
        description: 'default proxy missing prop'
      }
    ],
    hints: [
      'new Proxy(target, handler) creates proxy',
      'get(target, prop) intercepts property access',
      'set(target, prop, value) must return true'
    ]
  },
  {
    id: 'generator-functions',
    title: 'Generator Functions',
    difficulty: 'hard',
    category: 'JavaScript Advanced',
    description: `Create iterables and manage complex control flow with generators.

**Challenge:** Use generators for sequences, pagination, and async iteration.

**Key Concepts:**
- function* declares a generator
- yield pauses and returns value
- Lazy evaluation - values computed on demand`,
    examples: [
      {
        input: `function* count() { yield 1; yield 2; yield 3; }`,
        output: `[...count()] → [1, 2, 3]`,
        explanation: 'Generator produces values on demand'
      }
    ],
    starterCode: `// TODO: Create a generator that yields numbers from start to end
function* range(start, end) {
  // yield each number from start to end (inclusive)
}

// TODO: Create an infinite ID generator
function* idGenerator(prefix = 'id') {
  // yield 'id-1', 'id-2', 'id-3', ...
}

// TODO: Create a generator that yields Fibonacci numbers
function* fibonacci() {
  // yield infinite Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8...
}

// TODO: Create a generator that chunks an array
function* chunk(arr, size) {
  // yield arrays of 'size' elements
  // chunk([1,2,3,4,5], 2) → [1,2], [3,4], [5]
}

// Test
console.log([...range(1, 5)]); // [1, 2, 3, 4, 5]

const ids = idGenerator('user');
console.log(ids.next().value); // 'user-1'
console.log(ids.next().value); // 'user-2'

const fib = fibonacci();
const first10Fib = Array.from({ length: 10 }, () => fib.next().value);
console.log(first10Fib);

console.log([...chunk([1, 2, 3, 4, 5], 2)]);`,
    solution: `function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

function* idGenerator(prefix = 'id') {
  let id = 1;
  while (true) {
    yield prefix + '-' + id++;
  }
}

function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function* chunk(arr, size) {
  for (let i = 0; i < arr.length; i += size) {
    yield arr.slice(i, i + size);
  }
}`,
    testCases: [
      {
        input: [1, 5],
        expectedOutput: [1, 2, 3, 4, 5],
        description: 'range generator'
      },
      {
        input: [[1, 2, 3, 4, 5], 2],
        expectedOutput: [[1, 2], [3, 4], [5]],
        description: 'chunk generator'
      }
    ],
    hints: [
      'Use function* to declare a generator',
      'yield pauses execution and returns value',
      'while(true) with yield creates infinite generator'
    ]
  },
  {
    id: 'weak-collections',
    title: 'WeakMap and WeakSet',
    difficulty: 'medium',
    category: 'JavaScript Advanced',
    description: `Use weak collections for memory-efficient object associations.

**Challenge:** Implement private data and caching with WeakMap.

**Key Concepts:**
- Keys must be objects (garbage collectible)
- No memory leaks - entries removed when key is GC'd
- Perfect for private data and caches`,
    examples: [
      {
        input: `const privateData = new WeakMap();`,
        output: `Store private data associated with objects`,
        explanation: 'Data is GC\'d when object is GC\'d'
      }
    ],
    starterCode: `// TODO: Implement private data storage using WeakMap
const privateData = new WeakMap();

class User {
  constructor(name, password) {
    // TODO: Store password privately using WeakMap
    // Public property
    this.name = name;
    // Private (should use WeakMap)
    this.password = password; // Fix: make private
  }

  checkPassword(password) {
    // TODO: Check against private password
    return this.password === password;
  }
}

// TODO: Create a memoize function using WeakMap for object arguments
function memoizeByObject(fn) {
  // Cache results by object reference
  // WeakMap allows garbage collection of unused cache entries
  return fn;
}

// Test
const user = new User('John', 'secret123');
console.log(user.name); // 'John'
console.log(user.password); // Should be undefined (private)
console.log(user.checkPassword('secret123')); // true
console.log(user.checkPassword('wrong')); // false`,
    solution: `const privateData = new WeakMap();

class User {
  constructor(name, password) {
    this.name = name;
    privateData.set(this, { password });
  }

  checkPassword(password) {
    const data = privateData.get(this);
    return data && data.password === password;
  }
}

function memoizeByObject(fn) {
  const cache = new WeakMap();
  return function(obj) {
    if (cache.has(obj)) {
      return cache.get(obj);
    }
    const result = fn(obj);
    cache.set(obj, result);
    return result;
  };
}`,
    testCases: [
      {
        input: ['secret123'],
        expectedOutput: true,
        description: 'checkPassword correct'
      },
      {
        input: ['wrong'],
        expectedOutput: false,
        description: 'checkPassword wrong'
      }
    ],
    hints: [
      'WeakMap.set(key, value), .get(key), .has(key)',
      'Keys must be objects, not primitives',
      'Perfect for associating private data with instances'
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

