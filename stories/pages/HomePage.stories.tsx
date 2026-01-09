import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { createContext, useContext, useMemo, type ReactNode } from 'react';
import Link from 'next/link';

// ============================================================================
// Mock Data
// ============================================================================

const mockProblems = [
  { id: 'destructuring-patterns', title: 'Destructuring Patterns', difficulty: 'easy' as const, category: 'JavaScript Basics' },
  { id: 'optional-chaining', title: 'Optional Chaining', difficulty: 'easy' as const, category: 'JavaScript Basics' },
  { id: 'nullish-coalescing', title: 'Nullish Coalescing', difficulty: 'easy' as const, category: 'JavaScript Basics' },
  { id: 'array-methods', title: 'Array Methods', difficulty: 'medium' as const, category: 'Array Methods' },
  { id: 'reduce-patterns', title: 'Reduce Patterns', difficulty: 'medium' as const, category: 'Array Methods' },
  { id: 'promise-chaining', title: 'Promise Chaining', difficulty: 'medium' as const, category: 'Async Programming' },
  { id: 'async-await', title: 'Async/Await', difficulty: 'medium' as const, category: 'Async Programming' },
  { id: 'generics-basic', title: 'Generics Basic', difficulty: 'hard' as const, category: 'TypeScript Advanced' },
  { id: 'conditional-types', title: 'Conditional Types', difficulty: 'hard' as const, category: 'TypeScript Advanced' },
  { id: 'template-literal-types', title: 'Template Literal Types', difficulty: 'hard' as const, category: 'TypeScript Advanced' },
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

function useMockProgress() {
  const context = useContext(MockProgressContext);
  if (!context) {
    throw new Error('useMockProgress must be used within MockProgressProvider');
  }
  return context;
}

// ============================================================================
// Mock Home Page Component
// ============================================================================

function MockHomePage() {
  const { solvedCount } = useMockProgress();

  const stats = useMemo(
    () => ({
      total: mockProblems.length,
      easy: mockProblems.filter((p) => p.difficulty === 'easy').length,
      medium: mockProblems.filter((p) => p.difficulty === 'medium').length,
      hard: mockProblems.filter((p) => p.difficulty === 'hard').length,
    }),
    []
  );

  const categories = useMemo(
    () => Array.from(new Set(mockProblems.map((p) => p.category))),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            JavaScript & TypeScript Tricks
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Master advanced JavaScript and TypeScript patterns through hands-on practice. Learn
            destructuring, optional chaining, template literal types, and more.
          </p>
          <Link
            href="/problems"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 active:scale-95"
          >
            Start Practicing
          </Link>
        </div>

        {/* Progress Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600 dark:text-gray-400">Your Progress</span>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              {solvedCount}/{stats.total}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(solvedCount / stats.total) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            {solvedCount === 0
              ? 'Start solving problems to track your progress!'
              : `${Math.round((solvedCount / stats.total) * 100)}% complete`}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
              {stats.easy}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Easy</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
              {stats.medium}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Medium</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
              {stats.hard}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Hard</div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Topics Covered
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => {
              const categoryCount = mockProblems.filter((p) => p.category === category).length;
              return (
                <Link
                  key={category}
                  href={`/problems?category=${encodeURIComponent(category)}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 active:scale-[0.98]"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {category}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {categoryCount} {categoryCount === 1 ? 'problem' : 'problems'}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Interactive Code Editor
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Write and test your code directly in the browser with syntax highlighting
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Automated Testing
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Run test cases to verify your solution works correctly
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Detailed Explanations
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Learn from examples, hints, and step-by-step solutions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Progressive Difficulty
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Start with easy problems and work your way up to advanced patterns
                </p>
              </div>
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

const meta: Meta<typeof MockHomePage> = {
  title: 'Pages/HomePage',
  component: MockHomePage,
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
      const solvedProblems = context.args?.solvedProblems || new Set<string>();
      return (
        <MockProgressProvider solvedProblems={solvedProblems}>
          <Story />
        </MockProgressProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof MockHomePage>;

// ============================================================================
// Stories
// ============================================================================

/**
 * Default home page with no problems solved
 */
export const Default: Story = {
  args: {
    solvedProblems: new Set<string>(),
  },
};

/**
 * Home page showing 0 problems solved state
 */
export const ZeroSolved: Story = {
  args: {
    solvedProblems: new Set<string>(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Home page when the user has not solved any problems yet.',
      },
    },
  },
};

/**
 * Home page with some problems solved (partial progress)
 */
export const SomeSolved: Story = {
  args: {
    solvedProblems: new Set(['destructuring-patterns', 'optional-chaining', 'array-methods', 'promise-chaining']),
  },
  parameters: {
    docs: {
      description: {
        story: 'Home page showing partial progress with 4 out of 10 problems solved (40%).',
      },
    },
  },
};

/**
 * Home page with all problems solved (100% complete)
 */
export const AllSolved: Story = {
  args: {
    solvedProblems: new Set(mockProblems.map(p => p.id)),
  },
  parameters: {
    docs: {
      description: {
        story: 'Home page showing 100% completion with all problems solved.',
      },
    },
  },
};

/**
 * Mobile viewport (375px width)
 */
export const Mobile: Story = {
  args: {
    solvedProblems: new Set(['destructuring-patterns', 'optional-chaining']),
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
        story: 'Home page as viewed on a mobile device (375px width).',
      },
    },
  },
};

/**
 * Dark theme variant
 */
export const DarkTheme: Story = {
  args: {
    solvedProblems: new Set(['destructuring-patterns', 'array-methods', 'generics-basic']),
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
        story: 'Home page with dark theme enabled.',
      },
    },
  },
  decorators: [
    (Story, context) => {
      const solvedProblems = context.args?.solvedProblems || new Set<string>();
      return (
        <div className="dark bg-gray-950 min-h-screen">
          <MockProgressProvider solvedProblems={solvedProblems}>
            <Story />
          </MockProgressProvider>
        </div>
      );
    },
  ],
};
