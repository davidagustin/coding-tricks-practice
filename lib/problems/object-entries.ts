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
    id: 'object-entries',
    title: 'Object.fromEntries / Object.entries',
    difficulty: 'medium',
    category: 'Object Methods',
    description: `## In-Depth Explanation

\`Object.entries()\` and \`Object.fromEntries()\` form a powerful pair that allows you to convert objects to arrays and back. This transformation enables you to leverage all array methods (map, filter, reduce, etc.) on object properties, then convert the result back to an object.

\`Object.entries(obj)\` converts an object into an array of [key, value] pairs: \`[['key1', value1], ['key2', value2], ...]\`. Once in array form, you can use any array method to transform, filter, or manipulate the entries. \`Object.fromEntries()\` does the reverse - it takes an array of [key, value] pairs and reconstructs an object.

This pattern is particularly powerful because it bridges the gap between object-oriented and functional programming paradigms, allowing you to apply functional transformations to objects.

## Importance

This technique is crucial for object manipulation because:

- **Array Method Access**: Unlocks the full power of array methods (map, filter, reduce) for objects
- **Immutable Transformations**: Creates new objects without mutating originals
- **Functional Style**: Enables functional programming patterns with objects
- **Type Safety**: Works well with TypeScript's type system
- **Composability**: Can chain multiple transformations together
- **Standard API**: Uses built-in methods, no dependencies required

## Usefulness & Practical Applications

This pattern is essential in modern JavaScript/TypeScript development:

- **Data Transformation**: Transforming API responses, normalizing data structures
- **Configuration Processing**: Filtering, mapping, or validating configuration objects
- **State Management**: Transforming Redux state, Vuex mutations, or MobX observables
- **Form Data Processing**: Converting form objects, validating and sanitizing inputs
- **API Request Building**: Transforming objects before sending to APIs
- **Data Validation**: Filtering invalid properties, transforming values
- **Object Utilities**: Creating reusable utility functions for object manipulation
- **React Props Processing**: Transforming props objects before passing to components

**Challenge:** Transform object values and filter properties.`,
    examples: [
      {
        input: `const prices = { apple: 1, banana: 2, cherry: 3 };`,
        output: `{ apple: 2, banana: 4, cherry: 6 }`,
        explanation: 'Double all prices',
      },
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
        description: 'doublePrices',
      },
      {
        input: [{ name: 'John', _internal: 'secret', age: 30, _temp: 'data' }],
        expectedOutput: { name: 'John', age: 30 },
        description: 'filterPrivateProperties',
      },
    ],
    hints: [
      'Object.entries(obj) → [[key, value], ...]',
      'Object.fromEntries([[key, value], ...]) → object',
      'Use map/filter between entries and fromEntries',
    ],
  },
  {
    id: 'promise-race-timeout',
    title: 'Promise.race for Timeouts',
    difficulty: 'medium',
    category: 'Async/Promises',
    description: `## In-Depth Explanation

\`Promise.race()\` is a powerful method that takes an array of promises and returns a new promise that settles (resolves or rejects) as soon as the first promise in the array settles. This behavior makes it perfect for implementing timeouts.

The timeout pattern works by racing your actual promise against a "timeout promise" that rejects after a specified duration. If your promise completes first, you get its result. If the timeout promise settles first, you get a timeout error. This ensures that operations don't hang indefinitely.

The key insight is that \`Promise.race()\` doesn't wait for all promises - it returns immediately when any promise settles, making it ideal for timeout scenarios where you want to enforce a maximum wait time.

## Importance

Timeouts are critical for building robust applications because:

- **Prevents Hanging**: Ensures operations don't wait indefinitely
- **User Experience**: Provides feedback when operations take too long
- **Resource Management**: Prevents resource leaks from long-running operations
- **Error Handling**: Allows graceful degradation when services are slow
- **Network Resilience**: Essential for handling unreliable network conditions
- **API Reliability**: Protects against slow or unresponsive APIs

## Usefulness & Practical Applications

This pattern is essential in production applications:

- **API Calls**: Adding timeouts to fetch requests, preventing infinite waits
- **Database Queries**: Enforcing maximum query execution time
- **File Operations**: Timeout for file reads/writes that might hang
- **Third-Party Services**: Protecting against slow external API calls
- **User Actions**: Timeout for user-triggered operations (uploads, downloads)
- **WebSocket Connections**: Implementing connection timeouts
- **Authentication**: Timeout for login/authentication flows
- **Data Fetching**: Timeout for data loading in React/Vue applications

**Challenge:** Create a withTimeout function that rejects if the promise takes too long.`,
    examples: [
      {
        input: `await withTimeout(fetch('/api/data'), 5000)`,
        output: `Resolves with data or rejects with timeout error`,
        explanation: 'Promise resolves if fetch completes in time, otherwise times out',
      },
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
        description: 'Promise resolves before timeout',
      },
      {
        input: [Promise.resolve('fast'), 5000],
        expectedOutput: 'fast',
        description: 'Fast promise resolves quickly',
      },
    ],
    hints: [
      'Promise.race returns the first settled promise',
      'Create a timeout promise that rejects after ms',
      'Use setTimeout in the timeout promise',
    ],
  };
