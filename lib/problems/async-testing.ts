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
  id: 'async-testing',
  title: 'Testing Asynchronous Code Patterns',
  difficulty: 'medium',
  category: 'Testing Patterns',
  description: `<h2>In-Depth Explanation</h2>

<p>Testing asynchronous code requires special techniques because tests must wait for async operations to complete before making assertions. Common patterns include:</p>

<h3>Key Async Testing Patterns</h3>
<ol>
  <li><strong>Async/Await</strong>: Use async test functions and await the code under test</li>
  <li><strong>Promise Resolution</strong>: Return promises from tests and chain assertions</li>
  <li><strong>Callbacks with Done</strong>: Use done() callback to signal test completion</li>
  <li><strong>Fake Timers</strong>: Control setTimeout/setInterval for deterministic tests</li>
  <li><strong>Flush Promises</strong>: Force pending promises to resolve in tests</li>
</ol>

<h2>Importance</h2>

<p>Proper async testing is critical because:</p>

<ul>
  <li><strong>Modern Code</strong>: Most JavaScript involves async operations</li>
  <li><strong>Race Conditions</strong>: Async bugs are notoriously hard to find without proper tests</li>
  <li><strong>False Positives</strong>: Tests may pass incorrectly if they don't wait for async completion</li>
  <li><strong>Timeouts</strong>: Tests need to handle slow or hanging async operations</li>
  <li><strong>Error Handling</strong>: Async error paths must be tested thoroughly</li>
</ul>

<h2>Common Challenges</h2>

<ul>
  <li><strong>Timing Issues</strong>: Tests finishing before async code completes</li>
  <li><strong>Unhandled Rejections</strong>: Promises rejecting without proper handling</li>
  <li><strong>Timer Dependencies</strong>: Code using setTimeout/setInterval</li>
  <li><strong>Event-based Code</strong>: Testing code that emits events asynchronously</li>
  <li><strong>Multiple Async Operations</strong>: Testing parallel or sequential async flows</li>
</ul>

<p><strong>Challenge:</strong> Implement async testing utilities including fake timers, promise flushing, and async assertion helpers.</p>`,
  examples: [
    {
      input: `const result = await asyncTest(async () => {
  const data = await fetchData();
  return data.length > 0;
});`,
      output: `{ passed: true, error: null }`,
      explanation: 'Async test waits for promise and captures result',
    },
    {
      input: `const timers = createFakeTimers();
setTimeout(() => callback(), 1000);
timers.advanceTime(1000);
// callback has been called`,
      output: `callback executed`,
      explanation: 'Fake timers allow controlling time in tests',
    },
    {
      input: `await flushPromises();
// All pending promises have resolved`,
      output: `promises flushed`,
      explanation: 'Flush promises ensures all microtasks complete',
    },
  ],
  starterCode: `// TODO: Implement async testing utilities

// 1. Async test runner - handles async tests and catches errors
async function asyncTest(testFn, timeout = 5000) {
  // Run the test function
  // Return { passed: boolean, error: Error | null, duration: number }
  // Handle timeouts

  return { passed: false, error: null, duration: 0 };
}

// 2. Fake timers - control setTimeout and setInterval
function createFakeTimers() {
  // Replace global setTimeout/setInterval
  // Track scheduled callbacks
  // Provide advanceTime, runAllTimers, clearAllTimers

  return {
    advanceTime: function(ms) {
      // Execute callbacks whose time has come
    },

    runAllTimers: function() {
      // Execute all pending timers immediately
    },

    clearAllTimers: function() {
      // Clear all pending timers
    },

    getTimerCount: function() {
      // Return number of pending timers
    },

    restore: function() {
      // Restore real timers
    }
  };
}

// 3. Flush promises - ensure all pending promises resolve
function flushPromises() {
  // Return a promise that resolves after all pending microtasks
  // Use setImmediate or setTimeout(0) trick

  return Promise.resolve();
}

// 4. Wait for condition - poll until condition is true
async function waitFor(conditionFn, options = {}) {
  // Poll conditionFn until it returns true
  // Options: timeout, interval
  // Throw if timeout exceeded

  const { timeout = 1000, interval = 50 } = options;
}

// 5. Async assertion helper
async function expectAsync(promiseOrFn) {
  // Return object with assertion methods:
  // toResolve, toReject, toResolveWith, toRejectWith

  return {
    toResolve: async function() {},
    toReject: async function() {},
    toResolveWith: async function(expected) {},
    toRejectWith: async function(expectedError) {}
  };
}

// Test your implementation
async function runTests() {
  // Test asyncTest
  const result = await asyncTest(async () => {
    await new Promise(r => setTimeout(r, 100));
    return true;
  });
  console.log('Async test result:', result);

  // Test flushPromises
  let resolved = false;
  Promise.resolve().then(() => { resolved = true; });
  await flushPromises();
  console.log('Promise flushed:', resolved);

  // Test waitFor
  let ready = false;
  setTimeout(() => { ready = true; }, 100);
  await waitFor(() => ready);
  console.log('Wait for completed');
}

runTests();`,
  solution: `// 1. Async test runner - handles async tests and catches errors
async function asyncTest(testFn, timeout = 5000) {
  const startTime = Date.now();

  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Test timeout')), timeout);
    });

    const result = await Promise.race([testFn(), timeoutPromise]);
    const duration = Date.now() - startTime;

    return { passed: !!result, error: null, duration };
  } catch (error) {
    const duration = Date.now() - startTime;
    return { passed: false, error, duration };
  }
}

// 2. Fake timers - control setTimeout and setInterval
function createFakeTimers() {
  const originalSetTimeout = globalThis.setTimeout;
  const originalSetInterval = globalThis.setInterval;
  const originalClearTimeout = globalThis.clearTimeout;
  const originalClearInterval = globalThis.clearInterval;

  let currentTime = 0;
  let timerId = 0;
  const timers = new Map();

  globalThis.setTimeout = function(callback, delay, ...args) {
    const id = ++timerId;
    timers.set(id, { callback, time: currentTime + delay, args, type: 'timeout' });
    return id;
  };

  globalThis.setInterval = function(callback, delay, ...args) {
    const id = ++timerId;
    timers.set(id, { callback, time: currentTime + delay, delay, args, type: 'interval' });
    return id;
  };

  globalThis.clearTimeout = function(id) {
    timers.delete(id);
  };

  globalThis.clearInterval = function(id) {
    timers.delete(id);
  };

  return {
    advanceTime: function(ms) {
      const targetTime = currentTime + ms;
      while (currentTime < targetTime) {
        let nextTimer = null;
        let nextTimerId = null;

        for (const [id, timer] of timers) {
          if (timer.time <= targetTime && (!nextTimer || timer.time < nextTimer.time)) {
            nextTimer = timer;
            nextTimerId = id;
          }
        }

        if (!nextTimer || nextTimer.time > targetTime) {
          currentTime = targetTime;
          break;
        }

        currentTime = nextTimer.time;
        nextTimer.callback(...nextTimer.args);

        if (nextTimer.type === 'interval') {
          nextTimer.time = currentTime + nextTimer.delay;
        } else {
          timers.delete(nextTimerId);
        }
      }
    },

    runAllTimers: function() {
      while (timers.size > 0) {
        this.advanceTime(Math.max(...[...timers.values()].map(t => t.time - currentTime)));
      }
    },

    clearAllTimers: function() {
      timers.clear();
    },

    getTimerCount: function() {
      return timers.size;
    },

    restore: function() {
      globalThis.setTimeout = originalSetTimeout;
      globalThis.setInterval = originalSetInterval;
      globalThis.clearTimeout = originalClearTimeout;
      globalThis.clearInterval = originalClearInterval;
    }
  };
}

// 3. Flush promises - ensure all pending promises resolve
function flushPromises() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

// 4. Wait for condition - poll until condition is true
async function waitFor(conditionFn, options = {}) {
  const { timeout = 1000, interval = 50 } = options;
  const startTime = Date.now();

  while (true) {
    if (conditionFn()) return true;
    if (Date.now() - startTime >= timeout) {
      throw new Error('waitFor timeout exceeded');
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
}

// 5. Async assertion helper
async function expectAsync(promiseOrFn) {
  const promise = typeof promiseOrFn === 'function' ? promiseOrFn() : promiseOrFn;

  return {
    toResolve: async function() {
      try {
        await promise;
        return true;
      } catch (e) {
        throw new Error('Expected promise to resolve, but it rejected');
      }
    },
    toReject: async function() {
      try {
        await promise;
        throw new Error('Expected promise to reject, but it resolved');
      } catch (e) {
        if (e.message === 'Expected promise to reject, but it resolved') throw e;
        return true;
      }
    },
    toResolveWith: async function(expected) {
      const result = await promise;
      if (JSON.stringify(result) !== JSON.stringify(expected)) {
        throw new Error(\`Expected \${expected}, got \${result}\`);
      }
      return true;
    },
    toRejectWith: async function(expectedError) {
      try {
        await promise;
        throw new Error('Expected promise to reject, but it resolved');
      } catch (e) {
        if (e.message === 'Expected promise to reject, but it resolved') throw e;
        if (expectedError && !e.message.includes(expectedError)) {
          throw new Error(\`Expected error containing "\${expectedError}", got "\${e.message}"\`);
        }
        return true;
      }
    }
  };
}

// Test your implementation
async function runTests() {
  // Test asyncTest
  const result = await asyncTest(async () => {
    await new Promise(r => setTimeout(r, 100));
    return true;
  });
  console.log('Async test result:', result);

  // Test flushPromises
  let resolved = false;
  Promise.resolve().then(() => { resolved = true; });
  await flushPromises();
  console.log('Promise flushed:', resolved);

  // Test waitFor
  let ready = false;
  setTimeout(() => { ready = true; }, 100);
  await waitFor(() => ready);
  console.log('Wait for completed');
}

runTests();`,
  testCases: [
    {
      input: { fn: 'asyncTest', args: [async () => true] },
      expectedOutput: { passed: true },
      description: 'asyncTest returns passed: true for successful async test'
    },
    {
      input: { fn: 'flushPromises', args: [] },
      expectedOutput: 'promise',
      description: 'flushPromises returns a promise'
    }
  ],
  hints: [
    'Use Promise.race to implement timeouts - race the test against a timeout promise',
    'For fake timers, store callbacks in a Map with their scheduled execution time',
    'flushPromises can use setImmediate or setTimeout(resolve, 0) to wait for microtask queue',
    'waitFor should poll at intervals, not block - use async/await with setTimeout',
    'Remember to restore original timer functions after tests to avoid pollution',
    'Consider edge cases: what if the async function throws synchronously?',
  ],
};
