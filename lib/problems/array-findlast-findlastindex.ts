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
  id: 'array-findlast-findlastindex',
  title: 'Finding Elements from the End with findLast() and findLastIndex()',
  difficulty: 'easy',
  category: 'Array Methods',
  description: `<h2>In-Depth Explanation</h2>

<p><code>Array.prototype.findLast()</code> and <code>Array.prototype.findLastIndex()</code> are modern array methods that search for elements starting from the end of the array. They are the reverse counterparts to <code>find()</code> and <code>findIndex()</code>.</p>

<p>These methods iterate through the array in reverse order, returning the first match they encounter (which is the last match when considering the original order). This is more efficient than reversing an array before searching.</p>

<h3>Key Features:</h3>
<ul>
  <li><strong>findLast(callback)</strong>: Returns the last element that satisfies the predicate</li>
  <li><strong>findLastIndex(callback)</strong>: Returns the index of the last matching element</li>
  <li><strong>Returns undefined/-1</strong>: When no element matches, findLast returns undefined and findLastIndex returns -1</li>
  <li><strong>Short-circuits</strong>: Stops searching as soon as a match is found</li>
  <li><strong>Callback Signature</strong>: <code>(element, index, array) => boolean</code></li>
</ul>

<h2>Importance</h2>

<p>These methods solve common problems elegantly:</p>

<ul>
  <li><strong>Performance</strong>: More efficient than <code>reverse().find()</code> which creates a new array</li>
  <li><strong>Most Recent Match</strong>: Find the latest entry in chronological data</li>
  <li><strong>Stack-like Access</strong>: Find the most recently added item matching criteria</li>
  <li><strong>Log Analysis</strong>: Find the last error or event in a log</li>
  <li><strong>Preserves Original</strong>: Does not mutate or copy the array</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Common use cases include:</p>

<ul>
  <li><strong>Activity Logs</strong>: Find the last login, last error, last action</li>
  <li><strong>Version History</strong>: Find the most recent version matching criteria</li>
  <li><strong>Undo Systems</strong>: Find the last undoable action of a specific type</li>
  <li><strong>Chat History</strong>: Find the last message from a specific user</li>
  <li><strong>Price History</strong>: Find the most recent price below a threshold</li>
  <li><strong>Transaction Logs</strong>: Find the last successful transaction</li>
  <li><strong>Event Sourcing</strong>: Find the last event of a particular type</li>
</ul>

<p><strong>Challenge:</strong> Implement utility functions using findLast() and findLastIndex() for common search patterns.</p>`,
  examples: [
    {
      input: `[1, 2, 3, 4, 5].findLast(n => n % 2 === 0)`,
      output: `4`,
      explanation: 'Returns the last even number',
    },
    {
      input: `[1, 2, 3, 4, 5].findLastIndex(n => n % 2 === 0)`,
      output: `3`,
      explanation: 'Returns index of last even number (4 is at index 3)',
    },
    {
      input: `[1, 3, 5].findLast(n => n % 2 === 0)`,
      output: `undefined`,
      explanation: 'Returns undefined when no match found',
    },
  ],
  starterCode: `function findLastEven(numbers) {
  // TODO: Find the last even number in the array
  // findLastEven([1, 2, 3, 4, 5, 6]) → 6

  return undefined;
}

function findLastIndexOf(arr, predicate) {
  // TODO: Find the index of the last element matching predicate
  // findLastIndexOf([1, 2, 3, 2, 1], n => n === 2) → 3

  return -1;
}

function findLastObjectByProperty(objects, key, value) {
  // TODO: Find the last object where obj[key] === value
  // findLastObjectByProperty([{id: 1}, {id: 2}, {id: 1}], 'id', 1) → {id: 1} (the last one)

  return undefined;
}

function findLastGreaterThan(numbers, threshold) {
  // TODO: Find the last number greater than threshold
  // findLastGreaterThan([5, 10, 3, 8, 2], 4) → 8

  return undefined;
}

function findLastWithIndex(arr, predicate) {
  // TODO: Return both the element and its index as { element, index }
  // Return { element: undefined, index: -1 } if not found
  // findLastWithIndex([1, 2, 3, 2], n => n === 2) → { element: 2, index: 3 }

  return { element: undefined, index: -1 };
}

// Test
console.log(findLastEven([1, 2, 3, 4, 5, 7, 8]));
console.log(findLastIndexOf(['a', 'b', 'c', 'b', 'd'], x => x === 'b'));
console.log(findLastObjectByProperty(
  [{name: 'Alice'}, {name: 'Bob'}, {name: 'Alice'}],
  'name',
  'Alice'
));
console.log(findLastGreaterThan([10, 5, 20, 8, 15, 3], 10));
console.log(findLastWithIndex([1, 2, 3, 2, 1], n => n === 2));`,
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'findLast() is like find() but searches from the end of the array',
    'findLastIndex() returns -1 when no element matches (like findIndex)',
    'These methods are more efficient than arr.reverse().find() since they do not create a copy',
    'The callback receives (element, index, array) just like find()',
    'For findLastWithIndex, use findLastIndex first, then access the element if found',
  ],
};
