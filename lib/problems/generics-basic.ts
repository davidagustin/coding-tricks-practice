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
    description: `## In-Depth Explanation

Generics enable writing reusable code that works with multiple types while maintaining type safety. They're like function parameters, but for types. The syntax \`<T>\` introduces a type parameter that can be used throughout the function or type.

Generic functions preserve type information - if you pass a \`number[]\`, TypeScript knows the return type is \`number\`, not \`unknown\`. This enables:
- **Type Safety**: Catch type errors at compile time
- **Code Reuse**: Write once, use with any type
- **IntelliSense**: Full IDE support for generic types
- **Constraints**: Use \`extends\` to limit generic types

TypeScript can often infer generic types, so you don't always need to specify them explicitly. Generics are the foundation of TypeScript's type system.

## Importance

Generics are fundamental to TypeScript because:

- **Type Safety**: Maintain type safety in reusable code
- **Code Reuse**: Write generic functions instead of type-specific duplicates
- **Library Development**: Essential for building reusable libraries
- **API Design**: Create flexible, type-safe APIs
- **Collections**: Type-safe arrays, maps, sets, etc.
- **Framework Development**: React, Vue, and other frameworks rely heavily on generics

## Usefulness & Practical Applications

Generics are used everywhere in TypeScript:

- **Array Functions**: \`map<T>\`, \`filter<T>\`, \`reduce<T>\`
- **API Clients**: Generic API client functions
- **State Management**: Generic state containers
- **React Components**: Generic component props
- **Utility Types**: \`Partial<T>\`, \`Pick<T>\`, \`Omit<T>\`
- **Data Structures**: Generic stacks, queues, trees
- **Event Handlers**: Generic event handler types
- **Database ORMs**: Generic query builders and models

**Challenge:** Create generic functions and types.`,
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
    solution: `function identity<T>(arg: T): T {
  return arg;
}

function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

type Pair<T, U> = {
  first: T;
  second: U;
};

const num = identity<number>(42);
const str = identity<string>('hello');
const first = getFirst([1, 2, 3]);
const pair: Pair<string, number> = { first: 'age', second: 30 };

console.log(num, str, first, pair);`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Generics work correctly',
      },
    ],
    hints: [
      'Use <T> syntax for generic type parameters',
      'Multiple generics: <T, U, V>',
      'TypeScript can often infer generic types',
    ],
  };