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
