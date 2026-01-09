import ts from 'typescript';
import { BROWSER_API_KEYWORDS, TEST_CONFIG } from './constants';
import { analyzeCodeSafety, sanitizeErrorMessage } from './utils/code-safety';
import { getErrorMessage, isError } from './utils/type-guards';

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
 * Uses TypeScript API with proper enum values
 */
function transpileTypeScript(code: string): { code: string; error?: string } {
  try {
    const result = ts.transpile(code, {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.React,
      esModuleInterop: true,
      skipLibCheck: true,
      strict: false,
      allowJs: true,
      preserveConstEnums: false,
    });

    return { code: result };
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);

    // Check if it's an enum-specific error
    if (errorMessage.includes('enum') || code.includes('enum ')) {
      return {
        code: '',
        error: `TypeScript compilation error: ${errorMessage}. Note: Enums are supported and will be transpiled to JavaScript objects.`,
      };
    }

    return {
      code: '',
      error: `TypeScript compilation error: ${sanitizeErrorMessage(errorMessage)}`,
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
    // Add timeout protection
    const timeoutId = setTimeout(() => {
      resolve({
        allPassed: false,
        results: [],
        error: `Test execution timed out after ${TEST_CONFIG.EXECUTION_TIMEOUT / 1000} seconds. Your code may have an infinite loop or be too slow.`,
      });
    }, TEST_CONFIG.EXECUTION_TIMEOUT);

    try {
      if (!userCode || !userCode.trim()) {
        clearTimeout(timeoutId);
        resolve({
          allPassed: false,
          results: [],
          error: 'No code provided. Please write your solution first.',
        });
        return;
      }

      // Check code size limit
      if (userCode.length > TEST_CONFIG.MAX_CODE_SIZE) {
        clearTimeout(timeoutId);
        resolve({
          allPassed: false,
          results: [],
          error: `Code is too large (${userCode.length} bytes). Maximum allowed is ${TEST_CONFIG.MAX_CODE_SIZE} bytes.`,
        });
        return;
      }

      // Analyze code for safety issues
      const safetyAnalysis = analyzeCodeSafety(userCode);
      if (!safetyAnalysis.safe) {
        clearTimeout(timeoutId);
        resolve({
          allPassed: false,
          results: [],
          error: `Code safety check failed:\n${safetyAnalysis.issues.join('\n')}`,
        });
        return;
      }

      // Show warnings if any (but don't block execution)
      const warnings =
        safetyAnalysis.warnings.length > 0
          ? `\n⚠️ Warnings: ${safetyAnalysis.warnings.join(', ')}`
          : '';

      const consoleOutput: string[] = [];
      if (warnings) {
        consoleOutput.push(warnings);
      }
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
        clearTimeout(timeoutId);
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

          // If test case has a description, try to find a function name within it
          if (testCase.description) {
            // Check if any available function name appears at the start of the description
            // e.g., "isValidJson returns true..." should match "isValidJson"
            const matchingFunction = availableFunctions.find((fn) =>
              testCase.description?.toLowerCase().startsWith(fn.toLowerCase())
            );
            if (matchingFunction) {
              functionName = matchingFunction;
            }
          }

          if (!functionName) {
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

      clearTimeout(timeoutId);
      resolve({
        allPassed: results.every((r) => r.passed),
        results,
        error: consoleOutput.length > 0 ? consoleOutput.join('\n') : undefined,
      });
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      const errorMessage = getErrorMessage(error);
      resolve({
        allPassed: false,
        results: [],
        error: `Test runner error: ${sanitizeErrorMessage(errorMessage)}. Please check your code and try again.`,
      });
    }
  });
}

export function extractFunctionNames(code: string): string[] {
  // Match: function name, async function name, async function* name, const name = function, const name = async function, const name = () =>, const name = async () =>
  const functionRegex =
    /(?:async\s+)?function\s*\*?\s*(\w+)|const\s+(\w+)\s*=\s*(?:async\s+)?(?:\([^)]*\)\s*=>|function\s*\*?)|(\w+)\s*:\s*(?:\([^)]*\)\s*=>|function)/g;
  const names: string[] = [];
  let match: RegExpExecArray | null;

  // biome-ignore lint/suspicious/noAssignInExpressions: needed for regex.exec in while loop
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
