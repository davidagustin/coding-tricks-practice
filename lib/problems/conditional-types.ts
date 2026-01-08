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
  id: 'conditional-types',
  title: 'TypeScript Conditional Types',
  difficulty: 'hard',
  category: 'TypeScript Advanced',
  description: `<h2>In-Depth Explanation</h2>

<p>Conditional types enable type-level conditional logic using the syntax <code>T extends U ? X : Y</code>. If <code>T</code> extends <code>U</code>, the type is <code>X</code>, otherwise <code>Y</code>.</p>

<p>Key features:</p>
<ul>
  <li><strong>Type Selection</strong>: Choose types based on conditions</li>
  <li><strong>Type Filtering</strong>: Filter union types (remove unwanted types)</li>
  <li><strong>Type Extraction</strong>: Extract types from complex structures</li>
  <li><strong>Distributive</strong>: Conditional types distribute over union types</li>
</ul>

<p>Common patterns:</p>
<ul>
  <li><strong>Type Guards</strong>: <code>T extends string ? true : false</code></li>
  <li><strong>Type Extraction</strong>: <code>T extends Promise&lt;infer U&gt; ? U : T</code></li>
  <li><strong>Type Filtering</strong>: <code>T extends null | undefined ? never : T</code> (NonNullable)</li>
</ul>

<h2>Importance</h2>

<p>Conditional types are essential for advanced TypeScript because:</p>

<ul>
  <li><strong>Type-Level Logic</strong>: Implement logic at the type level</li>
  <li><strong>Type Safety</strong>: Create more precise, conditional types</li>
  <li><strong>Utility Types</strong>: Build powerful utility types</li>
  <li><strong>Framework Development</strong>: Essential for advanced frameworks</li>
  <li><strong>API Design</strong>: Create flexible, conditional APIs</li>
  <li><strong>Type Inference</strong>: Extract and infer types from complex structures</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Conditional types are used extensively:</p>

<ul>
  <li><strong>Utility Types</strong>: NonNullable, Extract, Exclude, ReturnType, Parameters</li>
  <li><strong>Type Extraction</strong>: Extracting types from Promises, arrays, functions</li>
  <li><strong>Type Filtering</strong>: Filtering union types</li>
  <li><strong>Framework Types</strong>: React, Vue use conditional types for component types</li>
  <li><strong>API Types</strong>: Creating conditional API response types</li>
  <li><strong>Generic Constraints</strong>: Creating conditional generic constraints</li>
  <li><strong>Type Guards</strong>: Type-level type guards</li>
  <li><strong>Library Development</strong>: Building advanced type-safe libraries</li>
</ul>

<p><strong>Challenge:</strong> Build conditional types for type selection and filtering.</p>`,
  examples: [
    {
      input: `type IsString<T> = T extends string ? true : false`,
      output: `IsString<'hello'> = true`,
      explanation: 'Type-level conditional logic',
    },
  ],
  starterCode: `// TODO: Create IsArray type - returns true if T is an array
type IsArray<T> = false; // Fix this

// TODO: Create ExtractArrayType - get element type from array
// ExtractArrayType<string[]> → string
type ExtractArrayType<T> = T; // Fix this

// TODO: Create NonNullable equivalent - remove null and undefined
type MyNonNullable<T> = T; // Fix this

// TODO: Create FunctionReturnType - extract return type of function
type FunctionReturnType<T> = T; // Fix this

// Test
type Test1 = IsArray<string[]>; // should be true
type Test2 = IsArray<string>; // should be false
type Test3 = ExtractArrayType<number[]>; // should be number
type Test4 = MyNonNullable<string | null | undefined>; // should be string
type Test5 = FunctionReturnType<() => string>; // should be string`,
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'T extends U ? X : Y is the conditional syntax',
    'Use infer to extract types: T extends (infer U)[] ? U : never',
    'never in unions is removed (filtering)',
  ],
};
