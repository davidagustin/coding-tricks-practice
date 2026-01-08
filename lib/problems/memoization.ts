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
    id: 'memoization',
    title: 'Function Memoization',
    difficulty: 'medium',
    category: 'Functional Programming',
    description: `## In-Depth Explanation

Memoization caches function results based on arguments, avoiding redundant calculations. When a memoized function is called with the same arguments, it returns the cached result instead of recalculating.

The pattern:
1. Check if result exists in cache for given arguments
2. If yes, return cached result
3. If no, compute result, store in cache, return result

Memoization is particularly powerful for:
- **Recursive Functions**: Dramatically speeds up recursive algorithms (like Fibonacci)
- **Expensive Calculations**: Caching results of expensive operations
- **Pure Functions**: Works best with pure functions (same input → same output)
- **API Calls**: Caching API responses (with expiration)

## Importance

Memoization is essential for performance optimization because:

- **Performance**: Dramatically speeds up expensive calculations
- **Recursive Algorithms**: Essential for efficient recursive functions
- **Resource Efficiency**: Reduces CPU usage and API calls
- **User Experience**: Faster response times improve UX
- **Cost Reduction**: Fewer API calls reduce costs
- **Scalability**: Enables applications to handle more load

## Usefulness & Practical Applications

Memoization is used extensively:

- **Recursive Algorithms**: Fibonacci, factorial, dynamic programming
- **API Caching**: Caching API responses to reduce network calls
- **Expensive Calculations**: Mathematical computations, data processing
- **React**: React.memo, useMemo for component and value memoization
- **GraphQL**: Field-level caching in GraphQL resolvers
- **Image Processing**: Caching processed images
- **Data Transformation**: Caching transformed data
- **Search Results**: Caching search results

**Challenge:** Implement memoization for expensive calculations.`,
    examples: [
      {
        input: `const memoFib = memoize(fib); memoFib(40)`,
        output: `Fast result (cached)`,
        explanation: 'Subsequent calls use cached value',
      },
    ],
    starterCode: `// TODO: Create a memoize function that caches results
// Only works for single-argument functions for simplicity
function memoize(fn) {
  // Create cache (Map or object)
  // Return function that checks cache before calling fn

  return fn;
}

// Test with fibonacci
function slowFib(n) {
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
}

// TODO: Create memoized fibonacci that's actually fast
function fastFib(n, memo = {}) {
  // Use memo object to cache results
  if (n <= 1) return n;
  return fastFib(n - 1) + fastFib(n - 2);
}

// Test
const memoizedFib = memoize(n => {
  if (n <= 1) return n;
  return memoizedFib(n - 1) + memoizedFib(n - 2);
});

console.log(memoizedFib(10));
console.log(fastFib(10));`,
    solution: `function memoize(fn) {
  const cache = new Map();
  return function(arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

function fastFib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fastFib(n - 1, memo) + fastFib(n - 2, memo);
  return memo[n];
}`,
    testCases: [
      {
        input: [10],
        expectedOutput: 55,
        description: 'memoizedFib(10)',
      },
      {
        input: [10],
        expectedOutput: 55,
        description: 'fastFib(10)',
      },
      {
        input: [20],
        expectedOutput: 6765,
        description: 'fastFib(20)',
      },
    ],
    hints: [
      'Use Map for cache: cache.has(key), cache.get(key), cache.set(key, value)',
      'Check cache before computing',
      'For recursive functions, pass memo object as parameter',
    ],
  },
  {
    id: 'pipe-compose',
    title: 'Pipe and Compose',
    difficulty: 'medium',
    category: 'Functional Programming',
    description: `## In-Depth Explanation

\`pipe\` and \`compose\` are utilities for function composition - chaining functions together to create transformation pipelines. \`pipe\` applies functions left-to-right (top-to-bottom), while \`compose\` applies them right-to-left (bottom-to-top).

\`pipe(f, g, h)(x)\` means \`h(g(f(x)))\` - apply f, then g, then h.
\`compose(f, g, h)(x)\` means \`f(g(h(x)))\` - apply h, then g, then f.

Both create reusable pipelines where:
- Each function receives the output of the previous function
- The pipeline reads like a sequence of transformations
- Easy to add, remove, or reorder steps
- Composable and testable

## Importance

Pipe and compose are fundamental to functional programming because:

- **Readability**: Code reads like a pipeline of transformations
- **Composability**: Build complex operations from simple functions
- **Maintainability**: Easy to modify pipelines
- **Testability**: Each function can be tested independently
- **Reusability**: Create reusable transformation pipelines
- **Functional Style**: Enables functional programming patterns

## Usefulness & Practical Applications

These utilities are used extensively:

- **Data Processing**: Transforming data through multiple steps
- **API Response Processing**: Processing API responses through pipelines
- **Form Validation**: Chaining validation rules
- **Data Transformation**: ETL (Extract, Transform, Load) pipelines
- **Functional Libraries**: Core utilities in Lodash, Ramda
- **React**: Composing higher-order components
- **Redux**: Composing middleware and enhancers
- **Utility Functions**: Creating reusable utility pipelines

**Challenge:** Implement pipe (left-to-right) and compose (right-to-left).`,
    examples: [
      {
        input: `pipe(addOne, double, square)(2)`,
        output: `36`,
        explanation: '2 → 3 → 6 → 36',
      },
    ],
    starterCode: `// TODO: Implement pipe - left to right function composition
// pipe(f, g, h)(x) = h(g(f(x)))
function pipe(...fns) {
  return function(x) {
    return x;
  };
}

// TODO: Implement compose - right to left function composition
// compose(f, g, h)(x) = f(g(h(x)))
function compose(...fns) {
  return function(x) {
    return x;
  };
}

// Helper functions for testing
const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

// Test
const pipeline = pipe(addOne, double, square);
console.log(pipeline(2)); // 2 → 3 → 6 → 36

const composed = compose(square, double, addOne);
console.log(composed(2)); // 2 → 3 → 6 → 36`,
    solution: `function pipe(...fns) {
  return function(x) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}

function compose(...fns) {
  return function(x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}`,
    testCases: [
      {
        input: [2],
        expectedOutput: 36,
        description: 'pipe(addOne, double, square)(2) → 36',
      },
      {
        input: [2],
        expectedOutput: 36,
        description: 'compose(square, double, addOne)(2) → 36',
      },
      {
        input: [0],
        expectedOutput: 4,
        description: 'pipe(addOne, double, square)(0) → 4',
      },
      {
        input: [5],
        expectedOutput: 144,
        description: 'pipe(addOne, double, square)(5) → 144',
      },
      {
        input: [0],
        expectedOutput: 4,
        description: 'pipe(addOne, double, square)(0)',
      },
    ],
    hints: [
      'Use reduce for pipe: fns.reduce((acc, fn) => fn(acc), x)',
      'Use reduceRight for compose',
      'Each function receives the result of the previous',
    ],
  },
  {
    id: 'debounce-throttle',
    title: 'Debounce and Throttle',
    difficulty: 'hard',
    category: 'Functional Programming',
    description: `## In-Depth Explanation

Debounce and throttle are techniques to control how often a function executes, essential for performance optimization.

**Debounce**: Delays execution until after a specified time has passed since the last call. If called again before the delay, the timer resets. Perfect for search inputs, resize events, or API calls triggered by user input.

**Throttle**: Limits execution to at most once per specified interval. Unlike debounce, it guarantees execution at regular intervals. Perfect for scroll events, mouse movements, or any event that fires frequently.

The key difference:
- Debounce: "Wait until user stops typing, then search"
- Throttle: "Search at most once per second while typing"

Both use closures and timers (setTimeout/clearTimeout) to control execution timing.

## Importance

Debounce and throttle are essential for performance because:

- **Performance**: Reduce unnecessary function calls and computations
- **API Rate Limiting**: Prevent overwhelming APIs with requests
- **User Experience**: Improve responsiveness by reducing work
- **Resource Efficiency**: Reduce CPU usage and network traffic
- **Browser Performance**: Essential for handling frequent events (scroll, resize)
- **Cost Reduction**: Fewer API calls reduce costs

## Usefulness & Practical Applications

These patterns are used extensively:

- **Search Inputs**: Debounce search queries as user types
- **Scroll Events**: Throttle scroll handlers for performance
- **Resize Events**: Debounce window resize handlers
- **API Calls**: Debounce/throttle API requests
- **Button Clicks**: Prevent double-clicks and rapid submissions
- **Mouse Movements**: Throttle mouse move handlers
- **Auto-save**: Debounce auto-save functionality
- **Infinite Scroll**: Throttle scroll detection for infinite scroll

**Challenge:** Implement debounce and throttle utilities.
- Essential for scroll, resize, input handlers`,
    examples: [
      {
        input: `const debouncedSearch = debounce(search, 300)`,
        output: `Search executes 300ms after last keystroke`,
        explanation: 'Prevents excessive API calls while typing',
      },
    ],
    starterCode: `// TODO: Implement debounce
// Delays execution until no calls for 'delay' ms
function debounce(fn, delay) {
  // Store timeout ID
  // Clear previous timeout on each call
  // Set new timeout

  return fn;
}

// TODO: Implement throttle
// Executes at most once per 'interval' ms
function throttle(fn, interval) {
  // Track last execution time
  // Only execute if enough time has passed

  return fn;
}

// Test
let callCount = 0;
const incrementCounter = () => ++callCount;

const debouncedIncrement = debounce(incrementCounter, 100);
const throttledIncrement = throttle(incrementCounter, 100);

// Simulate rapid calls
for (let i = 0; i < 5; i++) {
  debouncedIncrement();
  throttledIncrement();
}`,
    solution: `function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, interval) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      return fn.apply(this, args);
    }
  };
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'debounce delays execution',
      },
      {
        input: [],
        expectedOutput: true,
        description: 'throttle limits execution rate',
      },
    ],
    hints: [
      'debounce: clearTimeout + setTimeout pattern',
      'throttle: track lastTime, compare with Date.now()',
      'Use fn.apply(this, args) to preserve context',
    ],
  },
  {
    id: 'mapped-types',
    title: 'TypeScript Mapped Types',
    difficulty: 'hard',
    category: 'TypeScript Advanced',
    description: `## In-Depth Explanation

Mapped types transform existing types by iterating over their properties and applying transformations. The syntax \`[K in keyof T]: Transformation\` creates a new type by mapping over each key in \`T\`.

Key modifiers:
- **?\**: Makes property optional (\`Partial<T>\`)
- **-?\**: Removes optional modifier (\`Required<T>\`)
- **readonly**: Makes property readonly (\`Readonly<T>\`)
- **-readonly**: Removes readonly modifier

This enables creating utility types like:
- \`Partial<T>\`: All properties optional
- \`Required<T>\`: All properties required
- \`Readonly<T>\`: All properties readonly
- \`Pick<T, K>\`: Select specific properties
- \`Omit<T, K>\`: Exclude specific properties

## Importance

Mapped types are essential for TypeScript type manipulation because:

- **Type Transformation**: Transform types programmatically
- **Utility Types**: Create reusable utility types
- **DRY Principle**: Avoid duplicating type definitions
- **Type Safety**: Maintain type safety while transforming
- **Framework Development**: Essential for building type-safe frameworks
- **API Design**: Create flexible, type-safe APIs

## Usefulness & Practical Applications

Mapped types are used extensively:

- **Utility Types**: Creating Partial, Required, Readonly, Pick, Omit
- **API Types**: Transforming API request/response types
- **Form Types**: Creating form types from data types
- **State Management**: Transforming state types
- **Component Props**: Transforming component prop types
- **Database Types**: Transforming database model types
- **Configuration Types**: Creating configuration types from schemas
- **Library Development**: Building type-safe libraries

**Challenge:** Create utility types using mapped type syntax.`,
    examples: [
      {
        input: `type Partial<T> = { [K in keyof T]?: T[K] }`,
        output: `All properties become optional`,
        explanation: 'Map over keys and add ? modifier',
      },
    ],
    starterCode: `// TODO: Create MyPartial - make all properties optional
type MyPartial<T> = T; // Fix this

// TODO: Create MyRequired - make all properties required
type MyRequired<T> = T; // Fix this

// TODO: Create MyReadonly - make all properties readonly
type MyReadonly<T> = T; // Fix this

// TODO: Create Nullable - make all properties nullable
type Nullable<T> = T; // Fix this

// Test types
interface User {
  name: string;
  age: number;
  email?: string;
}

type PartialUser = MyPartial<User>;
type RequiredUser = MyRequired<User>;
type ReadonlyUser = MyReadonly<User>;
type NullableUser = Nullable<User>;

// Test
const partialUser: PartialUser = { name: 'John' };
const requiredUser: RequiredUser = { name: 'John', age: 30, email: 'john@example.com' };`,
    solution: `type MyPartial<T> = { [K in keyof T]?: T[K] };

type MyRequired<T> = { [K in keyof T]-?: T[K] };

type MyReadonly<T> = { readonly [K in keyof T]: T[K] };

type Nullable<T> = { [K in keyof T]: T[K] | null };`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type checking only',
      },
    ],
    hints: [
      '[K in keyof T] iterates over all keys',
      '? adds optional, -? removes optional',
      'readonly adds readonly modifier',
    ],
  },
  {
    id: 'conditional-types',
    title: 'TypeScript Conditional Types',
    difficulty: 'hard',
    category: 'TypeScript Advanced',
    description: `## In-Depth Explanation

Conditional types enable type-level conditional logic using the syntax \`T extends U ? X : Y\`. If \`T\` extends \`U\`, the type is \`X\`, otherwise \`Y\`.

Key features:
- **Type Selection**: Choose types based on conditions
- **Type Filtering**: Filter union types (remove unwanted types)
- **Type Extraction**: Extract types from complex structures
- **Distributive**: Conditional types distribute over union types

Common patterns:
- **Type Guards**: \`T extends string ? true : false\`
- **Type Extraction**: \`T extends Promise<infer U> ? U : T\`
- **Type Filtering**: \`T extends null | undefined ? never : T\` (NonNullable)

## Importance

Conditional types are essential for advanced TypeScript because:

- **Type-Level Logic**: Implement logic at the type level
- **Type Safety**: Create more precise, conditional types
- **Utility Types**: Build powerful utility types
- **Framework Development**: Essential for advanced frameworks
- **API Design**: Create flexible, conditional APIs
- **Type Inference**: Extract and infer types from complex structures

## Usefulness & Practical Applications

Conditional types are used extensively:

- **Utility Types**: NonNullable, Extract, Exclude, ReturnType, Parameters
- **Type Extraction**: Extracting types from Promises, arrays, functions
- **Type Filtering**: Filtering union types
- **Framework Types**: React, Vue use conditional types for component types
- **API Types**: Creating conditional API response types
- **Generic Constraints**: Creating conditional generic constraints
- **Type Guards**: Type-level type guards
- **Library Development**: Building advanced type-safe libraries

**Challenge:** Build conditional types for type selection and filtering.`,
    examples: [
      {
        input: `type IsString<T> = T extends string ? true : false`,
        output: `IsString<'hello'> = true`,
        explanation: 'Type-level conditional logic',
      },
    ],
    starterCode: `// TODO: Create IsArray type - returns true if T is an array
type IsArray<T> = false; // Fix this

// TODO: Create ExtractArrayType - get element type from array
// ExtractArrayType<string[]> → string
type ExtractArrayType<T> = T; // Fix this

// TODO: Create NonNullable equivalent - remove null and undefined
type MyNonNullable<T> = T; // Fix this

// TODO: Create FunctionReturnType - extract return type of function
type FunctionReturnType<T> = T; // Fix this

// Test
type Test1 = IsArray<string[]>; // should be true
type Test2 = IsArray<string>; // should be false
type Test3 = ExtractArrayType<number[]>; // should be number
type Test4 = MyNonNullable<string | null | undefined>; // should be string
type Test5 = FunctionReturnType<() => string>; // should be string`,
    solution: `type IsArray<T> = T extends any[] ? true : false;

type ExtractArrayType<T> = T extends (infer U)[] ? U : never;

type MyNonNullable<T> = T extends null | undefined ? never : T;

type FunctionReturnType<T> = T extends (...args: any[]) => infer R ? R : never;`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type checking only',
      },
    ],
    hints: [
      'T extends U ? X : Y is the conditional syntax',
      'Use infer to extract types: T extends (infer U)[] ? U : never',
      'never in unions is removed (filtering)',
    ],
  },
  {
    id: 'infer-keyword',
    title: 'TypeScript Infer Keyword',
    difficulty: 'hard',
    category: 'TypeScript Advanced',
    description: `## In-Depth Explanation

The \`infer\` keyword allows you to extract types from complex type structures within conditional types. It creates a type variable that captures the type at a specific position.

The pattern: \`T extends SomePattern<infer U> ? U : never\`
- \`infer U\` captures the type at that position
- If \`T\` matches the pattern, \`U\` is the extracted type
- Otherwise, the type is \`never\`

Common extractions:
- **Return Types**: \`T extends (...args: any[]) => infer R ? R : never\`
- **Parameter Types**: \`T extends (arg: infer P) => any ? P : never\`
- **Promise Types**: \`T extends Promise<infer U> ? U : T\`
- **Array Types**: \`T extends (infer U)[] ? U : never\`

## Importance

The infer keyword is essential for type extraction because:

- **Type Extraction**: Extract types from complex structures
- **Utility Types**: Build utility types like ReturnType, Parameters
- **Type Inference**: Infer types from function signatures
- **Framework Development**: Essential for advanced type systems
- **API Types**: Extract types from API response types
- **Generic Programming**: Advanced generic type programming

## Usefulness & Practical Applications

The infer keyword is used extensively:

- **Utility Types**: ReturnType, Parameters, ConstructorParameters, InstanceType
- **Promise Unwrapping**: Unwrapping Promise types
- **Function Types**: Extracting function parameter and return types
- **React Types**: Extracting component prop types
- **API Types**: Extracting types from API response types
- **Generic Libraries**: Building generic type utilities
- **Type Utilities**: Creating reusable type utilities
- **Framework Internals**: Used internally by TypeScript and frameworks

**Challenge:** Use infer to extract types from functions, promises, and more.`,
    examples: [
      {
        input: `type Unwrap<T> = T extends Promise<infer U> ? U : T`,
        output: `Unwrap<Promise<string>> = string`,
        explanation: 'Extract inner type from Promise',
      },
    ],
    starterCode: `// TODO: Create UnwrapPromise - extract type from Promise
// UnwrapPromise<Promise<string>> → string
type UnwrapPromise<T> = T; // Fix this

// TODO: Create FirstParameter - get first parameter type of function
// FirstParameter<(a: string, b: number) => void> → string
type FirstParameter<T> = unknown; // Fix this

// TODO: Create LastParameter - get last parameter type
// Hint: Use rest parameters (...args: infer R)
type LastParameter<T> = unknown; // Fix this

// TODO: Create ConstructorParameters - get constructor parameter types
type MyConstructorParameters<T> = unknown; // Fix this

// Test
type Test1 = UnwrapPromise<Promise<number>>; // number
type Test2 = FirstParameter<(a: string, b: number) => void>; // string
type Fn = (a: number, b: string, c: boolean) => void;
type Test3 = LastParameter<Fn>; // boolean

class MyClass {
  constructor(name: string, age: number) {}
}
type Test4 = MyConstructorParameters<typeof MyClass>; // [string, number]`,
    solution: `type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type FirstParameter<T> = T extends (first: infer F, ...args: any[]) => any ? F : never;

type LastParameter<T> = T extends (...args: [...any[], infer L]) => any ? L : never;

type MyConstructorParameters<T> = T extends new (...args: infer P) => any ? P : never;`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Type checking only',
      },
    ],
    hints: [
      'infer U captures the type in that position',
      'Use pattern matching: Promise<infer U>, (infer P) => R',
      'For constructors: new (...args: infer P) => any',
    ],
  },
  {
    id: 'branded-types',
    title: 'TypeScript Branded Types',
    difficulty: 'hard',
    category: 'TypeScript Advanced',
    description: `## In-Depth Explanation

Branded types create distinct types from the same underlying type (like \`number\` or \`string\`) by adding a "brand" - a unique property that exists only at the type level. This prevents mixing up values that have the same type but different meanings.

The pattern: \`type UserId = number & { readonly __brand: unique symbol }\`
- Same underlying type (\`number\`)
- Different brand (unique symbol)
- TypeScript treats them as incompatible

This enables:
- **Type Safety**: Prevent \`UserId\` from being used as \`ProductId\`
- **Semantic Types**: Create types that represent specific concepts
- **Validation**: Only validated values can be branded types
- **API Safety**: Prevent passing wrong IDs to functions

## Importance

Branded types are essential for type safety because:

- **Prevent Bugs**: Catch bugs where wrong IDs are passed
- **Type Safety**: Stronger type safety than primitive types
- **Semantic Clarity**: Types that clearly represent concepts
- **API Design**: Create safer APIs that prevent misuse
- **Validation**: Ensure only validated values are used
- **Refactoring**: Safer refactoring with distinct types

## Usefulness & Practical Applications

Branded types are used extensively:

- **ID Types**: UserId, ProductId, OrderId - prevent mixing IDs
- **Validated Types**: Email, URL, PhoneNumber - only validated values
- **Unit Types**: Meters, Kilograms - prevent unit mixing
- **API Types**: RequestId, SessionId - prevent API misuse
- **Database Types**: PrimaryKey, ForeignKey - type-safe database operations
- **Security**: Token types, API keys - prevent misuse
- **Domain Modeling**: Domain-specific types in DDD
- **Library Development**: Building type-safe libraries

**Challenge:** Use branded types to prevent mixing up similar values.`,
    examples: [
      {
        input: `type UserId = number & { __brand: 'UserId' }`,
        output: `UserId and ProductId are incompatible`,
        explanation: 'Same underlying type, but different brands',
      },
    ],
    starterCode: `// TODO: Create branded types for UserId and ProductId
// Both are numbers but should not be interchangeable
type UserId = number; // Fix this
type ProductId = number; // Fix this

// TODO: Create validation functions that return branded types
function createUserId(id: number): UserId {
  return id; // Fix this
}

function createProductId(id: number): ProductId {
  return id; // Fix this
}

// TODO: Create a function that only accepts UserId
function getUser(id: UserId): string {
  return 'User ' + id;
}

// TODO: Create a function that only accepts ProductId
function getProduct(id: ProductId): string {
  return 'Product ' + id;
}

// Test - this should work
const userId = createUserId(1);
const productId = createProductId(1);
console.log(getUser(userId));
console.log(getProduct(productId));

// This should cause type error (uncomment to test):
// getUser(productId); // Error!
// getProduct(userId); // Error!`,
    solution: `type UserId = number & { readonly __brand: unique symbol };
type ProductId = number & { readonly __brand: unique symbol };

function createUserId(id: number): UserId {
  return id as UserId;
}

function createProductId(id: number): ProductId {
  return id as ProductId;
}

function getUser(id: UserId): string {
  return 'User ' + id;
}

function getProduct(id: ProductId): string {
  return 'Product ' + id;
}`,
    testCases: [
      {
        input: [1],
        expectedOutput: 'User 1',
        description: 'getUser with UserId',
      },
      {
        input: [1],
        expectedOutput: 'Product 1',
        description: 'getProduct with ProductId',
      },
    ],
    hints: [
      'Add a phantom property: number & { __brand: "UserId" }',
      'Use unique symbol for true uniqueness',
      'Cast with "as" in factory functions',
    ],
  },
  {
    id: 'proxy-traps',
    title: 'JavaScript Proxy',
    difficulty: 'hard',
    category: 'JavaScript Advanced',
    description: `## In-Depth Explanation

Proxy traps are methods in a Proxy handler that intercept operations on the target object. Each trap corresponds to a JavaScript operation and allows you to customize behavior.

Common traps:
- **get**: Intercepts property access
- **set**: Intercepts property assignment
- **has**: Intercepts \`in\` operator
- **deleteProperty**: Intercepts \`delete\` operator
- **ownKeys**: Intercepts \`Object.keys()\`
- **apply**: Intercepts function calls (for function proxies)

Proxies enable:
- **Validation**: Validate property assignments
- **Logging**: Log all property access
- **Default Values**: Return defaults for missing properties
- **Reactivity**: Vue 3 reactivity system uses Proxies
- **Virtual Properties**: Create computed properties
- **Access Control**: Implement private properties

## Importance

Proxy traps are essential for meta-programming because:

- **Interception**: Intercept and customize any object operation
- **Validation**: Automatic validation on property access/assignment
- **Reactivity**: Foundation for reactive frameworks
- **Debugging**: Logging and monitoring object operations
- **Security**: Implement access control and validation
- **Framework Development**: Essential for building frameworks

## Usefulness & Practical Applications

Proxy traps are used extensively:

- **Reactive Frameworks**: Vue 3 reactivity system
- **Validation Libraries**: Automatic property validation
- **ORM Libraries**: Lazy loading and virtual properties
- **Debugging Tools**: Logging object access and mutations
- **Access Control**: Implementing private properties
- **API Wrappers**: Intercepting API calls for caching/logging
- **State Management**: Reactive state management
- **Mocking/Testing**: Creating test doubles

**Challenge:** Create proxies for validation, logging, and default values.`,
    examples: [
      {
        input: `new Proxy(obj, { get(target, prop) { ... } })`,
        output: `Intercept property access`,
        explanation: 'Custom behavior for getting properties',
      },
    ],
    starterCode: `// TODO: Create a proxy that logs all property access
function createLoggingProxy(obj) {
  // Return a Proxy that logs get and set operations
  return obj;
}

// TODO: Create a proxy with default values for missing properties
function createDefaultProxy(obj, defaultValue) {
  // Return defaultValue for any missing property
  return obj;
}

// TODO: Create a validating proxy for a user object
function createValidatingProxy(obj) {
  // Validate: name must be string, age must be positive number
  // Throw error on invalid values
  return obj;
}

// Test
const logged = createLoggingProxy({ x: 1, y: 2 });
console.log(logged.x); // Should log: "Getting x"
logged.x = 10; // Should log: "Setting x to 10"

const withDefaults = createDefaultProxy({}, 'N/A');
console.log(withDefaults.missing); // 'N/A'

const user = createValidatingProxy({ name: 'John', age: 30 });
user.name = 'Jane'; // OK
// user.age = -5; // Should throw error`,
    solution: `function createLoggingProxy(obj) {
  return new Proxy(obj, {
    get(target, prop) {
      console.log('Getting ' + String(prop));
      return target[prop];
    },
    set(target, prop, value) {
      console.log('Setting ' + String(prop) + ' to ' + value);
      target[prop] = value;
      return true;
    }
  });
}

function createDefaultProxy(obj, defaultValue) {
  return new Proxy(obj, {
    get(target, prop) {
      return prop in target ? target[prop] : defaultValue;
    }
  });
}

function createValidatingProxy(obj) {
  return new Proxy(obj, {
    set(target, prop, value) {
      if (prop === 'name' && typeof value !== 'string') {
        throw new Error('name must be a string');
      }
      if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
        throw new Error('age must be a positive number');
      }
      target[prop] = value;
      return true;
    }
  });
}`,
    testCases: [
      {
        input: [{ x: 1 }],
        expectedOutput: 1,
        description: 'logging proxy get',
      },
      {
        input: [{}, 'N/A'],
        expectedOutput: 'N/A',
        description: 'default proxy missing prop',
      },
    ],
    hints: [
      'new Proxy(target, handler) creates proxy',
      'get(target, prop) intercepts property access',
      'set(target, prop, value) must return true',
    ],
  },
  {
    id: 'generator-functions',
    title: 'Generator Functions',
    difficulty: 'hard',
    category: 'JavaScript Advanced',
    description: `## In-Depth Explanation

Generator functions (declared with \`function*\`) create iterators that can pause and resume execution. They use \`yield\` to produce values and pause execution, returning control to the caller.

Key characteristics:
- **Lazy Evaluation**: Values are computed on-demand, not all at once
- **Pausable**: Execution pauses at each \`yield\`, resumes when next value is requested
- **Iterable**: Generators are iterables, can be used with \`for...of\`, spread operator
- **Infinite Sequences**: Can produce infinite sequences (Fibonacci, primes, etc.)
- **Stateful**: Maintain state between yields

Use cases:
- **Sequences**: Generate number sequences, ranges, patterns
- **Pagination**: Yield pages of data one at a time
- **Infinite Data**: Generate infinite sequences (IDs, random numbers)
- **State Machines**: Implement state machines with generators
- **Coroutines**: Implement coroutines and cooperative multitasking

## Importance

Generators are essential for advanced JavaScript patterns because:

- **Memory Efficiency**: Generate values on-demand, not all at once
- **Infinite Sequences**: Handle infinite data streams
- **Control Flow**: Complex control flow with pausable execution
- **Iteration**: Create custom iterables easily
- **Async Patterns**: Foundation for async generators
- **Performance**: Efficient for large or infinite sequences

## Usefulness & Practical Applications

Generators are used extensively:

- **Sequence Generation**: Number sequences, date ranges, patterns
- **Pagination**: Fetching and processing paginated data
- **Infinite Scrolling**: Generating content for infinite scroll
- **ID Generation**: Generating unique IDs on demand
- **Data Processing**: Processing large datasets in chunks
- **State Machines**: Implementing state machines
- **Coroutines**: Implementing coroutines
- **Testing**: Generating test data on demand

**Challenge:** Use generators for sequences, pagination, and async iteration.`,
    examples: [
      {
        input: `function* count() { yield 1; yield 2; yield 3; }`,
        output: `[...count()] → [1, 2, 3]`,
        explanation: 'Generator produces values on demand',
      },
    ],
    starterCode: `// TODO: Create a generator that yields numbers from start to end
function* range(start, end) {
  // yield each number from start to end (inclusive)
}

// TODO: Create an infinite ID generator
function* idGenerator(prefix = 'id') {
  // yield 'id-1', 'id-2', 'id-3', ...
}

// TODO: Create a generator that yields Fibonacci numbers
function* fibonacci() {
  // yield infinite Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8...
}

// TODO: Create a generator that chunks an array
function* chunk(arr, size) {
  // yield arrays of 'size' elements
  // chunk([1,2,3,4,5], 2) → [1,2], [3,4], [5]
}

// Test
console.log([...range(1, 5)]); // [1, 2, 3, 4, 5]

const ids = idGenerator('user');
console.log(ids.next().value); // 'user-1'
console.log(ids.next().value); // 'user-2'

const fib = fibonacci();
const first10Fib = Array.from({ length: 10 }, () => fib.next().value);
console.log(first10Fib);

console.log([...chunk([1, 2, 3, 4, 5], 2)]);`,
    solution: `function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

function* idGenerator(prefix = 'id') {
  let id = 1;
  while (true) {
    yield prefix + '-' + id++;
  }
}

function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function* chunk(arr, size) {
  for (let i = 0; i < arr.length; i += size) {
    yield arr.slice(i, i + size);
  }
}`,
    testCases: [
      {
        input: [1, 5],
        expectedOutput: [1, 2, 3, 4, 5],
        description: 'range generator',
      },
      {
        input: [[1, 2, 3, 4, 5], 2],
        expectedOutput: [[1, 2], [3, 4], [5]],
        description: 'chunk generator',
      },
    ],
    hints: [
      'Use function* to declare a generator',
      'yield pauses execution and returns value',
      'while(true) with yield creates infinite generator',
    ],
  },
  {
    id: 'weak-collections',
    title: 'WeakMap and WeakSet',
    difficulty: 'medium',
    category: 'JavaScript Advanced',
    description: `## In-Depth Explanation

WeakMap and WeakSet are collections with "weak" references to their keys/elements. Unlike Map and Set, they don't prevent garbage collection of their keys/elements. When an object used as a key is garbage collected, the entry is automatically removed.

Key characteristics:
- **Weak References**: Don't prevent garbage collection
- **Object Keys Only**: Keys must be objects (not primitives)
- **No Iteration**: Cannot iterate over entries (no size, keys, values, entries)
- **Automatic Cleanup**: Entries removed when key is garbage collected

This makes them perfect for:
- **Private Data**: Store private data associated with objects
- **Metadata**: Store metadata without preventing GC
- **Caching**: Cache computed values without memory leaks
- **Event Handlers**: Store event handlers without preventing GC

## Importance

Weak collections are essential for memory management because:

- **Memory Efficiency**: Don't prevent garbage collection of keys
- **No Memory Leaks**: Automatic cleanup prevents memory leaks
- **Private Data**: Store private data without exposing it
- **Metadata Storage**: Store metadata without memory concerns
- **Library Development**: Essential for libraries that attach data to user objects
- **Performance**: Better memory usage in long-running applications

## Usefulness & Practical Applications

Weak collections are used extensively:

- **Private Properties**: Implementing private properties in classes
- **Metadata Storage**: Storing metadata about DOM elements or objects
- **Caching**: Caching computed values without preventing GC
- **Event Handlers**: Storing event handlers without memory leaks
- **Library Internals**: Libraries storing internal data about user objects
- **DOM Manipulation**: Storing data about DOM nodes
- **Object Tracking**: Tracking visited objects without preventing GC
- **Memoization**: Memoizing without preventing object collection

**Challenge:** Implement private data and caching with WeakMap.`,
    examples: [
      {
        input: `const privateData = new WeakMap();`,
        output: `Store private data associated with objects`,
        explanation: "Data is GC'd when object is GC'd",
      },
    ],
    starterCode: `// TODO: Implement private data storage using WeakMap
const privateData = new WeakMap();

class User {
  constructor(name, password) {
    // TODO: Store password privately using WeakMap
    // Public property
    this.name = name;
    // Private (should use WeakMap)
    this.password = password; // Fix: make private
  }

  checkPassword(password) {
    // TODO: Check against private password
    return this.password === password;
  }
}

// TODO: Create a memoize function using WeakMap for object arguments
function memoizeByObject(fn) {
  // Cache results by object reference
  // WeakMap allows garbage collection of unused cache entries
  return fn;
}

// Test
const user = new User('John', 'secret123');
console.log(user.name); // 'John'
console.log(user.password); // Should be undefined (private)
console.log(user.checkPassword('secret123')); // true
console.log(user.checkPassword('wrong')); // false`,
    solution: `const privateData = new WeakMap();

class User {
  constructor(name, password) {
    this.name = name;
    privateData.set(this, { password });
  }

  checkPassword(password) {
    const data = privateData.get(this);
    return data && data.password === password;
  }
}

function memoizeByObject(fn) {
  const cache = new WeakMap();
  return function(obj) {
    if (cache.has(obj)) {
      return cache.get(obj);
    }
    const result = fn(obj);
    cache.set(obj, result);
    return result;
  };
}`,
    testCases: [
      {
        input: ['secret123'],
        expectedOutput: true,
        description: 'checkPassword correct',
      },
      {
        input: ['wrong'],
        expectedOutput: false,
        description: 'checkPassword wrong',
      },
    ],
    hints: [
      'WeakMap.set(key, value), .get(key), .has(key)',
      'Keys must be objects, not primitives',
      'Perfect for associating private data with instances',
    ],
  };
