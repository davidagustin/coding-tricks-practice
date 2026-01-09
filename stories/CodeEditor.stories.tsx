import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import CodeEditor from '../components/CodeEditor';
import { ThemeProvider } from '../components/ThemeProvider';

/**
 * CodeEditor is a Monaco-based code editor component that provides
 * syntax highlighting, auto-formatting, and IntelliSense for TypeScript/JavaScript.
 *
 * It integrates with the application theme system and supports read-only mode
 * for displaying solutions or reference code.
 */
const meta: Meta<typeof CodeEditor> = {
  title: 'Components/CodeEditor',
  component: CodeEditor,
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      // Mock ThemeProvider that respects Storybook's theme toggle
      const MockThemeProvider = ({ children }: { children: React.ReactNode }) => {
        const [currentTheme, setCurrentTheme] = React.useState<'light' | 'dark'>(theme);

        React.useEffect(() => {
          setCurrentTheme(theme);
        }, []);

        return (
          <ThemeProvider>
            {children}
          </ThemeProvider>
        );
      };

      return (
        <MockThemeProvider>
          <div style={{ height: '400px', width: '100%' }}>
            <Story />
          </div>
        </MockThemeProvider>
      );
    },
  ],
  parameters: {
    layout: 'padded',
    // Monaco Editor needs time to initialize
    chromatic: {
      delay: 2000,
      diffThreshold: 0.2,
    },
  },
  argTypes: {
    code: {
      control: 'text',
      description: 'The code content to display in the editor',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the code changes',
    },
    language: {
      control: 'select',
      options: ['typescript', 'javascript', 'json', 'html', 'css'],
      description: 'The programming language for syntax highlighting',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the editor is read-only',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CodeEditor>;

// =============================================================================
// Basic States
// =============================================================================

/**
 * Empty editor with no code - the initial state when starting fresh.
 */
export const Empty: Story = {
  args: {
    code: '',
    language: 'typescript',
    readOnly: false,
    onChange: () => {},
  },
};

/**
 * Editor with JavaScript code and JavaScript syntax highlighting.
 */
export const WithJavaScriptCode: Story = {
  args: {
    code: `// JavaScript Example
function greet(name) {
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message;
}

const users = ['Alice', 'Bob', 'Charlie'];
users.forEach(user => greet(user));
`,
    language: 'javascript',
    readOnly: false,
    onChange: () => {},
  },
};

/**
 * Editor with TypeScript code including type annotations and interfaces.
 */
export const WithTypeScriptCode: Story = {
  args: {
    code: `// TypeScript Example
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function createUser(name: string, email: string): User {
  return {
    id: Math.floor(Math.random() * 1000),
    name,
    email,
    isActive: true,
  };
}

const user: User = createUser('John Doe', 'john@example.com');
console.log(user);
`,
    language: 'typescript',
    readOnly: false,
    onChange: () => {},
  },
};

// =============================================================================
// Read-Only vs Editable Modes
// =============================================================================

/**
 * Read-only mode - used for displaying solutions or reference code.
 * The editor cannot be modified by the user.
 */
export const ReadOnlyMode: Story = {
  args: {
    code: `// This is a read-only solution display
// Users cannot edit this code

function solution(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }

  return [];
}
`,
    language: 'typescript',
    readOnly: true,
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only mode is used for displaying solution code that users should not modify.',
      },
    },
  },
};

/**
 * Editable mode - the default state where users can write and modify code.
 */
export const EditableMode: Story = {
  args: {
    code: `// You can edit this code!
function solve(input: string): string {
  // TODO: Implement your solution here
  return input;
}
`,
    language: 'typescript',
    readOnly: false,
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Editable mode allows users to write and modify code freely.',
      },
    },
  },
};

// =============================================================================
// Syntax Error Handling
// =============================================================================

/**
 * Code with syntax errors that should be highlighted by Monaco's error detection.
 */
export const WithSyntaxErrors: Story = {
  args: {
    code: `// This code contains intentional syntax errors
function brokenFunction( {
  const x =
  if (true {
    console.log("missing closing paren")
  }

  const arr = [1, 2, 3

  return undefined
}

// Missing type annotation on parameter
const add = (a, b): number => {
  return a + b;  // TypeScript will show error about implicit 'any'
};
`,
    language: 'typescript',
    readOnly: false,
    onChange: () => {},
  },
  parameters: {
    chromatic: {
      delay: 3000, // Extra delay for error markers to appear
    },
    docs: {
      description: {
        story: 'Monaco Editor highlights syntax errors with red underlines and error markers in the gutter.',
      },
    },
  },
};

// =============================================================================
// Code Length Variations
// =============================================================================

/**
 * Short code snippet - just a few lines.
 */
export const ShortCodeSnippet: Story = {
  args: {
    code: `const sum = (a: number, b: number): number => a + b;`,
    language: 'typescript',
    readOnly: false,
    onChange: () => {},
  },
};

/**
 * Long code with 50+ lines to test scrolling behavior.
 */
