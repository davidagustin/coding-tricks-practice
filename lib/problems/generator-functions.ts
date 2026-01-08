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
  description: `<h2>In-Depth Explanation</h2>

<p>Generator functions (declared with <code>function*</code>) create iterators that can pause and resume execution. They use <code>yield</code> to produce values and pause execution, returning control to the caller.</p>

<p>Key characteristics:</p>
<ul>
  <li><strong>Lazy Evaluation</strong>: Values are computed on-demand, not all at once</li>
  <li><strong>Pausable</strong>: Execution pauses at each <code>yield</code>, resumes when next value is requested</li>
  <li><strong>Iterable</strong>: Generators are iterables, can be used with <code>for...of</code>, spread operator</li>
  <li><strong>Infinite Sequences</strong>: Can produce infinite sequences (Fibonacci, primes, etc.)</li>
  <li><strong>Stateful</strong>: Maintain state between yields</li>
</ul>

<p>Use cases:</p>
<ul>
  <li><strong>Sequences</strong>: Generate number sequences, ranges, patterns</li>
  <li><strong>Pagination</strong>: Yield pages of data one at a time</li>
  <li><strong>Infinite Data</strong>: Generate infinite sequences (IDs, random numbers)</li>
  <li><strong>State Machines</strong>: Implement state machines with generators</li>
  <li><strong>Coroutines</strong>: Implement coroutines and cooperative multitasking</li>
</ul>

<h2>Importance</h2>

<p>Generators are essential for advanced JavaScript patterns because:</p>

<ul>
  <li><strong>Memory Efficiency</strong>: Generate values on-demand, not all at once</li>
  <li><strong>Infinite Sequences</strong>: Handle infinite data streams</li>
  <li><strong>Control Flow</strong>: Complex control flow with pausable execution</li>
  <li><strong>Iteration</strong>: Create custom iterables easily</li>
  <li><strong>Async Patterns</strong>: Foundation for async generators</li>
  <li><strong>Performance</strong>: Efficient for large or infinite sequences</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Generators are used extensively:</p>

<ul>
  <li><strong>Sequence Generation</strong>: Number sequences, date ranges, patterns</li>
  <li><strong>Pagination</strong>: Fetching and processing paginated data</li>
  <li><strong>Infinite Scrolling</strong>: Generating content for infinite scroll</li>
  <li><strong>ID Generation</strong>: Generating unique IDs on demand</li>
  <li><strong>Data Processing</strong>: Processing large datasets in chunks</li>
  <li><strong>State Machines</strong>: Implementing state machines</li>
  <li><strong>Coroutines</strong>: Implementing coroutines</li>
  <li><strong>Testing</strong>: Generating test data on demand</li>
</ul>

<p><strong>Challenge:</strong> Use generators for sequences, pagination, and async iteration.</p>`,
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
  solution: `// Generator that yields numbers from start to end (inclusive)
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

// Infinite ID generator
function* idGenerator(prefix = 'id') {
  let id = 1;
  while (true) {
    yield \`\${prefix}-\${id++}\`;
  }
}

// Generator that yields Fibonacci numbers (infinite)
function* fibonacci() {
  let prev = 0;
  let curr = 1;

  yield prev; // 0
  yield curr; // 1

  while (true) {
    const next = prev + curr;
    yield next;
    prev = curr;
    curr = next;
  }
}

// Generator that chunks an array
function* chunk(arr, size) {
  for (let i = 0; i < arr.length; i += size) {
    yield arr.slice(i, i + size);
  }
}

// Test
console.log([...range(1, 5)]); // [1, 2, 3, 4, 5]

const ids = idGenerator('user');
console.log(ids.next().value); // 'user-1'
console.log(ids.next().value); // 'user-2'

const fib = fibonacci();
const first10Fib = Array.from({ length: 10 }, () => fib.next().value);
console.log(first10Fib); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

console.log([...chunk([1, 2, 3, 4, 5], 2)]); // [[1, 2], [3, 4], [5]]`,
  testCases: [
    {
      input: { function: 'range', args: [1, 5] },
      expectedOutput: [1, 2, 3, 4, 5],
      description: 'range(1, 5) should yield [1, 2, 3, 4, 5]',
    },
    {
      input: { function: 'range', args: [0, 3] },
      expectedOutput: [0, 1, 2, 3],
      description: 'range(0, 3) should yield [0, 1, 2, 3]',
    },
    {
      input: { function: 'idGenerator', prefix: 'user', count: 3 },
      expectedOutput: ['user-1', 'user-2', 'user-3'],
      description: 'idGenerator should generate sequential IDs with prefix',
    },
    {
      input: { function: 'fibonacci', count: 10 },
      expectedOutput: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34],
      description: 'fibonacci should yield the Fibonacci sequence',
    },
    {
      input: { function: 'chunk', args: [[1, 2, 3, 4, 5], 2] },
      expectedOutput: [[1, 2], [3, 4], [5]],
      description: 'chunk should split array into chunks of specified size',
    },
    {
      input: { function: 'chunk', args: [[1, 2, 3, 4, 5, 6], 3] },
      expectedOutput: [[1, 2, 3], [4, 5, 6]],
      description: 'chunk should handle even division',
    },
  ],
  hints: [
    'Use function* to declare a generator',
    'yield pauses execution and returns value',
    'while(true) with yield creates infinite generator',
  ],
};
