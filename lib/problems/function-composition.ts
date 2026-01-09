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
  solution: `// Compose: right-to-left application
function compose(...fns) {
  return function(x) { return fns.reduceRight(function(acc, fn) { return fn(acc); }, x); };
}

// Pipe: left-to-right application
function pipe(...fns) {
  return function(x) { return fns.reduce(function(acc, fn) { return fn(acc); }, x); };
}

// Helper: trims the name field
function trimName(user) {
  return { name: user.name.trim(), age: user.age, isAdult: user.isAdult };
}

// Helper: normalizes name to title case
function normalizeName(user) {
  var words = user.name.toLowerCase().split(' ');
  var capitalized = words.map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return { name: capitalized.join(' '), age: user.age, isAdult: user.isAdult };
}

// Helper: parses age string to number
function parseAge(user) {
  return { name: user.name, age: parseInt(user.age, 10), isAdult: user.isAdult };
}

// Helper: adds isAdult field based on age
function addIsAdult(user) {
  return { name: user.name, age: user.age, isAdult: user.age >= 18 };
}

// Pipeline that transforms user data
var transformUserPipeline = pipe(trimName, normalizeName, parseAge, addIsAdult);

// Test wrapper: transforms user data
function transformUser(user) {
  return transformUserPipeline(user);
}

// Test wrapper: compose with double and addOne
function testCompose(value) {
  var dbl = function(x) { return x * 2; };
  var add1 = function(x) { return x + 1; };
  var composed = compose(dbl, add1);
  return composed(value);
}

// Test wrapper: pipe with double and addOne
function testPipe(value) {
  var dbl = function(x) { return x * 2; };
  var add1 = function(x) { return x + 1; };
  var piped = pipe(dbl, add1);
  return piped(value);
}`,
  testCases: [
    {
      input: [5],
      expectedOutput: 12,
      description: 'testCompose applies functions right-to-left',
    },
    {
      input: [5],
      expectedOutput: 11,
      description: 'testPipe applies functions left-to-right',
    },
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
