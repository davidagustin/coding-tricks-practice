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
  id: 'find-vs-filter',
  title: 'Find vs Filter - When to Use Each',
  difficulty: 'easy',
  category: 'Array Methods',
  description: `<h2>In-Depth Explanation</h2>

<p><code>find()</code> and <code>filter()</code> are both array methods for searching, but they serve different purposes. <code>find()</code> returns the first element that matches the condition (or <code>undefined</code> if none match), while <code>filter()</code> returns a new array containing all elements that match the condition.</p>

<p>The key difference is:</p>
<ul>
  <li><code>find()</code>: Stops searching after finding the first match (short-circuit behavior), returns a single element</li>
  <li><code>filter()</code>: Continues through the entire array, returns an array (even if empty or with one element)</li>
</ul>

<p><code>find()</code> is more efficient when you only need one result because it stops early. <code>filter()</code> is necessary when you need all matching elements.</p>

<h2>Importance</h2>

<p>Understanding when to use each method is crucial because:</p>

<ul>
  <li><strong>Performance</strong>: <code>find()</code> can be faster for large arrays when you only need one result</li>
  <li><strong>Correctness</strong>: Using the wrong method leads to bugs (expecting an array but getting an element, or vice versa)</li>
  <li><strong>Code Clarity</strong>: Choosing the right method makes code intent clearer</li>
  <li><strong>Type Safety</strong>: TypeScript types differ - <code>find()</code> returns <code>T | undefined</code>, <code>filter()</code> returns <code>T[]</code></li>
  <li><strong>API Design</strong>: Different return types affect how functions are used</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This distinction is important in many scenarios:</p>

<ul>
  <li><strong>User Lookups</strong>: <code>find()</code> for finding a user by ID, <code>filter()</code> for finding all admins</li>
  <li><strong>Search Functionality</strong>: <code>find()</code> for exact matches, <code>filter()</code> for search results</li>
  <li><strong>Validation</strong>: <code>find()</code> to check if any item is invalid, <code>filter()</code> to get all invalid items</li>
  <li><strong>Data Processing</strong>: <code>find()</code> for unique lookups, <code>filter()</code> for collections</li>
  <li><strong>UI Rendering</strong>: <code>find()</code> for single item display, <code>filter()</code> for list rendering</li>
  <li><strong>State Management</strong>: <code>find()</code> for single item updates, <code>filter()</code> for bulk operations</li>
  <li><strong>API Responses</strong>: <code>find()</code> for single resource, <code>filter()</code> for collections</li>
</ul>

<p><strong>Challenge:</strong> Use find to get the first matching item, and filter to get all matches.</p>`,
  examples: [
    {
      input: `const users = [
  { id: 1, active: true },
  { id: 2, active: false },
  { id: 3, active: true }
];`,
      output: `find: first active user, filter: all active users`,
      explanation: 'find returns one item, filter returns array',
    },
  ],
  starterCode: `function getFirstActiveUser(users) {
  // TODO: Use find() to get the first user where active === true
  return null;
}

function getAllActiveUsers(users) {
  // TODO: Use filter() to get all users where active === true
  return [];
}

const users = [
  { id: 1, name: 'John', active: true },
  { id: 2, name: 'Jane', active: false },
  { id: 3, name: 'Bob', active: true },
  { id: 4, name: 'Alice', active: true }
];

console.log('First active:', getFirstActiveUser(users));
console.log('All active:', getAllActiveUsers(users));`,
  solution: `function getFirstActiveUser(users) {
  return users.find(user => user.active === true);
}

function getAllActiveUsers(users) {
  return users.filter(user => user.active === true);
}`,
  testCases: [
    {
      input: [
        [
          { id: 1, name: 'John', active: true },
          { id: 2, name: 'Jane', active: false },
          { id: 3, name: 'Bob', active: true },
        ],
      ],
      expectedOutput: { id: 1, name: 'John', active: true },
      description: 'getFirstActiveUser',
    },
    {
      input: [
        [
          { id: 1, name: 'John', active: true },
          { id: 2, name: 'Jane', active: false },
          { id: 3, name: 'Bob', active: true },
        ],
      ],
      expectedOutput: [
        { id: 1, name: 'John', active: true },
        { id: 3, name: 'Bob', active: true },
      ],
      description: 'getAllActiveUsers',
    },
  ],
  hints: [
    'find() returns the first element that matches, or undefined',
    'filter() returns an array of all matching elements',
    'Use find when you need one item, filter when you need multiple',
  ],
};
