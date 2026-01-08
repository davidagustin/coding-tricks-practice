/**
 * Code safety analysis utilities to detect potentially dangerous patterns
 * before executing user code
 */

import { DANGEROUS_CODE_PATTERNS } from '../constants';

export interface SafetyAnalysisResult {
  safe: boolean;
  issues: string[];
  warnings: string[];
}

/**
 * Analyze user code for dangerous patterns that could be malicious or problematic
 */
export function analyzeCodeSafety(code: string): SafetyAnalysisResult {
  const issues: string[] = [];
  const warnings: string[] = [];

  // Check for dangerous patterns
  if (DANGEROUS_CODE_PATTERNS.EVAL.test(code)) {
    issues.push('Use of eval() detected - this is a security risk');
  }

  if (DANGEROUS_CODE_PATTERNS.FUNCTION_CONSTRUCTOR.test(code)) {
    issues.push('Use of Function constructor detected - this is a security risk');
  }

  if (DANGEROUS_CODE_PATTERNS.INNER_HTML.test(code)) {
    warnings.push('innerHTML usage detected - be careful with user input');
  }

  if (DANGEROUS_CODE_PATTERNS.DOCUMENT_WRITE.test(code)) {
    warnings.push('document.write() detected - this can cause issues');
  }

  if (DANGEROUS_CODE_PATTERNS.WINDOW_LOCATION.test(code)) {
    warnings.push('window.location modification detected');
  }

  if (DANGEROUS_CODE_PATTERNS.PROTO.test(code)) {
    issues.push('__proto__ usage detected - this is a security risk');
  }

  if (DANGEROUS_CODE_PATTERNS.CONSTRUCTOR_ACCESS.test(code)) {
    warnings.push('Constructor bracket access detected - potential prototype pollution');
  }

  // Check for infinite loop patterns
  if (/while\s*\(\s*true\s*\)/.test(code) && !/break/.test(code)) {
    warnings.push('Potential infinite loop detected (while(true) without break)');
  }

  if (/for\s*\(\s*;;\s*\)/.test(code) && !/break/.test(code)) {
    warnings.push('Potential infinite loop detected (for(;;) without break)');
  }

  // Check for very large array/object allocations
  if (/Array\(\s*\d{6,}\s*\)/.test(code)) {
    warnings.push('Large array allocation detected - may cause memory issues');
  }

  return {
    safe: issues.length === 0,
    issues,
    warnings,
  };
}

/**
 * Check if code contains browser-specific APIs that won't work in test environment
 */
export function hasBrowserAPIs(code: string): boolean {
  const browserAPIPatterns = [
    /\bfetch\s*\(/,
    /\bwindow\./,
    /\bdocument\./,
    /\blocalStorage\./,
    /\bsessionStorage\./,
    /\bnavigator\./,
    /\blocation\./,
  ];

  return browserAPIPatterns.some((pattern) => pattern.test(code));
}

/**
 * Sanitize error messages to avoid leaking sensitive information
 */
export function sanitizeErrorMessage(message: string): string {
  // Remove absolute file paths
  let sanitized = message.replace(/[A-Za-z]:[\\\/][^\s:]+/g, '[path]');
  sanitized = sanitized.replace(/\/[^\s:]+\/[^\s:]+/g, '[path]');

  // Truncate very long error messages
  if (sanitized.length > 500) {
    sanitized = sanitized.substring(0, 497) + '...';
  }

  return sanitized;
}
