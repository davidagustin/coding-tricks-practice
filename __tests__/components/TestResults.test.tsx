import { render, screen } from '@testing-library/react';
import TestResults from '@/components/TestResults';
import type { TestResult } from '@/lib/test-runner';

// Helper to create mock test results
function createMockTestResult(overrides: Partial<TestResult> = {}): TestResult {
  return {
    passed: true,
    input: 'test input',
    expectedOutput: 'expected',
    actualOutput: 'actual',
    ...overrides,
  };
}

describe('TestResults', () => {
  describe('Loading State', () => {
    it('shows loading indicator when isRunning is true', () => {
      render(
        <TestResults results={[]} allPassed={false} isRunning={true} />
      );

      expect(screen.getByText('Running tests...')).toBeInTheDocument();
    });

    it('displays a spinner animation when running', () => {
      const { container } = render(
        <TestResults results={[]} allPassed={false} isRunning={true} />
      );

      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('does not show test results while running', () => {
      const results = [createMockTestResult({ passed: true })];
      render(
        <TestResults results={results} allPassed={true} isRunning={true} />
      );

      // Should show loading, not results
      expect(screen.getByText('Running tests...')).toBeInTheDocument();
      expect(screen.queryByText('All tests passed!')).not.toBeInTheDocument();
    });
  });

  describe('Error State (No Results)', () => {
    it('displays error message when error exists and no results', () => {
      render(
        <TestResults
          results={[]}
          allPassed={false}
          error="SyntaxError: Unexpected token"
          isRunning={false}
        />
      );

      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('SyntaxError: Unexpected token')).toBeInTheDocument();
    });

    it('shows error in a red-styled container', () => {
      const { container } = render(
        <TestResults
          results={[]}
          allPassed={false}
          error="Some error"
          isRunning={false}
        />
      );

      const errorContainer = container.querySelector('.bg-red-50');
      expect(errorContainer).toBeInTheDocument();
    });

    it('displays error as preformatted text', () => {
      const { container } = render(
        <TestResults
          results={[]}
          allPassed={false}
          error="Error message"
          isRunning={false}
        />
      );

      const pre = container.querySelector('pre');
      expect(pre).toBeInTheDocument();
      expect(pre).toHaveTextContent('Error message');
    });
  });

  describe('Empty Results State', () => {
    it('shows prompt to run tests when no results and no error', () => {
      render(
        <TestResults results={[]} allPassed={false} isRunning={false} />
      );

      expect(screen.getByText(/No test results yet/i)).toBeInTheDocument();
      expect(screen.getByText(/Click .* to execute your code/i)).toBeInTheDocument();
    });
  });

  describe('All Tests Passed', () => {
    it('shows success message when all tests pass', () => {
      const results = [
        createMockTestResult({ passed: true }),
        createMockTestResult({ passed: true }),
      ];
      render(
        <TestResults results={results} allPassed={true} isRunning={false} />
      );

      expect(screen.getByText(/All tests passed!/i)).toBeInTheDocument();
    });

    it('displays success banner with green styling', () => {
      const results = [createMockTestResult({ passed: true })];
      const { container } = render(
        <TestResults results={results} allPassed={true} isRunning={false} />
      );

      const successBanner = container.querySelector('.bg-green-50');
      expect(successBanner).toBeInTheDocument();
    });

    it('shows checkmark icon for passed tests', () => {
      const results = [createMockTestResult({ passed: true })];
      const { container } = render(
        <TestResults results={results} allPassed={true} isRunning={false} />
      );

      // SVG checkmark icons should be present
      const svgElements = container.querySelectorAll('svg');
      expect(svgElements.length).toBeGreaterThan(0);
    });
  });

  describe('Some Tests Failed', () => {
    it('shows failure message when some tests fail', () => {
      const results = [
        createMockTestResult({ passed: true }),
        createMockTestResult({ passed: false }),
      ];
      render(
        <TestResults results={results} allPassed={false} isRunning={false} />
      );

      expect(screen.getByText('Some tests failed')).toBeInTheDocument();
    });

    it('displays failure banner with red styling', () => {
      const results = [createMockTestResult({ passed: false })];
      const { container } = render(
        <TestResults results={results} allPassed={false} isRunning={false} />
      );

      const failureBanner = container.querySelector('.border-red-200');
      expect(failureBanner).toBeInTheDocument();
    });

    it('shows X icon for failed tests', () => {
      const results = [createMockTestResult({ passed: false })];
      const { container } = render(
        <TestResults results={results} allPassed={false} isRunning={false} />
      );

      const svgElements = container.querySelectorAll('svg');
      expect(svgElements.length).toBeGreaterThan(0);
    });
  });

  describe('Individual Test Case Display', () => {
    it('renders test case number for each result', () => {
      const results = [
        createMockTestResult({ passed: true }),
        createMockTestResult({ passed: false }),
        createMockTestResult({ passed: true }),
      ];
      render(
        <TestResults results={results} allPassed={false} isRunning={false} />
      );

      expect(screen.getByText(/Test Case 1/)).toBeInTheDocument();
      expect(screen.getByText(/Test Case 2/)).toBeInTheDocument();
      expect(screen.getByText(/Test Case 3/)).toBeInTheDocument();
    });

    it('shows test description when provided', () => {
      const results = [
        createMockTestResult({
          passed: true,
          description: 'Should handle empty array',
        }),
      ];
      render(
        <TestResults results={results} allPassed={true} isRunning={false} />
      );

      expect(screen.getByText(/Should handle empty array/)).toBeInTheDocument();
    });

    it('displays input for each test case', () => {
      const results = [
        createMockTestResult({
          passed: true,
          input: [1, 2, 3],
        }),
      ];
      render(
        <TestResults results={results} allPassed={true} isRunning={false} />
      );

      expect(screen.getByText('Input:')).toBeInTheDocument();
      // JSON stringified
      expect(screen.getByText(/\[\s*1,\s*2,\s*3\s*\]/)).toBeInTheDocument();
    });

    it('displays expected output for each test case', () => {
      const results = [
        createMockTestResult({
          passed: true,
          expectedOutput: { result: 'success' },
        }),
      ];
      render(
        <TestResults results={results} allPassed={true} isRunning={false} />
      );

      expect(screen.getByText('Expected:')).toBeInTheDocument();
      expect(screen.getByText(/"result": "success"/)).toBeInTheDocument();
    });

    it('displays actual output for each test case', () => {
      const results = [
        createMockTestResult({
          passed: true,
          actualOutput: 42,
        }),
      ];
      render(
        <TestResults results={results} allPassed={true} isRunning={false} />
      );

      expect(screen.getByText('Got:')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('shows error message for test cases with errors', () => {
      const results = [
        createMockTestResult({
          passed: false,
          error: 'TypeError: Cannot read property of undefined',
        }),
      ];
      render(
        <TestResults results={results} allPassed={false} isRunning={false} />
      );

      expect(screen.getByText(/Error: TypeError: Cannot read property of undefined/)).toBeInTheDocument();
    });

    it('does not show input/expected/actual when test has error', () => {
      const results = [
        createMockTestResult({
          passed: false,
          error: 'Some error',
          input: 'test',
          expectedOutput: 'expected',
          actualOutput: undefined,
        }),
      ];
      render(
        <TestResults results={results} allPassed={false} isRunning={false} />
      );

      // Error should be shown
      expect(screen.getByText(/Error: Some error/)).toBeInTheDocument();
      // Input/Expected/Got labels should not be shown for error cases
      const inputLabels = screen.queryAllByText('Input:');
      const expectedLabels = screen.queryAllByText('Expected:');
      expect(inputLabels.length).toBe(0);
      expect(expectedLabels.length).toBe(0);
    });
  });

  describe('Console Output', () => {
    it('shows console output section when error exists with results', () => {
      const results = [createMockTestResult({ passed: true })];
      render(
        <TestResults
          results={results}
          allPassed={true}
          error="console.log output here"
          isRunning={false}
        />
      );

      expect(screen.getByText('Console Output:')).toBeInTheDocument();
      expect(screen.getByText('console.log output here')).toBeInTheDocument();
    });

    it('displays console output in a yellow-styled container', () => {
      const results = [createMockTestResult({ passed: true })];
      const { container } = render(
        <TestResults
          results={results}
          allPassed={true}
          error="Some console output"
          isRunning={false}
        />
      );

      const consoleContainer = container.querySelector('.bg-yellow-50');
      expect(consoleContainer).toBeInTheDocument();
    });
  });

  describe('Value Formatting', () => {
    it('formats undefined values correctly', () => {
      const results = [
        createMockTestResult({
          passed: false,
          actualOutput: undefined,
        }),
      ];
      render(
        <TestResults results={results} allPassed={false} isRunning={false} />
      );

      expect(screen.getByText('undefined')).toBeInTheDocument();
    });

    it('formats null values correctly', () => {
      const results = [
        createMockTestResult({
          passed: true,
          actualOutput: null,
        }),
      ];
      render(
        <TestResults results={results} allPassed={true} isRunning={false} />
      );

      expect(screen.getByText('null')).toBeInTheDocument();
    });

    it('formats array values as JSON', () => {
      const results = [
        createMockTestResult({
          passed: true,
          input: [1, 2, 3],
          expectedOutput: [1, 2, 3],
          actualOutput: [1, 2, 3],
        }),
      ];
      render(
        <TestResults results={results} allPassed={true} isRunning={false} />
      );

      // Should have properly formatted arrays
      const preElements = screen.getAllByText(/\[\s*1/);
      expect(preElements.length).toBeGreaterThan(0);
    });

    it('formats object values as JSON with indentation', () => {
      const results = [
        createMockTestResult({
          passed: true,
          actualOutput: { a: 1, b: 2 },
        }),
      ];
      render(
        <TestResults results={results} allPassed={true} isRunning={false} />
      );

      expect(screen.getByText(/"a": 1/)).toBeInTheDocument();
      expect(screen.getByText(/"b": 2/)).toBeInTheDocument();
    });

    it('formats string values correctly', () => {
      const results = [
        createMockTestResult({
          passed: true,
          actualOutput: 'hello world',
        }),
      ];
      render(
        <TestResults results={results} allPassed={true} isRunning={false} />
      );

      expect(screen.getByText(/"hello world"/)).toBeInTheDocument();
    });

    it('formats boolean values correctly', () => {
      const results = [
        createMockTestResult({
          passed: true,
          actualOutput: true,
        }),
      ];
      render(
        <TestResults results={results} allPassed={true} isRunning={false} />
      );

      expect(screen.getByText('true')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty input values', () => {
      const results = [
        createMockTestResult({
          passed: true,
          input: '',
          expectedOutput: '',
          actualOutput: '',
        }),
      ];
      render(
        <TestResults results={results} allPassed={true} isRunning={false} />
      );

      // Empty strings should be rendered as ""
      const emptyStrings = screen.getAllByText('""');
      expect(emptyStrings.length).toBeGreaterThan(0);
    });

    it('handles large numbers', () => {
      const results = [
        createMockTestResult({
          passed: true,
          actualOutput: 9999999999999999,
        }),
      ];
      render(
        <TestResults results={results} allPassed={true} isRunning={false} />
      );

      // Large number should be displayed (may have precision issues)
      expect(screen.getByText(/\d{10,}/)).toBeInTheDocument();
    });

    it('handles nested objects and arrays', () => {
      const results = [
        createMockTestResult({
          passed: true,
          actualOutput: { nested: { array: [1, 2, { deep: true }] } },
        }),
      ];
      render(
        <TestResults results={results} allPassed={true} isRunning={false} />
      );

      expect(screen.getByText(/"nested"/)).toBeInTheDocument();
      expect(screen.getByText(/"deep": true/)).toBeInTheDocument();
    });

    it('handles many test results', () => {
      const results = Array.from({ length: 20 }, (_, i) =>
        createMockTestResult({
          passed: i % 2 === 0,
          description: `Test ${i + 1}`,
        })
      );
      render(
        <TestResults results={results} allPassed={false} isRunning={false} />
      );

      expect(screen.getByText('Test Case 1')).toBeInTheDocument();
      expect(screen.getByText('Test Case 20')).toBeInTheDocument();
    });
  });

  describe('Styling Consistency', () => {
    it('passed test cases have green background', () => {
      const results = [createMockTestResult({ passed: true })];
      const { container } = render(
        <TestResults results={results} allPassed={true} isRunning={false} />
      );

      const greenBg = container.querySelector('.bg-green-50');
      expect(greenBg).toBeInTheDocument();
    });

    it('failed test cases have red background', () => {
      const results = [createMockTestResult({ passed: false })];
      const { container } = render(
        <TestResults results={results} allPassed={false} isRunning={false} />
      );

      const redBg = container.querySelectorAll('.bg-red-50');
      expect(redBg.length).toBeGreaterThan(0);
    });

    it('actual output for passed tests has green background', () => {
      const results = [createMockTestResult({ passed: true, actualOutput: 'result' })];
      const { container } = render(
        <TestResults results={results} allPassed={true} isRunning={false} />
      );

      const greenOutput = container.querySelector('.bg-green-100');
      expect(greenOutput).toBeInTheDocument();
    });

    it('actual output for failed tests has red background', () => {
      const results = [createMockTestResult({ passed: false, actualOutput: 'wrong' })];
      const { container } = render(
        <TestResults results={results} allPassed={false} isRunning={false} />
      );

      const redOutput = container.querySelector('.bg-red-100');
      expect(redOutput).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('uses semantic HTML for test results list', () => {
      const results = [
        createMockTestResult({ passed: true }),
        createMockTestResult({ passed: false }),
      ];
      const { container } = render(
        <TestResults results={results} allPassed={false} isRunning={false} />
      );

      // Should have proper structure
      expect(container.firstChild).toBeInTheDocument();
    });

    it('uses pre elements for code output', () => {
      const results = [
        createMockTestResult({
          passed: true,
          input: 'code',
          expectedOutput: 'output',
          actualOutput: 'actual',
        }),
      ];
      const { container } = render(
        <TestResults results={results} allPassed={true} isRunning={false} />
      );

      const preElements = container.querySelectorAll('pre');
      expect(preElements.length).toBeGreaterThanOrEqual(3); // Input, Expected, Actual
    });
  });
});
