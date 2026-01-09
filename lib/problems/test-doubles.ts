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
  solution: `// Implement different types of test doubles

// 1. STUB: Returns predefined responses
function createStub(responses) {
  // Create an object where each method returns the predefined response
  // Example: createStub({ getUser: { id: 1 } }) creates stub.getUser() => { id: 1 }
  const stub = {};
  for (const [method, response] of Object.entries(responses)) {
    stub[method] = () => response;
  }
  return stub;
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
      const calls = this._calls[methodName] || [];
      return calls.some(call => JSON.stringify(call) === JSON.stringify(expectedArgs));
    },

    // Set up expected call (for strict mocking)
    expect: function(methodName) {
      // Return object with methods: withArgs, toReturn, times
      return {
        withArgs: function(...args) {
          mock._calls[methodName] = mock._calls[methodName] || [];
          mock._calls[methodName].push(args);
          return this;
        },
        toReturn: function(value) {
          return this;
        },
        times: function(n) {
          return this;
        }
      };
    }
  };

  // Create methods that track calls
  for (const method of methods) {
    mock[method] = function(...args) {
      mock._calls[method] = mock._calls[method] || [];
      mock._calls[method].push(args);
      return undefined;
    };
  }

  return mock;
}

// 3. FAKE: Working implementation with shortcuts
function createFakeDatabase() {
  // In-memory database implementation
  // Should support: save, getUser, getAllUsers, deleteUser
  const storage = new Map();

  return {
    // Implement methods using a Map or object for storage
    save: function(user) {
      storage.set(user.id, user);
      return user;
    },
    getUser: function(id) {
      return storage.get(id);
    },
    getAllUsers: function() {
      return Array.from(storage.values());
    },
    deleteUser: function(id) {
      return storage.delete(id);
    }
  };
}

// 4. SPY: Wraps real object and records calls
function createSpy(realObject) {
  // Wrap each method of realObject
  // Track calls while still calling the real implementation
  const spy = { _calls: {} };
  
  for (const [key, value] of Object.entries(realObject)) {
    if (typeof value === 'function') {
      spy._calls[key] = [];
      spy[key] = function(...args) {
        spy._calls[key].push(args);
        return value.apply(realObject, args);
      };
    } else {
      spy[key] = value;
    }
  }
  
  return spy;
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
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
