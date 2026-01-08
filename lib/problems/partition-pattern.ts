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
  id: 'partition-pattern',
  title: 'Partition Pattern with Reduce',
  difficulty: 'medium',
  category: 'Array Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>The partition pattern splits an array into two groups based on a boolean condition. Items that pass the condition go into one group, items that fail go into another. This is a common operation in data processing.</p>

<p>Using <code>reduce()</code> for partitioning is elegant because it processes the array in a single pass, building up both groups simultaneously. The accumulator is an object with two arrays (e.g., <code>{ active: [], inactive: [] }</code>), and each element is added to the appropriate group based on the condition.</p>

<p>This pattern is more efficient than calling <code>filter()</code> twice (which would iterate the array twice) and more readable than manual loops. It's a functional programming pattern that clearly expresses the intent: "split this array into two groups."</p>

<h2>Importance</h2>

<p>Partitioning is a fundamental data operation because:</p>

<ul>
  <li><strong>Single Pass</strong>: More efficient than multiple filter operations</li>
  <li><strong>Clear Intent</strong>: Code clearly shows the two groups being created</li>
  <li><strong>Functional Style</strong>: Uses reduce, maintaining functional programming patterns</li>
  <li><strong>Flexibility</strong>: Easy to extend to multiple groups or more complex conditions</li>
  <li><strong>Performance</strong>: O(n) time complexity with a single iteration</li>
  <li><strong>Common Pattern</strong>: Frequently needed in data processing and UI logic</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This pattern is essential in many scenarios:</p>

<ul>
  <li><strong>User Management</strong>: Separating active/inactive users, premium/free users</li>
  <li><strong>Data Filtering</strong>: Splitting data into valid/invalid, processed/unprocessed</li>
  <li><strong>UI State</strong>: Partitioning items into visible/hidden, selected/unselected</li>
  <li><strong>Validation</strong>: Separating valid/invalid form fields or data records</li>
  <li><strong>Status Management</strong>: Grouping items by status (pending/completed, published/draft)</li>
  <li><strong>Feature Flags</strong>: Splitting users into enabled/disabled groups</li>
  <li><strong>Data Analysis</strong>: Separating data into categories for analysis</li>
  <li><strong>API Processing</strong>: Partitioning API responses into success/failure groups</li>
</ul>

<p><strong>Challenge:</strong> Partition users into active and inactive groups.</p>`,
  examples: [
    {
      input: `const users = [
  { name: 'John', active: true },
  { name: 'Jane', active: false }
];`,
      output: `{ active: [...], inactive: [...] }`,
      explanation: 'Split array into two groups',
    },
  ],
  starterCode: `function partitionUsers(users) {
  // TODO: Use reduce to partition users into active and inactive
  // Return { active: [...], inactive: [...] }
  
  return { active: [], inactive: [] };
}

const users = [
  { id: 1, name: 'John', active: true },
  { id: 2, name: 'Jane', active: false },
  { id: 3, name: 'Bob', active: true },
  { id: 4, name: 'Alice', active: false }
];

console.log(partitionUsers(users));`,
  solution: `function partitionUsers(users) {
  return users.reduce((acc, user) => {
    if (user.active) {
      acc.active.push(user);
    } else {
      acc.inactive.push(user);
    }
    return acc;
  }, { active: [], inactive: [] });
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
      expectedOutput: {
        active: [
          { id: 1, name: 'John', active: true },
          { id: 3, name: 'Bob', active: true },
        ],
        inactive: [{ id: 2, name: 'Jane', active: false }],
      },
    },
  ],
  hints: [
    'Initialize accumulator with both groups: { active: [], inactive: [] }',
    'Push to appropriate group based on condition',
    'More efficient than two separate filter() calls',
  ],
};
