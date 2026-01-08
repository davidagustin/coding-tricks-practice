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
  id: 'memory-management',
  title: 'Memory Management and Garbage Collection',
  difficulty: 'hard',
  category: 'JavaScript Advanced',
  description: `<h2>In-Depth Explanation</h2>

<p>JavaScript uses automatic garbage collection, meaning memory is automatically freed when objects are no longer reachable. However, understanding memory management is crucial for writing performant applications and avoiding memory leaks.</p>

<p>Key concepts in JavaScript memory management:</p>
<ul>
  <li><strong>Reachability</strong>: Objects are kept in memory if they're reachable from "roots" (global variables, current call stack)</li>
  <li><strong>Garbage Collection</strong>: Automatic process that frees unreachable memory</li>
  <li><strong>Memory Leaks</strong>: Unintentional references that prevent garbage collection</li>
  <li><strong>WeakMap/WeakSet</strong>: Collections that don't prevent garbage collection of keys</li>
  <li><strong>WeakRef</strong>: Hold a weak reference to an object</li>
  <li><strong>FinalizationRegistry</strong>: Execute callbacks when objects are garbage collected</li>
</ul>

<p>Common memory leak patterns include: forgotten timers/intervals, closures holding references, detached DOM nodes, and event listeners not being removed.</p>

<h2>Importance</h2>

<p>Memory management knowledge is critical because:</p>

<ul>
  <li><strong>Performance</strong>: Memory leaks cause applications to slow down over time</li>
  <li><strong>Stability</strong>: Excessive memory usage can crash applications</li>
  <li><strong>Mobile Devices</strong>: Limited memory makes optimization essential</li>
  <li><strong>Long-Running Apps</strong>: SPAs and servers must manage memory carefully</li>
  <li><strong>Debugging</strong>: Identify and fix memory issues using DevTools</li>
  <li><strong>Interview Topics</strong>: Advanced positions require memory knowledge</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Memory management skills are applied in:</p>

<ul>
  <li><strong>Cache Implementation</strong>: Use WeakMap for caches that don't prevent GC</li>
  <li><strong>Event Handling</strong>: Properly remove listeners to prevent leaks</li>
  <li><strong>DOM Manipulation</strong>: Avoid retaining references to removed elements</li>
  <li><strong>Timer Management</strong>: Clear intervals and timeouts when components unmount</li>
  <li><strong>Object Pooling</strong>: Reuse objects to reduce GC pressure</li>
  <li><strong>Large Data</strong>: Process large datasets without exhausting memory</li>
  <li><strong>Worker Communication</strong>: Understand transferable objects</li>
  <li><strong>Performance Profiling</strong>: Use memory profilers effectively</li>
</ul>

<p><strong>Challenge:</strong> Implement memory-conscious patterns using WeakMap, proper cleanup patterns, and identify/fix memory leaks.</p>`,
  examples: [
    {
      input: `const cache = new WeakMap();
let obj = { data: 'important' };
cache.set(obj, 'cached value');
obj = null; // Object can now be garbage collected`,
      output: `WeakMap allows GC of the key object`,
      explanation: 'WeakMap holds weak references, allowing keys to be garbage collected',
    },
    {
      input: `// Memory leak example
const listeners = [];
function addListener(element) {
  const handler = () => console.log(element);
  listeners.push(handler); // Keeps reference forever!
  element.addEventListener('click', handler);
}`,
      output: `Memory leak: handlers array prevents GC`,
      explanation: 'The array keeps references to handlers which reference elements',
    },
  ],
  starterCode: `// TODO: Create a WeakMap-based cache for expensive computations on objects
// The cache should NOT prevent garbage collection of the input objects
// If an object is garbage collected, its cached result should be too

function createObjectCache(computeFn) {
  // Create a WeakMap-based cache
  // Return a function that:
  // 1. Checks if result is cached for the object
  // 2. If cached, returns cached result
  // 3. If not cached, computes, caches, and returns result

  return function(obj) {
    // Implement caching logic
    return computeFn(obj);
  };
}

// TODO: Create a class that properly manages event listeners
// The class should:
// - Store element and handlers so they can be removed later
// - Provide an addListener method that adds and tracks listeners
// - Provide a removeAllListeners method that cleans up everything
// - Provide a destroy method that removes listeners and clears references

class EventManager {
  constructor(element) {
    // Store element and initialize handler tracking
  }

  addListener(eventType, handler) {
    // Add event listener and track it for later cleanup
  }

  removeAllListeners() {
    // Remove all tracked event listeners
  }

  destroy() {
    // Remove listeners and clear all references to prevent leaks
  }
}

// TODO: Implement a function that processes large arrays in chunks
// to avoid blocking the main thread and reduce memory pressure
// The function should:
// - Process items in chunks of 'chunkSize'
// - Use setTimeout to yield to the event loop between chunks
// - Return a promise that resolves when all items are processed
// - Call the processor function with each item

function processInChunks(items, processor, chunkSize = 100) {
  // Process array in chunks, yielding between chunks
  return new Promise((resolve) => {
    // Implement chunked processing
    resolve();
  });
}

// TODO: Fix the memory leak in this code
// The original code leaks memory because closures hold references
function createLeakyHandlers() {
  const handlers = [];

  for (let i = 0; i < 1000; i++) {
    const largeData = new Array(10000).fill('x'); // Large object

    handlers.push(() => {
      // This closure holds reference to largeData even if not used!
      console.log('Handler ' + i);
    });
  }

  return handlers;
}

// Fix: Create handlers without retaining largeData reference
function createFixedHandlers() {
  const handlers = [];

  // Implement without memory leak

  return handlers;
}

// Test
const cache = createObjectCache(obj => obj.value * 2);
const testObj = { value: 21 };
console.log(cache(testObj)); // 42
console.log(cache(testObj)); // 42 (cached)

// EventManager test would require DOM
console.log('EventManager class defined:', typeof EventManager === 'function');

// processInChunks test
processInChunks([1, 2, 3, 4, 5], item => console.log('Processing:', item), 2);`,
  solution: `function createObjectCache(computeFn) {
  const cache = new WeakMap();

  return function(obj) {
    if (cache.has(obj)) {
      return cache.get(obj);
    }
    const result = computeFn(obj);
    cache.set(obj, result);
    return result;
  };
}

class EventManager {
  constructor(element) {
    this.element = element;
    this.listeners = [];
  }

  addListener(eventType, handler) {
    this.element.addEventListener(eventType, handler);
    this.listeners.push({ eventType, handler });
  }

  removeAllListeners() {
    for (const { eventType, handler } of this.listeners) {
      this.element.removeEventListener(eventType, handler);
    }
    this.listeners = [];
  }

  destroy() {
    this.removeAllListeners();
    this.element = null;
    this.listeners = null;
  }
}

function processInChunks(items, processor, chunkSize = 100) {
  return new Promise((resolve) => {
    let index = 0;

    function processChunk() {
      const end = Math.min(index + chunkSize, items.length);

      while (index < end) {
        processor(items[index]);
        index++;
      }

      if (index < items.length) {
        setTimeout(processChunk, 0);
      } else {
        resolve();
      }
    }

    processChunk();
  });
}

function createLeakyHandlers() {
  const handlers = [];

  for (let i = 0; i < 1000; i++) {
    const largeData = new Array(10000).fill('x');

    handlers.push(() => {
      console.log('Handler ' + i);
    });
  }

  return handlers;
}

function createFixedHandlers() {
  const handlers = [];

  for (let i = 0; i < 1000; i++) {
    // Create handler in a separate scope without largeData
    handlers.push(createHandler(i));
  }

  return handlers;
}

function createHandler(index) {
  // largeData is created and immediately goes out of scope
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const largeData = new Array(10000).fill('x');
  // Process largeData here if needed, then let it be GC'd

  return () => {
    console.log('Handler ' + index);
  };
}`,
  testCases: [
    {
      input: [],
      expectedOutput: 42,
      description: 'createObjectCache caches computed results',
    },
    {
      input: [],
      expectedOutput: true,
      description: 'createObjectCache returns cached result on second call',
    },
    {
      input: [],
      expectedOutput: true,
      description: 'EventManager tracks and removes listeners correctly',
    },
    {
      input: [],
      expectedOutput: true,
      description: 'processInChunks processes all items',
    },
    {
      input: [],
      expectedOutput: 1000,
      description: 'createFixedHandlers returns correct number of handlers',
    },
  ],
  hints: [
    'WeakMap keys must be objects, and they allow garbage collection of the key object',
    'Always remove event listeners when components unmount or elements are removed',
    'Break large operations into chunks using setTimeout to avoid blocking the UI',
    'Closures capture variables by reference - avoid capturing large objects unnecessarily',
    'Set references to null in destroy methods to break reference chains',
    'Use separate functions to avoid closures capturing unintended variables',
  ],
};
