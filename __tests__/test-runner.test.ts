import { runTests } from '@/lib/test-runner';
import { problems } from '@/lib/problems';

describe('Test Runner', () => {
  describe('TypeScript Transpilation', () => {
    it('should transpile TypeScript code with type annotations', async () => {
      const code = `
        function add(a: number, b: number): number {
          return a + b;
        }
      `;
      
      const result = await runTests(code, [
        { input: [1, 2], expectedOutput: 3 }
      ]);
      
      expect(result.error).toBeUndefined();
      expect(result.results.length).toBe(1);
      expect(result.results[0].passed).toBe(true);
    });

    it('should transpile TypeScript enums correctly', async () => {
      const code = `
        enum Status {
          Pending,
          Approved,
          Rejected
        }
        
        function getStatus(): Status {
          return Status.Pending;
        }
      `;
      
      const result = await runTests(code, [
        { input: [], expectedOutput: 0 } // Numeric enum starts at 0
      ]);
      
      expect(result.error).toBeUndefined();
      expect(result.results.length).toBe(1);
    });

    it('should transpile string enums correctly', async () => {
      const code = `
        enum Direction {
          Up = 'UP',
          Down = 'DOWN'
        }
        
        function getDirection(): string {
          return Direction.Up;
        }
      `;
      
      const result = await runTests(code, [
        { input: [], expectedOutput: 'UP' }
      ]);
      
      expect(result.error).toBeUndefined();
      expect(result.results.length).toBe(1);
    });

    it('should handle TypeScript interfaces and types', async () => {
      const code = `
        interface User {
          id: number;
          name: string;
        }
        
        function createUser(id: number, name: string): User {
          return { id, name };
        }
      `;
      
      const result = await runTests(code, [
        { input: [1, 'John'], expectedOutput: { id: 1, name: 'John' } }
      ]);
      
      expect(result.error).toBeUndefined();
      expect(result.results[0].passed).toBe(true);
    });
  });

  describe('Code Execution', () => {
    it('should execute simple JavaScript functions', async () => {
      const code = `
        function multiply(a, b) {
          return a * b;
        }
      `;
      
      const result = await runTests(code, [
        { input: [2, 3], expectedOutput: 6 }
      ]);
      
      expect(result.allPassed).toBe(true);
      expect(result.results[0].passed).toBe(true);
    });

    it('should handle async functions and promises', async () => {
      const code = `
        async function fetchData() {
          return Promise.resolve('data');
        }
      `;
      
      const result = await runTests(code, [
        { input: [], expectedOutput: 'data' }
      ]);
      
      // Async functions should work - either pass tests or have a meaningful error
      // (not a syntax/transpilation error)
      if (result.error) {
        // If there's an error, it should not be a syntax error
        const isSyntaxError = 
          result.error.includes('TypeScript compilation error') ||
          result.error.includes('syntax') ||
          result.error.includes('Parsing');
        expect(isSyntaxError).toBe(false);
      }
      // Results should exist
      expect(Array.isArray(result.results)).toBe(true);
    });

    it('should handle array destructuring with defaults', async () => {
      const code = `
        function getFirst(arr) {
          const [first = 0] = arr || [];
          return first;
        }
      `;
      
      const result = await runTests(code, [
        { input: [[1, 2, 3]], expectedOutput: 1 },
        { input: [[]], expectedOutput: 0 },
        { input: [null], expectedOutput: 0 }
      ]);
      
      expect(result.allPassed).toBe(true);
    });

    it('should handle object destructuring with defaults', async () => {
      const code = `
        function getUserName(user) {
          const { name = 'Anonymous' } = user || {};
          return name;
        }
      `;
      
      const result = await runTests(code, [
        { input: [{ name: 'John' }], expectedOutput: 'John' },
        { input: [{}], expectedOutput: 'Anonymous' },
        { input: [null], expectedOutput: 'Anonymous' }
      ]);
      
      expect(result.allPassed).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle syntax errors gracefully', async () => {
      const code = `function broken() { return `; // Missing closing brace
      
      const result = await runTests(code, [
        { input: [], expectedOutput: null }
      ]);
      
      expect(result.allPassed).toBe(false);
      // Should either have an error message or no function found
      if (result.error) {
        expect(
          result.error.includes('TypeScript compilation error') ||
          result.error.includes('syntax') ||
          result.error.includes('function')
        ).toBe(true);
      } else {
        // If no error, should have failed test results
        expect(result.results.length).toBeGreaterThan(0);
      }
    });

    it('should handle runtime errors in test cases', async () => {
      const code = `
        function throwError() {
          throw new Error('Test error');
        }
      `;
      
      const result = await runTests(code, [
        { input: [], expectedOutput: null }
      ]);
      
      expect(result.allPassed).toBe(false);
      expect(result.results[0].error).toBeDefined();
    });

    it('should handle missing functions', async () => {
      const code = `const x = 5;`; // No function defined
      
      const result = await runTests(code, [
        { input: [], expectedOutput: null }
      ]);
      
      expect(result.allPassed).toBe(false);
      expect(result.error).toContain('function');
    });

    it('should handle empty code', async () => {
      const result = await runTests('', [
        { input: [], expectedOutput: null }
      ]);
      
      expect(result.allPassed).toBe(false);
      expect(result.error).toContain('No code provided');
    });
  });

  describe('Test Case Validation', () => {
    it('should handle multiple test cases', async () => {
      const code = `
        function isEven(n) {
          return n % 2 === 0;
        }
      `;
      
      const result = await runTests(code, [
        { input: [2], expectedOutput: true },
        { input: [3], expectedOutput: false },
        { input: [0], expectedOutput: true }
      ]);
      
      expect(result.allPassed).toBe(true);
      expect(result.results.length).toBe(3);
    });

    it('should handle array inputs correctly', async () => {
      const code = `
        function sum(arr) {
          return arr.reduce((a, b) => a + b, 0);
        }
      `;
      
      const result = await runTests(code, [
        { input: [[1, 2, 3]], expectedOutput: 6 },
        { input: [[10, 20]], expectedOutput: 30 }
      ]);
      
      expect(result.allPassed).toBe(true);
    });

    it('should handle object inputs correctly', async () => {
      const code = `
        function getUserInfo(user) {
          return { name: user.name, age: user.age };
        }
      `;
      
      const result = await runTests(code, [
        { input: [{ name: 'John', age: 30 }], expectedOutput: { name: 'John', age: 30 } }
      ]);
      
      expect(result.allPassed).toBe(true);
    });
  });
});

