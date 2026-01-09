import { extractFunctionNames, runTests } from '@/lib/test-runner';

describe('extractFunctionNames', () => {
  it('should extract standard function declaration', () => {
    const code = 'function myFunc() {}';
    expect(extractFunctionNames(code)).toContain('myFunc');
  });

  it('should extract async function declaration', () => {
    const code = 'async function fetchData() {}';
    expect(extractFunctionNames(code)).toContain('fetchData');
  });

  it('should extract arrow function', () => {
    const code = 'const add = () => {}';
    expect(extractFunctionNames(code)).toContain('add');
  });

  it('should extract function expression', () => {
    const code = 'const multiply = function() {}';
    expect(extractFunctionNames(code)).toContain('multiply');
  });

  it('should extract async arrow function', () => {
    const code = 'const getData = async () => {}';
    expect(extractFunctionNames(code)).toContain('getData');
  });

  it('should return empty array for code with no functions', async () => {
    const code = 'const x = 5;';
    expect(extractFunctionNames(code)).toEqual([]);

    const result = await runTests(code, [{ input: [], expectedOutput: null }]);
    expect(result.allPassed).toBe(false);
    expect(result.error).toContain('function');
  });
});
