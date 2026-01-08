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
  id: 'discriminated-unions',
  title: 'Discriminated Unions',
  difficulty: 'medium',
  category: 'TypeScript Advanced',
  description: `<h2>In-Depth Explanation</h2>

<p>Discriminated unions (also called tagged unions or algebraic data types) are a pattern where each type in a union has a common property (the discriminant) with a literal type value. TypeScript uses this property to narrow the type.</p>

<p>Key features:</p>
<ul>
  <li><strong>Common Discriminant</strong>: A shared property with literal types (usually called "type", "kind", or "status")</li>
  <li><strong>Exhaustive Checking</strong>: TypeScript ensures all cases are handled in switch statements</li>
  <li><strong>Type Narrowing</strong>: Checking the discriminant narrows to the specific type</li>
  <li><strong>Never Type</strong>: Unhandled cases can be caught with never type assertion</li>
</ul>

<p>Common patterns:</p>
<ul>
  <li><strong>State Machines</strong>: \`{ status: 'loading' } | { status: 'success', data: T } | { status: 'error', error: Error }\`</li>
  <li><strong>Redux Actions</strong>: \`{ type: 'ADD_TODO', payload: Todo } | { type: 'DELETE_TODO', id: string }\`</li>
  <li><strong>API Responses</strong>: \`{ ok: true, data: T } | { ok: false, error: string }\`</li>
</ul>

<h2>Importance</h2>

<p>Discriminated unions are essential because:</p>

<ul>
  <li><strong>Type Safety</strong>: Impossible to access properties that don't exist on the current variant</li>
  <li><strong>Exhaustiveness</strong>: Compiler catches missing cases in switch statements</li>
  <li><strong>Self-Documenting</strong>: Code clearly shows all possible states</li>
  <li><strong>Refactoring Safety</strong>: Adding new variants forces handling in all places</li>
  <li><strong>IDE Support</strong>: Excellent autocomplete and error detection</li>
  <li><strong>Pattern Matching</strong>: Enables functional programming patterns</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Discriminated unions are used extensively:</p>

<ul>
  <li><strong>React State</strong>: Loading/success/error states for async operations</li>
  <li><strong>Redux/Zustand</strong>: Action type definitions</li>
  <li><strong>Form Validation</strong>: Valid/invalid field states with different properties</li>
  <li><strong>API Responses</strong>: Success/failure response handling</li>
  <li><strong>Event Handling</strong>: Different event types with specific payloads</li>
  <li><strong>AST Nodes</strong>: Compiler/parser node types</li>
  <li><strong>Database Operations</strong>: CRUD operation result types</li>
  <li><strong>WebSocket Messages</strong>: Different message types with payloads</li>
</ul>

<p><strong>Challenge:</strong> Build discriminated union types for type-safe state management.</p>`,
  examples: [
    {
      input: `type Result<T> = { success: true; data: T } | { success: false; error: string }`,
      output: `function handle(r: Result<User>) { if (r.success) { r.data } else { r.error } }`,
      explanation: 'The success property discriminates between success and error variants',
    },
    {
      input: `type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; side: number }`,
      output: `switch (shape.kind) { case 'circle': shape.radius; case 'square': shape.side; }`,
      explanation: 'TypeScript narrows the type based on the kind property',
    },
  ],
  starterCode: `// TODO: Create a discriminated union for async data fetching states
// Should have three states: 'idle', 'loading', 'success' (with data), 'error' (with error message)
type AsyncState<T> = { status: 'idle' }; // Add loading, success, and error states

// TODO: Create a discriminated union for form field validation
// Should have: 'pristine', 'valid' (with value), 'invalid' (with errors array)
type FieldState<T> = { state: 'pristine' }; // Add valid and invalid states

// TODO: Create a discriminated union for different notification types
// Should have: 'info', 'success', 'warning', 'error'
// Each should have message, and error should also have 'retryable' boolean
type Notification = { type: 'info'; message: string }; // Add other notification types

// TODO: Create a function that handles AsyncState exhaustively
// Return a string describing the current state
function describeAsyncState<T>(state: AsyncState<T>): string {
  // TODO: Implement exhaustive switch statement
  return 'Unknown state';
}

// TODO: Create an exhaustive check helper using never
function assertNever(x: never): never {
  throw new Error('Unexpected value: ' + x);
}

// Test your types
const idle: AsyncState<string> = { status: 'idle' };
const loading: AsyncState<string> = { status: 'loading' };
// const success: AsyncState<string> = { status: 'success', data: 'Hello' };
// const error: AsyncState<string> = { status: 'error', error: 'Failed to fetch' };`,
  solution: `type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

type FieldState<T> =
  | { state: 'pristine' }
  | { state: 'valid'; value: T }
  | { state: 'invalid'; errors: string[] };

type Notification =
  | { type: 'info'; message: string }
  | { type: 'success'; message: string }
  | { type: 'warning'; message: string }
  | { type: 'error'; message: string; retryable: boolean };

function describeAsyncState<T>(state: AsyncState<T>): string {
  switch (state.status) {
    case 'idle':
      return 'Waiting to start';
    case 'loading':
      return 'Loading...';
    case 'success':
      return \`Loaded: \${state.data}\`;
    case 'error':
      return \`Error: \${state.error}\`;
    default:
      return assertNever(state);
  }
}

function assertNever(x: never): never {
  throw new Error('Unexpected value: ' + x);
}`,
  testCases: [
    {
      input: { status: 'idle' },
      expectedOutput: 'Waiting to start',
      description: 'describeAsyncState handles idle state',
    },
    {
      input: { status: 'loading' },
      expectedOutput: 'Loading...',
      description: 'describeAsyncState handles loading state',
    },
    {
      input: { status: 'success', data: 'test' },
      expectedOutput: 'Loaded: test',
      description: 'describeAsyncState handles success state with data',
    },
    {
      input: { status: 'error', error: 'Network error' },
      expectedOutput: 'Error: Network error',
      description: 'describeAsyncState handles error state with message',
    },
  ],
  hints: [
    'Each variant in the union needs a common property (discriminant) with a unique literal type value',
    'Use the pipe | operator to create unions: type A = { type: "a" } | { type: "b" }',
    'In switch statements, TypeScript narrows the type after checking the discriminant',
    'The never type in the default case ensures exhaustive checking - if you miss a case, TypeScript will error',
    'Properties specific to a variant should only be defined in that variant, not in others',
  ],
};
