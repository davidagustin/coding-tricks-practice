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
  description: `## In-Depth Explanation

Proxy traps are methods in a Proxy handler that intercept operations on the target object. Each trap corresponds to a JavaScript operation and allows you to customize behavior.

Common traps:
- **get**: Intercepts property access
- **set**: Intercepts property assignment
- **has**: Intercepts \`in\` operator
- **deleteProperty**: Intercepts \`delete\` operator
- **ownKeys**: Intercepts \`Object.keys()\`
- **apply**: Intercepts function calls (for function proxies)

Proxies enable:
- **Validation**: Validate property assignments
- **Logging**: Log all property access
- **Default Values**: Return defaults for missing properties
- **Reactivity**: Vue 3 reactivity system uses Proxies
- **Virtual Properties**: Create computed properties
- **Access Control**: Implement private properties

## Importance

Proxy traps are essential for meta-programming because:

- **Interception**: Intercept and customize any object operation
- **Validation**: Automatic validation on property access/assignment
- **Reactivity**: Foundation for reactive frameworks
- **Debugging**: Logging and monitoring object operations
- **Security**: Implement access control and validation
- **Framework Development**: Essential for building frameworks

## Usefulness & Practical Applications

Proxy traps are used extensively:

- **Reactive Frameworks**: Vue 3 reactivity system
- **Validation Libraries**: Automatic property validation
- **ORM Libraries**: Lazy loading and virtual properties
- **Debugging Tools**: Logging object access and mutations
- **Access Control**: Implementing private properties
- **API Wrappers**: Intercepting API calls for caching/logging
- **State Management**: Reactive state management
- **Mocking/Testing**: Creating test doubles

**Challenge:** Create proxies for validation, logging, and default values.`,
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
    get(target, prop) {
      console.log('Getting ' + String(prop));
      return target[prop];
    },
    set(target, prop, value) {
      console.log('Setting ' + String(prop) + ' to ' + value);
      target[prop] = value;
      return true;
    }
  });
}

function createDefaultProxy(obj, defaultValue) {
  return new Proxy(obj, {
    get(target, prop) {
      return prop in target ? target[prop] : defaultValue;
    }
  });
}

function createValidatingProxy(obj) {
  return new Proxy(obj, {
    set(target, prop, value) {
      if (prop === 'name' && typeof value !== 'string') {
        throw new Error('name must be a string');
      }
      if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
        throw new Error('age must be a positive number');
      }
      target[prop] = value;
      return true;
    }
  });
}`,
  testCases: [
    {
      input: [{ x: 1 }],
      expectedOutput: 1,
      description: 'logging proxy get',
    },
    {
      input: [{}, 'N/A'],
      expectedOutput: 'N/A',
      description: 'default proxy missing prop',
    },
  ],
  hints: [
    'new Proxy(target, handler) creates proxy',
    'get(target, prop) intercepts property access',
    'set(target, prop, value) must return true',
  ],
};
