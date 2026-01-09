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
  id: 'object-getownpropertynames',
  title: 'Object.getOwnPropertyNames & getOwnPropertySymbols',
  difficulty: 'medium',
  category: 'Object Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>JavaScript provides several methods to inspect object properties, each with different behaviors:</p>

<table style="width:100%; border-collapse: collapse; margin: 1em 0;">
  <tr style="background: #f5f5f5;">
    <th style="padding: 8px; border: 1px solid #ddd;">Method</th>
    <th style="padding: 8px; border: 1px solid #ddd;">Enumerable</th>
    <th style="padding: 8px; border: 1px solid #ddd;">Non-enumerable</th>
    <th style="padding: 8px; border: 1px solid #ddd;">Symbols</th>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><code>Object.keys()</code></td>
    <td style="padding: 8px; border: 1px solid #ddd;">Yes</td>
    <td style="padding: 8px; border: 1px solid #ddd;">No</td>
    <td style="padding: 8px; border: 1px solid #ddd;">No</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><code>Object.getOwnPropertyNames()</code></td>
    <td style="padding: 8px; border: 1px solid #ddd;">Yes</td>
    <td style="padding: 8px; border: 1px solid #ddd;">Yes</td>
    <td style="padding: 8px; border: 1px solid #ddd;">No</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><code>Object.getOwnPropertySymbols()</code></td>
    <td style="padding: 8px; border: 1px solid #ddd;">N/A</td>
    <td style="padding: 8px; border: 1px solid #ddd;">N/A</td>
    <td style="padding: 8px; border: 1px solid #ddd;">Yes</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><code>Reflect.ownKeys()</code></td>
    <td style="padding: 8px; border: 1px solid #ddd;">Yes</td>
    <td style="padding: 8px; border: 1px solid #ddd;">Yes</td>
    <td style="padding: 8px; border: 1px solid #ddd;">Yes</td>
  </tr>
</table>

<p><code>Object.getOwnPropertyNames()</code> returns all string-keyed properties (both enumerable and non-enumerable), while <code>Object.getOwnPropertySymbols()</code> returns all Symbol-keyed properties.</p>

<h2>Importance</h2>

<p>These methods are essential for:</p>

<ul>
  <li><strong>Complete Object Inspection</strong>: See all properties, not just enumerable ones</li>
  <li><strong>Library Development</strong>: Access hidden/private properties when needed</li>
  <li><strong>Debugging</strong>: Discover non-enumerable properties that might affect behavior</li>
  <li><strong>Object Cloning</strong>: Create true deep copies including non-enumerable properties</li>
  <li><strong>Symbol Properties</strong>: Access Symbol-keyed properties used for meta-programming</li>
  <li><strong>Polyfills</strong>: Implement complete object utilities</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Real-world use cases:</p>

<ul>
  <li><strong>Testing Frameworks</strong>: Inspect object internals for assertions</li>
  <li><strong>Serialization</strong>: Custom JSON serializers that handle all properties</li>
  <li><strong>Proxy Implementation</strong>: Forward all property access correctly</li>
  <li><strong>Object Comparison</strong>: Deep equality checks including non-enumerable props</li>
  <li><strong>Debugging Tools</strong>: Developer tools showing complete object state</li>
  <li><strong>Metaprogramming</strong>: Working with Symbol-based APIs like iterators</li>
</ul>

<p><strong>Challenge:</strong> Use these methods to inspect and manipulate object properties at all levels.</p>`,
  examples: [
    {
      input: `Object.getOwnPropertyNames([1, 2, 3])`,
      output: `['0', '1', '2', 'length']`,
      explanation: 'Arrays have non-enumerable length property',
    },
    {
      input: `Object.getOwnPropertySymbols({ [Symbol.for('id')]: 123 })`,
      output: `[Symbol(id)]`,
      explanation: 'Returns array of Symbol keys',
    },
  ],
  starterCode: `// TODO: Get ALL own properties of an object (strings + symbols)
function getAllOwnProperties(obj) {
  // Combine getOwnPropertyNames and getOwnPropertySymbols
  // Or use Reflect.ownKeys() as a shortcut

  return [];
}

// TODO: Get only non-enumerable property names
function getNonEnumerableProps(obj) {
  // Get all property names, then filter out enumerable ones
  // Hint: Use Object.getOwnPropertyDescriptor to check enumerable

  return [];
}

// TODO: Clone an object including non-enumerable properties
function deepCloneWithNonEnumerable(obj) {
  // Create a new object with all properties preserved
  // Including non-enumerable properties with their descriptors

  return {};
}

// TODO: Find all Symbol properties on an object and its prototype chain
function getAllSymbols(obj) {
  // Walk up the prototype chain and collect all Symbol properties

  return [];
}

// TODO: Create an object inspector that categorizes properties
function inspectObject(obj) {
  // Return: {
  //   enumerable: string[],
  //   nonEnumerable: string[],
  //   symbols: symbol[]
  // }

  return { enumerable: [], nonEnumerable: [], symbols: [] };
}

// Test your implementations
const testObj = { visible: 1 };
Object.defineProperty(testObj, 'hidden', { value: 2, enumerable: false });
testObj[Symbol.for('meta')] = 'data';

console.log(getAllOwnProperties(testObj));
console.log(getNonEnumerableProps(testObj));
console.log(inspectObject(testObj));

// Array example (length is non-enumerable)
console.log(getNonEnumerableProps([1, 2, 3]));`,
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Reflect.ownKeys() returns all own keys: string + symbol, enumerable + non-enumerable',
    'Object.getOwnPropertyDescriptor() returns { value, writable, enumerable, configurable }',
    'To clone with descriptors, use Object.defineProperty with the full descriptor',
    'The prototype chain can be walked with Object.getPrototypeOf() until null',
    'Arrays have non-enumerable properties like length that Object.keys() misses',
  ],
};
