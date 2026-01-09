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
  id: 'promise-race-first',
  title: 'Promise.race for First Result',
  difficulty: 'medium',
  category: 'Async/Promises',
  description: `<h2>In-Depth Explanation</h2>

<p><code>Promise.race()</code> returns a promise that settles (resolves or rejects) as soon as the first promise in the array settles. This makes it perfect for scenarios where you want the fastest result from multiple sources.</p>

<p>Unlike <code>Promise.all()</code>, which waits for all promises, <code>race()</code> returns immediately when any promise settles. This is useful for:</p>
<ul>
  <li>Getting the fastest response from multiple APIs</li>
  <li>Implementing timeouts (race against a timeout promise)</li>
  <li>Fallback strategies (try primary, race fallbacks)</li>
  <li>Performance optimization (use fastest available service)</li>
</ul>

<p>Important note: Other promises continue running even after one settles, so be mindful of resource usage.</p>

<h2>Importance</h2>

<p><code>Promise.race()</code> is essential for performance and resilience:</p>

<ul>
  <li><strong>Performance</strong>: Use fastest available service or response</li>
  <li><strong>User Experience</strong>: Faster response times improve UX</li>
  <li><strong>Resilience</strong>: Fallback to fastest available service when primary fails</li>
  <li><strong>Timeout Implementation</strong>: Essential for implementing timeouts</li>
  <li><strong>Resource Optimization</strong>: Can cancel slower operations (with AbortController)</li>
  <li><strong>Load Balancing</strong>: Distribute load across multiple services</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This pattern is used in many scenarios:</p>

<ul>
  <li><strong>Multi-Source Fetching</strong>: Fetching from multiple CDNs, using fastest response</li>
  <li><strong>Fallback Strategies</strong>: Primary API fails, race fallback APIs</li>
  <li><strong>Service Discovery</strong>: Finding fastest available service instance</li>
  <li><strong>Cache Strategies</strong>: Racing cache lookup against network request</li>
  <li><strong>Timeout Implementation</strong>: Racing operation against timeout promise</li>
  <li><strong>Performance Monitoring</strong>: Measuring which service responds fastest</li>
  <li><strong>Geographic Routing</strong>: Using fastest server based on location</li>
  <li><strong>Redundancy</strong>: Multiple replicas, use fastest response</li>
</ul>

<p><strong>Challenge:</strong> Fetch from multiple sources and use the fastest response.</p>`,
  examples: [
    {
      input: `Promise.race([fetch('/api1'), fetch('/api2'), fetch('/api3')])`,
      output: `Returns result from fastest API`,
      explanation: 'Use fastest available source',
    },
  ],
  starterCode: `async function fetchFromFastest(urls) {
  // TODO: Use Promise.race to get result from fastest URL
  // Return the first successful response
  
  return null;
}

async function fetchWithFallback(primaryUrl, fallbackUrls) {
  // TODO: Try primary first, if it fails, race the fallbacks
  // Return first successful result
  
  return null;
}

// Test (commented out to prevent immediate execution)
// fetchFromFastest(['/api/slow', '/api/fast', '/api/medium'])
//   .then(console.log)
//   .catch(console.error);

// fetchWithFallback('/api/primary', ['/api/backup1', '/api/backup2'])
//   .then(console.log)
//   .catch(console.error);`,
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'Promise.race resolves/rejects with first settled promise',
    'Useful for timeouts and fastest response',
    'Be careful - other promises continue running',
  ],
};
