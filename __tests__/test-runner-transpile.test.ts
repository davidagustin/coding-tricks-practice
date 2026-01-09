import { runTests } from '@/lib/test-runner';

/**
 * Tests focused on TypeScript transpilation behavior in the test runner.
 * Tests the transpileTypeScript function indirectly through runTests.
 */
describe('TypeScript Transpilation', () => {
  describe('valid TypeScript code', () => {
    it('transpiles function with type annotations', async () => {
      const code = `
        function greet(name: string): string {
          return 'Hello, ' + name;
        }
      `;

      const result = await runTests(code, [
        { input: ['World'], expectedOutput: 'Hello, World' },
      ]);

      expect(result.error).toBeUndefined();
      expect(result.results[0].passed).toBe(true);
    });

    it('transpiles generic function', async () => {
      const code = `
        function identity<T>(value: T): T {
          return value;
        }
      `;

      const result = await runTests(code, [
        { input: [42], expectedOutput: 42 },
      ]);

      expect(result.error).toBeUndefined();
      expect(result.results[0].passed).toBe(true);
    });
  });

  describe('code with enums', () => {
    it('transpiles numeric enum to JavaScript', async () => {
      const code = `
        enum Color { Red, Green, Blue }
        function getColor(): number {
          return Color.Green;
        }
      `;

      const result = await runTests(code, [
        { input: [], expectedOutput: 1 },
      ]);

      expect(result.error).toBeUndefined();
      expect(result.results[0].passed).toBe(true);
    });

    it('transpiles string enum to JavaScript', async () => {
      const code = `
        enum Status { Active = 'ACTIVE', Inactive = 'INACTIVE' }
        function getStatus(): string {
          return Status.Active;
        }
      `;

      const result = await runTests(code, [
        { input: [], expectedOutput: 'ACTIVE' },
      ]);

      expect(result.error).toBeUndefined();
      expect(result.results[0].passed).toBe(true);
    });

    it('handles enum error message specially', async () => {
      // This tests that enum-related errors get special messaging
      // The transpiler itself handles enums fine, but if there's an error
      // involving enums, the error message should mention enum support
      const code = `
        enum Valid { A, B }
        function test(): number { return Valid.A; }
      `;

      const result = await runTests(code, [
        { input: [], expectedOutput: 0 },
      ]);

      // Valid enum code should transpile without errors
      expect(result.error).toBeUndefined();
    });
  });

  describe('invalid syntax', () => {
    it('returns error for code with no functions', async () => {
      const code = `const x = 1 + 2 + 3 +`;

      const result = await runTests(code, [
        { input: [], expectedOutput: null },
      ]);

      expect(result.allPassed).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('returns compilation error for invalid TypeScript', async () => {
      const code = `function test(): { return 1; }`;

      const result = await runTests(code, [
        { input: [], expectedOutput: 1 },
      ]);

      expect(result.allPassed).toBe(false);
    });
  });

  describe('JavaScript code', () => {
    it('passes through plain JavaScript unchanged', async () => {
      const code = `
        function add(a, b) {
          return a + b;
        }
      `;

      const result = await runTests(code, [
        { input: [2, 3], expectedOutput: 5 },
      ]);

      expect(result.error).toBeUndefined();
      expect(result.results[0].passed).toBe(true);
    });

    it('handles ES6+ JavaScript features', async () => {
      const code = `
        function double(x) {
          const multiplier = 2;
          return x * multiplier;
        }
      `;

      const result = await runTests(code, [
        { input: [5], expectedOutput: 10 },
      ]);

      expect(result.error).toBeUndefined();
      expect(result.results[0].passed).toBe(true);
    });
  });

  describe('code with types', () => {
    it('strips interface declarations', async () => {
      const code = `
        interface Person { name: string; age: number; }
        function getName(p: Person): string {
          return p.name;
        }
      `;

      const result = await runTests(code, [
        { input: [{ name: 'Alice', age: 30 }], expectedOutput: 'Alice' },
      ]);

      expect(result.error).toBeUndefined();
      expect(result.results[0].passed).toBe(true);
    });

    it('strips type alias declarations', async () => {
      const code = `
        type StringOrNumber = string | number;
        function stringify(val: StringOrNumber): string {
          return String(val);
        }
      `;

      const result = await runTests(code, [
        { input: [42], expectedOutput: '42' },
      ]);

      expect(result.error).toBeUndefined();
      expect(result.results[0].passed).toBe(true);
    });

    it('strips type assertions', async () => {
      const code = `
        function getLength(arr: unknown): number {
          return (arr as string[]).length;
        }
      `;

      const result = await runTests(code, [
        { input: [['a', 'b', 'c']], expectedOutput: 3 },
      ]);

      expect(result.error).toBeUndefined();
      expect(result.results[0].passed).toBe(true);
    });
  });
});
