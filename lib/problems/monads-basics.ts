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
  id: 'monads-basics',
  title: 'Monads Basics (Maybe & Either)',
  difficulty: 'hard',
  category: 'Functional Programming',
  description: `<h2>In-Depth Explanation</h2>

<p>A <strong>monad</strong> is a design pattern that allows you to chain operations while handling side effects, null values, or errors in a clean, composable way. In practical terms, a monad is a wrapper around a value that provides a standard interface for transformations.</p>

<p>A monad must implement:</p>
<ul>
  <li><strong>of (unit/return)</strong>: Wraps a value in the monad</li>
  <li><strong>map</strong>: Applies a function to the wrapped value</li>
  <li><strong>flatMap (chain/bind)</strong>: Applies a function that returns a monad, then flattens</li>
</ul>

<h2>Common Monads</h2>

<ul>
  <li><strong>Maybe (Option)</strong>: Handles null/undefined values safely. Contains either Just(value) or Nothing</li>
  <li><strong>Either (Result)</strong>: Handles success/failure. Contains either Right(value) for success or Left(error) for failure</li>
  <li><strong>Promise</strong>: JavaScript's built-in monad for async operations</li>
  <li><strong>IO</strong>: Wraps side effects to keep functions pure</li>
</ul>

<h2>Importance</h2>

<p>Monads solve common programming problems elegantly:</p>

<ul>
  <li><strong>Null Safety</strong>: Maybe eliminates null pointer exceptions</li>
  <li><strong>Error Handling</strong>: Either provides composable error handling without try/catch</li>
  <li><strong>Side Effect Management</strong>: Keep functions pure while handling effects</li>
  <li><strong>Railway Oriented Programming</strong>: Chain operations that can fail</li>
  <li><strong>Composability</strong>: Chain operations in a declarative way</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Monadic patterns are used in modern JavaScript:</p>

<ul>
  <li><strong>Optional Chaining</strong>: <code>user?.address?.city</code> is Maybe-like behavior</li>
  <li><strong>Promises</strong>: .then() is flatMap, async/await is do-notation</li>
  <li><strong>fp-ts/Effect</strong>: TypeScript libraries with full monad implementations</li>
  <li><strong>Validation</strong>: Accumulate multiple errors with Either/Validation</li>
  <li><strong>Data Fetching</strong>: Handle loading, error, and success states</li>
  <li><strong>Configuration</strong>: Safely access nested config values with Maybe</li>
</ul>

<p><strong>Challenge:</strong> Implement Maybe and Either monads and use them to handle nullable values and errors.</p>`,
  examples: [
    {
      input: `// Maybe monad
const maybe = Maybe.of(5)
  .map(x => x * 2)
  .map(x => x + 1);
maybe.getOrElse(0);`,
      output: `11`,
      explanation: 'Safely chains operations on a value',
    },
    {
      input: `// Maybe with null
const maybe = Maybe.of(null)
  .map(x => x * 2);
maybe.getOrElse(0);`,
      output: `0`,
      explanation: 'Returns default when value is null',
    },
    {
      input: `// Either monad
const result = Either.right(10)
  .map(x => x * 2)
  .flatMap(x => x > 15 ? Either.right(x) : Either.left('Too small'));
result.fold(err => err, val => val);`,
      output: `20`,
      explanation: 'Chains operations with error handling',
    },
  ],
  starterCode: `// TODO: Implement the Maybe monad
// Maybe represents a value that might not exist (null or undefined)
class Maybe {
  constructor(value) {
    this._value = value;
  }

  // TODO: Static method to create a Maybe
  static of(value) {
    // Your code here
    return new Maybe(value);
  }

  // TODO: Check if the value is Nothing (null or undefined)
  isNothing() {
    // Your code here
    return false;
  }

  // TODO: Apply a function to the value if it exists
  map(fn) {
    // Your code here
    return this;
  }

  // TODO: Apply a function that returns a Maybe, then flatten
  flatMap(fn) {
    // Your code here
    return this;
  }

  // TODO: Get the value or return a default
  getOrElse(defaultValue) {
    // Your code here
    return this._value;
  }
}

// TODO: Implement the Either monad
// Either represents a value that is either a success (Right) or failure (Left)
class Either {
  constructor(value, isRight) {
    this._value = value;
    this._isRight = isRight;
  }

  // TODO: Create a Right (success) value
  static right(value) {
    // Your code here
    return new Either(value, true);
  }

  // TODO: Create a Left (failure) value
  static left(value) {
    // Your code here
    return new Either(value, false);
  }

  // TODO: Check if this is a Right value
  isRight() {
    // Your code here
    return true;
  }

  // TODO: Apply a function to Right value only
  map(fn) {
    // Your code here
    return this;
  }

  // TODO: Apply a function that returns an Either, then flatten
  flatMap(fn) {
    // Your code here
    return this;
  }

  // TODO: Handle both cases with separate functions
  fold(leftFn, rightFn) {
    // Your code here
    return this._value;
  }
}

// TODO: Implement a safe division function using Either
// Should return Left with error message if dividing by zero
function safeDivide(a, b) {
  // Your code here
  return Either.right(a / b);
}

// TODO: Implement a safe property access using Maybe
// Should safely access nested properties like: safeGet(obj, 'user', 'address', 'city')
function safeGet(obj, ...keys) {
  // Your code here
  return Maybe.of(obj);
}

// Test
console.log(Maybe.of(5).map(x => x * 2).getOrElse(0)); // 10
console.log(Maybe.of(null).map(x => x * 2).getOrElse(0)); // 0

console.log(safeDivide(10, 2).fold(e => e, v => v)); // 5
console.log(safeDivide(10, 0).fold(e => e, v => v)); // 'Division by zero'

const data = { user: { address: { city: 'NYC' } } };
console.log(safeGet(data, 'user', 'address', 'city').getOrElse('Unknown')); // 'NYC'
console.log(safeGet(data, 'user', 'phone').getOrElse('Unknown')); // 'Unknown'`,
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Maybe.isNothing() should check for both null and undefined',
    'map() should return a new Maybe/Either, not modify the original',
    'flatMap() differs from map() in that it expects the function to return a Maybe/Either',
    'Either.map() should only transform Right values, Left values pass through unchanged',
    'For safeGet, use reduce with flatMap to chain through each key safely',
    'Remember that monads are about chaining operations while handling special cases automatically',
  ],
};
