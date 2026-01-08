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
  id: 'bigint-usage',
  title: 'Working with BigInt for Large Numbers',
  difficulty: 'medium',
  category: 'Numbers & Math',
  description: `<h2>In-Depth Explanation</h2>

<p><code>BigInt</code> is a built-in JavaScript object that provides a way to represent whole numbers larger than <code>Number.MAX_SAFE_INTEGER</code> (2^53 - 1 = 9,007,199,254,740,991).</p>

<h3>Creating BigInt Values</h3>

<ul>
  <li><code>BigInt(number)</code>: Convert a number or string to BigInt</li>
  <li><code>123n</code>: Append 'n' suffix to create a BigInt literal</li>
  <li><code>BigInt("12345678901234567890")</code>: Create from string for very large numbers</li>
</ul>

<h3>BigInt Operations</h3>

<ul>
  <li>Supports standard arithmetic: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>, <code>**</code></li>
  <li>Division truncates toward zero (no decimals)</li>
  <li>Cannot mix BigInt with Number in operations (must convert explicitly)</li>
  <li>Comparison operators work between BigInt and Number</li>
</ul>

<h3>Important Limitations</h3>

<ul>
  <li>Cannot use <code>Math</code> methods with BigInt</li>
  <li>Cannot have decimal values</li>
  <li>Cannot be used with <code>JSON.stringify()</code> directly</li>
  <li>Slightly slower than regular numbers for computation</li>
</ul>

<h2>Importance</h2>

<p>BigInt is crucial for:</p>

<ul>
  <li><strong>Financial Applications</strong>: Handle currency amounts in smallest units (cents, satoshis)</li>
  <li><strong>Cryptography</strong>: Work with large prime numbers and encryption keys</li>
  <li><strong>Database IDs</strong>: Handle 64-bit integer IDs from databases</li>
  <li><strong>Scientific Computing</strong>: Precise calculations with very large integers</li>
  <li><strong>Timestamps</strong>: Nanosecond precision timestamps</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<ul>
  <li><strong>Cryptocurrency</strong>: Bitcoin amounts in satoshis (1 BTC = 100,000,000 satoshis)</li>
  <li><strong>UUID/Snowflake IDs</strong>: Discord, Twitter use 64-bit snowflake IDs</li>
  <li><strong>Factorial Calculations</strong>: Computing large factorials without overflow</li>
  <li><strong>Large Number Arithmetic</strong>: Precise integer math beyond Number limits</li>
</ul>

<p><strong>Challenge:</strong> Implement functions that safely work with BigInt for various real-world scenarios.</p>`,
  examples: [
    {
      input: `9007199254740991n + 1n`,
      output: `9007199254740992n`,
      explanation: 'BigInt can go beyond MAX_SAFE_INTEGER',
    },
    {
      input: `BigInt("123456789012345678901234567890")`,
      output: `123456789012345678901234567890n`,
      explanation: 'Create very large BigInt from string',
    },
    {
      input: `10n / 3n`,
      output: `3n`,
      explanation: 'BigInt division truncates (no decimals)',
    },
  ],
  starterCode: `function factorial(n) {
  // TODO: Calculate factorial using BigInt to handle large results
  // factorial(20) → 2432902008176640000n
  // factorial(50) → 30414093201713378043612608166064768844377641568960512000000000000n
  // factorial(0) → 1n

  return n;
}

function addLargeNumbers(a, b) {
  // TODO: Add two numbers represented as strings, return result as string
  // Handles numbers larger than MAX_SAFE_INTEGER
  // addLargeNumbers("9007199254740991", "9007199254740991") → "18014398509481982"
  // addLargeNumbers("123456789012345678901234567890", "1") → "123456789012345678901234567891"

  return a;
}

function isWithinSafeRange(numString) {
  // TODO: Check if a number string is within JavaScript's safe integer range
  // isWithinSafeRange("9007199254740991") → true (exactly MAX_SAFE_INTEGER)
  // isWithinSafeRange("9007199254740992") → false (exceeds MAX_SAFE_INTEGER)
  // isWithinSafeRange("-9007199254740991") → true

  return true;
}

function multiplyLargeNumbers(a, b) {
  // TODO: Multiply two number strings and return result as string
  // multiplyLargeNumbers("123456789", "987654321") → "121932631112635269"
  // multiplyLargeNumbers("999999999999999999", "2") → "1999999999999999998"

  return a;
}

function bigIntToJSON(obj) {
  // TODO: Convert an object with BigInt values to JSON-safe format
  // BigInt values should be converted to strings with 'n' suffix
  // bigIntToJSON({ id: 123n, name: "test" }) → '{"id":"123n","name":"test"}'

  return JSON.stringify(obj);
}

// Test
console.log(factorial(20));
console.log(addLargeNumbers("9007199254740991", "9007199254740991"));
console.log(isWithinSafeRange("9007199254740992"));
console.log(multiplyLargeNumbers("123456789", "987654321"));
console.log(bigIntToJSON({ id: 123n, name: "test" }));`,
  solution: `function factorial(n) {
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}

function addLargeNumbers(a, b) {
  return (BigInt(a) + BigInt(b)).toString();
}

function isWithinSafeRange(numString) {
  const num = BigInt(numString);
  const maxSafe = BigInt(Number.MAX_SAFE_INTEGER);
  const minSafe = BigInt(Number.MIN_SAFE_INTEGER);
  return num >= minSafe && num <= maxSafe;
}

function multiplyLargeNumbers(a, b) {
  return (BigInt(a) * BigInt(b)).toString();
}

function bigIntToJSON(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'bigint') {
      return value.toString() + 'n';
    }
    return value;
  });
}`,
  testCases: [
    {
      input: [20],
      expectedOutput: '2432902008176640000',
      description: 'factorial - 20! as string (BigInt result)',
    },
    {
      input: [0],
      expectedOutput: '1',
      description: 'factorial - 0! equals 1',
    },
    {
      input: [5],
      expectedOutput: '120',
      description: 'factorial - 5! equals 120',
    },
    {
      input: ['9007199254740991', '9007199254740991'],
      expectedOutput: '18014398509481982',
      description: 'addLargeNumbers - adds two MAX_SAFE_INTEGER values',
    },
    {
      input: ['123456789012345678901234567890', '1'],
      expectedOutput: '123456789012345678901234567891',
      description: 'addLargeNumbers - adds very large number and 1',
    },
    {
      input: ['9007199254740991'],
      expectedOutput: true,
      description: 'isWithinSafeRange - MAX_SAFE_INTEGER is within range',
    },
    {
      input: ['9007199254740992'],
      expectedOutput: false,
      description: 'isWithinSafeRange - one beyond MAX_SAFE_INTEGER is not safe',
    },
    {
      input: ['123456789', '987654321'],
      expectedOutput: '121932631112635269',
      description: 'multiplyLargeNumbers - multiplies two large numbers',
    },
    {
      input: ['999999999999999999', '2'],
      expectedOutput: '1999999999999999998',
      description: 'multiplyLargeNumbers - doubles a large number',
    },
    {
      input: [{ id: 123, name: 'test' }],
      expectedOutput: '{"id":"123n","name":"test"}',
      description: 'bigIntToJSON - converts BigInt to string with n suffix',
    },
  ],
  hints: [
    'Use the n suffix (like 1n, 2n) to create BigInt literals in loops',
    'BigInt() constructor can take a number or string argument',
    'Convert BigInt back to string with .toString() for output',
    'Number.MAX_SAFE_INTEGER is 9007199254740991 (2^53 - 1)',
    'Use JSON.stringify with a replacer function to handle BigInt serialization',
    'Remember: you cannot mix BigInt and Number in arithmetic operations',
  ],
};
