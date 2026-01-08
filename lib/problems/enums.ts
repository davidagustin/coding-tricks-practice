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
    id: 'enums',
    title: 'Enums',
    difficulty: 'easy',
    category: 'TypeScript Basics',
    description: `## In-Depth Explanation

Enums define a set of named constants, making code more readable and maintainable. TypeScript supports numeric enums (default, auto-incrementing) and string enums (explicit string values).

Numeric enums auto-increment from 0, but you can set initial values. String enums require explicit values but are more readable and serialize better to JSON. Enums create both a type and a value at runtime (unlike most TypeScript types).

Key features:
- **Type Safety**: Prevents invalid values
- **Autocomplete**: IDE support for enum values
- **Reverse Mapping**: Numeric enums support reverse lookup
- **Const Enums**: \`const enum\` for better performance (inlined at compile time)

## Importance

Enums are essential for type-safe constants because:

- **Type Safety**: Prevent typos and invalid values
- **Refactoring**: Rename enum values safely across codebase
- **Documentation**: Self-documenting code with named constants
- **IDE Support**: Autocomplete and go-to-definition
- **Maintainability**: Change values in one place
- **API Contracts**: Type-safe API status codes and types

## Usefulness & Practical Applications

Enums are used extensively:

- **Status Codes**: \`enum Status { Pending, Approved, Rejected }\`
- **API Responses**: HTTP status codes, error codes
- **State Management**: Application state enums
- **Configuration**: Environment types, feature flags
- **UI States**: Loading, success, error states
- **Permissions**: User role and permission enums
- **Directions**: Navigation and direction enums
- **Event Types**: Type-safe event type constants

**Challenge:** Create and use enums effectively.`,
    examples: [
      {
        input: `enum Status {
  Pending,
  Approved,
  Rejected
}
const status: Status = Status.Pending;`,
        output: `Type-safe constants`,
        explanation: 'Enums provide named constants',
      },
    ],
    starterCode: `// TODO: Create enums
// 1. Create a numeric enum for Status
// 2. Create a string enum for Direction
// 3. Use enums in functions

enum Status {
  // Your code here
}

enum Direction {
  // Your code here (string enum)
}

function processStatus(status: Status) {
  // TODO: Use enum in switch statement
  // Your code here
}

// Test
console.log(processStatus(Status.Pending));
console.log(Direction.Up);`,
    solution: `enum Status {
  Pending,
  Approved,
  Rejected
}

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

function processStatus(status: Status) {
  switch (status) {
    case Status.Pending:
      return 'Processing...';
    case Status.Approved:
      return 'Approved!';
    case Status.Rejected:
      return 'Rejected.';
    default:
      return 'Unknown';
  }
}

console.log(processStatus(Status.Pending));
console.log(Direction.Up);`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Enums work correctly',
      },
    ],
    hints: [
      'Numeric enums auto-increment from 0',
      'String enums must have explicit values',
      'Enums compile to JavaScript objects',
    ],
  };
