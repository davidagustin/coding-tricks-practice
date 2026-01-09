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
  description: `<h2>In-Depth Explanation</h2>

<p><code>WeakMap</code> and <code>WeakSet</code> are collections with "weak" references to their keys/elements. Unlike <code>Map</code> and <code>Set</code>, they don't prevent garbage collection of their keys/elements. When an object used as a key is garbage collected, the entry is automatically removed.</p>

<p>Key characteristics:</p>
<ul>
  <li><strong>Weak References</strong>: Don't prevent garbage collection</li>
  <li><strong>Object Keys Only</strong>: Keys must be objects (not primitives)</li>
  <li><strong>No Iteration</strong>: Cannot iterate over entries (no size, keys, values, entries)</li>
  <li><strong>Automatic Cleanup</strong>: Entries removed when key is garbage collected</li>
</ul>

<p>This makes them perfect for storing metadata about objects without preventing those objects from being garbage collected.</p>

<h2>Importance</h2>

<p>Weak collections are essential for memory management because:</p>

<ul>
  <li><strong>Memory Efficiency</strong>: Don't prevent garbage collection of keys</li>
  <li><strong>Private Data</strong>: Store private data associated with objects</li>
  <li><strong>Metadata Storage</strong>: Store metadata without memory leaks</li>
  <li><strong>Circular Reference Prevention</strong>: Avoid memory leaks from circular references</li>
  <li><strong>Library Development</strong>: Essential for libraries that attach data to user objects</li>
  <li><strong>Performance</strong>: Better memory usage in long-running applications</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Weak collections are used in many scenarios:</p>

<ul>
  <li><strong>Private Properties</strong>: Implementing private properties in classes</li>
  <li><strong>Metadata Storage</strong>: Storing metadata about DOM elements or objects</li>
  <li><strong>Caching</strong>: Caching computed values without preventing GC</li>
  <li><strong>Event Handlers</strong>: Storing event handlers without memory leaks</li>
  <li><strong>Library Internals</strong>: Libraries storing internal data about user objects</li>
  <li><strong>DOM Manipulation</strong>: Storing data about DOM nodes</li>
  <li><strong>Object Tracking</strong>: Tracking visited objects without preventing GC</li>
  <li><strong>Memoization</strong>: Memoizing without preventing object collection</li>
</ul>

<p><strong>Challenge:</strong> Use WeakMap to store private data and WeakSet to track visited objects.</p>`,
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
  solution: `// Use WeakMap to store private data
class User {
  private static privateData = new WeakMap<User, { privateId: string }>();
  
  constructor(public name: string) {}
  
  setPrivateId(id: string) {
    // Store private ID in WeakMap
    User.privateData.set(this, { privateId: id });
  }
  
  getPrivateId(): string | undefined {
    // Retrieve private ID from WeakMap
    const data = User.privateData.get(this);
    return data ? data.privateId : undefined;
  }
}

// Use WeakSet to track visited objects
function markVisited(obj, visited) {
  // Add object to WeakSet
  visited.add(obj);
}

function isVisited(obj, visited) {
  // Check if object is in WeakSet
  return visited.has(obj);
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'WeakMap keys must be objects (not primitives)',
    'WeakMap/WeakSet allow garbage collection when key is no longer referenced',
    'Useful for private data, metadata, or tracking without memory leaks',
  ],
};
