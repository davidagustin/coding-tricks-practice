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
  id: 'rest-parameters',
  title: 'Rest Parameters and Spread in Function Arguments',
  difficulty: 'medium',
  category: 'JavaScript Basics',
  description: `<h2>In-Depth Explanation</h2>

<p>Rest parameters and spread syntax use the same <code>...</code> notation but serve opposite purposes:</p>

<p><strong>Rest Parameters (Collecting):</strong> Used in function definitions to collect multiple arguments into an array.</p>
<ul>
  <li><code>function sum(...numbers) {}</code> - collects all arguments</li>
  <li><code>function log(first, ...rest) {}</code> - first arg separate, rest collected</li>
  <li>Must be the last parameter in the function signature</li>
  <li>Creates a real Array (unlike the old <code>arguments</code> object)</li>
</ul>

<p><strong>Spread Syntax (Expanding):</strong> Used in function calls to expand an array into individual arguments.</p>
<ul>
  <li><code>Math.max(...numbers)</code> - spreads array as arguments</li>
  <li><code>console.log(...items)</code> - logs each item separately</li>
  <li>Can be used anywhere in the argument list</li>
  <li>Can combine multiple spreads: <code>fn(...a, ...b, ...c)</code></li>
</ul>

<h2>Importance</h2>

<p>Rest and spread enable powerful patterns:</p>

<ul>
  <li><strong>Variadic Functions</strong>: Accept any number of arguments</li>
  <li><strong>Array to Arguments</strong>: Pass array elements as individual args</li>
  <li><strong>Replacing arguments</strong>: Modern, cleaner alternative to <code>arguments</code> object</li>
  <li><strong>Function Wrapping</strong>: Forward all arguments to another function</li>
  <li><strong>Partial Application</strong>: Combine fixed and variable arguments</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Common use cases for rest and spread:</p>

<ul>
  <li><strong>Sum/Math Operations</strong>: <code>const sum = (...nums) => nums.reduce((a, b) => a + b, 0)</code></li>
  <li><strong>Logging Wrappers</strong>: <code>function log(level, ...messages) { console.log(level, ...messages); }</code></li>
  <li><strong>Array Concatenation</strong>: <code>const all = [...arr1, ...arr2]</code></li>
  <li><strong>Function Composition</strong>: <code>const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)</code></li>
  <li><strong>Event Handlers</strong>: <code>element.addEventListener('click', (...args) => handler(...args))</code></li>
  <li><strong>Destructuring with Rest</strong>: <code>const [first, ...rest] = array</code></li>
  <li><strong>Object Properties</strong>: <code>const { id, ...data } = obj</code></li>
</ul>

<p><strong>Note:</strong> Rest must be last: <code>function(a, ...b, c)</code> is invalid!</p>

<p><strong>Challenge:</strong> Use rest parameters and spread to create flexible functions.</p>`,
  examples: [
    {
      input: `function sum(...nums) { return nums.reduce((a, b) => a + b, 0); }
sum(1, 2, 3, 4);`,
      output: `10`,
      explanation: 'Rest collects all arguments into nums array',
    },
    {
      input: `Math.max(...[3, 1, 4, 1, 5]);`,
      output: `5`,
      explanation: 'Spread expands array into individual arguments',
    },
    {
      input: `function greet(greeting, ...names) { return names.map(n => greeting + ' ' + n); }
greet('Hello', 'Alice', 'Bob');`,
      output: `['Hello Alice', 'Hello Bob']`,
      explanation: 'First arg captured, rest collected into array',
    },
  ],
  starterCode: `function sumAll(...numbers) {
  // TODO: Use rest parameter to accept any number of arguments
  // Return the sum of all numbers
  // The function signature already uses rest, just implement the body
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}

function mergeArrays(first, ...arrays) {
  // TODO: Merge the first array with all other arrays
  // Use spread to combine them into one array
  // Example: mergeArrays([1], [2, 3], [4]) => [1, 2, 3, 4]
  let result = first.slice();
  for (const arr of arrays) {
    for (const item of arr) {
      result.push(item);
    }
  }
  return result;
}

function createLogger(prefix) {
  // TODO: Return a function that logs prefix + all arguments
  // The returned function should accept any number of arguments
  // Use rest to collect args and spread to pass them to console.log
  return function(message) {
    console.log(prefix, message);
  };
}

function callWithArray(fn, args) {
  // TODO: Call fn with the elements of args array as individual arguments
  // Use spread to expand the array into arguments
  // Example: callWithArray(Math.max, [1, 5, 3]) => 5
  return fn.apply(null, args);
}

// Test
console.log(sumAll(1, 2, 3, 4, 5));
console.log(mergeArrays([1, 2], [3, 4], [5, 6]));
const log = createLogger('[INFO]');
log('Server started', 'on port 3000');
console.log(callWithArray(Math.max, [3, 1, 4, 1, 5, 9]));`,
  solution: `function sumAll(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

function mergeArrays(first, ...arrays) {
  return [first, ...arrays].flat();
}

function createLogger(prefix) {
  return function(...messages) {
    console.log(prefix, ...messages);
  };
}

function callWithArray(fn, args) {
  return fn(...args);
}

// Test
console.log(sumAll(1, 2, 3, 4, 5)); // 15
console.log(mergeArrays([1, 2], [3, 4], [5, 6])); // [1, 2, 3, 4, 5, 6]
const log = createLogger('[INFO]');
log('Server started', 'on port 3000');
console.log(callWithArray(Math.max, [3, 1, 4, 1, 5, 9])); // 9`,
  testCases: [
    {
      input: { fn: 'sumAll', args: [1, 2, 3, 4, 5] },
      expectedOutput: 15,
      description: 'sumAll sums all numbers passed as arguments',
    },
    {
      input: { fn: 'sumAll', args: [] },
      expectedOutput: 0,
      description: 'sumAll returns 0 for no arguments',
    },
    {
      input: { fn: 'mergeArrays', first: [1, 2], rest: [[3, 4], [5, 6]] },
      expectedOutput: [1, 2, 3, 4, 5, 6],
      description: 'mergeArrays combines all arrays into one',
    },
    {
      input: { fn: 'callWithArray', fnName: 'Math.max', args: [3, 1, 4, 1, 5, 9] },
      expectedOutput: 9,
      description: 'callWithArray spreads array as function arguments',
    },
  ],
  hints: [
    'Rest parameters (...args) must be the last parameter',
    'Rest creates a real array you can use array methods on',
    'Spread (...arr) expands an array into individual elements',
    'Use reduce with rest: nums.reduce((a, b) => a + b, 0)',
    'Spread in function calls: fn(...args) passes array as arguments',
  ],
};
