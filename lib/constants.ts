/**
 * Shared constants used across the application
 */

import type { Problem } from './problems';

/**
 * Tailwind CSS classes for difficulty badge styling
 */
export const DIFFICULTY_COLORS = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
} as const satisfies Record<Problem['difficulty'], string>;

/**
 * TypeScript compiler options - using explicit enum values
 */
export const TYPESCRIPT_COMPILER_OPTIONS = {
  TARGET_ES2020: 5,
  MODULE_ESNEXT: 99,
  JSX_REACT: 2,
} as const;

/**
 * TypeScript diagnostic error codes to ignore in the editor
 */
export const TYPESCRIPT_ERROR_CODES = {
  /** Enum in JavaScript file */
  ENUM_IN_JS_FILE: 8006,
  /** Cannot redeclare block-scoped variable */
  CANNOT_REDECLARE_BLOCK_VAR: 2451,
  /** Duplicate identifier */
  DUPLICATE_IDENTIFIER: 2300,
  /** Duplicate function implementation */
  DUPLICATE_FUNCTION_IMPL: 2393,
} as const;

/**
 * Test execution configuration
 */
export const TEST_CONFIG = {
  /** Maximum time allowed for test execution (milliseconds) */
  EXECUTION_TIMEOUT: 10000, // 10 seconds
  /** Minimum interval between test runs (milliseconds) */
  MIN_RUN_INTERVAL: 1000, // 1 second
  /** Maximum code size allowed (bytes) */
  MAX_CODE_SIZE: 50000, // 50KB
} as const;

/**
 * Keywords that indicate browser API usage
 */
export const BROWSER_API_KEYWORDS = [
  'fetch',
  'window',
  'document',
  'AbortController',
  'localStorage',
  'sessionStorage',
] as const;

/**
 * Dangerous code patterns that should be flagged
 */
export const DANGEROUS_CODE_PATTERNS = {
  EVAL: /\beval\s*\(/,
  FUNCTION_CONSTRUCTOR: /\bFunction\s*\(/,
  INNER_HTML: /\.innerHTML\s*=/,
  DOCUMENT_WRITE: /document\.write/,
  WINDOW_LOCATION: /window\.location/,
  PROTO: /__proto__/,
  CONSTRUCTOR_ACCESS: /constructor\[/,
} as const;

/**
 * DOMPurify configuration for HTML sanitization
 */
export const DOMPURIFY_CONFIG = {
  ALLOWED_TAGS: [
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'ul',
    'ol',
    'li',
    'strong',
    'em',
    'code',
    'pre',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'br',
    'a',
  ],
  ALLOWED_ATTR: ['class', 'href', 'target', 'rel'],
  ALLOW_DATA_ATTR: false,
};
