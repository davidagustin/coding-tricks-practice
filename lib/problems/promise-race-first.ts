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

<p>\<code>Promise.race()\</code> returns a promise that settles (resolves or rejects) as soon as the first promise in the array settles. This makes it perfect for scenarios where you want the fastest result from multiple sources.</p>

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
  solution: `// Mock fetch for testing without browser APIs
function mockFetch(url, delay, shouldSucceed, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve({ ok: true, json: () => Promise.resolve(data) });
      } else {
        reject(new Error(\`Failed to fetch \${url}\`));
      }
    }, delay);
  });
}

async function fetchFromFastest(sources) {
  // Use Promise.race to get result from fastest source
  // sources is array of { url, delay, success, data }
  const fetchPromises = sources.map(source =>
    mockFetch(source.url, source.delay, source.success, source.data)
      .then(response => {
        if (!response.ok) throw new Error('HTTP error');
        return response.json();
      })
  );

  return Promise.race(fetchPromises);
}

async function fetchWithFallback(primary, fallbacks) {
  // Try primary first, if it fails, race the fallbacks
  // primary and fallbacks are { url, delay, success, data }
  try {
    const response = await mockFetch(primary.url, primary.delay, primary.success, primary.data);
    if (!response.ok) throw new Error('Primary failed');
    return await response.json();
  } catch (primaryError) {
    // Primary failed, race the fallbacks
    if (fallbacks.length === 0) {
      throw primaryError;
    }

    const fallbackPromises = fallbacks.map(fb =>
      mockFetch(fb.url, fb.delay, fb.success, fb.data)
        .then(response => {
          if (!response.ok) throw new Error('Fallback failed');
          return response.json();
        })
    );

    return Promise.race(fallbackPromises);
  }
}

// Test function for test runner
async function testPromiseRace(testName) {
  if (testName === 'fastestWins') {
    const sources = [
      { url: 'slow', delay: 100, success: true, data: { source: 'slow' } },
      { url: 'fast', delay: 10, success: true, data: { source: 'fast', time: 'first' } },
      { url: 'medium', delay: 50, success: true, data: { source: 'medium' } }
    ];
    return await fetchFromFastest(sources);
  }
  if (testName === 'primarySuccess') {
    const primary = { url: 'primary', delay: 10, success: true, data: { source: 'primary' } };
    const fallbacks = [{ url: 'fallback', delay: 10, success: true, data: { source: 'fallback' } }];
    return await fetchWithFallback(primary, fallbacks);
  }
  if (testName === 'fallbackOnPrimaryFail') {
    const primary = { url: 'primary', delay: 10, success: false, data: null };
    const fallbacks = [{ url: 'fallback', delay: 10, success: true, data: { source: 'fallback' } }];
    return await fetchWithFallback(primary, fallbacks);
  }
  if (testName === 'raceRejectsFirst') {
    // When the first to settle rejects, Promise.race rejects
    const sources = [
      { url: 'fast-fail', delay: 10, success: false, data: null },
      { url: 'slow-success', delay: 100, success: true, data: { source: 'slow' } }
    ];
    try {
      await fetchFromFastest(sources);
      return { rejected: false };
    } catch (e) {
      return { rejected: true };
    }
  }
  return null;
}`,
  testCases: [
    {
      input: 'fastestWins',
      expectedOutput: { source: 'fast', time: 'first' },
      description: 'Returns result from fastest URL',
    },
    {
      input: 'primarySuccess',
      expectedOutput: { source: 'primary' },
      description: 'Uses primary when it succeeds',
    },
    {
      input: 'fallbackOnPrimaryFail',
      expectedOutput: { source: 'fallback' },
      description: 'Falls back when primary fails',
    },
    {
      input: 'raceRejectsFirst',
      expectedOutput: { rejected: true },
      description: 'Promise.race rejects if first to settle rejects',
    },
  ],
  hints: [
    'Promise.race resolves/rejects with first settled promise',
    'Useful for timeouts and fastest response',
    'Be careful - other promises continue running',
  ],
};
