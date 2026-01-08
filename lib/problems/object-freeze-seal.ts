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
    description: `## In-Depth Explanation

JavaScript provides three levels of object immutability protection:

1. **Object.preventExtensions()**: Prevents adding new properties, but allows modifying/deleting existing ones
2. **Object.seal()**: Prevents adding/removing properties, but allows modifying existing property values
3. **Object.freeze()**: Prevents all changes - no adding, deleting, or modifying properties (shallow freeze)

The hierarchy: \`freeze\` > \`seal\` > \`preventExtensions\` in terms of restrictiveness.

Important notes:
- All are shallow - nested objects are not protected
- Use \`Object.isFrozen()\`, \`Object.isSealed()\`, \`Object.isExtensible()\` to check status
- Frozen objects are immutable at the top level only

## Importance

These methods are essential for immutability because:

- **Data Protection**: Prevent accidental mutations of important data
- **Functional Programming**: Support immutable data patterns
- **State Management**: Protect state in Redux, Vuex, etc.
- **Configuration Objects**: Protect configuration from modification
- **Constants**: Create truly constant objects
- **Debugging**: Prevent bugs from accidental mutations

## Usefulness & Practical Applications

These methods are used extensively:

- **State Management**: Freezing Redux state to prevent mutations
- **Configuration**: Protecting configuration objects
- **Constants**: Creating constant objects and enums
- **API Responses**: Protecting API response data
- **Functional Programming**: Supporting immutable data structures
- **Library Development**: Protecting library internals
- **Testing**: Ensuring test data isn't accidentally modified
- **Security**: Protecting sensitive data from modification

**Challenge:** Understand the differences and use cases for each.`,
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
    solution: `function createImmutableObject(data) {
  return Object.freeze(data);
}

function createSealedObject(data) {
  return Object.seal(data);
}

function isFrozen(obj) {
  return Object.isFrozen(obj);
}

function deepFreeze(obj) {
  Object.freeze(obj);
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === 'object' && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  }
  return obj;
}`,
    testCases: [
      {
        input: [{ a: 1 }],
        expectedOutput: true,
        description: 'isFrozen check',
      },
    ],
    hints: [
      'Object.freeze: no changes, additions, or deletions',
      'Object.seal: can modify, cannot add or delete',
      'Object.preventExtensions: can modify/delete, cannot add',
      'Deep freeze requires recursive freezing of nested objects',
    ],
  };
