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
    id: 'partition-pattern',
    title: 'Partition Pattern with Reduce',
    difficulty: 'medium',
    category: 'Array Methods',
    description: `## In-Depth Explanation

The partition pattern splits an array into two groups based on a boolean condition. Items that pass the condition go into one group, items that fail go into another. This is a common operation in data processing.

Using \`reduce()\` for partitioning is elegant because it processes the array in a single pass, building up both groups simultaneously. The accumulator is an object with two arrays (e.g., \`{ active: [], inactive: [] }\`), and each element is added to the appropriate group based on the condition.

This pattern is more efficient than calling \`filter()\` twice (which would iterate the array twice) and more readable than manual loops. It's a functional programming pattern that clearly expresses the intent: "split this array into two groups."

## Importance

Partitioning is a fundamental data operation because:

- **Single Pass**: More efficient than multiple filter operations
- **Clear Intent**: Code clearly shows the two groups being created
- **Functional Style**: Uses reduce, maintaining functional programming patterns
- **Flexibility**: Easy to extend to multiple groups or more complex conditions
- **Performance**: O(n) time complexity with a single iteration
- **Common Pattern**: Frequently needed in data processing and UI logic

## Usefulness & Practical Applications

This pattern is essential in many scenarios:

- **User Management**: Separating active/inactive users, premium/free users
- **Data Filtering**: Splitting data into valid/invalid, processed/unprocessed
- **UI State**: Partitioning items into visible/hidden, selected/unselected
- **Validation**: Separating valid/invalid form fields or data records
- **Status Management**: Grouping items by status (pending/completed, published/draft)
- **Feature Flags**: Splitting users into enabled/disabled groups
- **Data Analysis**: Separating data into categories for analysis
- **API Processing**: Partitioning API responses into success/failure groups

**Challenge:** Partition users into active and inactive groups.`,
    examples: [
      {
        input: `const users = [
  { name: 'John', active: true },
  { name: 'Jane', active: false }
];`,
        output: `{ active: [...], inactive: [...] }`,
        explanation: 'Split array into two groups',
      },
    ],
    starterCode: `function partitionUsers(users) {
  // TODO: Use reduce to partition users into active and inactive
  // Return { active: [...], inactive: [...] }
  
  return { active: [], inactive: [] };
}

const users = [
  { id: 1, name: 'John', active: true },
  { id: 2, name: 'Jane', active: false },
  { id: 3, name: 'Bob', active: true },
  { id: 4, name: 'Alice', active: false }
];

console.log(partitionUsers(users));`,
    solution: `function partitionUsers(users) {
  return users.reduce((acc, user) => {
    if (user.active) {
      acc.active.push(user);
    } else {
      acc.inactive.push(user);
    }
    return acc;
  }, { active: [], inactive: [] });
}`,
    testCases: [
      {
        input: [
          [
            { id: 1, name: 'John', active: true },
            { id: 2, name: 'Jane', active: false },
            { id: 3, name: 'Bob', active: true },
          ],
        ],
        expectedOutput: {
          active: [
            { id: 1, name: 'John', active: true },
            { id: 3, name: 'Bob', active: true },
          ],
          inactive: [{ id: 2, name: 'Jane', active: false }],
        },
      },
    ],
    hints: [
      'Initialize accumulator with both groups: { active: [], inactive: [] }',
      'Push to appropriate group based on condition',
      'More efficient than two separate filter() calls',
    ],
  },
  {
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
  },
  {
    id: 'promise-all-vs-allsettled',
    title: 'Promise.all vs Promise.allSettled',
    difficulty: 'medium',
    category: 'Async/Promises',
    description: `## In-Depth Explanation

\`Promise.all()\` and \`Promise.allSettled()\` both handle multiple promises, but with fundamentally different behaviors:

- **Promise.all()**: Returns a promise that resolves when all promises resolve, or rejects immediately when the first promise rejects (fail-fast behavior). All promises must succeed.
- **Promise.allSettled()**: Returns a promise that always resolves (never rejects) after all promises settle, regardless of individual outcomes. You get results for all promises, both successes and failures.

The choice between them depends on your requirements:
- Use \`Promise.all()\` when you need all operations to succeed (all-or-nothing)
- Use \`Promise.allSettled()\` when you want partial results and can handle individual failures

## Importance

Choosing the right method is crucial for application behavior:

- **Error Handling**: Different error handling strategies (fail-fast vs graceful degradation)
- **User Experience**: \`allSettled\` provides better UX by showing partial results
- **Data Integrity**: \`all\` ensures data consistency (all or nothing)
- **Resilience**: \`allSettled\` makes systems more resilient to partial failures
- **Performance**: \`all\` can be faster (stops early on failure), \`allSettled\` always waits for all
- **Debugging**: Different methods provide different information about failures

## Usefulness & Practical Applications

These methods are used in different scenarios:

**Promise.all()** - When all must succeed:
- **Transaction Processing**: All database operations must succeed
- **Form Submission**: All validations must pass
- **Multi-step Workflows**: All steps must complete successfully
- **Data Synchronization**: All data sources must be synchronized

**Promise.allSettled()** - When partial success is acceptable:
- **Multi-API Calls**: Fetching from multiple APIs where some may be down
- **Batch Operations**: Processing multiple items where individual failures are acceptable
- **Analytics Collection**: Collecting analytics from multiple services
- **Notification Systems**: Sending notifications through multiple channels
- **Data Aggregation**: Collecting data from multiple sources

**Challenge:** Use the right method for different scenarios.`,
    examples: [
      {
        input: `const promises = [fetch('/api/1'), fetch('/api/2'), fetch('/api/3')];`,
        output: `all: fails if any fail, allSettled: always resolves`,
        explanation: 'Choose based on whether you need all or can tolerate failures',
      },
    ],
    starterCode: `async function fetchAllOrFail(urls) {
  // TODO: Use Promise.all - should fail if ANY request fails
  // Return array of responses
  
  return [];
}

async function fetchAllWithFailures(urls) {
  // TODO: Use Promise.allSettled - should return all results even if some fail
  // Return array with { status, value/error }
  
  return [];
}

// Test (commented out to prevent immediate execution)
// const urls = ['/api/1', '/api/2', '/api/3'];
// fetchAllOrFail(urls).then(console.log).catch(console.error);
// fetchAllWithFailures(urls).then(console.log).catch(console.error);`,
    solution: `async function fetchAllOrFail(promises) {
  return Promise.all(promises);
}

async function fetchAllWithFailures(promises) {
  return Promise.allSettled(promises);
}

// Test function
async function testFetchAllOrFail() {
  const promises = [Promise.resolve('success1'), Promise.resolve('success2')];
  const result = await fetchAllOrFail(promises);
  return result;
}`,
    testCases: [
      {
        input: [],
        expectedOutput: ['success1', 'success2'],
        description: 'testFetchAllOrFail',
      },
    ],
    hints: [
      'Promise.all rejects if any promise rejects',
      'Promise.allSettled always resolves with status for each',
      'Use all when you need all; allSettled when some can fail',
    ],
  },
  {
    id: 'async-generators',
    title: 'Async Generators',
    difficulty: 'hard',
    category: 'Async/Promises',
    description: `## In-Depth Explanation

Async generators combine the power of generators (lazy evaluation, pausable execution) with async/await (handling promises). They use \`async function*\` syntax and can \`yield\` promises or values.

The key advantage is that async generators produce values on-demand as they're consumed, allowing you to process data as it arrives rather than waiting for everything to load. This is perfect for pagination, streaming, and processing large datasets.

You consume async generators with \`for await...of\`, which automatically handles the promises and waits for each value. This creates a clean, readable way to process async sequences.

## Importance

Async generators are essential for efficient data processing because:

- **Memory Efficiency**: Process data as it arrives, not all at once
- **Lazy Evaluation**: Only fetch/process what's needed
- **Streaming**: Perfect for streaming data from APIs or files
- **Pagination**: Natural fit for paginated APIs
- **Backpressure**: Consumer controls the pace of production
- **Composability**: Can be chained and transformed like regular generators

## Usefulness & Practical Applications

This pattern is crucial for modern applications:

- **Pagination**: Fetching and processing paginated API responses
- **Streaming**: Processing large files or data streams
- **Real-time Data**: Consuming real-time data feeds (WebSockets, Server-Sent Events)
- **Batch Processing**: Processing large datasets in chunks
- **Infinite Scrolling**: Loading content as user scrolls
- **Data Pipelines**: Building async data processing pipelines
- **API Clients**: Creating efficient API clients that handle pagination
- **File Processing**: Processing large files line-by-line or chunk-by-chunk

**Challenge:** Create an async generator that fetches pages of data.`,
    examples: [
      {
        input: `async function* fetchPages() { ... }`,
        output: `Yields pages one at a time`,
        explanation: 'Process data as it arrives',
      },
    ],
    starterCode: `async function* fetchPages(pageSize = 10) {
  // TODO: Create async generator that yields pages
  // Start at page 0, increment until no more data
  // Yield each page as it's fetched
  // Assume fetchPage(page) returns { data: [...], hasMore: boolean }
  
  let page = 0;
  // Your code here
};
