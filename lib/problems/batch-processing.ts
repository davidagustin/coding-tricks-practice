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
  solution: `// Split array into chunks of specified size
function chunk(array, size) {
  // Split array into chunks of size
  // chunk([1, 2, 3, 4, 5], 2) → [[1, 2], [3, 4], [5]]
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// Process array in batches sequentially
async function processBatches(items, batchSize, processor) {
  // Process items in batches, waiting for each batch to complete
  // processor is async function that takes a batch and returns processed batch
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const processed = await processor(batch);
    results.push(...processed);
  }
  return results;
}

// Create a batcher that auto-flushes
function createBatcher(maxSize, maxWait, processor) {
  // Returns: { add(item), flush() }
  // Auto-flush when maxSize reached or maxWait elapsed
  let items = [];
  let timeoutId = null;
  
  const flush = async () => {
    if (items.length === 0) return;
    const batch = [...items];
    items = [];
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    await processor(batch);
  };
  
  return {
    add: (item) => {
      items.push(item);
      if (items.length >= maxSize) {
        flush();
      } else if (!timeoutId) {
        timeoutId = setTimeout(flush, maxWait);
      }
    },
    flush
  };
}

// Batch function calls and deduplicate
function batchCalls(fn, delay) {
  // Collect calls during delay period
  // Execute fn once with all collected arguments
  let pendingArgs = [];
  let timeoutId = null;
  
  return function(...args) {
    pendingArgs.push(args);
    
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        fn(pendingArgs);
        pendingArgs = [];
        timeoutId = null;
      }, delay);
    }
  };
}

// Process large array without blocking UI (using requestAnimationFrame/setTimeout)
async function processWithYield(items, processor, chunkSize = 100) {
  // Process in chunks, yielding to event loop between chunks
  const results = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    results.push(...processor(chunk));
    await new Promise(resolve => setTimeout(resolve, 0));
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
    'For chunk(), use a loop with slice(i, i + size) to extract each chunk',
    'processBatches should use for...of with await to process sequentially, or Promise.all for parallel',
    'createBatcher needs to track pending items and use setTimeout for time-based flushing',
    'Clear the timer when manually flushing to prevent double-processing',
    'processWithYield uses setTimeout(resolve, 0) or requestAnimationFrame to yield to the event loop',
  ],
};
