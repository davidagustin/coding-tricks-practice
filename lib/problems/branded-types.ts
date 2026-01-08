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
  };
