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
  id: 'currying',
  title: 'Function Currying',
  difficulty: 'medium',
  category: 'Functional Programming',
  description: `<h2>In-Depth Explanation</h2>

<p>Currying transforms a function that takes multiple arguments into a sequence of functions, each taking a single argument. Instead of <code>f(a, b, c)</code>, you get <code>f(a)(b)(c)</code>. Each function returns another function until all arguments are provided.</p>

<p>Currying enables:</p>
<ul>
  <li><strong>Partial Application</strong>: Apply some arguments now, others later</li>
  <li><strong>Function Composition</strong>: Easier to compose functions</li>
  <li><strong>Reusability</strong>: Create specialized functions from general ones</li>
  <li><strong>Functional Style</strong>: Enables point-free programming</li>
</ul>

<p>The key insight is that curried functions are more flexible - you can partially apply arguments to create new functions, making code more reusable and composable.</p>

<h2>Importance</h2>

<p>Currying is fundamental to functional programming because:</p>

<ul>
  <li><strong>Partial Application</strong>: Create specialized functions from general ones</li>
  <li><strong>Function Composition</strong>: Easier to compose and chain functions</li>
  <li><strong>Code Reusability</strong>: Write more generic, reusable functions</li>
  <li><strong>Functional Style</strong>: Enables functional programming patterns</li>
  <li><strong>Library Design</strong>: Many functional libraries use currying</li>
  <li><strong>Testability</strong>: Easier to test functions with partial application</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Currying is used extensively in functional programming:</p>

<ul>
  <li><strong>Event Handlers</strong>: <code>const handleClick = handleEvent('click')</code></li>
  <li><strong>API Calls</strong>: <code>const getUser = apiCall('/users')</code></li>
  <li><strong>Validation</strong>: <code>const validateEmail = validate('email')</code></li>
  <li><strong>Configuration</strong>: <code>const createLogger = logger(config)</code></li>
  <li><strong>Data Transformation</strong>: Creating reusable transformation functions</li>
  <li><strong>Functional Libraries</strong>: Lodash, Ramda use currying extensively</li>
  <li><strong>React Hooks</strong>: Custom hooks often use currying patterns</li>
  <li><strong>Middleware</strong>: Express.js middleware uses currying</li>
</ul>

<p><strong>Challenge:</strong> Create curried functions and a generic curry utility.</p>`,
  examples: [
    {
      input: `const add = a => b => a + b; add(2)(3)`,
      output: `5`,
      explanation: 'Curried add function',
    },
  ],
  starterCode: `// TODO: Create a curried multiply function
// multiply(2)(3)(4) should return 24
function multiply(a) {
  return a;
}

// TODO: Create a curried function to create greeting messages
// greet('Hello')('World') → 'Hello, World!'
function greet(greeting) {
  return greeting;
}

// TODO: Create a generic curry function for 2-argument functions
// const curriedAdd = curry2((a, b) => a + b);
// curriedAdd(2)(3) → 5
function curry2(fn) {
  return fn;
}

// Test
console.log(multiply(2)(3)(4));
console.log(greet('Hello')('World'));
const curriedAdd = curry2((a, b) => a + b);
console.log(curriedAdd(2)(3));`,
  solution: `function multiply(a) {
  return function(b) {
    return function(c) {
      return a * b * c;
    };
  };
}

function greet(greeting) {
  return function(name) {
    return greeting + ', ' + name + '!';
  };
}

function curry2(fn) {
  return function(a) {
    return function(b) {
      return fn(a, b);
    };
  };
}`,
  testCases: [
    {
      input: [],
      expectedOutput: 24,
      description: 'multiply(2)(3)(4)',
    },
    {
      input: [],
      expectedOutput: 'Hello, World!',
      description: 'greet(Hello)(World)',
    },
    {
      input: [],
      expectedOutput: 5,
      description: 'curry2 add',
    },
  ],
  hints: [
    'Return a function that returns a function',
    'Each returned function captures the previous argument',
    'Arrow functions make this concise: a => b => a + b',
  ],
};
