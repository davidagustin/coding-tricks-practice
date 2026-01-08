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
  id: 'keyof-typeof',
  title: 'keyof and typeof Operators',
  difficulty: 'medium',
  category: 'TypeScript Basics',
  description: `<h2>In-Depth Explanation</h2>

<p>TypeScript provides two powerful type operators that help you work with types derived from values:</p>

<ul>
  <li><code>keyof</code>: Produces a union type of all property names (keys) of a type. For <code>keyof { a: number; b: string }</code>, the result is <code>"a" | "b"</code></li>
  <li><code>typeof</code>: Extracts the type from a value. Unlike JavaScript's typeof (which returns a string at runtime), TypeScript's typeof is used in type positions to get compile-time types</li>
</ul>

<p>Combining <code>keyof typeof</code> is a common pattern: it first gets the type of a value using typeof, then extracts the keys using keyof. This is especially useful for:</p>
<ul>
  <li>Creating types from object literals</li>
  <li>Typing function parameters that accept object keys</li>
  <li>Building type-safe property accessors</li>
</ul>

<p>These operators enable you to keep types and values in sync automatically - when you add a property to an object, the types update automatically.</p>

<h2>Importance</h2>

<p>keyof and typeof are essential because:</p>

<ul>
  <li><strong>DRY Principle</strong>: Derive types from values without duplication</li>
  <li><strong>Sync Guarantee</strong>: Types automatically update when values change</li>
  <li><strong>Type-Safe Access</strong>: Ensure only valid keys are used</li>
  <li><strong>Generic Constraints</strong>: Constrain generic parameters to valid keys</li>
  <li><strong>Enum Alternatives</strong>: Create union types from object keys</li>
  <li><strong>Configuration Typing</strong>: Type configuration objects and their keys</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>These operators are used extensively in:</p>

<ul>
  <li><strong>Object Property Access</strong>: Type-safe dynamic property access with bracket notation</li>
  <li><strong>Function Parameters</strong>: Accepting only valid property names as arguments</li>
  <li><strong>Lookup Types</strong>: Getting the type of a specific property: T[K]</li>
  <li><strong>Mapped Types</strong>: Iterating over keys with [K in keyof T]</li>
  <li><strong>Constants to Types</strong>: Deriving types from constant objects</li>
  <li><strong>Event Handlers</strong>: Typing event names based on available events</li>
  <li><strong>Translation Keys</strong>: Ensuring i18n keys are valid</li>
  <li><strong>Theme Properties</strong>: Type-safe theme access in styled-components</li>
</ul>

<p><strong>Challenge:</strong> Use keyof and typeof to create type-safe property accessors and derive types from values.</p>`,
  examples: [
    {
      input: `interface User {
  id: number;
  name: string;
  email: string;
}

type UserKeys = keyof User; // "id" | "name" | "email"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}`,
      output: `Type-safe property access`,
      explanation: 'keyof creates a union of all property names, enabling type-safe access',
    },
    {
      input: `const colors = {
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff'
} as const;

type Colors = typeof colors;
type ColorName = keyof typeof colors; // "red" | "green" | "blue"`,
      output: `Types derived from value`,
      explanation: 'typeof extracts the type, keyof gets the keys as a union',
    },
    {
      input: `const statusCodes = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
} as const;

type StatusCode = typeof statusCodes[keyof typeof statusCodes];
// 200 | 404 | 500`,
      output: `Union of all values`,
      explanation: 'Indexed access with keyof gets all value types as a union',
    },
  ],
  starterCode: `// TODO: Practice using keyof and typeof operators

// Task 1: Create a type-safe getter function using keyof
interface Person {
  name: string;
  age: number;
  email: string;
  isActive: boolean;
}

// TODO: Implement getProperty that only accepts valid Person keys
// and returns the correct type for each key
function getProperty<K extends keyof Person>(person: Person, key: K): Person[K] {
  // Your code here
}

// Task 2: Derive types from a configuration object using typeof
const appConfig = {
  apiEndpoint: 'https://api.example.com',
  timeout: 5000,
  maxRetries: 3,
  features: {
    darkMode: true,
    notifications: false
  }
} as const;

// TODO: Create types from the config object
// type AppConfig = typeof appConfig
// type ConfigKey = keyof typeof appConfig
// type FeatureFlags = typeof appConfig.features
// type FeatureName = keyof typeof appConfig.features
// Your code here

function getConfigValue<K extends ConfigKey>(key: K): typeof appConfig[K] {
  // TODO: Return the config value for the given key
  // Your code here
}

// Task 3: Create a type-safe event system using keyof typeof
const eventHandlers = {
  click: (x: number, y: number) => console.log(\`Clicked at \${x}, \${y}\`),
  hover: (element: string) => console.log(\`Hovered over \${element}\`),
  submit: (data: object) => console.log('Form submitted', data),
  resize: (width: number, height: number) => console.log(\`Resized to \${width}x\${height}\`)
};

// TODO: Create EventName type from the eventHandlers object keys
// type EventName = keyof typeof eventHandlers
// Your code here

function triggerEvent<E extends EventName>(
  event: E,
  ...args: Parameters<typeof eventHandlers[E]>
): void {
  // TODO: Call the appropriate event handler with the provided arguments
  // Your code here
}

// Task 4: Create a translation function using keyof
const translations = {
  en: {
    greeting: 'Hello',
    farewell: 'Goodbye',
    thanks: 'Thank you'
  },
  es: {
    greeting: 'Hola',
    farewell: 'Adiós',
    thanks: 'Gracias'
  },
  fr: {
    greeting: 'Bonjour',
    farewell: 'Au revoir',
    thanks: 'Merci'
  }
} as const;

// TODO: Create types from the translations object
// type Language = keyof typeof translations
// type TranslationKey = keyof typeof translations.en
// Your code here

function translate(lang: Language, key: TranslationKey): string {
  // TODO: Return the translation for the given language and key
  // Your code here
}

// Test your implementations
const person: Person = { name: 'Alice', age: 30, email: 'alice@example.com', isActive: true };
console.log(getProperty(person, 'name'));
console.log(getProperty(person, 'age'));

console.log(getConfigValue('apiEndpoint'));
console.log(getConfigValue('timeout'));

triggerEvent('click', 100, 200);
triggerEvent('hover', 'button');

console.log(translate('en', 'greeting'));
console.log(translate('es', 'farewell'));
console.log(translate('fr', 'thanks'));`,
  solution: `// Task 1: Create a type-safe getter function using keyof
interface Person {
  name: string;
  age: number;
  email: string;
  isActive: boolean;
}

function getProperty<K extends keyof Person>(person: Person, key: K): Person[K] {
  return person[key];
}

// Task 2: Derive types from a configuration object using typeof
const appConfig = {
  apiEndpoint: 'https://api.example.com',
  timeout: 5000,
  maxRetries: 3,
  features: {
    darkMode: true,
    notifications: false
  }
} as const;

type AppConfig = typeof appConfig;
type ConfigKey = keyof typeof appConfig;
type FeatureFlags = typeof appConfig['features'];
type FeatureName = keyof typeof appConfig['features'];

function getConfigValue<K extends ConfigKey>(key: K): typeof appConfig[K] {
  return appConfig[key];
}

// Task 3: Create a type-safe event system using keyof typeof
const eventHandlers = {
  click: (x: number, y: number) => console.log(\`Clicked at \${x}, \${y}\`),
  hover: (element: string) => console.log(\`Hovered over \${element}\`),
  submit: (data: object) => console.log('Form submitted', data),
  resize: (width: number, height: number) => console.log(\`Resized to \${width}x\${height}\`)
};

type EventName = keyof typeof eventHandlers;

function triggerEvent<E extends EventName>(
  event: E,
  ...args: Parameters<typeof eventHandlers[E]>
): void {
  const handler = eventHandlers[event] as (...args: unknown[]) => void;
  handler(...args);
}

// Task 4: Create a translation function using keyof
const translations = {
  en: {
    greeting: 'Hello',
    farewell: 'Goodbye',
    thanks: 'Thank you'
  },
  es: {
    greeting: 'Hola',
    farewell: 'Adiós',
    thanks: 'Gracias'
  },
  fr: {
    greeting: 'Bonjour',
    farewell: 'Au revoir',
    thanks: 'Merci'
  }
} as const;

type Language = keyof typeof translations;
type TranslationKey = keyof typeof translations['en'];

function translate(lang: Language, key: TranslationKey): string {
  return translations[lang][key];
}

// Test implementations
const person: Person = { name: 'Alice', age: 30, email: 'alice@example.com', isActive: true };
console.log(getProperty(person, 'name'));
console.log(getProperty(person, 'age'));

console.log(getConfigValue('apiEndpoint'));
console.log(getConfigValue('timeout'));

triggerEvent('click', 100, 200);
triggerEvent('hover', 'button');

console.log(translate('en', 'greeting'));
console.log(translate('es', 'farewell'));
console.log(translate('fr', 'thanks'));`,
  testCases: [
    {
      input: [{ name: 'Alice', age: 30, email: 'alice@example.com', isActive: true }, 'name'],
      expectedOutput: 'Alice',
      description: 'getProperty returns correct value with type safety',
    },
    {
      input: ['apiEndpoint'],
      expectedOutput: 'https://api.example.com',
      description: 'getConfigValue returns config value with proper type',
    },
    {
      input: ['en', 'greeting'],
      expectedOutput: 'Hello',
      description: 'translate returns correct translation for language and key',
    },
    {
      input: ['fr', 'thanks'],
      expectedOutput: 'Merci',
      description: 'translate works with different language/key combinations',
    },
  ],
  hints: [
    'keyof T produces a union type of all property names: keyof { a: 1, b: 2 } = "a" | "b"',
    'typeof value gets the TypeScript type of a value (different from runtime typeof)',
    'Combine them: keyof typeof obj gets keys of an object value as a type',
    'Use "as const" to preserve literal types in objects',
    'T[K] is an indexed access type - it gets the type of property K in type T',
    'Use extends keyof T to constrain generic parameters to valid keys',
  ],
};
