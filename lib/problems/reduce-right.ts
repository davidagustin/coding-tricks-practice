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
  id: 'reduce-right',
  title: 'ReduceRight for Right-to-Left Operations',
  difficulty: 'medium',
  category: 'Array Methods',
  description: `<h2>In-Depth Explanation</h2>

<p><code>reduceRight()</code> is similar to <code>reduce()</code>, but processes the array from right to left (last element to first). This is essential when the order of operations matters, particularly in function composition where you want to apply functions in a specific sequence.</p>

<p>In function composition, <code>compose(f, g, h)(x)</code> means <code>f(g(h(x)))</code> - you apply <code>h</code> first, then <code>g</code>, then <code>f</code>. This requires processing the array of functions from right to left, which is exactly what <code>reduceRight</code> does.</p>

<p>The accumulator pattern works the same as <code>reduce()</code>, but the iteration order is reversed. This makes it perfect for operations where the rightmost element should be processed first.</p>

<h2>Importance</h2>

<p><code>reduceRight()</code> is crucial for operations where order matters:</p>

<ul>
  <li><strong>Function Composition</strong>: Essential for building compose functions</li>
  <li><strong>Mathematical Operations</strong>: Some operations require right-to-left evaluation</li>
  <li><strong>String Processing</strong>: Building strings or parsing from the end</li>
  <li><strong>Stack Operations</strong>: Mimicking stack behavior (LIFO - Last In, First Out)</li>
  <li><strong>Reverse Processing</strong>: When you need to process data in reverse order</li>
  <li><strong>Pipeline Construction</strong>: Building pipelines that process in reverse order</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This method is essential in functional programming:</p>

<ul>
  <li><strong>Function Composition</strong>: Building compose/pipe utilities for functional programming</li>
  <li><strong>Middleware Stacks</strong>: Processing middleware in reverse order (like Express.js)</li>
  <li><strong>Mathematical Expressions</strong>: Evaluating expressions that require right-to-left processing</li>
  <li><strong>String Reversal</strong>: Building reversed strings or processing from the end</li>
  <li><strong>Stack Simulation</strong>: Implementing stack-based algorithms</li>
  <li><strong>Reverse Iteration</strong>: When you need to iterate backwards through an array</li>
  <li><strong>Pipeline Construction</strong>: Building data processing pipelines</li>
</ul>

<p><strong>Challenge:</strong> Build a function composition pipeline using reduceRight.</p>`,
  examples: [
    {
      input: `const functions = [x => x * 2, x => x + 1, x => x - 5];`,
      output: `Composed function: (x - 5) + 1) * 2`,
      explanation: 'Apply functions from right to left',
    },
  ],
  starterCode: `function compose(...functions) {
  // TODO: Use reduceRight to compose functions
  // compose(f, g, h)(x) should be f(g(h(x)))
  // Process from right to left
  
  return (x) => x;
}

// Test
const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const subtractFive = x => x - 5;

const composed = compose(multiplyByTwo, addOne, subtractFive);
console.log(composed(10)); // Should be: ((10 - 5) + 1) * 2 = 12`,
  solution: `function compose(...functions) {
  return (x) => functions.reduceRight((acc, fn) => fn(acc), x);
}

// Helper functions for testing
const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const subtractFive = x => x - 5;

// Test function that uses compose - accepts input and returns result
function testCompose(x) {
  const composed = compose(multiplyByTwo, addOne, subtractFive);
  return composed(x);
}`,
  testCases: [
    {
      input: [10],
      expectedOutput: 12,
      description: 'testCompose applies functions right-to-left: (10-5+1)*2=12',
    },
    {
      input: [5],
      expectedOutput: 2,
      description: 'testCompose with input 5: (5-5+1)*2=2',
    },
    {
      input: [15],
      expectedOutput: 22,
      description: 'testCompose with input 15: (15-5+1)*2=22',
    },
  ],
  hints: [
    'reduceRight processes array from last to first element',
    'Useful for function composition: f(g(h(x)))',
    'Accumulator starts with initial value, then each function is applied',
  ],
};
