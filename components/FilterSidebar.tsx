'use client';

import { useState } from 'react';
import { useProgress } from './ProgressProvider';

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

export default function FilterSidebar({
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

  const { solvedCount, totalProblems } = useProgress();

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const difficulties = [
    {
      value: 'easy',
      label: 'Easy',
      count: problemCounts.easy,
      color: 'text-green-600 dark:text-green-400',
    },
    {
      value: 'medium',
      label: 'Medium',
      count: problemCounts.medium,
      color: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      value: 'hard',
      label: 'Hard',
      count: problemCounts.hard,
      color: 'text-red-600 dark:text-red-400',
    },
  ];

  const statuses = [
    { value: 'all', label: 'All', icon: null },
    { value: 'solved', label: 'Solved', icon: '✓' },
    { value: 'unsolved', label: 'Unsolved', icon: '○' },
  ];

  const hasFilters =
    selectedDifficulty !== 'all' || selectedCategory !== 'all' || selectedStatus !== 'all';

  return (
    <aside className="w-full lg:w-64 flex-shrink-0" aria-label="Problem filters">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Filters</h2>
          {hasFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Progress Summary */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Your Progress</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {solvedCount}/{totalProblems}
            </span>
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
            type="button"
            onClick={() => toggleSection('status')}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            aria-expanded={expandedSections.status}
            aria-controls="filter-status-section"
          >
            <span className="font-medium text-gray-900 dark:text-gray-100">Status</span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.status ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {expandedSections.status && (
            <div id="filter-status-section" className="px-4 pb-3 space-y-1">
              {statuses.map((status) => (
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
            type="button"
            onClick={() => toggleSection('difficulty')}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            aria-expanded={expandedSections.difficulty}
            aria-controls="filter-difficulty-section"
          >
            <span className="font-medium text-gray-900 dark:text-gray-100">Difficulty</span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.difficulty ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {expandedSections.difficulty && (
            <div id="filter-difficulty-section" className="px-4 pb-3 space-y-1">
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
              {difficulties.map((diff) => (
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
            type="button"
            onClick={() => toggleSection('category')}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            aria-expanded={expandedSections.category}
            aria-controls="filter-category-section"
          >
            <span className="font-medium text-gray-900 dark:text-gray-100">Category</span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.category ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {expandedSections.category && (
            <div
              id="filter-category-section"
              className="px-4 pb-3 max-h-64 overflow-y-auto space-y-1"
            >
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
              {categories.map((category) => (
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
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
