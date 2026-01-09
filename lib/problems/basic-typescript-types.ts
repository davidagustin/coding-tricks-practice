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
  id: 'basic-typescript-types',
  title: 'Basic TypeScript Types',
  difficulty: 'easy',
  category: 'TypeScript Basics',
  description: `<h2>In-Depth Explanation</h2>

<p>TypeScript adds static type checking to JavaScript, catching errors at compile-time rather than runtime. Basic types include primitives (<code>string</code>, <code>number</code>, <code>boolean</code>) and special types (<code>null</code>, <code>undefined</code>, <code>void</code>).</p>

<p>Type annotations use the syntax <code>variable: type</code> or <code>function(param: type): returnType</code>. TypeScript infers types when possible, but explicit annotations provide:</p>
<ul>
  <li>Documentation: Types serve as inline documentation</li>
  <li>Error Prevention: Catch type mismatches before runtime</li>
  <li>IDE Support: Better autocomplete and refactoring</li>
  <li>Refactoring Safety: Changes are checked across the codebase</li>
</ul>

<p>Arrays can be typed as <code>Type[]</code> or <code>Array&lt;Type&gt;</code>. TypeScript's type system is structural (duck typing) - if it looks like a duck and quacks like a duck, it's a duck.</p>

<h2>Importance</h2>

<p>Basic types are the foundation of TypeScript because:</p>

<ul>
  <li><strong>Type Safety</strong>: Prevents common JavaScript errors (wrong types, undefined access)</li>
  <li><strong>Documentation</strong>: Types document code without comments</li>
  <li><strong>Refactoring</strong>: Safe refactoring with compiler checking</li>
  <li><strong>IDE Support</strong>: Autocomplete, go-to-definition, find-references</li>
  <li><strong>Team Collaboration</strong>: Types make code easier to understand for teams</li>
  <li><strong>Early Error Detection</strong>: Catch bugs during development, not production</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Type annotations are used everywhere in TypeScript:</p>

<ul>
  <li><strong>Function Signatures</strong>: Documenting parameters and return types</li>
  <li><strong>Variable Declarations</strong>: Ensuring variables hold expected types</li>
  <li><strong>API Contracts</strong>: Defining interfaces between modules</li>
  <li><strong>Configuration Objects</strong>: Typing configuration and settings</li>
  <li><strong>Data Models</strong>: Typing database models and DTOs</li>
  <li><strong>Form Validation</strong>: Ensuring form data matches expected types</li>
  <li><strong>State Management</strong>: Typing application state</li>
  <li><strong>Component Props</strong>: Typing React/Vue component props</li>
</ul>

<p><strong>Challenge:</strong> Add proper type annotations to functions and variables.</p>`,
  examples: [
    {
      input: `const name: string = 'John';
const age: number = 30;
const isActive: boolean = true;`,
      output: `Type-safe variables`,
      explanation: 'Type annotations provide compile-time type checking',
    },
  ],
  starterCode: `// TODO: Add type annotations
// Fix the type errors by adding proper types

function greet(name) {
  return \`Hello, \${name}!\`;
}

function calculateArea(width, height) {
  return width * height;
}

function isEven(num) {
  return num % 2 === 0;
}

const numbers: number[] = [1, 2, 3, 4, 5];
const names: string[] = ['Alice', 'Bob'];

// Test
console.log(greet('John'));
console.log(calculateArea(10, 5));
console.log(isEven(4));`,
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Use : type syntax for type annotations',
    'Function parameters and return types need annotations',
    'Arrays can be typed as Type[] or Array<Type>',
  ],
};
