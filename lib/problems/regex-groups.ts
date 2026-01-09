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
  id: 'regex-groups',
  title: 'Capturing Groups and Named Groups',
  difficulty: 'medium',
  category: 'Regular Expressions',
  description: `<h2>In-Depth Explanation</h2>

<p>Capturing groups in regular expressions allow you to extract specific parts of a matched string. Groups are created using parentheses <code>()</code> and can be accessed by their index or, with named groups, by a descriptive name.</p>

<p>Types of groups:</p>
<ul>
  <li><strong>Capturing Groups ()</strong>: Capture matched content for later use, accessed by index</li>
  <li><strong>Named Groups (?&lt;name&gt;)</strong>: Capture with a name for clearer, more maintainable code</li>
  <li><strong>Non-Capturing Groups (?:)</strong>: Group without capturing, useful for alternation</li>
</ul>

<p>Accessing captured groups:</p>
<ul>
  <li><strong>match()</strong>: Returns array where index 0 is full match, 1+ are groups</li>
  <li><strong>exec()</strong>: Same as match(), plus <code>.groups</code> for named groups</li>
  <li><strong>matchAll()</strong>: Iterator of all matches with groups (requires /g flag)</li>
  <li><strong>replace()</strong>: Use <code>$1, $2</code> or <code>$&lt;name&gt;</code> for backreferences</li>
</ul>

<h2>Importance</h2>

<p>Capturing groups are essential for:</p>

<ul>
  <li><strong>Data Extraction</strong>: Pull specific parts from complex strings</li>
  <li><strong>Parsing</strong>: Extract components from formatted data (dates, URLs, logs)</li>
  <li><strong>Transformation</strong>: Rearrange or reformat matched content</li>
  <li><strong>Validation with Details</strong>: Not just validate, but extract the valid parts</li>
  <li><strong>Readable Patterns</strong>: Named groups make regex self-documenting</li>
  <li><strong>Maintainability</strong>: Named groups survive pattern modifications</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Groups are used extensively in real-world applications:</p>

<ul>
  <li><strong>Date Parsing</strong>: <code>/(?&lt;year&gt;\\d{4})-(?&lt;month&gt;\\d{2})-(?&lt;day&gt;\\d{2})/</code></li>
  <li><strong>URL Parsing</strong>: Extract protocol, domain, path, query parameters</li>
  <li><strong>Log Analysis</strong>: Parse timestamps, log levels, messages from log lines</li>
  <li><strong>Name Extraction</strong>: <code>/(?&lt;first&gt;\\w+)\\s+(?&lt;last&gt;\\w+)/</code></li>
  <li><strong>Version Numbers</strong>: <code>/(?&lt;major&gt;\\d+)\\.(?&lt;minor&gt;\\d+)\\.(?&lt;patch&gt;\\d+)/</code></li>
  <li><strong>HTML/XML Parsing</strong>: Extract tag names and attributes</li>
  <li><strong>String Reformatting</strong>: Convert between date formats, name formats, etc.</li>
</ul>

<p><strong>Challenge:</strong> Master capturing groups and named groups to extract and transform data from strings.</p>`,
  examples: [
    {
      input: `'John Doe'.match(/(?<first>\\w+)\\s+(?<last>\\w+)/)`,
      output: `{ groups: { first: 'John', last: 'Doe' } }`,
      explanation: 'Named groups extract first and last name',
    },
    {
      input: `'2024-01-15'.match(/(\\d{4})-(\\d{2})-(\\d{2})/)`,
      output: `['2024-01-15', '2024', '01', '15']`,
      explanation: 'Capturing groups extract year, month, day by index',
    },
    {
      input: `'hello'.replace(/(.)(.)/g, '$2$1')`,
      output: `'ehllo'`,
      explanation: 'Backreferences swap first two characters',
    },
  ],
  starterCode: `// TODO: Create a function that parses a date string "YYYY-MM-DD"
// and returns an object with year, month, day as numbers
// "2024-01-15" -> { year: 2024, month: 1, day: 15 }
function parseDate(dateStr) {
  // Hint: Use named groups (?<year>\\d{4}) etc.
  return { year: 0, month: 0, day: 0 };
}

// TODO: Create a function that extracts the protocol, domain, and path from a URL
// "https://example.com/path/to/page" -> { protocol: 'https', domain: 'example.com', path: '/path/to/page' }
function parseURL(url) {
  // Hint: Protocol is letters before ://, domain is after //, path starts with /
  return { protocol: '', domain: '', path: '' };
}

// TODO: Create a function that converts "lastName, firstName" to "firstName lastName"
// "Doe, John" -> "John Doe"
function flipName(name) {
  // Hint: Use replace with capturing groups and backreferences $1, $2
  return name;
}

// TODO: Create a function that extracts all key-value pairs from a query string
// "name=John&age=30&city=NYC" -> { name: 'John', age: '30', city: 'NYC' }
function parseQueryString(queryStr) {
  // Hint: Use matchAll with global flag and named groups
  return {};
}

// Test your functions
console.log(parseDate('2024-01-15'));
// { year: 2024, month: 1, day: 15 }

console.log(parseURL('https://example.com/path/to/page'));
// { protocol: 'https', domain: 'example.com', path: '/path/to/page' }

console.log(flipName('Doe, John'));
// 'John Doe'

console.log(parseQueryString('name=John&age=30&city=NYC'));
// { name: 'John', age: '30', city: 'NYC' }`,
  solution: `// Parse a date string "YYYY-MM-DD" and return object with year, month, day
function parseDate(dateStr) {
  const match = dateStr.match(/^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$/);
  if (!match || !match.groups) return { year: 0, month: 0, day: 0 };
  return {
    year: parseInt(match.groups.year, 10),
    month: parseInt(match.groups.month, 10),
    day: parseInt(match.groups.day, 10)
  };
}

// Extract protocol, domain, and path from a URL
function parseURL(url) {
  const match = url.match(/^(?<protocol>[a-z]+):\\/\\/(?<domain>[^/]+)(?<path>\\/.*)?$/);
  if (!match || !match.groups) return { protocol: '', domain: '', path: '' };
  return {
    protocol: match.groups.protocol,
    domain: match.groups.domain,
    path: match.groups.path || ''
  };
}

// Convert "lastName, firstName" to "firstName lastName"
function flipName(name) {
  return name.replace(/(\\w+),\\s*(\\w+)/, '$2 $1');
}

// Extract all key-value pairs from a query string
function parseQueryString(queryStr) {
  const result = {};
  const regex = /(?<key>[^&=]+)=(?<value>[^&]*)/g;
  let match;
  while ((match = regex.exec(queryStr)) !== null) {
    if (match.groups) {
      result[match.groups.key] = match.groups.value;
    }
  }
  return result;
}

// Test your functions
console.log(parseDate('2024-01-15'));
// { year: 2024, month: 1, day: 15 }

console.log(parseURL('https://example.com/path/to/page'));
// { protocol: 'https', domain: 'example.com', path: '/path/to/page' }

console.log(flipName('Doe, John'));
// 'John Doe'

console.log(parseQueryString('name=John&age=30&city=NYC'));
// { name: 'John', age: '30', city: 'NYC' }`,
  testCases: [
    {
      input: ['2024-01-15'],
      expectedOutput: { year: 2024, month: 1, day: 15 },
      description: 'parseDate extracts year, month, day correctly',
    },
    {
      input: ['https://example.com/path/to/page'],
      expectedOutput: { protocol: 'https', domain: 'example.com', path: '/path/to/page' },
      description: 'parseURL extracts protocol, domain, path',
    },
    {
      input: ['Doe, John'],
      expectedOutput: 'John Doe',
      description: 'flipName swaps lastName, firstName to firstName lastName',
    },
    {
      input: ['name=John&age=30&city=NYC'],
      expectedOutput: { name: 'John', age: '30', city: 'NYC' },
      description: 'parseQueryString extracts all key-value pairs',
    },
  ],
  hints: [
    'Named groups use the syntax (?<name>pattern) and are accessed via match.groups.name',
    'Use matchAll() with the global flag to iterate over all matches with their groups',
    'In replace(), use $1, $2 for numbered groups or $<name> for named groups',
    'Non-capturing groups (?:) are useful when you need grouping but not capturing',
    'Always check if match returns null before accessing groups',
  ],
};
