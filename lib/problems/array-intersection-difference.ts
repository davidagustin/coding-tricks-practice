export interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  starterCode: string;
  solution: string;
  testCases: Array<{
    input: unknown;
    expectedOutput: unknown;
    description?: string;
  }>;
  hints: string[];
}

export const problem: Problem = {
  id: 'array-intersection-difference',
  title: 'Set Operations on Arrays: Intersection and Difference',
  difficulty: 'medium',
  category: 'Array Methods',
  description: `<h2>In-Depth Explanation</h2>

<p>Set operations are fundamental operations for comparing and combining collections of data. While JavaScript Sets have some built-in operations, implementing these on arrays requires understanding how to combine array methods effectively.</p>

<h3>Common Set Operations:</h3>
<ul>
  <li><strong>Intersection</strong>: Elements that exist in both arrays</li>
  <li><strong>Difference</strong>: Elements in the first array that are not in the second</li>
  <li><strong>Symmetric Difference</strong>: Elements in either array but not in both</li>
  <li><strong>Union</strong>: All unique elements from both arrays combined</li>
</ul>

<h3>Key Techniques:</h3>
<ul>
  <li>Using <code>filter()</code> with <code>includes()</code> for simple cases</li>
  <li>Converting to <code>Set</code> for O(1) lookups in larger arrays</li>
  <li>Using <code>Set</code> for deduplication in union operations</li>
  <li>Combining multiple operations for complex comparisons</li>
</ul>

<h2>Importance</h2>

<p>Set operations are essential for data manipulation:</p>

<ul>
  <li><strong>Data Comparison</strong>: Find common or unique elements between datasets</li>
  <li><strong>Permission Systems</strong>: Calculate effective permissions from multiple roles</li>
  <li><strong>Syncing Data</strong>: Determine what needs to be added or removed</li>
  <li><strong>Filtering</strong>: Exclude or include items based on another list</li>
  <li><strong>Deduplication</strong>: Combine arrays without duplicates</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Common use cases include:</p>

<ul>
  <li><strong>Tag Comparison</strong>: Find common tags between articles</li>
  <li><strong>Feature Flags</strong>: Calculate which features a user has access to</li>
  <li><strong>Shopping Cart</strong>: Find items in wishlist but not in cart</li>
  <li><strong>Friend Suggestions</strong>: Find mutual friends (intersection)</li>
  <li><strong>Data Migration</strong>: Find records to add/remove during sync</li>
  <li><strong>Access Control</strong>: Combine permissions from multiple sources</li>
  <li><strong>Form Validation</strong>: Compare selected options against valid options</li>
</ul>

<p><strong>Challenge:</strong> Implement set operations on arrays using filter, Set, and other array methods.</p>`,
  examples: [
    {
      input: `intersection([1, 2, 3], [2, 3, 4])`,
      output: `[2, 3]`,
      explanation: 'Elements present in both arrays',
    },
    {
      input: `difference([1, 2, 3], [2, 3, 4])`,
      output: `[1]`,
      explanation: 'Elements in first array but not in second',
    },
    {
      input: `symmetricDifference([1, 2, 3], [2, 3, 4])`,
      output: `[1, 4]`,
      explanation: 'Elements in either array but not both',
    },
  ],
  starterCode: `function intersection(arr1, arr2) {
  // TODO: Return elements that exist in both arrays
  // intersection([1, 2, 3, 4], [3, 4, 5, 6]) → [3, 4]

  return [];
}

function difference(arr1, arr2) {
  // TODO: Return elements in arr1 that are not in arr2
  // difference([1, 2, 3, 4], [3, 4, 5, 6]) → [1, 2]

  return [];
}

function symmetricDifference(arr1, arr2) {
  // TODO: Return elements in either array but not in both
  // symmetricDifference([1, 2, 3], [2, 3, 4]) → [1, 4]

  return [];
}

function union(arr1, arr2) {
  // TODO: Return all unique elements from both arrays
  // union([1, 2, 3], [2, 3, 4]) → [1, 2, 3, 4]

  return [];
}

function isSubset(subset, superset) {
  // TODO: Check if all elements in subset exist in superset
  // isSubset([2, 3], [1, 2, 3, 4]) → true
  // isSubset([2, 5], [1, 2, 3, 4]) → false

  return false;
}

function intersectionMany(...arrays) {
  // TODO: Find intersection of multiple arrays
  // intersectionMany([1, 2, 3], [2, 3, 4], [2, 3, 5]) → [2, 3]

  return [];
}

// Test
console.log('Intersection:', intersection([1, 2, 3, 4], [3, 4, 5, 6]));
console.log('Difference:', difference([1, 2, 3, 4], [3, 4, 5, 6]));
console.log('Symmetric Diff:', symmetricDifference([1, 2, 3], [2, 3, 4]));
console.log('Union:', union([1, 2, 3], [3, 4, 5]));
console.log('isSubset [2,3] of [1,2,3,4]:', isSubset([2, 3], [1, 2, 3, 4]));
console.log('Intersection Many:', intersectionMany([1, 2, 3], [2, 3, 4], [2, 3, 5]));`,
  solution: `function intersection(arr1, arr2) {
  // Return elements that exist in both arrays
  // Convert arr2 to Set for O(1) lookup performance
  const set2 = new Set(arr2);
  return arr1.filter(item => set2.has(item));
}

function difference(arr1, arr2) {
  // Return elements in arr1 that are not in arr2
  const set2 = new Set(arr2);
  return arr1.filter(item => !set2.has(item));
}

function symmetricDifference(arr1, arr2) {
  // Return elements in either array but not in both
  // Union of both differences: (A - B) + (B - A)
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const diff1 = arr1.filter(item => !set2.has(item));
  const diff2 = arr2.filter(item => !set1.has(item));
  return [...diff1, ...diff2];
}

function union(arr1, arr2) {
  // Return all unique elements from both arrays
  // Spread both arrays into a Set, then spread back to array
  return [...new Set([...arr1, ...arr2])];
}

function isSubset(subset, superset) {
  // Check if all elements in subset exist in superset
  const superSet = new Set(superset);
  return subset.every(item => superSet.has(item));
}

function intersectionMany(...arrays) {
  // Find intersection of multiple arrays
  // Use reduce to apply intersection iteratively
  if (arrays.length === 0) return [];
  return arrays.reduce((result, arr) => intersection(result, arr));
}

// Test
console.log('Intersection:', intersection([1, 2, 3, 4], [3, 4, 5, 6])); // [3, 4]
console.log('Difference:', difference([1, 2, 3, 4], [3, 4, 5, 6])); // [1, 2]
console.log('Symmetric Diff:', symmetricDifference([1, 2, 3], [2, 3, 4])); // [1, 4]
console.log('Union:', union([1, 2, 3], [3, 4, 5])); // [1, 2, 3, 4, 5]
console.log('isSubset [2,3] of [1,2,3,4]:', isSubset([2, 3], [1, 2, 3, 4])); // true
console.log('Intersection Many:', intersectionMany([1, 2, 3], [2, 3, 4], [2, 3, 5])); // [2, 3]`,
  testCases: [
    {
      input: [[1, 2, 3, 4], [3, 4, 5, 6]],
      expectedOutput: [3, 4],
      description: 'intersection should return elements in both arrays',
    },
    {
      input: [[1, 2, 3, 4], [3, 4, 5, 6]],
      expectedOutput: [1, 2],
      description: 'difference should return elements in first but not second',
    },
    {
      input: [[1, 2, 3], [2, 3, 4]],
      expectedOutput: [1, 4],
      description: 'symmetricDifference should return elements in either but not both',
    },
    {
      input: [[1, 2, 3], [3, 4, 5]],
      expectedOutput: [1, 2, 3, 4, 5],
      description: 'union should return all unique elements from both arrays',
    },
    {
      input: [[2, 3], [1, 2, 3, 4]],
      expectedOutput: true,
      description: 'isSubset should return true when all elements exist in superset',
    },
  ],
  hints: [
    'Convert the second array to a Set for O(1) lookup performance with has()',
    'For difference, use filter with !set.has() to exclude matching elements',
    'Symmetric difference is the union of both differences: (A - B) + (B - A)',
    'For union, spread both arrays into a Set, then spread back to array',
    'Use every() to check if all elements in subset exist in superset',
    'For intersectionMany, use reduce to apply intersection iteratively',
  ],
};
