import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { createContext, useState, memo, type ReactNode } from 'react';
import Link from 'next/link';

// ============================================================================
// Mock Data
// ============================================================================

interface MockProblem {
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
  hints: string[];
}

const mockProblems: MockProblem[] = [
  {
    id: 'destructuring-patterns',
    title: 'Destructuring Patterns',
    difficulty: 'easy',
    category: 'JavaScript Basics',
    description: `<h2>In-Depth Explanation</h2>
<p>Destructuring is a JavaScript expression that allows you to extract values from arrays or properties from objects and assign them to distinct variables in a single statement.</p>
<p><strong>Object Destructuring:</strong> Extract properties from objects using curly braces <code>{}</code>. You can rename variables, set default values, and extract nested properties.</p>
<p><strong>Array Destructuring:</strong> Extract elements from arrays using square brackets <code>[]</code>. Position matters - the first variable gets the first element, and so on.</p>
<h2>Importance</h2>
<p>Destructuring is essential for modern JavaScript because it makes code cleaner and more readable.</p>`,
    examples: [
      {
        input: `const { name, age } = { name: 'Alice', age: 25, city: 'NYC' };`,
        output: `name = 'Alice', age = 25`,
        explanation: 'Object destructuring extracts named properties',
      },
      {
        input: `const [first, , third] = [1, 2, 3, 4];`,
        output: `first = 1, third = 3`,
        explanation: 'Array destructuring with skipped elements',
      },
    ],
    starterCode: `function extractUserInfo(user) {
  // TODO: Use object destructuring
  const name = user.name;
  return { greeting: 'Hello, ' + name };
}`,
    solution: `function extractUserInfo(user) {
  const { name, age, email } = user;
  return {
    greeting: \`Hello, \${name}! You are \${age} years old.\`,
    contact: email
  };
}`,
    hints: [
      'Object destructuring uses {} and matches property names',
      'Array destructuring uses [] and matches by position',
      'Use [a, b] = [b, a] to swap without a temp variable',
    ],
  },
  {
    id: 'promise-chaining',
    title: 'Promise Chaining',
    difficulty: 'medium',
    category: 'Async Programming',
    description: `<h2>Promise Chaining</h2>
<p>Promise chaining allows you to execute asynchronous operations in sequence, passing results from one operation to the next.</p>
<p>Each <code>.then()</code> returns a new Promise, enabling you to chain multiple operations together.</p>
<h2>Key Concepts</h2>
<ul>
<li><strong>Sequential Execution</strong>: Operations run one after another</li>
<li><strong>Error Propagation</strong>: Errors bubble up through the chain</li>
<li><strong>Value Passing</strong>: Return values become input for next step</li>
</ul>`,
    examples: [
      {
        input: `fetchUser(1)
  .then(user => fetchPosts(user.id))
  .then(posts => console.log(posts));`,
        output: `[{ id: 1, title: "Post 1" }, ...]`,
        explanation: 'Chain fetching user then their posts',
      },
    ],
    starterCode: `function fetchUserAndPosts(userId) {
  // TODO: Chain promises to fetch user then posts
  return fetch('/api/users/' + userId);
}`,
    solution: `function fetchUserAndPosts(userId) {
  return fetch('/api/users/' + userId)
    .then(res => res.json())
    .then(user => fetch('/api/posts?userId=' + user.id))
    .then(res => res.json());
}`,
    hints: [
      'Each .then() should return a value or Promise',
      'Use .catch() at the end for error handling',
      'You can chain as many .then() calls as needed',
    ],
  },
  {
    id: 'template-literal-types',
    title: 'Template Literal Types',
    difficulty: 'hard',
    category: 'TypeScript Advanced',
    description: `<h2>Template Literal Types</h2>
<p>Template literal types build on string literal types to create complex string patterns using the same syntax as template literals in JavaScript.</p>
<p>They enable powerful type-level string manipulation and pattern matching.</p>
<h2>Advanced Usage</h2>
<ul>
<li><strong>Union Distribution</strong>: Automatically creates all combinations</li>
<li><strong>Inference</strong>: Extract parts of strings at type level</li>
<li><strong>Mapped Types</strong>: Transform object keys dynamically</li>
</ul>`,
    examples: [
      {
        input: `type EventName = \`on\${Capitalize<'click' | 'focus'>}\`;`,
        output: `type EventName = 'onClick' | 'onFocus'`,
        explanation: 'Creates capitalized event handler names',
      },
    ],
    starterCode: `// TODO: Create a type that prefixes strings
type Prefixed<T extends string> = T;`,
    solution: `type Prefixed<T extends string, P extends string = 'pre_'> = \`\${P}\${T}\`;

type EventHandler<T extends string> = \`on\${Capitalize<T>}\`;`,
    hints: [
      'Template literal types use backticks like JS template literals',
      'You can use utility types like Capitalize inside template types',
      'Unions distribute across template literal types',
    ],
  },
];

