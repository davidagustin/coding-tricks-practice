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
  solution: `// Pattern 1: Fallback Chain
interface FallbackSource<T> {
  name: string;
  fetch: () => Promise<T>;
  priority: number;
}

class FallbackChain<T> {
  private sources: FallbackSource<T>[] = [];
  private lastSuccessfulSource: string | null = null;

  addSource(source: FallbackSource<T>): this {
    this.sources.push(source);
    this.sources.sort((a, b) => a.priority - b.priority);
    return this;
  }

  async execute(): Promise<{ data: T; source: string }> {
    const errors: Error[] = [];
    for (const source of this.sources) {
      try {
        const data = await source.fetch();
        this.lastSuccessfulSource = source.name;
        return { data, source: source.name };
      } catch (err) {
        errors.push(err as Error);
      }
    }
    throw new Error(\`All sources failed: \${errors.map(e => e.message).join(', ')}\`);
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

class CircuitOpenError extends Error {
  constructor() {
    super('Circuit breaker is open');
    this.name = 'CircuitOpenError';
  }
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
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime >= this.options.resetTimeout) {
        this.state = 'half-open';
        this.halfOpenSuccesses = 0;
      } else {
        throw new CircuitOpenError();
      }
    }

    try {
      const result = await fn();
      if (this.state === 'half-open') {
        this.halfOpenSuccesses++;
        if (this.halfOpenSuccesses >= this.options.halfOpenRequests) {
          this.state = 'closed';
          this.failures = 0;
        }
      } else {
        this.failures = 0;
      }
      return result;
    } catch (err) {
      this.failures++;
      this.lastFailureTime = Date.now();
      if (this.failures >= this.options.failureThreshold) {
        this.state = 'open';
      }
      throw err;
    }
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
    const cached = this.cache.get(key);
    const now = Date.now();

    if (cached) {
      const isFresh = now - cached.timestamp < this.options.ttl;
      if (isFresh) {
        return { data: cached.data, stale: false, fromCache: true };
      }
      if (this.options.staleWhileRevalidate) {
        // Return stale data immediately, refresh in background
        fetcher().then(data => {
          this.cache.set(key, { data, timestamp: Date.now() });
        }).catch(() => {});
        return { data: cached.data, stale: true, fromCache: true };
      }
    }

    const data = await fetcher();
    this.cache.set(key, { data, timestamp: now });
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
  testCases: [
    {
      input: ['primary', 'secondary'],
      expectedOutput: { data: 'primary data', source: 'primary' },
      description: 'FallbackChain returns data from first successful source',
    },
    {
      input: ['closed'],
      expectedOutput: 'closed',
      description: 'CircuitBreaker starts in closed state',
    },
    {
      input: ['cached', true],
      expectedOutput: { fromCache: true, stale: false },
      description: 'CachedFetcher returns cached data when fresh',
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
