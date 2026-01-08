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
  description: `## In-Depth Explanation

The spread operator (\`...\`) is a powerful tool for working with objects and arrays. It "spreads" or expands an iterable into individual elements. For objects, it creates shallow copies and enables immutable updates.

Key patterns:
- **Cloning**: \`{ ...obj }\` creates a shallow copy
- **Merging**: \`{ ...obj1, ...obj2 }\` merges objects (later overrides earlier)
- **Immutable Updates**: \`{ ...obj, prop: newValue }\` updates without mutation
- **Omitting Properties**: \`const { key, ...rest } = obj\` removes properties
- **Nested Updates**: Spread at each level for deep updates

Important: Spread creates shallow copies. Nested objects are still referenced, not copied. For deep cloning, you need recursive spreading or libraries like Lodash.

## Importance

Spread operator patterns are essential for modern JavaScript because:

- **Immutability**: Update objects/arrays without mutation
- **Functional Programming**: Supports immutable data patterns
- **State Management**: Essential for Redux, Vuex immutable updates
- **React**: Used extensively for props and state updates
- **Code Clarity**: More readable than Object.assign()
- **Performance**: Efficient shallow copying

## Usefulness & Practical Applications

Spread patterns are used everywhere:

- **State Updates**: React setState with spread: \`setState({ ...state, key: value })\`
- **Redux Reducers**: Immutable state updates in Redux
- **Object Merging**: Merging configuration objects
- **Default Values**: \`{ ...defaults, ...overrides }\`
- **Array Operations**: Cloning, concatenating arrays
- **Function Arguments**: Spreading arrays as function arguments
- **Props Spreading**: React \`<Component {...props} />\`
- **API Requests**: Merging request parameters

**Challenge:** Master spread operator for common patterns.`,
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
      description: 'shallowClone',
    },
    {
      input: [{ a: 1 }, { b: 2 }, { a: 3 }],
      expectedOutput: { a: 3, b: 2 },
      description: 'mergeObjects',
    },
    {
      input: [{ a: 1, b: 2, c: 3 }, 'b'],
      expectedOutput: { a: 1, c: 3 },
      description: 'omitProperty',
    },
  ],
  hints: [
    'Spread creates shallow copy: { ...obj }',
    'Later properties override: { ...obj1, ...obj2 }',
    'Use destructuring to omit: const { key, ...rest } = obj',
    'For deep updates, spread at each level',
  ],
};
