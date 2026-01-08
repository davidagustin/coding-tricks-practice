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
  id: 'observer-pattern',
  title: 'Observer/PubSub Pattern',
  difficulty: 'medium',
  category: 'Design Patterns',
  description: `<h2>In-Depth Explanation</h2>

<p>The Observer pattern (also known as Publish-Subscribe or PubSub) defines a one-to-many dependency between objects. When one object (the subject) changes state, all its dependents (observers) are notified and updated automatically.</p>

<p>Key components of Observer pattern:</p>
<ol>
  <li><strong>Subject/Publisher</strong>: Maintains list of observers and notifies them of changes</li>
  <li><strong>Observer/Subscriber</strong>: Receives updates from the subject</li>
  <li><strong>Subscribe</strong>: Method to register an observer</li>
  <li><strong>Unsubscribe</strong>: Method to remove an observer</li>
  <li><strong>Notify/Publish</strong>: Method to broadcast updates to all observers</li>
</ol>

<p>Key benefits:</p>
<ul>
  <li><strong>Loose Coupling</strong>: Subject doesn't need to know observer details</li>
  <li><strong>Dynamic Relationships</strong>: Observers can be added/removed at runtime</li>
  <li><strong>Broadcast Communication</strong>: One-to-many updates</li>
  <li><strong>Separation of Concerns</strong>: Subject handles state, observers handle reactions</li>
</ul>

<h2>Importance</h2>

<p>Observer pattern is fundamental because:</p>

<ul>
  <li><strong>Event-Driven Architecture</strong>: Foundation of modern UI frameworks</li>
  <li><strong>Reactive Programming</strong>: Core concept in RxJS and reactive patterns</li>
  <li><strong>Decoupling</strong>: Components can communicate without direct references</li>
  <li><strong>Scalability</strong>: Easy to add new observers without modifying subject</li>
  <li><strong>Real-time Updates</strong>: Enables live data synchronization</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Observer is used extensively:</p>

<ul>
  <li><strong>DOM Events</strong>: addEventListener is observer pattern</li>
  <li><strong>React State</strong>: useState and useEffect follow observer principles</li>
  <li><strong>Redux</strong>: Store subscribers are observers</li>
  <li><strong>Node.js EventEmitter</strong>: Built-in observer implementation</li>
  <li><strong>WebSockets</strong>: Real-time message broadcasting</li>
  <li><strong>Message Queues</strong>: RabbitMQ, Kafka pub/sub systems</li>
  <li><strong>Stock Tickers</strong>: Real-time price updates</li>
</ul>

<p><strong>Challenge:</strong> Implement an EventEmitter class that supports subscribing to events, unsubscribing, and emitting events to all subscribers.</p>`,
  examples: [
    {
      input: `const emitter = new EventEmitter();
emitter.on('message', (data) => console.log(data));
emitter.emit('message', 'Hello!');`,
      output: `"Hello!"`,
      explanation: 'Subscriber receives the emitted message',
    },
    {
      input: `emitter.on('update', (data) => console.log('Observer 1:', data));
emitter.on('update', (data) => console.log('Observer 2:', data));
emitter.emit('update', 'New data');`,
      output: `"Observer 1: New data"
"Observer 2: New data"`,
      explanation: 'Multiple observers receive the same update',
    },
  ],
  starterCode: `// TODO: Implement an EventEmitter class
// The class should:
// 1. Allow subscribing to events with on(eventName, callback)
// 2. Allow unsubscribing with off(eventName, callback)
// 3. Emit events to all subscribers with emit(eventName, data)
// 4. Support multiple events and multiple subscribers per event

class EventEmitter {
  constructor() {
    // Initialize events storage (use Map or object)
  }

  // Subscribe to an event
  on(eventName, callback) {
    // Add callback to the list of subscribers for this event
    // Return this for chaining
  }

  // Unsubscribe from an event
  off(eventName, callback) {
    // Remove the specific callback from subscribers
    // Return this for chaining
  }

  // Emit an event to all subscribers
  emit(eventName, data) {
    // Call all callbacks registered for this event
    // Return true if event had listeners, false otherwise
  }

  // Get count of listeners for an event
  listenerCount(eventName) {
    // Return number of subscribers for this event
  }
}

// Test
const emitter = new EventEmitter();

const handler1 = (data) => console.log('Handler 1:', data);
const handler2 = (data) => console.log('Handler 2:', data);

emitter.on('message', handler1);
emitter.on('message', handler2);

emitter.emit('message', 'Hello World');

emitter.off('message', handler1);
emitter.emit('message', 'Second message');`,
  solution: `class EventEmitter {
  private events: Map<string, Set<Function>>;

  constructor() {
    this.events = new Map();
  }

  on(eventName: string, callback: Function): this {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Set());
    }
    this.events.get(eventName)!.add(callback);
    return this;
  }

  off(eventName: string, callback: Function): this {
    const callbacks = this.events.get(eventName);
    if (callbacks) {
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        this.events.delete(eventName);
      }
    }
    return this;
  }

  emit(eventName: string, data?: unknown): boolean {
    const callbacks = this.events.get(eventName);
    if (!callbacks || callbacks.size === 0) {
      return false;
    }
    callbacks.forEach(callback => callback(data));
    return true;
  }

  listenerCount(eventName: string): number {
    const callbacks = this.events.get(eventName);
    return callbacks ? callbacks.size : 0;
  }

  // Bonus: once method for one-time listeners
  once(eventName: string, callback: Function): this {
    const wrapper = (data: unknown) => {
      callback(data);
      this.off(eventName, wrapper);
    };
    return this.on(eventName, wrapper);
  }
}

// Usage
const emitter = new EventEmitter();

const handler1 = (data: unknown) => console.log('Handler 1:', data);
const handler2 = (data: unknown) => console.log('Handler 2:', data);

emitter.on('message', handler1).on('message', handler2);
emitter.emit('message', 'Hello World');
// Handler 1: Hello World
// Handler 2: Hello World

emitter.off('message', handler1);
emitter.emit('message', 'Second message');
// Handler 2: Second message`,
  testCases: [
    {
      input: { action: 'subscribe_and_emit', eventName: 'test', data: 'Hello' },
      expectedOutput: { emitted: true, receivedData: 'Hello' },
      description: 'Subscriber receives data when event is emitted',
    },
    {
      input: { action: 'multiple_subscribers', eventName: 'update', data: 42 },
      expectedOutput: { subscriberCount: 3, allReceived: true },
      description: 'Multiple subscribers all receive the emitted event',
    },
    {
      input: { action: 'unsubscribe', eventName: 'click', initialCount: 2, afterUnsubscribe: 1 },
      expectedOutput: { listenerCount: 1 },
      description: 'off() removes specific subscriber from event',
    },
    {
      input: { action: 'emit_no_listeners', eventName: 'nonexistent' },
      expectedOutput: false,
      description: 'emit() returns false when no listeners exist for event',
    },
    {
      input: { action: 'listener_count', eventName: 'data', addCount: 5 },
      expectedOutput: 5,
      description: 'listenerCount() returns correct number of subscribers',
    },
  ],
  hints: [
    'Use a Map with event names as keys and Sets of callbacks as values',
    'Sets prevent duplicate callback registrations automatically',
    'Return "this" from on() and off() to enable method chaining',
    'emit() should return a boolean indicating if any listeners were called',
    'Remember to clean up empty event entries when last listener is removed',
  ],
};
