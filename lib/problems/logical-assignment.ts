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
  id: 'logical-assignment',
  title: 'Logical Assignment Operators (??=, ||=, &&=)',
  difficulty: 'easy',
  category: 'ES6+ Features',
  description: `<h2>In-Depth Explanation</h2>

<p>ES2021 introduced three logical assignment operators that combine logical operators with assignment. These provide a concise way to conditionally assign values.</p>

<h3>The Three Operators</h3>

<h4>1. Nullish Coalescing Assignment (??=)</h4>
<pre><code>x ??= y  // Equivalent to: x = x ?? y
// Assigns y to x only if x is null or undefined</code></pre>

<h4>2. Logical OR Assignment (||=)</h4>
<pre><code>x ||= y  // Equivalent to: x = x || y
// Assigns y to x only if x is falsy</code></pre>

<h4>3. Logical AND Assignment (&&=)</h4>
<pre><code>x &&= y  // Equivalent to: x = x && y
// Assigns y to x only if x is truthy</code></pre>

<h3>Key Differences</h3>
<ul>
  <li><code>??=</code>: Only assigns for <code>null</code> or <code>undefined</code></li>
  <li><code>||=</code>: Assigns for any falsy value (<code>false</code>, <code>0</code>, <code>''</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>)</li>
  <li><code>&&=</code>: Only assigns if current value is truthy</li>
</ul>

<h3>Short-Circuit Behavior</h3>
<p>These operators short-circuit - if the condition isn't met, the assignment doesn't happen (no setter is called):</p>
<pre><code>const obj = { get x() { return 1; }, set x(v) { console.log('set!'); } };
obj.x ||= 2;  // 'set!' is NOT logged because x is truthy</code></pre>

<h2>Importance</h2>

<ul>
  <li><strong>Concise Code</strong>: Replace verbose if-then-assign patterns</li>
  <li><strong>Default Values</strong>: Clean way to set defaults on objects</li>
  <li><strong>Lazy Initialization</strong>: Initialize only when needed</li>
  <li><strong>Configuration Merging</strong>: Fill in missing config values</li>
  <li><strong>Short-Circuit Efficiency</strong>: Avoids unnecessary setter calls</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<ul>
  <li><strong>Object Defaults</strong>: <code>options.timeout ??= 5000</code></li>
  <li><strong>Lazy Loading</strong>: <code>this.cache ||= expensiveCompute()</code></li>
  <li><strong>Conditional Update</strong>: <code>user.isAdmin &&= checkAdminStatus()</code></li>
  <li><strong>Counting</strong>: <code>counts[key] ??= 0; counts[key]++</code></li>
  <li><strong>Feature Flags</strong>: <code>config.feature ??= defaultFeatureValue</code></li>
</ul>

<p><strong>Challenge:</strong> Use logical assignment operators to simplify common patterns.</p>`,
  examples: [
    {
      input: `let x = null;
x ??= 10;
x`,
      output: `10`,
      explanation: '??= assigns because x is null',
    },
    {
      input: `let x = 0;
x ??= 10;
x`,
      output: `0`,
      explanation: '??= does NOT assign because 0 is not nullish',
    },
    {
      input: `let x = 0;
x ||= 10;
x`,
      output: `10`,
      explanation: '||= assigns because 0 is falsy',
    },
    {
      input: `let x = 'hello';
x &&= x.toUpperCase();
x`,
      output: `'HELLO'`,
      explanation: '&&= assigns because x is truthy',
    },
  ],
  starterCode: `// Task 1: Implement a function that sets default values on an options object
// Use ??= to set defaults only for null/undefined values
function setDefaults(options) {
  // TODO: Set these defaults using ??=
  // timeout: 5000
  // retries: 3
  // debug: false
  // name: 'default'

  // Your code here - use ??= for each property

  return options;
}

// Task 2: Implement lazy initialization using ||=
// The cache should only be computed once
function createLazyCache() {
  const obj = {
    _cache: null,

    getData() {
      // TODO: Use ||= to initialize _cache only if falsy
      // When initializing, set it to { computed: true, timestamp: Date.now() }

      return this._cache;
    }
  };
  return obj;
}

// Task 3: Implement conditional transformation using &&=
// Only transform values if they are truthy
function transformIfPresent(data) {
  // TODO: Use &&= to transform properties only if they exist and are truthy
  // name: uppercase it (str.toUpperCase())
  // email: lowercase it (str.toLowerCase())
  // age: double it (n * 2)
  // Don't transform if the value is falsy (null, undefined, '', 0, etc.)

  return data;
}

// Task 4: Implement a counter object using ??=
function createWordCounter() {
  const counts = {};

  return {
    count(word) {
      // TODO: Use ??= to initialize counts[word] to 0 if not exists
      // Then increment it

      return counts[word];
    },

    getCounts() {
      return { ...counts };
    }
  };
}

// Task 5: Rewrite these if statements using logical assignment
function simplifyCode(obj) {
  // Rewrite each of these using logical assignment operators

  // Original: if (obj.value === null || obj.value === undefined) obj.value = 'default';
  // TODO: Use ??=
  if (obj.value === null || obj.value === undefined) obj.value = 'default';

  // Original: if (!obj.items) obj.items = [];
  // TODO: Use ||=
  if (!obj.items) obj.items = [];

  // Original: if (obj.name) obj.name = obj.name.trim();
  // TODO: Use &&=
  if (obj.name) obj.name = obj.name.trim();

  return obj;
}

// Test
console.log(setDefaults({ timeout: null, name: 'custom' }));
// { timeout: 5000, retries: 3, debug: false, name: 'custom' }

const cache = createLazyCache();
console.log(cache.getData());  // { computed: true, timestamp: ... }
console.log(cache.getData() === cache.getData());  // true (same object)

console.log(transformIfPresent({ name: 'john', email: 'JOHN@EXAMPLE.COM', age: 25 }));
// { name: 'JOHN', email: 'john@example.com', age: 50 }

const counter = createWordCounter();
counter.count('hello');
counter.count('world');
counter.count('hello');
console.log(counter.getCounts());  // { hello: 2, world: 1 }

console.log(simplifyCode({ value: null, items: null, name: '  hello  ' }));
// { value: 'default', items: [], name: 'hello' }`,
  solution: `// Task 1: Implement a function that sets default values on an options object
function setDefaults(options) {
  options.timeout ??= 5000;
  options.retries ??= 3;
  options.debug ??= false;
  options.name ??= 'default';
  return options;
}

// Task 2: Implement lazy initialization using ||=
function createLazyCache() {
  const obj = {
    _cache: null,

    getData() {
      this._cache ||= { computed: true, timestamp: Date.now() };
      return this._cache;
    }
  };
  return obj;
}

// Task 3: Implement conditional transformation using &&=
function transformIfPresent(data) {
  data.name &&= data.name.toUpperCase();
  data.email &&= data.email.toLowerCase();
  data.age &&= data.age * 2;
  return data;
}

// Task 4: Implement a counter object using ??=
function createWordCounter() {
  const counts = {};

  return {
    count(word) {
      counts[word] ??= 0;
      counts[word]++;
      return counts[word];
    },

    getCounts() {
      return { ...counts };
    }
  };
}

// Task 5: Rewrite these if statements using logical assignment
function simplifyCode(obj) {
  obj.value ??= 'default';
  obj.items ||= [];
  obj.name &&= obj.name.trim();
  return obj;
}

// Test
console.log(setDefaults({ timeout: null, name: 'custom' }));
// { timeout: 5000, retries: 3, debug: false, name: 'custom' }

const cache = createLazyCache();
console.log(cache.getData());  // { computed: true, timestamp: ... }
console.log(cache.getData() === cache.getData());  // true (same object)

console.log(transformIfPresent({ name: 'john', email: 'JOHN@EXAMPLE.COM', age: 25 }));
// { name: 'JOHN', email: 'john@example.com', age: 50 }

const counter = createWordCounter();
counter.count('hello');
counter.count('world');
counter.count('hello');
console.log(counter.getCounts());  // { hello: 2, world: 1 }

console.log(simplifyCode({ value: null, items: null, name: '  hello  ' }));
// { value: 'default', items: [], name: 'hello' }`,
  testCases: [
    {
      input: [{ timeout: null, name: 'custom' }],
      expectedOutput: { timeout: 5000, retries: 3, debug: false, name: 'custom' },
      description: 'setDefaults - uses ??= for null/undefined only',
    },
    {
      input: [{ timeout: 0, retries: 0 }],
      expectedOutput: { timeout: 0, retries: 0, debug: false, name: 'default' },
      description: 'setDefaults - preserves falsy values like 0',
    },
    {
      input: [{ name: 'john', email: 'JOHN@EXAMPLE.COM', age: 25 }],
      expectedOutput: { name: 'JOHN', email: 'john@example.com', age: 50 },
      description: 'transformIfPresent - transforms truthy values',
    },
    {
      input: [{ name: '', email: null, age: 0 }],
      expectedOutput: { name: '', email: null, age: 0 },
      description: 'transformIfPresent - skips falsy values',
    },
  ],
  hints: [
    '??= assigns only when the left side is null or undefined',
    '||= assigns when the left side is any falsy value',
    '&&= assigns only when the left side is truthy',
    'These operators short-circuit - no assignment happens if condition not met',
    'Use ??= for defaults where 0, false, or "" are valid values',
  ],
};
