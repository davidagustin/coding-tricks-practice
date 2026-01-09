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
  id: 'lazy-evaluation',
  title: 'Lazy Evaluation Patterns',
  difficulty: 'medium',
  category: 'Performance',
  description: `<h2>In-Depth Explanation</h2>

<p>Lazy evaluation is a strategy that delays the computation of a value until it's actually needed. Instead of computing everything upfront (eager evaluation), lazy evaluation defers work, which can dramatically improve performance when dealing with large datasets or expensive operations.</p>

<p>Key concepts in lazy evaluation:</p>
<ul>
  <li><strong>Generators</strong>: Functions that yield values one at a time using <code>yield</code></li>
  <li><strong>Iterators</strong>: Objects that implement the iterator protocol for lazy traversal</li>
  <li><strong>Thunks</strong>: Functions that wrap a computation to delay its execution</li>
  <li><strong>Lazy Properties</strong>: Object properties computed only when first accessed</li>
</ul>

<h2>Importance</h2>

<p>Lazy evaluation is crucial for performance because:</p>

<ul>
  <li><strong>Memory Efficiency</strong>: Only keeps necessary values in memory at any time</li>
  <li><strong>Infinite Sequences</strong>: Enables working with potentially infinite data streams</li>
  <li><strong>Short-Circuit Optimization</strong>: Stops computation as soon as result is determined</li>
  <li><strong>Startup Performance</strong>: Defers expensive initialization until needed</li>
  <li><strong>Resource Management</strong>: Loads resources only when required</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Lazy evaluation is used extensively in:</p>

<ul>
  <li><strong>Data Processing</strong>: Processing large files line by line without loading entirely</li>
  <li><strong>Pagination</strong>: Loading data on-demand as user scrolls</li>
  <li><strong>Image Loading</strong>: Lazy loading images when they enter viewport</li>
  <li><strong>Database Queries</strong>: ORMs often use lazy loading for related data</li>
  <li><strong>Functional Programming</strong>: Libraries like Lodash provide lazy chain evaluation</li>
  <li><strong>React</strong>: React.lazy() for code splitting and lazy component loading</li>
</ul>

<p><strong>Challenge:</strong> Implement lazy evaluation patterns including generators, lazy properties, and lazy iterables.</p>`,
  examples: [
    {
      input: `const lazy = lazyRange(1, Infinity); lazy.take(5)`,
      output: `[1, 2, 3, 4, 5]`,
      explanation: 'Generates only the 5 values needed, not the infinite range',
    },
    {
      input: `const obj = { get expensive() { return computeValue(); } }`,
      output: `Value computed only on first access`,
      explanation: 'Getter defers computation until property is accessed',
    },
  ],
  starterCode: `// TODO: Implement lazy evaluation patterns

// 1. Lazy Range Generator - generates numbers on demand
function* lazyRange(start, end) {
  // Yield numbers from start to end lazily
  // Your code here
}

// 2. Lazy Map - transforms values only when consumed
function* lazyMap(iterable, transform) {
  // Apply transform lazily to each value
  // Your code here
}

// 3. Lazy Filter - filters values only when consumed
function* lazyFilter(iterable, predicate) {
  // Filter values lazily
  // Your code here
}

// 4. Take - get first n values from a lazy sequence
function take(iterable, n) {
  // Take first n values from any iterable
  // Your code here
}

// 5. Lazy Property - compute value only on first access, then cache
function createLazyObject(computeExpensive) {
  // Return object with a lazy 'value' property
  // Your code here
}

// 6. Lazy Chain - chain operations without immediate execution
class LazyChain {
  constructor(iterable) {
    this.iterable = iterable;
    this.operations = [];
  }

  map(fn) {
    // Add map operation to chain
  }

  filter(fn) {
    // Add filter operation to chain
  }

  take(n) {
    // Execute chain and take n results
  }
}

// Test
const range = lazyRange(1, 1000000);
console.log(take(range, 5));

const doubled = lazyMap(lazyRange(1, 10), x => x * 2);
console.log([...doubled]);

const evens = lazyFilter(lazyRange(1, 20), x => x % 2 === 0);
console.log(take(evens, 5));`,
  solution: `// Implement lazy evaluation patterns

// 1. Lazy Range Generator - generates numbers on demand
function* lazyRange(start, end) {
  // Yield numbers from start to end lazily
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

// 2. Lazy Map - transforms values only when consumed
function* lazyMap(iterable, transform) {
  // Apply transform lazily to each value
  for (const value of iterable) {
    yield transform(value);
  }
}

// 3. Lazy Filter - filters values only when consumed
function* lazyFilter(iterable, predicate) {
  // Filter values lazily
  for (const value of iterable) {
    if (predicate(value)) {
      yield value;
    }
  }
}

// 4. Take - get first n values from a lazy sequence
function take(iterable, n) {
  // Take first n values from any iterable
  const result = [];
  const iterator = iterable[Symbol.iterator]();
  for (let i = 0; i < n; i++) {
    const { value, done } = iterator.next();
    if (done) break;
    result.push(value);
  }
  return result;
}

// 5. Lazy Property - compute value only on first access, then cache
function createLazyObject(computeExpensive) {
  // Return object with a lazy 'value' property
  let cachedValue = undefined;
  let computed = false;
  
  return {
    get value() {
      if (!computed) {
        cachedValue = computeExpensive();
        computed = true;
      }
      return cachedValue;
    }
  };
}

// 6. Lazy Chain - chain operations without immediate execution
class LazyChain {
  constructor(iterable) {
    this.iterable = iterable;
    this.operations = [];
  }

  map(fn) {
    // Add map operation to chain
    this.operations.push({ type: 'map', fn });
    return this;
  }

  filter(fn) {
    // Add filter operation to chain
    this.operations.push({ type: 'filter', fn });
    return this;
  }

  take(n) {
    // Execute chain and take n results
    let result = this.iterable;
    
    for (const op of this.operations) {
      if (op.type === 'map') {
        result = lazyMap(result, op.fn);
      } else if (op.type === 'filter') {
        result = lazyFilter(result, op.fn);
      }
    }
    
    return take(result, n);
  }
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Generators (function*) automatically implement the iterator protocol and yield values on demand',
    'Use for...of to consume iterables - it works with generators and respects lazy evaluation',
    'The take() function should break out of the loop early once it has n values',
    'For lazy properties, use a getter with a flag to track if the value has been computed',
    'LazyChain should store operations and only execute them when a terminal operation (take, toArray) is called',
  ],
};
