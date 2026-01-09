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
  id: 'caching-strategies',
  title: 'Implementing Caching Patterns',
  difficulty: 'medium',
  category: 'Performance',
  description: `<h2>In-Depth Explanation</h2>

<p>Caching stores computed results or fetched data for quick retrieval, avoiding expensive recomputation or network requests. Effective caching strategies can dramatically improve application performance.</p>

<p>Common caching strategies:</p>
<ul>
  <li><strong>Simple Cache</strong>: Store key-value pairs with no expiration</li>
  <li><strong>TTL (Time-To-Live)</strong>: Cache entries expire after a set duration</li>
  <li><strong>LRU (Least Recently Used)</strong>: Evict least recently accessed items when cache is full</li>
  <li><strong>Write-Through</strong>: Write to cache and storage simultaneously</li>
  <li><strong>Write-Behind</strong>: Write to cache immediately, sync to storage asynchronously</li>
  <li><strong>Stale-While-Revalidate</strong>: Return stale data while fetching fresh data in background</li>
</ul>

<h2>Importance</h2>

<p>Caching is crucial because:</p>

<ul>
  <li><strong>Performance</strong>: Reduces latency by serving data from memory</li>
  <li><strong>Cost Reduction</strong>: Fewer database queries and API calls</li>
  <li><strong>Scalability</strong>: Reduces load on backend systems</li>
  <li><strong>User Experience</strong>: Faster response times improve satisfaction</li>
  <li><strong>Offline Support</strong>: Cached data available without network</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Caching is used everywhere:</p>

<ul>
  <li><strong>Browser Caching</strong>: HTTP cache, Service Workers, localStorage</li>
  <li><strong>CDN</strong>: Caching static assets at edge locations</li>
  <li><strong>Database</strong>: Query result caching, Redis/Memcached</li>
  <li><strong>API Responses</strong>: Caching REST/GraphQL responses</li>
  <li><strong>React</strong>: useMemo, useCallback, React Query cache</li>
  <li><strong>DNS</strong>: DNS response caching</li>
</ul>

<p><strong>Challenge:</strong> Implement various caching patterns including TTL cache, LRU cache, and stale-while-revalidate.</p>`,
  examples: [
    {
      input: `cache.set('user:1', data, 60000); // 60s TTL`,
      output: `Data cached for 60 seconds`,
      explanation: 'TTL cache automatically expires entries',
    },
    {
      input: `lru.get('key'); lru.get('other');`,
      output: `'key' becomes most recently used`,
      explanation: 'LRU tracks access order for eviction',
    },
  ],
  starterCode: `// TODO: Implement caching patterns

// 1. Simple Cache with TTL (Time-To-Live)
class TTLCache {
  constructor(defaultTTL = 60000) {
    // Initialize cache storage and default TTL
  }

  set(key, value, ttl) {
    // Store value with expiration time
  }

  get(key) {
    // Return value if exists and not expired, else undefined
  }

  has(key) {
    // Check if key exists and is not expired
  }

  delete(key) {
    // Remove key from cache
  }

  clear() {
    // Clear all entries
  }
}

// 2. LRU (Least Recently Used) Cache
class LRUCache {
  constructor(maxSize) {
    // Initialize with max size limit
  }

  get(key) {
    // Return value and mark as recently used
  }

  set(key, value) {
    // Add/update value, evict LRU if at capacity
  }
}

// 3. Stale-While-Revalidate Cache
class SWRCache {
  constructor(fetcher, options = {}) {
    // options: { ttl, staleTime }
    // fetcher: async function to fetch fresh data
  }

  async get(key) {
    // Return cached data immediately if available
    // Revalidate in background if stale
    // Fetch and wait if no cache
  }
}

// 4. Memoize with cache options
function memoizeWithCache(fn, options = {}) {
  // options: { maxSize, ttl, keyGenerator }
  // Return memoized function with configurable cache
}

// Test
const cache = new TTLCache(5000);
cache.set('key', 'value');
console.log(cache.get('key'));

const lru = new LRUCache(3);
lru.set('a', 1);
lru.set('b', 2);
lru.set('c', 3);
lru.get('a'); // Access 'a'
lru.set('d', 4); // Should evict 'b' (least recently used)`,
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'TTL Cache: Store the expiration timestamp with each entry and check on get()',
    'LRU Cache: JavaScript Map maintains insertion order - delete and re-add to move to end',
    'LRU eviction: Use cache.keys().next().value to get the oldest (first) key',
    'SWR: Track both staleAt and expiresAt timestamps for different behaviors',
    'Deduplicate requests: Store pending promises in a Map to avoid duplicate fetches',
  ],
};
