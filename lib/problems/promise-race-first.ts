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
    description: `## In-Depth Explanation

\`Promise.race()\` returns a promise that settles (resolves or rejects) as soon as the first promise in the array settles. This makes it perfect for scenarios where you want the fastest result from multiple sources.

Unlike \`Promise.all()\`, which waits for all promises, \`race()\` returns immediately when any promise settles. This is useful for:
- Getting the fastest response from multiple APIs
- Implementing timeouts (race against a timeout promise)
- Fallback strategies (try primary, race fallbacks)
- Performance optimization (use fastest available service)

Important note: Other promises continue running even after one settles, so be mindful of resource usage.

## Importance

\`Promise.race()\` is essential for performance and resilience:

- **Performance**: Use fastest available service or response
- **User Experience**: Faster response times improve UX
- **Resilience**: Fallback to fastest available service when primary fails
- **Timeout Implementation**: Essential for implementing timeouts
- **Resource Optimization**: Can cancel slower operations (with AbortController)
- **Load Balancing**: Distribute load across multiple services

## Usefulness & Practical Applications

This pattern is used in many scenarios:

- **Multi-Source Fetching**: Fetching from multiple CDNs, using fastest response
- **Fallback Strategies**: Primary API fails, race fallback APIs
- **Service Discovery**: Finding fastest available service instance
- **Cache Strategies**: Racing cache lookup against network request
- **Timeout Implementation**: Racing operation against timeout promise
- **Performance Monitoring**: Measuring which service responds fastest
- **Geographic Routing**: Using fastest server based on location
- **Redundancy**: Multiple replicas, use fastest response

**Challenge:** Fetch from multiple sources and use the fastest response.`,
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
    solution: `async function fetchFromFastest(promises) {
  return Promise.race(promises);
}

async function fetchWithFallback(primaryUrl, fallbackUrls) {
  try {
    // Mock fetch for testing
    const mockFetch = () => Promise.resolve({ ok: true, json: () => Promise.resolve('primary') });
    const response = await mockFetch();
    if (response.ok) {
      return response.json();
    }
    throw new Error('Primary failed');
  } catch (error) {
    return fetchFromFastest(fallbackUrls.map(() => Promise.resolve('fallback')));
  }
}

// Test function
async function testFetchFromFastest() {
  const promises = [Promise.resolve('fast'), Promise.resolve('slow')];
  const result = await fetchFromFastest(promises);
  return result === 'fast';
}`,
    testCases: [
      {
        input: [],
        expectedOutput: true,
        description: 'testFetchFromFastest',
      },
    ],
    hints: [
      'Promise.race resolves/rejects with first settled promise',
      'Useful for timeouts and fastest response',
      'Be careful - other promises continue running',
    ],
  };
