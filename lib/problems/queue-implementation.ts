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
  id: 'queue-implementation',
  title: 'Queue Implementation',
  difficulty: 'easy',
  category: 'Data Structures',
  description: `<h2>In-Depth Explanation</h2>

<p>A <strong>Queue</strong> is a fundamental data structure that follows the <strong>First-In-First-Out (FIFO)</strong> principle. Think of it like a line at a store - the first person who joins the line is the first person to be served. New people join at the back, and people leave from the front.</p>

<p>A queue supports these primary operations:</p>

<ul>
  <li><strong>enqueue(element)</strong>: Adds an element to the back of the queue</li>
  <li><strong>dequeue()</strong>: Removes and returns the front element from the queue</li>
  <li><strong>front()</strong>: Returns the front element without removing it</li>
</ul>

<p>Additional useful operations include:</p>

<ul>
  <li><strong>isEmpty()</strong>: Returns true if the queue has no elements</li>
  <li><strong>size()</strong>: Returns the number of elements in the queue</li>
</ul>

<h2>Importance</h2>

<p>Queues are essential data structures because:</p>

<ul>
  <li><strong>Task Scheduling</strong>: Operating systems use queues to schedule processes</li>
  <li><strong>Request Handling</strong>: Web servers queue incoming requests</li>
  <li><strong>Breadth-First Search</strong>: BFS algorithms rely on queues for traversal</li>
  <li><strong>Print Spooling</strong>: Print jobs are queued in order</li>
  <li><strong>Event Processing</strong>: Event loops process events in queue order</li>
  <li><strong>Message Queues</strong>: Distributed systems use message queues for communication</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Queues are used extensively in software development:</p>

<ul>
  <li><strong>Async Operations</strong>: JavaScript's event loop uses a task queue</li>
  <li><strong>Caching</strong>: LRU caches use queues to track access order</li>
  <li><strong>Rate Limiting</strong>: API rate limiters queue excess requests</li>
  <li><strong>Buffer Management</strong>: Streaming data uses queues as buffers</li>
  <li><strong>Level Order Traversal</strong>: Tree traversal algorithms use queues</li>
  <li><strong>Producer-Consumer</strong>: Multi-threaded applications use queues to pass data</li>
</ul>

<p><strong>Challenge:</strong> Implement a Queue class with enqueue, dequeue, front, isEmpty, and size methods. For better performance, use an object with head/tail indices instead of array shift operations.</p>`,
  examples: [
    {
      input: `const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.front();`,
      output: `1`,
      explanation: 'front() returns the first element (1) without removing it',
    },
    {
      input: `const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.dequeue();
queue.dequeue();`,
      output: `1, then 2`,
      explanation: 'dequeue() removes and returns elements in FIFO order',
    },
    {
      input: `const queue = new Queue();
queue.enqueue('a');
queue.enqueue('b');
queue.dequeue();
queue.enqueue('c');
queue.front();`,
      output: `'b'`,
      explanation: 'After dequeuing "a" and enqueuing "c", front is "b"',
    },
  ],
  starterCode: `class Queue<T> {
  private items: { [key: number]: T };
  private headIndex: number;
  private tailIndex: number;

  constructor() {
    // TODO: Initialize items object and head/tail indices
  }

  enqueue(element: T): void {
    // TODO: Add element to the back of the queue
    // Hint: Add at tailIndex, then increment tailIndex
  }

  dequeue(): T | undefined {
    // TODO: Remove and return the front element
    // Hint: Get item at headIndex, delete it, increment headIndex
    // Return undefined if queue is empty
  }

  front(): T | undefined {
    // TODO: Return the front element without removing it
    // Return undefined if queue is empty
  }

  isEmpty(): boolean {
    // TODO: Return true if queue has no elements
    // Hint: Compare headIndex with tailIndex
    return true;
  }

  size(): number {
    // TODO: Return the number of elements in the queue
    return 0;
  }
}

// Test your implementation
const queue = new Queue<string>();
queue.enqueue('first');
queue.enqueue('second');
queue.enqueue('third');
console.log('Front:', queue.front());
console.log('Dequeue:', queue.dequeue());
console.log('Size:', queue.size());
console.log('isEmpty:', queue.isEmpty());`,
  solution: `class Queue<T> {
  private items: { [key: number]: T };
  private headIndex: number;
  private tailIndex: number;

  constructor() {
    this.items = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  enqueue(element: T): void {
    this.items[this.tailIndex] = element;
    this.tailIndex++;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const item = this.items[this.headIndex];
    delete this.items[this.headIndex];
    this.headIndex++;
    return item;
  }

  front(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.headIndex];
  }

  isEmpty(): boolean {
    return this.headIndex === this.tailIndex;
  }

  size(): number {
    return this.tailIndex - this.headIndex;
  }
}

// Test your implementation
const queue = new Queue<string>();
queue.enqueue('first');
queue.enqueue('second');
queue.enqueue('third');
console.log('Front:', queue.front()); // 'first'
console.log('Dequeue:', queue.dequeue()); // 'first'
console.log('Size:', queue.size()); // 2
console.log('isEmpty:', queue.isEmpty()); // false`,
  testCases: [
    {
      input: { operations: ['enqueue:1', 'enqueue:2', 'enqueue:3', 'front'] },
      expectedOutput: 1,
      description: 'front() returns first element without removing it',
    },
    {
      input: { operations: ['enqueue:1', 'enqueue:2', 'dequeue', 'dequeue'] },
      expectedOutput: [1, 2],
      description: 'dequeue() removes and returns elements in FIFO order',
    },
    {
      input: { operations: ['enqueue:a', 'enqueue:b', 'dequeue', 'enqueue:c', 'front'] },
      expectedOutput: 'b',
      description: 'After dequeue and enqueue, front is the next element',
    },
    {
      input: { operations: ['isEmpty'] },
      expectedOutput: true,
      description: 'isEmpty() returns true for empty queue',
    },
    {
      input: { operations: ['enqueue:1', 'enqueue:2', 'size'] },
      expectedOutput: 2,
      description: 'size() returns correct count',
    },
  ],
  hints: [
    'Using an object with indices is O(1) for both enqueue and dequeue, unlike array.shift() which is O(n)',
    'Track headIndex (front of queue) and tailIndex (where next element will be added)',
    'The queue is empty when headIndex equals tailIndex',
    'Delete the item from the object after dequeue to prevent memory leaks',
  ],
};
