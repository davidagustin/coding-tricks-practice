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
  id: 'string-template-tricks',
  title: 'Advanced Template Literal Techniques',
  difficulty: 'medium',
  category: 'String Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>Template literals (\`backtick strings\`) offer powerful features beyond simple string interpolation. Understanding advanced techniques enables elegant string manipulation.</p>

<p>Key template literal features:</p>
<ul>
  <li><strong>Expression Interpolation</strong>: <code>\${expression}</code> embeds any JavaScript expression</li>
  <li><strong>Multi-line Strings</strong>: Natural line breaks without \\n</li>
  <li><strong>Tagged Templates</strong>: Custom processing of template parts</li>
  <li><strong>Nesting</strong>: Templates can contain other templates</li>
</ul>

<h2>Advanced Techniques</h2>

<p>Beyond basic interpolation:</p>

<ul>
  <li><strong>Conditional Content</strong>: Use ternary operators inside \${}</li>
  <li><strong>Array Joining</strong>: <code>\${arr.join(', ')}</code> for lists</li>
  <li><strong>Nested Templates</strong>: <code>\${items.map(i => \`&lt;li&gt;\${i}&lt;/li&gt;\`).join('')}</code></li>
  <li><strong>Expression Evaluation</strong>: Any expression works: <code>\${a + b}</code>, <code>\${fn()}</code></li>
  <li><strong>Object Destructuring</strong>: <code>\${({name}) => name}</code> patterns</li>
</ul>

<h2>Importance</h2>

<p>Template literal mastery is important for:</p>

<ul>
  <li><strong>HTML Generation</strong>: Build HTML strings dynamically</li>
  <li><strong>SQL Queries</strong>: Construct queries (with proper escaping)</li>
  <li><strong>Logging</strong>: Create formatted log messages</li>
  <li><strong>Configuration</strong>: Build config strings dynamically</li>
  <li><strong>Code Generation</strong>: Generate code as strings</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Real-world use cases:</p>

<ul>
  <li><strong>Component Rendering</strong>: Generate HTML from data</li>
  <li><strong>Email Templates</strong>: Create dynamic email content</li>
  <li><strong>URL Building</strong>: Construct URLs with query params</li>
  <li><strong>Error Messages</strong>: Format detailed error information</li>
  <li><strong>Report Generation</strong>: Create formatted text reports</li>
  <li><strong>API Requests</strong>: Build request bodies and URLs</li>
</ul>

<p><strong>Challenge:</strong> Use advanced template literal techniques for various tasks.</p>`,
  examples: [
    {
      input: `\`Total: \${items.length} item\${items.length !== 1 ? 's' : ''}\``,
      output: `'Total: 3 items'`,
      explanation: 'Conditional pluralization in template',
    },
    {
      input: `\`<ul>\${['a','b'].map(x => \`<li>\${x}</li>\`).join('')}</ul>\``,
      output: `'<ul><li>a</li><li>b</li></ul>'`,
      explanation: 'Nested templates for list generation',
    },
  ],
  starterCode: `function pluralize(count, singular, plural = singular + 's') {
  // TODO: Return grammatically correct string
  // pluralize(1, 'apple') → '1 apple'
  // pluralize(5, 'apple') → '5 apples'
  // pluralize(0, 'cherry', 'cherries') → '0 cherries'

  return '';
}

function buildUrl(base, params) {
  // TODO: Build URL with query parameters
  // buildUrl('https://api.com', { page: 1, limit: 10 })
  // → 'https://api.com?page=1&limit=10'
  // Handle empty params object: return just base

  return base;
}

function generateTable(headers, rows) {
  // TODO: Generate HTML table string
  // headers: ['Name', 'Age']
  // rows: [['Alice', 30], ['Bob', 25]]
  // → '<table><thead><tr><th>Name</th><th>Age</th></tr></thead><tbody><tr><td>Alice</td><td>30</td></tr><tr><td>Bob</td><td>25</td></tr></tbody></table>'

  return '';
}

function interpolate(template, data) {
  // TODO: Replace {{key}} placeholders with values from data object
  // interpolate('Hello {{name}}!', { name: 'World' }) → 'Hello World!'
  // interpolate('{{a}} + {{b}} = {{c}}', { a: 1, b: 2, c: 3 }) → '1 + 2 = 3'

  return template;
}

// Test
console.log(pluralize(1, 'apple'));
console.log(pluralize(5, 'apple'));
console.log(buildUrl('https://api.com', { page: 1, limit: 10 }));
console.log(generateTable(['Name', 'Age'], [['Alice', 30], ['Bob', 25]]));
console.log(interpolate('Hello {{name}}!', { name: 'World' }));`,
  solution: `function pluralize(count, noun) {
  // Return singular or plural form based on count
  // pluralize(1, 'apple') → '1 apple'
  // pluralize(5, 'apple') → '5 apples'
  return \`\${count} \${noun}\${count !== 1 ? 's' : ''}\`;
}

function buildUrl(base, params) {
  // Build URL with query parameters
  // buildUrl('https://api.com', { page: 1, limit: 10 })
  // → 'https://api.com?page=1&limit=10'
  // Handle empty params object: return just base
  if (!params || Object.keys(params).length === 0) {
    return base;
  }
  const queryString = Object.entries(params)
    .map(([key, value]) => \`\${encodeURIComponent(key)}=\${encodeURIComponent(String(value))}\`)
    .join('&');
  return \`\${base}?\${queryString}\`;
}

function generateTable(headers, rows) {
  // Generate HTML table string
  // headers: ['Name', 'Age']
  // rows: [['Alice', 30], ['Bob', 25]]
  // → '<table><thead><tr><th>Name</th><th>Age</th></tr></thead><tbody><tr><td>Alice</td><td>30</td></tr><tr><td>Bob</td><td>25</td></tr></tbody></table>'
  const headerRow = \`<tr>\${headers.map(h => \`<th>\${h}</th>\`).join('')}</tr>\`;
  const bodyRows = rows.map(row => 
    \`<tr>\${row.map(cell => \`<td>\${cell}</td>\`).join('')}</tr>\`
  ).join('');
  return \`<table><thead>\${headerRow}</thead><tbody>\${bodyRows}</tbody></table>\`;
}

function interpolate(template, data) {
  // Replace {{key}} placeholders with values from data object
  // interpolate('Hello {{name}}!', { name: 'World' }) → 'Hello World!'
  // interpolate('{{a}} + {{b}} = {{c}}', { a: 1, b: 2, c: 3 }) → '1 + 2 = 3'
  return template.replace(/\\{\\{([^}]+)\\}\\}/g, (match, key) => {
    return data[key.trim()] !== undefined ? String(data[key.trim()]) : match;
  });
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Use ternary operator inside ${} for conditional content',
    'Object.entries() gives you [key, value] pairs to iterate over',
    'Nest template literals with map() and join() for generating lists',
    'Use replace() with a regex and callback function for custom interpolation',
    'Remember to use encodeURIComponent() for URL-safe values',
  ],
};
