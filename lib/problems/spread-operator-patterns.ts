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
  id: 'spread-operator-patterns',
  title: 'Advanced Spread Operator Patterns',
  difficulty: 'medium',
  category: 'Object Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>The spread operator (<code>...</code>) is a powerful tool for working with objects and arrays. It "spreads" or expands an iterable into individual elements. For objects, it creates shallow copies and enables immutable updates.</p>

<p>Key patterns:</p>
<ul>
  <li><strong>Cloning</strong>: <code>{ ...obj }</code> creates a shallow copy</li>
  <li><strong>Merging</strong>: <code>{ ...obj1, ...obj2 }</code> merges objects (later overrides earlier)</li>
  <li><strong>Immutable Updates</strong>: <code>{ ...obj, prop: newValue }</code> updates without mutation</li>
  <li><strong>Omitting Properties</strong>: <code>const { key, ...rest } = obj</code> removes properties</li>
  <li><strong>Nested Updates</strong>: Spread at each level for deep updates</li>
</ul>

<p>Important: Spread creates shallow copies. Nested objects are still referenced, not copied. For deep cloning, you need recursive spreading or libraries like Lodash.</p>

<h2>Importance</h2>

<p>Spread operator patterns are essential for modern JavaScript because:</p>

<ul>
  <li><strong>Immutability</strong>: Update objects/arrays without mutation</li>
  <li><strong>Functional Programming</strong>: Supports immutable data patterns</li>
  <li><strong>State Management</strong>: Essential for Redux, Vuex immutable updates</li>
  <li><strong>React</strong>: Used extensively for props and state updates</li>
  <li><strong>Code Clarity</strong>: More readable than Object.assign()</li>
  <li><strong>Performance</strong>: Efficient shallow copying</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Spread patterns are used everywhere:</p>

<ul>
  <li><strong>State Updates</strong>: React setState with spread: <code>setState({ ...state, key: value })</code></li>
  <li><strong>Redux Reducers</strong>: Immutable state updates in Redux</li>
  <li><strong>Object Merging</strong>: Merging configuration objects</li>
  <li><strong>Default Values</strong>: <code>{ ...defaults, ...overrides }</code></li>
  <li><strong>Array Operations</strong>: Cloning, concatenating arrays</li>
  <li><strong>Function Arguments</strong>: Spreading arrays as function arguments</li>
  <li><strong>Props Spreading</strong>: React <code><Component {...props} /></code></li>
  <li><strong>API Requests</strong>: Merging request parameters</li>
</ul>

<p><strong>Challenge:</strong> Master spread operator for common patterns.</p>`,
  examples: [
    {
      input: `const merged = { ...obj1, ...obj2 };`,
      output: `Merged object with later properties overriding`,
      explanation: 'Spread operator creates shallow copies',
    },
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
      description: 'shallowClone - creates a shallow copy of an object',
    },
    {
      input: [{ a: 1 }, { b: 2 }, { a: 3 }],
      expectedOutput: { a: 3, b: 2 },
      description: 'mergeObjects - merges multiple objects with later overrides',
    },
    {
      input: [{ a: 1, b: 2, c: 3 }, 'b'],
      expectedOutput: { a: 1, c: 3 },
      description: 'omitProperty - removes specified key from object',
    },
  ],
  hints: [
    'Spread creates shallow copy: { ...obj }',
    'Later properties override: { ...obj1, ...obj2 }',
    'Use destructuring to omit: const { key, ...rest } = obj',
    'For deep updates, spread at each level',
  ],
};
