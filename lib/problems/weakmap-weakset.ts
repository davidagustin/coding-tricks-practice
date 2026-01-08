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
    id: 'weakmap-weakset',
    title: 'WeakMap and WeakSet',
    difficulty: 'medium',
    category: 'Object Methods',
    description: `## In-Depth Explanation

\`WeakMap\` and \`WeakSet\` are collections with "weak" references to their keys/elements. Unlike \`Map\` and \`Set\`, they don't prevent garbage collection of their keys/elements. When an object used as a key is garbage collected, the entry is automatically removed.

Key characteristics:
- **Weak References**: Don't prevent garbage collection
- **Object Keys Only**: Keys must be objects (not primitives)
- **No Iteration**: Cannot iterate over entries (no size, keys, values, entries)
- **Automatic Cleanup**: Entries removed when key is garbage collected

This makes them perfect for storing metadata about objects without preventing those objects from being garbage collected.

## Importance

Weak collections are essential for memory management because:

- **Memory Efficiency**: Don't prevent garbage collection of keys
- **Private Data**: Store private data associated with objects
- **Metadata Storage**: Store metadata without memory leaks
- **Circular Reference Prevention**: Avoid memory leaks from circular references
- **Library Development**: Essential for libraries that attach data to user objects
- **Performance**: Better memory usage in long-running applications

## Usefulness & Practical Applications

Weak collections are used in many scenarios:

- **Private Properties**: Implementing private properties in classes
- **Metadata Storage**: Storing metadata about DOM elements or objects
- **Caching**: Caching computed values without preventing GC
- **Event Handlers**: Storing event handlers without memory leaks
- **Library Internals**: Libraries storing internal data about user objects
- **DOM Manipulation**: Storing data about DOM nodes
- **Object Tracking**: Tracking visited objects without preventing GC
- **Memoization**: Memoizing without preventing object collection

**Challenge:** Use WeakMap to store private data and WeakSet to track visited objects.`,
    examples: [
      {
        input: `const privateData = new WeakMap();`,
        output: `Stores data keyed by objects, allows GC`,
        explanation: 'WeakMap keys must be objects, allows garbage collection',
      },
    ],
    starterCode: `// TODO: Use WeakMap to store private data
class User {
  constructor(name) {
    this.name = name;
    // Store private data in WeakMap
    // Use 'this' as the key
  }
  
  getPrivateId() {
    // Retrieve private data from WeakMap
    return null;
  }
  
  setPrivateId(id) {
    // Store private data in WeakMap
  }
}

// TODO: Use WeakSet to track visited objects
function markVisited(obj, visited) {
  // Add object to WeakSet
}

function isVisited(obj, visited) {
  // Check if object is in WeakSet
  return false;
}

// Test
const user = new User('John');
user.setPrivateId('secret-123');
console.log(user.getPrivateId());

const visited = new WeakSet();
const obj1 = {};
const obj2 = {};

markVisited(obj1, visited);
console.log(isVisited(obj1, visited)); // true
console.log(isVisited(obj2, visited)); // false`,
    solution: `const privateData = new WeakMap();

class User {
  constructor(name) {
    this.name = name;
  }
  
  getPrivateId() {
    return privateData.get(this);
  }
  
  setPrivateId(id) {
    privateData.set(this, id);
  }
}

function markVisited(obj, visited) {
  visited.add(obj);
}

function isVisited(obj, visited) {
  return visited.has(obj);
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'WeakMap stores private data correctly',
      },
      {
        input: [],
        expectedOutput: true,
        description: 'WeakSet tracks visited objects correctly',
      },
    ],
    hints: [
      'WeakMap keys must be objects (not primitives)',
      'WeakMap/WeakSet allow garbage collection when key is no longer referenced',
      'Useful for private data, metadata, or tracking without memory leaks',
    ],
  },
  {
    id: 'symbol-usage',
    title: 'Symbols for Unique Keys',
    difficulty: 'medium',
    category: 'Object Methods',
    description: `## In-Depth Explanation

Symbols are unique, immutable primitive values that can be used as property keys. Every Symbol is unique, even if created with the same description. This makes them perfect for creating "private" properties that won't conflict with other code.

