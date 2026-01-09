import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TestResults from '../components/TestResults';
import type { TestResult } from '@/lib/test-runner';

const meta: Meta<typeof TestResults> = {
  title: 'Components/TestResults',
  component: TestResults,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Displays test execution results with visual indicators for pass/fail status, input/output values, and error messages.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    results: {
      description: 'Array of test results to display',
      control: 'object',
    },
    allPassed: {
      description: 'Whether all tests passed',
      control: 'boolean',
    },
    error: {
      description: 'Optional error message or console output',
      control: 'text',
    },
    isRunning: {
      description: 'Whether tests are currently running',
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TestResults>;

// Helper function to create mock test results
const createTestResult = (
  passed: boolean,
  input: unknown,
  expectedOutput: unknown,
  actualOutput: unknown,
  options?: { error?: string; description?: string }
): TestResult => ({
  passed,
  input,
  expectedOutput,
  actualOutput,
  error: options?.error,
  description: options?.description,
});

// ============================================
// 1. Initial State (No Tests Run Yet)
// ============================================
export const InitialState: Story = {
  name: '1. Initial State',
  args: {
    results: [],
    allPassed: false,
    isRunning: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default state before any tests have been run. Shows a prompt to run tests.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// ============================================
// 2. Running State
// ============================================
export const RunningState: Story = {
  name: '2. Running State',
  args: {
    results: [],
    allPassed: false,
    isRunning: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows a loading spinner while tests are being executed.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// ============================================
// 3. All Tests Passed
// ============================================
export const AllTestsPassed: Story = {
  name: '3. All Tests Passed',
  args: {
    results: [
      createTestResult(true, [1, 2], 3, 3, { description: 'adds two positive numbers' }),
      createTestResult(true, [-1, 1], 0, 0, { description: 'adds negative and positive' }),
      createTestResult(true, [0, 0], 0, 0, { description: 'adds zeros' }),
      createTestResult(true, [100, 200], 300, 300, { description: 'adds large numbers' }),
    ],
    allPassed: true,
    isRunning: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Green success state when all test cases pass.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// ============================================
// 4. Some Tests Failed (Mixed Results)
// ============================================
export const MixedResults: Story = {
  name: '4. Mixed Results',
  args: {
    results: [
      createTestResult(true, [1, 2], 3, 3, { description: 'basic addition' }),
      createTestResult(false, [5, 3], 8, 7, { description: 'another addition' }),
      createTestResult(true, [10, -5], 5, 5, { description: 'negative number handling' }),
      createTestResult(false, [0, 1], 1, 0, { description: 'zero handling' }),
    ],
    allPassed: false,
    isRunning: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows mixed results with some tests passing and some failing.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// ============================================
// 5. All Tests Failed
// ============================================
export const AllTestsFailed: Story = {
  name: '5. All Tests Failed',
  args: {
    results: [
      createTestResult(false, [1, 2], 3, 0, { description: 'basic addition' }),
      createTestResult(false, [5, 3], 8, 0, { description: 'larger numbers' }),
      createTestResult(false, [10, 20], 30, 0, { description: 'even larger numbers' }),
    ],
    allPassed: false,
    isRunning: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Red failure state when all test cases fail.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// ============================================
// 6. Single Test Passed
// ============================================
export const SingleTestPassed: Story = {
  name: '6. Single Test Passed',
  args: {
    results: [createTestResult(true, 'hello', 'HELLO', 'HELLO', { description: 'converts to uppercase' })],
    allPassed: true,
    isRunning: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Single passing test case.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// ============================================
// 7. Single Test Failed
// ============================================
export const SingleTestFailed: Story = {
  name: '7. Single Test Failed',
  args: {
    results: [createTestResult(false, 'hello', 'HELLO', 'hello', { description: 'converts to uppercase' })],
    allPassed: false,
    isRunning: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Single failing test case.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// ============================================
// 8. Error State (With Error Message)
// ============================================
export const ErrorState: Story = {
  name: '8. Error State',
  args: {
    results: [],
    allPassed: false,
    isRunning: false,
    error: 'No functions found in your code. Please define at least one function.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows an error message when there is an error with no test results.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// ============================================
// 9. Syntax Error Display
// ============================================
export const SyntaxError: Story = {
  name: '9. Syntax Error',
  args: {
    results: [],
    allPassed: false,
    isRunning: false,
    error: `Code execution error: Unexpected token 'const'. Please check your syntax.

Line 5: const result =
                      ^
SyntaxError: Unexpected end of input`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays a syntax error with line information.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// ============================================
// 10. Runtime Error Display
// ============================================
export const RuntimeError: Story = {
  name: '10. Runtime Error',
  args: {
    results: [
      createTestResult(false, [1, 2], 3, undefined, {
        error: "TypeError: Cannot read properties of undefined (reading 'map')",
        description: 'test with array input',
      }),
      createTestResult(false, [3, 4], 7, undefined, {
        error: "TypeError: Cannot read properties of undefined (reading 'map')",
        description: 'another array test',
      }),
    ],
    allPassed: false,
    isRunning: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows runtime errors that occurred during test execution.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// ============================================
// 11. Many Test Results (10+)
// ============================================
export const ManyTestResults: Story = {
  name: '11. Many Test Results',
  args: {
    results: [
      createTestResult(true, [1, 1], 2, 2, { description: 'test case 1' }),
      createTestResult(true, [2, 2], 4, 4, { description: 'test case 2' }),
      createTestResult(false, [3, 3], 6, 5, { description: 'test case 3' }),
      createTestResult(true, [4, 4], 8, 8, { description: 'test case 4' }),
      createTestResult(true, [5, 5], 10, 10, { description: 'test case 5' }),
      createTestResult(false, [6, 6], 12, 11, { description: 'test case 6' }),
      createTestResult(true, [7, 7], 14, 14, { description: 'test case 7' }),
      createTestResult(true, [8, 8], 16, 16, { description: 'test case 8' }),
      createTestResult(true, [9, 9], 18, 18, { description: 'test case 9' }),
      createTestResult(true, [10, 10], 20, 20, { description: 'test case 10' }),
      createTestResult(false, [11, 11], 22, 21, { description: 'test case 11' }),
      createTestResult(true, [12, 12], 24, 24, { description: 'test case 12' }),
    ],
    allPassed: false,
    isRunning: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays a large number of test results to verify scroll behavior and layout.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// ============================================
// 12. Test with Long Input/Output Values
// ============================================
export const LongInputOutput: Story = {
  name: '12. Long Input/Output Values',
  args: {
    results: [
      createTestResult(
        true,
        {
          users: [
            { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'admin' },
            { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'user' },
            { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'moderator' },
          ],
          pagination: { page: 1, limit: 10, total: 100 },
        },
        {
          admins: ['John Doe'],
          users: ['Jane Smith'],
          moderators: ['Bob Johnson'],
        },
        {
          admins: ['John Doe'],
          users: ['Jane Smith'],
          moderators: ['Bob Johnson'],
        },
        { description: 'categorizes users by role' }
      ),
      createTestResult(
        false,
        'The quick brown fox jumps over the lazy dog. This is a very long string that should demonstrate how the component handles text overflow and wrapping for extended content.',
        'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG. THIS IS A VERY LONG STRING THAT SHOULD DEMONSTRATE HOW THE COMPONENT HANDLES TEXT OVERFLOW AND WRAPPING FOR EXTENDED CONTENT.',
        'The quick brown fox jumps over the lazy dog. This is a very long string that should demonstrate how the component handles text overflow and wrapping for extended content.',
        { description: 'converts long string to uppercase' }
      ),
      createTestResult(
        true,
        [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
        465,
        465,
        { description: 'sums a large array of numbers' }
      ),
    ],
    allPassed: false,
    isRunning: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests with complex objects, long strings, and large arrays to verify proper formatting.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// ============================================
// 13. Dark Theme Variant
// ============================================
export const DarkTheme: Story = {
  name: '13. Dark Theme',
  args: {
    results: [
      createTestResult(true, [1, 2], 3, 3, { description: 'passing test' }),
      createTestResult(false, [5, 3], 8, 7, { description: 'failing test' }),
      createTestResult(false, [10, 20], 30, undefined, {
        error: 'ReferenceError: unknownVariable is not defined',
        description: 'error test',
      }),
    ],
    allPassed: false,
    isRunning: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Component rendered in dark theme mode.',
      },
    },
    chromatic: {
      disableSnapshot: false,
      modes: {
        dark: { theme: 'dark' },
      },
    },
  },
  globals: {
    theme: 'dark',
  },
};

// ============================================
// 14. Mobile Viewport
// ============================================
export const MobileViewport: Story = {
  name: '14. Mobile Viewport',
  args: {
    results: [
      createTestResult(true, [1, 2], 3, 3, { description: 'addition test' }),
      createTestResult(false, 'hello world', 'HELLO WORLD', 'hello world', { description: 'uppercase conversion' }),
      createTestResult(
        true,
        { name: 'test', value: 42 },
        { name: 'test', value: 42, processed: true },
        { name: 'test', value: 42, processed: true },
        { description: 'object transformation' }
      ),
    ],
    allPassed: false,
    isRunning: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Component rendered in mobile viewport to verify responsive behavior.',
      },
    },
    chromatic: {
      disableSnapshot: false,
      viewports: [375],
    },
  },
};

// ============================================
// Additional Edge Cases for Chromatic Testing
// ============================================

// Results with console output
export const WithConsoleOutput: Story = {
  name: 'With Console Output',
  args: {
    results: [
      createTestResult(true, [1, 2], 3, 3, { description: 'basic test' }),
      createTestResult(true, [3, 4], 7, 7, { description: 'another test' }),
    ],
    allPassed: true,
    isRunning: false,
    error: `console.log output:
  Processing input: [1, 2]
  Result: 3
  Processing input: [3, 4]
  Result: 7`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows console output alongside passing test results.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// Edge case: undefined and null values
export const UndefinedAndNullValues: Story = {
  name: 'Undefined and Null Values',
  args: {
    results: [
      createTestResult(true, null, null, null, { description: 'handles null input' }),
      createTestResult(true, undefined, undefined, undefined, { description: 'handles undefined input' }),
      createTestResult(false, [null, undefined], null, undefined, { description: 'mixed null/undefined' }),
    ],
    allPassed: false,
    isRunning: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests handling of null and undefined values.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// Edge case: boolean results
export const BooleanResults: Story = {
  name: 'Boolean Results',
  args: {
    results: [
      createTestResult(true, 5, true, true, { description: 'isPositive returns true for positive' }),
      createTestResult(true, -3, false, false, { description: 'isPositive returns false for negative' }),
      createTestResult(false, 0, false, true, { description: 'isPositive edge case for zero' }),
    ],
    allPassed: false,
    isRunning: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests with boolean expected and actual values.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// Edge case: nested arrays
export const NestedArrays: Story = {
  name: 'Nested Arrays',
  args: {
    results: [
      createTestResult(
        true,
        [
          [1, 2],
          [3, 4],
        ],
        [
          [2, 4],
          [6, 8],
        ],
        [
          [2, 4],
          [6, 8],
        ],
        { description: 'doubles nested array values' }
      ),
      createTestResult(
        false,
        [[1], [2, 3], [4, 5, 6]],
        [1, 5, 15],
        [1, 5, 14],
        { description: 'sums each subarray' }
      ),
    ],
    allPassed: false,
    isRunning: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests with nested array structures.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// Edge case: empty string and empty array
export const EmptyValues: Story = {
  name: 'Empty Values',
  args: {
    results: [
      createTestResult(true, '', '', '', { description: 'handles empty string' }),
      createTestResult(true, [], [], [], { description: 'handles empty array' }),
      createTestResult(true, {}, {}, {}, { description: 'handles empty object' }),
    ],
    allPassed: true,
    isRunning: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests with empty strings, arrays, and objects.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// Tests without descriptions
export const NoDescriptions: Story = {
  name: 'No Descriptions',
  args: {
    results: [
      createTestResult(true, [1, 2], 3, 3),
      createTestResult(false, [5, 3], 8, 7),
      createTestResult(true, [10, 20], 30, 30),
    ],
    allPassed: false,
    isRunning: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Test results without description text.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// Dark theme with all states combined
export const DarkThemeAllStates: Story = {
  name: 'Dark Theme - All States',
  args: {
    results: [
      createTestResult(true, [1, 2], 3, 3, { description: 'passing test with simple values' }),
      createTestResult(false, 'input', 'EXPECTED', 'actual', { description: 'failing test with strings' }),
      createTestResult(false, { key: 'value' }, { result: true }, undefined, {
        error: 'TypeError: Cannot convert object to primitive value',
        description: 'error test with object',
      }),
    ],
    allPassed: false,
    isRunning: false,
    error: 'WARN: Deprecated function used\nconsole.log: Debug output here',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dark theme showing passing, failing, error tests, and console output.',
      },
    },
    chromatic: {
      disableSnapshot: false,
      modes: {
        dark: { theme: 'dark' },
      },
    },
  },
  globals: {
    theme: 'dark',
  },
};

// Mobile viewport with dark theme
export const MobileDarkTheme: Story = {
  name: 'Mobile - Dark Theme',
  args: {
    results: [
      createTestResult(true, [1, 2], 3, 3, { description: 'addition' }),
      createTestResult(false, [5, 3], 8, 7, { description: 'subtraction bug' }),
    ],
    allPassed: false,
    isRunning: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile viewport in dark theme.',
      },
    },
    chromatic: { modes: {
        dark: { theme: 'dark' },
      },
    },
  },
  globals: {
    theme: 'dark',
  },
};

// Special characters in input/output
export const SpecialCharacters: Story = {
  name: 'Special Characters',
  args: {
    results: [
      createTestResult(true, '<script>alert("xss")</script>', '&lt;script&gt;alert("xss")&lt;/script&gt;', '&lt;script&gt;alert("xss")&lt;/script&gt;', {
        description: 'escapes HTML entities',
      }),
      createTestResult(true, 'Hello\nWorld\tTab', 'Hello\\nWorld\\tTab', 'Hello\\nWorld\\tTab', {
        description: 'escapes control characters',
      }),
      createTestResult(true, '{"key": "value"}', { key: 'value' }, { key: 'value' }, {
        description: 'parses JSON string',
      }),
    ],
    allPassed: true,
    isRunning: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests with special characters, HTML, and escape sequences.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// Function output display
export const FunctionOutput: Story = {
  name: 'Function Output',
  args: {
    results: [
      createTestResult(
        true,
        [1, 2, 3],
        'function',
        function multiply(x: number) {
          return x * 2;
        },
        { description: 'returns a function' }
      ),
    ],
    allPassed: true,
    isRunning: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Test result where the output is a function.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// Timeout error scenario
export const TimeoutError: Story = {
  name: 'Timeout Error',
  args: {
    results: [],
    allPassed: false,
    isRunning: false,
    error:
      'Test execution timed out after 5 seconds. Your code may have an infinite loop or be too slow.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays a timeout error when code execution takes too long.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// Code safety error
export const CodeSafetyError: Story = {
  name: 'Code Safety Error',
  args: {
    results: [],
    allPassed: false,
    isRunning: false,
    error: `Code safety check failed:
- Detected potentially unsafe code pattern: eval()
- Access to window object is not allowed in this environment
- Use of fetch API is not permitted for security reasons`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays code safety violations.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// TypeScript compilation error
export const TypeScriptCompilationError: Story = {
  name: 'TypeScript Compilation Error',
  args: {
    results: [],
    allPassed: false,
    isRunning: false,
    error: `TypeScript compilation error: Type 'string' is not assignable to type 'number'.

  const sum: number = "not a number";
                       ~~~~~~~~~~~~~~`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays TypeScript compilation errors.',
      },
    },
    chromatic: { disableSnapshot: false },
  },
};

// ============================================
// DARK THEME STORY VARIANTS
// ============================================

// Dark theme decorator for comprehensive dark mode testing
const darkThemeDecorator = (Story: React.ComponentType) => {
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => document.documentElement.classList.remove('dark');
  }, []);
  return (
    <div className="dark bg-gray-950 min-h-screen p-4">
      <Story />
    </div>
  );
};

// ============================================
// All Tests Passed (Dark)
// ============================================
export const AllTestsPassed_Dark: Story = {
  ...AllTestsPassed,
  name: 'All Tests Passed (Dark)',
  decorators: [darkThemeDecorator],
  parameters: {
    ...AllTestsPassed.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Green success indicators on dark background - all test cases passing.',
      },
    },
  },
};

// ============================================
// Mixed Results (Dark)
// ============================================
export const MixedResults_Dark: Story = {
  ...MixedResults,
  name: 'Mixed Results (Dark)',
  decorators: [darkThemeDecorator],
  parameters: {
    ...MixedResults.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Mixed pass/fail indicators on dark background - some tests passing, some failing.',
      },
    },
  },
};

// ============================================
// All Tests Failed (Dark)
// ============================================
export const AllTestsFailed_Dark: Story = {
  ...AllTestsFailed,
  name: 'All Tests Failed (Dark)',
  decorators: [darkThemeDecorator],
  parameters: {
    ...AllTestsFailed.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Red failure indicators on dark background - all test cases failing.',
      },
    },
  },
};

// ============================================
// Error State (Dark)
// ============================================
export const ErrorState_Dark: Story = {
  ...ErrorState,
  name: 'Error State (Dark)',
  decorators: [darkThemeDecorator],
  parameters: {
    ...ErrorState.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Error message readable on dark background - no function found error.',
      },
    },
  },
};

// ============================================
// Running State (Dark)
// ============================================
export const RunningState_Dark: Story = {
  ...RunningState,
  name: 'Running State (Dark)',
  decorators: [darkThemeDecorator],
  parameters: {
    ...RunningState.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Loading spinner visible on dark background while tests are executing.',
      },
    },
  },
};

// ============================================
// Many Test Results (Dark)
// ============================================
export const ManyTestResults_Dark: Story = {
  ...ManyTestResults,
  name: 'Many Test Results (Dark)',
  decorators: [darkThemeDecorator],
  parameters: {
    ...ManyTestResults.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Large number of test results on dark background - verifies scroll behavior and contrast.',
      },
    },
  },
};

// ============================================
// Syntax Error (Dark)
// ============================================
export const SyntaxError_Dark: Story = {
  ...SyntaxError,
  name: 'Syntax Error (Dark)',
  decorators: [darkThemeDecorator],
  parameters: {
    ...SyntaxError.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Syntax error with line information readable on dark background.',
      },
    },
  },
};

// ============================================
// Runtime Error (Dark)
// ============================================
export const RuntimeError_Dark: Story = {
  ...RuntimeError,
  name: 'Runtime Error (Dark)',
  decorators: [darkThemeDecorator],
  parameters: {
    ...RuntimeError.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Runtime errors visible and readable on dark background.',
      },
    },
  },
};

// ============================================
// Initial State (Dark)
// ============================================
export const InitialState_Dark: Story = {
  ...InitialState,
  name: 'Initial State (Dark)',
  decorators: [darkThemeDecorator],
  parameters: {
    ...InitialState.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Initial state prompt visible on dark background.',
      },
    },
  },
};

// ============================================
// Long Input/Output (Dark)
// ============================================
export const LongInputOutput_Dark: Story = {
  ...LongInputOutput,
  name: 'Long Input/Output (Dark)',
  decorators: [darkThemeDecorator],
  parameters: {
    ...LongInputOutput.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Complex objects and long strings properly formatted on dark background.',
      },
    },
  },
};

// ============================================
// Console Output (Dark)
// ============================================
export const WithConsoleOutput_Dark: Story = {
  ...WithConsoleOutput,
  name: 'With Console Output (Dark)',
  decorators: [darkThemeDecorator],
  parameters: {
    ...WithConsoleOutput.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Console output displayed alongside test results on dark background.',
      },
    },
  },
};

// ============================================
// Timeout Error (Dark)
// ============================================
export const TimeoutError_Dark: Story = {
  ...TimeoutError,
  name: 'Timeout Error (Dark)',
  decorators: [darkThemeDecorator],
  parameters: {
    ...TimeoutError.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Timeout error message readable on dark background.',
      },
    },
  },
};

// ============================================
// Code Safety Error (Dark)
// ============================================
export const CodeSafetyError_Dark: Story = {
  ...CodeSafetyError,
  name: 'Code Safety Error (Dark)',
  decorators: [darkThemeDecorator],
  parameters: {
    ...CodeSafetyError.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Code safety violation messages readable on dark background.',
      },
    },
  },
};
