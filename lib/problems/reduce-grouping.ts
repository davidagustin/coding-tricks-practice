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
  description: `## In-Depth Explanation

The \`reduce\` method is one of the most powerful array methods in JavaScript. When used for grouping, it transforms an array into an object or Map where keys represent categories and values are arrays of items belonging to that category. The accumulator pattern in \`reduce\` allows you to build up a data structure incrementally as you iterate through the array.

The key insight is that \`reduce\` takes an initial value (the accumulator) and a reducer function that combines each element with the accumulator. For grouping, you initialize with an empty object \`{}\` and for each element, you check if a group exists for that element's key. If not, create it; then add the element to that group.

## Importance

Grouping data is a fundamental operation in data processing. Whether you're organizing user data, categorizing products, or analyzing datasets, grouping allows you to transform flat lists into structured, hierarchical data. The \`reduce\` approach is particularly valuable because:

- **Single Pass**: Groups data in a single iteration, making it O(n) time complexity
- **Flexible**: Can group by any property or computed value
- **Functional Style**: Avoids imperative loops and mutations, leading to more predictable code
- **Composable**: Can be easily combined with other array methods

## Usefulness & Practical Applications

This pattern is essential in real-world applications:

- **Data Analytics**: Grouping sales by region, products by category, or events by date
- **UI Development**: Organizing list items by status (pending, completed, archived)
- **API Response Processing**: Transforming flat API responses into grouped structures for display
- **Report Generation**: Creating summary reports with data organized by various dimensions
- **State Management**: Grouping items in Redux or other state management libraries
- **Database Queries**: Mimicking SQL GROUP BY functionality in JavaScript

**Challenge:** Group users by their role using reduce.`,
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
    },
  ],
  hints: [
    'Initialize reduce with an empty object {}',
    'For each user, check if acc[user.role] exists',
    'If not, create it as an empty array, then push the user',
    'Return the accumulator after processing all users',
  ],
};
