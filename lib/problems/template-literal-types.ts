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
  id: 'template-literal-types',
  title: 'Template Literal Types',
  difficulty: 'medium',
  category: 'TypeScript Advanced',
  description: `<h2>In-Depth Explanation</h2>

<p>Template literal types allow you to manipulate string types using template literal syntax. They combine literal types with template strings to create powerful string manipulation at the type level.</p>

<p>Key features:</p>
<ul>
  <li><strong>String Interpolation</strong>: Combine string literal types using \`\${...}\` syntax</li>
  <li><strong>Union Expansion</strong>: Template literals distribute over unions, creating all combinations</li>
  <li><strong>Built-in Utilities</strong>: TypeScript provides Uppercase, Lowercase, Capitalize, Uncapitalize</li>
  <li><strong>Pattern Matching</strong>: Use with conditional types to parse and extract from strings</li>
</ul>

<p>Common patterns:</p>
<ul>
  <li><strong>Event Names</strong>: \`on\${Capitalize&lt;EventName&gt;}\` creates "onClick", "onHover", etc.</li>
  <li><strong>API Routes</strong>: \`/api/\${Resource}/\${Action}\` creates type-safe route patterns</li>
  <li><strong>CSS Properties</strong>: \`\${Property}-\${Value}\` for type-safe CSS class names</li>
</ul>

<h2>Importance</h2>

<p>Template literal types are essential for modern TypeScript because:</p>

<ul>
  <li><strong>Type-Safe Strings</strong>: Catch string-related errors at compile time</li>
  <li><strong>API Design</strong>: Create strongly-typed string-based APIs</li>
  <li><strong>Code Generation</strong>: Type-check generated string patterns</li>
  <li><strong>Framework Development</strong>: Build type-safe routing, event systems, and more</li>
  <li><strong>String Parsing</strong>: Extract information from string types</li>
  <li><strong>Consistency</strong>: Enforce naming conventions at the type level</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Template literal types are used extensively:</p>

<ul>
  <li><strong>Event Handlers</strong>: React's \`on\${Event}\` props pattern</li>
  <li><strong>Route Typing</strong>: Next.js, Express route parameter extraction</li>
  <li><strong>CSS-in-JS</strong>: Type-safe class name generation</li>
  <li><strong>i18n Keys</strong>: Type-safe translation key patterns</li>
  <li><strong>Database Queries</strong>: Type-safe column and table references</li>
  <li><strong>Configuration</strong>: Environment variable naming patterns</li>
  <li><strong>Validation</strong>: String format validation at compile time</li>
  <li><strong>Builder Patterns</strong>: Type-safe method chaining with string keys</li>
</ul>

<p><strong>Challenge:</strong> Build template literal types for string manipulation and pattern creation.</p>`,
  examples: [
    {
      input: `type Greeting = \`Hello, \${string}!\``,
      output: `"Hello, World!" matches Greeting`,
      explanation: 'Template literals can include string placeholders',
    },
    {
      input: `type EventHandler<T extends string> = \`on\${Capitalize<T>}\``,
      output: `EventHandler<'click'> = 'onClick'`,
      explanation: 'Capitalize transforms the first letter to uppercase',
    },
    {
      input: `type Color = 'red' | 'blue'; type Size = 'sm' | 'lg'; type Class = \`\${Color}-\${Size}\``,
      output: `'red-sm' | 'red-lg' | 'blue-sm' | 'blue-lg'`,
      explanation: 'Template literals distribute over unions creating all combinations',
    },
  ],
  starterCode: `// TODO: Create a type that generates getter method names
// GetterName<'name'> should be 'getName'
// GetterName<'age'> should be 'getAge'
type GetterName<T extends string> = T; // Fix this

// TODO: Create a type that generates setter method names
// SetterName<'name'> should be 'setName'
type SetterName<T extends string> = T; // Fix this

// TODO: Create a type for CSS class names with BEM convention
// BEMClass<'button', 'icon', 'large'> should be 'button__icon--large'
type BEMClass<Block extends string, Element extends string, Modifier extends string> = string; // Fix this

// TODO: Create a type that extracts the event name from handler name
// ExtractEvent<'onClick'> should be 'click'
// ExtractEvent<'onMouseOver'> should be 'mouseOver'
type ExtractEvent<T extends string> = T; // Fix this

// TODO: Create a type for HTTP endpoints
// Endpoint<'users', 'get'> should be 'GET /api/users'
// Endpoint<'posts', 'post'> should be 'POST /api/posts'
type HttpMethod = 'get' | 'post' | 'put' | 'delete';
type Endpoint<Resource extends string, Method extends HttpMethod> = string; // Fix this

// Test your types
type Test1 = GetterName<'name'>; // should be 'getName'
type Test2 = SetterName<'value'>; // should be 'setValue'
type Test3 = BEMClass<'card', 'header', 'active'>; // should be 'card__header--active'
type Test4 = ExtractEvent<'onClick'>; // should be 'click'
type Test5 = Endpoint<'users', 'get'>; // should be 'GET /api/users'`,
  solution: `// Create a type that generates getter method names
// GetterName<'name'> should be 'getName'
type GetterName<T extends string> = \`get\${Capitalize<T>}\`;

// Create a type that generates setter method names
// SetterName<'name'> should be 'setName'
type SetterName<T extends string> = \`set\${Capitalize<T>}\`;

// Create a type for CSS class names with BEM convention
// BEMClass<'button', 'icon', 'large'> should be 'button__icon--large'
type BEMClass<Block extends string, Element extends string, Modifier extends string> = 
  \`\${Block}__\${Element}--\${Modifier}\`;

// Create a type that extracts the event name from handler name
// ExtractEvent<'onClick'> should be 'click'
// ExtractEvent<'onMouseOver'> should be 'mouseOver'
type ExtractEvent<T extends string> = T extends \`on\${infer E}\` 
  ? Uncapitalize<E> 
  : never;

// Create a type for HTTP endpoints
// Endpoint<'users', 'get'> should be 'GET /api/users'
// Endpoint<'posts', 'post'> should be 'POST /api/posts'
type HttpMethod = 'get' | 'post' | 'put' | 'delete';
type Endpoint<Resource extends string, Method extends HttpMethod> = 
  \`\${Uppercase<Method>} /api/\${Resource}\`;`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Use template literal syntax: `prefix${T}suffix` to create new string types',
    'Capitalize<T> transforms "hello" to "Hello", Uncapitalize does the reverse',
    'Use conditional types with infer to extract parts: T extends `on${infer E}` ? E : never',
    'Uppercase<T> transforms entire string to uppercase: "get" becomes "GET"',
    'Template literals automatically distribute over union types',
  ],
};
