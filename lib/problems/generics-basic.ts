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
    id: 'generics-basic',
    title: 'Generic Functions and Types',
    difficulty: 'medium',
    category: 'TypeScript Basics',
    description: `## In-Depth Explanation

Generics enable writing reusable code that works with multiple types while maintaining type safety. They're like function parameters, but for types. The syntax \`<T>\` introduces a type parameter that can be used throughout the function or type.

Generic functions preserve type information - if you pass a \`number[]\`, TypeScript knows the return type is \`number\`, not \`unknown\`. This enables:
- **Type Safety**: Catch type errors at compile time
- **Code Reuse**: Write once, use with any type
- **IntelliSense**: Full IDE support for generic types
- **Constraints**: Use \`extends\` to limit generic types

TypeScript can often infer generic types, so you don't always need to specify them explicitly. Generics are the foundation of TypeScript's type system.

## Importance

Generics are fundamental to TypeScript because:

- **Type Safety**: Maintain type safety in reusable code
- **Code Reuse**: Write generic functions instead of type-specific duplicates
- **Library Development**: Essential for building reusable libraries
- **API Design**: Create flexible, type-safe APIs
- **Collections**: Type-safe arrays, maps, sets, etc.
- **Framework Development**: React, Vue, and other frameworks rely heavily on generics

## Usefulness & Practical Applications

Generics are used everywhere in TypeScript:

- **Array Functions**: \`map<T>\`, \`filter<T>\`, \`reduce<T>\`
- **API Clients**: Generic API client functions
- **State Management**: Generic state containers
- **React Components**: Generic component props
- **Utility Types**: \`Partial<T>\`, \`Pick<T>\`, \`Omit<T>\`
- **Data Structures**: Generic stacks, queues, trees
- **Event Handlers**: Generic event handler types
- **Database ORMs**: Generic query builders and models

**Challenge:** Create generic functions and types.`,
    examples: [
      {
        input: `function identity<T>(arg: T): T {
  return arg;
}
const num = identity<number>(42);`,
        output: `42`,
        explanation: 'Generic function works with any type',
      },
    ],
    starterCode: `// TODO: Create generic functions
// 1. Create a generic identity function
// 2. Create a generic function to get first element of array
// 3. Create a generic Pair type

function identity<T>(arg: T): T {
  // Your code here
}

function getFirst<T>(arr: T[]): T | undefined {
  // Your code here
}

type Pair<T, U> = {
  // Your code here
};

// Test
const num = identity<number>(42);
const str = identity<string>('hello');
const first = getFirst([1, 2, 3]);
const pair: Pair<string, number> = { first: 'age', second: 30 };

console.log(num, str, first, pair);`,
    solution: `function identity<T>(arg: T): T {
  return arg;
}

function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

type Pair<T, U> = {
  first: T;
  second: U;
};

const num = identity<number>(42);
const str = identity<string>('hello');
const first = getFirst([1, 2, 3]);
const pair: Pair<string, number> = { first: 'age', second: 30 };

console.log(num, str, first, pair);`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Generics work correctly',
      },
    ],
    hints: [
      'Use <T> syntax for generic type parameters',
      'Multiple generics: <T, U, V>',
      'TypeScript can often infer generic types',
    ],
  },
  {
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
  },
  {
    id: 'optional-readonly',
    title: 'Optional and Readonly Properties',
    difficulty: 'easy',
    category: 'TypeScript Basics',
    description: `## In-Depth Explanation

TypeScript provides property modifiers to control object property behavior:
- **Optional (\`?\`)**: Property may not exist - \`prop?: type\`
- **Readonly**: Property cannot be reassigned after initialization - \`readonly prop: type\`

Optional properties are useful for:
- Configuration objects where some properties have defaults
- API responses where fields may be missing
- Function parameters that have defaults

Readonly properties ensure immutability:
- Prevent accidental mutations
- Make intent clear (this shouldn't change)
- Work with \`const\` assertions for deep immutability
- Important for functional programming patterns

## Importance

These modifiers are essential for type safety because:

- **Optional Properties**: Model real-world data where fields may be missing
- **Immutability**: Prevent bugs from accidental mutations
- **API Contracts**: Accurately model API responses
- **Configuration**: Type configuration objects with optional fields
- **Functional Programming**: Support immutable data patterns
- **Code Clarity**: Make intent explicit in type definitions

## Usefulness & Practical Applications

These modifiers are used everywhere:

- **API Responses**: Optional fields that may not be present
- **Configuration Objects**: Optional settings with defaults
- **Form Data**: Optional form fields
- **Database Models**: Optional nullable fields
- **Immutable State**: Readonly properties in state management
- **Constants**: Readonly for constant values
- **Props**: Optional React/Vue component props
- **DTOs**: Data transfer objects with optional fields

**Challenge:** Use optional and readonly modifiers correctly.`,
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
