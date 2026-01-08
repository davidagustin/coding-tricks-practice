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
  id: 'array-chaining',
  title: 'Method Chaining with Arrays',
  difficulty: 'medium',
  category: 'Array Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>Method chaining is a powerful pattern where you call multiple array methods in sequence, with each method operating on the result of the previous one. This creates a pipeline of transformations that reads like a sentence: "filter, then map, then map again."</p>

<p>The key insight is that most array methods (map, filter, reduce, etc.) return new arrays, allowing you to immediately call another array method on the result. This creates a fluent, readable API where complex transformations are expressed as a series of simple steps.</p>

<p>Chaining works because:</p>
<ol>
  <li>Each method returns a new array (immutability)</li>
  <li>Arrays have all the same methods available</li>
  <li>The chain reads left-to-right, top-to-bottom</li>
</ol>

<h2>Importance</h2>

<p>Method chaining is fundamental to functional programming in JavaScript because:</p>

<ul>
  <li><strong>Readability</strong>: Code reads like a pipeline of transformations</li>
  <li><strong>Composability</strong>: Complex operations built from simple steps</li>
  <li><strong>Immutability</strong>: Each step creates a new array, avoiding mutations</li>
  <li><strong>Debugging</strong>: Easy to add/remove steps in the chain</li>
  <li><strong>Maintainability</strong>: Clear separation of concerns at each step</li>
  <li><strong>Expressiveness</strong>: Code describes what you want, not how to do it</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This pattern is ubiquitous in modern JavaScript development:</p>

<ul>
  <li><strong>Data Processing</strong>: Transforming API responses, normalizing data structures</li>
  <li><strong>UI Data Preparation</strong>: Preparing data for rendering in React/Vue components</li>
  <li><strong>ETL Pipelines</strong>: Extract, Transform, Load operations on data</li>
  <li><strong>Query Building</strong>: Building complex queries from simple filters and maps</li>
  <li><strong>Form Validation</strong>: Chaining validation rules and transformations</li>
  <li><strong>State Management</strong>: Transforming state in Redux/Vuex selectors</li>
  <li><strong>Analytics</strong>: Processing event streams through multiple transformations</li>
  <li><strong>Report Generation</strong>: Building reports through chains of filters and aggregations</li>
</ul>

<p><strong>Challenge:</strong> Transform data through a chain of operations.</p>`,
  examples: [
    {
      input: `const products = [
  { name: 'Laptop', price: 1000, category: 'electronics' },
  { name: 'Book', price: 20, category: 'books' }
];`,
      output: `['LAPTOP', 'BOOK']`,
      explanation: 'Filter expensive items, get names, uppercase them',
    },
  ],
  starterCode: `function getExpensiveProductNames(products) {
  // TODO: Chain methods to:
  // 1. Filter products where price > 100
  // 2. Map to get just the name
  // 3. Map to uppercase each name
  
  return products;
}

const products = [
  { name: 'Laptop', price: 1000, category: 'electronics' },
  { name: 'Book', price: 20, category: 'books' },
  { name: 'Phone', price: 800, category: 'electronics' },
  { name: 'Pen', price: 2, category: 'office' }
];

console.log(getExpensiveProductNames(products));`,
  solution: `function getExpensiveProductNames(products) {
  return products
    .filter(p => p.price > 100)
    .map(p => p.name)
    .map(name => name.toUpperCase());
}`,
  testCases: [
    {
      input: [
        [
          { name: 'Laptop', price: 1000, category: 'electronics' },
          { name: 'Book', price: 20, category: 'books' },
          { name: 'Phone', price: 800, category: 'electronics' },
        ],
      ],
      expectedOutput: ['LAPTOP', 'PHONE'],
    },
  ],
  hints: [
    'Each method returns an array, so you can chain them',
    'Order matters: filter first to reduce items, then transform',
    'You can combine map operations: .map(p => p.name.toUpperCase())',
  ],
};
