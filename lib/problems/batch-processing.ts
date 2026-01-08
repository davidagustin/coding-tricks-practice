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
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
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
  const { maxSize, maxWait, processor } = options;
  let batch = [];
  let timer = null;

  const flush = async () => {
    if (batch.length === 0) return;

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    const toProcess = batch;
    batch = [];
    await processor(toProcess);
  };

  const scheduleFlush = () => {
    if (timer) return;
    timer = setTimeout(flush, maxWait);
  };

  return {
    add(item) {
      batch.push(item);

      if (batch.length >= maxSize) {
        flush();
      } else {
        scheduleFlush();
      }
    },
    flush,
    get pending() {
      return batch.length;
    }
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

  for (const ch of chunks) {
    // Yield to event loop
    await new Promise(resolve => setTimeout(resolve, 0));

    for (const item of ch) {
      results.push(processor(item));
    }
  }

  return results;
}

// Parallel batch processing for independent operations
async function processParallelBatches(items, batchSize, processor, concurrency = 3) {
  const batches = chunk(items, batchSize);
  const results = [];

  for (let i = 0; i < batches.length; i += concurrency) {
    const concurrentBatches = batches.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      concurrentBatches.map(batch => processor(batch))
    );
    results.push(...batchResults.flat());
  }

  return results;
}`,
  testCases: [
    {
      input: { array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], size: 3 },
      expectedOutput: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]],
      description: 'chunk([1-10], 3) splits into chunks of 3 with remainder in last chunk',
    },
    {
      input: { array: [1, 2, 3, 4, 5, 6], size: 2 },
      expectedOutput: [[1, 2], [3, 4], [5, 6]],
      description: 'chunk([1-6], 2) splits evenly into 3 chunks of 2',
    },
    {
      input: { items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], batchSize: 5, operation: 'double' },
      expectedOutput: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      description: 'processBatches with doubling operation processes all items in 2 batches',
    },
    {
      input: { maxSize: 3, items: ['a', 'b', 'c', 'd', 'e'] },
      expectedOutput: { batchesProcessed: 2, firstBatch: ['a', 'b', 'c'], secondBatch: ['d', 'e'] },
      description: 'createBatcher auto-flushes at maxSize=3, then flushes remaining on demand',
    },
    {
      input: { items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], chunkSize: 3, operation: 'square' },
      expectedOutput: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100],
      description: 'processWithYield squares numbers in chunks of 3, yielding between chunks',
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
