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
};
