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
    description: `## In-Depth Explanation

The \`infer\` keyword allows you to extract types from complex type structures within conditional types. It creates a type variable that captures the type at a specific position.

The pattern: \`T extends SomePattern<infer U> ? U : never\`
- \`infer U\` captures the type at that position
- If \`T\` matches the pattern, \`U\` is the extracted type
- Otherwise, the type is \`never\`

Common extractions:
- **Return Types**: \`T extends (...args: any[]) => infer R ? R : never\`
- **Parameter Types**: \`T extends (arg: infer P) => any ? P : never\`
- **Promise Types**: \`T extends Promise<infer U> ? U : T\`
- **Array Types**: \`T extends (infer U)[] ? U : never\`

## Importance

The infer keyword is essential for type extraction because:

- **Type Extraction**: Extract types from complex structures
- **Utility Types**: Build utility types like ReturnType, Parameters
- **Type Inference**: Infer types from function signatures
- **Framework Development**: Essential for advanced type systems
- **API Types**: Extract types from API response types
- **Generic Programming**: Advanced generic type programming

## Usefulness & Practical Applications

The infer keyword is used extensively:

- **Utility Types**: ReturnType, Parameters, ConstructorParameters, InstanceType
- **Promise Unwrapping**: Unwrapping Promise types
- **Function Types**: Extracting function parameter and return types
- **React Types**: Extracting component prop types
- **API Types**: Extracting types from API response types
- **Generic Libraries**: Building generic type utilities
- **Type Utilities**: Creating reusable type utilities
- **Framework Internals**: Used internally by TypeScript and frameworks

**Challenge:** Use infer to extract types from functions, promises, and more.`,
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
    solution: `type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type FirstParameter<T> = T extends (first: infer F, ...args: any[]) => any ? F : never;

type LastParameter<T> = T extends (...args: [...any[], infer L]) => any ? L : never;

type MyConstructorParameters<T> = T extends new (...args: infer P) => any ? P : never;`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type checking only',
      },
    ],
    hints: [
      'infer U captures the type in that position',
      'Use pattern matching: Promise<infer U>, (infer P) => R',
      'For constructors: new (...args: infer P) => any',
    ],
  };
