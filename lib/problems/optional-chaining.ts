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
  id: 'optional-chaining',
  title: 'Optional Chaining (?.) for Safe Property Access',
  difficulty: 'easy',
  category: 'JavaScript Basics',
  description: `<h2>In-Depth Explanation</h2>

<p>The optional chaining operator <code>?.</code> allows you to safely access deeply nested properties without having to explicitly check each level for <code>null</code> or <code>undefined</code>. If any part of the chain is nullish, the entire expression short-circuits and returns <code>undefined</code>.</p>

<p><strong>Syntax variations:</strong></p>
<ul>
  <li><code>obj?.prop</code> - Property access</li>
  <li><code>obj?.[expr]</code> - Dynamic property access</li>
  <li><code>func?.(args)</code> - Function call (only calls if function exists)</li>
  <li><code>arr?.[index]</code> - Array element access</li>
</ul>

<p><strong>How it works:</strong></p>
<ul>
  <li>If the value before <code>?.</code> is <code>null</code> or <code>undefined</code>, stop and return <code>undefined</code></li>
  <li>Otherwise, continue accessing the property normally</li>
  <li>Can be chained: <code>obj?.a?.b?.c</code></li>
</ul>

<h2>Importance</h2>

<p>Optional chaining eliminates verbose null checking:</p>

<ul>
  <li><strong>Before</strong>: <code>user && user.address && user.address.city</code></li>
  <li><strong>After</strong>: <code>user?.address?.city</code></li>
  <li><strong>Prevents Errors</strong>: No more "Cannot read property of undefined"</li>
  <li><strong>Cleaner Code</strong>: Reduces nested conditionals and guard clauses</li>
  <li><strong>API Safety</strong>: Safely handle incomplete or unexpected API responses</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Optional chaining is essential for working with real-world data:</p>

<ul>
  <li><strong>API Responses</strong>: <code>response?.data?.users?.[0]?.name</code></li>
  <li><strong>User Objects</strong>: <code>user?.profile?.settings?.theme</code></li>
  <li><strong>DOM Queries</strong>: <code>document.querySelector('.btn')?.textContent</code></li>
  <li><strong>Optional Callbacks</strong>: <code>config.onSuccess?.(result)</code></li>
  <li><strong>Array Access</strong>: <code>items?.[0]?.id</code></li>
  <li><strong>Method Calls</strong>: <code>obj.method?.()</code></li>
  <li><strong>Dynamic Properties</strong>: <code>obj?.[dynamicKey]</code></li>
</ul>

<p><strong>Combining with ??:</strong> Use with nullish coalescing for defaults: <code>user?.name ?? 'Guest'</code></p>

<p><strong>Challenge:</strong> Replace verbose null checks with optional chaining.</p>`,
  examples: [
    {
      input: `const city = user?.address?.city;`,
      output: `'NYC' or undefined`,
      explanation: 'Safely access nested property without checking each level',
    },
    {
      input: `const first = arr?.[0];`,
      output: `first element or undefined`,
      explanation: 'Safely access array element',
    },
    {
      input: `callback?.();`,
      output: `calls function or does nothing`,
      explanation: 'Safely call function if it exists',
    },
  ],
  starterCode: `function getUserCity(user) {
  // TODO: Use optional chaining to safely get user.address.city
  // Return the city or undefined if any part is missing
  if (user && user.address && user.address.city) {
    return user.address.city;
  }
  return undefined;
}

function getFirstItemName(data) {
  // TODO: Safely get data.items[0].name using optional chaining
  // Return the name or 'No items' if any part is missing
  if (data && data.items && data.items[0] && data.items[0].name) {
    return data.items[0].name;
  }
  return 'No items';
}

function callCallback(config, value) {
  // TODO: Safely call config.onComplete(value) if it exists
  // Use optional chaining for function calls
  // Return the result or undefined
  if (config && typeof config.onComplete === 'function') {
    return config.onComplete(value);
  }
  return undefined;
}

// Test
console.log(getUserCity({ address: { city: 'NYC' } }));
console.log(getUserCity({ address: {} }));
console.log(getUserCity(null));
console.log(getFirstItemName({ items: [{ name: 'Widget' }] }));
console.log(getFirstItemName({ items: [] }));
console.log(callCallback({ onComplete: x => x * 2 }, 5));
console.log(callCallback({}, 5));`,
  solution: `function getUserCity(user) {
  // Use optional chaining to safely get user.address.city
  return user?.address?.city;
}

function getFirstItemName(data) {
  // Safely get data.items[0].name using optional chaining
  // Return the name or 'No items' if any part is missing
  return data?.items?.[0]?.name ?? 'No items';
}

function callCallback(config, value) {
  // Safely call config.onComplete(value) if it exists
  // Use optional chaining for function calls
  return config?.onComplete?.(value);
}

// Test
console.log(getUserCity({ address: { city: 'NYC' } }));
console.log(getUserCity({ address: {} }));
console.log(getUserCity(null));
console.log(getFirstItemName({ items: [{ name: 'Widget' }] }));
console.log(getFirstItemName({ items: [] }));
console.log(callCallback({ onComplete: x => x * 2 }, 5));
console.log(callCallback({}, 5));`,
  testCases: [
    {
      input: [{ address: { city: 'NYC' } }],
      expectedOutput: 'NYC',
      description: 'getUserCity returns city when path exists',
    },
    {
      input: [{ address: {} }],
      expectedOutput: undefined,
      description: 'getUserCity returns undefined when city is missing',
    },
    {
      input: [null],
      expectedOutput: undefined,
      description: 'getUserCity returns undefined for null user',
    },
    {
      input: [{ items: [{ name: 'Widget' }] }],
      expectedOutput: 'Widget',
      description: 'getFirstItemName returns name when it exists',
    },
    {
      input: [{ items: [] }],
      expectedOutput: 'No items',
      description: 'getFirstItemName returns default for empty array',
    },
    {
      input: [{ onComplete: (x) => x * 2 }, 5],
      expectedOutput: 10,
      description: 'callCallback calls function and returns result',
    },
    {
      input: [{}, 5],
      expectedOutput: undefined,
      description: 'callCallback returns undefined when function missing',
    },
  ],
  hints: [
    'Use ?. instead of && chains for property access',
    'For arrays use ?.[index] to safely access elements',
    'For function calls use ?.() to only call if function exists',
    'Combine with ?? for default values: user?.name ?? "Guest"',
  ],
};
