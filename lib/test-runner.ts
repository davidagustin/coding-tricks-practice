import ts from 'typescript';

export interface TestResult {
  passed: boolean;
  input: unknown;
  expectedOutput: unknown;
  actualOutput: unknown;
  error?: string;
  description?: string;
}

export interface TestRunnerResult {
  allPassed: boolean;
  results: TestResult[];
  error?: string;
}

/**
 * Transpile TypeScript code to JavaScript
 * Uses numeric enum values to avoid isolatedModules issues
 */
function transpileTypeScript(code: string): { code: string; error?: string } {
  try {
    // Use numeric values for enums to avoid isolatedModules issues
    // ScriptTarget.ES2020 = 5, ModuleKind.ESNext = 99, JsxEmit.React = 2
    const result = ts.transpile(code, {
      target: 5, // ES2020
      module: 99, // ESNext
      jsx: 2, // React
      esModuleInterop: true,
      skipLibCheck: true,
      strict: false,
      allowJs: true,
      // Don't preserve const enums - convert them to regular enums that transpile to JS
      preserveConstEnums: false,
    } as ts.CompilerOptions);

    return { code: result };
  } catch (error: unknown) {
    // If transpilation fails, try to provide a more helpful error
    const errorMessage =
      error instanceof Error ? error.message : String(error) || 'Unknown TypeScript error';

    // Check if it's an enum-specific error
    if (errorMessage.includes('enum') || code.includes('enum ')) {
      return {
        code: '',
        error: `TypeScript compilation error: ${errorMessage}. Note: Enums are supported and will be transpiled to JavaScript objects.`,
      };
    }

    return {
      code: '',
      error: `TypeScript compilation error: ${errorMessage}`,
    };
  }
}

