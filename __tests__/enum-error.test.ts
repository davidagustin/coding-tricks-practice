import { runTests } from '@/lib/test-runner';
import { problems } from '@/lib/problems';

describe('Enum Error Prevention', () => {
  it('should check all problems with enums for the error', async () => {
    // Find all problems that use enums
    const problemsWithEnums = problems.filter(p => 
      p.starterCode.includes('enum ') || 
      p.solution.includes('enum ')
    );
    
    expect(problemsWithEnums.length).toBeGreaterThan(0);
    
    for (const problem of problemsWithEnums) {
      // Test starter code
      if (problem.starterCode.includes('enum ')) {
        const result = await runTests(problem.starterCode, []);
        if (result.error) {
          expect(result.error).not.toContain('enum declarations can only be used in TypeScript files');
          expect(result.error).not.toContain('8006');
          expect(result.error).not.toMatch(/enum.*can only be used/i);
        }
      }
      
      // Test solution (skip if uses browser APIs)
      if (problem.solution.includes('enum ') && 
          !problem.solution.includes('fetch(') &&
          !problem.solution.includes('window.')) {
        const result = await runTests(problem.solution, []);
        if (result.error) {
          expect(result.error).not.toContain('enum declarations can only be used in TypeScript files');
          expect(result.error).not.toContain('8006');
          expect(result.error).not.toMatch(/enum.*can only be used/i);
        }
      }
    }
  });
  it('should not throw "enum declarations can only be used in TypeScript files" error', async () => {
    const codeWithEnum = `
      enum Status {
        Pending,
        Approved,
        Rejected
      }
      
      function getStatus(): Status {
        return Status.Pending;
      }
    `;
    
    const result = await runTests(codeWithEnum, [
      { input: [], expectedOutput: 0 }
    ]);
    
    // Should transpile successfully without the enum error
    if (result.error) {
      expect(result.error).not.toContain('enum declarations can only be used in TypeScript files');
      expect(result.error).not.toContain('8006');
      expect(result.error).not.toMatch(/enum.*can only be used/i);
    }
    // If no error, that's perfect - enum was transpiled successfully
  });

  it('should transpile enums without TypeScript file error', async () => {
    const codeWithStringEnum = `
      enum Direction {
        Up = 'UP',
        Down = 'DOWN',
        Left = 'LEFT',
        Right = 'RIGHT'
      }
      
      function getDirection(): string {
        return Direction.Up;
      }
    `;
    
    const result = await runTests(codeWithStringEnum, [
      { input: [], expectedOutput: 'UP' }
    ]);
    
    // Should not have the enum error
    if (result.error) {
      expect(result.error).not.toContain('enum declarations can only be used in TypeScript files');
      expect(result.error).not.toContain('8006');
      expect(result.error).not.toMatch(/enum.*can only be used/i);
    }
  });

  it('should handle enum in problem starter code', async () => {
    // Test that enum syntax in starter code doesn't cause the error
    const starterCodeWithEnum = `
      enum Status {
        Pending,
        Approved
      }
      
      function processStatus(status: Status) {
        return status;
      }
    `;
    
    const result = await runTests(starterCodeWithEnum, [
      { input: [0], expectedOutput: 0 }
    ]);
    
    // Should not have the enum error
    if (result.error) {
      expect(result.error).not.toContain('enum declarations can only be used in TypeScript files');
      expect(result.error).not.toContain('8006');
      expect(result.error).not.toMatch(/enum.*can only be used/i);
    }
  });

  it('should handle enum in problem solution', async () => {
    const solutionWithEnum = `
      enum Status {
        Pending = 0,
        Approved = 1,
        Rejected = 2
      }
      
      function getStatusName(status: Status): string {
        switch (status) {
          case Status.Pending:
            return 'Pending';
          case Status.Approved:
            return 'Approved';
          case Status.Rejected:
            return 'Rejected';
          default:
            return 'Unknown';
        }
      }
    `;
    
    const result = await runTests(solutionWithEnum, [
      { input: [0], expectedOutput: 'Pending' }
    ]);
    
    // Should not have the enum error
    if (result.error) {
      expect(result.error).not.toContain('enum declarations can only be used in TypeScript files');
      expect(result.error).not.toContain('8006');
      expect(result.error).not.toMatch(/enum.*can only be used/i);
    }
  });
});
