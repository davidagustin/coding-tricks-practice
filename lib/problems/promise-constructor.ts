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
  id: 'promise-constructor',
  title: 'Promise Constructor Pattern',
  difficulty: 'medium',
  category: 'Async/Promises',
  description: `<h2>In-Depth Explanation</h2>

<p>The \<code>Promise\</code> constructor allows you to create promises from scratch, wrapping callback-based APIs or creating custom async operations. The constructor takes a function (executor) with two parameters: \<code>resolve\</code> and \<code>reject\</code>.</p>

<p>The pattern is:</p>
<ol>
  <li>Create a new Promise with an executor function</li>
  <li>Perform the async operation inside the executor</li>
  <li>Call \<code>resolve(value)\</code> on success</li>
  <li>Call \<code>reject(error)\</code> on failure</li>
</ol>

<p>This is essential for "promisifying" callback-based APIs (like setTimeout, event listeners, file operations) and creating custom async operations that don't fit standard patterns.</p>

<h2>Importance</h2>

<p>The Promise constructor is fundamental because:</p>

<ul>
  <li><strong>API Wrapping</strong>: Converts callback-based APIs to promise-based APIs</li>
  <li><strong>Custom Async Operations</strong>: Creates promises for operations that don't have built-in promise support</li>
  <li><strong>Legacy Code Integration</strong>: Bridges old callback code with modern async/await</li>
  <li><strong>Event Handling</strong>: Converts event-driven code to promises</li>
  <li><strong>Flexibility</strong>: Full control over when and how the promise resolves/rejects</li>
  <li><strong>Interoperability</strong>: Enables mixing promises with callback-based code</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This pattern is used extensively:</p>

<ul>
  <li><strong>Timer Wrappers</strong>: Converting setTimeout/setInterval to promises</li>
  <li><strong>Event Listeners</strong>: Converting DOM events to promises (wait for click, wait for load)</li>
  <li><strong>File Operations</strong>: Wrapping Node.js fs callbacks in promises</li>
  <li><strong>Database Operations</strong>: Wrapping database callbacks in promises</li>
  <li><strong>Animation</strong>: Creating promises that resolve when animations complete</li>
  <li><strong>User Input</strong>: Creating promises that resolve when user provides input</li>
  <li><strong>Stream Processing</strong>: Converting streams to promises</li>
  <li><strong>Legacy Libraries</strong>: Wrapping old callback-based libraries</li>
</ul>

<p><strong>Challenge:</strong> Convert setTimeout and event listeners to promises.</p>`,
  examples: [
    {
      input: `delay(1000).then(() => console.log('Done'))`,
      output: `Logs after 1 second`,
      explanation: 'Promise-based delay',
    },
  ],
  starterCode: `function delay(ms) {
  // TODO: Return a Promise that resolves after ms milliseconds
  
  return Promise.resolve();
}

function waitForEvent(element, eventName) {
  // TODO: Return a Promise that resolves when event fires
  // Use addEventListener, resolve on first event, then remove listener
  
  return Promise.resolve();
}

// Test
delay(1000).then(() => console.log('1 second passed'));

const button = document.createElement('button');
waitForEvent(button, 'click').then(() => console.log('Button clicked'));`,
  solution: `function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function waitForEvent(element, eventName) {
  return new Promise(resolve => {
    const handler = () => {
      element.removeEventListener(eventName, handler);
      resolve();
    };
    element.addEventListener(eventName, handler);
  });
}

// Test function
async function testDelay() {
  const start = Date.now();
  await delay(10);
  const elapsed = Date.now() - start;
  return elapsed >= 10;
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'testDelay',
    },
  ],
  hints: [
    'new Promise((resolve, reject) => { ... })',
    'Call resolve() when operation succeeds',
    'Call reject() when operation fails',
  ],
};
