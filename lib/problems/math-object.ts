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
  id: 'math-object',
  title: 'Math Object Methods: round, floor, ceil, random, and more',
  difficulty: 'easy',
  category: 'Numbers & Math',
  description: `<h2>In-Depth Explanation</h2>

<p>The <code>Math</code> object in JavaScript provides a collection of mathematical constants and functions. Unlike other global objects, <code>Math</code> is not a constructor - all its properties and methods are static.</p>

<h3>Rounding Methods</h3>

<ul>
  <li><code>Math.round(x)</code>: Rounds to the nearest integer (0.5 rounds up)</li>
  <li><code>Math.floor(x)</code>: Rounds down to the largest integer less than or equal to x</li>
  <li><code>Math.ceil(x)</code>: Rounds up to the smallest integer greater than or equal to x</li>
  <li><code>Math.trunc(x)</code>: Removes the decimal part, truncating toward zero</li>
</ul>

<h3>Min/Max and Absolute</h3>

<ul>
  <li><code>Math.min(...values)</code>: Returns the smallest of the given numbers</li>
  <li><code>Math.max(...values)</code>: Returns the largest of the given numbers</li>
  <li><code>Math.abs(x)</code>: Returns the absolute value of x</li>
</ul>

<h3>Power and Root</h3>

<ul>
  <li><code>Math.pow(base, exp)</code>: Returns base raised to the power of exp</li>
  <li><code>Math.sqrt(x)</code>: Returns the square root of x</li>
  <li><code>Math.cbrt(x)</code>: Returns the cube root of x</li>
</ul>

<h3>Random Numbers</h3>

<ul>
  <li><code>Math.random()</code>: Returns a pseudo-random number between 0 (inclusive) and 1 (exclusive)</li>
</ul>

<h2>Importance</h2>

<p>The Math object is essential for:</p>

<ul>
  <li><strong>Calculations</strong>: Perform complex mathematical operations</li>
  <li><strong>Rounding</strong>: Control how numbers are rounded for display or storage</li>
  <li><strong>Randomization</strong>: Generate random numbers for games, simulations, IDs</li>
  <li><strong>Data Processing</strong>: Find min/max values, calculate distances</li>
  <li><strong>Graphics</strong>: Trigonometry for animations and game development</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<ul>
  <li><strong>Pagination</strong>: <code>Math.ceil(totalItems / pageSize)</code> for total pages</li>
  <li><strong>Random Selection</strong>: <code>Math.floor(Math.random() * array.length)</code></li>
  <li><strong>Clamping Values</strong>: <code>Math.min(Math.max(value, min), max)</code></li>
  <li><strong>Distance Calculation</strong>: <code>Math.sqrt(dx*dx + dy*dy)</code></li>
  <li><strong>Currency Rounding</strong>: Proper rounding for financial calculations</li>
</ul>

<p><strong>Challenge:</strong> Implement utility functions using various Math methods for common programming tasks.</p>`,
  examples: [
    {
      input: `Math.round(4.5)`,
      output: `5`,
      explanation: 'Rounds 4.5 up to 5 (0.5 rounds up)',
    },
    {
      input: `Math.floor(4.9)`,
      output: `4`,
      explanation: 'Rounds down to 4',
    },
    {
      input: `Math.ceil(4.1)`,
      output: `5`,
      explanation: 'Rounds up to 5',
    },
    {
      input: `Math.max(1, 5, 3)`,
      output: `5`,
      explanation: 'Returns the largest value',
    },
  ],
  starterCode: `function calculatePages(totalItems, itemsPerPage) {
  // TODO: Calculate the number of pages needed
  // calculatePages(25, 10) → 3
  // calculatePages(30, 10) → 3
  // calculatePages(0, 10) → 0

  return totalItems / itemsPerPage;
}

function clampValue(value, min, max) {
  // TODO: Clamp a value between min and max
  // clampValue(5, 0, 10) → 5
  // clampValue(-5, 0, 10) → 0
  // clampValue(15, 0, 10) → 10

  return value;
}

function getRandomInt(min, max) {
  // TODO: Return a random integer between min (inclusive) and max (inclusive)
  // getRandomInt(1, 6) → random number 1-6 (like a die roll)
  // Note: For testing, we'll verify the result is in range

  return min;
}

function roundToDecimal(num, decimalPlaces) {
  // TODO: Round a number to specified decimal places
  // roundToDecimal(3.14159, 2) → 3.14
  // roundToDecimal(2.555, 2) → 2.56
  // roundToDecimal(10, 2) → 10

  return num;
}

function calculateDistance(x1, y1, x2, y2) {
  // TODO: Calculate the Euclidean distance between two points
  // calculateDistance(0, 0, 3, 4) → 5
  // calculateDistance(1, 1, 4, 5) → 5
  // calculateDistance(0, 0, 0, 0) → 0

  return 0;
}

// Test
console.log(calculatePages(25, 10));
console.log(clampValue(15, 0, 10));
console.log(getRandomInt(1, 6));
console.log(roundToDecimal(3.14159, 2));
console.log(calculateDistance(0, 0, 3, 4));`,
  solution: `function calculatePages(totalItems, itemsPerPage) {
  if (totalItems === 0) return 0;
  return Math.ceil(totalItems / itemsPerPage);
}

function clampValue(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roundToDecimal(num, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
}

function calculateDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

// Test
console.log(calculatePages(25, 10)); // 3
console.log(clampValue(15, 0, 10)); // 10
console.log(getRandomInt(1, 6)); // random 1-6
console.log(roundToDecimal(3.14159, 2)); // 3.14
console.log(calculateDistance(0, 0, 3, 4)); // 5`,
  testCases: [
    {
      input: [25, 10],
      expectedOutput: 3,
      description: 'calculatePages rounds up partial pages',
    },
    {
      input: [30, 10],
      expectedOutput: 3,
      description: 'calculatePages exact division',
    },
    {
      input: [0, 10],
      expectedOutput: 0,
      description: 'calculatePages with 0 items',
    },
    {
      input: [5, 0, 10],
      expectedOutput: 5,
      description: 'clampValue within range',
    },
    {
      input: [-5, 0, 10],
      expectedOutput: 0,
      description: 'clampValue below min',
    },
    {
      input: [15, 0, 10],
      expectedOutput: 10,
      description: 'clampValue above max',
    },
    {
      input: [3.14159, 2],
      expectedOutput: 3.14,
      description: 'roundToDecimal to 2 places',
    },
    {
      input: [0, 0, 3, 4],
      expectedOutput: 5,
      description: 'calculateDistance 3-4-5 triangle',
    },
  ],
  hints: [
    'Math.ceil() rounds up, which is perfect for pagination since partial pages still need a full page',
    'Clamping can be done with nested Math.min and Math.max calls',
    'For random integers in a range: Math.floor(Math.random() * (max - min + 1)) + min',
    'To round to N decimal places: multiply by 10^N, round, then divide by 10^N',
    'The Euclidean distance formula is sqrt((x2-x1)^2 + (y2-y1)^2)',
  ],
};
