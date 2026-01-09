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
  id: 'static-blocks',
  title: 'Static Initialization Blocks in Classes',
  difficulty: 'medium',
  category: 'ES6+ Features',
  description: `<h2>In-Depth Explanation</h2>

<p>Static initialization blocks (<code>static { }</code>) allow you to run initialization code when a class is first loaded. This provides a way to perform complex static property initialization that can't be done with simple field initializers.</p>

<h3>Syntax</h3>
<pre><code>class MyClass {
  static property;

  static {
    // Initialization code runs once when class is defined
    this.property = computeValue();
  }
}</code></pre>

<h3>Key Features</h3>
<ul>
  <li>Runs exactly once when the class is defined (not when instances are created)</li>
  <li><code>this</code> refers to the class constructor (not an instance)</li>
  <li>Can access private static fields</li>
  <li>Can have multiple static blocks (they run in order)</li>
  <li>Can contain try/catch for error handling during initialization</li>
</ul>

<h3>Execution Order</h3>
<ol>
  <li>Static field initializers (in declaration order)</li>
  <li>Static blocks (in declaration order)</li>
  <li>Interleaved: fields and blocks run in the order they appear</li>
</ol>

<h2>Importance</h2>

<ul>
  <li><strong>Complex Initialization</strong>: Multi-step setup that can't be a single expression</li>
  <li><strong>Private Static Access</strong>: Initialize private static fields with complex logic</li>
  <li><strong>Error Handling</strong>: Wrap initialization in try/catch</li>
  <li><strong>External Dependencies</strong>: Set up static properties from external data</li>
  <li><strong>Friend Access</strong>: Share private access with external functions</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<ul>
  <li><strong>Configuration Loading</strong>: Load and parse configuration when class loads</li>
  <li><strong>Registry Setup</strong>: Register the class in a global registry</li>
  <li><strong>Computed Constants</strong>: Calculate constants that need logic</li>
  <li><strong>Database Connection</strong>: Set up static connection pools</li>
  <li><strong>Validation Setup</strong>: Initialize validation rules</li>
  <li><strong>Singleton Pattern</strong>: Complex singleton initialization</li>
</ul>

<p><strong>Challenge:</strong> Use static initialization blocks for complex class setup scenarios.</p>`,
  examples: [
    {
      input: `class Config {
  static settings;
  static {
    this.settings = { debug: true, version: '1.0' };
    console.log('Config initialized');
  }
}
Config.settings`,
      output: `{ debug: true, version: '1.0' }`,
      explanation: 'Static block initializes settings object when class loads',
    },
    {
      input: `class MathUtils {
  static PI;
  static E;
  static {
    this.PI = Math.PI;
    this.E = Math.E;
  }
}
[MathUtils.PI.toFixed(2), MathUtils.E.toFixed(2)]`,
      output: `['3.14', '2.72']`,
      explanation: 'Static blocks can compute and assign multiple values',
    },
    {
      input: `class Counter {
  static #count = 0;
  static {
    this.#count = 100; // Can access private static
  }
  static getCount() { return this.#count; }
}
Counter.getCount()`,
      output: `100`,
      explanation: 'Static blocks can access and modify private static fields',
    },
  ],
  starterCode: `// Task 1: Create a Logger class with static initialization
// - static #logLevel (private): 'info' | 'warn' | 'error'
// - static #initialized (private): boolean
// - Static block should set logLevel based on environment
//   (use 'development' to set 'info', otherwise 'error')
// - Provide static methods: setLevel(level), getLevel(), isInitialized()

class Logger {
  // TODO: Add static private fields

  // TODO: Add static initialization block
  // Set #logLevel based on environment (assume 'development')
  // Set #initialized to true

  static setLevel(level) {
    // TODO: Set log level
  }

  static getLevel() {
    // TODO: Return current log level
  }

  static isInitialized() {
    // TODO: Return initialization status
  }
}

// Task 2: Create a ColorPalette class
// - static colors: object mapping color names to hex values
// - Static block should initialize colors with:
//   { red: '#FF0000', green: '#00FF00', blue: '#0000FF' }
// - Add computed property 'primary' that equals colors.blue
// - static getColor(name): returns hex value or '#000000' if not found

class ColorPalette {
  // TODO: Add static fields

  // TODO: Add static initialization block

  static getColor(name) {
    // TODO: Return color hex or default black
  }
}

// Task 3: Create a Validator class with validation rules
// - static #rules (private): Map of field names to validation functions
// - Static block should populate rules:
//   'email': value => value.includes('@')
//   'phone': value => /^\\d{10}$/.test(value)
//   'age': value => value >= 0 && value <= 150
// - static validate(field, value): returns boolean
// - static addRule(field, fn): adds new rule

class Validator {
  // TODO: Add private static Map for rules

  // TODO: Add static initialization block with default rules

  static validate(field, value) {
    // TODO: Run validation rule if exists, return true if no rule
  }

  static addRule(field, validationFn) {
    // TODO: Add new validation rule
  }

  static hasRule(field) {
    // TODO: Check if rule exists
  }
}

// Test
console.log(Logger.isInitialized());  // true
console.log(Logger.getLevel());  // 'info'

console.log(ColorPalette.getColor('red'));  // '#FF0000'
console.log(ColorPalette.primary);  // '#0000FF'

console.log(Validator.validate('email', 'test@example.com'));  // true
console.log(Validator.validate('phone', '1234567890'));  // true
console.log(Validator.validate('age', 25));  // true`,
  solution: `// Task 1: Logger class with static initialization
class Logger {
  static #logLevel = 'error';
  static #initialized = false;

  static {
    // Set logLevel based on environment (assume 'development')
    const env = 'development';
    this.#logLevel = env === 'development' ? 'info' : 'error';
    this.#initialized = true;
  }

  static setLevel(level) {
    this.#logLevel = level;
  }

  static getLevel() {
    return this.#logLevel;
  }

  static isInitialized() {
    return this.#initialized;
  }
}

// Task 2: ColorPalette class
class ColorPalette {
  static colors;
  static primary;

  static {
    this.colors = {
      red: '#FF0000',
      green: '#00FF00',
      blue: '#0000FF'
    };
    this.primary = this.colors.blue;
  }

  static getColor(name) {
    return this.colors[name] || '#000000';
  }
}

// Task 3: Validator class with validation rules
class Validator {
  static #rules = new Map();

  static {
    this.#rules.set('email', value => value.includes('@'));
    this.#rules.set('phone', value => /^\\d{10}$/.test(value));
    this.#rules.set('age', value => value >= 0 && value <= 150);
  }

  static validate(field, value) {
    const rule = this.#rules.get(field);
    return rule ? rule(value) : true;
  }

  static addRule(field, validationFn) {
    this.#rules.set(field, validationFn);
  }

  static hasRule(field) {
    return this.#rules.has(field);
  }
}

// Helper functions for testing
function getLoggerInitialized() {
  return Logger.isInitialized();
}

function getLoggerLevel() {
  return Logger.getLevel();
}

function getColorFromPalette(name) {
  return ColorPalette.getColor(name);
}

function getPrimaryColor() {
  return ColorPalette.primary;
}

function validateField(field, value) {
  return Validator.validate(field, value);
}

// Test
console.log(Logger.isInitialized());  // true
console.log(Logger.getLevel());  // 'info'

console.log(ColorPalette.getColor('red'));  // '#FF0000'
console.log(ColorPalette.primary);  // '#0000FF'

console.log(Validator.validate('email', 'test@example.com'));  // true
console.log(Validator.validate('phone', '1234567890'));  // true
console.log(Validator.validate('age', 25));  // true`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'getLoggerInitialized returns true after static block runs',
    },
    {
      input: [],
      expectedOutput: 'info',
      description: 'getLoggerLevel returns info in development mode',
    },
    {
      input: ['red'],
      expectedOutput: '#FF0000',
      description: 'getColorFromPalette returns correct hex for red',
    },
    {
      input: [],
      expectedOutput: '#0000FF',
      description: 'getPrimaryColor returns blue as primary color',
    },
    {
      input: ['email', 'test@example.com'],
      expectedOutput: true,
      description: 'validateField validates email with @ symbol',
    },
    {
      input: ['phone', '1234567890'],
      expectedOutput: true,
      description: 'validateField validates 10-digit phone number',
    },
    {
      input: ['age', 25],
      expectedOutput: true,
      description: 'validateField validates age within range',
    },
  ],
  hints: [
    'Static blocks use the syntax: static { /* code */ }',
    'Inside static blocks, "this" refers to the class itself, not an instance',
    'Static blocks run in the order they appear, interleaved with static field initializers',
    'You can have multiple static blocks in a single class',
    'Static blocks can access private static fields using this.#fieldName',
  ],
};
