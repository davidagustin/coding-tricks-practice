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
  description: `## In-Depth Explanation

\`some()\` and \`every()\` are boolean array methods that test whether elements in an array satisfy a condition. \`some()\` returns \`true\` if at least one element passes the test (short-circuits on first match), while \`every()\` returns \`true\` only if all elements pass the test (short-circuits on first failure).

Both methods use short-circuit evaluation:
- \`some()\`: Stops as soon as it finds a matching element (returns \`true\`)
- \`every()\`: Stops as soon as it finds a non-matching element (returns \`false\`)

This makes them more efficient than using \`filter().length > 0\` or \`filter().length === array.length\` because they don't need to process the entire array.

## Importance

These methods are essential for validation and checking conditions because:

- **Performance**: Short-circuit evaluation makes them faster than filter-based approaches
- **Semantic Clarity**: Code clearly expresses intent (any vs all)
- **Early Exit**: Don't process unnecessary elements
- **Boolean Logic**: Return boolean values directly, perfect for conditionals
- **Readability**: More readable than manual loops or filter-based checks
- **Type Safety**: TypeScript understands the boolean return type

## Usefulness & Practical Applications

These methods are used extensively in real applications:

- **Form Validation**: \`every()\` to check if all fields are valid, \`some()\` to check if any field has errors
- **Permission Checks**: \`some()\` to check if user has any required permission, \`every()\` to check if user has all permissions
- **Data Quality**: \`every()\` to validate all records, \`some()\` to check if any record needs attention
- **Search/Filter**: \`some()\` to check if any item matches search criteria
- **Conditional Rendering**: \`some()\` to show/hide UI elements based on data
- **Game Logic**: \`every()\` to check if all players are ready, \`some()\` to check if any player won
- **API Validation**: Validating request payloads before processing

**Challenge:** Validate arrays using some and every.`,
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
  return scores.some(score => score >= 90);
}

function allPassing(scores) {
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
