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
  id: 'proxy-traps',
  title: 'JavaScript Proxy',
  difficulty: 'hard',
  category: 'JavaScript Advanced',
  description: `<h2>In-Depth Explanation</h2>

<p>Proxy traps are methods in a Proxy handler that intercept operations on the target object. Each trap corresponds to a JavaScript operation and allows you to customize behavior.</p>

<p>Common traps:</p>
<ul>
  <li><strong>get</strong>: Intercepts property access</li>
  <li><strong>set</strong>: Intercepts property assignment</li>
  <li><strong>has</strong>: Intercepts \<code>in\</code> operator</li>
  <li><strong>deleteProperty</strong>: Intercepts \<code>delete\</code> operator</li>
  <li><strong>ownKeys</strong>: Intercepts \<code>Object.keys()\</code></li>
  <li><strong>apply</strong>: Intercepts function calls (for function proxies)</li>
</ul>

<p>Proxies enable:</p>
<ul>
  <li><strong>Validation</strong>: Validate property assignments</li>
  <li><strong>Logging</strong>: Log all property access</li>
  <li><strong>Default Values</strong>: Return defaults for missing properties</li>
  <li><strong>Reactivity</strong>: Vue 3 reactivity system uses Proxies</li>
  <li><strong>Virtual Properties</strong>: Create computed properties</li>
  <li><strong>Access Control</strong>: Implement private properties</li>
</ul>

<h2>Importance</h2>

<p>Proxy traps are essential for meta-programming because:</p>

<ul>
  <li><strong>Interception</strong>: Intercept and customize any object operation</li>
  <li><strong>Validation</strong>: Automatic validation on property access/assignment</li>
  <li><strong>Reactivity</strong>: Foundation for reactive frameworks</li>
  <li><strong>Debugging</strong>: Logging and monitoring object operations</li>
  <li><strong>Security</strong>: Implement access control and validation</li>
  <li><strong>Framework Development</strong>: Essential for building frameworks</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Proxy traps are used extensively:</p>

<ul>
  <li><strong>Reactive Frameworks</strong>: Vue 3 reactivity system</li>
  <li><strong>Validation Libraries</strong>: Automatic property validation</li>
  <li><strong>ORM Libraries</strong>: Lazy loading and virtual properties</li>
  <li><strong>Debugging Tools</strong>: Logging object access and mutations</li>
  <li><strong>Access Control</strong>: Implementing private properties</li>
  <li><strong>API Wrappers</strong>: Intercepting API calls for caching/logging</li>
  <li><strong>State Management</strong>: Reactive state management</li>
  <li><strong>Mocking/Testing</strong>: Creating test doubles</li>
</ul>

<p><strong>Challenge:</strong> Create proxies for validation, logging, and default values.</p>`,
  examples: [
    {
      input: `new Proxy(obj, { get(target, prop) { ... } })`,
      output: `Intercept property access`,
      explanation: 'Custom behavior for getting properties',
    },
  ],
  starterCode: `// TODO: Create a proxy that logs all property access
function createLoggingProxy(obj) {
  // Return a Proxy that logs get and set operations
  return obj;
}

// TODO: Create a proxy with default values for missing properties
function createDefaultProxy(obj, defaultValue) {
  // Return defaultValue for any missing property
  return obj;
}

// TODO: Create a validating proxy for a user object
function createValidatingProxy(obj) {
  // Validate: name must be string, age must be positive number
  // Throw error on invalid values
  return obj;
}

// Test
const logged = createLoggingProxy({ x: 1, y: 2 });
console.log(logged.x); // Should log: "Getting x"
logged.x = 10; // Should log: "Setting x to 10"

const withDefaults = createDefaultProxy({}, 'N/A');
console.log(withDefaults.missing); // 'N/A'

const user = createValidatingProxy({ name: 'John', age: 30 });
user.name = 'Jane'; // OK
// user.age = -5; // Should throw error`,
  solution: `function createLoggingProxy(obj) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      console.log(\`Getting \${String(prop)}\`);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      console.log(\`Setting \${String(prop)} to \${value}\`);
      return Reflect.set(target, prop, value, receiver);
    }
  });
}

function createDefaultProxy(obj, defaultValue) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      }
      return defaultValue;
    }
  });
}

function createValidatingProxy(obj) {
  return new Proxy(obj, {
    set(target, prop, value, receiver) {
      if (prop === 'name') {
        if (typeof value !== 'string') {
          throw new Error('name must be a string');
        }
      }
      if (prop === 'age') {
        if (typeof value !== 'number' || value < 0) {
          throw new Error('age must be a positive number');
        }
      }
      return Reflect.set(target, prop, value, receiver);
    }
  });
}`,
  testCases: [
    {
      input: { type: 'logging', obj: { x: 1, y: 2 }, access: 'x' },
      expectedOutput: 1,
      description: 'createLoggingProxy returns correct value'
    },
    {
      input: { type: 'default', obj: { a: 1 }, access: 'missing', defaultValue: 'N/A' },
      expectedOutput: 'N/A',
      description: 'createDefaultProxy returns default for missing props'
    },
    {
      input: { type: 'default', obj: { a: 1 }, access: 'a', defaultValue: 'N/A' },
      expectedOutput: 1,
      description: 'createDefaultProxy returns actual value for existing props'
    },
    {
      input: { type: 'validating', prop: 'name', value: 'Jane' },
      expectedOutput: true,
      description: 'createValidatingProxy allows valid name'
    },
    {
      input: { type: 'validating', prop: 'age', value: -5 },
      expectedOutput: 'error',
      description: 'createValidatingProxy throws on negative age'
    },
  ],
  hints: [
    'new Proxy(target, handler) creates proxy',
    'get(target, prop) intercepts property access',
    'set(target, prop, value) must return true',
  ],
};
