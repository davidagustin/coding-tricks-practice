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
  id: 'object-freeze-seal',
  title: 'Object.freeze, seal, and preventExtensions',
  difficulty: 'medium',
  category: 'Object Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>JavaScript provides three levels of object immutability protection:</p>

<ol>
  <li><strong>Object.preventExtensions()</strong>: Prevents adding new properties, but allows modifying/deleting existing ones</li>
  <li><strong>Object.seal()</strong>: Prevents adding/removing properties, but allows modifying existing property values</li>
  <li><strong>Object.freeze()</strong>: Prevents all changes - no adding, deleting, or modifying properties (shallow freeze)</li>
</ol>

<p>The hierarchy: <code>freeze</code> &gt; <code>seal</code> &gt; <code>preventExtensions</code> in terms of restrictiveness.</p>

<p>Important notes:</p>
<ul>
  <li>All are shallow - nested objects are not protected</li>
  <li>Use <code>Object.isFrozen()</code>, <code>Object.isSealed()</code>, <code>Object.isExtensible()</code> to check status</li>
  <li>Frozen objects are immutable at the top level only</li>
</ul>

<h2>Importance</h2>

<p>These methods are essential for immutability because:</p>

<ul>
  <li><strong>Data Protection</strong>: Prevent accidental mutations of important data</li>
  <li><strong>Functional Programming</strong>: Support immutable data patterns</li>
  <li><strong>State Management</strong>: Protect state in Redux, Vuex, etc.</li>
  <li><strong>Configuration Objects</strong>: Protect configuration from modification</li>
  <li><strong>Constants</strong>: Create truly constant objects</li>
  <li><strong>Debugging</strong>: Prevent bugs from accidental mutations</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>These methods are used extensively:</p>

<ul>
  <li><strong>State Management</strong>: Freezing Redux state to prevent mutations</li>
  <li><strong>Configuration</strong>: Protecting configuration objects</li>
  <li><strong>Constants</strong>: Creating constant objects and enums</li>
  <li><strong>API Responses</strong>: Protecting API response data</li>
  <li><strong>Functional Programming</strong>: Supporting immutable data structures</li>
  <li><strong>Library Development</strong>: Protecting library internals</li>
  <li><strong>Testing</strong>: Ensuring test data isn't accidentally modified</li>
  <li><strong>Security</strong>: Protecting sensitive data from modification</li>
</ul>

<p><strong>Challenge:</strong> Understand the differences and use cases for each.</p>`,
  examples: [
    {
      input: `Object.freeze(obj), Object.seal(obj), Object.preventExtensions(obj)`,
      output: `Different levels of immutability`,
      explanation: 'freeze > seal > preventExtensions in restrictiveness',
    },
  ],
  starterCode: `// TODO: Create immutable object with Object.freeze
function createImmutableObject(data) {
  // Freeze the object (no changes allowed)
  return data;
}

// TODO: Create sealed object (can modify, can't add/remove)
function createSealedObject(data) {
  // Seal the object
  return data;
}

// TODO: Check if object is frozen
function isFrozen(obj) {
  // Use Object.isFrozen
  return false;
}

// TODO: Deep freeze nested objects
function deepFreeze(obj) {
  // Freeze object and recursively freeze all properties
  // Return the frozen object
  return obj;
}

// Test
const immutable = createImmutableObject({ a: 1, b: { c: 2 } });
// immutable.a = 2; // Should fail silently or throw in strict mode

const sealed = createSealedObject({ x: 1 });
sealed.x = 2; // Should work
// sealed.y = 3; // Should fail

const deep = deepFreeze({ a: { b: { c: 1 } } });
// deep.a.b.c = 2; // Should fail`,
  solution: `// Create immutable object with Object.freeze
function createImmutableObject(data) {
  return Object.freeze(data);
}

// Create sealed object (can modify, can't add/remove)
function createSealedObject(data) {
  return Object.seal(data);
}

// Check if object is frozen
function isFrozen(obj) {
  return Object.isFrozen(obj);
}

// Deep freeze nested objects
function deepFreeze(obj) {
  // Freeze the object itself
  Object.freeze(obj);

  // Recursively freeze all properties that are objects
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  });

  return obj;
}

// Test
const immutable = createImmutableObject({ a: 1, b: { c: 2 } });
// immutable.a = 2; // Should fail silently or throw in strict mode

const sealed = createSealedObject({ x: 1 });
sealed.x = 2; // Should work
// sealed.y = 3; // Should fail

const deep = deepFreeze({ a: { b: { c: 1 } } });
// deep.a.b.c = 2; // Should fail`,
  testCases: [
    {
      input: { a: 1 },
      expectedOutput: true,
      description: 'createImmutableObject returns a frozen object',
    },
    {
      input: { x: 1 },
      expectedOutput: true,
      description: 'createSealedObject returns a sealed object',
    },
    {
      input: { a: { b: { c: 1 } } },
      expectedOutput: true,
      description: 'deepFreeze freezes nested objects recursively',
    },
    {
      input: {},
      expectedOutput: false,
      description: 'Regular object is not frozen',
    },
  ],
  hints: [
    'Object.freeze: no changes, additions, or deletions',
    'Object.seal: can modify, cannot add or delete',
    'Object.preventExtensions: can modify/delete, cannot add',
    'Deep freeze requires recursive freezing of nested objects',
  ],
};
