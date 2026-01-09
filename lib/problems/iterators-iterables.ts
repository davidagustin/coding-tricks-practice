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
  id: 'iterators-iterables',
  title: 'Creating Custom Iterators and Iterables',
  difficulty: 'medium',
  category: 'ES6+ Features',
  description: `<h2>In-Depth Explanation</h2>

<p>Iterators and iterables are fundamental concepts in JavaScript that enable objects to define their own iteration behavior. The <strong>iterator protocol</strong> defines how to produce a sequence of values, while the <strong>iterable protocol</strong> allows objects to be used with <code>for...of</code> loops, spread operator, and other iteration contexts.</p>

<h3>Iterator Protocol</h3>
<p>An object is an <strong>iterator</strong> when it implements a <code>next()</code> method that returns an object with:</p>
<ul>
  <li><code>value</code>: The current value in the sequence</li>
  <li><code>done</code>: A boolean indicating if the iteration is complete</li>
</ul>

<h3>Iterable Protocol</h3>
<p>An object is <strong>iterable</strong> when it implements the <code>[Symbol.iterator]</code> method that returns an iterator.</p>

<h3>Built-in Iterables</h3>
<ul>
  <li><code>Array</code>, <code>String</code>, <code>Map</code>, <code>Set</code>, <code>TypedArray</code></li>
  <li><code>arguments</code> object</li>
  <li><code>NodeList</code> and other DOM collections</li>
</ul>

<h2>Importance</h2>

<ul>
  <li><strong>Abstraction</strong>: Hide implementation details of data traversal</li>
  <li><strong>Compatibility</strong>: Work with <code>for...of</code>, spread, destructuring, <code>Array.from()</code></li>
  <li><strong>Lazy Evaluation</strong>: Generate values on-demand, useful for large or infinite sequences</li>
  <li><strong>Custom Collections</strong>: Make your own data structures iterable</li>
  <li><strong>Interoperability</strong>: Standard interface for all JavaScript iteration contexts</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<ul>
  <li><strong>Pagination</strong>: Iterate through pages of data lazily</li>
  <li><strong>Range Objects</strong>: Create numeric ranges like <code>range(1, 10)</code></li>
  <li><strong>Tree Traversal</strong>: Iterate through tree structures in various orders</li>
  <li><strong>Infinite Sequences</strong>: Fibonacci, primes, or other mathematical sequences</li>
  <li><strong>Streaming Data</strong>: Process data chunk by chunk</li>
  <li><strong>Custom Data Structures</strong>: LinkedList, Graph, custom collections</li>
</ul>

<p><strong>Challenge:</strong> Create custom iterators and iterables for different use cases.</p>`,
  examples: [
    {
      input: `const range = {
  start: 1,
  end: 3,
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
};
[...range]`,
      output: `[1, 2, 3]`,
      explanation: 'Custom iterable that generates a range of numbers',
    },
    {
      input: `function* countUp(start) {
  while (true) yield start++;
}
const counter = countUp(1);
[counter.next().value, counter.next().value]`,
      output: `[1, 2]`,
      explanation: 'Generator functions create iterators automatically',
    },
    {
      input: `const str = 'Hi';
const iter = str[Symbol.iterator]();
[iter.next(), iter.next(), iter.next()]`,
      output: `[{value:'H',done:false}, {value:'i',done:false}, {done:true}]`,
      explanation: 'Strings are built-in iterables',
    },
  ],
  starterCode: `// Task 1: Create a range function that returns an iterable
// range(start, end) should be usable with for...of and spread
function range(start, end) {
  // TODO: Return an iterable object
  // Hint: Use [Symbol.iterator] method
  return {
    // Your code here
  };
}

// Task 2: Create a class that is iterable
// The Collection class should store items and be iterable
class Collection {
  constructor(items = []) {
    this.items = items;
  }

  add(item) {
    this.items.push(item);
    return this;
  }

  // TODO: Make this class iterable
  // Implement [Symbol.iterator]() method
}

// Task 3: Create an iterator that iterates in reverse
// reverseIterator(array) returns an iterator (not iterable)
function reverseIterator(array) {
  // TODO: Return an iterator object with next() method
  // that iterates through array in reverse order
  return {
    // Your code here
  };
}

// Task 4: Create an iterable that generates Fibonacci numbers up to max
function fibonacci(max) {
  // TODO: Return an iterable that yields Fibonacci numbers
  // until the value exceeds max
  return {
    // Your code here
  };
}

// Test your implementations
console.log([...range(1, 5)]);  // [1, 2, 3, 4, 5]

const coll = new Collection(['a', 'b']);
coll.add('c');
console.log([...coll]);  // ['a', 'b', 'c']

const revIter = reverseIterator([1, 2, 3]);
console.log(revIter.next());  // { value: 3, done: false }

console.log([...fibonacci(21)]);  // [1, 1, 2, 3, 5, 8, 13, 21]`,
  solution: `// Task 1: Create a range function that returns an iterable
function range(start, end) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          if (current <= end) {
            return { value: current++, done: false };
          }
          return { value: undefined, done: true };
        }
      };
    }
  };
}

// Task 2: Create a class that is iterable
class Collection {
  constructor(items = []) {
    this.items = items;
  }

  add(item) {
    this.items.push(item);
    return this;
  }

  [Symbol.iterator]() {
    return this.items[Symbol.iterator]();
  }
}

// Task 3: Create an iterator that iterates in reverse
function reverseIterator(array) {
  let index = array.length - 1;
  return {
    next() {
      if (index >= 0) {
        return { value: array[index--], done: false };
      }
      return { value: undefined, done: true };
    }
  };
}

// Task 4: Create an iterable that generates Fibonacci numbers up to max
function fibonacci(max) {
  return {
    [Symbol.iterator]() {
      let prev = 0, curr = 1;
      return {
        next() {
          if (curr <= max) {
            const value = curr;
            [prev, curr] = [curr, prev + curr];
            return { value, done: false };
          }
          return { value: undefined, done: true };
        }
      };
    }
  };
}

// Test
console.log([...range(1, 5)]);  // [1, 2, 3, 4, 5]

const coll = new Collection(['a', 'b']);
coll.add('c');
console.log([...coll]);  // ['a', 'b', 'c']

const revIter = reverseIterator([1, 2, 3]);
console.log(revIter.next());  // { value: 3, done: false }
console.log(revIter.next());  // { value: 2, done: false }
console.log(revIter.next());  // { value: 1, done: false }
console.log(revIter.next());  // { value: undefined, done: true }

console.log([...fibonacci(21)]);  // [1, 1, 2, 3, 5, 8, 13, 21]`,
  testCases: [
    {
      input: [1, 5],
      expectedOutput: [1, 2, 3, 4, 5],
      description: 'range returns iterable yielding numbers from start to end',
    },
    {
      input: [['a', 'b', 'c']],
      expectedOutput: ['a', 'b', 'c'],
      description: 'Collection is iterable over its items',
    },
    {
      input: [[1, 2, 3]],
      expectedOutput: { value: 3, done: false },
      description: 'reverseIterator returns elements in reverse order',
    },
    {
      input: [21],
      expectedOutput: [1, 1, 2, 3, 5, 8, 13, 21],
      description: 'fibonacci returns Fibonacci numbers up to max',
    },
  ],
  hints: [
    'The [Symbol.iterator] method must return an object with a next() method',
    'The next() method returns { value, done } - done is true when iteration is complete',
    'For classes, you can also delegate to array iterator: return this.items[Symbol.iterator]()',
    'Generator functions (function*) automatically create iterators with yield',
    'Remember that iterators maintain internal state between next() calls',
  ],
};
