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
  id: 'number-methods',
  title: 'Number Methods: toFixed, toPrecision, parseInt, parseFloat',
  difficulty: 'easy',
  category: 'Numbers & Math',
  description: `<h2>In-Depth Explanation</h2>

<p>JavaScript provides several methods for converting, formatting, and parsing numbers. Understanding these methods is essential for working with numeric data in any application.</p>

<h3>Number Instance Methods</h3>

<ul>
  <li><code>toFixed(digits)</code>: Formats a number using fixed-point notation with the specified number of decimal places. Returns a <strong>string</strong>.</li>
  <li><code>toPrecision(precision)</code>: Formats a number to a specified total number of significant digits. Returns a <strong>string</strong>.</li>
  <li><code>toString(radix)</code>: Converts a number to a string in the specified base (radix). Default is base 10.</li>
</ul>

<h3>Global Parsing Functions</h3>

<ul>
  <li><code>parseInt(string, radix)</code>: Parses a string and returns an integer. The radix (base) should always be specified to avoid unexpected results.</li>
  <li><code>parseFloat(string)</code>: Parses a string and returns a floating-point number.</li>
  <li><code>Number(value)</code>: Converts a value to a number. Stricter than parseInt/parseFloat.</li>
</ul>

<h2>Importance</h2>

<p>These methods are fundamental because:</p>

<ul>
  <li><strong>Data Display</strong>: Format numbers for user-friendly display (currency, percentages)</li>
  <li><strong>User Input</strong>: Parse user-entered strings into usable numbers</li>
  <li><strong>API Integration</strong>: Convert between string and number representations</li>
  <li><strong>Precision Control</strong>: Control decimal places for calculations and display</li>
  <li><strong>Base Conversion</strong>: Work with different number systems (binary, hex)</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<ul>
  <li><strong>Currency Formatting</strong>: <code>(19.99).toFixed(2)</code> ensures two decimal places</li>
  <li><strong>Percentage Display</strong>: <code>(0.856).toFixed(2)</code> for clean percentages</li>
  <li><strong>Form Validation</strong>: <code>parseFloat(input)</code> to validate numeric input</li>
  <li><strong>Color Conversion</strong>: <code>parseInt('FF', 16)</code> for hex to decimal</li>
  <li><strong>Scientific Notation</strong>: <code>toPrecision()</code> for significant figures</li>
</ul>

<p><strong>Challenge:</strong> Implement functions that use these number methods to format prices, parse user input, and convert between number bases.</p>`,
  examples: [
    {
      input: `(3.14159).toFixed(2)`,
      output: `'3.14'`,
      explanation: 'Rounds to 2 decimal places and returns a string',
    },
    {
      input: `parseInt('42px', 10)`,
      output: `42`,
      explanation: 'Parses integer from string, ignoring non-numeric suffix',
    },
    {
      input: `(123.456).toPrecision(4)`,
      output: `'123.5'`,
      explanation: 'Formats to 4 significant digits',
    },
  ],
  starterCode: `function formatPrice(price) {
  // TODO: Format a number as a price string with exactly 2 decimal places
  // formatPrice(19.9) → '19.90'
  // formatPrice(5) → '5.00'
  // formatPrice(99.999) → '100.00'

  return price;
}

function parseUserInput(input) {
  // TODO: Parse a user input string that may contain units
  // Return the numeric value or NaN if invalid
  // parseUserInput('42.5kg') → 42.5
  // parseUserInput('$99.99') → 99.99
  // parseUserInput('abc') → NaN

  return input;
}

function hexToDecimal(hexString) {
  // TODO: Convert a hexadecimal string to a decimal number
  // hexToDecimal('FF') → 255
  // hexToDecimal('10') → 16
  // hexToDecimal('A5') → 165

  return hexString;
}

function formatSignificantDigits(num, digits) {
  // TODO: Format a number to the specified significant digits
  // formatSignificantDigits(123.456, 4) → '123.5'
  // formatSignificantDigits(0.001234, 2) → '0.0012'
  // formatSignificantDigits(9876, 2) → '9900'

  return num;
}

function decimalToHex(decimal) {
  // TODO: Convert a decimal number to a hexadecimal string (uppercase)
  // decimalToHex(255) → 'FF'
  // decimalToHex(16) → '10'
  // decimalToHex(165) → 'A5'

  return decimal;
}

// Test
console.log(formatPrice(19.9));
console.log(parseUserInput('42.5kg'));
console.log(hexToDecimal('FF'));
console.log(formatSignificantDigits(123.456, 4));
console.log(decimalToHex(255));`,
  solution: `function formatPrice(price) {
  // Format a number as a price string with exactly 2 decimal places
  return price.toFixed(2);
}

function parseUserInput(input) {
  // Parse a user input string that may contain units
  // Return the numeric value or NaN if invalid
  const result = parseFloat(input);
  return result;
}

function hexToDecimal(hexString) {
  // Convert a hexadecimal string to a decimal number
  return parseInt(hexString, 16);
}

function formatSignificantDigits(num, digits) {
  // Format a number to the specified significant digits
  return num.toPrecision(digits);
}

function decimalToHex(decimal) {
  // Convert a decimal number to a hexadecimal string (uppercase)
  return decimal.toString(16).toUpperCase();
}

// Test
console.log(formatPrice(19.9));
console.log(parseUserInput('42.5kg'));
console.log(hexToDecimal('FF'));
console.log(formatSignificantDigits(123.456, 4));
console.log(decimalToHex(255));`,
  testCases: [
    {
      input: [19.9],
      expectedOutput: '19.90',
      description: 'formatPrice formats 19.9 to "19.90"',
    },
    {
      input: [5],
      expectedOutput: '5.00',
      description: 'formatPrice formats 5 to "5.00"',
    },
    {
      input: ['42.5kg'],
      expectedOutput: 42.5,
      description: 'parseUserInput extracts 42.5 from "42.5kg"',
    },
    {
      input: ['abc'],
      expectedOutput: NaN,
      description: 'parseUserInput returns NaN for non-numeric input',
    },
    {
      input: ['FF'],
      expectedOutput: 255,
      description: 'hexToDecimal converts "FF" to 255',
    },
    {
      input: ['10'],
      expectedOutput: 16,
      description: 'hexToDecimal converts "10" to 16',
    },
    {
      input: [123.456, 4],
      expectedOutput: '123.5',
      description: 'formatSignificantDigits formats 123.456 to 4 sig digits',
    },
    {
      input: [255],
      expectedOutput: 'FF',
      description: 'decimalToHex converts 255 to "FF"',
    },
    {
      input: [16],
      expectedOutput: '10',
      description: 'decimalToHex converts 16 to "10"',
    },
  ],
  hints: [
    'toFixed(n) always returns a string with exactly n decimal places',
    'parseFloat() stops parsing at the first non-numeric character (except for the first decimal point)',
    'parseInt(str, 16) parses hexadecimal; always specify the radix to avoid bugs',
    'toPrecision() counts total significant digits, not just decimal places',
    'toString(16) converts to hexadecimal; use toUpperCase() for capital letters',
  ],
};
