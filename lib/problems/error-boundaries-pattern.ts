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
  id: 'error-boundaries-pattern',
  title: 'Implementing Error Boundary Patterns',
  difficulty: 'medium',
  category: 'Error Handling',
  description: `<h2>In-Depth Explanation</h2>

<p>Error boundaries are a pattern for containing errors within a specific scope, preventing them from crashing an entire application. While React has built-in error boundaries for component trees, the concept applies broadly to any modular system.</p>

<p>The error boundary pattern involves:</p>
<ol>
  <li><strong>Isolation</strong>: Wrap potentially failing code in a boundary</li>
  <li><strong>Capture</strong>: Catch errors at the boundary level</li>
  <li><strong>Fallback</strong>: Provide alternative behavior when errors occur</li>
  <li><strong>Reporting</strong>: Log or report errors for debugging</li>
  <li><strong>Recovery</strong>: Allow the system to continue operating</li>
</ol>

<p>Key concepts:</p>
<ul>
  <li><strong>Error Containment</strong>: Errors don't propagate beyond the boundary</li>
  <li><strong>Graceful Degradation</strong>: Failed components show fallback UI/data</li>
  <li><strong>Error State</strong>: Track whether an error has occurred</li>
  <li><strong>Reset Capability</strong>: Allow recovery from error states</li>
</ul>

<h2>Importance</h2>

<p>Error boundaries are important because:</p>

<ul>
  <li><strong>Resilience</strong>: One failing module doesn't crash the entire application</li>
  <li><strong>User Experience</strong>: Users see helpful fallbacks instead of blank screens</li>
  <li><strong>Debugging</strong>: Errors are captured and reported systematically</li>
  <li><strong>Isolation</strong>: Third-party code failures are contained</li>
  <li><strong>Partial Functionality</strong>: Working features remain accessible</li>
</ul>

<h2>Practical Applications</h2>

<ul>
  <li><strong>UI Components</strong>: React error boundaries for component trees</li>
  <li><strong>Plugin Systems</strong>: Isolating plugin failures from core functionality</li>
  <li><strong>API Endpoints</strong>: Containing route handler errors</li>
  <li><strong>Worker Threads</strong>: Handling errors in background processes</li>
  <li><strong>Event Handlers</strong>: Preventing one handler from breaking others</li>
  <li><strong>Data Processing</strong>: Processing valid items despite some failures</li>
</ul>

<p><strong>Challenge:</strong> Implement a generic error boundary class and utilities for JavaScript/TypeScript applications.</p>`,
  examples: [
    {
      input: `boundary.execute(() => JSON.parse('valid'))`,
      output: `{ success: true, data: 'valid' }`,
      explanation: 'Successful execution passes through normally',
    },
    {
      input: `boundary.execute(() => { throw new Error('fail'); })`,
      output: `{ success: false, error: Error, fallback: defaultValue }`,
      explanation: 'Errors are caught and fallback is returned',
    },
    {
      input: `boundary.hasError()`,
      output: `true`,
      explanation: 'Boundary tracks error state for recovery decisions',
    },
  ],
  starterCode: `// TODO: Implement Error Boundary Pattern (simplified synchronous version)

// Execute a single value safely - if value is 'error', return fallback
function executeSafe(value, fallback) {
  // TODO: If value === 'error', simulate an error and return fallback
  // Otherwise return the value
  return value;
}

// Execute multiple values and track errors
function executeMultiple(values, fallback) {
  // TODO: Process each value using error boundary pattern
  // If a value is 'error', use fallback instead and count it as an error
  // Return { results: [...], errorCount: number }
  return { results: [], errorCount: 0 };
}

// Test
console.log(executeSafe('success', 'default'));  // 'success'
console.log(executeSafe('error', 'default'));    // 'default'
console.log(executeMultiple(['ok', 'error', 'ok'], 'fallback'));
// { results: ['ok', 'fallback', 'ok'], errorCount: 1 }`,
  solution: `// Execute a single value safely - if value is 'error', return fallback
function executeSafe(value, fallback) {
  try {
    if (value === 'error') {
      throw new Error('Simulated error');
    }
    return value;
  } catch (err) {
    return fallback;
  }
}

// Execute multiple values and track errors
function executeMultiple(values, fallback) {
  const results = [];
  let errorCount = 0;

  for (const value of values) {
    try {
      if (value === 'error') {
        throw new Error('Simulated error');
      }
      results.push(value);
    } catch (err) {
      results.push(fallback);
      errorCount++;
    }
  }

  return { results, errorCount };
}

// Test
console.log(executeSafe('success', 'default'));  // 'success'
console.log(executeSafe('error', 'default'));    // 'default'
console.log(executeMultiple(['ok', 'error', 'ok'], 'fallback'));
// { results: ['ok', 'fallback', 'ok'], errorCount: 1 }`,
  testCases: [
    {
      input: ['success', 'default'],
      expectedOutput: 'success',
      description: 'executeSafe returns result when value is not "error"',
    },
    {
      input: ['error', 'default'],
      expectedOutput: 'default',
      description: 'executeSafe returns fallback when value is "error"',
    },
    {
      input: [['ok', 'error', 'ok'], 'fallback'],
      expectedOutput: { results: ['ok', 'fallback', 'ok'], errorCount: 1 },
      description: 'executeMultiple processes all values and counts errors',
    },
    {
      input: [['error', 'error'], 'fallback'],
      expectedOutput: { results: ['fallback', 'fallback'], errorCount: 2 },
      description: 'executeMultiple tracks multiple errors correctly',
    },
  ],
  hints: [
    'Always convert caught values to Error instances for consistent handling',
    'The shouldCatch predicate allows selective error handling',
    'Track error state to enable recovery and debugging',
    'Use the onError callback for logging and monitoring',
    'Consider circuit breaker patterns for repeated failures',
  ],
};
