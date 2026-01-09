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
  description: `<h2>In-Depth Explanation</h2>

<p>Promise chaining allows you to transform data through a series of asynchronous operations. Each \<code>.then()\</code> receives the result of the previous promise and returns a new promise, creating a pipeline of transformations.</p>

<p>The key insight is that \<code>.then()\</code> can return either:</p>
<ol>
  <li>A value (wrapped in a resolved promise)</li>
  <li>A promise (which will be awaited)</li>
  <li>A rejected promise (which triggers error handling)</li>
</ol>

<p>This creates a fluent API where complex async workflows read like a sequence of steps. Error handling is centralized with a single \<code>.catch()\</code> at the end, making it easy to handle errors from any step in the chain.</p>

<h2>Importance</h2>

<p>Promise chaining is fundamental to async JavaScript because:</p>

<ul>
  <li><strong>Readability</strong>: Code reads like a sequence of steps</li>
  <li><strong>Composability</strong>: Build complex workflows from simple functions</li>
  <li><strong>Error Handling</strong>: Centralized error handling with single catch</li>
  <li><strong>Transformation Pipeline</strong>: Natural fit for data transformation pipelines</li>
  <li><strong>Separation of Concerns</strong>: Each step is a separate function</li>
  <li><strong>Flexibility</strong>: Easy to add, remove, or reorder steps</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This pattern is used everywhere in async code:</p>

<ul>
  <li><strong>API Workflows</strong>: Fetch data, transform, validate, save</li>
  <li><strong>Data Processing</strong>: Load, transform, enrich, persist</li>
  <li><strong>Authentication Flows</strong>: Fetch user, validate token, load permissions, update session</li>
  <li><strong>Form Submission</strong>: Validate, transform, submit, handle response</li>
  <li><strong>File Processing</strong>: Read file, parse, validate, save</li>
  <li><strong>E-commerce</strong>: Fetch product, check inventory, calculate price, add to cart</li>
  <li><strong>Data Pipelines</strong>: ETL (Extract, Transform, Load) operations</li>
</ul>

<p><strong>Challenge:</strong> Process data through a pipeline of async transformations.</p>`,
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
  solution: `async function processUser(userId) {
  // Chain promises to:
  // 1. Fetch user data
  // 2. Validate user (throw if invalid)
  // 3. Enrich with additional data
  // 4. Save to database
  // Return final result

  return fetchUser(userId)
    .then(validateUser)
    .then(enrichUser)
    .then(saveUser);
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
  testCases: [
    {
      input: 'validUser',
      expectedOutput: {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        role: 'admin',
        permissions: ['read', 'write'],
        saved: true
      },
      description: 'Processes valid user through entire chain',
    },
    {
      input: 'invalidUser',
      expectedOutput: { error: 'Invalid user' },
      description: 'Throws error for invalid user',
    },
    {
      input: 'chainOrder',
      expectedOutput: ['fetch', 'validate', 'enrich', 'save'],
      description: 'Executes steps in correct order',
    },
  ],
  hints: [
    'Chain .then() calls for sequential async operations',
    'Return value from one becomes input to next',
    'Use .catch() at end to handle errors',
  ],
};
