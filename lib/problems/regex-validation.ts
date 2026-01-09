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
  id: 'regex-validation',
  title: 'Common Validation Patterns',
  difficulty: 'medium',
  category: 'Regular Expressions',
  description: `<h2>In-Depth Explanation</h2>

<p>Input validation is one of the most practical applications of regular expressions. Well-crafted regex patterns can validate emails, phone numbers, URLs, credit cards, and more. Understanding validation patterns is essential for building robust applications.</p>

<p>Key validation pattern components:</p>
<ul>
  <li><strong>Anchors ^$</strong>: Ensure the entire string matches, not just a substring</li>
  <li><strong>Quantifiers {n,m}</strong>: Specify exact length requirements</li>
  <li><strong>Character Classes</strong>: Define allowed characters for each position</li>
  <li><strong>Alternation |</strong>: Allow multiple valid formats</li>
  <li><strong>Optional Groups ?</strong>: Handle optional parts like country codes</li>
</ul>

<p>Common validation patterns:</p>
<ul>
  <li><strong>Email</strong>: Local part + @ + domain with proper structure</li>
  <li><strong>Phone</strong>: Various formats with optional country code, parentheses, dashes</li>
  <li><strong>URL</strong>: Protocol, domain, optional port, path, query string</li>
  <li><strong>Credit Card</strong>: 16 digits with optional separators</li>
  <li><strong>Date</strong>: Various formats (YYYY-MM-DD, MM/DD/YYYY, etc.)</li>
  <li><strong>IP Address</strong>: Four octets (0-255) separated by dots</li>
</ul>

<h2>Importance</h2>

<p>Validation patterns are critical for:</p>

<ul>
  <li><strong>Security</strong>: Prevent injection attacks and malformed input</li>
  <li><strong>Data Quality</strong>: Ensure consistent, properly formatted data</li>
  <li><strong>User Experience</strong>: Provide immediate feedback on input errors</li>
  <li><strong>API Contracts</strong>: Validate data before processing</li>
  <li><strong>Database Integrity</strong>: Ensure data meets schema requirements</li>
  <li><strong>Compliance</strong>: Meet format requirements for standards (e.g., email RFC)</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Validation patterns are used throughout web development:</p>

<ul>
  <li><strong>Form Validation</strong>: Real-time validation as users type</li>
  <li><strong>API Validation</strong>: Validate request payloads before processing</li>
  <li><strong>Configuration</strong>: Validate config file values</li>
  <li><strong>Import/Export</strong>: Validate data during CSV/JSON import</li>
  <li><strong>Search</strong>: Validate search query formats</li>
  <li><strong>User Registration</strong>: Username, password, email requirements</li>
  <li><strong>Payment Processing</strong>: Credit card and CVV validation</li>
</ul>

<p><strong>Challenge:</strong> Create robust validation functions for common input formats.</p>`,
  examples: [
    {
      input: `/^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$/.test('user@example.com')`,
      output: `true`,
      explanation: 'Basic email validation pattern',
    },
    {
      input: `/^\\(?\\d{3}\\)?[-. ]?\\d{3}[-. ]?\\d{4}$/.test('(555) 123-4567')`,
      output: `true`,
      explanation: 'US phone number with various formats',
    },
    {
      input: `/^\\d{4}-\\d{2}-\\d{2}$/.test('2024-01-15')`,
      output: `true`,
      explanation: 'ISO date format validation',
    },
  ],
  starterCode: `// TODO: Create an email validator
// Should handle: user@domain.com, user.name@domain.co.uk, user+tag@domain.org
function isValidEmail(email) {
  // Hint: Local part can have letters, digits, dots, underscores, hyphens, plus
  // Domain has letters, digits, hyphens, with 2-6 letter TLD
  return false;
}

// TODO: Create a US phone number validator
// Should handle: (555) 123-4567, 555-123-4567, 555.123.4567, 5551234567
function isValidUSPhone(phone) {
  // Hint: Area code can be in (), digits separated by -, ., space, or nothing
  return false;
}

// TODO: Create a URL validator
// Should handle: http://example.com, https://sub.domain.org/path?query=1
function isValidURL(url) {
  // Hint: Protocol (http/https), optional www, domain, optional port/path/query
  return false;
}

// TODO: Create an IPv4 address validator
// Each octet should be 0-255: 192.168.1.1, 0.0.0.0, 255.255.255.255
function isValidIPv4(ip) {
  // Hint: Each octet is 0-9, 10-99, 100-199, 200-249, or 250-255
  return false;
}

// TODO: Create a credit card number validator (basic format check)
// Should accept 16 digits with optional spaces/dashes: 1234-5678-9012-3456
function isValidCreditCard(cardNum) {
  // Hint: 16 digits, optionally grouped by 4 with separators
  return false;
}

// Test your functions
console.log(isValidEmail('user@example.com'));        // true
console.log(isValidEmail('user.name+tag@domain.co.uk')); // true
console.log(isValidEmail('invalid-email'));           // false

console.log(isValidUSPhone('(555) 123-4567'));        // true
console.log(isValidUSPhone('555.123.4567'));          // true
console.log(isValidUSPhone('123'));                   // false

console.log(isValidURL('https://example.com/path'));  // true
console.log(isValidURL('not-a-url'));                 // false

console.log(isValidIPv4('192.168.1.1'));              // true
console.log(isValidIPv4('256.1.1.1'));                // false

console.log(isValidCreditCard('1234-5678-9012-3456')); // true
console.log(isValidCreditCard('1234567890123456'));    // true`,
  solution: `// Email validator
function isValidEmail(email) {
  return /^[\\w.+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$/.test(email);
}

// US phone number validator
function isValidUSPhone(phone) {
  return /^\\(?\\d{3}\\)?[-. ]?\\d{3}[-. ]?\\d{4}$/.test(phone);
}

// URL validator
function isValidURL(url) {
  return /^https?:\\/\\/([\\w-]+\\.)+[\\w-]+(\\/[\\w-./?%&=]*)?$/.test(url);
}

// IPv4 address validator
function isValidIPv4(ip) {
  const octet = '(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)';
  const regex = new RegExp(\`^\${octet}\\\\.\${octet}\\\\.\${octet}\\\\.\${octet}$\`);
  return regex.test(ip);
}

// Credit card number validator (basic format check)
function isValidCreditCard(cardNum) {
  // Remove separators and check for 16 digits
  const cleaned = cardNum.replace(/[-\\s]/g, '');
  return /^\\d{16}$/.test(cleaned);
}

// Test your functions
console.log(isValidEmail('user@example.com'));        // true
console.log(isValidEmail('user.name+tag@domain.co.uk')); // true
console.log(isValidEmail('invalid-email'));           // false

console.log(isValidUSPhone('(555) 123-4567'));        // true
console.log(isValidUSPhone('555.123.4567'));          // true
console.log(isValidUSPhone('123'));                   // false

console.log(isValidURL('https://example.com/path'));  // true
console.log(isValidURL('not-a-url'));                 // false

console.log(isValidIPv4('192.168.1.1'));              // true
console.log(isValidIPv4('256.1.1.1'));                // false

console.log(isValidCreditCard('1234-5678-9012-3456')); // true
console.log(isValidCreditCard('1234567890123456'));    // true`,
  testCases: [
    {
      input: ['user@example.com'],
      expectedOutput: true,
      description: 'isValidEmail accepts valid email',
    },
    {
      input: ['user.name+tag@domain.co.uk'],
      expectedOutput: true,
      description: 'isValidEmail accepts email with dots and plus',
    },
    {
      input: ['invalid-email'],
      expectedOutput: false,
      description: 'isValidEmail rejects invalid email',
    },
    {
      input: ['(555) 123-4567'],
      expectedOutput: true,
      description: 'isValidUSPhone accepts phone with parentheses',
    },
    {
      input: ['555.123.4567'],
      expectedOutput: true,
      description: 'isValidUSPhone accepts phone with dots',
    },
    {
      input: ['https://example.com/path'],
      expectedOutput: true,
      description: 'isValidURL accepts valid URL',
    },
    {
      input: ['192.168.1.1'],
      expectedOutput: true,
      description: 'isValidIPv4 accepts valid IP',
    },
    {
      input: ['256.1.1.1'],
      expectedOutput: false,
      description: 'isValidIPv4 rejects octet > 255',
    },
    {
      input: ['1234-5678-9012-3456'],
      expectedOutput: true,
      description: 'isValidCreditCard accepts 16 digits with dashes',
    },
  ],
  hints: [
    'Always use ^ and $ anchors to validate the entire string',
    'For optional parts, use (pattern)? or make specific characters optional',
    'IP validation needs to handle 0-255 range - consider breaking into cases',
    'For flexible separators, use character class like [-. ] with ?',
    'Consider preprocessing (like removing separators) for simpler validation',
    'Test edge cases: empty strings, very long inputs, special characters',
  ],
};
