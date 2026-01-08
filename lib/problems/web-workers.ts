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
  solution: `// 1. Create an inline worker from a function
function createInlineWorker(workerFunction) {
  const blob = new Blob(
    [\`(\${workerFunction.toString()})()\`],
    { type: 'application/javascript' }
  );
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);

  // Store URL for cleanup
  worker._blobUrl = url;

  // Override terminate to also revoke blob URL
  const originalTerminate = worker.terminate.bind(worker);
  worker.terminate = () => {
    URL.revokeObjectURL(worker._blobUrl);
    originalTerminate();
  };

  return worker;
}

// 2. Promise-based worker wrapper
function createPromiseWorker(worker) {
  let messageId = 0;
  const pending = new Map();

  worker.onmessage = (e) => {
    const { id, result, error } = e.data;
    const { resolve, reject } = pending.get(id) || {};

    if (resolve) {
      pending.delete(id);
      if (error) {
        reject(new Error(error));
      } else {
        resolve(result);
      }
    }
  };

  worker.onerror = (e) => {
    // Reject all pending promises on worker error
    for (const [id, { reject }] of pending) {
      reject(new Error(e.message));
      pending.delete(id);
    }
  };

  return {
    postMessage(data) {
      return new Promise((resolve, reject) => {
        const id = messageId++;
        pending.set(id, { resolve, reject });
        worker.postMessage({ id, ...data });
      });
    },
    terminate() {
      worker.terminate();
    }
  };
}

// 3. Worker Pool for parallel task execution
class WorkerPool {
  constructor(createWorker, poolSize = navigator.hardwareConcurrency || 4) {
    this.workers = [];
    this.available = [];
    this.waiting = [];

    for (let i = 0; i < poolSize; i++) {
      const worker = typeof createWorker === 'function'
        ? createWorker()
        : new Worker(createWorker);
      this.workers.push(worker);
      this.available.push(worker);
    }
  }

  async execute(task) {
    const worker = await this.getWorker();

    return new Promise((resolve, reject) => {
      const handler = (e) => {
        worker.removeEventListener('message', handler);
        worker.removeEventListener('error', errorHandler);
        this.releaseWorker(worker);
        resolve(e.data);
      };

      const errorHandler = (e) => {
        worker.removeEventListener('message', handler);
        worker.removeEventListener('error', errorHandler);
        this.releaseWorker(worker);
        reject(new Error(e.message));
      };

      worker.addEventListener('message', handler);
      worker.addEventListener('error', errorHandler);
      worker.postMessage(task);
    });
  }

  getWorker() {
    return new Promise((resolve) => {
      if (this.available.length > 0) {
        resolve(this.available.pop());
      } else {
        this.waiting.push(resolve);
      }
    });
  }

  releaseWorker(worker) {
    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift();
      resolve(worker);
    } else {
      this.available.push(worker);
    }
  }

  terminate() {
    for (const worker of this.workers) {
      worker.terminate();
    }
    this.workers = [];
    this.available = [];
  }

  get size() {
    return this.workers.length;
  }

  get activeCount() {
    return this.workers.length - this.available.length;
  }
}

// 4. Task Queue with Worker
class TaskQueue {
  constructor(worker) {
    this.worker = worker;
    this.queue = [];
    this.processing = false;
    this.currentResolve = null;

    this.worker.onmessage = (e) => {
      if (this.currentResolve) {
        this.currentResolve(e.data);
        this.currentResolve = null;
      }
      this.processNext();
    };
  }

  enqueue(task) {
    return new Promise((resolve) => {
      this.queue.push({ task, resolve });
      if (!this.processing) {
        this.processNext();
      }
    });
  }

  processNext() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const { task, resolve } = this.queue.shift();
    this.currentResolve = resolve;
    this.worker.postMessage(task);
  }
}

// 5. Transferable objects for large data
function postWithTransfer(worker, data, transferables = []) {
  // ArrayBuffer, MessagePort, ImageBitmap, OffscreenCanvas are transferable
  worker.postMessage(data, transferables);
}

// Example: Processing large array buffer with zero-copy transfer
function processLargeData(worker, arrayBuffer) {
  return new Promise((resolve) => {
    worker.onmessage = (e) => resolve(e.data);
    // Transfer ownership - original arrayBuffer becomes detached
    worker.postMessage({ buffer: arrayBuffer }, [arrayBuffer]);
  });
}

// Helper to create worker from inline function
function workerFromFunction(fn) {
  return createInlineWorker(fn);
}`,
  testCases: [
    {
      input: { workerFn: 'fibonacci', n: 10 },
      expectedOutput: { result: 55 },
      description: 'createInlineWorker creates worker from function, computes fib(10) = 55',
    },
    {
      input: { tasks: [{ n: 5 }, { n: 6 }, { n: 7 }], poolSize: 2 },
      expectedOutput: [{ result: 5 }, { result: 8 }, { result: 13 }],
      description: 'WorkerPool executes 3 fibonacci tasks with 2 workers in parallel',
    },
    {
      input: { tasks: [1, 2, 3, 4, 5], sequential: true },
      expectedOutput: { order: [1, 2, 3, 4, 5], resultsInOrder: true },
      description: 'TaskQueue processes tasks sequentially, maintaining order',
    },
    {
      input: { bufferSize: 1024, transfer: true },
      expectedOutput: { transferred: true, originalDetached: true },
      description: 'postWithTransfer transfers ArrayBuffer ownership (zero-copy)',
    },
    {
      input: { poolSize: 4, tasks: 8, taskDuration: 100 },
      expectedOutput: { totalTime: 'approximately 200ms', parallelism: true },
      description: 'WorkerPool with 4 workers completes 8 tasks in ~2 rounds (200ms vs 800ms sequential)',
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
