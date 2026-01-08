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
  id: 'sort-comparators',
  title: 'Custom Sort Comparators',
  difficulty: 'medium',
  category: 'Array Methods',
  description: `## In-Depth Explanation

Custom sort comparators allow you to define how elements are ordered. A comparator function takes two elements (\`a\` and \`b\`) and returns:
- **Negative number**: \`a\` comes before \`b\`
- **Zero**: \`a\` and \`b\` are equal (order unchanged)
- **Positive number**: \`a\` comes after \`b\`

For numbers: \`(a, b) => a - b\` sorts ascending, \`(a, b) => b - a\` sorts descending.

Advanced patterns:
- **Multiple Criteria**: Sort by primary field, then secondary field
- **Null Handling**: Put nulls first or last
- **Object Sorting**: Sort objects by property values
- **Case-Insensitive**: Sort strings ignoring case
- **Custom Logic**: Any custom comparison logic

## Importance

Custom comparators are essential for data sorting because:

- **Flexibility**: Sort by any criteria, not just default comparison
- **Object Sorting**: Sort arrays of objects by properties
- **Multiple Criteria**: Sort by multiple fields (e.g., last name, then first name)
- **Edge Cases**: Handle nulls, undefined, special values
- **Localization**: Sort according to locale-specific rules
- **Performance**: Efficient sorting for complex data structures

## Usefulness & Practical Applications

Custom comparators are used everywhere:

- **User Lists**: Sort users by name, age, role, etc.
- **Product Lists**: Sort products by price, rating, name
- **Tables**: Sort table columns in data tables
- **Search Results**: Sort search results by relevance, date, etc.
- **Reports**: Sort report data by various dimensions
- **Leaderboards**: Sort players by score, time, etc.
- **Data Analysis**: Sort data for analysis and visualization
- **UI Components**: Sortable lists, tables, grids

**Challenge:** Sort by multiple criteria, handle nulls, and sort objects.`,
  examples: [
    {
      input: `users.sort((a, b) => a.age - b.age)`,
      output: `Users sorted by age ascending`,
      explanation: 'Numeric sort with subtraction',
    },
  ],
  starterCode: `function sortByProperty(arr, property, order = 'asc') {
  // TODO: Sort array of objects by property
  // order can be 'asc' or 'desc'

  return arr;
}

function sortByMultiple(arr, criteria) {
  // TODO: Sort by multiple criteria
  // criteria = [{ key: 'age', order: 'asc' }, { key: 'name', order: 'desc' }]

  return arr;
}

function sortWithNulls(arr, nullsFirst = true) {
  // TODO: Sort numbers, putting nulls first or last

  return arr;
}

// Test
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 30 }
];
console.log(sortByProperty([...users], 'age', 'asc'));
console.log(sortByMultiple([...users], [
  { key: 'age', order: 'asc' },
  { key: 'name', order: 'asc' }
]));
console.log(sortWithNulls([3, null, 1, null, 2], true));`,
  solution: `function sortByProperty(arr, property, order = 'asc') {
  return [...arr].sort((a, b) => {
    if (a[property] < b[property]) return order === 'asc' ? -1 : 1;
    if (a[property] > b[property]) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

function sortByMultiple(arr, criteria) {
  return [...arr].sort((a, b) => {
    for (const { key, order } of criteria) {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

function sortWithNulls(arr, nullsFirst = true) {
  return [...arr].sort((a, b) => {
    if (a === null && b === null) return 0;
    if (a === null) return nullsFirst ? -1 : 1;
    if (b === null) return nullsFirst ? 1 : -1;
    return a - b;
  });
}`,
  testCases: [
    {
      input: [
        [
          { name: 'John', age: 30 },
          { name: 'Jane', age: 25 },
        ],
        'age',
        'asc',
      ],
      expectedOutput: [
        { name: 'Jane', age: 25 },
        { name: 'John', age: 30 },
      ],
      description: 'sortByProperty age asc',
    },
    {
      input: [[3, null, 1, null, 2], true],
      expectedOutput: [null, null, 1, 2, 3],
      description: 'sortWithNulls nullsFirst',
    },
    {
      input: [[3, null, 1, null, 2], false],
      expectedOutput: [1, 2, 3, null, null],
      description: 'sortWithNulls nullsLast',
    },
  ],
  hints: [
    'Return negative if a < b, positive if a > b, 0 if equal',
    'For descending order, reverse the comparison',
    'Handle null/undefined before comparing values',
  ],
};
