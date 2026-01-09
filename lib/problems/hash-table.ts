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
  id: 'hash-table',
  title: 'Hash Table with Collision Handling',
  difficulty: 'hard',
  category: 'Data Structures',
  description: `<h2>In-Depth Explanation</h2>

<p>A <strong>Hash Table</strong> (also called Hash Map) is a data structure that implements an associative array, mapping keys to values. It uses a <strong>hash function</strong> to compute an index into an array of buckets, from which the desired value can be found.</p>

<p>Key components of a hash table:</p>

<ul>
  <li><strong>Hash Function</strong>: Converts a key into an array index</li>
  <li><strong>Buckets</strong>: Array slots where key-value pairs are stored</li>
  <li><strong>Collision Handling</strong>: Strategy for when two keys hash to the same index</li>
</ul>

<p>Common collision handling strategies:</p>

<ul>
  <li><strong>Separate Chaining</strong>: Each bucket contains a linked list of entries</li>
  <li><strong>Open Addressing</strong>: Find another empty slot using probing (linear, quadratic, double hashing)</li>
</ul>

<p>Key operations include:</p>

<ul>
  <li><strong>set(key, value)</strong>: Add or update a key-value pair</li>
  <li><strong>get(key)</strong>: Retrieve the value for a given key</li>
  <li><strong>delete(key)</strong>: Remove a key-value pair</li>
  <li><strong>has(key)</strong>: Check if a key exists</li>
  <li><strong>keys()</strong>: Get all keys</li>
  <li><strong>values()</strong>: Get all values</li>
</ul>

<h2>Importance</h2>

<p>Hash Tables are one of the most important data structures because:</p>

<ul>
  <li><strong>O(1) Average Time</strong>: Constant time for insert, lookup, and delete operations</li>
  <li><strong>Flexible Keys</strong>: Can use strings, numbers, or objects as keys</li>
  <li><strong>Foundation for Objects</strong>: JavaScript objects and Maps are hash tables</li>
  <li><strong>Essential for Caching</strong>: Memoization and caching rely on hash tables</li>
  <li><strong>Database Indexing</strong>: Hash indexes enable fast record lookup</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Hash Tables are everywhere in software development:</p>

<ul>
  <li><strong>Dictionaries/Maps</strong>: Key-value storage in all programming languages</li>
  <li><strong>Caching</strong>: LRU caches, memoization, browser caches</li>
  <li><strong>Database Indexing</strong>: Fast record retrieval</li>
  <li><strong>Counting/Frequency</strong>: Word frequency, anagram detection</li>
  <li><strong>De-duplication</strong>: Finding unique values efficiently</li>
  <li><strong>Symbol Tables</strong>: Variable lookup in compilers/interpreters</li>
  <li><strong>Routing Tables</strong>: Network packet routing</li>
  <li><strong>Sets</strong>: Implemented using hash tables with just keys</li>
</ul>

<h2>Time Complexity</h2>

<table>
  <tr><th>Operation</th><th>Average Case</th><th>Worst Case</th></tr>
  <tr><td>Insert</td><td>O(1)</td><td>O(n)</td></tr>
  <tr><td>Lookup</td><td>O(1)</td><td>O(n)</td></tr>
  <tr><td>Delete</td><td>O(1)</td><td>O(n)</td></tr>
</table>

<p><em>Note: Worst case occurs with many collisions (poor hash function or very full table)</em></p>

<p><strong>Challenge:</strong> Implement a Hash Table using separate chaining for collision handling with set, get, delete, has, keys, and values methods.</p>`,
  examples: [
    {
      input: `const ht = new HashTable();
ht.set('name', 'Alice');
ht.set('age', 30);
ht.get('name');`,
      output: `'Alice'`,
      explanation: 'get() retrieves the value associated with the key',
    },
    {
      input: `const ht = new HashTable();
ht.set('a', 1);
ht.set('b', 2);
ht.has('a');
ht.has('c');`,
      output: `true, false`,
      explanation: 'has() returns true if key exists, false otherwise',
    },
    {
      input: `const ht = new HashTable();
ht.set('x', 100);
ht.set('x', 200);
ht.get('x');`,
      output: `200`,
      explanation: 'set() with existing key updates the value',
    },
  ],
  starterCode: `class HashTable<K, V> {
  private buckets: Array<Array<[K, V]>>;
  private size: number;
  private count: number;

  constructor(size: number = 53) {
    // TODO: Initialize buckets array with given size
    // Each bucket will hold an array of [key, value] pairs
  }

  private hash(key: K): number {
    // TODO: Implement a hash function
    // Convert key to string, then compute hash
    // Return index within bounds of buckets array
    // Hint: Sum char codes and use modulo
    return 0;
  }

  set(key: K, value: V): void {
    // TODO: Add or update a key-value pair
    // 1. Compute hash to find bucket index
    // 2. Check if key already exists in bucket - update if so
    // 3. If not, add new [key, value] pair to bucket
  }

  get(key: K): V | undefined {
    // TODO: Retrieve value for given key
    // 1. Compute hash to find bucket
    // 2. Search bucket for matching key
    // 3. Return value if found, undefined otherwise
    return undefined;
  }

  delete(key: K): boolean {
    // TODO: Remove key-value pair
    // Return true if deleted, false if key not found
    return false;
  }

  has(key: K): boolean {
    // TODO: Check if key exists
    return false;
  }

  keys(): K[] {
    // TODO: Return array of all keys
    return [];
  }

  values(): V[] {
    // TODO: Return array of all values
    return [];
  }

  entries(): Array<[K, V]> {
    // TODO: Return array of all [key, value] pairs
    return [];
  }

  getSize(): number {
    return this.count;
  }
}

// Test your implementation
const ht = new HashTable<string, number>();
ht.set('one', 1);
ht.set('two', 2);
ht.set('three', 3);
console.log('Get "two":', ht.get('two'));
console.log('Has "one":', ht.has('one'));
console.log('Has "four":', ht.has('four'));
console.log('Keys:', ht.keys());
console.log('Values:', ht.values());
ht.delete('two');
console.log('After delete:', ht.keys());

// Helper functions for testing
function htGet(key: string, value: string): string | undefined {
  const ht = new HashTable<string, string>();
  ht.set(key, value);
  return ht.get(key);
}

function htHas(keys: string[], checkKey: string): boolean {
  const ht = new HashTable<string, number>();
  for (let i = 0; i < keys.length; i++) {
    ht.set(keys[i], i);
  }
  return ht.has(checkKey);
}

function htUpdate(key: string, value1: number, value2: number): number | undefined {
  const ht = new HashTable<string, number>();
  ht.set(key, value1);
  ht.set(key, value2);
  return ht.get(key);
}

function htDelete(keys: string[], deleteKey: string): string[] {
  const ht = new HashTable<string, number>();
  for (let i = 0; i < keys.length; i++) {
    ht.set(keys[i], i);
  }
  ht.delete(deleteKey);
  return ht.keys().sort();
}`,
  solution: `class HashTable<K, V> {
  private buckets: Array<Array<[K, V]>>;
  private size: number;
  private count: number;

  constructor(size: number = 53) {
    // Initialize buckets array with given size
    // Each bucket will hold an array of [key, value] pairs
    this.size = size;
    this.count = 0;
    this.buckets = Array(size).fill(null).map(() => []);
  }

  private hash(key: K): number {
    // Implement a hash function
    // Convert key to string, then compute hash
    // Return index within bounds of buckets array
    // Hint: Sum char codes and use modulo
    const str = String(key);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash + str.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  set(key: K, value: V): void {
    // Add or update a key-value pair
    // 1. Compute hash to find bucket index
    // 2. Check if key already exists in bucket - update if so
    // 3. If not, add new [key, value] pair to bucket
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const existing = bucket.find(([k]) => k === key);
    
    if (existing) {
      existing[1] = value;
    } else {
      bucket.push([key, value]);
      this.count++;
    }
  }

  get(key: K): V | undefined {
    // Retrieve value for given key
    // 1. Compute hash to find bucket
    // 2. Search bucket for matching key
    // 3. Return value if found, undefined otherwise
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const pair = bucket.find(([k]) => k === key);
    return pair ? pair[1] : undefined;
  }

  delete(key: K): boolean {
    // Remove key-value pair
    // Return true if deleted, false if key not found
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const pairIndex = bucket.findIndex(([k]) => k === key);
    
    if (pairIndex !== -1) {
      bucket.splice(pairIndex, 1);
      this.count--;
      return true;
    }
    return false;
  }

  has(key: K): boolean {
    // Check if key exists
    return this.get(key) !== undefined;
  }

  keys(): K[] {
    // Return array of all keys
    const result: K[] = [];
    for (const bucket of this.buckets) {
      for (const [key] of bucket) {
        result.push(key);
      }
    }
    return result;
  }

  values(): V[] {
    // Return array of all values
    const result: V[] = [];
    for (const bucket of this.buckets) {
      for (const [, value] of bucket) {
        result.push(value);
      }
    }
    return result;
  }

  entries(): Array<[K, V]> {
    // Return array of all [key, value] pairs
    const result: Array<[K, V]> = [];
    for (const bucket of this.buckets) {
      result.push(...bucket);
    }
    return result;
  }

  getSize(): number {
    return this.count;
  }
}

// Helper functions for testing
function htGet(key: string, value: string): string | undefined {
  const ht = new HashTable<string, string>();
  ht.set(key, value);
  return ht.get(key);
}

function htHas(keys: string[], checkKey: string): boolean {
  const ht = new HashTable<string, number>();
  for (let i = 0; i < keys.length; i++) {
    ht.set(keys[i], i);
  }
  return ht.has(checkKey);
}

function htUpdate(key: string, value1: number, value2: number): number | undefined {
  const ht = new HashTable<string, number>();
  ht.set(key, value1);
  ht.set(key, value2);
  return ht.get(key);
}

function htDelete(keys: string[], deleteKey: string): string[] {
  const ht = new HashTable<string, number>();
  for (let i = 0; i < keys.length; i++) {
    ht.set(keys[i], i);
  }
  ht.delete(deleteKey);
  return ht.keys().sort();
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Use separate chaining: each bucket is an array that can hold multiple [key, value] pairs',
    'A good hash function distributes keys evenly - use prime numbers and character codes',
    'When setting, always check if key exists first to update rather than duplicate',
    'Use a prime number for the table size to reduce clustering of hash values',
  ],
};
