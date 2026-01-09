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
  id: 'stack-implementation',
  title: 'Stack Implementation',
  difficulty: 'easy',
  category: 'Data Structures',
  description: `<h2>In-Depth Explanation</h2>

<p>A <strong>Stack</strong> is a fundamental data structure that follows the <strong>Last-In-First-Out (LIFO)</strong> principle. Think of it like a stack of plates - you can only add or remove plates from the top. The last plate you put on the stack is the first one you take off.</p>

<p>A stack supports three primary operations:</p>

<ul>
  <li><strong>push(element)</strong>: Adds an element to the top of the stack</li>
  <li><strong>pop()</strong>: Removes and returns the top element from the stack</li>
  <li><strong>peek()</strong>: Returns the top element without removing it</li>
</ul>

<p>Additional useful operations include:</p>

<ul>
  <li><strong>isEmpty()</strong>: Returns true if the stack has no elements</li>
  <li><strong>size()</strong>: Returns the number of elements in the stack</li>
</ul>

<h2>Importance</h2>

<p>Stacks are essential data structures because:</p>

<ul>
  <li><strong>Function Call Stack</strong>: Programming languages use stacks to manage function calls and returns</li>
  <li><strong>Undo Operations</strong>: Text editors use stacks to implement undo/redo functionality</li>
  <li><strong>Expression Evaluation</strong>: Compilers use stacks to evaluate mathematical expressions</li>
  <li><strong>Bracket Matching</strong>: Stacks verify balanced parentheses in code</li>
  <li><strong>Backtracking Algorithms</strong>: DFS, maze solving, and other algorithms rely on stacks</li>
  <li><strong>Browser History</strong>: The back button uses a stack to track visited pages</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Stacks are used extensively in software development:</p>

<ul>
  <li><strong>Parsing</strong>: Syntax parsing in compilers and interpreters</li>
  <li><strong>Memory Management</strong>: Stack-based memory allocation</li>
  <li><strong>Recursion Simulation</strong>: Converting recursive algorithms to iterative ones</li>
  <li><strong>Path Finding</strong>: Depth-first search and maze algorithms</li>
  <li><strong>Expression Conversion</strong>: Infix to postfix notation conversion</li>
  <li><strong>State Management</strong>: Managing application state history</li>
</ul>

<p><strong>Challenge:</strong> Implement a Stack class with push, pop, peek, isEmpty, and size methods using an array as the underlying storage.</p>`,
  examples: [
    {
      input: `const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.peek();`,
      output: `3`,
      explanation: 'peek() returns the top element (3) without removing it',
    },
    {
      input: `const stack = new Stack();
stack.push(1);
stack.push(2);
stack.pop();
stack.pop();`,
      output: `2, then 1`,
      explanation: 'pop() removes and returns elements in LIFO order',
    },
    {
      input: `const stack = new Stack();
stack.isEmpty();
stack.push(5);
stack.isEmpty();`,
      output: `true, then false`,
      explanation: 'isEmpty() returns true when stack has no elements',
    },
  ],
  starterCode: `class Stack<T> {
  private items: T[];

  constructor() {
    // TODO: Initialize the items array
  }

  push(element: T): void {
    // TODO: Add element to the top of the stack
  }

  pop(): T | undefined {
    // TODO: Remove and return the top element
    // Return undefined if stack is empty
  }

  peek(): T | undefined {
    // TODO: Return the top element without removing it
    // Return undefined if stack is empty
  }

  isEmpty(): boolean {
    // TODO: Return true if stack has no elements
    return true;
  }

  size(): number {
    // TODO: Return the number of elements in the stack
    return 0;
  }
}

// Test your implementation
const stack = new Stack<number>();
stack.push(10);
stack.push(20);
stack.push(30);
console.log('Peek:', stack.peek());
console.log('Pop:', stack.pop());
console.log('Size:', stack.size());
console.log('isEmpty:', stack.isEmpty());

// Helper functions for testing
function stackPeek(values: number[]): number | undefined {
  const stack = new Stack<number>();
  for (const v of values) stack.push(v);
  return stack.peek();
}

function stackPop(values: number[]): number | undefined {
  const stack = new Stack<number>();
  for (const v of values) stack.push(v);
  return stack.pop();
}

function stackSize(values: number[]): number {
  const stack = new Stack<number>();
  for (const v of values) stack.push(v);
  return stack.size();
}

function stackIsEmpty(values: number[]): boolean {
  const stack = new Stack<number>();
  for (const v of values) stack.push(v);
  return stack.isEmpty();
}`,
  solution: `class Stack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  push(element: T): void {
    this.items.push(element);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// Test your implementation
const stack = new Stack<number>();
stack.push(10);
stack.push(20);
stack.push(30);
console.log('Peek:', stack.peek());
console.log('Pop:', stack.pop());
console.log('Size:', stack.size());
console.log('isEmpty:', stack.isEmpty());

// Helper functions for testing
function stackPeek(values: number[]): number | undefined {
  const stack = new Stack<number>();
  for (const v of values) stack.push(v);
  return stack.peek();
}

function stackPop(values: number[]): number | undefined {
  const stack = new Stack<number>();
  for (const v of values) stack.push(v);
  return stack.pop();
}

function stackSize(values: number[]): number {
  const stack = new Stack<number>();
  for (const v of values) stack.push(v);
  return stack.size();
}

function stackIsEmpty(values: number[]): boolean {
  const stack = new Stack<number>();
  for (const v of values) stack.push(v);
  return stack.isEmpty();
}`,
  testCases: [
    {
      input: [[10, 20]],
      expectedOutput: 20,
      description: 'stackPeek returns top element without removing it',
    },
    {
      input: [[10, 20]],
      expectedOutput: 20,
      description: 'stackPop returns and removes top element',
    },
    {
      input: [[10, 20, 30]],
      expectedOutput: 3,
      description: 'stackSize returns correct count',
    },
    {
      input: [[]],
      expectedOutput: true,
      description: 'stackIsEmpty returns true for empty stack',
    },
    {
      input: [[5]],
      expectedOutput: false,
      description: 'stackIsEmpty returns false for non-empty stack',
    },
  ],
  hints: [
    'Use an array as the underlying storage - arrays already have push() and pop() methods that work in O(1) time',
    'For peek(), access the last element using items[items.length - 1] without modifying the array',
    'Always check if the stack is empty before trying to pop or peek to avoid errors',
    'The size() method simply returns the length of the internal array',
  ],
};
