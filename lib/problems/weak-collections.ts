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
  id: 'weak-collections',
  title: 'WeakMap and WeakSet',
  difficulty: 'medium',
  category: 'JavaScript Advanced',
  description: `## In-Depth Explanation

WeakMap and WeakSet are collections with "weak" references to their keys/elements. Unlike Map and Set, they don't prevent garbage collection of their keys/elements. When an object used as a key is garbage collected, the entry is automatically removed.

Key characteristics:
- **Weak References**: Don't prevent garbage collection
- **Object Keys Only**: Keys must be objects (not primitives)
- **No Iteration**: Cannot iterate over entries (no size, keys, values, entries)
- **Automatic Cleanup**: Entries removed when key is garbage collected

This makes them perfect for:
- **Private Data**: Store private data associated with objects
- **Metadata**: Store metadata without preventing GC
- **Caching**: Cache computed values without memory leaks
- **Event Handlers**: Store event handlers without preventing GC

## Importance

Weak collections are essential for memory management because:

- **Memory Efficiency**: Don't prevent garbage collection of keys
- **No Memory Leaks**: Automatic cleanup prevents memory leaks
- **Private Data**: Store private data without exposing it
- **Metadata Storage**: Store metadata without memory concerns
- **Library Development**: Essential for libraries that attach data to user objects
- **Performance**: Better memory usage in long-running applications

## Usefulness & Practical Applications

Weak collections are used extensively:

- **Private Properties**: Implementing private properties in classes
- **Metadata Storage**: Storing metadata about DOM elements or objects
- **Caching**: Caching computed values without preventing GC
- **Event Handlers**: Storing event handlers without memory leaks
- **Library Internals**: Libraries storing internal data about user objects
- **DOM Manipulation**: Storing data about DOM nodes
- **Object Tracking**: Tracking visited objects without preventing GC
- **Memoization**: Memoizing without preventing object collection

**Challenge:** Implement private data and caching with WeakMap.`,
  examples: [
    {
      input: `const privateData = new WeakMap();`,
      output: `Store private data associated with objects`,
      explanation: "Data is GC'd when object is GC'd",
    },
  ],
  starterCode: `// TODO: Implement private data storage using WeakMap
const privateData = new WeakMap();

class User {
  constructor(name, password) {
    // TODO: Store password privately using WeakMap
    // Public property
    this.name = name;
    // Private (should use WeakMap)
    this.password = password; // Fix: make private
  }

  checkPassword(password) {
    // TODO: Check against private password
    return this.password === password;
  }
}

// TODO: Create a memoize function using WeakMap for object arguments
function memoizeByObject(fn) {
  // Cache results by object reference
  // WeakMap allows garbage collection of unused cache entries
  return fn;
}

// Test
const user = new User('John', 'secret123');
console.log(user.name); // 'John'
console.log(user.password); // Should be undefined (private)
console.log(user.checkPassword('secret123')); // true
console.log(user.checkPassword('wrong')); // false`,
  solution: `const privateData = new WeakMap();

class User {
  constructor(name, password) {
    this.name = name;
    privateData.set(this, { password });
  }

  checkPassword(password) {
    const data = privateData.get(this);
    return data && data.password === password;
  }
}

function memoizeByObject(fn) {
  const cache = new WeakMap();
  return function(obj) {
    if (cache.has(obj)) {
      return cache.get(obj);
    }
    const result = fn(obj);
    cache.set(obj, result);
    return result;
  };
}`,
  testCases: [
    {
      input: ['secret123'],
      expectedOutput: true,
      description: 'checkPassword correct',
    },
    {
      input: ['wrong'],
      expectedOutput: false,
      description: 'checkPassword wrong',
    },
  ],
  hints: [
    'WeakMap.set(key, value), .get(key), .has(key)',
    'Keys must be objects, not primitives',
    'Perfect for associating private data with instances',
  ],
};
