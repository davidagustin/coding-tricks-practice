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
  id: 'spread-operator-tricks',
  title: 'Spread Operator Tricks',
  difficulty: 'easy',
  category: 'JavaScript Basics',
  description: `<h2>In-Depth Explanation</h2>

<p>The spread operator (<code>...</code>) is one of the most versatile features in modern JavaScript. It works with arrays, objects, strings, and any iterable, enabling concise and powerful operations.</p>

<p>For arrays:</p>
<ul>
  <li><strong>Copying</strong>: <code>[...array]</code> creates a new array</li>
  <li><strong>Concatenating</strong>: <code>[...arr1, ...arr2]</code> combines arrays</li>
  <li><strong>Adding Elements</strong>: <code>[...arr, newItem]</code> adds to end</li>
  <li><strong>Function Arguments</strong>: <code>func(...args)</code> spreads as arguments</li>
</ul>

<p>For objects:</p>
<ul>
  <li><strong>Copying</strong>: <code>{ ...obj }</code> creates shallow copy</li>
  <li><strong>Merging</strong>: <code>{ ...obj1, ...obj2 }</code> merges objects</li>
  <li><strong>Adding Properties</strong>: <code>{ ...obj, newProp: value }</code></li>
</ul>

<p>The spread operator is syntactic sugar that makes code more readable and functional.</p>

<h2>Importance</h2>

<p>Spread operator is fundamental to modern JavaScript because:</p>

<ul>
  <li><strong>Immutability</strong>: Essential for immutable data patterns</li>
  <li><strong>Code Clarity</strong>: More readable than manual copying/merging</li>
  <li><strong>Functional Style</strong>: Enables functional programming patterns</li>
  <li><strong>React/Vue</strong>: Used extensively in component libraries</li>
  <li><strong>State Management</strong>: Core to Redux, Vuex patterns</li>
  <li><strong>ES6+ Standard</strong>: Modern JavaScript best practice</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Spread operator is used everywhere:</p>

<ul>
  <li><strong>Array Operations</strong>: Copying, concatenating, transforming arrays</li>
  <li><strong>Object Operations</strong>: Cloning, merging, updating objects</li>
  <li><strong>React Props</strong>: Spreading props to components</li>
  <li><strong>Function Calls</strong>: Spreading arrays as arguments</li>
  <li><strong>State Updates</strong>: Immutable state updates</li>
  <li><strong>Configuration</strong>: Merging configuration objects</li>
  <li><strong>API Requests</strong>: Building request objects</li>
  <li><strong>Data Transformation</strong>: Transforming data structures</li>
</ul>

<p><strong>Challenge:</strong> Use spread to merge objects, clone arrays, and convert iterables.</p>

<p><strong>Key Concepts:</strong></p>
<ul>
  <li>Shallow cloning arrays and objects</li>
  <li>Merging objects (last wins)</li>
  <li>Converting iterables to arrays</li>
  <li>Rest parameters vs spread</li>
</ul>`,
  examples: [
    {
      input: `const obj1 = { a: 1 }; const obj2 = { b: 2 };`,
      output: `{ a: 1, b: 2 }`,
      explanation: 'Merge objects using spread',
    },
  ],
  starterCode: `function mergeObjects(obj1, obj2) {
  // TODO: Merge two objects, obj2 properties override obj1
  return obj1;
}

function cloneAndPush(arr, newItem) {
  // TODO: Clone array and add new item without mutating original
  arr.push(newItem);
  return arr;
}

function uniqueValues(arr) {
  // TODO: Return array with unique values using Set and spread
  return arr;
}

// Test
console.log(mergeObjects({ a: 1, b: 2 }, { b: 3, c: 4 }));
console.log(cloneAndPush([1, 2, 3], 4));
console.log(uniqueValues([1, 2, 2, 3, 3, 3]));`,
  solution: `function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

function cloneAndPush(arr, newItem) {
  return [...arr, newItem];
}

function uniqueValues(arr) {
  return [...new Set(arr)];
}`,
  testCases: [
    {
      input: [
        { a: 1, b: 2 },
        { b: 3, c: 4 },
      ],
      expectedOutput: { a: 1, b: 3, c: 4 },
      description: 'mergeObjects - merges two objects with later properties overriding',
    },
    {
      input: [[1, 2, 3], 4],
      expectedOutput: [1, 2, 3, 4],
      description: 'cloneAndPush - clones array and adds new item',
    },
    {
      input: [[1, 2, 2, 3, 3, 3]],
      expectedOutput: [1, 2, 3],
      description: 'uniqueValues - returns array with unique values',
    },
  ],
  hints: [
    'Use {...obj1, ...obj2} to merge objects',
    'Use [...arr] to clone an array',
    'new Set(arr) removes duplicates, spread converts back to array',
  ],
};
