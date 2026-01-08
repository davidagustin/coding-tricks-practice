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
  description: `## In-Depth Explanation

The \`Promise\` constructor allows you to create promises from scratch, wrapping callback-based APIs or creating custom async operations. The constructor takes a function (executor) with two parameters: \`resolve\` and \`reject\`.

The pattern is:
1. Create a new Promise with an executor function
2. Perform the async operation inside the executor
3. Call \`resolve(value)\` on success
4. Call \`reject(error)\` on failure

This is essential for "promisifying" callback-based APIs (like setTimeout, event listeners, file operations) and creating custom async operations that don't fit standard patterns.

## Importance

The Promise constructor is fundamental because:

- **API Wrapping**: Converts callback-based APIs to promise-based APIs
- **Custom Async Operations**: Creates promises for operations that don't have built-in promise support
- **Legacy Code Integration**: Bridges old callback code with modern async/await
- **Event Handling**: Converts event-driven code to promises
- **Flexibility**: Full control over when and how the promise resolves/rejects
- **Interoperability**: Enables mixing promises with callback-based code

## Usefulness & Practical Applications

This pattern is used extensively:

- **Timer Wrappers**: Converting setTimeout/setInterval to promises
- **Event Listeners**: Converting DOM events to promises (wait for click, wait for load)
- **File Operations**: Wrapping Node.js fs callbacks in promises
- **Database Operations**: Wrapping database callbacks in promises
- **Animation**: Creating promises that resolve when animations complete
- **User Input**: Creating promises that resolve when user provides input
- **Stream Processing**: Converting streams to promises
- **Legacy Libraries**: Wrapping old callback-based libraries

**Challenge:** Convert setTimeout and event listeners to promises.`,
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
