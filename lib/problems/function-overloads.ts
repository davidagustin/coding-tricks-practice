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
  id: 'function-overloads',
  title: 'Function Overloads',
  difficulty: 'medium',
  category: 'TypeScript Basics',
  description: `<h2>In-Depth Explanation</h2>

<p>Function overloads in TypeScript allow you to define multiple function signatures for a single function implementation. This enables a function to accept different parameter types and return different types based on the input.</p>

<p>The syntax involves:</p>
<ol>
  <li><strong>Overload signatures</strong>: Multiple function declarations that define the public API</li>
  <li><strong>Implementation signature</strong>: A single function implementation that handles all overload cases</li>
</ol>

<pre><code>// Overload signatures (what callers see)
function process(x: string): string;
function process(x: number): number;

// Implementation signature (internal)
function process(x: string | number): string | number {
  if (typeof x === 'string') return x.toUpperCase();
  return x * 2;
}</code></pre>

<p>The implementation signature must be compatible with all overload signatures but is not visible to callers. Only the overload signatures are part of the public API.</p>

<h2>Importance</h2>

<p>Function overloads are important because:</p>

<ul>
  <li><strong>Type Precision</strong>: Return types can depend on input types</li>
  <li><strong>API Clarity</strong>: Clear documentation of all valid call patterns</li>
  <li><strong>IDE Support</strong>: Better autocomplete and inline documentation</li>
  <li><strong>Type Inference</strong>: Callers get precise return types without type guards</li>
  <li><strong>Backward Compatibility</strong>: Extend functions without breaking existing code</li>
  <li><strong>Polymorphism</strong>: Single function name for related operations</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Function overloads are commonly used for:</p>

<ul>
  <li><strong>DOM APIs</strong>: document.createElement returns specific element types</li>
  <li><strong>Event Handlers</strong>: addEventListener with specific event types</li>
  <li><strong>Parsing Functions</strong>: Different return types based on input format</li>
  <li><strong>Factory Functions</strong>: Creating different objects based on parameters</li>
  <li><strong>Utility Libraries</strong>: Lodash, Ramda use overloads extensively</li>
  <li><strong>React Hooks</strong>: useState with different initial value types</li>
  <li><strong>Database Queries</strong>: Different return types for single vs multiple results</li>
  <li><strong>Conversion Functions</strong>: Type-specific conversions</li>
</ul>

<p><strong>Challenge:</strong> Create functions with overloads that return different types based on their inputs.</p>`,
  examples: [
    {
      input: `// Basic overload pattern
function reverse(value: string): string;
function reverse(value: number[]): number[];
function reverse(value: string | number[]): string | number[] {
  if (typeof value === 'string') {
    return value.split('').reverse().join('');
  }
  return value.slice().reverse();
}

reverse('hello');  // Returns string: 'olleh'
reverse([1, 2, 3]); // Returns number[]: [3, 2, 1]`,
      output: `'olleh' or [3, 2, 1]`,
      explanation: 'TypeScript knows the exact return type based on input type',
    },
    {
      input: `// Overload with different parameter counts
function createElement(tag: 'div'): HTMLDivElement;
function createElement(tag: 'span'): HTMLSpanElement;
function createElement(tag: 'input'): HTMLInputElement;
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}`,
      output: `Specific element type`,
      explanation: 'Literal types in overloads enable precise return types',
    },
    {
      input: `// Overload with optional parameters
function format(value: string): string;
function format(value: number, decimals: number): string;
function format(value: string | number, decimals?: number): string {
  if (typeof value === 'string') return value.trim();
  return value.toFixed(decimals);
}`,
      output: `Formatted string`,
      explanation: 'Overloads can have different parameter counts',
    },
  ],
  starterCode: `// TODO: Practice function overloads in TypeScript

// Task 1: Create a parse function with overloads
// - parse(value: string, type: 'number') should return number
// - parse(value: string, type: 'boolean') should return boolean
// - parse(value: string, type: 'json') should return object

// TODO: Add overload signatures here
function parse(value: string, type: 'number'): number;
function parse(value: string, type: 'boolean'): boolean;
function parse(value: string, type: 'json'): object;
// TODO: Add implementation signature and function body
function parse(value: string, type: 'number' | 'boolean' | 'json'): number | boolean | object {
  // Your implementation here
}

// Task 2: Create a find function with overloads
// - find(arr: T[], predicate): returns T | undefined
// - find(arr: T[], predicate, defaultValue: T): returns T (guaranteed)

// TODO: Add overload signatures and implementation
function find<T>(arr: T[], predicate: (item: T) => boolean): T | undefined;
function find<T>(arr: T[], predicate: (item: T) => boolean, defaultValue: T): T;
function find<T>(arr: T[], predicate: (item: T) => boolean, defaultValue?: T): T | undefined {
  // Your implementation here
}

// Task 3: Create a makeRequest function with overloads
// Different return types based on response type parameter
interface User { id: number; name: string; }
interface Product { id: number; title: string; price: number; }

// TODO: Add overload signatures
function makeRequest(endpoint: '/users'): Promise<User[]>;
function makeRequest(endpoint: '/users', id: number): Promise<User>;
function makeRequest(endpoint: '/products'): Promise<Product[]>;
function makeRequest(endpoint: '/products', id: number): Promise<Product>;
// TODO: Add implementation signature and function body
function makeRequest(
  endpoint: '/users' | '/products',
  id?: number
): Promise<User[] | User | Product[] | Product> {
  // Simulate API response
  // Your implementation here
}

// Task 4: Create a combine function with overloads
// - combine(a: string, b: string) returns string (concatenation)
// - combine(a: number, b: number) returns number (addition)
// - combine(a: any[], b: any[]) returns any[] (array concatenation)

// TODO: Add overload signatures and implementation
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine<T>(a: T[], b: T[]): T[];
function combine<T>(a: string | number | T[], b: string | number | T[]): string | number | T[] {
  // Your implementation here
}

// Test your implementations
console.log(parse('42', 'number'));          // Should return number 42
console.log(parse('true', 'boolean'));       // Should return boolean true
console.log(parse('{"a":1}', 'json'));       // Should return object { a: 1 }

console.log(find([1, 2, 3, 4, 5], x => x > 3));              // Should return 4
console.log(find([1, 2, 3], x => x > 10, 0));                // Should return 0

console.log(combine('Hello, ', 'World!'));   // Should return 'Hello, World!'
console.log(combine(10, 20));                // Should return 30
console.log(combine([1, 2], [3, 4]));        // Should return [1, 2, 3, 4]`,
  solution: `// Task 1: Create a parse function with overloads
function parse(value: string, type: 'number'): number;
function parse(value: string, type: 'boolean'): boolean;
function parse(value: string, type: 'json'): object;
function parse(value: string, type: 'number' | 'boolean' | 'json'): number | boolean | object {
  if (type === 'number') {
    return parseFloat(value);
  } else if (type === 'boolean') {
    return value === 'true' || value === '1';
  } else {
    return JSON.parse(value);
  }
}

// Task 2: Create a find function with overloads
function find<T>(arr: T[], predicate: (item: T) => boolean): T | undefined;
function find<T>(arr: T[], predicate: (item: T) => boolean, defaultValue: T): T;
function find<T>(arr: T[], predicate: (item: T) => boolean, defaultValue?: T): T | undefined {
  for (const item of arr) {
    if (predicate(item)) {
      return item;
    }
  }
  return defaultValue;
}

// Task 3: Create a makeRequest function with overloads
interface User { id: number; name: string; }
interface Product { id: number; title: string; price: number; }

function makeRequest(endpoint: '/users'): Promise<User[]>;
function makeRequest(endpoint: '/users', id: number): Promise<User>;
function makeRequest(endpoint: '/products'): Promise<Product[]>;
function makeRequest(endpoint: '/products', id: number): Promise<Product>;
function makeRequest(
  endpoint: '/users' | '/products',
  id?: number
): Promise<User[] | User | Product[] | Product> {
  // Simulate API response
  if (endpoint === '/users') {
    if (id !== undefined) {
      return Promise.resolve({ id, name: 'User ' + id });
    }
    return Promise.resolve([{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }]);
  } else {
    if (id !== undefined) {
      return Promise.resolve({ id, title: 'Product ' + id, price: 99.99 });
    }
    return Promise.resolve([{ id: 1, title: 'Product 1', price: 29.99 }, { id: 2, title: 'Product 2', price: 49.99 }]);
  }
}

// Task 4: Create a combine function with overloads
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine<T>(a: T[], b: T[]): T[];
function combine<T>(a: string | number | T[], b: string | number | T[]): string | number | T[] {
  if (typeof a === 'string' && typeof b === 'string') {
    return a + b;
  } else if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  } else if (Array.isArray(a) && Array.isArray(b)) {
    return [...a, ...b];
  }
  throw new Error('Invalid argument types');
}

// Test
console.log(parse('42', 'number'));          // 42
console.log(parse('true', 'boolean'));       // true
console.log(parse('{"a":1}', 'json'));       // { a: 1 }
console.log(find([1, 2, 3, 4, 5], x => x > 3));              // 4
console.log(find([1, 2, 3], x => x > 10, 0));                // 0
console.log(combine('Hello, ', 'World!'));   // 'Hello, World!'
console.log(combine(10, 20));                // 30
console.log(combine([1, 2], [3, 4]));        // [1, 2, 3, 4]`,
  testCases: [
    {
      input: ['42', 'number'],
      expectedOutput: 42,
      description: 'parse converts string to number',
    },
    {
      input: ['true', 'boolean'],
      expectedOutput: true,
      description: 'parse converts string to boolean',
    },
    {
      input: ['Hello, ', 'World!'],
      expectedOutput: 'Hello, World!',
      description: 'combine concatenates strings',
    },
    {
      input: [10, 20],
      expectedOutput: 30,
      description: 'combine adds numbers',
    },
    {
      input: [[1, 2], [3, 4]],
      expectedOutput: [1, 2, 3, 4],
      description: 'combine concatenates arrays',
    },
  ],
  hints: [
    'Overload signatures come before the implementation and define the public API',
    'The implementation signature must be compatible with ALL overload signatures',
    'The implementation signature is not visible to callers - only overloads are',
    'Use typeof, instanceof, or other type guards in the implementation to handle different cases',
    'Overloads are resolved top-to-bottom, so put more specific signatures first',
    'You can use literal types in overloads for very precise return type inference',
  ],
};
