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
};
