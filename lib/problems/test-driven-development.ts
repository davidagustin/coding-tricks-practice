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
  id: 'test-driven-development',
  title: 'TDD Approach with Red-Green-Refactor',
  difficulty: 'medium',
  category: 'Testing Patterns',
  description: `<h2>In-Depth Explanation</h2>

<p>Test-Driven Development (TDD) is a software development methodology where tests are written before the implementation code. It follows a strict cycle known as "Red-Green-Refactor":</p>

<h3>The TDD Cycle</h3>
<ol>
  <li><strong>Red</strong>: Write a failing test that defines expected behavior</li>
  <li><strong>Green</strong>: Write the minimum code needed to make the test pass</li>
  <li><strong>Refactor</strong>: Improve the code while keeping tests passing</li>
</ol>

<h3>TDD Principles</h3>
<ul>
  <li><strong>One Test at a Time</strong>: Focus on one behavior/feature per cycle</li>
  <li><strong>Minimum Code</strong>: Write only enough code to pass the current test</li>
  <li><strong>Refactor Continuously</strong>: Improve code quality after each green phase</li>
  <li><strong>Tests as Documentation</strong>: Tests describe the expected behavior</li>
</ul>

<h2>Importance</h2>

<p>TDD is valuable because:</p>

<ul>
  <li><strong>Design</strong>: Forces you to think about API design upfront</li>
  <li><strong>Confidence</strong>: High test coverage gives confidence to refactor</li>
  <li><strong>Documentation</strong>: Tests serve as living documentation</li>
  <li><strong>Focus</strong>: Keeps development focused on requirements</li>
  <li><strong>Debugging</strong>: Issues are caught immediately when tests fail</li>
  <li><strong>Quality</strong>: Results in more modular, testable code</li>
</ul>

<h2>TDD Best Practices</h2>

<ul>
  <li><strong>Start Simple</strong>: Begin with the simplest test case</li>
  <li><strong>DAMP Tests</strong>: Descriptive And Meaningful Phrases over DRY</li>
  <li><strong>Arrange-Act-Assert</strong>: Structure tests clearly</li>
  <li><strong>One Assertion Per Test</strong>: Keep tests focused</li>
  <li><strong>Test Behavior, Not Implementation</strong>: Focus on what, not how</li>
</ul>

<p><strong>Challenge:</strong> Implement a mini test framework that supports the TDD workflow with describe/it/expect patterns.</p>`,
  examples: [
    {
      input: `describe('Calculator', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
});`,
      output: `PASS: Calculator > adds two numbers`,
      explanation: 'Test passes when add(2,3) returns 5',
    },
    {
      input: `expect(5).toBe(5);
expect([1,2]).toEqual([1,2]);
expect(() => throw new Error()).toThrow();`,
      output: `All assertions pass`,
      explanation: 'Different matchers for different assertion types',
    },
    {
      input: `describe('String', () => {
  beforeEach(() => { str = 'hello'; });
  it('has length 5', () => {
    expect(str.length).toBe(5);
  });
});`,
      output: `PASS: String > has length 5`,
      explanation: 'beforeEach runs before each test',
    },
  ],
  starterCode: `// TODO: Implement a mini TDD test framework

// Test results storage
const testResults = {
  passed: 0,
  failed: 0,
  results: []
};

// TODO: Implement describe - groups related tests
function describe(description, fn) {
  // Store current describe context
  // Run the function which contains it() calls
  // Restore context after
}

// TODO: Implement it - defines a single test
function it(description, fn) {
  // Run the test function
  // Catch any errors (failed assertions)
  // Record pass/fail
}

// TODO: Implement expect - creates assertion object
function expect(actual) {
  // Return object with matchers:
  // toBe, toEqual, toBeTruthy, toBeFalsy, toThrow, toContain

  return {
    toBe: function(expected) {
      // Strict equality check
    },

    toEqual: function(expected) {
      // Deep equality check
    },

    toBeTruthy: function() {
      // Check if value is truthy
    },

    toBeFalsy: function() {
      // Check if value is falsy
    },

    toThrow: function(expectedMessage) {
      // Check if function throws
    },

    toContain: function(item) {
      // Check if array/string contains item
    },

    not: {
      // Negated versions of all matchers
    }
  };
}

// TODO: Implement beforeEach/afterEach hooks
let beforeEachFn = null;
let afterEachFn = null;

function beforeEach(fn) {
  beforeEachFn = fn;
}

function afterEach(fn) {
  afterEachFn = fn;
}

// Helper to run all tests and report results
function runTests() {
  console.log('\\n=== Test Results ===');
  testResults.results.forEach(r => {
    const status = r.passed ? 'PASS' : 'FAIL';
    console.log(\`\${status}: \${r.description}\`);
    if (!r.passed) console.log(\`  Error: \${r.error}\`);
  });
  console.log(\`\\nPassed: \${testResults.passed}, Failed: \${testResults.failed}\`);
}

// Example TDD workflow - implement a Stack class
describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it('should start empty', () => {
    expect(stack.isEmpty()).toBe(true);
  });

  it('should push and pop items', () => {
    stack.push(1);
    expect(stack.pop()).toBe(1);
  });

  it('should throw when popping empty stack', () => {
    expect(() => stack.pop()).toThrow();
  });
});

// The Stack class to implement (start with failing tests!)
class Stack {
  // Implement based on failing tests
}

runTests();`,
  solution: `// Test results storage
const testResults = {
  passed: 0,
  failed: 0,
  results: []
};

// Context tracking for nested describes
let currentDescribe = '';
let beforeEachFn = null;
let afterEachFn = null;

// Implement describe - groups related tests
function describe(description, fn) {
  const previousDescribe = currentDescribe;
  const previousBeforeEach = beforeEachFn;
  const previousAfterEach = afterEachFn;

  currentDescribe = previousDescribe
    ? previousDescribe + ' > ' + description
    : description;

  fn();

  // Restore context
  currentDescribe = previousDescribe;
  beforeEachFn = previousBeforeEach;
  afterEachFn = previousAfterEach;
}

// Implement it - defines a single test
function it(description, fn) {
  const fullDescription = currentDescribe
    ? currentDescribe + ' > ' + description
    : description;

  try {
    if (beforeEachFn) beforeEachFn();
    fn();
    if (afterEachFn) afterEachFn();

    testResults.passed++;
    testResults.results.push({
      description: fullDescription,
      passed: true
    });
  } catch (error) {
    testResults.failed++;
    testResults.results.push({
      description: fullDescription,
      passed: false,
      error: error.message
    });
  }
}

// Deep equality helper
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return a === b;
  if (typeof a !== 'object') return a === b;

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  return keysA.every(key => deepEqual(a[key], b[key]));
}

// Implement expect - creates assertion object
function expect(actual) {
  const matchers = {
    toBe: function(expected) {
      if (actual !== expected) {
        throw new Error(\`Expected \${actual} to be \${expected}\`);
      }
    },

    toEqual: function(expected) {
      if (!deepEqual(actual, expected)) {
        throw new Error(\`Expected \${JSON.stringify(actual)} to equal \${JSON.stringify(expected)}\`);
      }
    },

    toBeTruthy: function() {
      if (!actual) {
        throw new Error(\`Expected \${actual} to be truthy\`);
      }
    },

    toBeFalsy: function() {
      if (actual) {
        throw new Error(\`Expected \${actual} to be falsy\`);
      }
    },

    toThrow: function(expectedMessage) {
      if (typeof actual !== 'function') {
        throw new Error('Expected a function');
      }
      let threw = false;
      let errorMessage = '';
      try {
        actual();
      } catch (e) {
        threw = true;
        errorMessage = e.message;
      }
      if (!threw) {
        throw new Error('Expected function to throw');
      }
      if (expectedMessage && errorMessage !== expectedMessage) {
        throw new Error(\`Expected error message "\${expectedMessage}" but got "\${errorMessage}"\`);
      }
    },

    toContain: function(item) {
      if (typeof actual === 'string') {
        if (!actual.includes(item)) {
          throw new Error(\`Expected "\${actual}" to contain "\${item}"\`);
        }
      } else if (Array.isArray(actual)) {
        if (!actual.includes(item)) {
          throw new Error(\`Expected array to contain \${item}\`);
        }
      } else {
        throw new Error('toContain only works with strings and arrays');
      }
    },

    not: {
      toBe: function(expected) {
        if (actual === expected) {
          throw new Error(\`Expected \${actual} not to be \${expected}\`);
        }
      },
      toEqual: function(expected) {
        if (deepEqual(actual, expected)) {
          throw new Error(\`Expected values not to be equal\`);
        }
      },
      toBeTruthy: function() {
        if (actual) {
          throw new Error(\`Expected \${actual} not to be truthy\`);
        }
      },
      toBeFalsy: function() {
        if (!actual) {
          throw new Error(\`Expected \${actual} not to be falsy\`);
        }
      },
      toContain: function(item) {
        if (typeof actual === 'string' && actual.includes(item)) {
          throw new Error(\`Expected "\${actual}" not to contain "\${item}"\`);
        }
        if (Array.isArray(actual) && actual.includes(item)) {
          throw new Error(\`Expected array not to contain \${item}\`);
        }
      }
    }
  };

  return matchers;
}

function beforeEach(fn) {
  beforeEachFn = fn;
}

function afterEach(fn) {
  afterEachFn = fn;
}

function runTests() {
  console.log('\\n=== Test Results ===');
  testResults.results.forEach(r => {
    const status = r.passed ? 'PASS' : 'FAIL';
    console.log(\`\${status}: \${r.description}\`);
    if (!r.passed) console.log(\`  Error: \${r.error}\`);
  });
  console.log(\`\\nPassed: \${testResults.passed}, Failed: \${testResults.failed}\`);
}

// Stack class implementation
class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Cannot pop from empty stack');
    }
    return this.items.pop();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Cannot peek empty stack');
    }
    return this.items[this.items.length - 1];
  }

  size() {
    return this.items.length;
  }
}

// Run the tests
describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it('should start empty', () => {
    expect(stack.isEmpty()).toBe(true);
  });

  it('should push and pop items', () => {
    stack.push(1);
    expect(stack.pop()).toBe(1);
  });

  it('should throw when popping empty stack', () => {
    expect(() => stack.pop()).toThrow();
  });
});

runTests();

// Testable strict equality check - returns true if values match
function checkStrictEqual(actual, expected) {
  return actual === expected;
}

// Testable deep equality check
function checkDeepEqual(actual, expected) {
  return JSON.stringify(actual) === JSON.stringify(expected);
}

// Testable truthy assertion
function checkTruthy(value) {
  return !!value;
}

// Testable test result tracker
function trackTestResults(testOutcomes) {
  const results = {
    passed: 0,
    failed: 0,
    results: []
  };
  testOutcomes.forEach((passed, index) => {
    if (passed) {
      results.passed++;
    } else {
      results.failed++;
    }
    results.results.push({
      description: 'Test ' + (index + 1),
      passed: passed
    });
  });
  return { passed: results.passed, failed: results.failed };
}`,
  testCases: [
    {
      input: [5, 5],
      expectedOutput: true,
      description: 'checkStrictEqual returns true for equal values',
    },
    {
      input: [5, 6],
      expectedOutput: false,
      description: 'checkStrictEqual returns false for different values',
    },
    {
      input: [[1, 2, 3], [1, 2, 3]],
      expectedOutput: true,
      description: 'checkDeepEqual returns true for deeply equal arrays',
    },
    {
      input: [1],
      expectedOutput: true,
      description: 'checkTruthy returns true for truthy value',
    },
    {
      input: [[true, true, false, true]],
      expectedOutput: { passed: 3, failed: 1 },
      description: 'trackTestResults counts passed and failed correctly',
    },
  ],
  hints: [
    'Use a currentDescribe variable to track nested describe() contexts',
    'it() should catch any errors thrown by assertions and mark as failed',
    'For deep equality, recursively compare objects and arrays',
    'Implement negation by creating a wrapper that inverts the assertion logic',
    'beforeEach should run before each it() in the same describe block',
    'Consider using a stack for nested describe contexts if supporting deep nesting',
  ],
};
