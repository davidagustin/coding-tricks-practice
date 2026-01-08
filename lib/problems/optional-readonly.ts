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
  description: `<h2>In-Depth Explanation</h2>

<p>TypeScript provides property modifiers to control object property behavior:</p>
<ul>
  <li><strong>Optional (<code>?</code>)</strong>: Property may not exist - <code>prop?: type</code></li>
  <li><strong>Readonly</strong>: Property cannot be reassigned after initialization - <code>readonly prop: type</code></li>
</ul>

<p>Optional properties are useful for:</p>
<ul>
  <li>Configuration objects where some properties have defaults</li>
  <li>API responses where fields may be missing</li>
  <li>Function parameters that have defaults</li>
</ul>

<p>Readonly properties ensure immutability:</p>
<ul>
  <li>Prevent accidental mutations</li>
  <li>Make intent clear (this shouldn't change)</li>
  <li>Work with <code>const</code> assertions for deep immutability</li>
  <li>Important for functional programming patterns</li>
</ul>

<h2>Importance</h2>

<p>These modifiers are essential for type safety because:</p>

<ul>
  <li><strong>Optional Properties</strong>: Model real-world data where fields may be missing</li>
  <li><strong>Immutability</strong>: Prevent bugs from accidental mutations</li>
  <li><strong>API Contracts</strong>: Accurately model API responses</li>
  <li><strong>Configuration</strong>: Type configuration objects with optional fields</li>
  <li><strong>Functional Programming</strong>: Support immutable data patterns</li>
  <li><strong>Code Clarity</strong>: Make intent explicit in type definitions</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>These modifiers are used everywhere:</p>

<ul>
  <li><strong>API Responses</strong>: Optional fields that may not be present</li>
  <li><strong>Configuration Objects</strong>: Optional settings with defaults</li>
  <li><strong>Form Data</strong>: Optional form fields</li>
  <li><strong>Database Models</strong>: Optional nullable fields</li>
  <li><strong>Immutable State</strong>: Readonly properties in state management</li>
  <li><strong>Constants</strong>: Readonly for constant values</li>
  <li><strong>Props</strong>: Optional React/Vue component props</li>
  <li><strong>DTOs</strong>: Data transfer objects with optional fields</li>
</ul>

<p><strong>Challenge:</strong> Use optional and readonly modifiers correctly.</p>`,
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
