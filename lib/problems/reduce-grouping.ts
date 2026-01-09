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
  id: 'reduce-grouping',
  title: 'Reduce for Grouping',
  difficulty: 'medium',
  category: 'Array Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>The \<code>reduce\</code> method is one of the most powerful array methods in JavaScript. When used for grouping, it transforms an array into an object or Map where keys represent categories and values are arrays of items belonging to that category. The accumulator pattern in \<code>reduce\</code> allows you to build up a data structure incrementally as you iterate through the array.</p>

<p>The key insight is that \<code>reduce\</code> takes an initial value (the accumulator) and a reducer function that combines each element with the accumulator. For grouping, you initialize with an empty object \<code>{}\</code> and for each element, you check if a group exists for that element's key. If not, create it; then add the element to that group.</p>

<h2>Importance</h2>

<p>Grouping data is a fundamental operation in data processing. Whether you're organizing user data, categorizing products, or analyzing datasets, grouping allows you to transform flat lists into structured, hierarchical data. The \<code>reduce\</code> approach is particularly valuable because:</p>

<ul>
  <li><strong>Single Pass</strong>: Groups data in a single iteration, making it O(n) time complexity</li>
  <li><strong>Flexible</strong>: Can group by any property or computed value</li>
  <li><strong>Functional Style</strong>: Avoids imperative loops and mutations, leading to more predictable code</li>
  <li><strong>Composable</strong>: Can be easily combined with other array methods</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This pattern is essential in real-world applications:</p>

<ul>
  <li><strong>Data Analytics</strong>: Grouping sales by region, products by category, or events by date</li>
  <li><strong>UI Development</strong>: Organizing list items by status (pending, completed, archived)</li>
  <li><strong>API Response Processing</strong>: Transforming flat API responses into grouped structures for display</li>
  <li><strong>Report Generation</strong>: Creating summary reports with data organized by various dimensions</li>
  <li><strong>State Management</strong>: Grouping items in Redux or other state management libraries</li>
  <li><strong>Database Queries</strong>: Mimicking SQL GROUP BY functionality in JavaScript</li>
</ul>

<p><strong>Challenge:</strong> Group users by their role using reduce.</p>`,
  examples: [
    {
      input: `const users = [
  { id: 1, name: 'John', role: 'admin' },
  { id: 2, name: 'Jane', role: 'user' },
  { id: 3, name: 'Bob', role: 'admin' }
];`,
      output: `{ admin: [...], user: [...] }`,
      explanation: 'Group users by role property',
    },
  ],
  starterCode: `function groupByRole(users) {
  // TODO: Use reduce to group users by role
  // Return an object where keys are roles and values are arrays of users
  
  return {};
}

const users = [
  { id: 1, name: 'John', role: 'admin' },
  { id: 2, name: 'Jane', role: 'user' },
  { id: 3, name: 'Bob', role: 'admin' },
  { id: 4, name: 'Alice', role: 'user' }
];

console.log(groupByRole(users));`,
  solution: `function groupByRole(users) {
  return users.reduce((acc, user) => {
    const role = user.role;
    if (!acc[role]) {
      acc[role] = [];
    }
    acc[role].push(user);
    return acc;
  }, {});
}`,
  testCases: [
    {
      input: [
        [
          { id: 1, name: 'John', role: 'admin' },
          { id: 2, name: 'Jane', role: 'user' },
          { id: 3, name: 'Bob', role: 'admin' },
        ],
      ],
      expectedOutput: {
        admin: [
          { id: 1, name: 'John', role: 'admin' },
          { id: 3, name: 'Bob', role: 'admin' },
        ],
        user: [{ id: 2, name: 'Jane', role: 'user' }],
      },
      description: 'groupByRole groups users by their role property',
    },
    {
      input: [
        [
          { id: 1, name: 'Alice', role: 'admin' },
          { id: 2, name: 'Bob', role: 'admin' },
        ],
      ],
      expectedOutput: {
        admin: [
          { id: 1, name: 'Alice', role: 'admin' },
          { id: 2, name: 'Bob', role: 'admin' },
        ],
      },
      description: 'groupByRole handles all same role',
    },
  ],
  hints: [
    'Initialize reduce with an empty object {}',
    'For each user, check if acc[user.role] exists',
    'If not, create it as an empty array, then push the user',
    'Return the accumulator after processing all users',
  ],
};
