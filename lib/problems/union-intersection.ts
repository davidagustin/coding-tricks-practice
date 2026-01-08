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
  id: 'union-intersection',
  title: 'Union and Intersection Types',
  difficulty: 'medium',
  category: 'TypeScript Basics',
  description: `<h2>In-Depth Explanation</h2>

<p>Union types (<code>|</code>) represent values that can be one of several types: <code>string | number</code> means "either string or number". Intersection types (<code>&</code>) combine multiple types: <code>A & B</code> means "both A and B".</p>

<p>Union types require type narrowing (using <code>typeof</code>, <code>instanceof</code>, or type guards) to access type-specific properties. Intersection types combine all properties from both types.</p>

<p>Key concepts:</p>
<ul>
  <li><strong>Union = OR</strong>: Value can be any of the types</li>
  <li><strong>Intersection = AND</strong>: Value must satisfy all types</li>
  <li><strong>Type Narrowing</strong>: Required to use union types safely</li>
  <li><strong>Discriminated Unions</strong>: Union types with a common property for narrowing</li>
</ul>

<h2>Importance</h2>

<p>Union and intersection types are essential because:</p>

<ul>
  <li><strong>Flexibility</strong>: Represent values that can be multiple types</li>
  <li><strong>Type Safety</strong>: TypeScript ensures you handle all cases</li>
  <li><strong>API Design</strong>: Model APIs that return different types</li>
  <li><strong>State Machines</strong>: Represent state transitions with discriminated unions</li>
  <li><strong>Composition</strong>: Combine types to create new types</li>
  <li><strong>Error Handling</strong>: Type-safe error handling with union types</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>These types are used extensively:</p>

<ul>
  <li><strong>API Responses</strong>: <code>type Response = Success | Error</code></li>
  <li><strong>State Management</strong>: <code>type State = Loading | Success | Error</code></li>
  <li><strong>Form Validation</strong>: <code>type ValidationResult = Valid | Invalid</code></li>
  <li><strong>Optional Values</strong>: <code>type Maybe&lt;T&gt; = T | null | undefined</code></li>
  <li><strong>Event Types</strong>: Union of different event types</li>
  <li><strong>Component Props</strong>: Props that can be different shapes</li>
  <li><strong>Configuration</strong>: Options that can be different types</li>
  <li><strong>Database Queries</strong>: Results that can be different shapes</li>
</ul>

<p><strong>Challenge:</strong> Use union and intersection types effectively.</p>`,
  examples: [
    {
      input: `type StringOrNumber = string | number;
type A = { a: number };
type B = { b: string };
type AB = A & B; // { a: number, b: string }`,
      output: `Combined types`,
      explanation: 'Union = one of, Intersection = both',
    },
  ],
  starterCode: `// TODO: Use union and intersection types
// 1. Create a function that accepts string | number
// 2. Create intersection types
// 3. Use type narrowing with typeof

type StringOrNumber = string | number;

function processValue(value: StringOrNumber) {
  // TODO: Use type narrowing to handle both types
  // Your code here
}

type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge; // Intersection

// TODO: Create a function that works with Person
function displayPerson(person: Person) {
  // Your code here
}

// Test
console.log(processValue('hello'));
console.log(processValue(42));
displayPerson({ name: 'Alice', age: 30 });`,
  solution: `type StringOrNumber = string | number;

function processValue(value: StringOrNumber): string {
  // Use type narrowing to handle both types
  if (typeof value === 'string') {
    return \`String: \${value.toUpperCase()}\`;
  } else {
    return \`Number: \${value * 2}\`;
  }
}

type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge; // Intersection

function displayPerson(person: Person): string {
  return \`\${person.name} is \${person.age} years old\`;
}

// Test
console.log(processValue('hello')); // 'String: HELLO'
console.log(processValue(42)); // 'Number: 84'
console.log(displayPerson({ name: 'Alice', age: 30 })); // 'Alice is 30 years old'`,
  testCases: [
    { input: ['hello'], expectedOutput: 'String: HELLO', description: 'processValue handles string input' },
    { input: [42], expectedOutput: 'Number: 84', description: 'processValue handles number input' },
    { input: [{ name: 'Alice', age: 30 }], expectedOutput: 'Alice is 30 years old', description: 'displayPerson formats person correctly' },
  ],
  hints: [
    'Union: A | B means A or B',
    'Intersection: A & B means both A and B',
    'Use typeof or type guards to narrow union types',
  ],
};
