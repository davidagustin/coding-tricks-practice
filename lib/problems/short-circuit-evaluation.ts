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
    id: 'short-circuit-evaluation',
    title: 'Short-Circuit Evaluation',
    difficulty: 'easy',
    category: 'JavaScript Basics',
    description: `## In-Depth Explanation

Short-circuit evaluation is a feature where logical operators (\`&&\` and \`||\`) don't evaluate the right operand if the result can be determined from the left operand alone.

\`&&\` (AND): Returns the first falsy value, or the last value if all are truthy. Stops evaluating at the first falsy value.
\`||\` (OR): Returns the first truthy value, or the last value if all are falsy. Stops evaluating at the first truthy value.

This enables:
- **Conditional Execution**: \`condition && doSomething()\` - only executes if condition is truthy
- **Default Values**: \`value || defaultValue\` - uses default if value is falsy
- **Optional Chaining**: \`obj && obj.prop && obj.prop.value\` - safely access nested properties

Important: Be careful with falsy values like \`0\`, \`''\`, \`false\` - they will trigger defaults with \`||\`.

## Importance

Short-circuit evaluation is essential for concise JavaScript because:

- **Code Conciseness**: Replace if statements with one-liners
- **Default Values**: Common pattern for providing defaults
- **Optional Access**: Safely access properties that might not exist
- **Performance**: Avoids unnecessary evaluations
- **Readability**: More readable than verbose if statements
- **Functional Style**: Enables functional programming patterns

## Usefulness & Practical Applications

Short-circuit evaluation is used everywhere:

- **Default Values**: \`const name = user.name || 'Guest'\`
- **Conditional Rendering**: React \`{isLoggedIn && <Dashboard />}\`
- **Optional Chaining**: \`user && user.profile && user.profile.name\`
- **Function Calls**: \`config && config.onLoad && config.onLoad()\`
- **API Responses**: \`response.data || []\` for default empty array
- **Configuration**: \`timeout || 5000\` for default timeout
- **Validation**: \`email && validateEmail(email)\`
- **Error Handling**: \`error && console.error(error)\`

**Challenge:** Replace if statements with short-circuit patterns.`,
    examples: [
      {
        input: `const name = user && user.name;`,
        output: `'John' or undefined`,
        explanation: '&& short-circuits on falsy values',
      },
    ],
    starterCode: `function greetUser(user) {
  // TODO: Use && to only call user.getName() if user exists
  // Return greeting or 'Hello, Guest!'
  let name;
  if (user) {
    name = user.getName();
  }
  return 'Hello, ' + (name || 'Guest') + '!';
}

function getConfigValue(config, key, defaultValue) {
  // TODO: Return config[key] if it exists, otherwise defaultValue
  // Use || for this (but be aware of falsy value issues!)
  if (config && config[key] !== undefined) {
    return config[key];
  }
  return defaultValue;
}

// Test
const user = { getName: () => 'John' };
console.log(greetUser(user));
console.log(greetUser(null));
console.log(getConfigValue({ timeout: 5000 }, 'timeout', 3000));
console.log(getConfigValue({}, 'timeout', 3000));`,
    solution: `function greetUser(user) {
  const name = user && user.getName();
  return 'Hello, ' + (name || 'Guest') + '!';
}

function getConfigValue(config, key, defaultValue) {
  return (config && config[key]) || defaultValue;
}`,
    testCases: [
      {
        input: [{ getName: () => 'John' }],
        expectedOutput: 'Hello, John!',
        description: 'greetUser with user',
      },
      {
        input: [null],
        expectedOutput: 'Hello, Guest!',
        description: 'greetUser without user',
      },
      {
        input: [{ timeout: 5000 }, 'timeout', 3000],
        expectedOutput: 5000,
        description: 'getConfigValue existing',
      },
      {
        input: [{}, 'timeout', 3000],
        expectedOutput: 3000,
        description: 'getConfigValue default',
      },
    ],
    hints: [
      '&& evaluates right side only if left is truthy',
      '|| returns first truthy value or last value',
      'Be careful: 0 and "" are falsy!',
    ],
  };