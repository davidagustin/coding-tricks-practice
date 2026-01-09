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
  id: 'object-assign-deep',
  title: 'Shallow vs Deep Object Cloning Patterns',
  difficulty: 'medium',
  category: 'Object Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>Understanding the difference between shallow and deep cloning is crucial for avoiding bugs with object mutations.</p>

<h3>Shallow Cloning Methods:</h3>

<ul>
  <li><code>Object.assign({}, obj)</code> - Copies own enumerable properties</li>
  <li><code>{ ...obj }</code> - Spread operator (same as Object.assign)</li>
  <li><code>Object.create(proto, descriptors)</code> - With property descriptors</li>
</ul>

<p><strong>Problem with shallow clones:</strong> Nested objects are still references to the original!</p>

<pre><code>const original = { user: { name: 'Alice' } };
const shallow = { ...original };
shallow.user.name = 'Bob';  // Also changes original.user.name!</code></pre>

<h3>Deep Cloning Methods:</h3>

<ul>
  <li><code>structuredClone(obj)</code> - Modern built-in (recommended)</li>
  <li><code>JSON.parse(JSON.stringify(obj))</code> - Works but loses functions, undefined, symbols</li>
  <li>Manual recursive cloning - Full control but more complex</li>
  <li>Library functions - lodash.cloneDeep, etc.</li>
</ul>

<h2>Importance</h2>

<p>Proper cloning is essential because:</p>

<ul>
  <li><strong>Immutability</strong>: React, Redux require immutable state updates</li>
  <li><strong>Avoiding Side Effects</strong>: Prevent accidental mutations</li>
  <li><strong>State Management</strong>: Clean state transitions in applications</li>
  <li><strong>Testing</strong>: Isolate test data from modifications</li>
  <li><strong>Caching</strong>: Store original data before transformations</li>
  <li><strong>Undo/Redo</strong>: Implement history with state snapshots</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Common scenarios requiring proper cloning:</p>

<ul>
  <li><strong>React State Updates</strong>: <code>setState(prev => ({ ...prev, nested: { ...prev.nested, value: newVal } }))</code></li>
  <li><strong>Redux Reducers</strong>: Immutable state transformations</li>
  <li><strong>API Response Caching</strong>: Store original before modification</li>
  <li><strong>Form Handling</strong>: Clone initial values for reset functionality</li>
  <li><strong>Configuration Management</strong>: Merge configs without mutation</li>
  <li><strong>Data Transformation Pipelines</strong>: Preserve original data</li>
</ul>

<p><strong>Challenge:</strong> Implement various cloning patterns and understand their trade-offs.</p>`,
  examples: [
    {
      input: `const obj = { a: 1, b: { c: 2 } };
