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
    input: any;
    expectedOutput: any;
    description?: string;
  }>;
  hints: string[];
}

export const problems: Problem[] = [
  {
    id: 'conditional-types',
    title: 'Basic TypeScript Types',
    difficulty: 'easy',
    category: 'TypeScript Basics',
    description: `TypeScript provides static typing for JavaScript. Learn the basic types: string, number, boolean, null, undefined, and arrays.

**Challenge:** Add proper type annotations to functions and variables.`,
    examples: [
      {
        input: `const name: string = 'John';
const age: number = 30;
const isActive: boolean = true;`,
        output: `Type-safe variables`,
        explanation: 'Type annotations provide compile-time type checking'
      }
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
        description: 'Type annotations work correctly'
      }
    ],
    hints: [
      'Use : type syntax for type annotations',
      'Function parameters and return types need annotations',
      'Arrays can be typed as Type[] or Array<Type>'
    ]
  },
  {
    id: 'interfaces',
    title: 'Interfaces',
    difficulty: 'easy',
    category: 'TypeScript Basics',
    description: `Interfaces define the shape of objects. They provide a contract that objects must follow.

**Challenge:** Create and use interfaces to type objects.`,
    examples: [
      {
        input: `interface User {
  name: string;
  age: number;
}
const user: User = { name: 'John', age: 30 };`,
        output: `Type-safe user object`,
        explanation: 'Interface ensures object has required properties'
      }
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
        description: 'Interfaces work correctly'
      }
    ],
    hints: [
      'Use interface keyword to define object shapes',
      'Optional properties use ?: syntax',
      'Interfaces can extend other interfaces'
    ]
  },
  {
    id: 'type-aliases',
    title: 'Type Aliases',
    difficulty: 'easy',
    category: 'TypeScript Basics',
    description: `Type aliases create custom types. They're similar to interfaces but can represent unions, intersections, and primitives.

**Challenge:** Create type aliases for complex types.`,
    examples: [
      {
        input: `type ID = string | number;
type Status = 'pending' | 'approved' | 'rejected';`,
        output: `Custom types`,
        explanation: 'Type aliases can represent unions and literals'
      }
    ],
    starterCode: `// TODO: Create type aliases
// 1. Create a Status type that can be 'loading', 'success', or 'error'
// 2. Create a ID type that can be string or number
// 3. Create a Coordinates type for { x: number, y: number }

type Status = /* Your code here */;
type ID = /* Your code here */;
type Coordinates = /* Your code here */;

// TODO: Use these types
function processStatus(status: Status) {
  // Your code here
}

const userId: ID = 123;
const point: Coordinates = { x: 10, y: 20 };

console.log(processStatus('success'));`,
    solution: `type Status = 'loading' | 'success' | 'error';
type ID = string | number;
type Coordinates = { x: number; y: number };

function processStatus(status: Status) {
  return \`Status: \${status}\`;
}

const userId: ID = 123;
const point: Coordinates = { x: 10, y: 20 };

console.log(processStatus('success'));`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type aliases work correctly'
      }
    ],
    hints: [
      'Use type keyword for type aliases',
      'Union types use | syntax',
      'Type aliases can represent any type'
    ]
  },
  {
    id: 'generics-basic',
    title: 'Generic Functions and Types',
    difficulty: 'medium',
    category: 'TypeScript Basics',
    description: `Generics allow you to create reusable components that work with multiple types. They provide type safety while maintaining flexibility.

**Challenge:** Create generic functions and types.`,
    examples: [
      {
        input: `function identity<T>(arg: T): T {
  return arg;
}
const num = identity<number>(42);`,
        output: `42`,
        explanation: 'Generic function works with any type'
      }
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
        description: 'Generics work correctly'
      }
    ],
    hints: [
      'Use <T> syntax for generic type parameters',
      'Multiple generics: <T, U, V>',
      'TypeScript can often infer generic types'
    ]
  },
  {
    id: 'union-intersection',
    title: 'Union and Intersection Types',
    difficulty: 'medium',
    category: 'TypeScript Basics',
    description: `Union types (|) represent values that can be one of several types. Intersection types (&) combine multiple types.

**Challenge:** Use union and intersection types effectively.`,
    examples: [
      {
        input: `type StringOrNumber = string | number;
type A = { a: number };
type B = { b: string };
type AB = A & B; // { a: number, b: string }`,
        output: `Combined types`,
        explanation: 'Union = one of, Intersection = both'
      }
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
        description: 'Union and intersection types work correctly'
      }
    ],
    hints: [
      'Union: A | B means A or B',
      'Intersection: A & B means both A and B',
      'Use typeof or type guards to narrow union types'
    ]
  },
  {
    id: 'optional-readonly',
    title: 'Optional and Readonly Properties',
    difficulty: 'easy',
    category: 'TypeScript Basics',
    description: `TypeScript provides modifiers for object properties: ? for optional, readonly for immutable.

**Challenge:** Use optional and readonly modifiers correctly.`,
    examples: [
      {
        input: `interface Config {
  readonly apiKey: string;
  timeout?: number;
}`,
        output: `Type-safe config`,
        explanation: 'readonly prevents reassignment, ? makes optional'
      }
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
        description: 'Optional and readonly work correctly'
      }
    ],
    hints: [
      'Use ? for optional properties: prop?: type',
      'Use readonly for immutable properties: readonly prop: type',
      'Partial<T> makes all properties optional'
    ]
  },
  {
    id: 'type-guards',
    title: 'Type Guards',
    difficulty: 'medium',
    category: 'TypeScript Basics',
    description: `Type guards narrow types within conditional blocks. Use typeof, instanceof, or custom type guard functions.

**Challenge:** Create and use type guards to narrow types.`,
    examples: [
      {
        input: `function isString(value: unknown): value is string {
  return typeof value === 'string';
}
if (isString(value)) {
  value.toUpperCase(); // TypeScript knows value is string
}`,
        output: `Narrowed type`,
        explanation: 'Type guard narrows type in if block'
      }
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
    typeof (obj as any).name === 'string' &&
    typeof (obj as any).age === 'number'
  );
}

