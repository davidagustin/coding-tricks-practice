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
  id: 'tagged-template-literals',
  title: 'Tagged Template Literals',
  difficulty: 'medium',
  category: 'JavaScript Basics',
  description: `<h2>In-Depth Explanation</h2>

<p>Tagged template literals allow you to process template strings with a custom function (the "tag"). When you write <code>tag`string`</code>, JavaScript calls the tag function with:</p>
<ol>
  <li>An array of string literals (the static parts)</li>
  <li>The interpolated values (the <code>${expression}</code> parts)</li>
</ol>

<p>The tag function receives: <code>tag(strings, ...values)</code> where:</p>
<ul>
  <li><code>strings</code> is an array of string literals</li>
  <li><code>values</code> are the interpolated expressions</li>
  <li><code>strings.length === values.length + 1</code> (always one more string than value)</li>
</ul>

<p>This enables:</p>
<ul>
  <li><strong>HTML Escaping</strong>: Sanitize user input in templates</li>
  <li><strong>Internationalization</strong>: Process strings for translation</li>
  <li><strong>Styled Components</strong>: CSS-in-JS libraries use this</li>
  <li><strong>SQL Queries</strong>: Build parameterized queries safely</li>
  <li><strong>String Formatting</strong>: Custom formatting logic</li>
</ul>

<h2>Importance</h2>

<p>Tagged templates are essential for safe string processing because:</p>

<ul>
  <li><strong>Security</strong>: Escape HTML/XML to prevent XSS attacks</li>
  <li><strong>Internationalization</strong>: Process strings for translation</li>
  <li><strong>Custom Processing</strong>: Apply custom logic to template strings</li>
  <li><strong>Type Safety</strong>: TypeScript can type-check tagged templates</li>
  <li><strong>Framework Features</strong>: Used by styled-components, Apollo, etc.</li>
  <li><strong>SQL Safety</strong>: Build parameterized queries</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Tagged templates are used extensively:</p>

<ul>
  <li><strong>HTML Escaping</strong>: <code>html`&lt;div&gt;${userInput}&lt;/div&gt;`</code> - escape HTML entities</li>
  <li><strong>Styled Components</strong>: <code>styled.div`color: ${color}`</code> - CSS-in-JS</li>
  <li><strong>Internationalization</strong>: <code>i18n`Hello ${name}`</code> - translate strings</li>
  <li><strong>SQL Queries</strong>: <code>sql`SELECT * FROM users WHERE id = ${id}`</code> - parameterized queries</li>
  <li><strong>String Formatting</strong>: <code>format`Price: ${amount}`</code> - format currency, dates</li>
  <li><strong>Logging</strong>: <code>log`User ${id} logged in`</code> - structured logging</li>
  <li><strong>GraphQL</strong>: Building GraphQL queries safely</li>
  <li><strong>Markdown</strong>: Processing markdown templates</li>
</ul>

<p><strong>Challenge:</strong> Build a simple HTML escaping tag and a highlight tag.</p>`,
  examples: [
    {
      input: 'html`<div>${userInput}</div>`',
      output: `'<div>&lt;script&gt;</div>'`,
      explanation: 'Escape HTML entities in interpolated values',
    },
  ],
  starterCode: `function html(strings, ...values) {
  // TODO: Escape HTML entities in interpolated values
  // Replace < > & " with their HTML entities
  // Combine strings and escaped values

  return strings.join('');
}

function escapeHtml(str) {
  // TODO: Replace HTML special characters
  // < → &lt;  > → &gt;  & → &amp;  " → &quot;
  return str;
}

// Test
const userInput = '<script>alert("xss")</script>';
console.log(html\`<div>\${userInput}</div>\`);

const name = 'John & Jane';
console.log(html\`<span>Hello, \${name}!</span>\`);`,
  solution: `function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function html(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] !== undefined ? escapeHtml(values[i]) : '';
    return result + str + value;
  }, '');
}`,
  testCases: [
    {
      input: ['<script>alert("xss")</script>'],
      expectedOutput: '<div>&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;</div>',
      description: 'html tag escapes script',
    },
    {
      input: ['John & Jane'],
      expectedOutput: '<span>Hello, John &amp; Jane!</span>',
      description: 'html tag escapes ampersand',
    },
  ],
  hints: [
    'Tag function receives (strings[], ...values)',
    'strings.length === values.length + 1',
    'Use reduce to interleave strings and processed values',
  ],
};
