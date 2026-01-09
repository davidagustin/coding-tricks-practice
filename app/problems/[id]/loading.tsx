export default function ProblemDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Solved Badge Skeleton */}
        <div className="mb-4 h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Problem Description */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700/50 h-[600px]">
              {/* Problem Title */}
              <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse" />

              {/* Difficulty & Category Badges */}
              <div className="flex gap-2 mb-6">
                <div className="h-6 w-16 bg-green-100 dark:bg-green-900/30 rounded-full animate-pulse" />
                <div className="h-6 w-24 bg-blue-100 dark:bg-blue-900/30 rounded-full animate-pulse" />
              </div>

              {/* Description Lines */}
              <div className="space-y-3 mb-6">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>

              {/* Example Section */}
              <div className="mb-6">
                <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse" />
                <div className="bg-gray-100 dark:bg-gray-900/50 rounded-lg p-4 space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </div>

              {/* Hints Section */}
              <div>
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Navigation Skeleton */}
            <div className="flex gap-4">
              <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse" />
                <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded mb-1 ml-auto animate-pulse" />
                <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded ml-auto animate-pulse" />
              </div>
            </div>
          </div>

          {/* Right Column - Code Editor and Tests */}
          <div className="space-y-6">
            {/* Code Editor Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700/50">
              {/* Editor Header */}
              <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between bg-gray-50 dark:bg-gray-900/30">
                <div className="h-6 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-8 w-28 bg-blue-200 dark:bg-blue-900/50 rounded animate-pulse" />
                  <div className="h-8 w-24 bg-green-200 dark:bg-green-900/50 rounded animate-pulse" />
                </div>
              </div>

              {/* Code Editor Skeleton */}
              <div className="h-96 bg-gray-900 dark:bg-gray-950 p-4">
                {/* Line Numbers + Code Lines */}
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((line) => (
                    <div key={line} className="flex items-center gap-4">
                      {/* Line Number */}
                      <div className="w-8 h-4 bg-gray-700 rounded animate-pulse flex-shrink-0" />
                      {/* Code Content */}
                      <div
                        className="h-4 bg-gray-700/50 rounded animate-pulse"
                        style={{
                          width: `${20 + ((line * 17) % 60)}%`,
                          animationDelay: `${line * 50}ms`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Test Results Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700/50">
              <div className="h-6 w-28 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse" />

              {/* Test Case Skeletons */}
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg"
                  >
                    <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse flex-shrink-0" />
                    <div className="flex-1">
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse" />
                      <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Run Tests Prompt */}
              <div className="mt-4 text-center">
                <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
