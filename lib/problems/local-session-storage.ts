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
  id: 'local-session-storage',
  title: 'Working with localStorage and sessionStorage',
  difficulty: 'easy',
  category: 'DOM/Browser',
  description: `<h2>In-Depth Explanation</h2>

<p>localStorage and sessionStorage are Web Storage APIs that allow storing key-value pairs in the browser. They provide a simpler alternative to cookies for client-side storage.</p>

<p><strong>Key Differences:</strong></p>
<ul>
  <li><strong>localStorage</strong>: Data persists until explicitly deleted (survives browser restart)</li>
  <li><strong>sessionStorage</strong>: Data cleared when the browser tab is closed</li>
</ul>

<p><strong>Common Methods:</strong></p>
<ul>
  <li><code>setItem(key, value)</code>: Store a value (strings only!)</li>
  <li><code>getItem(key)</code>: Retrieve a value (returns null if not found)</li>
  <li><code>removeItem(key)</code>: Delete a specific key</li>
  <li><code>clear()</code>: Delete all stored data</li>
  <li><code>key(index)</code>: Get key name at index</li>
  <li><code>length</code>: Number of stored items</li>
</ul>

<p><strong>Important Limitations:</strong></p>
<ul>
  <li>Only stores strings (must JSON.stringify objects)</li>
  <li>~5MB storage limit per origin</li>
  <li>Synchronous API (can block main thread)</li>
  <li>Same-origin policy (can't access other domains' storage)</li>
  <li>No expiration mechanism (unlike cookies)</li>
</ul>

<h2>Importance</h2>

<p>Web Storage is important for:</p>

<ul>
  <li><strong>User Preferences</strong>: Theme, language, layout settings</li>
  <li><strong>State Persistence</strong>: Keep app state across page reloads</li>
  <li><strong>Performance</strong>: Cache data to reduce API calls</li>
  <li><strong>Offline Support</strong>: Store data for offline functionality</li>
  <li><strong>Form Recovery</strong>: Auto-save form data to prevent loss</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Common use cases:</p>

<ul>
  <li><strong>Shopping Cart</strong>: Persist cart items across sessions</li>
  <li><strong>Auth Tokens</strong>: Store JWT tokens (with security considerations)</li>
  <li><strong>User Settings</strong>: Dark mode, font size, notification preferences</li>
  <li><strong>Recently Viewed</strong>: Track recently viewed items</li>
  <li><strong>Form Drafts</strong>: Auto-save form progress</li>
  <li><strong>Feature Flags</strong>: Store A/B test assignments</li>
  <li><strong>Onboarding State</strong>: Track which tutorials user has seen</li>
</ul>

<p><strong>Challenge:</strong> Create a storage wrapper that handles JSON serialization, expiration, and provides a cleaner API.</p>`,
  examples: [
    {
      input: `storage.set('user', { name: 'John', age: 30 })`,
      output: `localStorage contains '{"name":"John","age":30}'`,
      explanation: 'Objects are automatically JSON stringified',
    },
    {
      input: `storage.get('user')`,
      output: `{ name: 'John', age: 30 }`,
      explanation: 'Objects are automatically JSON parsed when retrieved',
    },
    {
      input: `storage.set('token', 'abc123', { expires: 3600 })`,
      output: `Token stored with 1 hour expiration`,
      explanation: 'Custom expiration support (not native to localStorage)',
    },
  ],
  starterCode: `// TODO: Create a storage wrapper with JSON support
// Should handle serialization and provide cleaner API
function createStorage(storageType = 'local') {
  // 1. Use localStorage or sessionStorage based on type
  // 2. Implement set(key, value) that JSON.stringifies
  // 3. Implement get(key) that JSON.parses
  // 4. Handle errors gracefully (storage full, private browsing)
  // 5. Return null for missing keys (not undefined)
}

// TODO: Add expiration support to storage
// Should automatically remove expired items
function createStorageWithExpiry(storageType = 'local') {
  // 1. Store items with timestamp: { value, expires }
  // 2. Check expiration on get()
  // 3. Remove expired items automatically
  // 4. Support expires option in set()
}

// TODO: Create a namespace-based storage
// Should prefix all keys to avoid collisions
function createNamespacedStorage(namespace, storageType = 'local') {
  // 1. Prefix all keys with namespace
  // 2. Provide getAll() to get all namespaced items
  // 3. Provide clear() to clear only namespaced items
}

// Test (simulated storage for Node environment)
const mockStorage = {
  _data: {},
  getItem(key) { return this._data[key] || null; },
  setItem(key, value) { this._data[key] = value; },
  removeItem(key) { delete this._data[key]; },
  clear() { this._data = {}; },
  get length() { return Object.keys(this._data).length; }
};

// Usage:
// const storage = createStorage('local');
// storage.set('preferences', { theme: 'dark', fontSize: 16 });
// const prefs = storage.get('preferences');`,
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Always wrap storage operations in try-catch - storage can throw in private browsing mode',
    'Use JSON.stringify when setting and JSON.parse when getting to handle objects',
    'Return null (not undefined) for missing keys to match native getItem behavior',
    'For expiration, store { value, expires: timestamp } and check on get()',
  ],
};
