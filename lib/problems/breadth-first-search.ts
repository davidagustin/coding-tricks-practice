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
  id: 'breadth-first-search',
  title: 'Breadth-First Search (BFS)',
  difficulty: 'medium',
  category: 'Algorithms',
  description: `<h2>In-Depth Explanation</h2>

<p>Breadth-First Search (BFS) is a graph/tree traversal algorithm that explores all nodes at the current depth level before moving to nodes at the next depth level. It visits nodes in "waves" spreading outward from the starting point.</p>

<p>BFS uses a <strong>queue</strong> data structure:</p>

<h3>Algorithm Steps</h3>
<ol>
  <li>Create a queue and enqueue the starting node</li>
  <li>Mark the starting node as visited</li>
  <li>While queue is not empty:</li>
  <li>Dequeue a node and process it</li>
  <li>Enqueue all unvisited neighbors</li>
  <li>Mark neighbors as visited</li>
</ol>

<h3>Key Characteristic</h3>
<p>BFS guarantees finding the <strong>shortest path</strong> in unweighted graphs because it explores nodes level by level.</p>

<h2>Time and Space Complexity</h2>

<ul>
  <li><strong>Time Complexity</strong>: O(V + E) where V = vertices, E = edges</li>
  <li><strong>Space Complexity</strong>: O(V) for the queue and visited set</li>
</ul>

<h2>BFS vs DFS</h2>

<table>
  <tr><th>BFS</th><th>DFS</th></tr>
  <tr><td>Uses Queue (FIFO)</td><td>Uses Stack (LIFO)</td></tr>
  <tr><td>Level by level</td><td>Goes deep first</td></tr>
  <tr><td>Finds shortest path</td><td>Finds any path</td></tr>
  <tr><td>More memory for wide graphs</td><td>More memory for deep graphs</td></tr>
</table>

<h2>Importance</h2>

<p>BFS is essential for:</p>

<ul>
  <li><strong>Shortest Path</strong>: Finding shortest path in unweighted graphs</li>
  <li><strong>Level-Order Traversal</strong>: Visiting tree nodes level by level</li>
  <li><strong>Minimum Steps</strong>: Problems asking for minimum moves/operations</li>
  <li><strong>Connected Components</strong>: Finding all nodes at each distance</li>
</ul>

<h2>Practical Applications</h2>

<ul>
  <li><strong>Social Networks</strong>: Finding connections within N degrees (LinkedIn, Facebook)</li>
  <li><strong>GPS Navigation</strong>: Finding shortest route (with modifications)</li>
  <li><strong>Web Crawlers</strong>: Crawling web pages by depth</li>
  <li><strong>P2P Networks</strong>: Finding nearest peers in a network</li>
  <li><strong>Broadcasting</strong>: Network packet broadcasting</li>
  <li><strong>Garbage Collection</strong>: Cheney's algorithm</li>
  <li><strong>AI/Games</strong>: Finding shortest path to goal state</li>
  <li><strong>Word Ladder</strong>: Transforming one word to another</li>
</ul>

<p><strong>Challenge:</strong> Implement BFS for graphs and level-order tree traversal.</p>`,
  examples: [
    {
      input: `bfsGraph({A: ['B','C'], B: ['D','E'], C: ['F'], D: [], E: [], F: []}, 'A')`,
      output: `['A', 'B', 'C', 'D', 'E', 'F']`,
      explanation: 'BFS visits level 0 (A), then level 1 (B,C), then level 2 (D,E,F)',
    },
    {
      input: `bfsTree(root) // tree with root 1`,
      output: `[[1], [2, 3], [4, 5]]`,
      explanation: 'Level-order traversal returns nodes grouped by level',
    },
    {
      input: `shortestPath({A: ['B','C'], B: ['D'], C: ['D'], D: []}, 'A', 'D')`,
      output: `2`,
      explanation: 'Shortest path from A to D is 2 edges (A->B->D or A->C->D)',
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

// TODO: Implement BFS for graphs
function bfsGraph(graph: Graph, start: string): string[] {
  // Create visited set and queue
  // Enqueue start node and mark visited
  // While queue not empty:
  //   Dequeue node, add to result
  //   Enqueue all unvisited neighbors

  return [];
}

// TODO: Implement level-order traversal for binary tree
// Returns array of arrays, each inner array is one level
function bfsTreeLevelOrder(root: TreeNode | null): number[][] {
  // Handle null root
  // Use queue to process level by level
  // Track nodes at each level

  return [];
}

// TODO: Implement shortest path finder using BFS
// Returns the length of shortest path, or -1 if no path exists
function shortestPath(graph: Graph, start: string, end: string): number {
  // BFS naturally finds shortest path in unweighted graphs
  // Track distance from start to each node

  return -1;
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

console.log(bfsGraph(graph, 'A'));
// Expected: ['A', 'B', 'C', 'D', 'E', 'F']

// Binary tree:
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

console.log(bfsTreeLevelOrder(tree));
// Expected: [[1], [2, 3], [4, 5]]

console.log(shortestPath(graph, 'A', 'F'));
// Expected: 2`,
  solution: `// Graph represented as adjacency list
type Graph = { [key: string]: string[] };

// Binary tree node
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

// Implement BFS for graphs
function bfsGraph(graph: Graph, start: string): string[] {
  // Create visited set and queue
  // Enqueue start node and mark visited
  // While queue not empty:
  //   Dequeue node, add to result
  //   Enqueue all unvisited neighbors
  const visited = new Set<string>();
  const queue: string[] = [start];
  const result: string[] = [];
  
  visited.add(start);
  
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);
    
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}

// Implement level-order traversal for binary tree
// Returns array of arrays, each inner array is one level
function bfsTreeLevelOrder(root: TreeNode | null): number[][] {
  // Handle null root
  // Use queue to process level by level
  // Track nodes at each level
  if (!root) return [];
  
  const result: number[][] = [];
  const queue: TreeNode[] = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const level: number[] = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      level.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(level);
  }
  
  return result;
}

// Implement shortest path finder using BFS
// Returns the length of shortest path, or -1 if no path exists
function shortestPath(graph: Graph, start: string, end: string): number {
  // BFS naturally finds shortest path in unweighted graphs
  // Track distance from start to each node
  if (start === end) return 0;
  
  const visited = new Set<string>();
  const queue: [string, number][] = [[start, 0]];
  
  visited.add(start);
  
  while (queue.length > 0) {
    const [node, distance] = queue.shift()!;
    
    for (const neighbor of graph[node] || []) {
      if (neighbor === end) {
        return distance + 1;
      }
      
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, distance + 1]);
      }
    }
  }
  
  return -1;
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Use an array as a queue: push() to enqueue, shift() to dequeue',
    'Mark nodes as visited WHEN YOU ADD THEM TO THE QUEUE, not when you process them',
    'For level-order tree traversal, track the size of each level before processing',
    'For shortest path, store distance with each node in the queue as a tuple',
    'BFS guarantees shortest path in unweighted graphs because it explores level by level',
    'To reconstruct the actual path, maintain a parent map while doing BFS',
  ],
};
