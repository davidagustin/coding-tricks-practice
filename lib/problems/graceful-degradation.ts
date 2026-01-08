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
  solution: `class CircuitOpenError extends Error {
  constructor() {
    super('Circuit breaker is open');
    this.name = 'CircuitOpenError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class AllSourcesFailedError extends Error {
  public errors: Array<{ source: string; error: Error }>;

  constructor(errors: Array<{ source: string; error: Error }>) {
    super('All fallback sources failed');
    this.name = 'AllSourcesFailedError';
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// Pattern 1: Fallback Chain
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
    const errors: Array<{ source: string; error: Error }> = [];

    for (const source of this.sources) {
      try {
        const data = await source.fetch();
        this.lastSuccessfulSource = source.name;
        return { data, source: source.name };
      } catch (err) {
        errors.push({
          source: source.name,
          error: err instanceof Error ? err : new Error(String(err))
        });
      }
    }

    throw new AllSourcesFailedError(errors);
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
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    if (this.state === 'half-open') {
      this.halfOpenSuccesses++;
      if (this.halfOpenSuccesses >= this.options.halfOpenRequests) {
        this.state = 'closed';
        this.failures = 0;
      }
    } else {
      this.failures = 0;
    }
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.state === 'half-open') {
      this.state = 'open';
    } else if (this.failures >= this.options.failureThreshold) {
      this.state = 'open';
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
      const age = now - cached.timestamp;
      const isFresh = age < this.options.ttl;

      if (isFresh) {
        return { data: cached.data, stale: false, fromCache: true };
      }

      if (this.options.staleWhileRevalidate) {
        // Return stale data immediately, refresh in background
        this.refreshInBackground(key, fetcher);
        return { data: cached.data, stale: true, fromCache: true };
      }
    }

    // Fetch fresh data
    try {
      const data = await fetcher();
      this.cache.set(key, { data, timestamp: now });
      return { data, stale: false, fromCache: false };
    } catch (error) {
      // If fetch fails and we have stale data, return it
      if (cached) {
        return { data: cached.data, stale: true, fromCache: true };
      }
      throw error;
    }
  }

  private async refreshInBackground(key: string, fetcher: () => Promise<T>): Promise<void> {
    try {
      const data = await fetcher();
      this.cache.set(key, { data, timestamp: Date.now() });
    } catch {
      // Silently fail background refresh
    }
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

// Combined: Resilient Data Fetcher
class ResilientFetcher<T> {
  private fallbackChain: FallbackChain<T>;
  private circuitBreaker: CircuitBreaker;
  private cachedFetcher: CachedFetcher<T>;

  constructor(
    sources: FallbackSource<T>[],
    circuitOptions: CircuitBreakerOptions,
    cacheOptions: CacheOptions
  ) {
    this.fallbackChain = new FallbackChain();
    sources.forEach(s => this.fallbackChain.addSource(s));
    this.circuitBreaker = new CircuitBreaker(circuitOptions);
    this.cachedFetcher = new CachedFetcher(cacheOptions);
  }

  async fetch(key: string): Promise<{ data: T; source: string; stale: boolean }> {
    const result = await this.cachedFetcher.fetch(key, async () => {
      return this.circuitBreaker.call(async () => {
        const { data, source } = await this.fallbackChain.execute();
        return { data, source };
      });
    });

    return {
      data: (result.data as any).data || result.data,
      source: (result.data as any).source || 'cache',
      stale: result.stale
    };
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
      input: [['primary', 'secondary'], 'primary-succeeds'],
      expectedOutput: { data: 'primary data', source: 'primary' },
      description: 'FallbackChain returns first successful source',
    },
    {
      input: [['primary-fails', 'secondary'], 'primary-fails'],
      expectedOutput: { data: 'secondary data', source: 'secondary' },
      description: 'FallbackChain falls through to secondary when primary fails',
    },
    {
      input: ['circuit-breaker', { failures: 3, threshold: 3 }],
      expectedOutput: { state: 'open', error: 'CircuitOpenError' },
      description: 'CircuitBreaker opens after reaching failure threshold',
    },
    {
      input: ['cache', { key: 'test', ttl: 1000, age: 500 }],
      expectedOutput: { fromCache: true, stale: false },
      description: 'CachedFetcher returns fresh cached data',
    },
    {
      input: ['cache', { key: 'test', ttl: 1000, age: 1500, staleWhileRevalidate: true }],
      expectedOutput: { fromCache: true, stale: true },
      description: 'CachedFetcher returns stale data while revalidating',
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
