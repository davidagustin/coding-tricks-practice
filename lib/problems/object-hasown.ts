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
  id: 'object-hasown',
  title: 'Object.hasOwn() vs hasOwnProperty - Modern Property Checking',
  difficulty: 'easy',
  category: 'Object Methods',
  description: `<h2>In-Depth Explanation</h2>

<p><code>Object.hasOwn()</code> is a modern, safer replacement for <code>obj.hasOwnProperty()</code>. Both check if an object has a property as its own (not inherited) property, but <code>Object.hasOwn()</code> handles edge cases better.</p>

<p><strong>Why Object.hasOwn() is preferred:</strong></p>

<ul>
  <li><strong>Works with null prototype objects</strong>: <code>Object.create(null)</code> objects don't have <code>hasOwnProperty</code> method</li>
  <li><strong>Safer when property is overwritten</strong>: Objects can override <code>hasOwnProperty</code> with a non-function value</li>
  <li><strong>Cleaner syntax</strong>: Static method call vs. prototype method call</li>
  <li><strong>More reliable</strong>: Cannot be shadowed by object properties</li>
</ul>

<p>The old pattern <code>Object.prototype.hasOwnProperty.call(obj, prop)</code> was verbose but safe. <code>Object.hasOwn()</code> provides the same safety with cleaner syntax.</p>

<h2>Importance</h2>

<p>Understanding property ownership is crucial because:</p>

<ul>
  <li><strong>Prototype Chain</strong>: Distinguishes own properties from inherited ones</li>
  <li><strong>Object Iteration</strong>: Essential for safe for-in loops</li>
  <li><strong>Data Validation</strong>: Checking if properties exist before use</li>
  <li><strong>JSON Processing</strong>: Only own properties are serialized</li>
  <li><strong>Security</strong>: Prevents prototype pollution vulnerabilities</li>
  <li><strong>Configuration Handling</strong>: Checking for optional config properties</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Common real-world use cases:</p>

<ul>
  <li><strong>Safe Property Access</strong>: Check before accessing potentially undefined properties</li>
  <li><strong>Object Cloning</strong>: Only copy own properties, not inherited ones</li>
  <li><strong>Form Validation</strong>: Check if expected fields exist</li>
  <li><strong>API Response Handling</strong>: Validate response structure</li>
  <li><strong>Default Values</strong>: Apply defaults only for missing properties</li>
  <li><strong>Dictionary Objects</strong>: Safe key checking in null-prototype objects</li>
</ul>

<p><strong>Challenge:</strong> Use Object.hasOwn() to safely check for property existence in various scenarios.</p>`,
  examples: [
    {
      input: `Object.hasOwn({ name: 'Alice' }, 'name')`,
      output: `true`,
      explanation: 'Property exists on the object',
    },
    {
      input: `Object.hasOwn({ name: 'Alice' }, 'toString')`,
      output: `false`,
      explanation: 'toString is inherited, not own property',
    },
    {
      input: `Object.hasOwn(Object.create(null), 'hasOwnProperty')`,
      output: `false`,
      explanation: 'Works with null prototype objects',
    },
  ],
  starterCode: `// TODO: Check if an object has a specific own property
function hasProperty(obj, prop) {
  // Use Object.hasOwn() to check for own property

  return false;
}

// TODO: Get only the own properties of an object (filter out inherited)
function getOwnProps(obj) {
  // Return an array of own property names
  // Hint: You can also use Object.keys() which only returns own enumerable properties

  return [];
}

// TODO: Safely merge defaults only for missing properties
function mergeDefaults(obj, defaults) {
  // Create a new object with properties from defaults
  // only if they don't exist in obj
  // Use Object.hasOwn() to check

  return {};
}

// TODO: Check if object has ALL specified properties
function hasAllProperties(obj, props) {
  // Return true if obj has all properties in the props array as own properties

  return false;
}

// TODO: Count own properties vs inherited properties
function countProperties(obj) {
  // Return { own: number, inherited: number }
  // Use Object.hasOwn to distinguish own from inherited

  return { own: 0, inherited: 0 };
}

// Test cases
const person = { name: 'John', age: 30 };
console.log(hasProperty(person, 'name')); // true
console.log(hasProperty(person, 'toString')); // false (inherited)

// Null prototype object (no hasOwnProperty method!)
const dict = Object.create(null);
dict.key = 'value';
console.log(hasProperty(dict, 'key')); // true

console.log(mergeDefaults({ a: 1 }, { a: 100, b: 2, c: 3 }));
// { a: 1, b: 2, c: 3 }

console.log(hasAllProperties({ x: 1, y: 2 }, ['x', 'y'])); // true
console.log(hasAllProperties({ x: 1 }, ['x', 'y'])); // false`,
  solution: `// Check if object has own property (not inherited)
function hasProperty(obj, prop) {
  // Use Object.hasOwn() - modern replacement for hasOwnProperty
  // Works even with null prototype objects
  return Object.hasOwn(obj, prop);
}

// Get all own properties of an object
function getOwnProps(obj) {
  // Return an array of own property names
  // Hint: You can also use Object.keys() which only returns own enumerable properties
  return Object.keys(obj);
}

// Safely merge defaults only for missing properties
function mergeDefaults(obj, defaults) {
  // Create a new object with properties from defaults
  // only if they don't exist in obj
  // Use Object.hasOwn() to check
  const result = { ...obj };
  for (const key in defaults) {
    if (!Object.hasOwn(result, key)) {
      result[key] = defaults[key];
    }
  }
  return result;
}

// Check if object has ALL specified properties
function hasAllProperties(obj, props) {
  // Return true if obj has all properties in the props array as own properties
  return props.every(prop => Object.hasOwn(obj, prop));
}

// Count own properties vs inherited properties
function countProperties(obj) {
  // Return { own: number, inherited: number }
  // Use Object.hasOwn to distinguish own from inherited
  let own = 0;
  let inherited = 0;
  
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      own++;
    } else {
      inherited++;
    }
  }
  
  return { own, inherited };
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Object.hasOwn(obj, prop) is the modern way to check for own properties',
    'Unlike obj.hasOwnProperty(), Object.hasOwn() works with null prototype objects',
    'Object.keys() only returns own enumerable properties',
    'The for-in loop iterates over both own and inherited enumerable properties',
    'Use Array.every() to check if all properties exist',
  ],
};
