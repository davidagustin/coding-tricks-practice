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
  solution: `// 1. Generic identity function - returns whatever is passed in
function identity<T>(arg: T): T {
  return arg;
}

// 2. Generic function to get first element of array
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 3. Generic Pair type with two different type parameters
type Pair<T, U> = {
  first: T;
  second: U;
};

// Additional: Generic function to swap pair values
function swapPair<T, U>(pair: Pair<T, U>): Pair<U, T> {
  return { first: pair.second, second: pair.first };
}

// Additional: Generic function with constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Test
const num = identity<number>(42);        // 42
const str = identity<string>('hello');   // 'hello'
const inferred = identity(true);         // TypeScript infers boolean

const first = getFirst([1, 2, 3]);       // 1 (type: number | undefined)
const firstStr = getFirst(['a', 'b']);   // 'a' (type: string | undefined)
const empty = getFirst([]);              // undefined

const pair: Pair<string, number> = { first: 'age', second: 30 };
const swapped = swapPair(pair);          // { first: 30, second: 'age' }

console.log(num, str, first, pair);`,
  testCases: [
    {
      input: { function: 'identity', arg: 42 },
      expectedOutput: 42,
      description: 'identity(42) should return 42',
    },
    {
      input: { function: 'identity', arg: 'hello' },
      expectedOutput: 'hello',
      description: 'identity("hello") should return "hello"',
    },
    {
      input: { function: 'getFirst', arr: [1, 2, 3] },
      expectedOutput: 1,
      description: 'getFirst([1, 2, 3]) should return 1',
    },
    {
      input: { function: 'getFirst', arr: [] },
      expectedOutput: undefined,
      description: 'getFirst([]) should return undefined',
    },
    {
      input: { type: 'Pair', first: 'age', second: 30 },
      expectedOutput: { first: 'age', second: 30 },
      description: 'Pair<string, number> should have correct structure',
    },
    {
      input: { function: 'swapPair', pair: { first: 'name', second: 42 } },
      expectedOutput: { first: 42, second: 'name' },
      description: 'swapPair should swap first and second values',
    },
  ],
  hints: [
    'Use <T> syntax for generic type parameters',
    'Multiple generics: <T, U, V>',
    'TypeScript can often infer generic types',
  ],
};
