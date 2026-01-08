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
    description: `## In-Depth Explanation

Computed property names allow you to use expressions (variables, template literals, function calls) as property keys in object literals. The syntax uses square brackets: \`{ [expression]: value }\`.

This enables:
- Dynamic property names based on variables
- Property names from template literals
- Property names from function calls or expressions
- Creating objects from arrays or other data structures

Before ES6, you had to create objects first, then assign properties. Computed property names let you define dynamic keys directly in object literals, making code more concise and expressive.

## Importance

Computed property names are essential for dynamic object creation because:

- **Dynamic Keys**: Create objects with keys determined at runtime
- **Code Conciseness**: Define dynamic properties in object literals
- **Data Transformation**: Transform arrays/maps into objects easily
- **Configuration**: Create configuration objects with dynamic keys
- **API Building**: Build API request objects dynamically
- **State Management**: Create state objects with dynamic keys

## Usefulness & Practical Applications

Computed property names are used extensively:

- **Configuration Objects**: Creating configs with environment-based keys
- **API Requests**: Building request objects with dynamic parameters
- **State Management**: Creating state with dynamic property names
- **Data Transformation**: Converting arrays/maps to objects
- **Form Handling**: Creating form data objects dynamically
- **Dynamic Props**: React/Vue components with dynamic prop names
- **Object Factories**: Creating objects from templates
- **Key Mapping**: Mapping data with transformed keys

**Challenge:** Create objects with dynamic property names.`,
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
