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
  description: `<h2>In-Depth Explanation</h2>

<p>Custom sort comparators allow you to define how elements are ordered. A comparator function takes two elements (\<code>a\</code> and \<code>b\</code>) and returns:</p>
<ul>
  <li><strong>Negative number</strong>: \<code>a\</code> comes before \<code>b\</code></li>
  <li><strong>Zero</strong>: \<code>a\</code> and \<code>b\</code> are equal (order unchanged)</li>
  <li><strong>Positive number</strong>: \<code>a\</code> comes after \<code>b\</code></li>
</ul>

<p>For numbers: \<code>(a, b) => a - b\</code> sorts ascending, \<code>(a, b) => b - a\</code> sorts descending.</p>

<p>Advanced patterns:</p>
<ul>
  <li><strong>Multiple Criteria</strong>: Sort by primary field, then secondary field</li>
  <li><strong>Null Handling</strong>: Put nulls first or last</li>
  <li><strong>Object Sorting</strong>: Sort objects by property values</li>
  <li><strong>Case-Insensitive</strong>: Sort strings ignoring case</li>
  <li><strong>Custom Logic</strong>: Any custom comparison logic</li>
</ul>

<h2>Importance</h2>

<p>Custom comparators are essential for data sorting because:</p>

<ul>
  <li><strong>Flexibility</strong>: Sort by any criteria, not just default comparison</li>
  <li><strong>Object Sorting</strong>: Sort arrays of objects by properties</li>
  <li><strong>Multiple Criteria</strong>: Sort by multiple fields (e.g., last name, then first name)</li>
  <li><strong>Edge Cases</strong>: Handle nulls, undefined, special values</li>
  <li><strong>Localization</strong>: Sort according to locale-specific rules</li>
  <li><strong>Performance</strong>: Efficient sorting for complex data structures</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Custom comparators are used everywhere:</p>

<ul>
  <li><strong>User Lists</strong>: Sort users by name, age, role, etc.</li>
  <li><strong>Product Lists</strong>: Sort products by price, rating, name</li>
  <li><strong>Tables</strong>: Sort table columns in data tables</li>
  <li><strong>Search Results</strong>: Sort search results by relevance, date, etc.</li>
  <li><strong>Reports</strong>: Sort report data by various dimensions</li>
  <li><strong>Leaderboards</strong>: Sort players by score, time, etc.</li>
  <li><strong>Data Analysis</strong>: Sort data for analysis and visualization</li>
  <li><strong>UI Components</strong>: Sortable lists, tables, grids</li>
</ul>

<p><strong>Challenge:</strong> Sort by multiple criteria, handle nulls, and sort objects.</p>`,
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
    const aVal = a[property];
    const bVal = b[property];

    // Handle string comparison
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      const comparison = aVal.localeCompare(bVal);
      return order === 'asc' ? comparison : -comparison;
    }

    // Handle numeric comparison
    const comparison = aVal - bVal;
    return order === 'asc' ? comparison : -comparison;
  });
}

function sortByMultiple(arr, criteria) {
  return [...arr].sort((a, b) => {
    for (const { key, order } of criteria) {
      const aVal = a[key];
      const bVal = b[key];

      let comparison;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal);
      } else {
        comparison = aVal - bVal;
      }

      if (comparison !== 0) {
        return order === 'asc' ? comparison : -comparison;
      }
    }
    return 0;
  });
}

function sortWithNulls(arr, nullsFirst = true) {
  return [...arr].sort((a, b) => {
    // Handle nulls
    if (a === null && b === null) return 0;
    if (a === null) return nullsFirst ? -1 : 1;
    if (b === null) return nullsFirst ? 1 : -1;

    // Normal numeric comparison
    return a - b;
  });
}`,
  testCases: [
    {
      input: {
        type: 'byProperty',
        arr: [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }],
        property: 'age',
        order: 'asc'
      },
      expectedOutput: [{ name: 'Jane', age: 25 }, { name: 'John', age: 30 }],
      description: 'sortByProperty sorts by age ascending'
    },
    {
      input: {
        type: 'byProperty',
        arr: [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }],
        property: 'age',
        order: 'desc'
      },
      expectedOutput: [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }],
      description: 'sortByProperty sorts by age descending'
    },
    {
      input: {
        type: 'byMultiple',
        arr: [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }, { name: 'Bob', age: 30 }],
        criteria: [{ key: 'age', order: 'asc' }, { key: 'name', order: 'asc' }]
      },
      expectedOutput: [{ name: 'Jane', age: 25 }, { name: 'Bob', age: 30 }, { name: 'John', age: 30 }],
      description: 'sortByMultiple sorts by age then name'
    },
    {
      input: { type: 'withNulls', arr: [3, null, 1, null, 2], nullsFirst: true },
      expectedOutput: [null, null, 1, 2, 3],
      description: 'sortWithNulls puts nulls first'
    },
    {
      input: { type: 'withNulls', arr: [3, null, 1, null, 2], nullsFirst: false },
      expectedOutput: [1, 2, 3, null, null],
      description: 'sortWithNulls puts nulls last'
    },
  ],
  hints: [
    'Return negative if a < b, positive if a > b, 0 if equal',
    'For descending order, reverse the comparison',
    'Handle null/undefined before comparing values',
  ],
};
