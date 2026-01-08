'use client';

import parse from 'html-react-parser';
import type { Problem } from '@/lib/problems';

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
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
            {problem.title}
          </h1>
          <span
            className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide ${difficultyColors[problem.difficulty]}`}
          >
            {problem.difficulty}
          </span>
        </div>
        <p className="text-base text-gray-700 dark:text-gray-300 font-semibold">{problem.category}</p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-900 dark:prose-p:text-gray-100 prose-p:leading-relaxed prose-p:mb-4 prose-li:text-gray-900 dark:prose-li:text-gray-100">
        <div className="text-lg leading-relaxed">
          {parse(problem.description)}
        </div>
      </div>

      {problem.examples.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-5 pb-3 border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
            Examples
          </h2>
          <div className="space-y-6">
            {problem.examples.map((example, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div className="mb-4">
                  <span className="text-base font-bold text-gray-800 dark:text-gray-200">
                    Example {index + 1}:
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 block mb-2 uppercase tracking-wide">
                      Input:
                    </span>
                    <pre className="mt-1 p-4 bg-white dark:bg-gray-800 rounded-lg font-mono text-sm overflow-x-auto leading-relaxed border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {example.input}
                    </pre>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 block mb-2 uppercase tracking-wide">
                      Output:
                    </span>
                    <pre className="mt-1 p-4 bg-white dark:bg-gray-800 rounded-lg font-mono text-sm overflow-x-auto leading-relaxed border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      {example.output}
                    </pre>
                  </div>
                  {example.explanation && (
                    <div className="text-sm text-gray-700 dark:text-gray-300 italic pt-2 leading-relaxed border-t border-gray-200 dark:border-gray-700 mt-4">
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
        <details className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-6 transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900/30 mt-6 shadow-sm">
          <summary className="cursor-pointer font-bold text-blue-900 dark:text-blue-200 mb-4 hover:text-blue-700 dark:hover:text-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded px-2 py-1 text-lg">
            💡 Hints
          </summary>
          <ul className="list-disc list-inside space-y-3 mt-4 text-base text-blue-900 dark:text-blue-200 leading-relaxed pl-2">
            {problem.hints.map((hint, index) => (
              <li key={index} className="text-gray-800 dark:text-gray-200">{hint}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
