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
  id: 'reflect-api',
  title: 'Reflect API for Meta-Programming',
  difficulty: 'hard',
  category: 'Object Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>The Reflect API provides methods that mirror Proxy trap operations, offering a programmatic way to perform object operations. Each Reflect method corresponds to a Proxy trap and provides a functional alternative to operators like <code>in</code>, <code>delete</code>, and <code>new</code>.</p>

<p>Key Reflect methods:</p>
<ul>
  <li><code>Reflect.get(target, prop)</code>: Get property value</li>
  <li><code>Reflect.set(target, prop, value)</code>: Set property (returns boolean)</li>
  <li><code>Reflect.has(target, prop)</code>: Check if property exists</li>
  <li><code>Reflect.deleteProperty(target, prop)</code>: Delete property</li>
  <li><code>Reflect.construct(Constructor, args)</code>: Create instance</li>
  <li><code>Reflect.apply(func, thisArg, args)</code>: Call function</li>
</ul>

<p>The Reflect API is designed to work seamlessly with Proxies - Proxy traps can forward operations to Reflect methods, maintaining default behavior while adding custom logic.</p>

<h2>Importance</h2>

<p>The Reflect API is essential for meta-programming because:</p>

<ul>
  <li><strong>Proxy Integration</strong>: Designed to work with Proxy traps</li>
  <li><strong>Functional Style</strong>: Provides functional alternatives to operators</li>
  <li><strong>Error Handling</strong>: Returns booleans instead of throwing (for set/delete)</li>
  <li><strong>Meta-Programming</strong>: Enables programmatic object manipulation</li>
  <li><strong>Framework Development</strong>: Essential for building frameworks and libraries</li>
  <li><strong>Type Safety</strong>: Better TypeScript support than operators</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>The Reflect API is used in advanced scenarios:</p>

<ul>
  <li><strong>Proxy Handlers</strong>: Forwarding operations in Proxy traps</li>
  <li><strong>ORM Libraries</strong>: Programmatic property access and manipulation</li>
  <li><strong>Validation Libraries</strong>: Dynamic property validation</li>
  <li><strong>Framework Internals</strong>: React, Vue use Reflect for internal operations</li>
  <li><strong>Testing</strong>: Creating mocks and test doubles</li>
  <li><strong>Dynamic Code</strong>: Building dynamic object manipulation code</li>
  <li><strong>Decorators</strong>: Implementing decorators in TypeScript</li>
  <li><strong>Serialization</strong>: Custom serialization logic</li>
</ul>

<p><strong>Challenge:</strong> Use Reflect for property operations and function calls.</p>`,
  examples: [
    {
      input: `Reflect.get(obj, 'prop'), Reflect.set(obj, 'prop', value)`,
      output: `Meta-programming operations`,
      explanation: 'Reflect provides programmatic access to object operations',
    },
  ],
  starterCode: `// TODO: Use Reflect.get to safely get property
function safeGet(obj, path) {
  // Use Reflect.get to get nested properties
  // Handle cases where property doesn't exist
  return undefined;
}

// TODO: Use Reflect.set to set property
function safeSet(obj, prop, value) {
  // Use Reflect.set to set property
  // Return boolean indicating success
  return false;
}

// TODO: Use Reflect.has to check property
function hasProperty(obj, prop) {
  // Use Reflect.has instead of 'prop' in obj
  return false;
}

// TODO: Use Reflect.construct to create instance
function createInstance(Constructor, args) {
  // Use Reflect.construct instead of new Constructor(...args)
  return null;
}

// Test
const obj = { a: { b: { c: 1 } } };
console.log(safeGet(obj, 'a.b.c')); // Should work
console.log(safeSet(obj, 'x', 2)); // Should return true
console.log(hasProperty(obj, 'x')); // Should return true

class User {
  constructor(name) { this.name = name; }
}
const user = createInstance(User, ['John']);
console.log(user.name);`,
  solution: `function safeGet(obj, path) {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current == null) return undefined;
    current = Reflect.get(current, key);
  }
  return current;
}

function safeSet(obj, prop, value) {
  return Reflect.set(obj, prop, value);
}

function hasProperty(obj, prop) {
  return Reflect.has(obj, prop);
}

function createInstance(Constructor, args) {
  return Reflect.construct(Constructor, args);
}`,
  testCases: [
    {
      input: [{ a: { b: 1 } }, 'a.b'],
      expectedOutput: 1,
      description: 'safeGet retrieves nested property value',
    },
    {
      input: [{ x: 1 }, 'y', 2],
      expectedOutput: true,
      description: 'safeSet returns true when setting property',
    },
    {
      input: [{ name: 'test' }, 'name'],
      expectedOutput: true,
      description: 'hasProperty returns true for existing property',
    },
    {
      input: [{ name: 'test' }, 'missing'],
      expectedOutput: false,
      description: 'hasProperty returns false for missing property',
    },
  ],
  hints: [
    'Reflect.get(target, prop) - get property value',
    'Reflect.set(target, prop, value) - set property, returns boolean',
    'Reflect.has(target, prop) - check if property exists',
    'Reflect.construct(Constructor, args) - create instance',
  ],
};
