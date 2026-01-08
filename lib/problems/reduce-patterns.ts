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
  description: `## In-Depth Explanation

\`reduce\` is the most powerful array method, capable of implementing any array transformation. Advanced patterns include:

**Counting**: Build objects that count occurrences - \`{ item: count }\`
**Grouping**: Build objects that group items - \`{ key: [items] }\`
**Running Totals**: Build arrays with cumulative values
**Flattening**: Flatten nested arrays
**Transforming**: Transform arrays into any data structure

The key insight is that the accumulator can be any type - object, array, Map, Set, or even a primitive. This flexibility makes \`reduce\` capable of replacing combinations of \`filter\`, \`map\`, and other methods in a single pass.

## Importance

Advanced reduce patterns are essential for data processing because:

- **Performance**: Single pass instead of multiple iterations
- **Flexibility**: Can build any data structure
- **Power**: Most general-purpose array method
- **Functional Style**: Core to functional programming
- **Data Transformation**: Essential for ETL operations
- **Code Efficiency**: Replace multiple method chains with one reduce

## Usefulness & Practical Applications

These patterns are used extensively:

- **Data Analytics**: Counting occurrences, grouping by categories
- **State Management**: Building state objects from arrays
- **API Processing**: Transforming API responses into desired formats
- **Report Generation**: Grouping and aggregating data for reports
- **Data Normalization**: Normalizing nested data structures
- **Statistics**: Calculating running totals, averages, etc.
- **UI Data Preparation**: Preparing data for display (grouping, counting)
- **Database Queries**: Mimicking SQL GROUP BY, COUNT operations

**Challenge:** Use reduce for grouping, counting occurrences, and running totals.`,
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
  return arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const groupKey = item[key];
    acc[groupKey] = acc[groupKey] || [];
    acc[groupKey].push(item);
    return acc;
  }, {});
}

function runningTotal(numbers) {
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
      description: 'countOccurrences',
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
      description: 'groupBy',
    },
    {
      input: [[1, 2, 3, 4, 5]],
      expectedOutput: [1, 3, 6, 10, 15],
      description: 'runningTotal',
    },
  ],
  hints: [
    'reduce(callback, initialValue) - start with {} or []',
    'acc[key] = (acc[key] || 0) + 1 for counting',
    'acc[key] = acc[key] || [] for grouping',
  ],
};
