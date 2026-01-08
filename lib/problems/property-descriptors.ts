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
    id: 'property-descriptors',
    title: 'Property Descriptors',
    difficulty: 'medium',
    category: 'Object Methods',
    description: `## In-Depth Explanation

Property descriptors control how properties behave in JavaScript. Each property has a descriptor with attributes:
- **enumerable**: Whether property appears in \`for...in\` loops and \`Object.keys()\`
- **writable**: Whether property value can be changed
- **configurable**: Whether property can be deleted or its descriptor modified
- **value**: The property's value (for data properties)
- **get/set**: Accessor functions (for accessor properties)

\`Object.defineProperty()\` and \`Object.defineProperties()\` allow fine-grained control over property behavior. \`Object.getOwnPropertyDescriptor()\` retrieves a property's descriptor.

This enables:
- Hidden properties (non-enumerable)
- Read-only properties (non-writable)
- Computed properties (getters/setters)
- Property protection (non-configurable)

## Importance

Property descriptors are essential for object design because:

- **Property Control**: Fine-grained control over property behavior
- **API Design**: Create clean public APIs with hidden internals
- **Immutability**: Create read-only properties
- **Computed Properties**: Implement getters/setters for computed values
- **Library Development**: Essential for building robust libraries
- **Framework Development**: Used extensively in frameworks

## Usefulness & Practical Applications

Property descriptors are used extensively:

- **Hidden Properties**: Creating internal properties that don't appear in enumeration
- **Read-Only Properties**: Protecting important properties from modification
- **Computed Properties**: Implementing getters/setters for derived values
- **Library APIs**: Creating clean public APIs with hidden internals
- **Framework Internals**: React, Vue use descriptors for internal properties
- **Validation**: Implementing property validation with setters
- **Lazy Loading**: Implementing lazy-loaded properties with getters
- **Observables**: Creating observable properties with getters/setters

**Challenge:** Create properties with specific descriptors.`,
    examples: [
      {
        input: `Object.defineProperty(obj, 'prop', { enumerable: false })`,
        output: `Property with custom descriptor`,
        explanation: 'Control property visibility and mutability',
      },
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
        description: 'addHiddenProperty - check enumerable',
      },
    ],
    hints: [
      'enumerable: false - hidden from Object.keys, for...in',
      'writable: false - cannot be reassigned',
      'configurable: false - cannot be deleted or reconfigured',
      'Object.getOwnPropertyDescriptors gets all descriptors',
    ],
  },
  {
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
  },
  {
    id: 'spread-operator-patterns',
    title: 'Advanced Spread Operator Patterns',
    difficulty: 'medium',
    category: 'Object Methods',
    description: `## In-Depth Explanation

The spread operator (\`...\`) is a powerful tool for working with objects and arrays. It "spreads" or expands an iterable into individual elements. For objects, it creates shallow copies and enables immutable updates.

Key patterns:
- **Cloning**: \`{ ...obj }\` creates a shallow copy
- **Merging**: \`{ ...obj1, ...obj2 }\` merges objects (later overrides earlier)
- **Immutable Updates**: \`{ ...obj, prop: newValue }\` updates without mutation
- **Omitting Properties**: \`const { key, ...rest } = obj\` removes properties
- **Nested Updates**: Spread at each level for deep updates

Important: Spread creates shallow copies. Nested objects are still referenced, not copied. For deep cloning, you need recursive spreading or libraries like Lodash.

## Importance

Spread operator patterns are essential for modern JavaScript because:

- **Immutability**: Update objects/arrays without mutation
- **Functional Programming**: Supports immutable data patterns
- **State Management**: Essential for Redux, Vuex immutable updates
- **React**: Used extensively for props and state updates
- **Code Clarity**: More readable than Object.assign()
- **Performance**: Efficient shallow copying

## Usefulness & Practical Applications

Spread patterns are used everywhere:

- **State Updates**: React setState with spread: \`setState({ ...state, key: value })\`
- **Redux Reducers**: Immutable state updates in Redux
- **Object Merging**: Merging configuration objects
- **Default Values**: \`{ ...defaults, ...overrides }\`
- **Array Operations**: Cloning, concatenating arrays
- **Function Arguments**: Spreading arrays as function arguments
- **Props Spreading**: React \`<Component {...props} />\`
- **API Requests**: Merging request parameters

**Challenge:** Master spread operator for common patterns.`,
    examples: [
      {
        input: `const merged = { ...obj1, ...obj2 };`,
        output: `Merged object with later properties overriding`,
        explanation: 'Spread operator creates shallow copies',
      },
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
  if (keys.length === 1) {
    return { ...obj, [keys[0]]: value };
  }
  const [firstKey, ...restKeys] = keys;
  return {
    ...obj,
    [firstKey]: updateNested(obj[firstKey] || {}, restKeys.join('.'), value)
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
        description: 'shallowClone',
      },
      {
        input: [{ a: 1 }, { b: 2 }, { a: 3 }],
        expectedOutput: { a: 3, b: 2 },
        description: 'mergeObjects',
      },
      {
        input: [{ a: 1, b: 2, c: 3 }, 'b'],
        expectedOutput: { a: 1, c: 3 },
        description: 'omitProperty',
      },
    ],
    hints: [
      'Spread creates shallow copy: { ...obj }',
      'Later properties override: { ...obj1, ...obj2 }',
      'Use destructuring to omit: const { key, ...rest } = obj',
      'For deep updates, spread at each level',
    ],
  },
  {
    id: 'spread-operator-tricks',
    title: 'Spread Operator Tricks',
    difficulty: 'easy',
    category: 'JavaScript Basics',
    description: `## In-Depth Explanation

The spread operator (\`...\`) is one of the most versatile features in modern JavaScript. It works with arrays, objects, strings, and any iterable, enabling concise and powerful operations.

For arrays:
- **Copying**: \`[...array]\` creates a new array
- **Concatenating**: \`[...arr1, ...arr2]\` combines arrays
- **Adding Elements**: \`[...arr, newItem]\` adds to end
- **Function Arguments**: \`func(...args)\` spreads as arguments

For objects:
- **Copying**: \`{ ...obj }\` creates shallow copy
- **Merging**: \`{ ...obj1, ...obj2 }\` merges objects
- **Adding Properties**: \`{ ...obj, newProp: value }\`

The spread operator is syntactic sugar that makes code more readable and functional.

## Importance

Spread operator is fundamental to modern JavaScript because:

- **Immutability**: Essential for immutable data patterns
- **Code Clarity**: More readable than manual copying/merging
- **Functional Style**: Enables functional programming patterns
- **React/Vue**: Used extensively in component libraries
- **State Management**: Core to Redux, Vuex patterns
- **ES6+ Standard**: Modern JavaScript best practice

## Usefulness & Practical Applications

Spread operator is used everywhere:

- **Array Operations**: Copying, concatenating, transforming arrays
- **Object Operations**: Cloning, merging, updating objects
- **React Props**: Spreading props to components
- **Function Calls**: Spreading arrays as arguments
- **State Updates**: Immutable state updates
- **Configuration**: Merging configuration objects
- **API Requests**: Building request objects
- **Data Transformation**: Transforming data structures

**Challenge:** Use spread to merge objects, clone arrays, and convert iterables.

**Key Concepts:**
- Shallow cloning arrays and objects
- Merging objects (last wins)
- Converting iterables to arrays
- Rest parameters vs spread`,
    examples: [
      {
        input: `const obj1 = { a: 1 }; const obj2 = { b: 2 };`,
        output: `{ a: 1, b: 2 }`,
        explanation: 'Merge objects using spread',
      },
    ],
    starterCode: `function mergeObjects(obj1, obj2) {
  // TODO: Merge two objects, obj2 properties override obj1
  return obj1;
}

function cloneAndPush(arr, newItem) {
  // TODO: Clone array and add new item without mutating original
  arr.push(newItem);
  return arr;
}

function uniqueValues(arr) {
  // TODO: Return array with unique values using Set and spread
  return arr;
}

// Test
console.log(mergeObjects({ a: 1, b: 2 }, { b: 3, c: 4 }));
console.log(cloneAndPush([1, 2, 3], 4));
console.log(uniqueValues([1, 2, 2, 3, 3, 3]));`,
    solution: `function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

function cloneAndPush(arr, newItem) {
  return [...arr, newItem];
}

function uniqueValues(arr) {
  return [...new Set(arr)];
}`,
    testCases: [
      {
        input: [
          { a: 1, b: 2 },
          { b: 3, c: 4 },
        ],
        expectedOutput: { a: 1, b: 3, c: 4 },
        description: 'mergeObjects',
      },
      {
        input: [[1, 2, 3], 4],
        expectedOutput: [1, 2, 3, 4],
        description: 'cloneAndPush',
      },
      {
        input: [[1, 2, 2, 3, 3, 3]],
        expectedOutput: [1, 2, 3],
        description: 'uniqueValues',
      },
    ],
    hints: [
      'Use {...obj1, ...obj2} to merge objects',
      'Use [...arr] to clone an array',
      'new Set(arr) removes duplicates, spread converts back to array',
    ],
  },
  {
    id: 'short-circuit-evaluation',
    title: 'Short-Circuit Evaluation',
    difficulty: 'easy',
    category: 'JavaScript Basics',
    description: `## In-Depth Explanation

Short-circuit evaluation is a feature where logical operators (\`&&\` and \`||\`) don't evaluate the right operand if the result can be determined from the left operand alone.

\`&&\` (AND): Returns the first falsy value, or the last value if all are truthy. Stops evaluating at the first falsy value.
\`||\` (OR): Returns the first truthy value, or the last value if all are falsy. Stops evaluating at the first truthy value.

This enables:
- **Conditional Execution**: \`condition && doSomething()\` - only executes if condition is truthy
- **Default Values**: \`value || defaultValue\` - uses default if value is falsy
- **Optional Chaining**: \`obj && obj.prop && obj.prop.value\` - safely access nested properties

Important: Be careful with falsy values like \`0\`, \`''\`, \`false\` - they will trigger defaults with \`||\`.

## Importance

Short-circuit evaluation is essential for concise JavaScript because:

- **Code Conciseness**: Replace if statements with one-liners
- **Default Values**: Common pattern for providing defaults
- **Optional Access**: Safely access properties that might not exist
- **Performance**: Avoids unnecessary evaluations
- **Readability**: More readable than verbose if statements
- **Functional Style**: Enables functional programming patterns

## Usefulness & Practical Applications

Short-circuit evaluation is used everywhere:

- **Default Values**: \`const name = user.name || 'Guest'\`
- **Conditional Rendering**: React \`{isLoggedIn && <Dashboard />}\`
- **Optional Chaining**: \`user && user.profile && user.profile.name\`
- **Function Calls**: \`config && config.onLoad && config.onLoad()\`
- **API Responses**: \`response.data || []\` for default empty array
- **Configuration**: \`timeout || 5000\` for default timeout
- **Validation**: \`email && validateEmail(email)\`
- **Error Handling**: \`error && console.error(error)\`

**Challenge:** Replace if statements with short-circuit patterns.`,
    examples: [
      {
        input: `const name = user && user.name;`,
        output: `'John' or undefined`,
        explanation: '&& short-circuits on falsy values',
      },
    ],
    starterCode: `function greetUser(user) {
  // TODO: Use && to only call user.getName() if user exists
  // Return greeting or 'Hello, Guest!'
  let name;
  if (user) {
    name = user.getName();
  }
  return 'Hello, ' + (name || 'Guest') + '!';
}

function getConfigValue(config, key, defaultValue) {
  // TODO: Return config[key] if it exists, otherwise defaultValue
  // Use || for this (but be aware of falsy value issues!)
  if (config && config[key] !== undefined) {
    return config[key];
  }
  return defaultValue;
}

// Test
const user = { getName: () => 'John' };
console.log(greetUser(user));
console.log(greetUser(null));
console.log(getConfigValue({ timeout: 5000 }, 'timeout', 3000));
console.log(getConfigValue({}, 'timeout', 3000));`,
    solution: `function greetUser(user) {
  const name = user && user.getName();
  return 'Hello, ' + (name || 'Guest') + '!';
}

function getConfigValue(config, key, defaultValue) {
  return (config && config[key]) || defaultValue;
}`,
    testCases: [
      {
        input: [{ getName: () => 'John' }],
        expectedOutput: 'Hello, John!',
        description: 'greetUser with user',
      },
      {
        input: [null],
        expectedOutput: 'Hello, Guest!',
        description: 'greetUser without user',
      },
      {
        input: [{ timeout: 5000 }, 'timeout', 3000],
        expectedOutput: 5000,
        description: 'getConfigValue existing',
      },
      {
        input: [{}, 'timeout', 3000],
        expectedOutput: 3000,
        description: 'getConfigValue default',
      },
    ],
    hints: [
      '&& evaluates right side only if left is truthy',
      '|| returns first truthy value or last value',
      'Be careful: 0 and "" are falsy!',
    ],
  };
