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
  id: 'array-toSorted-toReversed',
  title: 'Non-Mutating Array Methods: toSorted(), toReversed(), toSpliced()',
  difficulty: 'medium',
  category: 'Array Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>JavaScript ES2023 introduced non-mutating versions of <code>sort()</code>, <code>reverse()</code>, and <code>splice()</code>. These new methods return a new array with the changes applied, leaving the original array unchanged.</p>

<h3>The Three New Methods:</h3>
<ul>
  <li><strong>toSorted(compareFn?)</strong>: Returns a new sorted array (non-mutating <code>sort()</code>)</li>
  <li><strong>toReversed()</strong>: Returns a new reversed array (non-mutating <code>reverse()</code>)</li>
  <li><strong>toSpliced(start, deleteCount, ...items)</strong>: Returns a new array with elements removed/added (non-mutating <code>splice()</code>)</li>
</ul>

<p>Additionally, <code>with(index, value)</code> returns a new array with one element replaced at the specified index.</p>

<h3>Key Benefits:</h3>
<ul>
  <li><strong>Immutability</strong>: Original array is never modified</li>
  <li><strong>Functional Programming</strong>: Enables method chaining without side effects</li>
  <li><strong>React/Redux Friendly</strong>: Perfect for state updates that require new references</li>
  <li><strong>Predictable</strong>: No unexpected mutations in shared data</li>
</ul>

<h2>Importance</h2>

<p>These methods solve longstanding JavaScript pain points:</p>

<ul>
  <li><strong>State Management</strong>: Essential for React, Redux, and other immutable state patterns</li>
  <li><strong>Bug Prevention</strong>: Eliminates accidental mutation bugs</li>
  <li><strong>Method Chaining</strong>: Chain operations without worrying about mutation order</li>
  <li><strong>Undo/Redo</strong>: Easier to implement with immutable operations</li>
  <li><strong>Concurrent Safety</strong>: Safe to use with shared data structures</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Common use cases include:</p>

<ul>
  <li><strong>React State</strong>: Update arrays in state without spreading/copying manually</li>
  <li><strong>Sorted Views</strong>: Display sorted data while keeping original order</li>
  <li><strong>History Tracking</strong>: Maintain history of array states</li>
  <li><strong>Comparison</strong>: Compare original and modified versions</li>
  <li><strong>Pagination</strong>: Create page slices without modifying source</li>
  <li><strong>Filtering UI</strong>: Show filtered/sorted views while preserving original data</li>
  <li><strong>Functional Pipelines</strong>: Chain array transformations safely</li>
</ul>

<p><strong>Challenge:</strong> Implement functions using the new non-mutating array methods to transform data without modifying the original arrays.</p>`,
  examples: [
    {
      input: `const arr = [3, 1, 2]; arr.toSorted()`,
      output: `[1, 2, 3] // arr is still [3, 1, 2]`,
      explanation: 'toSorted returns new sorted array, original unchanged',
    },
    {
      input: `[1, 2, 3].toReversed()`,
      output: `[3, 2, 1]`,
      explanation: 'toReversed returns new reversed array',
    },
    {
      input: `[1, 2, 3, 4].toSpliced(1, 2, 'a', 'b')`,
      output: `[1, 'a', 'b', 4]`,
      explanation: 'toSpliced removes 2 elements at index 1 and inserts "a", "b"',
    },
  ],
  starterCode: `function getSortedCopy(arr, compareFn) {
  // TODO: Return a sorted copy without modifying the original
  // const original = [3, 1, 2];
  // getSortedCopy(original) → [1, 2, 3]
  // original is still [3, 1, 2]

  return [];
}

function getReversedCopy(arr) {
  // TODO: Return a reversed copy without modifying the original

  return [];
}

function removeAtIndex(arr, index) {
  // TODO: Return new array with element at index removed
  // removeAtIndex([1, 2, 3, 4], 1) → [1, 3, 4]

  return [];
}

function insertAtIndex(arr, index, ...items) {
  // TODO: Return new array with items inserted at index
  // insertAtIndex([1, 4], 1, 2, 3) → [1, 2, 3, 4]

  return [];
}

function replaceAtIndex(arr, index, newValue) {
  // TODO: Return new array with element at index replaced
  // replaceAtIndex([1, 2, 3], 1, 'two') → [1, 'two', 3]
  // Hint: Use the with() method

  return [];
}

function sortDescending(numbers) {
  // TODO: Return new array sorted in descending order
  // sortDescending([1, 5, 3, 2, 4]) → [5, 4, 3, 2, 1]

  return [];
}

// Test
const original = [3, 1, 4, 1, 5];
console.log('Original:', original);
console.log('Sorted copy:', getSortedCopy(original));
console.log('Original after sort:', original);

console.log('Reversed copy:', getReversedCopy([1, 2, 3]));
console.log('Remove at index 2:', removeAtIndex([10, 20, 30, 40], 2));
console.log('Insert at index 1:', insertAtIndex(['a', 'd'], 1, 'b', 'c'));
console.log('Replace at index 1:', replaceAtIndex([1, 2, 3], 1, 'X'));
console.log('Sort descending:', sortDescending([1, 5, 3, 2, 4]));`,
  solution: `function getSortedCopy(arr) {
  // Return a sorted copy without modifying the original
  // getSortedCopy(original) → [1, 2, 3]
  // original is still [3, 1, 2]
  return arr.toSorted();
}

function getReversedCopy(arr) {
  // Return a reversed copy without modifying the original
  return arr.toReversed();
}

function removeAtIndex(arr, index) {
  // Return new array with element at index removed
  // removeAtIndex([1, 2, 3, 4], 1) → [1, 3, 4]
  return arr.toSpliced(index, 1);
}

function insertAtIndex(arr, index, ...items) {
  // Return new array with items inserted at index
  // insertAtIndex([1, 4], 1, 2, 3) → [1, 2, 3, 4]
  return arr.toSpliced(index, 0, ...items);
}

function replaceAtIndex(arr, index, newValue) {
  // Return new array with element at index replaced
  // replaceAtIndex([1, 2, 3], 1, 'two') → [1, 'two', 3]
  // Hint: Use the with() method
  return arr.with(index, newValue);
}

function sortDescending(numbers) {
  // Return new array sorted in descending order
  // sortDescending([1, 5, 3, 2, 4]) → [5, 4, 3, 2, 1]
  return numbers.toSorted((a, b) => b - a);
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'toSorted() takes an optional compare function, just like sort()',
    'toSpliced(index, 0, ...items) inserts items without removing any',
    'toSpliced(index, 1) removes one element at the index',
    'The with(index, value) method is like bracket assignment but returns a new array',
    'These methods are perfect for React state updates: setState(arr.toSorted())',
    'For descending sort, use compareFn: (a, b) => b - a',
  ],
};
