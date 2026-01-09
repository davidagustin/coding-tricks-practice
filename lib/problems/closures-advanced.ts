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
  id: 'closures-advanced',
  title: 'Advanced Closure Patterns',
  difficulty: 'medium',
  category: 'JavaScript Advanced',
  description: `<h2>In-Depth Explanation</h2>

<p>A closure is a function that retains access to variables from its outer (enclosing) scope, even after the outer function has returned. This creates a persistent "private" scope that the inner function can access and modify.</p>

<p>Advanced closure patterns include:</p>
<ul>
  <li><strong>Module Pattern</strong>: Create private variables and expose public API</li>
  <li><strong>Factory Functions</strong>: Generate specialized functions with shared private state</li>
  <li><strong>Memoization</strong>: Cache function results using closure-stored data</li>
  <li><strong>Partial Application</strong>: Pre-fill some arguments of a function</li>
  <li><strong>Event Handlers</strong>: Maintain state across event callbacks</li>
  <li><strong>Iterators</strong>: Create stateful iteration with private counters</li>
</ul>

<p>The key insight is that closures enable <strong>data privacy and encapsulation</strong> in JavaScript, which doesn't have built-in private class fields in older environments.</p>

<h2>Importance</h2>

<p>Mastering closures is essential because:</p>

<ul>
  <li><strong>Data Privacy</strong>: Create truly private variables without class syntax</li>
  <li><strong>State Management</strong>: React hooks (useState, useEffect) rely on closures</li>
  <li><strong>Functional Programming</strong>: Enable currying, partial application, composition</li>
  <li><strong>Memory Management</strong>: Understanding closures prevents memory leaks</li>
  <li><strong>API Design</strong>: Create clean, encapsulated interfaces</li>
  <li><strong>Interview Essential</strong>: Core concept tested in technical interviews</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Closures are used extensively in:</p>

<ul>
  <li><strong>React Hooks</strong>: useState, useCallback, useMemo all use closures</li>
  <li><strong>Event Listeners</strong>: Preserve context and state in callbacks</li>
  <li><strong>Module Bundlers</strong>: Webpack uses closures for module isolation</li>
  <li><strong>Debounce/Throttle</strong>: Store timer IDs and state between calls</li>
  <li><strong>Caching/Memoization</strong>: Store computed results for performance</li>
  <li><strong>Configuration</strong>: Create configured function instances</li>
  <li><strong>Private State</strong>: Simulate private class members</li>
  <li><strong>Async Operations</strong>: Maintain context in callbacks and promises</li>
</ul>

<p><strong>Challenge:</strong> Implement advanced closure patterns including a counter factory, memoization, and the module pattern.</p>`,
  examples: [
    {
      input: `function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count
  };
}
const counter = createCounter();
counter.increment(); counter.increment();
console.log(counter.getCount());`,
      output: `2`,
      explanation: 'The closure preserves the count variable privately',
    },
    {
      input: `function multiplier(factor) {
  return num => num * factor;
}
const double = multiplier(2);
console.log(double(5));`,
      output: `10`,
      explanation: 'The inner function closes over factor (2)',
    },
  ],
  starterCode: `// TODO: Create a counter factory that returns an object with:
// - increment(): increases count and returns new value
// - decrement(): decreases count and returns new value
// - getCount(): returns current count
// - reset(): resets count to initial value
// The count should be PRIVATE (not accessible directly)

function createCounter(initialValue = 0) {
  // Implement private count variable and return object with methods
  return {
    increment: () => {},
    decrement: () => {},
    getCount: () => {},
    reset: () => {}
  };
}

// TODO: Create a memoize function that caches results
// If the same argument is passed again, return cached result
// Assume single argument functions for simplicity

function memoize(fn) {
  // Implement memoization using closure to store cache
  return function(arg) {
    return fn(arg);
  };
}

// TODO: Create a createBankAccount function using module pattern
// - deposit(amount): adds to balance, returns new balance
// - withdraw(amount): subtracts from balance if sufficient funds, returns new balance or throws error
// - getBalance(): returns current balance
// Balance should be PRIVATE

function createBankAccount(initialBalance = 0) {
  // Implement private balance and return public API
  return {
    deposit: (amount) => {},
    withdraw: (amount) => {},
    getBalance: () => {}
  };
}

// Test
const counter = createCounter(5);
console.log(counter.increment()); // 6
console.log(counter.getCount()); // 6
counter.reset();
console.log(counter.getCount()); // 5

const expensiveOperation = memoize((n) => {
  console.log('Computing...');
  return n * 2;
});
console.log(expensiveOperation(5)); // Computing... 10
console.log(expensiveOperation(5)); // 10 (cached, no "Computing...")

const account = createBankAccount(100);
console.log(account.deposit(50)); // 150
console.log(account.withdraw(30)); // 120`,
  solution: `// Create a counter factory that returns an object with:
// - increment(): increases count and returns new value
// - decrement(): decreases count and returns new value
// - getCount(): returns current count
// - reset(): resets count to initial value
// The count should be PRIVATE (not accessible directly)

function createCounter(initialValue = 0) {
  let count = initialValue;
  const initial = initialValue;

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
    reset: () => {
      count = initial;
      return count;
    }
  };
}

// Create a memoize function that caches results
// If the same argument is passed again, return cached result
// Assume single argument functions for simplicity

function memoize(fn) {
  const cache = new Map();

  return function(arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }

    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

// Create a createBankAccount function using module pattern
// - deposit(amount): adds to balance, returns new balance
// - withdraw(amount): subtracts from balance if sufficient funds, returns new balance or throws error
// - getBalance(): returns current balance
// Balance should be PRIVATE

function createBankAccount(initialBalance = 0) {
  let balance = initialBalance;

  return {
    deposit: (amount) => {
      if (amount < 0) {
        throw new Error('Cannot deposit negative amount');
      }
      balance += amount;
      return balance;
    },
    withdraw: (amount) => {
      if (amount < 0) {
        throw new Error('Cannot withdraw negative amount');
      }
      if (amount > balance) {
        throw new Error('Insufficient funds');
      }
      balance -= amount;
      return balance;
    },
    getBalance: () => balance
  };
}

// Test
const counter = createCounter(5);
console.log(counter.increment()); // 6
console.log(counter.getCount()); // 6
counter.reset();
console.log(counter.getCount()); // 5

const expensiveOperation = memoize((n) => {
  console.log('Computing...');
  return n * 2;
});
console.log(expensiveOperation(5)); // Computing... 10
console.log(expensiveOperation(5)); // 10 (cached, no "Computing...")

const account = createBankAccount(100);
console.log(account.deposit(50)); // 150
console.log(account.withdraw(30)); // 120`,
  testCases: [
    {
      input: { fn: 'createCounter', args: [5], operations: ['increment()', 'getCount()'] },
      expectedOutput: 6,
      description: 'Counter increment increases count',
    },
    {
      input: { fn: 'createCounter', args: [10], operations: ['decrement()', 'getCount()'] },
      expectedOutput: 9,
      description: 'Counter decrement decreases count',
    },
    {
      input: { fn: 'createCounter', args: [5], operations: ['increment()', 'increment()', 'reset()', 'getCount()'] },
      expectedOutput: 5,
      description: 'Counter reset restores initial value',
    },
    {
      input: { fn: 'createBankAccount', args: [100], operations: ['deposit(50)', 'getBalance()'] },
      expectedOutput: 150,
      description: 'Bank account deposit increases balance',
    },
    {
      input: { fn: 'createBankAccount', args: [100], operations: ['withdraw(30)', 'getBalance()'] },
      expectedOutput: 70,
      description: 'Bank account withdraw decreases balance',
    },
    {
      input: { fn: 'memoize', args: ['n => n * 2'], callWith: [5, 5] },
      expectedOutput: 10,
      description: 'Memoized function returns cached result',
    },
  ],
  hints: [
    'Declare variables with let or const inside the outer function - they become private via closure',
    'The returned object methods are closures that "close over" the private variables',
    'For memoization, use a Map or object as the cache, stored in the closure',
    'Store the initial value separately so reset() can restore it',
    'The closure keeps the variable alive even after the outer function returns',
  ],
};
