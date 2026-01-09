'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error boundary for the problems list page.
 * Handles errors that occur while loading or displaying the problems list.
 */
export default function ProblemsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Problems page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Error Icon */}
          <div className="w-20 h-20 mb-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Failed to load problems
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-2 max-w-md">
            We encountered an error while loading the problems list. This might be a temporary
            issue.
          </p>

          {error.message && (
            <p className="text-sm text-red-600 dark:text-red-400 mb-6 max-w-md">{error.message}</p>
          )}

          {/* Error digest for debugging */}
          {error.digest && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-6 font-mono">
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={reset}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 transition-all duration-200 active:scale-95"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-950 transition-all duration-200 active:scale-95"
            >
              Back to home
            </Link>
          </div>

          {/* Helpful suggestions */}
          <div className="mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 max-w-md text-left">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Things you can try:
            </h2>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">1.</span>
                Refresh the page
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">2.</span>
                Clear your browser cache
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">3.</span>
                Check your internet connection
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
