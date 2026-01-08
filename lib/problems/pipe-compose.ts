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
    id: 'pipe-compose',
    title: 'Pipe and Compose',
    difficulty: 'medium',
    category: 'Functional Programming',
    description: `## In-Depth Explanation

\`pipe\` and \`compose\` are utilities for function composition - chaining functions together to create transformation pipelines. \`pipe\` applies functions left-to-right (top-to-bottom), while \`compose\` applies them right-to-left (bottom-to-top).

\`pipe(f, g, h)(x)\` means \`h(g(f(x)))\` - apply f, then g, then h.
\`compose(f, g, h)(x)\` means \`f(g(h(x)))\` - apply h, then g, then f.

Both create reusable pipelines where:
- Each function receives the output of the previous function
- The pipeline reads like a sequence of transformations
- Easy to add, remove, or reorder steps
- Composable and testable

## Importance

Pipe and compose are fundamental to functional programming because:

- **Readability**: Code reads like a pipeline of transformations
- **Composability**: Build complex operations from simple functions
- **Maintainability**: Easy to modify pipelines
- **Testability**: Each function can be tested independently
- **Reusability**: Create reusable transformation pipelines
- **Functional Style**: Enables functional programming patterns

## Usefulness & Practical Applications

These utilities are used extensively:

- **Data Processing**: Transforming data through multiple steps
- **API Response Processing**: Processing API responses through pipelines
- **Form Validation**: Chaining validation rules
- **Data Transformation**: ETL (Extract, Transform, Load) pipelines
- **Functional Libraries**: Core utilities in Lodash, Ramda
- **React**: Composing higher-order components
- **Redux**: Composing middleware and enhancers
- **Utility Functions**: Creating reusable utility pipelines

**Challenge:** Implement pipe (left-to-right) and compose (right-to-left).`,
    examples: [
      {
        input: `pipe(addOne, double, square)(2)`,
        output: `36`,
        explanation: '2 → 3 → 6 → 36',
      },
    ],
    starterCode: `// TODO: Implement pipe - left to right function composition
// pipe(f, g, h)(x) = h(g(f(x)))
function pipe(...fns) {
  return function(x) {
    return x;
  };
}

// TODO: Implement compose - right to left function composition
// compose(f, g, h)(x) = f(g(h(x)))
function compose(...fns) {
  return function(x) {
    return x;
  };
}

// Helper functions for testing
const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

// Test
const pipeline = pipe(addOne, double, square);
console.log(pipeline(2)); // 2 → 3 → 6 → 36

const composed = compose(square, double, addOne);
console.log(composed(2)); // 2 → 3 → 6 → 36`,
    solution: `function pipe(...fns) {
  return function(x) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}

function compose(...fns) {
  return function(x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}`,
    testCases: [
      {
        input: [2],
        expectedOutput: 36,
        description: 'pipe(addOne, double, square)(2) → 36',
      },
      {
        input: [2],
        expectedOutput: 36,
        description: 'compose(square, double, addOne)(2) → 36',
      },
      {
        input: [0],
        expectedOutput: 4,
        description: 'pipe(addOne, double, square)(0) → 4',
      },
      {
        input: [5],
        expectedOutput: 144,
        description: 'pipe(addOne, double, square)(5) → 144',
      },
      {
        input: [0],
        expectedOutput: 4,
        description: 'pipe(addOne, double, square)(0)',
      },
    ],
    hints: [
      'Use reduce for pipe: fns.reduce((acc, fn) => fn(acc), x)',
      'Use reduceRight for compose',
      'Each function receives the result of the previous',
    ],
  };
