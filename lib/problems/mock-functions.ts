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
  id: 'mock-functions',
  title: 'Creating Mock Functions and Spies',
  difficulty: 'easy',
  category: 'Testing Patterns',
  description: `<h2>In-Depth Explanation</h2>

<p>Mock functions (also called "spies") are test doubles that replace real functions during testing. They allow you to track how a function was called, what arguments it received, and control what it returns - all without executing the real implementation.</p>

<p>Key capabilities of mock functions:</p>
<ol>
  <li><strong>Track calls</strong>: Record how many times a function was called</li>
  <li><strong>Capture arguments</strong>: Store the arguments passed to each call</li>
  <li><strong>Control return values</strong>: Specify what the mock should return</li>
  <li><strong>Track return values</strong>: Record what was returned from each call</li>
  <li><strong>Verify behavior</strong>: Assert that functions were called correctly</li>
</ol>

<h2>Importance</h2>

<p>Mock functions are essential in testing because:</p>

<ul>
  <li><strong>Isolation</strong>: Test units in isolation without dependencies</li>
  <li><strong>Speed</strong>: Avoid slow operations like network calls or database queries</li>
  <li><strong>Determinism</strong>: Control external behavior for predictable tests</li>
  <li><strong>Verification</strong>: Confirm that code interacts correctly with dependencies</li>
  <li><strong>Edge Cases</strong>: Simulate error conditions and edge cases easily</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Mock functions are used extensively in:</p>

<ul>
  <li><strong>Unit Testing</strong>: Isolate the unit under test from its dependencies</li>
  <li><strong>API Testing</strong>: Mock HTTP clients to avoid actual network requests</li>
  <li><strong>Database Testing</strong>: Mock database connections for faster tests</li>
  <li><strong>Event Handlers</strong>: Verify that callbacks are invoked correctly</li>
  <li><strong>Time-sensitive Code</strong>: Mock timers for testing delayed operations</li>
  <li><strong>Third-party Services</strong>: Replace external services with controlled responses</li>
</ul>

<p><strong>Challenge:</strong> Implement a mock function factory that tracks calls, arguments, and allows setting return values.</p>`,
  examples: [
    {
      input: `const mockFn = createMock();
mockFn('hello', 'world');
console.log(mockFn.calls);`,
      output: `[['hello', 'world']]`,
      explanation: 'The mock tracks all arguments from each call',
    },
    {
      input: `const mockFn = createMock();
mockFn.mockReturnValue(42);
console.log(mockFn());`,
      output: `42`,
      explanation: 'Mock returns the configured value',
    },
    {
      input: `const mockFn = createMock();
mockFn(1); mockFn(2); mockFn(3);
console.log(mockFn.callCount);`,
      output: `3`,
      explanation: 'Mock tracks the number of times it was called',
    },
  ],
  starterCode: `// TODO: Create a mock function factory
// The mock should track: calls, arguments, return values
// And allow setting return values

function createMock() {
  // Create the mock function
  // Add properties: calls (array), callCount, returnValues
  // Add methods: mockReturnValue, mockImplementation

  function mockFn(...args) {
    // Track the call and arguments
    // Return the configured value
  }

  // Initialize tracking properties
  mockFn.calls = [];
  mockFn.callCount = 0;
  mockFn.returnValues = [];

  // Add method to set return value
  mockFn.mockReturnValue = function(value) {
    // Set what the mock should return
  };

  // Add method to set implementation
  mockFn.mockImplementation = function(fn) {
    // Replace the mock's behavior with fn
  };

  // Add method to reset the mock
  mockFn.mockReset = function() {
    // Clear all tracking data
  };

  return mockFn;
}

// Test your implementation
const mock = createMock();
mock('test', 123);
mock('another');
console.log('Calls:', mock.calls);
console.log('Call count:', mock.callCount);

mock.mockReturnValue('mocked!');
console.log('Return value:', mock());

mock.mockImplementation((x) => x * 2);
console.log('Implementation:', mock(5));`,
  solution: `// Create a mock function factory
function createMock() {
  let returnValue = undefined;
  let implementation = null;

  function mockFn(...args) {
    mockFn.calls.push(args);
    mockFn.callCount++;

    let result;
    if (implementation) {
      result = implementation(...args);
    } else {
      result = returnValue;
    }

    mockFn.returnValues.push(result);
    return result;
  }

  // Initialize tracking properties
  mockFn.calls = [];
  mockFn.callCount = 0;
  mockFn.returnValues = [];

  // Add method to set return value
  mockFn.mockReturnValue = function(value) {
    returnValue = value;
    implementation = null;
    return mockFn;
  };

  // Add method to set implementation
  mockFn.mockImplementation = function(fn) {
    implementation = fn;
    return mockFn;
  };

  // Add method to reset the mock
  mockFn.mockReset = function() {
    mockFn.calls = [];
    mockFn.callCount = 0;
    mockFn.returnValues = [];
    returnValue = undefined;
    implementation = null;
    return mockFn;
  };

  // Add method to check if called with specific args
  mockFn.wasCalledWith = function(...expectedArgs) {
    return mockFn.calls.some(call =>
      call.length === expectedArgs.length &&
      call.every((arg, i) => arg === expectedArgs[i])
    );
  };

  return mockFn;
}

// Test your implementation
const mock = createMock();
mock('test', 123);
mock('another');
console.log('Calls:', mock.calls);
console.log('Call count:', mock.callCount);

mock.mockReturnValue('mocked!');
console.log('Return value:', mock());

mock.mockImplementation((x) => x * 2);
console.log('Implementation:', mock(5));

// Simple mock tracker that simulates mock behavior
function createMockTracker() {
  const calls = [];
  return {
    fn: (...args) => { calls.push(args); return 'mocked'; },
    getCalls: () => calls,
    getCallCount: () => calls.length,
    wasCalledWith: (expected) => calls.some(c => JSON.stringify(c) === JSON.stringify(expected))
  };
}

// Test the mock tracker - returns call count after invoking with given args
function testMockTracker(callArgs) {
  const mock = createMockTracker();
  callArgs.forEach(args => mock.fn(...args));
  return mock.getCallCount();
}

// Test mock return value behavior
function testMockReturnValue(returnVal, numCalls) {
  const results = [];
  let configuredReturn = returnVal;
  const mockFn = () => { results.push(configuredReturn); return configuredReturn; };
  for (let i = 0; i < numCalls; i++) {
    mockFn();
  }
  return results;
}

// Test wasCalledWith functionality
function testWasCalledWith(callArgs, checkArgs) {
  const mock = createMockTracker();
  callArgs.forEach(args => mock.fn(...args));
  return mock.wasCalledWith(checkArgs);
}`,
  testCases: [
    {
      input: [[[1], [2], [3]]],
      expectedOutput: 3,
      description: 'testMockTracker returns correct call count',
    },
    {
      input: [[['a', 'b'], ['c']]],
      expectedOutput: 2,
      description: 'testMockTracker tracks multiple calls with different arguments',
    },
    {
      input: ['mocked', 3],
      expectedOutput: ['mocked', 'mocked', 'mocked'],
      description: 'testMockReturnValue returns configured value for each call',
    },
    {
      input: [[['hello', 'world'], ['foo', 'bar']], ['hello', 'world']],
      expectedOutput: true,
      description: 'testWasCalledWith returns true when args match',
    },
    {
      input: [[['hello', 'world'], ['foo', 'bar']], ['baz', 'qux']],
      expectedOutput: false,
      description: 'testWasCalledWith returns false when args do not match',
    },
  ],
  hints: [
    'Use closure to store the return value and implementation function',
    'The calls array should store arrays of arguments: [[arg1, arg2], [arg1]]',
    'mockReturnValue should set implementation to null to use the return value',
    'mockImplementation should call the provided function with the arguments',
    'Consider adding a wasCalledWith method for easier assertions',
    'Make methods chainable by returning mockFn from each method',
  ],
};
