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
  id: 'some-every',
  title: 'Some and Every for Validation',
  difficulty: 'easy',
  category: 'Array Methods',
  description: `<h2>In-Depth Explanation</h2>

<p><code>some()</code> and <code>every()</code> are boolean array methods that test whether elements in an array satisfy a condition. <code>some()</code> returns <code>true</code> if at least one element passes the test (short-circuits on first match), while <code>every()</code> returns <code>true</code> only if all elements pass the test (short-circuits on first failure).</p>

<p>Both methods use short-circuit evaluation:</p>
<ul>
  <li><code>some()</code>: Stops as soon as it finds a matching element (returns <code>true</code>)</li>
  <li><code>every()</code>: Stops as soon as it finds a non-matching element (returns <code>false</code>)</li>
</ul>

<p>This makes them more efficient than using <code>filter().length > 0</code> or <code>filter().length === array.length</code> because they don't need to process the entire array.</p>

<h2>Importance</h2>

<p>These methods are essential for validation and checking conditions because:</p>

<ul>
  <li><strong>Performance</strong>: Short-circuit evaluation makes them faster than filter-based approaches</li>
  <li><strong>Semantic Clarity</strong>: Code clearly expresses intent (any vs all)</li>
  <li><strong>Early Exit</strong>: Don't process unnecessary elements</li>
  <li><strong>Boolean Logic</strong>: Return boolean values directly, perfect for conditionals</li>
  <li><strong>Readability</strong>: More readable than manual loops or filter-based checks</li>
  <li><strong>Type Safety</strong>: TypeScript understands the boolean return type</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>These methods are used extensively in real applications:</p>

<ul>
  <li><strong>Form Validation</strong>: <code>every()</code> to check if all fields are valid, <code>some()</code> to check if any field has errors</li>
  <li><strong>Permission Checks</strong>: <code>some()</code> to check if user has any required permission, <code>every()</code> to check if user has all permissions</li>
  <li><strong>Data Quality</strong>: <code>every()</code> to validate all records, <code>some()</code> to check if any record needs attention</li>
  <li><strong>Search/Filter</strong>: <code>some()</code> to check if any item matches search criteria</li>
  <li><strong>Conditional Rendering</strong>: <code>some()</code> to show/hide UI elements based on data</li>
  <li><strong>Game Logic</strong>: <code>every()</code> to check if all players are ready, <code>some()</code> to check if any player won</li>
  <li><strong>API Validation</strong>: Validating request payloads before processing</li>
</ul>

<p><strong>Challenge:</strong> Validate arrays using some and every.</p>`,
  examples: [
    {
      input: `const scores = [85, 90, 78, 92];`,
      output: `some > 90: true, every > 70: true`,
      explanation: 'Check if any score is high, or all scores pass threshold',
    },
  ],
  starterCode: `function hasHighScore(scores) {
  // TODO: Use some() to check if any score >= 90
  return false;
}

function allPassing(scores) {
  // TODO: Use every() to check if all scores >= 70
  return false;
}

const scores1 = [85, 90, 78, 92];
const scores2 = [65, 70, 68, 72];

console.log('Has high score:', hasHighScore(scores1));
console.log('All passing:', allPassing(scores1));
console.log('All passing (scores2):', allPassing(scores2));`,
  solution: `function hasHighScore(scores) {
  // Use some() to check if any score >= 90
  return scores.some(score => score >= 90);
}

function allPassing(scores) {
  // Use every() to check if all scores >= 70
  return scores.every(score => score >= 70);
}`,
  testCases: [
    {
      input: [[85, 90, 78, 92]],
      expectedOutput: true,
      description: 'hasHighScore',
    },
    {
      input: [[85, 90, 78, 92]],
      expectedOutput: true,
      description: 'allPassing',
    },
    {
      input: [[65, 70, 68, 72]],
      expectedOutput: false,
      description: 'allPassing with low scores',
    },
  ],
  hints: [
    'some() returns true if at least one element matches',
    'every() returns true only if ALL elements match',
    'Both short-circuit: some stops at first match, every stops at first non-match',
  ],
};
