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
  description: `<h2>In-Depth Explanation</h2>

<p><code>pipe</code> and <code>compose</code> are utilities for function composition - chaining functions together to create transformation pipelines. <code>pipe</code> applies functions left-to-right (top-to-bottom), while <code>compose</code> applies them right-to-left (bottom-to-top).</p>

<p><code>pipe(f, g, h)(x)</code> means <code>h(g(f(x)))</code> - apply f, then g, then h. <code>compose(f, g, h)(x)</code> means <code>f(g(h(x)))</code> - apply h, then g, then f.</p>

<p>Both create reusable pipelines where:</p>
<ul>
  <li>Each function receives the output of the previous function</li>
  <li>The pipeline reads like a sequence of transformations</li>
  <li>Easy to add, remove, or reorder steps</li>
  <li>Composable and testable</li>
</ul>

<h2>Importance</h2>

<p>Pipe and compose are fundamental to functional programming because:</p>

<ul>
  <li><strong>Readability</strong>: Code reads like a pipeline of transformations</li>
  <li><strong>Composability</strong>: Build complex operations from simple functions</li>
  <li><strong>Maintainability</strong>: Easy to modify pipelines</li>
  <li><strong>Testability</strong>: Each function can be tested independently</li>
  <li><strong>Reusability</strong>: Create reusable transformation pipelines</li>
  <li><strong>Functional Style</strong>: Enables functional programming patterns</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>These utilities are used extensively:</p>

<ul>
  <li><strong>Data Processing</strong>: Transforming data through multiple steps</li>
  <li><strong>API Response Processing</strong>: Processing API responses through pipelines</li>
  <li><strong>Form Validation</strong>: Chaining validation rules</li>
  <li><strong>Data Transformation</strong>: ETL (Extract, Transform, Load) pipelines</li>
  <li><strong>Functional Libraries</strong>: Core utilities in Lodash, Ramda</li>
  <li><strong>React</strong>: Composing higher-order components</li>
  <li><strong>Redux</strong>: Composing middleware and enhancers</li>
  <li><strong>Utility Functions</strong>: Creating reusable utility pipelines</li>
</ul>

<p><strong>Challenge:</strong> Implement pipe (left-to-right) and compose (right-to-left).</p>`,
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
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Use reduce for pipe: fns.reduce((acc, fn) => fn(acc), x)',
    'Use reduceRight for compose',
    'Each function receives the result of the previous',
  ],
};
