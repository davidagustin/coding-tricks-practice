import type { Problem } from '@/lib/problems';
import {
  getProblemById,
  getProblemsByCategory,
  getProblemsByDifficulty,
  problems,
} from '@/lib/problems';

/**
 * Comprehensive test suite for lib/problems.ts
 * Tests the problems array, Problem interface, and all helper functions
 */
describe('lib/problems', () => {
  // =====================================================
  // 1. Problems array is exported and has items
  // =====================================================
  describe('problems array export', () => {
    it('should export problems as an array', () => {
      expect(Array.isArray(problems)).toBe(true);
    });

    it('should have items in the problems array', () => {
      expect(problems.length).toBeGreaterThan(0);
    });

    it('should have a significant number of problems', () => {
      // The codebase has 100+ problems, ensure we're exporting all of them
      expect(problems.length).toBeGreaterThanOrEqual(50);
    });
  });

  // =====================================================
  // 2. Each problem has required fields
  // =====================================================
  describe('Problem interface - required fields', () => {
    it('each problem should have an id (string)', () => {
      problems.forEach((problem: Problem, index: number) => {
        expect(problem.id).toBeDefined();
        expect(typeof problem.id).toBe('string');
        expect(problem.id.length).toBeGreaterThan(0);
      });
    });

    it('each problem should have a title (string)', () => {
      problems.forEach((problem: Problem) => {
        expect(problem.title).toBeDefined();
        expect(typeof problem.title).toBe('string');
        expect(problem.title.length).toBeGreaterThan(0);
      });
    });

    it('each problem should have a difficulty', () => {
      problems.forEach((problem: Problem) => {
        expect(problem.difficulty).toBeDefined();
        expect(typeof problem.difficulty).toBe('string');
      });
    });

    it('each problem should have a category (string)', () => {
      problems.forEach((problem: Problem) => {
        expect(problem.category).toBeDefined();
        expect(typeof problem.category).toBe('string');
        expect(problem.category.length).toBeGreaterThan(0);
      });
    });

    it('each problem should have a description (string)', () => {
      problems.forEach((problem: Problem) => {
        expect(problem.description).toBeDefined();
        expect(typeof problem.description).toBe('string');
        expect(problem.description.length).toBeGreaterThan(0);
      });
    });

    it('each problem should have examples (array)', () => {
      problems.forEach((problem: Problem) => {
        expect(problem.examples).toBeDefined();
        expect(Array.isArray(problem.examples)).toBe(true);
        expect(problem.examples.length).toBeGreaterThan(0);
      });
    });

    it('each example should have input and output', () => {
      problems.forEach((problem: Problem) => {
        problem.examples.forEach((example, exampleIndex) => {
          expect(example.input).toBeDefined();
          expect(typeof example.input).toBe('string');
          expect(example.output).toBeDefined();
          expect(typeof example.output).toBe('string');
          // explanation is optional, but if present should be a string
          if (example.explanation !== undefined) {
            expect(typeof example.explanation).toBe('string');
          }
        });
      });
    });

    it('each problem should have starterCode (string)', () => {
      problems.forEach((problem: Problem) => {
        expect(problem.starterCode).toBeDefined();
        expect(typeof problem.starterCode).toBe('string');
        expect(problem.starterCode.length).toBeGreaterThan(0);
      });
    });

    it('each problem should have solution (string)', () => {
      problems.forEach((problem: Problem) => {
        expect(problem.solution).toBeDefined();
        expect(typeof problem.solution).toBe('string');
        expect(problem.solution.length).toBeGreaterThan(0);
      });
    });

    it('each problem should have testCases (array)', () => {
      problems.forEach((problem: Problem) => {
        expect(problem.testCases).toBeDefined();
        expect(Array.isArray(problem.testCases)).toBe(true);
        expect(problem.testCases.length).toBeGreaterThan(0);
      });
    });

    it('each testCase should have input and expectedOutput', () => {
      problems.forEach((problem: Problem) => {
        problem.testCases.forEach((testCase, testIndex) => {
          expect(testCase).toHaveProperty('input');
          expect(testCase).toHaveProperty('expectedOutput');
          // description is optional, but if present should be a string
          if (testCase.description !== undefined) {
            expect(typeof testCase.description).toBe('string');
          }
        });
      });
    });

    it('each problem should have hints (array)', () => {
      problems.forEach((problem: Problem) => {
        expect(problem.hints).toBeDefined();
        expect(Array.isArray(problem.hints)).toBe(true);
        expect(problem.hints.length).toBeGreaterThan(0);
      });
    });

    it('each hint should be a non-empty string', () => {
      problems.forEach((problem: Problem) => {
        problem.hints.forEach((hint, hintIndex) => {
          expect(typeof hint).toBe('string');
          expect(hint.length).toBeGreaterThan(0);
        });
      });
    });
  });

  // =====================================================
  // 3. getProblemById returns correct problem
  // =====================================================
  describe('getProblemById function', () => {
    it('should return the correct problem when given a valid ID', () => {
      const firstProblem = problems[0];
      const result = getProblemById(firstProblem.id);

      expect(result).toBeDefined();
      expect(result).toEqual(firstProblem);
    });

    it('should return a problem that matches the exact ID', () => {
      const testProblem = problems[Math.floor(problems.length / 2)];
      const result = getProblemById(testProblem.id);

      expect(result?.id).toBe(testProblem.id);
      expect(result?.title).toBe(testProblem.title);
      expect(result?.category).toBe(testProblem.category);
      expect(result?.difficulty).toBe(testProblem.difficulty);
    });

    it('should find problems for various valid IDs', () => {
      // Test multiple problems from the array
      const indicesToTest = [0, 5, 10, 20, problems.length - 1];

      indicesToTest.forEach((index) => {
        if (index < problems.length) {
          const problem = problems[index];
          const result = getProblemById(problem.id);
          expect(result).toBeDefined();
          expect(result?.id).toBe(problem.id);
        }
      });
    });

    it('should return the full problem object with all properties', () => {
      const problem = problems[0];
      const result = getProblemById(problem.id);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('difficulty');
      expect(result).toHaveProperty('category');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('examples');
      expect(result).toHaveProperty('starterCode');
      expect(result).toHaveProperty('solution');
      expect(result).toHaveProperty('testCases');
      expect(result).toHaveProperty('hints');
    });
  });

  // =====================================================
  // 4. getProblemById returns undefined for non-existent ID
  // =====================================================
  describe('getProblemById with non-existent ID', () => {
    it('should return undefined for a non-existent ID', () => {
      const result = getProblemById('non-existent-id-12345');
      expect(result).toBeUndefined();
    });

    it('should return undefined for an empty string ID', () => {
      const result = getProblemById('');
      expect(result).toBeUndefined();
    });

    it('should return undefined for ID with special characters', () => {
      const result = getProblemById('!@#$%^&*()');
      expect(result).toBeUndefined();
    });

    it('should return undefined for ID with whitespace', () => {
      const result = getProblemById('   ');
      expect(result).toBeUndefined();
    });

    it('should return undefined for ID that is similar but not exact match', () => {
      const firstProblem = problems[0];
      // Try with uppercase
      const resultUppercase = getProblemById(firstProblem.id.toUpperCase());
      // This should be undefined unless the ID happens to be all uppercase
      if (firstProblem.id !== firstProblem.id.toUpperCase()) {
        expect(resultUppercase).toBeUndefined();
      }

      // Try with extra characters
      const resultExtra = getProblemById(firstProblem.id + '-extra');
      expect(resultExtra).toBeUndefined();
    });

    it('should return undefined for numeric-only ID', () => {
      const result = getProblemById('123456');
      expect(result).toBeUndefined();
    });
  });

  // =====================================================
  // 5. filterByCategory (getProblemsByCategory) function
  // =====================================================
  describe('getProblemsByCategory function', () => {
    it('should return an array', () => {
      const categories = [...new Set(problems.map((p) => p.category))];
      const result = getProblemsByCategory(categories[0]);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return problems matching the given category', () => {
      const categories = [...new Set(problems.map((p) => p.category))];

      categories.forEach((category) => {
        const result = getProblemsByCategory(category);
        expect(result.length).toBeGreaterThan(0);
        result.forEach((problem) => {
          expect(problem.category).toBe(category);
        });
      });
    });

    it('should return all problems for a category', () => {
      const categories = [...new Set(problems.map((p) => p.category))];
      const testCategory = categories[0];

      const expectedCount = problems.filter((p) => p.category === testCategory).length;
      const result = getProblemsByCategory(testCategory);

      expect(result.length).toBe(expectedCount);
    });

    it('should return empty array for non-existent category', () => {
      const result = getProblemsByCategory('non-existent-category-xyz');
      expect(result).toEqual([]);
    });

    it('should return empty array for empty string category', () => {
      const result = getProblemsByCategory('');
      expect(result).toEqual([]);
    });

    it('should be case-sensitive for category matching', () => {
      const categories = [...new Set(problems.map((p) => p.category))];
      const testCategory = categories[0];

      // Test with different case
      const uppercaseCategory = testCategory.toUpperCase();
      if (uppercaseCategory !== testCategory) {
        const result = getProblemsByCategory(uppercaseCategory);
        expect(result).toEqual([]);
      }
    });

    it('should return valid Problem objects', () => {
      const categories = [...new Set(problems.map((p) => p.category))];
      const result = getProblemsByCategory(categories[0]);

      result.forEach((problem) => {
        expect(problem).toHaveProperty('id');
        expect(problem).toHaveProperty('title');
        expect(problem).toHaveProperty('difficulty');
        expect(problem).toHaveProperty('description');
      });
    });
  });

  // =====================================================
  // 6. filterByDifficulty (getProblemsByDifficulty) function
  // =====================================================
  describe('getProblemsByDifficulty function', () => {
    const validDifficulties: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];

    it('should return an array for each difficulty level', () => {
      validDifficulties.forEach((difficulty) => {
        const result = getProblemsByDifficulty(difficulty);
        expect(Array.isArray(result)).toBe(true);
      });
    });

    it('should return problems matching the given difficulty', () => {
      validDifficulties.forEach((difficulty) => {
        const result = getProblemsByDifficulty(difficulty);
        result.forEach((problem) => {
          expect(problem.difficulty).toBe(difficulty);
        });
      });
    });

    it('should return problems for easy difficulty', () => {
      const result = getProblemsByDifficulty('easy');
      expect(result.length).toBeGreaterThanOrEqual(0);
      result.forEach((problem) => {
        expect(problem.difficulty).toBe('easy');
      });
    });

    it('should return problems for medium difficulty', () => {
      const result = getProblemsByDifficulty('medium');
      expect(result.length).toBeGreaterThanOrEqual(0);
      result.forEach((problem) => {
        expect(problem.difficulty).toBe('medium');
      });
    });

    it('should return problems for hard difficulty', () => {
      const result = getProblemsByDifficulty('hard');
      expect(result.length).toBeGreaterThanOrEqual(0);
      result.forEach((problem) => {
        expect(problem.difficulty).toBe('hard');
      });
    });

    it('should return correct count for each difficulty', () => {
      validDifficulties.forEach((difficulty) => {
        const expectedCount = problems.filter((p) => p.difficulty === difficulty).length;
        const result = getProblemsByDifficulty(difficulty);
        expect(result.length).toBe(expectedCount);
      });
    });

    it('should return empty array for invalid difficulty', () => {
      // TypeScript would normally prevent this, but testing runtime behavior
      const result = getProblemsByDifficulty('invalid' as 'easy');
      expect(result).toEqual([]);
    });

    it('should return valid Problem objects', () => {
      validDifficulties.forEach((difficulty) => {
        const result = getProblemsByDifficulty(difficulty);
        result.forEach((problem) => {
          expect(problem).toHaveProperty('id');
          expect(problem).toHaveProperty('title');
          expect(problem).toHaveProperty('category');
          expect(problem).toHaveProperty('description');
        });
      });
    });

    it('sum of all difficulties should equal total problems', () => {
      const easyCount = getProblemsByDifficulty('easy').length;
      const mediumCount = getProblemsByDifficulty('medium').length;
      const hardCount = getProblemsByDifficulty('hard').length;

      expect(easyCount + mediumCount + hardCount).toBe(problems.length);
    });
  });

  // =====================================================
  // 7. Problem IDs are unique
  // =====================================================
  describe('Problem ID uniqueness', () => {
    it('should have unique IDs across all problems', () => {
      const ids = problems.map((p) => p.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should not have any duplicate IDs', () => {
      const ids = problems.map((p) => p.id);
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

      expect(duplicates.length).toBe(0);
    });

    it('should identify duplicate IDs if they exist', () => {
      const ids = problems.map((p) => p.id);
      const idCounts = new Map<string, number>();

      ids.forEach((id) => {
        idCounts.set(id, (idCounts.get(id) || 0) + 1);
      });

      const duplicates = Array.from(idCounts.entries())
        .filter(([_, count]) => count > 1)
        .map(([id, _]) => id);

      expect(duplicates).toEqual([]);
    });

    it('each ID should be a non-empty string', () => {
      problems.forEach((problem) => {
        expect(typeof problem.id).toBe('string');
        expect(problem.id.trim().length).toBeGreaterThan(0);
      });
    });

    it('IDs should follow valid naming convention (lowercase letters, numbers, hyphens, and camelCase allowed)', () => {
      problems.forEach((problem) => {
        // IDs use kebab-case style but some contain camelCase for method names (e.g., array-toSorted-toReversed)
        // Pattern: starts with lowercase, contains letters, numbers, and hyphens
        expect(problem.id).toMatch(/^[a-z][a-zA-Z0-9-]*$/);
      });
    });
  });

  // =====================================================
  // 8. Difficulty values are valid ('easy', 'medium', 'hard')
  // =====================================================
  describe('Difficulty value validation', () => {
    const validDifficulties = ['easy', 'medium', 'hard'];

    it('all problems should have valid difficulty values', () => {
      problems.forEach((problem) => {
        expect(validDifficulties).toContain(problem.difficulty);
      });
    });

    it('no problem should have an undefined difficulty', () => {
      problems.forEach((problem) => {
        expect(problem.difficulty).toBeDefined();
        expect(problem.difficulty).not.toBeNull();
      });
    });

    it('no problem should have an empty string difficulty', () => {
      problems.forEach((problem) => {
        expect(problem.difficulty.length).toBeGreaterThan(0);
      });
    });

    it('difficulty should be exactly one of the valid values', () => {
      problems.forEach((problem) => {
        const isValid =
          problem.difficulty === 'easy' ||
          problem.difficulty === 'medium' ||
          problem.difficulty === 'hard';

        expect(isValid).toBe(true);
      });
    });

    it('should have problems of each difficulty level', () => {
      const difficultySet = new Set(problems.map((p) => p.difficulty));

      expect(difficultySet.has('easy')).toBe(true);
      expect(difficultySet.has('medium')).toBe(true);
      expect(difficultySet.has('hard')).toBe(true);
    });

    it('difficulty counts should be reasonable distribution', () => {
      const easyCount = problems.filter((p) => p.difficulty === 'easy').length;
      const mediumCount = problems.filter((p) => p.difficulty === 'medium').length;
      const hardCount = problems.filter((p) => p.difficulty === 'hard').length;

      // Each difficulty should have at least 1 problem
      expect(easyCount).toBeGreaterThan(0);
      expect(mediumCount).toBeGreaterThan(0);
      expect(hardCount).toBeGreaterThan(0);
    });
  });

  // =====================================================
  // Additional edge cases and branch coverage
  // =====================================================
  describe('Edge cases and additional coverage', () => {
    it('should handle getting first and last problems by ID', () => {
      const firstProblem = problems[0];
      const lastProblem = problems[problems.length - 1];

      expect(getProblemById(firstProblem.id)).toEqual(firstProblem);
      expect(getProblemById(lastProblem.id)).toEqual(lastProblem);
    });

    it('problems array should not be mutated by helper functions', () => {
      const originalLength = problems.length;
      const originalFirstId = problems[0].id;

      // Call all helper functions
      getProblemById(problems[0].id);
      getProblemsByCategory(problems[0].category);
      getProblemsByDifficulty(problems[0].difficulty);

      // Verify no mutation
      expect(problems.length).toBe(originalLength);
      expect(problems[0].id).toBe(originalFirstId);
    });

    it('category filter should not return problems from other categories', () => {
      const categories = [...new Set(problems.map((p) => p.category))];

      if (categories.length >= 2) {
        const category1 = categories[0];
        const category2 = categories[1];

        const result = getProblemsByCategory(category1);
        result.forEach((problem) => {
          expect(problem.category).not.toBe(category2);
        });
      }
    });

    it('difficulty filter should not return problems from other difficulties', () => {
      const easyProblems = getProblemsByDifficulty('easy');

      easyProblems.forEach((problem) => {
        expect(problem.difficulty).not.toBe('medium');
        expect(problem.difficulty).not.toBe('hard');
      });
    });

    it('all categories should be non-empty strings', () => {
      const categories = [...new Set(problems.map((p) => p.category))];

      categories.forEach((category) => {
        expect(typeof category).toBe('string');
        expect(category.trim().length).toBeGreaterThan(0);
      });
    });

    it('all titles should be meaningful (more than 3 characters)', () => {
      problems.forEach((problem) => {
        expect(problem.title.length).toBeGreaterThan(3);
      });
    });

    it('all descriptions should be meaningful (more than 20 characters)', () => {
      problems.forEach((problem) => {
        expect(problem.description.length).toBeGreaterThan(20);
      });
    });

    it('starterCode should contain code structure (function, variable, type, or interface)', () => {
      problems.forEach((problem) => {
        // Starter code should have some form of code definition
        // This includes functions, classes, variables, or TypeScript type definitions
        const hasCodeStructure =
          problem.starterCode.includes('function') ||
          problem.starterCode.includes('=>') ||
          problem.starterCode.includes('class') ||
          problem.starterCode.includes('const') ||
          problem.starterCode.includes('let') ||
          problem.starterCode.includes('var') ||
          problem.starterCode.includes('type ') ||
          problem.starterCode.includes('interface ') ||
          problem.starterCode.includes('enum ') ||
          problem.starterCode.includes('//');

        expect(hasCodeStructure).toBe(true);
      });
    });

    it('solution should contain implementation', () => {
      problems.forEach((problem) => {
        // Solutions should have some implementation
        const hasImplementation =
          problem.solution.includes('function') ||
          problem.solution.includes('=>') ||
          problem.solution.includes('return') ||
          problem.solution.includes('class') ||
          problem.solution.includes('const');

        expect(hasImplementation).toBe(true);
      });
    });

    it('testCases should not have functions as expectedOutput', () => {
      problems.forEach((problem) => {
        problem.testCases.forEach((testCase) => {
          expect(typeof testCase.expectedOutput).not.toBe('function');
        });
      });
    });
  });

  // =====================================================
  // Type checking and interface validation
  // =====================================================
  describe('Type and interface validation', () => {
    it('Problem type should be exported and usable', () => {
      // This test verifies the type is exported correctly
      const problem: Problem = problems[0];
      expect(problem).toBeDefined();
    });

    it('examples array should have correct structure', () => {
      problems.forEach((problem) => {
        problem.examples.forEach((example) => {
          expect(typeof example.input).toBe('string');
          expect(typeof example.output).toBe('string');
          // explanation is optional
          if ('explanation' in example && example.explanation !== undefined) {
            expect(typeof example.explanation).toBe('string');
          }
        });
      });
    });

    it('testCases array should have correct structure', () => {
      problems.forEach((problem) => {
        problem.testCases.forEach((testCase) => {
          expect(testCase).toHaveProperty('input');
          expect(testCase).toHaveProperty('expectedOutput');
          // description is optional
          if ('description' in testCase && testCase.description !== undefined) {
            expect(typeof testCase.description).toBe('string');
          }
        });
      });
    });
  });
});
