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

// Main testing function
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
  solution: `// Basic generators
function integer(min = -1000, max = 1000) {
  const generator = function generate(size = 1) {
    const scaledMin = Math.max(min, -size * 100);
    const scaledMax = Math.min(max, size * 100);
    return Math.floor(Math.random() * (scaledMax - scaledMin + 1)) + scaledMin;
  };
  generator.shrink = shrinkInteger;
  return generator;
}

function boolean() {
  const generator = function generate() {
    return Math.random() < 0.5;
  };
  generator.shrink = () => [false, true];
  return generator;
}

function string(maxLength = 20) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const generator = function generate(size = 1) {
    const length = Math.floor(Math.random() * Math.min(maxLength, size * 5));
    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join('');
  };
  generator.shrink = shrinkString;
  return generator;
}

function array(elementGenerator, maxLength = 20) {
  const generator = function generate(size = 1) {
    const length = Math.floor(Math.random() * Math.min(maxLength, size * 3));
    return Array.from({ length }, () => elementGenerator(size));
  };
  generator.shrink = (arr) => shrinkArray(arr, elementGenerator.shrink || (() => []));
  return generator;
}

function object(schema) {
  const generator = function generate(size = 1) {
    const result = {};
    for (const [key, gen] of Object.entries(schema)) {
      result[key] = gen(size);
    }
    return result;
  };
  generator.shrink = (obj) => {
    const results = [];
    for (const [key, gen] of Object.entries(schema)) {
      if (gen.shrink) {
        for (const shrunk of gen.shrink(obj[key])) {
          results.push({ ...obj, [key]: shrunk });
        }
      }
    }
    return results;
  };
  return generator;
}

function oneOf(...generators) {
  const generator = function generate(size = 1) {
    const gen = generators[Math.floor(Math.random() * generators.length)];
    return gen(size);
  };
  return generator;
}

function constant(value) {
  const generator = function generate() {
    return value;
  };
  generator.shrink = () => [];
  return generator;
}

// Shrinking functions
function shrinkInteger(n) {
  if (n === 0) return [];
  const results = [0];
  const absN = Math.abs(n);
  const sign = n > 0 ? 1 : -1;

  // Binary search toward 0
  let current = Math.floor(absN / 2);
  while (current > 0) {
    results.push(sign * current);
    current = Math.floor(current / 2);
  }

  // Try values close to 0
  if (absN > 1) results.push(sign * (absN - 1));

  return results.filter(x => x !== n);
}

function shrinkString(str) {
  if (str.length === 0) return [];
  const results = [''];

  // Remove each character
  for (let i = 0; i < str.length; i++) {
    results.push(str.slice(0, i) + str.slice(i + 1));
  }

  // Take prefix halves
  results.push(str.slice(0, Math.floor(str.length / 2)));

  return results.filter(s => s !== str);
}

function shrinkArray(arr, shrinkElement) {
  if (arr.length === 0) return [];
  const results = [[]];

  // Remove each element
  for (let i = 0; i < arr.length; i++) {
    results.push([...arr.slice(0, i), ...arr.slice(i + 1)]);
  }

  // Take first half
  results.push(arr.slice(0, Math.floor(arr.length / 2)));

  // Shrink individual elements
  arr.forEach((elem, i) => {
    const shrunk = shrinkElement(elem);
    shrunk.forEach(s => {
      results.push([...arr.slice(0, i), s, ...arr.slice(i + 1)]);
    });
  });

  return results.filter(a =>
    a.length !== arr.length ||
    !a.every((v, i) => v === arr[i])
  );
}

// Main testing function
function forAll(generator, property, options = {}) {
  const { numTests = 100 } = options;

  for (let i = 0; i < numTests; i++) {
    const size = Math.floor(i / 10) + 1;
    const value = generator(size);

    try {
      if (!property(value)) {
        // Found counterexample, shrink it
        const shrunk = shrinkToMinimal(value, property, generator.shrink || (() => []));
        return {
          passed: false,
          numTests: i + 1,
          counterexample: value,
          shrunkExample: shrunk
        };
      }
    } catch (error) {
      const shrunk = shrinkToMinimal(value, property, generator.shrink || (() => []));
      return {
        passed: false,
        numTests: i + 1,
        counterexample: value,
        shrunkExample: shrunk,
        error
      };
    }
  }

  return {
    passed: true,
    numTests,
    counterexample: null,
    shrunkExample: null
  };
}

function shrinkToMinimal(value, property, shrinkFn, maxShrinks = 100) {
  let minimal = value;
  let shrinks = 0;

  const candidates = shrinkFn(value);

  while (candidates.length > 0 && shrinks < maxShrinks) {
    const candidate = candidates.shift();
    shrinks++;

    try {
      if (!property(candidate)) {
        minimal = candidate;
        candidates.unshift(...shrinkFn(candidate));
      }
    } catch {
      minimal = candidate;
      candidates.unshift(...shrinkFn(candidate));
    }
  }

  return minimal;
}

// Property helpers
function property(description, generator, predicate) {
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

// Test the framework
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
);`,
  testCases: [
    {
      input: { generator: 'integer', min: 0, max: 100, property: 'x >= 0' },
      expectedOutput: { passed: true, numTests: 100 },
      description: 'forAll with integer generator verifies property holds for all generated values',
    },
    {
      input: { generator: 'array', elementGen: 'integer', property: 'reverseTwice', numTests: 50 },
      expectedOutput: { passed: true, numTests: 50 },
      description: 'Array reverse twice property passes for all random arrays',
    },
    {
      input: { shrink: 'integer', value: 100 },
      expectedOutput: { shrunkValues: [0, 50, 25, 99] },
      description: 'shrinkInteger produces progressively smaller values toward 0',
    },
    {
      input: { shrink: 'array', value: [1, 2, 3], elementShrink: 'integer' },
      expectedOutput: { containsEmpty: true, containsShorter: true },
      description: 'shrinkArray produces smaller arrays and arrays with shrunk elements',
    },
    {
      input: { generator: 'integer', min: -10, max: 10, property: 'x > 0', expectFailure: true },
      expectedOutput: { passed: false, shrunkExample: 0 },
      description: 'forAll finds counterexample and shrinks to minimal failing case',
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
