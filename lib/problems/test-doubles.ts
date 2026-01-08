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
    stub[method] = () => response;
  }
  return stub;
}

// 2. MOCK: Returns responses AND tracks/verifies calls
function createMock(methods) {
  const mock = {
    _calls: {},
    _returnValues: {},
    _implementations: {},

    verify: function(methodName, expectedArgs) {
      const calls = this._calls[methodName] || [];
      return calls.some(callArgs =>
        JSON.stringify(callArgs) === JSON.stringify(expectedArgs)
      );
    },

    expect: function(methodName) {
      const self = this;
      return {
        withArgs: function(...args) {
          self._expectedArgs = self._expectedArgs || {};
          self._expectedArgs[methodName] = args;
          return this;
        },
        toReturn: function(value) {
          self._returnValues[methodName] = value;
          return this;
        },
        times: function(count) {
          self._expectedTimes = self._expectedTimes || {};
          self._expectedTimes[methodName] = count;
          return this;
        }
      };
    },

    getCallCount: function(methodName) {
      return (this._calls[methodName] || []).length;
    },

    getCalls: function(methodName) {
      return this._calls[methodName] || [];
    }
  };

  // Create methods for each specified method name
  for (const method of methods) {
    mock._calls[method] = [];
    mock[method] = function(...args) {
      mock._calls[method].push(args);
      if (mock._implementations[method]) {
        return mock._implementations[method](...args);
      }
      return mock._returnValues[method];
    };
  }

  return mock;
}

// 3. FAKE: Working implementation with shortcuts
function createFakeDatabase() {
  const storage = new Map();

  return {
    save: function(record) {
      storage.set(record.id, { ...record });
      return record;
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
    return this._calls[methodName] || [];
  };

  spy.getCallCount = function(methodName) {
    return (this._calls[methodName] || []).length;
  };

  return spy;
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
  testCases: [
    {
      input: { fn: 'createStub', args: [{ getUser: { id: 1, name: 'Test' } }] },
      expectedOutput: { id: 1, name: 'Test' },
      description: 'createStub returns predefined response for method'
    },
    {
      input: { fn: 'createMock', args: [['getUser']] },
      expectedOutput: true,
      description: 'createMock tracks and verifies method calls'
    },
    {
      input: { fn: 'createFakeDatabase', args: [] },
      expectedOutput: { id: 1, name: 'Test User' },
      description: 'createFakeDatabase provides working in-memory storage'
    }
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
