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
  id: 'destructuring-patterns',
  title: 'Destructuring Patterns',
  difficulty: 'easy',
  category: 'JavaScript Basics',
  description: `<h2>In-Depth Explanation</h2>

<p>Destructuring is a JavaScript expression that allows you to extract values from arrays or properties from objects and assign them to distinct variables in a single statement.</p>

<p><strong>Object Destructuring:</strong> Extract properties from objects using curly braces <code>{}</code>. You can rename variables, set default values, and extract nested properties.</p>

<p><strong>Array Destructuring:</strong> Extract elements from arrays using square brackets <code>[]</code>. Position matters - the first variable gets the first element, and so on. You can skip elements using commas.</p>

<p>Key features include:</p>
<ul>
  <li><strong>Default Values</strong>: <code>const { name = 'Anonymous' } = user</code> - use default if property is undefined</li>
  <li><strong>Renaming</strong>: <code>const { name: userName } = user</code> - extract <code>name</code> but call it <code>userName</code></li>
  <li><strong>Nested Destructuring</strong>: <code>const { address: { city } } = user</code> - extract nested properties</li>
  <li><strong>Rest Pattern</strong>: <code>const { id, ...rest } = user</code> - collect remaining properties</li>
</ul>

<h2>Importance</h2>

<p>Destructuring is essential for modern JavaScript because:</p>

<ul>
  <li><strong>Cleaner Code</strong>: Extract multiple values in one line instead of multiple assignments</li>
  <li><strong>Function Parameters</strong>: Destructure parameters directly in function signatures</li>
  <li><strong>Swapping Variables</strong>: <code>[a, b] = [b, a]</code> swaps without temp variable</li>
  <li><strong>Module Imports</strong>: <code>import { useState, useEffect } from 'react'</code></li>
  <li><strong>API Responses</strong>: Easily extract relevant data from complex response objects</li>
  <li><strong>React Hooks</strong>: <code>const [count, setCount] = useState(0)</code></li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Destructuring is used extensively in modern JavaScript:</p>

<ul>
  <li><strong>React State</strong>: <code>const [state, setState] = useState(initial)</code></li>
  <li><strong>Props</strong>: <code>function Component({ title, onClick }) {}</code></li>
  <li><strong>API Data</strong>: <code>const { data, error, loading } = await fetchData()</code></li>
  <li><strong>Config Objects</strong>: <code>const { port = 3000, host = 'localhost' } = config</code></li>
  <li><strong>Event Handlers</strong>: <code>const { target: { value } } = event</code></li>
  <li><strong>Array Methods</strong>: <code>const [first, ...rest] = array</code></li>
  <li><strong>Multiple Returns</strong>: Return and destructure multiple values from functions</li>
</ul>

<p><strong>Challenge:</strong> Use destructuring to simplify object and array value extraction.</p>`,
  examples: [
    {
      input: `const { name, age } = { name: 'Alice', age: 25, city: 'NYC' };`,
      output: `name = 'Alice', age = 25`,
      explanation: 'Object destructuring extracts named properties',
    },
    {
      input: `const [first, , third] = [1, 2, 3, 4];`,
      output: `first = 1, third = 3`,
      explanation: 'Array destructuring with skipped elements',
    },
    {
      input: `const { x = 10 } = {};`,
      output: `x = 10`,
      explanation: 'Default value when property is undefined',
    },
  ],
  starterCode: `function extractUserInfo(user) {
  // TODO: Use object destructuring to extract name, email, and age
  // Return an object with greeting and contact
  // greeting: "Hello, {name}! You are {age} years old."
  // contact: the email
  const name = user.name;
  const email = user.email;
  const age = user.age;

  return {
    greeting: 'Hello, ' + name + '! You are ' + age + ' years old.',
    contact: email
  };
}

function getFirstAndLast(arr) {
  // TODO: Use array destructuring to get first and last elements
  // Hint: Use rest pattern to get everything in between
  const first = arr[0];
  const last = arr[arr.length - 1];

  return { first, last };
}

function swapValues(a, b) {
  // TODO: Use array destructuring to swap a and b
  // Return an array [b, a] (swapped values)
  const temp = a;
  a = b;
  b = temp;

  return [a, b];
}

// Test
console.log(extractUserInfo({ name: 'Alice', email: 'alice@example.com', age: 28 }));
console.log(getFirstAndLast([1, 2, 3, 4, 5]));
console.log(swapValues(10, 20));`,
  solution: `function extractUserInfo(user) {
  // Use object destructuring to extract name, email, and age
  const { name, email, age } = user;

  return {
    greeting: \`Hello, \${name}! You are \${age} years old.\`,
    contact: email
  };
}

function getFirstAndLast(arr) {
  // Use array destructuring to get first and last elements
  const [first, ...rest] = arr;
  const last = rest.length > 0 ? rest[rest.length - 1] : first;

  return { first, last };
}

function swapValues(a, b) {
  // Use array destructuring to swap a and b
  [a, b] = [b, a];
  return [a, b];
}

// Test
console.log(extractUserInfo({ name: 'Alice', email: 'alice@example.com', age: 28 }));
// { greeting: "Hello, Alice! You are 28 years old.", contact: "alice@example.com" }
console.log(getFirstAndLast([1, 2, 3, 4, 5]));
// { first: 1, last: 5 }
console.log(swapValues(10, 20));
// [20, 10]`,
  testCases: [
    {
      input: { fn: 'extractUserInfo', args: [{ name: 'Alice', email: 'alice@example.com', age: 28 }] },
      expectedOutput: { greeting: 'Hello, Alice! You are 28 years old.', contact: 'alice@example.com' },
      description: 'extractUserInfo uses destructuring to extract user properties'
    },
    {
      input: { fn: 'getFirstAndLast', args: [[1, 2, 3, 4, 5]] },
      expectedOutput: { first: 1, last: 5 },
      description: 'getFirstAndLast returns first and last elements'
    },
    {
      input: { fn: 'swapValues', args: [10, 20] },
      expectedOutput: [20, 10],
      description: 'swapValues swaps two values using destructuring'
    }
  ],
  hints: [
    'Object destructuring uses {} and matches property names',
    'Array destructuring uses [] and matches by position',
    'Use [a, b] = [b, a] to swap without a temp variable',
    'The rest pattern (...rest) collects remaining elements',
  ],
};
