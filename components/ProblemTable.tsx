'use client';

import Link from 'next/link';
import type { Problem } from '@/lib/problems';
import { useProgress } from './ProgressProvider';

interface ProblemTableProps {
  problems: Problem[];
}

const difficultyColors = {
  easy: 'text-green-600 dark:text-green-400',
  medium: 'text-yellow-600 dark:text-yellow-400',
  hard: 'text-red-600 dark:text-red-400',
};

export default function ProblemTable({ problems }: ProblemTableProps) {
  const { isSolved } = useProgress();

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 text-left text-sm text-gray-500 dark:text-gray-400">
            <th className="pb-3 pl-4 pr-2 w-12">Status</th>
            <th className="pb-3 px-2">Title</th>
            <th className="pb-3 px-2 w-24 hidden sm:table-cell">Difficulty</th>
            <th className="pb-3 px-2 pr-4 w-40 hidden md:table-cell">Category</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {problems.map((problem, index) => {
            const solved = isSolved(problem.id);

            return (
              <tr
                key={problem.id}
                className={`group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                  index % 2 === 0
                    ? 'bg-white dark:bg-gray-900'
                    : 'bg-gray-50/50 dark:bg-gray-800/30'
                }`}
              >
                {/* Status */}
                <td className="py-3 pl-4 pr-2">
                  {solved ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                    </div>
                  )}
                </td>

                {/* Title */}
                <td className="py-3 px-2">
                  <Link
                    href={`/problems/${problem.id}`}
                    className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                  >
                    {problem.title}
                  </Link>
                  {/* Mobile: Show difficulty inline */}
                  <span
                    className={`sm:hidden ml-2 text-xs font-medium ${difficultyColors[problem.difficulty]}`}
                  >
                    {problem.difficulty}
                  </span>
                </td>

                {/* Difficulty */}
                <td className="py-3 px-2 hidden sm:table-cell">
                  <span
                    className={`text-sm font-medium capitalize ${difficultyColors[problem.difficulty]}`}
                  >
                    {problem.difficulty}
                  </span>
                </td>

                {/* Category */}
                <td className="py-3 px-2 pr-4 hidden md:table-cell">
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
