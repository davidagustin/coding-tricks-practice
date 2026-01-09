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
  starterCode: `// TODO: Implement Graceful Degradation Patterns (synchronous versions)

// Pattern 1: Fallback Chain
// Try multiple sources in order until one succeeds
// sources is an array of source names, 'error' means that source fails
// defaultValue is used when all sources fail
function getFallbackData(sources, defaultValue) {
  // TODO: Try each source in order
  // If source === 'error', it fails, try next
  // If source succeeds, return { data: sourceName + ' data', source: sourceName }
  // If all fail and defaultValue provided, return { data: defaultValue, source: 'fallback' }
  // If all fail and no defaultValue, throw error
  return { data: null, source: null };
}

// Pattern 2: Circuit Breaker State
// Simulate circuit breaker: after threshold failures, state becomes 'open'
function getCircuitState(operation, failureCount, threshold) {
  // TODO: If failureCount >= threshold, return 'open'
  // Otherwise return 'closed'
  return 'closed';
}

// Pattern 3: Cache Lookup
// Check if we should use cached data or fetch fresh
function getCacheResult(cachedData, cacheAge, maxAge) {
  // TODO: If cacheAge <= maxAge and cachedData exists, return { data: cachedData, fromCache: true, stale: false }
  // If cacheAge > maxAge but cachedData exists, return { data: cachedData, fromCache: true, stale: true }
  // If no cachedData, return { data: null, fromCache: false, stale: false }
  return { data: null, fromCache: false, stale: false };
}

// Test
console.log(getFallbackData(['primary', 'secondary'], null));
console.log(getFallbackData(['error', 'secondary'], null));
console.log(getFallbackData(['error', 'error'], 'default'));
console.log(getCircuitState('data', 5, 3));`,
  solution: `// Pattern 1: Fallback Chain
function getFallbackData(sources, defaultValue) {
  for (const source of sources) {
    try {
      if (source === 'error') {
        throw new Error('Source failed');
      }
      return { data: source + ' data', source: source };
    } catch (err) {
      // Try next source
    }
  }

  // All sources failed
  if (defaultValue !== null && defaultValue !== undefined) {
    return { data: defaultValue, source: 'fallback' };
  }
  throw new Error('All sources failed');
}

// Pattern 2: Circuit Breaker State
function getCircuitState(operation, failureCount, threshold) {
  if (failureCount >= threshold) {
    return 'open';
  }
  return 'closed';
}

// Pattern 3: Cache Lookup
function getCacheResult(cachedData, cacheAge, maxAge) {
  if (!cachedData) {
    return { data: null, fromCache: false, stale: false };
  }
  if (cacheAge <= maxAge) {
    return { data: cachedData, fromCache: true, stale: false };
  }
  return { data: cachedData, fromCache: true, stale: true };
}

// Test
console.log(getFallbackData(['primary', 'secondary'], null));
console.log(getFallbackData(['error', 'secondary'], null));
console.log(getFallbackData(['error', 'error'], 'default'));
console.log(getCircuitState('data', 5, 3));`,
  testCases: [
    {
      input: [['primary', 'secondary'], null],
      expectedOutput: { data: 'primary data', source: 'primary' },
      description: 'getFallbackData returns data from first available source',
    },
    {
      input: [['error', 'secondary'], null],
      expectedOutput: { data: 'secondary data', source: 'secondary' },
      description: 'getFallbackData falls back to secondary when primary fails',
    },
    {
      input: [['error', 'error'], 'default'],
      expectedOutput: { data: 'default', source: 'fallback' },
      description: 'getFallbackData uses default when all sources fail',
    },
    {
      input: ['data', 5, 3],
      expectedOutput: 'open',
      description: 'getCircuitState returns open after threshold failures',
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
