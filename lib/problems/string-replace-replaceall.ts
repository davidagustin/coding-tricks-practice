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
  solution: `function toSlug(title) {
  // Convert title to URL-friendly slug
  return title
    .toLowerCase()                    // 1. Convert to lowercase
    .replace(/\\s+/g, '-')             // 2. Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '')       // 3. Remove non-alphanumeric (except hyphens)
    .replace(/-+/g, '-')              // 4. Replace multiple hyphens with single
    .replace(/^-|-$/g, '');           // Remove leading/trailing hyphens
}

function formatPhoneNumber(phone) {
  // Format as (XXX) XXX-XXXX
  const digits = phone.replace(/\\D/g, '');
  return digits.replace(/(\\d{3})(\\d{3})(\\d{4})/, '($1) $2-$3');
}

function camelToSnake(str) {
  // Convert camelCase to snake_case
  return str.replace(/[A-Z]/g, letter => '_' + letter.toLowerCase());
}

function censorWords(text, words) {
  // Replace each word with asterisks matching the word length
  let result = text;
  for (const word of words) {
    const regex = new RegExp(word, 'gi');
    result = result.replace(regex, match => '*'.repeat(match.length));
  }
  return result;
}

// Test
console.log(toSlug('Hello World!'));
console.log(formatPhoneNumber('1234567890'));
console.log(camelToSnake('helloWorld'));
console.log(censorWords('hello world', ['world']));`,
  testCases: [
    {
      input: ['Hello World!'],
      expectedOutput: 'hello-world',
      description: 'toSlug converts title to URL-friendly slug',
    },
    {
      input: ['My   Blog Post!!!'],
      expectedOutput: 'my-blog-post',
      description: 'toSlug handles multiple spaces and special chars',
    },
    {
      input: ['1234567890'],
      expectedOutput: '(123) 456-7890',
      description: 'formatPhoneNumber formats digits correctly',
    },
    {
      input: ['123-456-7890'],
      expectedOutput: '(123) 456-7890',
      description: 'formatPhoneNumber handles existing formatting',
    },
    {
      input: ['helloWorld'],
      expectedOutput: 'hello_world',
      description: 'camelToSnake converts camelCase to snake_case',
    },
    {
      input: ['hello world', ['world']],
      expectedOutput: 'hello *****',
      description: 'censorWords replaces words with asterisks',
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
