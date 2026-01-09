'use client';

import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';
import { memo, useCallback, useMemo, useState } from 'react';
import { DIFFICULTY_COLORS, DOMPURIFY_CONFIG } from '@/lib/constants';
import type { Problem } from '@/lib/problems';

interface ProblemDescriptionProps {
  problem: Problem;
}

type Tab = 'description' | 'examples' | 'hints';

const ProblemDescription = memo(function ProblemDescription({ problem }: ProblemDescriptionProps) {
  const [activeTab, setActiveTab] = useState<Tab>('description');

  // Sanitize and parse HTML description only once
  const parsedDescription = useMemo(() => {
    const sanitized = DOMPurify.sanitize(problem.description, DOMPURIFY_CONFIG);
    return parse(sanitized);
  }, [problem.description]);

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'description', label: 'Description' },
    { id: 'examples', label: 'Examples', count: problem.examples.length },
    { id: 'hints', label: 'Hints', count: problem.hints.length },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header - Always visible */}
      <div className="flex-shrink-0 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
            {problem.title}
          </h1>
          <span
            className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wide ${DIFFICULTY_COLORS[problem.difficulty]}`}
          >
            {problem.difficulty}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{problem.category}</p>
      </div>

      {/* Tabs */}
      <div className="flex-shrink-0 flex gap-1 pt-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative ${
              activeTab === tab.id
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span
                className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto pt-4">
        {/* Description Tab */}
        {activeTab === 'description' && <div className="prose">{parsedDescription}</div>}

        {/* Examples Tab */}
        {activeTab === 'examples' && (
          <div className="space-y-4">
            {problem.examples.length > 0 ? (
              problem.examples.map((example, index) => (
                <div
                  key={`example-${index}-${example.input.slice(0, 50)}`}
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
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No examples available.</p>
            )}
          </div>
        )}

        {/* Hints Tab */}
        {activeTab === 'hints' && (
          <div>
            {problem.hints.length > 0 ? (
              <ul className="space-y-3">
                {problem.hints.map((hint, index) => (
                  <li
                    key={`hint-${index}-${hint.slice(0, 50)}`}
                    className="flex gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                  >
                    <span className="text-blue-500 dark:text-blue-400 flex-shrink-0">💡</span>
                    <span className="text-sm text-gray-800 dark:text-gray-200">{hint}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No hints available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

export default ProblemDescription;
