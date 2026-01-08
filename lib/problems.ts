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
    input: any;
    expectedOutput: any;
    description?: string;
  }>;
  hints: string[];
}

export const problems: Problem[] = [
  {
    id: 'proxy-api',
    title: 'Proxy API for Interception',
    difficulty: 'hard',
    category: 'Object Methods',
    description: `Use Proxy to intercept and customize operations on objects.

**Challenge:** Create a proxy that logs property access and validates assignments.`,
    examples: [
      {
        input: `const obj = new Proxy(target, handler);`,
        output: `Intercepts get, set, and other operations`,
        explanation: 'Proxy enables meta-programming'
      }
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
        description: 'createLoggedObject - mock test'
      }
    ],
    hints: [
      'Proxy constructor takes target and handler object',
      'Use get trap for property access: get(target, prop)',
      'Use set trap for property assignment: set(target, prop, value)',
      'Return true from set trap to indicate success'
    ]
  },
  {
    id: 'weakmap-weakset',
    title: 'WeakMap and WeakSet',
    difficulty: 'medium',
    category: 'Object Methods',
    description: `Use WeakMap and WeakSet for memory-efficient associations that don't prevent garbage collection.

**Challenge:** Use WeakMap to store private data and WeakSet to track visited objects.`,
    examples: [
      {
        input: `const privateData = new WeakMap();`,
        output: `Stores data keyed by objects, allows GC`,
        explanation: 'WeakMap keys must be objects, allows garbage collection'
      }
    ],
    starterCode: `// TODO: Use WeakMap to store private data
class User {
  constructor(name) {
    this.name = name;
    // Store private data in WeakMap
    // Use 'this' as the key
  }
  
  getPrivateId() {
    // Retrieve private data from WeakMap
    return null;
  }
  
  setPrivateId(id) {
    // Store private data in WeakMap
  }
}

// TODO: Use WeakSet to track visited objects
function markVisited(obj, visited) {
  // Add object to WeakSet
}

function isVisited(obj, visited) {
  // Check if object is in WeakSet
  return false;
}

// Test
const user = new User('John');
user.setPrivateId('secret-123');
console.log(user.getPrivateId());

const visited = new WeakSet();
const obj1 = {};
const obj2 = {};

markVisited(obj1, visited);
console.log(isVisited(obj1, visited)); // true
console.log(isVisited(obj2, visited)); // false`,
    solution: `const privateData = new WeakMap();

class User {
  constructor(name) {
    this.name = name;
  }
  
  getPrivateId() {
    return privateData.get(this);
  }
  
  setPrivateId(id) {
    privateData.set(this, id);
  }
}

function markVisited(obj, visited) {
  visited.add(obj);
}

function isVisited(obj, visited) {
  return visited.has(obj);
}`,
    testCases: [
      {
        input: ['John'],
        expectedOutput: 'secret-123',
        description: 'User with private data'
      }
    ],
    hints: [
      'WeakMap keys must be objects (not primitives)',
      'WeakMap/WeakSet allow garbage collection when key is no longer referenced',
      'Useful for private data, metadata, or tracking without memory leaks'
    ]
  },
  {
    id: 'symbol-usage',
    title: 'Symbols for Unique Keys',
    difficulty: 'medium',
    category: 'Object Methods',
    description: `Use Symbols to create unique property keys that won't conflict with other properties.

**Challenge:** Use Symbols for private properties and well-known symbols.`,
    examples: [
      {
        input: `const ID = Symbol('id');`,
        output: `Unique symbol that won't conflict`,
        explanation: 'Symbols are always unique, even with same description'
      }
    ],
    starterCode: `// TODO: Create a Symbol for a private property
const PRIVATE_ID = Symbol('privateId'); // Fix: Create symbol

// TODO: Use Symbol in an object
const user = {
  name: 'John',
  // Add privateId property using PRIVATE_ID symbol
};

// TODO: Create a well-known symbol (iterator)
const iterable = {
  data: [1, 2, 3],
  // Add Symbol.iterator method to make it iterable
};

// Test
user[PRIVATE_ID] = 'secret-123';
console.log(user[PRIVATE_ID]);

// Should work with for...of
for (const item of iterable) {
  console.log(item);
}`,
    solution: `const PRIVATE_ID = Symbol('privateId');

const user = {
  name: 'John',
  [PRIVATE_ID]: 'secret-123'
};

const iterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        }
        return { done: true };
      }.bind(this)
    };
  }
};`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'Symbol usage - type check'
      }
    ],
    hints: [
      'Symbol() creates unique symbol, Symbol.for() creates shared symbol',
      'Use computed property names: [SYMBOL]: value',
      'Well-known symbols: Symbol.iterator, Symbol.toStringTag, etc.',
      'Symbols are not enumerable in Object.keys() or for...in'
    ]
  },
  {
    id: 'reflect-api',
    title: 'Reflect API for Meta-Programming',
    difficulty: 'hard',
    category: 'Object Methods',
    description: `Use Reflect methods for operations that mirror Proxy traps.

**Challenge:** Use Reflect for property operations and function calls.`,
    examples: [
      {
        input: `Reflect.get(obj, 'prop'), Reflect.set(obj, 'prop', value)`,
        output: `Meta-programming operations`,
        explanation: 'Reflect provides programmatic access to object operations'
      }
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
        description: 'safeGet'
      }
    ],
    hints: [
      'Reflect.get(target, prop) - get property value',
      'Reflect.set(target, prop, value) - set property, returns boolean',
      'Reflect.has(target, prop) - check if property exists',
      'Reflect.construct(Constructor, args) - create instance'
    ]
  },
  {
    id: 'object-freeze-seal',
    title: 'Object.freeze, seal, and preventExtensions',
    difficulty: 'medium',
    category: 'Object Methods',
    description: `Control mutability with Object.freeze, Object.seal, and Object.preventExtensions.

**Challenge:** Understand the differences and use cases for each.`,
    examples: [
      {
        input: `Object.freeze(obj), Object.seal(obj), Object.preventExtensions(obj)`,
        output: `Different levels of immutability`,
        explanation: 'freeze > seal > preventExtensions in restrictiveness'
      }
    ],
    starterCode: `// TODO: Create immutable object with Object.freeze
function createImmutableObject(data) {
  // Freeze the object (no changes allowed)
  return data;
}

// TODO: Create sealed object (can modify, can't add/remove)
function createSealedObject(data) {
  // Seal the object
  return data;
}

// TODO: Check if object is frozen
function isFrozen(obj) {
  // Use Object.isFrozen
  return false;
}

// TODO: Deep freeze nested objects
function deepFreeze(obj) {
  // Freeze object and recursively freeze all properties
  // Return the frozen object
  return obj;
}

// Test
const immutable = createImmutableObject({ a: 1, b: { c: 2 } });
// immutable.a = 2; // Should fail silently or throw in strict mode

const sealed = createSealedObject({ x: 1 });
sealed.x = 2; // Should work
// sealed.y = 3; // Should fail

const deep = deepFreeze({ a: { b: { c: 1 } } });
// deep.a.b.c = 2; // Should fail`,
    solution: `function createImmutableObject(data) {
  return Object.freeze(data);
}

function createSealedObject(data) {
  return Object.seal(data);
}

function isFrozen(obj) {
  return Object.isFrozen(obj);
}

function deepFreeze(obj) {
  Object.freeze(obj);
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === 'object' && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  }
  return obj;
}`,
    testCases: [
      {
        input: [{ a: 1 }],
        expectedOutput: true,
        description: 'isFrozen check'
      }
    ],
    hints: [
      'Object.freeze: no changes, additions, or deletions',
      'Object.seal: can modify, cannot add or delete',
      'Object.preventExtensions: can modify/delete, cannot add',
      'Deep freeze requires recursive freezing of nested objects'
    ]
  },
  {
    id: 'property-descriptors',
    title: 'Property Descriptors',
    difficulty: 'medium',
    category: 'Object Methods',
    description: `Use property descriptors to control property behavior (enumerable, writable, configurable).

**Challenge:** Create properties with specific descriptors.`,
    examples: [
      {
        input: `Object.defineProperty(obj, 'prop', { enumerable: false })`,
        output: `Property with custom descriptor`,
        explanation: 'Control property visibility and mutability'
      }
    ],
    starterCode: `// TODO: Create a non-enumerable property
function addHiddenProperty(obj, key, value) {
  // Use Object.defineProperty with enumerable: false
  return obj;
}

// TODO: Create a read-only property
function addReadOnlyProperty(obj, key, value) {
  // Use Object.defineProperty with writable: false
  return obj;
}

// TODO: Get all property descriptors
function getDescriptors(obj) {
  // Use Object.getOwnPropertyDescriptors
  return {};
}

// TODO: Copy descriptors from one object to another
function copyDescriptors(source, target) {
  // Use Object.defineProperties with descriptors from source
  return target;
}

// Test
const obj = { visible: 1 };
addHiddenProperty(obj, 'hidden', 'secret');
addReadOnlyProperty(obj, 'readonly', 'immutable');

console.log(Object.keys(obj)); // Should not include 'hidden'
// obj.readonly = 'changed'; // Should fail in strict mode

const descriptors = getDescriptors(obj);
console.log(descriptors);`,
    solution: `function addHiddenProperty(obj, key, value) {
  Object.defineProperty(obj, key, {
    value,
    enumerable: false,
    writable: true,
    configurable: true
  });
  return obj;
}

function addReadOnlyProperty(obj, key, value) {
  Object.defineProperty(obj, key, {
    value,
    enumerable: true,
    writable: false,
    configurable: true
  });
  return obj;
}

function getDescriptors(obj) {
  return Object.getOwnPropertyDescriptors(obj);
}

function copyDescriptors(source, target) {
  const descriptors = Object.getOwnPropertyDescriptors(source);
  Object.defineProperties(target, descriptors);
  return target;
}`,
    testCases: [
      {
        input: [{ a: 1 }, 'hidden', 'secret'],
        expectedOutput: { a: 1 },
        description: 'addHiddenProperty - check enumerable'
      }
    ],
    hints: [
      'enumerable: false - hidden from Object.keys, for...in',
      'writable: false - cannot be reassigned',
      'configurable: false - cannot be deleted or reconfigured',
      'Object.getOwnPropertyDescriptors gets all descriptors'
    ]
  },
  {
    id: 'computed-property-names',
    title: 'Computed Property Names',
    difficulty: 'easy',
    category: 'Object Methods',
    description: `Use computed property names in object literals for dynamic keys.

**Challenge:** Create objects with dynamic property names.`,
    examples: [
      {
        input: `const key = 'name'; const obj = { [key]: 'John' };`,
        output: `{ name: 'John' }`,
        explanation: 'Computed property names use bracket notation'
      }
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
        description: 'createConfig'
      },
      {
        input: [[['a', 1], ['b', 2]]],
        expectedOutput: { a: 1, b: 2 },
        description: 'fromEntries'
      }
    ],
    hints: [
      'Use brackets in object literals: { [expression]: value }',
      'Can use template literals: { [`key${suffix}`]: value }',
      'Useful for dynamic property names based on variables'
    ]
  },
  {
    id: 'spread-operator-patterns',
    title: 'Advanced Spread Operator Patterns',
    difficulty: 'medium',
    category: 'Object Methods',
    description: `Use spread operator for cloning, merging, and transforming objects and arrays.

**Challenge:** Master spread operator for common patterns.`,
    examples: [
      {
        input: `const merged = { ...obj1, ...obj2 };`,
        output: `Merged object with later properties overriding`,
        explanation: 'Spread operator creates shallow copies'
      }
    ],
    starterCode: `// TODO: Deep clone an object (shallow clone with spread)
function shallowClone(obj) {
  // Use spread operator to clone object
  return obj;
}

// TODO: Merge objects with override
function mergeObjects(...objects) {
  // Merge all objects, later ones override earlier ones
  return {};
}

// TODO: Update nested property immutably
function updateNested(obj, path, value) {
  // Update nested property without mutating original
  // updateNested({ a: { b: 1 } }, 'a.b', 2) => { a: { b: 2 } }
  return obj;
}

// TODO: Remove property immutably
function omitProperty(obj, key) {
  // Return new object without the specified key
  // Use destructuring and rest
  return obj;
}

// Test
const original = { a: 1, b: { c: 2 } };
const cloned = shallowClone(original);
cloned.b.c = 3;
console.log(original.b.c); // Should still be 2 (shallow clone)

const merged = mergeObjects({ a: 1 }, { b: 2 }, { a: 3 });
console.log(merged); // { a: 3, b: 2 }

const updated = updateNested({ a: { b: 1 } }, 'a.b', 2);
console.log(updated); // { a: { b: 2 } }

const omitted = omitProperty({ a: 1, b: 2, c: 3 }, 'b');
console.log(omitted); // { a: 1, c: 3 }`,
    solution: `function shallowClone(obj) {
  return { ...obj };
}

function mergeObjects(...objects) {
  return objects.reduce((acc, obj) => ({ ...acc, ...obj }), {});
}

function updateNested(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((acc, key) => acc[key], obj);
  return {
    ...obj,
    [keys[0]]: keys.length > 1 
      ? updateNested(obj[keys[0]], keys.slice(1).join('.'), value)
      : { ...target, [lastKey]: value }
  };
}

function omitProperty(obj, key) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}`,
    testCases: [
      {
        input: [{ a: 1, b: 2 }],
        expectedOutput: { a: 1, b: 2 },
        description: 'shallowClone'
      },
      {
        input: [{ a: 1 }, { b: 2 }, { a: 3 }],
        expectedOutput: { a: 3, b: 2 },
        description: 'mergeObjects'
      },
      {
        input: [{ a: 1, b: 2, c: 3 }, 'b'],
        expectedOutput: { a: 1, c: 3 },
        description: 'omitProperty'
      }
    ],
    hints: [
      'Spread creates shallow copy: { ...obj }',
      'Later properties override: { ...obj1, ...obj2 }',
      'Use destructuring to omit: const { key, ...rest } = obj',
      'For deep updates, spread at each level'
    ]
  }
];

export function getProblemById(id: string): Problem | undefined {
  return problems.find(p => p.id === id);
}

export function getProblemsByCategory(category: string): Problem[] {
  return problems.filter(p => p.category === category);
}

export function getProblemsByDifficulty(difficulty: Problem['difficulty']): Problem[] {
  return problems.filter(p => p.difficulty === difficulty);
}
