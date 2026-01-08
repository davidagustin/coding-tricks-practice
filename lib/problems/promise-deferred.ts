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
  id: 'promise-deferred',
  title: 'Deferred Promises for External Resolution',
  difficulty: 'medium',
  category: 'Async/Promises',
  description: `<h2>In-Depth Explanation</h2>

<p>A <strong>Deferred Promise</strong> is a pattern that exposes the <code>resolve</code> and <code>reject</code> functions outside of the Promise constructor callback. This allows external code to control when and how the promise settles, rather than the resolution being determined inside the constructor.</p>

<p>The standard Promise constructor pattern:</p>
<pre><code>// Resolution is internal - decided at creation time
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000);
});</code></pre>

<p>The deferred pattern:</p>
<pre><code>// Resolution is external - decided later by other code
const deferred = createDeferred();
// ... later, somewhere else ...
deferred.resolve('done');
await deferred.promise;</code></pre>

<p>Key characteristics of deferred promises:</p>
<ul>
  <li><strong>External Control</strong>: resolve/reject can be called from anywhere with access to the deferred object</li>
  <li><strong>Decoupled Logic</strong>: The code that creates the promise doesn't need to know how to resolve it</li>
  <li><strong>Event-Driven</strong>: Perfect for responding to external events or user actions</li>
  <li><strong>One-Shot</strong>: Like all promises, can only be settled once</li>
</ul>

<h2>Importance</h2>

<p>Deferred promises enable important patterns:</p>

<ul>
  <li><strong>Event Conversion</strong>: Convert callback-based events to promises</li>
  <li><strong>Cross-Component Communication</strong>: Allow one component to wait for another</li>
  <li><strong>Testing</strong>: Manually control promise resolution in tests</li>
  <li><strong>Initialization Gates</strong>: Wait for initialization from elsewhere in the app</li>
  <li><strong>User Input</strong>: Wait for user actions like button clicks or form submissions</li>
  <li><strong>Modal Dialogs</strong>: Wait for dialog confirmation/cancellation</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Deferred promises are useful in many scenarios:</p>

<ul>
  <li><strong>Dialog/Modal Results</strong>: Wait for user to confirm or cancel a dialog</li>
  <li><strong>Form Submissions</strong>: Resolve when a form is submitted or cancelled</li>
  <li><strong>WebSocket Responses</strong>: Match responses to requests via correlation IDs</li>
  <li><strong>One-Time Events</strong>: Convert single-fire events to promises</li>
  <li><strong>Resource Initialization</strong>: Signal when a resource is ready</li>
  <li><strong>Test Mocking</strong>: Control async behavior in unit tests</li>
  <li><strong>Request/Response Matching</strong>: Pair async requests with their responses</li>
  <li><strong>Barrier Synchronization</strong>: Wait until multiple conditions are met</li>
</ul>

<p><strong>Challenge:</strong> Implement a deferred promise factory and use it to build practical utilities like dialog handlers and request/response matchers.</p>`,
  examples: [
    {
      input: `const deferred = createDeferred();

// In one part of the code
button.onclick = () => deferred.resolve('clicked');

// In another part
const result = await deferred.promise;
console.log(result);`,
      output: `'clicked'`,
      explanation: 'Promise is resolved externally when button is clicked',
    },
    {
      input: `function showConfirmDialog(message) {
  const deferred = createDeferred();

  dialog.show(message);
  dialog.onConfirm = () => deferred.resolve(true);
  dialog.onCancel = () => deferred.resolve(false);

  return deferred.promise;
}

const confirmed = await showConfirmDialog('Delete?');`,
      output: `true or false based on user action`,
      explanation: 'Dialog result is returned as a promise',
    },
    {
      input: `const deferred = createDeferred();

// Check if already settled
console.log(deferred.status);  // 'pending'

deferred.resolve(42);
console.log(deferred.status);  // 'fulfilled'`,
      output: `'pending' then 'fulfilled'`,
      explanation: 'Deferred can expose its current status',
    },
  ],
  starterCode: `// Create a deferred promise
function createDeferred() {
  // TODO: Return an object with:
  // - promise: the underlying Promise
  // - resolve: function to resolve the promise
  // - reject: function to reject the promise
  // - status: 'pending' | 'fulfilled' | 'rejected'

  return {
    promise: Promise.resolve(),
    resolve: () => {},
    reject: () => {},
    status: 'pending'
  };
}

// Wait for a one-time event
function waitForEvent(target, eventName, options = {}) {
  // TODO: Return a promise that resolves when the event fires
  // - options.timeout: reject after timeout ms
  // - options.filter: only resolve if filter(event) returns true
  // - Clean up event listener after resolution

  return Promise.resolve();
}

// Request/Response matcher for async messaging
class RequestMatcher {
  constructor() {
    // TODO: Store pending requests by their ID
    this._pending = new Map();
  }

  createRequest(id, timeoutMs = 5000) {
    // TODO: Create a deferred for this request ID
    // Return the promise that will resolve with the response
  }

  handleResponse(id, response) {
    // TODO: Resolve the pending request with this ID
    // Return true if request was found, false otherwise
  }

  cancelRequest(id, reason) {
    // TODO: Reject the pending request
  }
}

// Test (commented out)
// const deferred = createDeferred();
// setTimeout(() => deferred.resolve('done'), 100);
// const result = await deferred.promise;
// console.log(result); // 'done'`,
  solution: `// Create a deferred promise
function createDeferred() {
  let resolve;
  let reject;
  let status = 'pending';

  const promise = new Promise((res, rej) => {
    resolve = (value) => {
      if (status === 'pending') {
        status = 'fulfilled';
        res(value);
      }
    };
    reject = (reason) => {
      if (status === 'pending') {
        status = 'rejected';
        rej(reason);
      }
    };
  });

  return {
    promise,
    resolve,
    reject,
    get status() { return status; }
  };
}

// Wait for a one-time event
function waitForEvent(target, eventName, options = {}) {
  const deferred = createDeferred();
  const { timeout, filter } = options;

  let timeoutId = null;

  const handler = (event) => {
    // If filter provided, check it
    if (filter && !filter(event)) {
      return; // Don't resolve, keep listening
    }

    // Clean up
    if (timeoutId) clearTimeout(timeoutId);
    target.removeEventListener(eventName, handler);

    deferred.resolve(event);
  };

  target.addEventListener(eventName, handler);

  // Set up timeout if specified
  if (timeout) {
    timeoutId = setTimeout(() => {
      target.removeEventListener(eventName, handler);
      deferred.reject(new Error(\`Timeout waiting for event: \${eventName}\`));
    }, timeout);
  }

  return deferred.promise;
}

// Request/Response matcher for async messaging
class RequestMatcher {
  constructor() {
    this._pending = new Map();
  }

  createRequest(id, timeoutMs = 5000) {
    // Check for duplicate
    if (this._pending.has(id)) {
      throw new Error(\`Request with ID \${id} already pending\`);
    }

    const deferred = createDeferred();

    // Set up timeout
    let timeoutId = null;
    if (timeoutMs > 0) {
      timeoutId = setTimeout(() => {
        this._pending.delete(id);
        deferred.reject(new Error(\`Request \${id} timed out\`));
      }, timeoutMs);
    }

    this._pending.set(id, {
      deferred,
      timeoutId
    });

    return deferred.promise;
  }

  handleResponse(id, response) {
    const pending = this._pending.get(id);

    if (!pending) {
      return false;
    }

    // Clean up
    if (pending.timeoutId) {
      clearTimeout(pending.timeoutId);
    }
    this._pending.delete(id);

    // Resolve
    pending.deferred.resolve(response);
    return true;
  }

  cancelRequest(id, reason = 'Cancelled') {
    const pending = this._pending.get(id);

    if (!pending) {
      return false;
    }

    // Clean up
    if (pending.timeoutId) {
      clearTimeout(pending.timeoutId);
    }
    this._pending.delete(id);

    // Reject
    pending.deferred.reject(new Error(reason));
    return true;
  }

  get pendingCount() {
    return this._pending.size;
  }

  hasPending(id) {
    return this._pending.has(id);
  }
}

// Barrier: Wait for multiple conditions
class Barrier {
  constructor(count) {
    this._count = count;
    this._arrived = 0;
    this._deferred = createDeferred();
  }

  arrive() {
    this._arrived++;
    if (this._arrived >= this._count) {
      this._deferred.resolve();
    }
  }

  wait() {
    return this._deferred.promise;
  }

  reset() {
    this._arrived = 0;
    this._deferred = createDeferred();
  }
}`,
  testCases: [
    {
      input: ['basic'],
      expectedOutput: 'resolved',
      description: 'Basic deferred resolves correctly',
    },
    {
      input: ['status', 'resolve'],
      expectedOutput: 'fulfilled',
      description: 'Status updates to fulfilled after resolve',
    },
    {
      input: ['status', 'reject'],
      expectedOutput: 'rejected',
      description: 'Status updates to rejected after reject',
    },
    {
      input: ['matcher', 'success'],
      expectedOutput: 'response-data',
      description: 'RequestMatcher matches responses to requests',
    },
    {
      input: ['matcher', 'timeout'],
      expectedOutput: 'timeout-error',
      description: 'RequestMatcher times out unmatched requests',
    },
  ],
  hints: [
    'Capture resolve and reject by assigning them to outer variables inside the Promise constructor',
    'Track status by updating a variable when resolve or reject is called',
    'For event waiting, remember to remove the listener after the event fires or times out',
    'Use a Map to store pending requests by ID for the RequestMatcher',
    'Always clean up timeouts when a promise settles to prevent memory leaks',
  ],
};
