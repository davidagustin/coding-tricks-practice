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
  id: 'nullish-coalescing',
  title: 'Nullish Coalescing (??) vs OR (||)',
  difficulty: 'easy',
  category: 'JavaScript Basics',
  description: `<h2>In-Depth Explanation</h2>

<p>The nullish coalescing operator <code>??</code> returns the right-hand operand only when the left-hand operand is <code>null</code> or <code>undefined</code>. This is different from the logical OR operator <code>||</code> which returns the right-hand operand for any falsy value.</p>

<p><strong>Falsy values in JavaScript:</strong> <code>false</code>, <code>0</code>, <code>-0</code>, <code>0n</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code></p>

<p><strong>Nullish values:</strong> Only <code>null</code> and <code>undefined</code></p>

<p>Key differences:</p>
<ul>
  <li><code>0 || 10</code> returns <code>10</code> (0 is falsy)</li>
  <li><code>0 ?? 10</code> returns <code>0</code> (0 is not nullish)</li>
  <li><code>'' || 'default'</code> returns <code>'default'</code> (empty string is falsy)</li>
  <li><code>'' ?? 'default'</code> returns <code>''</code> (empty string is not nullish)</li>
  <li><code>null || 'default'</code> returns <code>'default'</code></li>
  <li><code>null ?? 'default'</code> returns <code>'default'</code></li>
</ul>

<h2>Importance</h2>

<p>The nullish coalescing operator solves a common bug pattern:</p>

<ul>
  <li><strong>Preserving Valid Zeros</strong>: <code>count ?? 0</code> keeps <code>0</code> as a valid count</li>
  <li><strong>Empty Strings</strong>: <code>name ?? 'Anonymous'</code> preserves intentionally empty names</li>
  <li><strong>Boolean Values</strong>: <code>enabled ?? true</code> respects explicit <code>false</code> values</li>
  <li><strong>Configuration</strong>: Allow users to explicitly set values to <code>0</code>, <code>false</code>, or <code>''</code></li>
  <li><strong>API Responses</strong>: Distinguish between "missing" and "explicitly set to falsy"</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Use <code>??</code> when you want to provide defaults only for truly missing values:</p>

<ul>
  <li><strong>Config Defaults</strong>: <code>const port = config.port ?? 3000</code> (allows port 0)</li>
  <li><strong>Optional Counts</strong>: <code>const items = response.count ?? 0</code></li>
  <li><strong>User Preferences</strong>: <code>const volume = settings.volume ?? 50</code> (allows 0 for mute)</li>
  <li><strong>Feature Flags</strong>: <code>const enabled = feature.enabled ?? true</code> (respects false)</li>
  <li><strong>Form Values</strong>: <code>const input = formData.value ?? ''</code></li>
  <li><strong>Database Fields</strong>: Distinguish NULL from empty/zero values</li>
</ul>

<p><strong>Nullish Assignment:</strong> <code>??=</code> assigns only if current value is nullish: <code>user.name ??= 'Guest'</code></p>

<p><strong>Challenge:</strong> Use the correct operator (?? or ||) for different default value scenarios.</p>`,
  examples: [
    {
      input: `const count = 0 ?? 10;`,
      output: `0`,
      explanation: '?? only uses default for null/undefined, not 0',
    },
    {
      input: `const count = 0 || 10;`,
      output: `10`,
      explanation: '|| uses default for any falsy value including 0',
    },
    {
      input: `const name = null ?? 'Guest';`,
      output: `'Guest'`,
      explanation: 'null triggers the default with ??',
    },
  ],
  starterCode: `function getConfigWithDefaults(config) {
  // TODO: Use ?? to set defaults that preserve valid falsy values
  // port: default 3000 (but 0 should be valid)
  // timeout: default 5000 (but 0 should be valid)
  // debug: default false (but explicit false/true should be respected)
  // name: default 'app' (but empty string '' should be valid)

  return {
    port: config.port || 3000,
    timeout: config.timeout || 5000,
    debug: config.debug || false,
    name: config.name || 'app'
  };
}

function getValue(value, defaultValue) {
  // TODO: Return value if it's not null/undefined, otherwise defaultValue
  // Use the nullish coalescing operator
  if (value !== null && value !== undefined) {
    return value;
  }
  return defaultValue;
}

function incrementCounter(current) {
  // TODO: If current is null/undefined, start at 0, then add 1
  // Use ?? to handle the null/undefined case
  let count;
  if (current === null || current === undefined) {
    count = 0;
  } else {
    count = current;
  }
  return count + 1;
}

// Test
console.log(getConfigWithDefaults({ port: 0, timeout: 0, debug: false, name: '' }));
console.log(getValue(0, 100));
console.log(getValue(null, 100));
console.log(incrementCounter(null));
console.log(incrementCounter(5));`,
  solution: `// Fix the function to use ?? instead of ||
// The issue: || treats 0, false, '' as falsy and uses default
// Solution: Use ?? which only treats null/undefined as falsy
function getConfigWithDefaults(config) {
  // port: default 3000 (but 0 should be valid)
  // timeout: default 5000 (but 0 should be valid)
  // debug: default false (but false should be valid)
  // name: default 'app' (but empty string '' should be valid)

  return {
    port: config.port ?? 3000,
    timeout: config.timeout ?? 5000,
    debug: config.debug ?? false,
    name: config.name ?? 'app'
  };
}

function getValue(value, defaultValue) {
  // Return value if it's not null/undefined, otherwise defaultValue
  // Use the nullish coalescing operator
  return value ?? defaultValue;
}

function incrementCounter(current) {
  // If current is null/undefined, start at 0, then add 1
  // Use ?? to handle the null/undefined case
  return (current ?? 0) + 1;
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    '?? only triggers for null and undefined, not other falsy values',
    '|| triggers for all falsy values: false, 0, "", null, undefined, NaN',
    'Use ?? when 0, false, or empty string are valid values',
    'You can chain: value1 ?? value2 ?? value3 ?? default',
  ],
};
