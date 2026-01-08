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
  id: 'depth-first-search',
  title: 'Depth-First Search (DFS)',
  difficulty: 'medium',
  category: 'Algorithms',
  description: `<h2>In-Depth Explanation</h2>

<p>Depth-First Search (DFS) is a fundamental graph/tree traversal algorithm that explores as far as possible along each branch before backtracking. It goes "deep" into a path before exploring alternatives.</p>

<p>DFS can be implemented in two ways:</p>

<h3>1. Recursive Approach</h3>
<ol>
  <li>Visit the current node</li>
  <li>Mark it as visited</li>
  <li>Recursively visit all unvisited neighbors</li>
</ol>

<h3>2. Iterative Approach (using Stack)</h3>
<ol>
  <li>Push starting node onto stack</li>
  <li>While stack is not empty:</li>
  <li>Pop a node, visit it if not visited</li>
  <li>Push all unvisited neighbors onto stack</li>
</ol>

<h2>Time and Space Complexity</h2>

<ul>
  <li><strong>Time Complexity</strong>: O(V + E) where V = vertices, E = edges</li>
  <li><strong>Space Complexity</strong>: O(V) for the visited set and recursion stack</li>
</ul>

<h2>Tree Traversal Orders</h2>

<p>For binary trees, DFS has three main variations:</p>
<ul>
  <li><strong>Pre-order</strong>: Visit node, then left subtree, then right subtree</li>
  <li><strong>In-order</strong>: Visit left subtree, then node, then right subtree</li>
  <li><strong>Post-order</strong>: Visit left subtree, then right subtree, then node</li>
</ul>

<h2>Importance</h2>

<p>DFS is essential because:</p>

<ul>
  <li><strong>Path Finding</strong>: Finding paths between nodes in graphs</li>
  <li><strong>Cycle Detection</strong>: Detecting cycles in directed/undirected graphs</li>
  <li><strong>Topological Sorting</strong>: Ordering tasks with dependencies</li>
  <li><strong>Connected Components</strong>: Finding all connected components</li>
  <li><strong>Maze Solving</strong>: Exploring all possible paths</li>
</ul>

<h2>Practical Applications</h2>

<ul>
  <li><strong>File System Traversal</strong>: Exploring directory structures</li>
  <li><strong>Web Crawling</strong>: Following links to discover pages</li>
  <li><strong>Puzzle Solving</strong>: Sudoku, N-Queens, maze solving</li>
  <li><strong>Syntax Trees</strong>: Parsing and evaluating expressions</li>
  <li><strong>Social Networks</strong>: Finding connection paths between users</li>
  <li><strong>Game AI</strong>: Exploring game state trees</li>
  <li><strong>Garbage Collection</strong>: Mark-and-sweep algorithm</li>
</ul>

<p><strong>Challenge:</strong> Implement DFS for both graphs and binary trees.</p>`,
  examples: [
    {
      input: `dfsGraph({A: ['B','C'], B: ['D'], C: ['E'], D: [], E: []}, 'A')`,
      output: `['A', 'B', 'D', 'C', 'E']`,
      explanation: 'DFS explores A, then goes deep into B->D, backtracks, then C->E',
    },
    {
      input: `dfsTree(root) // tree: 1 -> [2,3], 2 -> [4,5]`,
      output: `[1, 2, 4, 5, 3]`,
      explanation: 'Pre-order DFS: visit node, then left, then right',
    },
    {
      input: `dfsIterative({A: ['B','C'], B: ['D'], C: [], D: []}, 'A')`,
      output: `['A', 'C', 'B', 'D']`,
      explanation: 'Stack-based DFS may visit in different order',
    },
  ],
  starterCode: `// Graph represented as adjacency list
type Graph = { [key: string]: string[] };

// Binary tree node
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

// TODO: Implement recursive DFS for graphs
function dfsGraphRecursive(
  graph: Graph,
  start: string,
  visited: Set<string> = new Set()
): string[] {
  // Mark current node as visited
  // Add to result
  // Recursively visit all unvisited neighbors

  return [];
}

// TODO: Implement iterative DFS for graphs using a stack
function dfsGraphIterative(graph: Graph, start: string): string[] {
  // Create visited set and stack
  // Push start node onto stack
  // While stack not empty:
  //   Pop node, if not visited: visit it, push neighbors

  return [];
}

// TODO: Implement DFS for binary tree (pre-order traversal)
function dfsTreePreOrder(root: TreeNode | null): number[] {
  // Base case: null node
  // Visit current node
  // Recursively visit left then right

  return [];
}

// TODO: Implement DFS for binary tree (in-order traversal)
function dfsTreeInOrder(root: TreeNode | null): number[] {
  // Visit left, then current, then right

  return [];
}

// Test cases
const graph: Graph = {
  'A': ['B', 'C'],
  'B': ['D', 'E'],
  'C': ['F'],
  'D': [],
  'E': [],
  'F': []
};

console.log(dfsGraphRecursive(graph, 'A'));
// Expected: ['A', 'B', 'D', 'E', 'C', 'F']

// Create a simple binary tree:
//       1
//      / \\
//     2   3
//    / \\
//   4   5
const tree: TreeNode = {
  val: 1,
  left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } },
  right: { val: 3, left: null, right: null }
};

console.log(dfsTreePreOrder(tree));
// Expected: [1, 2, 4, 5, 3]`,
  solution: `type Graph = { [key: string]: string[] };

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

// Recursive DFS for graphs
function dfsGraphRecursive(
  graph: Graph,
  start: string,
  visited: Set<string> = new Set()
): string[] {
  const result: string[] = [];

  function dfs(node: string): void {
    // Mark as visited
    visited.add(node);
    result.push(node);

    // Visit all unvisited neighbors
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
  }

  dfs(start);
  return result;
}

// Iterative DFS for graphs using stack
function dfsGraphIterative(graph: Graph, start: string): string[] {
  const result: string[] = [];
  const visited = new Set<string>();
  const stack: string[] = [start];

  while (stack.length > 0) {
    const node = stack.pop()!;

    if (!visited.has(node)) {
      visited.add(node);
      result.push(node);

      // Add neighbors to stack (reverse order to maintain left-to-right visiting)
      const neighbors = graph[node] || [];
      for (let i = neighbors.length - 1; i >= 0; i--) {
        if (!visited.has(neighbors[i])) {
          stack.push(neighbors[i]);
        }
      }
    }
  }

  return result;
}

// DFS Pre-order: Node -> Left -> Right
function dfsTreePreOrder(root: TreeNode | null): number[] {
  const result: number[] = [];

  function dfs(node: TreeNode | null): void {
    if (node === null) return;

    result.push(node.val);      // Visit node
    dfs(node.left);             // Visit left subtree
    dfs(node.right);            // Visit right subtree
  }

  dfs(root);
  return result;
}

// DFS In-order: Left -> Node -> Right
function dfsTreeInOrder(root: TreeNode | null): number[] {
  const result: number[] = [];

  function dfs(node: TreeNode | null): void {
    if (node === null) return;

    dfs(node.left);             // Visit left subtree
    result.push(node.val);      // Visit node
    dfs(node.right);            // Visit right subtree
  }

  dfs(root);
  return result;
}

// DFS Post-order: Left -> Right -> Node
function dfsTreePostOrder(root: TreeNode | null): number[] {
  const result: number[] = [];

  function dfs(node: TreeNode | null): void {
    if (node === null) return;

    dfs(node.left);             // Visit left subtree
    dfs(node.right);            // Visit right subtree
    result.push(node.val);      // Visit node
  }

  dfs(root);
  return result;
}

// Test
const graph: Graph = {
  'A': ['B', 'C'],
  'B': ['D', 'E'],
  'C': ['F'],
  'D': [],
  'E': [],
  'F': []
};

console.log(dfsGraphRecursive(graph, 'A')); // ['A', 'B', 'D', 'E', 'C', 'F']
console.log(dfsGraphIterative(graph, 'A')); // ['A', 'B', 'D', 'E', 'C', 'F']`,
  testCases: [
    {
      input: [{ A: ['B', 'C'], B: ['D'], C: [], D: [] }, 'A'],
      expectedOutput: ['A', 'B', 'D', 'C'],
      description: 'DFS on simple graph starting from A',
    },
    {
      input: [{ A: ['B', 'C'], B: ['D', 'E'], C: ['F'], D: [], E: [], F: [] }, 'A'],
      expectedOutput: ['A', 'B', 'D', 'E', 'C', 'F'],
      description: 'DFS on larger graph',
    },
    {
      input: [{ A: [] }, 'A'],
      expectedOutput: ['A'],
      description: 'Single node graph',
    },
    {
      input: 'tree-preorder',
      expectedOutput: [1, 2, 4, 5, 3],
      description: 'Pre-order DFS on binary tree',
    },
    {
      input: 'tree-inorder',
      expectedOutput: [4, 2, 5, 1, 3],
      description: 'In-order DFS on binary tree',
    },
  ],
  hints: [
    'For graphs, use a Set to track visited nodes and prevent infinite loops',
    'Recursive DFS naturally uses the call stack; iterative uses an explicit stack',
    'For iterative graph DFS, push neighbors in reverse order to maintain left-to-right visiting',
    'Tree DFS doesn\'t need a visited set since trees are acyclic',
    'Pre-order visits node first, in-order visits between children, post-order visits last',
    'The key difference: when do you process the current node relative to its children?',
  ],
};
