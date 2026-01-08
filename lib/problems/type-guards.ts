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
  id: 'type-guards',
  title: 'Type Guards',
  difficulty: 'medium',
  category: 'TypeScript Basics',
  description: `## In-Depth Explanation

Type guards narrow (refine) types within conditional blocks, allowing TypeScript to know the specific type after a check. Built-in guards include \`typeof\`, \`instanceof\`, and \`in\` operator.

Custom type guards use the syntax \`value is Type\` - a type predicate that tells TypeScript "if this function returns true, the value is definitely this type."

Type narrowing is essential for working with union types safely. Without narrowing, TypeScript only allows operations available on all types in the union. After narrowing, you can use type-specific operations.

## Importance

Type guards are crucial for type safety because:

- **Union Type Safety**: Safely work with union types
- **Runtime Safety**: Verify types at runtime
- **Type Narrowing**: Enable type-specific operations
- **Error Prevention**: Catch type errors before runtime
- **API Validation**: Validate API responses match expected types
- **User Input**: Safely handle unknown user input

## Usefulness & Practical Applications

Type guards are used extensively:

- **API Responses**: Validating and narrowing API response types
- **User Input**: Validating form input and user data
- **Error Handling**: Distinguishing between error types
- **State Management**: Narrowing state union types
- **Event Handling**: Narrowing event types
- **Data Parsing**: Validating parsed data
- **Type Assertions**: Safe type assertions with runtime checks
- **Discriminated Unions**: Narrowing discriminated union types

**Challenge:** Create and use type guards to narrow types.`,
  examples: [
    {
      input: `function isString(value: unknown): value is string {
  return typeof value === 'string';
}
if (isString(value)) {
  value.toUpperCase(); // TypeScript knows value is string
}`,
      output: `Narrowed type`,
      explanation: 'Type guard narrows type in if block',
    },
  ],
  starterCode: `// TODO: Create type guards
// 1. Create a type guard for User type
// 2. Use type guards to narrow types

interface User {
  name: string;
  age: number;
}

function isUser(obj: unknown): obj is User {
  // TODO: Check if obj is a User
  // Your code here
}

function processData(data: unknown) {
  // TODO: Use type guard to narrow type
  if (isUser(data)) {
    // TypeScript should know data is User here
    console.log(data.name, data.age);
  } else {
    console.log('Not a user');
  }
}

// Test
processData({ name: 'Alice', age: 30 });
processData('not a user');`,
  solution: `interface User {
  name: string;
  age: number;
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'age' in obj &&
    typeof (obj as any).name === 'string' &&
    typeof (obj as any).age === 'number'
  );
}

function processData(data: unknown) {
  if (isUser(data)) {
    console.log(data.name, data.age);
  } else {
    console.log('Not a user');
  }
}

processData({ name: 'Alice', age: 30 });
processData('not a user');`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Type guards work correctly',
    },
  ],
  hints: [
    'Type guard syntax: value is Type',
    'Use typeof, instanceof, or property checks',
    'Type guards narrow types in conditional blocks',
  ],
};
