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
    description: `## In-Depth Explanation

The retry pattern with exponential backoff is a resilience strategy for handling transient failures. Instead of retrying immediately, you wait progressively longer between attempts (delay doubles each time: 100ms, 200ms, 400ms, etc.).

Exponential backoff is crucial because:
1. Transient failures often resolve themselves (network hiccups, temporary server overload)
2. Immediate retries can overwhelm already-struggling servers
3. Increasing delays give systems time to recover
4. Prevents "thundering herd" problems where many clients retry simultaneously

The pattern typically includes:
- Maximum retry count to prevent infinite loops
- Initial delay that doubles each attempt
- Optional jitter (random variation) to prevent synchronized retries
- Error handling to distinguish retryable vs non-retryable errors

## Importance

Retry patterns are essential for production applications because:

- **Resilience**: Handles transient network and server failures automatically
- **User Experience**: Transparently retries failed operations without user intervention
- **Server Protection**: Exponential backoff prevents overwhelming struggling servers
- **Cost Efficiency**: Reduces failed API calls and improves success rates
- **Reliability**: Critical for distributed systems and microservices
- **Best Practice**: Industry standard for handling unreliable networks

## Usefulness & Practical Applications

This pattern is used extensively in production:

- **API Clients**: Retrying failed API requests with exponential backoff
- **Database Operations**: Retrying transient database connection failures
- **File Operations**: Retrying file I/O operations that may fail temporarily
- **WebSocket Connections**: Reconnecting WebSocket with backoff
- **Payment Processing**: Retrying payment transactions (with care for idempotency)
- **Data Synchronization**: Retrying sync operations between systems
- **Queue Processing**: Retrying failed queue message processing
- **Service Discovery**: Retrying service discovery lookups

**Challenge:** Retry a function with increasing delays.`,
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

// Test function
async function testRetryWithBackoff() {
  let attempts = 0;
  const fn = async () => {
    attempts++;
    if (attempts < 2) throw new Error('Failed');
    return 'Success';
  };
  
  try {
    const result = await retryWithBackoff(fn, { maxRetries: 3, initialDelay: 10 });
    return result === 'Success';
  } catch (e) {
    return false;
  }
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'testRetryWithBackoff',
      },
    ],
    hints: [
      'Loop up to maxRetries times',
      'Calculate delay: initialDelay * 2^attempt',
      'Use setTimeout wrapped in Promise for delay',
    ],
  };
