'use client';

import { memo } from 'react';
import type { TestResult } from '@/lib/test-runner';

interface TestResultsProps {
  results: TestResult[];
  allPassed: boolean;
  error?: string;
  isRunning: boolean;
}

const TestResults = memo(function TestResults({ results, allPassed, error, isRunning }: TestResultsProps) {
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
              <svg
                className="w-5 h-5 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="font-semibold text-green-800 dark:text-green-200">
                All tests passed! 🎉
              </span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
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
                <svg
                  className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
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

      {error && (
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Console Output:</strong>
            <pre className="mt-1 whitespace-pre-wrap font-mono text-xs">{error}</pre>
          </div>
        </div>
      )}
    </div>
  );
});

function formatValue(value: unknown): string {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (typeof value === 'function') return value.toString();
  return JSON.stringify(value, null, 2);
}

export default TestResults;
