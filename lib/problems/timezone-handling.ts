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
  id: 'timezone-handling',
  title: 'Handling Timezones and UTC',
  difficulty: 'hard',
  category: 'Date & Time',
  description: `<h2>In-Depth Explanation</h2>

<p>Timezone handling is one of the most challenging aspects of date/time programming. JavaScript Date objects always store time in UTC internally, but display methods use the local timezone by default. Understanding this distinction is crucial for building reliable applications.</p>

<p>Key concepts:</p>
<ul>
  <li><strong>UTC (Coordinated Universal Time)</strong>: The primary time standard, unaffected by timezones or DST</li>
  <li><strong>Local Time</strong>: The time in the user's current timezone</li>
  <li><strong>Timezone Offset</strong>: Difference between local time and UTC (e.g., UTC-5 for EST)</li>
  <li><strong>ISO 8601</strong>: Standard date format (<code>2024-01-15T14:30:00Z</code> or <code>2024-01-15T14:30:00-05:00</code>)</li>
</ul>

<p>UTC methods on Date:</p>
<ul>
  <li><code>getUTCFullYear()</code>, <code>getUTCMonth()</code>, <code>getUTCDate()</code></li>
  <li><code>getUTCHours()</code>, <code>getUTCMinutes()</code>, <code>getUTCSeconds()</code></li>
  <li><code>setUTCFullYear()</code>, <code>setUTCMonth()</code>, etc.</li>
  <li><code>toISOString()</code> - Returns UTC time in ISO format</li>
  <li><code>toUTCString()</code> - Returns UTC time as a string</li>
  <li><code>getTimezoneOffset()</code> - Returns offset in minutes from UTC</li>
</ul>

<p>Best practices:</p>
<ul>
  <li>Store dates in UTC on servers and databases</li>
  <li>Convert to local time only for display</li>
  <li>Use ISO 8601 format for data exchange</li>
  <li>Be aware of DST transitions when scheduling</li>
</ul>

<h2>Importance</h2>

<p>Proper timezone handling is critical because:</p>

<ul>
  <li><strong>Global Applications</strong>: Users span multiple timezones</li>
  <li><strong>Data Integrity</strong>: Incorrect timezone handling corrupts timestamps</li>
  <li><strong>Scheduling</strong>: Meetings, events must work across timezones</li>
  <li><strong>Legal Requirements</strong>: Financial timestamps must be accurate</li>
  <li><strong>Debugging</strong>: Timezone bugs are notoriously hard to find and fix</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Timezone handling is essential in:</p>

<ul>
  <li><strong>Video Conferencing</strong>: Show meeting times in each participant's timezone</li>
  <li><strong>E-commerce</strong>: Order timestamps, delivery windows</li>
  <li><strong>Flight Booking</strong>: Departure/arrival times in different timezones</li>
  <li><strong>Social Media</strong>: "Posted at" timestamps for global users</li>
  <li><strong>Logging/Monitoring</strong>: Correlate events across distributed systems</li>
  <li><strong>Financial Systems</strong>: Trading hours, market open/close times</li>
  <li><strong>Healthcare</strong>: Medication schedules across timezones</li>
</ul>

<p><strong>Challenge:</strong> Implement functions to convert between timezones, work with UTC, and handle ISO date strings.</p>`,
  examples: [
    {
      input: `new Date().toISOString()`,
      output: `"2024-01-15T19:30:00.000Z"`,
      explanation: 'Z suffix indicates UTC time',
    },
    {
      input: `getTimezoneOffset()`,
      output: `300`,
      explanation: 'EST is UTC-5, offset is +300 minutes (sign is inverted)',
    },
  ],
  starterCode: `// TODO: Convert a local date to UTC (return Date object in UTC)
function toUTC(date) {
  // Example: If local time is Jan 15, 2024 10:00 AM EST (UTC-5)
  // Return the equivalent UTC time: Jan 15, 2024 3:00 PM UTC

  return date;
}

// TODO: Format a date in a specific timezone using Intl.DateTimeFormat
function formatInTimezone(date, timezone, locale = 'en-US') {
  // Example: formatInTimezone(date, 'America/New_York', 'en-US')
  // Returns the date/time string in the specified timezone
  // Supported timezones: 'UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', etc.

  return '';
}

// TODO: Parse an ISO 8601 date string and return a Date object
function parseISO(isoString) {
  // Example: parseISO('2024-01-15T14:30:00Z') => Date object
  // Example: parseISO('2024-01-15T14:30:00-05:00') => Date object

  return new Date();
}

// TODO: Get the timezone offset for a specific timezone at a given date
// Returns offset in minutes (like getTimezoneOffset but for any timezone)
function getTimezoneOffsetForZone(date, timezone) {
  // Example: getTimezoneOffsetForZone(new Date('2024-01-15'), 'America/New_York')
  // Returns -300 (UTC-5 = -300 minutes) in winter
  // Returns -240 (UTC-4 = -240 minutes) during DST

  return 0;
}

// TODO: Convert a date from one timezone to another
function convertTimezone(date, fromTimezone, toTimezone) {
  // Example: Convert 10:00 AM in New York to Tokyo time
  // Input: date representing 10:00 AM, 'America/New_York', 'Asia/Tokyo'
  // Output: object with date and formatted string in Tokyo time

  return { date: new Date(), formatted: '' };
}

// TODO: Check if a timezone is currently observing Daylight Saving Time
function isDST(date, timezone) {
  // Example: isDST(new Date('2024-07-15'), 'America/New_York') => true
  // Example: isDST(new Date('2024-01-15'), 'America/New_York') => false

  return false;
}

// TODO: Get the current time in multiple timezones
function getWorldClocks(timezones, locale = 'en-US') {
  // Example: getWorldClocks(['America/New_York', 'Europe/London', 'Asia/Tokyo'])
  // Returns: [
  //   { timezone: 'America/New_York', time: '10:30 AM', date: '1/15/2024' },
  //   { timezone: 'Europe/London', time: '3:30 PM', date: '1/15/2024' },
  //   { timezone: 'Asia/Tokyo', time: '12:30 AM', date: '1/16/2024' }
  // ]

  return [];
}

// Test
const testDate = new Date('2024-01-15T15:00:00Z');
console.log(formatInTimezone(testDate, 'America/New_York'));
console.log(formatInTimezone(testDate, 'Asia/Tokyo'));
console.log(parseISO('2024-01-15T14:30:00-05:00'));
console.log(isDST(new Date('2024-07-15'), 'America/New_York'));`,
  solution: `function toUTC(date) {
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}

function formatInTimezone(date, timezone, locale = 'en-US') {
  return new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(date);
}

function parseISO(isoString) {
  return new Date(isoString);
}

function getTimezoneOffsetForZone(date, timezone) {
  // Get the date in UTC and in the target timezone
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));

  // Return difference in minutes
  return (utcDate - tzDate) / 60000;
}

function convertTimezone(date, fromTimezone, toTimezone) {
  // Format the date in the target timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: toTimezone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return {
    date: date,  // The Date object itself represents the same instant
    formatted: formatter.format(date)
  };
}

function isDST(date, timezone) {
  // Compare the offset in January (no DST) vs the given date
  const january = new Date(date.getFullYear(), 0, 1);
  const july = new Date(date.getFullYear(), 6, 1);

  const januaryOffset = getTimezoneOffsetForZone(january, timezone);
  const julyOffset = getTimezoneOffsetForZone(july, timezone);
  const currentOffset = getTimezoneOffsetForZone(date, timezone);

  // The larger offset (more negative) is standard time
  // DST is when offset equals the smaller (less negative) value
  const standardOffset = Math.min(januaryOffset, julyOffset);

  return currentOffset !== standardOffset;
}

function getWorldClocks(timezones, locale = 'en-US') {
  const now = new Date();

  return timezones.map(timezone => {
    const timeFormatter = new Intl.DateTimeFormat(locale, {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const dateFormatter = new Intl.DateTimeFormat(locale, {
      timeZone: timezone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });

    return {
      timezone,
      time: timeFormatter.format(now),
      date: dateFormatter.format(now)
    };
  });
}`,
  testCases: [
    {
      input: [new Date('2024-01-15T15:00:00Z'), 'America/New_York', 'en-US'],
      expectedOutput: '1/15/2024, 10:00:00 AM',
      description: 'formatInTimezone: UTC 3PM is 10AM in New York (EST)',
    },
    {
      input: [new Date('2024-01-15T15:00:00Z'), 'Asia/Tokyo', 'en-US'],
      expectedOutput: '1/16/2024, 12:00:00 AM',
      description: 'formatInTimezone: UTC 3PM is midnight next day in Tokyo',
    },
    {
      input: ['2024-01-15T14:30:00Z'],
      expectedOutput: new Date('2024-01-15T14:30:00Z').getTime(),
      description: 'parseISO: Correctly parses UTC ISO string',
    },
    {
      input: ['2024-01-15T14:30:00-05:00'],
      expectedOutput: new Date('2024-01-15T19:30:00Z').getTime(),
      description: 'parseISO: Correctly parses ISO string with offset',
    },
    {
      input: [new Date('2024-07-15'), 'America/New_York'],
      expectedOutput: true,
      description: 'isDST: July is DST in New York',
    },
    {
      input: [new Date('2024-01-15'), 'America/New_York'],
      expectedOutput: false,
      description: 'isDST: January is not DST in New York',
    },
    {
      input: [new Date('2024-01-15'), 'UTC'],
      expectedOutput: 0,
      description: 'getTimezoneOffsetForZone: UTC offset is always 0',
    },
    {
      input: [new Date('2024-01-15'), 'America/New_York'],
      expectedOutput: -300,
      description: 'getTimezoneOffsetForZone: New York winter is UTC-5 (-300 minutes)',
    },
    {
      input: [new Date('2024-07-15'), 'America/New_York'],
      expectedOutput: -240,
      description: 'getTimezoneOffsetForZone: New York summer is UTC-4 (-240 minutes)',
    },
  ],
  hints: [
    'Date objects always store UTC internally - getTime() returns UTC milliseconds',
    'Use Intl.DateTimeFormat with timeZone option to display dates in any timezone',
    'new Date(isoString) correctly parses ISO 8601 strings including timezone offsets',
    'getTimezoneOffset() returns minutes, and the sign is inverted (UTC-5 returns +300)',
    'DST detection: compare offsets in January vs July - DST has the smaller offset (less negative)',
    'For timezone conversions, remember that the Date object represents the same instant - only the display changes',
  ],
};
