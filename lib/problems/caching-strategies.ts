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
  solution: `// 1. Simple Cache with TTL (Time-To-Live)
class TTLCache {
  constructor(defaultTTL = 60000) {
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  set(key, value, ttl = this.defaultTTL) {
    const expiresAt = Date.now() + ttl;
    this.cache.set(key, { value, expiresAt });
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  delete(key) {
    return this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  // Cleanup expired entries
  prune() {
    const now = Date.now();
    for (const [key, entry] of this.cache) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}

// 2. LRU (Least Recently Used) Cache
class LRUCache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.cache = new Map(); // Map maintains insertion order
  }

  get(key) {
    if (!this.cache.has(key)) return undefined;

    // Move to end (most recently used)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  set(key, value) {
    // If key exists, delete to update position
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    // If at capacity, delete oldest (first) entry
    else if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, value);
  }

  has(key) {
    return this.cache.has(key);
  }

  get size() {
    return this.cache.size;
  }
}

// 3. Stale-While-Revalidate Cache
class SWRCache {
  constructor(fetcher, options = {}) {
    this.fetcher = fetcher;
    this.ttl = options.ttl || 60000;
    this.staleTime = options.staleTime || 30000;
    this.cache = new Map();
    this.pending = new Map();
  }

  async get(key) {
    const entry = this.cache.get(key);
    const now = Date.now();

    // No cache - fetch and wait
    if (!entry) {
      return this.fetchAndCache(key);
    }

    // Fresh data - return immediately
    if (now < entry.staleAt) {
      return entry.value;
    }

    // Stale but not expired - return stale, revalidate in background
    if (now < entry.expiresAt) {
      this.revalidate(key);
      return entry.value;
    }

    // Expired - fetch fresh
    return this.fetchAndCache(key);
  }

  async fetchAndCache(key) {
    // Deduplicate concurrent requests
    if (this.pending.has(key)) {
      return this.pending.get(key);
    }

    const promise = this.fetcher(key).then(value => {
      const now = Date.now();
      this.cache.set(key, {
        value,
        staleAt: now + this.staleTime,
        expiresAt: now + this.ttl
      });
      this.pending.delete(key);
      return value;
    });

    this.pending.set(key, promise);
    return promise;
  }

  revalidate(key) {
    if (!this.pending.has(key)) {
      this.fetchAndCache(key);
    }
  }
}

// 4. Memoize with cache options
function memoizeWithCache(fn, options = {}) {
  const {
    maxSize = 100,
    ttl = null,
    keyGenerator = (...args) => JSON.stringify(args)
  } = options;

  const cache = ttl ? new TTLCache(ttl) : new LRUCache(maxSize);

  return function(...args) {
    const key = keyGenerator(...args);

    if (ttl) {
      if (cache.has(key)) return cache.get(key);
      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
    } else {
      if (cache.has(key)) return cache.get(key);
      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
    }
  };
}`,
  testCases: [
    {
      input: { key: 'user:1', value: { name: 'John' }, ttl: 1000, waitTime: 500 },
      expectedOutput: { name: 'John' },
      description: 'TTLCache.get returns cached value before expiration (500ms < 1000ms TTL)',
    },
    {
      input: { key: 'user:1', value: { name: 'John' }, ttl: 100, waitTime: 200 },
      expectedOutput: undefined,
      description: 'TTLCache.get returns undefined after TTL expires (200ms > 100ms TTL)',
    },
    {
      input: { maxSize: 3, operations: [['set', 'a', 1], ['set', 'b', 2], ['set', 'c', 3], ['get', 'a'], ['set', 'd', 4], ['get', 'b']] },
      expectedOutput: { a: 1, b: undefined, c: 3, d: 4 },
      description: 'LRUCache evicts least recently used (b) when adding d after accessing a',
    },
    {
      input: { maxSize: 2, operations: [['set', 'x', 10], ['set', 'y', 20], ['set', 'x', 15], ['set', 'z', 30]] },
      expectedOutput: { x: 15, y: undefined, z: 30 },
      description: 'LRUCache: updating x makes it recent, so y gets evicted when z is added',
    },
    {
      input: { fn: 'expensive', args: [[5], [5], [10], [5]], maxSize: 2 },
      expectedOutput: { callCount: 3, results: [25, 25, 100, 25] },
      description: 'memoizeWithCache caches results, fn called 3 times for unique args',
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
