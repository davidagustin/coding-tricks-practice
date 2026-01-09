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
  id: 'symbol-usage',
  title: 'Symbols for Unique Keys',
  difficulty: 'medium',
  category: 'Object Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>Symbols are unique, immutable primitive values that can be used as property keys. Every Symbol is unique, even if created with the same description. This makes them perfect for creating "private" properties that won't conflict with other code.</p>

<p>Key characteristics:</p>
<ul>
  <li><strong>Uniqueness</strong>: Each Symbol is unique, even with the same description</li>
  <li><strong>Privacy</strong>: Symbol properties are not enumerable (won't show in Object.keys(), for...in)</li>
  <li><strong>Well-Known Symbols</strong>: Built-in symbols like Symbol.iterator, Symbol.toStringTag for meta-programming</li>
  <li><strong>Global Registry</strong>: Symbol.for() creates shared symbols in a global registry</li>
</ul>

<p>Symbols enable:</p>
<ul>
  <li>Private properties (not truly private, but hidden from enumeration)</li>
  <li>Well-known symbols for customizing object behavior (iteration, string conversion)</li>
  <li>Avoiding property name collisions in libraries</li>
</ul>

<h2>Importance</h2>

<p>Symbols are essential for advanced JavaScript patterns because:</p>

<ul>
  <li><strong>Property Privacy</strong>: Create properties that don't appear in enumeration</li>
  <li><strong>Library Development</strong>: Avoid property name collisions in libraries</li>
  <li><strong>Meta-Programming</strong>: Well-known symbols customize object behavior</li>
  <li><strong>Iteration</strong>: Symbol.iterator enables custom iteration behavior</li>
  <li><strong>Type Safety</strong>: Symbols can be used for type branding in TypeScript</li>
  <li><strong>Framework Development</strong>: Essential for frameworks that attach metadata</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Symbols are used extensively:</p>

<ul>
  <li><strong>Private Properties</strong>: Creating "private" properties in objects</li>
  <li><strong>Library Internals</strong>: Storing internal library state without conflicts</li>
  <li><strong>Custom Iteration</strong>: Implementing Symbol.iterator for custom iterables</li>
  <li><strong>Type Branding</strong>: Creating distinct types in TypeScript</li>
  <li><strong>Metadata Storage</strong>: Storing metadata about objects</li>
  <li><strong>Framework Internals</strong>: React, Vue use symbols for internal tracking</li>
  <li><strong>Polyfills</strong>: Implementing new language features using symbols</li>
  <li><strong>Serialization</strong>: Controlling JSON.stringify behavior with Symbol.toPrimitive</li>
</ul>

<p><strong>Challenge:</strong> Use Symbols for private properties and well-known symbols.</p>`,
  examples: [
    {
      input: `const ID = Symbol('id');`,
      output: `Unique symbol that won't conflict`,
      explanation: 'Symbols are always unique, even with same description',
    },
  ],
  starterCode: `// TODO: Create a private property using Symbol
const ID = Symbol('id');

class User {
  constructor(name) {
    this.name = name;
    // TODO: Store ID privately using Symbol
    this.id = Math.random(); // Fix: use Symbol
  }

  getId() {
    // TODO: Return private ID
    return this.id;
  }
}

// TODO: Implement Symbol.iterator for custom iteration
class NumberRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  // TODO: Add [Symbol.iterator] method
}

// Test
const user = new User('John');
console.log(user.name); // 'John'
console.log(user.id); // Should be undefined (private)
console.log(user.getId()); // Should return the ID

const range = new NumberRange(1, 5);
for (const num of range) {
  console.log(num); // Should iterate 1, 2, 3, 4, 5
}`,
  solution: `// Create a private property using Symbol
const ID = Symbol('id');

class User {
  constructor(name) {
    this.name = name;
    // Store ID privately using Symbol
    this[ID] = Math.random().toString(36).substr(2, 9);
  }

  getId() {
    // Return private ID
    return this[ID];
  }
}

// Implement Symbol.iterator for custom iteration
class NumberRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
}

// Test
const user = new User('John');
console.log(user.name); // 'John'
console.log(user.id); // Should be undefined (private)
console.log(user.getId()); // Should return the ID

const range = new NumberRange(1, 5);
for (const num of range) {
  console.log(num); // Should iterate 1, 2, 3, 4, 5
}`,
  testCases: [
    {
      input: { name: 'John' },
      expectedOutput: undefined,
      description: 'User - id is undefined (private symbol property)',
    },
    {
      input: { name: 'John', checkId: true },
      expectedOutput: true,
      description: 'User - getId() returns the private ID',
    },
    {
      input: { start: 1, end: 5 },
      expectedOutput: [1, 2, 3, 4, 5],
      description: 'NumberRange - iterates from start to end inclusive',
    },
    {
      input: { start: 3, end: 6 },
      expectedOutput: [3, 4, 5, 6],
      description: 'NumberRange - works with different start/end values',
    },
  ],
  hints: [
    'Use Symbol() to create unique property keys',
    'Symbol properties: obj[symbol] = value',
    'Symbol.iterator enables for...of iteration',
  ],
};
