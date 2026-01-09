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
  id: 'json-replacer-reviver',
  title: 'JSON Replacer and Reviver Functions',
  difficulty: 'medium',
  category: 'JSON & Serialization',
  description: `<h2>In-Depth Explanation</h2>

<p>The <strong>replacer</strong> function in <code>JSON.stringify()</code> and the <strong>reviver</strong> function in <code>JSON.parse()</code> are powerful tools for transforming data during serialization and deserialization.</p>

<h3>Replacer Function</h3>
<p><code>JSON.stringify(value, replacer)</code> - The replacer can be:</p>
<ul>
  <li><strong>Function</strong>: <code>(key, value) => transformedValue</code> - Called for each property</li>
  <li><strong>Array</strong>: List of property names to include (whitelist)</li>
</ul>

<p>The replacer function is called with:</p>
<ul>
  <li><strong>key</strong>: The property name (empty string for the root object)</li>
  <li><strong>value</strong>: The value being stringified</li>
  <li><strong>this</strong>: The object containing the property</li>
</ul>

<h3>Reviver Function</h3>
<p><code>JSON.parse(text, reviver)</code> - The reviver is a function <code>(key, value) => transformedValue</code></p>
<ul>
  <li>Called for each property, from innermost to outermost</li>
  <li>Return <code>undefined</code> to delete the property</li>
  <li>Return the value (possibly transformed) to keep it</li>
</ul>

<h2>Common Use Cases</h2>

<ul>
  <li><strong>Date Handling</strong>: Convert ISO date strings back to Date objects</li>
  <li><strong>Data Filtering</strong>: Remove sensitive fields like passwords</li>
  <li><strong>Data Transformation</strong>: Convert values during serialization</li>
  <li><strong>Type Preservation</strong>: Restore special types (BigInt, Map, Set)</li>
  <li><strong>Validation</strong>: Validate or sanitize data during parsing</li>
  <li><strong>Whitelist Properties</strong>: Only include specific fields in output</li>
</ul>

<p><strong>Challenge:</strong> Implement functions using replacer and reviver to handle dates, filter sensitive data, and transform values.</p>`,
  examples: [
    {
      input: `JSON.stringify({ a: 1, b: 2, c: 3 }, ['a', 'c'])`,
      output: `'{"a":1,"c":3}'`,
      explanation: 'Array replacer acts as a whitelist for properties',
    },
    {
      input: `JSON.stringify({ x: 1 }, (key, val) => typeof val === 'number' ? val * 2 : val)`,
      output: `'{"x":2}'`,
      explanation: 'Function replacer doubles all numbers',
    },
    {
      input: `JSON.parse('{"date":"2024-01-01T00:00:00.000Z"}', (k, v) => k === 'date' ? new Date(v) : v)`,
      output: `{ date: Date object }`,
      explanation: 'Reviver converts date string to Date object',
    },
  ],
  starterCode: `function stringifyWithDateHandling(obj) {
  // TODO: Stringify object, converting Date objects to a special format
  // that can be revived. Use format: { __type: 'Date', value: isoString }
  // { date: new Date('2024-01-15') } → '{"date":{"__type":"Date","value":"2024-01-15T00:00:00.000Z"}}'

  return '';
}

function parseWithDateRevival(jsonString) {
  // TODO: Parse JSON string, converting date markers back to Date objects
  // '{"date":{"__type":"Date","value":"2024-01-15T00:00:00.000Z"}}' → { date: Date }

  return null;
}

function stringifyExcludingSensitive(obj, sensitiveKeys = ['password', 'secret', 'token']) {
  // TODO: Stringify object but exclude sensitive keys
  // stringifyExcludingSensitive({ user: 'john', password: '123' }) → '{"user":"john"}'

  return '';
}

function stringifyOnlyKeys(obj, keysToInclude) {
  // TODO: Stringify only the specified keys
  // stringifyOnlyKeys({ a: 1, b: 2, c: 3 }, ['a', 'c']) → '{"a":1,"c":3}'

  return '';
}

function parseWithTransform(jsonString, transformFn) {
  // TODO: Parse JSON and apply transformFn to all string values
  // parseWithTransform('{"name":"john"}', s => s.toUpperCase()) → { name: 'JOHN' }

  return null;
}

// Test
const testObj = {
  name: 'John',
  createdAt: new Date('2024-01-15'),
  password: 'secret123'
};

console.log(stringifyWithDateHandling({ date: new Date('2024-01-15') }));
console.log(stringifyExcludingSensitive(testObj));
console.log(stringifyOnlyKeys({ a: 1, b: 2, c: 3 }, ['a', 'c']));
console.log(parseWithTransform('{"name":"john","city":"boston"}', s => s.toUpperCase()));`,
  solution: `function stringifyWithDateHandling(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (value instanceof Date) {
      return { __type: 'Date', value: value.toISOString() };
    }
    return value;
  });
}

function parseWithDateRevival(jsonString) {
  return JSON.parse(jsonString, (key, value) => {
    if (value && typeof value === 'object' && value.__type === 'Date') {
      return new Date(value.value);
    }
    return value;
  });
}

function stringifyExcludingSensitive(obj, sensitiveKeys = ['password', 'secret', 'token']) {
  return JSON.stringify(obj, (key, value) => {
    if (sensitiveKeys.includes(key)) {
      return undefined;
    }
    return value;
  });
}

function stringifyOnlyKeys(obj, keysToInclude) {
  return JSON.stringify(obj, keysToInclude);
}

function parseWithTransform(jsonString, transformFn) {
  return JSON.parse(jsonString, (key, value) => {
    if (typeof value === 'string' && key !== '') {
      return transformFn(value);
    }
    return value;
  });
}`,
  testCases: [
    {
      input: [{ date: '2024-01-15T00:00:00.000Z' }],
      expectedOutput: '{"date":"2024-01-15T00:00:00.000Z"}',
      description: 'stringifyWithDateHandling with string input (not Date object) - passes through unchanged. Note: Requires actual Date object at runtime to convert to marker format',
    },
    {
      input: ['{"date":{"__type":"Date","value":"2024-01-15T00:00:00.000Z"}}'],
      expectedOutput: { date: new Date('2024-01-15T00:00:00.000Z') },
      description: 'parseWithDateRevival converts marker back to Date object',
    },
    {
      input: [{ user: 'john', password: 'secret123', email: 'john@example.com' }, ['password', 'secret', 'token']],
      expectedOutput: '{"user":"john","email":"john@example.com"}',
      description: 'stringifyExcludingSensitive removes password field',
    },
    {
      input: [{ name: 'Jane', secret: 'hidden', token: 'abc123' }, ['password', 'secret', 'token']],
      expectedOutput: '{"name":"Jane"}',
      description: 'stringifyExcludingSensitive removes multiple sensitive fields',
    },
    {
      input: [{ a: 1, b: 2, c: 3, d: 4 }, ['a', 'c']],
      expectedOutput: '{"a":1,"c":3}',
      description: 'stringifyOnlyKeys includes only specified keys',
    },
    {
      input: [{ name: 'Alice', city: 'Paris', country: 'France' }, ['name', 'country']],
      expectedOutput: '{"name":"Alice","country":"France"}',
      description: 'stringifyOnlyKeys whitelist with string values',
    },
    {
      input: ['{"name":"john","city":"boston"}', (s: string) => s.toUpperCase()],
      expectedOutput: { name: 'JOHN', city: 'BOSTON' },
      description: 'parseWithTransform uppercases all string values',
    },
    {
      input: ['{"greeting":"hello","count":42}', (s: string) => s.toUpperCase()],
      expectedOutput: { greeting: 'HELLO', count: 42 },
      description: 'parseWithTransform only transforms strings, not numbers',
    },
  ],
  hints: [
    'The replacer function receives (key, value) - return undefined to exclude a property',
    'For the root object, the key is an empty string',
    'Use Array.isArray() or pass an array directly as the replacer to whitelist properties',
    'The reviver function is called bottom-up (innermost values first)',
    'Check value.__type or similar markers to identify special serialized types',
    'Remember that instanceof Date will be true for Date objects before stringification',
  ],
};
