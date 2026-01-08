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
    description: `## In-Depth Explanation

Memoization caches function results based on arguments, avoiding redundant calculations. When a memoized function is called with the same arguments, it returns the cached result instead of recalculating.

The pattern:
1. Check if result exists in cache for given arguments
2. If yes, return cached result
3. If no, compute result, store in cache, return result

Memoization is particularly powerful for:
- **Recursive Functions**: Dramatically speeds up recursive algorithms (like Fibonacci)
- **Expensive Calculations**: Caching results of expensive operations
- **Pure Functions**: Works best with pure functions (same input → same output)
- **API Calls**: Caching API responses (with expiration)

## Importance

Memoization is essential for performance optimization because:

- **Performance**: Dramatically speeds up expensive calculations
- **Recursive Algorithms**: Essential for efficient recursive functions
- **Resource Efficiency**: Reduces CPU usage and API calls
- **User Experience**: Faster response times improve UX
- **Cost Reduction**: Fewer API calls reduce costs
- **Scalability**: Enables applications to handle more load

## Usefulness & Practical Applications

Memoization is used extensively:

- **Recursive Algorithms**: Fibonacci, factorial, dynamic programming
- **API Caching**: Caching API responses to reduce network calls
- **Expensive Calculations**: Mathematical computations, data processing
- **React**: React.memo, useMemo for component and value memoization
- **GraphQL**: Field-level caching in GraphQL resolvers
- **Image Processing**: Caching processed images
- **Data Transformation**: Caching transformed data
- **Search Results**: Caching search results

**Challenge:** Implement memoization for expensive calculations.`,
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
    solution: `function memoize(fn) {
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

function fastFib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fastFib(n - 1, memo) + fastFib(n - 2, memo);
  return memo[n];
}`,
    testCases: [
      {
        input: [10],
        expectedOutput: 55,
        description: 'memoizedFib(10)',
      },
      {
        input: [10],
        expectedOutput: 55,
        description: 'fastFib(10)',
      },
      {
        input: [20],
        expectedOutput: 6765,
        description: 'fastFib(20)',
      },
    ],
    hints: [
      'Use Map for cache: cache.has(key), cache.get(key), cache.set(key, value)',
      'Check cache before computing',
      'For recursive functions, pass memo object as parameter',
    ],
  };