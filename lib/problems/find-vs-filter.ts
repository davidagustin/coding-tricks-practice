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
  description: `## In-Depth Explanation

\`find()\` and \`filter()\` are both array methods for searching, but they serve different purposes. \`find()\` returns the first element that matches the condition (or \`undefined\` if none match), while \`filter()\` returns a new array containing all elements that match the condition.

The key difference is:
- \`find()\`: Stops searching after finding the first match (short-circuit behavior), returns a single element
- \`filter()\`: Continues through the entire array, returns an array (even if empty or with one element)

\`find()\` is more efficient when you only need one result because it stops early. \`filter()\` is necessary when you need all matching elements.

## Importance

Understanding when to use each method is crucial because:

- **Performance**: \`find()\` can be faster for large arrays when you only need one result
- **Correctness**: Using the wrong method leads to bugs (expecting an array but getting an element, or vice versa)
- **Code Clarity**: Choosing the right method makes code intent clearer
- **Type Safety**: TypeScript types differ - \`find()\` returns \`T | undefined\`, \`filter()\` returns \`T[]\`
- **API Design**: Different return types affect how functions are used

## Usefulness & Practical Applications

This distinction is important in many scenarios:

- **User Lookups**: \`find()\` for finding a user by ID, \`filter()\` for finding all admins
- **Search Functionality**: \`find()\` for exact matches, \`filter()\` for search results
- **Validation**: \`find()\` to check if any item is invalid, \`filter()\` to get all invalid items
- **Data Processing**: \`find()\` for unique lookups, \`filter()\` for collections
- **UI Rendering**: \`find()\` for single item display, \`filter()\` for list rendering
- **State Management**: \`find()\` for single item updates, \`filter()\` for bulk operations
- **API Responses**: \`find()\` for single resource, \`filter()\` for collections

**Challenge:** Use find to get the first matching item, and filter to get all matches.`,
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
