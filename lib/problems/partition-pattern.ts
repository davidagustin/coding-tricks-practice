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
  description: `## In-Depth Explanation

The partition pattern splits an array into two groups based on a boolean condition. Items that pass the condition go into one group, items that fail go into another. This is a common operation in data processing.

Using \`reduce()\` for partitioning is elegant because it processes the array in a single pass, building up both groups simultaneously. The accumulator is an object with two arrays (e.g., \`{ active: [], inactive: [] }\`), and each element is added to the appropriate group based on the condition.

This pattern is more efficient than calling \`filter()\` twice (which would iterate the array twice) and more readable than manual loops. It's a functional programming pattern that clearly expresses the intent: "split this array into two groups."

## Importance

Partitioning is a fundamental data operation because:

- **Single Pass**: More efficient than multiple filter operations
- **Clear Intent**: Code clearly shows the two groups being created
- **Functional Style**: Uses reduce, maintaining functional programming patterns
- **Flexibility**: Easy to extend to multiple groups or more complex conditions
- **Performance**: O(n) time complexity with a single iteration
- **Common Pattern**: Frequently needed in data processing and UI logic

## Usefulness & Practical Applications

This pattern is essential in many scenarios:

- **User Management**: Separating active/inactive users, premium/free users
- **Data Filtering**: Splitting data into valid/invalid, processed/unprocessed
- **UI State**: Partitioning items into visible/hidden, selected/unselected
- **Validation**: Separating valid/invalid form fields or data records
- **Status Management**: Grouping items by status (pending/completed, published/draft)
- **Feature Flags**: Splitting users into enabled/disabled groups
- **Data Analysis**: Separating data into categories for analysis
- **API Processing**: Partitioning API responses into success/failure groups

**Challenge:** Partition users into active and inactive groups.`,
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
