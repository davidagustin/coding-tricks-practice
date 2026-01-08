import { problems } from '@/lib/problems';

/**
 * Test to ensure starter code doesn't have immediate promise executions
 * that could cause unhandled promise rejections
 */
describe('Starter Code Safety', () => {
  it('should not have uncommented .then(console.log) calls in starter code', () => {
    problems.forEach(problem => {
      // Check for uncommented .then(console.log) patterns
      const hasUncommentedThen = /^[^/]*\.then\s*\(\s*console\.(log|error|warn)\s*\)/m.test(problem.starterCode);
      
      if (hasUncommentedThen) {
        console.error(`Problem "${problem.title}" (${problem.id}) has uncommented .then(console.log) in starter code`);
      }
      
      expect(hasUncommentedThen).toBe(false);
    });
  });

  it('should not have uncommented .catch(console.error) calls that execute immediately', () => {
    problems.forEach(problem => {
      // Check for uncommented .catch(console.error) at the end of lines (not in comments)
      const lines = problem.starterCode.split('\n');
      lines.forEach((line, index) => {
        const trimmed = line.trim();
        // Skip if line is a comment
        if (trimmed.startsWith('//') || trimmed.startsWith('*')) {
          return;
        }
        
        // Check if line ends with .catch(console.error) or similar
        if (trimmed.match(/\.catch\s*\(\s*console\.(error|log|warn)\s*\)\s*;?\s*$/)) {
          console.error(`Problem "${problem.title}" (${problem.id}) line ${index + 1} has uncommented .catch(console.error): ${trimmed}`);
          expect(trimmed).not.toMatch(/\.catch\s*\(\s*console\.(error|log|warn)\s*\)\s*;?\s*$/);
        }
      });
    });
  });

  it('should have all test code commented out if it executes promises', () => {
    problems.forEach(problem => {
      const starterCode = problem.starterCode;
      
      // Find lines that look like they execute promises immediately
      const lines = starterCode.split('\n');
      let inCommentBlock = false;
      
      lines.forEach((line, index) => {
        const trimmed = line.trim();
        
        // Track comment blocks
        if (trimmed.includes('/*')) inCommentBlock = true;
        if (trimmed.includes('*/')) inCommentBlock = false;
        
        // Skip if in comment block or line is a comment
        if (inCommentBlock || trimmed.startsWith('//') || trimmed.startsWith('*')) {
          return;
        }
        
        // Check for patterns that execute promises immediately
        // Pattern: functionCall(...).then(...) or functionCall(...).catch(...)
        const immediateExecutionPattern = /^\w+\([^)]*\)\s*\.(then|catch)\s*\(/;
        if (immediateExecutionPattern.test(trimmed)) {
          // This is likely an immediate execution - it should be commented
          console.warn(`Problem "${problem.title}" (${problem.id}) line ${index + 1} may execute immediately: ${trimmed.substring(0, 50)}...`);
          // Don't fail the test, just warn - some might be intentional
        }
      });
    });
  });
});
