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
  id: 'deep-clone-json',
  title: 'Deep Cloning with JSON and structuredClone',
  difficulty: 'medium',
  category: 'JSON & Serialization',
  description: `<h2>In-Depth Explanation</h2>

<p>Deep cloning creates a complete, independent copy of an object including all nested objects. There are several approaches in JavaScript, each with different capabilities and limitations.</p>

<h3>JSON Method</h3>
<pre><code>const clone = JSON.parse(JSON.stringify(original));</code></pre>
<p>Simple but has limitations:</p>
<ul>
  <li>Loses undefined, functions, Symbols</li>
  <li>Converts Dates to strings</li>
  <li>Cannot handle circular references</li>
  <li>Doesn't preserve prototype chain</li>
  <li>Fails with Map, Set, RegExp, Error objects</li>
</ul>

<h3>structuredClone (Modern)</h3>
<pre><code>const clone = structuredClone(original);</code></pre>
<p>More powerful, supports:</p>
<ul>
  <li>Date, RegExp, Map, Set, ArrayBuffer, Blob</li>
  <li>Circular references</li>
  <li>Nested structures of supported types</li>
</ul>
<p>Still doesn't clone: Functions, DOM nodes, property descriptors, prototype chain</p>

<h3>Manual Recursive Clone</h3>
<p>Full control but more complex to implement correctly.</p>

<h2>Comparison Table</h2>

<table>
  <tr><th>Feature</th><th>JSON</th><th>structuredClone</th></tr>
  <tr><td>Dates</td><td>Becomes string</td><td>Preserved</td></tr>
  <tr><td>undefined</td><td>Lost</td><td>Preserved</td></tr>
  <tr><td>Functions</td><td>Lost</td><td>Error</td></tr>
  <tr><td>Circular refs</td><td>Error</td><td>Preserved</td></tr>
  <tr><td>Map/Set</td><td>Empty object</td><td>Preserved</td></tr>
  <tr><td>RegExp</td><td>Empty object</td><td>Preserved</td></tr>
</table>

<h2>Practical Applications</h2>

<ul>
  <li><strong>State Management</strong>: Creating new state without mutating original</li>
  <li><strong>Undo/Redo</strong>: Saving snapshots of application state</li>
  <li><strong>Testing</strong>: Creating isolated test fixtures</li>
  <li><strong>Data Processing</strong>: Transforming data without side effects</li>
  <li><strong>API Responses</strong>: Cloning responses before modification</li>
</ul>

<p><strong>Challenge:</strong> Implement various cloning strategies and understand their limitations.</p>`,
  examples: [
    {
      input: `const obj = { a: 1, b: { c: 2 } }; const clone = JSON.parse(JSON.stringify(obj));`,
      output: `{ a: 1, b: { c: 2 } } // Independent copy`,
      explanation: 'Basic deep clone using JSON methods',
    },
    {
      input: `structuredClone({ date: new Date(), map: new Map([['a', 1]]) })`,
      output: `{ date: Date, map: Map }`,
      explanation: 'structuredClone preserves Date and Map types',
    },
    {
      input: `JSON.parse(JSON.stringify({ fn: () => {} }))`,
      output: `{}`,
      explanation: 'JSON method loses functions',
    },
  ],
  starterCode: `function jsonClone(obj) {
  // TODO: Deep clone using JSON.parse/stringify
  // jsonClone({ a: 1, b: { c: 2 } }) → { a: 1, b: { c: 2 } }

  return null;
}

function safeClone(obj) {
  // TODO: Clone using structuredClone with fallback to JSON method
  // Should handle cases where structuredClone might fail
  // safeClone({ a: 1, date: new Date() }) → cloned object with Date preserved

  return null;
}

function cloneWithFunctions(obj) {
  // TODO: Deep clone that preserves functions (manual recursive approach)
  // cloneWithFunctions({ a: 1, fn: x => x * 2 }) → { a: 1, fn: [Function] }

  return null;
}

function compareCloneMethods(obj) {
  // TODO: Return object showing what each clone method preserves
  // Returns { json: {...}, structured: {...}, lostInJson: [...] }
  // Show which properties/types are lost in JSON method

  return {};
}

function cloneExcluding(obj, keysToExclude) {
  // TODO: Deep clone but exclude specified keys at any depth
  // cloneExcluding({ a: 1, b: { c: 2, secret: 'x' } }, ['secret'])
  // → { a: 1, b: { c: 2 } }

  return null;
}

// Test
const testObj = {
  name: 'Test',
  count: 42,
  nested: { value: 100 },
  date: new Date('2024-01-15'),
  fn: (x) => x * 2,
  undef: undefined
};

console.log(jsonClone({ a: 1, b: { c: 2 } }));
console.log(safeClone({ date: new Date(), value: 42 }));
console.log(cloneWithFunctions({ a: 1, fn: x => x + 1 }));
console.log(cloneExcluding({ a: 1, password: 'secret', b: { password: 'also secret', c: 3 } }, ['password']));`,
  solution: `function jsonClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function safeClone(obj) {
  try {
    // Try structuredClone first (better for complex types)
    if (typeof structuredClone === 'function') {
      return structuredClone(obj);
    }
  } catch (e) {
    // structuredClone may fail on functions, DOM nodes, etc.
  }

  // Fallback to JSON method
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    // JSON may fail on circular references
    throw new Error('Unable to clone object: ' + e.message);
  }
}

function cloneWithFunctions(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => cloneWithFunctions(item));
  }

  const cloned = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value === 'function') {
        cloned[key] = value; // Functions are reference-copied (shared)
      } else {
        cloned[key] = cloneWithFunctions(value);
      }
    }
  }

  return cloned;
}

function compareCloneMethods(obj) {
  const lostInJson = [];

  // Check what's lost in JSON
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value === undefined) {
        lostInJson.push({ key, reason: 'undefined values are removed' });
      } else if (typeof value === 'function') {
        lostInJson.push({ key, reason: 'functions are removed' });
      } else if (typeof value === 'symbol') {
        lostInJson.push({ key, reason: 'symbols are removed' });
      } else if (value instanceof Date) {
        lostInJson.push({ key, reason: 'Date becomes string' });
      } else if (value instanceof Map || value instanceof Set) {
        lostInJson.push({ key, reason: 'Map/Set becomes empty object' });
      } else if (value instanceof RegExp) {
        lostInJson.push({ key, reason: 'RegExp becomes empty object' });
      }
    }
  }

  let jsonResult, structuredResult;

  try {
    jsonResult = JSON.parse(JSON.stringify(obj));
  } catch (e) {
    jsonResult = { error: e.message };
  }

  try {
    if (typeof structuredClone === 'function') {
      structuredResult = structuredClone(obj);
    } else {
      structuredResult = { error: 'structuredClone not available' };
    }
  } catch (e) {
    structuredResult = { error: e.message };
  }

  return {
    json: jsonResult,
    structured: structuredResult,
    lostInJson
  };
}

function cloneExcluding(obj, keysToExclude) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => cloneExcluding(item, keysToExclude));
  }

  const cloned = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (!keysToExclude.includes(key)) {
        cloned[key] = cloneExcluding(obj[key], keysToExclude);
      }
    }
  }

  return cloned;
}`,
  testCases: [
    {
      input: [{ a: 1, b: { c: 2, d: { e: 3 } } }],
      expectedOutput: { a: 1, b: { c: 2, d: { e: 3 } } },
      description: 'jsonClone creates deep copy of nested object',
    },
    {
      input: [{ items: [1, 2, { nested: true }] }],
      expectedOutput: { items: [1, 2, { nested: true }] },
      description: 'jsonClone handles arrays with nested objects',
    },
    {
      input: [{ value: 42, data: { inner: 'test' } }],
      expectedOutput: { value: 42, data: { inner: 'test' } },
      description: 'safeClone returns proper clone',
    },
    {
      input: [{ a: 1, b: { c: 2 } }],
      expectedOutput: { a: 1, b: { c: 2 } },
      description: 'cloneWithFunctions handles objects without functions',
    },
    {
      input: [{ arr: [1, 2, 3], nested: { arr: [4, 5] } }],
      expectedOutput: { arr: [1, 2, 3], nested: { arr: [4, 5] } },
      description: 'cloneWithFunctions handles nested arrays',
    },
    {
      input: [{ a: 1, secret: 'hide', b: { c: 2, secret: 'also hide', d: 3 } }, ['secret']],
      expectedOutput: { a: 1, b: { c: 2, d: 3 } },
      description: 'cloneExcluding removes specified keys at all depths',
    },
    {
      input: [
        {
          users: [
            { name: 'John', password: '123' },
            { name: 'Jane', password: '456' },
          ],
        },
        ['password'],
      ],
      expectedOutput: { users: [{ name: 'John' }, { name: 'Jane' }] },
      description: 'cloneExcluding removes keys from objects inside arrays',
    },
    {
      input: [{ public: true, token: 'abc', data: { value: 1, token: 'xyz' } }, ['token']],
      expectedOutput: { public: true, data: { value: 1 } },
      description: 'cloneExcluding handles multiple levels of nesting',
    },
  ],
  hints: [
    'JSON.parse(JSON.stringify(obj)) is the simplest deep clone but has limitations',
    'structuredClone is available in modern browsers and Node.js 17+ and handles more types',
    'For recursive cloning, handle each type (Date, Array, Object, primitives) separately',
    'Functions cannot be truly cloned - they are either lost or reference-copied',
    'Use typeof and instanceof to check value types during recursive cloning',
    'Remember to handle null separately since typeof null === "object"',
  ],
};
