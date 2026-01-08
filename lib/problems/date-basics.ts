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
  id: 'date-basics',
  title: 'Date Object Basics: Creation, Getters, and Setters',
  difficulty: 'easy',
  category: 'Date & Time',
  description: `<h2>In-Depth Explanation</h2>

<p>The JavaScript <code>Date</code> object represents a single moment in time. It stores the number of milliseconds since January 1, 1970, 00:00:00 UTC (the Unix Epoch). Understanding how to create and manipulate Date objects is fundamental to working with dates and times in JavaScript.</p>

<p>There are several ways to create a Date object:</p>
<ul>
  <li><code>new Date()</code> - Current date and time</li>
  <li><code>new Date(milliseconds)</code> - Milliseconds since Unix Epoch</li>
  <li><code>new Date(dateString)</code> - Parse a date string</li>
  <li><code>new Date(year, month, day, hours, minutes, seconds, ms)</code> - Specific components (month is 0-indexed!)</li>
</ul>

<p>Key getter methods:</p>
<ul>
  <li><code>getFullYear()</code> - Returns the 4-digit year</li>
  <li><code>getMonth()</code> - Returns month (0-11, January is 0)</li>
  <li><code>getDate()</code> - Returns day of month (1-31)</li>
  <li><code>getDay()</code> - Returns day of week (0-6, Sunday is 0)</li>
  <li><code>getHours()</code>, <code>getMinutes()</code>, <code>getSeconds()</code>, <code>getMilliseconds()</code></li>
  <li><code>getTime()</code> - Returns milliseconds since Unix Epoch</li>
</ul>

<p>Key setter methods:</p>
<ul>
  <li><code>setFullYear(year)</code>, <code>setMonth(month)</code>, <code>setDate(day)</code></li>
  <li><code>setHours(h)</code>, <code>setMinutes(m)</code>, <code>setSeconds(s)</code>, <code>setMilliseconds(ms)</code></li>
  <li><code>setTime(milliseconds)</code></li>
</ul>

<h2>Importance</h2>

<p>Mastering Date object basics is essential because:</p>

<ul>
  <li><strong>Universal Need</strong>: Almost every application deals with dates in some form</li>
  <li><strong>Foundation</strong>: Understanding the basics is required before advanced date manipulation</li>
  <li><strong>Common Pitfalls</strong>: The 0-indexed month is a frequent source of bugs</li>
  <li><strong>Data Processing</strong>: Parsing and formatting dates is a common task</li>
  <li><strong>Scheduling</strong>: Building calendars, reminders, and scheduling features</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Date basics are used in:</p>

<ul>
  <li><strong>User Interfaces</strong>: Displaying formatted dates to users</li>
  <li><strong>Form Validation</strong>: Validating date inputs (birthdays, expiration dates)</li>
  <li><strong>Age Calculation</strong>: Computing age from birthdate</li>
  <li><strong>Timestamps</strong>: Recording when events occurred</li>
  <li><strong>Scheduling Systems</strong>: Calendar applications, booking systems</li>
  <li><strong>Data Analysis</strong>: Grouping and filtering data by date</li>
  <li><strong>Logging</strong>: Adding timestamps to log entries</li>
</ul>

<p><strong>Challenge:</strong> Implement functions to extract date components, create dates from parts, and calculate age.</p>`,
  examples: [
    {
      input: `new Date(2024, 0, 15)`,
      output: `January 15, 2024`,
      explanation: 'Month 0 is January (0-indexed)',
    },
    {
      input: `date.getFullYear()`,
      output: `2024`,
      explanation: 'Returns the 4-digit year',
    },
    {
      input: `date.getDay()`,
      output: `0-6`,
      explanation: 'Returns day of week (0 = Sunday, 6 = Saturday)',
    },
  ],
  starterCode: `// TODO: Extract date components from a Date object
// Return an object with year, month (1-indexed!), day, dayOfWeek
function extractDateParts(date) {
  // Example: extractDateParts(new Date(2024, 0, 15))
  // Should return { year: 2024, month: 1, day: 15, dayOfWeek: 'Monday' }

  return {};
}

// TODO: Create a Date from individual components
// month should be 1-indexed (1 = January) for user-friendliness
function createDate(year, month, day) {
  // Example: createDate(2024, 1, 15) should create January 15, 2024
  // Remember: Date constructor uses 0-indexed months!

  return new Date();
}

// TODO: Calculate age in years from a birthdate
function calculateAge(birthDate, currentDate) {
  // Example: calculateAge(new Date(1990, 5, 15), new Date(2024, 5, 15))
  // Should return 34
  // Note: Must handle case where birthday hasn't occurred yet this year

  return 0;
}

// TODO: Check if a year is a leap year
function isLeapYear(year) {
  // Leap year rules:
  // - Divisible by 4
  // - BUT not divisible by 100
  // - UNLESS also divisible by 400

  return false;
}

// TODO: Get the number of days in a given month
function getDaysInMonth(year, month) {
  // month is 1-indexed (1 = January)
  // Must account for leap years in February

  return 0;
}

// Test
console.log(extractDateParts(new Date(2024, 0, 15)));
console.log(createDate(2024, 1, 15));
console.log(calculateAge(new Date(1990, 5, 15), new Date(2024, 5, 15)));
console.log(isLeapYear(2024));
console.log(getDaysInMonth(2024, 2));`,
  solution: `function extractDateParts(date) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,  // Convert from 0-indexed to 1-indexed
    day: date.getDate(),
    dayOfWeek: dayNames[date.getDay()]
  };
}

function createDate(year, month, day) {
  // Convert 1-indexed month to 0-indexed for Date constructor
  return new Date(year, month - 1, day);
}

function calculateAge(birthDate, currentDate) {
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();

  // If birthday hasn't occurred yet this year, subtract 1
  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

function isLeapYear(year) {
  // Divisible by 4, but not by 100, unless also by 400
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDaysInMonth(year, month) {
  // Create a date for the first day of the NEXT month, then go back one day
  // This uses Date's automatic overflow handling
  return new Date(year, month, 0).getDate();
}`,
  testCases: [
    {
      input: [new Date(2024, 0, 15)],
      expectedOutput: { year: 2024, month: 1, day: 15, dayOfWeek: 'Monday' },
      description: 'extractDateParts correctly extracts components from January 15, 2024',
    },
    {
      input: [new Date(2023, 11, 25)],
      expectedOutput: { year: 2023, month: 12, day: 25, dayOfWeek: 'Monday' },
      description: 'extractDateParts handles December (month 11) correctly',
    },
    {
      input: [2024, 1, 15],
      expectedOutput: new Date(2024, 0, 15).getTime(),
      description: 'createDate creates correct date from 1-indexed month',
    },
    {
      input: [new Date(1990, 5, 15), new Date(2024, 5, 15)],
      expectedOutput: 34,
      description: 'calculateAge returns exact age when birthday is today',
    },
    {
      input: [new Date(1990, 5, 15), new Date(2024, 4, 15)],
      expectedOutput: 33,
      description: 'calculateAge returns age minus 1 when birthday has not occurred yet',
    },
    {
      input: [2024],
      expectedOutput: true,
      description: 'isLeapYear returns true for 2024 (divisible by 4)',
    },
    {
      input: [1900],
      expectedOutput: false,
      description: 'isLeapYear returns false for 1900 (divisible by 100 but not 400)',
    },
    {
      input: [2000],
      expectedOutput: true,
      description: 'isLeapYear returns true for 2000 (divisible by 400)',
    },
    {
      input: [2024, 2],
      expectedOutput: 29,
      description: 'getDaysInMonth returns 29 for February 2024 (leap year)',
    },
    {
      input: [2023, 2],
      expectedOutput: 28,
      description: 'getDaysInMonth returns 28 for February 2023 (non-leap year)',
    },
  ],
  hints: [
    'Remember that getMonth() returns 0-11, so add 1 for human-readable months',
    'When creating a Date, subtract 1 from a 1-indexed month to get the correct 0-indexed value',
    'For age calculation, check if the birthday has occurred by comparing month and day',
    'Use new Date(year, month, 0).getDate() to get the last day of the previous month (which is the number of days in month-1)',
    'Leap year: divisible by 4 AND (not divisible by 100 OR divisible by 400)',
  ],
};
