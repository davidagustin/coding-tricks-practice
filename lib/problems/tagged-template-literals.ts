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
    description: `## In-Depth Explanation

Tagged template literals allow you to process template strings with a custom function (the "tag"). When you write \`tag\`string\`, JavaScript calls the tag function with:
1. An array of string literals (the static parts)
2. The interpolated values (the \`$\` + \`{expression}\` parts)

The tag function receives: \`tag(strings, ...values)\` where:
- \`strings\` is an array of string literals
- \`values\` are the interpolated expressions
- \`strings.length === values.length + 1\` (always one more string than value)

This enables:
- **HTML Escaping**: Sanitize user input in templates
- **Internationalization**: Process strings for translation
- **Styled Components**: CSS-in-JS libraries use this
- **SQL Queries**: Build parameterized queries safely
- **String Formatting**: Custom formatting logic

## Importance

Tagged templates are essential for safe string processing because:

- **Security**: Escape HTML/XML to prevent XSS attacks
- **Internationalization**: Process strings for translation
- **Custom Processing**: Apply custom logic to template strings
- **Type Safety**: TypeScript can type-check tagged templates
- **Framework Features**: Used by styled-components, Apollo, etc.
- **SQL Safety**: Build parameterized queries

## Usefulness & Practical Applications

Tagged templates are used extensively:

- **HTML Escaping**: \`html\`<div>\${userInput}</div>\`\` - escape HTML entities
- **Styled Components**: \`styled.div\`color: \${color}\`\` - CSS-in-JS
- **Internationalization**: \`i18n\`Hello \${name}\`\` - translate strings
- **SQL Queries**: \`sql\`SELECT * FROM users WHERE id = \${id}\`\` - parameterized queries
- **String Formatting**: \`format\`Price: \${amount}\`\` - format currency, dates
- **Logging**: \`log\`User \${id} logged in\`\` - structured logging
- **GraphQL**: Building GraphQL queries safely
- **Markdown**: Processing markdown templates

**Challenge:** Build a simple HTML escaping tag and a highlight tag.`,
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
