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
  },
  {
    id: 'type-guards',
    title: 'Type Guards',
    difficulty: 'medium',
    category: 'TypeScript Basics',
    description: `## In-Depth Explanation

Type guards narrow (refine) types within conditional blocks, allowing TypeScript to know the specific type after a check. Built-in guards include \`typeof\`, \`instanceof\`, and \`in\` operator.

Custom type guards use the syntax \`value is Type\` - a type predicate that tells TypeScript "if this function returns true, the value is definitely this type."

Type narrowing is essential for working with union types safely. Without narrowing, TypeScript only allows operations available on all types in the union. After narrowing, you can use type-specific operations.

## Importance

Type guards are crucial for type safety because:

- **Union Type Safety**: Safely work with union types
- **Runtime Safety**: Verify types at runtime
- **Type Narrowing**: Enable type-specific operations
- **Error Prevention**: Catch type errors before runtime
- **API Validation**: Validate API responses match expected types
- **User Input**: Safely handle unknown user input

## Usefulness & Practical Applications

Type guards are used extensively:

- **API Responses**: Validating and narrowing API response types
- **User Input**: Validating form input and user data
- **Error Handling**: Distinguishing between error types
- **State Management**: Narrowing state union types
- **Event Handling**: Narrowing event types
- **Data Parsing**: Validating parsed data
- **Type Assertions**: Safe type assertions with runtime checks
- **Discriminated Unions**: Narrowing discriminated union types

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
        description: 'Type guards work correctly',
      },
    ],
    hints: [
      'Type guard syntax: value is Type',
      'Use typeof, instanceof, or property checks',
      'Type guards narrow types in conditional blocks',
    ],
  },
  {
    id: 'enums',
    title: 'Enums',
    difficulty: 'easy',
    category: 'TypeScript Basics',
    description: `## In-Depth Explanation

Enums define a set of named constants, making code more readable and maintainable. TypeScript supports numeric enums (default, auto-incrementing) and string enums (explicit string values).

Numeric enums auto-increment from 0, but you can set initial values. String enums require explicit values but are more readable and serialize better to JSON. Enums create both a type and a value at runtime (unlike most TypeScript types).

Key features:
- **Type Safety**: Prevents invalid values
- **Autocomplete**: IDE support for enum values
- **Reverse Mapping**: Numeric enums support reverse lookup
- **Const Enums**: \`const enum\` for better performance (inlined at compile time)

## Importance

Enums are essential for type-safe constants because:

- **Type Safety**: Prevent typos and invalid values
- **Refactoring**: Rename enum values safely across codebase
- **Documentation**: Self-documenting code with named constants
- **IDE Support**: Autocomplete and go-to-definition
- **Maintainability**: Change values in one place
- **API Contracts**: Type-safe API status codes and types

## Usefulness & Practical Applications

Enums are used extensively:

- **Status Codes**: \`enum Status { Pending, Approved, Rejected }\`
- **API Responses**: HTTP status codes, error codes
- **State Management**: Application state enums
- **Configuration**: Environment types, feature flags
- **UI States**: Loading, success, error states
- **Permissions**: User role and permission enums
- **Directions**: Navigation and direction enums
- **Event Types**: Type-safe event type constants

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
        explanation: 'Enums provide named constants',
      },
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
        description: 'Enums work correctly',
      },
    ],
    hints: [
      'Numeric enums auto-increment from 0',
      'String enums must have explicit values',
      'Enums compile to JavaScript objects',
    ],
  },
  {
    id: 'proxy-api',
    title: 'Proxy API for Interception',
    difficulty: 'hard',
    category: 'Object Methods',
    description: `## In-Depth Explanation

The \`Proxy\` object enables meta-programming by intercepting and customizing operations on objects (property access, assignment, enumeration, function invocation, etc.). It's a powerful tool for creating abstractions and implementing patterns like validation, logging, and reactive programming.

A Proxy wraps a target object with a handler that defines "traps" - functions that intercept operations. Common traps include:
- \`get\`: Intercepts property access
- \`set\`: Intercepts property assignment
- \`has\`: Intercepts \`in\` operator
- \`deleteProperty\`: Intercepts \`delete\` operator

Proxies are transparent - code using the proxy doesn't know it's a proxy. This enables powerful patterns like reactive frameworks, validation libraries, and debugging tools.

## Importance

Proxies are essential for advanced JavaScript patterns because:

- **Meta-Programming**: Intercept and customize object operations
- **Validation**: Automatic validation on property assignment
- **Reactivity**: Foundation for reactive frameworks (Vue 3 reactivity)
- **Debugging**: Logging and monitoring object access
- **Virtual Properties**: Create computed properties
- **Security**: Implement access control and validation layers

## Usefulness & Practical Applications

Proxies are used in many advanced scenarios:

- **Reactive Frameworks**: Vue 3 reactivity system uses Proxies
- **Validation Libraries**: Automatic property validation
- **ORM Libraries**: Lazy loading and virtual properties
- **Debugging Tools**: Logging object access and mutations
- **Access Control**: Implementing private properties and access control
- **API Wrappers**: Intercepting API calls for caching or logging
- **State Management**: Reactive state management systems
- **Mocking/Testing**: Creating test doubles and mocks

**Challenge:** Create a proxy that logs property access and validates assignments.`,
    examples: [
      {
        input: `const obj = new Proxy(target, handler);`,
        output: `Intercepts get, set, and other operations`,
        explanation: 'Proxy enables meta-programming',
      },
    ],
    starterCode: `// TODO: Create a proxy that logs all property access
function createLoggedObject(target) {
  // Return a Proxy that logs when properties are accessed
  // Use 'get' trap to log property reads
  return target;
}

// TODO: Create a proxy that validates property assignments
function createValidatedObject(target, validator) {
  // Return a Proxy that validates before setting properties
  // Use 'set' trap to validate and set values
  // Throw error if validation fails
  return target;
}

// Test
const logged = createLoggedObject({ name: 'John', age: 30 });
console.log(logged.name); // Should log: "Accessing property: name"

const validated = createValidatedObject({}, (key, value) => {
  if (key === 'age' && (value < 0 || value > 150)) {
    throw new Error('Invalid age');
  }
  return true;
});

validated.age = 25; // OK
validated.age = 200; // Should throw error`,
    solution: `function createLoggedObject(target) {
  return new Proxy(target, {
    get(target, prop) {
      console.log(\`Accessing property: \${String(prop)}\`);
      return target[prop];
    }
  });
}

function createValidatedObject(target, validator) {
  return new Proxy(target, {
    set(target, prop, value) {
      if (validator(prop, value)) {
        target[prop] = value;
        return true;
      }
      throw new Error(\`Invalid value for \${String(prop)}\`);
    }
  });
}`,
    testCases: [
      {
        input: [{ name: 'John' }],
        expectedOutput: 'John',
        description: 'createLoggedObject - mock test',
      },
    ],
    hints: [
      'Proxy constructor takes target and handler object',
      'Use get trap for property access: get(target, prop)',
      'Use set trap for property assignment: set(target, prop, value)',
      'Return true from set trap to indicate success',
    ],
  };
