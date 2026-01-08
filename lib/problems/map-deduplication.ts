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
  id: 'map-deduplication',
  title: 'Map for Deduplication',
  difficulty: 'medium',
  category: 'Array Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>The <code>Map</code> constructor has a powerful feature: when you pass an iterable of [key, value] pairs, it automatically handles duplicate keys by keeping only the last value for each key. This behavior makes <code>Map</code> perfect for deduplication scenarios where you want the most recent occurrence to win.</p>

<p>The trick works by:</p>
<ol>
  <li>Transforming the array into [key, value] pairs using <code>map</code></li>
  <li>Passing these pairs to the <code>Map</code> constructor, which automatically deduplicates by key</li>
  <li>Converting the Map's values back to an array using the spread operator</li>
</ol>

<p>This is more elegant than using <code>reduce</code> or <code>filter</code> because Map handles the deduplication logic internally.</p>

<h2>Importance</h2>

<p>Deduplication is a common data cleaning operation. The Map approach is superior to alternatives because:</p>

<ul>
  <li><strong>Automatic Deduplication</strong>: Map's built-in behavior handles duplicates without explicit logic</li>
  <li><strong>Performance</strong>: O(n) time complexity, more efficient than nested loops or filter-based approaches</li>
  <li><strong>Key Flexibility</strong>: Works with any key type (not just primitives like Set)</li>
  <li><strong>Last-Wins Semantics</strong>: Perfect for scenarios where newer data should override older data</li>
  <li><strong>Concise Code</strong>: One-liner solution that's both readable and performant</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This pattern is invaluable in many real-world scenarios:</p>

<ul>
  <li><strong>Data Merging</strong>: Combining datasets where the latest record should override older ones</li>
  <li><strong>Cache Updates</strong>: Updating cached items where newer values replace stale ones</li>
  <li><strong>API Response Processing</strong>: Handling duplicate entries in API responses</li>
  <li><strong>State Synchronization</strong>: Merging state updates where the most recent change wins</li>
  <li><strong>Database Record Deduplication</strong>: Cleaning imported data before database insertion</li>
  <li><strong>Event Processing</strong>: Processing event streams where duplicate events should be collapsed</li>
  <li><strong>User Session Management</strong>: Keeping only the most recent session data per user</li>
</ul>

<p><strong>Challenge:</strong> Remove duplicate users by ID, keeping the last occurrence.</p>`,
  examples: [
    {
      input: `const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John Updated' }
];`,
      output: `[{ id: 2, name: 'Jane' }, { id: 1, name: 'John Updated' }]`,
      explanation: 'Last occurrence of id:1 wins',
    },
  ],
  starterCode: `function deduplicateUsers(users) {
  // TODO: Use Map to deduplicate by id (last wins)
  // Hint: new Map(users.map(u => [u.id, u]))
  // Then convert back to array with [...map.values()]
  
  return users;
}

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John Updated' },
  { id: 3, name: 'Bob' },
  { id: 2, name: 'Jane Updated' }
];

console.log(deduplicateUsers(users));`,
  solution: `function deduplicateUsers(users) {
  // Use Map to deduplicate by id (last wins)
  // 1. Transform array to [key, value] pairs: users.map(u => [u.id, u])
  // 2. Pass to Map constructor which automatically deduplicates by key
  // 3. Convert Map values back to array with spread operator

  const userMap = new Map(users.map(u => [u.id, u]));
  return [...userMap.values()];
}

// Alternative one-liner:
// const deduplicateUsers = users => [...new Map(users.map(u => [u.id, u])).values()];

// Generic version that works with any key
function deduplicateBy(arr, keyFn) {
  return [...new Map(arr.map(item => [keyFn(item), item])).values()];
}

// Test
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John Updated' },
  { id: 3, name: 'Bob' },
  { id: 2, name: 'Jane Updated' }
];

console.log(deduplicateUsers(users));
// Output: [
//   { id: 1, name: 'John Updated' },
//   { id: 2, name: 'Jane Updated' },
//   { id: 3, name: 'Bob' }
// ]

// Using generic deduplicateBy
const products = [
  { sku: 'A1', name: 'Widget', price: 10 },
  { sku: 'B2', name: 'Gadget', price: 20 },
  { sku: 'A1', name: 'Widget Pro', price: 15 }
];

console.log(deduplicateBy(products, p => p.sku));
// Output: [
//   { sku: 'A1', name: 'Widget Pro', price: 15 },
//   { sku: 'B2', name: 'Gadget', price: 20 }
// ]`,
  testCases: [
    {
      input: { users: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }, { id: 1, name: 'John Updated' }] },
      expectedOutput: [{ id: 1, name: 'John Updated' }, { id: 2, name: 'Jane' }],
      description: 'Should deduplicate users by id, keeping last occurrence',
    },
    {
      input: { users: [{ id: 1, name: 'A' }, { id: 1, name: 'B' }, { id: 1, name: 'C' }] },
      expectedOutput: [{ id: 1, name: 'C' }],
      description: 'Should keep only the last user when all have same id',
    },
    {
      input: { users: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'C' }] },
      expectedOutput: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'C' }],
      description: 'Should return all users when no duplicates exist',
    },
    {
      input: { users: [] },
      expectedOutput: [],
      description: 'Should return empty array for empty input',
    },
    {
      input: { users: [{ id: 2, name: 'Jane' }, { id: 1, name: 'John' }, { id: 3, name: 'Bob' }, { id: 2, name: 'Jane Updated' }, { id: 1, name: 'John Updated' }] },
      expectedOutput: [{ id: 2, name: 'Jane Updated' }, { id: 1, name: 'John Updated' }, { id: 3, name: 'Bob' }],
      description: 'Should preserve insertion order of first occurrence of each id',
    },
  ],
  hints: [
    'Map constructor accepts [key, value] pairs',
    'Map overwrites duplicate keys (last wins)',
    'Use [...map.values()] to convert back to array',
  ],
};
