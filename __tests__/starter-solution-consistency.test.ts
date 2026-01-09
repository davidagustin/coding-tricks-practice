import { problems } from '@/lib/problems';

/**
 * Extract function names from code string
 * Focuses on top-level function declarations and const/let/var assignments
 */
function extractFunctionNames(code: string): Set<string> {
  const functionNames = new Set<string>();

  // Remove comments to avoid false matches
  const codeWithoutComments = code
    .replace(/\/\/.*$/gm, '') // Single line comments
    .replace(/\/\*[\s\S]*?\*\//g, ''); // Multi-line comments

  // Match function declarations: function name(...)
  const functionDeclRegex = /function\s+(\w+)\s*\(/g;
  let match;
  while ((match = functionDeclRegex.exec(codeWithoutComments)) !== null) {
    const name = match[1];
    // Skip common keywords and test helpers
    if (
      !['test', 'describe', 'it', 'expect', 'beforeEach', 'afterEach'].includes(
        name
      )
    ) {
      functionNames.add(name);
    }
  }

  // Match arrow functions assigned to variables: const name = (...) => or const name = function(...)
  const arrowFunctionRegex =
    /(?:const|let|var)\s+(\w+)\s*=\s*(?:\([^)]*\)\s*=>|function\s*\()/g;
  while ((match = arrowFunctionRegex.exec(codeWithoutComments)) !== null) {
    const name = match[1];
    // Skip common keywords
    if (
      !['test', 'describe', 'it', 'expect', 'console', 'document', 'window'].includes(
        name
      )
    ) {
      functionNames.add(name);
    }
  }

  return functionNames;
}

describe('Starter Code and Solution Consistency', () => {
  it('should have consistent functions between starter code and solution', () => {
    const inconsistencies: Array<{
      problemId: string;
      problemTitle: string;
      issues: string[];
    }> = [];

    for (const problem of problems) {
      const issues: string[] = [];

      const starterFunctions = extractFunctionNames(problem.starterCode);
      const solutionFunctions = extractFunctionNames(problem.solution);

      // Check for functions in solution that aren't in starter code
      const extraInSolution = Array.from(solutionFunctions).filter(
        (fn) => !starterFunctions.has(fn)
      );

      // Check for functions in starter code that aren't in solution
      const missingInSolution = Array.from(starterFunctions).filter(
        (fn) => !solutionFunctions.has(fn)
      );

      // Filter out common test/helper functions and DOM APIs that might be in starter code
      const testHelpers = [
        'console',
        'log',
        'expect',
        'test',
        'describe',
        'it',
        'document',
        'window',
        'createElement',
        'addEventListener',
        'setTimeout',
        'clearTimeout',
        'setInterval',
        'clearInterval',
      ];
      const filteredMissing = missingInSolution.filter(
        (fn) => !testHelpers.includes(fn)
      );

      // Special case: handler functions in solutions (like event handlers) are okay
      const handlerFunctions = extraInSolution.filter((fn) =>
        fn.toLowerCase().includes('handler')
      );
      const nonHandlerExtra = extraInSolution.filter(
        (fn) => !fn.toLowerCase().includes('handler')
      );

      if (nonHandlerExtra.length > 0) {
        issues.push(
          `Functions in solution but not in starter code: ${nonHandlerExtra.join(', ')}`
        );
      }

      if (filteredMissing.length > 0) {
        issues.push(
          `Functions in starter code but not in solution: ${filteredMissing.join(', ')}`
        );
      }

      if (issues.length > 0) {
        inconsistencies.push({
          problemId: problem.id,
          problemTitle: problem.title,
          issues,
        });
      }
    }

    if (inconsistencies.length > 0) {
      const errorMessage = [
        `Found ${inconsistencies.length} problems with inconsistencies:\n`,
        ...inconsistencies.map(
          (inc) =>
            `\n${inc.problemId} - ${inc.problemTitle}\n${inc.issues
              .map((issue) => `  - ${issue}`)
              .join('\n')}`
        ),
      ].join('\n');

      // Fail the test with detailed information
      throw new Error(errorMessage);
    }
  });

  it('should have non-empty solutions for all problems', () => {
    const problemsWithEmptySolutions = problems.filter(
      (problem) =>
        !problem.solution ||
        problem.solution.trim() === '' ||
        problem.solution.trim() === 'function test() { return true; }'
    );

    if (problemsWithEmptySolutions.length > 0) {
      const errorMessage = [
        `Found ${problemsWithEmptySolutions.length} problems with empty or placeholder solutions:\n`,
        ...problemsWithEmptySolutions.map(
          (p) => `  - ${p.id}: ${p.title}`
        ),
      ].join('\n');

      throw new Error(errorMessage);
    }
  });

  it('should have non-empty starter code for all problems', () => {
    const problemsWithEmptyStarterCode = problems.filter(
      (problem) => !problem.starterCode || problem.starterCode.trim() === ''
    );

    if (problemsWithEmptyStarterCode.length > 0) {
      const errorMessage = [
        `Found ${problemsWithEmptyStarterCode.length} problems with empty starter code:\n`,
        ...problemsWithEmptyStarterCode.map((p) => `  - ${p.id}: ${p.title}`),
      ].join('\n');

      throw new Error(errorMessage);
    }
  });
});
