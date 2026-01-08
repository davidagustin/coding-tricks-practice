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
  id: 'chunk-arrays',
  title: 'Chunking Arrays into Groups',
  difficulty: 'medium',
  category: 'Array Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>Chunking splits an array into smaller arrays of a specified size. This is useful for processing large datasets in batches, implementing pagination, or displaying data in grids.</p>

<p>The pattern uses <code>Array.from()</code> to create an array of chunk indices, then uses <code>slice()</code> to extract each chunk from the original array. The number of chunks is calculated using <code>Math.ceil(array.length / size)</code> to ensure the last chunk (which may be smaller) is included.</p>

<p>This approach is elegant because it:</p>
<ol>
  <li>Calculates the exact number of chunks needed</li>
  <li>Uses <code>slice()</code> to extract non-overlapping chunks</li>
  <li>Handles edge cases (empty arrays, size larger than array) naturally</li>
</ol>

<h2>Importance</h2>

<p>Chunking is essential for handling large datasets because:</p>

<ul>
  <li><strong>Memory Management</strong>: Processes data in manageable chunks, reducing memory usage</li>
  <li><strong>Performance</strong>: Allows batch processing, which can be more efficient</li>
  <li><strong>Pagination</strong>: Foundation for pagination in UIs and APIs</li>
  <li><strong>API Limits</strong>: Respects API rate limits by batching requests</li>
  <li><strong>UI Rendering</strong>: Enables virtual scrolling and lazy loading</li>
  <li><strong>Database Operations</strong>: Essential for batch database operations</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This pattern is used extensively in production applications:</p>

<ul>
  <li><strong>Pagination</strong>: Splitting data into pages for display</li>
  <li><strong>Batch Processing</strong>: Processing large datasets in batches</li>
  <li><strong>API Requests</strong>: Batching API calls to respect rate limits</li>
  <li><strong>Image Galleries</strong>: Organizing images into rows or grids</li>
  <li><strong>Data Export</strong>: Exporting data in chunks to avoid memory issues</li>
  <li><strong>Web Workers</strong>: Sending data to web workers in chunks</li>
  <li><strong>Streaming</strong>: Processing streams in chunks</li>
  <li><strong>Grid Layouts</strong>: Organizing items into grid layouts</li>
</ul>

<p><strong>Challenge:</strong> Create a function to chunk arrays into smaller arrays.</p>`,
  examples: [
    {
      input: `chunk([1, 2, 3, 4, 5], 2)`,
      output: `[[1, 2], [3, 4], [5]]`,
      explanation: 'Split array into chunks of size 2',
    },
  ],
  starterCode: `function chunk(array, size) {
  // TODO: Split array into chunks of given size
  // Use Array.from or reduce
  // chunk([1, 2, 3, 4, 5], 2) => [[1, 2], [3, 4], [5]]
  
  return [];
}

console.log(chunk([1, 2, 3, 4, 5, 6, 7], 3));
console.log(chunk(['a', 'b', 'c', 'd'], 2));`,
  solution: `function chunk(array, size) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}`,
  testCases: [
    {
      input: [[1, 2, 3, 4, 5], 2],
      expectedOutput: [[1, 2], [3, 4], [5]],
    },
    {
      input: [[1, 2, 3, 4, 5, 6, 7], 3],
      expectedOutput: [[1, 2, 3], [4, 5, 6], [7]],
    },
  ],
  hints: [
    'Calculate number of chunks: Math.ceil(array.length / size)',
    'Use slice() to extract chunks: array.slice(start, start + size)',
    'Array.from can create the chunks array with mapping',
  ],
};
