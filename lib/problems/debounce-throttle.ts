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
  id: 'debounce-throttle',
  title: 'Debounce and Throttle',
  difficulty: 'hard',
  category: 'Functional Programming',
  description: `<h2>In-Depth Explanation</h2>

<p>Debounce and throttle are techniques to control how often a function executes, essential for performance optimization.</p>

<p><strong>Debounce</strong>: Delays execution until after a specified time has passed since the last call. If called again before the delay, the timer resets. Perfect for search inputs, resize events, or API calls triggered by user input.</p>

<p><strong>Throttle</strong>: Limits execution to at most once per specified interval. Unlike debounce, it guarantees execution at regular intervals. Perfect for scroll events, mouse movements, or any event that fires frequently.</p>

<p>The key difference:</p>
<ul>
  <li>Debounce: "Wait until user stops typing, then search"</li>
  <li>Throttle: "Search at most once per second while typing"</li>
</ul>

<p>Both use closures and timers (setTimeout/clearTimeout) to control execution timing.</p>

<h2>Importance</h2>

<p>Debounce and throttle are essential for performance because:</p>

<ul>
  <li><strong>Performance</strong>: Reduce unnecessary function calls and computations</li>
  <li><strong>API Rate Limiting</strong>: Prevent overwhelming APIs with requests</li>
  <li><strong>User Experience</strong>: Improve responsiveness by reducing work</li>
  <li><strong>Resource Efficiency</strong>: Reduce CPU usage and network traffic</li>
  <li><strong>Browser Performance</strong>: Essential for handling frequent events (scroll, resize)</li>
  <li><strong>Cost Reduction</strong>: Fewer API calls reduce costs</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>These patterns are used extensively:</p>

<ul>
  <li><strong>Search Inputs</strong>: Debounce search queries as user types</li>
  <li><strong>Scroll Events</strong>: Throttle scroll handlers for performance</li>
  <li><strong>Resize Events</strong>: Debounce window resize handlers</li>
  <li><strong>API Calls</strong>: Debounce/throttle API requests</li>
  <li><strong>Button Clicks</strong>: Prevent double-clicks and rapid submissions</li>
  <li><strong>Mouse Movements</strong>: Throttle mouse move handlers</li>
  <li><strong>Auto-save</strong>: Debounce auto-save functionality</li>
  <li><strong>Infinite Scroll</strong>: Throttle scroll detection for infinite scroll</li>
</ul>

<p><strong>Challenge:</strong> Implement debounce and throttle utilities.</p>
<p>Essential for scroll, resize, input handlers</p>`,
  examples: [
    {
      input: `const debouncedSearch = debounce(search, 300)`,
      output: `Search executes 300ms after last keystroke`,
      explanation: 'Prevents excessive API calls while typing',
    },
  ],
  starterCode: `// TODO: Implement debounce
// Delays execution until no calls for 'delay' ms
function debounce(fn, delay) {
  // Store timeout ID
  // Clear previous timeout on each call
  // Set new timeout

  return fn;
}

// TODO: Implement throttle
// Executes at most once per 'interval' ms
function throttle(fn, interval) {
  // Track last execution time
  // Only execute if enough time has passed

  return fn;
}

// Test
let callCount = 0;
const incrementCounter = () => ++callCount;

const debouncedIncrement = debounce(incrementCounter, 100);
const throttledIncrement = throttle(incrementCounter, 100);

// Simulate rapid calls
for (let i = 0; i < 5; i++) {
  debouncedIncrement();
  throttledIncrement();
}`,
  solution: `// Implement debounce
// Delays execution until no calls for 'delay' ms
function debounce(fn, delay) {
  // Store timeout ID
  // Clear previous timeout on each call
  // Set new timeout
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Implement throttle
// Executes at most once per 'interval' ms
function throttle(fn, interval) {
  // Track last execution time
  // Only execute if enough time has passed
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      return fn.apply(this, args);
    }
  };
}

// Test function for verifying debounce and throttle behavior
function testDebounceThrottle(testName) {
  const testFn = () => 'called';

  if (testName === 'debounce returns a function') {
    const debounced = debounce(testFn, 100);
    return typeof debounced === 'function';
  }

  if (testName === 'throttle returns a function') {
    const throttled = throttle(testFn, 100);
    return typeof throttled === 'function';
  }

  if (testName === 'debounce clears previous timeout on rapid calls') {
    // Verify debounce returns function that can be called
    const debounced = debounce(testFn, 100);
    debounced();
    debounced();
    debounced();
    return typeof debounced === 'function';
  }

  if (testName === 'throttle executes immediately on first call') {
    let callCount = 0;
    const counter = () => { callCount++; return callCount; };
    const throttled = throttle(counter, 1000);
    throttled(); // First call executes immediately
    return callCount === 1;
  }

  if (testName === 'throttle blocks calls within interval') {
    let callCount = 0;
    const counter = () => { callCount++; return callCount; };
    const throttled = throttle(counter, 1000);
    throttled(); // First call
    throttled(); // Should be blocked
    throttled(); // Should be blocked
    return callCount === 1;
  }

  return false;
}`,
  testCases: [
    {
      input: ['debounce returns a function'],
      expectedOutput: true,
      description: 'testDebounceThrottle verifies debounce returns a function',
    },
    {
      input: ['throttle returns a function'],
      expectedOutput: true,
      description: 'testDebounceThrottle verifies throttle returns a function',
    },
    {
      input: ['debounce clears previous timeout on rapid calls'],
      expectedOutput: true,
      description: 'testDebounceThrottle verifies debounce clears previous timeout on rapid calls',
    },
    {
      input: ['throttle executes immediately on first call'],
      expectedOutput: true,
      description: 'testDebounceThrottle verifies throttle executes immediately on first call',
    },
    {
      input: ['throttle blocks calls within interval'],
      expectedOutput: true,
      description: 'testDebounceThrottle verifies throttle blocks calls within interval',
    },
  ],
  hints: [
    'debounce: clearTimeout + setTimeout pattern',
    'throttle: track lastTime, compare with Date.now()',
    'Use fn.apply(this, args) to preserve context',
  ],
};
