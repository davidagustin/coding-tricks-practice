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
  id: 'type-assertions',
  title: 'Type Assertions',
  difficulty: 'easy',
  category: 'TypeScript Basics',
  description: `<h2>In-Depth Explanation</h2>

<p>Type assertions tell TypeScript "trust me, I know what I'm doing" - they override the compiler's inferred type with a type you specify. They don't perform any runtime checks or data transformations; they're purely a compile-time construct.</p>

<p>There are two syntaxes for type assertions:</p>
<ul>
  <li><code>value as Type</code>: The preferred modern syntax, works in all contexts including JSX</li>
  <li><code>&lt;Type&gt;value</code>: The angle-bracket syntax, cannot be used in JSX/TSX files</li>
</ul>

<p>TypeScript only allows assertions between "compatible" types. To assert between unrelated types, you must first assert to <code>unknown</code> (the "double assertion" pattern): <code>value as unknown as TargetType</code>.</p>

<p>The <code>as const</code> assertion creates literal types and makes objects/arrays readonly. The non-null assertion operator <code>!</code> asserts that a value is not null or undefined.</p>

<h2>Importance</h2>

<p>Type assertions are important because:</p>

<ul>
  <li><strong>DOM Access</strong>: TypeScript can't know specific element types from getElementById</li>
  <li><strong>External Data</strong>: Working with data from APIs, localStorage, or JSON.parse</li>
  <li><strong>Migration</strong>: Gradually typing a JavaScript codebase</li>
  <li><strong>Library Gaps</strong>: Working around incomplete type definitions</li>
  <li><strong>Complex Types</strong>: When type inference fails for complex scenarios</li>
  <li><strong>Const Context</strong>: Creating literal types with as const</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Type assertions are commonly used in:</p>

<ul>
  <li><strong>DOM Manipulation</strong>: Asserting HTMLElement subtypes after querySelector</li>
  <li><strong>API Responses</strong>: Asserting response types from fetch or axios</li>
  <li><strong>Event Handlers</strong>: Asserting event target types</li>
  <li><strong>Initialization Patterns</strong>: Working with initially undefined values</li>
  <li><strong>Test Mocking</strong>: Creating mock objects with partial implementations</li>
  <li><strong>Configuration Objects</strong>: Using as const for literal types</li>
  <li><strong>JSON Parsing</strong>: Asserting parsed JSON structure</li>
  <li><strong>Third-Party Libraries</strong>: Working around type definition issues</li>
</ul>

<p><strong>Challenge:</strong> Practice using type assertions to work with unknown types safely and effectively.</p>`,
  examples: [
    {
      input: `// Basic 'as' assertion
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');`,
      output: `canvas is HTMLCanvasElement type`,
      explanation: 'getElementById returns HTMLElement | null, but we assert it is HTMLCanvasElement',
    },
    {
      input: `// as const for literal types
const config = {
  endpoint: '/api/users',
  method: 'GET'
} as const;
// config.method is type 'GET', not string`,
      output: `Readonly object with literal types`,
      explanation: 'as const makes properties readonly and uses literal types',
    },
    {
      input: `// Non-null assertion
function processInput(input: string | null) {
  // We know input is not null here
  const length = input!.length;
}`,
      output: `length is number`,
      explanation: 'The ! operator asserts the value is not null/undefined',
    },
  ],
  starterCode: `// TODO: Practice type assertions

// Task 1: Assert element types from DOM queries
function setupCanvas(): string {
  // Simulate DOM element (in real code, use document.getElementById)
  const element: unknown = {
    tagName: 'CANVAS',
    width: 800,
    height: 600,
    getContext: (type: string) => ({ fillRect: () => {} })
  };

  // TODO: Assert element as HTMLCanvasElement type
  // Then access width and height properties
  // Return "Canvas size: <width>x<height>"
  // Your code here
}

// Task 2: Use 'as const' for literal types
function getConfig() {
  // TODO: Create a config object with 'as const'
  // Properties: apiUrl (string), timeout (number), retries (number)
  // Return the config object
  // Your code here
}

// Task 3: Assert API response type
interface User {
  id: number;
  name: string;
  email: string;
}

function parseApiResponse(jsonString: string): User {
  // TODO: Parse the JSON and assert it as User type
  // Use JSON.parse and type assertion
  // Your code here
}

// Task 4: Use non-null assertion appropriately
interface FormData {
  username?: string;
  email?: string;
}

function processForm(data: FormData): string {
  // Assume we've validated that username exists before calling
  // TODO: Use non-null assertion to access username
  // Return "Processing user: <username>"
  // Your code here
}

// Task 5: Double assertion for incompatible types
function convertToNumber(value: string): number {
  // TODO: Use double assertion (as unknown as Type)
  // to treat the string as a number (this is for demonstration)
  // Return the asserted value
  // Note: This is generally unsafe, used here for learning
  // Your code here
}

// Test your implementations
console.log(setupCanvas());
console.log(getConfig());
console.log(parseApiResponse('{"id": 1, "name": "John", "email": "john@example.com"}'));
console.log(processForm({ username: 'alice', email: 'alice@example.com' }));
console.log(convertToNumber('42'));`,
  solution: `// Task 1: Assert element types from DOM queries
function setupCanvas(): string {
  const element: unknown = {
    tagName: 'CANVAS',
    width: 800,
    height: 600,
    getContext: (type: string) => ({ fillRect: () => {} })
  };

  // Assert element as HTMLCanvasElement type
  const canvas = element as { width: number; height: number };
  return \`Canvas size: \${canvas.width}x\${canvas.height}\`;
}

// Task 2: Use 'as const' for literal types
function getConfig() {
  const config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3
  } as const;

  return config;
}

// Task 3: Assert API response type
interface User {
  id: number;
  name: string;
  email: string;
}

function parseApiResponse(jsonString: string): User {
  const parsed = JSON.parse(jsonString);
  return parsed as User;
}

// Task 4: Use non-null assertion appropriately
interface FormData {
  username?: string;
  email?: string;
}

function processForm(data: FormData): string {
  // Use non-null assertion since we assume validation happened
  return \`Processing user: \${data.username!}\`;
}

// Task 5: Double assertion for incompatible types
function convertToNumber(value: string): number {
  // Double assertion - this is unsafe but demonstrates the pattern
  return value as unknown as number;
}

// Test implementations
console.log(setupCanvas());
console.log(getConfig());
console.log(parseApiResponse('{"id": 1, "name": "John", "email": "john@example.com"}'));
console.log(processForm({ username: 'alice', email: 'alice@example.com' }));
console.log(convertToNumber('42'));`,
  testCases: [
    {
      input: [],
      expectedOutput: 'Canvas size: 800x600',
      description: 'setupCanvas returns canvas dimensions',
    },
    {
      input: [],
      expectedOutput: { apiUrl: 'https://api.example.com', timeout: 5000, retries: 3 },
      description: 'getConfig returns readonly config object',
    },
    {
      input: ['{"id": 1, "name": "John", "email": "john@example.com"}'],
      expectedOutput: { id: 1, name: 'John', email: 'john@example.com' },
      description: 'parseApiResponse parses and returns User',
    },
    {
      input: [{ username: 'alice' }],
      expectedOutput: 'Processing user: alice',
      description: 'processForm returns formatted username',
    },
  ],
  hints: [
    'Use "value as Type" syntax for type assertions - it works everywhere including JSX',
    'The "as const" assertion creates readonly objects with literal types instead of widened types',
    'Use non-null assertion (!) sparingly - only when you are certain the value exists',
    'Double assertion (as unknown as Type) bypasses type checking - use with extreme caution',
    'Type assertions are compile-time only; they do not perform runtime validation',
    'Prefer type guards over assertions when possible, as guards provide runtime safety',
  ],
};
