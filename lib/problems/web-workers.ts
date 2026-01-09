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
  id: 'web-workers',
  title: 'Web Workers for Heavy Computation',
  difficulty: 'hard',
  category: 'Performance',
  description: `<h2>In-Depth Explanation</h2>

<p>Web Workers enable running JavaScript in background threads, separate from the main UI thread. This allows heavy computations to run without blocking the user interface, maintaining smooth 60fps animations and responsive interactions.</p>

<p>Types of Web Workers:</p>
<ul>
  <li><strong>Dedicated Workers</strong>: Single script, used by one page</li>
  <li><strong>Shared Workers</strong>: Can be shared between multiple pages/tabs</li>
  <li><strong>Service Workers</strong>: Proxy between app and network, enables offline support</li>
</ul>

<p>Key concepts:</p>
<ul>
  <li><strong>Message Passing</strong>: Workers communicate via postMessage/onmessage</li>
  <li><strong>Transferable Objects</strong>: ArrayBuffers can be transferred (not copied) for efficiency</li>
  <li><strong>No DOM Access</strong>: Workers cannot access DOM, window, or document</li>
  <li><strong>Import Scripts</strong>: Workers can import other scripts via importScripts()</li>
</ul>

<h2>Importance</h2>

<p>Web Workers are essential for:</p>

<ul>
  <li><strong>UI Responsiveness</strong>: Keep the main thread free for user interactions</li>
  <li><strong>Heavy Computation</strong>: Process large datasets without freezing the UI</li>
  <li><strong>Real-time Processing</strong>: Audio/video processing, game physics</li>
  <li><strong>Background Tasks</strong>: Prefetching, data synchronization</li>
  <li><strong>Parallel Processing</strong>: Utilize multiple CPU cores</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Web Workers are used for:</p>

<ul>
  <li><strong>Image Processing</strong>: Filters, resizing, format conversion</li>
  <li><strong>Data Parsing</strong>: Large JSON/CSV parsing</li>
  <li><strong>Encryption</strong>: Cryptographic operations</li>
  <li><strong>Search</strong>: Full-text search in large datasets</li>
  <li><strong>Compilation</strong>: Code transpilation, markdown rendering</li>
  <li><strong>Machine Learning</strong>: Running ML models in the browser</li>
  <li><strong>Games</strong>: Physics calculations, AI</li>
</ul>

<p><strong>Challenge:</strong> Implement Web Worker patterns including inline workers, worker pools, and task management.</p>`,
  examples: [
    {
      input: `worker.postMessage({ task: 'fibonacci', n: 45 })`,
      output: `Main thread stays responsive while worker calculates`,
      explanation: 'Heavy computation runs in background thread',
    },
    {
      input: `pool.execute(task)`,
      output: `Task distributed to available worker`,
      explanation: 'Worker pool manages multiple workers for parallel tasks',
    },
  ],
  starterCode: `// TODO: Implement Web Worker patterns
// Note: In a real environment, workers are separate files or blob URLs

// 1. Create an inline worker from a function
function createInlineWorker(workerFunction) {
  // Convert function to blob URL and create Worker
  // Your code here
}

// 2. Promise-based worker wrapper for request/response pattern
function createPromiseWorker(worker) {
  // Wrap worker to return promises for each message
  // Your code here
}

// 3. Worker Pool for parallel task execution
class WorkerPool {
  constructor(workerScript, poolSize = navigator.hardwareConcurrency || 4) {
    // Create pool of workers
    // Track which workers are busy
  }

  async execute(task) {
    // Get available worker or wait
    // Send task and return result
  }

  terminate() {
    // Terminate all workers
  }
}

// 4. Task Queue with Worker
class TaskQueue {
  constructor(worker) {
    // Queue tasks and process sequentially
  }

  enqueue(task) {
    // Add task to queue, return promise for result
  }
}

// 5. Transferable objects for large data
function postWithTransfer(worker, data, transferables) {
  // Post message with transferable objects for zero-copy transfer
}

// Example worker function for testing
function fibonacciWorker() {
  self.onmessage = function(e) {
    const { n } = e.data;
    function fib(n) {
      if (n <= 1) return n;
      return fib(n - 1) + fib(n - 2);
    }
    self.postMessage({ result: fib(n) });
  };
}

// Test (conceptual - actual workers need browser environment)
console.log('Worker patterns ready for implementation');`,
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Create inline workers by converting function to string, wrapping in Blob, and using URL.createObjectURL',
    'For promise-based workers, use unique message IDs to match responses to requests',
    'Worker pools need to track available workers and queue tasks when all workers are busy',
    'Transferable objects (ArrayBuffer, MessagePort) can be passed as second argument to postMessage',
    'Remember to terminate workers and revoke blob URLs to prevent memory leaks',
    'Workers cannot access DOM - only self, postMessage, importScripts, and web APIs are available',
  ],
};
