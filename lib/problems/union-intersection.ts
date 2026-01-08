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
    description: `## In-Depth Explanation

Union types (\`|\`) represent values that can be one of several types: \`string | number\` means "either string or number". Intersection types (\`&\`) combine multiple types: \`A & B\` means "both A and B".

Union types require type narrowing (using \`typeof\`, \`instanceof\`, or type guards) to access type-specific properties. Intersection types combine all properties from both types.

Key concepts:
- **Union = OR**: Value can be any of the types
- **Intersection = AND**: Value must satisfy all types
- **Type Narrowing**: Required to use union types safely
- **Discriminated Unions**: Union types with a common property for narrowing

## Importance

Union and intersection types are essential because:

- **Flexibility**: Represent values that can be multiple types
- **Type Safety**: TypeScript ensures you handle all cases
- **API Design**: Model APIs that return different types
- **State Machines**: Represent state transitions with discriminated unions
- **Composition**: Combine types to create new types
- **Error Handling**: Type-safe error handling with union types

## Usefulness & Practical Applications

These types are used extensively:

- **API Responses**: \`type Response = Success | Error\`
- **State Management**: \`type State = Loading | Success | Error\`
- **Form Validation**: \`type ValidationResult = Valid | Invalid\`
- **Optional Values**: \`type Maybe<T> = T | null | undefined\`
- **Event Types**: Union of different event types
- **Component Props**: Props that can be different shapes
- **Configuration**: Options that can be different types
- **Database Queries**: Results that can be different shapes

**Challenge:** Use union and intersection types effectively.`,
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

function processValue(value: StringOrNumber) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else {
    return value * 2;
  }
}

type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge;

function displayPerson(person: Person) {
  console.log(\`\${person.name}, \${person.age} years old\`);
}

console.log(processValue('hello'));
console.log(processValue(42));
displayPerson({ name: 'Alice', age: 30 });`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Union and intersection types work correctly',
      },
    ],
    hints: [
      'Union: A | B means A or B',
      'Intersection: A & B means both A and B',
      'Use typeof or type guards to narrow union types',
    ],
  };
