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
    description: `## In-Depth Explanation

Debounce and throttle are techniques to control how often a function executes, essential for performance optimization.

**Debounce**: Delays execution until after a specified time has passed since the last call. If called again before the delay, the timer resets. Perfect for search inputs, resize events, or API calls triggered by user input.

**Throttle**: Limits execution to at most once per specified interval. Unlike debounce, it guarantees execution at regular intervals. Perfect for scroll events, mouse movements, or any event that fires frequently.

The key difference:
- Debounce: "Wait until user stops typing, then search"
- Throttle: "Search at most once per second while typing"

Both use closures and timers (setTimeout/clearTimeout) to control execution timing.

## Importance

Debounce and throttle are essential for performance because:

- **Performance**: Reduce unnecessary function calls and computations
- **API Rate Limiting**: Prevent overwhelming APIs with requests
- **User Experience**: Improve responsiveness by reducing work
- **Resource Efficiency**: Reduce CPU usage and network traffic
- **Browser Performance**: Essential for handling frequent events (scroll, resize)
- **Cost Reduction**: Fewer API calls reduce costs

## Usefulness & Practical Applications

These patterns are used extensively:

- **Search Inputs**: Debounce search queries as user types
- **Scroll Events**: Throttle scroll handlers for performance
- **Resize Events**: Debounce window resize handlers
- **API Calls**: Debounce/throttle API requests
- **Button Clicks**: Prevent double-clicks and rapid submissions
- **Mouse Movements**: Throttle mouse move handlers
- **Auto-save**: Debounce auto-save functionality
- **Infinite Scroll**: Throttle scroll detection for infinite scroll

**Challenge:** Implement debounce and throttle utilities.
- Essential for scroll, resize, input handlers`,
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
    solution: `function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, interval) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      return fn.apply(this, args);
    }
  };
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'debounce delays execution',
      },
      {
        input: [],
        expectedOutput: true,
        description: 'throttle limits execution rate',
      },
    ],
    hints: [
      'debounce: clearTimeout + setTimeout pattern',
      'throttle: track lastTime, compare with Date.now()',
      'Use fn.apply(this, args) to preserve context',
    ],
  };
