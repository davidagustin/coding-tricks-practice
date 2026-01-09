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
  starterCode: `// TODO: Create custom error classes

// Base application error with HTTP status code support
class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    // TODO: Call super, set properties, fix prototype chain
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Validation error with field information
class ValidationError extends AppError {
  field: string;

  constructor(message: string, field: string) {
    // TODO: Implement
    super(message, 400);
    this.field = field;
  }
}

// Not found error with resource information
class NotFoundError extends AppError {
  resourceType: string;
  resourceId: string;

  constructor(resourceType: string, resourceId: string) {
    // TODO: Implement with descriptive message
    super(\`\${resourceType} not found\`, 404);
    this.resourceType = resourceType;
    this.resourceId = resourceId;
  }
}

// Authentication error
class AuthenticationError extends AppError {
  // TODO: Implement
  constructor(message: string = 'Authentication required') {
    super(message, 401);
  }
}

// Function to test error handling
function handleError(error: Error): { type: string; status: number; message: string } {
  // TODO: Return appropriate response based on error type
  return { type: 'Error', status: 500, message: error.message };
}

// Test
try {
  throw new ValidationError('Email is invalid', 'email');
} catch (e) {
  console.log(handleError(e as Error));
}`,
  solution: `// Base application error with HTTP status code support
class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = true;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, this.constructor);
  }
}

// Validation error with field information
class ValidationError extends AppError {
  field: string;

  constructor(message: string, field: string) {
    super(message, 400);
    this.field = field;
  }
}

// Not found error with resource information
class NotFoundError extends AppError {
  resourceType: string;
  resourceId: string;

  constructor(resourceType: string, resourceId: string) {
    super(\`\${resourceType} with id \${resourceId} not found\`, 404);
    this.resourceType = resourceType;
    this.resourceId = resourceId;
  }
}

// Authentication error
class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401);
  }
}

// Authorization error
class AuthorizationError extends AppError {
  constructor(message: string = 'Permission denied') {
    super(message, 403);
  }
}

// Function to test error handling
function handleError(error: Error): { type: string; status: number; message: string } {
  if (error instanceof ValidationError) {
    return {
      type: 'ValidationError',
      status: error.statusCode,
      message: \`\${error.message} (field: \${error.field})\`
    };
  }

  if (error instanceof NotFoundError) {
    return {
      type: 'NotFoundError',
      status: error.statusCode,
      message: error.message
    };
  }

  if (error instanceof AuthenticationError) {
    return {
      type: 'AuthenticationError',
      status: error.statusCode,
      message: error.message
    };
  }

  if (error instanceof AuthorizationError) {
    return {
      type: 'AuthorizationError',
      status: error.statusCode,
      message: error.message
    };
  }

  if (error instanceof AppError) {
    return {
      type: 'AppError',
      status: error.statusCode,
      message: error.message
    };
  }

  return {
    type: 'Error',
    status: 500,
    message: error.message
  };
}

// Test
try {
  throw new ValidationError('Email is invalid', 'email');
} catch (e) {
  console.log(handleError(e as Error));
}

try {
  throw new NotFoundError('User', '12345');
} catch (e) {
  console.log(handleError(e as Error));
}

try {
  throw new AuthenticationError();
} catch (e) {
  console.log(handleError(e as Error));
}`,
  testCases: [
    {
      input: { class: 'ValidationError', args: ['Email is invalid', 'email'] },
      expectedOutput: { type: 'ValidationError', status: 400, message: 'Email is invalid (field: email)' },
      description: 'ValidationError includes field information',
    },
    {
      input: { class: 'NotFoundError', args: ['User', '12345'] },
      expectedOutput: { type: 'NotFoundError', status: 404, message: 'User with id 12345 not found' },
      description: 'NotFoundError includes resource type and id',
    },
    {
      input: { class: 'AuthenticationError', args: [] },
      expectedOutput: { type: 'AuthenticationError', status: 401, message: 'Authentication required' },
      description: 'AuthenticationError has correct status and default message',
    },
    {
      input: { class: 'AuthorizationError', args: ['Admin access required'] },
      expectedOutput: { type: 'AuthorizationError', status: 403, message: 'Admin access required' },
      description: 'AuthorizationError accepts custom message',
    },
    {
      input: { instanceof: 'ValidationError', parentClass: 'AppError' },
      expectedOutput: true,
      description: 'ValidationError is instanceof AppError',
    },
    {
      input: { instanceof: 'NotFoundError', parentClass: 'Error' },
      expectedOutput: true,
      description: 'NotFoundError is instanceof Error',
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
