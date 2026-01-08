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
  id: 'memoization',
  title: 'Function Memoization',
  difficulty: 'medium',
  category: 'Functional Programming',
  description: `<h2>In-Depth Explanation</h2>

<p>Memoization caches function results based on arguments, avoiding redundant calculations. When a memoized function is called with the same arguments, it returns the cached result instead of recalculating.</p>

<p>The pattern:</p>
<ol>
  <li>Check if result exists in cache for given arguments</li>
  <li>If yes, return cached result</li>
  <li>If no, compute result, store in cache, return result</li>
</ol>

<p>Memoization is particularly powerful for:</p>
<ul>
  <li><strong>Recursive Functions</strong>: Dramatically speeds up recursive algorithms (like Fibonacci)</li>
  <li><strong>Expensive Calculations</strong>: Caching results of expensive operations</li>
  <li><strong>Pure Functions</strong>: Works best with pure functions (same input → same output)</li>
  <li><strong>API Calls</strong>: Caching API responses (with expiration)</li>
</ul>

<h2>Importance</h2>

<p>Memoization is essential for performance optimization because:</p>

<ul>
  <li><strong>Performance</strong>: Dramatically speeds up expensive calculations</li>
  <li><strong>Recursive Algorithms</strong>: Essential for efficient recursive functions</li>
  <li><strong>Resource Efficiency</strong>: Reduces CPU usage and API calls</li>
  <li><strong>User Experience</strong>: Faster response times improve UX</li>
  <li><strong>Cost Reduction</strong>: Fewer API calls reduce costs</li>
  <li><strong>Scalability</strong>: Enables applications to handle more load</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Memoization is used extensively:</p>

<ul>
  <li><strong>Recursive Algorithms</strong>: Fibonacci, factorial, dynamic programming</li>
  <li><strong>API Caching</strong>: Caching API responses to reduce network calls</li>
  <li><strong>Expensive Calculations</strong>: Mathematical computations, data processing</li>
  <li><strong>React</strong>: React.memo, useMemo for component and value memoization</li>
  <li><strong>GraphQL</strong>: Field-level caching in GraphQL resolvers</li>
  <li><strong>Image Processing</strong>: Caching processed images</li>
  <li><strong>Data Transformation</strong>: Caching transformed data</li>
  <li><strong>Search Results</strong>: Caching search results</li>
</ul>

<p><strong>Challenge:</strong> Implement memoization for expensive calculations.</p>`,
  examples: [
    {
      input: `const memoFib = memoize(fib); memoFib(40)`,
      output: `Fast result (cached)`,
      explanation: 'Subsequent calls use cached value',
    },
  ],
  starterCode: `// TODO: Create a memoize function that caches results
// Only works for single-argument functions for simplicity
function memoize(fn) {
  // Create cache (Map or object)
  // Return function that checks cache before calling fn

  return fn;
}

// Test with fibonacci
function slowFib(n) {
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
}

// TODO: Create memoized fibonacci that's actually fast
function fastFib(n, memo = {}) {
  // Use memo object to cache results
  if (n <= 1) return n;
  return fastFib(n - 1) + fastFib(n - 2);
}

// Test
const memoizedFib = memoize(n => {
  if (n <= 1) return n;
  return memoizedFib(n - 1) + memoizedFib(n - 2);
});

console.log(memoizedFib(10));
console.log(fastFib(10));`,
  solution: `// Create a memoize function that caches results
// Only works for single-argument functions for simplicity
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

// Test with fibonacci
function slowFib(n) {
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
}

// Memoized fibonacci that's actually fast
function fastFib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n];
  memo[n] = fastFib(n - 1, memo) + fastFib(n - 2, memo);
  return memo[n];
}

// Test
const memoizedFib = memoize(n => {
  if (n <= 1) return n;
  return memoizedFib(n - 1) + memoizedFib(n - 2);
});

console.log(memoizedFib(10)); // 55
console.log(fastFib(10)); // 55`,
  testCases: [
    {
      input: 10,
      expectedOutput: 55,
      description: 'Memoized fibonacci of 10 returns 55',
    },
    {
      input: 0,
      expectedOutput: 0,
      description: 'Fibonacci of 0 returns 0',
    },
    {
      input: 1,
      expectedOutput: 1,
      description: 'Fibonacci of 1 returns 1',
    },
    {
      input: 20,
      expectedOutput: 6765,
      description: 'Memoized fibonacci of 20 returns 6765',
    },
  ],
  hints: [
    'Use Map for cache: cache.has(key), cache.get(key), cache.set(key, value)',
    'Check cache before computing',
    'For recursive functions, pass memo object as parameter',
  ],
};
