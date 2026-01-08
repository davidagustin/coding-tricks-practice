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
    description: `## In-Depth Explanation

\`async/await\` provides a synchronous-looking syntax for asynchronous code, but error handling requires \`try/catch\` blocks (unlike promise chains which use \`.catch()\`). When an \`await\`ed promise rejects, it throws an exception that must be caught.

The key points:
- \`await\` throws exceptions when promises reject
- Use \`try/catch\` to handle these exceptions
- Errors propagate up the call stack if not caught
- Multiple \`await\` calls in a try block: first rejection triggers catch
- Can use \`Promise.allSettled()\` to handle multiple operations independently

This makes error handling more intuitive for developers familiar with synchronous code, but requires understanding that async functions always return promises.

## Importance

Proper async/await error handling is critical because:

- **Unhandled Rejections**: Uncaught errors become unhandled promise rejections
- **User Experience**: Errors must be caught and displayed to users
- **Debugging**: Proper error handling makes debugging easier
- **Application Stability**: Prevents crashes from unhandled errors
- **Error Recovery**: Enables graceful error recovery and fallbacks
- **Best Practice**: Industry standard for modern async JavaScript

## Usefulness & Practical Applications

Error handling is essential in all async operations:

- **API Calls**: Catching network errors, timeouts, and API errors
- **Data Fetching**: Handling fetch failures and parsing errors
- **Form Submission**: Catching validation and submission errors
- **File Operations**: Handling file read/write errors
- **Database Queries**: Handling query errors and connection failures
- **Authentication**: Handling login/authentication errors
- **Third-Party APIs**: Handling failures from external services
- **User Actions**: Catching errors from user-triggered async operations

**Challenge:** Properly catch and handle async errors.`,
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
