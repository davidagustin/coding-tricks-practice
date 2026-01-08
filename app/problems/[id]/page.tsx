'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProblemById, problems } from '@/lib/problems';
import { runTests, TestRunnerResult } from '@/lib/test-runner';
import CodeEditor from '@/components/CodeEditor';
import TestResults from '@/components/TestResults';
import ProblemDescription from '@/components/ProblemDescription';
import Link from 'next/link';

export default function ProblemPage() {
  const params = useParams();
  const router = useRouter();
  const problemId = params.id as string;
  
  const problem = getProblemById(problemId);
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

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Problem not found
          </h1>
          <Link
            href="/problems"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
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
          error: 'No code to test. Please write your solution first.'
        });
        setIsRunning(false);
        return;
      }

      // Wrap in Promise.resolve to ensure we catch all errors
      const results = await Promise.resolve(runTests(codeToTest, problem.testCases)).catch((err) => {
        console.error('Test execution error:', err);
        return {
          allPassed: false,
          results: [],
          error: `Error running tests: ${err?.message || err?.toString() || 'Unknown error'}. Please check your code.`
        };
      });
      
      setTestResults(results);
    } catch (error: any) {
      console.error('Unexpected test execution error:', error);
      setTestResults({
        allPassed: false,
        results: [],
        error: `Unexpected error: ${error?.message || error?.toString() || 'An unexpected error occurred while running tests. Please check your code syntax.'}`
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

  // Keep ref in sync with code state
  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  const currentIndex = problems.findIndex(p => p.id === problemId);
  const prevProblem = currentIndex > 0 ? problems[currentIndex - 1] : null;
  const nextProblem = currentIndex < problems.length - 1 ? problems[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link 
            href="/problems" 
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Problems
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Problem Description */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <ProblemDescription problem={problem} />
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              {prevProblem && (
                <Link
                  href={`/problems/${prevProblem.id}`}
                  className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
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
                  className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition-shadow text-right"
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Code Editor
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleToggleSolution}
                    className="px-3 py-1.5 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    {showSolution ? 'Hide' : 'Show'} Solution
                  </button>
                  <button
                    onClick={handleRunTests}
                    disabled={isRunning}
                    className="px-4 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/50">
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

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
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
                <TestResults
                  results={[]}
                  allPassed={false}
                  isRunning={isRunning}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
