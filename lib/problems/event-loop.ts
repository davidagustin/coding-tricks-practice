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
  id: 'event-loop',
  title: 'Understanding the JavaScript Event Loop',
  difficulty: 'medium',
  category: 'JavaScript Advanced',
  description: `<h2>In-Depth Explanation</h2>

<p>The JavaScript event loop is the mechanism that enables asynchronous programming in JavaScript. It continuously monitors the call stack and the callback queues, moving callbacks to the call stack when it's empty.</p>

<p>Key concepts to understand:</p>
<ul>
  <li><strong>Call Stack</strong>: Where synchronous code executes (LIFO - Last In, First Out)</li>
  <li><strong>Macrotask Queue</strong>: Contains callbacks from setTimeout, setInterval, I/O operations</li>
  <li><strong>Microtask Queue</strong>: Contains Promise callbacks (.then, .catch, .finally) and queueMicrotask()</li>
  <li><strong>Execution Order</strong>: Synchronous code → All microtasks → One macrotask → Repeat</li>
</ul>

<p>The critical insight is that <strong>microtasks always execute before the next macrotask</strong>. This means Promise callbacks have higher priority than setTimeout callbacks, even if setTimeout was scheduled first.</p>

<h2>Importance</h2>

<p>Understanding the event loop is crucial because:</p>

<ul>
  <li><strong>Debugging Async Code</strong>: Knowing execution order helps debug timing issues</li>
  <li><strong>Performance Optimization</strong>: Avoid blocking the main thread</li>
  <li><strong>Race Condition Prevention</strong>: Understanding when code runs prevents bugs</li>
  <li><strong>Interview Essential</strong>: Common interview topic for senior positions</li>
  <li><strong>Framework Understanding</strong>: React, Vue use microtasks for batching updates</li>
  <li><strong>API Design</strong>: Design better async APIs with predictable behavior</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Event loop knowledge is applied in:</p>

<ul>
  <li><strong>UI Updates</strong>: Batch DOM updates using microtasks for performance</li>
  <li><strong>Data Fetching</strong>: Understand when fetch callbacks execute</li>
  <li><strong>Animation Frames</strong>: requestAnimationFrame and its timing</li>
  <li><strong>State Management</strong>: React's setState batching uses microtasks</li>
  <li><strong>Worker Communication</strong>: Message passing and callback timing</li>
  <li><strong>Testing</strong>: Write correct async tests that wait for the right moment</li>
  <li><strong>Node.js</strong>: process.nextTick, setImmediate differences</li>
</ul>

<p><strong>Challenge:</strong> Predict the execution order of mixed sync/async code and implement functions that leverage microtasks and macrotasks.</p>`,
  examples: [
    {
      input: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');`,
      output: `1, 4, 3, 2`,
      explanation: 'Sync code runs first (1, 4), then microtasks (3), then macrotasks (2)',
    },
    {
      input: `queueMicrotask(() => console.log('micro'));
setTimeout(() => console.log('macro'), 0);`,
      output: `micro, macro`,
      explanation: 'Microtasks always run before the next macrotask',
    },
  ],
  starterCode: `// TODO: Predict the output order of the following code
// Return an array of numbers in the order they would be logged

function predictOrder1() {
  // What order will these log?
  // console.log(1);
  // setTimeout(() => console.log(2), 0);
  // Promise.resolve().then(() => console.log(3));
  // console.log(4);

  // Return the order as an array, e.g., [1, 4, 3, 2]
  return [];
}

function predictOrder2() {
  // What order will these log?
  // console.log('a');
  // setTimeout(() => console.log('b'), 0);
  // Promise.resolve().then(() => {
  //   console.log('c');
  //   Promise.resolve().then(() => console.log('d'));
  // });
  // setTimeout(() => console.log('e'), 0);
  // console.log('f');

  // Return the order as an array, e.g., ['a', 'f', 'c', 'd', 'b', 'e']
  return [];
}

// TODO: Create a function that uses queueMicrotask to defer execution
// but still runs before any setTimeout callbacks
function deferMicrotask(callback) {
  // Implement using queueMicrotask
}

// TODO: Create a function that schedules work after all microtasks complete
// Hint: Use setTimeout with 0 delay
function scheduleAfterMicrotasks(callback) {
  // Implement using setTimeout
}

// Test
console.log('Order 1:', predictOrder1());
console.log('Order 2:', predictOrder2());`,
  solution: `// Predict the output order of the following code
// Return an array of numbers/strings in the order they would be logged

function predictOrder1() {
  // What order will these log?
  // console.log(1);           // Sync - runs first
  // setTimeout(() => console.log(2), 0);  // Macrotask - runs last
  // Promise.resolve().then(() => console.log(3));  // Microtask - runs after sync
  // console.log(4);           // Sync - runs second

  // Order: sync (1, 4) -> microtasks (3) -> macrotasks (2)
  return [1, 4, 3, 2];
}

function predictOrder2() {
  // What order will these log?
  // console.log('a');         // Sync - first
  // setTimeout(() => console.log('b'), 0);  // Macrotask - queued first
  // Promise.resolve().then(() => {
  //   console.log('c');       // Microtask - runs after sync
  //   Promise.resolve().then(() => console.log('d')); // Nested microtask - runs before macrotasks
  // });
  // setTimeout(() => console.log('e'), 0);  // Macrotask - queued second
  // console.log('f');         // Sync - second

  // Order: sync (a, f) -> microtasks (c, d) -> macrotasks (b, e)
  return ['a', 'f', 'c', 'd', 'b', 'e'];
}

// Create a function that uses queueMicrotask to defer execution
// but still runs before any setTimeout callbacks
function deferMicrotask(callback) {
  queueMicrotask(callback);
}

// Create a function that schedules work after all microtasks complete
// Uses setTimeout with 0 delay to add to macrotask queue
function scheduleAfterMicrotasks(callback) {
  setTimeout(callback, 0);
}

// Test
console.log('Order 1:', predictOrder1()); // [1, 4, 3, 2]
console.log('Order 2:', predictOrder2()); // ['a', 'f', 'c', 'd', 'b', 'e']

// Demonstration
deferMicrotask(() => console.log('microtask'));
scheduleAfterMicrotasks(() => console.log('macrotask'));
console.log('sync');
// Output: 'sync', 'microtask', 'macrotask'`,
  testCases: [
    {
      input: { function: 'predictOrder1' },
      expectedOutput: [1, 4, 3, 2],
      description: 'predictOrder1 should return correct execution order',
    },
    {
      input: { function: 'predictOrder2' },
      expectedOutput: ['a', 'f', 'c', 'd', 'b', 'e'],
      description: 'predictOrder2 should return correct execution order with nested microtasks',
    },
    {
      input: { scenario: 'microtask before macrotask' },
      expectedOutput: { order: ['sync', 'microtask', 'macrotask'] },
      description: 'Microtasks should always execute before macrotasks',
    },
    {
      input: { scenario: 'nested promises' },
      expectedOutput: { behavior: 'All microtasks complete before any macrotask' },
      description: 'Nested Promise.then() calls run before setTimeout',
    },
  ],
  hints: [
    'Synchronous code always runs first, before any callbacks',
    'The microtask queue must be completely empty before any macrotask runs',
    'Nested Promise.then() calls add to the microtask queue and run before macrotasks',
    'queueMicrotask() adds directly to the microtask queue, like Promise.then()',
    'setTimeout(..., 0) adds to the macrotask queue, not the microtask queue',
  ],
};
