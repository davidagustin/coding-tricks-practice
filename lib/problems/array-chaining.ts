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
  description: `## In-Depth Explanation

Method chaining is a powerful pattern where you call multiple array methods in sequence, with each method operating on the result of the previous one. This creates a pipeline of transformations that reads like a sentence: "filter, then map, then map again."

The key insight is that most array methods (map, filter, reduce, etc.) return new arrays, allowing you to immediately call another array method on the result. This creates a fluent, readable API where complex transformations are expressed as a series of simple steps.

Chaining works because:
1. Each method returns a new array (immutability)
2. Arrays have all the same methods available
3. The chain reads left-to-right, top-to-bottom

## Importance

Method chaining is fundamental to functional programming in JavaScript because:

- **Readability**: Code reads like a pipeline of transformations
- **Composability**: Complex operations built from simple steps
- **Immutability**: Each step creates a new array, avoiding mutations
- **Debugging**: Easy to add/remove steps in the chain
- **Maintainability**: Clear separation of concerns at each step
- **Expressiveness**: Code describes what you want, not how to do it

## Usefulness & Practical Applications

This pattern is ubiquitous in modern JavaScript development:

- **Data Processing**: Transforming API responses, normalizing data structures
- **UI Data Preparation**: Preparing data for rendering in React/Vue components
- **ETL Pipelines**: Extract, Transform, Load operations on data
- **Query Building**: Building complex queries from simple filters and maps
- **Form Validation**: Chaining validation rules and transformations
- **State Management**: Transforming state in Redux/Vuex selectors
- **Analytics**: Processing event streams through multiple transformations
- **Report Generation**: Building reports through chains of filters and aggregations

**Challenge:** Transform data through a chain of operations.`,
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
