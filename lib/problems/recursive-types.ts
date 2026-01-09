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
  id: 'recursive-types',
  title: 'Recursive Type Definitions',
  difficulty: 'hard',
  category: 'TypeScript Advanced',
  description: `<h2>In-Depth Explanation</h2>

<p>Recursive types are type definitions that reference themselves. They're essential for modeling hierarchical or nested data structures like trees, linked lists, JSON, and nested objects.</p>

<p>Key features:</p>
<ul>
  <li><strong>Self-Reference</strong>: A type can reference itself in its definition</li>
  <li><strong>Base Case</strong>: Recursive types need a termination condition to avoid infinite types</li>
  <li><strong>Conditional Recursion</strong>: Combine with conditional types for complex transformations</li>
  <li><strong>Depth Limits</strong>: TypeScript has recursion depth limits to prevent infinite loops</li>
</ul>

<p>Common patterns:</p>
<ul>
  <li><strong>Tree Structures</strong>: \`type Tree&lt;T&gt; = { value: T; children: Tree&lt;T&gt;[] }\`</li>
  <li><strong>JSON Type</strong>: \`type Json = string | number | boolean | null | Json[] | { [key: string]: Json }\`</li>
  <li><strong>Linked List</strong>: \`type List&lt;T&gt; = { value: T; next: List&lt;T&gt; | null }\`</li>
  <li><strong>Deep Partial</strong>: Recursively make all properties optional</li>
</ul>

<h2>Importance</h2>

<p>Recursive types are crucial for TypeScript because:</p>

<ul>
  <li><strong>Data Modeling</strong>: Represent hierarchical data structures accurately</li>
  <li><strong>Type Transformations</strong>: Build deep utility types (DeepPartial, DeepReadonly)</li>
  <li><strong>JSON Handling</strong>: Type arbitrary JSON data properly</li>
  <li><strong>API Types</strong>: Model nested API responses and requests</li>
  <li><strong>Config Objects</strong>: Type deeply nested configuration</li>
  <li><strong>AST Types</strong>: Define Abstract Syntax Tree node types</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Recursive types are used extensively:</p>

<ul>
  <li><strong>File Systems</strong>: Directory/file tree structures</li>
  <li><strong>Menu Systems</strong>: Nested navigation menus</li>
  <li><strong>Comments</strong>: Threaded comment systems with replies</li>
  <li><strong>Organization Charts</strong>: Employee hierarchy structures</li>
  <li><strong>Category Trees</strong>: E-commerce category hierarchies</li>
  <li><strong>Component Trees</strong>: React component hierarchies</li>
  <li><strong>Form Schemas</strong>: Nested form field definitions</li>
  <li><strong>State Management</strong>: Deep state transformations</li>
</ul>

<p><strong>Challenge:</strong> Build recursive types for tree structures and deep transformations.</p>`,
  examples: [
    {
      input: `type TreeNode<T> = { value: T; children: TreeNode<T>[] }`,
      output: `const tree: TreeNode<string> = { value: 'root', children: [{ value: 'child', children: [] }] }`,
      explanation: 'TreeNode references itself in the children property',
    },
    {
      input: `type NestedObject = { [key: string]: string | NestedObject }`,
      output: `const obj: NestedObject = { a: 'value', b: { c: 'nested' } }`,
      explanation: 'Object type that can contain strings or more nested objects',
    },
  ],
  starterCode: `// TODO: Create a type for a binary tree node
// Each node has a value and optional left/right children
type BinaryTree<T> = {
  value: T;
  // Add left and right properties that reference BinaryTree<T> or null
};

// TODO: Create a JSON type that represents any valid JSON value
// JSON can be: string, number, boolean, null, array of JSON, or object with JSON values
type Json = string; // Fix this to include all JSON types

// TODO: Create a DeepPartial type that makes all properties optional recursively
// DeepPartial<{ a: { b: string } }> = { a?: { b?: string } }
type DeepPartial<T> = T; // Fix this

// TODO: Create a type for a file system structure
// A FileSystemNode can be a file (with name and size) or a directory (with name and children)
type FileSystemNode = {
  name: string;
  type: 'file';
  size: number;
}; // Add directory type with recursive children

// TODO: Create a PathOf type that extracts all possible dot-notation paths from an object
// PathOf<{ a: { b: string } }> = 'a' | 'a.b'
type PathOf<T> = string; // This is a bonus challenge - very advanced!

// Test your types
const tree: BinaryTree<number> = {
  value: 10,
  left: { value: 5, left: null, right: null },
  right: { value: 15, left: null, right: null },
};

const json: Json = {
  name: 'John',
  age: 30,
  nested: { deep: { value: true } },
  items: [1, 2, { mixed: 'content' }],
};`,
  solution: `// Binary tree node type
type BinaryTree<T> = {
  value: T;
  left: BinaryTree<T> | null;
  right: BinaryTree<T> | null;
};

// JSON type that represents any valid JSON value
type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

// DeepPartial type that makes all properties optional recursively
type DeepPartial<T> = T extends object
  ? T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

// File system structure type
type FileSystemNode =
  | { name: string; type: 'file'; size: number }
  | { name: string; type: 'directory'; children: FileSystemNode[] };

// PathOf type that extracts all possible dot-notation paths from an object
type PathOf<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends object
    ? T[K] extends Array<unknown>
      ? K
      : K | \`\${K}.\${PathOf<T[K]>}\`
    : K
  : never;

// Runtime functions for recursive tree operations
function countTreeNodes<T>(tree: BinaryTree<T> | null): number {
  if (tree === null) return 0;
  return 1 + countTreeNodes(tree.left) + countTreeNodes(tree.right);
}

function getTreeDepth<T>(tree: BinaryTree<T> | null): number {
  if (tree === null) return 0;
  return 1 + Math.max(getTreeDepth(tree.left), getTreeDepth(tree.right));
}

function countFileSystemNodes(node: FileSystemNode): number {
  if (node.type === 'file') return 1;
  return 1 + node.children.reduce((sum, child) => sum + countFileSystemNodes(child), 0);
}

function isValidJson(value: unknown): boolean {
  if (value === null) return true;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return true;
  if (Array.isArray(value)) return value.every(isValidJson);
  if (typeof value === 'object') return Object.values(value).every(isValidJson);
  return false;
}

// Test your types
const tree: BinaryTree<number> = {
  value: 10,
  left: { value: 5, left: null, right: null },
  right: { value: 15, left: null, right: null },
};

const json: Json = {
  name: 'John',
  age: 30,
  nested: { deep: { value: true } },
  items: [1, 2, { mixed: 'content' }],
};`,
  testCases: [
    {
      input: [{ value: 10, left: { value: 5, left: null, right: null }, right: { value: 15, left: null, right: null } }],
      expectedOutput: 3,
      description: 'countTreeNodes counts all nodes in binary tree',
    },
    {
      input: [{ value: 1, left: { value: 2, left: { value: 3, left: null, right: null }, right: null }, right: null }],
      expectedOutput: 3,
      description: 'getTreeDepth returns maximum depth of binary tree',
    },
    {
      input: [{ name: 'folder', type: 'directory', children: [{ name: 'file.txt', type: 'file', size: 100 }] }],
      expectedOutput: 2,
      description: 'countFileSystemNodes counts directory and file nodes',
    },
    {
      input: [{ name: 'John', age: 30, nested: { value: true } }],
      expectedOutput: true,
      description: 'isValidJson returns true for valid JSON objects',
    },
  ],
  hints: [
    'A recursive type references itself: type List<T> = { value: T; next: List<T> | null }',
    'Always include a base case (like null, primitive, or empty) to terminate recursion',
    'Use union types to combine base cases with recursive cases',
    'For DeepPartial, check if T extends object before recursing, otherwise return T as-is',
    'Conditional types help control when to recurse: T extends object ? recurse : stop',
    'Be careful with arrays - they are objects but should often be handled specially',
  ],
};
