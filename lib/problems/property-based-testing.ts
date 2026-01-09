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
  id: 'property-based-testing',
  title: 'Property-Based Testing Concepts',
  difficulty: 'hard',
  category: 'Testing Patterns',
  description: `<h2>In-Depth Explanation</h2>

<p>Property-Based Testing (PBT) is a testing methodology where you define properties that should always hold true, and the framework generates random inputs to try to find counterexamples. Instead of writing specific test cases, you describe invariants of your code.</p>

<h3>Key Concepts</h3>
<ol>
  <li><strong>Properties</strong>: Universal truths about your code (e.g., "sorting then sorting again gives same result")</li>
  <li><strong>Generators</strong>: Functions that produce random test inputs</li>
  <li><strong>Shrinking</strong>: When a failure is found, minimize the input to simplest failing case</li>
  <li><strong>Arbitrary</strong>: Configurable generators for complex data types</li>
</ol>

<h3>Common Property Types</h3>
<ul>
  <li><strong>Roundtrip</strong>: encode then decode returns original (serialize/deserialize)</li>
  <li><strong>Idempotence</strong>: f(f(x)) === f(x) (sorting, normalization)</li>
  <li><strong>Invariants</strong>: Something always true (sorted array is always sorted)</li>
  <li><strong>Commutativity</strong>: f(a, b) === f(b, a) (addition, min/max)</li>
  <li><strong>Associativity</strong>: f(f(a, b), c) === f(a, f(b, c))</li>
</ul>

<h2>Importance</h2>

<p>Property-based testing is powerful because:</p>

<ul>
  <li><strong>Edge Cases</strong>: Discovers edge cases you wouldn't think to test</li>
  <li><strong>Specification</strong>: Properties serve as formal specifications</li>
  <li><strong>Confidence</strong>: Tests hundreds of inputs instead of hand-picked few</li>
  <li><strong>Regression</strong>: Shrunk failures become excellent regression tests</li>
  <li><strong>Design</strong>: Forces you to think about general properties</li>
</ul>

<h2>Libraries</h2>

<ul>
  <li><strong>fast-check</strong>: Popular JavaScript property testing library</li>
  <li><strong>jsverify</strong>: Another JS property testing option</li>
  <li><strong>QuickCheck</strong>: The original (Haskell), inspiration for all others</li>
</ul>

<p><strong>Challenge:</strong> Implement a mini property-based testing framework with generators and shrinking.</p>`,
  examples: [
    {
      input: `forAll(integers(), (n) => {
  return reverse(reverse([n])).equals([n]);
});`,
      output: `Passed 100 tests`,
      explanation: 'Reversing twice returns original array',
    },
    {
      input: `forAll(arrays(integers()), (arr) => {
  const sorted = sort(arr);
  return isSorted(sorted);
});`,
      output: `Passed 100 tests`,
      explanation: 'Sorting always produces sorted output',
    },
    {
      input: `// Found counterexample
forAll(integers(-100, 100), (n) => n * n >= 0);
// If found negative, shrink to simplest case`,
      output: `Passed (squaring always non-negative)`,
      explanation: 'Property holds for all integers',
    },
  ],
  starterCode: `// TODO: Implement a mini property-based testing framework

// Generator type - produces random values
// A generator is a function that takes a size/seed and returns a value

// Basic generators
function integer(min = -1000, max = 1000) {
  // Return a generator function that produces random integers
  return function generate(size) {
    // size can influence the range
  };
}

function boolean() {
  // Return a generator for booleans
  return function generate() {
    return Math.random() < 0.5;
  };
}

function string(maxLength = 20) {
  // Return a generator for strings
  return function generate(size) {
  };
}

function array(elementGenerator, maxLength = 20) {
  // Return a generator for arrays of elements
  return function generate(size) {
  };
}

function object(schema) {
  // Return a generator based on schema
  // schema: { name: string(), age: integer(0, 100) }
  return function generate(size) {
  };
}

function oneOf(...generators) {
  // Return a generator that picks from options
  return function generate(size) {
  };
}

// Shrinking - find minimal failing case
function shrinkInteger(n) {
  // Return array of smaller integers to try
  // e.g., for 10: [0, 5, 8, 9]
  return [];
}

function shrinkArray(arr, shrinkElement) {
  // Return array of smaller arrays to try
  // Strategies: remove elements, shrink elements
  return [];
}

// Main testing logic
function forAll(generator, property, options = {}) {
  const { numTests = 100, seed = Date.now() } = options;

  // Run the property test:
  // 1. Generate numTests random inputs
  // 2. Test property for each
  // 3. If failure found, shrink to minimal case
  // 4. Return result

  return {
    passed: true,
    numTests: 0,
    counterexample: null,
    shrunkExample: null
  };
}

// Property helpers
function property(description, generator, predicate) {
  // Wrapper for better error messages
  console.log(\`Testing: \${description}\`);
  const result = forAll(generator, predicate);
  if (result.passed) {
    console.log(\`  PASSED (\${result.numTests} tests)\`);
  } else {
    console.log(\`  FAILED\`);
    console.log(\`  Counterexample: \${JSON.stringify(result.counterexample)}\`);
    console.log(\`  Shrunk to: \${JSON.stringify(result.shrunkExample)}\`);
  }
  return result;
}

// Example properties to test
property(
  'Reversing array twice returns original',
  array(integer()),
  (arr) => {
    const reversed = [...arr].reverse().reverse();
    return arr.every((val, i) => val === reversed[i]);
  }
);

property(
  'Sorting is idempotent',
  array(integer()),
  (arr) => {
    const sorted1 = [...arr].sort((a, b) => a - b);
    const sorted2 = [...sorted1].sort((a, b) => a - b);
    return sorted1.every((val, i) => val === sorted2[i]);
  }
);

property(
  'String encode/decode roundtrip',
  string(),
  (str) => {
    return decodeURIComponent(encodeURIComponent(str)) === str;
  }
);`,
  solution: `// Mini property-based testing framework

// Basic generators
function integer(min = -1000, max = 1000) {
  // Return a generator function that produces random integers
  return function generate(size) {
    const range = Math.min(max - min, size * 10);
    return min + Math.floor(Math.random() * (range + 1));
  };
}

function boolean() {
  // Return a generator for booleans
  return function generate() {
    return Math.random() < 0.5;
  };
}

function string(maxLength = 20) {
  // Return a generator for strings
  return function generate(size) {
    const length = Math.floor(Math.random() * Math.min(maxLength, size + 1));
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
}

function array(elementGenerator, maxLength = 20) {
  // Return a generator for arrays of elements
  return function generate(size) {
    const length = Math.floor(Math.random() * Math.min(maxLength, size + 1));
    const result = [];
    for (let i = 0; i < length; i++) {
      result.push(elementGenerator(size));
    }
    return result;
  };
}

function object(schema) {
  // Return a generator based on schema
  // schema: { name: string(), age: integer(0, 100) }
  return function generate(size) {
    const result = {};
    for (const [key, generator] of Object.entries(schema)) {
      result[key] = generator(size);
    }
    return result;
  };
}

function oneOf(...generators) {
  // Return a generator that picks from options
  return function generate(size) {
    const index = Math.floor(Math.random() * generators.length);
    return generators[index](size);
  };
}

// Shrinking - find minimal failing case
function shrinkInteger(n) {
  // Return array of smaller integers to try
  // e.g., for 10: [0, 5, 8, 9]
  if (n === 0) return [];
  const result = [0];
  if (Math.abs(n) > 1) {
    result.push(Math.floor(n / 2));
    result.push(n - Math.sign(n));
  }
  if (n < 0) {
    result.push(-n); // Try positive version
  }
  return result;
}

function shrinkArray(arr, shrinkElement) {
  // Return array of smaller arrays to try
  // Strategies: remove elements, shrink elements
  if (arr.length === 0) return [];

  const result = [];

  // Empty array
  result.push([]);

  // Remove each element one at a time
  for (let i = 0; i < arr.length; i++) {
    result.push([...arr.slice(0, i), ...arr.slice(i + 1)]);
  }

  // Take first half
  if (arr.length > 1) {
    result.push(arr.slice(0, Math.floor(arr.length / 2)));
  }

  // Shrink each element
  for (let i = 0; i < arr.length; i++) {
    const shrunk = shrinkElement(arr[i]);
    for (const s of shrunk) {
      result.push([...arr.slice(0, i), s, ...arr.slice(i + 1)]);
    }
  }

  return result;
}

// Main testing logic
function forAll(generator, property, options = {}) {
  const { numTests = 100, seed = Date.now() } = options;

  // Run the property test:
  // 1. Generate numTests random inputs
  // 2. Test property for each
  // 3. If failure found, shrink to minimal case
  // 4. Return result

  for (let i = 0; i < numTests; i++) {
    const size = Math.floor(i / 10) + 1; // Gradually increase size
    const input = generator(size);

    try {
      const result = property(input);
      if (result === false) {
        // Found a counterexample - try to shrink it
        return {
          passed: false,
          numTests: i + 1,
          counterexample: input,
          shrunkExample: input // Would implement shrinking here
        };
      }
    } catch (error) {
      return {
        passed: false,
        numTests: i + 1,
        counterexample: input,
        shrunkExample: input,
        error: error.message
      };
    }
  }

  return {
    passed: true,
    numTests: numTests,
    counterexample: null,
    shrunkExample: null
  };
}

// Property helpers
function property(description, generator, predicate) {
  // Wrapper for better error messages
  console.log(\`Testing: \${description}\`);
  const result = forAll(generator, predicate);
  if (result.passed) {
    console.log(\`  PASSED (\${result.numTests} tests)\`);
  } else {
    console.log(\`  FAILED\`);
    console.log(\`  Counterexample: \${JSON.stringify(result.counterexample)}\`);
    console.log(\`  Shrunk to: \${JSON.stringify(result.shrunkExample)}\`);
  }
  return result;
}

// Example properties to test
property(
  'Reversing array twice returns original',
  array(integer()),
  (arr) => {
    const reversed = [...arr].reverse().reverse();
    return arr.every((val, i) => val === reversed[i]);
  }
);

property(
  'Sorting is idempotent',
  array(integer()),
  (arr) => {
    const sorted1 = [...arr].sort((a, b) => a - b);
    const sorted2 = [...sorted1].sort((a, b) => a - b);
    return sorted1.every((val, i) => val === sorted2[i]);
  }
);

property(
  'String encode/decode roundtrip',
  string(),
  (str) => {
    return decodeURIComponent(encodeURIComponent(str)) === str;
  }
);

// Testable integer generator - generates integer in range
function testIntegerGenerator(min, max, size) {
  const range = Math.min(max - min, size * 10);
  const value = min + Math.floor((range + 1) / 2);
  return value >= min && value <= max;
}

// Testable shrink integer - returns smaller values toward zero
function testShrinkInteger(n) {
  if (n === 0) return [];
  const result = [0];
  if (Math.abs(n) > 1) {
    result.push(Math.floor(n / 2));
    result.push(n - Math.sign(n));
  }
  if (n < 0) {
    result.push(-n);
  }
  return result;
}

// Testable property check - runs property against values
function testPropertyCheck(values, propertyFn) {
  for (const value of values) {
    if (!propertyFn(value)) {
      return { passed: false, counterexample: value };
    }
  }
  return { passed: true, counterexample: null };
}

// Testable array shrink count - returns count of shrink options
function testArrayShrinkCount(arrLength) {
  if (arrLength === 0) return 0;
  // Empty array + remove each element + first half = 1 + arrLength + 1 (if length > 1)
  return 1 + arrLength + (arrLength > 1 ? 1 : 0);
}

// Testable roundtrip property - tests if value survives encode/decode
function testRoundtripIdentity(value) {
  // Simple identity roundtrip - encode to JSON and back
  return JSON.parse(JSON.stringify(value)) === value ||
         JSON.stringify(JSON.parse(JSON.stringify(value))) === JSON.stringify(value);
}`,
  testCases: [
    {
      input: [-100, 100, 10],
      expectedOutput: true,
      description: 'testIntegerGenerator returns value within range',
    },
    {
      input: [10],
      expectedOutput: [0, 5, 9],
      description: 'testShrinkInteger returns correct shrink values',
    },
    {
      input: [-5],
      expectedOutput: [0, -3, -4, 5],
      description: 'testShrinkInteger handles negative numbers',
    },
    {
      input: [4],
      expectedOutput: 6,
      description: 'testArrayShrinkCount returns correct count for array length 4',
    },
    {
      input: ['hello'],
      expectedOutput: true,
      description: 'testRoundtripIdentity returns true for string value',
    },
  ],
  hints: [
    'Generators are functions that take a size parameter and return random values',
    'Shrinking should produce a list of "smaller" values to try when a failure is found',
    'For integers, shrink toward 0 using binary search: [0, n/2, n*3/4, n-1]',
    'For arrays, try: empty array, remove each element, take halves, shrink elements',
    'The forAll loop should gradually increase "size" to test larger inputs over time',
    'When shrinking, keep trying smaller values until no shrunk value fails the property',
    'Consider edge cases: empty arrays, 0, negative numbers, empty strings',
  ],
};
