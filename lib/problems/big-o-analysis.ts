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
  id: 'big-o-analysis',
  title: 'Understanding Big O Notation',
  difficulty: 'easy',
  category: 'Performance',
  description: `<h2>In-Depth Explanation</h2>

<p>Big O notation describes the performance or complexity of an algorithm. It specifically describes the worst-case scenario and helps us understand how runtime or space requirements grow as input size increases.</p>

<p>Common Big O complexities (from fastest to slowest):</p>
<ul>
  <li><strong>O(1) - Constant</strong>: Same time regardless of input size (array access, hash lookup)</li>
  <li><strong>O(log n) - Logarithmic</strong>: Halves the problem each step (binary search)</li>
  <li><strong>O(n) - Linear</strong>: Time grows linearly with input (single loop)</li>
  <li><strong>O(n log n) - Linearithmic</strong>: Efficient sorting algorithms (merge sort, quick sort)</li>
  <li><strong>O(n²) - Quadratic</strong>: Nested loops (bubble sort, comparing all pairs)</li>
  <li><strong>O(2^n) - Exponential</strong>: Doubles with each addition (recursive fibonacci)</li>
</ul>

<h2>Importance</h2>

<p>Understanding Big O is crucial because:</p>

<ul>
  <li><strong>Scalability</strong>: Predicts how code performs with large datasets</li>
  <li><strong>Interview Essential</strong>: A fundamental topic in technical interviews</li>
  <li><strong>Algorithm Selection</strong>: Helps choose the right algorithm for the job</li>
  <li><strong>Performance Debugging</strong>: Identifies bottlenecks in your code</li>
  <li><strong>Resource Planning</strong>: Estimates memory and CPU requirements</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Big O analysis helps in many real-world scenarios:</p>

<ul>
  <li><strong>Database Queries</strong>: Understanding index performance (O(log n) vs O(n))</li>
  <li><strong>API Design</strong>: Ensuring endpoints scale with data growth</li>
  <li><strong>Data Structure Choice</strong>: Array vs Set vs Map for lookups</li>
  <li><strong>Algorithm Optimization</strong>: Improving slow code paths</li>
  <li><strong>System Design</strong>: Planning for growth in distributed systems</li>
</ul>

<p><strong>Challenge:</strong> Implement functions that demonstrate different time complexities and analyze their Big O notation.</p>`,
  examples: [
    {
      input: `analyzeComplexity(findFirst)`,
      output: `"O(1)"`,
      explanation: 'Array access by index is constant time',
    },
    {
      input: `analyzeComplexity(findInSorted)`,
      output: `"O(log n)"`,
      explanation: 'Binary search halves the search space each iteration',
    },
    {
      input: `analyzeComplexity(findInArray)`,
      output: `"O(n)"`,
      explanation: 'Linear search must check each element',
    },
  ],
  starterCode: `// TODO: Implement functions with different time complexities
// and a function to analyze/identify the complexity

// O(1) - Constant time: Get first element
function getFirst(arr) {
  // Your code here
}

// O(n) - Linear time: Find element in unsorted array
function linearSearch(arr, target) {
  // Your code here
}

// O(log n) - Logarithmic time: Binary search in sorted array
function binarySearch(arr, target) {
  // Your code here
}

// O(n²) - Quadratic time: Find all pairs
function findAllPairs(arr) {
  // Your code here
}

// O(n log n) - Sort array using efficient algorithm
function efficientSort(arr) {
  // Your code here (can use built-in sort)
}

// Analyze the complexity of a given function based on its behavior
function analyzeComplexity(fn, testSizes = [10, 100, 1000]) {
  // Measure execution time for different input sizes
  // Return the Big O notation as a string
  // Your code here
}

// Test your implementations
console.log(getFirst([1, 2, 3, 4, 5]));
console.log(linearSearch([3, 1, 4, 1, 5], 4));
console.log(binarySearch([1, 2, 3, 4, 5], 3));
console.log(findAllPairs([1, 2, 3]));`,
  solution: `// O(1) - Constant time: Get first element
function getFirst(arr) {
  return arr[0]; // Always same time regardless of array size
}

// O(n) - Linear time: Find element in unsorted array
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

// O(log n) - Logarithmic time: Binary search in sorted array
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// O(n²) - Quadratic time: Find all pairs
function findAllPairs(arr) {
  const pairs = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      pairs.push([arr[i], arr[j]]);
    }
  }
  return pairs;
}

// O(n log n) - Sort array using efficient algorithm
function efficientSort(arr) {
  return [...arr].sort((a, b) => a - b);
}

// Analyze complexity by measuring growth rate
function analyzeComplexity(fn, testSizes = [10, 100, 1000]) {
  const times = testSizes.map(size => {
    const arr = Array.from({ length: size }, (_, i) => i);
    const start = performance.now();
    fn(arr, Math.floor(size / 2)); // Pass a target for search functions
    return performance.now() - start;
  });

  // Analyze growth pattern
  const ratio1 = times[1] / times[0];
  const ratio2 = times[2] / times[1];

  if (ratio1 < 2 && ratio2 < 2) return "O(1)";
  if (ratio1 < 5 && ratio2 < 5) return "O(log n)";
  if (ratio1 < 15 && ratio2 < 15) return "O(n)";
  if (ratio1 < 20 && ratio2 < 20) return "O(n log n)";
  return "O(n²)";
}`,
  testCases: [
    {
      input: [[1, 2, 3, 4, 5]],
      expectedOutput: 1,
      description: 'getFirst([1, 2, 3, 4, 5]) returns 1 - O(1) constant time access',
    },
    {
      input: [[3, 1, 4, 1, 5, 9, 2, 6], 5],
      expectedOutput: 4,
      description: 'linearSearch([3, 1, 4, 1, 5, 9, 2, 6], 5) returns index 4 - O(n) linear search',
    },
    {
      input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7],
      expectedOutput: 6,
      description: 'binarySearch([1..10], 7) returns index 6 - O(log n) binary search',
    },
    {
      input: [[1, 2, 3]],
      expectedOutput: [[1, 2], [1, 3], [2, 3]],
      description: 'findAllPairs([1, 2, 3]) returns all pairs - O(n²) nested loops',
    },
    {
      input: [[5, 2, 8, 1, 9, 3]],
      expectedOutput: [1, 2, 3, 5, 8, 9],
      description: 'efficientSort([5, 2, 8, 1, 9, 3]) returns sorted array - O(n log n)',
    },
  ],
  hints: [
    'O(1) operations access data directly without iteration - like array[0] or object.property',
    'O(n) requires looking at each element once - single for loop through the data',
    'O(log n) halves the problem each step - binary search eliminates half the remaining elements',
    'O(n²) typically involves nested loops where each element is compared to every other element',
    'To analyze complexity empirically, measure execution time for inputs of size n, 10n, and 100n, then compare the ratios',
  ],
};
