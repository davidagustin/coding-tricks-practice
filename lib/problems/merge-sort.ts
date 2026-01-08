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
  id: 'merge-sort',
  title: 'Merge Sort Algorithm',
  difficulty: 'medium',
  category: 'Algorithms',
  description: `<h2>In-Depth Explanation</h2>

<p>Merge sort is a classic <strong>divide-and-conquer</strong> sorting algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves back together.</p>

<p>The algorithm works in two main phases:</p>

<h3>1. Divide Phase</h3>
<ol>
  <li>Find the middle point of the array</li>
  <li>Divide the array into two halves</li>
  <li>Recursively sort each half</li>
</ol>

<h3>2. Merge Phase (Conquer)</h3>
<ol>
  <li>Create a temporary array to hold merged results</li>
  <li>Compare elements from both halves</li>
  <li>Place the smaller element in the result array</li>
  <li>Repeat until all elements are merged</li>
</ol>

<h2>Time and Space Complexity</h2>

<ul>
  <li><strong>Time Complexity</strong>: O(n log n) - Guaranteed in all cases (best, average, worst)</li>
  <li><strong>Space Complexity</strong>: O(n) - Requires additional space for merging</li>
  <li><strong>Stable</strong>: Yes - Maintains relative order of equal elements</li>
</ul>

<h2>Importance</h2>

<p>Merge sort is crucial because:</p>

<ul>
  <li><strong>Guaranteed Performance</strong>: O(n log n) in ALL cases, unlike quicksort</li>
  <li><strong>Stable Sorting</strong>: Preserves order of equal elements (important for multi-key sorting)</li>
  <li><strong>External Sorting</strong>: Ideal for sorting data that doesn't fit in memory</li>
  <li><strong>Parallelization</strong>: Naturally parallelizable - each half can be sorted independently</li>
  <li><strong>Linked Lists</strong>: Efficient for sorting linked lists (O(1) space)</li>
</ul>

<h2>Practical Applications</h2>

<ul>
  <li><strong>External Sorting</strong>: Sorting files larger than available memory</li>
  <li><strong>Database Operations</strong>: Merge joins in database query processing</li>
  <li><strong>E-commerce</strong>: Sorting products with stable multi-criteria sort</li>
  <li><strong>Git</strong>: Merge operations in version control</li>
  <li><strong>Inversion Count</strong>: Counting inversions in an array (modified merge sort)</li>
  <li><strong>TimSort</strong>: Python and Java's built-in sort is based on merge sort</li>
</ul>

<p><strong>Challenge:</strong> Implement merge sort with a clean merge function.</p>`,
  examples: [
    {
      input: `mergeSort([38, 27, 43, 3, 9, 82, 10])`,
      output: `[3, 9, 10, 27, 38, 43, 82]`,
      explanation: 'Array is divided, sorted recursively, and merged back',
    },
    {
      input: `mergeSort([5, 2, 8, 1, 9])`,
      output: `[1, 2, 5, 8, 9]`,
      explanation: 'Unsorted array becomes sorted in ascending order',
    },
    {
      input: `merge([1, 3, 5], [2, 4, 6])`,
      output: `[1, 2, 3, 4, 5, 6]`,
      explanation: 'Two sorted arrays merged into one sorted array',
    },
  ],
  starterCode: `// TODO: Implement the merge function
// Takes two sorted arrays and merges them into one sorted array
function merge(left: number[], right: number[]): number[] {
  // Create result array
  // Use two pointers to track position in each array
  // Compare elements and add smaller one to result
  // Add remaining elements from either array

  return [];
}

// TODO: Implement merge sort
// Recursively divides array and merges sorted halves
function mergeSort(arr: number[]): number[] {
  // Base case: arrays of length 0 or 1 are already sorted
  // Find middle index
  // Divide into left and right halves
  // Recursively sort each half
  // Merge the sorted halves

  return arr;
}

// Test cases
console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));
// Expected: [3, 9, 10, 27, 38, 43, 82]

console.log(mergeSort([5, 2, 8, 1, 9]));
// Expected: [1, 2, 5, 8, 9]

console.log(merge([1, 3, 5], [2, 4, 6]));
// Expected: [1, 2, 3, 4, 5, 6]`,
  solution: `function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Compare elements from both arrays and add smaller one
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Add remaining elements from left array (if any)
  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  // Add remaining elements from right array (if any)
  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
}

function mergeSort(arr: number[]): number[] {
  // Base case: arrays of length 0 or 1 are already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // Find the middle index
  const mid = Math.floor(arr.length / 2);

  // Divide array into two halves
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // Recursively sort each half and merge
  return merge(mergeSort(left), mergeSort(right));
}

// Alternative: More concise merge using spread operator
function mergeAlt(left: number[], right: number[]): number[] {
  const result: number[] = [];

  while (left.length && right.length) {
    result.push(left[0] <= right[0] ? left.shift()! : right.shift()!);
  }

  return [...result, ...left, ...right];
}

// Test cases
console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));
// [3, 9, 10, 27, 38, 43, 82]

console.log(mergeSort([5, 2, 8, 1, 9]));
// [1, 2, 5, 8, 9]`,
  testCases: [
    {
      input: [[38, 27, 43, 3, 9, 82, 10]],
      expectedOutput: [3, 9, 10, 27, 38, 43, 82],
      description: 'Sort random array',
    },
    {
      input: [[5, 4, 3, 2, 1]],
      expectedOutput: [1, 2, 3, 4, 5],
      description: 'Sort reverse-sorted array',
    },
    {
      input: [[1, 2, 3, 4, 5]],
      expectedOutput: [1, 2, 3, 4, 5],
      description: 'Already sorted array remains sorted',
    },
    {
      input: [[]],
      expectedOutput: [],
      description: 'Empty array returns empty',
    },
    {
      input: [[42]],
      expectedOutput: [42],
      description: 'Single element array',
    },
    {
      input: [[3, 3, 1, 1, 2, 2]],
      expectedOutput: [1, 1, 2, 2, 3, 3],
      description: 'Array with duplicates',
    },
  ],
  hints: [
    'Base case for mergeSort: return the array if length <= 1',
    'Use arr.slice(0, mid) and arr.slice(mid) to divide the array',
    'In merge(), use two pointers (indices) to track position in each array',
    'Use <= instead of < when comparing to maintain stability (equal elements keep original order)',
    'After the main merge loop, remember to add any remaining elements from both arrays',
  ],
};
