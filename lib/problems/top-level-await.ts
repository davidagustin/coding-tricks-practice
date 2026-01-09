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
  id: 'top-level-await',
  title: 'Top-Level Await in ES Modules',
  difficulty: 'easy',
  category: 'ES6+ Features',
  description: `<h2>In-Depth Explanation</h2>

<p>Top-level await allows you to use the <code>await</code> keyword at the module level, outside of async functions. This enables modules to act as async functions themselves, waiting for async operations to complete before other modules that depend on them can execute.</p>

<h3>Requirements</h3>
<ul>
  <li>Must be in an ES module (not CommonJS)</li>
  <li>File extension <code>.mjs</code> or <code>"type": "module"</code> in package.json</li>
  <li>Supported in modern browsers and Node.js 14.8+</li>
</ul>

<h3>How It Works</h3>
<ul>
  <li>The module becomes an async module</li>
  <li>Modules importing it will wait for all awaited operations</li>
  <li>Creates a dependency chain of async operations</li>
  <li>Other modules not depending on it can still load in parallel</li>
</ul>

<h3>Before Top-Level Await</h3>
<pre><code>// Old pattern - wrap in async IIFE
let data;
(async () => {
  data = await fetchData();
})();
// Problem: data might not be ready when other code runs</code></pre>

<h3>With Top-Level Await</h3>
<pre><code>// New pattern - clean and guaranteed
const data = await fetchData();
// data is ready before any importing module executes</code></pre>

<h2>Importance</h2>

<ul>
  <li><strong>Cleaner Initialization</strong>: No need for async IIFEs or init functions</li>
  <li><strong>Guaranteed Order</strong>: Dependent modules wait automatically</li>
  <li><strong>Dynamic Imports</strong>: Conditionally import modules based on async results</li>
  <li><strong>Configuration Loading</strong>: Load config before module exports are ready</li>
  <li><strong>Fallback Patterns</strong>: Try primary source, fall back to secondary</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<ul>
  <li><strong>Database Connections</strong>: Connect before exporting connection pool</li>
  <li><strong>Environment Config</strong>: Fetch remote config at module load</li>
  <li><strong>Feature Detection</strong>: Async feature detection for conditional exports</li>
  <li><strong>Resource Initialization</strong>: Load localization files, templates, etc.</li>
  <li><strong>Polyfills</strong>: Conditionally load polyfills based on environment</li>
</ul>

<p><strong>Challenge:</strong> Understand and implement patterns using top-level await.</p>`,
  examples: [
    {
      input: `// config.mjs
const response = await fetch('/api/config');
export const config = await response.json();

// app.mjs
import { config } from './config.mjs';
console.log(config); // Config is guaranteed to be loaded`,
      output: `{ apiUrl: '...', debug: true }`,
      explanation: 'Config is loaded before app.mjs executes',
    },
    {
      input: `// With fallback pattern
let translations;
try {
  translations = await import('./locale/en.mjs');
} catch {
  translations = await import('./locale/default.mjs');
}
export default translations;`,
      output: `{ greeting: 'Hello' }`,
      explanation: 'Try primary, fall back to default',
    },
    {
      input: `// Conditional export
const supportsFeature = await checkFeatureSupport();
export const implementation = supportsFeature
  ? await import('./modern.mjs')
  : await import('./legacy.mjs');`,
      output: `ModernImplementation`,
      explanation: 'Dynamic imports based on async checks',
    },
  ],
  starterCode: `// Note: Top-level await requires ES modules
// In real code, this would be in a .mjs file or with "type": "module"

// For this exercise, we'll simulate the patterns that top-level await enables
// by writing functions that demonstrate the concepts

// Task 1: Simulate a module that loads config
// Write an async function that demonstrates how top-level await
// would load configuration before exporting
async function createConfigModule() {
  // TODO: Simulate fetching config (use the mock function below)
  // Return an object with the loaded config

  // Mock fetch function (pretend this is a real API call)
  const fetchConfig = () => Promise.resolve({
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    debug: true
  });

  // Your code here - load config and return it
}

// Task 2: Implement a fallback pattern
// Try to load primary data, fall back to default if it fails
async function loadWithFallback(primaryLoader, fallbackLoader) {
  // TODO: Try primaryLoader(), if it throws/rejects, use fallbackLoader()
  // Return the successfully loaded data
}

// Task 3: Implement conditional dynamic import pattern
// Based on an async condition, return different implementations
async function loadImplementation(featureChecker) {
  // TODO: Call featureChecker() (returns Promise<boolean>)
  // If true, return { type: 'modern', features: ['async', 'modules'] }
  // If false, return { type: 'legacy', features: ['callbacks'] }
}

// Task 4: Implement parallel async initialization
// Load multiple resources in parallel and return when all are ready
async function initializeResources(loaders) {
  // TODO: loaders is an object like { config: fn, data: fn, user: fn }
  // Load all in parallel and return object with results
  // { config: result1, data: result2, user: result3 }
}

// Test helpers (mock async operations)
const mockPrimaryLoader = () => Promise.reject(new Error('Primary failed'));
const mockFallbackLoader = () => Promise.resolve({ source: 'fallback', data: [1, 2, 3] });
const mockFeatureCheck = (supported) => () => Promise.resolve(supported);
const mockLoaders = {
  config: () => Promise.resolve({ apiUrl: 'https://api.test.com' }),
  data: () => Promise.resolve([1, 2, 3]),
  user: () => Promise.resolve({ name: 'John', id: 1 })
};

// Test
async function runTests() {
  const config = await createConfigModule();
  console.log('Config:', config);

  const data = await loadWithFallback(mockPrimaryLoader, mockFallbackLoader);
  console.log('Fallback data:', data);

  const modernImpl = await loadImplementation(mockFeatureCheck(true));
  console.log('Modern:', modernImpl);

  const legacyImpl = await loadImplementation(mockFeatureCheck(false));
  console.log('Legacy:', legacyImpl);

  const resources = await initializeResources(mockLoaders);
  console.log('Resources:', resources);
}

runTests();`,
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Top-level await only works in ES modules (.mjs or "type": "module")',
    'Use try/catch for fallback patterns with async/await',
    'Promise.all() is great for loading multiple resources in parallel',
    'Dynamic imports return promises: const module = await import("./path.js")',
    'Modules using top-level await block their importers until ready',
  ],
};
