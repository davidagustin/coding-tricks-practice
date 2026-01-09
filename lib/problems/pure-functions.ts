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
  id: 'pure-functions',
  title: 'Pure Functions',
  difficulty: 'easy',
  category: 'Functional Programming',
  description: `<h2>In-Depth Explanation</h2>

<p>A <strong>pure function</strong> is a function that has two essential properties:</p>

<ol>
  <li><strong>Deterministic</strong>: Given the same input, it always returns the same output</li>
  <li><strong>No Side Effects</strong>: It does not modify any external state or cause observable changes outside the function</li>
</ol>

<p>Pure functions are the building blocks of functional programming. They make code more predictable, testable, and easier to reason about.</p>

<h2>Characteristics of Pure Functions</h2>

<ul>
  <li><strong>No external dependencies</strong>: Does not rely on variables outside its scope</li>
  <li><strong>No mutations</strong>: Does not modify input arguments or external state</li>
  <li><strong>No I/O operations</strong>: Does not read from files, make network requests, or log to console</li>
  <li><strong>Referential transparency</strong>: Can be replaced with its return value without changing program behavior</li>
</ul>

<h2>Importance</h2>

<p>Pure functions provide significant benefits:</p>

<ul>
  <li><strong>Testability</strong>: Easy to test because output depends only on input</li>
  <li><strong>Predictability</strong>: Same inputs always produce same outputs</li>
  <li><strong>Cacheability</strong>: Results can be memoized since they are deterministic</li>
  <li><strong>Parallelization</strong>: Safe to run in parallel with no shared state concerns</li>
  <li><strong>Debugging</strong>: Easier to trace issues when functions have no hidden dependencies</li>
  <li><strong>Reusability</strong>: Can be safely reused in different contexts</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Pure functions are used throughout modern JavaScript development:</p>

<ul>
  <li><strong>React Components</strong>: Pure components render the same output for same props</li>
  <li><strong>Redux Reducers</strong>: Must be pure functions to ensure predictable state updates</li>
  <li><strong>Data Transformations</strong>: Array methods like map, filter, reduce use pure functions</li>
  <li><strong>Utility Libraries</strong>: Lodash, Ramda are built on pure function principles</li>
  <li><strong>Unit Testing</strong>: Pure functions are trivial to unit test</li>
</ul>

<p><strong>Challenge:</strong> Identify impure functions and refactor them to be pure.</p>`,
  examples: [
    {
      input: `// Pure function
const add = (a, b) => a + b;
add(2, 3);`,
      output: `5`,
      explanation: 'Always returns same output for same inputs, no side effects',
    },
    {
      input: `// Impure function (uses external state)
let counter = 0;
const increment = () => ++counter;`,
      output: `1, 2, 3, ...`,
      explanation: 'Returns different values each time, modifies external state',
    },
    {
      input: `// Pure version
const increment = (counter) => counter + 1;
increment(0);`,
      output: `1`,
      explanation: 'Takes counter as input, returns new value without mutation',
    },
  ],
  starterCode: `// TODO: Refactor this impure function to be pure
// It currently modifies the input array
function addItemImpure(cart, item) {
  cart.push(item);
  return cart;
}

// TODO: Implement a pure version that returns a new array
function addItem(cart, item) {
  // Your code here
  return cart;
}

// TODO: Refactor this impure function to be pure
// It currently uses external state
let taxRate = 0.1;
function calculateTotalImpure(price) {
  return price + (price * taxRate);
}

// TODO: Implement a pure version that takes taxRate as parameter
function calculateTotal(price, taxRate) {
  // Your code here
  return 0;
}

// TODO: Refactor this impure function to be pure
// It currently mutates the input object
function updateUserImpure(user, name) {
  user.name = name;
  return user;
}

// TODO: Implement a pure version that returns a new object
function updateUser(user, name) {
  // Your code here
  return user;
}

// Test
const cart = ['apple', 'banana'];
console.log(addItem(cart, 'orange'));
console.log(cart); // Should still be ['apple', 'banana']

console.log(calculateTotal(100, 0.1));

const user = { id: 1, name: 'Alice' };
console.log(updateUser(user, 'Bob'));
console.log(user.name); // Should still be 'Alice'`,
  solution: `// Refactor this impure function to be pure
// It currently modifies the input array
function addItemImpure(cart, item) {
  cart.push(item);
  return cart;
}

// Implement a pure version that returns a new array
function addItem(cart, item) {
  return [...cart, item];
}

// Refactor this impure function to be pure
// It currently uses external state
let taxRate = 0.1;
function calculateTotalImpure(price) {
  return price + (price * taxRate);
}

// Implement a pure version that takes taxRate as parameter
function calculateTotal(price, taxRate) {
  return price + (price * taxRate);
}

// Refactor this impure function to be pure
// It currently mutates the input object
function updateUserImpure(user, name) {
  user.name = name;
  return user;
}

// Implement a pure version that returns a new object
function updateUser(user, name) {
  return { ...user, name };
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Use the spread operator (...) to create new arrays and objects instead of mutating',
    'Pure functions should never modify their input arguments',
    'All data the function needs should be passed as parameters, not accessed from external scope',
    'Return a new value instead of modifying existing ones',
  ],
};