Key characteristics:
- **Uniqueness**: Each Symbol is unique, even with the same description
- **Privacy**: Symbol properties are not enumerable (won't show in Object.keys(), for...in)
- **Well-Known Symbols**: Built-in symbols like Symbol.iterator, Symbol.toStringTag for meta-programming
- **Global Registry**: Symbol.for() creates shared symbols in a global registry

Symbols enable:
- Private properties (not truly private, but hidden from enumeration)
- Well-known symbols for customizing object behavior (iteration, string conversion)
- Avoiding property name collisions in libraries

## Importance

Symbols are essential for advanced JavaScript patterns because:

- **Property Privacy**: Create properties that don't appear in enumeration
- **Library Development**: Avoid property name collisions in libraries
- **Meta-Programming**: Well-known symbols customize object behavior
- **Iteration**: Symbol.iterator enables custom iteration behavior
- **Type Safety**: Symbols can be used for type branding in TypeScript
- **Framework Development**: Essential for frameworks that attach metadata

## Usefulness & Practical Applications

Symbols are used extensively:

- **Private Properties**: Creating "private" properties in objects
- **Library Internals**: Storing internal library state without conflicts
- **Custom Iteration**: Implementing Symbol.iterator for custom iterables
- **Type Branding**: Creating distinct types in TypeScript
- **Metadata Storage**: Storing metadata about objects
- **Framework Internals**: React, Vue use symbols for internal tracking
- **Polyfills**: Implementing new language features using symbols
- **Serialization**: Controlling JSON.stringify behavior with Symbol.toPrimitive

**Challenge:** Use Symbols for private properties and well-known symbols.`,
    examples: [
      {
        input: `const ID = Symbol('id');`,
        output: `Unique symbol that won't conflict`,
        explanation: 'Symbols are always unique, even with same description',
      },
    ],
    starterCode: `// TODO: Create a Symbol for a private property
const PRIVATE_ID = Symbol('privateId'); // Fix: Create symbol

// TODO: Use Symbol in an object
const user = {
  name: 'John',
  // Add privateId property using PRIVATE_ID symbol
};

// TODO: Create a well-known symbol (iterator)
const iterable = {
  data: [1, 2, 3],
  // Add Symbol.iterator method to make it iterable
};

// Test
user[PRIVATE_ID] = 'secret-123';
console.log(user[PRIVATE_ID]);

// Should work with for...of
for (const item of iterable) {
  console.log(item);
}`,
    solution: `const PRIVATE_ID = Symbol('privateId');

const user = {
  name: 'John',
  [PRIVATE_ID]: 'secret-123'
};

const iterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        }
        return { done: true };
      }.bind(this)
    };
  }
};`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Symbol usage - type check',
      },
    ],
    hints: [
      'Symbol() creates unique symbol, Symbol.for() creates shared symbol',
      'Use computed property names: [SYMBOL]: value',
      'Well-known symbols: Symbol.iterator, Symbol.toStringTag, etc.',
      'Symbols are not enumerable in Object.keys() or for...in',
    ],
  },
  {
    id: 'reflect-api',
    title: 'Reflect API for Meta-Programming',
    difficulty: 'hard',
    category: 'Object Methods',
    description: `## In-Depth Explanation

The Reflect API provides methods that mirror Proxy trap operations, offering a programmatic way to perform object operations. Each Reflect method corresponds to a Proxy trap and provides a functional alternative to operators like \`in\`, \`delete\`, and \`new\`.

Key Reflect methods:
- \`Reflect.get(target, prop)\`: Get property value
- \`Reflect.set(target, prop, value)\`: Set property (returns boolean)
- \`Reflect.has(target, prop)\`: Check if property exists
- \`Reflect.deleteProperty(target, prop)\`: Delete property
- \`Reflect.construct(Constructor, args)\`: Create instance
- \`Reflect.apply(func, thisArg, args)\`: Call function

The Reflect API is designed to work seamlessly with Proxies - Proxy traps can forward operations to Reflect methods, maintaining default behavior while adding custom logic.

## Importance

The Reflect API is essential for meta-programming because:

- **Proxy Integration**: Designed to work with Proxy traps
- **Functional Style**: Provides functional alternatives to operators
- **Error Handling**: Returns booleans instead of throwing (for set/delete)
- **Meta-Programming**: Enables programmatic object manipulation
- **Framework Development**: Essential for building frameworks and libraries
- **Type Safety**: Better TypeScript support than operators

## Usefulness & Practical Applications

The Reflect API is used in advanced scenarios:

- **Proxy Handlers**: Forwarding operations in Proxy traps
- **ORM Libraries**: Programmatic property access and manipulation
- **Validation Libraries**: Dynamic property validation
- **Framework Internals**: React, Vue use Reflect for internal operations
- **Testing**: Creating mocks and test doubles
- **Dynamic Code**: Building dynamic object manipulation code
- **Decorators**: Implementing decorators in TypeScript
- **Serialization**: Custom serialization logic

**Challenge:** Use Reflect for property operations and function calls.`,
    examples: [
      {
        input: `Reflect.get(obj, 'prop'), Reflect.set(obj, 'prop', value)`,
        output: `Meta-programming operations`,
        explanation: 'Reflect provides programmatic access to object operations',
      },
    ],
    starterCode: `// TODO: Use Reflect.get to safely get property
function safeGet(obj, path) {
  // Use Reflect.get to get nested properties
  // Handle cases where property doesn't exist
  return undefined;
}

// TODO: Use Reflect.set to set property
function safeSet(obj, prop, value) {
  // Use Reflect.set to set property
  // Return boolean indicating success
  return false;
}

// TODO: Use Reflect.has to check property
function hasProperty(obj, prop) {
  // Use Reflect.has instead of 'prop' in obj
  return false;
}

// TODO: Use Reflect.construct to create instance
function createInstance(Constructor, args) {
  // Use Reflect.construct instead of new Constructor(...args)
  return null;
}

// Test
const obj = { a: { b: { c: 1 } } };
console.log(safeGet(obj, 'a.b.c')); // Should work
console.log(safeSet(obj, 'x', 2)); // Should return true
console.log(hasProperty(obj, 'x')); // Should return true

class User {
  constructor(name) { this.name = name; }
}
const user = createInstance(User, ['John']);
console.log(user.name);`,
    solution: `function safeGet(obj, path) {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current == null) return undefined;
    current = Reflect.get(current, key);
  }
  return current;
}

function safeSet(obj, prop, value) {
  return Reflect.set(obj, prop, value);
}

function hasProperty(obj, prop) {
  return Reflect.has(obj, prop);
}

function createInstance(Constructor, args) {
  return Reflect.construct(Constructor, args);
}`,
    testCases: [
      {
        input: [{ a: { b: 1 } }, 'a.b'],
        expectedOutput: 1,
        description: 'safeGet',
      },
    ],
    hints: [
      'Reflect.get(target, prop) - get property value',
      'Reflect.set(target, prop, value) - set property, returns boolean',
      'Reflect.has(target, prop) - check if property exists',
      'Reflect.construct(Constructor, args) - create instance',
    ],
  };
