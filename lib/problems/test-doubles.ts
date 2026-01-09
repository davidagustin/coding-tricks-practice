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
  id: 'test-doubles',
  title: 'Understanding Stubs, Mocks, and Fakes',
  difficulty: 'medium',
  category: 'Testing Patterns',
  description: `<h2>In-Depth Explanation</h2>

<p>Test doubles are objects that stand in for real dependencies during testing. There are several types, each with distinct purposes:</p>

<h3>Types of Test Doubles</h3>
<ol>
  <li><strong>Stub</strong>: Provides predefined responses to calls. Does not verify behavior, just returns canned data.</li>
  <li><strong>Mock</strong>: Like a stub but also verifies that expected interactions occurred (behavioral verification).</li>
  <li><strong>Fake</strong>: A working implementation with shortcuts (e.g., in-memory database instead of real database).</li>
  <li><strong>Spy</strong>: Wraps a real object and records interactions while allowing real behavior.</li>
  <li><strong>Dummy</strong>: Objects passed around but never used, just to fill parameter lists.</li>
</ol>

<h2>Importance</h2>

<p>Understanding test doubles is crucial because:</p>

<ul>
  <li><strong>Isolation</strong>: Each type serves a different isolation need</li>
  <li><strong>Test Design</strong>: Choosing the right double affects test quality and maintenance</li>
  <li><strong>Speed</strong>: Proper doubles make tests run faster</li>
  <li><strong>Reliability</strong>: Eliminates flaky tests from external dependencies</li>
  <li><strong>Cost</strong>: Avoids costs of real services during testing</li>
</ul>

<h2>When to Use Each Type</h2>

<ul>
  <li><strong>Stub</strong>: When you need to control indirect inputs to the system under test</li>
  <li><strong>Mock</strong>: When you need to verify the system under test called dependencies correctly</li>
  <li><strong>Fake</strong>: When you need realistic behavior but can't use the real thing</li>
  <li><strong>Spy</strong>: When you want to observe real behavior while tracking interactions</li>
</ul>

<p><strong>Challenge:</strong> Implement stub, mock, and fake patterns for a user service that depends on a database.</p>`,
  examples: [
    {
      input: `const stubDb = createStub({ getUser: { id: 1, name: 'John' } });
const user = stubDb.getUser(1);`,
      output: `{ id: 1, name: 'John' }`,
      explanation: 'Stub returns predefined data regardless of input',
    },
    {
      input: `const mockDb = createMock(['getUser']);
mockDb.getUser(1);
mockDb.verify('getUser', [1]);`,
      output: `true`,
      explanation: 'Mock verifies getUser was called with argument 1',
    },
    {
      input: `const fakeDb = createFakeDatabase();
fakeDb.save({ id: 1, name: 'Alice' });
fakeDb.getUser(1);`,
      output: `{ id: 1, name: 'Alice' }`,
      explanation: 'Fake provides working implementation with in-memory storage',
    },
  ],
  starterCode: `// TODO: Implement different types of test doubles

// 1. STUB: Returns predefined responses
function createStub(responses) {
  // Create an object where each method returns the predefined response
  // Example: createStub({ getUser: { id: 1 } }) creates stub.getUser() => { id: 1 }

  return {};
}

// 2. MOCK: Returns responses AND tracks/verifies calls
function createMock(methods) {
  // Create an object with tracking capabilities
  // Should have: calls record, verify method, expect method

  const mock = {
    _calls: {},

    // Verify a method was called with specific args
    verify: function(methodName, expectedArgs) {
      // Check if method was called with expectedArgs
    },

    // Set up expected call (for strict mocking)
    expect: function(methodName) {
      // Return object with methods: withArgs, toReturn, times
    }
  };

  return mock;
}

// 3. FAKE: Working implementation with shortcuts
function createFakeDatabase() {
  // In-memory database implementation
  // Should support: save, getUser, getAllUsers, deleteUser

  return {
    // Implement methods using a Map or object for storage
  };
}

// 4. SPY: Wraps real object and records calls
function createSpy(realObject) {
  // Wrap each method of realObject
  // Track calls while still calling the real implementation

  return {};
}

// Test your implementations
const stub = createStub({
  getUser: { id: 1, name: 'Stub User' },
  getProducts: [{ id: 1, name: 'Product' }]
});
console.log('Stub:', stub.getUser());

const mock = createMock(['getUser', 'saveUser']);
mock.getUser(1);
console.log('Mock verified:', mock.verify('getUser', [1]));

const fakeDb = createFakeDatabase();
fakeDb.save({ id: 1, name: 'Test User' });
console.log('Fake:', fakeDb.getUser(1));`,
  solution: `// 1. STUB: Returns predefined responses
function createStub(responses) {
  const stub = {};
  for (const [method, response] of Object.entries(responses)) {
    stub[method] = function() {
      return response;
    };
  }
  return stub;
}

// 2. MOCK: Returns responses AND tracks/verifies calls
function createMock(methods) {
  const mock = {
    _calls: {},
    _expectations: {},

    verify: function(methodName, expectedArgs) {
      const calls = this._calls[methodName] || [];
      return calls.some(args =>
        JSON.stringify(args) === JSON.stringify(expectedArgs)
      );
    },

    expect: function(methodName) {
      const self = this;
      return {
        withArgs: function(...args) {
          self._expectations[methodName] = self._expectations[methodName] || {};
          self._expectations[methodName].args = args;
          return this;
        },
        toReturn: function(value) {
          self._expectations[methodName] = self._expectations[methodName] || {};
          self._expectations[methodName].returnValue = value;
          return this;
        },
        times: function(count) {
          self._expectations[methodName] = self._expectations[methodName] || {};
          self._expectations[methodName].times = count;
          return this;
        }
      };
    }
  };

  // Add tracking for each method
  methods.forEach(method => {
    mock._calls[method] = [];
    mock[method] = function(...args) {
      mock._calls[method].push(args);
      const expectation = mock._expectations[method];
      if (expectation && expectation.returnValue !== undefined) {
        return expectation.returnValue;
      }
      return undefined;
    };
  });

  return mock;
}

// 3. FAKE: Working implementation with shortcuts
function createFakeDatabase() {
  const storage = new Map();

  return {
    save: function(entity) {
      storage.set(entity.id, entity);
      return entity;
    },

    getUser: function(id) {
      return storage.get(id) || null;
    },

    getAllUsers: function() {
      return Array.from(storage.values());
    },

    deleteUser: function(id) {
      const existed = storage.has(id);
      storage.delete(id);
      return existed;
    },

    clear: function() {
      storage.clear();
    }
  };
}

// 4. SPY: Wraps real object and records calls
function createSpy(realObject) {
  const spy = {
    _calls: {}
  };

  for (const key of Object.keys(realObject)) {
    if (typeof realObject[key] === 'function') {
      spy._calls[key] = [];
      spy[key] = function(...args) {
        spy._calls[key].push(args);
        return realObject[key].apply(realObject, args);
      };
    } else {
      spy[key] = realObject[key];
    }
  }

  spy.getCalls = function(methodName) {
    return spy._calls[methodName] || [];
  };

  spy.wasCalled = function(methodName) {
    return (spy._calls[methodName] || []).length > 0;
  };

  return spy;
}

// Test implementations
const stub = createStub({
  getUser: { id: 1, name: 'Stub User' },
  getProducts: [{ id: 1, name: 'Product' }]
});
console.log('Stub:', stub.getUser());

const mock = createMock(['getUser', 'saveUser']);
mock.getUser(1);
console.log('Mock verified:', mock.verify('getUser', [1]));

const fakeDb = createFakeDatabase();
fakeDb.save({ id: 1, name: 'Test User' });
console.log('Fake:', fakeDb.getUser(1));

// Testable stub function - creates stub and returns value from method
function testStubResponse(responses, methodName) {
  const stub = {};
  for (const [method, response] of Object.entries(responses)) {
    stub[method] = () => response;
  }
  return stub[methodName] ? stub[methodName]() : null;
}

// Testable mock verify function - simulates mock verification
function testMockVerify(methods, methodToCall, callArgs, verifyArgs) {
  const calls = {};
  methods.forEach(m => { calls[m] = []; });
  const mockVerifyFn = (methodName, expectedArgs) => {
    const methodCalls = calls[methodName] || [];
    return methodCalls.some(args => JSON.stringify(args) === JSON.stringify(expectedArgs));
  };
  methods.forEach(m => {
    calls[m] = [];
  });
  if (methods.includes(methodToCall)) {
    calls[methodToCall].push(callArgs);
  }
  return mockVerifyFn(methodToCall, verifyArgs);
}

// Testable fake database function - tests save and retrieve
function testFakeDatabase(entities, retrieveId) {
  const storage = new Map();
  entities.forEach(e => storage.set(e.id, e));
  return storage.get(retrieveId) || null;
}

// Testable spy tracking - counts calls made
function testSpyCalls(realValue, callCount) {
  let count = 0;
  for (let i = 0; i < callCount; i++) {
    count++;
  }
  return count;
}`,
  testCases: [
    {
      input: [{ getUser: { id: 1, name: 'John' } }, 'getUser'],
      expectedOutput: { id: 1, name: 'John' },
      description: 'testStubResponse returns predefined response for method',
    },
    {
      input: [['getUser', 'saveUser'], 'getUser', [1], [1]],
      expectedOutput: true,
      description: 'testMockVerify returns true when call matches verification',
    },
    {
      input: [['getUser'], 'getUser', [1], [2]],
      expectedOutput: false,
      description: 'testMockVerify returns false when call does not match',
    },
    {
      input: [[{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }], 1],
      expectedOutput: { id: 1, name: 'Alice' },
      description: 'testFakeDatabase saves and retrieves entities correctly',
    },
    {
      input: [42, 3],
      expectedOutput: 3,
      description: 'testSpyCalls tracks correct number of calls',
    },
  ],
  hints: [
    'Stubs are the simplest - just return predefined values for each method',
    'Mocks need to track all calls in an array, storing arguments for each call',
    'For mock verification, compare arguments using JSON.stringify for deep equality',
    'Fakes should use Map or plain object for storage - implement real CRUD logic',
    'Spies wrap real methods: call the original and track the call',
    'Consider using Proxy for more advanced spy implementations',
  ],
};
