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
  id: 'async-await-error',
  title: 'Async/Await Error Handling',
  difficulty: 'easy',
  category: 'Async/Promises',
  description: `<h2>In-Depth Explanation</h2>

<p><code>async/await</code> provides a synchronous-looking syntax for asynchronous code, but error handling requires <code>try/catch</code> blocks (unlike promise chains which use <code>.catch()</code>). When an <code>await</code>ed promise rejects, it throws an exception that must be caught.</p>

<p>The key points:</p>
<ul>
  <li><code>await</code> throws exceptions when promises reject</li>
  <li>Use <code>try/catch</code> to handle these exceptions</li>
  <li>Errors propagate up the call stack if not caught</li>
  <li>Multiple <code>await</code> calls in a try block: first rejection triggers catch</li>
  <li>Can use <code>Promise.allSettled()</code> to handle multiple operations independently</li>
</ul>

<p>This makes error handling more intuitive for developers familiar with synchronous code, but requires understanding that async functions always return promises.</p>

<h2>Importance</h2>

<p>Proper async/await error handling is critical because:</p>

<ul>
  <li><strong>Unhandled Rejections</strong>: Uncaught errors become unhandled promise rejections</li>
  <li><strong>User Experience</strong>: Errors must be caught and displayed to users</li>
  <li><strong>Debugging</strong>: Proper error handling makes debugging easier</li>
  <li><strong>Application Stability</strong>: Prevents crashes from unhandled errors</li>
  <li><strong>Error Recovery</strong>: Enables graceful error recovery and fallbacks</li>
  <li><strong>Best Practice</strong>: Industry standard for modern async JavaScript</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Error handling is essential in all async operations:</p>

<ul>
  <li><strong>API Calls</strong>: Catching network errors, timeouts, and API errors</li>
  <li><strong>Data Fetching</strong>: Handling fetch failures and parsing errors</li>
  <li><strong>Form Submission</strong>: Catching validation and submission errors</li>
  <li><strong>File Operations</strong>: Handling file read/write errors</li>
  <li><strong>Database Queries</strong>: Handling query errors and connection failures</li>
  <li><strong>Authentication</strong>: Handling login/authentication errors</li>
  <li><strong>Third-Party APIs</strong>: Handling failures from external services</li>
  <li><strong>User Actions</strong>: Catching errors from user-triggered async operations</li>
</ul>

<p><strong>Challenge:</strong> Properly catch and handle async errors.</p>`,
  examples: [
    {
      input: `try { const data = await fetchData(); } catch (error) { ... }`,
      output: `Errors are caught`,
      explanation: 'Use try/catch with async/await',
    },
  ],
  starterCode: `async function fetchUserData(userId) {
  // TODO: Fetch user, handle errors
  // If fetch fails, return null
  // If user not found (404), return null
  // Otherwise return user data
  
  const response = await fetch(\`/api/users/\${userId}\`);
  return response.json();
}

async function fetchMultipleUsers(userIds) {
  // TODO: Fetch all users, return array
  // If any fetch fails, skip that user (don't fail entire operation)
  
  return [];
}

// Test (commented out to prevent immediate execution)
// fetchUserData(1).then(console.log).catch(console.error);
// fetchMultipleUsers([1, 2, 3]).then(console.log).catch(console.error);`,
  solution: `async function fetchUserData(userId) {
  try {
    // Mock fetch for testing
    const mockFetch = () => Promise.resolve({ 
      ok: true, 
      json: () => Promise.resolve({ id: userId, name: 'John' }) 
    });
    const response = await mockFetch();
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    return null;
  }
}

async function fetchMultipleUsers(userIds) {
  const results = await Promise.allSettled(
    userIds.map(id => fetchUserData(id))
  );
  
  return results
    .filter(r => r.status === 'fulfilled' && r.value !== null)
    .map(r => r.value);
}

// Test function
async function testFetchUserData() {
  const result = await fetchUserData(1);
  return result !== null && typeof result === 'object';
}`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'testFetchUserData',
    },
  ],
  hints: [
    'Wrap await in try/catch',
    'Check response.ok for HTTP errors',
    'Use Promise.allSettled for multiple operations',
  ],
};
