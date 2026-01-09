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
  id: 'regex-basics',
  title: 'Regular Expression Basics',
  difficulty: 'easy',
  category: 'Regular Expressions',
  description: `<h2>In-Depth Explanation</h2>

<p>Regular expressions (regex) are powerful patterns used to match, search, and manipulate text. In JavaScript, regex is created using the <code>RegExp</code> constructor or literal notation with forward slashes <code>/pattern/flags</code>.</p>

<p>Key regex methods in JavaScript:</p>
<ul>
  <li><strong>test()</strong>: Returns <code>true</code> if the pattern matches, <code>false</code> otherwise</li>
  <li><strong>match()</strong>: Returns an array of matches or <code>null</code></li>
  <li><strong>search()</strong>: Returns the index of the first match or <code>-1</code></li>
  <li><strong>exec()</strong>: Returns detailed match information including groups</li>
</ul>

<p>Common pattern elements:</p>
<ul>
  <li><strong>.</strong> - Matches any single character (except newline)</li>
  <li><strong>\\d</strong> - Matches any digit (0-9)</li>
  <li><strong>\\w</strong> - Matches word characters (letters, digits, underscore)</li>
  <li><strong>\\s</strong> - Matches whitespace characters</li>
  <li><strong>^</strong> - Matches start of string</li>
  <li><strong>$</strong> - Matches end of string</li>
  <li><strong>*</strong> - Matches 0 or more of the preceding element</li>
  <li><strong>+</strong> - Matches 1 or more of the preceding element</li>
  <li><strong>?</strong> - Matches 0 or 1 of the preceding element</li>
  <li><strong>[abc]</strong> - Character class, matches a, b, or c</li>
  <li><strong>[^abc]</strong> - Negated class, matches anything except a, b, c</li>
</ul>

<h2>Importance</h2>

<p>Understanding regex basics is essential because:</p>

<ul>
  <li><strong>Text Validation</strong>: Validate user input like emails, passwords, phone numbers</li>
  <li><strong>Data Extraction</strong>: Extract specific patterns from text data</li>
  <li><strong>Search and Replace</strong>: Perform complex text transformations</li>
  <li><strong>Parsing</strong>: Parse log files, configuration files, and structured text</li>
  <li><strong>Universal Skill</strong>: Regex works across almost all programming languages</li>
  <li><strong>Code Efficiency</strong>: Replace complex string logic with concise patterns</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Regex basics are used in everyday programming:</p>

<ul>
  <li><strong>Form Validation</strong>: <code>/^\\d{5}$/.test(zipCode)</code> - validate 5-digit zip</li>
  <li><strong>String Extraction</strong>: <code>text.match(/\\d+/g)</code> - extract all numbers</li>
  <li><strong>Word Counting</strong>: <code>text.match(/\\w+/g).length</code> - count words</li>
  <li><strong>URL Matching</strong>: Match and validate URLs in text</li>
  <li><strong>Log Analysis</strong>: Extract timestamps, IPs, error codes from logs</li>
  <li><strong>Code Linting</strong>: Find patterns that violate coding standards</li>
  <li><strong>Data Cleaning</strong>: Remove or replace unwanted characters</li>
</ul>

<p><strong>Challenge:</strong> Master the fundamental regex methods and patterns to test and match strings.</p>`,
  examples: [
    {
      input: `/\\d+/.test('abc123')`,
      output: `true`,
      explanation: 'Tests if the string contains one or more digits',
    },
    {
      input: `'hello world'.match(/\\w+/g)`,
      output: `['hello', 'world']`,
      explanation: 'Matches all word sequences globally',
    },
    {
      input: `/^hello/.test('hello world')`,
      output: `true`,
      explanation: 'Tests if string starts with "hello"',
    },
  ],
  starterCode: `// TODO: Create a function that checks if a string contains only letters
// Should return true for "Hello", false for "Hello123"
function isOnlyLetters(str) {
  // Hint: Use ^ and $ for start/end, [a-zA-Z] for letters
  return false;
}

// TODO: Create a function that extracts all numbers from a string
// "I have 3 cats and 2 dogs" should return ["3", "2"]
function extractNumbers(str) {
  // Hint: Use \\d+ with the global flag
  return [];
}

// TODO: Create a function that checks if a string is a valid hex color
// Should match #FFF or #FFFFFF (case insensitive)
function isValidHexColor(str) {
  // Hint: Hex digits are [0-9A-Fa-f]
  return false;
}

// TODO: Create a function that counts how many words are in a string
// "Hello world" should return 2
function countWords(str) {
  // Hint: Use \\w+ to match words
  return 0;
}

// Test your functions
console.log(isOnlyLetters('Hello'));      // true
console.log(isOnlyLetters('Hello123'));   // false
console.log(extractNumbers('I have 3 cats and 2 dogs')); // ['3', '2']
console.log(isValidHexColor('#FFF'));     // true
console.log(isValidHexColor('#FFFFFF'));  // true
console.log(isValidHexColor('#GGG'));     // false
console.log(countWords('Hello world'));   // 2`,
  solution: `// Check if a string contains only letters
function isOnlyLetters(str) {
  return /^[a-zA-Z]+$/.test(str);
}

// Extract all numbers from a string
function extractNumbers(str) {
  return str.match(/\\d+/g) || [];
}

// Check if a string is a valid hex color
function isValidHexColor(str) {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
}

// Count how many words are in a string
function countWords(str) {
  const matches = str.match(/\\w+/g);
  return matches ? matches.length : 0;
}

// Test your functions
console.log(isOnlyLetters('Hello'));      // true
console.log(isOnlyLetters('Hello123'));   // false
console.log(extractNumbers('I have 3 cats and 2 dogs')); // ['3', '2']
console.log(isValidHexColor('#FFF'));     // true
console.log(isValidHexColor('#FFFFFF'));  // true
console.log(isValidHexColor('#GGG'));     // false
console.log(countWords('Hello world'));   // 2`,
  testCases: [
    {
      input: ['Hello'],
      expectedOutput: true,
      description: 'isOnlyLetters returns true for letters only',
    },
    {
      input: ['Hello123'],
      expectedOutput: false,
      description: 'isOnlyLetters returns false when digits present',
    },
    {
      input: ['I have 3 cats and 2 dogs'],
      expectedOutput: ['3', '2'],
      description: 'extractNumbers finds all numbers in string',
    },
    {
      input: ['#FFF'],
      expectedOutput: true,
      description: 'isValidHexColor accepts 3-digit hex',
    },
    {
      input: ['#FFFFFF'],
      expectedOutput: true,
      description: 'isValidHexColor accepts 6-digit hex',
    },
    {
      input: ['#GGG'],
      expectedOutput: false,
      description: 'isValidHexColor rejects invalid hex chars',
    },
    {
      input: ['Hello world'],
      expectedOutput: 2,
      description: 'countWords counts words correctly',
    },
  ],
  hints: [
    'Use ^ to match the start and $ to match the end of a string for full string matching',
    'The global flag /g finds all matches, not just the first one',
    'test() returns a boolean, match() returns an array or null',
    'Character classes like [a-zA-Z] match any letter, [0-9] matches any digit',
    'Remember to handle the case when match() returns null (no matches found)',
  ],
};
