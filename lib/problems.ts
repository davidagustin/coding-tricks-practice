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
    id: 'conditional-types-basic',
    title: 'Basic Conditional Types',
    difficulty: 'medium',
    category: 'Conditional Types',
    description: `Use conditional types to create type transformations based on conditions.

**Challenge:** Create a type that extracts the return type of a function, or returns never if not a function.

**Key Concepts:**
- Conditional types: T extends U ? X : Y
- Type inference with infer keyword
- Useful for type transformations`,
    examples: [
      {
        input: `type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type A = ReturnType<() => string>; // string
type B = ReturnType<number>; // never`,
        output: `Conditional type extracts return type`,
        explanation: 'Conditional types check if T extends a pattern'
      }
    ],
    starterCode: `// TODO: Create a conditional type that extracts return type
// If T is a function, extract its return type
// Otherwise, return never

type MyReturnType<T> = any; // Fix this

// TODO: Create a type that checks if T is a function
type IsFunction<T> = any; // Fix this

// Test
type A = MyReturnType<() => string>; // Should be: string
type B = MyReturnType<(x: number) => boolean>; // Should be: boolean
type C = MyReturnType<string>; // Should be: never

type D = IsFunction<() => void>; // Should be: true
type E = IsFunction<string>; // Should be: false`,
    solution: `type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type IsFunction<T> = T extends (...args: any[]) => any ? true : false;`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Conditional types work correctly'
      }
    ],
    hints: [
      'Use T extends U ? X : Y syntax',
      'Use infer keyword to capture return type: infer R',
      'Check if T extends function signature pattern'
    ]
  },
  {
    id: 'conditional-types-infer',
    title: 'Conditional Types with Multiple Inference',
    difficulty: 'hard',
    category: 'Conditional Types',
    description: `Use infer to extract multiple type parameters from complex types.

**Challenge:** Extract parameter types and return type from function types.`,
    examples: [
      {
        input: `type Parameters<T> = T extends (...args: infer P) => any ? P : never;
type FirstParam<T> = T extends (first: infer F, ...args: any[]) => any ? F : never;`,
        output: `Extracts function parameters`,
        explanation: 'infer can capture parameter types'
      }
    ],
    starterCode: `// TODO: Extract all parameters from function type
type MyParameters<T> = any; // Fix this

// TODO: Extract first parameter type
type FirstParameter<T> = any; // Fix this

// TODO: Extract last parameter type
type LastParameter<T> = any; // Fix this

// Test
type Fn1 = (a: string, b: number) => void;
type Params1 = MyParameters<Fn1>; // Should be: [string, number]
type First1 = FirstParameter<Fn1>; // Should be: string
type Last1 = LastParameter<Fn1>; // Should be: number`,
    solution: `type MyParameters<T> = T extends (...args: infer P) => any ? P : never;

type FirstParameter<T> = T extends (first: infer F, ...args: any[]) => any ? F : never;

type LastParameter<T> = T extends (...args: infer P) => any 
  ? P extends [...any[], infer L] 
    ? L 
    : never 
  : never;`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Parameter extraction works correctly'
      }
    ],
    hints: [
      'Use infer P to capture all parameters as tuple',
      'Use rest parameters: ...args: infer P',
      'For last parameter, use tuple destructuring: [...any[], infer L]'
    ]
  },
  {
    id: 'mapped-types-basic',
    title: 'Basic Mapped Types',
    difficulty: 'medium',
    category: 'Mapped Types',
    description: `Create new types by transforming properties of existing types.

**Challenge:** Create mapped types that make all properties optional, readonly, or nullable.`,
    examples: [
      {
        input: `type Partial<T> = { [P in keyof T]?: T[P] };
type Readonly<T> = { readonly [P in keyof T]: T[P] };`,
        output: `Transforms all properties of type T`,
        explanation: 'Mapped types iterate over keys and transform values'
      }
    ],
    starterCode: `// TODO: Create a mapped type that makes all properties optional
type MyPartial<T> = any; // Fix this

// TODO: Create a mapped type that makes all properties readonly
type MyReadonly<T> = any; // Fix this

// TODO: Create a mapped type that makes all properties nullable
type Nullable<T> = any; // Fix this

// Test
interface User {
  name: string;
  age: number;
}

type PartialUser = MyPartial<User>; // { name?: string; age?: number; }
type ReadonlyUser = MyReadonly<User>; // { readonly name: string; readonly age: number; }
type NullableUser = Nullable<User>; // { name: string | null; age: number | null; }`,
    solution: `type MyPartial<T> = { [P in keyof T]?: T[P] };

type MyReadonly<T> = { readonly [P in keyof T]: T[P] };

type Nullable<T> = { [P in keyof T]: T[P] | null };`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Mapped types work correctly'
      }
    ],
    hints: [
      'Use [P in keyof T] to iterate over keys',
      'Add ? for optional: [P in keyof T]?: T[P]',
      'Add readonly modifier: readonly [P in keyof T]: T[P]'
    ]
  },
  {
    id: 'mapped-types-filter',
    title: 'Mapped Types with Key Filtering',
    difficulty: 'hard',
    category: 'Mapped Types',
    description: `Filter keys in mapped types using conditional types.

**Challenge:** Create Pick, Omit, and ExtractKeys utilities.`,
    examples: [
      {
        input: `type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Omit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] };`,
        output: `Selects or excludes specific keys`,
        explanation: 'Combine mapped types with conditional types'
      }
    ],
    starterCode: `// TODO: Create Pick type that selects specific keys
type MyPick<T, K extends keyof T> = any; // Fix this

// TODO: Create Omit type that excludes specific keys
type MyOmit<T, K extends keyof T> = any; // Fix this

// TODO: Create type that extracts keys of a specific type
type KeysOfType<T, U> = any; // Fix this

// Test
interface User {
  name: string;
  age: number;
  email: string;
}

type NameAndAge = MyPick<User, 'name' | 'age'>; // { name: string; age: number; }
type WithoutAge = MyOmit<User, 'age'>; // { name: string; email: string; }
type StringKeys = KeysOfType<User, string>; // 'name' | 'email'`,
    solution: `type MyPick<T, K extends keyof T> = { [P in K]: T[P] };

type MyOmit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] };

type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Key filtering works correctly'
      }
    ],
    hints: [
      'Pick: iterate over K keys: [P in K]',
      'Omit: use Exclude to remove keys: Exclude<keyof T, K>',
      'KeysOfType: map to K or never, then index with [keyof T]'
    ]
  },
  {
    id: 'utility-types-record',
    title: 'Record and Utility Types',
    difficulty: 'medium',
    category: 'Utility Types',
    description: `Understand and create utility types like Record, Required, NonNullable.

**Challenge:** Implement common utility types from scratch.`,
    examples: [
      {
        input: `type Record<K extends keyof any, T> = { [P in K]: T };
type Required<T> = { [P in keyof T]-?: T[P] };`,
        output: `Utility types for common transformations`,
        explanation: 'Utility types solve common type problems'
      }
    ],
    starterCode: `// TODO: Create Record type
// Record<K, T> creates object with keys K and values T
type MyRecord<K extends keyof any, T> = any; // Fix this

// TODO: Create Required type (opposite of Partial)
// Removes optional modifier from all properties
type MyRequired<T> = any; // Fix this

// TODO: Create NonNullable type
// Removes null and undefined from union
type MyNonNullable<T> = any; // Fix this

// Test
type UserRecord = MyRecord<'name' | 'email', string>; // { name: string; email: string; }

interface PartialUser {
  name?: string;
  age?: number;
}
type RequiredUser = MyRequired<PartialUser>; // { name: string; age: number; }

type MaybeString = string | null | undefined;
type DefiniteString = MyNonNullable<MaybeString>; // string`,
    solution: `type MyRecord<K extends keyof any, T> = { [P in K]: T };

type MyRequired<T> = { [P in keyof T]-?: T[P] };

type MyNonNullable<T> = T extends null | undefined ? never : T;`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Utility types work correctly'
      }
    ],
    hints: [
      'Record: map over K keys with value type T',
      'Required: use -? to remove optional modifier',
      'NonNullable: use conditional type to exclude null | undefined'
    ]
  },
  {
    id: 'conditional-distributive',
    title: 'Distributive Conditional Types',
    difficulty: 'hard',
    category: 'Conditional Types',
    description: `Understand how conditional types distribute over union types.

**Challenge:** Create types that work with union types correctly.`,
    examples: [
      {
        input: `type ToArray<T> = T extends any ? T[] : never;
type A = ToArray<string | number>; // string[] | number[] (distributed)`,
        output: `Conditional types distribute over unions`,
        explanation: 'Each union member is processed separately'
      }
    ],
    starterCode: `// TODO: Create type that converts union to array of each type
type ToArray<T> = any; // Fix this

// TODO: Create type that extracts string from union
type ExtractString<T> = any; // Fix this

// TODO: Create type that excludes function types
type ExcludeFunctions<T> = any; // Fix this

// Test
type A = ToArray<string | number>; // Should be: string[] | number[]
type B = ExtractString<string | number | boolean>; // Should be: string
type C = ExcludeFunctions<string | number | (() => void)>; // Should be: string | number`,
    solution: `type ToArray<T> = T extends any ? T[] : never;

type ExtractString<T> = T extends string ? T : never;

type ExcludeFunctions<T> = T extends Function ? never : T;`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Distributive conditional types work correctly'
      }
    ],
    hints: [
      'Conditional types automatically distribute over unions',
      'T extends any ? X : Y distributes over union members',
      'To prevent distribution, wrap in tuple: [T] extends [any] ? ...'
    ]
  },
  {
    id: 'template-literal-mapped',
    title: 'Template Literal Types with Mapped Types',
    difficulty: 'hard',
    category: 'Template Literal Types',
    description: `Combine template literal types with mapped types for powerful transformations.

**Challenge:** Create type-safe event system and CSS class builders.`,
    examples: [
      {
        input: `type EventMap = {
  click: MouseEvent;
  keydown: KeyboardEvent;
};

type EventHandlers = {
  [K in keyof EventMap as \`on\${Capitalize<K>}\`]: (e: EventMap[K]) => void;
};`,
        output: `Transforms keys using template literals`,
        explanation: 'Mapped types can transform keys with template literals'
      }
    ],
    starterCode: `// TODO: Create event handler types from event map
type EventMap = {
  click: MouseEvent;
  keydown: KeyboardEvent;
  focus: FocusEvent;
};

type EventHandlers<T> = any; // Fix this
// Should be: { onClick: (e: MouseEvent) => void; onKeydown: (e: KeyboardEvent) => void; ... }

// TODO: Create CSS class builder type
type Size = 'sm' | 'md' | 'lg';
type Color = 'red' | 'blue' | 'green';

type ButtonClass = any; // Fix this
// Should be: 'btn-sm-red' | 'btn-sm-blue' | 'btn-sm-green' | 'btn-md-red' | ...

// Test
type Handlers = EventHandlers<EventMap>;
// Should have: onClick, onKeydown, onFocus

type Btn = ButtonClass; // All combinations of size and color`,
    solution: `type EventHandlers<T extends Record<string, any>> = {
  [K in keyof T as \`on\${Capitalize<string & K>}\`]: (e: T[K]) => void;
};

type ButtonClass = \`btn-\${Size}-\${Color}\`;`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Template literal mapped types work correctly'
      }
    ],
    hints: [
      'Use "as" clause to transform keys: [K in keyof T as NewKey]',
      'Template literal in "as": as `on${Capitalize<K>}`',
      'Use Capitalize utility type for string transformation'
    ]
  },
  {
    id: 'recursive-types',
    title: 'Recursive and Deep Utility Types',
    difficulty: 'hard',
    category: 'Utility Types',
    description: `Create utility types that work recursively on nested structures.

**Challenge:** Implement DeepPartial, DeepReadonly, and DeepRequired.`,
    examples: [
      {
        input: `type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};`,
        output: `Recursively transforms nested properties`,
        explanation: 'Recursive types handle nested structures'
      }
    ],
    starterCode: `// TODO: Create DeepPartial that makes all nested properties optional
type DeepPartial<T> = any; // Fix this

// TODO: Create DeepReadonly that makes all nested properties readonly
type DeepReadonly<T> = any; // Fix this

// TODO: Create DeepRequired that makes all nested properties required
type DeepRequired<T> = any; // Fix this

// Test
interface Nested {
  user: {
    name: string;
    profile: {
      age: number;
    };
  };
}

type PartialNested = DeepPartial<Nested>;
// Should be: { user?: { name?: string; profile?: { age?: number; }; }; }

type ReadonlyNested = DeepReadonly<Nested>;
// Should be: { readonly user: { readonly name: string; readonly profile: { readonly age: number; }; }; }`,
    solution: `type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Recursive utility types work correctly'
      }
    ],
    hints: [
      'Check if property is object: T[P] extends object',
      'Recursively apply transformation: DeepPartial<T[P]>',
      'Use -? to remove optional modifier in DeepRequired'
    ]
  },
  {
    id: 'type-guards-advanced',
    title: 'Advanced Type Guards and Assertions',
    difficulty: 'hard',
    category: 'Type Guards',
    description: `Create custom type guards and type assertion functions.

**Challenge:** Implement type-safe validation and narrowing functions.`,
    examples: [
      {
        input: `function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number') throw new Error();
}`,
        output: `Type guards narrow types, assertions throw on failure`,
        explanation: 'Type guards and assertions provide runtime type safety'
      }
    ],
    starterCode: `// TODO: Create type guard for User object
interface User {
  name: string;
  age: number;
}

function isUser(value: unknown): value is User {
  // Your code here
  return false;
}

// TODO: Create assertion function
function assertIsUser(value: unknown): asserts value is User {
  // Your code here
  // Should throw if value is not User
}

// TODO: Create type guard for array of strings
function isStringArray(value: unknown): value is string[] {
  // Your code here
  return false;
}

// Test
function processUser(data: unknown) {
  if (isUser(data)) {
    // data is now User type
    console.log(data.name);
  }
  
  assertIsUser(data);
  // data is now User type (or exception thrown)
  console.log(data.age);
}`,
    solution: `function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'age' in value &&
    typeof (value as any).name === 'string' &&
    typeof (value as any).age === 'number'
  );
}

function assertIsUser(value: unknown): asserts value is User {
  if (!isUser(value)) {
    throw new Error('Value is not a User');
  }
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type guards and assertions work correctly'
      }
    ],
    hints: [
      'Type guard returns: value is Type',
      'Assertion function: asserts value is Type',
      'Check all required properties and their types'
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
