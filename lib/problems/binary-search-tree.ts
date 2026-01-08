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
  id: 'binary-search-tree',
  title: 'Binary Search Tree Implementation',
  difficulty: 'hard',
  category: 'Data Structures',
  description: `<h2>In-Depth Explanation</h2>

<p>A <strong>Binary Search Tree (BST)</strong> is a hierarchical data structure where each node has at most two children (left and right). The BST property states that for every node: all values in its left subtree are less than the node's value, and all values in its right subtree are greater than the node's value.</p>

<p>Key operations for a BST include:</p>

<ul>
  <li><strong>insert(value)</strong>: Add a new value while maintaining BST property</li>
  <li><strong>search(value)</strong>: Find if a value exists in the tree</li>
  <li><strong>delete(value)</strong>: Remove a value while maintaining BST property</li>
  <li><strong>inOrderTraversal()</strong>: Visit nodes in sorted order (left, root, right)</li>
  <li><strong>preOrderTraversal()</strong>: Visit root before children (root, left, right)</li>
  <li><strong>postOrderTraversal()</strong>: Visit root after children (left, right, root)</li>
  <li><strong>findMin()</strong>: Find the minimum value (leftmost node)</li>
  <li><strong>findMax()</strong>: Find the maximum value (rightmost node)</li>
</ul>

<h2>Importance</h2>

<p>Binary Search Trees are crucial data structures because:</p>

<ul>
  <li><strong>Efficient Search</strong>: O(log n) average case search time</li>
  <li><strong>Ordered Data</strong>: In-order traversal gives sorted elements</li>
  <li><strong>Dynamic Operations</strong>: Efficient insertion and deletion</li>
  <li><strong>Foundation for Advanced Trees</strong>: AVL trees, Red-Black trees build on BST concepts</li>
  <li><strong>Range Queries</strong>: Efficiently find all values in a given range</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>BSTs are used in many real-world applications:</p>

<ul>
  <li><strong>Database Indexing</strong>: B-trees (variants of BST) index database records</li>
  <li><strong>File Systems</strong>: Organize files and directories hierarchically</li>
  <li><strong>Auto-complete</strong>: Prefix trees for word suggestions</li>
  <li><strong>Expression Parsing</strong>: Abstract syntax trees in compilers</li>
  <li><strong>Priority Scheduling</strong>: Organizing tasks by priority</li>
  <li><strong>Symbol Tables</strong>: Compilers use BSTs for variable lookup</li>
  <li><strong>Game Development</strong>: Decision trees for AI behavior</li>
</ul>

<h2>Time Complexity</h2>

<table>
  <tr><th>Operation</th><th>Average Case</th><th>Worst Case</th></tr>
  <tr><td>Search</td><td>O(log n)</td><td>O(n)</td></tr>
  <tr><td>Insert</td><td>O(log n)</td><td>O(n)</td></tr>
  <tr><td>Delete</td><td>O(log n)</td><td>O(n)</td></tr>
</table>

<p><em>Note: Worst case occurs when tree becomes unbalanced (like a linked list)</em></p>

<p><strong>Challenge:</strong> Implement a Binary Search Tree with insert, search, delete, and traversal methods.</p>`,
  examples: [
    {
      input: `const bst = new BinarySearchTree();
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(1);
bst.insert(4);
bst.inOrderTraversal();`,
      output: `[1, 3, 4, 5, 7]`,
      explanation: 'In-order traversal returns elements in sorted order',
    },
    {
      input: `const bst = new BinarySearchTree();
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.search(3);
bst.search(10);`,
      output: `true, false`,
      explanation: 'search() returns true if value exists, false otherwise',
    },
    {
      input: `const bst = new BinarySearchTree();
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.delete(3);
bst.inOrderTraversal();`,
      output: `[5, 7]`,
      explanation: 'delete() removes the node and maintains BST property',
    },
  ],
  starterCode: `class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(value: T) {
    // TODO: Initialize value, left, and right
  }
}

class BinarySearchTree<T> {
  private root: TreeNode<T> | null;

  constructor() {
    // TODO: Initialize root
  }

  insert(value: T): void {
    // TODO: Insert a new value into the BST
    // If tree is empty, create root
    // Otherwise, find correct position (left if smaller, right if larger)
  }

  private insertNode(node: TreeNode<T>, value: T): void {
    // TODO: Helper method to recursively insert
    // Compare value with node.value
    // Go left if smaller, right if larger
  }

  search(value: T): boolean {
    // TODO: Search for a value in the BST
    // Return true if found, false otherwise
    return false;
  }

  private searchNode(node: TreeNode<T> | null, value: T): boolean {
    // TODO: Helper method to recursively search
    return false;
  }

  delete(value: T): void {
    // TODO: Delete a value from the BST
    // Handle three cases:
    // 1. Node has no children (leaf) - just remove
    // 2. Node has one child - replace with child
    // 3. Node has two children - replace with in-order successor
  }

  private deleteNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    // TODO: Helper method to recursively delete
    return null;
  }

  private findMinNode(node: TreeNode<T>): TreeNode<T> {
    // TODO: Find the leftmost (minimum) node
    return node;
  }

  inOrderTraversal(): T[] {
    // TODO: Return array of values in sorted order
    // Visit: left subtree, root, right subtree
    return [];
  }

  preOrderTraversal(): T[] {
    // TODO: Return array of values in pre-order
    // Visit: root, left subtree, right subtree
    return [];
  }

  postOrderTraversal(): T[] {
    // TODO: Return array of values in post-order
    // Visit: left subtree, right subtree, root
    return [];
  }

  findMin(): T | null {
    // TODO: Return the minimum value in the BST
    return null;
  }

  findMax(): T | null {
    // TODO: Return the maximum value in the BST
    return null;
  }
}

// Test your implementation
const bst = new BinarySearchTree<number>();
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(1);
bst.insert(4);
bst.insert(6);
bst.insert(8);
console.log('In-order:', bst.inOrderTraversal());
console.log('Search 4:', bst.search(4));
console.log('Min:', bst.findMin());
console.log('Max:', bst.findMax());
bst.delete(3);
console.log('After delete 3:', bst.inOrderTraversal());`,
  solution: `class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree<T> {
  private root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  insert(value: T): void {
    const newNode = new TreeNode(value);

    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, value);
    }
  }

  private insertNode(node: TreeNode<T>, value: T): void {
    if (value < node.value) {
      if (!node.left) {
        node.left = new TreeNode(value);
      } else {
        this.insertNode(node.left, value);
      }
    } else {
      if (!node.right) {
        node.right = new TreeNode(value);
      } else {
        this.insertNode(node.right, value);
      }
    }
  }

  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: TreeNode<T> | null, value: T): boolean {
    if (!node) {
      return false;
    }

    if (value === node.value) {
      return true;
    }

    if (value < node.value) {
      return this.searchNode(node.left, value);
    }

    return this.searchNode(node.right, value);
  }

  delete(value: T): void {
    this.root = this.deleteNode(this.root, value);
  }

  private deleteNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (!node) {
      return null;
    }

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
      return node;
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
      return node;
    }

    // Found the node to delete
    // Case 1: Leaf node
    if (!node.left && !node.right) {
      return null;
    }

    // Case 2: One child
    if (!node.left) {
      return node.right;
    }
    if (!node.right) {
      return node.left;
    }

    // Case 3: Two children
    // Find in-order successor (smallest in right subtree)
    const successor = this.findMinNode(node.right);
    node.value = successor.value;
    node.right = this.deleteNode(node.right, successor.value);
    return node;
  }

  private findMinNode(node: TreeNode<T>): TreeNode<T> {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  inOrderTraversal(): T[] {
    const result: T[] = [];
    this.inOrderHelper(this.root, result);
    return result;
  }

  private inOrderHelper(node: TreeNode<T> | null, result: T[]): void {
    if (node) {
      this.inOrderHelper(node.left, result);
      result.push(node.value);
      this.inOrderHelper(node.right, result);
    }
  }

  preOrderTraversal(): T[] {
    const result: T[] = [];
    this.preOrderHelper(this.root, result);
    return result;
  }

  private preOrderHelper(node: TreeNode<T> | null, result: T[]): void {
    if (node) {
      result.push(node.value);
      this.preOrderHelper(node.left, result);
      this.preOrderHelper(node.right, result);
    }
  }

  postOrderTraversal(): T[] {
    const result: T[] = [];
    this.postOrderHelper(this.root, result);
    return result;
  }

  private postOrderHelper(node: TreeNode<T> | null, result: T[]): void {
    if (node) {
      this.postOrderHelper(node.left, result);
      this.postOrderHelper(node.right, result);
      result.push(node.value);
    }
  }

  findMin(): T | null {
    if (!this.root) return null;
    return this.findMinNode(this.root).value;
  }

  findMax(): T | null {
    if (!this.root) return null;
    let current = this.root;
    while (current.right) {
      current = current.right;
    }
    return current.value;
  }
}

// Test your implementation
const bst = new BinarySearchTree<number>();
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(1);
bst.insert(4);
bst.insert(6);
bst.insert(8);
console.log('In-order:', bst.inOrderTraversal()); // [1, 3, 4, 5, 6, 7, 8]
console.log('Search 4:', bst.search(4)); // true
console.log('Min:', bst.findMin()); // 1
console.log('Max:', bst.findMax()); // 8
bst.delete(3);
console.log('After delete 3:', bst.inOrderTraversal()); // [1, 4, 5, 6, 7, 8]`,
  testCases: [
    {
      input: { operations: ['insert', 'insert', 'insert', 'inOrderTraversal'], values: [2, 1, 3] },
      expectedOutput: [1, 2, 3],
      description: 'inOrderTraversal() returns sorted values',
    },
    {
      input: { operations: ['insert', 'insert', 'insert', 'search', 'search'], values: [5, 3, 7, 3, 10] },
      expectedOutput: [true, false],
      description: 'search() correctly finds/does not find values',
    },
    {
      input: { operations: ['insert', 'insert', 'insert', 'findMin', 'findMax'], values: [5, 2, 8] },
      expectedOutput: [2, 8],
      description: 'findMin() and findMax() return correct values',
    },
    {
      input: { operations: ['insert', 'insert', 'insert', 'delete', 'inOrderTraversal'], values: [5, 3, 7, 5] },
      expectedOutput: [3, 7],
      description: 'delete() correctly removes node with two children',
    },
    {
      input: { operations: ['insert', 'insert', 'insert', 'preOrderTraversal'], values: [5, 3, 7] },
      expectedOutput: [5, 3, 7],
      description: 'preOrderTraversal() visits root first',
    },
  ],
  hints: [
    'For insertion, compare with current node: go left if smaller, right if larger, until you find an empty spot',
    'For deletion with two children, find the in-order successor (smallest value in right subtree) and replace',
    'In-order traversal of a BST always produces sorted output - use this to verify your tree is correct',
    'Use recursion for most operations - the tree structure naturally lends itself to recursive solutions',
  ],
};
