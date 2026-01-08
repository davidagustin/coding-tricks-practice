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
  id: 'custom-serialization',
  title: 'Custom toJSON Methods and Serialization',
  difficulty: 'medium',
  category: 'JSON & Serialization',
  description: `<h2>In-Depth Explanation</h2>

<p>JavaScript allows objects to customize their JSON serialization by implementing a <code>toJSON()</code> method. When <code>JSON.stringify()</code> encounters an object with a <code>toJSON</code> method, it calls that method and uses the return value for serialization instead of the object itself.</p>

<h3>How toJSON Works</h3>
<pre><code>const obj = {
  name: 'example',
  secret: 'hidden',
  toJSON() {
    return { name: this.name }; // Exclude secret
  }
};
JSON.stringify(obj); // '{"name":"example"}'</code></pre>

<h3>Built-in toJSON Examples</h3>
<ul>
  <li><strong>Date.prototype.toJSON</strong>: Returns ISO string format</li>
  <li>Custom classes can define their own serialization format</li>
</ul>

<h3>Use Cases</h3>

<ul>
  <li><strong>Exclude Sensitive Data</strong>: Automatically hide passwords, tokens</li>
  <li><strong>Computed Properties</strong>: Include calculated values in JSON</li>
  <li><strong>Format Transformation</strong>: Convert internal format to API format</li>
  <li><strong>Circular Reference Handling</strong>: Custom logic for self-references</li>
  <li><strong>Versioning</strong>: Include version info in serialized data</li>
  <li><strong>Validation</strong>: Ensure only valid data is serialized</li>
</ul>

<h3>Class Serialization Pattern</h3>
<pre><code>class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password; // Never serialize this!
  }

  toJSON() {
    return {
      name: this.name,
      email: this.email,
      // password intentionally omitted
    };
  }
}</code></pre>

<p><strong>Challenge:</strong> Create objects and classes with custom toJSON methods for various serialization scenarios.</p>`,
  examples: [
    {
      input: `const user = { name: 'John', password: 'secret', toJSON() { return { name: this.name }; } }; JSON.stringify(user)`,
      output: `'{"name":"John"}'`,
      explanation: 'toJSON method excludes password from serialization',
    },
    {
      input: `const date = new Date('2024-01-15'); JSON.stringify({ date })`,
      output: `'{"date":"2024-01-15T00:00:00.000Z"}'`,
      explanation: 'Date has built-in toJSON that returns ISO string',
    },
    {
      input: `const money = { amount: 1999, currency: 'USD', toJSON() { return this.currency + (this.amount/100).toFixed(2); } }; JSON.stringify(money)`,
      output: `'"USD19.99"'`,
      explanation: 'Custom formatting in toJSON',
    },
  ],
  starterCode: `function createSecureUser(name, email, password) {
  // TODO: Create user object with toJSON that excludes password
  // JSON.stringify(user) should NOT include password
  // { name: 'John', email: 'john@example.com' }

  return {};
}

function createVersionedData(data, version = 1) {
  // TODO: Create object that includes version and timestamp when serialized
  // JSON.stringify result should include: { ...data, _version: 1, _serializedAt: <timestamp> }

  return {};
}

function createCircularSafeObject(obj) {
  // TODO: Add toJSON to an object that might have circular refs
  // Should serialize without throwing, replacing circular refs with '[Circular]'

  return {};
}

function createMoneyObject(cents, currency = 'USD') {
  // TODO: Create money object that serializes to formatted string
  // createMoneyObject(1999, 'USD') → serializes to '"$19.99"'
  // createMoneyObject(1500, 'EUR') → serializes to '"€15.00"'

  return {};
}

function createSelectiveSerializer(obj, publicKeys) {
  // TODO: Add toJSON that only includes keys listed in publicKeys
  // createSelectiveSerializer({ a: 1, b: 2, c: 3 }, ['a', 'c'])
  // Serializes to '{"a":1,"c":3}'

  return {};
}

// Test
const user = createSecureUser('John', 'john@example.com', 'secret123');
console.log(JSON.stringify(user));

const versioned = createVersionedData({ name: 'Test', value: 42 });
console.log(JSON.stringify(versioned));

const money = createMoneyObject(1999, 'USD');
console.log(JSON.stringify(money));

const selective = createSelectiveSerializer({ a: 1, b: 2, c: 3, d: 4 }, ['a', 'c']);
console.log(JSON.stringify(selective));`,
  solution: `function createSecureUser(name, email, password) {
  return {
    name,
    email,
    password,
    toJSON() {
      return {
        name: this.name,
        email: this.email
      };
    }
  };
}

function createVersionedData(data, version = 1) {
  return {
    ...data,
    toJSON() {
      const result = {};
      for (const key in this) {
        if (key !== 'toJSON' && Object.prototype.hasOwnProperty.call(this, key)) {
          result[key] = this[key];
        }
      }
      result._version = version;
      result._serializedAt = new Date().toISOString();
      return result;
    }
  };
}

function createCircularSafeObject(obj) {
  const seen = new WeakSet();

  function makeSerializable(target) {
    if (target === null || typeof target !== 'object') {
      return target;
    }

    if (seen.has(target)) {
      return '[Circular]';
    }

    seen.add(target);

    if (Array.isArray(target)) {
      return target.map(item => makeSerializable(item));
    }

    const result = {};
    for (const key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key) && key !== 'toJSON') {
        result[key] = makeSerializable(target[key]);
      }
    }

    return result;
  }

  return {
    ...obj,
    toJSON() {
      seen.clear ? seen.clear() : null; // Reset for fresh serialization
      return makeSerializable(this);
    }
  };
}

function createMoneyObject(cents, currency = 'USD') {
  const symbols = { USD: '$', EUR: '€', GBP: '£', JPY: '¥' };

  return {
    cents,
    currency,
    toJSON() {
      const symbol = symbols[this.currency] || this.currency;
      const amount = (this.cents / 100).toFixed(2);
      return symbol + amount;
    }
  };
}

function createSelectiveSerializer(obj, publicKeys) {
  return {
    ...obj,
    toJSON() {
      const result = {};
      for (const key of publicKeys) {
        if (Object.prototype.hasOwnProperty.call(this, key)) {
          result[key] = this[key];
        }
      }
      return result;
    }
  };
}`,
  testCases: [
    {
      input: ['John', 'john@example.com', 'secret123'],
      expectedOutput: '{"name":"John","email":"john@example.com"}',
      description: 'createSecureUser excludes password from serialization',
    },
    {
      input: ['Jane', 'jane@test.com', 'password456'],
      expectedOutput: '{"name":"Jane","email":"jane@test.com"}',
      description: 'createSecureUser works with different user data',
    },
    {
      input: [1999, 'USD'],
      expectedOutput: '"$19.99"',
      description: 'createMoneyObject formats USD correctly',
    },
    {
      input: [1500, 'EUR'],
      expectedOutput: '"€15.00"',
      description: 'createMoneyObject formats EUR correctly',
    },
    {
      input: [10000, 'GBP'],
      expectedOutput: '"£100.00"',
      description: 'createMoneyObject formats GBP correctly',
    },
    {
      input: [{ a: 1, b: 2, c: 3, d: 4 }, ['a', 'c']],
      expectedOutput: '{"a":1,"c":3}',
      description: 'createSelectiveSerializer only includes specified keys',
    },
    {
      input: [{ name: 'John', age: 30, secret: 'hidden', role: 'admin' }, ['name', 'role']],
      expectedOutput: '{"name":"John","role":"admin"}',
      description: 'createSelectiveSerializer filters string and non-string values',
    },
    {
      input: [{ x: 10, y: 20, z: 30 }, ['x', 'y', 'z']],
      expectedOutput: '{"x":10,"y":20,"z":30}',
      description: 'createSelectiveSerializer includes all keys when all are public',
    },
    {
      input: [{ visible: true, hidden: false }, ['visible']],
      expectedOutput: '{"visible":true}',
      description: 'createSelectiveSerializer handles boolean values',
    },
  ],
  hints: [
    'The toJSON method should return the value you want to be serialized, not a string',
    'JSON.stringify will call toJSON() if it exists, then stringify the return value',
    'Use Object.prototype.hasOwnProperty to check for own properties and exclude toJSON itself',
    'For circular reference handling, use WeakSet to track seen objects',
    'Currency symbols can be stored in a lookup object for easy formatting',
    'Remember that toJSON receives the key as an argument if you need context about where in the object tree you are',
  ],
};