const shallow = { ...obj };`,
      output: `shallow.b === obj.b // true (same reference!)`,
      explanation: 'Shallow clone shares nested objects',
    },
    {
      input: `const obj = { a: 1, b: { c: 2 } };
const deep = structuredClone(obj);`,
      output: `deep.b === obj.b // false (different objects)`,
      explanation: 'Deep clone creates new nested objects',
    },
  ],
  starterCode: `// TODO: Shallow clone an object using Object.assign
function shallowCloneAssign(obj) {
  // Use Object.assign to create a shallow copy

  return obj;
}

// TODO: Shallow clone using spread operator
function shallowCloneSpread(obj) {
  // Use spread operator

  return obj;
}

// TODO: Deep clone using structuredClone
function deepCloneStructured(obj) {
  // Use the modern structuredClone API

  return obj;
}

// TODO: Deep clone using JSON (with limitations)
function deepCloneJSON(obj) {
  // Use JSON.parse(JSON.stringify())
  // Note: This loses functions, undefined, symbols, dates become strings

  return obj;
}

// TODO: Implement a recursive deep clone function
function deepCloneRecursive(obj) {
  // Handle: null, primitives, arrays, objects, dates
  // Recursively clone nested structures

  return obj;
}

// TODO: Merge objects deeply (not just shallow merge)
function deepMerge(target, source) {
  // Recursively merge source into target
  // Create new objects, don't mutate target

  return target;
}

// Test shallow vs deep cloning
const original = {
  name: 'Alice',
  scores: [90, 85, 88],
  address: {
    city: 'NYC',
    zip: '10001'
  }
};

const shallow = shallowCloneSpread(original);
const deep = deepCloneStructured(original);

// Modify nested property
shallow.address.city = 'LA';
console.log('Original after shallow mod:', original.address.city); // Still 'NYC'?

deep.address.city = 'Chicago';
console.log('Original after deep mod:', original.address.city); // Should be unchanged`,
  solution: `// Shallow clone an object using Object.assign
function shallowCloneAssign(obj) {
  return Object.assign({}, obj);
}

// Shallow clone using spread operator
function shallowCloneSpread(obj) {
  return { ...obj };
}

// Deep clone using structuredClone
function deepCloneStructured(obj) {
  return structuredClone(obj);
}

// Deep clone using JSON (with limitations)
function deepCloneJSON(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Implement a recursive deep clone function
function deepCloneRecursive(obj) {
  // Handle null and primitives
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  // Handle Array
  if (Array.isArray(obj)) {
    return obj.map(item => deepCloneRecursive(item));
  }

  // Handle Object
  const cloned = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      cloned[key] = deepCloneRecursive(obj[key]);
    }
  }
  return cloned;
}

// Merge objects deeply (not just shallow merge)
function deepMerge(target, source) {
  const result = { ...target };

  for (const key in source) {
    if (Object.hasOwn(source, key)) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key]) &&
        typeof result[key] === 'object' &&
        result[key] !== null &&
        !Array.isArray(result[key])
      ) {
        result[key] = deepMerge(result[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }

  return result;
}

// Test shallow vs deep cloning
const original = {
  name: 'Alice',
  scores: [90, 85, 88],
  address: {
    city: 'NYC',
    zip: '10001'
  }
};

const shallow = shallowCloneSpread(original);
const deep = deepCloneStructured(original);

shallow.address.city = 'LA';
console.log('Original after shallow mod:', original.address.city);

deep.address.city = 'Chicago';
console.log('Original after deep mod:', original.address.city);`,
  testCases: [
    {
      input: [{ a: 1, b: 2 }],
      expectedOutput: { a: 1, b: 2 },
      description: 'shallowCloneAssign creates a shallow copy of simple object',
    },
    {
      input: [{ x: 1, y: { z: 2 } }],
      expectedOutput: { x: 1, y: { z: 2 } },
      description: 'shallowCloneSpread creates a shallow copy with nested object',
    },
    {
      input: [{ a: 1, nested: { b: 2, deep: { c: 3 } } }],
      expectedOutput: { a: 1, nested: { b: 2, deep: { c: 3 } } },
      description: 'deepCloneStructured creates independent deep copy',
    },
    {
      input: [{ name: 'test', data: [1, 2, 3] }],
      expectedOutput: { name: 'test', data: [1, 2, 3] },
      description: 'deepCloneJSON clones objects with arrays',
    },
    {
      input: [{ a: 1, b: { c: 2 } }],
      expectedOutput: { a: 1, b: { c: 2 } },
      description: 'deepCloneRecursive handles nested objects',
    },
    {
      input: [{ a: 1, b: { x: 1 } }, { b: { y: 2 }, c: 3 }],
      expectedOutput: { a: 1, b: { x: 1, y: 2 }, c: 3 },
      description: 'deepMerge merges nested objects correctly',
    },
  ],
  hints: [
    'Object.assign and spread only copy top-level properties',
    'structuredClone() is the modern way to deep clone (ES2022+)',
    'JSON clone loses: functions, undefined, Symbols, Date (becomes string), circular references fail',
    'For recursive cloning, handle base cases first (null, primitives)',
    'Arrays need special handling - use Array.isArray() to detect',
    'Deep merge requires recursively merging when both values are objects',
  ],
};
