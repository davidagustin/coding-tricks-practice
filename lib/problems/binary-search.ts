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
  id: 'binary-search',
  title: 'Binary Search Algorithm',
  difficulty: 'easy',
  category: 'Algorithms',
  description: `<h2>In-Depth Explanation</h2>

<p>Binary search is a fundamental search algorithm that finds the position of a target value within a <strong>sorted array</strong>. It works by repeatedly dividing the search interval in half, eliminating half of the remaining elements with each comparison.</p>

<p>The algorithm follows these steps:</p>
<ol>
  <li>Compare the target value to the middle element of the array</li>
  <li>If they are equal, the search is complete - return the index</li>
  <li>If the target is less than the middle element, search the left half</li>
  <li>If the target is greater than the middle element, search the right half</li>
  <li>Repeat until the element is found or the search space is exhausted</li>
</ol>

<h2>Time and Space Complexity</h2>

<ul>
  <li><strong>Time Complexity</strong>: O(log n) - Each comparison eliminates half of the remaining elements</li>
  <li><strong>Space Complexity</strong>: O(1) for iterative, O(log n) for recursive due to call stack</li>
</ul>

<h2>Importance</h2>

<p>Binary search is essential because:</p>

<ul>
  <li><strong>Efficiency</strong>: Dramatically faster than linear search for large datasets</li>
  <li><strong>Scalability</strong>: Performance advantage increases with data size (1 million elements = ~20 comparisons)</li>
  <li><strong>Foundation</strong>: Basis for many advanced algorithms and data structures</li>
  <li><strong>Interview Essential</strong>: One of the most commonly asked algorithm questions</li>
  <li><strong>Real-world Applications</strong>: Used in databases, file systems, and search engines</li>
</ul>

<h2>Practical Applications</h2>

<ul>
  <li><strong>Database Indexing</strong>: B-trees use binary search principles for fast lookups</li>
  <li><strong>Dictionary/Phonebook Lookup</strong>: Finding words or names quickly</li>
  <li><strong>Git Bisect</strong>: Finding the commit that introduced a bug</li>
  <li><strong>IP Routing Tables</strong>: Fast lookup of network routes</li>
  <li><strong>Autocomplete Features</strong>: Finding matching suggestions efficiently</li>
  <li><strong>Finding Boundaries</strong>: Lower bound, upper bound problems</li>
</ul>

<p><strong>Challenge:</strong> Implement both iterative and recursive versions of binary search.</p>`,
  examples: [
    {
      input: `binarySearch([1, 3, 5, 7, 9, 11, 13], 7)`,
      output: `3`,
      explanation: 'The value 7 is found at index 3 in the sorted array',
    },
    {
      input: `binarySearch([2, 4, 6, 8, 10], 5)`,
      output: `-1`,
      explanation: 'The value 5 is not in the array, so return -1',
    },
    {
      input: `binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1)`,
      output: `0`,
      explanation: 'The value 1 is found at the first index (0)',
    },
  ],
  starterCode: `// TODO: Implement binary search (iterative version)
// Returns the index of target in sorted array, or -1 if not found
function binarySearch(arr: number[], target: number): number {
  // Initialize left and right pointers
  // While left <= right:
  //   Calculate middle index
  //   Compare arr[mid] with target
  //   Adjust pointers based on comparison
  // Return -1 if not found

  return -1;
}

// TODO: Implement binary search (recursive version)
function binarySearchRecursive(
  arr: number[],
  target: number,
  left: number = 0,
  right: number = arr.length - 1
): number {
  // Base case: left > right means not found
  // Calculate middle index
  // Recursive cases based on comparison

  return -1;
}

// Test cases
console.log(binarySearch([1, 3, 5, 7, 9, 11, 13], 7)); // Expected: 3
console.log(binarySearch([2, 4, 6, 8, 10], 5)); // Expected: -1
console.log(binarySearchRecursive([1, 2, 3, 4, 5], 3)); // Expected: 2`,
  solution: `function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // Use Math.floor to avoid floating point issues
    // Also: mid = left + Math.floor((right - left) / 2) prevents overflow
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Found the target
    } else if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }

  return -1; // Target not found
}

function binarySearchRecursive(
  arr: number[],
  target: number,
  left: number = 0,
  right: number = arr.length - 1
): number {
  // Base case: search space exhausted
  if (left > right) {
    return -1;
  }

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
}

// Test cases
console.log(binarySearch([1, 3, 5, 7, 9, 11, 13], 7)); // 3
console.log(binarySearch([2, 4, 6, 8, 10], 5)); // -1
console.log(binarySearchRecursive([1, 2, 3, 4, 5], 3)); // 2`,
  testCases: [
    {
      input: [[1, 3, 5, 7, 9, 11, 13], 7],
      expectedOutput: 3,
      description: 'binarySearch finds 7 in middle of array',
    },
    {
      input: [[2, 4, 6, 8, 10], 5],
      expectedOutput: -1,
      description: 'binarySearch returns -1 for element not in array',
    },
    {
      input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1],
      expectedOutput: 0,
      description: 'binarySearch finds first element at index 0',
    },
    {
      input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10],
      expectedOutput: 9,
      description: 'binarySearch finds last element',
    },
    {
      input: [[], 5],
      expectedOutput: -1,
      description: 'binarySearch returns -1 for empty array',
    },
  ],
  hints: [
    'Initialize two pointers: left = 0, right = arr.length - 1',
    'Calculate middle index with Math.floor((left + right) / 2)',
    'The loop continues while left <= right (not just left < right)',
    'When arr[mid] < target, search right half with left = mid + 1',
    'When arr[mid] > target, search left half with right = mid - 1',
  ],
};