const DIFFICULTY_COLORS = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};

// ============================================================================
// Mock Test Results
// ============================================================================

interface MockTestResult {
  passed: boolean;
  input: unknown;
  expectedOutput: unknown;
  actualOutput: unknown;
  error?: string;
  description?: string;
}

const mockPassedResults: MockTestResult[] = [
  {
    passed: true,
    input: { name: 'Alice', age: 25 },
    expectedOutput: { greeting: 'Hello, Alice! You are 25 years old.' },
    actualOutput: { greeting: 'Hello, Alice! You are 25 years old.' },
    description: 'Basic user info extraction',
  },
  {
    passed: true,
    input: { name: 'Bob', age: 30 },
    expectedOutput: { greeting: 'Hello, Bob! You are 30 years old.' },
    actualOutput: { greeting: 'Hello, Bob! You are 30 years old.' },
    description: 'Another user info extraction',
  },
];

const mockFailedResults: MockTestResult[] = [
  {
    passed: true,
    input: { name: 'Alice', age: 25 },
    expectedOutput: { greeting: 'Hello, Alice! You are 25 years old.' },
    actualOutput: { greeting: 'Hello, Alice! You are 25 years old.' },
    description: 'Basic user info extraction',
  },
  {
    passed: false,
    input: { name: 'Bob', age: 30 },
    expectedOutput: { greeting: 'Hello, Bob! You are 30 years old.' },
    actualOutput: { greeting: 'Hello, Bob!' },
    description: 'Missing age in greeting',
  },
  {
    passed: false,
    input: {},
    expectedOutput: { greeting: 'Hello, Guest!' },
    actualOutput: undefined,
    error: 'Cannot read properties of undefined (reading "name")',
    description: 'Handle empty object',
  },
];

// ============================================================================
// Mock Progress Context
// ============================================================================

interface MockProgressContextType {
  solvedProblems: Set<string>;
  solvedCount: number;
  totalProblems: number;
  streak: number;
  markSolved: (problemId: string) => void;
  markUnsolved: (problemId: string) => void;
  isSolved: (problemId: string) => boolean;
  lastSolvedDate: string | null;
}

const MockProgressContext = createContext<MockProgressContextType | undefined>(undefined);

function MockProgressProvider({
  children,
  solvedProblems = new Set<string>(),
}: {
  children: ReactNode;
  solvedProblems?: Set<string>;
}) {
  const value: MockProgressContextType = {
    solvedProblems,
    solvedCount: solvedProblems.size,
    totalProblems: mockProblems.length,
    streak: solvedProblems.size > 0 ? 3 : 0,
    markSolved: () => {},
    markUnsolved: () => {},
    isSolved: (id: string) => solvedProblems.has(id),
    lastSolvedDate: solvedProblems.size > 0 ? new Date().toISOString() : null,
  };

  return (
    <MockProgressContext.Provider value={value}>
      {children}
    </MockProgressContext.Provider>
  );
}

// ============================================================================
// Mock Theme Context
// ============================================================================

type Theme = 'light' | 'dark';

interface MockThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const MockThemeContext = createContext<MockThemeContextType | undefined>(undefined);

function MockThemeProvider({ children, theme = 'light' }: { children: ReactNode; theme?: Theme }) {
  const value: MockThemeContextType = {
    theme,
    toggleTheme: () => {},
    setTheme: () => {},
  };

  return (
    <MockThemeContext.Provider value={value}>
      {children}
    </MockThemeContext.Provider>
  );
}

// ============================================================================
// Mock Components
// ============================================================================

type Tab = 'description' | 'examples' | 'hints';

