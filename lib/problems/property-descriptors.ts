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
  id: 'property-descriptors',
  title: 'Property Descriptors',
  difficulty: 'medium',
  category: 'Object Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>Property descriptors control how properties behave in JavaScript. Each property has a descriptor with attributes:</p>
<ul>
  <li><strong>enumerable</strong>: Whether property appears in \<code>for...in\</code> loops and \<code>Object.keys()\</code></li>
  <li><strong>writable</strong>: Whether property value can be changed</li>
  <li><strong>configurable</strong>: Whether property can be deleted or its descriptor modified</li>
  <li><strong>value</strong>: The property's value (for data properties)</li>
  <li><strong>get/set</strong>: Accessor functions (for accessor properties)</li>
</ul>

<p>\<code>Object.defineProperty()\</code> and \<code>Object.defineProperties()\</code> allow fine-grained control over property behavior. \<code>Object.getOwnPropertyDescriptor()\</code> retrieves a property's descriptor.</p>

<p>This enables:</p>
<ul>
  <li>Hidden properties (non-enumerable)</li>
  <li>Read-only properties (non-writable)</li>
  <li>Computed properties (getters/setters)</li>
  <li>Property protection (non-configurable)</li>
</ul>

<h2>Importance</h2>

<p>Property descriptors are essential for object design because:</p>

<ul>
  <li><strong>Property Control</strong>: Fine-grained control over property behavior</li>
  <li><strong>API Design</strong>: Create clean public APIs with hidden internals</li>
  <li><strong>Immutability</strong>: Create read-only properties</li>
  <li><strong>Computed Properties</strong>: Implement getters/setters for computed values</li>
  <li><strong>Library Development</strong>: Essential for building robust libraries</li>
  <li><strong>Framework Development</strong>: Used extensively in frameworks</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Property descriptors are used extensively:</p>

<ul>
  <li><strong>Hidden Properties</strong>: Creating internal properties that don't appear in enumeration</li>
  <li><strong>Read-Only Properties</strong>: Protecting important properties from modification</li>
  <li><strong>Computed Properties</strong>: Implementing getters/setters for derived values</li>
  <li><strong>Library APIs</strong>: Creating clean public APIs with hidden internals</li>
  <li><strong>Framework Internals</strong>: React, Vue use descriptors for internal properties</li>
  <li><strong>Validation</strong>: Implementing property validation with setters</li>
  <li><strong>Lazy Loading</strong>: Implementing lazy-loaded properties with getters</li>
  <li><strong>Observables</strong>: Creating observable properties with getters/setters</li>
</ul>

<p><strong>Challenge:</strong> Create properties with specific descriptors.</p>`,
  examples: [
    {
      input: `Object.defineProperty(obj, 'prop', { enumerable: false })`,
      output: `Property with custom descriptor`,
      explanation: 'Control property visibility and mutability',
    },
  ],
  starterCode: `// TODO: Create a non-enumerable property
function addHiddenProperty(obj, key, value) {
  // Use Object.defineProperty with enumerable: false
  return obj;
}

// TODO: Create a read-only property
function addReadOnlyProperty(obj, key, value) {
  // Use Object.defineProperty with writable: false
  return obj;
}

// TODO: Get all property descriptors
function getDescriptors(obj) {
  // Use Object.getOwnPropertyDescriptors
  return {};
}

// TODO: Copy descriptors from one object to another
function copyDescriptors(source, target) {
  // Use Object.defineProperties with descriptors from source
  return target;
}

// Test
const obj = { visible: 1 };
addHiddenProperty(obj, 'hidden', 'secret');
addReadOnlyProperty(obj, 'readonly', 'immutable');

console.log(Object.keys(obj)); // Should not include 'hidden'
// obj.readonly = 'changed'; // Should fail in strict mode

const descriptors = getDescriptors(obj);
console.log(descriptors);`,
  solution: `function addHiddenProperty(obj, key, value) {
  Object.defineProperty(obj, key, {
    value,
    enumerable: false,
    writable: true,
    configurable: true
  });
  return obj;
}

function addReadOnlyProperty(obj, key, value) {
  Object.defineProperty(obj, key, {
    value,
    enumerable: true,
    writable: false,
    configurable: true
  });
  return obj;
}

function getDescriptors(obj) {
  return Object.getOwnPropertyDescriptors(obj);
}

function copyDescriptors(source, target) {
  const descriptors = Object.getOwnPropertyDescriptors(source);
  Object.defineProperties(target, descriptors);
  return target;
}`,
  testCases: [
    {
      input: [{ a: 1, b: 2 }],
      expectedOutput: { a: { value: 1, writable: true, enumerable: true, configurable: true }, b: { value: 2, writable: true, enumerable: true, configurable: true } },
      description: 'getDescriptors returns all property descriptors for simple object',
    },
  ],
  hints: [
    'enumerable: false - hidden from Object.keys, for...in',
    'writable: false - cannot be reassigned',
    'configurable: false - cannot be deleted or reconfigured',
    'Object.getOwnPropertyDescriptors gets all descriptors',
  ],
};
