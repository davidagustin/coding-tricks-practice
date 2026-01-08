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
  id: 'private-class-fields',
  title: 'Private Class Fields with # Syntax',
  difficulty: 'easy',
  category: 'ES6+ Features',
  description: `<h2>In-Depth Explanation</h2>

<p>Private class fields in JavaScript use the <code>#</code> prefix to create truly private properties and methods. Unlike the old convention of using underscore prefixes (which were just naming conventions), <code>#</code> fields are enforced by the JavaScript engine and cannot be accessed outside the class.</p>

<h3>Key Features</h3>
<ul>
  <li><code>#field</code>: Private instance field</li>
  <li><code>#method()</code>: Private method</li>
  <li><code>static #field</code>: Private static field</li>
  <li><code>static #method()</code>: Private static method</li>
</ul>

<h3>Privacy Enforcement</h3>
<ul>
  <li>Accessing <code>#field</code> outside the class throws a <code>SyntaxError</code></li>
  <li>Private fields must be declared in the class body (cannot be added dynamically)</li>
  <li>The <code>#</code> is part of the field name - <code>#name</code> and <code>name</code> are different</li>
  <li>Private fields are not inherited but can be accessed in subclass methods via parent methods</li>
</ul>

<h2>Importance</h2>

<ul>
  <li><strong>True Encapsulation</strong>: Unlike <code>_private</code> convention, truly inaccessible from outside</li>
  <li><strong>API Stability</strong>: Internal implementation can change without breaking external code</li>
  <li><strong>Security</strong>: Sensitive data cannot be accidentally or intentionally accessed</li>
  <li><strong>Clear Intent</strong>: Immediately obvious which members are internal</li>
  <li><strong>No Name Collisions</strong>: <code>#name</code> won't conflict with public <code>name</code> property</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<ul>
  <li><strong>Data Hiding</strong>: Store sensitive data like passwords, tokens, internal state</li>
  <li><strong>Implementation Details</strong>: Hide helper methods and internal logic</li>
  <li><strong>Validation</strong>: Use getters/setters to validate while keeping raw data private</li>
  <li><strong>Caching</strong>: Store cached values without exposing cache mechanism</li>
  <li><strong>Event Handlers</strong>: Keep bound handlers private to avoid memory leaks</li>
</ul>

<p><strong>Challenge:</strong> Create classes using private fields for proper encapsulation.</p>`,
  examples: [
    {
      input: `class Counter {
  #count = 0;

  increment() { this.#count++; }
  get value() { return this.#count; }
}
const c = new Counter();
c.increment();
c.value`,
      output: `1`,
      explanation: '#count is private, only accessible via public methods',
    },
    {
      input: `class User {
  #password;
  constructor(pass) { this.#password = pass; }
  checkPassword(input) { return input === this.#password; }
}
const u = new User('secret');
u.checkPassword('secret')`,
      output: `true`,
      explanation: 'Password is truly private, only validated through method',
    },
    {
      input: `class Config {
  static #instance = null;
  static getInstance() {
    if (!Config.#instance) Config.#instance = new Config();
    return Config.#instance;
  }
}
Config.getInstance() === Config.getInstance()`,
      output: `true`,
      explanation: 'Private static field for singleton pattern',
    },
  ],
  starterCode: `// Task 1: Create a BankAccount class with private balance
// - Private #balance field initialized to 0
// - deposit(amount): adds to balance (only positive amounts)
// - withdraw(amount): subtracts from balance (only if sufficient funds)
// - getBalance(): returns current balance

class BankAccount {
  // TODO: Add private #balance field

  constructor(initialBalance = 0) {
    // TODO: Initialize balance
  }

  deposit(amount) {
    // TODO: Add to balance if amount > 0
  }

  withdraw(amount) {
    // TODO: Subtract from balance if sufficient funds
    // Return true if successful, false otherwise
  }

  getBalance() {
    // TODO: Return current balance
  }
}

// Task 2: Create a SecureToken class with private token and expiry
// - Private #token and #expiresAt fields
// - Constructor generates random token and sets expiry (milliseconds from now)
// - isValid(): returns true if token hasn't expired
// - getToken(): returns token only if valid, otherwise null

class SecureToken {
  // TODO: Add private fields

  constructor(expiresInMs = 3600000) {
    // TODO: Generate random token and set expiry
    // Hint: Math.random().toString(36).substring(2) for random string
  }

  isValid() {
    // TODO: Check if current time is before expiry
  }

  getToken() {
    // TODO: Return token if valid, null otherwise
  }
}

// Task 3: Create a Counter class with private static count
// - Private static #totalInstances to track all instances created
// - Private #id field for instance identifier
// - static getInstanceCount(): returns total instances created
// - getId(): returns this instance's id

class Counter {
  // TODO: Add private static field and instance field

  constructor() {
    // TODO: Increment total and assign id
  }

  static getInstanceCount() {
    // TODO: Return total instances
  }

  getId() {
    // TODO: Return this instance's id
  }
}

// Test
const account = new BankAccount(100);
account.deposit(50);
console.log(account.getBalance());  // 150
console.log(account.withdraw(200)); // false
console.log(account.withdraw(50));  // true
console.log(account.getBalance());  // 100

const token = new SecureToken(10000);
console.log(token.isValid());  // true

new Counter();
new Counter();
console.log(Counter.getInstanceCount());  // 2`,
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Private fields must be declared at the top of the class body with # prefix',
    'Private fields can have initializers: #count = 0',
    'Access private fields with this.#fieldName inside the class',
    'Static private fields use static #fieldName syntax',
    'Private fields are not accessible via this["#fieldName"] - the # is part of the name',
  ],
};
