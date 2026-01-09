import { problems } from '../lib/problems';
import * as fs from 'fs';
import * as path from 'path';

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
    if (!['test', 'describe', 'it', 'expect', 'beforeEach', 'afterEach'].includes(name)) {
      functionNames.add(name);
    }
  }
  
  // Match arrow functions assigned to variables: const name = (...) => or const name = function(...)
  const arrowFunctionRegex = /(?:const|let|var)\s+(\w+)\s*=\s*(?:\([^)]*\)\s*=>|function\s*\()/g;
  while ((match = arrowFunctionRegex.exec(codeWithoutComments)) !== null) {
    const name = match[1];
    // Skip common keywords
    if (!['test', 'describe', 'it', 'expect', 'console', 'document', 'window'].includes(name)) {
      functionNames.add(name);
    }
  }
  
  return functionNames;
}

interface Inconsistency {
  problemId: string;
  problemTitle: string;
  issues: string[];
}

function checkProblem(problem: typeof problems[0]): Inconsistency | null {
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
  const testHelpers = ['console', 'log', 'expect', 'test', 'describe', 'it', 'document', 'window', 'createElement', 'addEventListener'];
  const filteredMissing = missingInSolution.filter((fn) => !testHelpers.includes(fn));
  
  if (extraInSolution.length > 0) {
    issues.push(
      `Functions in solution but not in starter code: ${extraInSolution.join(', ')}`
    );
  }
  
  if (filteredMissing.length > 0) {
    issues.push(
      `Functions in starter code but not in solution: ${filteredMissing.join(', ')}`
    );
  }
  
  if (issues.length > 0) {
    return {
      problemId: problem.id,
      problemTitle: problem.title,
      issues,
    };
  }
  
  return null;
}

// Main execution
console.log('Checking all problems for starter/solution consistency...\n');

const inconsistencies: Inconsistency[] = [];

for (const problem of problems) {
  const result = checkProblem(problem);
  if (result) {
    inconsistencies.push(result);
  }
}

// Report results
if (inconsistencies.length === 0) {
  console.log('✅ All problems are consistent!');
} else {
  console.log(`❌ Found ${inconsistencies.length} problems with inconsistencies:\n`);
  
  for (const inconsistency of inconsistencies) {
    console.log(`\n${inconsistency.problemId} - ${inconsistency.problemTitle}`);
    for (const issue of inconsistency.issues) {
      console.log(`  - ${issue}`);
    }
  }
  
  // Write to file for batch processing
  const outputPath = path.join(__dirname, 'inconsistencies.json');
  fs.writeFileSync(outputPath, JSON.stringify(inconsistencies, null, 2));
  console.log(`\n📝 Results written to ${outputPath}`);
}

export { checkProblem, extractFunctionNames };
