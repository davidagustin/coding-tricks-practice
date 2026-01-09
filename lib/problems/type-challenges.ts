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
  id: 'type-challenges',
  title: 'Advanced Type Challenges',
  difficulty: 'hard',
  category: 'TypeScript Advanced',
  description: `<h2>In-Depth Explanation</h2>

<p>This challenge combines multiple advanced TypeScript concepts to build complex utility types. You'll implement DeepReadonly, Flatten, and other advanced type utilities that are commonly needed in real-world applications.</p>

<p>Key concepts used:</p>
<ul>
  <li><strong>Mapped Types</strong>: Transform each property of a type</li>
  <li><strong>Conditional Types</strong>: Branch type logic based on conditions</li>
  <li><strong>Recursive Types</strong>: Types that reference themselves for deep transformations</li>
  <li><strong>Infer Keyword</strong>: Extract types from complex structures</li>
  <li><strong>Key Remapping</strong>: Transform property keys in mapped types</li>
</ul>

<p>Utility types to build:</p>
<ul>
  <li><strong>DeepReadonly</strong>: Make all properties readonly recursively</li>
  <li><strong>Flatten</strong>: Flatten array types to their element type</li>
  <li><strong>TupleToUnion</strong>: Convert tuple types to union types</li>
  <li><strong>PickByType</strong>: Pick properties by their value type</li>
</ul>

<h2>Importance</h2>

<p>These advanced type challenges matter because:</p>

<ul>
  <li><strong>Real-World Usage</strong>: These patterns appear in production codebases</li>
  <li><strong>Library Development</strong>: Essential for building type-safe libraries</li>
  <li><strong>Deep Understanding</strong>: Demonstrates mastery of TypeScript's type system</li>
  <li><strong>Problem Solving</strong>: Develops type-level programming skills</li>
  <li><strong>Interview Prep</strong>: Common in senior TypeScript interviews</li>
  <li><strong>Framework Types</strong>: Understanding how React, Vue types work internally</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>These utility types are used for:</p>

<ul>
  <li><strong>Immutable State</strong>: DeepReadonly for Redux/Zustand state</li>
  <li><strong>API Responses</strong>: Flatten nested response types</li>
  <li><strong>Configuration</strong>: DeepPartial for config overrides</li>
  <li><strong>Form Libraries</strong>: Deep key paths for nested forms</li>
  <li><strong>ORM Types</strong>: Complex database query result types</li>
  <li><strong>GraphQL</strong>: Response type transformations</li>
  <li><strong>Validation</strong>: Type-safe schema definitions</li>
  <li><strong>Testing</strong>: Mock type generation</li>
</ul>

<p><strong>Challenge:</strong> Implement these advanced utility types to level up your TypeScript skills.</p>`,
  examples: [
    {
      input: `type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> }`,
      output: `DeepReadonly<{ a: { b: string } }> = { readonly a: { readonly b: string } }`,
      explanation: 'Recursively applies readonly to all nested properties',
    },
    {
      input: `type Flatten<T> = T extends Array<infer U> ? U : T`,
      output: `Flatten<string[]> = string`,
      explanation: 'Extracts the element type from an array',
    },
  ],
  starterCode: `// Challenge 1: DeepReadonly
// Make all properties readonly recursively, including nested objects and arrays
// DeepReadonly<{ a: { b: string } }> = { readonly a: { readonly b: string } }
type DeepReadonly<T> = T; // TODO: Implement this

// Challenge 2: Flatten
// Flatten an array type to get its element type
// If not an array, return the type as-is
// Flatten<string[]> = string
// Flatten<number[][]> = number[] (one level only)
// Flatten<string> = string
type Flatten<T> = T; // TODO: Implement this

// Challenge 3: TupleToUnion
// Convert a tuple type to a union of its elements
// TupleToUnion<[string, number, boolean]> = string | number | boolean
type TupleToUnion<T extends readonly unknown[]> = unknown; // TODO: Implement this

// Challenge 4: PickByType
// Pick all properties from T where the value is of type U
// PickByType<{ a: string; b: number; c: string }, string> = { a: string; c: string }
type PickByType<T, U> = T; // TODO: Implement this

// Challenge 5: OmitByType
// Omit all properties from T where the value is of type U
// OmitByType<{ a: string; b: number; c: string }, string> = { b: number }
type OmitByType<T, U> = T; // TODO: Implement this

// Challenge 6: DeepRequired (Bonus)
// Make all properties required recursively (opposite of DeepPartial)
type DeepRequired<T> = T; // TODO: Implement this

// Test your types
type TestObj = {
  name: string;
  age: number;
  address: {
    city: string;
    coords: {
      lat: number;
      lng: number;
    };
  };
  tags: string[];
};

type ReadonlyTest = DeepReadonly<TestObj>;
type FlattenTest = Flatten<string[]>;
type TupleTest = TupleToUnion<[1, 'hello', true]>;
type PickTest = PickByType<{ a: string; b: number; c: boolean }, string>;
type OmitTest = OmitByType<{ a: string; b: number; c: boolean }, string>;`,
  solution: `// Challenge 1: DeepReadonly
// Make all properties readonly recursively, including nested objects and arrays
type DeepReadonly<T> = T extends Function
  ? T
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

// Challenge 2: Flatten
// Flatten an array type to get its element type
type Flatten<T> = T extends Array<infer U> ? U : T;

// Challenge 3: TupleToUnion
// Convert a tuple type to a union of its elements
type TupleToUnion<T extends readonly unknown[]> = T[number];

// Challenge 4: PickByType
// Pick all properties from T where the value is of type U
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
};

// Challenge 5: OmitByType
// Omit all properties from T where the value is of type U
type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K]
};

// Challenge 6: DeepRequired (Bonus)
// Make all properties required recursively
type DeepRequired<T> = T extends Function
  ? T
  : T extends object
    ? { [K in keyof T]-?: DeepRequired<T[K]> }
    : T;

// Runtime functions to demonstrate type utility behavior
function flattenArray<T>(arr: T[]): T | undefined {
  return arr[0];
}

function tupleToArray<T extends unknown[]>(...tuple: T): T {
  return tuple;
}

function pickByKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}

function omitByKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete (result as T)[key];
  }
  return result as Omit<T, K>;
}

// Test your types
type TestObj = {
  name: string;
  age: number;
  address: {
    city: string;
    coords: {
      lat: number;
      lng: number;
    };
  };
  tags: string[];
};

console.log('Type challenges compiled successfully!');`,
  testCases: [
    {
      input: [['hello', 'world']],
      expectedOutput: 'hello',
      description: 'flattenArray returns first element of array',
    },
    {
      input: [1, 'hello', true],
      expectedOutput: [1, 'hello', true],
      description: 'tupleToArray returns tuple as array',
    },
    {
      input: [{ a: 'test', b: 42, c: true }, ['a', 'b']],
      expectedOutput: { a: 'test', b: 42 },
      description: 'pickByKeys picks specified properties',
    },
    {
      input: [{ a: 'test', b: 42, c: true }, ['a']],
      expectedOutput: { b: 42, c: true },
      description: 'omitByKeys omits specified properties',
    },
  ],
  hints: [
    'For DeepReadonly, check if T is a function first (functions should not be made readonly), then check if it is an object',
    'Use T extends Array<infer U> to extract the element type from arrays',
    'T[number] on a tuple/array type gives you a union of all possible element types',
    'Use key remapping with "as" clause: [K in keyof T as Condition ? K : never]',
    'The -? modifier removes optionality from properties: { [K in keyof T]-?: T[K] }',
    'Always handle edge cases: functions, primitives, null, undefined should usually pass through unchanged',
  ],
};