export const LongCodeWithScrolling: Story = {
  args: {
    code: `// Long code example to test scrolling behavior
// This file contains over 50 lines of code

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  description: string;
  tags: string[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

class ShoppingCart implements Cart {
  items: CartItem[] = [];

  get total(): number {
    return this.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  }

  get itemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  addItem(product: Product, quantity: number = 1): void {
    const existingItem = this.items.find(
      item => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  removeItem(productId: string): void {
    this.items = this.items.filter(
      item => item.product.id !== productId
    );
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.items.find(
      item => item.product.id === productId
    );

    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
      }
    }
  }

  clear(): void {
    this.items = [];
  }

  checkout(): Promise<{ orderId: string; total: number }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orderId = \`ORD-\${Date.now()}\`;
        const total = this.total;
        this.clear();
        resolve({ orderId, total });
      }, 1000);
    });
  }
}

// Usage example
const cart = new ShoppingCart();

const sampleProduct: Product = {
  id: 'prod-001',
  name: 'Wireless Headphones',
  price: 99.99,
  category: 'Electronics',
  inStock: true,
  description: 'High-quality wireless headphones with noise cancellation',
  tags: ['audio', 'wireless', 'bluetooth'],
};

cart.addItem(sampleProduct, 2);
console.log(\`Cart total: $\${cart.total.toFixed(2)}\`);
console.log(\`Items in cart: \${cart.itemCount}\`);
`,
    language: 'typescript',
    readOnly: false,
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests scrolling behavior with a large amount of code.',
      },
    },
  },
};

// =============================================================================
// Theme Variants
// =============================================================================

/**
 * Dark theme variant - shows the editor with VS Dark theme.
 */
export const DarkTheme: Story = {
  args: {
    code: `// Dark theme example
interface Config {
  darkMode: boolean;
  fontSize: number;
  fontFamily: string;
}

const config: Config = {
  darkMode: true,
  fontSize: 14,
  fontFamily: 'Fira Code',
};

export default config;
`,
    language: 'typescript',
    readOnly: false,
    onChange: () => {},
  },
  globals: {
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Editor with dark theme (vs-dark) for comfortable coding in low-light environments.',
      },
    },
  },
};

/**
 * Light theme variant - shows the editor with VS Light theme.
 */
export const LightTheme: Story = {
  args: {
    code: `// Light theme example
interface Config {
  darkMode: boolean;
  fontSize: number;
  fontFamily: string;
}

const config: Config = {
  darkMode: false,
  fontSize: 14,
  fontFamily: 'Fira Code',
};

export default config;
`,
    language: 'typescript',
    readOnly: false,
    onChange: () => {},
  },
  globals: {
    theme: 'light',
  },
  parameters: {
    backgrounds: { default: 'light' },
    docs: {
      description: {
        story: 'Editor with light theme (vs) for bright environments.',
      },
    },
  },
};

// =============================================================================
// Viewport Variations
// =============================================================================

/**
 * Mobile viewport - smaller editor for testing responsive behavior.
 */
