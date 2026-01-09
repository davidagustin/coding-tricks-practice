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
  id: 'singleton-pattern',
  title: 'Singleton Pattern',
  difficulty: 'easy',
  category: 'Design Patterns',
  description: `<h2>In-Depth Explanation</h2>

<p>The Singleton pattern ensures that a class has only one instance and provides a global point of access to it. This pattern is useful when exactly one object is needed to coordinate actions across the system.</p>

<p>Key characteristics of Singleton:</p>
<ol>
  <li>Private constructor to prevent direct instantiation</li>
  <li>Static method to get the single instance</li>
  <li>Lazy initialization (instance created when first needed)</li>
  <li>Same instance returned on subsequent calls</li>
</ol>

<p>Common use cases for Singleton:</p>
<ul>
  <li><strong>Configuration Management</strong>: Application-wide settings</li>
  <li><strong>Logging</strong>: Centralized logging service</li>
  <li><strong>Database Connections</strong>: Connection pool management</li>
  <li><strong>Caching</strong>: Application-level cache</li>
  <li><strong>State Management</strong>: Global application state</li>
</ul>

<h2>Importance</h2>

<p>Understanding Singleton is important because:</p>

<ul>
  <li><strong>Resource Management</strong>: Prevents creating multiple expensive objects</li>
  <li><strong>Global Access</strong>: Provides controlled access to shared resources</li>
  <li><strong>State Consistency</strong>: Ensures single source of truth</li>
  <li><strong>Memory Efficiency</strong>: Only one instance exists in memory</li>
  <li><strong>Design Foundation</strong>: Foundation for understanding other patterns</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Singleton is used in many scenarios:</p>

<ul>
  <li><strong>Logger Services</strong>: Winston, Bunyan logging instances</li>
  <li><strong>Database Connections</strong>: MongoDB, PostgreSQL connection pools</li>
  <li><strong>Configuration</strong>: Environment configuration objects</li>
  <li><strong>Event Bus</strong>: Application-wide event emitter</li>
  <li><strong>Window/Document</strong>: Browser global objects</li>
  <li><strong>Redux Store</strong>: Single store for application state</li>
</ul>

<p><strong>Challenge:</strong> Implement a Singleton class that ensures only one instance can be created and provides methods to store/retrieve data.</p>`,
  examples: [
    {
      input: `const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2);`,
      output: `true`,
      explanation: 'Both variables reference the same instance',
    },
    {
      input: `const config = Singleton.getInstance();
config.set('theme', 'dark');
const sameConfig = Singleton.getInstance();
console.log(sameConfig.get('theme'));`,
      output: `"dark"`,
      explanation: 'Data persists across getInstance calls',
    },
  ],
  starterCode: `// TODO: Implement a Singleton class
// The class should:
// 1. Have a private static instance property
// 2. Have a private constructor
// 3. Have a static getInstance() method that returns the single instance
// 4. Have set(key, value) and get(key) methods for data storage

class Singleton {
  // Private static instance

  // Private data storage

  // Private constructor
  constructor() {
    // Initialize data storage
  }

  // Static method to get instance
  static getInstance() {
    // Return existing instance or create new one
  }

  // Set a value
  set(key, value) {
    // Store key-value pair
  }

  // Get a value
  get(key) {
    // Retrieve value by key
  }
}

// Test
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

instance1.set('name', 'MyApp');
console.log(instance2.get('name')); // Should print 'MyApp'
console.log(instance1 === instance2); // Should print true`,
  solution: `class Singleton {
  // Private static instance
  private static _instance: Singleton | null = null;

  // Private data storage
  private _data: Map<string, unknown> = new Map();

  // Private constructor
  constructor() {
    // Initialize data storage
    if (Singleton._instance) {
      return Singleton._instance;
    }
    this._data = new Map();
  }

  // Static method to get instance
  static getInstance() {
    // Return existing instance or create new one
    if (!Singleton._instance) {
      Singleton._instance = new Singleton();
    }
    return Singleton._instance;
  }

  // Set a value
  set(key: string, value: unknown) {
    // Store key-value pair
    this._data.set(key, value);
  }

  // Get a value
  get(key: string) {
    // Retrieve value by key
    return this._data.get(key);
  }
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Use a private static property to hold the single instance',
    'The constructor should be private (or use a pattern to prevent direct instantiation in JavaScript)',
    'getInstance() should check if instance exists before creating one (lazy initialization)',
    'Use a Map or object to store key-value pairs internally',
    'Remember: in JavaScript, you can use closures or symbols to simulate private properties',
  ],
};
