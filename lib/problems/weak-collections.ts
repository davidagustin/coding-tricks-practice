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
  description: `<h2>In-Depth Explanation</h2>

<p>WeakMap and WeakSet are collections with "weak" references to their keys/elements. Unlike Map and Set, they don't prevent garbage collection of their keys/elements. When an object used as a key is garbage collected, the entry is automatically removed.</p>

<p>Key characteristics:</p>
<ul>
  <li><strong>Weak References</strong>: Don't prevent garbage collection</li>
  <li><strong>Object Keys Only</strong>: Keys must be objects (not primitives)</li>
  <li><strong>No Iteration</strong>: Cannot iterate over entries (no size, keys, values, entries)</li>
  <li><strong>Automatic Cleanup</strong>: Entries removed when key is garbage collected</li>
</ul>

<p>This makes them perfect for:</p>
<ul>
  <li><strong>Private Data</strong>: Store private data associated with objects</li>
  <li><strong>Metadata</strong>: Store metadata without preventing GC</li>
  <li><strong>Caching</strong>: Cache computed values without memory leaks</li>
  <li><strong>Event Handlers</strong>: Store event handlers without preventing GC</li>
</ul>

<h2>Importance</h2>

<p>Weak collections are essential for memory management because:</p>

<ul>
  <li><strong>Memory Efficiency</strong>: Don't prevent garbage collection of keys</li>
  <li><strong>No Memory Leaks</strong>: Automatic cleanup prevents memory leaks</li>
  <li><strong>Private Data</strong>: Store private data without exposing it</li>
  <li><strong>Metadata Storage</strong>: Store metadata without memory concerns</li>
  <li><strong>Library Development</strong>: Essential for libraries that attach data to user objects</li>
  <li><strong>Performance</strong>: Better memory usage in long-running applications</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Weak collections are used extensively:</p>

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

<p><strong>Challenge:</strong> Implement private data and caching with WeakMap.</p>`,
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
  solution: `// Use WeakMap to store private data
class User {
  private static privateData = new WeakMap<User, { password: string }>();
  
  constructor(public name: string, password: string) {
    // Store password in WeakMap
    User.privateData.set(this, { password });
  }
  
  checkPassword(password) {
    // Check against private password
    const data = User.privateData.get(this);
    return data ? data.password === password : false;
  }
}

// Create a memoize function using WeakMap for object arguments
function memoizeByObject(fn) {
  // Cache results by object reference
  // WeakMap allows garbage collection of unused cache entries
  const cache = new WeakMap();
  return function(obj, ...args) {
    if (cache.has(obj)) {
      return cache.get(obj);
    }
    const result = fn(obj, ...args);
    cache.set(obj, result);
    return result;
  };
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'WeakMap.set(key, value), .get(key), .has(key)',
    'Keys must be objects, not primitives',
    'Perfect for associating private data with instances',
  ],
};
