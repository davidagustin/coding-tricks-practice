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
    description: `## In-Depth Explanation

The Reflect API provides methods that mirror Proxy trap operations, offering a programmatic way to perform object operations. Each Reflect method corresponds to a Proxy trap and provides a functional alternative to operators like \`in\`, \`delete\`, and \`new\`.

Key Reflect methods:
- \`Reflect.get(target, prop)\`: Get property value
- \`Reflect.set(target, prop, value)\`: Set property (returns boolean)
- \`Reflect.has(target, prop)\`: Check if property exists
- \`Reflect.deleteProperty(target, prop)\`: Delete property
- \`Reflect.construct(Constructor, args)\`: Create instance
- \`Reflect.apply(func, thisArg, args)\`: Call function

The Reflect API is designed to work seamlessly with Proxies - Proxy traps can forward operations to Reflect methods, maintaining default behavior while adding custom logic.

## Importance

The Reflect API is essential for meta-programming because:

- **Proxy Integration**: Designed to work with Proxy traps
- **Functional Style**: Provides functional alternatives to operators
- **Error Handling**: Returns booleans instead of throwing (for set/delete)
- **Meta-Programming**: Enables programmatic object manipulation
- **Framework Development**: Essential for building frameworks and libraries
- **Type Safety**: Better TypeScript support than operators

## Usefulness & Practical Applications

The Reflect API is used in advanced scenarios:

- **Proxy Handlers**: Forwarding operations in Proxy traps
- **ORM Libraries**: Programmatic property access and manipulation
- **Validation Libraries**: Dynamic property validation
- **Framework Internals**: React, Vue use Reflect for internal operations
- **Testing**: Creating mocks and test doubles
- **Dynamic Code**: Building dynamic object manipulation code
- **Decorators**: Implementing decorators in TypeScript
- **Serialization**: Custom serialization logic

**Challenge:** Use Reflect for property operations and function calls.`,
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
        description: 'safeGet',
      },
    ],
    hints: [
      'Reflect.get(target, prop) - get property value',
      'Reflect.set(target, prop, value) - set property, returns boolean',
      'Reflect.has(target, prop) - check if property exists',
      'Reflect.construct(Constructor, args) - create instance',
    ],
  };
