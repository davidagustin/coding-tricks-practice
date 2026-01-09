'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import ProblemDescription from '@/components/ProblemDescription';
import { useProgress } from '@/components/ProgressProvider';
import TestResults from '@/components/TestResults';
import { getProblemById, problems } from '@/lib/problems';
import { runTests, type TestRunnerResult } from '@/lib/test-runner';

export default function ProblemPage() {
  const params = useParams();
  const problemId = params.id as string;
  const { markSolved, isSolved } = useProgress();

  const problem = getProblemById(problemId);
  const solved = isSolved(problemId);
  const [code, setCode] = useState('');
  const [userCode, setUserCode] = useState(''); // Store user's code separately
  const [testResults, setTestResults] = useState<TestRunnerResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const codeRef = useRef(code); // Keep ref in sync with code state

  useEffect(() => {
    if (problem) {
      const starterCode = problem.starterCode;
      setCode(starterCode);
      setUserCode(starterCode);
      setTestResults(null);
      setShowSolution(false);
    }
  }, [problem]);

  // Keep ref in sync with code state
  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Problem not found
          </h1>
          <Link href="/problems" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Problems
          </Link>
        </div>
      </div>
    );
  }

  const handleRunTests = async () => {
    setIsRunning(true);
    setTestResults(null);

    // Use userCode for tests, not the displayed code (which might be solution)
    const codeToTest = showSolution ? userCode : code;

    try {
      if (!codeToTest || !codeToTest.trim()) {
        setTestResults({
          allPassed: false,
          results: [],
          error: 'No code to test. Please write your solution first.',
        });
        setIsRunning(false);
        return;
      }

      // Wrap in Promise.resolve to ensure we catch all errors
      const results = await Promise.resolve(runTests(codeToTest, problem.testCases)).catch(
        (err) => {
          console.error('Test execution error:', err);
          return {
            allPassed: false,
            results: [],
            error: `Error running tests: ${err?.message || err?.toString() || 'Unknown error'}. Please check your code.`,
          };
        }
      );

      setTestResults(results);

      // Mark as solved if all tests passed
      if (results.allPassed) {
        markSolved(problemId);
      }
    } catch (error: unknown) {
      console.error('Unexpected test execution error:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : 'An unexpected error occurred while running tests. Please check your code syntax.';
      setTestResults({
        allPassed: false,
        results: [],
        error: `Unexpected error: ${errorMessage}`,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    const starterCode = problem.starterCode;
    setCode(starterCode);
    setUserCode(starterCode);
    setTestResults(null);
    setShowSolution(false);
  };

  const handleToggleSolution = () => {
    if (showSolution) {
      // Hiding solution - just hide the solution panel
      setShowSolution(false);
    } else {
      // Showing solution - save current user code first
      // Use ref to get the latest code value to avoid stale closures
      const currentUserCode = codeRef.current || code;
      setUserCode(currentUserCode);
      setShowSolution(true);
      // Don't change the editor code - it stays as user's code
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    codeRef.current = newCode; // Keep ref in sync
    // Always update userCode when user types
    setUserCode(newCode);
  };

  const currentIndex = problems.findIndex((p) => p.id === problemId);
  const prevProblem = currentIndex > 0 ? problems[currentIndex - 1] : null;
  const nextProblem = currentIndex < problems.length - 1 ? problems[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Solved Badge */}
        {solved && (
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Solved
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Problem Description */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700/50 h-[600px]">
              <ProblemDescription problem={problem} />
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              {prevProblem && (
                <Link
                  href={`/problems/${prevProblem.id}`}
                  className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 active:scale-[0.98]"
                >
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Previous</div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {prevProblem.title}
                  </div>
                </Link>
              )}
              {nextProblem && (
                <Link
                  href={`/problems/${nextProblem.id}`}
                  className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 active:scale-[0.98] text-right"
                >
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Next</div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {nextProblem.title}
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Right Column - Code Editor and Tests */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700/50">
              <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between bg-gray-50 dark:bg-gray-900/30">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Code Editor
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 active:scale-95"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleToggleSolution}
                    className="px-3 py-1.5 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 active:scale-95"
                  >
                    {showSolution ? 'Hide' : 'Show'} Solution
                  </button>
                  <button
                    onClick={handleRunTests}
                    disabled={isRunning}
                    className="px-4 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 active:scale-95 disabled:active:scale-100"
                  >
                    {isRunning ? 'Running...' : 'Run Tests'}
                  </button>
                </div>
              </div>
              <div className="h-96">
                <CodeEditor
                  code={code || problem.starterCode}
                  onChange={handleCodeChange}
                  language="typescript"
                  readOnly={false}
                />
              </div>
              {showSolution && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/30">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Solution:
                  </h3>
                  <div className="h-64">
                    <CodeEditor
                      code={problem.solution}
                      onChange={() => {}} // No-op since it's read-only
                      language="typescript"
                      readOnly={true}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700/50">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Test Results
              </h2>
              {testResults ? (
                <TestResults
                  results={testResults.results}
                  allPassed={testResults.allPassed}
                  error={testResults.error}
                  isRunning={false}
                />
              ) : (
                <TestResults results={[]} allPassed={false} isRunning={isRunning} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
