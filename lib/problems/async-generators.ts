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
}

// Helper function (assume this exists)
async function fetchPage(page) {
  // Simulated API call
  return {
    data: Array.from({ length: pageSize }, (_, i) => page * pageSize + i),
    hasMore: page < 2
  };
}

// Test
(async () => {
  for await (const page of fetchPages()) {
    console.log(page);
  }
})();`,
    solution: `async function fetchPage(page) {
  // Simulated API call
  return {
    data: Array.from({ length: 10 }, (_, i) => page * 10 + i),
    hasMore: page < 2
  };
}

async function* fetchPages(pageSize = 10) {
  let page = 0;
  let hasMore = true;
  
  while (hasMore) {
    const result = await fetchPage(page);
    yield result.data;
    hasMore = result.hasMore;
    page++;
  }
}

// Test function
async function testFetchPages() {
  const pages = [];
  for await (const page of fetchPages()) {
    pages.push(page);
    if (pages.length >= 3) break;
  }
  return pages.length > 0;
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'testFetchPages',
      },
    ],
    hints: [
      'Use async function* to create async generator',
      'yield promises or values',
      'Consume with for await...of',
    ],
  };