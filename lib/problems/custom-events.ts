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
  id: 'custom-events',
  title: 'Creating and Dispatching Custom Events',
  difficulty: 'easy',
  category: 'DOM/Browser',
  description: `<h2>In-Depth Explanation</h2>

<p>Custom events allow you to create your own event types beyond the built-in ones (click, submit, etc.). They enable loose coupling between components by allowing communication without direct references.</p>

<p><strong>Two ways to create custom events:</strong></p>
<ul>
  <li><strong>CustomEvent</strong>: Create events with custom data in the <code>detail</code> property</li>
  <li><strong>Event</strong>: Create simple events without custom data</li>
</ul>

<p><strong>Key properties:</strong></p>
<ul>
  <li><code>bubbles</code>: Whether the event bubbles up through the DOM (default: false)</li>
  <li><code>cancelable</code>: Whether the event can be cancelled with preventDefault()</li>
  <li><code>composed</code>: Whether the event crosses shadow DOM boundaries</li>
  <li><code>detail</code>: Custom data attached to CustomEvent</li>
</ul>

<p><strong>Event flow:</strong></p>
<ol>
  <li>Create event with <code>new CustomEvent('name', options)</code></li>
  <li>Dispatch with <code>element.dispatchEvent(event)</code></li>
  <li>Listen with <code>element.addEventListener('name', handler)</code></li>
</ol>

<h2>Importance</h2>

<p>Custom events are important for:</p>

<ul>
  <li><strong>Decoupling</strong>: Components communicate without knowing about each other</li>
  <li><strong>Pub/Sub Pattern</strong>: Implement publish-subscribe architecture</li>
  <li><strong>Web Components</strong>: Essential for custom element communication</li>
  <li><strong>Framework Agnostic</strong>: Work across different frameworks/vanilla JS</li>
  <li><strong>Testing</strong>: Easy to simulate user interactions</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Custom events are used for:</p>

<ul>
  <li><strong>Component Communication</strong>: Notify parent components of child actions</li>
  <li><strong>Global State</strong>: Broadcast state changes across the app</li>
  <li><strong>Form Systems</strong>: Custom validation and submission events</li>
  <li><strong>Modal/Dialog</strong>: Notify when modals open/close</li>
  <li><strong>Shopping Cart</strong>: Events for add/remove/update cart items</li>
  <li><strong>Analytics</strong>: Track custom user interactions</li>
  <li><strong>Plugin Systems</strong>: Allow plugins to hook into application lifecycle</li>
</ul>

<p><strong>Challenge:</strong> Create a simple event system using custom events for component communication.</p>`,
  examples: [
    {
      input: `const event = new CustomEvent('userLogin', { detail: { userId: 123 } })`,
      output: `CustomEvent with type 'userLogin' and detail.userId = 123`,
      explanation: 'Custom data is passed in the detail property',
    },
    {
      input: `element.dispatchEvent(new CustomEvent('change', { bubbles: true }))`,
      output: `Event bubbles up through DOM ancestors`,
      explanation: 'bubbles: true allows parent elements to catch the event',
    },
    {
      input: `document.addEventListener('app:ready', () => init())`,
      output: `init() called when 'app:ready' is dispatched`,
      explanation: 'Use namespaced event names to avoid collisions',
    },
  ],
  starterCode: `// TODO: Create and dispatch a custom event
// Should include custom data in the detail property
function emitCustomEvent(element, eventName, data) {
  // 1. Create a new CustomEvent with the given name
  // 2. Pass data in the detail property
  // 3. Set bubbles: true so parent elements can listen
  // 4. Dispatch the event on the element
  // 5. Return the event object
}

// TODO: Create a simple event bus using custom events
// Should allow subscribing to and emitting events
function createEventBus() {
  // 1. Create a target element (or use document)
  // 2. Return object with on(), off(), and emit() methods
  // 3. on() adds event listener
  // 4. off() removes event listener
  // 5. emit() dispatches custom event with data
}

// TODO: Create a typed event emitter class
// Should provide type-safe event handling
class TypedEventEmitter {
  // 1. Use a hidden element for event dispatching
  // 2. Implement on(eventName, callback)
  // 3. Implement off(eventName, callback)
  // 4. Implement emit(eventName, data)
  // 5. Implement once(eventName, callback)
}

// Test
const testElement = {
  listeners: {},
  addEventListener(type, fn) {
    this.listeners[type] = this.listeners[type] || [];
    this.listeners[type].push(fn);
  },
  dispatchEvent(event) {
    const fns = this.listeners[event.type] || [];
    fns.forEach(fn => fn(event));
    return true;
  }
};

// Usage:
// emitCustomEvent(button, 'cart:add', { productId: 123, quantity: 1 });`,
  solution: `// Create and dispatch a custom event
// Should include custom data in the detail property
function emitCustomEvent(element, eventName, data) {
  // 1. Create a new CustomEvent with the given name
  // 2. Pass data in the detail property
  // 3. Set bubbles: true so parent elements can listen
  // 4. Dispatch the event on the element
  // 5. Return the event object
  const event = new CustomEvent(eventName, {
    detail: data,
    bubbles: true
  });
  element.dispatchEvent(event);
  return event;
}

// Create a simple event bus using custom events
// Should allow subscribing to and emitting events
function createEventBus() {
  // 1. Create a target element (or use document)
  // 2. Return object with on(), off(), and emit() methods
  // 3. on() adds event listener
  // 4. off() removes event listener
  // 5. emit() dispatches custom event with data
  const target = document.createElement('div');

  return {
    on(eventName, callback) {
      target.addEventListener(eventName, callback);
    },
    off(eventName, callback) {
      target.removeEventListener(eventName, callback);
    },
    emit(eventName, data) {
      emitCustomEvent(target, eventName, data);
    }
  };
}

// Node.js compatible EventEmitter implementation for testing
// This demonstrates the same patterns without browser APIs
class SimpleEventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(eventName, callback) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName).push(callback);
    return this;
  }

  off(eventName, callback) {
    if (!this.listeners.has(eventName)) return this;
    const callbacks = this.listeners.get(eventName);
    const index = callbacks.indexOf(callback);
    if (index > -1) callbacks.splice(index, 1);
    return this;
  }

  emit(eventName, data) {
    if (!this.listeners.has(eventName)) return false;
    const callbacks = this.listeners.get(eventName);
    callbacks.forEach(cb => cb({ type: eventName, detail: data }));
    return callbacks.length > 0;
  }

  once(eventName, callback) {
    const onceWrapper = (event) => {
      callback(event);
      this.off(eventName, onceWrapper);
    };
    return this.on(eventName, onceWrapper);
  }
}

// Test wrapper functions for automated testing
function testEventEmitterOn(eventName, data) {
  const emitter = new SimpleEventEmitter();
  let received = null;
  emitter.on(eventName, (event) => { received = event; });
  emitter.emit(eventName, data);
  return received ? { type: received.type, detail: received.detail } : null;
}

function testEventEmitterOff(eventName) {
  const emitter = new SimpleEventEmitter();
  let callCount = 0;
  const handler = () => { callCount++; };
  emitter.on(eventName, handler);
  emitter.emit(eventName, {});
  emitter.off(eventName, handler);
  emitter.emit(eventName, {});
  return callCount; // Should be 1 (only first emit triggers handler)
}

function testEventEmitterOnce(eventName) {
  const emitter = new SimpleEventEmitter();
  let callCount = 0;
  emitter.once(eventName, () => { callCount++; });
  emitter.emit(eventName, {});
  emitter.emit(eventName, {});
  return callCount; // Should be 1 (once only fires once)
}

function testEventEmitterMultipleListeners(eventName) {
  const emitter = new SimpleEventEmitter();
  let count = 0;
  emitter.on(eventName, () => { count++; });
  emitter.on(eventName, () => { count++; });
  emitter.emit(eventName, {});
  return count; // Should be 2 (both listeners called)
}

function testEventEmitterChaining() {
  const emitter = new SimpleEventEmitter();
  // Test that on() returns this for chaining
  const result = emitter.on('a', () => {}).on('b', () => {});
  return result instanceof SimpleEventEmitter;
}

function testEventEmitterEmitReturnValue(eventName, hasListeners) {
  const emitter = new SimpleEventEmitter();
  if (hasListeners) {
    emitter.on(eventName, () => {});
  }
  return emitter.emit(eventName, {});
}`,
  testCases: [
    {
      input: ['userLogin', { userId: 123 }],
      expectedOutput: { type: 'userLogin', detail: { userId: 123 } },
      description: 'testEventEmitterOn receives event with correct type and detail',
    },
    {
      input: ['cart:add', { productId: 456, quantity: 2 }],
      expectedOutput: { type: 'cart:add', detail: { productId: 456, quantity: 2 } },
      description: 'testEventEmitterOn supports namespaced event names',
    },
    {
      input: ['testOff'],
      expectedOutput: 1,
      description: 'testEventEmitterOff removes listener so it only fires once',
    },
    {
      input: ['testOnce'],
      expectedOutput: 1,
      description: 'testEventEmitterOnce only fires listener once even with multiple emits',
    },
    {
      input: ['multipleListeners'],
      expectedOutput: 2,
      description: 'testEventEmitterMultipleListeners calls all registered listeners',
    },
    {
      input: [],
      expectedOutput: true,
      description: 'testEventEmitterChaining supports method chaining on on()',
    },
    {
      input: ['withListener', true],
      expectedOutput: true,
      description: 'testEventEmitterEmitReturnValue returns true when listeners exist',
    },
    {
      input: ['noListener', false],
      expectedOutput: false,
      description: 'testEventEmitterEmitReturnValue returns false when no listeners',
    },
  ],
  hints: [
    'Use new CustomEvent(name, { detail: data }) to create events with custom data',
    'Set bubbles: true if you want parent elements to be able to listen for the event',
    'Store handler references if you need to remove listeners later with off()',
    'Use event namespacing like "app:eventName" to avoid naming collisions',
  ],
};
