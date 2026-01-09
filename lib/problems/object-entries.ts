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
  description: `<h2>In-Depth Explanation</h2>

<p><code>Object.entries()</code> and <code>Object.fromEntries()</code> form a powerful pair that allows you to convert objects to arrays and back. This transformation enables you to leverage all array methods (map, filter, reduce, etc.) on object properties, then convert the result back to an object.</p>

<p><code>Object.entries(obj)</code> converts an object into an array of [key, value] pairs: <code>[['key1', value1], ['key2', value2], ...]</code>. Once in array form, you can use any array method to transform, filter, or manipulate the entries. <code>Object.fromEntries()</code> does the reverse - it takes an array of [key, value] pairs and reconstructs an object.</p>

<p>This pattern is particularly powerful because it bridges the gap between object-oriented and functional programming paradigms, allowing you to apply functional transformations to objects.</p>

<h2>Importance</h2>

<p>This technique is crucial for object manipulation because:</p>

<ul>
  <li><strong>Array Method Access</strong>: Unlocks the full power of array methods (map, filter, reduce) for objects</li>
  <li><strong>Immutable Transformations</strong>: Creates new objects without mutating originals</li>
  <li><strong>Functional Style</strong>: Enables functional programming patterns with objects</li>
  <li><strong>Type Safety</strong>: Works well with TypeScript's type system</li>
  <li><strong>Composability</strong>: Can chain multiple transformations together</li>
  <li><strong>Standard API</strong>: Uses built-in methods, no dependencies required</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This pattern is essential in modern JavaScript/TypeScript development:</p>

<ul>
  <li><strong>Data Transformation</strong>: Transforming API responses, normalizing data structures</li>
  <li><strong>Configuration Processing</strong>: Filtering, mapping, or validating configuration objects</li>
  <li><strong>State Management</strong>: Transforming Redux state, Vuex mutations, or MobX observables</li>
  <li><strong>Form Data Processing</strong>: Converting form objects, validating and sanitizing inputs</li>
  <li><strong>API Request Building</strong>: Transforming objects before sending to APIs</li>
  <li><strong>Data Validation</strong>: Filtering invalid properties, transforming values</li>
  <li><strong>Object Utilities</strong>: Creating reusable utility functions for object manipulation</li>
  <li><strong>React Props Processing</strong>: Transforming props objects before passing to components</li>
</ul>

<p><strong>Challenge:</strong> Transform object values and filter properties.</p>`,
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
      description: 'doublePrices doubles all values in the object',
    },
    {
      input: [{ name: 'John', _internal: 'secret', age: 30, _temp: 'data' }],
      expectedOutput: { name: 'John', age: 30 },
      description: 'filterPrivateProperties removes properties starting with underscore',
    },
  ],
  hints: [
    'Object.entries(obj) → [[key, value], ...]',
    'Object.fromEntries([[key, value], ...]) → object',
    'Use map/filter between entries and fromEntries',
  ],
};
