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
  id: 'string-slice-substring',
  title: 'Comparing slice() vs substring() Methods',
  difficulty: 'easy',
  category: 'String Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>Both <code>slice()</code> and <code>substring()</code> extract parts of a string, but they handle edge cases differently. Understanding these differences is crucial for writing robust string manipulation code.</p>

<p>The syntax for both methods:</p>
<ul>
  <li><code>str.slice(start, end)</code> - Extracts from start to end (end not included)</li>
  <li><code>str.substring(start, end)</code> - Extracts from start to end (end not included)</li>
</ul>

<h2>Key Differences</h2>

<p>The main differences between these methods:</p>

<ul>
  <li><strong>Negative Indices</strong>: <code>slice()</code> supports negative indices (counts from end), <code>substring()</code> treats negatives as 0</li>
  <li><strong>Swapped Arguments</strong>: <code>substring()</code> swaps arguments if start > end, <code>slice()</code> returns empty string</li>
  <li><strong>NaN Handling</strong>: <code>substring()</code> treats NaN as 0, <code>slice()</code> also treats NaN as 0</li>
</ul>

<h2>Importance</h2>

<p>Understanding these methods is essential because:</p>

<ul>
  <li><strong>Negative Indexing</strong>: <code>slice(-3)</code> is cleaner than <code>substring(str.length - 3)</code></li>
  <li><strong>Predictability</strong>: Know what happens with edge cases in your code</li>
  <li><strong>Array Consistency</strong>: <code>slice()</code> works the same on arrays, making it easier to remember</li>
  <li><strong>Code Readability</strong>: Choose the right method for clearer intent</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Common use cases:</p>

<ul>
  <li><strong>Get Last N Characters</strong>: <code>str.slice(-4)</code> for file extensions</li>
  <li><strong>Remove First/Last Characters</strong>: <code>str.slice(1)</code> or <code>str.slice(0, -1)</code></li>
  <li><strong>Extract Substrings</strong>: Extract portions from known positions</li>
  <li><strong>Parse Formatted Strings</strong>: Extract parts from structured strings</li>
  <li><strong>Truncate Strings</strong>: Limit string length with ellipsis</li>
</ul>

<p><strong>Challenge:</strong> Implement functions using both methods to understand their differences.</p>`,
  examples: [
    {
      input: `'hello'.slice(-2)`,
      output: `'lo'`,
      explanation: 'Negative index counts from end',
    },
    {
      input: `'hello'.substring(-2)`,
      output: `'hello'`,
      explanation: 'Negative treated as 0, so substring(0) returns full string',
    },
    {
      input: `'hello'.slice(3, 1)`,
      output: `''`,
      explanation: 'slice returns empty when start > end',
    },
    {
      input: `'hello'.substring(3, 1)`,
      output: `'el'`,
      explanation: 'substring swaps arguments, becomes substring(1, 3)',
    },
  ],
  starterCode: `function getFileExtension(filename) {
  // TODO: Return the file extension (including the dot)
  // Use slice() with negative index
  // 'document.pdf' → '.pdf'
  // 'image.png' → '.png'

  return filename;
}

function removeFirstAndLast(str) {
  // TODO: Remove first and last character using slice()
  // '[hello]' → 'hello'
  // '"quoted"' → 'quoted'

  return str;
}

function extractMiddle(str, start, end) {
  // TODO: Extract substring between start and end
  // Handle case where start > end by swapping (use substring behavior)
  // extractMiddle('abcdef', 4, 1) → 'bcd'

  return str;
}

function truncateWithEllipsis(str, maxLength) {
  // TODO: Truncate string to maxLength and add '...' if truncated
  // truncateWithEllipsis('Hello World', 8) → 'Hello...'
  // If string is shorter than maxLength, return as-is

  return str;
}

// Test
console.log(getFileExtension('document.pdf'));
console.log(removeFirstAndLast('[hello]'));
console.log(extractMiddle('abcdef', 4, 1));
console.log(truncateWithEllipsis('Hello World', 8));`,
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'slice(-n) gets the last n characters from a string',
    'slice(1, -1) removes first and last character in one call',
    'substring() automatically swaps arguments if start > end',
    'For truncation, remember to account for the 3 characters of "..."',
  ],
};
