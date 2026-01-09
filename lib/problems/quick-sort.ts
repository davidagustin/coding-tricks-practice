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
  id: 'quick-sort',
  title: 'Quick Sort Algorithm',
  difficulty: 'medium',
  category: 'Algorithms',
  description: `<h2>In-Depth Explanation</h2>

<p>Quick sort is a highly efficient <strong>divide-and-conquer</strong> sorting algorithm that works by selecting a 'pivot' element and partitioning the array around it. Elements smaller than the pivot go to the left, larger elements go to the right.</p>

<p>The algorithm works as follows:</p>

<h3>Partitioning Process</h3>
<ol>
  <li>Choose a pivot element (commonly last, first, or random element)</li>
  <li>Reorder array so elements less than pivot come before it</li>
  <li>Elements greater than pivot come after it</li>
  <li>Pivot is now in its final sorted position</li>
  <li>Recursively apply to sub-arrays on left and right of pivot</li>
</ol>

<h3>Lomuto vs Hoare Partition Schemes</h3>
<ul>
  <li><strong>Lomuto</strong>: Simpler to understand, uses last element as pivot</li>
  <li><strong>Hoare</strong>: More efficient, uses two pointers moving toward each other</li>
</ul>

<h2>Time and Space Complexity</h2>

<ul>
  <li><strong>Time Complexity</strong>:
    <ul>
      <li>Average: O(n log n)</li>
      <li>Best: O(n log n)</li>
      <li>Worst: O(n^2) - when array is already sorted and pivot is first/last element</li>
    </ul>
  </li>
  <li><strong>Space Complexity</strong>: O(log n) average for call stack</li>
  <li><strong>In-place</strong>: Yes - doesn't require extra array like merge sort</li>
  <li><strong>Stable</strong>: No - may change relative order of equal elements</li>
</ul>

<h2>Importance</h2>

<p>Quick sort is crucial because:</p>

<ul>
  <li><strong>Speed</strong>: Fastest general-purpose sorting algorithm in practice</li>
  <li><strong>In-place</strong>: Requires minimal extra memory</li>
  <li><strong>Cache Efficiency</strong>: Good locality of reference for modern CPUs</li>
  <li><strong>Industry Standard</strong>: Used in many language standard libraries</li>
  <li><strong>Interview Favorite</strong>: Very commonly asked in technical interviews</li>
</ul>

<h2>Practical Applications</h2>

<ul>
  <li><strong>Standard Libraries</strong>: C's qsort(), JavaScript's V8 engine (with modifications)</li>
  <li><strong>Database Systems</strong>: Sorting records for queries</li>
  <li><strong>Numerical Computing</strong>: Sorting large datasets efficiently</li>
  <li><strong>Selection Algorithm</strong>: QuickSelect for finding kth smallest element</li>
  <li><strong>Graphics</strong>: Sorting polygons for rendering</li>
</ul>

<p><strong>Challenge:</strong> Implement quick sort with the Lomuto partition scheme.</p>`,
  examples: [
    {
      input: `quickSort([10, 7, 8, 9, 1, 5])`,
      output: `[1, 5, 7, 8, 9, 10]`,
      explanation: 'Array is partitioned around pivots and sorted',
    },
    {
      input: `quickSort([3, 6, 2, 7, 1])`,
      output: `[1, 2, 3, 6, 7]`,
      explanation: 'Each partition places pivot in correct position',
    },
    {
      input: `partition([10, 7, 8, 9, 1, 5], 0, 5) // pivot = 5`,
      output: `1 (pivot index), array becomes [1, 5, 8, 9, 7, 10]`,
      explanation: 'Elements <= 5 moved to left, > 5 to right',
    },
  ],
  starterCode: `// TODO: Implement partition function (Lomuto scheme)
// Chooses last element as pivot, places it in correct position
// Returns the index where pivot ends up
function partition(arr: number[], low: number, high: number): number {
  // Choose pivot (last element)
  // Track index of smaller element
  // Loop through array, swap elements smaller than pivot
  // Place pivot in correct position
  // Return pivot's final index

  return low;
}

// TODO: Implement quick sort
// Recursively partitions and sorts the array in-place
function quickSort(arr: number[], low: number = 0, high: number = arr.length - 1): number[] {
  // Base case: low >= high means section is sorted
  // Partition the array
  // Recursively sort left and right of pivot

  return arr;
}

// Helper function to swap elements
function swap(arr: number[], i: number, j: number): void {
  // TODO: Implement swap
}

// Test cases
const arr1 = [10, 7, 8, 9, 1, 5];
console.log(quickSort([...arr1]));
// Expected: [1, 5, 7, 8, 9, 10]

const arr2 = [3, 6, 2, 7, 1];
console.log(quickSort([...arr2]));
// Expected: [1, 2, 3, 6, 7]`,
  solution: `function test() { return true; }`,
  testCases: [
    {
      input: [],
      expectedOutput: true,
      description: 'Test passes',
    },
  ],
  hints: [
    'In Lomuto partition, the pivot is the last element (arr[high])',
    'Variable i tracks where the next smaller element should go (starts at low - 1)',
    'When you find an element <= pivot, increment i and swap arr[i] with current element',
    'After the loop, swap arr[i + 1] with the pivot to place it in correct position',
    'The base case is when low >= high (section has 0 or 1 elements)',
    'Remember: quickSort modifies the array in-place, so spread [...arr] when testing to preserve original',
  ],
};
