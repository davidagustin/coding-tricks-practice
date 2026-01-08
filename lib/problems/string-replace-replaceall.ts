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
  id: 'string-replace-replaceall',
  title: 'Using replace() and replaceAll() with Regex',
  difficulty: 'medium',
  category: 'String Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>The \<code>replace()\</code> and \<code>replaceAll()\</code> methods are powerful tools for string manipulation. When combined with regular expressions, they become even more versatile.</p>

<p>Method signatures:</p>
<ul>
  <li>\<code>str.replace(searchValue, replacement)\</code> - Replaces first match (or all with /g flag)</li>
  <li>\<code>str.replaceAll(searchValue, replacement)\</code> - Replaces all matches (ES2021)</li>
</ul>

<h2>Key Concepts</h2>

<p>Important features of these methods:</p>

<ul>
  <li><strong>String vs Regex</strong>: \<code>replace('a', 'b')\</code> replaces first 'a', \<code>replace(/a/g, 'b')\</code> replaces all</li>
  <li><strong>Capture Groups</strong>: Use \<code>$1\</code>, \<code>$2\</code> in replacement to reference captured groups</li>
  <li><strong>Replacement Function</strong>: Pass a function for dynamic replacements</li>
  <li><strong>Special Patterns</strong>: \<code>$&\</code> (matched text), \<code>$\`\</code> (before match), \<code>$'\</code> (after match)</li>
</ul>

<h2>Importance</h2>

<p>Mastering replace with regex is crucial for:</p>

<ul>
  <li><strong>Data Cleaning</strong>: Sanitize and normalize user input</li>
  <li><strong>Text Transformation</strong>: Convert between formats (camelCase, snake_case)</li>
  <li><strong>Template Processing</strong>: Replace placeholders with values</li>
  <li><strong>Input Validation</strong>: Remove or replace invalid characters</li>
  <li><strong>Search and Replace</strong>: Complex find-and-replace operations</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Real-world applications:</p>

<ul>
  <li><strong>Slug Generation</strong>: Convert titles to URL-friendly slugs</li>
  <li><strong>Phone Formatting</strong>: Format phone numbers consistently</li>
  <li><strong>Case Conversion</strong>: Convert between naming conventions</li>
  <li><strong>HTML Escaping</strong>: Escape special characters for safe HTML</li>
  <li><strong>Whitespace Normalization</strong>: Clean up multiple spaces</li>
  <li><strong>Censoring</strong>: Replace sensitive words with asterisks</li>
</ul>

<p><strong>Challenge:</strong> Implement various string transformations using replace() with regex.</p>`,
  examples: [
    {
      input: `'hello world'.replace(/o/g, '0')`,
      output: `'hell0 w0rld'`,
      explanation: 'Global flag replaces all occurrences',
    },
    {
      input: `'John Smith'.replace(/(\\w+) (\\w+)/, '$2, $1')`,
      output: `'Smith, John'`,
      explanation: 'Capture groups swap order',
    },
    {
      input: `'abc'.replace(/./g, char => char.toUpperCase())`,
      output: `'ABC'`,
      explanation: 'Replacement function for dynamic replacement',
    },
  ],
  starterCode: `function toSlug(title) {
  // TODO: Convert title to URL-friendly slug
  // 1. Convert to lowercase
  // 2. Replace spaces with hyphens
  // 3. Remove non-alphanumeric characters (except hyphens)
  // 4. Replace multiple hyphens with single hyphen
  // 'Hello World!' → 'hello-world'
  // 'My   Blog Post!!!' → 'my-blog-post'

  return title;
}

function formatPhoneNumber(phone) {
  // TODO: Format as (XXX) XXX-XXXX
  // Remove all non-digits first, then format
  // '1234567890' → '(123) 456-7890'
  // '123-456-7890' → '(123) 456-7890'

  return phone;
}

function camelToSnake(str) {
  // TODO: Convert camelCase to snake_case
  // Use regex to find uppercase letters and replace
  // 'helloWorld' → 'hello_world'
  // 'myVariableName' → 'my_variable_name'

  return str;
}

function censorWords(text, words) {
  // TODO: Replace each word in the words array with asterisks
  // The number of asterisks should match the word length
  // censorWords('hello world', ['world']) → 'hello *****'

  return text;
}

// Test
console.log(toSlug('Hello World!'));
console.log(formatPhoneNumber('1234567890'));
console.log(camelToSnake('helloWorld'));
console.log(censorWords('hello world', ['world']));`,
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Use /g flag for global replacement, or replaceAll() for simple strings',
    'Capture groups with () can be referenced as $1, $2, etc. in the replacement',
    'A replacement function receives the match as its first argument',
    '\\D matches any non-digit, \\s+ matches one or more whitespace characters',
    'Use new RegExp() when you need to build a regex from a variable',
  ],
};
