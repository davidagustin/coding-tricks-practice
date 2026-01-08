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
    id: 'generator-functions',
    title: 'Generator Functions',
    difficulty: 'hard',
    category: 'JavaScript Advanced',
    description: `## In-Depth Explanation

Generator functions (declared with \`function*\`) create iterators that can pause and resume execution. They use \`yield\` to produce values and pause execution, returning control to the caller.

Key characteristics:
- **Lazy Evaluation**: Values are computed on-demand, not all at once
- **Pausable**: Execution pauses at each \`yield\`, resumes when next value is requested
- **Iterable**: Generators are iterables, can be used with \`for...of\`, spread operator
- **Infinite Sequences**: Can produce infinite sequences (Fibonacci, primes, etc.)
- **Stateful**: Maintain state between yields

Use cases:
- **Sequences**: Generate number sequences, ranges, patterns
- **Pagination**: Yield pages of data one at a time
- **Infinite Data**: Generate infinite sequences (IDs, random numbers)
- **State Machines**: Implement state machines with generators
- **Coroutines**: Implement coroutines and cooperative multitasking

## Importance

Generators are essential for advanced JavaScript patterns because:

- **Memory Efficiency**: Generate values on-demand, not all at once
- **Infinite Sequences**: Handle infinite data streams
- **Control Flow**: Complex control flow with pausable execution
- **Iteration**: Create custom iterables easily
- **Async Patterns**: Foundation for async generators
- **Performance**: Efficient for large or infinite sequences

## Usefulness & Practical Applications

Generators are used extensively:

- **Sequence Generation**: Number sequences, date ranges, patterns
- **Pagination**: Fetching and processing paginated data
- **Infinite Scrolling**: Generating content for infinite scroll
- **ID Generation**: Generating unique IDs on demand
- **Data Processing**: Processing large datasets in chunks
- **State Machines**: Implementing state machines
- **Coroutines**: Implementing coroutines
- **Testing**: Generating test data on demand

**Challenge:** Use generators for sequences, pagination, and async iteration.`,
    examples: [
      {
        input: `function* count() { yield 1; yield 2; yield 3; }`,
        output: `[...count()] → [1, 2, 3]`,
        explanation: 'Generator produces values on demand',
      },
    ],
    starterCode: `// TODO: Create a generator that yields numbers from start to end
function* range(start, end) {
  // yield each number from start to end (inclusive)
}

// TODO: Create an infinite ID generator
function* idGenerator(prefix = 'id') {
  // yield 'id-1', 'id-2', 'id-3', ...
}

// TODO: Create a generator that yields Fibonacci numbers
function* fibonacci() {
  // yield infinite Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8...
}

// TODO: Create a generator that chunks an array
function* chunk(arr, size) {
  // yield arrays of 'size' elements
  // chunk([1,2,3,4,5], 2) → [1,2], [3,4], [5]
}

// Test
console.log([...range(1, 5)]); // [1, 2, 3, 4, 5]

const ids = idGenerator('user');
console.log(ids.next().value); // 'user-1'
console.log(ids.next().value); // 'user-2'

const fib = fibonacci();
const first10Fib = Array.from({ length: 10 }, () => fib.next().value);
console.log(first10Fib);

console.log([...chunk([1, 2, 3, 4, 5], 2)]);`,
    solution: `function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

function* idGenerator(prefix = 'id') {
  let id = 1;
  while (true) {
    yield prefix + '-' + id++;
  }
}

function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function* chunk(arr, size) {
  for (let i = 0; i < arr.length; i += size) {
    yield arr.slice(i, i + size);
  }
}`,
    testCases: [
      {
        input: [1, 5],
        expectedOutput: [1, 2, 3, 4, 5],
        description: 'range generator',
      },
      {
        input: [[1, 2, 3, 4, 5], 2],
        expectedOutput: [[1, 2], [3, 4], [5]],
        description: 'chunk generator',
      },
    ],
    hints: [
      'Use function* to declare a generator',
      'yield pauses execution and returns value',
      'while(true) with yield creates infinite generator',
    ],
  };
