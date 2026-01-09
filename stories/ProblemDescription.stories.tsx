import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProblemDescription from '../components/ProblemDescription';
import type { Problem } from '../lib/problems';

const meta: Meta<typeof ProblemDescription> = {
  title: 'Components/ProblemDescription',
  component: ProblemDescription,
  parameters: {
    layout: 'padded',
    chromatic: {
      viewports: [1200],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    problem: {
      description: 'The problem object containing all problem details',
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-4xl mx-auto h-[600px] bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProblemDescription>;

// =============================================================================
// Mock Problem Data
// =============================================================================

const easyProblem: Problem = {
  id: 'two-sum',
  title: 'Two Sum',
  difficulty: 'easy',
  category: 'Arrays',
  description: `<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
<p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
<p>You can return the answer in any order.</p>`,
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
    },
  ],
  starterCode: 'function twoSum(nums: number[], target: number): number[] {\n  // Your code here\n}',
  solution: 'function twoSum(nums: number[], target: number): number[] {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}',
  testCases: [],
  hints: ['Try using a hash map to store values you have seen.', 'For each number, check if target - number exists in the map.'],
};

const mediumProblem: Problem = {
  id: 'longest-substring',
  title: 'Longest Substring Without Repeating Characters',
  difficulty: 'medium',
  category: 'Strings',
  description: `<p>Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.</p>
<p>A <em>substring</em> is a contiguous non-empty sequence of characters within a string.</p>`,
  examples: [
    {
      input: 's = "abcabcbb"',
      output: '3',
      explanation: 'The answer is "abc", with the length of 3.',
    },
    {
      input: 's = "bbbbb"',
      output: '1',
      explanation: 'The answer is "b", with the length of 1.',
    },
  ],
  starterCode: 'function lengthOfLongestSubstring(s: string): number {\n  // Your code here\n}',
  solution: '...',
  testCases: [],
  hints: ['Use the sliding window technique.', 'Keep track of characters in the current window using a Set.'],
};

const hardProblem: Problem = {
  id: 'merge-k-sorted-lists',
  title: 'Merge k Sorted Lists',
  difficulty: 'hard',
  category: 'Linked Lists',
  description: `<p>You are given an array of <code>k</code> linked-lists <code>lists</code>, each linked-list is sorted in ascending order.</p>
<p><strong>Merge all the linked-lists into one sorted linked-list</strong> and return it.</p>
<p>This is a classic problem that tests your understanding of:</p>
<ul>
  <li>Divide and conquer algorithms</li>
  <li>Priority queues / Min heaps</li>
  <li>Linked list manipulation</li>
</ul>`,
  examples: [
    {
      input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
      output: '[1,1,2,3,4,4,5,6]',
      explanation: 'The linked-lists are merged into one sorted list.',
    },
    {
      input: 'lists = []',
      output: '[]',
    },
    {
      input: 'lists = [[]]',
      output: '[]',
    },
  ],
  starterCode: 'function mergeKLists(lists: ListNode[]): ListNode | null {\n  // Your code here\n}',
  solution: '...',
  testCases: [],
  hints: [
    'Think about how you would merge two sorted lists first.',
    'Can you use divide and conquer to break down the problem?',
    'A min-heap can efficiently track the smallest element across all lists.',
  ],
};

const shortDescriptionProblem: Problem = {
  id: 'is-palindrome',
  title: 'Valid Palindrome',
  difficulty: 'easy',
  category: 'Strings',
  description: '<p>Check if a string is a palindrome.</p>',
  examples: [
    {
      input: '"racecar"',
      output: 'true',
    },
  ],
  starterCode: 'function isPalindrome(s: string): boolean {}',
  solution: '...',
  testCases: [],
  hints: [],
};

const longDescriptionProblem: Problem = {
  id: 'lru-cache',
  title: 'LRU Cache',
  difficulty: 'medium',
  category: 'Data Structures',
  description: `<p>Design a data structure that follows the constraints of a <strong>Least Recently Used (LRU) cache</strong>.</p>

<p>Implement the <code>LRUCache</code> class:</p>

<ul>
  <li><code>LRUCache(int capacity)</code> Initialize the LRU cache with <strong>positive</strong> size <code>capacity</code>.</li>
  <li><code>int get(int key)</code> Return the value of the <code>key</code> if the key exists, otherwise return <code>-1</code>.</li>
  <li><code>void put(int key, int value)</code> Update the value of the <code>key</code> if the <code>key</code> exists. Otherwise, add the <code>key-value</code> pair to the cache. If the number of keys exceeds the <code>capacity</code> from this operation, <strong>evict</strong> the least recently used key.</li>
</ul>

<p>The functions <code>get</code> and <code>put</code> must each run in <strong>O(1)</strong> average time complexity.</p>

<h3>Understanding LRU Cache</h3>

<p>An LRU cache is a data structure that stores a limited number of items. When the cache is full and a new item needs to be added, the least recently used item is removed to make room for the new item.</p>

<p>Key characteristics:</p>
<ul>
  <li>Fixed capacity</li>
  <li>Fast lookups (O(1) time)</li>
  <li>Fast insertions (O(1) time)</li>
  <li>Automatic eviction of least recently used items</li>
</ul>

<h3>Implementation Approaches</h3>

<p>There are several ways to implement an LRU cache:</p>

<ol>
  <li><strong>HashMap + Doubly Linked List</strong>: The most common approach. Use a HashMap for O(1) lookups and a doubly linked list to track usage order.</li>
  <li><strong>OrderedDict (Python)</strong>: Python's OrderedDict maintains insertion order and supports move_to_end operation.</li>
  <li><strong>LinkedHashMap (Java)</strong>: Java's LinkedHashMap can be configured to maintain access order.</li>
</ol>

<p>For this problem, we recommend implementing option 1 to understand the underlying mechanics.</p>

<h3>Constraints</h3>
<ul>
  <li><code>1 &lt;= capacity &lt;= 3000</code></li>
  <li><code>0 &lt;= key &lt;= 10<sup>4</sup></code></li>
  <li><code>0 &lt;= value &lt;= 10<sup>5</sup></code></li>
  <li>At most <code>2 * 10<sup>5</sup></code> calls will be made to <code>get</code> and <code>put</code>.</li>
</ul>`,
  examples: [
    {
      input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
      output: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
      explanation: 'LRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1); // cache is {1=1}\nlRUCache.put(2, 2); // cache is {1=1, 2=2}\nlRUCache.get(1);    // return 1\nlRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}\nlRUCache.get(2);    // returns -1 (not found)\nlRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}\nlRUCache.get(1);    // return -1 (not found)\nlRUCache.get(3);    // return 3\nlRUCache.get(4);    // return 4',
    },
  ],
  starterCode: 'class LRUCache {\n  constructor(capacity: number) {}\n  get(key: number): number {}\n  put(key: number, value: number): void {}\n}',
  solution: '...',
  testCases: [],
  hints: [
    'Use a hash map for O(1) access.',
    'Use a doubly linked list to track the order of usage.',
    'Move items to the front when accessed.',
    'Remove from the back when capacity is exceeded.',
  ],
};

const codeExamplesProblem: Problem = {
  id: 'debounce-implementation',
  title: 'Implement Debounce',
  difficulty: 'medium',
  category: 'JavaScript Patterns',
  description: `<p>Implement a <code>debounce</code> function that delays invoking a function until after <code>wait</code> milliseconds have elapsed since the last time the debounced function was invoked.</p>

<h3>Function Signature</h3>
<pre><code>function debounce&lt;T extends (...args: unknown[]) =&gt; unknown&gt;(
  func: T,
  wait: number
): (...args: Parameters&lt;T&gt;) =&gt; void</code></pre>

<h3>Expected Behavior</h3>
<pre><code>const log = debounce((msg: string) =&gt; console.log(msg), 1000);

log("a"); // Will not log
log("b"); // Will not log
log("c"); // After 1000ms, logs "c"

// Only the last call is executed after the wait period</code></pre>

<h3>Common Use Cases</h3>
<ul>
  <li><strong>Search Input</strong>: Wait for user to stop typing before searching</li>
  <li><strong>Window Resize</strong>: Recalculate layout after resize ends</li>
  <li><strong>Button Clicks</strong>: Prevent accidental double-clicks</li>
</ul>

<h3>Implementation Notes</h3>
<pre><code>// Basic structure
function debounce(func, wait) {
  let timeoutId;

  return function(...args) {
    // Clear previous timeout
    clearTimeout(timeoutId);

    // Set new timeout
    timeoutId = setTimeout(() =&gt; {
      func.apply(this, args);
    }, wait);
  };
}</code></pre>`,
  examples: [
    {
      input: 'debounce(fn, 100); call fn 3 times within 50ms',
      output: 'fn is called once after 100ms from last call',
      explanation: 'Each call resets the timer. Only the last call executes.',
    },
  ],
  starterCode: 'function debounce<T extends (...args: unknown[]) => unknown>(\n  func: T,\n  wait: number\n): (...args: Parameters<T>) => void {\n  // Your implementation\n}',
  solution: '...',
  testCases: [],
  hints: ['Use setTimeout and clearTimeout', 'Store the timeout ID in a closure', 'Use apply to preserve the context'],
};

const multipleExamplesProblem: Problem = {
  id: 'binary-search',
  title: 'Binary Search',
  difficulty: 'easy',
  category: 'Algorithms',
  description: `<p>Given an array of integers <code>nums</code> which is sorted in ascending order, and an integer <code>target</code>, write a function to search <code>target</code> in <code>nums</code>.</p>
<p>If <code>target</code> exists, return its index. Otherwise, return <code>-1</code>.</p>
<p>You must write an algorithm with <strong>O(log n)</strong> runtime complexity.</p>`,
  examples: [
    {
      input: 'nums = [-1,0,3,5,9,12], target = 9',
      output: '4',
      explanation: '9 exists in nums and its index is 4.',
    },
    {
      input: 'nums = [-1,0,3,5,9,12], target = 2',
      output: '-1',
      explanation: '2 does not exist in nums so return -1.',
    },
    {
      input: 'nums = [5], target = 5',
      output: '0',
      explanation: 'Single element array, target found at index 0.',
    },
    {
      input: 'nums = [], target = 5',
      output: '-1',
      explanation: 'Empty array, target not found.',
    },
    {
      input: 'nums = [1,2,3,4,5,6,7,8,9,10], target = 7',
      output: '6',
      explanation: 'Target 7 found at index 6 after 3 iterations.',
    },
  ],
  starterCode: 'function search(nums: number[], target: number): number {\n  // Your code here\n}',
  solution: '...',
  testCases: [],
  hints: [
    'Use two pointers: left and right.',
    'Calculate mid = left + Math.floor((right - left) / 2) to avoid overflow.',
    'If nums[mid] === target, return mid.',
    'If nums[mid] < target, search the right half.',
    'If nums[mid] > target, search the left half.',
  ],
};

const hintsShownProblem: Problem = {
  id: 'reverse-linked-list',
  title: 'Reverse Linked List',
  difficulty: 'easy',
  category: 'Linked Lists',
  description: '<p>Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p>',
  examples: [
    {
      input: 'head = [1,2,3,4,5]',
      output: '[5,4,3,2,1]',
    },
  ],
  starterCode: 'function reverseList(head: ListNode | null): ListNode | null {}',
  solution: '...',
  testCases: [],
  hints: [
    'Think about how to reverse the direction of each pointer.',
    'You will need to keep track of three nodes: previous, current, and next.',
    'Initialize prev as null and curr as head.',
    'In each iteration: save next, reverse the pointer, move prev and curr forward.',
    'The new head is prev when curr becomes null.',
  ],
};

const noHintsProblem: Problem = {
  id: 'add-two-numbers',
  title: 'Add Two Numbers',
  difficulty: 'medium',
  category: 'Linked Lists',
  description: `<p>You are given two <strong>non-empty</strong> linked lists representing two non-negative integers. The digits are stored in <strong>reverse order</strong>, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.</p>
<p>You may assume the two numbers do not contain any leading zero, except the number 0 itself.</p>`,
  examples: [
    {
      input: 'l1 = [2,4,3], l2 = [5,6,4]',
      output: '[7,0,8]',
      explanation: '342 + 465 = 807',
    },
  ],
  starterCode: 'function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {}',
  solution: '...',
  testCases: [],
  hints: [],
};

const specialCharactersProblem: Problem = {
  id: 'special-chars',
  title: 'Handle Special Characters & Edge Cases',
  difficulty: 'medium',
  category: 'Strings',
  description: `<p>Write a function that handles various <strong>special characters</strong> and edge cases in strings.</p>

<h3>Supported Characters</h3>
<p>Your function should handle:</p>
<ul>
  <li>Unicode: <code>\\u0048\\u0065\\u006C\\u006C\\u006F</code> = Hello</li>
  <li>Emojis: <code>\\uD83D\\uDE00</code></li>
  <li>HTML entities: <code>&amp;lt;</code>, <code>&amp;gt;</code>, <code>&amp;amp;</code>, <code>&amp;quot;</code></li>
  <li>Escape sequences: <code>\\n</code>, <code>\\t</code>, <code>\\r</code>, <code>\\\\</code></li>
</ul>

<h3>Mathematical Expressions</h3>
<p>Handle expressions like: <code>x &lt; y</code>, <code>a &gt; b</code>, <code>x &amp;&amp; y</code>, <code>a || b</code></p>

<h3>Code with Symbols</h3>
<pre><code>const regex = /^[a-zA-Z0-9_]+$/;
const obj = { key: "value" };
const fn = (x) =&gt; x * 2;</code></pre>

<p><strong>Note:</strong> Pay special attention to quotes: <code>'single'</code>, <code>"double"</code>, and <code>\`backticks\`</code>.</p>`,
  examples: [
    {
      input: '"Hello\\nWorld"',
      output: '"Hello\\nWorld" (with actual newline)',
    },
    {
      input: '"<script>alert(1)</script>"',
      output: '"&lt;script&gt;alert(1)&lt;/script&gt;" (escaped)',
    },
  ],
  starterCode: 'function handleSpecialChars(input: string): string {\n  // Your code here\n}',
  solution: '...',
  testCases: [],
  hints: ['Consider using String.prototype.replace with regex.', 'Handle each character type separately.'],
};

const formattedCodeBlocksProblem: Problem = {
  id: 'deep-clone',
  title: 'Deep Clone Object',
  difficulty: 'hard',
  category: 'JavaScript Fundamentals',
  description: `<p>Implement a <code>deepClone</code> function that creates a deep copy of an object, handling all edge cases.</p>

<h3>Requirements</h3>
<p>Your implementation should handle:</p>

<h4>1. Primitive Types</h4>
<pre><code>deepClone(42);        // 42
deepClone("hello");   // "hello"
deepClone(null);      // null
deepClone(undefined); // undefined</code></pre>

<h4>2. Arrays</h4>
<pre><code>const arr = [1, [2, 3], [[4]]];
const cloned = deepClone(arr);
cloned[1][0] = 99;
console.log(arr[1][0]); // Still 2</code></pre>

<h4>3. Objects</h4>
<pre><code>const obj = {
  name: "Alice",
  nested: {
    deep: {
      value: 42
    }
  }
};
const cloned = deepClone(obj);
cloned.nested.deep.value = 100;
console.log(obj.nested.deep.value); // Still 42</code></pre>

<h4>4. Special Types</h4>
<pre><code>// Dates
const date = new Date();
const clonedDate = deepClone(date);
clonedDate.setFullYear(2000);
console.log(date.getFullYear()); // Original year

// RegExp
const regex = /test/gi;
const clonedRegex = deepClone(regex);

// Maps and Sets
const map = new Map([["key", "value"]]);
const set = new Set([1, 2, 3]);</code></pre>

<h4>5. Circular References</h4>
<pre><code>const obj = { name: "circular" };
obj.self = obj;
const cloned = deepClone(obj);
console.log(cloned.self === cloned); // true
console.log(cloned.self === obj);    // false</code></pre>

<h3>Type Definition</h3>
<pre><code>type DeepCloneable =
  | null
  | undefined
  | boolean
  | number
  | string
  | Date
  | RegExp
  | Map&lt;unknown, unknown&gt;
  | Set&lt;unknown&gt;
  | DeepCloneable[]
  | { [key: string]: DeepCloneable };</code></pre>`,
  examples: [
    {
      input: '{ a: 1, b: { c: 2 } }',
      output: '{ a: 1, b: { c: 2 } } (new reference)',
      explanation: 'Returns a new object with the same structure but different references.',
    },
    {
      input: '[1, [2, [3]]]',
      output: '[1, [2, [3]]] (new reference)',
      explanation: 'Nested arrays are also cloned.',
    },
  ],
  starterCode: 'function deepClone<T>(obj: T): T {\n  // Your implementation\n}',
  solution: '...',
  testCases: [],
  hints: [
    'Use typeof to check for primitives.',
    'Use instanceof to detect special objects like Date, RegExp, Map, Set.',
    'Use a WeakMap to track circular references.',
    'Recursively clone nested objects and arrays.',
  ],
};

// =============================================================================
// Stories
// =============================================================================

/**
 * Easy difficulty problem with simple description and basic examples.
 */
export const EasyProblem: Story = {
  args: {
    problem: easyProblem,
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

/**
 * Medium difficulty problem with moderate complexity.
 */
export const MediumProblem: Story = {
  args: {
    problem: mediumProblem,
  },
};

/**
 * Hard difficulty problem with complex requirements and multiple concepts.
 */
export const HardProblem: Story = {
  args: {
    problem: hardProblem,
  },
};

/**
 * Problem with minimal description content.
 */
export const ShortDescription: Story = {
  args: {
    problem: shortDescriptionProblem,
  },
};

/**
 * Problem with extensive description including multiple sections and detailed explanations.
 */
export const LongDescription: Story = {
  args: {
    problem: longDescriptionProblem,
  },
};

/**
 * Problem featuring code examples and snippets in the description.
 */
export const WithCodeExamples: Story = {
  args: {
    problem: codeExamplesProblem,
  },
};

/**
 * Problem with five examples to test scrolling and layout with many examples.
 */
export const MultipleExamples: Story = {
  args: {
    problem: multipleExamplesProblem,
  },
  play: async ({ canvasElement }) => {
    // Navigate to Examples tab to show multiple examples
    const examplesTab = canvasElement.querySelector('button:nth-child(2)');
    if (examplesTab) {
      (examplesTab as HTMLButtonElement).click();
    }
  },
};

/**
 * Problem showing the Hints tab with multiple hints visible.
 */
export const HintsShown: Story = {
  args: {
    problem: hintsShownProblem,
  },
  play: async ({ canvasElement }) => {
    // Navigate to Hints tab
    const hintsTab = canvasElement.querySelector('button:nth-child(3)');
    if (hintsTab) {
      (hintsTab as HTMLButtonElement).click();
    }
  },
};

/**
 * Problem with no hints available - shows empty state.
 */
export const HintsHidden: Story = {
  args: {
    problem: noHintsProblem,
  },
  play: async ({ canvasElement }) => {
    // Navigate to Hints tab to show empty state
    const hintsTab = canvasElement.querySelector('button:nth-child(3)');
    if (hintsTab) {
      (hintsTab as HTMLButtonElement).click();
    }
  },
};

/**
 * Dark theme variant for testing dark mode styling.
 */
export const DarkTheme: Story = {
  args: {
    problem: mediumProblem,
  },
  globals: {
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    chromatic: {
      modes: {
        dark: { theme: 'dark' },
      },
    },
  },
};

/**
 * Mobile viewport for responsive design testing.
 */
export const MobileViewport: Story = {
  args: {
    problem: easyProblem,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    chromatic: {
      viewports: [375],
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-full mx-auto h-[500px] bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4">
        <Story />
      </div>
    ),
  ],
};

/**
 * Problem with special characters, HTML entities, and escape sequences in description.
 */
export const SpecialCharacters: Story = {
  args: {
    problem: specialCharactersProblem,
  },
};

/**
 * Problem with formatted code blocks and complex code examples.
 */
export const FormattedCodeBlocks: Story = {
  args: {
    problem: formattedCodeBlocksProblem,
  },
};

// =============================================================================
// Additional Chromatic-specific Stories
// =============================================================================

/**
 * Examples tab view for Chromatic visual testing.
 */
export const ExamplesTabView: Story = {
  args: {
    problem: multipleExamplesProblem,
  },
  play: async ({ canvasElement }) => {
    const examplesTab = canvasElement.querySelector('button:nth-child(2)');
    if (examplesTab) {
      (examplesTab as HTMLButtonElement).click();
    }
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

/**
 * Dark theme with hints showing for complete dark mode coverage.
 */
export const DarkThemeWithHints: Story = {
  args: {
    problem: hintsShownProblem,
  },
  globals: {
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  play: async ({ canvasElement }) => {
    const hintsTab = canvasElement.querySelector('button:nth-child(3)');
    if (hintsTab) {
      (hintsTab as HTMLButtonElement).click();
    }
  },
};

/**
 * Dark theme with code examples for syntax highlighting in dark mode.
 */
export const DarkThemeWithCode: Story = {
  args: {
    problem: formattedCodeBlocksProblem,
  },
  globals: {
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Mobile viewport with examples tab for responsive testing.
 */
export const MobileWithExamples: Story = {
  args: {
    problem: multipleExamplesProblem,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    chromatic: {
      viewports: [375],
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-full mx-auto h-[500px] bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const examplesTab = canvasElement.querySelector('button:nth-child(2)');
    if (examplesTab) {
      (examplesTab as HTMLButtonElement).click();
    }
  },
};
