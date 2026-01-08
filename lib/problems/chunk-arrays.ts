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
    description: `## In-Depth Explanation

Chunking splits an array into smaller arrays of a specified size. This is useful for processing large datasets in batches, implementing pagination, or displaying data in grids.

The pattern uses \`Array.from()\` to create an array of chunk indices, then uses \`slice()\` to extract each chunk from the original array. The number of chunks is calculated using \`Math.ceil(array.length / size)\` to ensure the last chunk (which may be smaller) is included.

This approach is elegant because it:
1. Calculates the exact number of chunks needed
2. Uses \`slice()\` to extract non-overlapping chunks
3. Handles edge cases (empty arrays, size larger than array) naturally

## Importance

Chunking is essential for handling large datasets because:

- **Memory Management**: Processes data in manageable chunks, reducing memory usage
- **Performance**: Allows batch processing, which can be more efficient
- **Pagination**: Foundation for pagination in UIs and APIs
- **API Limits**: Respects API rate limits by batching requests
- **UI Rendering**: Enables virtual scrolling and lazy loading
- **Database Operations**: Essential for batch database operations

## Usefulness & Practical Applications

This pattern is used extensively in production applications:

- **Pagination**: Splitting data into pages for display
- **Batch Processing**: Processing large datasets in batches
- **API Requests**: Batching API calls to respect rate limits
- **Image Galleries**: Organizing images into rows or grids
- **Data Export**: Exporting data in chunks to avoid memory issues
- **Web Workers**: Sending data to web workers in chunks
- **Streaming**: Processing streams in chunks
- **Grid Layouts**: Organizing items into grid layouts

**Challenge:** Create a function to chunk arrays into smaller arrays.`,
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
