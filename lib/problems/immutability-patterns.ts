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
  id: 'immutability-patterns',
  title: 'Immutability Patterns',
  difficulty: 'medium',
  category: 'Functional Programming',
  description: `<h2>In-Depth Explanation</h2>

<p><strong>Immutability</strong> means that once data is created, it cannot be changed. Instead of modifying existing data, you create new copies with the desired changes. This is a core principle of functional programming that leads to more predictable and maintainable code.</p>

<p>In JavaScript, primitives (strings, numbers, booleans) are immutable by default, but objects and arrays are mutable. Functional programming patterns require us to treat these mutable structures as if they were immutable.</p>

<h2>Key Immutability Patterns</h2>

<ul>
  <li><strong>Spread Operator</strong>: Create shallow copies of arrays and objects</li>
  <li><strong>Object.assign()</strong>: Merge objects without mutation</li>
  <li><strong>Array Methods</strong>: Use map, filter, reduce instead of mutating methods</li>
  <li><strong>Object.freeze()</strong>: Prevent modifications to objects</li>
  <li><strong>Structural Sharing</strong>: Efficiently share unchanged parts of data structures</li>
</ul>

<h2>Importance</h2>

<p>Immutability provides numerous benefits:</p>

<ul>
  <li><strong>Predictability</strong>: Data cannot change unexpectedly</li>
  <li><strong>Change Detection</strong>: Simple reference comparison to detect changes</li>
  <li><strong>Undo/Redo</strong>: Easy to implement by keeping history of states</li>
  <li><strong>Concurrency Safety</strong>: No race conditions with shared data</li>
  <li><strong>Debugging</strong>: Easier to track down bugs when data cannot mutate</li>
  <li><strong>React Optimization</strong>: Pure component rendering relies on immutability</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Immutability is essential in modern JavaScript:</p>

<ul>
  <li><strong>React State</strong>: setState requires new object references for re-renders</li>
  <li><strong>Redux</strong>: Reducers must return new state objects, never mutate</li>
  <li><strong>Time Travel Debugging</strong>: Redux DevTools relies on immutable state history</li>
  <li><strong>Functional Libraries</strong>: Immutable.js, Immer provide immutable data structures</li>
  <li><strong>API Responses</strong>: Transform data without modifying original response</li>
  <li><strong>Configuration Objects</strong>: Safely derive configurations without side effects</li>
</ul>

<p><strong>Challenge:</strong> Implement immutable update patterns for nested data structures.</p>`,
  examples: [
    {
      input: `// Immutable array update
const nums = [1, 2, 3];
const newNums = [...nums, 4];`,
      output: `[1, 2, 3, 4]`,
      explanation: 'Creates new array without modifying original',
    },
    {
      input: `// Immutable object update
const user = { name: 'Alice', age: 25 };
const updated = { ...user, age: 26 };`,
      output: `{ name: 'Alice', age: 26 }`,
      explanation: 'Creates new object with updated property',
    },
    {
      input: `// Immutable nested update
const state = { user: { name: 'Alice' } };
const newState = {
  ...state,
  user: { ...state.user, name: 'Bob' }
};`,
      output: `{ user: { name: 'Bob' } }`,
      explanation: 'Updates nested property immutably',
    },
  ],
  starterCode: `// TODO: Implement immutable array insert at index
// Should return a new array with item inserted at specified index
function insertAt(array, index, item) {
  // Your code here
  return array;
}

// TODO: Implement immutable array removal at index
// Should return a new array with item at index removed
function removeAt(array, index) {
  // Your code here
  return array;
}

// TODO: Implement immutable array update at index
// Should return a new array with item at index replaced
function updateAt(array, index, newValue) {
  // Your code here
  return array;
}

// TODO: Implement immutable nested object update
// Should update a deeply nested property without mutation
// path is an array of keys, e.g., ['user', 'address', 'city']
function updateNested(obj, path, value) {
  // Your code here
  return obj;
}

// TODO: Implement immutable object property removal
// Should return a new object without the specified key
function removeProperty(obj, key) {
  // Your code here
  return obj;
}

// Test
const arr = [1, 2, 3, 4, 5];
console.log(insertAt(arr, 2, 'x')); // [1, 2, 'x', 3, 4, 5]
console.log(removeAt(arr, 2)); // [1, 2, 4, 5]
console.log(updateAt(arr, 2, 'x')); // [1, 2, 'x', 4, 5]
console.log(arr); // [1, 2, 3, 4, 5] - unchanged

const state = { user: { profile: { name: 'Alice' } } };
console.log(updateNested(state, ['user', 'profile', 'name'], 'Bob'));
console.log(state.user.profile.name); // 'Alice' - unchanged

const obj = { a: 1, b: 2, c: 3 };
console.log(removeProperty(obj, 'b')); // { a: 1, c: 3 }`,
  solution: `// Immutable array insert at index
function insertAt(array, index, item) {
  return [...array.slice(0, index), item, ...array.slice(index)];
}

// Immutable array removal at index
function removeAt(array, index) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

// Immutable array update at index
function updateAt(array, index, newValue) {
  return array.map((item, i) => (i === index ? newValue : item));
}

// Immutable nested object update
function updateNested(obj, path, value) {
  if (path.length === 0) return value;

  const [head, ...rest] = path;
  return {
    ...obj,
    [head]: rest.length === 0 ? value : updateNested(obj[head] || {}, rest, value)
  };
}

// Immutable object property removal
function removeProperty(obj, key) {
  const { [key]: removed, ...rest } = obj;
  return rest;
}

// Test
const arr = [1, 2, 3, 4, 5];
console.log(insertAt(arr, 2, 'x')); // [1, 2, 'x', 3, 4, 5]
console.log(removeAt(arr, 2)); // [1, 2, 4, 5]
console.log(updateAt(arr, 2, 'x')); // [1, 2, 'x', 4, 5]
console.log(arr); // [1, 2, 3, 4, 5] - unchanged

const state = { user: { profile: { name: 'Alice' } } };
console.log(updateNested(state, ['user', 'profile', 'name'], 'Bob'));
// { user: { profile: { name: 'Bob' } } }
console.log(state.user.profile.name); // 'Alice' - unchanged

const obj = { a: 1, b: 2, c: 3 };
console.log(removeProperty(obj, 'b')); // { a: 1, c: 3 }`,
  testCases: [
    {
      input: [[1, 2, 3, 4, 5], 2, 'x'],
      expectedOutput: [1, 2, 'x', 3, 4, 5],
      description: 'insertAt inserts item at correct index',
    },
    {
      input: [[1, 2, 3, 4, 5], 2],
      expectedOutput: [1, 2, 4, 5],
      description: 'removeAt removes item at index',
    },
    {
      input: [[1, 2, 3, 4, 5], 2, 'x'],
      expectedOutput: [1, 2, 'x', 4, 5],
      description: 'updateAt replaces item at index',
    },
    {
      input: [{ a: 1, b: 2, c: 3 }, 'b'],
      expectedOutput: { a: 1, c: 3 },
      description: 'removeProperty removes key from object',
    },
  ],
  hints: [
    'Use array.slice() to extract portions of arrays without mutation',
    'The spread operator (...) creates shallow copies of arrays and objects',
    'For nested updates, you need to spread at each level of nesting',
    'Destructuring with rest syntax ({ [key]: removed, ...rest }) can remove properties',
    'array.map() returns a new array, making it perfect for immutable updates',
  ],
};
