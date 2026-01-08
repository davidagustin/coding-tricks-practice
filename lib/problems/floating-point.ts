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
  id: 'floating-point',
  title: 'Handling Floating Point Precision Issues',
  difficulty: 'medium',
  category: 'Numbers & Math',
  description: `<h2>In-Depth Explanation</h2>

<p>JavaScript uses IEEE 754 double-precision floating-point format for all numbers. This leads to infamous precision issues like <code>0.1 + 0.2 !== 0.3</code> (it equals 0.30000000000000004).</p>

<h3>Why This Happens</h3>

<ul>
  <li>Decimal fractions like 0.1 cannot be represented exactly in binary</li>
  <li>Similar to how 1/3 = 0.333... in decimal, 0.1 is infinite in binary</li>
  <li>The computer stores an approximation, leading to tiny errors</li>
  <li>These errors can accumulate in calculations</li>
</ul>

<h3>Common Solutions</h3>

<ul>
  <li><strong>Epsilon Comparison</strong>: Compare if difference is smaller than <code>Number.EPSILON</code></li>
  <li><strong>Fixed-Point Arithmetic</strong>: Work with integers (cents instead of dollars)</li>
  <li><strong>Rounding</strong>: Round results to needed precision</li>
  <li><strong>Libraries</strong>: Use decimal.js, big.js for critical calculations</li>
</ul>

<h3>Key Constants</h3>

<ul>
  <li><code>Number.EPSILON</code>: Smallest difference between 1 and the next representable number (~2.22e-16)</li>
  <li><code>Number.MAX_SAFE_INTEGER</code>: Largest safe integer (2^53 - 1)</li>
  <li><code>Number.MIN_SAFE_INTEGER</code>: Smallest safe integer (-(2^53 - 1))</li>
</ul>

<h2>Importance</h2>

<p>Understanding floating-point issues is critical for:</p>

<ul>
  <li><strong>Financial Applications</strong>: Money calculations must be exact</li>
  <li><strong>Scientific Computing</strong>: Accumulated errors affect results</li>
  <li><strong>Testing</strong>: Comparing floating-point results requires tolerance</li>
  <li><strong>Game Development</strong>: Physics calculations need precision control</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<ul>
  <li><strong>Currency Calculations</strong>: Store money as cents (integers) not dollars</li>
  <li><strong>Equality Checks</strong>: Use epsilon-based comparison for floats</li>
  <li><strong>Display Formatting</strong>: Round before displaying to users</li>
  <li><strong>Test Assertions</strong>: Use "approximately equal" comparisons</li>
</ul>

<p><strong>Challenge:</strong> Implement functions that properly handle floating-point arithmetic for common scenarios.</p>`,
  examples: [
    {
      input: `0.1 + 0.2`,
      output: `0.30000000000000004`,
      explanation: 'Classic floating-point precision issue',
    },
    {
      input: `0.1 + 0.2 === 0.3`,
      output: `false`,
      explanation: 'Direct comparison fails due to precision',
    },
    {
      input: `Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON`,
      output: `true`,
      explanation: 'Epsilon comparison works correctly',
    },
  ],
  starterCode: `function areFloatsEqual(a, b, tolerance = Number.EPSILON) {
  // TODO: Compare two floats with tolerance for precision issues
  // areFloatsEqual(0.1 + 0.2, 0.3) → true
  // areFloatsEqual(0.1, 0.2) → false
  // areFloatsEqual(1.0000000001, 1.0000000002, 0.0001) → true

  return a === b;
}

function addMoney(dollars1, dollars2) {
  // TODO: Add two dollar amounts and return result without precision issues
  // addMoney(0.1, 0.2) → 0.3
  // addMoney(19.99, 5.01) → 25
  // addMoney(0.07, 0.01) → 0.08

  return dollars1 + dollars2;
}

function roundToPlaces(num, places) {
  // TODO: Round a number to specified decimal places, handling precision
  // roundToPlaces(1.005, 2) → 1.01 (not 1.00 as naive rounding gives)
  // roundToPlaces(2.555, 2) → 2.56
  // roundToPlaces(0.1 + 0.2, 1) → 0.3

  return num;
}

function calculatePercentage(value, percentage) {
  // TODO: Calculate percentage of a value with precision handling
  // calculatePercentage(100, 33.33) → 33.33
  // calculatePercentage(0.1, 50) → 0.05
  // calculatePercentage(200, 15.5) → 31

  return value * (percentage / 100);
}

function sumArray(numbers) {
  // TODO: Sum an array of floats, compensating for accumulated errors
  // Uses Kahan summation algorithm for better precision
  // sumArray([0.1, 0.2, 0.3]) → 0.6
  // sumArray([0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]) → 1

  return numbers.reduce((a, b) => a + b, 0);
}

// Test
console.log(areFloatsEqual(0.1 + 0.2, 0.3));
console.log(addMoney(0.1, 0.2));
console.log(roundToPlaces(1.005, 2));
console.log(calculatePercentage(100, 33.33));
console.log(sumArray([0.1, 0.2, 0.3]));`,
  solution: `function areFloatsEqual(a, b, tolerance = Number.EPSILON) {
  return Math.abs(a - b) < tolerance;
}

function addMoney(dollars1, dollars2) {
  // Convert to cents, add, convert back
  const cents1 = Math.round(dollars1 * 100);
  const cents2 = Math.round(dollars2 * 100);
  return (cents1 + cents2) / 100;
}

function roundToPlaces(num, places) {
  // Use exponential notation to avoid precision issues
  const multiplier = Math.pow(10, places);
  return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
}

function calculatePercentage(value, percentage) {
  // Convert to avoid floating-point multiplication issues
  const result = (value * percentage) / 100;
  return roundToPlaces(result, 2);
}

function sumArray(numbers) {
  // Kahan summation for better precision
  let sum = 0;
  let compensation = 0;

  for (const num of numbers) {
    const y = num - compensation;
    const t = sum + y;
    compensation = (t - sum) - y;
    sum = t;
  }

  return roundToPlaces(sum, 10);
}`,
  testCases: [
    {
      input: [0.30000000000000004, 0.3],
      expectedOutput: true,
      description: 'areFloatsEqual - 0.1+0.2 equals 0.3 with epsilon',
    },
    {
      input: [0.1, 0.2],
      expectedOutput: false,
      description: 'areFloatsEqual - 0.1 and 0.2 are not equal',
    },
    {
      input: [1.0000000001, 1.0000000002, 0.0001],
      expectedOutput: true,
      description: 'areFloatsEqual - within custom tolerance',
    },
    {
      input: [0.1, 0.2],
      expectedOutput: 0.3,
      description: 'addMoney - 0.1 + 0.2 equals exactly 0.3',
    },
    {
      input: [19.99, 5.01],
      expectedOutput: 25,
      description: 'addMoney - 19.99 + 5.01 equals 25',
    },
    {
      input: [0.07, 0.01],
      expectedOutput: 0.08,
      description: 'addMoney - small amounts add correctly',
    },
    {
      input: [1.005, 2],
      expectedOutput: 1.01,
      description: 'roundToPlaces - 1.005 rounds up to 1.01',
    },
    {
      input: [2.555, 2],
      expectedOutput: 2.56,
      description: 'roundToPlaces - 2.555 rounds up to 2.56',
    },
    {
      input: [100, 33.33],
      expectedOutput: 33.33,
      description: 'calculatePercentage - 33.33% of 100',
    },
    {
      input: [[0.1, 0.2, 0.3]],
      expectedOutput: 0.6,
      description: 'sumArray - sums to exactly 0.6',
    },
  ],
  hints: [
    'Number.EPSILON is the smallest difference between 1 and the next representable float',
    'For money: convert to cents (integers), calculate, then convert back to dollars',
    'The expression (num + Number.EPSILON) helps with edge cases in rounding',
    'Kahan summation tracks a compensation value to reduce accumulated errors',
    'Always round AFTER all calculations are complete, not during intermediate steps',
    'Consider using Math.round(num * 100) / 100 for simple 2-decimal rounding',
  ],
};
