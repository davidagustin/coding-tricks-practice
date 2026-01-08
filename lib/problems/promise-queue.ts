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
  id: 'promise-queue',
  title: 'Promise Queue with Concurrency Limit',
  difficulty: 'hard',
  category: 'Async/Promises',
  description: `<h2>In-Depth Explanation</h2>

<p>A <strong>Promise Queue</strong> with concurrency control is a pattern that manages the execution of multiple asynchronous tasks while limiting how many can run simultaneously. This is essential when you need to process many tasks but must respect rate limits, resource constraints, or prevent system overload.</p>

<p>Key concepts of promise queues:</p>
<ul>
  <li><strong>Concurrency Limit</strong>: Maximum number of promises executing at any time</li>
  <li><strong>Task Queue</strong>: A queue of pending tasks waiting to be executed</li>
  <li><strong>Active Count</strong>: Tracking how many tasks are currently running</li>
  <li><strong>Auto-dequeue</strong>: Automatically starting the next task when one completes</li>
  <li><strong>Result Collection</strong>: Gathering results while maintaining order or completion order</li>
</ul>

<p>Unlike <code>Promise.all()</code> which runs all promises concurrently, a promise queue ensures you never exceed your concurrency limit. This is the pattern used by popular libraries like <code>p-limit</code>, <code>p-queue</code>, and <code>async.queue</code>.</p>

<h2>Importance</h2>

<p>Promise queues are critical for production applications:</p>

<ul>
  <li><strong>Rate Limiting</strong>: Respect API rate limits by controlling request frequency</li>
  <li><strong>Resource Management</strong>: Prevent exhausting database connections or file handles</li>
  <li><strong>Memory Control</strong>: Avoid loading too much data into memory at once</li>
  <li><strong>System Stability</strong>: Prevent overwhelming downstream services</li>
  <li><strong>User Experience</strong>: Keep applications responsive under heavy load</li>
  <li><strong>Cost Control</strong>: Avoid triggering expensive rate limit overage charges</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This pattern is essential in many scenarios:</p>

<ul>
  <li><strong>API Batch Requests</strong>: Send requests to rate-limited APIs without getting blocked</li>
  <li><strong>File Processing</strong>: Process thousands of files without running out of file handles</li>
  <li><strong>Image Processing</strong>: Limit concurrent image operations to prevent memory exhaustion</li>
  <li><strong>Database Operations</strong>: Control the number of concurrent database queries</li>
  <li><strong>Web Scraping</strong>: Scrape websites respectfully with controlled concurrency</li>
  <li><strong>Email Sending</strong>: Send bulk emails while respecting SMTP limits</li>
  <li><strong>Download Managers</strong>: Limit simultaneous downloads to preserve bandwidth</li>
  <li><strong>Test Runners</strong>: Control parallel test execution</li>
</ul>

<p><strong>Challenge:</strong> Implement a promise queue class that limits concurrent execution and provides methods to add tasks, wait for completion, and handle errors.</p>`,
  examples: [
    {
      input: `const queue = new PromiseQueue(2); // concurrency: 2

queue.add(() => fetch('/api/1'));
queue.add(() => fetch('/api/2'));
queue.add(() => fetch('/api/3')); // waits until one completes
queue.add(() => fetch('/api/4'));

await queue.onIdle();`,
      output: `All requests complete, max 2 running at once`,
      explanation: 'Queue ensures only 2 requests execute concurrently',
    },
    {
      input: `const queue = new PromiseQueue(3);
const results = await queue.addAll([
  () => Promise.resolve(1),
  () => Promise.resolve(2),
  () => Promise.resolve(3),
  () => Promise.resolve(4),
]);`,
      output: `[1, 2, 3, 4]`,
      explanation: 'addAll returns results in original order',
    },
    {
      input: `// Rate-limited API calls
const queue = new PromiseQueue(5);
const userIds = [1, 2, 3, ..., 100];

const users = await Promise.all(
  userIds.map(id =>
    queue.add(() => fetchUser(id))
  )
);`,
      output: `100 users fetched, 5 at a time`,
      explanation: 'Process 100 items with max 5 concurrent requests',
    },
  ],
  starterCode: `class PromiseQueue {
  constructor(concurrency = 1) {
    // TODO: Initialize the queue
    // - Store the concurrency limit
    // - Initialize queue array for pending tasks
    // - Track number of currently running tasks
    this.concurrency = concurrency;
    this.queue = [];
    this.running = 0;
  }

  add(taskFn) {
    // TODO: Add a task to the queue
    // - Return a promise that resolves when the task completes
    // - If under concurrency limit, run immediately
    // - Otherwise, queue it for later execution

    return Promise.resolve();
  }

  addAll(taskFns) {
    // TODO: Add multiple tasks and return promise of all results
    // - Results should be in the same order as input

    return Promise.all([]);
  }

  async onIdle() {
    // TODO: Return a promise that resolves when queue is empty
    // and no tasks are running

    return Promise.resolve();
  }

  get size() {
    // TODO: Return number of pending tasks
    return 0;
  }

  get pending() {
    // TODO: Return number of currently running tasks
    return 0;
  }

  clear() {
    // TODO: Clear all pending tasks (don't affect running ones)
  }

  // Private method to process queue
  _processQueue() {
    // TODO: Start tasks up to concurrency limit
  }
}

// Test (commented out)
// const queue = new PromiseQueue(2);
// queue.add(() => new Promise(r => setTimeout(() => r(1), 100)));
// queue.add(() => new Promise(r => setTimeout(() => r(2), 100)));
// queue.add(() => new Promise(r => setTimeout(() => r(3), 100)));
// queue.onIdle().then(() => console.log('All done'));`,
  solution: `class PromiseQueue {
  constructor(concurrency = 1) {
    this.concurrency = concurrency;
    this.queue = [];
    this.running = 0;
    this._idleResolvers = [];
  }

  add(taskFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ taskFn, resolve, reject });
      this._processQueue();
    });
  }

  addAll(taskFns) {
    return Promise.all(taskFns.map(taskFn => this.add(taskFn)));
  }

  async onIdle() {
    if (this.running === 0 && this.queue.length === 0) {
      return Promise.resolve();
    }

    return new Promise(resolve => {
      this._idleResolvers.push(resolve);
    });
  }

  get size() {
    return this.queue.length;
  }

  get pending() {
    return this.running;
  }

  clear() {
    this.queue = [];
  }

  _processQueue() {
    while (this.running < this.concurrency && this.queue.length > 0) {
      const { taskFn, resolve, reject } = this.queue.shift();
      this.running++;

      Promise.resolve()
        .then(() => taskFn())
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.running--;
          this._processQueue();
          this._checkIdle();
        });
    }
  }

  _checkIdle() {
    if (this.running === 0 && this.queue.length === 0) {
      this._idleResolvers.forEach(resolve => resolve());
      this._idleResolvers = [];
    }
  }
}

// Test
const queue = new PromiseQueue(2);

const delay = (ms, value) => new Promise(r => setTimeout(() => r(value), ms));

queue.add(() => delay(100, 1)).then(v => console.log('Task 1:', v));
queue.add(() => delay(100, 2)).then(v => console.log('Task 2:', v));
queue.add(() => delay(100, 3)).then(v => console.log('Task 3:', v));
queue.add(() => delay(100, 4)).then(v => console.log('Task 4:', v));

console.log('Queue size:', queue.size); // 2 (tasks 3 and 4 are queued)
console.log('Running:', queue.pending); // 2 (tasks 1 and 2 are running)

queue.onIdle().then(() => console.log('All done!'));`,
  testCases: [
    {
      input: { concurrency: 2, tasks: [100, 100, 100, 100] },
      expectedOutput: { totalTime: 200, order: [1, 2, 3, 4] },
      description: 'Queue with concurrency 2 runs tasks in parallel pairs',
    },
    {
      input: { concurrency: 1, tasks: [50, 50, 50] },
      expectedOutput: { totalTime: 150, order: [1, 2, 3] },
      description: 'Queue with concurrency 1 runs tasks sequentially',
    },
    {
      input: { fn: 'size', concurrency: 2, queuedTasks: 4 },
      expectedOutput: 2,
      description: 'size returns number of pending tasks in queue',
    },
    {
      input: { fn: 'pending', concurrency: 2, queuedTasks: 4 },
      expectedOutput: 2,
      description: 'pending returns number of currently running tasks',
    },
    {
      input: { fn: 'addAll', concurrency: 3, values: [1, 2, 3, 4, 5] },
      expectedOutput: [1, 2, 3, 4, 5],
      description: 'addAll returns results in original order',
    },
    {
      input: { fn: 'clear', concurrency: 1, tasks: 5 },
      expectedOutput: { clearedSize: 0 },
      description: 'clear removes all pending tasks from queue',
    },
  ],
  hints: [
    'Store pending tasks with their resolve/reject functions to control when they complete',
    'Use a counter to track running tasks and start new ones when one finishes',
    'The add() method should return a promise that resolves when that specific task completes',
    'Use .finally() to decrement the running count and trigger processing of next tasks',
    'For onIdle(), create a promise that you resolve when running hits 0 and queue is empty',
  ],
};
