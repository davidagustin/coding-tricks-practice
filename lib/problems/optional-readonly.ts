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
    id: 'optional-readonly',
    title: 'Optional and Readonly Properties',
    difficulty: 'easy',
    category: 'TypeScript Basics',
    description: `## In-Depth Explanation

TypeScript provides property modifiers to control object property behavior:
- **Optional (\`?\`)**: Property may not exist - \`prop?: type\`
- **Readonly**: Property cannot be reassigned after initialization - \`readonly prop: type\`

Optional properties are useful for:
- Configuration objects where some properties have defaults
- API responses where fields may be missing
- Function parameters that have defaults

Readonly properties ensure immutability:
- Prevent accidental mutations
- Make intent clear (this shouldn't change)
- Work with \`const\` assertions for deep immutability
- Important for functional programming patterns

## Importance

These modifiers are essential for type safety because:

- **Optional Properties**: Model real-world data where fields may be missing
- **Immutability**: Prevent bugs from accidental mutations
- **API Contracts**: Accurately model API responses
- **Configuration**: Type configuration objects with optional fields
- **Functional Programming**: Support immutable data patterns
- **Code Clarity**: Make intent explicit in type definitions

## Usefulness & Practical Applications

These modifiers are used everywhere:

- **API Responses**: Optional fields that may not be present
- **Configuration Objects**: Optional settings with defaults
- **Form Data**: Optional form fields
- **Database Models**: Optional nullable fields
- **Immutable State**: Readonly properties in state management
- **Constants**: Readonly for constant values
- **Props**: Optional React/Vue component props
- **DTOs**: Data transfer objects with optional fields

**Challenge:** Use optional and readonly modifiers correctly.`,
    examples: [
      {
        input: `interface Config {
  readonly apiKey: string;
  timeout?: number;
}`,
        output: `Type-safe config`,
        explanation: 'readonly prevents reassignment, ? makes optional',
      },
    ],
    starterCode: `// TODO: Use optional and readonly modifiers
// 1. Create an interface with readonly and optional properties
// 2. Create a function that handles optional properties

interface User {
  // TODO: id should be readonly
  // TODO: email should be optional
  // Your code here
}

function createUser(data: Partial<User>): User {
  // TODO: Return User with defaults for optional properties
  // Your code here
}

// Test
const user = createUser({ id: '123', name: 'Alice' });
// user.id = '456'; // Should cause error (readonly)
console.log(user);`,
    solution: `interface User {
  readonly id: string;
  name: string;
  email?: string;
}

function createUser(data: Partial<User>): User {
  return {
    id: data.id || '',
    name: data.name || '',
    email: data.email
  };
}

const user = createUser({ id: '123', name: 'Alice' });
// user.id = '456'; // Error: Cannot assign to 'id' because it is a read-only property
console.log(user);`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Optional and readonly work correctly',
      },
    ],
    hints: [
      'Use ? for optional properties: prop?: type',
      'Use readonly for immutable properties: readonly prop: type',
      'Partial<T> makes all properties optional',
    ],
  };