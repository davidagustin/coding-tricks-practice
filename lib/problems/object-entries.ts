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
};