export const MobileViewport: Story = {
  args: {
    code: `// Mobile view
const greeting = 'Hello!';
console.log(greeting);
`,
    language: 'typescript',
    readOnly: false,
    onChange: () => {},
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    chromatic: {
      viewports: [375],
    },
    docs: {
      description: {
        story: 'Editor on a mobile viewport to test responsive behavior.',
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      return (
        <ThemeProvider>
          <div style={{ height: '300px', width: '320px' }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

// =============================================================================
// Code Pattern Examples
// =============================================================================

/**
 * Destructuring example - demonstrates object and array destructuring.
 */
export const DestructuringExample: Story = {
  args: {
    code: `// Destructuring Examples

// Object destructuring
const user = { name: 'Alice', age: 30, city: 'NYC' };
const { name, age, city } = user;

// With renaming
const { name: userName, age: userAge } = user;

// With default values
const { country = 'USA' } = user;

// Nested destructuring
const company = {
  name: 'TechCorp',
  address: {
    street: '123 Main St',
    city: 'San Francisco',
  },
};
const { address: { street, city: companyCity } } = company;

// Array destructuring
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;

// Swapping variables
let a = 1, b = 2;
[a, b] = [b, a];

// Function parameter destructuring
function greet({ name, greeting = 'Hello' }: { name: string; greeting?: string }) {
  return \`\${greeting}, \${name}!\`;
}

console.log(greet({ name: 'World' }));
`,
    language: 'typescript',
    readOnly: false,
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Examples of object and array destructuring patterns in TypeScript.',
      },
    },
  },
};

/**
 * Arrow function example - demonstrates various arrow function patterns.
 */
export const ArrowFunctionExample: Story = {
  args: {
    code: `// Arrow Function Examples

// Basic arrow function
const add = (a: number, b: number): number => a + b;

// Single parameter (parentheses optional)
const double = (x: number): number => x * 2;

// No parameters
const getTimestamp = (): number => Date.now();

// Multi-line arrow function
const processData = (data: string[]): string[] => {
  const filtered = data.filter(item => item.length > 0);
  const transformed = filtered.map(item => item.toUpperCase());
  return transformed;
};

// Arrow function returning object (needs parentheses)
const createUser = (name: string): { name: string; id: number } => ({
  name,
  id: Math.random(),
});

// Higher-order function
const multiply = (factor: number) => (value: number): number => value * factor;
const triple = multiply(3);

// Array methods with arrow functions
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
const evens = numbers.filter(n => n % 2 === 0);
const squared = numbers.map(n => n ** 2);

// Immediately Invoked Arrow Function Expression (IIAFE)
const result = ((x: number, y: number) => x + y)(5, 3);

console.log({ sum, evens, squared, result });
`,
    language: 'typescript',
    readOnly: false,
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Examples of arrow function patterns and use cases.',
      },
    },
  },
};

/**
 * Async/await example - demonstrates asynchronous programming patterns.
 */
export const AsyncAwaitExample: Story = {
  args: {
    code: `// Async/Await Examples

// Basic async function
async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  const response = await fetch(\`/api/users/\${id}\`);
  const data = await response.json();
  return data;
}

// Arrow function async
const fetchPosts = async (userId: number): Promise<any[]> => {
  const response = await fetch(\`/api/users/\${userId}/posts\`);
  return response.json();
};

// Error handling with try/catch
async function fetchWithErrorHandling(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}

// Parallel async operations
async function fetchAllData(userIds: number[]): Promise<any[]> {
  const promises = userIds.map(id => fetchUser(id));
  const results = await Promise.all(promises);
  return results;
}

// Sequential async operations
async function processSequentially(items: string[]): Promise<void> {
  for (const item of items) {
    await processItem(item);
    console.log(\`Processed: \${item}\`);
  }
}

async function processItem(item: string): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 100));
}

// Async generator
async function* asyncGenerator(): AsyncGenerator<number> {
  for (let i = 0; i < 5; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));
    yield i;
  }
}

// Using async generator
async function consumeGenerator(): Promise<void> {
  for await (const value of asyncGenerator()) {
    console.log(value);
  }
}
`,
    language: 'typescript',
    readOnly: false,
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Examples of async/await patterns for asynchronous programming.',
      },
    },
  },
};

/**
 * Class example - demonstrates TypeScript class patterns.
 */
export const ClassExample: Story = {
  args: {
    code: `// Class Examples

// Basic class
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): void {
    console.log(\`\${this.name} makes a sound.\`);
  }
}

// Inheritance
class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }

  speak(): void {
    console.log(\`\${this.name} barks!\`);
  }

  fetch(): void {
    console.log(\`\${this.name} fetches the ball.\`);
  }
}

// Abstract class
abstract class Shape {
  abstract area(): number;
  abstract perimeter(): number;

  describe(): string {
    return \`Area: \${this.area()}, Perimeter: \${this.perimeter()}\`;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

// Class with static members
class MathUtils {
  static readonly PI = 3.14159;

  static square(x: number): number {
    return x * x;
  }

  static cube(x: number): number {
    return x * x * x;
  }
}

// Class with getters and setters
class Temperature {
  private _celsius: number = 0;

  get celsius(): number {
    return this._celsius;
  }

  set celsius(value: number) {
    this._celsius = value;
  }

  get fahrenheit(): number {
    return this._celsius * 9/5 + 32;
  }

  set fahrenheit(value: number) {
    this._celsius = (value - 32) * 5/9;
  }
}

// Usage
const dog = new Dog('Buddy', 'Golden Retriever');
dog.speak();
dog.fetch();

const rect = new Rectangle(10, 5);
console.log(rect.describe());

console.log(MathUtils.square(4));

const temp = new Temperature();
temp.celsius = 100;
console.log(temp.fahrenheit); // 212
`,
    language: 'typescript',
    readOnly: false,
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Examples of TypeScript class patterns including inheritance, abstract classes, and static members.',
      },
    },
  },
};

// =============================================================================
// Chromatic-Specific Stories
// =============================================================================

/**
 * Story specifically configured for Chromatic visual regression testing.
 * Includes both light and dark mode snapshots.
 */
export const ChromaticTest: Story = {
  args: {
    code: `// Chromatic Visual Test
interface TestConfig {
  snapshot: boolean;
  modes: ('light' | 'dark')[];
}

const config: TestConfig = {
  snapshot: true,
  modes: ['light', 'dark'],
};

function runVisualTest(config: TestConfig): void {
  if (config.snapshot) {
    config.modes.forEach(mode => {
      console.log(\`Testing \${mode} mode\`);
    });
  }
}

runVisualTest(config);
`,
    language: 'typescript',
    readOnly: false,
    onChange: () => {},
  },
  parameters: {
    chromatic: {
      delay: 3000,
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
      },
      viewports: [375, 768, 1200],
    },
    docs: {
      description: {
        story: 'This story is specifically configured for Chromatic visual regression testing with multiple viewports and theme modes.',
      },
    },
  },
};
