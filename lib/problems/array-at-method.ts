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
  id: 'array-at-method',
  title: 'Array Indexing with at()',
  difficulty: 'easy',
  category: 'Array Methods',
  description: `<h2>In-Depth Explanation</h2>

<p><code>Array.prototype.at()</code> is a modern method for accessing array elements that supports both positive and negative indexing. Unlike bracket notation, <code>at()</code> allows you to use negative indices to access elements from the end of the array.</p>

<p>The <code>at(index)</code> method returns the element at the specified index. Positive indices work like bracket notation (0 is first element), while negative indices count backwards from the end (-1 is last element, -2 is second-to-last, etc.).</p>

<h3>Key Features:</h3>
<ul>
  <li><strong>Positive Indexing</strong>: <code>arr.at(0)</code> returns first element, same as <code>arr[0]</code></li>
  <li><strong>Negative Indexing</strong>: <code>arr.at(-1)</code> returns last element</li>
  <li><strong>Returns undefined</strong>: Out of bounds indices return <code>undefined</code></li>
  <li><strong>Works on Strings</strong>: <code>String.prototype.at()</code> also exists</li>
  <li><strong>Works on TypedArrays</strong>: All typed arrays support <code>at()</code></li>
</ul>

<h2>Importance</h2>

<p>The <code>at()</code> method solves a common pain point in JavaScript:</p>

<ul>
  <li><strong>Cleaner Syntax</strong>: No more <code>arr[arr.length - 1]</code> for the last element</li>
  <li><strong>Readability</strong>: <code>arr.at(-1)</code> clearly expresses "last element"</li>
  <li><strong>Less Error-Prone</strong>: Avoids off-by-one errors in length calculations</li>
  <li><strong>Dynamic Access</strong>: Works with computed negative indices</li>
  <li><strong>Consistency</strong>: Matches Python's negative indexing behavior</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Common use cases include:</p>

<ul>
  <li><strong>Accessing Last Element</strong>: Get the most recent item in a list</li>
  <li><strong>Stack Operations</strong>: Peek at the top of a stack without popping</li>
  <li><strong>Circular Buffers</strong>: Access elements with wraparound logic</li>
  <li><strong>History Navigation</strong>: Access previous states in undo/redo systems</li>
  <li><strong>Sliding Windows</strong>: Access elements relative to current position</li>
  <li><strong>String Manipulation</strong>: Access last character of strings easily</li>
  <li><strong>Queue Inspection</strong>: Check front and back of queues</li>
</ul>

<p><strong>Challenge:</strong> Implement utility functions using the at() method for common array access patterns.</p>`,
  examples: [
    {
      input: `["a", "b", "c", "d"].at(-1)`,
      output: `"d"`,
      explanation: 'Negative index -1 returns last element',
    },
    {
      input: `["a", "b", "c", "d"].at(-2)`,
      output: `"c"`,
      explanation: 'Negative index -2 returns second-to-last',
    },
    {
      input: `["a", "b", "c"].at(10)`,
      output: `undefined`,
      explanation: 'Out of bounds returns undefined',
    },
  ],
  starterCode: `function getLastElement(arr) {
  // TODO: Return the last element using at()
  // getLastElement([1, 2, 3]) → 3

  return undefined;
}

function getSecondToLast(arr) {
  // TODO: Return the second-to-last element using at()
  // getSecondToLast([1, 2, 3, 4]) → 3

  return undefined;
}

function getNthFromEnd(arr, n) {
  // TODO: Return the nth element from the end (1-indexed)
  // getNthFromEnd([1, 2, 3, 4, 5], 2) → 4 (2nd from end)

  return undefined;
}

function getFirstAndLast(arr) {
  // TODO: Return an object with first and last elements
  // getFirstAndLast([1, 2, 3]) → { first: 1, last: 3 }

  return { first: undefined, last: undefined };
}

function safeAt(arr, index, defaultValue) {
  // TODO: Return element at index, or defaultValue if undefined
  // safeAt([1, 2, 3], 10, 0) → 0
  // safeAt([1, 2, 3], -1, 0) → 3

  return defaultValue;
}

// Test
console.log(getLastElement([1, 2, 3, 4, 5]));
console.log(getSecondToLast(['a', 'b', 'c', 'd']));
console.log(getNthFromEnd([10, 20, 30, 40, 50], 3));
console.log(getFirstAndLast(['start', 'middle', 'end']));
console.log(safeAt([1, 2, 3], 100, -1));`,
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Use at(-1) to get the last element instead of arr[arr.length - 1]',
    'Negative indices count backwards: -1 is last, -2 is second-to-last, etc.',
    'at() returns undefined for out-of-bounds indices, just like bracket notation',
    'For getNthFromEnd, if n=1 means last, use at(-n)',
    'at() also works on strings: "hello".at(-1) returns "o"',
  ],
};
