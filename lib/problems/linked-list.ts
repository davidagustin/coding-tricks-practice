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
  id: 'linked-list',
  title: 'Singly Linked List Implementation',
  difficulty: 'medium',
  category: 'Data Structures',
  description: `<h2>In-Depth Explanation</h2>

<p>A <strong>Singly Linked List</strong> is a linear data structure where elements are stored in nodes, and each node points to the next node in the sequence. Unlike arrays, linked list elements are not stored in contiguous memory locations. Each node contains two parts: <strong>data</strong> (the value) and <strong>next</strong> (a reference to the next node).</p>

<p>Key operations for a linked list include:</p>

<ul>
  <li><strong>append(value)</strong>: Add a node to the end of the list</li>
  <li><strong>prepend(value)</strong>: Add a node to the beginning of the list</li>
  <li><strong>delete(value)</strong>: Remove the first node with the given value</li>
  <li><strong>find(value)</strong>: Find and return a node with the given value</li>
  <li><strong>insertAfter(value, newValue)</strong>: Insert a new node after a node with given value</li>
  <li><strong>toArray()</strong>: Convert the linked list to an array for easy viewing</li>
</ul>

<h2>Importance</h2>

<p>Linked Lists are important data structures because:</p>

<ul>
  <li><strong>Dynamic Size</strong>: Unlike arrays, linked lists can grow and shrink dynamically</li>
  <li><strong>Efficient Insertions/Deletions</strong>: O(1) insertion/deletion at known positions vs O(n) for arrays</li>
  <li><strong>Memory Efficiency</strong>: No pre-allocation needed, memory is used as needed</li>
  <li><strong>Foundation for Other Structures</strong>: Stacks, queues, and graphs can be implemented using linked lists</li>
  <li><strong>No Memory Waste</strong>: Only allocates memory for existing elements</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Linked Lists are used in many real-world applications:</p>

<ul>
  <li><strong>Music Playlists</strong>: Songs linked together, easy to add/remove songs</li>
  <li><strong>Browser History</strong>: Forward and back navigation between pages</li>
  <li><strong>Image Viewers</strong>: Previous and next image navigation</li>
  <li><strong>Memory Allocation</strong>: Free memory blocks are tracked using linked lists</li>
  <li><strong>Polynomial Representation</strong>: Mathematical polynomials can be represented as linked lists</li>
  <li><strong>Hash Table Chaining</strong>: Collision resolution using separate chaining</li>
  <li><strong>Undo Functionality</strong>: Combined with stacks for undo operations</li>
</ul>

<p><strong>Challenge:</strong> Implement a singly linked list with Node and LinkedList classes supporting append, prepend, delete, find, insertAfter, and toArray operations.</p>`,
  examples: [
    {
      input: `const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.toArray();`,
      output: `[1, 2, 3]`,
      explanation: 'append() adds elements to the end of the list',
    },
    {
      input: `const list = new LinkedList();
list.append(2);
list.prepend(1);
list.append(3);
list.toArray();`,
      output: `[1, 2, 3]`,
      explanation: 'prepend() adds elements to the beginning of the list',
    },
    {
      input: `const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.delete(2);
list.toArray();`,
      output: `[1, 3]`,
      explanation: 'delete() removes the node with value 2',
    },
  ],
  starterCode: `class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    // TODO: Initialize value and next
  }
}

class LinkedList<T> {
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;
  private length: number;

  constructor() {
    // TODO: Initialize head, tail, and length
  }

  append(value: T): void {
    // TODO: Add a new node to the end of the list
    // Consider: What if the list is empty?
  }

  prepend(value: T): void {
    // TODO: Add a new node to the beginning of the list
    // Consider: What if the list is empty?
  }

  delete(value: T): boolean {
    // TODO: Delete the first node with the given value
    // Return true if deleted, false if not found
    // Consider: Deleting head, tail, or middle node
    return false;
  }

  find(value: T): ListNode<T> | null {
    // TODO: Find and return the node with the given value
    // Return null if not found
    return null;
  }

  insertAfter(existingValue: T, newValue: T): boolean {
    // TODO: Insert a new node after the node with existingValue
    // Return true if inserted, false if existingValue not found
    return false;
  }

  toArray(): T[] {
    // TODO: Convert the linked list to an array
    return [];
  }

  getLength(): number {
    return this.length;
  }
}

// Test your implementation
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
console.log('List:', list.toArray());
list.prepend(0);
console.log('After prepend:', list.toArray());
list.delete(2);
console.log('After delete:', list.toArray());
list.insertAfter(1, 1.5);
console.log('After insertAfter:', list.toArray());

// Helper functions for testing
function listAppend(values: number[]): number[] {
  const list = new LinkedList<number>();
  for (const v of values) list.append(v);
  return list.toArray();
}

function listPrepend(values: number[]): number[] {
  const list = new LinkedList<number>();
  for (const v of values) list.prepend(v);
  return list.toArray();
}

function listDelete(values: number[], deleteValue: number): number[] {
  const list = new LinkedList<number>();
  for (const v of values) list.append(v);
  list.delete(deleteValue);
  return list.toArray();
}

function listInsertAfter(values: number[], existingValue: number, newValue: number): number[] {
  const list = new LinkedList<number>();
  for (const v of values) list.append(v);
  list.insertAfter(existingValue, newValue);
  return list.toArray();
}`,
  solution: `class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList<T> {
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;
  private length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: T): void {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  prepend(value: T): void {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  delete(value: T): boolean {
    if (!this.head) return false;

    if (this.head.value === value) {
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.length--;
      return true;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        if (current.next === this.tail) {
          this.tail = current;
        }
        current.next = current.next.next;
        this.length--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  find(value: T): ListNode<T> | null {
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  insertAfter(existingValue: T, newValue: T): boolean {
    const node = this.find(existingValue);
    if (!node) return false;

    const newNode = new ListNode(newValue);
    newNode.next = node.next;
    node.next = newNode;
    if (node === this.tail) {
      this.tail = newNode;
    }
    this.length++;
    return true;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  getLength(): number {
    return this.length;
  }
}

// Test your implementation
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
console.log('List:', list.toArray());
list.prepend(0);
console.log('After prepend:', list.toArray());
list.delete(2);
console.log('After delete:', list.toArray());
list.insertAfter(1, 1.5);
console.log('After insertAfter:', list.toArray());

// Helper functions for testing
function listAppend(values: number[]): number[] {
  const list = new LinkedList<number>();
  for (const v of values) list.append(v);
  return list.toArray();
}

function listPrepend(values: number[]): number[] {
  const list = new LinkedList<number>();
  for (const v of values) list.prepend(v);
  return list.toArray();
}

function listDelete(values: number[], deleteValue: number): number[] {
  const list = new LinkedList<number>();
  for (const v of values) list.append(v);
  list.delete(deleteValue);
  return list.toArray();
}

function listInsertAfter(values: number[], existingValue: number, newValue: number): number[] {
  const list = new LinkedList<number>();
  for (const v of values) list.append(v);
  list.insertAfter(existingValue, newValue);
  return list.toArray();
}`,
  testCases: [
    {
      input: [[1, 2, 3]],
      expectedOutput: [1, 2, 3],
      description: 'listAppend adds elements to the end',
    },
    {
      input: [[1, 2, 3]],
      expectedOutput: [3, 2, 1],
      description: 'listPrepend adds elements to the beginning',
    },
    {
      input: [[1, 2, 3], 2],
      expectedOutput: [1, 3],
      description: 'listDelete removes the specified value',
    },
    {
      input: [[1, 3], 1, 2],
      expectedOutput: [1, 2, 3],
      description: 'listInsertAfter inserts after the specified value',
    },
  ],
  hints: [
    'Always handle edge cases: empty list, single element list, and operations on head/tail',
    'When deleting, you need to find the node BEFORE the one you want to delete to update its next pointer',
    'Keep track of both head and tail pointers for O(1) append operations',
    'When inserting after a node, remember to update the tail pointer if inserting after the current tail',
  ],
};
