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
    id: 'short-circuit-evaluation',
    title: 'Short-Circuit Evaluation',
    difficulty: 'easy',
    category: 'JavaScript Basics',
    description: `## In-Depth Explanation

Short-circuit evaluation is a feature where logical operators (\`&&\` and \`||\`) don't evaluate the right operand if the result can be determined from the left operand alone.

\`&&\` (AND): Returns the first falsy value, or the last value if all are truthy. Stops evaluating at the first falsy value.
\`||\` (OR): Returns the first truthy value, or the last value if all are falsy. Stops evaluating at the first truthy value.

This enables:
- **Conditional Execution**: \`condition && doSomething()\` - only executes if condition is truthy
- **Default Values**: \`value || defaultValue\` - uses default if value is falsy
- **Optional Chaining**: \`obj && obj.prop && obj.prop.value\` - safely access nested properties

Important: Be careful with falsy values like \`0\`, \`''\`, \`false\` - they will trigger defaults with \`||\`.

## Importance

Short-circuit evaluation is essential for concise JavaScript because:

- **Code Conciseness**: Replace if statements with one-liners
- **Default Values**: Common pattern for providing defaults
- **Optional Access**: Safely access properties that might not exist
- **Performance**: Avoids unnecessary evaluations
- **Readability**: More readable than verbose if statements
- **Functional Style**: Enables functional programming patterns

## Usefulness & Practical Applications

Short-circuit evaluation is used everywhere:

- **Default Values**: \`const name = user.name || 'Guest'\`
- **Conditional Rendering**: React \`{isLoggedIn && <Dashboard />}\`
- **Optional Chaining**: \`user && user.profile && user.profile.name\`
- **Function Calls**: \`config && config.onLoad && config.onLoad()\`
- **API Responses**: \`response.data || []\` for default empty array
- **Configuration**: \`timeout || 5000\` for default timeout
- **Validation**: \`email && validateEmail(email)\`
- **Error Handling**: \`error && console.error(error)\`

**Challenge:** Replace if statements with short-circuit patterns.`,
    examples: [
      {
        input: `const name = user && user.name;`,
        output: `'John' or undefined`,
        explanation: '&& short-circuits on falsy values',
      },
    ],
    starterCode: `function greetUser(user) {
  // TODO: Use && to only call user.getName() if user exists
  // Return greeting or 'Hello, Guest!'
  let name;
  if (user) {
    name = user.getName();
  }
  return 'Hello, ' + (name || 'Guest') + '!';
}

function getConfigValue(config, key, defaultValue) {
  // TODO: Return config[key] if it exists, otherwise defaultValue
  // Use || for this (but be aware of falsy value issues!)
  if (config && config[key] !== undefined) {
    return config[key];
  }
  return defaultValue;
}

// Test
const user = { getName: () => 'John' };
console.log(greetUser(user));
console.log(greetUser(null));
console.log(getConfigValue({ timeout: 5000 }, 'timeout', 3000));
console.log(getConfigValue({}, 'timeout', 3000));`,
    solution: `function greetUser(user) {
  const name = user && user.getName();
  return 'Hello, ' + (name || 'Guest') + '!';
}

function getConfigValue(config, key, defaultValue) {
  return (config && config[key]) || defaultValue;
}`,
    testCases: [
      {
        input: [{ getName: () => 'John' }],
        expectedOutput: 'Hello, John!',
        description: 'greetUser with user',
      },
      {
        input: [null],
        expectedOutput: 'Hello, Guest!',
        description: 'greetUser without user',
      },
      {
        input: [{ timeout: 5000 }, 'timeout', 3000],
        expectedOutput: 5000,
        description: 'getConfigValue existing',
      },
      {
        input: [{}, 'timeout', 3000],
        expectedOutput: 3000,
        description: 'getConfigValue default',
      },
    ],
    hints: [
      '&& evaluates right side only if left is truthy',
      '|| returns first truthy value or last value',
      'Be careful: 0 and "" are falsy!',
    ],
  },
  {
    id: 'tagged-template-literals',
    title: 'Tagged Template Literals',
    difficulty: 'medium',
    category: 'JavaScript Basics',
    description: `## In-Depth Explanation

Tagged template literals allow you to process template strings with a custom function (the "tag"). When you write \`tag\`string\`, JavaScript calls the tag function with:
1. An array of string literals (the static parts)
2. The interpolated values (the \`${expression}\` parts)

The tag function receives: \`tag(strings, ...values)\` where:
- \`strings\` is an array of string literals
- \`values\` are the interpolated expressions
- \`strings.length === values.length + 1\` (always one more string than value)

This enables:
- **HTML Escaping**: Sanitize user input in templates
- **Internationalization**: Process strings for translation
- **Styled Components**: CSS-in-JS libraries use this
- **SQL Queries**: Build parameterized queries safely
- **String Formatting**: Custom formatting logic

## Importance

Tagged templates are essential for safe string processing because:

- **Security**: Escape HTML/XML to prevent XSS attacks
- **Internationalization**: Process strings for translation
- **Custom Processing**: Apply custom logic to template strings
- **Type Safety**: TypeScript can type-check tagged templates
- **Framework Features**: Used by styled-components, Apollo, etc.
- **SQL Safety**: Build parameterized queries

## Usefulness & Practical Applications

Tagged templates are used extensively:

- **HTML Escaping**: \`html\`<div>${userInput}</div>\`\` - escape HTML entities
- **Styled Components**: \`styled.div\`color: ${color}\`\` - CSS-in-JS
- **Internationalization**: \`i18n\`Hello ${name}\`\` - translate strings
- **SQL Queries**: \`sql\`SELECT * FROM users WHERE id = ${id}\`\` - parameterized queries
- **String Formatting**: \`format\`Price: ${amount}\`\` - format currency, dates
- **Logging**: \`log\`User ${id} logged in\`\` - structured logging
- **GraphQL**: Building GraphQL queries safely
- **Markdown**: Processing markdown templates

**Challenge:** Build a simple HTML escaping tag and a highlight tag.`,
    examples: [
      {
        input: 'html`<div>${userInput}</div>`',
        output: `'<div>&lt;script&gt;</div>'`,
        explanation: 'Escape HTML entities in interpolated values',
      },
    ],
    starterCode: `function html(strings, ...values) {
  // TODO: Escape HTML entities in interpolated values
  // Replace < > & " with their HTML entities
  // Combine strings and escaped values

  return strings.join('');
}

function escapeHtml(str) {
  // TODO: Replace HTML special characters
  // < → &lt;  > → &gt;  & → &amp;  " → &quot;
  return str;
}

// Test
const userInput = '<script>alert("xss")</script>';
console.log(html\`<div>\${userInput}</div>\`);

const name = 'John & Jane';
console.log(html\`<span>Hello, \${name}!</span>\`);`,
    solution: `function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function html(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] !== undefined ? escapeHtml(values[i]) : '';
    return result + str + value;
  }, '');
}`,
    testCases: [
      {
        input: ['<script>alert("xss")</script>'],
        expectedOutput: '<div>&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;</div>',
        description: 'html tag escapes script',
      },
      {
        input: ['John & Jane'],
        expectedOutput: '<span>Hello, John &amp; Jane!</span>',
        description: 'html tag escapes ampersand',
      },
    ],
    hints: [
      'Tag function receives (strings[], ...values)',
      'strings.length === values.length + 1',
      'Use reduce to interleave strings and processed values',
    ],
  },
  {
    id: 'reduce-patterns',
    title: 'Advanced Reduce Patterns',
    difficulty: 'medium',
    category: 'Array Methods',
    description: `## In-Depth Explanation

\`reduce\` is the most powerful array method, capable of implementing any array transformation. Advanced patterns include:

**Counting**: Build objects that count occurrences - \`{ item: count }\`
**Grouping**: Build objects that group items - \`{ key: [items] }\`
**Running Totals**: Build arrays with cumulative values
**Flattening**: Flatten nested arrays
**Transforming**: Transform arrays into any data structure

The key insight is that the accumulator can be any type - object, array, Map, Set, or even a primitive. This flexibility makes \`reduce\` capable of replacing combinations of \`filter\`, \`map\`, and other methods in a single pass.

## Importance

Advanced reduce patterns are essential for data processing because:

- **Performance**: Single pass instead of multiple iterations
- **Flexibility**: Can build any data structure
- **Power**: Most general-purpose array method
- **Functional Style**: Core to functional programming
- **Data Transformation**: Essential for ETL operations
- **Code Efficiency**: Replace multiple method chains with one reduce

## Usefulness & Practical Applications

These patterns are used extensively:

- **Data Analytics**: Counting occurrences, grouping by categories
- **State Management**: Building state objects from arrays
- **API Processing**: Transforming API responses into desired formats
- **Report Generation**: Grouping and aggregating data for reports
- **Data Normalization**: Normalizing nested data structures
- **Statistics**: Calculating running totals, averages, etc.
- **UI Data Preparation**: Preparing data for display (grouping, counting)
- **Database Queries**: Mimicking SQL GROUP BY, COUNT operations

**Challenge:** Use reduce for grouping, counting occurrences, and running totals.`,
    examples: [
      {
        input: `['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']`,
        output: `{ apple: 3, banana: 2, cherry: 1 }`,
        explanation: 'Count occurrences of each item',
      },
    ],
    starterCode: `function countOccurrences(arr) {
  // TODO: Count occurrences of each item
  // Return object like { item: count }

  return {};
}

function groupBy(arr, key) {
  // TODO: Group array of objects by a key
  // Return object like { keyValue: [items] }

  return {};
}

function runningTotal(numbers) {
  // TODO: Return array of running totals
  // [1, 2, 3] → [1, 3, 6]

  return numbers;
}

// Test
console.log(countOccurrences(['a', 'b', 'a', 'c', 'b', 'a']));
console.log(groupBy([
  { type: 'fruit', name: 'apple' },
  { type: 'vegetable', name: 'carrot' },
  { type: 'fruit', name: 'banana' }
], 'type'));
console.log(runningTotal([1, 2, 3, 4, 5]));`,
    solution: `function countOccurrences(arr) {
  return arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const groupKey = item[key];
    acc[groupKey] = acc[groupKey] || [];
    acc[groupKey].push(item);
    return acc;
  }, {});
}

function runningTotal(numbers) {
  let sum = 0;
  return numbers.reduce((acc, num) => {
    sum += num;
    acc.push(sum);
    return acc;
  }, []);
}`,
    testCases: [
      {
        input: [['a', 'b', 'a', 'c', 'b', 'a']],
        expectedOutput: { a: 3, b: 2, c: 1 },
        description: 'countOccurrences',
      },
      {
        input: [
          [
            { type: 'fruit', name: 'apple' },
            { type: 'vegetable', name: 'carrot' },
            { type: 'fruit', name: 'banana' },
          ],
          'type',
        ],
        expectedOutput: {
          fruit: [
            { type: 'fruit', name: 'apple' },
            { type: 'fruit', name: 'banana' },
          ],
          vegetable: [{ type: 'vegetable', name: 'carrot' }],
        },
        description: 'groupBy',
      },
      {
        input: [[1, 2, 3, 4, 5]],
        expectedOutput: [1, 3, 6, 10, 15],
        description: 'runningTotal',
      },
    ],
    hints: [
      'reduce(callback, initialValue) - start with {} or []',
      'acc[key] = (acc[key] || 0) + 1 for counting',
      'acc[key] = acc[key] || [] for grouping',
    ],
  },
  {
    id: 'array-from-tricks',
    title: 'Array.from Magic',
    difficulty: 'easy',
    category: 'Array Methods',
    description: `## In-Depth Explanation

\`Array.from()\` is a versatile method for creating arrays from iterables or array-like objects. When combined with a mapping function, it becomes a powerful tool for generating sequences and transforming data.

The syntax \`Array.from({ length: n }, mapFn)\` creates an array of length \`n\`, where each element is generated by calling \`mapFn\` with the index. This is more elegant than loops or \`Array(n).fill().map()\` because it handles the mapping in a single operation.

Key tricks:
- **Sequences**: Generate number sequences, ranges, patterns
- **2D Arrays**: Create grids/matrices by nesting Array.from calls
- **Iterable Conversion**: Convert NodeLists, strings, Sets, Maps to arrays
- **Transformation**: Combine creation and transformation in one step

## Importance

Array.from tricks are essential for array generation because:

- **Sequence Generation**: Create number sequences, date ranges, patterns easily
- **Grid Creation**: Create 2D arrays for game boards, matrices, grids
- **Iterable Conversion**: Convert any iterable to an array for array methods
- **Performance**: More efficient than manual loops for array creation
- **Readability**: Clear intent - "create array from this pattern"
- **Flexibility**: Works with array-like objects (NodeLists, arguments, etc.)

## Usefulness & Practical Applications

These tricks are used extensively:

- **Sequence Generation**: Creating number sequences, date ranges, or custom patterns
- **Grid Generation**: Creating 2D arrays for game boards or grids
- **DOM Manipulation**: Converting NodeLists to arrays for array methods
- **String Processing**: Converting strings to character arrays with transformations
- **Test Data**: Generating test data arrays with specific patterns
- **Pagination**: Creating page number arrays for pagination UI
- **Mock Data**: Generating mock data for development and testing
- **Algorithm Implementation**: Creating arrays for algorithms that need indexed sequences

**Challenge:** Generate sequences, convert NodeLists, and create 2D arrays.`,
    examples: [
      {
        input: `Array.from({ length: 5 }, (_, i) => i)`,
        output: `[0, 1, 2, 3, 4]`,
        explanation: 'Generate sequence of numbers',
      },
    ],
    starterCode: `function range(start, end) {
  // TODO: Generate array from start to end (inclusive)
  // range(1, 5) → [1, 2, 3, 4, 5]

  return [];
}

function createGrid(rows, cols, defaultValue) {
  // TODO: Create 2D array filled with defaultValue
  // createGrid(2, 3, 0) → [[0, 0, 0], [0, 0, 0]]

  return [];
}

function toArray(arrayLike) {
  // TODO: Convert array-like object to real array
  // Works with NodeList, arguments, strings, etc.

  return [];
}

// Test
console.log(range(1, 5));
console.log(createGrid(2, 3, 0));
console.log(toArray('hello'));`,
    solution: `function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function createGrid(rows, cols, defaultValue) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => defaultValue)
  );
}

function toArray(arrayLike) {
  return Array.from(arrayLike);
}`,
    testCases: [
      {
        input: [1, 5],
        expectedOutput: [1, 2, 3, 4, 5],
        description: 'range',
      },
      {
        input: [2, 3, 0],
        expectedOutput: [
          [0, 0, 0],
          [0, 0, 0],
        ],
        description: 'createGrid',
      },
      {
        input: ['hello'],
        expectedOutput: ['h', 'e', 'l', 'l', 'o'],
        description: 'toArray string',
      },
    ],
    hints: [
      'Array.from({ length: n }) creates array of n undefined elements',
      'Second argument (_, index) => value maps each element',
      'For 2D arrays, nest Array.from calls',
    ],
  },
  {
    id: 'sort-comparators',
    title: 'Custom Sort Comparators',
    difficulty: 'medium',
    category: 'Array Methods',
    description: `## In-Depth Explanation

Custom sort comparators allow you to define how elements are ordered. A comparator function takes two elements (\`a\` and \`b\`) and returns:
- **Negative number**: \`a\` comes before \`b\`
- **Zero**: \`a\` and \`b\` are equal (order unchanged)
- **Positive number**: \`a\` comes after \`b\`

For numbers: \`(a, b) => a - b\` sorts ascending, \`(a, b) => b - a\` sorts descending.

Advanced patterns:
- **Multiple Criteria**: Sort by primary field, then secondary field
- **Null Handling**: Put nulls first or last
- **Object Sorting**: Sort objects by property values
- **Case-Insensitive**: Sort strings ignoring case
- **Custom Logic**: Any custom comparison logic

## Importance

Custom comparators are essential for data sorting because:

- **Flexibility**: Sort by any criteria, not just default comparison
- **Object Sorting**: Sort arrays of objects by properties
- **Multiple Criteria**: Sort by multiple fields (e.g., last name, then first name)
- **Edge Cases**: Handle nulls, undefined, special values
- **Localization**: Sort according to locale-specific rules
- **Performance**: Efficient sorting for complex data structures

## Usefulness & Practical Applications

Custom comparators are used everywhere:

- **User Lists**: Sort users by name, age, role, etc.
- **Product Lists**: Sort products by price, rating, name
- **Tables**: Sort table columns in data tables
- **Search Results**: Sort search results by relevance, date, etc.
- **Reports**: Sort report data by various dimensions
- **Leaderboards**: Sort players by score, time, etc.
- **Data Analysis**: Sort data for analysis and visualization
- **UI Components**: Sortable lists, tables, grids

**Challenge:** Sort by multiple criteria, handle nulls, and sort objects.`,
    examples: [
      {
        input: `users.sort((a, b) => a.age - b.age)`,
        output: `Users sorted by age ascending`,
        explanation: 'Numeric sort with subtraction',
      },
    ],
    starterCode: `function sortByProperty(arr, property, order = 'asc') {
  // TODO: Sort array of objects by property
  // order can be 'asc' or 'desc'

  return arr;
}

function sortByMultiple(arr, criteria) {
  // TODO: Sort by multiple criteria
  // criteria = [{ key: 'age', order: 'asc' }, { key: 'name', order: 'desc' }]

  return arr;
}

function sortWithNulls(arr, nullsFirst = true) {
  // TODO: Sort numbers, putting nulls first or last

  return arr;
}

// Test
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 30 }
];
console.log(sortByProperty([...users], 'age', 'asc'));
console.log(sortByMultiple([...users], [
  { key: 'age', order: 'asc' },
  { key: 'name', order: 'asc' }
]));
console.log(sortWithNulls([3, null, 1, null, 2], true));`,
    solution: `function sortByProperty(arr, property, order = 'asc') {
  return [...arr].sort((a, b) => {
    if (a[property] < b[property]) return order === 'asc' ? -1 : 1;
    if (a[property] > b[property]) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

function sortByMultiple(arr, criteria) {
  return [...arr].sort((a, b) => {
    for (const { key, order } of criteria) {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

function sortWithNulls(arr, nullsFirst = true) {
  return [...arr].sort((a, b) => {
    if (a === null && b === null) return 0;
    if (a === null) return nullsFirst ? -1 : 1;
    if (b === null) return nullsFirst ? 1 : -1;
    return a - b;
  });
}`,
    testCases: [
      {
        input: [
          [
            { name: 'John', age: 30 },
            { name: 'Jane', age: 25 },
          ],
          'age',
          'asc',
        ],
        expectedOutput: [
          { name: 'Jane', age: 25 },
          { name: 'John', age: 30 },
        ],
        description: 'sortByProperty age asc',
      },
      {
        input: [[3, null, 1, null, 2], true],
        expectedOutput: [null, null, 1, 2, 3],
        description: 'sortWithNulls nullsFirst',
      },
      {
        input: [[3, null, 1, null, 2], false],
        expectedOutput: [1, 2, 3, null, null],
        description: 'sortWithNulls nullsLast',
      },
    ],
    hints: [
      'Return negative if a < b, positive if a > b, 0 if equal',
      'For descending order, reverse the comparison',
      'Handle null/undefined before comparing values',
    ],
  },
  {
    id: 'string-padding',
    title: 'String Padding and Formatting',
    difficulty: 'easy',
    category: 'String Methods',
    description: `## In-Depth Explanation

\`padStart()\` and \`padEnd()\` add padding characters to strings to reach a specified length. \`padStart()\` adds padding at the beginning (left), \`padEnd()\` adds padding at the end (right).

The syntax: \`str.padStart(targetLength, padString)\`
- \`targetLength\`: Desired length of the resulting string
- \`padString\`: Character(s) to pad with (defaults to space)

Common uses:
- **Leading Zeros**: Format numbers with leading zeros (\`'5'.padStart(2, '0')\` → \`'05'\`)
- **Alignment**: Align text in tables or columns
- **Masking**: Mask sensitive data (credit cards, SSNs)
- **Time Formatting**: Format time as HH:MM:SS
- **ID Formatting**: Format IDs with consistent length

## Importance

String padding is essential for formatting because:

- **Consistency**: Ensure consistent string lengths for display
- **Alignment**: Align text in tables, columns, reports
- **Formatting**: Format numbers, dates, IDs consistently
- **Security**: Mask sensitive information
- **User Experience**: Better formatted output improves UX
- **Data Presentation**: Professional-looking formatted data

## Usefulness & Practical Applications

String padding is used extensively:

- **Time Formatting**: Format time as HH:MM:SS with leading zeros
- **Date Formatting**: Format dates with consistent padding
- **ID Formatting**: Format IDs, order numbers with leading zeros
- **Table Alignment**: Align columns in text tables
- **Currency Formatting**: Right-align currency values
- **Masking**: Mask credit card numbers, phone numbers
- **Logging**: Format log entries with consistent widths
- **Reports**: Format report data with consistent alignment

**Challenge:** Format numbers, create aligned output, and mask strings.`,
    examples: [
      {
        input: `'5'.padStart(2, '0')`,
        output: `'05'`,
        explanation: 'Pad single digit with leading zero',
      },
    ],
    starterCode: `function formatTime(hours, minutes, seconds) {
  // TODO: Format as HH:MM:SS with leading zeros
  // formatTime(9, 5, 3) → '09:05:03'

  return hours + ':' + minutes + ':' + seconds;
}

function maskCardNumber(cardNumber) {
  // TODO: Show only last 4 digits, mask rest with *
  // '1234567890123456' → '************3456'

  return cardNumber;
}

function formatCurrency(amount, width = 10) {
  // TODO: Right-align currency with $ prefix
  // formatCurrency(42.5, 10) → '    $42.50'

  return '$' + amount;
}

// Test
console.log(formatTime(9, 5, 3));
console.log(maskCardNumber('1234567890123456'));
console.log(formatCurrency(42.5, 10));`,
    solution: `function formatTime(hours, minutes, seconds) {
  return [hours, minutes, seconds]
    .map(n => String(n).padStart(2, '0'))
    .join(':');
}

function maskCardNumber(cardNumber) {
  const last4 = cardNumber.slice(-4);
  return last4.padStart(cardNumber.length, '*');
}

function formatCurrency(amount, width = 10) {
  const formatted = '$' + amount.toFixed(2);
  return formatted.padStart(width, ' ');
}`,
    testCases: [
      {
        input: [9, 5, 3],
        expectedOutput: '09:05:03',
        description: 'formatTime',
      },
      {
        input: ['1234567890123456'],
        expectedOutput: '************3456',
        description: 'maskCardNumber',
      },
      {
        input: [42.5, 10],
        expectedOutput: '    $42.50',
        description: 'formatCurrency',
      },
    ],
    hints: [
      'String(num).padStart(2, "0") for leading zeros',
      'slice(-4) gets last 4 characters',
      'toFixed(2) formats decimals, then padStart for alignment',
    ],
  },
  {
    id: 'currying',
    title: 'Function Currying',
    difficulty: 'medium',
    category: 'Functional Programming',
    description: `## In-Depth Explanation

Currying transforms a function that takes multiple arguments into a sequence of functions, each taking a single argument. Instead of \`f(a, b, c)\`, you get \`f(a)(b)(c)\`. Each function returns another function until all arguments are provided.

Currying enables:
- **Partial Application**: Apply some arguments now, others later
- **Function Composition**: Easier to compose functions
- **Reusability**: Create specialized functions from general ones
- **Functional Style**: Enables point-free programming

The key insight is that curried functions are more flexible - you can partially apply arguments to create new functions, making code more reusable and composable.

## Importance

Currying is fundamental to functional programming because:

- **Partial Application**: Create specialized functions from general ones
- **Function Composition**: Easier to compose and chain functions
- **Code Reusability**: Write more generic, reusable functions
- **Functional Style**: Enables functional programming patterns
- **Library Design**: Many functional libraries use currying
- **Testability**: Easier to test functions with partial application

## Usefulness & Practical Applications

Currying is used extensively in functional programming:

- **Event Handlers**: \`const handleClick = handleEvent('click')\`
- **API Calls**: \`const getUser = apiCall('/users')\`
- **Validation**: \`const validateEmail = validate('email')\`
- **Configuration**: \`const createLogger = logger(config)\`
- **Data Transformation**: Creating reusable transformation functions
- **Functional Libraries**: Lodash, Ramda use currying extensively
- **React Hooks**: Custom hooks often use currying patterns
- **Middleware**: Express.js middleware uses currying

**Challenge:** Create curried functions and a generic curry utility.`,
    examples: [
      {
        input: `const add = a => b => a + b; add(2)(3)`,
        output: `5`,
        explanation: 'Curried add function',
      },
    ],
    starterCode: `// TODO: Create a curried multiply function
// multiply(2)(3)(4) should return 24
function multiply(a) {
  return a;
}

// TODO: Create a curried function to create greeting messages
// greet('Hello')('World') → 'Hello, World!'
function greet(greeting) {
  return greeting;
}

// TODO: Create a generic curry function for 2-argument functions
// const curriedAdd = curry2((a, b) => a + b);
// curriedAdd(2)(3) → 5
function curry2(fn) {
  return fn;
}

// Test
console.log(multiply(2)(3)(4));
console.log(greet('Hello')('World'));
const curriedAdd = curry2((a, b) => a + b);
console.log(curriedAdd(2)(3));`,
    solution: `function multiply(a) {
  return function(b) {
    return function(c) {
      return a * b * c;
    };
  };
}

function greet(greeting) {
  return function(name) {
    return greeting + ', ' + name + '!';
  };
}

function curry2(fn) {
  return function(a) {
    return function(b) {
      return fn(a, b);
    };
  };
}`,
    testCases: [
      {
        input: [],
        expectedOutput: 24,
        description: 'multiply(2)(3)(4)',
      },
      {
        input: [],
        expectedOutput: 'Hello, World!',
        description: 'greet(Hello)(World)',
      },
      {
        input: [],
        expectedOutput: 5,
        description: 'curry2 add',
      },
    ],
    hints: [
      'Return a function that returns a function',
      'Each returned function captures the previous argument',
      'Arrow functions make this concise: a => b => a + b',
    ],
  },
  {
    id: 'memoization',
    title: 'Function Memoization',
    difficulty: 'medium',
    category: 'Functional Programming',
    description: `## In-Depth Explanation

Memoization caches function results based on arguments, avoiding redundant calculations. When a memoized function is called with the same arguments, it returns the cached result instead of recalculating.

The pattern:
1. Check if result exists in cache for given arguments
2. If yes, return cached result
3. If no, compute result, store in cache, return result

Memoization is particularly powerful for:
- **Recursive Functions**: Dramatically speeds up recursive algorithms (like Fibonacci)
- **Expensive Calculations**: Caching results of expensive operations
- **Pure Functions**: Works best with pure functions (same input → same output)
- **API Calls**: Caching API responses (with expiration)

## Importance

Memoization is essential for performance optimization because:

- **Performance**: Dramatically speeds up expensive calculations
- **Recursive Algorithms**: Essential for efficient recursive functions
- **Resource Efficiency**: Reduces CPU usage and API calls
- **User Experience**: Faster response times improve UX
- **Cost Reduction**: Fewer API calls reduce costs
- **Scalability**: Enables applications to handle more load

## Usefulness & Practical Applications

Memoization is used extensively:

- **Recursive Algorithms**: Fibonacci, factorial, dynamic programming
- **API Caching**: Caching API responses to reduce network calls
- **Expensive Calculations**: Mathematical computations, data processing
- **React**: React.memo, useMemo for component and value memoization
- **GraphQL**: Field-level caching in GraphQL resolvers
- **Image Processing**: Caching processed images
- **Data Transformation**: Caching transformed data
- **Search Results**: Caching search results

**Challenge:** Implement memoization for expensive calculations.`,
    examples: [
      {
        input: `const memoFib = memoize(fib); memoFib(40)`,
        output: `Fast result (cached)`,
        explanation: 'Subsequent calls use cached value',
      },
    ],
    starterCode: `// TODO: Create a memoize function that caches results
// Only works for single-argument functions for simplicity
function memoize(fn) {
  // Create cache (Map or object)
  // Return function that checks cache before calling fn

  return fn;
}

// Test with fibonacci
function slowFib(n) {
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
}

// TODO: Create memoized fibonacci that's actually fast
function fastFib(n, memo = {}) {
  // Use memo object to cache results
  if (n <= 1) return n;
  return fastFib(n - 1) + fastFib(n - 2);
}

// Test
const memoizedFib = memoize(n => {
  if (n <= 1) return n;
  return memoizedFib(n - 1) + memoizedFib(n - 2);
});

console.log(memoizedFib(10));
console.log(fastFib(10));`,
    solution: `function memoize(fn) {
  const cache = new Map();
  return function(arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

function fastFib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fastFib(n - 1, memo) + fastFib(n - 2, memo);
  return memo[n];
}`,
    testCases: [
      {
        input: [10],
        expectedOutput: 55,
        description: 'memoizedFib(10)',
      },
      {
        input: [10],
        expectedOutput: 55,
        description: 'fastFib(10)',
      },
      {
        input: [20],
        expectedOutput: 6765,
        description: 'fastFib(20)',
      },
    ],
    hints: [
      'Use Map for cache: cache.has(key), cache.get(key), cache.set(key, value)',
      'Check cache before computing',
      'For recursive functions, pass memo object as parameter',
    ],
  };
