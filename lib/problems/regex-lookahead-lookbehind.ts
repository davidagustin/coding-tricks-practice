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
  id: 'regex-lookahead-lookbehind',
  title: 'Lookahead and Lookbehind Assertions',
  difficulty: 'hard',
  category: 'Regular Expressions',
  description: `<h2>In-Depth Explanation</h2>

<p>Lookahead and lookbehind assertions are zero-width assertions that match a position in the string based on what comes before or after it, without including that content in the match. They "look" without "consuming" characters.</p>

<p>Types of lookaround assertions:</p>
<ul>
  <li><strong>Positive Lookahead (?=...)</strong>: Match if followed by the pattern</li>
  <li><strong>Negative Lookahead (?!...)</strong>: Match if NOT followed by the pattern</li>
  <li><strong>Positive Lookbehind (?&lt;=...)</strong>: Match if preceded by the pattern</li>
  <li><strong>Negative Lookbehind (?&lt;!...)</strong>: Match if NOT preceded by the pattern</li>
</ul>

<p>Key characteristics:</p>
<ul>
  <li><strong>Zero-Width</strong>: Don't consume characters, only assert position</li>
  <li><strong>Non-Capturing</strong>: Don't create capture groups</li>
  <li><strong>Order Matters</strong>: Lookahead checks after current position, lookbehind before</li>
  <li><strong>Combinable</strong>: Multiple assertions can be combined for complex conditions</li>
</ul>

<h2>Importance</h2>

<p>Lookarounds are crucial for advanced pattern matching:</p>

<ul>
  <li><strong>Context-Sensitive Matching</strong>: Match based on surrounding context</li>
  <li><strong>Password Validation</strong>: Enforce multiple criteria simultaneously</li>
  <li><strong>Precise Extraction</strong>: Extract text near specific markers without including markers</li>
  <li><strong>Avoiding Overlap</strong>: Match patterns that would otherwise overlap</li>
  <li><strong>Complex Replacements</strong>: Replace text only in specific contexts</li>
  <li><strong>Formatting</strong>: Add separators (like commas in numbers) at specific positions</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Lookarounds solve problems that are difficult or impossible otherwise:</p>

<ul>
  <li><strong>Password Validation</strong>: <code>/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$]).{8,}$/</code></li>
  <li><strong>Number Formatting</strong>: <code>'1000000'.replace(/(?=(?:\\d{3})+$)/g, ',')</code> - Add commas</li>
  <li><strong>Extract Prices</strong>: <code>/(?<=\\$)\\d+\\.\\d{2}/</code> - Get number after $</li>
  <li><strong>Word Boundaries</strong>: <code>/(?<=\\s|^)word(?=\\s|$)/</code> - Match whole word</li>
  <li><strong>Exclude Patterns</strong>: <code>/\\d+(?!%)/</code> - Numbers not followed by %</li>
  <li><strong>Split on Pattern</strong>: Split without losing the delimiter</li>
  <li><strong>Conditional Replacement</strong>: Replace only when surrounded by specific patterns</li>
</ul>

<p><strong>Challenge:</strong> Master lookahead and lookbehind assertions for precise pattern matching.</p>`,
  examples: [
    {
      input: `'100 dollars'.match(/\\d+(?= dollars)/)`,
      output: `['100']`,
      explanation: 'Positive lookahead: match digits followed by " dollars"',
    },
    {
      input: `'$50'.match(/(?<=\\$)\\d+/)`,
      output: `['50']`,
      explanation: 'Positive lookbehind: match digits preceded by $',
    },
    {
      input: `'file.txt'.match(/\\w+(?!\\.exe)/)`,
      output: `['file']`,
      explanation: 'Negative lookahead: match word not followed by .exe',
    },
  ],
  starterCode: `// TODO: Create a function that validates a strong password
// Requirements: at least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
// Use lookaheads to check all requirements simultaneously
function isStrongPassword(password) {
  // Hint: Use multiple positive lookaheads (?=.*[pattern])
  return false;
}

// TODO: Create a function that adds commas to large numbers
// "1234567" -> "1,234,567"
function addCommas(numStr) {
  // Hint: Use lookahead to find positions where commas should go
  // (?=(...)+$) matches positions followed by groups of 3 digits
  return numStr;
}

// TODO: Create a function that extracts amounts after currency symbols
// "Price: $99.99 or EUR 50.00" -> ['99.99', '50.00']
function extractAmounts(text) {
  // Hint: Use lookbehind for $ and currency codes
  return [];
}

// TODO: Create a function that finds words NOT followed by punctuation
// "Hello, world! How are you" -> ['How', 'are']
function wordsWithoutPunctuation(text) {
  // Hint: Use negative lookahead (?![.,!?])
  return [];
}

// TODO: Create a function that replaces text only between specific markers
// "start[REPLACE]end" with marker [] should replace REPLACE
function replaceBetweenMarkers(text, replacement) {
  // Hint: Use lookbehind for [ and lookahead for ]
  return text;
}

// Test your functions
console.log(isStrongPassword('Abc123!@'));   // true
console.log(isStrongPassword('weakpass'));   // false

console.log(addCommas('1234567'));           // '1,234,567'
console.log(addCommas('1000'));              // '1,000'

console.log(extractAmounts('Price: $99.99 or EUR 50.00'));
// ['99.99', '50.00']

console.log(wordsWithoutPunctuation('Hello, world! How are you'));
// ['How', 'are']

console.log(replaceBetweenMarkers('start[REPLACE]end', 'NEW'));
// 'start[NEW]end'`,
  solution: `// Validate a strong password
// Requirements: at least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
function isStrongPassword(password) {
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{}|;':",.<>?/]).{8,}$/.test(password);
}

// Add commas to large numbers
function addCommas(numStr) {
  return numStr.replace(/\\B(?=(\\d{3})+$)/g, ',');
}

// Extract amounts after currency symbols
function extractAmounts(text) {
  const matches = text.match(/(?<=\\$|EUR\\s)\\d+\\.\\d{2}/g);
  return matches || [];
}

// Find words NOT followed by punctuation
function wordsWithoutPunctuation(text) {
  const matches = text.match(/\\b\\w+\\b(?![.,!?;:])/g);
  return matches || [];
}

// Replace text only between specific markers
function replaceBetweenMarkers(text, replacement) {
  return text.replace(/(?<=\\[)[^\\]]+(?=\\])/, replacement);
}

// Test your functions
console.log(isStrongPassword('Abc123!@'));   // true
console.log(isStrongPassword('weakpass'));   // false

console.log(addCommas('1234567'));           // '1,234,567'
console.log(addCommas('1000'));              // '1,000'

console.log(extractAmounts('Price: $99.99 or EUR 50.00'));
// ['99.99', '50.00']

console.log(wordsWithoutPunctuation('Hello, world! How are you'));
// ['How', 'are', 'you']

console.log(replaceBetweenMarkers('start[REPLACE]end', 'NEW'));
// 'start[NEW]end'`,
  testCases: [
    {
      input: ['Abc123!@'],
      expectedOutput: true,
      description: 'isStrongPassword accepts valid strong password',
    },
    {
      input: ['weakpass'],
      expectedOutput: false,
      description: 'isStrongPassword rejects weak password',
    },
    {
      input: ['1234567'],
      expectedOutput: '1,234,567',
      description: 'addCommas formats large number correctly',
    },
    {
      input: ['1000'],
      expectedOutput: '1,000',
      description: 'addCommas formats thousands correctly',
    },
    {
      input: ['Price: $99.99 or EUR 50.00'],
      expectedOutput: ['99.99', '50.00'],
      description: 'extractAmounts finds amounts after currency symbols',
    },
    {
      input: ['start[REPLACE]end', 'NEW'],
      expectedOutput: 'start[NEW]end',
      description: 'replaceBetweenMarkers replaces content between brackets',
    },
  ],
  hints: [
    'Positive lookahead (?=pattern) asserts that what follows matches the pattern',
    'Negative lookahead (?!pattern) asserts that what follows does NOT match',
    'Lookbehind (?<=pattern) and (?<!pattern) check what comes BEFORE',
    'Lookarounds are zero-width - they match a position, not characters',
    'For password validation, chain multiple lookaheads: (?=.*[A-Z])(?=.*[0-9])',
    'The \\B boundary matches positions that are NOT word boundaries - useful for inserting commas',
  ],
};
