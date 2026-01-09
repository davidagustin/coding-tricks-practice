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
  id: 'object-fromentries',
  title: 'Object.fromEntries() - Creating Objects from Key-Value Pairs',
  difficulty: 'easy',
  category: 'Object Methods',
  description: `<h2>In-Depth Explanation</h2>

<p><code>Object.fromEntries()</code> transforms a list of key-value pairs into an object. It is the inverse of <code>Object.entries()</code>, which converts an object into an array of [key, value] pairs.</p>

<p>The method accepts any iterable of key-value pairs, including:</p>

<ul>
  <li><strong>Arrays</strong>: <code>[['a', 1], ['b', 2]]</code></li>
  <li><strong>Map objects</strong>: <code>new Map([['a', 1], ['b', 2]])</code></li>
  <li><strong>Any iterable</strong>: Generators, custom iterables, etc.</li>
</ul>

<p>This makes it incredibly versatile for converting data structures into objects.</p>

<h2>Importance</h2>

<p><code>Object.fromEntries()</code> is crucial because:</p>

<ul>
  <li><strong>Map to Object Conversion</strong>: Easily convert Map objects to plain objects</li>
  <li><strong>URL Parameter Parsing</strong>: Convert URLSearchParams to objects</li>
  <li><strong>Data Transformation</strong>: Complete the entries → transform → fromEntries pipeline</li>
  <li><strong>Form Data Processing</strong>: Convert FormData entries to objects</li>
  <li><strong>Clean Syntax</strong>: Provides a declarative way to create objects from pairs</li>
  <li><strong>Functional Programming</strong>: Enables immutable object transformations</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Common real-world use cases:</p>

<ul>
  <li><strong>URL Query Strings</strong>: <code>Object.fromEntries(new URLSearchParams(location.search))</code></li>
  <li><strong>Form Handling</strong>: <code>Object.fromEntries(new FormData(form))</code></li>
  <li><strong>Map Conversion</strong>: Converting Maps to objects for JSON serialization</li>
  <li><strong>Configuration Building</strong>: Building config objects from arrays of settings</li>
  <li><strong>Environment Variables</strong>: Converting env entries to typed objects</li>
  <li><strong>Data Normalization</strong>: Transforming API responses into usable objects</li>
</ul>

<p><strong>Challenge:</strong> Use Object.fromEntries() to create objects from various data sources.</p>`,
  examples: [
    {
      input: `const entries = [['name', 'Alice'], ['age', 30]];`,
      output: `{ name: 'Alice', age: 30 }`,
      explanation: 'Convert array of pairs to object',
    },
    {
      input: `const map = new Map([['x', 1], ['y', 2]]);`,
      output: `{ x: 1, y: 2 }`,
      explanation: 'Convert Map to plain object',
    },
    {
      input: `const params = new URLSearchParams('?page=1&limit=10');`,
      output: `{ page: '1', limit: '10' }`,
      explanation: 'Convert URL params to object',
    },
  ],
  starterCode: `// TODO: Convert an array of key-value pairs to an object
function arrayToObject(pairs) {
  // Use Object.fromEntries to convert the pairs array to an object

  return {};
}

// TODO: Convert a Map to a plain object
function mapToObject(map) {
  // Use Object.fromEntries to convert Map to object

  return {};
}

// TODO: Parse URL search params to an object
function parseQueryString(queryString) {
  // Use URLSearchParams and Object.fromEntries
  // Example: '?name=John&age=30' -> { name: 'John', age: '30' }

  return {};
}

// TODO: Create an object from two arrays (keys and values)
function zipToObject(keys, values) {
  // Combine keys and values arrays into an object
  // Example: ['a', 'b'], [1, 2] -> { a: 1, b: 2 }

  return {};
}

// Test your implementations
const pairs = [['fruit', 'apple'], ['color', 'red']];
console.log(arrayToObject(pairs));

const myMap = new Map([['id', 123], ['active', true]]);
console.log(mapToObject(myMap));

console.log(parseQueryString('?page=1&sort=name&order=asc'));

console.log(zipToObject(['x', 'y', 'z'], [10, 20, 30]));`,
  solution: `// Convert array of [key, value] pairs to an object
function arrayToObject(pairs) {
  // Use Object.fromEntries()
  return Object.fromEntries(pairs);
}

// Convert a Map to an object
function mapToObject(map) {
  // Maps are iterable, so Object.fromEntries works directly
  return Object.fromEntries(map);
}

// Parse URL search params to an object
function parseQueryString(queryString) {
  // Use URLSearchParams and Object.fromEntries
  // Example: '?name=John&age=30' -> { name: 'John', age: '30' }
  const params = new URLSearchParams(queryString);
  return Object.fromEntries(params);
}

// Create an object from two arrays (keys and values)
function zipToObject(keys, values) {
  // Combine keys and values arrays into an object
  // Example: ['a', 'b'], [1, 2] -> { a: 1, b: 2 }
  const pairs = keys.map((key, index) => [key, values[index]]);
  return Object.fromEntries(pairs);
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Object.fromEntries() accepts any iterable of [key, value] pairs',
    'Map objects are directly compatible with Object.fromEntries()',
    'URLSearchParams is iterable and works with Object.fromEntries()',
    'Use Array.map() with index to combine separate key/value arrays into pairs',
  ],
};
