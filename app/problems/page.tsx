'use client';

import { useMemo, useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { problems } from '@/lib/problems';
import { useProgress } from '@/components/ProgressProvider';
import ProblemTable from '@/components/ProblemTable';
import FilterSidebar from '@/components/FilterSidebar';

type Difficulty = 'easy' | 'medium' | 'hard';
type SortOption = 'default' | 'difficulty' | 'category' | 'title' | 'acceptance';
type StatusFilter = 'all' | 'solved' | 'unsolved';

function ProblemsPageContent() {
  const searchParams = useSearchParams();
  const { isSolved } = useProgress();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Read category from URL params on mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const decodedCategory = decodeURIComponent(categoryParam);
      const categories = Array.from(new Set(problems.map((p) => p.category)));
      if (categories.includes(decodedCategory)) {
        setSelectedCategory(decodedCategory);
      }
    }
  }, [searchParams]);

  const categories = useMemo(
    () => Array.from(new Set(problems.map((p) => p.category))).sort(),
    []
  );

  const problemCounts = useMemo(
    () => ({
      easy: problems.filter((p) => p.difficulty === 'easy').length,
      medium: problems.filter((p) => p.difficulty === 'medium').length,
      hard: problems.filter((p) => p.difficulty === 'hard').length,
      total: problems.length,
    }),
    []
  );

  const filteredAndSortedProblems = useMemo(() => {
    let filtered = problems;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (problem) =>
          problem.title.toLowerCase().includes(query) ||
          problem.category.toLowerCase().includes(query) ||
          problem.id.toLowerCase().includes(query)
      );
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter((p) => p.difficulty === selectedDifficulty);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by status
    if (selectedStatus === 'solved') {
      filtered = filtered.filter((p) => isSolved(p.id));
    } else if (selectedStatus === 'unsolved') {
      filtered = filtered.filter((p) => !isSolved(p.id));
    }

    // Sort
    const sorted = [...filtered];
    const difficultyOrder: Record<Difficulty, number> = { easy: 1, medium: 2, hard: 3 };

    switch (sortBy) {
      case 'difficulty':
        sorted.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      case 'category':
        sorted.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'acceptance':
        // Sort by fake acceptance rate (based on difficulty)
        sorted.sort((a, b) => {
          const aRate = a.difficulty === 'easy' ? 65 : a.difficulty === 'medium' ? 45 : 30;
          const bRate = b.difficulty === 'easy' ? 65 : b.difficulty === 'medium' ? 45 : 30;
          return bRate - aRate;
        });
        break;
      default:
        break;
    }

    return sorted;
  }, [searchQuery, selectedDifficulty, selectedCategory, selectedStatus, sortBy, isSolved]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDifficulty('all');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSortBy('default');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Problems</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {filteredAndSortedProblems.length} of {problems.length} problems
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          {/* Search */}
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

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          >
            <option value="default">Sort: Default</option>
            <option value="difficulty">Sort: Difficulty</option>
            <option value="acceptance">Sort: Acceptance</option>
            <option value="title">Sort: Title (A-Z)</option>
            <option value="category">Sort: Category</option>
          </select>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
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
            <FilterSidebar
              categories={categories}
              selectedDifficulty={selectedDifficulty}
              selectedCategory={selectedCategory}
              selectedStatus={selectedStatus}
              onDifficultyChange={(d) => setSelectedDifficulty(d as Difficulty | 'all')}
              onCategoryChange={setSelectedCategory}
              onStatusChange={(s) => setSelectedStatus(s as StatusFilter)}
              onClearFilters={clearFilters}
              problemCounts={problemCounts}
            />
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className="lg:hidden">
              <FilterSidebar
                categories={categories}
                selectedDifficulty={selectedDifficulty}
                selectedCategory={selectedCategory}
                selectedStatus={selectedStatus}
                onDifficultyChange={(d) => setSelectedDifficulty(d as Difficulty | 'all')}
                onCategoryChange={setSelectedCategory}
                onStatusChange={(s) => setSelectedStatus(s as StatusFilter)}
                onClearFilters={clearFilters}
                problemCounts={problemCounts}
              />
            </div>
          )}

          {/* Problem Table */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <ProblemTable problems={filteredAndSortedProblems} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProblemsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400">Loading...</div>
        </div>
      }
    >
      <ProblemsPageContent />
    </Suspense>
  );
}
