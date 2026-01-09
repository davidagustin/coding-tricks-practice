import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import Link from 'next/link';

// ============================================================================
// Mock Data
// ============================================================================

interface MockProblem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

const mockProblems: MockProblem[] = [
  { id: 'destructuring-patterns', title: 'Destructuring Patterns', difficulty: 'easy', category: 'JavaScript Basics' },
  { id: 'optional-chaining', title: 'Optional Chaining', difficulty: 'easy', category: 'JavaScript Basics' },
  { id: 'nullish-coalescing', title: 'Nullish Coalescing', difficulty: 'easy', category: 'JavaScript Basics' },
  { id: 'rest-parameters', title: 'Rest Parameters', difficulty: 'easy', category: 'JavaScript Basics' },
  { id: 'array-methods', title: 'Array Methods', difficulty: 'medium', category: 'Array Methods' },
  { id: 'reduce-patterns', title: 'Reduce Patterns', difficulty: 'medium', category: 'Array Methods' },
  { id: 'array-flat-flatmap', title: 'Array Flat & FlatMap', difficulty: 'medium', category: 'Array Methods' },
  { id: 'promise-chaining', title: 'Promise Chaining', difficulty: 'medium', category: 'Async Programming' },
  { id: 'async-await-error', title: 'Async/Await Error Handling', difficulty: 'medium', category: 'Async Programming' },
  { id: 'generics-basic', title: 'Generics Basic', difficulty: 'hard', category: 'TypeScript Advanced' },
  { id: 'conditional-types', title: 'Conditional Types', difficulty: 'hard', category: 'TypeScript Advanced' },
  { id: 'template-literal-types', title: 'Template Literal Types', difficulty: 'hard', category: 'TypeScript Advanced' },
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
// Mock Components
// ============================================================================

const difficultyColors = {
  easy: 'text-green-600 dark:text-green-400',
  medium: 'text-yellow-600 dark:text-yellow-400',
  hard: 'text-red-600 dark:text-red-400',
};

function getAcceptanceRate(problem: MockProblem): number {
  const hash = problem.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const base = problem.difficulty === 'easy' ? 65 : problem.difficulty === 'medium' ? 45 : 30;
  const variance = (hash % 20) - 10;
  return Math.max(20, Math.min(85, base + variance));
}

function MockProblemTable({ problems }: { problems: MockProblem[] }) {
  const { isSolved } = useMockProgress();

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 text-left text-sm text-gray-500 dark:text-gray-400">
            <th className="pb-3 pl-4 pr-2 w-12">Status</th>
            <th className="pb-3 px-2">Title</th>
            <th className="pb-3 px-2 w-24 hidden sm:table-cell">Difficulty</th>
            <th className="pb-3 px-2 w-28 hidden md:table-cell">Acceptance</th>
            <th className="pb-3 px-2 pr-4 w-40 hidden lg:table-cell">Category</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {problems.map((problem, index) => {
            const solved = isSolved(problem.id);
            const acceptanceRate = getAcceptanceRate(problem);

            return (
              <tr
                key={problem.id}
                className={`group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                  index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/30'
                }`}
              >
                <td className="py-3 pl-4 pr-2">
                  {solved ? (
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                    </div>
                  )}
                </td>
                <td className="py-3 px-2">
                  <Link
                    href={`/problems/${problem.id}`}
                    className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                  >
                    {problem.title}
                  </Link>
                  <span className={`sm:hidden ml-2 text-xs font-medium ${difficultyColors[problem.difficulty]}`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="py-3 px-2 hidden sm:table-cell">
                  <span className={`text-sm font-medium capitalize ${difficultyColors[problem.difficulty]}`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="py-3 px-2 text-sm text-gray-600 dark:text-gray-400 hidden md:table-cell">
                  {acceptanceRate.toFixed(1)}%
                </td>
                <td className="py-3 px-2 pr-4 hidden lg:table-cell">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {problem.category}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {problems.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No problems found matching your filters.
        </div>
      )}
    </div>
  );
}

interface FilterSidebarProps {
  categories: string[];
  selectedDifficulty: string;
  selectedCategory: string;
  selectedStatus: string;
  onDifficultyChange: (difficulty: string) => void;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  onClearFilters: () => void;
  problemCounts: {
    easy: number;
    medium: number;
    hard: number;
    total: number;
  };
}

function MockFilterSidebar({
  categories,
  selectedDifficulty,
  selectedCategory,
  selectedStatus,
  onDifficultyChange,
  onCategoryChange,
  onStatusChange,
  onClearFilters,
  problemCounts,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    status: true,
    difficulty: true,
    category: true,
  });

  const { solvedCount, totalProblems } = useMockProgress();

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const difficulties = [
    { value: 'easy', label: 'Easy', count: problemCounts.easy, color: 'text-green-600 dark:text-green-400' },
    { value: 'medium', label: 'Medium', count: problemCounts.medium, color: 'text-yellow-600 dark:text-yellow-400' },
    { value: 'hard', label: 'Hard', count: problemCounts.hard, color: 'text-red-600 dark:text-red-400' },
  ];

  const statuses = [
    { value: 'all', label: 'All' },
    { value: 'solved', label: 'Solved' },
    { value: 'unsolved', label: 'Unsolved' },
  ];

  const hasFilters = selectedDifficulty !== 'all' || selectedCategory !== 'all' || selectedStatus !== 'all';

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Filters</h2>
          {hasFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Your Progress</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{solvedCount}/{totalProblems}</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(solvedCount / totalProblems) * 100}%` }}
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => toggleSection('status')}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <span className="font-medium text-gray-900 dark:text-gray-100">Status</span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.status ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.status && (
            <div className="px-4 pb-3 space-y-1">
              {statuses.map(status => (
                <label
                  key={status.value}
                  className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="status"
                    value={status.value}
                    checked={selectedStatus === status.value}
                    onChange={() => onStatusChange(status.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{status.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Difficulty Filter */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => toggleSection('difficulty')}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <span className="font-medium text-gray-900 dark:text-gray-100">Difficulty</span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.difficulty ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.difficulty && (
            <div className="px-4 pb-3 space-y-1">
              <label className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="difficulty"
                  value="all"
                  checked={selectedDifficulty === 'all'}
                  onChange={() => onDifficultyChange('all')}
                  className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">All</span>
                <span className="ml-auto text-xs text-gray-500">{problemCounts.total}</span>
              </label>
              {difficulties.map(diff => (
                <label
                  key={diff.value}
                  className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="difficulty"
                    value={diff.value}
                    checked={selectedDifficulty === diff.value}
                    onChange={() => onDifficultyChange(diff.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                  <span className={`text-sm ${diff.color}`}>{diff.label}</span>
                  <span className="ml-auto text-xs text-gray-500">{diff.count}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div>
          <button
            onClick={() => toggleSection('category')}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <span className="font-medium text-gray-900 dark:text-gray-100">Category</span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.category ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.category && (
            <div className="px-4 pb-3 max-h-64 overflow-y-auto space-y-1">
              <label className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={selectedCategory === 'all'}
                  onChange={() => onCategoryChange('all')}
                  className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">All Categories</span>
              </label>
              {categories.map(category => (
                <label
                  key={category}
                  className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={() => onCategoryChange(category)}
                    className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{category}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

// ============================================================================
// Mock Problems List Page Component
// ============================================================================

interface MockProblemsListPageProps {
  initialDifficulty?: string;
  initialCategory?: string;
  initialStatus?: string;
  initialSearch?: string;
  showMobileFilters?: boolean;
}

function MockProblemsListPage({
  initialDifficulty = 'all',
  initialCategory = 'all',
  initialStatus = 'all',
  initialSearch = '',
  showMobileFilters = false,
}: MockProblemsListPageProps) {
  const { isSolved } = useMockProgress();

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedDifficulty, setSelectedDifficulty] = useState(initialDifficulty);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [showMobileFiltersState, setShowMobileFiltersState] = useState(showMobileFilters);

  const categories = useMemo(
    () => Array.from(new Set(mockProblems.map((p) => p.category))).sort(),
    []
  );

  const problemCounts = useMemo(
    () => ({
      easy: mockProblems.filter((p) => p.difficulty === 'easy').length,
      medium: mockProblems.filter((p) => p.difficulty === 'medium').length,
      hard: mockProblems.filter((p) => p.difficulty === 'hard').length,
      total: mockProblems.length,
    }),
    []
  );

  const filteredProblems = useMemo(() => {
    let filtered = mockProblems;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (problem) =>
          problem.title.toLowerCase().includes(query) ||
          problem.category.toLowerCase().includes(query) ||
          problem.id.toLowerCase().includes(query)
      );
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter((p) => p.difficulty === selectedDifficulty);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedStatus === 'solved') {
      filtered = filtered.filter((p) => isSolved(p.id));
    } else if (selectedStatus === 'unsolved') {
      filtered = filtered.filter((p) => !isSolved(p.id));
    }

    return filtered;
  }, [searchQuery, selectedDifficulty, selectedCategory, selectedStatus, isSolved]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDifficulty('all');
    setSelectedCategory('all');
    setSelectedStatus('all');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Problems</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {filteredProblems.length} of {mockProblems.length} problems
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          <select
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          >
            <option value="default">Sort: Default</option>
            <option value="difficulty">Sort: Difficulty</option>
            <option value="acceptance">Sort: Acceptance</option>
            <option value="title">Sort: Title (A-Z)</option>
            <option value="category">Sort: Category</option>
          </select>

          <button
            onClick={() => setShowMobileFiltersState(!showMobileFiltersState)}
            className="lg:hidden px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block">
            <MockFilterSidebar
              categories={categories}
              selectedDifficulty={selectedDifficulty}
              selectedCategory={selectedCategory}
              selectedStatus={selectedStatus}
              onDifficultyChange={setSelectedDifficulty}
              onCategoryChange={setSelectedCategory}
              onStatusChange={setSelectedStatus}
              onClearFilters={clearFilters}
              problemCounts={problemCounts}
            />
          </div>

          {/* Mobile Filters */}
          {showMobileFiltersState && (
            <div className="lg:hidden">
              <MockFilterSidebar
                categories={categories}
                selectedDifficulty={selectedDifficulty}
                selectedCategory={selectedCategory}
                selectedStatus={selectedStatus}
                onDifficultyChange={setSelectedDifficulty}
                onCategoryChange={setSelectedCategory}
                onStatusChange={setSelectedStatus}
                onClearFilters={clearFilters}
                problemCounts={problemCounts}
              />
            </div>
          )}

          {/* Problem Table */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <MockProblemTable problems={filteredProblems} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Story Configuration
// ============================================================================

const meta: Meta<typeof MockProblemsListPage> = {
  title: 'Pages/ProblemsListPage',
  component: MockProblemsListPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story, context) => {
      const solvedProblems = (context.args as { solvedProblems?: Set<string> })?.solvedProblems || new Set(['destructuring-patterns', 'optional-chaining']);
      return (
        <MockProgressProvider solvedProblems={solvedProblems}>
          <Story />
        </MockProgressProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof MockProblemsListPage>;

// ============================================================================
// Stories
// ============================================================================

/**
 * Default problems list with all problems shown
 */
export const Default: Story = {
  args: {},
};

/**
 * Problems list with difficulty filter applied (showing only easy problems)
 */
export const WithFiltersApplied: Story = {
  args: {
    initialDifficulty: 'easy',
    initialCategory: 'all',
    initialStatus: 'all',
  },
  parameters: {
    docs: {
      description: {
        story: 'Problems list filtered to show only easy difficulty problems.',
      },
    },
  },
};

/**
 * Empty search results when no problems match the query
 */
export const EmptySearchResults: Story = {
  args: {
    initialSearch: 'xyz123nonexistent',
  },
  parameters: {
    docs: {
      description: {
        story: 'Problems list showing empty state when search query has no matches.',
      },
    },
  },
};

/**
 * Mobile view with sidebar hidden (default mobile state)
 */
export const MobileSidebarHidden: Story = {
  args: {
    showMobileFilters: false,
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
        story: 'Mobile view with the filter sidebar hidden by default.',
      },
    },
  },
};

/**
 * Mobile view with sidebar shown (after tapping Filters button)
 */
export const MobileSidebarShown: Story = {
  args: {
    showMobileFilters: true,
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
        story: 'Mobile view with the filter sidebar visible after tapping the Filters button.',
      },
    },
  },
};

/**
 * Dark theme variant
 */
export const DarkTheme: Story = {
  args: {
    initialDifficulty: 'all',
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
        story: 'Problems list page with dark theme enabled.',
      },
    },
  },
  decorators: [
    (Story, context) => {
      const solvedProblems = (context.args as { solvedProblems?: Set<string> })?.solvedProblems || new Set(['destructuring-patterns', 'optional-chaining']);
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

/**
 * Problems list filtered by category
 */
export const FilteredByCategory: Story = {
  args: {
    initialCategory: 'TypeScript Advanced',
  },
  parameters: {
    docs: {
      description: {
        story: 'Problems list filtered to show only TypeScript Advanced category.',
      },
    },
  },
};

/**
 * Problems list showing only solved problems
 */
export const ShowingSolvedOnly: Story = {
  args: {
    initialStatus: 'solved',
  },
  decorators: [
    (Story) => {
      return (
        <MockProgressProvider solvedProblems={new Set(['destructuring-patterns', 'optional-chaining', 'nullish-coalescing', 'array-methods'])}>
          <Story />
        </MockProgressProvider>
      );
    },
  ],
  parameters: {
    docs: {
      description: {
        story: 'Problems list filtered to show only solved problems.',
      },
    },
  },
};
