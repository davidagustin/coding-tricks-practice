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
  description: `## In-Depth Explanation

Currying transforms a function that takes multiple arguments into a sequence of functions, each taking a single argument. Instead of \`f(a, b, c)\`, you get \`f(a)(b)(c)\`. Each function returns another function until all arguments are provided.

Currying enables:
- **Partial Application**: Apply some arguments now, others later
- **Function Composition**: Easier to compose functions
- **Reusability**: Create specialized functions from general ones
- **Functional Style**: Enables point-free programming

The key insight is that curried functions are more flexible - you can partially apply arguments to create new functions, making code more reusable and composable.

## Importance

Currying is fundamental to functional programming because:

- **Partial Application**: Create specialized functions from general ones
- **Function Composition**: Easier to compose and chain functions
- **Code Reusability**: Write more generic, reusable functions
- **Functional Style**: Enables functional programming patterns
- **Library Design**: Many functional libraries use currying
- **Testability**: Easier to test functions with partial application

## Usefulness & Practical Applications

Currying is used extensively in functional programming:

- **Event Handlers**: \`const handleClick = handleEvent('click')\`
- **API Calls**: \`const getUser = apiCall('/users')\`
- **Validation**: \`const validateEmail = validate('email')\`
- **Configuration**: \`const createLogger = logger(config)\`
- **Data Transformation**: Creating reusable transformation functions
- **Functional Libraries**: Lodash, Ramda use currying extensively
- **React Hooks**: Custom hooks often use currying patterns
- **Middleware**: Express.js middleware uses currying

**Challenge:** Create curried functions and a generic curry utility.`,
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
