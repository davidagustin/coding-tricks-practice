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
    id: 'type-aliases',
    title: 'Type Aliases',
    difficulty: 'easy',
    category: 'TypeScript Basics',
    description: `## In-Depth Explanation

Type aliases create names for types, making code more readable and maintainable. Unlike interfaces (which only describe object shapes), type aliases can represent any type: primitives, unions, intersections, tuples, and more.

The syntax is \`type Name = Type\`. Type aliases are particularly powerful for:
- **Union Types**: \`type ID = string | number\`
- **Literal Types**: \`type Status = 'pending' | 'approved'\`
- **Complex Types**: Combining multiple types
- **Function Types**: \`type Handler = (x: number) => void\`

Type aliases can be extended and combined, and they provide the same type safety as interfaces. The choice between \`type\` and \`interface\` is often stylistic, though interfaces can be merged (declaration merging) while types cannot.

## Importance

Type aliases are essential for type organization because:

- **Readability**: Descriptive names for complex types
- **Reusability**: Define once, use everywhere
- **Maintainability**: Change type in one place
- **Union Types**: Essential for representing "one of" scenarios
- **Literal Types**: Type-safe string/number constants
- **Code Organization**: Group related types together

## Usefulness & Practical Applications

Type aliases are used extensively:

- **Status Types**: \`type Status = 'loading' | 'success' | 'error'\`
- **ID Types**: \`type ID = string | number\` for flexible identifiers
- **Event Types**: \`type EventType = 'click' | 'hover' | 'focus'\`
- **API Responses**: Typing API response variants
- **Configuration**: Typing configuration options
- **State Management**: Typing application state variants
- **Function Types**: Typing callback functions and handlers
- **Discriminated Unions**: Creating type-safe state machines

**Challenge:** Create type aliases for complex types.`,
    examples: [
      {
        input: `type ID = string | number;
type Status = 'pending' | 'approved' | 'rejected';`,
        output: `Custom types`,
        explanation: 'Type aliases can represent unions and literals',
      },
    ],
    starterCode: `// TODO: Create type aliases
// 1. Create a Status type that can be 'loading', 'success', or 'error'
// 2. Create a ID type that can be string or number
// 3. Create a Coordinates type for { x: number, y: number }

type Status = /* Your code here */;
type ID = /* Your code here */;
type Coordinates = /* Your code here */;

// TODO: Use these types
function processStatus(status: Status) {
  // Your code here
}

const userId: ID = 123;
const point: Coordinates = { x: 10, y: 20 };

console.log(processStatus('success'));`,
    solution: `type Status = 'loading' | 'success' | 'error';
type ID = string | number;
type Coordinates = { x: number; y: number };

function processStatus(status: Status) {
  return \`Status: \${status}\`;
}

const userId: ID = 123;
const point: Coordinates = { x: 10, y: 20 };

console.log(processStatus('success'));`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type aliases work correctly',
      },
    ],
    hints: [
      'Use type keyword for type aliases',
      'Union types use | syntax',
      'Type aliases can represent any type',
    ],
  };
