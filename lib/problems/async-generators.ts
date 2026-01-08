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
  description: `<h2>In-Depth Explanation</h2>

<p>Async generators combine the power of generators (lazy evaluation, pausable execution) with async/await (handling promises). They use <code>async function*</code> syntax and can <code>yield</code> promises or values.</p>

<p>The key advantage is that async generators produce values on-demand as they're consumed, allowing you to process data as it arrives rather than waiting for everything to load. This is perfect for pagination, streaming, and processing large datasets.</p>

<p>You consume async generators with <code>for await...of</code>, which automatically handles the promises and waits for each value. This creates a clean, readable way to process async sequences.</p>

<h2>Importance</h2>

<p>Async generators are essential for efficient data processing because:</p>

<ul>
  <li><strong>Memory Efficiency</strong>: Process data as it arrives, not all at once</li>
  <li><strong>Lazy Evaluation</strong>: Only fetch/process what's needed</li>
  <li><strong>Streaming</strong>: Perfect for streaming data from APIs or files</li>
  <li><strong>Pagination</strong>: Natural fit for paginated APIs</li>
  <li><strong>Backpressure</strong>: Consumer controls the pace of production</li>
  <li><strong>Composability</strong>: Can be chained and transformed like regular generators</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This pattern is crucial for modern applications:</p>

<ul>
  <li><strong>Pagination</strong>: Fetching and processing paginated API responses</li>
  <li><strong>Streaming</strong>: Processing large files or data streams</li>
  <li><strong>Real-time Data</strong>: Consuming real-time data feeds (WebSockets, Server-Sent Events)</li>
  <li><strong>Batch Processing</strong>: Processing large datasets in chunks</li>
  <li><strong>Infinite Scrolling</strong>: Loading content as user scrolls</li>
  <li><strong>Data Pipelines</strong>: Building async data processing pipelines</li>
  <li><strong>API Clients</strong>: Creating efficient API clients that handle pagination</li>
  <li><strong>File Processing</strong>: Processing large files line-by-line or chunk-by-chunk</li>
</ul>

<p><strong>Challenge:</strong> Create an async generator that fetches pages of data.</p>`,
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
  solution: `async function* fetchPages(pageSize = 10) {
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    const result = await fetchPage(page);
    yield result.data;
    hasMore = result.hasMore;
    page++;
  }
}

// Helper function (assume this exists)
async function fetchPage(page, pageSize = 10) {
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
  testCases: [
    {
      input: ['fetchPages generator'],
      expectedOutput: 'yields pages one at a time',
      description: 'Async generator yields data pages as they are fetched',
    },
    {
      input: ['for await...of'],
      expectedOutput: 'iterates over async generator',
      description: 'Consumer uses for await...of to iterate through pages',
    },
    {
      input: ['hasMore check'],
      expectedOutput: 'stops when hasMore is false',
      description: 'Generator stops yielding when hasMore becomes false',
    },
  ],
  hints: [
    'Use async function* to create async generator',
    'yield promises or values',
    'Consume with for await...of',
  ],
};
