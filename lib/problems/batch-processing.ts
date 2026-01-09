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
  id: 'batch-processing',
  title: 'Batching Operations for Performance',
  difficulty: 'medium',
  category: 'Performance',
  description: `<h2>In-Depth Explanation</h2>

<p>Batch processing groups multiple operations together and executes them as a single unit. Instead of processing items one at a time, batching collects items and processes them in groups, reducing overhead and improving throughput.</p>

<p>Key batching strategies:</p>
<ul>
  <li><strong>Size-Based Batching</strong>: Process when batch reaches a certain size</li>
  <li><strong>Time-Based Batching</strong>: Process after a time interval (debouncing)</li>
  <li><strong>Hybrid Batching</strong>: Combine size and time triggers</li>
  <li><strong>Chunking</strong>: Split large arrays into smaller chunks for processing</li>
</ul>

<h2>Importance</h2>

<p>Batching is essential for performance because:</p>

<ul>
  <li><strong>Reduced Overhead</strong>: Fewer function calls, network requests, or database operations</li>
  <li><strong>Better Throughput</strong>: More efficient use of resources</li>
  <li><strong>Rate Limiting</strong>: Stay within API rate limits by grouping requests</li>
  <li><strong>UI Responsiveness</strong>: Batch DOM updates to reduce reflows/repaints</li>
  <li><strong>Database Efficiency</strong>: Bulk inserts are faster than individual inserts</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Batch processing is used in:</p>

<ul>
  <li><strong>Database Operations</strong>: Bulk inserts, updates, and deletes</li>
  <li><strong>API Requests</strong>: Batching multiple API calls into one</li>
  <li><strong>Event Logging</strong>: Collecting events and sending in batches</li>
  <li><strong>DOM Updates</strong>: React's batching of state updates</li>
  <li><strong>File Processing</strong>: Processing files in chunks to avoid memory issues</li>
  <li><strong>Data Import/Export</strong>: ETL pipelines process data in batches</li>
</ul>

<p><strong>Challenge:</strong> Implement various batch processing patterns including chunking, batch queues, and auto-flushing batchers.</p>`,
  examples: [
    {
      input: `chunk([1,2,3,4,5,6,7], 3)`,
      output: `[[1,2,3], [4,5,6], [7]]`,
      explanation: 'Splits array into chunks of size 3',
    },
    {
      input: `batcher.add(item); // called 100 times`,
      output: `Processes 10 batches of 10 items each`,
      explanation: 'Auto-batches when size threshold reached',
    },
  ],
  starterCode: `// TODO: Implement batch processing patterns

// 1. Chunk array into smaller arrays of specified size
function chunk(array, size) {
  // Split array into chunks of 'size'
  // Your code here
}

// 2. Process items in batches with async operation
async function processBatches(items, batchSize, processor) {
  // Process items in batches, calling processor for each batch
  // Return all results combined
  // Your code here
}

// 3. Create a batcher that auto-flushes based on size or time
function createBatcher(options) {
  // options: { maxSize, maxWait, processor }
  // Returns: { add(item), flush() }
  // Auto-flush when maxSize reached or maxWait elapsed
  // Your code here
}

// 4. Batch function calls and deduplicate
function batchCalls(fn, delay) {
  // Collect calls during delay period
  // Execute fn once with all collected arguments
  // Your code here
}

// 5. Process large array without blocking UI (using requestAnimationFrame/setTimeout)
async function processWithYield(items, processor, chunkSize = 100) {
  // Process in chunks, yielding to event loop between chunks
  // Your code here
}

// Test
console.log(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3));

const items = Array.from({ length: 100 }, (_, i) => i);
processBatches(items, 10, batch => {
  console.log('Processing batch:', batch.length);
  return batch.map(x => x * 2);
}).then(console.log);`,
  solution: `// 1. Chunk array into smaller arrays of specified size
function chunk(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

// 2. Process items in batches with async operation
async function processBatches(items, batchSize, processor) {
  const batches = chunk(items, batchSize);
  const results = [];

  for (const batch of batches) {
    const batchResult = await processor(batch);
    results.push(...batchResult);
  }

  return results;
}

// 3. Create a batcher that auto-flushes based on size or time
function createBatcher(options) {
  const { maxSize = 10, maxWait = 1000, processor } = options;
  let pending = [];
  let timer = null;

  const flush = async () => {
    if (pending.length === 0) return;

    const toProcess = pending;
    pending = [];

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    await processor(toProcess);
  };

  const scheduleFlush = () => {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      flush();
    }, maxWait);
  };

  return {
    add(item) {
      pending.push(item);

      if (pending.length >= maxSize) {
        flush();
      } else {
        scheduleFlush();
      }
    },

    flush
  };
}

// 4. Batch function calls and deduplicate
function batchCalls(fn, delay) {
  let pending = [];
  let timer = null;

  return function(...args) {
    pending.push(args);

    if (!timer) {
      timer = setTimeout(() => {
        const allArgs = pending;
        pending = [];
        timer = null;
        fn(allArgs);
      }, delay);
    }
  };
}

// 5. Process large array without blocking UI
async function processWithYield(items, processor, chunkSize = 100) {
  const chunks = chunk(items, chunkSize);
  const results = [];

  for (const batch of chunks) {
    for (const item of batch) {
      results.push(processor(item));
    }
    // Yield to event loop
    await new Promise(resolve => setTimeout(resolve, 0));
  }

  return results;
}

// Test
console.log(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3));

const items = Array.from({ length: 100 }, (_, i) => i);
processBatches(items, 10, batch => {
  console.log('Processing batch:', batch.length);
  return batch.map(x => x * 2);
}).then(console.log);`,
  testCases: [
    {
      input: { fn: 'chunk', args: [[1, 2, 3, 4, 5, 6, 7], 3] },
      expectedOutput: [[1, 2, 3], [4, 5, 6], [7]],
      description: 'chunk splits array into chunks of specified size',
    },
    {
      input: { fn: 'chunk', args: [[1, 2, 3, 4, 5, 6], 2] },
      expectedOutput: [[1, 2], [3, 4], [5, 6]],
      description: 'chunk handles arrays divisible by size',
    },
    {
      input: { fn: 'chunk', args: [[], 3] },
      expectedOutput: [],
      description: 'chunk returns empty array for empty input',
    },
    {
      input: { fn: 'processBatches', args: [[1, 2, 3, 4], 2, 'batch => batch.map(x => x * 2)'] },
      expectedOutput: [2, 4, 6, 8],
      description: 'processBatches processes items in batches and returns combined results',
    },
  ],
  hints: [
    'For chunk(), use a loop with slice(i, i + size) to extract each chunk',
    'processBatches should use for...of with await to process sequentially, or Promise.all for parallel',
    'createBatcher needs to track pending items and use setTimeout for time-based flushing',
    'Clear the timer when manually flushing to prevent double-processing',
    'processWithYield uses setTimeout(resolve, 0) or requestAnimationFrame to yield to the event loop',
  ],
};
