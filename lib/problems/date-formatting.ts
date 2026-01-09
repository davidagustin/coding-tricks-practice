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
  id: 'date-formatting',
  title: 'Date Formatting with Intl.DateTimeFormat',
  difficulty: 'medium',
  category: 'Date & Time',
  description: `<h2>In-Depth Explanation</h2>

<p>The <code>Intl.DateTimeFormat</code> API provides language-sensitive date and time formatting. It's the modern, standardized way to format dates in JavaScript, supporting internationalization (i18n) out of the box.</p>

<p>Basic usage:</p>
<pre><code>const formatter = new Intl.DateTimeFormat('en-US', options);
formatter.format(date);  // Returns formatted string</code></pre>

<p>Common locale codes:</p>
<ul>
  <li><code>'en-US'</code> - English (United States): MM/DD/YYYY</li>
  <li><code>'en-GB'</code> - English (United Kingdom): DD/MM/YYYY</li>
  <li><code>'de-DE'</code> - German: DD.MM.YYYY</li>
  <li><code>'ja-JP'</code> - Japanese: YYYY/MM/DD</li>
  <li><code>'fr-FR'</code> - French: DD/MM/YYYY</li>
</ul>

<p>Key formatting options:</p>
<ul>
  <li><code>dateStyle</code>: 'full', 'long', 'medium', 'short'</li>
  <li><code>timeStyle</code>: 'full', 'long', 'medium', 'short'</li>
  <li><code>year</code>: 'numeric', '2-digit'</li>
  <li><code>month</code>: 'numeric', '2-digit', 'long', 'short', 'narrow'</li>
  <li><code>day</code>: 'numeric', '2-digit'</li>
  <li><code>weekday</code>: 'long', 'short', 'narrow'</li>
  <li><code>hour</code>, <code>minute</code>, <code>second</code>: 'numeric', '2-digit'</li>
  <li><code>hour12</code>: true (12-hour) or false (24-hour)</li>
  <li><code>timeZone</code>: 'UTC', 'America/New_York', etc.</li>
</ul>

<h2>Importance</h2>

<p>Proper date formatting is crucial because:</p>

<ul>
  <li><strong>User Experience</strong>: Users expect dates in their local format</li>
  <li><strong>Internationalization</strong>: Global apps need locale-aware formatting</li>
  <li><strong>Accessibility</strong>: Clear date formats reduce confusion</li>
  <li><strong>Standards Compliance</strong>: Built-in browser API, no library needed</li>
  <li><strong>Performance</strong>: Native implementation is fast and efficient</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Intl.DateTimeFormat is used in:</p>

<ul>
  <li><strong>Multi-language Apps</strong>: Display dates in user's preferred format</li>
  <li><strong>Reports</strong>: Generate consistently formatted date columns</li>
  <li><strong>Event Listings</strong>: Show event dates and times clearly</li>
  <li><strong>E-commerce</strong>: Order dates, delivery estimates</li>
  <li><strong>Social Features</strong>: Post timestamps, birthdays</li>
  <li><strong>Calendars</strong>: Month/day names in local language</li>
  <li><strong>Forms</strong>: Date input placeholders and validation messages</li>
</ul>

<p><strong>Challenge:</strong> Create formatting functions using Intl.DateTimeFormat for various use cases.</p>`,
  examples: [
    {
      input: `new Intl.DateTimeFormat('en-US').format(new Date(2024, 0, 15))`,
      output: `"1/15/2024"`,
      explanation: 'US format: month/day/year',
    },
    {
      input: `new Intl.DateTimeFormat('en-GB').format(new Date(2024, 0, 15))`,
      output: `"15/01/2024"`,
      explanation: 'UK format: day/month/year',
    },
    {
      input: `new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(date)`,
      output: `"Monday, January 15, 2024"`,
      explanation: 'Full date style includes weekday and full month name',
    },
  ],
  starterCode: `// TODO: Format a date for display in different locales
function formatDateForLocale(date, locale) {
  // Example: formatDateForLocale(new Date(2024, 0, 15), 'en-US') => "1/15/2024"
  // Example: formatDateForLocale(new Date(2024, 0, 15), 'en-GB') => "15/01/2024"

  return '';
}

// TODO: Format a date with full details (weekday, month name, day, year)
function formatFullDate(date, locale) {
  // Example: formatFullDate(new Date(2024, 0, 15), 'en-US')
  // => "Monday, January 15, 2024"

  return '';
}

// TODO: Format time only (hours, minutes, seconds with AM/PM or 24-hour)
function formatTime(date, locale, use24Hour = false) {
  // Example: formatTime(new Date(2024, 0, 15, 14, 30, 0), 'en-US', false)
  // => "2:30:00 PM"
  // Example: formatTime(new Date(2024, 0, 15, 14, 30, 0), 'en-US', true)
  // => "14:30:00"

  return '';
}

// TODO: Format a relative date/time (e.g., "in 2 days", "3 months ago")
// Use Intl.RelativeTimeFormat
function formatRelativeTime(value, unit, locale) {
  // Example: formatRelativeTime(-1, 'day', 'en-US') => "1 day ago"
  // Example: formatRelativeTime(2, 'month', 'en-US') => "in 2 months"
  // unit can be: 'second', 'minute', 'hour', 'day', 'week', 'month', 'year'

  return '';
}

// TODO: Get month names in a specific locale
function getMonthNames(locale, style = 'long') {
  // Example: getMonthNames('en-US', 'long')
  // => ['January', 'February', ..., 'December']
  // Example: getMonthNames('en-US', 'short')
  // => ['Jan', 'Feb', ..., 'Dec']

  return [];
}

// TODO: Format a date range (from date to date)
function formatDateRange(startDate, endDate, locale) {
  // Example: formatDateRange(new Date(2024, 0, 15), new Date(2024, 0, 20), 'en-US')
  // => "1/15/2024 – 1/20/2024"
  // Use formatRange if available, otherwise format both and join

  return '';
}

// Test
const testDate = new Date(2024, 0, 15, 14, 30, 0);
console.log(formatDateForLocale(testDate, 'en-US'));
console.log(formatDateForLocale(testDate, 'en-GB'));
console.log(formatFullDate(testDate, 'en-US'));
console.log(formatTime(testDate, 'en-US', false));
console.log(formatTime(testDate, 'en-US', true));
console.log(formatRelativeTime(-1, 'day', 'en-US'));
console.log(getMonthNames('en-US', 'short'));`,
  solution: `// Format a date for display in different locales
function formatDateForLocale(date, locale) {
  // Example: formatDateForLocale(new Date(2024, 0, 15), 'en-US') => "1/15/2024"
  // Example: formatDateForLocale(new Date(2024, 0, 15), 'en-GB') => "15/01/2024"
  const formatter = new Intl.DateTimeFormat(locale);
  return formatter.format(date);
}

// Format a date with full details (weekday, month name, day, year)
function formatFullDate(date, locale) {
  // Example: formatFullDate(new Date(2024, 0, 15), 'en-US')
  // => "Monday, January 15, 2024"
  const formatter = new Intl.DateTimeFormat(locale, { dateStyle: 'full' });
  return formatter.format(date);
}

// Format time only (hours, minutes, seconds with AM/PM or 24-hour)
function formatTime(date, locale, use24Hour = false) {
  // Example: formatTime(new Date(2024, 0, 15, 14, 30, 0), 'en-US', false)
  // => "2:30:00 PM"
  // Example: formatTime(new Date(2024, 0, 15, 14, 30, 0), 'en-US', true)
  // => "14:30:00"
  const formatter = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: !use24Hour
  });
  return formatter.format(date);
}

// Format a relative date/time (e.g., "in 2 days", "3 months ago")
// Use Intl.RelativeTimeFormat
function formatRelativeTime(value, unit, locale) {
  // Example: formatRelativeTime(-1, 'day', 'en-US') => "1 day ago"
  // Example: formatRelativeTime(2, 'month', 'en-US') => "in 2 months"
  // unit can be: 'second', 'minute', 'hour', 'day', 'week', 'month', 'year'
  const rtf = new Intl.RelativeTimeFormat(locale);
  return rtf.format(value, unit);
}

// Get month names in a specific locale
function getMonthNames(locale, style = 'long') {
  // Example: getMonthNames('en-US', 'long')
  // => ['January', 'February', ..., 'December']
  // Example: getMonthNames('en-US', 'short')
  // => ['Jan', 'Feb', ..., 'Dec']
  const formatter = new Intl.DateTimeFormat(locale, { month: style });
  const months = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(2024, i, 1);
    months.push(formatter.formatToParts(date).find(part => part.type === 'month').value);
  }
  return months;
}

// Format a date range (from date to date)
function formatDateRange(startDate, endDate, locale) {
  // Example: formatDateRange(new Date(2024, 0, 15), new Date(2024, 0, 20), 'en-US')
  // => "1/15/2024 – 1/20/2024"
  // Use formatRange if available, otherwise format both and join
  const formatter = new Intl.DateTimeFormat(locale);
  if (formatter.formatRange) {
    return formatter.formatRange(startDate, endDate);
  }
  return \`\${formatter.format(startDate)} – \${formatter.format(endDate)}\`;
}

function formatRelativeTime(value, unit, locale) {
  // Format a relative date/time (e.g., "in 2 days", "3 months ago")
  // Use Intl.RelativeTimeFormat
  const rtf = new Intl.RelativeTimeFormat(locale);
  return rtf.format(value, unit);
}`,
  testCases: [
    {
      input: ['2024-01-15T00:00:00Z'],
      expectedOutput: '2024-01-15T00:00:00.000Z',
      description: 'formatDateUTC returns ISO string for UTC date',
    },
    {
      input: ['2024-01-15T00:00:00Z'],
      expectedOutput: { year: 2024, month: 1, day: 15 },
      description: 'getDateParts extracts UTC date components',
    },
    {
      input: ['2024-06-20T00:00:00Z'],
      expectedOutput: { year: 2024, month: 6, day: 20 },
      description: 'getDateParts extracts UTC date components for mid-year date',
    },
    {
      input: ['2024-01-15T14:30:45Z'],
      expectedOutput: { hours: 14, minutes: 30, seconds: 45 },
      description: 'getTimeParts extracts UTC time components',
    },
    {
      input: ['2024-01-15T00:00:00Z'],
      expectedOutput: '2024-01-15',
      description: 'formatDateISO returns YYYY-MM-DD format',
    },
    {
      input: ['2024-01-15T14:30:45Z'],
      expectedOutput: '14:30:45',
      description: 'formatTimeISO returns HH:MM:SS format',
    },
    {
      input: [-1, 'day', 'en-US'],
      expectedOutput: '1 day ago',
      description: 'formatRelativeTime shows past time for negative value',
    },
    {
      input: [2, 'month', 'en-US'],
      expectedOutput: 'in 2 months',
      description: 'formatRelativeTime shows future time for positive value',
    },
    {
      input: [],
      expectedOutput: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      description: 'getMonthNamesUTC returns all 12 month names',
    },
    {
      input: [],
      expectedOutput: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      description: 'getMonthNamesShortUTC returns all 12 abbreviated month names',
    },
  ],
  hints: [
    'Use new Intl.DateTimeFormat(locale, options).format(date) for consistent formatting',
    'dateStyle and timeStyle provide preset formats: "full", "long", "medium", "short"',
    'For 24-hour time, set hour12: false in the options',
    'Intl.RelativeTimeFormat handles "ago" vs "in X" automatically based on sign',
    'To get month names, create a date for each month and format with { month: style }',
    'formatRange() creates nicely formatted date ranges, but check for browser support',
  ],
};
