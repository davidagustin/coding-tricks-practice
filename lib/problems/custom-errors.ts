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
  id: 'custom-errors',
  title: 'Creating Custom Error Classes',
  difficulty: 'medium',
  category: 'Error Handling',
  description: `<h2>In-Depth Explanation</h2>

<p>Custom error classes extend JavaScript's built-in Error class to create domain-specific errors with additional context and functionality. They allow you to distinguish between different types of errors and handle them appropriately.</p>

<p>When creating custom errors, you should:</p>
<ol>
  <li>Extend the built-in Error class</li>
  <li>Call <code>super(message)</code> in the constructor</li>
  <li>Set the error name to match the class name</li>
  <li>Fix the prototype chain with <code>Object.setPrototypeOf</code></li>
  <li>Add custom properties for additional context</li>
  <li>Optionally capture the stack trace properly</li>
</ol>

<p>Common custom error types include:</p>
<ul>
  <li><strong>ValidationError</strong>: Invalid input data</li>
  <li><strong>NotFoundError</strong>: Resource not found (404-like)</li>
  <li><strong>AuthenticationError</strong>: Authentication failures</li>
  <li><strong>AuthorizationError</strong>: Permission denied</li>
  <li><strong>NetworkError</strong>: Network-related failures</li>
  <li><strong>TimeoutError</strong>: Operation timeout</li>
</ul>

<h2>Importance</h2>

<p>Custom errors are important because:</p>

<ul>
  <li><strong>Specificity</strong>: Different error types require different handling strategies</li>
  <li><strong>Context</strong>: Custom properties provide additional debugging information</li>
  <li><strong>Type Safety</strong>: instanceof checks enable type-safe error handling</li>
  <li><strong>API Design</strong>: Clear error contracts make APIs easier to use</li>
  <li><strong>Logging</strong>: Structured errors improve log analysis</li>
  <li><strong>HTTP Mapping</strong>: Custom errors can map to specific HTTP status codes</li>
</ul>

<h2>Practical Applications</h2>

<ul>
  <li><strong>REST APIs</strong>: Mapping errors to appropriate HTTP status codes</li>
  <li><strong>Form Validation</strong>: Detailed validation error messages</li>
  <li><strong>Database Operations</strong>: Distinguishing constraint violations from connection errors</li>
  <li><strong>File Processing</strong>: Different errors for missing files vs. permission issues</li>
  <li><strong>Third-party Integrations</strong>: Wrapping external errors in domain-specific errors</li>
</ul>

<p><strong>Challenge:</strong> Create a hierarchy of custom error classes for a user management system.</p>`,
  examples: [
    {
      input: `throw new ValidationError('Invalid email format', 'email')`,
      output: `ValidationError: Invalid email format (field: email)`,
      explanation: 'ValidationError includes the field that failed validation',
    },
    {
      input: `throw new NotFoundError('User', '12345')`,
      output: `NotFoundError: User with id 12345 not found`,
      explanation: 'NotFoundError includes resource type and identifier',
    },
    {
      input: `error instanceof ValidationError`,
      output: `true`,
      explanation: 'Custom errors work with instanceof for type checking',
    },
  ],
  starterCode: `// TODO: Create custom error classes and handleError function

// handleError takes an error type and arguments, creates the appropriate error,
// and returns a formatted response object

function handleError(errorType, ...args) {
  // TODO: Based on errorType, create the appropriate error and return its details
  // errorType can be: 'validation', 'notfound', 'auth', 'generic'
  //
  // For 'validation': args = [message, field]
  //   Return: { type: 'ValidationError', status: 400, message: 'message (field: field)' }
  //
  // For 'notfound': args = [resourceType, resourceId]
  //   Return: { type: 'NotFoundError', status: 404, message: 'resourceType with id resourceId not found' }
  //
  // For 'auth': no args
  //   Return: { type: 'AuthenticationError', status: 401, message: 'Authentication required' }
  //
  // For 'generic': args = [message]
  //   Return: { type: 'Error', status: 500, message: message }

  return { type: 'Error', status: 500, message: 'Unknown error' };
}

// Test
console.log(handleError('validation', 'Email is invalid', 'email'));
console.log(handleError('notfound', 'User', '12345'));
console.log(handleError('auth'));
console.log(handleError('generic', 'Something went wrong'));`,
  solution: `function handleError(errorType, ...args) {
  switch (errorType) {
    case 'validation': {
      const [message, field] = args;
      return {
        type: 'ValidationError',
        status: 400,
        message: \`\${message} (field: \${field})\`
      };
    }
    case 'notfound': {
      const [resourceType, resourceId] = args;
      return {
        type: 'NotFoundError',
        status: 404,
        message: \`\${resourceType} with id \${resourceId} not found\`
      };
    }
    case 'auth': {
      return {
        type: 'AuthenticationError',
        status: 401,
        message: 'Authentication required'
      };
    }
    case 'generic':
    default: {
      const [message] = args;
      return {
        type: 'Error',
        status: 500,
        message: message || 'Unknown error'
      };
    }
  }
}

// Test
console.log(handleError('validation', 'Email is invalid', 'email'));
console.log(handleError('notfound', 'User', '12345'));
console.log(handleError('auth'));
console.log(handleError('generic', 'Something went wrong'));`,
  testCases: [
    {
      input: ['validation', 'Email is invalid', 'email'],
      expectedOutput: { type: 'ValidationError', status: 400, message: 'Email is invalid (field: email)' },
      description: 'handleError returns ValidationError details',
    },
    {
      input: ['notfound', 'User', '12345'],
      expectedOutput: { type: 'NotFoundError', status: 404, message: 'User with id 12345 not found' },
      description: 'handleError returns NotFoundError details',
    },
    {
      input: ['auth'],
      expectedOutput: { type: 'AuthenticationError', status: 401, message: 'Authentication required' },
      description: 'handleError returns AuthenticationError details',
    },
    {
      input: ['generic', 'Something went wrong'],
      expectedOutput: { type: 'Error', status: 500, message: 'Something went wrong' },
      description: 'handleError returns generic Error details',
    },
  ],
  hints: [
    'Always call super(message) first in your constructor',
    'Set this.name = this.constructor.name for proper error names',
    'Use Object.setPrototypeOf(this, new.target.prototype) to fix instanceof',
    'Add Error.captureStackTrace?.(this, this.constructor) for better stack traces',
    'Use instanceof to check error types in catch blocks',
  ],
};
