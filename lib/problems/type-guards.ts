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
  description: `<h2>In-Depth Explanation</h2>

<p>Type guards narrow (refine) types within conditional blocks, allowing TypeScript to know the specific type after a check. Built-in guards include <code>typeof</code>, <code>instanceof</code>, and <code>in</code> operator.</p>

<p>Custom type guards use the syntax <code>value is Type</code> - a type predicate that tells TypeScript "if this function returns true, the value is definitely this type."</p>

<p>Type narrowing is essential for working with union types safely. Without narrowing, TypeScript only allows operations available on all types in the union. After narrowing, you can use type-specific operations.</p>

<h2>Importance</h2>

<p>Type guards are crucial for type safety because:</p>

<ul>
  <li><strong>Union Type Safety</strong>: Safely work with union types</li>
  <li><strong>Runtime Safety</strong>: Verify types at runtime</li>
  <li><strong>Type Narrowing</strong>: Enable type-specific operations</li>
  <li><strong>Error Prevention</strong>: Catch type errors before runtime</li>
  <li><strong>API Validation</strong>: Validate API responses match expected types</li>
  <li><strong>User Input</strong>: Safely handle unknown user input</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Type guards are used extensively:</p>

<ul>
  <li><strong>API Responses</strong>: Validating and narrowing API response types</li>
  <li><strong>User Input</strong>: Validating form input and user data</li>
  <li><strong>Error Handling</strong>: Distinguishing between error types</li>
  <li><strong>State Management</strong>: Narrowing state union types</li>
  <li><strong>Event Handling</strong>: Narrowing event types</li>
  <li><strong>Data Parsing</strong>: Validating parsed data</li>
  <li><strong>Type Assertions</strong>: Safe type assertions with runtime checks</li>
  <li><strong>Discriminated Unions</strong>: Narrowing discriminated union types</li>
</ul>

<p><strong>Challenge:</strong> Create and use type guards to narrow types.</p>`,
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
    typeof (obj as User).name === 'string' &&
    typeof (obj as User).age === 'number'
  );
}

function processData(data: unknown): string {
  if (isUser(data)) {
    return \`User: \${data.name}, Age: \${data.age}\`;
  } else {
    return 'Not a user';
  }
}

// Additional type guards for common scenarios
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

function isArray<T>(value: unknown, itemGuard: (item: unknown) => item is T): value is T[] {
  return Array.isArray(value) && value.every(itemGuard);
}

// Test
console.log(processData({ name: 'Alice', age: 30 }));
console.log(processData('not a user'));
console.log(processData({ name: 'Bob' })); // Missing age
console.log(processData(null));`,
  testCases: [
    {
      input: { data: { name: 'Alice', age: 30 } },
      expectedOutput: 'User: Alice, Age: 30',
      description: 'processData returns user info for valid User',
    },
    {
      input: { data: 'not a user' },
      expectedOutput: 'Not a user',
      description: 'processData returns "Not a user" for string',
    },
    {
      input: { data: { name: 'Bob' } },
      expectedOutput: 'Not a user',
      description: 'processData returns "Not a user" for incomplete object',
    },
    {
      input: { data: null },
      expectedOutput: 'Not a user',
      description: 'processData returns "Not a user" for null',
    },
  ],
  hints: [
    'Type guard syntax: value is Type',
    'Use typeof, instanceof, or property checks',
    'Type guards narrow types in conditional blocks',
  ],
};
