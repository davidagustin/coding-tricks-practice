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
  id: 'function-composition',
  title: 'Function Composition',
  difficulty: 'medium',
  category: 'Functional Programming',
  description: `<h2>In-Depth Explanation</h2>

<p><strong>Function composition</strong> is the process of combining two or more functions to produce a new function. The output of one function becomes the input of the next. Mathematically, if you have functions f and g, their composition (f . g)(x) = f(g(x)).</p>

<p>Composition allows you to build complex operations from simple, reusable functions. Instead of writing one large function, you compose small, focused functions together.</p>

<h2>Composition vs Pipe</h2>

<ul>
  <li><strong>Compose</strong>: Functions are applied right-to-left: compose(f, g, h)(x) = f(g(h(x)))</li>
  <li><strong>Pipe</strong>: Functions are applied left-to-right: pipe(f, g, h)(x) = h(g(f(x)))</li>
</ul>

<p>Pipe is often more intuitive as it follows the natural reading order and the data flow direction.</p>

<h2>Importance</h2>

<p>Function composition is fundamental to functional programming:</p>

<ul>
  <li><strong>Modularity</strong>: Build complex logic from simple, tested pieces</li>
  <li><strong>Reusability</strong>: Small functions can be reused in different compositions</li>
  <li><strong>Readability</strong>: Express complex transformations as a sequence of steps</li>
  <li><strong>Point-Free Style</strong>: Write functions without explicitly mentioning data</li>
  <li><strong>Declarative Code</strong>: Focus on what to do, not how to do it</li>
  <li><strong>Testing</strong>: Test small functions individually, composition is predictable</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Composition is used extensively in functional JavaScript:</p>

<ul>
  <li><strong>Data Pipelines</strong>: Transform data through a series of operations</li>
  <li><strong>Middleware</strong>: Express/Koa middleware chains are function composition</li>
  <li><strong>Redux</strong>: combineReducers and middleware use composition</li>
  <li><strong>React</strong>: Higher-Order Components (HOCs) compose components</li>
  <li><strong>Validation</strong>: Chain multiple validators together</li>
  <li><strong>Lodash/Ramda</strong>: flow/pipe and compose functions</li>
  <li><strong>Transducers</strong>: Efficient composable transformations</li>
</ul>

<p><strong>Challenge:</strong> Implement compose and pipe functions, and use them to build data transformation pipelines.</p>`,
  examples: [
    {
      input: `const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const composed = compose(square, double, addOne);
composed(2);`,
      output: `36`,
      explanation: 'addOne(2)=3, double(3)=6, square(6)=36 (right-to-left)',
    },
    {
      input: `const piped = pipe(addOne, double, square);
piped(2);`,
      output: `36`,
      explanation: 'addOne(2)=3, double(3)=6, square(6)=36 (left-to-right)',
    },
    {
      input: `const processName = pipe(
  str => str.trim(),
  str => str.toLowerCase(),
  str => str.split(' '),
  arr => arr.map(s => s[0].toUpperCase() + s.slice(1)),
  arr => arr.join(' ')
);
processName('  jOHN DOE  ');`,
      output: `'John Doe'`,
      explanation: 'Chain of string transformations',
    },
  ],
  starterCode: `// TODO: Implement compose - applies functions right-to-left
// compose(f, g, h)(x) should equal f(g(h(x)))
function compose(...fns) {
  // Your code here
  return x => x;
}

// TODO: Implement pipe - applies functions left-to-right
// pipe(f, g, h)(x) should equal h(g(f(x)))
function pipe(...fns) {
  // Your code here
  return x => x;
}

// TODO: Implement composeAsync for async functions
// Should work like compose but handle Promises
async function composeAsync(...fns) {
  // Your code here
  return async x => x;
}

// TODO: Create a data transformation pipeline using pipe
// Transform user data: { name: '  JOHN DOE  ', age: '25' }
// To: { name: 'John Doe', age: 25, isAdult: true }
const transformUser = pipe(
  // Add your transformation functions here
);

// Helper functions for the pipeline
const trimName = user => ({ ...user, name: user.name.trim() });
const normalizeName = user => ({
  ...user,
  name: user.name.toLowerCase().split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
});
const parseAge = user => ({ ...user, age: parseInt(user.age, 10) });
const addIsAdult = user => ({ ...user, isAdult: user.age >= 18 });

// Test
const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

console.log(compose(square, double, addOne)(2)); // 36
console.log(pipe(addOne, double, square)(2)); // 36

const userData = { name: '  JOHN DOE  ', age: '25' };
console.log(transformUser(userData));`,
  solution: `// Compose: applies functions right-to-left
// compose(f, g, h)(x) = f(g(h(x)))
function compose(...fns) {
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

// Pipe: applies functions left-to-right
// pipe(f, g, h)(x) = h(g(f(x)))
function pipe(...fns) {
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
}

// ComposeAsync: for async functions
function composeAsync(...fns) {
  return async (x) => {
    let result = x;
    for (let i = fns.length - 1; i >= 0; i--) {
      result = await fns[i](result);
    }
    return result;
  };
}

// Helper functions for the pipeline
const trimName = user => ({ ...user, name: user.name.trim() });
const normalizeName = user => ({
  ...user,
  name: user.name.toLowerCase().split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
});
const parseAge = user => ({ ...user, age: parseInt(user.age, 10) });
const addIsAdult = user => ({ ...user, isAdult: user.age >= 18 });

// Data transformation pipeline using pipe
const transformUser = pipe(
  trimName,
  normalizeName,
  parseAge,
  addIsAdult
);

// Test
const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

console.log(compose(square, double, addOne)(2)); // 36: addOne(2)=3, double(3)=6, square(6)=36
console.log(pipe(addOne, double, square)(2)); // 36: addOne(2)=3, double(3)=6, square(6)=36

const userData = { name: '  JOHN DOE  ', age: '25' };
console.log(transformUser(userData));
// { name: 'John Doe', age: 25, isAdult: true }`,
  testCases: [
    {
      input: [{ name: '  JOHN DOE  ', age: '25' }],
      expectedOutput: { name: 'John Doe', age: 25, isAdult: true },
      description: 'transformUser pipeline transforms user data correctly',
    },
    {
      input: [{ name: 'alice', age: '17' }],
      expectedOutput: { name: 'Alice', age: 17, isAdult: false },
      description: 'transformUser handles underage user correctly',
    },
    {
      input: [{ name: '  bob smith  ', age: '30' }],
      expectedOutput: { name: 'Bob Smith', age: 30, isAdult: true },
      description: 'transformUser normalizes name and parses age',
    },
  ],
  hints: [
    'Use Array.reduceRight() for compose (right-to-left evaluation)',
    'Use Array.reduce() for pipe (left-to-right evaluation)',
    'The accumulator in reduce/reduceRight is the running result passed to each function',
    'For async composition, you need to await each function result before passing to the next',
    'Start with identity function as initial value if needed: (x) => x',
  ],
};