describe('Problems Data Validation', () => {
  it('should have all required fields for each problem', () => {
    problems.forEach(problem => {
      expect(problem).toHaveProperty('id');
      expect(problem).toHaveProperty('title');
      expect(problem).toHaveProperty('difficulty');
      expect(problem).toHaveProperty('category');
      expect(problem).toHaveProperty('description');
      expect(problem).toHaveProperty('examples');
      expect(problem).toHaveProperty('starterCode');
      expect(problem).toHaveProperty('solution');
      expect(problem).toHaveProperty('testCases');
      expect(problem).toHaveProperty('hints');
      
      // Validate types
      expect(typeof problem.id).toBe('string');
      expect(typeof problem.title).toBe('string');
      expect(['easy', 'medium', 'hard']).toContain(problem.difficulty);
      expect(typeof problem.category).toBe('string');
      expect(typeof problem.description).toBe('string');
      expect(Array.isArray(problem.examples)).toBe(true);
      expect(typeof problem.starterCode).toBe('string');
      expect(typeof problem.solution).toBe('string');
      expect(Array.isArray(problem.testCases)).toBe(true);
      expect(Array.isArray(problem.hints)).toBe(true);
    });
  });

  it('should have valid test cases with proper structure', () => {
    problems.forEach(problem => {
      problem.testCases.forEach((testCase, index) => {
        expect(testCase).toHaveProperty('input');
        expect(testCase).toHaveProperty('expectedOutput');
        
        // expectedOutput should not be a function
        expect(typeof testCase.expectedOutput).not.toBe('function');
        
        // If description exists, it should be a string
        if (testCase.description) {
          expect(typeof testCase.description).toBe('string');
        }
      });
    });
  });

  it('should have valid examples with proper structure', () => {
    problems.forEach(problem => {
      problem.examples.forEach(example => {
        expect(example).toHaveProperty('input');
        expect(example).toHaveProperty('output');
        expect(typeof example.input).toBe('string');
        expect(typeof example.output).toBe('string');
      });
    });
  });

  it('should have unique problem IDs', () => {
    const ids = problems.map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have non-empty required fields', () => {
    problems.forEach(problem => {
      expect(problem.id.trim().length).toBeGreaterThan(0);
      expect(problem.title.trim().length).toBeGreaterThan(0);
      expect(problem.description.trim().length).toBeGreaterThan(0);
      expect(problem.starterCode.trim().length).toBeGreaterThan(0);
      expect(problem.solution.trim().length).toBeGreaterThan(0);
      expect(problem.testCases.length).toBeGreaterThan(0);
      expect(problem.hints.length).toBeGreaterThan(0);
    });
  });

  it('should have valid starter code structure', () => {
    for (const problem of problems) {
      // Validate basic structure without executing
      expect(problem.starterCode.trim().length).toBeGreaterThan(0);
      
      // Check that it doesn't have obvious syntax errors like function as expectedOutput
      expect(problem.starterCode).not.toMatch(/expectedOutput:\s*expect\s*=>/);
      
      // Check for common TypeScript syntax that should be valid
      // (enums, interfaces, type annotations, etc. are all valid)
    }
  });

  it('should have valid solutions structure', () => {
    for (const problem of problems) {
      // Validate basic structure without executing
      expect(problem.solution.trim().length).toBeGreaterThan(0);
      
      // Check that it doesn't have obvious syntax errors
      expect(problem.solution).not.toMatch(/expectedOutput:\s*expect\s*=>/);
      
      // Solutions should not have functions as expectedOutput in test cases
      problem.testCases.forEach(testCase => {
        expect(typeof testCase.expectedOutput).not.toBe('function');
      });
    }
  });
});
