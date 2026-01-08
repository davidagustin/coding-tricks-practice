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
  id: 'promise-all-vs-allsettled',
  title: 'Promise.all vs Promise.allSettled',
  difficulty: 'medium',
  category: 'Async/Promises',
  description: `<h2>In-Depth Explanation</h2>

<p><code>Promise.all()</code> and <code>Promise.allSettled()</code> both handle multiple promises, but with fundamentally different behaviors:</p>

<ul>
  <li><strong>Promise.all()</strong>: Returns a promise that resolves when all promises resolve, or rejects immediately when the first promise rejects (fail-fast behavior). All promises must succeed.</li>
  <li><strong>Promise.allSettled()</strong>: Returns a promise that always resolves (never rejects) after all promises settle, regardless of individual outcomes. You get results for all promises, both successes and failures.</li>
</ul>

<p>The choice between them depends on your requirements:</p>
<ul>
  <li>Use <code>Promise.all()</code> when you need all operations to succeed (all-or-nothing)</li>
  <li>Use <code>Promise.allSettled()</code> when you want partial results and can handle individual failures</li>
</ul>

<h2>Importance</h2>

<p>Choosing the right method is crucial for application behavior:</p>

<ul>
  <li><strong>Error Handling</strong>: Different error handling strategies (fail-fast vs graceful degradation)</li>
  <li><strong>User Experience</strong>: <code>allSettled</code> provides better UX by showing partial results</li>
  <li><strong>Data Integrity</strong>: <code>all</code> ensures data consistency (all or nothing)</li>
  <li><strong>Resilience</strong>: <code>allSettled</code> makes systems more resilient to partial failures</li>
  <li><strong>Performance</strong>: <code>all</code> can be faster (stops early on failure), <code>allSettled</code> always waits for all</li>
  <li><strong>Debugging</strong>: Different methods provide different information about failures</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>These methods are used in different scenarios:</p>

<p><strong>Promise.all()</strong> - When all must succeed:</p>
<ul>
  <li><strong>Transaction Processing</strong>: All database operations must succeed</li>
  <li><strong>Form Submission</strong>: All validations must pass</li>
  <li><strong>Multi-step Workflows</strong>: All steps must complete successfully</li>
  <li><strong>Data Synchronization</strong>: All data sources must be synchronized</li>
</ul>

<p><strong>Promise.allSettled()</strong> - When partial success is acceptable:</p>
<ul>
  <li><strong>Multi-API Calls</strong>: Fetching from multiple APIs where some may be down</li>
  <li><strong>Batch Operations</strong>: Processing multiple items where individual failures are acceptable</li>
  <li><strong>Analytics Collection</strong>: Collecting analytics from multiple services</li>
  <li><strong>Notification Systems</strong>: Sending notifications through multiple channels</li>
  <li><strong>Data Aggregation</strong>: Collecting data from multiple sources</li>
</ul>

<p><strong>Challenge:</strong> Use the right method for different scenarios.</p>`,
  examples: [
    {
      input: `const promises = [fetch('/api/1'), fetch('/api/2'), fetch('/api/3')];`,
      output: `all: fails if any fail, allSettled: always resolves`,
      explanation: 'Choose based on whether you need all or can tolerate failures',
    },
  ],
  starterCode: `async function fetchAllOrFail(urls) {
  // TODO: Use Promise.all - should fail if ANY request fails
  // Return array of responses
  
  return [];
}

async function fetchAllWithFailures(urls) {
  // TODO: Use Promise.allSettled - should return all results even if some fail
  // Return array with { status, value/error }
  
  return [];
}

// Test (commented out to prevent immediate execution)
// const urls = ['/api/1', '/api/2', '/api/3'];
// fetchAllOrFail(urls).then(console.log).catch(console.error);
// fetchAllWithFailures(urls).then(console.log).catch(console.error);`,
  solution: `async function fetchAllOrFail(urls) {
  // Use Promise.all - fails if ANY request fails
  const fetchPromises = urls.map(url =>
    fetch(url).then(res => {
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      return res.json();
    })
  );

  return Promise.all(fetchPromises);
}

async function fetchAllWithFailures(urls) {
  // Use Promise.allSettled - returns all results even if some fail
  const fetchPromises = urls.map(url =>
    fetch(url).then(res => {
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      return res.json();
    })
  );

  const results = await Promise.allSettled(fetchPromises);

  return results.map((result, index) => ({
    url: urls[index],
    status: result.status,
    ...(result.status === 'fulfilled'
      ? { value: result.value }
      : { error: result.reason?.message || 'Unknown error' })
  }));
}

// Test
// const urls = ['/api/1', '/api/2', '/api/3'];
// fetchAllOrFail(urls).then(console.log).catch(console.error);
// fetchAllWithFailures(urls).then(console.log).catch(console.error);`,
  testCases: [
    {
      input: { fn: 'fetchAllOrFail', urls: ['url1', 'url2'], mockResults: ['data1', 'data2'] },
      expectedOutput: ['data1', 'data2'],
      description: 'fetchAllOrFail returns array of data when all succeed',
    },
    {
      input: { fn: 'fetchAllOrFail', urls: ['url1', 'url2'], mockResults: ['data1', { error: 'fail' }] },
      expectedOutput: { throws: true },
      description: 'fetchAllOrFail throws when any request fails',
    },
    {
      input: { fn: 'fetchAllWithFailures', urls: ['url1', 'url2'], mockResults: ['data1', { error: 'fail' }] },
      expectedOutput: [
        { url: 'url1', status: 'fulfilled', value: 'data1' },
        { url: 'url2', status: 'rejected', error: 'fail' }
      ],
      description: 'fetchAllWithFailures returns status for each request',
    },
  ],
  hints: [
    'Promise.all rejects if any promise rejects',
    'Promise.allSettled always resolves with status for each',
    'Use all when you need all; allSettled when some can fail',
  ],
};
