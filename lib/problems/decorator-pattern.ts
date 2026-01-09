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
  id: 'decorator-pattern',
  title: 'Decorator Pattern',
  difficulty: 'medium',
  category: 'Design Patterns',
  description: `<h2>In-Depth Explanation</h2>

<p>The Decorator pattern allows you to add new behaviors to objects dynamically by wrapping them in decorator objects. It provides a flexible alternative to subclassing for extending functionality.</p>

<p>Key characteristics of Decorator:</p>
<ol>
  <li>Wraps an object to add new behavior</li>
  <li>Has the same interface as the wrapped object</li>
  <li>Delegates to the wrapped object for original behavior</li>
  <li>Can be stacked (multiple decorators on one object)</li>
</ol>

<p>Benefits of Decorator pattern:</p>
<ul>
  <li><strong>Single Responsibility</strong>: Each decorator handles one concern</li>
  <li><strong>Open/Closed</strong>: Add behavior without modifying original class</li>
  <li><strong>Flexible Composition</strong>: Mix and match decorators at runtime</li>
  <li><strong>Avoid Class Explosion</strong>: No need for many subclass combinations</li>
</ul>

<h2>Importance</h2>

<p>Decorator pattern is important because:</p>

<ul>
  <li><strong>Dynamic Behavior</strong>: Add functionality at runtime, not compile time</li>
  <li><strong>Composition over Inheritance</strong>: More flexible than class hierarchies</li>
  <li><strong>Middleware Pattern</strong>: Foundation of Express.js middleware</li>
  <li><strong>TypeScript Decorators</strong>: Language feature based on this pattern</li>
  <li><strong>HOCs in React</strong>: Higher-Order Components follow decorator pattern</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Decorator is used in many contexts:</p>

<ul>
  <li><strong>Logging</strong>: Add logging to function calls</li>
  <li><strong>Caching</strong>: Add memoization to functions</li>
  <li><strong>Authentication</strong>: Add auth checks to routes</li>
  <li><strong>Rate Limiting</strong>: Add rate limiting to API calls</li>
  <li><strong>Validation</strong>: Add input validation to functions</li>
  <li><strong>Retry Logic</strong>: Add automatic retry to async operations</li>
  <li><strong>Timing</strong>: Measure execution time of functions</li>
</ul>

<p><strong>Challenge:</strong> Implement decorator functions that can wrap other functions to add logging, timing, and retry capabilities.</p>`,
  examples: [
    {
      input: `const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(2, 3);`,
      output: `"Calling function with args: [2, 3]"
"Function returned: 5"
5`,
      explanation: 'withLogging decorator adds logging before and after execution',
    },
    {
      input: `const slowFn = () => { /* slow operation */ };
const timedFn = withTiming(slowFn);
timedFn();`,
      output: `"Execution time: 150ms"`,
      explanation: 'withTiming decorator measures and logs execution time',
    },
  ],
  starterCode: `// TODO: Implement decorator functions that wrap other functions

// Decorator that adds logging before and after function execution
function withLogging(fn) {
  return function(...args) {
    // Log: "Calling [function name] with args: [args]"
    // Call original function
    // Log: "[function name] returned: [result]"
    // Return result
  };
}

// Decorator that measures and logs execution time
function withTiming(fn) {
  return function(...args) {
    // Record start time
    // Call original function
    // Calculate and log execution time
    // Return result
  };
}

// Decorator that adds retry logic for failed operations
function withRetry(fn, maxRetries = 3) {
  return function(...args) {
    // Attempt to call function
    // If it throws, retry up to maxRetries times
    // Return result or throw final error
  };
}

// Decorator that validates arguments before calling function
function withValidation(fn, validator) {
  return function(...args) {
    // Call validator with args
    // If validation fails, throw error
    // Otherwise call and return original function
  };
}

// Test
const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
console.log(loggedAdd(5, 3));

const timedAdd = withTiming(add);
console.log(timedAdd(10, 20));

const validatePositive = (a, b) => a > 0 && b > 0;
const validatedAdd = withValidation(add, validatePositive);
console.log(validatedAdd(5, 3)); // Works
console.log(validatedAdd(-1, 3)); // Throws error`,
  solution: `// Logging decorator: logs args and result
function withLogging(fn) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    console.log('Calling with args:', args);
    var result = fn.apply(this, args);
    console.log('Returned:', result);
    return result;
  };
}

// Timing decorator: measures execution time
function withTiming(fn) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    var start = Date.now();
    var result = fn.apply(this, args);
    var end = Date.now();
    console.log('Execution time: ' + (end - start) + 'ms');
    return result;
  };
}

// Retry decorator: retries on failure
function withRetry(fn, maxRetries) {
  if (maxRetries === undefined) maxRetries = 3;
  return function() {
    var args = Array.prototype.slice.call(arguments);
    var lastError;
    var attempt = 0;
    while (attempt < maxRetries) {
      try {
        return fn.apply(this, args);
      } catch (error) {
        lastError = error;
        console.log('Attempt ' + (attempt + 1) + ' failed: ' + error.message);
      }
      attempt++;
    }
    throw lastError;
  };
}

// Validation decorator: validates args before calling
function withValidation(fn, validator) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    if (!validator.apply(this, args)) {
      throw new Error('Validation failed');
    }
    return fn.apply(this, args);
  };
}

// Test wrapper: withLogging returns doubled input
function testWithLogging(input) {
  var fn = function(x) { return x * 2; };
  var decorated = withLogging(fn);
  return decorated(input);
}

// Test wrapper: withTiming returns sum
function testWithTiming(a, b) {
  var add = function(x, y) { return x + y; };
  var timedAdd = withTiming(add);
  return timedAdd(a, b);
}

// Test wrapper: withValidation returns sum when valid
function testWithValidationValid(a, b) {
  var add = function(x, y) { return x + y; };
  var validatePositive = function(x, y) { return x > 0 && y > 0; };
  var validatedAdd = withValidation(add, validatePositive);
  return validatedAdd(a, b);
}

// Test wrapper: withRetry succeeds on third attempt
function testWithRetry() {
  var attempts = 0;
  var failTwice = function() {
    attempts++;
    if (attempts < 3) throw new Error('Fail');
    return 'success';
  };
  var retryFn = withRetry(failTwice, 3);
  return retryFn();
}`,
  testCases: [
    {
      input: [5],
      expectedOutput: 10,
      description: 'testWithLogging returns decorated function result',
    },
    {
      input: [10, 20],
      expectedOutput: 30,
      description: 'testWithTiming returns correct result with timing',
    },
    {
      input: [5, 3],
      expectedOutput: 8,
      description: 'testWithValidationValid returns result for valid inputs',
    },
    {
      input: [],
      expectedOutput: 'success',
      description: 'testWithRetry retries and succeeds on third attempt',
    },
  ],
  hints: [
    'Use rest parameters (...args) to capture all arguments passed to the wrapped function',
    'Use spread syntax (...args) when calling the original function',
    'Return a new function that wraps the original behavior',
    'For withRetry, use a for loop and try-catch to handle retries',
    'Decorators can be composed: withTiming(withLogging(fn)) applies both',
    'Use fn.name to get the function name for logging purposes',
  ],
};