const MockProblemDescription = memo(function MockProblemDescription({ problem }: { problem: MockProblem }) {
  const [activeTab, setActiveTab] = useState<Tab>('description');

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'description', label: 'Description' },
    { id: 'examples', label: 'Examples', count: problem.examples.length },
    { id: 'hints', label: 'Hints', count: problem.hints.length },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
            {problem.title}
          </h1>
          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wide ${DIFFICULTY_COLORS[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{problem.category}</p>
      </div>

      <div className="flex-shrink-0 flex gap-1 pt-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative ${
              activeTab === tab.id
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
                activeTab === tab.id
                  ? 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pt-4">
        {activeTab === 'description' && (
          <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: problem.description }} />
        )}

        {activeTab === 'examples' && (
          <div className="space-y-4">
            {problem.examples.map((example, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="mb-3">
                  <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                    Example {index + 1}:
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1 uppercase tracking-wide">
                      Input:
                    </span>
                    <pre className="p-3 bg-white dark:bg-gray-800 rounded-md font-mono text-sm overflow-x-auto border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {example.input}
                    </pre>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1 uppercase tracking-wide">
                      Output:
                    </span>
                    <pre className="p-3 bg-white dark:bg-gray-800 rounded-md font-mono text-sm overflow-x-auto border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {example.output}
                    </pre>
                  </div>
                  {example.explanation && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 italic pt-2 border-t border-gray-200 dark:border-gray-700">
                      {example.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'hints' && (
          <ul className="space-y-3">
            {problem.hints.map((hint, index) => (
              <li
                key={index}
                className="flex gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
              >
                <span className="text-blue-500 dark:text-blue-400 flex-shrink-0">*</span>
                <span className="text-sm text-gray-800 dark:text-gray-200">{hint}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

function MockCodeEditor({ code, readOnly = false }: { code: string; readOnly?: boolean }) {
  return (
    <div className="relative w-full h-full rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
      <div className="h-full overflow-auto p-4">
        <pre className="font-mono text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
          {code}
        </pre>
      </div>
      {readOnly && (
        <div className="absolute top-2 right-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">
          Read Only
        </div>
      )}
    </div>
  );
}

function formatValue(value: unknown): string {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (typeof value === 'function') return value.toString();
  return JSON.stringify(value, null, 2);
}

function MockTestResults({
  results,
  allPassed,
  error,
  isRunning,
}: {
  results: MockTestResult[];
  allPassed: boolean;
  error?: string;
  isRunning: boolean;
}) {
  if (isRunning) {
    return (
      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Running tests...</span>
        </div>
      </div>
    );
  }

  if (error && results.length === 0) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Error</h3>
        <pre className="text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap font-mono">
          {error}
        </pre>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-center text-gray-500">
        No test results yet. Click &quot;Run Tests&quot; to execute your code.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div
        className={`p-3 rounded-lg border-2 ${
          allPassed
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
        }`}
      >
        <div className="flex items-center gap-2">
          {allPassed ? (
            <>
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold text-green-800 dark:text-green-200">
                All tests passed!
              </span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="font-semibold text-red-800 dark:text-red-200">
                Some tests failed
              </span>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {results.map((result, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${
              result.passed
                ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
            }`}
          >
            <div className="flex items-start gap-2 mb-2">
              {result.passed ? (
                <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <div className="flex-1">
                <div className="font-semibold text-sm mb-2">
                  Test Case {index + 1}
                  {result.description && (
                    <span className="text-gray-500 dark:text-gray-400 font-normal ml-2">
                      - {result.description}
                    </span>
                  )}
                </div>

                {result.error ? (
                  <div className="text-sm text-red-700 dark:text-red-300 font-mono bg-red-100 dark:bg-red-900/30 p-2 rounded">
                    Error: {result.error}
                  </div>
                ) : (
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Input:</span>
                      <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded font-mono text-xs overflow-x-auto">
                        {formatValue(result.input)}
                      </pre>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Expected:</span>
                      <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded font-mono text-xs overflow-x-auto">
                        {formatValue(result.expectedOutput)}
                      </pre>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Got:</span>
                      <pre
                        className={`mt-1 p-2 rounded font-mono text-xs overflow-x-auto ${
                          result.passed
                            ? 'bg-green-100 dark:bg-green-900/30'
                            : 'bg-red-100 dark:bg-red-900/30'
                        }`}
                      >
                        {formatValue(result.actualOutput)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Mock Problem Detail Page Component
// ============================================================================

interface MockProblemDetailPageProps {
  problemId?: string;
  showSolution?: boolean;
  testResults?: MockTestResult[] | null;
  isRunning?: boolean;
  isSolved?: boolean;
}

function MockProblemDetailPage({
  problemId = 'destructuring-patterns',
  showSolution = false,
  testResults = null,
  isRunning = false,
  isSolved = false,
}: MockProblemDetailPageProps) {
  const problem = mockProblems.find((p) => p.id === problemId) || mockProblems[0];
  const [showSolutionState, setShowSolutionState] = useState(showSolution);

  const currentIndex = mockProblems.findIndex((p) => p.id === problemId);
  const prevProblem = currentIndex > 0 ? mockProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex < mockProblems.length - 1 ? mockProblems[currentIndex + 1] : null;

  const allPassed = testResults?.every((r) => r.passed) ?? false;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Solved Badge */}
        {isSolved && (
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Solved
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Problem Description */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700/50 h-[600px]">
              <MockProblemDescription problem={problem} />
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              {prevProblem && (
                <Link
                  href={`/problems/${prevProblem.id}`}
                  className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                >
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Previous</div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {prevProblem.title}
                  </div>
                </Link>
              )}
              {nextProblem && (
                <Link
                  href={`/problems/${nextProblem.id}`}
                  className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-800 text-right"
                >
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Next</div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {nextProblem.title}
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Right Column - Code Editor and Tests */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700/50">
              <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between bg-gray-50 dark:bg-gray-900/30">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Code Editor
                </h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
                    Reset
                  </button>
                  <button
                    onClick={() => setShowSolutionState(!showSolutionState)}
                    className="px-3 py-1.5 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200"
                  >
                    {showSolutionState ? 'Hide' : 'Show'} Solution
                  </button>
                  <button className="px-4 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-all duration-200">
                    {isRunning ? 'Running...' : 'Run Tests'}
                  </button>
                </div>
              </div>
              <div className="h-96">
                <MockCodeEditor code={problem.starterCode} />
              </div>
              {showSolutionState && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/30">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Solution:
                  </h3>
                  <div className="h-64">
                    <MockCodeEditor code={problem.solution} readOnly />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700/50">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Test Results
              </h2>
              <MockTestResults
                results={testResults || []}
                allPassed={allPassed}
                isRunning={isRunning}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Story Configuration
// ============================================================================

const meta: Meta<typeof MockProblemDetailPage> = {
  title: 'Pages/ProblemDetailPage',
  component: MockProblemDetailPage,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 768, 1280],
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
      },
    },
  },
  decorators: [
    (Story, context) => {
      const solvedProblems = context.args?.isSolved
        ? new Set([context.args.problemId || 'destructuring-patterns'])
        : new Set<string>();
      return (
        <MockThemeProvider>
          <MockProgressProvider solvedProblems={solvedProblems}>
            <Story />
          </MockProgressProvider>
        </MockThemeProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof MockProblemDetailPage>;

// ============================================================================
// Stories
// ============================================================================

/**
 * Easy problem page (Destructuring Patterns)
 */
export const EasyProblem: Story = {
  args: {
    problemId: 'destructuring-patterns',
  },
  parameters: {
    docs: {
      description: {
        story: 'Problem detail page showing an easy difficulty problem.',
      },
    },
  },
};

/**
 * Medium problem page (Promise Chaining)
 */
export const MediumProblem: Story = {
  args: {
    problemId: 'promise-chaining',
  },
  parameters: {
    docs: {
      description: {
        story: 'Problem detail page showing a medium difficulty problem.',
      },
    },
  },
};

/**
 * Hard problem page (Template Literal Types)
 */
export const HardProblem: Story = {
  args: {
    problemId: 'template-literal-types',
  },
  parameters: {
    docs: {
      description: {
        story: 'Problem detail page showing a hard difficulty problem.',
      },
    },
  },
};

/**
 * Problem page with solution panel shown
 */
export const WithSolutionShown: Story = {
  args: {
    problemId: 'destructuring-patterns',
    showSolution: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Problem detail page with the solution panel expanded.',
      },
    },
  },
};

/**
 * Problem page with all tests passed
 */
export const WithTestsPassed: Story = {
  args: {
    problemId: 'destructuring-patterns',
    testResults: mockPassedResults,
  },
  parameters: {
    docs: {
      description: {
        story: 'Problem detail page showing all tests passed successfully.',
      },
    },
  },
};

/**
 * Problem page with some tests failed
 */
export const WithTestsFailed: Story = {
  args: {
    problemId: 'destructuring-patterns',
    testResults: mockFailedResults,
  },
  parameters: {
    docs: {
      description: {
        story: 'Problem detail page showing some tests have failed.',
      },
    },
  },
};

/**
 * Solved problem with badge displayed
 */
export const SolvedProblem: Story = {
  args: {
    problemId: 'destructuring-patterns',
    isSolved: true,
    testResults: mockPassedResults,
  },
  parameters: {
    docs: {
      description: {
        story: 'Problem detail page for a problem the user has already solved, showing the solved badge.',
      },
    },
  },
};

/**
 * Dark theme variant
 */
export const DarkTheme: Story = {
  args: {
    problemId: 'promise-chaining',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    chromatic: {
      modes: {
        dark: { theme: 'dark' },
      },
    },
    docs: {
      description: {
        story: 'Problem detail page with dark theme enabled.',
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div className="dark bg-gray-950 min-h-screen">
          <MockThemeProvider theme="dark">
            <MockProgressProvider>
              <Story />
            </MockProgressProvider>
          </MockThemeProvider>
        </div>
      );
    },
  ],
};

/**
 * Mobile viewport
 */
export const Mobile: Story = {
  args: {
    problemId: 'destructuring-patterns',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    chromatic: {
      viewports: [375],
    },
    docs: {
      description: {
        story: 'Problem detail page as viewed on a mobile device (375px width).',
      },
    },
  },
};

/**
 * Tests running state
 */
export const TestsRunning: Story = {
  args: {
    problemId: 'destructuring-patterns',
    isRunning: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Problem detail page showing the loading state while tests are running.',
      },
    },
  },
};
