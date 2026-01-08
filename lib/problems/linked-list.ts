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
console.log('After insertAfter:', list.toArray());`,
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

    if (this.head === null) {
      // Empty list
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Add to end
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  prepend(value: T): void {
    const newNode = new ListNode(value);

    if (this.head === null) {
      // Empty list
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Add to beginning
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
  }

  delete(value: T): boolean {
    if (this.head === null) {
      return false;
    }

    // If head needs to be deleted
    if (this.head.value === value) {
      this.head = this.head.next;
      this.length--;

      // If list is now empty, update tail
      if (this.head === null) {
        this.tail = null;
      }

      return true;
    }

    // Search for node to delete
    let current = this.head;
    while (current.next !== null) {
      if (current.next.value === value) {
        // Found node to delete
        current.next = current.next.next;
        this.length--;

        // If we deleted the tail, update it
        if (current.next === null) {
          this.tail = current;
        }

        return true;
      }
      current = current.next;
    }

    return false;
  }

  find(value: T): ListNode<T> | null {
    let current = this.head;

    while (current !== null) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }

    return null;
  }

  insertAfter(existingValue: T, newValue: T): boolean {
    const existingNode = this.find(existingValue);

    if (existingNode === null) {
      return false;
    }

    const newNode = new ListNode(newValue);
    newNode.next = existingNode.next;
    existingNode.next = newNode;
    this.length++;

    // If inserting after tail, update tail
    if (existingNode === this.tail) {
      this.tail = newNode;
    }

    return true;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;

    while (current !== null) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  getLength(): number {
    return this.length;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  getHead(): T | null {
    return this.head ? this.head.value : null;
  }

  getTail(): T | null {
    return this.tail ? this.tail.value : null;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}

// Test the implementation
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
console.log('List:', list.toArray()); // [1, 2, 3]
list.prepend(0);
console.log('After prepend:', list.toArray()); // [0, 1, 2, 3]
list.delete(2);
console.log('After delete:', list.toArray()); // [0, 1, 3]
list.insertAfter(1, 1.5);
console.log('After insertAfter:', list.toArray()); // [0, 1, 1.5, 3]
console.log('Length:', list.getLength()); // 4
console.log('Find 1.5:', list.find(1.5)); // ListNode { value: 1.5, next: ListNode }
console.log('Head:', list.getHead()); // 0
console.log('Tail:', list.getTail()); // 3`,
  testCases: [
    {
      input: { operations: ['append(1)', 'append(2)', 'append(3)', 'toArray()'] },
      expectedOutput: [1, 2, 3],
      description: 'append() adds elements to the end of the list',
    },
    {
      input: { operations: ['append(2)', 'prepend(1)', 'toArray()'] },
      expectedOutput: [1, 2],
      description: 'prepend() adds elements to the beginning of the list',
    },
    {
      input: { operations: ['append(1)', 'append(2)', 'append(3)', 'delete(2)', 'toArray()'] },
      expectedOutput: [1, 3],
      description: 'delete() removes the first node with the given value',
    },
    {
      input: { operations: ['append(1)', 'append(2)', 'find(2)'] },
      expectedOutput: { value: 2, next: null },
      description: 'find() returns the node with the given value',
    },
    {
      input: { operations: ['append(1)', 'append(3)', 'insertAfter(1, 2)', 'toArray()'] },
      expectedOutput: [1, 2, 3],
      description: 'insertAfter() inserts a new node after the specified value',
    },
    {
      input: { operations: ['append(1)', 'append(2)', 'getLength()'] },
      expectedOutput: 2,
      description: 'getLength() returns the number of nodes',
    },
    {
      input: { operations: ['append(1)', 'delete(1)', 'isEmpty()'] },
      expectedOutput: true,
      description: 'isEmpty() returns true for empty list',
    },
    {
      input: { operations: ['append(1)', 'append(2)', 'delete(2)', 'getTail()'] },
      expectedOutput: 1,
      description: 'delete() updates tail when deleting last element',
    },
  ],
  hints: [
    'Always handle edge cases: empty list, single element list, and operations on head/tail',
    'When deleting, you need to find the node BEFORE the one you want to delete to update its next pointer',
    'Keep track of both head and tail pointers for O(1) append operations',
    'When inserting after a node, remember to update the tail pointer if inserting after the current tail',
  ],
};
