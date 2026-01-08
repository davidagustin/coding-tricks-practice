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
    description: `## In-Depth Explanation

Property descriptors control how properties behave in JavaScript. Each property has a descriptor with attributes:
- **enumerable**: Whether property appears in \`for...in\` loops and \`Object.keys()\`
- **writable**: Whether property value can be changed
- **configurable**: Whether property can be deleted or its descriptor modified
- **value**: The property's value (for data properties)
- **get/set**: Accessor functions (for accessor properties)

\`Object.defineProperty()\` and \`Object.defineProperties()\` allow fine-grained control over property behavior. \`Object.getOwnPropertyDescriptor()\` retrieves a property's descriptor.

This enables:
- Hidden properties (non-enumerable)
- Read-only properties (non-writable)
- Computed properties (getters/setters)
- Property protection (non-configurable)

## Importance

Property descriptors are essential for object design because:

- **Property Control**: Fine-grained control over property behavior
- **API Design**: Create clean public APIs with hidden internals
- **Immutability**: Create read-only properties
- **Computed Properties**: Implement getters/setters for computed values
- **Library Development**: Essential for building robust libraries
- **Framework Development**: Used extensively in frameworks

## Usefulness & Practical Applications

Property descriptors are used extensively:

- **Hidden Properties**: Creating internal properties that don't appear in enumeration
- **Read-Only Properties**: Protecting important properties from modification
- **Computed Properties**: Implementing getters/setters for derived values
- **Library APIs**: Creating clean public APIs with hidden internals
- **Framework Internals**: React, Vue use descriptors for internal properties
- **Validation**: Implementing property validation with setters
- **Lazy Loading**: Implementing lazy-loaded properties with getters
- **Observables**: Creating observable properties with getters/setters

**Challenge:** Create properties with specific descriptors.`,
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
        input: [{ a: 1 }, 'hidden', 'secret'],
        expectedOutput: { a: 1 },
        description: 'addHiddenProperty - check enumerable',
      },
    ],
    hints: [
      'enumerable: false - hidden from Object.keys, for...in',
      'writable: false - cannot be reassigned',
      'configurable: false - cannot be deleted or reconfigured',
      'Object.getOwnPropertyDescriptors gets all descriptors',
    ],
  };