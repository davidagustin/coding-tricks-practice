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
  id: 'regex-replace-patterns',
  title: 'Advanced Replace Patterns with Backreferences',
  difficulty: 'medium',
  category: 'Regular Expressions',
  description: `<h2>In-Depth Explanation</h2>

<p>The <code>replace()</code> method becomes incredibly powerful when combined with regex patterns and backreferences. Backreferences allow you to reference captured groups in the replacement string or function, enabling complex text transformations.</p>

<p>Replacement string special patterns:</p>
<ul>
  <li><strong>$1, $2, ...</strong>: Insert the nth captured group</li>
  <li><strong>$&</strong>: Insert the entire matched string</li>
  <li><strong>$\`</strong>: Insert the portion before the match</li>
  <li><strong>$'</strong>: Insert the portion after the match</li>
  <li><strong>$$</strong>: Insert a literal dollar sign</li>
  <li><strong>$&lt;name&gt;</strong>: Insert a named capture group</li>
</ul>

<p>Replacement function parameters:</p>
<ul>
  <li><strong>match</strong>: The full matched string</li>
  <li><strong>p1, p2, ...</strong>: Captured groups</li>
  <li><strong>offset</strong>: Position of match in the string</li>
  <li><strong>string</strong>: The entire input string</li>
  <li><strong>groups</strong>: Named groups object (if any)</li>
</ul>

<h2>Importance</h2>

<p>Advanced replace patterns are essential for:</p>

<ul>
  <li><strong>Text Transformation</strong>: Convert between formats efficiently</li>
  <li><strong>Data Normalization</strong>: Standardize varied input formats</li>
  <li><strong>Code Refactoring</strong>: Batch rename variables, functions, patterns</li>
  <li><strong>Template Processing</strong>: Replace placeholders with values</li>
  <li><strong>Sanitization</strong>: Clean and transform user input</li>
  <li><strong>Log Processing</strong>: Reformat log entries</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Replace patterns are used in many scenarios:</p>

<ul>
  <li><strong>Date Reformatting</strong>: <code>'2024-01-15'.replace(/(\\d+)-(\\d+)-(\\d+)/, '$2/$3/$1')</code></li>
  <li><strong>Case Conversion</strong>: Convert camelCase to snake_case or vice versa</li>
  <li><strong>URL Rewriting</strong>: Transform URL structures</li>
  <li><strong>Masking Data</strong>: <code>'1234-5678'.replace(/(\\d{4})-(\\d{4})/, '****-$2')</code></li>
  <li><strong>HTML Escaping</strong>: Replace special characters with entities</li>
  <li><strong>Markdown Processing</strong>: Convert markdown to HTML</li>
  <li><strong>String Templating</strong>: Replace variables in template strings</li>
</ul>

<p><strong>Challenge:</strong> Master backreferences and replacement functions for powerful text transformations.</p>`,
  examples: [
    {
      input: `'John Smith'.replace(/(\\w+) (\\w+)/, '$2, $1')`,
      output: `'Smith, John'`,
      explanation: 'Backreferences swap first and last name',
    },
    {
      input: `'hello'.replace(/./g, (m, i) => i === 0 ? m.toUpperCase() : m)`,
      output: `'Hello'`,
      explanation: 'Replacement function capitalizes first letter',
    },
    {
      input: `'abc'.replace(/./g, '$&$&')`,
      output: `'aabbcc'`,
      explanation: '$& doubles each matched character',
    },
  ],
  starterCode: `// TODO: Create a function that converts camelCase to snake_case
// "getUserName" -> "get_user_name"
function camelToSnake(str) {
  // Hint: Match uppercase letters and replace with _lowercase
  return str;
}

// TODO: Create a function that masks all but the last 4 digits of a number
// "1234567890" -> "******7890"
function maskNumber(str) {
  // Hint: Match digits, use replacement function to check position
  return str;
}

// TODO: Create a function that converts markdown bold **text** to HTML <strong>text</strong>
// "This is **bold** text" -> "This is <strong>bold</strong> text"
function markdownBoldToHtml(str) {
  // Hint: Match **...** and use backreference for content
  return str;
}

// TODO: Create a function that reformats dates from YYYY-MM-DD to MM/DD/YYYY
// "2024-01-15" -> "01/15/2024"
function reformatDate(dateStr) {
  // Hint: Capture year, month, day groups and reorder
  return dateStr;
}

// TODO: Create a function that wraps all numbers in a string with <span class="number">
// "I have 3 cats and 12 dogs" -> "I have <span class=\"number\">3</span> cats and <span class=\"number\">12</span> dogs"
function wrapNumbers(str) {
  // Hint: Use $& to reference the full match
  return str;
}

// Test your functions
console.log(camelToSnake('getUserName'));
// 'get_user_name'

console.log(maskNumber('1234567890'));
// '******7890'

console.log(markdownBoldToHtml('This is **bold** text'));
// 'This is <strong>bold</strong> text'

console.log(reformatDate('2024-01-15'));
// '01/15/2024'

console.log(wrapNumbers('I have 3 cats and 12 dogs'));
// 'I have <span class="number">3</span> cats and <span class="number">12</span> dogs'`,
  solution: `// Convert camelCase to snake_case
function camelToSnake(str) {
  // Match uppercase letters and replace with _lowercase
  return str.replace(/([A-Z])/g, (match) => '_' + match.toLowerCase());
}

// Mask all but the last 4 digits of a number
function maskNumber(str) {
  // Replace all digits except the last 4 with asterisks
  return str.replace(/\\d(?=\\d{4})/g, '*');
}

// Convert markdown bold **text** to HTML <strong>text</strong>
function markdownBoldToHtml(str) {
  // Match **...** and capture content, use backreference in replacement
  return str.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>');
}

// Reformat dates from YYYY-MM-DD to MM/DD/YYYY
function reformatDate(dateStr) {
  // Capture year, month, day groups and reorder them
  return dateStr.replace(/(\\d{4})-(\\d{2})-(\\d{2})/g, '$2/$3/$1');
}

// Wrap all numbers in a string with <span class="number">
function wrapNumbers(str) {
  // Use $& to reference the full match
  return str.replace(/\\d+/g, '<span class="number">$&</span>');
}

// Test your functions
console.log(camelToSnake('getUserName')); // 'get_user_name'
console.log(maskNumber('1234567890'));    // '******7890'
console.log(markdownBoldToHtml('This is **bold** text')); // 'This is <strong>bold</strong> text'
console.log(reformatDate('2024-01-15')); // '01/15/2024'
console.log(wrapNumbers('I have 3 cats and 12 dogs')); // 'I have <span class="number">3</span> cats and <span class="number">12</span> dogs'`,
  testCases: [
    {
      input: ['getUserName'],
      expectedOutput: 'get_user_name',
      description: 'camelToSnake should convert camelCase to snake_case',
    },
    {
      input: ['1234567890'],
      expectedOutput: '******7890',
      description: 'maskNumber should mask all but last 4 digits',
    },
    {
      input: ['This is **bold** text'],
      expectedOutput: 'This is <strong>bold</strong> text',
      description: 'markdownBoldToHtml should convert **text** to <strong>text</strong>',
    },
    {
      input: ['2024-01-15'],
      expectedOutput: '01/15/2024',
      description: 'reformatDate should reformat YYYY-MM-DD to MM/DD/YYYY',
    },
    {
      input: ['I have 3 cats and 12 dogs'],
      expectedOutput: 'I have <span class="number">3</span> cats and <span class="number">12</span> dogs',
      description: 'wrapNumbers should wrap numbers with span tags',
    },
  ],
  hints: [
    'Use $1, $2, etc. in the replacement string to reference captured groups',
    'Use $& to reference the entire match in the replacement',
    'Replacement functions receive (match, p1, p2, ..., offset, string, groups)',
    'The offset parameter in replacement functions tells you the position of the match',
    'For global replacements, always use the /g flag',
    'Named groups can be referenced with $<name> in the replacement string',
  ],
};
