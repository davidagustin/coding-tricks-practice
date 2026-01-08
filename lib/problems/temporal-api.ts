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
  id: 'temporal-api',
  title: 'Introduction to the Temporal API',
  difficulty: 'hard',
  category: 'Date & Time',
  description: `<h2>In-Depth Explanation</h2>

<p>The <strong>Temporal API</strong> is a modern JavaScript proposal (Stage 3) that provides a comprehensive, immutable, and timezone-aware date/time library. It addresses many of the shortcomings of the legacy <code>Date</code> object. While not yet available in all browsers, it can be used via polyfills and represents the future of date/time handling in JavaScript.</p>

<p>Key Temporal types:</p>
<ul>
  <li><code>Temporal.Now</code> - Get current date/time</li>
  <li><code>Temporal.PlainDate</code> - Date without time (e.g., 2024-01-15)</li>
  <li><code>Temporal.PlainTime</code> - Time without date (e.g., 14:30:00)</li>
  <li><code>Temporal.PlainDateTime</code> - Date and time without timezone</li>
  <li><code>Temporal.ZonedDateTime</code> - Date, time, AND timezone</li>
  <li><code>Temporal.Instant</code> - Exact moment in time (like Unix timestamp)</li>
  <li><code>Temporal.Duration</code> - Length of time (e.g., 2 hours, 30 minutes)</li>
</ul>

<p>Key improvements over Date:</p>
<ul>
  <li><strong>Immutable</strong>: All operations return new objects</li>
  <li><strong>Clear types</strong>: Separate types for different use cases</li>
  <li><strong>1-indexed months</strong>: January is 1, not 0!</li>
  <li><strong>Timezone support</strong>: First-class timezone handling</li>
  <li><strong>Duration arithmetic</strong>: Easy date math with Duration objects</li>
  <li><strong>Calendar support</strong>: Support for non-Gregorian calendars</li>
</ul>

<h2>Importance</h2>

<p>Understanding Temporal is important because:</p>

<ul>
  <li><strong>Future Standard</strong>: Will become the standard date/time API</li>
  <li><strong>Better Design</strong>: Fixes decades of Date API problems</li>
  <li><strong>Type Safety</strong>: Clearer intent with distinct types</li>
  <li><strong>Immutability</strong>: Prevents common mutation bugs</li>
  <li><strong>Interview Prep</strong>: Shows awareness of modern JavaScript</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<p>Temporal is useful for:</p>

<ul>
  <li><strong>Calendar Applications</strong>: Working with dates without times</li>
  <li><strong>Scheduling</strong>: Timezone-aware event scheduling</li>
  <li><strong>Duration Calculations</strong>: "How long until X?" queries</li>
  <li><strong>International Apps</strong>: Non-Gregorian calendar support</li>
  <li><strong>Time Tracking</strong>: Accurate duration arithmetic</li>
  <li><strong>Data Processing</strong>: Clean, predictable date parsing</li>
</ul>

<p><strong>Note:</strong> Since Temporal is not yet natively available, this exercise simulates Temporal-like behavior using plain JavaScript. This prepares you for when Temporal becomes standard.</p>

<p><strong>Challenge:</strong> Implement Temporal-like classes and operations to understand the API design.</p>`,
  examples: [
    {
      input: `Temporal.PlainDate.from('2024-01-15')`,
      output: `PlainDate { year: 2024, month: 1, day: 15 }`,
      explanation: 'Creates a date-only object (no time component)',
    },
    {
      input: `date.add({ days: 30 })`,
      output: `PlainDate { year: 2024, month: 2, day: 14 }`,
      explanation: 'Returns a NEW date (immutable operation)',
    },
    {
      input: `Temporal.Duration.from({ hours: 2, minutes: 30 })`,
      output: `Duration { hours: 2, minutes: 30 }`,
      explanation: 'Represents a length of time',
    },
  ],
  starterCode: `// Simulate Temporal.PlainDate
// A date without time component, with 1-indexed months

class PlainDate {
  constructor(year, month, day) {
    // TODO: Store year, month (1-indexed), day
    // Validate that month is 1-12 and day is valid for the month

    this.year = year;
    this.month = month;
    this.day = day;
  }

  // TODO: Static factory method to create from string 'YYYY-MM-DD'
  static from(dateString) {
    // Example: PlainDate.from('2024-01-15')
    // Returns new PlainDate(2024, 1, 15)

    return new PlainDate(2024, 1, 1);
  }

  // TODO: Add a duration to this date (returns NEW PlainDate - immutable!)
  add(duration) {
    // Example: new PlainDate(2024, 1, 15).add({ days: 30 })
    // Returns PlainDate for February 14, 2024
    // duration can have: years, months, days

    return this;
  }

  // TODO: Subtract a duration from this date
  subtract(duration) {
    // Example: new PlainDate(2024, 1, 15).subtract({ months: 1 })
    // Returns PlainDate for December 15, 2023

    return this;
  }

  // TODO: Calculate the difference between two dates
  until(otherDate) {
    // Example: new PlainDate(2024, 1, 1).until(new PlainDate(2024, 12, 31))
    // Returns { years: 0, months: 11, days: 30 }

    return { years: 0, months: 0, days: 0 };
  }

  // TODO: Compare two dates (-1, 0, or 1)
  compare(otherDate) {
    // Returns -1 if this < other, 0 if equal, 1 if this > other

    return 0;
  }

  // TODO: Format as ISO string 'YYYY-MM-DD'
  toString() {
    return '';
  }

  // TODO: Check if this date equals another
  equals(otherDate) {
    return false;
  }
}

// Simulate Temporal.Duration
class Duration {
  constructor({ years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0 } = {}) {
    // TODO: Store all duration components

    this.years = years;
    this.months = months;
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  // TODO: Static factory method
  static from(durationLike) {
    // Example: Duration.from({ hours: 2, minutes: 30 })
    // Example: Duration.from('P1Y2M3D') - ISO 8601 duration string

    return new Duration();
  }

  // TODO: Get total duration in a specific unit
  total(unit) {
    // Example: new Duration({ hours: 2, minutes: 30 }).total('minutes')
    // Returns 150

    return 0;
  }

  // TODO: Negate the duration
  negated() {
    // Returns a new Duration with all values negated

    return this;
  }

  // TODO: Format as ISO 8601 duration string
  toString() {
    // Example: 'P1Y2M3DT4H5M6S' for 1 year, 2 months, 3 days, 4 hours, 5 min, 6 sec
    return '';
  }
}

// Test PlainDate
const date1 = PlainDate.from('2024-01-15');
console.log('Created:', date1.toString());
console.log('Add 30 days:', date1.add({ days: 30 }).toString());
console.log('Subtract 1 month:', date1.subtract({ months: 1 }).toString());

const date2 = PlainDate.from('2024-12-31');
console.log('Days until end of year:', date1.until(date2));

// Test Duration
const duration = Duration.from({ hours: 2, minutes: 30 });
console.log('Duration total minutes:', duration.total('minutes'));`,
  solution: `class PlainDate {
  constructor(year, month, day) {
    if (month < 1 || month > 12) {
      throw new RangeError('Month must be between 1 and 12');
    }
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      throw new RangeError(\`Day must be between 1 and \${daysInMonth}\`);
    }

    this.year = year;
    this.month = month;
    this.day = day;
  }

  static from(dateString) {
    if (typeof dateString === 'string') {
      const [year, month, day] = dateString.split('-').map(Number);
      return new PlainDate(year, month, day);
    }
    if (typeof dateString === 'object') {
      return new PlainDate(dateString.year, dateString.month, dateString.day);
    }
    throw new TypeError('Invalid input');
  }

  add(duration) {
    // Convert to JS Date for arithmetic (remember: JS months are 0-indexed)
    const jsDate = new Date(this.year, this.month - 1, this.day);

    if (duration.years) {
      jsDate.setFullYear(jsDate.getFullYear() + duration.years);
    }
    if (duration.months) {
      const originalDay = jsDate.getDate();
      jsDate.setMonth(jsDate.getMonth() + duration.months);
      // Handle month overflow (e.g., Jan 31 + 1 month)
      if (jsDate.getDate() !== originalDay) {
        jsDate.setDate(0);
      }
    }
    if (duration.days) {
      jsDate.setDate(jsDate.getDate() + duration.days);
    }

    return new PlainDate(
      jsDate.getFullYear(),
      jsDate.getMonth() + 1,
      jsDate.getDate()
    );
  }

  subtract(duration) {
    return this.add({
      years: -(duration.years || 0),
      months: -(duration.months || 0),
      days: -(duration.days || 0)
    });
  }

  until(otherDate) {
    let years = otherDate.year - this.year;
    let months = otherDate.month - this.month;
    let days = otherDate.day - this.day;

    // Normalize days
    if (days < 0) {
      months--;
      const prevMonth = new Date(otherDate.year, otherDate.month - 1, 0);
      days += prevMonth.getDate();
    }

    // Normalize months
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }

  compare(otherDate) {
    if (this.year !== otherDate.year) {
      return this.year < otherDate.year ? -1 : 1;
    }
    if (this.month !== otherDate.month) {
      return this.month < otherDate.month ? -1 : 1;
    }
    if (this.day !== otherDate.day) {
      return this.day < otherDate.day ? -1 : 1;
    }
    return 0;
  }

  toString() {
    const y = String(this.year).padStart(4, '0');
    const m = String(this.month).padStart(2, '0');
    const d = String(this.day).padStart(2, '0');
    return \`\${y}-\${m}-\${d}\`;
  }

  equals(otherDate) {
    return this.compare(otherDate) === 0;
  }
}

class Duration {
  constructor({ years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0 } = {}) {
    this.years = years;
    this.months = months;
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  static from(durationLike) {
    if (typeof durationLike === 'string') {
      // Parse ISO 8601 duration (simplified)
      const match = durationLike.match(/P(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)D)?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+)S)?)?/);
      if (match) {
        return new Duration({
          years: parseInt(match[1] || 0),
          months: parseInt(match[2] || 0),
          days: parseInt(match[3] || 0),
          hours: parseInt(match[4] || 0),
          minutes: parseInt(match[5] || 0),
          seconds: parseInt(match[6] || 0)
        });
      }
    }
    return new Duration(durationLike);
  }

  total(unit) {
    // Convert everything to the requested unit
    // Note: This is simplified - months/years vary in length
    const totalSeconds =
      this.seconds +
      this.minutes * 60 +
      this.hours * 3600 +
      this.days * 86400;

    switch (unit) {
      case 'seconds': return totalSeconds;
      case 'minutes': return totalSeconds / 60;
      case 'hours': return totalSeconds / 3600;
      case 'days': return totalSeconds / 86400;
      default: throw new Error(\`Unknown unit: \${unit}\`);
    }
  }

  negated() {
    return new Duration({
      years: -this.years,
      months: -this.months,
      days: -this.days,
      hours: -this.hours,
      minutes: -this.minutes,
      seconds: -this.seconds
    });
  }

  toString() {
    let result = 'P';

    if (this.years) result += \`\${this.years}Y\`;
    if (this.months) result += \`\${this.months}M\`;
    if (this.days) result += \`\${this.days}D\`;

    if (this.hours || this.minutes || this.seconds) {
      result += 'T';
      if (this.hours) result += \`\${this.hours}H\`;
      if (this.minutes) result += \`\${this.minutes}M\`;
      if (this.seconds) result += \`\${this.seconds}S\`;
    }

    return result === 'P' ? 'PT0S' : result;
  }
}`,
  testCases: [
    {
      input: ['2024-01-15'],
      expectedOutput: { year: 2024, month: 1, day: 15 },
      description: 'PlainDate.from parses ISO date string correctly',
    },
    {
      input: [{ year: 2024, month: 1, day: 15 }, { days: 30 }],
      expectedOutput: '2024-02-14',
      description: 'PlainDate.add: Adding 30 days to Jan 15 gives Feb 14',
    },
    {
      input: [{ year: 2024, month: 1, day: 15 }, { months: 1 }],
      expectedOutput: '2024-02-15',
      description: 'PlainDate.add: Adding 1 month to Jan 15 gives Feb 15',
    },
    {
      input: [{ year: 2024, month: 1, day: 31 }, { months: 1 }],
      expectedOutput: '2024-02-29',
      description: 'PlainDate.add: Jan 31 + 1 month = Feb 29 (leap year, clamped)',
    },
    {
      input: [{ year: 2024, month: 1, day: 15 }, { months: 1 }],
      expectedOutput: '2023-12-15',
      description: 'PlainDate.subtract: Jan 15, 2024 - 1 month = Dec 15, 2023',
    },
    {
      input: [{ year: 2024, month: 1, day: 1 }, { year: 2024, month: 12, day: 31 }],
      expectedOutput: { years: 0, months: 11, days: 30 },
      description: 'PlainDate.until: Calculates difference between dates',
    },
    {
      input: [{ hours: 2, minutes: 30 }],
      expectedOutput: 150,
      description: 'Duration.total: 2 hours 30 minutes = 150 minutes',
    },
    {
      input: [{ days: 1, hours: 12 }],
      expectedOutput: 36,
      description: 'Duration.total: 1 day 12 hours = 36 hours',
    },
    {
      input: ['P1Y2M3D'],
      expectedOutput: { years: 1, months: 2, days: 3 },
      description: 'Duration.from: Parses ISO 8601 duration string',
    },
    {
      input: [{ years: 1, months: 2, days: 3 }],
      expectedOutput: 'P1Y2M3D',
      description: 'Duration.toString: Formats as ISO 8601 duration',
    },
  ],
  hints: [
    'Temporal uses 1-indexed months (1 = January) unlike Date which uses 0-indexed',
    'All Temporal operations are immutable - they return new objects, never modify the original',
    'Use JavaScript Date internally for complex arithmetic, but remember to convert month indexes',
    'For month overflow (Jan 31 + 1 month), set to day 0 of next month to get last day of intended month',
    'ISO 8601 duration format: P[years]Y[months]M[days]DT[hours]H[minutes]M[seconds]S',
    'The compare() method should return -1, 0, or 1 for consistent sorting behavior',
  ],
};
