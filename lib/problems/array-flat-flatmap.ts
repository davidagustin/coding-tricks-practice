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
  id: 'array-flat-flatmap',
  title: 'Flattening Arrays with flat() and flatMap()',
  difficulty: 'medium',
  category: 'Array Methods',
  description: `<h2>In-Depth Explanation</h2>

<p><code>Array.prototype.flat()</code> and <code>Array.prototype.flatMap()</code> are powerful methods for working with nested arrays. They allow you to flatten arrays to any depth and combine mapping with flattening in a single operation.</p>

<p>The <code>flat(depth)</code> method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth. The default depth is 1, but you can pass <code>Infinity</code> to flatten completely.</p>

<p>The <code>flatMap(callback)</code> method first maps each element using a mapping function, then flattens the result into a new array. It is equivalent to <code>map().flat(1)</code> but more efficient as it performs both operations in a single pass.</p>

<h3>Key Concepts:</h3>
<ul>
  <li><strong>flat(1)</strong>: Flattens one level deep (default)</li>
  <li><strong>flat(2)</strong>: Flattens two levels deep</li>
  <li><strong>flat(Infinity)</strong>: Completely flattens any nesting depth</li>
  <li><strong>flatMap()</strong>: Map + flatten in one step (always flattens one level)</li>
  <li><strong>Empty slot removal</strong>: Both methods remove empty slots from arrays</li>
</ul>

<h2>Importance</h2>

<p>These methods are essential for modern JavaScript development:</p>

<ul>
  <li><strong>Data Transformation</strong>: Transform nested API responses into flat structures</li>
  <li><strong>Performance</strong>: flatMap is more efficient than map().flat() for one-level flattening</li>
  <li><strong>Readability</strong>: Express complex transformations declaratively</li>
  <li><strong>Functional Programming</strong>: flatMap is a monadic bind operation (chain/bind)</li>
  <li><strong>Tree Processing</strong>: Flatten hierarchical data for easier processing</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Common use cases include:</p>

<ul>
  <li><strong>API Response Flattening</strong>: Normalize nested JSON data structures</li>
  <li><strong>One-to-Many Mapping</strong>: Expand items into multiple elements</li>
  <li><strong>Filtering While Mapping</strong>: Return empty arrays to filter out items</li>
  <li><strong>Text Processing</strong>: Split sentences into words and flatten</li>
  <li><strong>Graph Traversal</strong>: Flatten adjacency lists</li>
  <li><strong>Shopping Cart</strong>: Expand bundled products into individual items</li>
  <li><strong>Permission Systems</strong>: Flatten nested role permissions</li>
</ul>

<p><strong>Challenge:</strong> Implement functions using flat() and flatMap() to transform nested arrays and perform one-to-many mappings.</p>`,
  examples: [
    {
      input: `[1, [2, 3], [4, [5, 6]]].flat()`,
      output: `[1, 2, 3, 4, [5, 6]]`,
      explanation: 'Flattens one level by default',
    },
    {
      input: `[1, [2, [3, [4]]]].flat(Infinity)`,
      output: `[1, 2, 3, 4]`,
      explanation: 'Completely flattens with Infinity depth',
    },
    {
      input: `["hello world", "foo bar"].flatMap(s => s.split(" "))`,
      output: `["hello", "world", "foo", "bar"]`,
      explanation: 'Maps and flattens in one step',
    },
  ],
  starterCode: `function flattenDeep(nestedArray) {
  // TODO: Completely flatten an array of any nesting depth
  // flattenDeep([1, [2, [3, [4]]]]) → [1, 2, 3, 4]

  return [];
}

function flattenToDepth(nestedArray, depth) {
  // TODO: Flatten array to a specific depth
  // flattenToDepth([1, [2, [3]]], 1) → [1, 2, [3]]

  return [];
}

function expandAndFlatten(items, expandFn) {
  // TODO: Use flatMap to expand each item using expandFn
  // expandAndFlatten([1, 2], n => [n, n*2]) → [1, 2, 2, 4]

  return [];
}

function getWordsFromSentences(sentences) {
  // TODO: Split each sentence into words and flatten
  // getWordsFromSentences(["hello world", "foo bar"]) → ["hello", "world", "foo", "bar"]

  return [];
}

function filterAndTransform(numbers, filterFn, transformFn) {
  // TODO: Use flatMap to filter (return [] to exclude) and transform
  // filterAndTransform([1, 2, 3, 4], n => n % 2 === 0, n => n * 10) → [20, 40]

  return [];
}

// Test
console.log(flattenDeep([1, [2, [3, [4, [5]]]]]));
console.log(flattenToDepth([1, [2, [3, [4]]]], 2));
console.log(expandAndFlatten([1, 2, 3], n => [n, n * n]));
console.log(getWordsFromSentences(["hello world", "foo bar"]));
console.log(filterAndTransform([1, 2, 3, 4, 5], n => n > 2, n => n * 10));`,
  solution: `function flattenDeep(nestedArray) {
  // Completely flatten an array of any nesting depth
  // Use flat(Infinity) to flatten all levels
  return nestedArray.flat(Infinity);
}

function flattenToDepth(nestedArray, depth) {
  // Flatten array to a specific depth
  return nestedArray.flat(depth);
}

function expandAndFlatten(items, expandFn) {
  // Use flatMap to expand each item using expandFn
  // flatMap maps and then flattens one level
  return items.flatMap(expandFn);
}

function getWordsFromSentences(sentences) {
  // Split each sentence into words and flatten
  return sentences.flatMap(sentence => sentence.split(' '));
}

function filterAndTransform(numbers, filterFn, transformFn) {
  // Use flatMap to filter (return [] to exclude) and transform
  // Return empty array to filter out, single-element array to include
  return numbers.flatMap(n => filterFn(n) ? [transformFn(n)] : []);
}

// Test
console.log(flattenDeep([1, [2, [3, [4, [5]]]]])); // [1, 2, 3, 4, 5]
console.log(flattenToDepth([1, [2, [3, [4]]]], 2)); // [1, 2, 3, [4]]
console.log(expandAndFlatten([1, 2, 3], n => [n, n * n])); // [1, 1, 2, 4, 3, 9]
console.log(getWordsFromSentences(["hello world", "foo bar"])); // ["hello", "world", "foo", "bar"]
console.log(filterAndTransform([1, 2, 3, 4, 5], n => n > 2, n => n * 10)); // [30, 40, 50]`,
  testCases: [
    {
      input: [[1, [2, [3, [4, [5]]]]]],
      expectedOutput: [1, 2, 3, 4, 5],
      description: 'flattenDeep should completely flatten nested array',
    },
    {
      input: [[1, [2, [3, [4]]]], 2],
      expectedOutput: [1, 2, 3, [4]],
      description: 'flattenToDepth should flatten to specified depth',
    },
    {
      input: [["hello world", "foo bar"]],
      expectedOutput: ["hello", "world", "foo", "bar"],
      description: 'getWordsFromSentences should split and flatten',
    },
    {
      input: [[1, 2, 3, 4, 5]],
      expectedOutput: [30, 40, 50],
      description: 'filterAndTransform should filter and transform using flatMap',
    },
  ],
  hints: [
    'Use flat(Infinity) to completely flatten arrays of any depth',
    'flatMap automatically flattens one level - return arrays from the callback',
    'Return an empty array [] in flatMap to filter out elements',
    'flatMap is equivalent to map().flat(1) but more efficient',
    'flat() removes empty slots from sparse arrays',
  ],
};
