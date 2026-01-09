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
  description: `<h2>In-Depth Explanation</h2>

<p>Type aliases create names for types, making code more readable and maintainable. Unlike interfaces (which only describe object shapes), type aliases can represent any type: primitives, unions, intersections, tuples, and more.</p>

<p>The syntax is \<code>type Name = Type\</code>. Type aliases are particularly powerful for:</p>
<ul>
  <li><strong>Union Types</strong>: \<code>type ID = string | number\</code></li>
  <li><strong>Literal Types</strong>: \<code>type Status = 'pending' | 'approved'\</code></li>
  <li><strong>Complex Types</strong>: Combining multiple types</li>
  <li><strong>Function Types</strong>: \<code>type Handler = (x: number) => void\</code></li>
</ul>

<p>Type aliases can be extended and combined, and they provide the same type safety as interfaces. The choice between \<code>type\</code> and \<code>interface\</code> is often stylistic, though interfaces can be merged (declaration merging) while types cannot.</p>

<h2>Importance</h2>

<p>Type aliases are essential for type organization because:</p>

<ul>
  <li><strong>Readability</strong>: Descriptive names for complex types</li>
  <li><strong>Reusability</strong>: Define once, use everywhere</li>
  <li><strong>Maintainability</strong>: Change type in one place</li>
  <li><strong>Union Types</strong>: Essential for representing "one of" scenarios</li>
  <li><strong>Literal Types</strong>: Type-safe string/number constants</li>
  <li><strong>Code Organization</strong>: Group related types together</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Type aliases are used extensively:</p>

<ul>
  <li><strong>Status Types</strong>: \<code>type Status = 'loading' | 'success' | 'error'\</code></li>
  <li><strong>ID Types</strong>: \<code>type ID = string | number\</code> for flexible identifiers</li>
  <li><strong>Event Types</strong>: \<code>type EventType = 'click' | 'hover' | 'focus'\</code></li>
  <li><strong>API Responses</strong>: Typing API response variants</li>
  <li><strong>Configuration</strong>: Typing configuration options</li>
  <li><strong>State Management</strong>: Typing application state variants</li>
  <li><strong>Function Types</strong>: Typing callback functions and handlers</li>
  <li><strong>Discriminated Unions</strong>: Creating type-safe state machines</li>
</ul>

<p><strong>Challenge:</strong> Create type aliases for complex types.</p>`,
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

function processStatus(status: Status): string {
  switch (status) {
    case 'loading':
      return 'Processing...';
    case 'success':
      return 'Operation completed successfully!';
    case 'error':
      return 'An error occurred.';
  }
}

const userId: ID = 123;
const point: Coordinates = { x: 10, y: 20 };

console.log(processStatus('success'));
console.log('User ID:', userId);
console.log('Point:', point);`,
  testCases: [
    {
      input: { status: 'loading' },
      expectedOutput: 'Processing...',
      description: 'processStatus returns loading message',
    },
    {
      input: { status: 'success' },
      expectedOutput: 'Operation completed successfully!',
      description: 'processStatus returns success message',
    },
    {
      input: { status: 'error' },
      expectedOutput: 'An error occurred.',
      description: 'processStatus returns error message',
    },
  ],
  hints: [
    'Use type keyword for type aliases',
    'Union types use | syntax',
    'Type aliases can represent any type',
  ],
};
