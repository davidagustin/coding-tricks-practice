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
  id: 'reduce-patterns',
  title: 'Advanced Reduce Patterns',
  difficulty: 'medium',
  category: 'Array Methods',
  description: `<h2>In-Depth Explanation</h2>

<p><code>reduce</code> is the most powerful array method, capable of implementing any array transformation. Advanced patterns include:</p>

<p><strong>Counting</strong>: Build objects that count occurrences - <code>{ item: count }</code> <strong>Grouping</strong>: Build objects that group items - <code>{ key: [items] }</code> <strong>Running Totals</strong>: Build arrays with cumulative values <strong>Flattening</strong>: Flatten nested arrays <strong>Transforming</strong>: Transform arrays into any data structure</p>

<p>The key insight is that the accumulator can be any type - object, array, Map, Set, or even a primitive. This flexibility makes <code>reduce</code> capable of replacing combinations of <code>filter</code>, <code>map</code>, and other methods in a single pass.</p>

<h2>Importance</h2>

<p>Advanced reduce patterns are essential for data processing because:</p>

<ul>
  <li><strong>Performance</strong>: Single pass instead of multiple iterations</li>
  <li><strong>Flexibility</strong>: Can build any data structure</li>
  <li><strong>Power</strong>: Most general-purpose array method</li>
  <li><strong>Functional Style</strong>: Core to functional programming</li>
  <li><strong>Data Transformation</strong>: Essential for ETL operations</li>
  <li><strong>Code Efficiency</strong>: Replace multiple method chains with one reduce</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>These patterns are used extensively:</p>

<ul>
  <li><strong>Data Analytics</strong>: Counting occurrences, grouping by categories</li>
  <li><strong>State Management</strong>: Building state objects from arrays</li>
  <li><strong>API Processing</strong>: Transforming API responses into desired formats</li>
  <li><strong>Report Generation</strong>: Grouping and aggregating data for reports</li>
  <li><strong>Data Normalization</strong>: Normalizing nested data structures</li>
  <li><strong>Statistics</strong>: Calculating running totals, averages, etc.</li>
  <li><strong>UI Data Preparation</strong>: Preparing data for display (grouping, counting)</li>
  <li><strong>Database Queries</strong>: Mimicking SQL GROUP BY, COUNT operations</li>
</ul>

<p><strong>Challenge:</strong> Use reduce for grouping, counting occurrences, and running totals.</p>`,
  examples: [
    {
      input: `['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']`,
      output: `{ apple: 3, banana: 2, cherry: 1 }`,
      explanation: 'Count occurrences of each item',
    },
  ],
  starterCode: `function countOccurrences(arr) {
  // TODO: Count occurrences of each item
  // Return object like { item: count }

  return {};
}

function groupBy(arr, key) {
  // TODO: Group array of objects by a key
  // Return object like { keyValue: [items] }

  return {};
}

function runningTotal(numbers) {
  // TODO: Return array of running totals
  // [1, 2, 3] → [1, 3, 6]

  return numbers;
}

// Test
console.log(countOccurrences(['a', 'b', 'a', 'c', 'b', 'a']));
console.log(groupBy([
  { type: 'fruit', name: 'apple' },
  { type: 'vegetable', name: 'carrot' },
  { type: 'fruit', name: 'banana' }
], 'type'));
console.log(runningTotal([1, 2, 3, 4, 5]));`,
  solution: `function countOccurrences(arr) {
  // Count how many times each item appears
  // countOccurrences(['a', 'b', 'a', 'c', 'b', 'a']) → { a: 3, b: 2, c: 1 }
  return arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

function groupBy(arr, key) {
  // Group array of objects by a key
  // Return object like { keyValue: [items] }
  return arr.reduce((acc, item) => {
    const groupKey = item[key];
    acc[groupKey] = acc[groupKey] || [];
    acc[groupKey].push(item);
    return acc;
  }, {});
}

function runningTotal(numbers) {
  // Return array of running totals
  // [1, 2, 3] → [1, 3, 6]
  let sum = 0;
  return numbers.reduce((acc, num) => {
    sum += num;
    acc.push(sum);
    return acc;
  }, []);
}`,
  testCases: [
    {
      input: [['a', 'b', 'a', 'c', 'b', 'a']],
      expectedOutput: { a: 3, b: 2, c: 1 },
      description: 'countOccurrences counts each item in the array',
    },
    {
      input: [['x', 'y', 'x', 'x']],
      expectedOutput: { x: 3, y: 1 },
      description: 'countOccurrences with different input',
    },
    {
      input: [
        [
          { type: 'fruit', name: 'apple' },
          { type: 'vegetable', name: 'carrot' },
          { type: 'fruit', name: 'banana' },
        ],
        'type',
      ],
      expectedOutput: {
        fruit: [
          { type: 'fruit', name: 'apple' },
          { type: 'fruit', name: 'banana' },
        ],
        vegetable: [{ type: 'vegetable', name: 'carrot' }],
      },
      description: 'groupBy groups objects by specified key',
    },
    {
      input: [[1, 2, 3, 4, 5]],
      expectedOutput: [1, 3, 6, 10, 15],
      description: 'runningTotal calculates cumulative sum',
    },
  ],
  hints: [
    'reduce(callback, initialValue) - start with {} or []',
    'acc[key] = (acc[key] || 0) + 1 for counting',
    'acc[key] = acc[key] || [] for grouping',
  ],
};
