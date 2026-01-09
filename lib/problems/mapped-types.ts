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
  id: 'mapped-types',
  title: 'TypeScript Mapped Types',
  difficulty: 'hard',
  category: 'TypeScript Advanced',
  description: `<h2>In-Depth Explanation</h2>

<p>Mapped types transform existing types by iterating over their properties and applying transformations. The syntax <code>[K in keyof T]: Transformation</code> creates a new type by mapping over each key in <code>T</code>.</p>

<p>Key modifiers:</p>
<ul>
  <li><strong>?</strong>: Makes property optional (<code>Partial&lt;T&gt;</code>)</li>
  <li><strong>-?</strong>: Removes optional modifier (<code>Required&lt;T&gt;</code>)</li>
  <li><strong>readonly</strong>: Makes property readonly (<code>Readonly&lt;T&gt;</code>)</li>
  <li><strong>-readonly</strong>: Removes readonly modifier</li>
</ul>

<p>This enables creating utility types like:</p>
<ul>
  <li><code>Partial&lt;T&gt;</code>: All properties optional</li>
  <li><code>Required&lt;T&gt;</code>: All properties required</li>
  <li><code>Readonly&lt;T&gt;</code>: All properties readonly</li>
  <li><code>Pick&lt;T, K&gt;</code>: Select specific properties</li>
  <li><code>Omit&lt;T, K&gt;</code>: Exclude specific properties</li>
</ul>

<h2>Importance</h2>

<p>Mapped types are essential for TypeScript type manipulation because:</p>

<ul>
  <li><strong>Type Transformation</strong>: Transform types programmatically</li>
  <li><strong>Utility Types</strong>: Create reusable utility types</li>
  <li><strong>DRY Principle</strong>: Avoid duplicating type definitions</li>
  <li><strong>Type Safety</strong>: Maintain type safety while transforming</li>
  <li><strong>Framework Development</strong>: Essential for building type-safe frameworks</li>
  <li><strong>API Design</strong>: Create flexible, type-safe APIs</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Mapped types are used extensively:</p>

<ul>
  <li><strong>Utility Types</strong>: Creating Partial, Required, Readonly, Pick, Omit</li>
  <li><strong>API Types</strong>: Transforming API request/response types</li>
  <li><strong>Form Types</strong>: Creating form types from data types</li>
  <li><strong>State Management</strong>: Transforming state types</li>
  <li><strong>Component Props</strong>: Transforming component prop types</li>
  <li><strong>Database Types</strong>: Transforming database model types</li>
  <li><strong>Configuration Types</strong>: Creating configuration types from schemas</li>
  <li><strong>Library Development</strong>: Building type-safe libraries</li>
</ul>

<p><strong>Challenge:</strong> Create utility types using mapped type syntax.</p>`,
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
  solution: `// MyPartial - make all properties optional
type MyPartial<T> = { [K in keyof T]?: T[K] };

// MyRequired - make all properties required
type MyRequired<T> = { [K in keyof T]-?: T[K] };

// MyReadonly - make all properties readonly
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };

// Nullable - make all properties nullable
type Nullable<T> = { [K in keyof T]: T[K] | null };

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

// Runtime functions to demonstrate mapped type behavior
function makePartial<T extends object>(obj: T): Partial<T> {
  return { ...obj };
}

function hasAllKeys(obj: object, keys: string[]): boolean {
  return keys.every(key => key in obj);
}

function makeNullable<T extends object>(obj: T): { [K in keyof T]: T[K] | null } {
  return { ...obj };
}

function getKeys(obj: object): string[] {
  return Object.keys(obj);
}

// Test
const partialUser: PartialUser = { name: 'John' };
const requiredUser: RequiredUser = { name: 'John', age: 30, email: 'john@example.com' };

console.log('Partial:', partialUser);
console.log('Required:', requiredUser);`,
  testCases: [
    {
      input: [{ name: 'John', age: 30 }],
      expectedOutput: { name: 'John', age: 30 },
      description: 'makePartial returns a copy of the object',
    },
    {
      input: [{ name: 'John', age: 30 }, ['name', 'age']],
      expectedOutput: true,
      description: 'hasAllKeys returns true when all keys exist',
    },
    {
      input: [{ name: 'John' }, ['name', 'age', 'email']],
      expectedOutput: false,
      description: 'hasAllKeys returns false when keys are missing',
    },
    {
      input: [{ name: 'Alice', age: 25 }],
      expectedOutput: ['name', 'age'],
      description: 'getKeys returns array of object keys',
    },
  ],
  hints: [
    '[K in keyof T] iterates over all keys',
    '? adds optional, -? removes optional',
    'readonly adds readonly modifier',
  ],
};
