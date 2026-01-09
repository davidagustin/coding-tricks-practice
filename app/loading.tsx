export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="h-12 w-96 max-w-full bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-[600px] max-w-full bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-2 animate-pulse" />
          <div className="h-6 w-80 max-w-full bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-8 animate-pulse" />
          <div className="h-14 w-48 bg-blue-200 dark:bg-blue-900/50 rounded-lg mx-auto animate-pulse" />
        </div>

        {/* Progress Card Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 animate-pulse" />
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto mt-2 animate-pulse" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 text-center">
              <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-1 animate-pulse" />
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse" />
            </div>
          ))}
        </div>

        {/* Topics Section Skeleton */}
        <div className="mb-16">
          <div className="h-9 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Features Section Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                <div className="flex-1">
                  <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
