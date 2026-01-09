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
  id: 'async-iteration',
  title: 'Async Iteration with for-await-of',
  difficulty: 'medium',
  category: 'Async/Promises',
  description: `<h2>In-Depth Explanation</h2>

<p>The <code>for-await-of</code> loop is a specialized iteration construct designed for asynchronous iterables. It allows you to iterate over data that arrives asynchronously, such as streams, paginated API responses, or async generators, in a clean and sequential manner.</p>

<p>Key concepts of async iteration:</p>
<ul>
  <li><strong>Async Iterables</strong>: Objects with a <code>[Symbol.asyncIterator]</code> method that returns an async iterator</li>
  <li><strong>Async Iterators</strong>: Objects with a <code>next()</code> method that returns a Promise resolving to <code>{ value, done }</code></li>
  <li><strong>for-await-of</strong>: Automatically awaits each value from the async iterable</li>
  <li><strong>Sequential Processing</strong>: Each iteration waits for the previous to complete</li>
  <li><strong>Error Handling</strong>: Errors propagate and can be caught with try/catch</li>
</ul>

<p>This pattern differs from <code>Promise.all()</code> in that it processes items one at a time as they become available, rather than waiting for all promises to resolve. This is crucial for handling streams of data or when you need to process items in order.</p>

<h2>Importance</h2>

<p>Async iteration is fundamental for modern JavaScript applications:</p>

<ul>
  <li><strong>Stream Processing</strong>: Handle data streams without loading everything into memory</li>
  <li><strong>Pagination</strong>: Iterate through paginated API results seamlessly</li>
  <li><strong>Real-time Data</strong>: Process real-time events as they arrive</li>
  <li><strong>File Processing</strong>: Read large files line by line</li>
  <li><strong>Memory Efficiency</strong>: Process large datasets without memory overflow</li>
  <li><strong>Backpressure Handling</strong>: Control the rate of data consumption</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Async iteration is essential in these scenarios:</p>

<ul>
  <li><strong>API Pagination</strong>: Fetch and process paginated data from REST APIs</li>
  <li><strong>Database Cursors</strong>: Iterate through database query results</li>
  <li><strong>File Streams</strong>: Process large files without loading entirely into memory</li>
  <li><strong>WebSocket Messages</strong>: Handle incoming WebSocket messages sequentially</li>
  <li><strong>Event Streams</strong>: Process server-sent events (SSE)</li>
  <li><strong>Video/Audio Processing</strong>: Handle media chunks as they arrive</li>
  <li><strong>Log Processing</strong>: Tail and process log files in real-time</li>
  <li><strong>Data Migration</strong>: Process records in batches during migrations</li>
</ul>

<p><strong>Challenge:</strong> Implement async iterables and use for-await-of to process asynchronous data streams efficiently.</p>`,
  examples: [
    {
      input: `async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

for await (const num of asyncGenerator()) {
  console.log(num);
}`,
      output: `1
2
3`,
      explanation: 'for-await-of iterates through async generator values sequentially',
    },
    {
      input: `const asyncIterable = {
  [Symbol.asyncIterator]() {
    let i = 0;
    return {
      next() {
        if (i < 3) {
          return Promise.resolve({ value: i++, done: false });
        }
        return Promise.resolve({ done: true });
      }
    };
  }
};`,
      output: `0, 1, 2`,
      explanation: 'Custom async iterable implementing Symbol.asyncIterator',
    },
    {
      input: `// Iterating over array of promises
const promises = [
  Promise.resolve('a'),
  Promise.resolve('b'),
  Promise.resolve('c')
];

for await (const value of promises) {
  console.log(value);
}`,
      output: `'a', 'b', 'c'`,
      explanation: 'for-await-of can iterate over arrays of promises',
    },
  ],
  starterCode: `// Create an async iterable that yields values with delays
function createAsyncIterable(values, delayMs) {
  // TODO: Return an object with [Symbol.asyncIterator]
  // Each next() should return a promise that resolves after delayMs
  // with the next value from the values array

  return {
    [Symbol.asyncIterator]() {
      return {
        next() {
          return Promise.resolve({ done: true });
        }
      };
    }
  };
}

// Process paginated API data
async function processPaginatedData(fetchPage) {
  // TODO: fetchPage(pageNum) returns { data: [], hasMore: boolean }
  // Use async iteration to process all pages
  // Return array of all items from all pages

  return [];
}

// Create an async generator that fetches data in batches
async function* batchFetcher(ids, batchSize, fetchBatch) {
  // TODO: Split ids into batches of batchSize
  // For each batch, call fetchBatch(batchIds)
  // Yield each result individually

}

// Collect all values from an async iterable
async function collectAsyncIterable(asyncIterable) {
  // TODO: Use for-await-of to collect all values into an array

  return [];
}

// Test (commented out)
// const iterable = createAsyncIterable([1, 2, 3], 100);
// for await (const value of iterable) console.log(value);`,
  solution: `// Create an async iterable that yields values with delays
function createAsyncIterable(values, delayMs) {
  // Return an object with [Symbol.asyncIterator]
  // Each next() should return a promise that resolves after delayMs
  // with the next value from the values array
  let index = 0;
  return {
    [Symbol.asyncIterator]() {
      return {
        async next() {
          if (index >= values.length) {
            return { done: true };
          }
          const value = values[index++];
          await new Promise(resolve => setTimeout(resolve, delayMs));
          return { value, done: false };
        }
      };
    }
  };
}

// Process paginated API data
async function processPaginatedData(fetchPage) {
  // fetchPage(pageNum) returns { data: [], hasMore: boolean }
  // Use async iteration to process all pages
  // Return array of all items from all pages
  const allItems = [];
  let page = 0;
  let hasMore = true;
  
  while (hasMore) {
    const result = await fetchPage(page);
    allItems.push(...result.data);
    hasMore = result.hasMore;
    page++;
  }
  
  return allItems;
}

// Create an async generator that fetches data in batches
async function* batchFetcher(ids, batchSize, fetchBatch) {
  // Split ids into batches of batchSize
  // For each batch, call fetchBatch(batchIds)
  // Yield each result individually
  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    const results = await fetchBatch(batch);
    for (const result of results) {
      yield result;
    }
  }
}

// Collect all values from an async iterable
async function collectAsyncIterable(asyncIterable) {
  // Use for-await-of to collect all values into an array
  const results = [];
  for await (const value of asyncIterable) {
    results.push(value);
  }
  return results;
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Async iterables must have a [Symbol.asyncIterator] method that returns an async iterator',
    "The async iterator's next() method must return a Promise that resolves to { value, done }",
    'Use async function* to create async generators that can yield promises',
    'for-await-of automatically awaits each value, so you can iterate over arrays of promises too',
    'Remember to handle the done: true case to signal end of iteration',
  ],
};
