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
    id: 'proxy-api',
    title: 'Proxy API for Interception',
    difficulty: 'hard',
    category: 'Object Methods',
    description: `## In-Depth Explanation

The \`Proxy\` object enables meta-programming by intercepting and customizing operations on objects (property access, assignment, enumeration, function invocation, etc.). It's a powerful tool for creating abstractions and implementing patterns like validation, logging, and reactive programming.

A Proxy wraps a target object with a handler that defines "traps" - functions that intercept operations. Common traps include:
- \`get\`: Intercepts property access
- \`set\`: Intercepts property assignment
- \`has\`: Intercepts \`in\` operator
- \`deleteProperty\`: Intercepts \`delete\` operator

Proxies are transparent - code using the proxy doesn't know it's a proxy. This enables powerful patterns like reactive frameworks, validation libraries, and debugging tools.

## Importance

Proxies are essential for advanced JavaScript patterns because:

- **Meta-Programming**: Intercept and customize object operations
- **Validation**: Automatic validation on property assignment
- **Reactivity**: Foundation for reactive frameworks (Vue 3 reactivity)
- **Debugging**: Logging and monitoring object access
- **Virtual Properties**: Create computed properties
- **Security**: Implement access control and validation layers

## Usefulness & Practical Applications

Proxies are used in many advanced scenarios:

- **Reactive Frameworks**: Vue 3 reactivity system uses Proxies
- **Validation Libraries**: Automatic property validation
- **ORM Libraries**: Lazy loading and virtual properties
- **Debugging Tools**: Logging object access and mutations
- **Access Control**: Implementing private properties and access control
- **API Wrappers**: Intercepting API calls for caching or logging
- **State Management**: Reactive state management systems
- **Mocking/Testing**: Creating test doubles and mocks

**Challenge:** Create a proxy that logs property access and validates assignments.`,
    examples: [
      {
        input: `const obj = new Proxy(target, handler);`,
        output: `Intercepts get, set, and other operations`,
        explanation: 'Proxy enables meta-programming',
      },
    ],
    starterCode: `// TODO: Create a proxy that logs all property access
function createLoggedObject(target) {
  // Return a Proxy that logs when properties are accessed
  // Use 'get' trap to log property reads
  return target;
}

// TODO: Create a proxy that validates property assignments
function createValidatedObject(target, validator) {
  // Return a Proxy that validates before setting properties
  // Use 'set' trap to validate and set values
  // Throw error if validation fails
  return target;
}

// Test
const logged = createLoggedObject({ name: 'John', age: 30 });
console.log(logged.name); // Should log: "Accessing property: name"

const validated = createValidatedObject({}, (key, value) => {
  if (key === 'age' && (value < 0 || value > 150)) {
    throw new Error('Invalid age');
  }
  return true;
});

validated.age = 25; // OK
validated.age = 200; // Should throw error`,
    solution: `function createLoggedObject(target) {
  return new Proxy(target, {
    get(target, prop) {
      console.log(\`Accessing property: \${String(prop)}\`);
      return target[prop];
    }
  });
}

function createValidatedObject(target, validator) {
  return new Proxy(target, {
    set(target, prop, value) {
      if (validator(prop, value)) {
        target[prop] = value;
        return true;
      }
      throw new Error(\`Invalid value for \${String(prop)}\`);
    }
  });
}`,
    testCases: [
      {
        input: [{ name: 'John' }],
        expectedOutput: 'John',
        description: 'createLoggedObject - mock test',
      },
    ],
    hints: [
      'Proxy constructor takes target and handler object',
      'Use get trap for property access: get(target, prop)',
      'Use set trap for property assignment: set(target, prop, value)',
      'Return true from set trap to indicate success',
    ],
  },
  {
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
  };
