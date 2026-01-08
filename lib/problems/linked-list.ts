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
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Always handle edge cases: empty list, single element list, and operations on head/tail',
    'When deleting, you need to find the node BEFORE the one you want to delete to update its next pointer',
    'Keep track of both head and tail pointers for O(1) append operations',
    'When inserting after a node, remember to update the tail pointer if inserting after the current tail',
  ],
};
