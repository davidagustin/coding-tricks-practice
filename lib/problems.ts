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
    id: 'destructuring-defaults',
    title: 'Destructuring with Defaults',
    difficulty: 'easy',
    category: 'JavaScript Basics',
    description: `Extract values from objects/arrays while providing fallbacks for missing data.

**Challenge:** Complete the function to safely extract user information with defaults.

**Key Concepts:**
- Basic object destructuring with default values
- Nested destructuring with defaults
- Array destructuring with defaults
- Renaming + default combined`,
    examples: [
      {
        input: `const user = { name: 'John' };
const response = { data: [1, 2, 3] };`,
        output: `name: 'John', email: 'anonymous@example.com', firstItem: 1`,
        explanation: 'Extract name, provide default email, and get first array item'
      }
    ],
    starterCode: `function extractUserInfo(user, response) {
  // TODO: Extract name with default 'Anonymous'
  // TODO: Extract email with default 'anonymous@example.com'
  // TODO: Extract data array with default []
  // TODO: Extract first item from data array with default 0
  
  return {
    name: user.name, // Fix this
    email: user.email, // Fix this
    firstItem: response.data[0] // Fix this
  };
}

// Test your solution
const user1 = { name: 'John' };
const response1 = { data: [1, 2, 3] };
console.log(extractUserInfo(user1, response1));

const user2 = {};
const response2 = {};
console.log(extractUserInfo(user2, response2));`,
    solution: `function extractUserInfo(user, response) {
  const { name = 'Anonymous' } = user ?? {};
  const { email = 'anonymous@example.com' } = user ?? {};
  const { data: users = [] } = response ?? {};
  const [firstItem = 0] = users;
  
  return {
    name,
    email,
    firstItem
  };
}`,
    testCases: [
      {
        input: [{ name: 'John' }, { data: [1, 2, 3] }],
        expectedOutput: { name: 'John', email: 'anonymous@example.com', firstItem: 1 }
      },
      {
        input: [{}, {}],
        expectedOutput: { name: 'Anonymous', email: 'anonymous@example.com', firstItem: 0 }
      },
      {
        input: [{ name: 'Jane', email: 'jane@example.com' }, { data: [10, 20] }],
        expectedOutput: { name: 'Jane', email: 'jane@example.com', firstItem: 10 }
      }
    ],
    hints: [
      'Use destructuring with default values: const { prop = defaultValue } = obj',
      'Handle null/undefined with nullish coalescing: obj ?? {}',
      'For arrays: const [first = defaultValue] = array'
    ]
  },
  {
    id: 'nullish-coalescing',
    title: 'Nullish Coalescing (??) vs Logical OR (||)',
    difficulty: 'easy',
    category: 'JavaScript Basics',
    description: `Understand the difference between ?? and ||. The ?? operator only falls back for null or undefined, while || falls back for any falsy value.

**Challenge:** Fix the function to correctly handle 0 and empty strings.`,
    examples: [
      {
        input: `const user = { count: 0, name: '' };`,
        output: `count: 0, name: ''`,
        explanation: '0 and empty string should be preserved, not replaced with defaults'
      }
    ],
    starterCode: `function getUserValues(user) {
  // TODO: Use ?? instead of || to preserve 0 and empty strings
  const count = user.count || 10; // Fix: 0 becomes 10 (wrong!)
  const name = user.name || 'Anonymous'; // Fix: '' becomes 'Anonymous' (wrong!)
  const email = user.email || 'no-email@placeholder.com';
  
  return { count, name, email };
}

// Test cases
console.log(getUserValues({ count: 0, name: '', email: null }));
console.log(getUserValues({ count: 5, name: 'John', email: 'john@example.com' }));`,
    solution: `function getUserValues(user) {
  const count = user.count ?? 10;
  const name = user.name ?? 'Anonymous';
  const email = user.email ?? 'no-email@placeholder.com';
  
  return { count, name, email };
}`,
    testCases: [
      {
        input: [{ count: 0, name: '', email: null }],
        expectedOutput: { count: 0, name: '', email: 'no-email@placeholder.com' }
      },
      {
        input: [{ count: 5, name: 'John', email: 'john@example.com' }],
        expectedOutput: { count: 5, name: 'John', email: 'john@example.com' }
      },
      {
        input: [{ count: undefined, name: undefined, email: undefined }],
        expectedOutput: { count: 10, name: 'Anonymous', email: 'no-email@placeholder.com' }
      }
    ],
    hints: [
      'Use ?? for nullish coalescing - only falls back for null/undefined',
      '|| falls back for any falsy value (0, "", false, null, undefined)',
      'Use ??= for nullish assignment: obj.prop ??= defaultValue'
    ]
  },
  {
    id: 'optional-chaining',
    title: 'Optional Chaining (?.)',
    difficulty: 'easy',
    category: 'JavaScript Basics',
    description: `Safely access deeply nested properties without explicit null checks.

**Challenge:** Extract nested values safely using optional chaining.`,
    examples: [
      {
        input: `const user = { profile: { displayName: 'John' } };
const user2 = null;`,
        output: `'John' and 'Anonymous'`,
        explanation: 'Safely access nested properties even when parent is null'
      }
    ],
    starterCode: `function getDisplayName(user) {
  // TODO: Use optional chaining to safely access nested properties
  // If user?.profile?.displayName exists, use it
  // Otherwise, fall back to user?.name
  // Otherwise, fall back to 'Anonymous'
  
  let displayName = 'Anonymous';
  if (user && user.profile && user.profile.displayName) {
    displayName = user.profile.displayName;
  } else if (user && user.name) {
    displayName = user.name;
  }
  
  return displayName;
}

console.log(getDisplayName({ profile: { displayName: 'John' } }));
console.log(getDisplayName(null));
console.log(getDisplayName({ name: 'Jane' }));`,
    solution: `function getDisplayName(user) {
  return user?.profile?.displayName ?? user?.name ?? 'Anonymous';
}`,
    testCases: [
      {
        input: [{ profile: { displayName: 'John' } }],
        expectedOutput: 'John'
      },
      {
        input: [null],
        expectedOutput: 'Anonymous'
      },
      {
        input: [{ name: 'Jane' }],
        expectedOutput: 'Jane'
      },
      {
        input: [{ profile: {} }],
        expectedOutput: 'Anonymous'
      }
    ],
    hints: [
      'Use ?. for optional chaining: obj?.prop?.nested',
      'Combine with ?? for fallbacks: obj?.prop ?? defaultValue',
      'Works with arrays: arr?.[0]?.name'
    ]
  },
  {
    id: 'flatmap-filter-map',
    title: 'flatMap as Filter + Map',
    difficulty: 'medium',
    category: 'Array Methods',
    description: `Use flatMap to simultaneously filter and transform in a single pass, which is more efficient than separate filter and map operations.

**Challenge:** Transform the filter+map pattern to use flatMap.`,
    examples: [
      {
        input: `const users = [
  { active: true, email: 'a@example.com' },
  { active: false, email: 'b@example.com' },
  { active: true, email: 'c@example.com' }
];`,
        output: `['a@example.com', 'c@example.com']`,
        explanation: 'Get emails of only active users in a single pass'
      }
    ],
    starterCode: `function getActiveUserEmails(users) {
  // TODO: Convert filter+map to flatMap
  // Traditional approach (two iterations)
  const results = users
    .filter(u => u.active)
    .map(u => u.email);
  
  return results;
}

// Convert to flatMap for better performance
function getActiveUserEmailsOptimized(users) {
  // Your code here using flatMap
  return [];
}

const users = [
  { active: true, email: 'a@example.com' },
  { active: false, email: 'b@example.com' },
  { active: true, email: 'c@example.com' }
];

console.log(getActiveUserEmails(users));
console.log(getActiveUserEmailsOptimized(users));`,
    solution: `function getActiveUserEmailsOptimized(users) {
  return users.flatMap(u => u.active ? [u.email] : []);
}`,
    testCases: [
      {
        input: [[
          { active: true, email: 'a@example.com' },
          { active: false, email: 'b@example.com' },
          { active: true, email: 'c@example.com' }
        ]],
        expectedOutput: ['a@example.com', 'c@example.com']
      },
      {
        input: [[
          { active: false, email: 'a@example.com' }
        ]],
        expectedOutput: []
      },
      {
        input: [[]],
        expectedOutput: []
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

// Test
const fastPromise = new Promise(resolve => setTimeout(() => resolve('Success'), 100));
const slowPromise = new Promise(resolve => setTimeout(() => resolve('Success'), 2000));

withTimeout(fastPromise, 500)
  .then(console.log)
  .catch(console.error);

withTimeout(slowPromise, 500)
  .then(console.log)
  .catch(console.error);`,
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

processMultipleRequests(requests).then(console.log);`,
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
      }
    ],
    hints: [
      'Promise.allSettled never rejects - all promises settle',
      'Results have status: "fulfilled" or "rejected"',
      'Use type guards for TypeScript: (r): r is Type => ...'
    ]
  },
  {
    id: 'template-literal-types',
    title: 'Template Literal Types',
    difficulty: 'hard',
    category: 'TypeScript Advanced',
    description: `Create string types from combinations of other types using template literals.

**Challenge:** Create type-safe event handler names and button classes.`,
    examples: [
      {
        input: `type EventName = EventName<'click'>`,
        output: `'onClick'`,
        explanation: 'Transform event names to handler names'
      }
    ],
    starterCode: `// TODO: Create a template literal type for event names
// EventName<'click'> should be 'onClick'
// EventName<'hover'> should be 'onHover'
type EventName<T extends string> = string; // Fix this

// TODO: Create button class type
// ButtonClass<'sm', 'red'> should be 'btn-sm-red'
type Size = 'sm' | 'md' | 'lg';
type Color = 'red' | 'blue';
type ButtonClass = string; // Fix this

// Test
const clickHandler: EventName<'click'> = 'onClick';
const btnClass: ButtonClass = 'btn-sm-red';`,
    solution: `type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type Size = 'sm' | 'md' | 'lg';
type Color = 'red' | 'blue';
type ButtonClass = \`btn-\${Size}-\${Color}\`;`,
    testCases: [
      {
        input: ['click'],
        expectedOutput: 'onClick',
        description: 'EventName type'
      }
    ],
    hints: [
      'Use template literal syntax: `on${Capitalize<T>}`',
      'Capitalize is a built-in string manipulation type',
      'Combine multiple types: `btn-${Size}-${Color}`'
    ]
  },
  {
    id: 'const-assertions',
    title: 'Const Assertions (as const)',
    difficulty: 'medium',
    category: 'TypeScript Advanced',
    description: `Create narrow literal types instead of widened types using 'as const'.

**Challenge:** Extract union types from const arrays and create enum-like patterns.`,
    examples: [
      {
        input: `const routes = ['home', 'profile'] as const;`,
        output: `type Route = 'home' | 'profile'`,
        explanation: 'Extract union type from const array'
      }
    ],
    starterCode: `// TODO: Use 'as const' to create narrow types
const routes = ['home', 'profile', 'settings'];
// Currently: string[]
// Should be: readonly ['home', 'profile', 'settings']

// TODO: Extract union type from routes
type Route = string; // Fix: should be 'home' | 'profile' | 'settings'

// TODO: Create enum-like pattern with as const
const Status = {
  Pending: 'pending',
  Active: 'active',
  Done: 'done'
};
// Fix: Add 'as const' and create Status type

type StatusType = string; // Fix: should be 'pending' | 'active' | 'done'

// Test
const route: Route = 'home';
const status: StatusType = 'pending';`,
    solution: `const routes = ['home', 'profile', 'settings'] as const;
type Route = typeof routes[number];

const Status = {
  Pending: 'pending',
  Active: 'active',
  Done: 'done'
} as const;
type StatusType = typeof Status[keyof typeof Status];`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type checking only'
      }
    ],
    hints: [
      "'as const' makes values readonly and narrows types",
      "Use typeof array[number] to extract union from array",
      "Use typeof obj[keyof typeof obj] to extract union from object"
    ]
  },
  {
    id: 'satisfies-operator',
    title: 'Satisfies Operator',
    difficulty: 'hard',
    category: 'TypeScript Advanced',
    description: `Type-check without widening the inferred type. Preserves narrow literal types while ensuring type safety.

**Challenge:** Use satisfies to preserve narrow types while type-checking.`,
    examples: [
      {
        input: `const config = { port: 3000 } satisfies Record<string, number>;`,
        output: `config.port is number (not string | number)`,
        explanation: 'Type is checked but narrow type is preserved'
      }
    ],
    starterCode: `// Problem: type annotation widens the type
const config: Record<string, string | number> = {
  port: 3000,
  host: 'localhost'
};
// config.port is string | number (lost narrow type!)

// TODO: Use 'satisfies' to preserve narrow type
const config2 = {
  port: 3000,
  host: 'localhost'
}; // Add satisfies here
// config2.port should be number (preserved!)

// Test
const port: number = config2.port;`,
    solution: `const config2 = {
  port: 3000,
  host: 'localhost'
} satisfies Record<string, string | number>;`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type checking only'
      }
    ],
    hints: [
      "'satisfies' checks type without widening",
      "Preserves literal types like 3000 instead of number",
      "Use when you need both type checking and narrow inference"
    ]
  },
  {
    id: 'exhaustive-switch',
    title: 'Exhaustive Switch with Never',
    difficulty: 'hard',
    category: 'TypeScript Advanced',
    description: `Ensure all cases are handled at compile time using the never type.

**Challenge:** Add exhaustive checking to switch statements.`,
    examples: [
      {
        input: `type Status = 'loading' | 'success' | 'error';`,
        output: `Compiler error if case is missing`,
        explanation: 'Never type catches missing cases'
      }
    ],
    starterCode: `type Status = 'loading' | 'success' | 'error';

function handleStatus(status: Status): string {
  switch (status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return 'Done!';
    // TODO: Add 'error' case and exhaustive check
    // In default, assign status to never type
    default:
      // Add exhaustive check here
      return 'Unknown';
  }
}

// Test - if you add 'timeout' to Status type, you should get a compiler error`,
    solution: `type Status = 'loading' | 'success' | 'error';

function handleStatus(status: Status): string {
  switch (status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return 'Done!';
    case 'error':
      return 'Failed';
    default:
      const _exhaustive: never = status;
      return _exhaustive;
  }
}`,
    testCases: [
      {
        input: ['loading'],
        expectedOutput: 'Loading...'
      },
      {
        input: ['success'],
        expectedOutput: 'Done!'
      },
      {
        input: ['error'],
        expectedOutput: 'Failed'
      }
    ],
    hints: [
      "If all cases handled, status in default has type 'never'",
      "If case missing, status still has that type → compiler error",
      "Use: const _exhaustive: never = status; in default"
    ]
  },
  {
    id: 'discriminated-unions',
    title: 'Discriminated Unions',
    difficulty: 'hard',
    category: 'TypeScript Advanced',
    description: `Union types with a common "tag" property for type narrowing.

**Challenge:** Create and use discriminated unions for type-safe API responses.`,
    examples: [
      {
        input: `type ApiResponse = { status: 'success', data: string } | { status: 'error', error: string };`,
        output: `TypeScript narrows based on status property`,
        explanation: 'Access data or error based on status'
      }
    ],
    starterCode: `// TODO: Create discriminated union type
type ApiResponse<T> = 
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function handle<T>(response: ApiResponse<T>) {
  // TODO: Use type narrowing based on status
  // If status === 'success', access response.data
  // If status === 'error', access response.error
  
  if (response.status === 'success') {
    // TypeScript should know response.data exists here
    return response.data; // Fix: response.data might not exist
  }
  
  if (response.status === 'error') {
    // TypeScript should know response.error exists here
    return response.error; // Fix: response.error might not exist
  }
  
  return 'Loading...';
}

// Test
const success: ApiResponse<string> = { status: 'success', data: 'Hello' };
const error: ApiResponse<string> = { status: 'error', error: 'Failed' };
console.log(handle(success));
console.log(handle(error));`,
    solution: `type ApiResponse<T> = 
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function handle<T>(response: ApiResponse<T>) {
  if (response.status === 'success') {
    return response.data;
  }
  
  if (response.status === 'error') {
    return response.error;
  }
  
  return 'Loading...';
}`,
    testCases: [
      {
        input: [{ status: 'success', data: 'Hello' }],
        expectedOutput: 'Hello'
      },
      {
        input: [{ status: 'error', error: 'Failed' }],
        expectedOutput: 'Failed'
      }
    ],
    hints: [
      "Common 'tag' property (like 'status') enables type narrowing",
      "TypeScript narrows union based on tag value",
      "Each variant can have different properties"
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
