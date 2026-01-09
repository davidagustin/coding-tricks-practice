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

<p>Tagged template literals allow you to process template strings with a custom function (the "tag"). When you write <code>tag</code> followed by a template literal, JavaScript calls the tag function with:</p>
<ol>
  <li>An array of string literals (the static parts)</li>
  <li>The interpolated values (the expression parts)</li>
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
  <li><strong>HTML Escaping</strong>: <code>html</code> followed by template literal - escape HTML entities</li>
  <li><strong>Styled Components</strong>: <code>styled.div</code> followed by template literal - CSS-in-JS</li>
  <li><strong>Internationalization</strong>: <code>i18n</code> followed by template literal - translate strings</li>
  <li><strong>SQL Queries</strong>: <code>sql</code> followed by template literal - parameterized queries</li>
  <li><strong>String Formatting</strong>: <code>format</code> followed by template literal - format currency, dates</li>
  <li><strong>Logging</strong>: <code>log</code> followed by template literal - structured logging</li>
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
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Tag function receives (strings[], ...values)',
    'strings.length === values.length + 1',
    'Use reduce to interleave strings and processed values',
  ],
};
