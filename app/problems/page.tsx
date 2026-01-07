import Link from 'next/link';
import { problems } from '@/lib/problems';

export default function ProblemsPage() {
  const categories = Array.from(new Set(problems.map(p => p.category)));
  const difficulties: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    hard: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            JavaScript & TypeScript Tricks
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Practice advanced JavaScript and TypeScript patterns and techniques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {categories.map(category => (
            <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {category}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {problems.filter(p => p.category === category).length} problems
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {problems.map(problem => (
            <Link
              key={problem.id}
              href={`/problems/${problem.id}`}
              className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {problem.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${difficultyColors[problem.difficulty]}`}>
                      {problem.difficulty.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {problem.category}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                    {problem.description.split('\n')[0]}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
            About This Practice Platform
          </h2>
          <p className="text-sm text-blue-800 dark:text-blue-300">
            This platform helps you master advanced JavaScript and TypeScript patterns through hands-on practice. 
            Each problem focuses on a specific technique or pattern, with test cases to verify your solution.
          </p>
        </div>
      </div>
    </div>
  );
}
