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
    description: `## In-Depth Explanation

\`reduceRight()\` is similar to \`reduce()\`, but processes the array from right to left (last element to first). This is essential when the order of operations matters, particularly in function composition where you want to apply functions in a specific sequence.

In function composition, \`compose(f, g, h)(x)\` means \`f(g(h(x)))\` - you apply \`h\` first, then \`g\`, then \`f\`. This requires processing the array of functions from right to left, which is exactly what \`reduceRight\` does.

The accumulator pattern works the same as \`reduce()\`, but the iteration order is reversed. This makes it perfect for operations where the rightmost element should be processed first.

## Importance

\`reduceRight()\` is crucial for operations where order matters:

- **Function Composition**: Essential for building compose functions
- **Mathematical Operations**: Some operations require right-to-left evaluation
- **String Processing**: Building strings or parsing from the end
- **Stack Operations**: Mimicking stack behavior (LIFO - Last In, First Out)
- **Reverse Processing**: When you need to process data in reverse order
- **Pipeline Construction**: Building pipelines that process in reverse order

## Usefulness & Practical Applications

This method is essential in functional programming:

- **Function Composition**: Building compose/pipe utilities for functional programming
- **Middleware Stacks**: Processing middleware in reverse order (like Express.js)
- **Mathematical Expressions**: Evaluating expressions that require right-to-left processing
- **String Reversal**: Building reversed strings or processing from the end
- **Stack Simulation**: Implementing stack-based algorithms
- **Reverse Iteration**: When you need to iterate backwards through an array
- **Pipeline Construction**: Building data processing pipelines

**Challenge:** Build a function composition pipeline using reduceRight.`,
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

// Test function that uses compose
function testCompose() {
  const composed = compose(multiplyByTwo, addOne, subtractFive);
  return composed(10);
}`,
    testCases: [
      {
        input: [],
        expectedOutput: 12,
        description: 'testCompose',
      },
    ],
    hints: [
      'reduceRight processes array from last to first element',
      'Useful for function composition: f(g(h(x)))',
      'Accumulator starts with initial value, then each function is applied',
    ],
  };
