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
    id: 'promise-allsettled',
    title: 'Promise.allSettled for Mixed Results',
    difficulty: 'medium',
    category: 'Async/Promises',
    description: `## In-Depth Explanation

\`Promise.allSettled()\` is a method that waits for all promises to settle (either fulfill or reject) and returns an array of result objects. Unlike \`Promise.all()\`, which rejects immediately on the first failure, \`allSettled()\` waits for all promises to complete regardless of individual outcomes.

Each result object has a \`status\` property that is either \`'fulfilled'\` or \`'rejected'\`. For fulfilled promises, the result includes a \`value\` property. For rejected promises, it includes a \`reason\` property. This structure allows you to process all results and handle successes and failures separately.

This is particularly useful when you need partial results - you want to know what succeeded and what failed, rather than failing entirely if any single operation fails.

## Importance

\`Promise.allSettled()\` is crucial for resilient applications because:

- **Partial Success Handling**: Allows processing successful results even when some operations fail
- **Error Isolation**: Failures in one operation don't prevent others from completing
- **Better UX**: Users see partial results rather than complete failure
- **Data Collection**: Essential when you need to gather results from multiple sources
- **Batch Operations**: Perfect for batch processing where individual failures are acceptable
- **Resilient Systems**: Enables building systems that degrade gracefully

## Usefulness & Practical Applications

This pattern is essential in many real-world scenarios:

- **Multi-API Calls**: Fetching data from multiple APIs where some may be down
- **Batch Processing**: Processing multiple items where individual failures are acceptable
- **Data Aggregation**: Collecting data from multiple sources (databases, APIs, caches)
- **Form Validation**: Validating multiple fields independently
- **File Operations**: Processing multiple files where some may be corrupted
- **Notification Systems**: Sending notifications through multiple channels
- **Analytics**: Collecting analytics from multiple services
- **Microservices**: Calling multiple microservices and handling partial failures

**Challenge:** Process multiple API calls and separate successes from failures.`,
    examples: [
      {
        input: `[fetch('/api/1'), fetch('/api/2'), fetch('/api/3')]`,
        output: `{ successes: [...], failures: [...] }`,
        explanation: 'Get all results even if some fail',
      },
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
        input: [
          [Promise.resolve('Success 1'), Promise.reject('Error 1'), Promise.resolve('Success 2')],
        ],
        expectedOutput: {
          successes: ['Success 1', 'Success 2'],
          failures: ['Error 1'],
        },
      },
      {
        input: [[Promise.resolve('A'), Promise.resolve('B'), Promise.resolve('C')]],
        expectedOutput: {
          successes: ['A', 'B', 'C'],
          failures: [],
        },
      },
      {
        input: [[Promise.reject('Error 1'), Promise.reject('Error 2')]],
        expectedOutput: {
          successes: [],
          failures: ['Error 1', 'Error 2'],
        },
      },
    ],
    hints: [
      'Initialize accumulator as empty object: reduce((acc, item) => ..., {})',
      'Check if key exists, create array if not: if (!acc[key]) acc[key] = []',
      'Push item to appropriate group: acc[key].push(item)',
    ],
  },
  {
    id: 'find-vs-filter',
    title: 'Find vs Filter - When to Use Each',
    difficulty: 'easy',
    category: 'Array Methods',
    description: `## In-Depth Explanation

\`find()\` and \`filter()\` are both array methods for searching, but they serve different purposes. \`find()\` returns the first element that matches the condition (or \`undefined\` if none match), while \`filter()\` returns a new array containing all elements that match the condition.

The key difference is:
- \`find()\`: Stops searching after finding the first match (short-circuit behavior), returns a single element
- \`filter()\`: Continues through the entire array, returns an array (even if empty or with one element)

\`find()\` is more efficient when you only need one result because it stops early. \`filter()\` is necessary when you need all matching elements.

## Importance

Understanding when to use each method is crucial because:

- **Performance**: \`find()\` can be faster for large arrays when you only need one result
- **Correctness**: Using the wrong method leads to bugs (expecting an array but getting an element, or vice versa)
- **Code Clarity**: Choosing the right method makes code intent clearer
- **Type Safety**: TypeScript types differ - \`find()\` returns \`T | undefined\`, \`filter()\` returns \`T[]\`
- **API Design**: Different return types affect how functions are used

## Usefulness & Practical Applications

This distinction is important in many scenarios:

- **User Lookups**: \`find()\` for finding a user by ID, \`filter()\` for finding all admins
- **Search Functionality**: \`find()\` for exact matches, \`filter()\` for search results
- **Validation**: \`find()\` to check if any item is invalid, \`filter()\` to get all invalid items
- **Data Processing**: \`find()\` for unique lookups, \`filter()\` for collections
- **UI Rendering**: \`find()\` for single item display, \`filter()\` for list rendering
- **State Management**: \`find()\` for single item updates, \`filter()\` for bulk operations
- **API Responses**: \`find()\` for single resource, \`filter()\` for collections

**Challenge:** Use find to get the first matching item, and filter to get all matches.`,
    examples: [
      {
        input: `const users = [
  { id: 1, active: true },
  { id: 2, active: false },
  { id: 3, active: true }
];`,
        output: `find: first active user, filter: all active users`,
        explanation: 'find returns one item, filter returns array',
      },
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
        input: [
          [
            { id: 1, name: 'John', active: true },
            { id: 2, name: 'Jane', active: false },
            { id: 3, name: 'Bob', active: true },
          ],
        ],
        expectedOutput: { id: 1, name: 'John', active: true },
        description: 'getFirstActiveUser',
      },
      {
        input: [
          [
            { id: 1, name: 'John', active: true },
            { id: 2, name: 'Jane', active: false },
            { id: 3, name: 'Bob', active: true },
          ],
        ],
        expectedOutput: [
          { id: 1, name: 'John', active: true },
          { id: 3, name: 'Bob', active: true },
        ],
        description: 'getAllActiveUsers',
      },
    ],
    hints: [
      'find() returns the first element that matches, or undefined',
      'filter() returns an array of all matching elements',
      'Use find when you need one item, filter when you need multiple',
    ],
  },
  {
    id: 'array-chaining',
    title: 'Method Chaining with Arrays',
    difficulty: 'medium',
    category: 'Array Methods',
    description: `## In-Depth Explanation

Method chaining is a powerful pattern where you call multiple array methods in sequence, with each method operating on the result of the previous one. This creates a pipeline of transformations that reads like a sentence: "filter, then map, then map again."

The key insight is that most array methods (map, filter, reduce, etc.) return new arrays, allowing you to immediately call another array method on the result. This creates a fluent, readable API where complex transformations are expressed as a series of simple steps.

Chaining works because:
1. Each method returns a new array (immutability)
2. Arrays have all the same methods available
3. The chain reads left-to-right, top-to-bottom

## Importance

Method chaining is fundamental to functional programming in JavaScript because:

- **Readability**: Code reads like a pipeline of transformations
- **Composability**: Complex operations built from simple steps
- **Immutability**: Each step creates a new array, avoiding mutations
- **Debugging**: Easy to add/remove steps in the chain
- **Maintainability**: Clear separation of concerns at each step
- **Expressiveness**: Code describes what you want, not how to do it

## Usefulness & Practical Applications

This pattern is ubiquitous in modern JavaScript development:

- **Data Processing**: Transforming API responses, normalizing data structures
- **UI Data Preparation**: Preparing data for rendering in React/Vue components
- **ETL Pipelines**: Extract, Transform, Load operations on data
- **Query Building**: Building complex queries from simple filters and maps
- **Form Validation**: Chaining validation rules and transformations
- **State Management**: Transforming state in Redux/Vuex selectors
- **Analytics**: Processing event streams through multiple transformations
- **Report Generation**: Building reports through chains of filters and aggregations

**Challenge:** Transform data through a chain of operations.`,
    examples: [
      {
        input: `const products = [
  { name: 'Laptop', price: 1000, category: 'electronics' },
  { name: 'Book', price: 20, category: 'books' }
];`,
        output: `['LAPTOP', 'BOOK']`,
        explanation: 'Filter expensive items, get names, uppercase them',
      },
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
        input: [
          [
            { name: 'Laptop', price: 1000, category: 'electronics' },
            { name: 'Book', price: 20, category: 'books' },
            { name: 'Phone', price: 800, category: 'electronics' },
          ],
        ],
        expectedOutput: ['LAPTOP', 'PHONE'],
      },
    ],
    hints: [
      'Each method returns an array, so you can chain them',
      'Order matters: filter first to reduce items, then transform',
      'You can combine map operations: .map(p => p.name.toUpperCase())',
    ],
  },
  {
    id: 'reduce-right',
    title: 'ReduceRight for Right-to-Left Operations',
    difficulty: 'medium',
    category: 'Array Methods',
    description: `## In-Depth Explanation

\`reduceRight()\` is similar to \`reduce()\`, but processes the array from right to left (last element to first). This is essential when the order of operations matters, particularly in function composition where you want to apply functions in a specific sequence.

In function composition, \`compose(f, g, h)(x)\` means \`f(g(h(x)))\` - you apply \`h\` first, then \`g\`, then \`f\`. This requires processing the array of functions from right to left, which is exactly what \`reduceRight\` does.

The accumulator pattern works the same as \`reduce()\`, but the iteration order is reversed. This makes it perfect for operations where the rightmost element should be processed first.

## Importance

\`reduceRight()\` is crucial for operations where order matters:

- **Function Composition**: Essential for building compose functions
- **Mathematical Operations**: Some operations require right-to-left evaluation
- **String Processing**: Building strings or parsing from the end
- **Stack Operations**: Mimicking stack behavior (LIFO - Last In, First Out)
- **Reverse Processing**: When you need to process data in reverse order
- **Pipeline Construction**: Building pipelines that process in reverse order

## Usefulness & Practical Applications

This method is essential in functional programming:

- **Function Composition**: Building compose/pipe utilities for functional programming
- **Middleware Stacks**: Processing middleware in reverse order (like Express.js)
- **Mathematical Expressions**: Evaluating expressions that require right-to-left processing
- **String Reversal**: Building reversed strings or processing from the end
- **Stack Simulation**: Implementing stack-based algorithms
- **Reverse Iteration**: When you need to iterate backwards through an array
- **Pipeline Construction**: Building data processing pipelines

**Challenge:** Build a function composition pipeline using reduceRight.`,
    examples: [
      {
        input: `const functions = [x => x * 2, x => x + 1, x => x - 5];`,
        output: `Composed function: (x - 5) + 1) * 2`,
        explanation: 'Apply functions from right to left',
      },
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
        description: 'testCompose',
      },
    ],
    hints: [
      'reduceRight processes array from last to first element',
      'Useful for function composition: f(g(h(x)))',
      'Accumulator starts with initial value, then each function is applied',
    ],
  },
  {
    id: 'some-every',
    title: 'Some and Every for Validation',
    difficulty: 'easy',
    category: 'Array Methods',
    description: `## In-Depth Explanation

\`some()\` and \`every()\` are boolean array methods that test whether elements in an array satisfy a condition. \`some()\` returns \`true\` if at least one element passes the test (short-circuits on first match), while \`every()\` returns \`true\` only if all elements pass the test (short-circuits on first failure).

Both methods use short-circuit evaluation:
- \`some()\`: Stops as soon as it finds a matching element (returns \`true\`)
- \`every()\`: Stops as soon as it finds a non-matching element (returns \`false\`)

This makes them more efficient than using \`filter().length > 0\` or \`filter().length === array.length\` because they don't need to process the entire array.

## Importance

These methods are essential for validation and checking conditions because:

- **Performance**: Short-circuit evaluation makes them faster than filter-based approaches
- **Semantic Clarity**: Code clearly expresses intent (any vs all)
- **Early Exit**: Don't process unnecessary elements
- **Boolean Logic**: Return boolean values directly, perfect for conditionals
- **Readability**: More readable than manual loops or filter-based checks
- **Type Safety**: TypeScript understands the boolean return type

## Usefulness & Practical Applications

These methods are used extensively in real applications:

- **Form Validation**: \`every()\` to check if all fields are valid, \`some()\` to check if any field has errors
- **Permission Checks**: \`some()\` to check if user has any required permission, \`every()\` to check if user has all permissions
- **Data Quality**: \`every()\` to validate all records, \`some()\` to check if any record needs attention
- **Search/Filter**: \`some()\` to check if any item matches search criteria
- **Conditional Rendering**: \`some()\` to show/hide UI elements based on data
- **Game Logic**: \`every()\` to check if all players are ready, \`some()\` to check if any player won
- **API Validation**: Validating request payloads before processing

**Challenge:** Validate arrays using some and every.`,
    examples: [
      {
        input: `const scores = [85, 90, 78, 92];`,
        output: `some > 90: true, every > 70: true`,
        explanation: 'Check if any score is high, or all scores pass threshold',
      },
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
        description: 'hasHighScore',
      },
      {
        input: [[85, 90, 78, 92]],
        expectedOutput: true,
        description: 'allPassing',
      },
      {
        input: [[65, 70, 68, 72]],
        expectedOutput: false,
        description: 'allPassing with low scores',
      },
    ],
    hints: [
      'some() returns true if at least one element matches',
      'every() returns true only if ALL elements match',
      'Both short-circuit: some stops at first match, every stops at first non-match',
    ],
  },
  {
    id: 'array-from',
    title: 'Array.from with Mapping',
    difficulty: 'medium',
    category: 'Array Methods',
    description: `## In-Depth Explanation

\`Array.from()\` is a versatile method that creates a new array from an iterable or array-like object. When combined with a mapping function as the second argument, it becomes a powerful tool for generating sequences and transforming data.

The syntax \`Array.from({ length: n }, mapFn)\` creates an array of length \`n\`, where each element is generated by calling \`mapFn\` with the index. This is more elegant than using loops or \`Array(n).fill().map()\` because it handles the mapping in a single operation.

The key advantage is that \`Array.from()\` works with any iterable (strings, Sets, Maps, NodeLists, etc.) and can transform them into arrays while applying a mapping function, all in one step.

## Importance

\`Array.from()\` is essential for array creation because:

- **Sequence Generation**: Creates number sequences, ranges, and patterns easily
- **Iterable Conversion**: Converts any iterable to an array
- **Mapping Integration**: Combines creation and transformation in one step
- **Performance**: More efficient than manual loops for array creation
- **Readability**: Clear intent - "create array from this pattern"
- **Flexibility**: Works with array-like objects (NodeLists, arguments, etc.)

## Usefulness & Practical Applications

This method is used extensively in modern JavaScript:

- **Sequence Generation**: Creating number sequences, date ranges, or custom patterns
- **DOM Manipulation**: Converting NodeLists to arrays for array methods
- **String Processing**: Converting strings to character arrays with transformations
- **Test Data**: Generating test data arrays with specific patterns
- **Pagination**: Creating page number arrays for pagination UI
- **Grid Generation**: Creating 2D arrays for game boards or grids
- **Mock Data**: Generating mock data for development and testing
- **Algorithm Implementation**: Creating arrays for algorithms that need indexed sequences

**Challenge:** Create arrays from various sources using Array.from.`,
    examples: [
      {
        input: `Array.from({ length: 5 }, (_, i) => i * 2)`,
        output: `[0, 2, 4, 6, 8]`,
        explanation: 'Create array of even numbers',
      },
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
        description: 'createNumberSequence',
      },
      {
        input: [],
        expectedOutput: [
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
          'r',
          's',
          't',
          'u',
          'v',
          'w',
          'x',
          'y',
          'z',
        ],
        description: 'createAlphabet',
      },
    ],
    hints: [
      'Array.from({ length: n }, mapFn) creates array with n elements',
      'Second parameter is mapping function: (_, index) => value',
      'Useful for creating sequences, ranges, or transforming iterables',
    ],
  },
  {
    id: 'partition-pattern',
    title: 'Partition Pattern with Reduce',
    difficulty: 'medium',
    category: 'Array Methods',
    description: `## In-Depth Explanation

The partition pattern splits an array into two groups based on a boolean condition. Items that pass the condition go into one group, items that fail go into another. This is a common operation in data processing.

Using \`reduce()\` for partitioning is elegant because it processes the array in a single pass, building up both groups simultaneously. The accumulator is an object with two arrays (e.g., \`{ active: [], inactive: [] }\`), and each element is added to the appropriate group based on the condition.

This pattern is more efficient than calling \`filter()\` twice (which would iterate the array twice) and more readable than manual loops. It's a functional programming pattern that clearly expresses the intent: "split this array into two groups."

## Importance

Partitioning is a fundamental data operation because:

- **Single Pass**: More efficient than multiple filter operations
- **Clear Intent**: Code clearly shows the two groups being created
- **Functional Style**: Uses reduce, maintaining functional programming patterns
- **Flexibility**: Easy to extend to multiple groups or more complex conditions
- **Performance**: O(n) time complexity with a single iteration
- **Common Pattern**: Frequently needed in data processing and UI logic

## Usefulness & Practical Applications

This pattern is essential in many scenarios:

- **User Management**: Separating active/inactive users, premium/free users
- **Data Filtering**: Splitting data into valid/invalid, processed/unprocessed
- **UI State**: Partitioning items into visible/hidden, selected/unselected
- **Validation**: Separating valid/invalid form fields or data records
- **Status Management**: Grouping items by status (pending/completed, published/draft)
- **Feature Flags**: Splitting users into enabled/disabled groups
- **Data Analysis**: Separating data into categories for analysis
- **API Processing**: Partitioning API responses into success/failure groups

**Challenge:** Partition users into active and inactive groups.`,
    examples: [
      {
        input: `const users = [
  { name: 'John', active: true },
  { name: 'Jane', active: false }
];`,
        output: `{ active: [...], inactive: [...] }`,
        explanation: 'Split array into two groups',
      },
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
        input: [
          [
            { id: 1, name: 'John', active: true },
            { id: 2, name: 'Jane', active: false },
            { id: 3, name: 'Bob', active: true },
          ],
        ],
        expectedOutput: {
          active: [
            { id: 1, name: 'John', active: true },
            { id: 3, name: 'Bob', active: true },
          ],
          inactive: [{ id: 2, name: 'Jane', active: false }],
        },
      },
    ],
    hints: [
      'Initialize accumulator with both groups: { active: [], inactive: [] }',
      'Push to appropriate group based on condition',
      'More efficient than two separate filter() calls',
    ],
  };
