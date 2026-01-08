# Agent Task Assignment - Problem Review

## Overview
This document assigns 56 problems to 4 agents, with each agent responsible for reviewing 14 problems (1/4th of the total).

## Review Checklist for Each Agent

For each assigned problem, you must:

1. **Runtime Error Detection**
   - Execute the solution code and verify it runs without errors
   - Test all test cases to ensure they pass
   - Check for potential runtime errors (null/undefined access, type mismatches, etc.)
   - Verify edge cases are handled correctly

2. **Code Review**
   - Review the solution code for correctness
   - Check if the solution matches the problem description
   - Verify the solution follows best practices
   - Ensure code is readable and well-structured

3. **Logic Verification**
   - Verify the solution logic is sound and correct
   - Check if test cases adequately cover the problem
   - Verify expected outputs match the problem requirements
   - Check for logical errors or edge cases not covered

4. **Research & Best Practices**
   - Research online for best practices related to the problem
   - Verify the solution uses appropriate patterns/techniques
   - Check if there are better or more efficient solutions
   - Verify TypeScript/JavaScript features are used correctly

5. **Documentation**
   - Document any issues found
   - Suggest improvements if applicable
   - Note any runtime errors or logical issues
   - Provide recommendations for fixes

---

## Agent 1: Problems 1-14

### Assigned Problems:
1. `reduce-grouping` - Reduce for Grouping
2. `map-deduplication` - Map for Deduplication
3. `object-entries` - Object.entries Pattern
4. `promise-race-timeout` - Promise.race for Timeout
5. `promise-allsettled` - Promise.allSettled
6. `find-vs-filter` - Find vs Filter
7. `array-chaining` - Array Chaining
8. `reduce-right` - Reduce Right
9. `some-every` - Some vs Every
10. `array-from` - Array.from
11. `partition-pattern` - Partition Pattern
12. `chunk-arrays` - Chunk Arrays
13. `promise-all-vs-allsettled` - Promise.all vs allSettled
14. `async-generators` - Async Generators

### Instructions:
- Review each problem in `lib/problems.ts`
- Test solutions using the test runner in `lib/test-runner.ts`
- Document findings in `AGENT1_REVIEW.md`

---

## Agent 2: Problems 15-28

### Assigned Problems:
15. `abort-controller` - Abort Controller
16. `retry-pattern` - Retry Pattern
17. `promise-chaining` - Promise Chaining
18. `error-boundaries` - Error Boundaries
19. `promise-constructor` - Promise Constructor
20. `async-await-error` - Async/Await Error Handling
21. `promise-race-first` - Promise.race First
22. `promise-finally` - Promise.finally
23. `basic-typescript-types` - Basic TypeScript Types
24. `interfaces` - Interfaces
25. `type-aliases` - Type Aliases
26. `generics-basic` - Generics Basic
27. `union-intersection` - Union & Intersection
28. `optional-readonly` - Optional & Readonly

### Instructions:
- Review each problem in `lib/problems.ts`
- Test solutions using the test runner in `lib/test-runner.ts`
- Document findings in `AGENT2_REVIEW.md`

---

## Agent 3: Problems 29-42

### Assigned Problems:
29. `type-guards` - Type Guards
30. `enums` - Enums
31. `proxy-api` - Proxy API
32. `weakmap-weakset` - WeakMap & WeakSet
33. `symbol-usage` - Symbol Usage
34. `reflect-api` - Reflect API
35. `object-freeze-seal` - Object.freeze & Object.seal
36. `property-descriptors` - Property Descriptors
37. `computed-property-names` - Computed Property Names
38. `spread-operator-patterns` - Spread Operator Patterns
39. `spread-operator-tricks` - Spread Operator Tricks
40. `short-circuit-evaluation` - Short Circuit Evaluation
41. `tagged-template-literals` - Tagged Template Literals
42. `reduce-patterns` - Reduce Patterns

### Instructions:
- Review each problem in `lib/problems.ts`
- Test solutions using the test runner in `lib/test-runner.ts`
- Document findings in `AGENT3_REVIEW.md`

---

## Agent 4: Problems 43-56

### Assigned Problems:
43. `array-from-tricks` - Array.from Tricks
44. `sort-comparators` - Sort Comparators
45. `string-padding` - String Padding
46. `currying` - Currying
47. `memoization` - Memoization
48. `pipe-compose` - Pipe & Compose
49. `debounce-throttle` - Debounce & Throttle
50. `mapped-types` - Mapped Types
51. `conditional-types` - Conditional Types (second occurrence)
52. `infer-keyword` - Infer Keyword
53. `branded-types` - Branded Types
54. `proxy-traps` - Proxy Traps
55. `generator-functions` - Generator Functions
56. `weak-collections` - Weak Collections

### Instructions:
- Review each problem in `lib/problems.ts`
- Test solutions using the test runner in `lib/test-runner.ts`
- Document findings in `AGENT4_REVIEW.md`

---

## Review Template

For each problem, use this template:

```markdown
### Problem: [ID] - [Title]

**Status:** ✅ Pass / ⚠️ Issues Found / ❌ Errors

**Runtime Errors:**
- [List any runtime errors found]

**Code Review:**
- [Review findings]

**Logic Verification:**
- [Logic issues found]

**Research Findings:**
- [Best practices and improvements]

**Recommendations:**
- [Suggested fixes or improvements]
```

---

## How to Test Solutions

1. Extract the solution code from `lib/problems.ts`
2. Use the test runner:
   ```typescript
   import { runTests } from './lib/test-runner';
   import { getProblemById } from './lib/problems';
   
   const problem = getProblemById('problem-id');
   const result = await runTests(problem.solution, problem.testCases);
   console.log(result);
   ```
3. Verify all test cases pass
4. Check for edge cases not covered by tests

---

## Notes

- Each agent should work independently on their assigned problems
- Document all findings, even if no issues are found
- Focus on correctness, runtime safety, and best practices
- Research online for JavaScript/TypeScript best practices related to each problem
