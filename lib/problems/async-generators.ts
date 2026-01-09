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
  solution: `// Helper function (simulates API call)
async function fetchPage(page, pageSize = 10) {
  // Simulated API call with delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return {
    data: Array.from({ length: pageSize }, (_, i) => page * pageSize + i),
    hasMore: page < 2
  };
}

async function* fetchPages(pageSize = 10) {
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    const result = await fetchPage(page, pageSize);
    yield result.data;
    hasMore = result.hasMore;
    page++;
  }
}

// Additional async generator: Fetch items one by one across all pages
async function* fetchAllItems(pageSize = 10) {
  for await (const pageData of fetchPages(pageSize)) {
    for (const item of pageData) {
      yield item;
    }
  }
}

// Async generator with filtering
async function* fetchFilteredItems(pageSize = 10, filterFn) {
  for await (const item of fetchAllItems(pageSize)) {
    if (filterFn(item)) {
      yield item;
    }
  }
}

// Test
(async () => {
  console.log('Fetching pages:');
  for await (const page of fetchPages()) {
    console.log('Page:', page);
  }

  console.log('\\nFetching all items:');
  const items = [];
  for await (const item of fetchAllItems(5)) {
    items.push(item);
  }
  console.log('All items:', items);

  console.log('\\nFetching even items only:');
  for await (const item of fetchFilteredItems(5, n => n % 2 === 0)) {
    console.log('Even item:', item);
  }
})();`,
  testCases: [
    {
      input: [10],
      expectedOutput: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]],
      description: 'fetchPages yields arrays of page data',
    },
    {
      input: [5],
      expectedOutput: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      description: 'fetchAllItems yields all items across pages',
    },
    {
      input: ['async generator basics'],
      expectedOutput: true,
      description: 'Async generators use async function* syntax and yield values',
    },
  ],
  hints: [
    'Use async function* to create async generator',
    'yield promises or values',
    'Consume with for await...of',
  ],
};
