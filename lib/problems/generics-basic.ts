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
  id: 'generics-basic',
  title: 'Generic Functions and Types',
  difficulty: 'medium',
  category: 'TypeScript Basics',
  description: `<h2>In-Depth Explanation</h2>

<p>Generics enable writing reusable code that works with multiple types while maintaining type safety. They're like function parameters, but for types. The syntax <code>&lt;T&gt;</code> introduces a type parameter that can be used throughout the function or type.</p>

<p>Generic functions preserve type information - if you pass a <code>number[]</code>, TypeScript knows the return type is <code>number</code>, not <code>unknown</code>. This enables:</p>
<ul>
  <li><strong>Type Safety</strong>: Catch type errors at compile time</li>
  <li><strong>Code Reuse</strong>: Write once, use with any type</li>
  <li><strong>IntelliSense</strong>: Full IDE support for generic types</li>
  <li><strong>Constraints</strong>: Use <code>extends</code> to limit generic types</li>
</ul>

<p>TypeScript can often infer generic types, so you don't always need to specify them explicitly. Generics are the foundation of TypeScript's type system.</p>

<h2>Importance</h2>

<p>Generics are fundamental to TypeScript because:</p>

<ul>
  <li><strong>Type Safety</strong>: Maintain type safety in reusable code</li>
  <li><strong>Code Reuse</strong>: Write generic functions instead of type-specific duplicates</li>
  <li><strong>Library Development</strong>: Essential for building reusable libraries</li>
  <li><strong>API Design</strong>: Create flexible, type-safe APIs</li>
  <li><strong>Collections</strong>: Type-safe arrays, maps, sets, etc.</li>
  <li><strong>Framework Development</strong>: React, Vue, and other frameworks rely heavily on generics</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Generics are used everywhere in TypeScript:</p>

<ul>
  <li><strong>Array Functions</strong>: <code>map&lt;T&gt;</code>, <code>filter&lt;T&gt;</code>, <code>reduce&lt;T&gt;</code></li>
  <li><strong>API Clients</strong>: Generic API client functions</li>
  <li><strong>State Management</strong>: Generic state containers</li>
  <li><strong>React Components</strong>: Generic component props</li>
  <li><strong>Utility Types</strong>: <code>Partial&lt;T&gt;</code>, <code>Pick&lt;T&gt;</code>, <code>Omit&lt;T&gt;</code></li>
  <li><strong>Data Structures</strong>: Generic stacks, queues, trees</li>
  <li><strong>Event Handlers</strong>: Generic event handler types</li>
  <li><strong>Database ORMs</strong>: Generic query builders and models</li>
</ul>

<p><strong>Challenge:</strong> Create generic functions and types.</p>`,
  examples: [
    {
      input: `function identity<T>(arg: T): T {
  return arg;
}
const num = identity<number>(42);`,
      output: `42`,
      explanation: 'Generic function works with any type',
    },
  ],
  starterCode: `// TODO: Create generic functions
// 1. Create a generic identity function
// 2. Create a generic function to get first element of array
// 3. Create a generic Pair type

function identity<T>(arg: T): T {
  // Your code here
}

function getFirst<T>(arr: T[]): T | undefined {
  // Your code here
}

type Pair<T, U> = {
  // Your code here
};

// Test
const num = identity<number>(42);
const str = identity<string>('hello');
const first = getFirst([1, 2, 3]);
const pair: Pair<string, number> = { first: 'age', second: 30 };

console.log(num, str, first, pair);`,
  solution: `// Generic identity function
function identity<T>(arg: T): T {
  return arg;
}

// Generic function to get first element of array
function firstElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

// Generic Pair type
type Pair<T, U> = {
  first: T;
  second: U;
};

// Testable wrapper functions (TypeScript generics can't be tested at runtime)
function testIdentity(value: unknown): unknown {
  return identity(value);
}

function testFirstElement(arr: unknown[]): unknown {
  return firstElement(arr);
}

// Test
const num = identity<number>(42);
const str = identity<string>('hello');
const first = firstElement([1, 2, 3]);
const pair: Pair<string, number> = { first: 'age', second: 30 };

console.log(num, str, first, pair);`,
  testCases: [
    {
      input: [42],
      expectedOutput: 42,
      description: 'testIdentity returns the same value',
    },
    {
      input: [[1, 2, 3]],
      expectedOutput: 1,
      description: 'testFirstElement returns first array element',
    },
  ],
  hints: [
    'Use <T> syntax for generic type parameters',
    'Multiple generics: <T, U, V>',
    'TypeScript can often infer generic types',
  ],
};
