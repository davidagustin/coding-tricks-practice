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
    description: `## In-Depth Explanation

Interfaces define the shape (structure) of objects in TypeScript. They act as contracts that objects must satisfy - specifying which properties are required, their types, and which are optional (marked with \`?\`).

Interfaces are:
- **Structural**: Objects only need to have the required properties (duck typing)
- **Extensible**: Can extend other interfaces with \`extends\`
- **Reusable**: Define once, use across multiple objects
- **Optional Properties**: Use \`?\` for properties that may not exist
- **Readonly Properties**: Use \`readonly\` for immutable properties

Unlike classes, interfaces are compile-time only - they don't exist at runtime. They're purely for type checking and documentation.

## Importance

Interfaces are fundamental to TypeScript because:

- **API Contracts**: Define contracts between functions and modules
- **Object Shape**: Ensure objects have required properties
- **Documentation**: Self-documenting code structure
- **Refactoring Safety**: Changes to interfaces are checked everywhere
- **Team Communication**: Clear contracts for team collaboration
- **Type Reuse**: Define common shapes once, reuse everywhere

## Usefulness & Practical Applications

Interfaces are used extensively in TypeScript applications:

- **API Responses**: Typing API request/response objects
- **Component Props**: Defining React/Vue component prop types
- **Database Models**: Typing database entities and DTOs
- **Configuration**: Typing application configuration objects
- **Form Data**: Ensuring form data matches expected structure
- **State Management**: Typing Redux/Vuex state and actions
- **Function Parameters**: Typing complex function parameters
- **Library APIs**: Defining public APIs for libraries

**Challenge:** Create and use interfaces to type objects.`,
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
function displayPerson(p: Person) {
  console.log(\`\${p.name}, \${p.age} years old\`);
}

displayPerson(person);`,
    solution: `interface Person {
  name: string;
  age: number;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string; // Optional property
}

const person: Person = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com'
};

const product: Product = {
  id: 1,
  name: 'Laptop',
  price: 999.99,
  description: 'High-performance laptop'
};

function displayPerson(p: Person) {
  console.log(\`\${p.name}, \${p.age} years old\`);
}

displayPerson(person);`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Interfaces work correctly',
      },
    ],
    hints: [
      'Use interface keyword to define object shapes',
      'Optional properties use ?: syntax',
      'Interfaces can extend other interfaces',
    ],
  };
