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
  solution: `// 1. TTL (Time-To-Live) Cache
class TTLCache {
  constructor(ttl) {
    // Initialize with TTL in milliseconds
    this.ttl = ttl;
    this.cache = new Map();
  }

  set(key, value) {
    // Store value with expiration timestamp
    this.cache.set(key, {
      value,
      expires: Date.now() + this.ttl
    });
  }

  get(key) {
    // Return value if not expired, null otherwise
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expires) {
      this.cache.delete(key);
      return null;
    }
    return entry.value;
  }

  has(key) {
    // Check if key exists and is not expired
    return this.get(key) !== null;
  }

  delete(key) {
    // Remove key from cache
    return this.cache.delete(key);
  }

  clear() {
    // Clear all entries
    this.cache.clear();
  }
}

// 2. LRU (Least Recently Used) Cache
class LRUCache {
  constructor(maxSize) {
    // Initialize with max size limit
    this.maxSize = maxSize;
    this.cache = new Map();
  }

  get(key) {
    // Return value and mark as recently used
    if (!this.cache.has(key)) return null;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key, value) {
    // Add/update value, evict LRU if at capacity
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

// 3. Stale-While-Revalidate Cache
class SWRCache {
  constructor(fetcher, options = {}) {
    // options: { ttl, staleTime }
    // fetcher: async function to fetch fresh data
    this.fetcher = fetcher;
    this.ttl = options.ttl || 5000;
    this.staleTime = options.staleTime || 10000;
    this.cache = new Map();
  }

  async get(key) {
    // Return cached data immediately if available
    // Revalidate in background if stale
    // Fetch and wait if no cache
    const entry = this.cache.get(key);
    const now = Date.now();
    
    if (!entry) {
      const value = await this.fetcher(key);
      this.cache.set(key, { value, timestamp: now });
      return value;
    }
    
    const age = now - entry.timestamp;
    if (age < this.ttl) {
      return entry.value;
    }
    
    if (age < this.staleTime) {
      this.fetcher(key).then(value => {
        this.cache.set(key, { value, timestamp: Date.now() });
      }).catch(console.error);
      return entry.value;
    }
    
    const value = await this.fetcher(key);
    this.cache.set(key, { value, timestamp: now });
    return value;
  }
}

// 4. Memoize with cache options
function memoizeWithCache(fn, options = {}) {
  // options: { maxSize, ttl, keyGenerator }
  // Return memoized function with configurable cache
  const cache = options.ttl ? new TTLCache(options.ttl) : new Map();
  const keyGenerator = options.keyGenerator || ((...args) => JSON.stringify(args));
  const maxSize = options.maxSize;

  return function(...args) {
    const key = keyGenerator(...args);

    if (cache instanceof TTLCache) {
      const cached = cache.get(key);
      if (cached !== null) return cached;
    } else {
      if (cache.has(key)) return cache.get(key);
    }

    const result = fn(...args);

    if (cache instanceof TTLCache) {
      cache.set(key, result);
    } else {
      if (maxSize && cache.size >= maxSize) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      cache.set(key, result);
    }

    return result;
  };
}

// Test wrapper functions for automated testing
function testTTLCache(key, value, ttl) {
  const cache = new TTLCache(ttl);
  cache.set(key, value);
  return cache.get(key);
}

function testTTLCacheExpiration(key, value) {
  // Use TTL of 1ms and wait to ensure expiration
  const cache = new TTLCache(1);
  cache.set(key, value);
  // Simulate time passing by checking after expiration
  const start = Date.now();
  while (Date.now() - start < 5) {} // Busy wait 5ms
  return cache.get(key);
}

function testTTLCacheHas(key, value, ttl) {
  const cache = new TTLCache(ttl);
  cache.set(key, value);
  return cache.has(key);
}

function testLRUCache(key, value, maxSize) {
  const lru = new LRUCache(maxSize);
  lru.set(key, value);
  return lru.get(key);
}

function testLRUCacheEviction(maxSize, keys) {
  const lru = new LRUCache(maxSize);
  keys.forEach((k, i) => lru.set(k, i + 1));
  // After adding more items than maxSize, the first key should be evicted
  return lru.get(keys[0]);
}

function testLRUCacheAccessOrder(maxSize) {
  const lru = new LRUCache(maxSize);
  lru.set('a', 1);
  lru.set('b', 2);
  lru.set('c', 3);
  lru.get('a'); // Access 'a' to make it recently used
  lru.set('d', 4); // Should evict 'b' (least recently used)
  return lru.get('a'); // 'a' should still exist
}

function testMemoizeWithCache(x) {
  let callCount = 0;
  const fn = (n) => { callCount++; return n * 2; };
  const memoized = memoizeWithCache(fn, { maxSize: 10 });
  memoized(x);
  memoized(x); // Second call should use cache
  return callCount; // Should be 1 because second call was cached
}`,
  testCases: [
    {
      input: ['myKey', 'myValue', 10000],
      expectedOutput: 'myValue',
      description: 'testTTLCache stores and retrieves value before expiration',
    },
    {
      input: ['expiredKey', 'expiredValue'],
      expectedOutput: null,
      description: 'testTTLCacheExpiration returns null for expired entry after TTL passes',
    },
    {
      input: ['validKey', 'validValue', 10000],
      expectedOutput: true,
      description: 'testTTLCacheHas returns true for valid non-expired key',
    },
    {
      input: ['a', 1, 5],
      expectedOutput: 1,
      description: 'testLRUCache stores and retrieves value correctly',
    },
    {
      input: [3, ['a', 'b', 'c', 'd']],
      expectedOutput: null,
      description: 'testLRUCacheEviction evicts first key when capacity exceeded',
    },
    {
      input: [3],
      expectedOutput: 1,
      description: 'testLRUCacheAccessOrder keeps accessed keys and evicts least recently used',
    },
    {
      input: [5],
      expectedOutput: 1,
      description: 'testMemoizeWithCache only calls function once for repeated inputs',
    },
    {
      input: [42],
      expectedOutput: 1,
      description: 'testMemoizeWithCache caches results and returns cached value on second call',
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
