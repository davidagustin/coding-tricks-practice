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
  description: `## In-Depth Explanation

The \`Proxy\` object enables meta-programming by intercepting and customizing operations on objects (property access, assignment, enumeration, function invocation, etc.). It's a powerful tool for creating abstractions and implementing patterns like validation, logging, and reactive programming.

A Proxy wraps a target object with a handler that defines "traps" - functions that intercept operations. Common traps include:
- \`get\`: Intercepts property access
- \`set\`: Intercepts property assignment
- \`has\`: Intercepts \`in\` operator
- \`deleteProperty\`: Intercepts \`delete\` operator

Proxies are transparent - code using the proxy doesn't know it's a proxy. This enables powerful patterns like reactive frameworks, validation libraries, and debugging tools.

## Importance

Proxies are essential for advanced JavaScript patterns because:

- **Meta-Programming**: Intercept and customize object operations
- **Validation**: Automatic validation on property assignment
- **Reactivity**: Foundation for reactive frameworks (Vue 3 reactivity)
- **Debugging**: Logging and monitoring object access
- **Virtual Properties**: Create computed properties
- **Security**: Implement access control and validation layers

## Usefulness & Practical Applications

Proxies are used in many advanced scenarios:

- **Reactive Frameworks**: Vue 3 reactivity system uses Proxies
- **Validation Libraries**: Automatic property validation
- **ORM Libraries**: Lazy loading and virtual properties
- **Debugging Tools**: Logging object access and mutations
- **Access Control**: Implementing private properties and access control
- **API Wrappers**: Intercepting API calls for caching or logging
- **State Management**: Reactive state management systems
- **Mocking/Testing**: Creating test doubles and mocks

**Challenge:** Create a proxy that logs property access and validates assignments.`,
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
  solution: `function createLoggedObject(target) {
  return new Proxy(target, {
    get(target, prop) {
      console.log(\`Accessing property: \${String(prop)}\`);
      return target[prop];
    }
  });
}

function createValidatedObject(target, validator) {
  return new Proxy(target, {
    set(target, prop, value) {
      if (validator(prop, value)) {
        target[prop] = value;
        return true;
      }
      throw new Error(\`Invalid value for \${String(prop)}\`);
    }
  });
}`,
  testCases: [
    {
      input: [{ name: 'John' }],
      expectedOutput: 'John',
      description: 'createLoggedObject - mock test',
    },
  ],
  hints: [
    'Proxy constructor takes target and handler object',
    'Use get trap for property access: get(target, prop)',
    'Use set trap for property assignment: set(target, prop, value)',
    'Return true from set trap to indicate success',
  ],
};
