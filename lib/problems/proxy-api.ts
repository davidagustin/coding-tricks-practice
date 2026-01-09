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
  id: 'proxy-api',
  title: 'Proxy API for Interception',
  difficulty: 'hard',
  category: 'Object Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>The \<code>Proxy\</code> object enables meta-programming by intercepting and customizing operations on objects (property access, assignment, enumeration, function invocation, etc.). It's a powerful tool for creating abstractions and implementing patterns like validation, logging, and reactive programming.</p>

<p>A Proxy wraps a target object with a handler that defines "traps" - functions that intercept operations. Common traps include:</p>
<ul>
  <li>\<code>get\</code>: Intercepts property access</li>
  <li>\<code>set\</code>: Intercepts property assignment</li>
  <li>\<code>has\</code>: Intercepts \<code>in\</code> operator</li>
  <li>\<code>deleteProperty\</code>: Intercepts \<code>delete\</code> operator</li>
</ul>

<p>Proxies are transparent - code using the proxy doesn't know it's a proxy. This enables powerful patterns like reactive frameworks, validation libraries, and debugging tools.</p>

<h2>Importance</h2>

<p>Proxies are essential for advanced JavaScript patterns because:</p>

<ul>
  <li><strong>Meta-Programming</strong>: Intercept and customize object operations</li>
  <li><strong>Validation</strong>: Automatic validation on property assignment</li>
  <li><strong>Reactivity</strong>: Foundation for reactive frameworks (Vue 3 reactivity)</li>
  <li><strong>Debugging</strong>: Logging and monitoring object access</li>
  <li><strong>Virtual Properties</strong>: Create computed properties</li>
  <li><strong>Security</strong>: Implement access control and validation layers</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Proxies are used in many advanced scenarios:</p>

<ul>
  <li><strong>Reactive Frameworks</strong>: Vue 3 reactivity system uses Proxies</li>
  <li><strong>Validation Libraries</strong>: Automatic property validation</li>
  <li><strong>ORM Libraries</strong>: Lazy loading and virtual properties</li>
  <li><strong>Debugging Tools</strong>: Logging object access and mutations</li>
  <li><strong>Access Control</strong>: Implementing private properties and access control</li>
  <li><strong>API Wrappers</strong>: Intercepting API calls for caching or logging</li>
  <li><strong>State Management</strong>: Reactive state management systems</li>
  <li><strong>Mocking/Testing</strong>: Creating test doubles and mocks</li>
</ul>

<p><strong>Challenge:</strong> Create a proxy that logs property access and validates assignments.</p>`,
  examples: [
    {
      input: `const obj = new Proxy(target, handler);`,
      output: `Intercepts get, set, and other operations`,
      explanation: 'Proxy enables meta-programming',
    },
  ],
  starterCode: `// TODO: Create a proxy that logs all property access
function createLoggedObject(target) {
  // Return a Proxy that logs when properties are accessed
  // Use 'get' trap to log property reads
  return target;
}

// TODO: Create a proxy that validates property assignments
function createValidatedObject(target, validator) {
  // Return a Proxy that validates before setting properties
  // Use 'set' trap to validate and set values
  // Throw error if validation fails
  return target;
}

// Test
const logged = createLoggedObject({ name: 'John', age: 30 });
console.log(logged.name); // Should log: "Accessing property: name"

const validated = createValidatedObject({}, (key, value) => {
  if (key === 'age' && (value < 0 || value > 150)) {
    throw new Error('Invalid age');
  }
  return true;
});

validated.age = 25; // OK
validated.age = 200; // Should throw error`,
  solution: `// Create a proxy that logs all property access
function createLoggedObject(target) {
  // Return a Proxy that logs when properties are accessed
  // Use 'get' trap to log property reads
  return new Proxy(target, {
    get(target, prop, receiver) {
      console.log(\`Accessing property: \${String(prop)}\`);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      console.log(\`Setting property: \${String(prop)} = \${value}\`);
      return Reflect.set(target, prop, value, receiver);
    }
  });
}

// Create a proxy that validates property assignments
function createValidatedObject(target, validator) {
  // Return a Proxy that validates before setting properties
  // Use 'set' trap to validate and set values
  // Throw error if validation fails
  return new Proxy(target, {
    set(target, prop, value, receiver) {
      // Run the validator - it should throw if invalid
      validator(prop, value);
      return Reflect.set(target, prop, value, receiver);
    },
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    }
  });
}

// Test
const logged = createLoggedObject({ name: 'John', age: 30 });
console.log(logged.name); // Should log: "Accessing property: name"

const validated = createValidatedObject({}, (key, value) => {
  if (key === 'age' && (value < 0 || value > 150)) {
    throw new Error('Invalid age');
  }
  return true;
});

validated.age = 25; // OK
// validated.age = 200; // Should throw error`,
  testCases: [
    {
      input: 'loggedGet',
      expectedOutput: { logged: true, value: 'John' },
      description: 'Logged object logs property access',
    },
    {
      input: 'loggedSet',
      expectedOutput: { logged: true, value: 'Jane' },
      description: 'Logged object logs property assignment',
    },
    {
      input: 'validatedSuccess',
      expectedOutput: { age: 25 },
      description: 'Validated object accepts valid values',
    },
    {
      input: 'validatedFailure',
      expectedOutput: { error: 'Invalid age' },
      description: 'Validated object rejects invalid values',
    },
    {
      input: 'proxyTransparent',
      expectedOutput: { isProxy: false },
      description: 'Proxy is transparent to code using it',
    },
  ],
  hints: [
    'Proxy constructor takes target and handler object',
    'Use get trap for property access: get(target, prop)',
    'Use set trap for property assignment: set(target, prop, value)',
    'Return true from set trap to indicate success',
  ],
};
