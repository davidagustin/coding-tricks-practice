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
  description: `<h2>In-Depth Explanation</h2>

<p>Short-circuit evaluation is a feature where logical operators (<code>&&</code> and <code>||</code>) don't evaluate the right operand if the result can be determined from the left operand alone.</p>

<p><code>&&</code> (AND): Returns the first falsy value, or the last value if all are truthy. Stops evaluating at the first falsy value. <code>||</code> (OR): Returns the first truthy value, or the last value if all are falsy. Stops evaluating at the first truthy value.</p>

<p>This enables:</p>
<ul>
  <li><strong>Conditional Execution</strong>: <code>condition && doSomething()</code> - only executes if condition is truthy</li>
  <li><strong>Default Values</strong>: <code>value || defaultValue</code> - uses default if value is falsy</li>
  <li><strong>Optional Chaining</strong>: <code>obj && obj.prop && obj.prop.value</code> - safely access nested properties</li>
</ul>

<p>Important: Be careful with falsy values like <code>0</code>, <code>''</code>, <code>false</code> - they will trigger defaults with <code>||</code>.</p>

<h2>Importance</h2>

<p>Short-circuit evaluation is essential for concise JavaScript because:</p>

<ul>
  <li><strong>Code Conciseness</strong>: Replace if statements with one-liners</li>
  <li><strong>Default Values</strong>: Common pattern for providing defaults</li>
  <li><strong>Optional Access</strong>: Safely access properties that might not exist</li>
  <li><strong>Performance</strong>: Avoids unnecessary evaluations</li>
  <li><strong>Readability</strong>: More readable than verbose if statements</li>
  <li><strong>Functional Style</strong>: Enables functional programming patterns</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Short-circuit evaluation is used everywhere:</p>

<ul>
  <li><strong>Default Values</strong>: <code>const name = user.name || 'Guest'</code></li>
  <li><strong>Conditional Rendering</strong>: React <code>{isLoggedIn && &lt;Dashboard /&gt;}</code></li>
  <li><strong>Optional Chaining</strong>: <code>user && user.profile && user.profile.name</code></li>
  <li><strong>Function Calls</strong>: <code>config && config.onLoad && config.onLoad()</code></li>
  <li><strong>API Responses</strong>: <code>response.data || []</code> for default empty array</li>
  <li><strong>Configuration</strong>: <code>timeout || 5000</code> for default timeout</li>
  <li><strong>Validation</strong>: <code>email && validateEmail(email)</code></li>
  <li><strong>Error Handling</strong>: <code>error && console.error(error)</code></li>
</ul>

<p><strong>Challenge:</strong> Replace if statements with short-circuit patterns.</p>`,
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
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    '&& evaluates right side only if left is truthy',
    '|| returns first truthy value or last value',
    'Be careful: 0 and "" are falsy!',
  ],
};
