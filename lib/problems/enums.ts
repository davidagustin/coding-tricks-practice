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
  description: `<h2>In-Depth Explanation</h2>

<p>Enums define a set of named constants, making code more readable and maintainable. TypeScript supports numeric enums (default, auto-incrementing) and string enums (explicit string values).</p>

<p>Numeric enums auto-increment from 0, but you can set initial values. String enums require explicit values but are more readable and serialize better to JSON. Enums create both a type and a value at runtime (unlike most TypeScript types).</p>

<p>Key features:</p>
<ul>
  <li><strong>Type Safety</strong>: Prevents invalid values</li>
  <li><strong>Autocomplete</strong>: IDE support for enum values</li>
  <li><strong>Reverse Mapping</strong>: Numeric enums support reverse lookup</li>
  <li><strong>Const Enums</strong>: <code>const enum</code> for better performance (inlined at compile time)</li>
</ul>

<h2>Importance</h2>

<p>Enums are essential for type-safe constants because:</p>

<ul>
  <li><strong>Type Safety</strong>: Prevent typos and invalid values</li>
  <li><strong>Refactoring</strong>: Rename enum values safely across codebase</li>
  <li><strong>Documentation</strong>: Self-documenting code with named constants</li>
  <li><strong>IDE Support</strong>: Autocomplete and go-to-definition</li>
  <li><strong>Maintainability</strong>: Change values in one place</li>
  <li><strong>API Contracts</strong>: Type-safe API status codes and types</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Enums are used extensively:</p>

<ul>
  <li><strong>Status Codes</strong>: <code>enum Status { Pending, Approved, Rejected }</code></li>
  <li><strong>API Responses</strong>: HTTP status codes, error codes</li>
  <li><strong>State Management</strong>: Application state enums</li>
  <li><strong>Configuration</strong>: Environment types, feature flags</li>
  <li><strong>UI States</strong>: Loading, success, error states</li>
  <li><strong>Permissions</strong>: User role and permission enums</li>
  <li><strong>Directions</strong>: Navigation and direction enums</li>
  <li><strong>Event Types</strong>: Type-safe event type constants</li>
</ul>

<p><strong>Challenge:</strong> Create and use enums effectively.</p>`,
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
  solution: `// Numeric enum for Status
enum Status {
  Pending = 0,
  Approved = 1,
  Rejected = 2
}

// String enum for Direction
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

function processStatus(status: Status): string {
  switch (status) {
    case Status.Pending:
      return 'Request is pending';
    case Status.Approved:
      return 'Request has been approved';
    case Status.Rejected:
      return 'Request was rejected';
    default:
      return 'Unknown status';
  }
}

// Test
console.log(processStatus(Status.Pending)); // 'Request is pending'
console.log(processStatus(Status.Approved)); // 'Request has been approved'
console.log(Direction.Up); // 'UP'
console.log(Direction.Down); // 'DOWN'

// Numeric enum reverse mapping
console.log(Status[0]); // 'Pending'
console.log(Status.Pending); // 0`,
  testCases: [
    {
      input: 0,
      expectedOutput: 'Request is pending',
      description: 'processStatus returns correct message for Pending status',
    },
    {
      input: 1,
      expectedOutput: 'Request has been approved',
      description: 'processStatus returns correct message for Approved status',
    },
    {
      input: 2,
      expectedOutput: 'Request was rejected',
      description: 'processStatus returns correct message for Rejected status',
    },
    {
      input: 'Direction.Up',
      expectedOutput: 'UP',
      description: 'String enum Direction.Up has value UP',
    },
  ],
  hints: [
    'Numeric enums auto-increment from 0',
    'String enums must have explicit values',
    'Enums compile to JavaScript objects',
  ],
};
