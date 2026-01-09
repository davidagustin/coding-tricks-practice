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
  id: 'string-normalize-unicode',
  title: 'Unicode Normalization and String Comparison',
  difficulty: 'hard',
  category: 'String Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>Unicode strings can represent the same character in multiple ways. For example, "e" can be a single character (U+00E9) or "e" + combining acute accent (U+0065 + U+0301). The \<code>normalize()\</code> method converts strings to a consistent form.</p>

<p>Normalization forms:</p>
<ul>
  <li><strong>NFC</strong> (Canonical Decomposition, followed by Canonical Composition) - Most common, composes characters</li>
  <li><strong>NFD</strong> (Canonical Decomposition) - Decomposes characters into base + combining marks</li>
  <li><strong>NFKC</strong> (Compatibility Decomposition, followed by Canonical Composition) - Also normalizes compatibility characters</li>
  <li><strong>NFKD</strong> (Compatibility Decomposition) - Full decomposition including compatibility</li>
</ul>

<h2>Why This Matters</h2>

<p>Unicode normalization is crucial for:</p>

<ul>
  <li><strong>String Comparison</strong>: Two visually identical strings may not be equal without normalization</li>
  <li><strong>Searching</strong>: Find text regardless of how it was encoded</li>
  <li><strong>Sorting</strong>: Consistent sorting of international text</li>
  <li><strong>Security</strong>: Prevent homograph attacks (visually similar but different characters)</li>
  <li><strong>Database Storage</strong>: Store text in consistent form</li>
</ul>

<h2>Related String Methods</h2>

<p>Other useful methods for Unicode handling:</p>

<ul>
  <li><strong>\<code>localeCompare()\</code></strong>: Language-aware string comparison</li>
  <li><strong>\<code>toLocaleLowerCase()\</code></strong>: Locale-aware lowercase (Turkish i, etc.)</li>
  <li><strong>\<code>Intl.Collator\</code></strong>: Advanced sorting with locale support</li>
  <li><strong>\<code>String.fromCodePoint()\</code></strong>: Create string from Unicode code points</li>
  <li><strong>\<code>codePointAt()\</code></strong>: Get Unicode code point at position</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Real-world applications:</p>

<ul>
  <li><strong>Search Engines</strong>: Match accented and unaccented text</li>
  <li><strong>User Authentication</strong>: Normalize usernames before comparison</li>
  <li><strong>Internationalization</strong>: Handle text from multiple languages</li>
  <li><strong>Data Deduplication</strong>: Find duplicates with different encodings</li>
  <li><strong>Text Processing</strong>: Clean and standardize input text</li>
  <li><strong>URL Slugs</strong>: Create ASCII-safe URLs from Unicode text</li>
</ul>

<p><strong>Challenge:</strong> Implement functions that properly handle Unicode normalization and comparison.</p>`,
  examples: [
    {
      input: `'cafe\\u0301' === 'cafe'`,
      output: `false`,
      explanation: 'e + combining accent is not equal to plain e',
    },
    {
      input: `'cafe\\u0301'.normalize('NFC') === 'cafe'.normalize('NFC')`,
      output: `false`,
      explanation: 'Still not equal - one has accent, one does not',
    },
    {
      input: `'cafe\\u0301'.normalize('NFC')`,
      output: `'cafe'`,
      explanation: 'NFC composes e + accent into single character',
    },
  ],
  starterCode: `function normalizeAndCompare(str1, str2) {
  // TODO: Compare two strings after normalizing both to NFC
  // Return true if they're equal after normalization
  // 'cafe\\u0301' and 'cafe' should return true (both become 'cafe')

  return str1 === str2;
}

function removeAccents(str) {
  // TODO: Remove all accents/diacritics from a string
  // Hint: NFD decomposes, then remove combining marks (\\u0300-\\u036f)
  // 'cafe' → 'cafe'
  // 'nino' → 'nino'
  // 'Zurcher' → 'Zurcher'

  return str;
}

function safeSlug(str) {
  // TODO: Create URL-safe slug from Unicode string
  // 1. Normalize to NFKD
  // 2. Remove accents
  // 3. Convert to lowercase
  // 4. Replace spaces with hyphens
  // 5. Remove non-alphanumeric (except hyphens)
  // 'Cafe Munchen!' → 'cafe-munchen'

  return str;
}

function sortStringsLocale(strings, locale = 'en') {
  // TODO: Sort strings using locale-aware comparison
  // Handle accented characters correctly for the given locale
  // Use Intl.Collator for proper sorting

  return [...strings].sort();
}

// Test
console.log(normalizeAndCompare('cafe\\u0301', 'cafe'));
console.log(removeAccents('cafe'));
console.log(safeSlug('Cafe Munchen!'));
console.log(sortStringsLocale(['a', 'z', 'a']));`,
  solution: `function normalizeAndCompare(str1, str2) {
  // Compare two strings after normalizing both to NFC
  return str1.normalize('NFC') === str2.normalize('NFC');
}

function removeAccents(str) {
  // NFD decomposes, then remove combining marks (\\u0300-\\u036f)
  return str.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
}

function safeSlug(str) {
  // Create URL-safe slug from Unicode string
  return str
    .normalize('NFKD')                    // 1. Normalize to NFKD
    .replace(/[\\u0300-\\u036f]/g, '')     // 2. Remove accents
    .toLowerCase()                        // 3. Convert to lowercase
    .replace(/\\s+/g, '-')                 // 4. Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '')           // 5. Remove non-alphanumeric (except hyphens)
    .replace(/-+/g, '-')                  // Remove multiple consecutive hyphens
    .replace(/^-|-$/g, '');               // Remove leading/trailing hyphens
}

function sortStringsLocale(strings, locale = 'en') {
  // Sort strings using locale-aware comparison
  const collator = new Intl.Collator(locale, { sensitivity: 'base' });
  return [...strings].sort((a, b) => collator.compare(a, b));
}

// Test
console.log(normalizeAndCompare('cafe\\u0301', 'caf\\u00e9'));
console.log(removeAccents('caf\\u00e9'));
console.log(safeSlug('Caf\\u00e9 M\\u00fcnchen!'));
console.log(sortStringsLocale(['\\u00e0', 'z', 'a']));`,
  testCases: [
    {
      input: { str1: 'cafe\u0301', str2: 'caf\u00e9' },
      expectedOutput: true,
      description: 'normalizeAndCompare returns true for equivalent unicode strings',
    },
    {
      input: { str: 'caf\u00e9' },
      expectedOutput: 'cafe',
      description: 'removeAccents removes accent from e',
    },
    {
      input: { str: 'Caf\u00e9 M\u00fcnchen!' },
      expectedOutput: 'cafe-munchen',
      description: 'safeSlug creates URL-safe slug from unicode string',
    },
    {
      input: { strings: ['\u00e0', 'z', 'a'], locale: 'en' },
      expectedOutput: ['a', '\u00e0', 'z'],
      description: 'sortStringsLocale sorts with locale awareness',
    },
  ],
  hints: [
    'normalize("NFC") composes characters, normalize("NFD") decomposes them',
    'After NFD normalization, combining marks are in range U+0300 to U+036F',
    'NFKD also normalizes compatibility characters like ligatures and special forms',
    'Intl.Collator with sensitivity: "base" ignores accents and case for sorting',
    'Always normalize before comparing strings that might come from different sources',
  ],
};
