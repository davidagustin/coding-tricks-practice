'use client';

import { Problem } from '@/lib/problems';

interface ProblemDescriptionProps {
  problem: Problem;
}

export default function ProblemDescription({ problem }: ProblemDescriptionProps) {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    hard: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {problem.title}
          </h1>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${difficultyColors[problem.difficulty]}`}>
            {problem.difficulty.toUpperCase()}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{problem.category}</p>
      </div>

      <div className="prose prose-sm dark:prose-invert max-w-none">
        <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
          {problem.description}
        </div>
      </div>

      {problem.examples.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Examples</h2>
          <div className="space-y-4">
            {problem.examples.map((example, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800"
              >
                <div className="mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Example {index + 1}:</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Input:</span>
                    <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded font-mono text-xs overflow-x-auto">
                      {example.input}
                    </pre>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Output:</span>
                    <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded font-mono text-xs overflow-x-auto">
                      {example.output}
                    </pre>
                  </div>
                  {example.explanation && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 italic">
                      {example.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {problem.hints.length > 0 && (
        <details className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <summary className="cursor-pointer font-semibold text-blue-900 dark:text-blue-200 mb-2">
            Hints
          </summary>
          <ul className="list-disc list-inside space-y-1 mt-2 text-sm text-blue-800 dark:text-blue-300">
            {problem.hints.map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
