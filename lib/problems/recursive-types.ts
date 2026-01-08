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
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
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
