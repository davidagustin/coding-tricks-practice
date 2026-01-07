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
  try {
    // Create a safe execution context
    const safeEval = new Function(
      'console',
      `
      ${userCode}
      
      // Try to find the main function
      const functions = {};
      ${extractFunctionNames(userCode).map(name => 
        `try { functions['${name}'] = ${name}; } catch(e) {}`
      ).join('\n')}
      
      return functions;
      `
    );

    const consoleOutput: string[] = [];
    const mockConsole = {
      log: (...args: any[]) => {
        consoleOutput.push(args.map(a => 
          typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
        ).join(' '));
      },
      error: (...args: any[]) => {
        consoleOutput.push('ERROR: ' + args.map(String).join(' '));
      }
    };

    const functions = safeEval(mockConsole);
    
    // Find the function to test (usually the first exported function or main function)
    const functionName = solutionFunctionName || 
      Object.keys(functions)[0] || 
      extractFunctionNames(userCode)[0];

    if (!functionName || !functions[functionName]) {
      return {
        allPassed: false,
        results: [],
        error: `Could not find function to test. Make sure your function is defined and named correctly.`
      };
    }

    const userFunction = functions[functionName];
    const results: TestResult[] = [];

    for (const testCase of testCases) {
      try {
        let actualOutput: any;
        
        // Handle different input types
        if (Array.isArray(testCase.input)) {
          const result = userFunction(...testCase.input);
          // Handle promises
          if (result instanceof Promise) {
            actualOutput = await result;
          } else {
            actualOutput = result;
          }
        } else {
          const result = userFunction(testCase.input);
          // Handle promises
          if (result instanceof Promise) {
            actualOutput = await result;
          } else {
            actualOutput = result;
          }
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
        results.push({
          passed: false,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: undefined,
          error: error.message || String(error),
          description: testCase.description
        });
      }
    }

    return {
      allPassed: results.every(r => r.passed),
      results,
      error: consoleOutput.length > 0 ? consoleOutput.join('\n') : undefined
    };
  } catch (error: any) {
    return {
      allPassed: false,
      results: [],
      error: error.message || String(error) || 'Unknown error occurred'
    };
  }
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
