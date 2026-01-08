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
  id: 'computed-property-names',
  title: 'Computed Property Names',
  difficulty: 'easy',
  category: 'Object Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>Computed property names allow you to use expressions (variables, template literals, function calls) as property keys in object literals. The syntax uses square brackets: <code>{ [expression]: value }</code>.</p>

<p>This enables:</p>
<ul>
  <li>Dynamic property names based on variables</li>
  <li>Property names from template literals</li>
  <li>Property names from function calls or expressions</li>
  <li>Creating objects from arrays or other data structures</li>
</ul>

<p>Before ES6, you had to create objects first, then assign properties. Computed property names let you define dynamic keys directly in object literals, making code more concise and expressive.</p>

<h2>Importance</h2>

<p>Computed property names are essential for dynamic object creation because:</p>

<ul>
  <li><strong>Dynamic Keys</strong>: Create objects with keys determined at runtime</li>
  <li><strong>Code Conciseness</strong>: Define dynamic properties in object literals</li>
  <li><strong>Data Transformation</strong>: Transform arrays/maps into objects easily</li>
  <li><strong>Configuration</strong>: Create configuration objects with dynamic keys</li>
  <li><strong>API Building</strong>: Build API request objects dynamically</li>
  <li><strong>State Management</strong>: Create state objects with dynamic keys</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Computed property names are used extensively:</p>

<ul>
  <li><strong>Configuration Objects</strong>: Creating configs with environment-based keys</li>
  <li><strong>API Requests</strong>: Building request objects with dynamic parameters</li>
  <li><strong>State Management</strong>: Creating state with dynamic property names</li>
  <li><strong>Data Transformation</strong>: Converting arrays/maps to objects</li>
  <li><strong>Form Handling</strong>: Creating form data objects dynamically</li>
  <li><strong>Dynamic Props</strong>: React/Vue components with dynamic prop names</li>
  <li><strong>Object Factories</strong>: Creating objects from templates</li>
  <li><strong>Key Mapping</strong>: Mapping data with transformed keys</li>
</ul>

<p><strong>Challenge:</strong> Create objects with dynamic property names.</p>`,
  examples: [
    {
      input: `const key = 'name'; const obj = { [key]: 'John' };`,
      output: `{ name: 'John' }`,
      explanation: 'Computed property names use bracket notation',
    },
  ],
  starterCode: `// TODO: Create object with computed property names
function createConfig(env) {
  // Return object with properties: [env + 'ApiUrl'], [env + 'ApiKey']
  // Example: { devApiUrl: '...', devApiKey: '...' }
  return {};
}

// TODO: Create object from array of key-value pairs
function fromEntries(entries) {
  // Use computed property names to create object
  // fromEntries([['a', 1], ['b', 2]]) => { a: 1, b: 2 }
  return {};
}

// TODO: Merge objects with prefix
function mergeWithPrefix(obj1, obj2, prefix) {
  // Merge obj2 properties into obj1 with prefix
  // mergeWithPrefix({ a: 1 }, { b: 2 }, 'x') => { a: 1, xb: 2 }
  return {};
}

// Test
console.log(createConfig('prod')); // { prodApiUrl: '...', prodApiKey: '...' }
console.log(fromEntries([['name', 'John'], ['age', 30]]));
console.log(mergeWithPrefix({ a: 1 }, { b: 2, c: 3 }, 'prefix'));`,
  solution: `function createConfig(env) {
  return {
    [\`\${env}ApiUrl\`]: \`https://api.\${env}.com\`,
    [\`\${env}ApiKey\`]: \`key-\${env}\`
  };
}

function fromEntries(entries) {
  return entries.reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
}

function mergeWithPrefix(obj1, obj2, prefix) {
  return {
    ...obj1,
    ...Object.fromEntries(
      Object.entries(obj2).map(([key, value]) => [\`\${prefix}\${key}\`, value])
    )
  };
}`,
  testCases: [
    {
      input: ['prod'],
      expectedOutput: { prodApiUrl: 'https://api.prod.com', prodApiKey: 'key-prod' },
      description: 'createConfig',
    },
    {
      input: [
        [
          ['a', 1],
          ['b', 2],
        ],
      ],
      expectedOutput: { a: 1, b: 2 },
      description: 'fromEntries',
    },
  ],
  hints: [
    'Use brackets in object literals: { [expression]: value }',
    'Can use template literals: { [`key${suffix}`]: value }',
    'Useful for dynamic property names based on variables',
  ],
};
