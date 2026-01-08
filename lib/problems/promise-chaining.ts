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
    id: 'promise-chaining',
    title: 'Promise Chaining Patterns',
    difficulty: 'medium',
    category: 'Async/Promises',
    description: `## In-Depth Explanation

Promise chaining allows you to transform data through a series of asynchronous operations. Each \`.then()\` receives the result of the previous promise and returns a new promise, creating a pipeline of transformations.

The key insight is that \`.then()\` can return either:
1. A value (wrapped in a resolved promise)
2. A promise (which will be awaited)
3. A rejected promise (which triggers error handling)

This creates a fluent API where complex async workflows read like a sequence of steps. Error handling is centralized with a single \`.catch()\` at the end, making it easy to handle errors from any step in the chain.

## Importance

Promise chaining is fundamental to async JavaScript because:

- **Readability**: Code reads like a sequence of steps
- **Composability**: Build complex workflows from simple functions
- **Error Handling**: Centralized error handling with single catch
- **Transformation Pipeline**: Natural fit for data transformation pipelines
- **Separation of Concerns**: Each step is a separate function
- **Flexibility**: Easy to add, remove, or reorder steps

## Usefulness & Practical Applications

This pattern is used everywhere in async code:

- **API Workflows**: Fetch data, transform, validate, save
- **Data Processing**: Load, transform, enrich, persist
- **Authentication Flows**: Fetch user, validate token, load permissions, update session
- **Form Submission**: Validate, transform, submit, handle response
- **File Processing**: Read file, parse, validate, save
- **E-commerce**: Fetch product, check inventory, calculate price, add to cart
- **Data Pipelines**: ETL (Extract, Transform, Load) operations

**Challenge:** Process data through a pipeline of async transformations.`,
    examples: [
      {
        input: `fetchUser(id).then(validate).then(enrich).then(save)`,
        output: `Data flows through each step`,
        explanation: 'Each then returns a promise for the next step',
      },
    ],
    starterCode: `async function processUser(userId) {
  // TODO: Chain promises to:
  // 1. Fetch user data
  // 2. Validate user (throw if invalid)
  // 3. Enrich with additional data
  // 4. Save to database
  // Return final result
  
  return {};
}

// Helper functions (assume these exist)
async function fetchUser(id) {
  return { id, name: 'John', email: 'john@example.com' };
}

async function validateUser(user) {
  if (!user.email) throw new Error('Invalid user');
  return user;
}

async function enrichUser(user) {
  return { ...user, role: 'admin', permissions: ['read', 'write'] };
}

async function saveUser(user) {
  return { ...user, saved: true };
}

// Test (commented out to prevent immediate execution)
// processUser(1).then(console.log).catch(console.error);`,
    solution: `async function fetchUser(id) {
  return { id, name: 'John', email: 'john@example.com' };
}

async function validateUser(user) {
  if (!user.email) throw new Error('Invalid user');
  return user;
}

async function enrichUser(user) {
  return { ...user, role: 'admin', permissions: ['read', 'write'] };
}

async function saveUser(user) {
  return { ...user, saved: true };
}

async function processUser(userId) {
  return fetchUser(userId)
    .then(validateUser)
    .then(enrichUser)
    .then(saveUser);
}

// Test function
async function testProcessUser() {
  const result = await processUser(1);
  return result && result.id === 1 && result.saved === true;
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'testProcessUser',
      },
    ],
    hints: [
      'Chain .then() calls for sequential async operations',
      'Return value from one becomes input to next',
      'Use .catch() at end to handle errors',
    ],
  };
