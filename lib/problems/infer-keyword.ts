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
  id: 'infer-keyword',
  title: 'TypeScript Infer Keyword',
  difficulty: 'hard',
  category: 'TypeScript Advanced',
  description: `<h2>In-Depth Explanation</h2>

<p>The <code>infer</code> keyword allows you to extract types from complex type structures within conditional types. It creates a type variable that captures the type at a specific position.</p>

<p>The pattern: <code>T extends SomePattern&lt;infer U&gt; ? U : never</code></p>
<ul>
  <li><code>infer U</code> captures the type at that position</li>
  <li>If <code>T</code> matches the pattern, <code>U</code> is the extracted type</li>
  <li>Otherwise, the type is <code>never</code></li>
</ul>

<p>Common extractions:</p>
<ul>
  <li><strong>Return Types</strong>: <code>T extends (...args: any[]) => infer R ? R : never</code></li>
  <li><strong>Parameter Types</strong>: <code>T extends (arg: infer P) => any ? P : never</code></li>
  <li><strong>Promise Types</strong>: <code>T extends Promise&lt;infer U&gt; ? U : T</code></li>
  <li><strong>Array Types</strong>: <code>T extends (infer U)[] ? U : never</code></li>
</ul>

<h2>Importance</h2>

<p>The infer keyword is essential for type extraction because:</p>

<ul>
  <li><strong>Type Extraction</strong>: Extract types from complex structures</li>
  <li><strong>Utility Types</strong>: Build utility types like ReturnType, Parameters</li>
  <li><strong>Type Inference</strong>: Infer types from function signatures</li>
  <li><strong>Framework Development</strong>: Essential for advanced type systems</li>
  <li><strong>API Types</strong>: Extract types from API response types</li>
  <li><strong>Generic Programming</strong>: Advanced generic type programming</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>The infer keyword is used extensively:</p>

<ul>
  <li><strong>Utility Types</strong>: ReturnType, Parameters, ConstructorParameters, InstanceType</li>
  <li><strong>Promise Unwrapping</strong>: Unwrapping Promise types</li>
  <li><strong>Function Types</strong>: Extracting function parameter and return types</li>
  <li><strong>React Types</strong>: Extracting component prop types</li>
  <li><strong>API Types</strong>: Extracting types from API response types</li>
  <li><strong>Generic Libraries</strong>: Building generic type utilities</li>
  <li><strong>Type Utilities</strong>: Creating reusable type utilities</li>
  <li><strong>Framework Internals</strong>: Used internally by TypeScript and frameworks</li>
</ul>

<p><strong>Challenge:</strong> Use infer to extract types from functions, promises, and more.</p>`,
  examples: [
    {
      input: `type Unwrap<T> = T extends Promise<infer U> ? U : T`,
      output: `Unwrap<Promise<string>> = string`,
      explanation: 'Extract inner type from Promise',
    },
  ],
  starterCode: `// TODO: Create UnwrapPromise - extract type from Promise
// UnwrapPromise<Promise<string>> → string
type UnwrapPromise<T> = T; // Fix this

// TODO: Create FirstParameter - get first parameter type of function
// FirstParameter<(a: string, b: number) => void> → string
type FirstParameter<T> = unknown; // Fix this

// TODO: Create LastParameter - get last parameter type
// Hint: Use rest parameters (...args: infer R)
type LastParameter<T> = unknown; // Fix this

// TODO: Create ConstructorParameters - get constructor parameter types
type MyConstructorParameters<T> = unknown; // Fix this

// Test
type Test1 = UnwrapPromise<Promise<number>>; // number
type Test2 = FirstParameter<(a: string, b: number) => void>; // string
type Fn = (a: number, b: string, c: boolean) => void;
type Test3 = LastParameter<Fn>; // boolean

class MyClass {
  constructor(name: string, age: number) {}
}
type Test4 = MyConstructorParameters<typeof MyClass>; // [string, number]`,
  solution: `// UnwrapPromise - extract type from Promise
// UnwrapPromise<Promise<string>> -> string
// If not a Promise, return the type as-is
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// FirstParameter - get first parameter type of function
// FirstParameter<(a: string, b: number) => void> -> string
type FirstParameter<T> = T extends (first: infer F, ...rest: any[]) => any ? F : never;

// LastParameter - get last parameter type
// Uses rest parameters to capture all args, then extracts the last
type LastParameter<T> = T extends (...args: [...any[], infer L]) => any ? L : never;

// MyConstructorParameters - get constructor parameter types as a tuple
type MyConstructorParameters<T> = T extends new (...args: infer P) => any ? P : never;

// Additional useful infer patterns:

// Get return type of a function
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Get element type of array
type ArrayElement<T> = T extends (infer E)[] ? E : never;

// Deeply unwrap nested Promises
type DeepUnwrap<T> = T extends Promise<infer U> ? DeepUnwrap<U> : T;

// Test
type Test1 = UnwrapPromise<Promise<number>>; // number
type Test2 = UnwrapPromise<string>; // string (not a promise, returns as-is)

type Test3 = FirstParameter<(a: string, b: number) => void>; // string

type Fn = (a: number, b: string, c: boolean) => void;
type Test4 = LastParameter<Fn>; // boolean

class MyClass {
  constructor(name: string, age: number) {}
}
type Test5 = MyConstructorParameters<typeof MyClass>; // [string, number]

// Verify types work correctly
const t1: Test1 = 42;
const t2: Test2 = 'hello';
const t3: Test3 = 'test';
const t4: Test4 = true;`,
  testCases: [
    {
      input: { type: 'UnwrapPromise<Promise<number>>' },
      expectedOutput: 'number',
      description: 'UnwrapPromise should extract number from Promise<number>',
    },
    {
      input: { type: 'UnwrapPromise<string>' },
      expectedOutput: 'string',
      description: 'UnwrapPromise should return string as-is when not a Promise',
    },
    {
      input: { type: 'FirstParameter<(a: string, b: number) => void>' },
      expectedOutput: 'string',
      description: 'FirstParameter should extract first parameter type',
    },
    {
      input: { type: 'LastParameter<(a: number, b: string, c: boolean) => void>' },
      expectedOutput: 'boolean',
      description: 'LastParameter should extract last parameter type',
    },
    {
      input: { type: 'MyConstructorParameters<typeof MyClass>' },
      expectedOutput: '[string, number]',
      description: 'MyConstructorParameters should extract constructor parameter tuple',
    },
    {
      input: { type: 'DeepUnwrap<Promise<Promise<string>>>' },
      expectedOutput: 'string',
      description: 'DeepUnwrap should recursively unwrap nested Promises',
    },
  ],
  hints: [
    'infer U captures the type in that position',
    'Use pattern matching: Promise<infer U>, (infer P) => R',
    'For constructors: new (...args: infer P) => any',
  ],
};
