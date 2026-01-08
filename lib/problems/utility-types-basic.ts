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
  id: 'utility-types-basic',
  title: 'Basic Utility Types',
  difficulty: 'medium',
  category: 'TypeScript Basics',
  description: `<h2>In-Depth Explanation</h2>

<p>TypeScript provides built-in utility types that transform existing types into new types. The four most commonly used are:</p>

<ul>
  <li><code>Partial&lt;T&gt;</code>: Makes all properties of T optional (adds ? to each property)</li>
  <li><code>Required&lt;T&gt;</code>: Makes all properties of T required (removes ? from each property)</li>
  <li><code>Pick&lt;T, K&gt;</code>: Creates a type with only the specified properties K from T</li>
  <li><code>Omit&lt;T, K&gt;</code>: Creates a type with all properties from T except those in K</li>
</ul>

<p>These utility types are implemented using mapped types and conditional types under the hood. For example, <code>Partial&lt;T&gt;</code> is implemented as:</p>
<pre><code>type Partial&lt;T&gt; = { [P in keyof T]?: T[P] };</code></pre>

<p>Understanding these utilities is essential for creating flexible, type-safe APIs and working with partial updates, form data, and data transformations.</p>

<h2>Importance</h2>

<p>Utility types are crucial because:</p>

<ul>
  <li><strong>Code Reuse</strong>: Derive new types from existing ones without duplication</li>
  <li><strong>Flexibility</strong>: Create variations of types for different use cases</li>
  <li><strong>Type Safety</strong>: Maintain type relationships when transforming data</li>
  <li><strong>API Design</strong>: Build flexible function signatures</li>
  <li><strong>Form Handling</strong>: Work with partial form data during editing</li>
  <li><strong>CRUD Operations</strong>: Different types for create, update, and read operations</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Utility types are used extensively in:</p>

<ul>
  <li><strong>Update Operations</strong>: Partial&lt;User&gt; for updating only some user fields</li>
  <li><strong>Form State</strong>: Partial types for form data before submission</li>
  <li><strong>API Responses</strong>: Pick to select relevant fields from large response types</li>
  <li><strong>Security</strong>: Omit to exclude sensitive fields like passwords</li>
  <li><strong>Component Props</strong>: Pick/Omit to create prop types from shared interfaces</li>
  <li><strong>Database Models</strong>: Different types for insert vs select operations</li>
  <li><strong>Configuration</strong>: Required to ensure all config options are provided</li>
  <li><strong>DTOs</strong>: Creating Data Transfer Objects from entity types</li>
</ul>

<p><strong>Challenge:</strong> Use Partial, Required, Pick, and Omit to create type-safe utility functions.</p>`,
  examples: [
    {
      input: `interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; }`,
      output: `All properties become optional`,
      explanation: 'Partial makes every property optional, useful for update operations',
    },
    {
      input: `interface Config {
  host?: string;
  port?: number;
  ssl?: boolean;
}

type RequiredConfig = Required<Config>;
// { host: string; port: number; ssl: boolean; }`,
      output: `All properties become required`,
      explanation: 'Required removes optionality from all properties',
    },
    {
      input: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Pick<User, 'id' | 'name' | 'email'>;
type UserWithoutPassword = Omit<User, 'password'>;`,
      output: `Types with selected/excluded properties`,
      explanation: 'Pick includes only specified keys, Omit excludes specified keys',
    },
  ],
  starterCode: `// TODO: Practice using Partial, Required, Pick, and Omit utility types

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  createdAt: Date;
}

// Task 1: Create an update function using Partial
// Allow updating any subset of product fields (except id)
type ProductUpdate = Omit<Partial<Product>, 'id'>;

function updateProduct(id: number, updates: ProductUpdate): Product {
  // Simulate existing product
  const existingProduct: Product = {
    id,
    name: 'Original Product',
    description: 'Original description',
    price: 99.99,
    category: 'electronics',
    inStock: true,
    createdAt: new Date()
  };

  // TODO: Merge updates with existing product and return
  // Your code here
}

// Task 2: Create a product preview type using Pick
// Only include: id, name, price, inStock
// TODO: Define ProductPreview type using Pick
// Your code here: type ProductPreview = ...

function getProductPreview(product: Product): ProductPreview {
  // TODO: Return object with only the preview fields
  // Your code here
}

// Task 3: Create a type for creating new products using Omit
// Exclude id and createdAt (these are auto-generated)
// TODO: Define CreateProductInput type using Omit
// Your code here: type CreateProductInput = ...

function createProduct(input: CreateProductInput): Product {
  // TODO: Create and return a new product with generated id and createdAt
  // Your code here
}

// Task 4: Configuration with Required
interface AppConfig {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
  debug?: boolean;
}

// TODO: Create ValidatedConfig type that makes all properties required
// Your code here: type ValidatedConfig = ...

function validateConfig(config: AppConfig): ValidatedConfig {
  // TODO: Return config with default values for missing properties
  // Defaults: apiUrl = 'http://localhost', timeout = 5000, retries = 3, debug = false
  // Your code here
}

// Test your implementations
console.log(updateProduct(1, { price: 149.99, inStock: false }));
const testProduct: Product = {
  id: 1,
  name: 'Test',
  description: 'Test desc',
  price: 29.99,
  category: 'test',
  inStock: true,
  createdAt: new Date()
};
console.log(getProductPreview(testProduct));
console.log(createProduct({
  name: 'New Product',
  description: 'A new product',
  price: 49.99,
  category: 'new',
  inStock: true
}));
console.log(validateConfig({ apiUrl: 'https://api.example.com' }));`,
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Partial<T> makes all properties optional: { [K in keyof T]?: T[K] }',
    'Required<T> makes all properties required: { [K in keyof T]-?: T[K] }',
    'Pick<T, K> selects specific keys: Pick<User, "id" | "name">',
    'Omit<T, K> excludes specific keys: Omit<User, "password">',
    'You can combine utility types: Omit<Partial<T>, "id"> for partial updates without id',
    'Use the spread operator (...) to merge objects when applying partial updates',
  ],
};
