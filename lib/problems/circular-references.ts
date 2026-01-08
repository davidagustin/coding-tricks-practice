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
  id: 'circular-references',
  title: 'Handling Circular References in Serialization',
  difficulty: 'hard',
  category: 'JSON & Serialization',
  description: `<h2>In-Depth Explanation</h2>

<p>Circular references occur when an object references itself, either directly or through a chain of references. This is a common pattern in data structures like graphs, linked lists, and DOM trees, but it poses a significant challenge for JSON serialization.</p>

<h3>The Problem</h3>
<pre><code>const obj = { name: 'parent' };
obj.self = obj; // Circular reference!
JSON.stringify(obj); // TypeError: Converting circular structure to JSON</code></pre>

<h3>Solutions</h3>

<p><strong>1. Using a Replacer with WeakSet</strong></p>
<ul>
  <li>Track seen objects during serialization</li>
  <li>Replace or skip circular references</li>
  <li>WeakSet is ideal as it doesn't prevent garbage collection</li>
</ul>

<p><strong>2. Reference Tracking</strong></p>
<ul>
  <li>Assign IDs to objects</li>
  <li>Replace circular refs with reference markers</li>
  <li>Restore references during parsing</li>
</ul>

<p><strong>3. Depth Limiting</strong></p>
<ul>
  <li>Stop serialization at a certain depth</li>
  <li>Useful when you only need top-level data</li>
</ul>

<h2>Real-World Scenarios</h2>

<ul>
  <li><strong>Graph Data Structures</strong>: Nodes that reference each other</li>
  <li><strong>Parent-Child Relationships</strong>: Children referencing their parents</li>
  <li><strong>DOM Serialization</strong>: Elements with circular parent/child refs</li>
  <li><strong>ORM Objects</strong>: Database entities with bidirectional relationships</li>
  <li><strong>State Management</strong>: Complex state trees with shared references</li>
  <li><strong>Caching</strong>: Objects that cache references to themselves</li>
</ul>

<p><strong>Challenge:</strong> Implement functions to detect, handle, and safely serialize objects with circular references.</p>`,
  examples: [
    {
      input: `const obj = { a: 1 }; obj.self = obj; hasCircularReference(obj)`,
      output: `true`,
      explanation: 'Object references itself directly',
    },
    {
      input: `const obj = { a: 1 }; obj.self = obj; safeStringify(obj)`,
      output: `'{"a":1,"self":"[Circular]"}'`,
      explanation: 'Circular reference replaced with marker',
    },
    {
      input: `hasCircularReference({ a: { b: { c: 1 } } })`,
      output: `false`,
      explanation: 'Deeply nested but no circular reference',
    },
  ],
  starterCode: `function hasCircularReference(obj) {
  // TODO: Detect if an object has circular references
  // Returns true if circular reference exists, false otherwise
  // const obj = { a: 1 }; obj.self = obj; hasCircularReference(obj) → true
  // hasCircularReference({ a: { b: 1 } }) → false

  return false;
}

function safeStringify(obj, placeholder = '[Circular]') {
  // TODO: Stringify object, replacing circular references with placeholder
  // const obj = { a: 1 }; obj.self = obj;
  // safeStringify(obj) → '{"a":1,"self":"[Circular]"}'

  return '';
}

function stringifyWithDepthLimit(obj, maxDepth = 3) {
  // TODO: Stringify object but stop at maxDepth
  // Replace deeper objects with '[Max Depth]'
  // stringifyWithDepthLimit({ a: { b: { c: { d: 1 } } } }, 2)
  // → '{"a":{"b":"[Max Depth]"}}'

  return '';
}

function getCircularPath(obj) {
  // TODO: Return the path to the first circular reference found
  // const obj = { a: { b: {} } }; obj.a.b.c = obj.a;
  // getCircularPath(obj) → 'a.b.c'
  // Return null if no circular reference

  return null;
}

// Test
const circular = { name: 'test', value: 42 };
circular.self = circular;

const nested = { a: { b: { c: {} } } };
nested.a.b.c.ref = nested.a;

console.log(hasCircularReference(circular));
console.log(hasCircularReference({ normal: 'object' }));
console.log(safeStringify(circular));
console.log(stringifyWithDepthLimit({ a: { b: { c: { d: 1 } } } }, 2));
console.log(getCircularPath(nested));`,
  solution: `function hasCircularReference(obj) {
  const seen = new WeakSet();

  function detect(value) {
    if (value === null || typeof value !== 'object') {
      return false;
    }

    if (seen.has(value)) {
      return true;
    }

    seen.add(value);

    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        if (detect(value[key])) {
          return true;
        }
      }
    }

    return false;
  }

  return detect(obj);
}

function safeStringify(obj, placeholder = '[Circular]') {
  const seen = new WeakSet();

  return JSON.stringify(obj, function(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return placeholder;
      }
      seen.add(value);
    }
    return value;
  });
}

function stringifyWithDepthLimit(obj, maxDepth = 3) {
  function replacer(depth) {
    const seen = new WeakSet();

    return function(key, value) {
      if (typeof value === 'object' && value !== null) {
        if (depth <= 0) {
          return '[Max Depth]';
        }

        if (seen.has(value)) {
          return '[Circular]';
        }
        seen.add(value);

        // Create a new object with reduced depth
        const newObj = Array.isArray(value) ? [] : {};
        for (const k in value) {
          if (Object.prototype.hasOwnProperty.call(value, k)) {
            const v = value[k];
            if (typeof v === 'object' && v !== null) {
              newObj[k] = JSON.parse(JSON.stringify(v, replacer(depth - 1)));
            } else {
              newObj[k] = v;
            }
          }
        }
        return newObj;
      }
      return value;
    };
  }

  return JSON.stringify(obj, replacer(maxDepth));
}

function getCircularPath(obj) {
  const seen = new WeakMap();

  function detect(value, path) {
    if (value === null || typeof value !== 'object') {
      return null;
    }

    if (seen.has(value)) {
      return path;
    }

    seen.set(value, path);

    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const newPath = path ? \`\${path}.\${key}\` : key;
        const result = detect(value[key], newPath);
        if (result !== null) {
          return result;
        }
      }
    }

    return null;
  }

  return detect(obj, '');
}`,
  testCases: [
    {
      input: [{ name: 'test', hasSelf: true }],
      expectedOutput: true,
      description: 'hasCircularReference detects direct self-reference',
    },
    {
      input: [{ a: 1, b: { c: 2, d: { e: 3 } } }],
      expectedOutput: false,
      description: 'hasCircularReference returns false for deeply nested non-circular object',
    },
    {
      input: [{ x: [1, 2, { y: 3 }] }],
      expectedOutput: false,
      description: 'hasCircularReference returns false for object with nested arrays',
    },
    {
      input: [{ name: 'circular', value: 42 }, '[Circular]'],
      expectedOutput: '{"name":"circular","value":42,"self":"[Circular]"}',
      description: 'safeStringify replaces circular reference with placeholder',
    },
    {
      input: [{ a: 1, b: 2 }, '[Circular]'],
      expectedOutput: '{"a":1,"b":2}',
      description: 'safeStringify works normally for non-circular objects',
    },
    {
      input: [{ level1: { level2: { level3: { level4: 'deep' } } } }, 2],
      expectedOutput: '{"level1":{"level2":"[Max Depth]"}}',
      description: 'stringifyWithDepthLimit stops at specified depth',
    },
    {
      input: [{ a: 1, b: 2 }, 5],
      expectedOutput: '{"a":1,"b":2}',
      description: 'stringifyWithDepthLimit works for shallow objects within limit',
    },
    {
      input: [{ outer: { inner: { deepRef: null } } }],
      expectedOutput: 'outer.inner.deepRef',
      description: 'getCircularPath finds path to circular reference',
    },
    {
      input: [{ simple: 'object', no: 'circular' }],
      expectedOutput: null,
      description: 'getCircularPath returns null when no circular reference',
    },
  ],
  hints: [
    'Use WeakSet to track seen objects - it allows garbage collection and only accepts objects',
    'The JSON.stringify replacer function receives both key and value, process objects carefully',
    'For depth limiting, track the current depth as you traverse the object tree',
    'WeakMap is useful when you need to store data (like paths) associated with seen objects',
    'Remember to check if a value is an object and not null before adding to WeakSet',
    'Handle arrays separately from plain objects if needed - Array.isArray() helps here',
  ],
};
