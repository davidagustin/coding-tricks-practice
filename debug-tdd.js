function extractFunctionNames(code) {
  const functionRegex =
    /(?:async\s+)?function\s*\*?\s*(\w+)|const\s+(\w+)\s*=\s*(?:async\s+)?(?:\([^)]*\)\s*=>|function\s*\*?)|(\w+)\s*:\s*(?:\([^)]*\)\s*=>|function)/g;
  const names = [];
  let match;
  while ((match = functionRegex.exec(code)) !== null) {
    const name = match[1] || match[2] || match[3];
    if (name) names.push(name);
  }
  return names;
}

const problem = require('./lib/problems/test-driven-development.ts').problem;
const code = problem.solution;
const functionNames = extractFunctionNames(code);

console.log('Extracted function names:', functionNames);

// Simulate what the test runner does
const mockConsole = { log: () => {}, error: () => {}, warn: () => {} };

try {
  const safeEval = new Function(
    'console',
    `
    try {
      ${code}
    } catch (e) {}

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

  const functions = safeEval(mockConsole);

  console.log('\nFunctions object keys:', Object.keys(functions));

  const availableFunctions = Object.keys(functions).filter(
    (name) => functions[name] !== null && typeof functions[name] === 'function'
  );

  console.log('\nAvailable functions (actually callable):', availableFunctions);

  // Check which function would be matched for description "testToBeTruthy returns true for truthy value"
  const testDescription = 'testToBeTruthy returns true for truthy value';
  const matchingFunction = availableFunctions.find((fn) =>
    testDescription.toLowerCase().startsWith(fn.toLowerCase())
  );

  console.log('\nFor description "' + testDescription + '":');
  console.log('  Matching function:', matchingFunction);

  if (matchingFunction && functions[matchingFunction]) {
    console.log('  Function exists:', typeof functions[matchingFunction]);
    try {
      const result = functions[matchingFunction](1);
      console.log('  Result of calling with (1):', result);
    } catch (e) {
      console.log('  Error calling function:', e.message);
    }
  }

} catch (e) {
  console.log('Error:', e.message);
}
