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
  id: 'json-parse-stringify',
  title: 'JSON.parse and JSON.stringify Basics',
  difficulty: 'easy',
  category: 'JSON & Serialization',
  description: `<h2>In-Depth Explanation</h2>

<p><code>JSON.parse()</code> and <code>JSON.stringify()</code> are the fundamental methods for converting between JavaScript objects and JSON strings. These methods are essential for data exchange, storage, and communication between systems.</p>

<p><code>JSON.stringify(value, replacer?, space?)</code> converts a JavaScript value to a JSON string:</p>
<ul>
  <li><strong>value</strong>: The value to convert (object, array, primitive)</li>
  <li><strong>replacer</strong>: Optional function or array to filter/transform values</li>
  <li><strong>space</strong>: Optional indentation for pretty-printing (number or string)</li>
</ul>

<p><code>JSON.parse(text, reviver?)</code> parses a JSON string into a JavaScript value:</p>
<ul>
  <li><strong>text</strong>: The JSON string to parse</li>
  <li><strong>reviver</strong>: Optional function to transform parsed values</li>
</ul>

<h2>Important Limitations</h2>

<p>JSON has limitations on what can be serialized:</p>
<ul>
  <li><strong>undefined</strong>: Omitted from objects, becomes null in arrays</li>
  <li><strong>Functions</strong>: Completely omitted</li>
  <li><strong>Symbol</strong>: Completely omitted</li>
  <li><strong>Infinity/NaN</strong>: Converted to null</li>
  <li><strong>Date</strong>: Converted to ISO string (not restored on parse)</li>
  <li><strong>Map/Set</strong>: Converted to empty objects</li>
  <li><strong>Circular references</strong>: Throws an error</li>
</ul>

<h2>Practical Applications</h2>

<ul>
  <li><strong>API Communication</strong>: Sending and receiving data from REST APIs</li>
  <li><strong>Local Storage</strong>: Storing complex data in browser storage</li>
  <li><strong>Deep Cloning</strong>: Creating copies of objects (with limitations)</li>
  <li><strong>Data Validation</strong>: Checking if data is valid JSON</li>
  <li><strong>Configuration Files</strong>: Reading and writing JSON config files</li>
  <li><strong>Data Logging</strong>: Converting objects to readable strings for debugging</li>
</ul>

<p><strong>Challenge:</strong> Implement functions to safely parse JSON, stringify with formatting, and handle edge cases.</p>`,
  examples: [
    {
      input: `JSON.stringify({ name: "John", age: 30 })`,
      output: `'{"name":"John","age":30}'`,
      explanation: 'Basic object to JSON string conversion',
    },
    {
      input: `JSON.parse('{"name":"John","age":30}')`,
      output: `{ name: "John", age: 30 }`,
      explanation: 'JSON string to object conversion',
    },
    {
      input: `JSON.stringify({ a: 1 }, null, 2)`,
      output: `'{\\n  "a": 1\\n}'`,
      explanation: 'Pretty-printed JSON with 2-space indentation',
    },
  ],
  starterCode: `function safeJsonParse(jsonString, defaultValue = null) {
  // TODO: Safely parse JSON string
  // Return defaultValue if parsing fails
  // safeJsonParse('{"a":1}') → { a: 1 }
  // safeJsonParse('invalid', {}) → {}

  return null;
}

function prettyPrint(obj, spaces = 2) {
  // TODO: Convert object to formatted JSON string
  // prettyPrint({ a: 1, b: 2 }) → '{\\n  "a": 1,\\n  "b": 2\\n}'

  return '';
}

function isValidJson(str) {
  // TODO: Check if string is valid JSON
  // isValidJson('{"a":1}') → true
  // isValidJson('{a:1}') → false

  return false;
}

function getJsonType(jsonString) {
  // TODO: Return the type of the parsed JSON value
  // getJsonType('{"a":1}') → 'object'
  // getJsonType('[1,2,3]') → 'array'
  // getJsonType('"hello"') → 'string'
  // getJsonType('42') → 'number'
  // getJsonType('null') → 'null'

  return '';
}

// Test
console.log(safeJsonParse('{"name":"John"}'));
console.log(safeJsonParse('invalid json', { error: true }));
console.log(prettyPrint({ a: 1, b: [1, 2, 3] }));
console.log(isValidJson('{"valid":true}'));
console.log(isValidJson('{invalid}'));
console.log(getJsonType('[1,2,3]'));`,
  solution: `function safeJsonParse(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return defaultValue;
  }
}

function prettyPrint(obj, spaces = 2) {
  return JSON.stringify(obj, null, spaces);
}

function isValidJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

function getJsonType(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed === null) return 'null';
    if (Array.isArray(parsed)) return 'array';
    return typeof parsed;
  } catch (e) {
    return 'invalid';
  }
}`,
  testCases: [
    {
      input: ['{"name":"John","age":30}', null],
      expectedOutput: { name: 'John', age: 30 },
      description: 'safeJsonParse with valid JSON object',
    },
    {
      input: ['invalid json', { error: true }],
      expectedOutput: { error: true },
      description: 'safeJsonParse with invalid JSON returns default',
    },
    {
      input: ['[1,2,3]', []],
      expectedOutput: [1, 2, 3],
      description: 'safeJsonParse with valid JSON array',
    },
    {
      input: ['{"valid":true}'],
      expectedOutput: true,
      description: 'isValidJson returns true for valid JSON',
    },
    {
      input: ['{invalid: json}'],
      expectedOutput: false,
      description: 'isValidJson returns false for invalid JSON',
    },
    {
      input: ['{"a":1,"b":2}'],
      expectedOutput: 'object',
      description: 'getJsonType returns object for JSON object',
    },
    {
      input: ['[1,2,3]'],
      expectedOutput: 'array',
      description: 'getJsonType returns array for JSON array',
    },
    {
      input: ['"hello"'],
      expectedOutput: 'string',
      description: 'getJsonType returns string for JSON string',
    },
    {
      input: ['42'],
      expectedOutput: 'number',
      description: 'getJsonType returns number for JSON number',
    },
    {
      input: ['null'],
      expectedOutput: 'null',
      description: 'getJsonType returns null for JSON null',
    },
  ],
  hints: [
    'Use try-catch to handle JSON.parse errors gracefully',
    'JSON.stringify accepts a third parameter for indentation (spaces)',
    'JSON.parse will throw a SyntaxError for invalid JSON',
    'Use Array.isArray() to distinguish arrays from objects since typeof returns "object" for both',
    'Remember that null is a valid JSON value and typeof null returns "object"',
  ],
};
