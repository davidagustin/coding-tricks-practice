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
  id: 'date-arithmetic',
  title: 'Date Arithmetic: Adding, Subtracting, and Comparing Dates',
  difficulty: 'medium',
  category: 'Date & Time',
  description: `<h2>In-Depth Explanation</h2>

<p>Date arithmetic involves adding or subtracting time units from dates, calculating differences between dates, and comparing dates. JavaScript's Date object stores time as milliseconds since the Unix Epoch, making arithmetic operations possible through simple math.</p>

<p>Key concepts for date arithmetic:</p>
<ul>
  <li><strong>Millisecond-based math</strong>: Add/subtract milliseconds directly using <code>getTime()</code> and <code>setTime()</code></li>
  <li><strong>Component-based math</strong>: Use setters with overflow (e.g., <code>setDate(date.getDate() + 7)</code> automatically handles month changes)</li>
  <li><strong>Time constants</strong>: 1 day = 86,400,000 ms, 1 hour = 3,600,000 ms, 1 minute = 60,000 ms</li>
</ul>

<p>Date comparison methods:</p>
<ul>
  <li><strong>Direct comparison</strong>: <code>date1 < date2</code> (dates are compared as numbers)</li>
  <li><strong>Equality</strong>: Use <code>date1.getTime() === date2.getTime()</code> (not <code>===</code> directly)</li>
  <li><strong>Same day check</strong>: Compare year, month, and date components</li>
</ul>

<p>Important caveats:</p>
<ul>
  <li>Date objects are mutable - methods like setDate() modify the original</li>
  <li>Adding months can produce unexpected results (Jan 31 + 1 month = Mar 3)</li>
  <li>Daylight Saving Time can affect calculations based on hours</li>
</ul>

<h2>Importance</h2>

<p>Date arithmetic is essential because:</p>

<ul>
  <li><strong>Scheduling</strong>: Calculate future dates for appointments, deadlines, reminders</li>
  <li><strong>Duration Calculation</strong>: Find time between events (age, tenure, countdown)</li>
  <li><strong>Business Logic</strong>: Subscription periods, trial expirations, payment schedules</li>
  <li><strong>Data Analysis</strong>: Time-based filtering, grouping, and aggregation</li>
  <li><strong>UI Features</strong>: "X days ago", countdown timers, calendar navigation</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Date arithmetic is used in:</p>

<ul>
  <li><strong>E-commerce</strong>: Delivery date estimates, return windows</li>
  <li><strong>Social Media</strong>: "Posted 3 hours ago" relative timestamps</li>
  <li><strong>Project Management</strong>: Sprint planning, deadline tracking</li>
  <li><strong>Healthcare</strong>: Appointment scheduling, medication reminders</li>
  <li><strong>Finance</strong>: Interest calculations, payment due dates</li>
  <li><strong>Events</strong>: Countdown to events, booking systems</li>
  <li><strong>Analytics</strong>: Date range queries, period comparisons</li>
</ul>

<p><strong>Challenge:</strong> Implement functions to add/subtract time, calculate differences, and compare dates.</p>`,
  examples: [
    {
      input: `addDays(new Date(2024, 0, 15), 30)`,
      output: `February 14, 2024`,
      explanation: 'Adding 30 days to January 15 crosses into February',
    },
    {
      input: `daysBetween(new Date(2024, 0, 1), new Date(2024, 11, 31))`,
      output: `365`,
      explanation: '2024 is a leap year, so 366 days minus 1 = 365 days between',
    },
  ],
  starterCode: `// TODO: Add a specified number of days to a date
// Return a NEW Date object (don't mutate the original)
function addDays(date, days) {
  // Example: addDays(new Date(2024, 0, 15), 30)
  // Should return a new Date for February 14, 2024

  return date;
}

// TODO: Subtract days from a date
function subtractDays(date, days) {
  // Example: subtractDays(new Date(2024, 0, 15), 20)
  // Should return December 26, 2023

  return date;
}

// TODO: Calculate the number of days between two dates
function daysBetween(date1, date2) {
  // Example: daysBetween(new Date(2024, 0, 1), new Date(2024, 0, 31))
  // Should return 30 (not including the start date)

  return 0;
}

// TODO: Add months to a date (handle edge cases!)
function addMonths(date, months) {
  // Example: addMonths(new Date(2024, 0, 31), 1)
  // January 31 + 1 month should be February 29, 2024 (leap year)
  // NOT March 2! Handle month-end overflow properly.

  return date;
}

// TODO: Check if date1 is before date2
function isBefore(date1, date2) {
  // Example: isBefore(new Date(2024, 0, 1), new Date(2024, 0, 2))
  // Should return true

  return false;
}

// TODO: Check if two dates are the same calendar day
function isSameDay(date1, date2) {
  // Example: isSameDay(new Date(2024, 0, 15, 10, 30), new Date(2024, 0, 15, 22, 45))
  // Should return true (same day, different times)

  return false;
}

// TODO: Get the start of the day (midnight) for a date
function startOfDay(date) {
  // Example: startOfDay(new Date(2024, 0, 15, 14, 30, 45))
  // Should return January 15, 2024 00:00:00.000

  return date;
}

// Test
console.log(addDays(new Date(2024, 0, 15), 30));
console.log(subtractDays(new Date(2024, 0, 15), 20));
console.log(daysBetween(new Date(2024, 0, 1), new Date(2024, 0, 31)));
console.log(addMonths(new Date(2024, 0, 31), 1));
console.log(isBefore(new Date(2024, 0, 1), new Date(2024, 0, 2)));
console.log(isSameDay(new Date(2024, 0, 15, 10, 30), new Date(2024, 0, 15, 22, 45)));`,
  solution: `function addDays(date, days) {
  const result = new Date(date);  // Clone to avoid mutation
  result.setDate(result.getDate() + days);
  return result;
}

function subtractDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

function daysBetween(date1, date2) {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  // Use UTC to avoid DST issues
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.abs(Math.floor((utc2 - utc1) / MS_PER_DAY));
}

function addMonths(date, months) {
  const result = new Date(date);
  const originalDay = result.getDate();

  result.setMonth(result.getMonth() + months);

  // Handle month-end overflow (e.g., Jan 31 + 1 month shouldn't be Mar 3)
  // If the day changed, we overflowed - go back to last day of intended month
  if (result.getDate() !== originalDay) {
    result.setDate(0);  // Sets to last day of previous month
  }

  return result;
}

function isBefore(date1, date2) {
  return date1.getTime() < date2.getTime();
}

function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}

function startOfDay(date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}`,
  testCases: [
    {
      input: [new Date(2024, 0, 15), 30],
      expectedOutput: new Date(2024, 1, 14).getTime(),
      description: 'addDays: Adding 30 days to Jan 15 gives Feb 14',
    },
    {
      input: [new Date(2024, 0, 15), 365],
      expectedOutput: new Date(2025, 0, 14).getTime(),
      description: 'addDays: Adding 365 days crosses year boundary correctly',
    },
    {
      input: [new Date(2024, 0, 15), 20],
      expectedOutput: new Date(2023, 11, 26).getTime(),
      description: 'subtractDays: Subtracting 20 days from Jan 15, 2024 gives Dec 26, 2023',
    },
    {
      input: [new Date(2024, 0, 1), new Date(2024, 0, 31)],
      expectedOutput: 30,
      description: 'daysBetween: 30 days between Jan 1 and Jan 31',
    },
    {
      input: [new Date(2024, 0, 1), new Date(2024, 11, 31)],
      expectedOutput: 365,
      description: 'daysBetween: 365 days between Jan 1 and Dec 31, 2024 (leap year)',
    },
    {
      input: [new Date(2024, 0, 31), 1],
      expectedOutput: new Date(2024, 1, 29).getTime(),
      description: 'addMonths: Jan 31 + 1 month = Feb 29 (leap year, clamped to last day)',
    },
    {
      input: [new Date(2023, 0, 31), 1],
      expectedOutput: new Date(2023, 1, 28).getTime(),
      description: 'addMonths: Jan 31 + 1 month = Feb 28 (non-leap year, clamped)',
    },
    {
      input: [new Date(2024, 0, 1), new Date(2024, 0, 2)],
      expectedOutput: true,
      description: 'isBefore: Jan 1 is before Jan 2',
    },
    {
      input: [new Date(2024, 0, 2), new Date(2024, 0, 1)],
      expectedOutput: false,
      description: 'isBefore: Jan 2 is not before Jan 1',
    },
    {
      input: [new Date(2024, 0, 15, 10, 30), new Date(2024, 0, 15, 22, 45)],
      expectedOutput: true,
      description: 'isSameDay: Same day with different times returns true',
    },
    {
      input: [new Date(2024, 0, 15, 23, 59), new Date(2024, 0, 16, 0, 1)],
      expectedOutput: false,
      description: 'isSameDay: Different days (just after midnight) returns false',
    },
  ],
  hints: [
    'Always clone the date with new Date(originalDate) before modifying to avoid mutation',
    'setDate() automatically handles month overflow - setDate(32) on a 31-day month goes to the next month',
    'For accurate day calculations, use Date.UTC() to avoid Daylight Saving Time issues',
    'When adding months, check if the day changed after setMonth() - if so, you overflowed and need to clamp',
    'Use setDate(0) to set to the last day of the previous month (useful for clamping)',
    'Compare dates with getTime() for equality - direct === compares object references, not values',
  ],
};
