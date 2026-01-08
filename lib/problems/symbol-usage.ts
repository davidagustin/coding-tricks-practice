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
  solution: `const ID = Symbol('id');

class User {
  constructor(name) {
    this.name = name;
    this[ID] = Math.random();
  }

  getId() {
    return this[ID];
  }
}

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
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Symbol usage works',
    },
  ],
  hints: [
    'Use Symbol() to create unique property keys',
    'Symbol properties: obj[symbol] = value',
    'Symbol.iterator enables for...of iteration',
  ],
};
