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
        description: 'EventName type - click'
      },
      {
        input: ['hover'],
        expectedOutput: 'onHover',
        description: 'EventName type - hover'
      },
      {
        input: ['submit'],
        expectedOutput: 'onSubmit',
        description: 'EventName type - submit'
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
