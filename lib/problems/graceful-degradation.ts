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
  id: 'graceful-degradation',
  title: 'Graceful Degradation and Fallback Strategies',
  difficulty: 'hard',
  category: 'Error Handling',
  description: `<h2>In-Depth Explanation</h2>

<p>Graceful degradation is a design philosophy where a system continues to operate when some of its components fail, possibly with reduced functionality. Combined with fallback strategies, it ensures users can still accomplish their goals even when primary services are unavailable.</p>

<p>Key graceful degradation patterns:</p>
<ol>
  <li><strong>Fallback Chain</strong>: Try multiple data sources in order of preference</li>
  <li><strong>Circuit Breaker</strong>: Stop calling failing services temporarily</li>
  <li><strong>Cache Fallback</strong>: Return cached data when live data is unavailable</li>
  <li><strong>Feature Flags</strong>: Disable problematic features dynamically</li>
  <li><strong>Default Values</strong>: Use sensible defaults when data fetch fails</li>
  <li><strong>Partial Responses</strong>: Return available data even if some parts fail</li>
</ol>

<p>Circuit breaker states:</p>
<ul>
  <li><strong>Closed</strong>: Normal operation, requests pass through</li>
  <li><strong>Open</strong>: Too many failures, requests fail fast</li>
  <li><strong>Half-Open</strong>: Testing if service has recovered</li>
</ul>

<h2>Importance</h2>

<p>Graceful degradation is critical for production systems:</p>

<ul>
  <li><strong>Availability</strong>: Systems remain operational during partial failures</li>
  <li><strong>User Experience</strong>: Users get some value even when things go wrong</li>
  <li><strong>Cascade Prevention</strong>: Failing services don't bring down dependent systems</li>
  <li><strong>Recovery Time</strong>: Reduces load on recovering services</li>
  <li><strong>Cost Efficiency</strong>: Prevents expensive retry storms</li>
</ul>

<h2>Practical Applications</h2>

<ul>
  <li><strong>E-commerce</strong>: Show cached prices when pricing service is down</li>
  <li><strong>Social Media</strong>: Display cached feed when recommendation engine fails</li>
  <li><strong>Payment Systems</strong>: Queue transactions when payment gateway is slow</li>
  <li><strong>Maps/Navigation</strong>: Use cached maps when offline</li>
  <li><strong>Search</strong>: Return partial results when some shards are unavailable</li>
  <li><strong>Analytics</strong>: Buffer events when collection service is down</li>
</ul>

<p><strong>Challenge:</strong> Implement a comprehensive fallback system with circuit breaker and caching.</p>`,
  examples: [
    {
      input: `fallbackChain.execute()`,
      output: `{ data: 'from primary', source: 'primary' }`,
      explanation: 'Returns data from first successful source in chain',
    },
    {
      input: `circuitBreaker.call(failingService)`,
      output: `CircuitOpenError: Circuit breaker is open`,
      explanation: 'After threshold failures, circuit opens to fail fast',
    },
    {
      input: `cachedFetch(url, { staleWhileRevalidate: true })`,
      output: `{ data: cachedData, stale: true }`,
      explanation: 'Returns stale cache while fetching fresh data in background',
    },
  ],
  starterCode: `// TODO: Implement Graceful Degradation Patterns

// Pattern 1: Fallback Chain
// Try multiple sources in order until one succeeds
interface FallbackSource<T> {
  name: string;
  fetch: () => Promise<T>;
  priority: number;
}

class FallbackChain<T> {
  private sources: FallbackSource<T>[] = [];
  private lastSuccessfulSource: string | null = null;

  addSource(source: FallbackSource<T>): this {
    // TODO: Add source, keep sorted by priority
    return this;
  }

  async execute(): Promise<{ data: T; source: string }> {
    // TODO: Try each source in priority order
    // Return first successful result with source name
    throw new Error('All sources failed');
  }

  getLastSuccessfulSource(): string | null {
    return this.lastSuccessfulSource;
  }
}

// Pattern 2: Circuit Breaker
type CircuitState = 'closed' | 'open' | 'half-open';

interface CircuitBreakerOptions {
  failureThreshold: number;
  resetTimeout: number;
  halfOpenRequests: number;
}

class CircuitBreaker {
  private state: CircuitState = 'closed';
  private failures: number = 0;
  private lastFailureTime: number = 0;
  private halfOpenSuccesses: number = 0;
  private options: CircuitBreakerOptions;

  constructor(options: CircuitBreakerOptions) {
    this.options = options;
  }

  async call<T>(fn: () => Promise<T>): Promise<T> {
    // TODO: Implement circuit breaker logic
    // - If open, check if reset timeout passed (move to half-open)
    // - If open and timeout not passed, throw CircuitOpenError
    // - If closed or half-open, try the call
    // - Track failures and successes
    return fn();
  }

  getState(): CircuitState {
    return this.state;
  }

  getFailureCount(): number {
    return this.failures;
  }

  reset(): void {
    this.state = 'closed';
    this.failures = 0;
    this.halfOpenSuccesses = 0;
  }
}

// Pattern 3: Cache with Stale-While-Revalidate
interface CacheOptions {
  ttl: number;
  staleWhileRevalidate?: boolean;
}

class CachedFetcher<T> {
  private cache: Map<string, { data: T; timestamp: number }> = new Map();
  private options: CacheOptions;

  constructor(options: CacheOptions) {
    this.options = options;
  }

  async fetch(
    key: string,
    fetcher: () => Promise<T>
  ): Promise<{ data: T; stale: boolean; fromCache: boolean }> {
    // TODO: Implement cache with stale-while-revalidate
    // - Check cache first
    // - If fresh, return cached data
    // - If stale but staleWhileRevalidate, return stale and refresh in background
    // - If no cache or expired, fetch fresh
    const data = await fetcher();
    return { data, stale: false, fromCache: false };
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

// Test
async function runTests() {
  const chain = new FallbackChain<string>();
  chain
    .addSource({ name: 'primary', fetch: async () => 'primary data', priority: 1 })
    .addSource({ name: 'secondary', fetch: async () => 'secondary data', priority: 2 });

  const result = await chain.execute();
  console.log(result);
}

runTests();`,
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Sort fallback sources by priority to try them in the correct order',
    'Circuit breaker should track both failure count and time of last failure',
    'Use timestamps for cache entries to calculate freshness',
    'Background refresh should not block the main response',
    'Consider combining patterns: cache -> circuit breaker -> fallback chain',
    'Custom error classes help identify specific failure modes',
  ],
};
