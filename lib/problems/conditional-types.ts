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
  description: `## In-Depth Explanation

Conditional types enable type-level conditional logic using the syntax \`T extends U ? X : Y\`. If \`T\` extends \`U\`, the type is \`X\`, otherwise \`Y\`.

Key features:
- **Type Selection**: Choose types based on conditions
- **Type Filtering**: Filter union types (remove unwanted types)
- **Type Extraction**: Extract types from complex structures
- **Distributive**: Conditional types distribute over union types

Common patterns:
- **Type Guards**: \`T extends string ? true : false\`
- **Type Extraction**: \`T extends Promise<infer U> ? U : T\`
- **Type Filtering**: \`T extends null | undefined ? never : T\` (NonNullable)

## Importance

Conditional types are essential for advanced TypeScript because:

- **Type-Level Logic**: Implement logic at the type level
- **Type Safety**: Create more precise, conditional types
- **Utility Types**: Build powerful utility types
- **Framework Development**: Essential for advanced frameworks
- **API Design**: Create flexible, conditional APIs
- **Type Inference**: Extract and infer types from complex structures

## Usefulness & Practical Applications

Conditional types are used extensively:

- **Utility Types**: NonNullable, Extract, Exclude, ReturnType, Parameters
- **Type Extraction**: Extracting types from Promises, arrays, functions
- **Type Filtering**: Filtering union types
- **Framework Types**: React, Vue use conditional types for component types
- **API Types**: Creating conditional API response types
- **Generic Constraints**: Creating conditional generic constraints
- **Type Guards**: Type-level type guards
- **Library Development**: Building advanced type-safe libraries

**Challenge:** Build conditional types for type selection and filtering.`,
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
  solution: `type IsArray<T> = T extends any[] ? true : false;

type ExtractArrayType<T> = T extends (infer U)[] ? U : never;

type MyNonNullable<T> = T extends null | undefined ? never : T;

type FunctionReturnType<T> = T extends (...args: any[]) => infer R ? R : never;`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Type checking only',
    },
  ],
  hints: [
    'T extends U ? X : Y is the conditional syntax',
    'Use infer to extract types: T extends (infer U)[] ? U : never',
    'never in unions is removed (filtering)',
  ],
};
