import { problems, getProblemById, getProblemsByCategory, getProblemsByDifficulty } from '@/lib/problems';
import type { Problem } from '@/lib/problems';

describe('Problems Data', () => {
  describe('Data Structure', () => {
    it('should export problems array', () => {
      expect(Array.isArray(problems)).toBe(true);
      expect(problems.length).toBeGreaterThan(0);
    });

    it('should have valid Problem interface for all problems', () => {
      problems.forEach((problem: Problem) => {
        // Required fields
        expect(problem.id).toBeDefined();
        expect(problem.title).toBeDefined();
        expect(problem.difficulty).toBeDefined();
        expect(problem.category).toBeDefined();
        expect(problem.description).toBeDefined();
        expect(problem.examples).toBeDefined();
        expect(problem.starterCode).toBeDefined();
        expect(problem.solution).toBeDefined();
        expect(problem.testCases).toBeDefined();
        expect(problem.hints).toBeDefined();
      });
    });

    it('should have valid difficulty values', () => {
      const validDifficulties = ['easy', 'medium', 'hard'];
      problems.forEach(problem => {
        expect(validDifficulties).toContain(problem.difficulty);
      });
    });

    it('should have non-empty categories', () => {
      problems.forEach(problem => {
        expect(problem.category.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('Helper Functions', () => {
    it('should find problem by ID', () => {
      const firstProblem = problems[0];
      const found = getProblemById(firstProblem.id);
      
      expect(found).toBeDefined();
      expect(found?.id).toBe(firstProblem.id);
    });

    it('should return undefined for non-existent ID', () => {
      const found = getProblemById('non-existent-id');
      expect(found).toBeUndefined();
    });

    it('should filter problems by category', () => {
      const categories = Array.from(new Set(problems.map(p => p.category)));
      
      categories.forEach(category => {
        const filtered = getProblemsByCategory(category);
        expect(filtered.length).toBeGreaterThan(0);
        filtered.forEach(problem => {
          expect(problem.category).toBe(category);
        });
      });
    });

    it('should filter problems by difficulty', () => {
      const difficulties: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];
      
      difficulties.forEach(difficulty => {
        const filtered = getProblemsByDifficulty(difficulty);
        filtered.forEach(problem => {
          expect(problem.difficulty).toBe(difficulty);
        });
      });
    });
  });

  describe('Code Validation', () => {
    it('should have starter code that is valid TypeScript/JavaScript', () => {
      problems.forEach(problem => {
        // Check that starter code is not empty
        expect(problem.starterCode.trim().length).toBeGreaterThan(0);
        
        // Check for common syntax issues
        expect(problem.starterCode).not.toMatch(/expectedOutput:\s*expect\s*=>/);
      });
    });

    it('should have solutions that are valid TypeScript/JavaScript', () => {
      problems.forEach(problem => {
        // Check that solution is not empty
        expect(problem.solution.trim().length).toBeGreaterThan(0);
        
        // Check for common syntax issues
        expect(problem.solution).not.toMatch(/expectedOutput:\s*expect\s*=>/);
      });
    });

    it('should not have functions as expectedOutput in test cases', () => {
      problems.forEach(problem => {
        problem.testCases.forEach((testCase, index) => {
          expect(typeof testCase.expectedOutput).not.toBe('function');
        });
      });
    });
  });

  describe('Content Quality', () => {
    it('should have meaningful descriptions', () => {
      problems.forEach(problem => {
        expect(problem.description.length).toBeGreaterThan(20);
      });
    });

    it('should have at least one example', () => {
      problems.forEach(problem => {
        expect(problem.examples.length).toBeGreaterThan(0);
      });
    });

    it('should have at least one test case', () => {
      problems.forEach(problem => {
        expect(problem.testCases.length).toBeGreaterThan(0);
      });
    });

    it('should have at least one hint', () => {
      problems.forEach(problem => {
        expect(problem.hints.length).toBeGreaterThan(0);
      });
    });

    it('should have examples with input and output', () => {
      problems.forEach(problem => {
        problem.examples.forEach(example => {
          expect(example.input.trim().length).toBeGreaterThan(0);
          expect(example.output.trim().length).toBeGreaterThan(0);
        });
      });
    });
  });
});
