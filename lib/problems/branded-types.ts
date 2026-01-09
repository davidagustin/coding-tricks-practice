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
  id: 'branded-types',
  title: 'TypeScript Branded Types',
  difficulty: 'hard',
  category: 'TypeScript Advanced',
  description: `<h2>In-Depth Explanation</h2>

<p>Branded types create distinct types from the same underlying type (like <code>number</code> or <code>string</code>) by adding a "brand" - a unique property that exists only at the type level. This prevents mixing up values that have the same type but different meanings.</p>

<p>The pattern: <code>type UserId = number & { readonly __brand: unique symbol }</code></p>
<ul>
  <li>Same underlying type (<code>number</code>)</li>
  <li>Different brand (unique symbol)</li>
  <li>TypeScript treats them as incompatible</li>
</ul>

<p>This enables:</p>
<ul>
  <li><strong>Type Safety</strong>: Prevent <code>UserId</code> from being used as <code>ProductId</code></li>
  <li><strong>Semantic Types</strong>: Create types that represent specific concepts</li>
  <li><strong>Validation</strong>: Only validated values can be branded types</li>
  <li><strong>API Safety</strong>: Prevent passing wrong IDs to functions</li>
</ul>

<h2>Importance</h2>

<p>Branded types are essential for type safety because:</p>

<ul>
  <li><strong>Prevent Bugs</strong>: Catch bugs where wrong IDs are passed</li>
  <li><strong>Type Safety</strong>: Stronger type safety than primitive types</li>
  <li><strong>Semantic Clarity</strong>: Types that clearly represent concepts</li>
  <li><strong>API Design</strong>: Create safer APIs that prevent misuse</li>
  <li><strong>Validation</strong>: Ensure only validated values are used</li>
  <li><strong>Refactoring</strong>: Safer refactoring with distinct types</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Branded types are used extensively:</p>

<ul>
  <li><strong>ID Types</strong>: UserId, ProductId, OrderId - prevent mixing IDs</li>
  <li><strong>Validated Types</strong>: Email, URL, PhoneNumber - only validated values</li>
  <li><strong>Unit Types</strong>: Meters, Kilograms - prevent unit mixing</li>
  <li><strong>API Types</strong>: RequestId, SessionId - prevent API misuse</li>
  <li><strong>Database Types</strong>: PrimaryKey, ForeignKey - type-safe database operations</li>
  <li><strong>Security</strong>: Token types, API keys - prevent misuse</li>
  <li><strong>Domain Modeling</strong>: Domain-specific types in DDD</li>
  <li><strong>Library Development</strong>: Building type-safe libraries</li>
</ul>

<p><strong>Challenge:</strong> Use branded types to prevent mixing up similar values.</p>`,
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
  solution: `// Create branded types for UserId and ProductId
// Both are numbers but should not be interchangeable
type UserId = number & { readonly __brand: unique symbol };
type ProductId = number & { readonly __brand: unique symbol };

// Create validation functions that return branded types
function createUserId(id: number): UserId {
  return id as UserId;
}

function createProductId(id: number): ProductId {
  return id as ProductId;
}

// Create a function that only accepts UserId
function getUser(id: UserId): string {
  return 'User ' + id;
}

// Create a function that only accepts ProductId
function getProduct(id: ProductId): string {
  return 'Product ' + id;
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Add a phantom property: number & { __brand: "UserId" }',
    'Use unique symbol for true uniqueness',
    'Cast with "as" in factory functions',
  ],
};