export async function runTests(
  userCode: string,
  testCases: Array<{
    input: unknown;
    expectedOutput: unknown;
    description?: string;
  }>,
  solutionFunctionName?: string
): Promise<TestRunnerResult> {
  // Wrap everything in a promise to catch all errors
  return new Promise(async (resolve) => {
    try {
      if (!userCode || !userCode.trim()) {
        resolve({
          allPassed: false,
          results: [],
          error: 'No code provided. Please write your solution first.',
        });
        return;
      }

      const consoleOutput: string[] = [];
      const mockConsole = {
        log: (...args: unknown[]) => {
          consoleOutput.push(
            args
              .map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)))
              .join(' ')
          );
        },
        error: (...args: unknown[]) => {
          consoleOutput.push(`ERROR: ${args.map(String).join(' ')}`);
        },
        warn: (...args: unknown[]) => {
          consoleOutput.push(`WARN: ${args.map(String).join(' ')}`);
        },
      };

      // Transpile TypeScript to JavaScript if needed
      const transpiled = transpileTypeScript(userCode);
      if (transpiled.error) {
        resolve({
          allPassed: false,
          results: [],
          error: transpiled.error,
        });
        return;
      }

      const executableCode = transpiled.code;

      // Create a safe execution context
      let functions: Record<string, unknown> = {};
      try {
        const functionNames = extractFunctionNames(executableCode);
        if (functionNames.length === 0) {
          resolve({
            allPassed: false,
            results: [],
            error: 'No functions found in your code. Please define at least one function.',
          });
          return;
        }

        try {
          const safeEval = new Function(
            'console',
            `
          try {
            ${executableCode}
          } catch (e) {
            // Don't throw during code definition - let it fail during execution
            // This allows code with browser APIs to be defined (but not executed)
          }
          
          // Try to find the main function
          const functions = {};
          ${functionNames
            .map(
              (name) =>
                `try { 
              if (typeof ${name} !== 'undefined') {
                functions['${name}'] = ${name};
              } else {
                functions['${name}'] = null;
              }
            } catch(e) { 
              functions['${name}'] = null; 
            }`
            )
            .join('\n')}
          
          return functions;
          `
          );

          functions = safeEval(mockConsole);
        } catch (evalError: unknown) {
          // If code definition fails (e.g., ReferenceError for fetch),
          // check if it's a browser API issue
          const errorMessage = evalError instanceof Error ? evalError.message : String(evalError);
          if (
            errorMessage.includes('fetch') ||
            errorMessage.includes('window') ||
            errorMessage.includes('document') ||
            errorMessage.includes('AbortController')
          ) {
            // Browser API not available - this is expected in test environment
            // Return empty functions object
            functions = {};
          } else {
            // Re-throw other errors
            throw evalError;
          }
        }
      } catch (evalError: unknown) {
        const errorMsg =
          evalError instanceof Error
            ? evalError.message
            : typeof evalError === 'string'
              ? evalError
              : String(evalError) || 'Unknown syntax error';
        resolve({
          allPassed: false,
          results: [],
          error: `Code execution error: ${errorMsg}. Please check your syntax.`,
        });
        return;
      }

      // Find the function to test (usually the first exported function or main function)
      const functionNames = extractFunctionNames(executableCode);
      const availableFunctions = Object.keys(functions).filter(
        (name) => functions[name] !== null && typeof functions[name] === 'function'
      );

      const results: TestResult[] = [];

      for (const testCase of testCases) {
        try {
          // Try to find the function based on test case description, or use default
          let functionName = solutionFunctionName;

          // If test case has a description that matches a function name, use it
          if (testCase.description && availableFunctions.includes(testCase.description)) {
            functionName = testCase.description;
          } else if (!functionName) {
            // Fall back to first available function
            functionName = availableFunctions[0] || functionNames[0];
          }

          if (!functionName) {
            throw new Error(
              `Could not find any function in your code. Make sure you define a function (e.g., function myFunction() {...} or const myFunction = () => {...}).`
            );
          }

          const functionValue = functions[functionName];
          if (!functionValue || typeof functionValue !== 'function') {
            throw new Error(
              `Function "${functionName}" was found but is not callable. Make sure it's properly defined.`
            );
          }

          const userFunction = functionValue as (...args: unknown[]) => unknown;
          let actualOutput: unknown;

          // Handle different input types
          try {
            if (Array.isArray(testCase.input)) {
              const result = userFunction(...testCase.input);
              // Handle promises
              if (result instanceof Promise) {
                actualOutput = await Promise.resolve(result).catch((err) => {
                  throw new Error(`Promise rejected: ${err?.message || String(err)}`);
                });
              } else {
                actualOutput = result;
              }
            } else {
              const result = userFunction(testCase.input);
              // Handle promises
              if (result instanceof Promise) {
                actualOutput = await Promise.resolve(result).catch((err) => {
                  throw new Error(`Promise rejected: ${err?.message || String(err)}`);
                });
              } else {
                actualOutput = result;
              }
            }
          } catch (execError: unknown) {
            const errorMsg =
              execError instanceof Error
                ? execError.message
                : String(execError) || 'Unknown execution error';
            throw new Error(`Function execution error: ${errorMsg}`);
          }

          // Deep equality check
          const passed = deepEqual(actualOutput, testCase.expectedOutput);

          results.push({
            passed,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput,
            description: testCase.description,
          });
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : typeof error === 'string'
                ? error
                : String(error) || 'Unknown error';
          results.push({
            passed: false,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput: undefined,
            error: errorMessage,
            description: testCase.description,
          });
        }
      }

      resolve({
        allPassed: results.every((r) => r.passed),
        results,
        error: consoleOutput.length > 0 ? consoleOutput.join('\n') : undefined,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : String(error) || 'Unknown error occurred';
      resolve({
        allPassed: false,
        results: [],
        error: `Test runner error: ${errorMessage}. Please check your code and try again.`,
      });
    }
  });
}

function extractFunctionNames(code: string): string[] {
  // Match: function name, async function name, async function* name, const name = function, const name = async function, const name = () =>, const name = async () =>
  const functionRegex =
    /(?:async\s+)?function\s*\*?\s*(\w+)|const\s+(\w+)\s*=\s*(?:async\s+)?(?:\([^)]*\)\s*=>|function\s*\*?)|(\w+)\s*:\s*(?:\([^)]*\)\s*=>|function)/g;
  const names: string[] = [];
  let match;

  while ((match = functionRegex.exec(code)) !== null) {
    const name = match[1] || match[2] || match[3];
    if (name) names.push(name);
  }

  return names;
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (typeof a !== typeof b) return false;

  if (typeof a !== 'object') {
    // Handle NaN
    if (Number.isNaN(a) && Number.isNaN(b)) return true;
    return a === b;
  }

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  const keysA = Object.keys(a as Record<string, unknown>);
  const keysB = Object.keys(b as Record<string, unknown>);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    if (!deepEqual(aObj[key], bObj[key])) return false;
  }

  return true;
}
