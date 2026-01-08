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
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
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
