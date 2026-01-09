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
  id: 'string-padding',
  title: 'String Padding and Formatting',
  difficulty: 'easy',
  category: 'String Methods',
  description: `<h2>In-Depth Explanation</h2>

<p><code>padStart()</code> and <code>padEnd()</code> add padding characters to strings to reach a specified length. <code>padStart()</code> adds padding at the beginning (left), <code>padEnd()</code> adds padding at the end (right).</p>

<p>The syntax: <code>str.padStart(targetLength, padString)</code></p>
<ul>
  <li><code>targetLength</code>: Desired length of the resulting string</li>
  <li><code>padString</code>: Character(s) to pad with (defaults to space)</li>
</ul>

<p>Common uses:</p>
<ul>
  <li><strong>Leading Zeros</strong>: Format numbers with leading zeros (<code>'5'.padStart(2, '0')</code> → <code>'05'</code>)</li>
  <li><strong>Alignment</strong>: Align text in tables or columns</li>
  <li><strong>Masking</strong>: Mask sensitive data (credit cards, SSNs)</li>
  <li><strong>Time Formatting</strong>: Format time as HH:MM:SS</li>
  <li><strong>ID Formatting</strong>: Format IDs with consistent length</li>
</ul>

<h2>Importance</h2>

<p>String padding is essential for formatting because:</p>

<ul>
  <li><strong>Consistency</strong>: Ensure consistent string lengths for display</li>
  <li><strong>Alignment</strong>: Align text in tables, columns, reports</li>
  <li><strong>Formatting</strong>: Format numbers, dates, IDs consistently</li>
  <li><strong>Security</strong>: Mask sensitive information</li>
  <li><strong>User Experience</strong>: Better formatted output improves UX</li>
  <li><strong>Data Presentation</strong>: Professional-looking formatted data</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>String padding is used extensively:</p>

<ul>
  <li><strong>Time Formatting</strong>: Format time as HH:MM:SS with leading zeros</li>
  <li><strong>Date Formatting</strong>: Format dates with consistent padding</li>
  <li><strong>ID Formatting</strong>: Format IDs, order numbers with leading zeros</li>
  <li><strong>Table Alignment</strong>: Align columns in text tables</li>
  <li><strong>Currency Formatting</strong>: Right-align currency values</li>
  <li><strong>Masking</strong>: Mask credit card numbers, phone numbers</li>
  <li><strong>Logging</strong>: Format log entries with consistent widths</li>
  <li><strong>Reports</strong>: Format report data with consistent alignment</li>
</ul>

<p><strong>Challenge:</strong> Format numbers, create aligned output, and mask strings.</p>`,
  examples: [
    {
      input: `'5'.padStart(2, '0')`,
      output: `'05'`,
      explanation: 'Pad single digit with leading zero',
    },
  ],
  starterCode: `function formatTime(hours, minutes, seconds) {
  // TODO: Format as HH:MM:SS with leading zeros
  // formatTime(9, 5, 3) → '09:05:03'

  return hours + ':' + minutes + ':' + seconds;
}

function maskCardNumber(cardNumber) {
  // TODO: Show only last 4 digits, mask rest with *
  // '1234567890123456' → '************3456'

  return cardNumber;
}

function formatCurrency(amount, width = 10) {
  // TODO: Right-align currency with $ prefix
  // formatCurrency(42.5, 10) → '    $42.50'

  return '$' + amount;
}

// Test
console.log(formatTime(9, 5, 3));
console.log(maskCardNumber('1234567890123456'));
console.log(formatCurrency(42.5, 10));`,
  solution: `function formatTime(hours, minutes, seconds) {
  return [hours, minutes, seconds]
    .map(n => String(n).padStart(2, '0'))
    .join(':');
}

function maskCardNumber(cardNumber) {
  const last4 = cardNumber.slice(-4);
  return last4.padStart(cardNumber.length, '*');
}

function formatCurrency(amount, width = 10) {
  const formatted = '$' + amount.toFixed(2);
  return formatted.padStart(width, ' ');
}`,
  testCases: [
    {
      input: [9, 5, 3],
      expectedOutput: '09:05:03',
      description: 'formatTime',
    },
    {
      input: ['1234567890123456'],
      expectedOutput: '************3456',
      description: 'maskCardNumber',
    },
    {
      input: [42.5, 10],
      expectedOutput: '    $42.50',
      description: 'formatCurrency',
    },
  ],
  hints: [
    'String(num).padStart(2, "0") for leading zeros',
    'slice(-4) gets last 4 characters',
    'toFixed(2) formats decimals, then padStart for alignment',
  ],
};
