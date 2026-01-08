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
  id: 'basic-typescript-types',
  title: 'Basic TypeScript Types',
  difficulty: 'easy',
  category: 'TypeScript Basics',
  description: `## In-Depth Explanation

TypeScript adds static type checking to JavaScript, catching errors at compile-time rather than runtime. Basic types include primitives (\`string\`, \`number\`, \`boolean\`) and special types (\`null\`, \`undefined\`, \`void\`).

Type annotations use the syntax \`variable: type\` or \`function(param: type): returnType\`. TypeScript infers types when possible, but explicit annotations provide:
- Documentation: Types serve as inline documentation
- Error Prevention: Catch type mismatches before runtime
- IDE Support: Better autocomplete and refactoring
- Refactoring Safety: Changes are checked across the codebase

Arrays can be typed as \`Type[]\` or \`Array<Type>\`. TypeScript's type system is structural (duck typing) - if it looks like a duck and quacks like a duck, it's a duck.

## Importance

Basic types are the foundation of TypeScript because:

- **Type Safety**: Prevents common JavaScript errors (wrong types, undefined access)
- **Documentation**: Types document code without comments
- **Refactoring**: Safe refactoring with compiler checking
- **IDE Support**: Autocomplete, go-to-definition, find-references
- **Team Collaboration**: Types make code easier to understand for teams
- **Early Error Detection**: Catch bugs during development, not production

## Usefulness & Practical Applications

Type annotations are used everywhere in TypeScript:

- **Function Signatures**: Documenting parameters and return types
- **Variable Declarations**: Ensuring variables hold expected types
- **API Contracts**: Defining interfaces between modules
- **Configuration Objects**: Typing configuration and settings
- **Data Models**: Typing database models and DTOs
- **Form Validation**: Ensuring form data matches expected types
- **State Management**: Typing application state
- **Component Props**: Typing React/Vue component props

**Challenge:** Add proper type annotations to functions and variables.`,
  examples: [
    {
      input: `const name: string = 'John';
const age: number = 30;
const isActive: boolean = true;`,
      output: `Type-safe variables`,
      explanation: 'Type annotations provide compile-time type checking',
    },
  ],
  starterCode: `// TODO: Add type annotations
// Fix the type errors by adding proper types

function greet(name) {
  return \`Hello, \${name}!\`;
}

function calculateArea(width, height) {
  return width * height;
}

function isEven(num) {
  return num % 2 === 0;
}

const numbers: number[] = [1, 2, 3, 4, 5];
const names: string[] = ['Alice', 'Bob'];

// Test
console.log(greet('John'));
console.log(calculateArea(10, 5));
console.log(isEven(4));`,
  solution: `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

function calculateArea(width: number, height: number): number {
  return width * height;
}

function isEven(num: number): boolean {
  return num % 2 === 0;
}

const numbers: number[] = [1, 2, 3, 4, 5];
const names: string[] = ['Alice', 'Bob'];

console.log(greet('John'));
console.log(calculateArea(10, 5));
console.log(isEven(4));`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Type annotations work correctly',
    },
  ],
  hints: [
    'Use : type syntax for type annotations',
    'Function parameters and return types need annotations',
    'Arrays can be typed as Type[] or Array<Type>',
  ],
};
