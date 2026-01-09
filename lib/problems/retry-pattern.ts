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
  id: 'retry-pattern',
  title: 'Retry Pattern with Exponential Backoff',
  difficulty: 'hard',
  category: 'Async/Promises',
  description: `<h2>In-Depth Explanation</h2>

<p>The retry pattern with exponential backoff is a resilience strategy for handling transient failures. Instead of retrying immediately, you wait progressively longer between attempts (delay doubles each time: 100ms, 200ms, 400ms, etc.).</p>

<p>Exponential backoff is crucial because:</p>
<ol>
  <li>Transient failures often resolve themselves (network hiccups, temporary server overload)</li>
  <li>Immediate retries can overwhelm already-struggling servers</li>
  <li>Increasing delays give systems time to recover</li>
  <li>Prevents "thundering herd" problems where many clients retry simultaneously</li>
</ol>

<p>The pattern typically includes:</p>
<ul>
  <li>Maximum retry count to prevent infinite loops</li>
  <li>Initial delay that doubles each attempt</li>
  <li>Optional jitter (random variation) to prevent synchronized retries</li>
  <li>Error handling to distinguish retryable vs non-retryable errors</li>
</ul>

<h2>Importance</h2>

<p>Retry patterns are essential for production applications because:</p>

<ul>
  <li><strong>Resilience</strong>: Handles transient network and server failures automatically</li>
  <li><strong>User Experience</strong>: Transparently retries failed operations without user intervention</li>
  <li><strong>Server Protection</strong>: Exponential backoff prevents overwhelming struggling servers</li>
  <li><strong>Cost Efficiency</strong>: Reduces failed API calls and improves success rates</li>
  <li><strong>Reliability</strong>: Critical for distributed systems and microservices</li>
  <li><strong>Best Practice</strong>: Industry standard for handling unreliable networks</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This pattern is used extensively in production:</p>

<ul>
  <li><strong>API Clients</strong>: Retrying failed API requests with exponential backoff</li>
  <li><strong>Database Operations</strong>: Retrying transient database connection failures</li>
  <li><strong>File Operations</strong>: Retrying file I/O operations that may fail temporarily</li>
  <li><strong>WebSocket Connections</strong>: Reconnecting WebSocket with backoff</li>
  <li><strong>Payment Processing</strong>: Retrying payment transactions (with care for idempotency)</li>
  <li><strong>Data Synchronization</strong>: Retrying sync operations between systems</li>
  <li><strong>Queue Processing</strong>: Retrying failed queue message processing</li>
  <li><strong>Service Discovery</strong>: Retrying service discovery lookups</li>
</ul>

<p><strong>Challenge:</strong> Retry a function with increasing delays.</p>`,
  examples: [
    {
      input: `retryWithBackoff(fetchData, { maxRetries: 3 })`,
      output: `Retries with delays: 100ms, 200ms, 400ms`,
      explanation: 'Exponential backoff reduces server load',
    },
  ],
  starterCode: `async function retryWithBackoff(fn, options = {}) {
  const { maxRetries = 3, initialDelay = 100 } = options;
  
  // TODO: Implement retry with exponential backoff
  // Try fn(), if it fails, wait and retry
  // Delay doubles each time: initialDelay, initialDelay*2, initialDelay*4, ...
  // Throw error if all retries fail
  
  return fn();
}

// Test
async function fetchData() {
  // Simulated API that might fail
  if (Math.random() > 0.5) throw new Error('Failed');
  return 'Success';
}

// Test (commented out to prevent immediate execution)
// retryWithBackoff(fetchData, { maxRetries: 3, initialDelay: 100 })
//   .then(console.log)
//   .catch(console.error);`,
  solution: `async function retryWithBackoff(fn, options = {}) {
  // Retry function with exponential backoff
  // options: { maxRetries: 3, initialDelay: 100 }
  // Calculate delay: initialDelay * 2^attempt
  const { maxRetries = 3, initialDelay = 100 } = options;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      const delay = initialDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

async function fetchData() {
  // Simulated API that might fail
  if (Math.random() > 0.5) throw new Error('Failed');
  return 'Success';
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Loop up to maxRetries times',
    'Calculate delay: initialDelay * 2^attempt',
    'Use setTimeout wrapped in Promise for delay',
  ],
};
