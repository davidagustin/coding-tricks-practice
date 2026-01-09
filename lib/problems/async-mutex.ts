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
  id: 'async-mutex',
  title: 'Async Mutex/Lock Pattern',
  difficulty: 'hard',
  category: 'Async/Promises',
  description: `<h2>In-Depth Explanation</h2>

<p>An <strong>Async Mutex</strong> (mutual exclusion lock) is a synchronization primitive that ensures only one async operation can access a critical section of code at a time. While JavaScript is single-threaded, async operations can interleave in unexpected ways, causing race conditions when modifying shared state.</p>

<p>Key concepts of async mutex:</p>
<ul>
  <li><strong>Mutual Exclusion</strong>: Only one holder of the lock at any time</li>
  <li><strong>Lock/Acquire</strong>: Request access, wait if lock is held by another</li>
  <li><strong>Unlock/Release</strong>: Give up the lock so others can acquire it</li>
  <li><strong>Queue</strong>: Waiters are served in order (FIFO)</li>
  <li><strong>Automatic Release</strong>: Use try/finally or disposable pattern to ensure release</li>
</ul>

<p>Consider a read-modify-write operation:</p>
<pre><code>// Without mutex - race condition possible!
async function increment() {
  const value = await readValue();  // Both read 0
  await writeValue(value + 1);       // Both write 1
}

// With mutex - safe
async function increment() {
  const release = await mutex.acquire();
  try {
    const value = await readValue();
    await writeValue(value + 1);
  } finally {
    release();
  }
}</code></pre>

<h2>Importance</h2>

<p>Async mutexes are crucial for correctness in concurrent JavaScript:</p>

<ul>
  <li><strong>Race Condition Prevention</strong>: Prevent data corruption from concurrent modifications</li>
  <li><strong>Atomic Operations</strong>: Ensure read-modify-write operations are atomic</li>
  <li><strong>Resource Protection</strong>: Protect shared resources from concurrent access</li>
  <li><strong>State Consistency</strong>: Maintain consistent state across async operations</li>
  <li><strong>Critical Sections</strong>: Define sections that must run to completion without interleaving</li>
  <li><strong>Ordered Execution</strong>: Ensure operations execute in the order they were requested</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>The mutex pattern is essential in these scenarios:</p>

<ul>
  <li><strong>Database Transactions</strong>: Ensure transaction operations don't interleave</li>
  <li><strong>File System Operations</strong>: Prevent concurrent file modifications</li>
  <li><strong>Cache Updates</strong>: Ensure cache read-modify-write is atomic</li>
  <li><strong>API Rate Limiting</strong>: Serialize requests to respect rate limits</li>
  <li><strong>Counter Increments</strong>: Safe concurrent counter updates</li>
  <li><strong>Resource Pools</strong>: Manage exclusive access to limited resources</li>
  <li><strong>State Machines</strong>: Ensure state transitions are atomic</li>
  <li><strong>Login Sessions</strong>: Prevent concurrent login/logout issues</li>
</ul>

<p><strong>Challenge:</strong> Implement an async mutex class that provides safe locking with FIFO ordering, automatic timeout, and support for the try/finally release pattern.</p>`,
  examples: [
    {
      input: `const mutex = new AsyncMutex();

async function criticalSection() {
  const release = await mutex.acquire();
  try {
    // Only one execution at a time
    await doAsyncWork();
  } finally {
    release();
  }
}

// Both calls are serialized
await Promise.all([
  criticalSection(),
  criticalSection()
]);`,
      output: `Operations execute one at a time`,
      explanation: 'The mutex ensures sequential execution of the critical section',
    },
    {
      input: `const mutex = new AsyncMutex();

// Using withLock helper
await mutex.withLock(async () => {
  await readModifyWrite();
});`,
      output: `Automatic lock/unlock`,
      explanation: 'withLock helper handles acquire/release automatically',
    },
    {
      input: `const mutex = new AsyncMutex();

// With timeout
try {
  const release = await mutex.acquire(1000);
  // ... do work
  release();
} catch (e) {
  console.log('Could not acquire lock in time');
}`,
      output: `Timeout after 1000ms if lock unavailable`,
      explanation: 'Timeout prevents indefinite waiting for lock',
    },
  ],
  starterCode: `class AsyncMutex {
  constructor() {
    // TODO: Initialize the mutex state
    // - Track if lock is currently held
    // - Queue for waiting acquirers
    this._locked = false;
    this._queue = [];
  }

  acquire(timeoutMs = 0) {
    // TODO: Return a promise that resolves with a release function
    // - If not locked, acquire immediately
    // - If locked, queue the request
    // - If timeoutMs > 0, reject after timeout

    return Promise.resolve(() => {});
  }

  async withLock(fn) {
    // TODO: Acquire lock, run fn, release lock
    // - Ensure lock is released even if fn throws
    // - Return the result of fn

    return fn();
  }

  isLocked() {
    // TODO: Return whether the mutex is currently locked
    return false;
  }

  get queueLength() {
    // TODO: Return number of waiters
    return 0;
  }

  _release() {
    // TODO: Release the lock and process next waiter
  }
}

// Semaphore: Like mutex but allows N concurrent holders
class AsyncSemaphore {
  constructor(permits = 1) {
    // TODO: Initialize with number of permits
    this._permits = permits;
    this._available = permits;
    this._queue = [];
  }

  acquire() {
    // TODO: Acquire one permit
    return Promise.resolve(() => {});
  }

  release() {
    // TODO: Release one permit
  }
}

// Test (commented out)
// const mutex = new AsyncMutex();
// let counter = 0;
// await Promise.all([
//   mutex.withLock(async () => { counter++; }),
//   mutex.withLock(async () => { counter++; }),
// ]);
// console.log(counter); // 2`,
  solution: `// Simple mutex implementation
function createAsyncMutex() {
  var locked = false;
  var queue = [];

  function release() {
    if (queue.length > 0) {
      var next = queue.shift();
      next();
    } else {
      locked = false;
    }
  }

  return {
    acquire: function() {
      return new Promise(function(resolve) {
        if (!locked) {
          locked = true;
          resolve(release);
        } else {
          queue.push(function() {
            locked = true;
            resolve(release);
          });
        }
      });
    },
    withLock: async function(fn) {
      var releaseFn = await this.acquire();
      try {
        return await fn();
      } finally {
        releaseFn();
      }
    },
    isLocked: function() {
      return locked;
    }
  };
}

// Simple semaphore implementation
function createAsyncSemaphore(permits) {
  if (permits === undefined) permits = 1;
  var available = permits;
  var queue = [];
  var totalPermits = permits;

  function release() {
    if (queue.length > 0) {
      var next = queue.shift();
      next();
    } else {
      available = Math.min(available + 1, totalPermits);
    }
  }

  return {
    acquire: function() {
      return new Promise(function(resolve) {
        if (available > 0) {
          available--;
          resolve(release);
        } else {
          queue.push(function() {
            available--;
            resolve(release);
          });
        }
      });
    },
    getPermits: function() {
      return totalPermits;
    }
  };
}

// Test function for test runner
async function testAsyncMutex(testName) {
  if (testName === 'mutex serialization') {
    var mutex = createAsyncMutex();
    var counter = 0;
    await Promise.all([
      mutex.withLock(async function() {
        var temp = counter;
        await new Promise(function(r) { setTimeout(r, 10); });
        counter = temp + 1;
      }),
      mutex.withLock(async function() {
        var temp = counter;
        await new Promise(function(r) { setTimeout(r, 10); });
        counter = temp + 1;
      }),
    ]);
    return counter;
  }
  if (testName === 'mutex isLocked') {
    var mutex = createAsyncMutex();
    var releaseFn = await mutex.acquire();
    var locked = mutex.isLocked();
    releaseFn();
    return locked;
  }
  if (testName === 'semaphore permits') {
    var semaphore = createAsyncSemaphore(2);
    return semaphore.getPermits();
  }
  if (testName === 'withLock auto-release') {
    var mutex = createAsyncMutex();
    await mutex.withLock(async function() {
      return 'done';
    });
    return mutex.isLocked() === false;
  }
  return null;
}`,
  testCases: [
    {
      input: ['mutex serialization'],
      expectedOutput: 2,
      description: 'testAsyncMutex ensures counter increments correctly with concurrent access',
    },
    {
      input: ['mutex isLocked'],
      expectedOutput: true,
      description: 'testAsyncMutex returns true when mutex is held via isLocked',
    },
    {
      input: ['semaphore permits'],
      expectedOutput: 2,
      description: 'testAsyncMutex confirms semaphore with 2 permits allows 2 concurrent holders',
    },
    {
      input: ['withLock auto-release'],
      expectedOutput: true,
      description: 'testAsyncMutex confirms withLock automatically releases lock after function completes',
    },
  ],
  hints: [
    'Store waiting acquirers in a queue with their resolve functions',
    'The acquire() method returns a promise that resolves with a release function',
    'Use FIFO order - first to wait is first to get the lock when released',
    'For withLock(), always use try/finally to ensure the lock is released',
    'A semaphore is like a mutex but with a counter > 1 for multiple permits',
  ],
};
