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
  id: 'promise-any',
  title: 'Promise.any() for First Success',
  difficulty: 'medium',
  category: 'Async/Promises',
  description: `<h2>In-Depth Explanation</h2>

<p><code>Promise.any()</code> is a promise combinator that takes an iterable of promises and returns a single promise that resolves as soon as <strong>any</strong> of the input promises fulfills. Unlike <code>Promise.race()</code>, which settles with the first promise to settle (whether fulfilled or rejected), <code>Promise.any()</code> only settles when the first promise <em>fulfills</em>.</p>

<p>Key characteristics of <code>Promise.any()</code>:</p>
<ul>
  <li><strong>First Success Wins</strong>: Resolves with the value of the first fulfilled promise</li>
  <li><strong>Ignores Rejections</strong>: Rejections are ignored unless ALL promises reject</li>
  <li><strong>AggregateError</strong>: If all promises reject, throws an <code>AggregateError</code> containing all rejection reasons</li>
  <li><strong>Short-circuits</strong>: Stops waiting once a promise fulfills</li>
  <li><strong>Empty Iterable</strong>: Returns a rejected promise with <code>AggregateError</code> if given an empty iterable</li>
</ul>

<p>The <code>AggregateError</code> is a special error type that contains an <code>errors</code> array with all the individual rejection reasons, making it easy to inspect what went wrong with each promise.</p>

<h2>Importance</h2>

<p><code>Promise.any()</code> is essential for building resilient applications:</p>

<ul>
  <li><strong>Redundancy Patterns</strong>: Try multiple sources and use whichever responds first successfully</li>
  <li><strong>Fallback Mechanisms</strong>: Automatically fall back to alternative services</li>
  <li><strong>Performance Optimization</strong>: Race multiple equivalent services and use the fastest</li>
  <li><strong>High Availability</strong>: Build systems that remain available when some services fail</li>
  <li><strong>CDN Selection</strong>: Automatically select the fastest responding CDN</li>
  <li><strong>Database Replicas</strong>: Query multiple database replicas for better availability</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>This pattern is valuable in many scenarios:</p>

<ul>
  <li><strong>Multi-CDN Loading</strong>: Load assets from multiple CDNs, using whichever responds first</li>
  <li><strong>API Redundancy</strong>: Call multiple equivalent API endpoints for resilience</li>
  <li><strong>Service Discovery</strong>: Find the first available service instance</li>
  <li><strong>Cache Fallback</strong>: Try cache, then local storage, then network</li>
  <li><strong>Geographic Routing</strong>: Query multiple regional servers simultaneously</li>
  <li><strong>Authentication Providers</strong>: Try multiple auth providers and use first success</li>
  <li><strong>Resource Loading</strong>: Load resources with automatic failover</li>
  <li><strong>Health Checks</strong>: Check multiple endpoints for system health</li>
</ul>

<p><strong>Challenge:</strong> Implement a function that fetches data from multiple sources and returns the first successful response, with proper error handling when all sources fail.</p>`,
  examples: [
    {
      input: `Promise.any([
  fetch('https://api1.example.com/data'),
  fetch('https://api2.example.com/data'),
  fetch('https://api3.example.com/data')
])`,
      output: `Response from first successful fetch`,
      explanation: 'Returns the first API response that succeeds, ignoring failures',
    },
    {
      input: `Promise.any([
  Promise.reject('Error 1'),
  Promise.resolve('Success!'),
  Promise.reject('Error 2')
])`,
      output: `'Success!'`,
      explanation: 'Resolves with "Success!" since it\'s the first (and only) fulfilled promise',
    },
    {
      input: `Promise.any([
  Promise.reject('Error 1'),
  Promise.reject('Error 2')
]).catch(e => e.errors)`,
      output: `['Error 1', 'Error 2']`,
      explanation: 'When all promises reject, AggregateError contains all rejection reasons',
    },
  ],
  starterCode: `// Fetch data from the first available source
async function fetchFromFirstAvailable(urls) {
  // TODO: Use Promise.any() to fetch from multiple URLs
  // Return the first successful response data
  // If all fail, throw a meaningful error message

  return null;
}

// Load a resource with fallback sources
async function loadWithFallback(primaryUrl, fallbackUrls) {
  // TODO: Try primary URL first, then fallback URLs using Promise.any()
  // Return { source: 'primary' | 'fallback', data: ... }

  return { source: 'primary', data: null };
}

// Find first available service
async function findAvailableService(serviceChecks) {
  // TODO: serviceChecks is an array of { name: string, check: () => Promise<boolean> }
  // Use Promise.any() to find the first service that returns true
  // Return the name of the first available service
  // If none available, return null

  return null;
}

// Test functions (commented out to prevent immediate execution)
// const urls = ['https://api1.com/data', 'https://api2.com/data'];
// fetchFromFirstAvailable(urls).then(console.log).catch(console.error);`,
  solution: `// Fetch data from the first available source
async function fetchFromFirstAvailable(urls) {
  // Use Promise.any() to fetch from multiple URLs
  // Return the first successful response data
  // If all fail, throw a meaningful error message
  try {
    const fetchPromises = urls.map(url =>
      fetch(url).then(response => {
        if (!response.ok) throw new Error(\`HTTP error: \${response.status}\`);
        return response.json();
      })
    );
    const data = await Promise.any(fetchPromises);
    return data;
  } catch (error) {
    if (error instanceof AggregateError) {
      throw new Error(\`All \${urls.length} sources failed: \${error.errors.map(e => e.message).join(', ')}\`);
    }
    throw error;
  }
}

// Load a resource with fallback sources
async function loadWithFallback(primaryUrl, fallbackUrls) {
  // Try primary URL first, then fallback URLs using Promise.any()
  // Return { source: 'primary' | 'fallback', data: ... }
  try {
    const response = await fetch(primaryUrl);
    if (!response.ok) throw new Error('Primary failed');
    const data = await response.json();
    return { source: 'primary', data };
  } catch {
    // Primary failed, try fallbacks
    try {
      const fallbackPromises = fallbackUrls.map(url =>
        fetch(url).then(r => {
          if (!r.ok) throw new Error('Fallback failed');
          return r.json();
        })
      );
      const data = await Promise.any(fallbackPromises);
      return { source: 'fallback', data };
    } catch (error) {
      throw new Error('All sources (primary and fallbacks) failed');
    }
  }
}

// Find first available service
async function findAvailableService(serviceChecks) {
  // serviceChecks is an array of { name: string, check: () => Promise<boolean> }
  // Use Promise.any() to find the first service that returns true
  // Return the name of the first available service
  // If none available, return null
  try {
    const checkPromises = serviceChecks.map(async ({ name, check }) => {
      const isAvailable = await check();
      if (isAvailable) return name;
      throw new Error(\`\${name} not available\`);
    });
    return await Promise.any(checkPromises);
  } catch (error) {
    if (error instanceof AggregateError) {
      return null;
    }
    throw error;
  }
}

// Test functions (commented out to prevent immediate execution)
// const urls = ['https://api1.com/data', 'https://api2.com/data'];
// fetchFromFirstAvailable(urls).then(console.log).catch(console.error);`,
  testCases: [
    {
      input: 'firstSuccess',
      expectedOutput: { data: 'from-api-2', source: 'first-available' },
      description: 'Returns first successful response',
    },
    {
      input: 'allFail',
      expectedOutput: { error: true },
      description: 'Throws error when all sources fail',
    },
    {
      input: 'primarySuccess',
      expectedOutput: { source: 'primary' },
      description: 'Uses primary when available',
    },
    {
      input: 'fallbackSuccess',
      expectedOutput: { source: 'fallback' },
      description: 'Falls back when primary fails',
    },
    {
      input: 'findService',
      expectedOutput: { name: 'service-b' },
      description: 'Finds first available service',
    },
  ],
  hints: [
    'Promise.any() resolves with the first fulfilled promise, ignoring rejections until all fail',
    'When all promises reject, Promise.any() throws an AggregateError with an errors array',
    'Use try/catch with instanceof AggregateError to handle the all-rejected case specially',
    'Remember that Promise.any() short-circuits on first success, so remaining promises are ignored',
  ],
};
