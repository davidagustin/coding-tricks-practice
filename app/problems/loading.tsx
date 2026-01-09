export default function ProblemsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mt-1 animate-pulse" />
        </div>

        {/* Search and Sort Bar Skeleton */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="lg:hidden h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Skeleton - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 space-y-6">
              {/* Difficulty Section */}
              <div>
                <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
              {/* Category Section */}
              <div>
                <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse" />
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
              {/* Status Section */}
              <div>
                <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse" />
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Problem Table Skeleton */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Table Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-900/30">
              <div className="flex items-center gap-4">
                <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex-1" />
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>

            {/* Problem Rows */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={i} className="px-4 py-4">
                  <div className="flex items-center gap-4">
                    {/* Status Icon */}
                    <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse flex-shrink-0" />
                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      <div
                        className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                        style={{ width: `${60 + (i % 3) * 15}%` }}
                      />
                    </div>
                    {/* Difficulty Badge */}
                    <div
                      className={`h-6 w-16 rounded-full animate-pulse flex-shrink-0 ${
                        i % 3 === 0
                          ? 'bg-green-100 dark:bg-green-900/30'
                          : i % 3 === 1
                            ? 'bg-yellow-100 dark:bg-yellow-900/30'
                            : 'bg-red-100 dark:bg-red-900/30'
                      }`}
                    />
                    {/* Category */}
                    <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex-shrink-0 hidden sm:block" />
                    {/* Acceptance */}
                    <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex-shrink-0 hidden md:block" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
