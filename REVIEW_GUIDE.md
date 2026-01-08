# Problem Review Guide

This guide helps agents review their assigned problems systematically.

## Quick Start

1. **Read your assignment** in `AGENT_TASKS.md`
2. **Use the test script** to verify problems work:
   ```bash
   # Test all your assigned problems
   npx tsx scripts/test-problems.ts [agent-number]
   
   # Test a specific problem
   npx tsx scripts/test-problems.ts [agent-number] [problem-id]
   
   # Test all problems
   npx tsx scripts/test-problems.ts all
   ```
3. **Fill out your review** in `AGENT[1-4]_REVIEW.md`
4. **Research online** for best practices related to each problem

## Review Process

### Step 1: Runtime Error Detection

For each problem:

1. **Extract the solution code** from `lib/problems.ts`
2. **Run the test script** to verify it executes without errors
3. **Check for potential runtime issues:**
   - Null/undefined access
   - Type mismatches
   - Array out of bounds
   - Promise rejection handling
   - Async/await errors
   - Edge cases (empty arrays, null values, etc.)

### Step 2: Code Review

1. **Read the problem description** carefully
2. **Review the solution code** for:
   - Correctness
   - Code quality
   - Best practices
   - Readability
   - Performance considerations
3. **Compare with starter code** to ensure solution is appropriate

### Step 3: Logic Verification

1. **Verify test cases** cover the problem adequately
2. **Check expected outputs** match problem requirements
3. **Test edge cases** not covered by existing tests
4. **Verify the logic** is sound and handles all scenarios

### Step 4: Research & Best Practices

1. **Research online** for:
   - JavaScript/TypeScript best practices
   - Common patterns for the problem type
   - Performance optimizations
   - Alternative solutions
2. **Verify** the solution uses appropriate patterns
3. **Check** if there are better approaches

### Step 5: Documentation

1. **Document all findings** in your review file
2. **Note any issues** found (even if minor)
3. **Suggest improvements** where applicable
4. **Provide specific recommendations** for fixes

## Testing Solutions Manually

If you want to test a solution manually:

```typescript
import { getProblemById } from './lib/problems';
import { runTests } from './lib/test-runner';

const problem = getProblemById('problem-id');
const result = await runTests(problem.solution, problem.testCases);
console.log(result);
```

## Common Issues to Look For

### Runtime Errors
- **Type errors**: TypeScript compilation errors
- **Reference errors**: Undefined variables or functions
- **Null/undefined access**: Accessing properties on null/undefined
- **Promise rejections**: Unhandled promise rejections
- **Async errors**: Errors in async functions not caught

### Logic Issues
- **Incorrect algorithms**: Solutions that don't solve the problem
- **Edge cases**: Missing handling for edge cases
- **Test coverage**: Test cases that don't adequately test the solution
- **Output mismatch**: Expected outputs that don't match requirements

### Code Quality
- **Best practices**: Solutions that don't follow best practices
- **Performance**: Inefficient solutions
- **Readability**: Code that's hard to understand
- **Maintainability**: Code that's hard to maintain

## Research Resources

- **MDN Web Docs**: https://developer.mozilla.org/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **JavaScript.info**: https://javascript.info/
- **Stack Overflow**: For specific questions
- **GitHub**: For examples and patterns

## Review Template

For each problem, use this structure:

```markdown
### Problem: [ID] - [Title]

**Status:** ✅ Pass / ⚠️ Issues Found / ❌ Errors

**Runtime Errors:**
- None / [List errors]

**Code Review:**
- [Your review findings]

**Logic Verification:**
- [Logic issues or confirmations]

**Research Findings:**
- [Best practices found]
- [Alternative solutions]
- [Performance considerations]

**Recommendations:**
- [Suggested fixes]
- [Improvements]
```

## Notes

- Be thorough but efficient
- Document everything, even if no issues are found
- Use the test script to verify your findings
- Research online to ensure solutions follow best practices
- If you find duplicate problem IDs, note this as an issue
- Focus on correctness, runtime safety, and best practices
