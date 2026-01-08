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
  id: 'number-formatting',
  title: 'Number Formatting with Intl.NumberFormat',
  difficulty: 'medium',
  category: 'Numbers & Math',
  description: `<h2>In-Depth Explanation</h2>

<p><code>Intl.NumberFormat</code> is a built-in JavaScript object that enables language-sensitive number formatting. It handles currency, percentages, units, and various number styles according to locale conventions.</p>

<h3>Creating a Formatter</h3>

<pre><code>const formatter = new Intl.NumberFormat(locale, options);</code></pre>

<h3>Common Options</h3>

<ul>
  <li><code>style</code>: 'decimal' (default), 'currency', 'percent', 'unit'</li>
  <li><code>currency</code>: ISO 4217 currency code (e.g., 'USD', 'EUR', 'JPY')</li>
  <li><code>currencyDisplay</code>: 'symbol', 'narrowSymbol', 'code', 'name'</li>
  <li><code>minimumFractionDigits</code>: Minimum decimal places</li>
  <li><code>maximumFractionDigits</code>: Maximum decimal places</li>
  <li><code>notation</code>: 'standard', 'scientific', 'engineering', 'compact'</li>
  <li><code>compactDisplay</code>: 'short' or 'long' (with notation: 'compact')</li>
  <li><code>unit</code>: Unit type for style: 'unit' (e.g., 'kilometer', 'celsius')</li>
</ul>

<h3>Locale Examples</h3>

<ul>
  <li><code>'en-US'</code>: 1,234.56</li>
  <li><code>'de-DE'</code>: 1.234,56</li>
  <li><code>'fr-FR'</code>: 1 234,56</li>
  <li><code>'ja-JP'</code>: 1,234.56 (with specific currency symbol)</li>
</ul>

<h2>Importance</h2>

<p>Proper number formatting is essential for:</p>

<ul>
  <li><strong>Internationalization</strong>: Display numbers according to user's locale</li>
  <li><strong>Currency Display</strong>: Proper currency symbols and formatting</li>
  <li><strong>Accessibility</strong>: Numbers users can easily read and understand</li>
  <li><strong>Professional UI</strong>: Polished, locale-aware number display</li>
</ul>

<h2>Usefulness & Practical Applications</h2>

<ul>
  <li><strong>E-commerce</strong>: Display prices in local currency format</li>
  <li><strong>Analytics Dashboards</strong>: Compact notation for large numbers (1.2M, 3.5K)</li>
  <li><strong>Financial Apps</strong>: Precise currency formatting with proper symbols</li>
  <li><strong>Scientific Apps</strong>: Scientific notation and unit formatting</li>
  <li><strong>Social Media</strong>: Follower counts in compact form</li>
</ul>

<p><strong>Challenge:</strong> Implement utility functions using Intl.NumberFormat for common formatting scenarios.</p>`,
  examples: [
    {
      input: `new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(1234.56)`,
      output: `'$1,234.56'`,
      explanation: 'US dollar currency formatting',
    },
    {
      input: `new Intl.NumberFormat('en-US', { notation: 'compact' }).format(1500000)`,
      output: `'1.5M'`,
      explanation: 'Compact notation for large numbers',
    },
    {
      input: `new Intl.NumberFormat('en-US', { style: 'percent' }).format(0.75)`,
      output: `'75%'`,
      explanation: 'Percentage formatting',
    },
  ],
  starterCode: `function formatCurrency(amount, currencyCode, locale = 'en-US') {
  // TODO: Format a number as currency with the specified code and locale
  // formatCurrency(1234.56, 'USD') → '$1,234.56'
  // formatCurrency(1234.56, 'EUR', 'de-DE') → '1.234,56 €'
  // formatCurrency(1234, 'JPY', 'ja-JP') → '￥1,234'

  return amount.toString();
}

function formatCompact(number, locale = 'en-US') {
  // TODO: Format large numbers in compact notation
  // formatCompact(1500) → '1.5K'
  // formatCompact(2500000) → '2.5M'
  // formatCompact(1200000000) → '1.2B'

  return number.toString();
}

function formatPercentage(decimal, decimalPlaces = 0, locale = 'en-US') {
  // TODO: Format a decimal as a percentage
  // formatPercentage(0.75) → '75%'
  // formatPercentage(0.8567, 2) → '85.67%'
  // formatPercentage(1.5, 0) → '150%'

  return decimal.toString();
}

function formatWithSeparators(number, locale = 'en-US') {
  // TODO: Format a number with locale-specific thousand separators
  // formatWithSeparators(1234567.89) → '1,234,567.89'
  // formatWithSeparators(1234567.89, 'de-DE') → '1.234.567,89'
  // formatWithSeparators(1234567, 'fr-FR') → '1 234 567'

  return number.toString();
}

function formatUnit(value, unit, locale = 'en-US') {
  // TODO: Format a number with a unit (e.g., kilometers, celsius)
  // formatUnit(100, 'kilometer') → '100 km'
  // formatUnit(25, 'celsius') → '25°C'
  // formatUnit(50, 'percent') → '50%'

  return value.toString();
}

// Test
console.log(formatCurrency(1234.56, 'USD'));
console.log(formatCompact(2500000));
console.log(formatPercentage(0.8567, 2));
console.log(formatWithSeparators(1234567.89, 'de-DE'));
console.log(formatUnit(100, 'kilometer'));`,
  solution: `function formatCurrency(amount, currencyCode, locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

function formatCompact(number, locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(number);
}

function formatPercentage(decimal, decimalPlaces = 0, locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(decimal);
}

function formatWithSeparators(number, locale = 'en-US') {
  return new Intl.NumberFormat(locale).format(number);
}

function formatUnit(value, unit, locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'unit',
    unit: unit,
    unitDisplay: 'short',
  }).format(value);
}`,
  testCases: [
    {
      input: [1234.56, 'USD', 'en-US'],
      expectedOutput: '$1,234.56',
      description: 'formatCurrency - US dollars with comma separator',
    },
    {
      input: [1234, 'JPY', 'ja-JP'],
      expectedOutput: '￥1,234',
      description: 'formatCurrency - Japanese Yen (no decimals)',
    },
    {
      input: [999.99, 'GBP', 'en-GB'],
      expectedOutput: '£999.99',
      description: 'formatCurrency - British Pounds',
    },
    {
      input: [1500, 'en-US'],
      expectedOutput: '1.5K',
      description: 'formatCompact - thousands as K',
    },
    {
      input: [2500000, 'en-US'],
      expectedOutput: '2.5M',
      description: 'formatCompact - millions as M',
    },
    {
      input: [0.75, 0, 'en-US'],
      expectedOutput: '75%',
      description: 'formatPercentage - 0.75 as 75%',
    },
    {
      input: [0.8567, 2, 'en-US'],
      expectedOutput: '85.67%',
      description: 'formatPercentage - with 2 decimal places',
    },
    {
      input: [1234567.89, 'en-US'],
      expectedOutput: '1,234,567.89',
      description: 'formatWithSeparators - US format with commas',
    },
    {
      input: [100, 'kilometer', 'en-US'],
      expectedOutput: '100 km',
      description: 'formatUnit - kilometers',
    },
    {
      input: [25, 'celsius', 'en-US'],
      expectedOutput: '25°C',
      description: 'formatUnit - celsius temperature',
    },
  ],
  hints: [
    'Intl.NumberFormat takes a locale string and an options object',
    'For currency formatting, you must specify both style: "currency" and the currency code',
    'Use notation: "compact" with compactDisplay: "short" for K, M, B abbreviations',
    'For percentages, the input should be a decimal (0.5 for 50%), style: "percent" multiplies by 100',
    'The default decimal style just needs the locale to add proper separators',
    'For units, use style: "unit" with the unit option (lowercase, e.g., "kilometer", "celsius")',
  ],
};
