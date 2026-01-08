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
  description: `## In-Depth Explanation

The \`Map\` constructor has a powerful feature: when you pass an iterable of [key, value] pairs, it automatically handles duplicate keys by keeping only the last value for each key. This behavior makes \`Map\` perfect for deduplication scenarios where you want the most recent occurrence to win.

The trick works by:
1. Transforming the array into [key, value] pairs using \`map\`
2. Passing these pairs to the \`Map\` constructor, which automatically deduplicates by key
3. Converting the Map's values back to an array using the spread operator

This is more elegant than using \`reduce\` or \`filter\` because Map handles the deduplication logic internally.

## Importance

Deduplication is a common data cleaning operation. The Map approach is superior to alternatives because:

- **Automatic Deduplication**: Map's built-in behavior handles duplicates without explicit logic
- **Performance**: O(n) time complexity, more efficient than nested loops or filter-based approaches
- **Key Flexibility**: Works with any key type (not just primitives like Set)
- **Last-Wins Semantics**: Perfect for scenarios where newer data should override older data
- **Concise Code**: One-liner solution that's both readable and performant

## Usefulness & Practical Applications

This pattern is invaluable in many real-world scenarios:

- **Data Merging**: Combining datasets where the latest record should override older ones
- **Cache Updates**: Updating cached items where newer values replace stale ones
- **API Response Processing**: Handling duplicate entries in API responses
- **State Synchronization**: Merging state updates where the most recent change wins
- **Database Record Deduplication**: Cleaning imported data before database insertion
- **Event Processing**: Processing event streams where duplicate events should be collapsed
- **User Session Management**: Keeping only the most recent session data per user

**Challenge:** Remove duplicate users by ID, keeping the last occurrence.`,
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
  return [...new Map(users.map(u => [u.id, u])).values()];
}`,
  testCases: [
    {
      input: [
        [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' },
          { id: 1, name: 'John Updated' },
        ],
      ],
      expectedOutput: [
        { id: 2, name: 'Jane' },
        { id: 1, name: 'John Updated' },
      ],
    },
    {
      input: [
        [
          { id: 1, name: 'A' },
          { id: 1, name: 'B' },
          { id: 1, name: 'C' },
        ],
      ],
      expectedOutput: [{ id: 1, name: 'C' }],
    },
  ],
  hints: [
    'Map constructor accepts [key, value] pairs',
    'Map overwrites duplicate keys (last wins)',
    'Use [...map.values()] to convert back to array',
  ],
};
