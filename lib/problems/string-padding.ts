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
    description: `## In-Depth Explanation

\`padStart()\` and \`padEnd()\` add padding characters to strings to reach a specified length. \`padStart()\` adds padding at the beginning (left), \`padEnd()\` adds padding at the end (right).

The syntax: \`str.padStart(targetLength, padString)\`
- \`targetLength\`: Desired length of the resulting string
- \`padString\`: Character(s) to pad with (defaults to space)

Common uses:
- **Leading Zeros**: Format numbers with leading zeros (\`'5'.padStart(2, '0')\` → \`'05'\`)
- **Alignment**: Align text in tables or columns
- **Masking**: Mask sensitive data (credit cards, SSNs)
- **Time Formatting**: Format time as HH:MM:SS
- **ID Formatting**: Format IDs with consistent length

## Importance

String padding is essential for formatting because:

- **Consistency**: Ensure consistent string lengths for display
- **Alignment**: Align text in tables, columns, reports
- **Formatting**: Format numbers, dates, IDs consistently
- **Security**: Mask sensitive information
- **User Experience**: Better formatted output improves UX
- **Data Presentation**: Professional-looking formatted data

## Usefulness & Practical Applications

String padding is used extensively:

- **Time Formatting**: Format time as HH:MM:SS with leading zeros
- **Date Formatting**: Format dates with consistent padding
- **ID Formatting**: Format IDs, order numbers with leading zeros
- **Table Alignment**: Align columns in text tables
- **Currency Formatting**: Right-align currency values
- **Masking**: Mask credit card numbers, phone numbers
- **Logging**: Format log entries with consistent widths
- **Reports**: Format report data with consistent alignment

**Challenge:** Format numbers, create aligned output, and mask strings.`,
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
