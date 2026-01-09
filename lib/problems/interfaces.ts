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
  id: 'interfaces',
  title: 'Interfaces',
  difficulty: 'easy',
  category: 'TypeScript Basics',
  description: `<h2>In-Depth Explanation</h2>

<p>Interfaces define the shape (structure) of objects in TypeScript. They act as contracts that objects must satisfy - specifying which properties are required, their types, and which are optional (marked with <code>?</code>).</p>

<p>Interfaces are:</p>
<ul>
  <li><strong>Structural</strong>: Objects only need to have the required properties (duck typing)</li>
  <li><strong>Extensible</strong>: Can extend other interfaces with <code>extends</code></li>
  <li><strong>Reusable</strong>: Define once, use across multiple objects</li>
  <li><strong>Optional Properties</strong>: Use <code>?</code> for properties that may not exist</li>
  <li><strong>Readonly Properties</strong>: Use <code>readonly</code> for immutable properties</li>
</ul>

<p>Unlike classes, interfaces are compile-time only - they don't exist at runtime. They're purely for type checking and documentation.</p>

<h2>Importance</h2>

<p>Interfaces are fundamental to TypeScript because:</p>

<ul>
  <li><strong>API Contracts</strong>: Define contracts between functions and modules</li>
  <li><strong>Object Shape</strong>: Ensure objects have required properties</li>
  <li><strong>Documentation</strong>: Self-documenting code structure</li>
  <li><strong>Refactoring Safety</strong>: Changes to interfaces are checked everywhere</li>
  <li><strong>Team Communication</strong>: Clear contracts for team collaboration</li>
  <li><strong>Type Reuse</strong>: Define common shapes once, reuse everywhere</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Interfaces are used extensively in TypeScript applications:</p>

<ul>
  <li><strong>API Responses</strong>: Typing API request/response objects</li>
  <li><strong>Component Props</strong>: Defining React/Vue component prop types</li>
  <li><strong>Database Models</strong>: Typing database entities and DTOs</li>
  <li><strong>Configuration</strong>: Typing application configuration objects</li>
  <li><strong>Form Data</strong>: Ensuring form data matches expected structure</li>
  <li><strong>State Management</strong>: Typing Redux/Vuex state and actions</li>
  <li><strong>Function Parameters</strong>: Typing complex function parameters</li>
  <li><strong>Library APIs</strong>: Defining public APIs for libraries</li>
</ul>

<p><strong>Challenge:</strong> Create and use interfaces to type objects.</p>`,
  examples: [
    {
      input: `interface User {
  name: string;
  age: number;
}
const user: User = { name: 'John', age: 30 };`,
      output: `Type-safe user object`,
      explanation: 'Interface ensures object has required properties',
    },
  ],
  starterCode: `// TODO: Create interfaces
// 1. Create a Person interface with name, age, and email
// 2. Create a Product interface with id, name, price, and optional description
// 3. Use these interfaces to type variables

interface Person {
  // Your code here
}

interface Product {
  // Your code here
}

// TODO: Create objects that conform to these interfaces
const person: Person = {
  // Your code here
};

const product: Product = {
  // Your code here
};

// Test
function displayPerson(p: Person): string {
  return \`\${p.name}, \${p.age} years old\`;
}

console.log(displayPerson(person));`,
  solution: `// Person interface with required properties
interface Person {
  name: string;
  age: number;
  email: string;
}

// Product interface with optional description
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

// Create objects that conform to these interfaces
const person: Person = {
  name: 'John Doe',
  age: 30,
  email: 'john@example.com'
};

const product: Product = {
  id: 1,
  name: 'Laptop',
  price: 999.99,
  description: 'A powerful laptop'
};

// Another product without optional description
const product2: Product = {
  id: 2,
  name: 'Mouse',
  price: 29.99
};

// Test
function displayPerson(p: Person): string {
  return \`\${p.name}, \${p.age} years old\`;
}

console.log(displayPerson(person));
console.log(product);
console.log(product2);`,
  testCases: [
    {
      input: [{ name: 'John Doe', age: 30, email: 'john@example.com' }],
      expectedOutput: 'John Doe, 30 years old',
      description: 'displayPerson formats person data correctly',
    },
    {
      input: [{ name: 'Alice', age: 25, email: 'alice@test.com' }],
      expectedOutput: 'Alice, 25 years old',
      description: 'displayPerson works with different person data',
    },
    {
      input: [{ name: 'Bob', age: 40, email: 'bob@example.org' }],
      expectedOutput: 'Bob, 40 years old',
      description: 'displayPerson returns formatted string with name and age',
    },
  ],
  hints: [
    'Use interface keyword to define object shapes',
    'Optional properties use ?: syntax',
    'Interfaces can extend other interfaces',
  ],
};
