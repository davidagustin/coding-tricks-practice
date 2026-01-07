export interface TestResult {
  passed: boolean;
  input: any;
  expectedOutput: any;
  actualOutput: any;
  error?: string;
  description?: string;
}

export interface TestRunnerResult {
  allPassed: boolean;
  results: TestResult[];
  error?: string;
}

export async function runTests(
  userCode: string,
  testCases: Array<{
    input: any;
    expectedOutput: any;
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
          error: 'No code provided. Please write your solution first.'
        });
        return;
      }

    const consoleOutput: string[] = [];
    const mockConsole = {
      log: (...args: any[]) => {
        consoleOutput.push(args.map(a => 
          typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
        ).join(' '));
      },
      error: (...args: any[]) => {
        consoleOutput.push('ERROR: ' + args.map(String).join(' '));
      },
      warn: (...args: any[]) => {
        consoleOutput.push('WARN: ' + args.map(String).join(' '));
      }
    };

    // Create a safe execution context
    let functions: Record<string, any> = {};
    try {
      const functionNames = extractFunctionNames(userCode);
      if (functionNames.length === 0) {
        resolve({
          allPassed: false,
          results: [],
          error: 'No functions found in your code. Please define at least one function.'
        });
        return;
      }

      const safeEval = new Function(
        'console',
        `
        try {
          ${userCode}
        } catch (e) {
          throw new Error('Code execution failed: ' + (e.message || String(e)));
        }
        
        // Try to find the main function
        const functions = {};
        ${functionNames.map(name => 
          `try { 
            if (typeof ${name} !== 'undefined') {
              functions['${name}'] = ${name};
            } else {
              functions['${name}'] = null;
            }
          } catch(e) { 
            functions['${name}'] = null; 
          }`
        ).join('\n')}
        
        return functions;
        `
      );

      functions = safeEval(mockConsole);
    } catch (evalError: any) {
      const errorMsg = evalError?.message || evalError?.toString() || String(evalError) || 'Unknown syntax error';
      resolve({
        allPassed: false,
        results: [],
        error: `Code execution error: ${errorMsg}. Please check your syntax.`
      });
      return;
    }
    
    // Find the function to test (usually the first exported function or main function)
    const functionNames = extractFunctionNames(userCode);
    const availableFunctions = Object.keys(functions).filter(name => 
      functions[name] !== null && typeof functions[name] === 'function'
    );

    const functionName = solutionFunctionName || 
      availableFunctions[0] || 
      functionNames[0];

    if (!functionName) {
      resolve({
        allPassed: false,
        results: [],
        error: `Could not find any function in your code. Make sure you define a function (e.g., function myFunction() {...} or const myFunction = () => {...}).`
      });
      return;
    }

    if (!functions[functionName] || typeof functions[functionName] !== 'function') {
      resolve({
        allPassed: false,
        results: [],
        error: `Function "${functionName}" was found but is not callable. Make sure it's properly defined.`
      });
      return;
    }

    const userFunction = functions[functionName];
    const results: TestResult[] = [];

    for (const testCase of testCases) {
      try {
        let actualOutput: any;
        
        // Handle different input types
        try {
          if (Array.isArray(testCase.input)) {
            const result = userFunction(...testCase.input);
            // Handle promises
            if (result instanceof Promise) {
              actualOutput = await Promise.resolve(result).catch(err => {
                throw new Error(`Promise rejected: ${err?.message || String(err)}`);
              });
            } else {
              actualOutput = result;
            }
          } else {
            const result = userFunction(testCase.input);
            // Handle promises
            if (result instanceof Promise) {
              actualOutput = await Promise.resolve(result).catch(err => {
                throw new Error(`Promise rejected: ${err?.message || String(err)}`);
              });
            } else {
              actualOutput = result;
            }
          }
        } catch (execError: any) {
          throw new Error(`Function execution error: ${execError?.message || String(execError) || 'Unknown execution error'}`);
        }

        // Deep equality check
        const passed = deepEqual(actualOutput, testCase.expectedOutput);
        
        results.push({
          passed,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput,
          description: testCase.description
        });
      } catch (error: any) {
        const errorMessage = error?.message || error?.toString() || String(error) || 'Unknown error';
        results.push({
          passed: false,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: undefined,
          error: errorMessage,
          description: testCase.description
        });
      }
    }

      resolve({
        allPassed: results.every(r => r.passed),
        results,
        error: consoleOutput.length > 0 ? consoleOutput.join('\n') : undefined
      });
    } catch (error: any) {
      const errorMessage = error?.message || error?.toString() || String(error) || 'Unknown error occurred';
      resolve({
        allPassed: false,
        results: [],
        error: `Test runner error: ${errorMessage}. Please check your code and try again.`
      });
    }
  });
}

function extractFunctionNames(code: string): string[] {
  const functionRegex = /(?:function\s+(\w+)|const\s+(\w+)\s*=\s*(?:async\s+)?(?:\([^)]*\)\s*=>|function)|(\w+)\s*:\s*(?:\([^)]*\)\s*=>|function))/g;
  const names: string[] = [];
  let match;
  
  while ((match = functionRegex.exec(code)) !== null) {
    const name = match[1] || match[2] || match[3];
    if (name) names.push(name);
  }
  
  return names;
}

function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  
  if (a == null || b == null) return false;
  
  if (typeof a !== typeof b) return false;
  
  if (typeof a !== 'object') {
    // Handle NaN
    if (Number.isNaN(a) && Number.isNaN(b)) return true;
    return a === b;
  }
  
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  
  if (keysA.length !== keysB.length) return false;
  
  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }
  
  return true;
}