function processData(data: unknown) {
  if (isUser(data)) {
    console.log(data.name, data.age);
  } else {
    console.log('Not a user');
  }
}

processData({ name: 'Alice', age: 30 });
processData('not a user');`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type guards work correctly'
      }
    ],
    hints: [
      'Type guard syntax: value is Type',
      'Use typeof, instanceof, or property checks',
      'Type guards narrow types in conditional blocks'
    ]
  },
  {
    id: 'enums',
    title: 'Enums',
    difficulty: 'easy',
    category: 'TypeScript Basics',
    description: `Enums allow you to define a set of named constants. They can be numeric or string-based.

**Challenge:** Create and use enums effectively.`,
    examples: [
      {
        input: `enum Status {
  Pending,
  Approved,
  Rejected
}
const status: Status = Status.Pending;`,
        output: `Type-safe constants`,
        explanation: 'Enums provide named constants'
      }
    ],
    starterCode: `// TODO: Create enums
// 1. Create a numeric enum for Status
// 2. Create a string enum for Direction
// 3. Use enums in functions

enum Status {
  // Your code here
}

enum Direction {
  // Your code here (string enum)
}

function processStatus(status: Status) {
  // TODO: Use enum in switch statement
  // Your code here
}

// Test
console.log(processStatus(Status.Pending));
console.log(Direction.Up);`,
    solution: `enum Status {
  Pending,
  Approved,
  Rejected
}

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

function processStatus(status: Status) {
  switch (status) {
    case Status.Pending:
      return 'Processing...';
    case Status.Approved:
      return 'Approved!';
    case Status.Rejected:
      return 'Rejected.';
    default:
      return 'Unknown';
  }
}

console.log(processStatus(Status.Pending));
console.log(Direction.Up);`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Enums work correctly'
      }
    ],
    hints: [
      'Numeric enums auto-increment from 0',
      'String enums must have explicit values',
      'Enums compile to JavaScript objects'
    ]
  }
];

export function getProblemById(id: string): Problem | undefined {
  return problems.find(p => p.id === id);
}

export function getProblemsByCategory(category: string): Problem[] {
  return problems.filter(p => p.category === category);
}

export function getProblemsByDifficulty(difficulty: Problem['difficulty']): Problem[] {
  return problems.filter(p => p.difficulty === difficulty);
}
