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
  id: 'object-groupby',
  title: 'Object.groupBy() - Modern Array Categorization',
  difficulty: 'medium',
  category: 'Object Methods',
  description: `<h2>In-Depth Explanation</h2>

<p><code>Object.groupBy()</code> is a new built-in method (ES2024) that groups array elements by a key returned from a callback function. It replaces the common pattern of using <code>reduce()</code> for grouping.</p>

<pre><code>Object.groupBy(array, (item) => keyToGroupBy)</code></pre>

<p>The method returns a null-prototype object where:</p>
<ul>
  <li>Keys are the values returned by the callback</li>
  <li>Values are arrays of items that produced that key</li>
</ul>

<p>There is also <code>Map.groupBy()</code> which returns a Map instead of an object, useful when keys are not strings.</p>

<h3>Before Object.groupBy:</h3>
<pre><code>const grouped = items.reduce((acc, item) => {
  const key = item.category;
  (acc[key] = acc[key] || []).push(item);
  return acc;
}, {});</code></pre>

<h3>With Object.groupBy:</h3>
<pre><code>const grouped = Object.groupBy(items, item => item.category);</code></pre>

<h2>Importance</h2>

<p>This method is important because:</p>

<ul>
  <li><strong>Cleaner Code</strong>: Eliminates verbose reduce patterns for grouping</li>
  <li><strong>Readability</strong>: Intent is immediately clear from method name</li>
  <li><strong>Performance</strong>: Optimized native implementation</li>
  <li><strong>Common Pattern</strong>: Grouping is extremely common in data processing</li>
  <li><strong>Type Safety</strong>: Better TypeScript support than manual reduce</li>
  <li><strong>Null Prototype</strong>: Result object has no inherited properties</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Common use cases:</p>

<ul>
  <li><strong>Data Visualization</strong>: Group data for charts (by date, category, etc.)</li>
  <li><strong>UI Organization</strong>: Group items for display (products by category)</li>
  <li><strong>Report Generation</strong>: Aggregate data by various dimensions</li>
  <li><strong>Form Validation</strong>: Group errors by field</li>
  <li><strong>Log Analysis</strong>: Group logs by level, date, or source</li>
  <li><strong>User Segmentation</strong>: Group users by role, status, or region</li>
  <li><strong>Inventory Management</strong>: Group products by various attributes</li>
</ul>

<p><strong>Challenge:</strong> Use Object.groupBy() to categorize data in various scenarios.</p>`,
  examples: [
    {
      input: `const products = [
  { name: 'Apple', type: 'fruit' },
  { name: 'Carrot', type: 'vegetable' },
  { name: 'Banana', type: 'fruit' }
];
Object.groupBy(products, p => p.type)`,
      output: `{
  fruit: [{ name: 'Apple', type: 'fruit' }, { name: 'Banana', type: 'fruit' }],
  vegetable: [{ name: 'Carrot', type: 'vegetable' }]
}`,
      explanation: 'Groups products by their type',
    },
    {
      input: `const nums = [1, 2, 3, 4, 5];
Object.groupBy(nums, n => n % 2 === 0 ? 'even' : 'odd')`,
      output: `{ odd: [1, 3, 5], even: [2, 4] }`,
      explanation: 'Groups numbers by parity',
    },
  ],
  starterCode: `// TODO: Group items by a property
function groupByProperty(items, property) {
  // Use Object.groupBy to group items by the given property
  // Example: groupByProperty([{type: 'a'}, {type: 'b'}], 'type')

  return {};
}

// TODO: Group numbers by range (0-9, 10-19, 20-29, etc.)
function groupByRange(numbers) {
  // Group numbers into ranges of 10
  // Keys should be '0-9', '10-19', '20-29', etc.

  return {};
}

// TODO: Group strings by their first letter
function groupByFirstLetter(strings) {
  // Group strings by their first letter (uppercase)

  return {};
}

// TODO: Group objects by multiple criteria (nested grouping)
function groupByMultiple(items, ...keys) {
  // Group by the first key, then recursively group each group by remaining keys
  // Example: groupByMultiple(employees, 'department', 'role')

  return {};
}

// TODO: Polyfill - implement groupBy using reduce (for older environments)
function groupByPolyfill(array, callback) {
  // Implement Object.groupBy behavior using reduce

  return {};
}

// Test your implementations
const products = [
  { name: 'Apple', category: 'fruit', price: 1.5 },
  { name: 'Banana', category: 'fruit', price: 0.5 },
  { name: 'Carrot', category: 'vegetable', price: 0.8 },
  { name: 'Broccoli', category: 'vegetable', price: 1.2 }
];

console.log(groupByProperty(products, 'category'));

const numbers = [3, 15, 22, 7, 41, 18, 9, 33];
console.log(groupByRange(numbers));

const words = ['Apple', 'Banana', 'Avocado', 'Cherry', 'Blueberry'];
console.log(groupByFirstLetter(words));

const employees = [
  { name: 'Alice', dept: 'Engineering', role: 'Senior' },
  { name: 'Bob', dept: 'Engineering', role: 'Junior' },
  { name: 'Carol', dept: 'Sales', role: 'Senior' }
];
console.log(groupByMultiple(employees, 'dept', 'role'));`,
  solution: `// Group items by a property
function groupByProperty(items, property) {
  return Object.groupBy(items, item => item[property]);
}

// Group numbers by range (0-9, 10-19, 20-29, etc.)
function groupByRange(numbers) {
  return Object.groupBy(numbers, num => {
    const start = Math.floor(num / 10) * 10;
    const end = start + 9;
    return \`\${start}-\${end}\`;
  });
}

// Group strings by their first letter
function groupByFirstLetter(strings) {
  return Object.groupBy(strings, str => str[0].toUpperCase());
}

// Group objects by multiple criteria (nested grouping)
function groupByMultiple(items, ...keys) {
  if (keys.length === 0) return items;

  const [firstKey, ...restKeys] = keys;
  const grouped = Object.groupBy(items, item => item[firstKey]);

  if (restKeys.length === 0) return grouped;

  const result = {};
  for (const [key, value] of Object.entries(grouped)) {
    result[key] = groupByMultiple(value, ...restKeys);
  }
  return result;
}

// Polyfill - implement groupBy using reduce (for older environments)
function groupByPolyfill(array, callback) {
  return array.reduce((acc, item, index) => {
    const key = callback(item, index);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, Object.create(null));
}

// Test your implementations
const products = [
  { name: 'Apple', category: 'fruit', price: 1.5 },
  { name: 'Banana', category: 'fruit', price: 0.5 },
  { name: 'Carrot', category: 'vegetable', price: 0.8 },
  { name: 'Broccoli', category: 'vegetable', price: 1.2 }
];

console.log(groupByProperty(products, 'category'));

const numbers = [3, 15, 22, 7, 41, 18, 9, 33];
console.log(groupByRange(numbers));

const words = ['Apple', 'Banana', 'Avocado', 'Cherry', 'Blueberry'];
console.log(groupByFirstLetter(words));

const employees = [
  { name: 'Alice', dept: 'Engineering', role: 'Senior' },
  { name: 'Bob', dept: 'Engineering', role: 'Junior' },
  { name: 'Carol', dept: 'Sales', role: 'Senior' }
];
console.log(groupByMultiple(employees, 'dept', 'role'));`,
  testCases: [
    {
      input: [[{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type'],
      expectedOutput: { a: [{ type: 'a' }, { type: 'a' }], b: [{ type: 'b' }] },
      description: 'groupByProperty groups items by specified property',
    },
    {
      input: [[3, 15, 22, 7]],
      expectedOutput: { '0-9': [3, 7], '10-19': [15], '20-29': [22] },
      description: 'groupByRange groups numbers into ranges of 10',
    },
    {
      input: [['Apple', 'Banana', 'Avocado']],
      expectedOutput: { A: ['Apple', 'Avocado'], B: ['Banana'] },
      description: 'groupByFirstLetter groups by uppercase first letter',
    },
  ],
  hints: [
    'Object.groupBy(array, callback) returns an object with grouped items',
    'The callback receives (item, index) and should return the group key (string)',
    'For ranges, use Math.floor(num / 10) * 10 to get the range start',
    'The result has a null prototype - use Object.entries() to iterate',
    'For nested grouping, recursively apply groupBy to each group',
    'Map.groupBy() is available when you need non-string keys',
  ],
};
