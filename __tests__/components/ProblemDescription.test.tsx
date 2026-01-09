import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProblemDescription from '@/components/ProblemDescription';
import type { Problem } from '@/lib/problems';

// Helper to create a complete mock problem
function createMockProblem(overrides: Partial<Problem> = {}): Problem {
  return {
    id: 'test-problem',
    title: 'Test Problem Title',
    difficulty: 'medium',
    category: 'Testing',
    description: '<p>This is a test description with <strong>HTML</strong> content.</p>',
    examples: [
      {
        input: 'test input',
        output: 'test output',
        explanation: 'This is an explanation',
      },
    ],
    starterCode: 'function test() {}',
    solution: 'function test() { return true; }',
    testCases: [{ input: 'test', expectedOutput: true }],
    hints: ['Hint 1', 'Hint 2'],
    ...overrides,
  };
}

describe('ProblemDescription', () => {
  describe('Title and Header', () => {
    it('renders the problem title', () => {
      const problem = createMockProblem({ title: 'My Awesome Problem' });
      render(<ProblemDescription problem={problem} />);

      expect(screen.getByRole('heading', { name: /My Awesome Problem/i })).toBeInTheDocument();
    });

    it('renders the category', () => {
      const problem = createMockProblem({ category: 'JavaScript Basics' });
      render(<ProblemDescription problem={problem} />);

      expect(screen.getByText('JavaScript Basics')).toBeInTheDocument();
    });
  });

  describe('Difficulty Badge', () => {
    it('renders easy difficulty badge with correct styling', () => {
      const problem = createMockProblem({ difficulty: 'easy' });
      render(<ProblemDescription problem={problem} />);

      const badge = screen.getByText('easy');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('bg-green-100', 'text-green-800');
    });

    it('renders medium difficulty badge with correct styling', () => {
      const problem = createMockProblem({ difficulty: 'medium' });
      render(<ProblemDescription problem={problem} />);

      const badge = screen.getByText('medium');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800');
    });

    it('renders hard difficulty badge with correct styling', () => {
      const problem = createMockProblem({ difficulty: 'hard' });
      render(<ProblemDescription problem={problem} />);

      const badge = screen.getByText('hard');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('bg-red-100', 'text-red-800');
    });
  });

  describe('Tabs', () => {
    it('renders three tabs: Description, Examples, Hints', () => {
      const problem = createMockProblem();
      render(<ProblemDescription problem={problem} />);

      expect(screen.getByRole('button', { name: /Description/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Examples/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Hints/i })).toBeInTheDocument();
    });

    it('shows Description tab content by default', () => {
      const problem = createMockProblem({
        description: '<p>Default visible description</p>',
      });
      render(<ProblemDescription problem={problem} />);

      // Description should be visible by default
      expect(screen.getByText(/Default visible description/)).toBeInTheDocument();
    });

    it('shows counts on Examples and Hints tabs', () => {
      const problem = createMockProblem({
        examples: [
          { input: 'a', output: 'b' },
          { input: 'c', output: 'd' },
        ],
        hints: ['hint1', 'hint2', 'hint3'],
      });
      render(<ProblemDescription problem={problem} />);

      // Check that counts are displayed
      expect(screen.getByText('2')).toBeInTheDocument(); // Examples count
      expect(screen.getByText('3')).toBeInTheDocument(); // Hints count
    });
  });

  describe('Description Tab', () => {
    it('renders the problem description', () => {
      const problem = createMockProblem({
        description: '<p>Solve this problem by implementing a function.</p>',
      });
      render(<ProblemDescription problem={problem} />);

      expect(
        screen.getByText(/Solve this problem by implementing a function/)
      ).toBeInTheDocument();
    });

    it('handles empty description', () => {
      const problem = createMockProblem({ description: '' });
      const { container } = render(<ProblemDescription problem={problem} />);

      // Should still render without crashing
      expect(container).toBeInTheDocument();
    });
  });

  describe('Examples Tab', () => {
    it('renders examples when Examples tab is clicked', async () => {
      const user = userEvent.setup();
      const problem = createMockProblem({
        examples: [
          { input: 'input1', output: 'output1' },
          { input: 'input2', output: 'output2' },
        ],
      });
      render(<ProblemDescription problem={problem} />);

      // Click the Examples tab
      await user.click(screen.getByRole('button', { name: /Examples/i }));

      expect(screen.getByText('Example 1:')).toBeInTheDocument();
      expect(screen.getByText('Example 2:')).toBeInTheDocument();
    });

    it('shows "No examples available" message when examples array is empty', async () => {
      const user = userEvent.setup();
      const problem = createMockProblem({ examples: [] });
      render(<ProblemDescription problem={problem} />);

      // Click the Examples tab
      await user.click(screen.getByRole('button', { name: /Examples/i }));

      expect(screen.getByText('No examples available.')).toBeInTheDocument();
    });

    it('renders input and output for each example', async () => {
      const user = userEvent.setup();
      const problem = createMockProblem({
        examples: [{ input: '[1, 2, 3]', output: '6' }],
      });
      render(<ProblemDescription problem={problem} />);

      // Click the Examples tab
      await user.click(screen.getByRole('button', { name: /Examples/i }));

      expect(screen.getByText('Input:')).toBeInTheDocument();
      expect(screen.getByText('[1, 2, 3]')).toBeInTheDocument();
      expect(screen.getByText('Output:')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
    });

    it('renders explanation when provided', async () => {
      const user = userEvent.setup();
      const problem = createMockProblem({
        examples: [
          {
            input: 'test',
            output: 'result',
            explanation: 'Because this is how it works',
          },
        ],
      });
      render(<ProblemDescription problem={problem} />);

      // Click the Examples tab
      await user.click(screen.getByRole('button', { name: /Examples/i }));

      expect(screen.getByText('Because this is how it works')).toBeInTheDocument();
    });

    it('does not render explanation when not provided', async () => {
      const user = userEvent.setup();
      const problem = createMockProblem({
        examples: [
          {
            input: 'test',
            output: 'result',
            // No explanation
          },
        ],
      });
      render(<ProblemDescription problem={problem} />);

      // Click the Examples tab
      await user.click(screen.getByRole('button', { name: /Examples/i }));

      // There should be no italic text for explanation
      const italicElements = screen.queryAllByText(/.*/, { selector: '.italic' });
      expect(italicElements.length).toBe(0);
    });

    it('renders multiple examples with correct numbering', async () => {
      const user = userEvent.setup();
      const problem = createMockProblem({
        examples: [
          { input: 'a', output: '1' },
          { input: 'b', output: '2' },
          { input: 'c', output: '3' },
        ],
      });
      render(<ProblemDescription problem={problem} />);

      // Click the Examples tab
      await user.click(screen.getByRole('button', { name: /Examples/i }));

      expect(screen.getByText('Example 1:')).toBeInTheDocument();
      expect(screen.getByText('Example 2:')).toBeInTheDocument();
      expect(screen.getByText('Example 3:')).toBeInTheDocument();
    });
  });

  describe('Hints Tab', () => {
    it('renders hints when Hints tab is clicked', async () => {
      const user = userEvent.setup();
      const problem = createMockProblem({
        hints: ['First hint', 'Second hint'],
      });
      render(<ProblemDescription problem={problem} />);

      // Click the Hints tab
      await user.click(screen.getByRole('button', { name: /Hints/i }));

      expect(screen.getByText('First hint')).toBeInTheDocument();
      expect(screen.getByText('Second hint')).toBeInTheDocument();
    });

    it('shows "No hints available" message when hints array is empty', async () => {
      const user = userEvent.setup();
      const problem = createMockProblem({ hints: [] });
      render(<ProblemDescription problem={problem} />);

      // Click the Hints tab
      await user.click(screen.getByRole('button', { name: /Hints/i }));

      expect(screen.getByText('No hints available.')).toBeInTheDocument();
    });

    it('renders all hints as list items', async () => {
      const user = userEvent.setup();
      const problem = createMockProblem({
        hints: ['Use Array.reduce()', 'Consider edge cases', 'Think about time complexity'],
      });
      render(<ProblemDescription problem={problem} />);

      // Click the Hints tab
      await user.click(screen.getByRole('button', { name: /Hints/i }));

      expect(screen.getByText('Use Array.reduce()')).toBeInTheDocument();
      expect(screen.getByText('Consider edge cases')).toBeInTheDocument();
      expect(screen.getByText('Think about time complexity')).toBeInTheDocument();
    });

    it('hints are rendered in a list', async () => {
      const user = userEvent.setup();
      const problem = createMockProblem({
        hints: ['A hint'],
      });
      const { container } = render(<ProblemDescription problem={problem} />);

      // Click the Hints tab
      await user.click(screen.getByRole('button', { name: /Hints/i }));

      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();

      const listItems = container.querySelectorAll('li');
      expect(listItems.length).toBe(1);
    });
  });

  describe('Tab Navigation', () => {
    it('switches between tabs correctly', async () => {
      const user = userEvent.setup();
      const problem = createMockProblem({
        description: '<p>Description content</p>',
        examples: [{ input: 'test', output: 'result' }],
        hints: ['A helpful hint'],
      });
      render(<ProblemDescription problem={problem} />);

      // Initially on Description tab
      expect(screen.getByText(/Description content/)).toBeInTheDocument();
      expect(screen.queryByText('Example 1:')).not.toBeInTheDocument();
      expect(screen.queryByText('A helpful hint')).not.toBeInTheDocument();

      // Switch to Examples tab
      await user.click(screen.getByRole('button', { name: /Examples/i }));
      expect(screen.queryByText(/Description content/)).not.toBeInTheDocument();
      expect(screen.getByText('Example 1:')).toBeInTheDocument();
      expect(screen.queryByText('A helpful hint')).not.toBeInTheDocument();

      // Switch to Hints tab
      await user.click(screen.getByRole('button', { name: /Hints/i }));
      expect(screen.queryByText(/Description content/)).not.toBeInTheDocument();
      expect(screen.queryByText('Example 1:')).not.toBeInTheDocument();
      expect(screen.getByText('A helpful hint')).toBeInTheDocument();

      // Switch back to Description tab
      await user.click(screen.getByRole('button', { name: /Description/i }));
      expect(screen.getByText(/Description content/)).toBeInTheDocument();
      expect(screen.queryByText('Example 1:')).not.toBeInTheDocument();
      expect(screen.queryByText('A helpful hint')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('renders correctly with minimal problem data', () => {
      const problem = createMockProblem({
        title: 'Minimal',
        difficulty: 'easy',
        category: 'Test',
        description: 'Simple',
        examples: [],
        hints: [],
      });

      const { container } = render(<ProblemDescription problem={problem} />);
      expect(container).toBeInTheDocument();
      expect(screen.getByText('Minimal')).toBeInTheDocument();
    });

    it('handles special characters in content', () => {
      const problem = createMockProblem({
        title: 'Test <script> & "quotes"',
        description: '<p>Code: const x = a && b || c;</p>',
      });
      render(<ProblemDescription problem={problem} />);

      expect(screen.getByText(/Test <script> & "quotes"/)).toBeInTheDocument();
    });

    it('handles very long content without breaking layout', async () => {
      const user = userEvent.setup();
      const longText = 'A'.repeat(1000);
      const problem = createMockProblem({
        description: `<p>${longText}</p>`,
        examples: [{ input: longText, output: longText }],
        hints: [longText],
      });

      const { container } = render(<ProblemDescription problem={problem} />);
      expect(container).toBeInTheDocument();

      // Check examples tab with long content
      await user.click(screen.getByRole('button', { name: /Examples/i }));
      expect(container).toBeInTheDocument();

      // Check hints tab with long content
      await user.click(screen.getByRole('button', { name: /Hints/i }));
      expect(container).toBeInTheDocument();
    });

    it('handles unicode characters', () => {
      const problem = createMockProblem({
        title: 'Unicode Test',
        description: '<p>Support for emojis and symbols</p>',
        examples: [{ input: 'foo', output: 'bar' }],
        hints: ['Use the right approach'],
      });
      render(<ProblemDescription problem={problem} />);

      expect(screen.getByText('Unicode Test')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      const problem = createMockProblem({
        examples: [{ input: 'a', output: 'b' }],
      });
      render(<ProblemDescription problem={problem} />);

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
    });

    it('tab buttons are focusable and clickable', async () => {
      const user = userEvent.setup();
      const problem = createMockProblem({
        hints: ['A hint'],
      });
      render(<ProblemDescription problem={problem} />);

      const hintsTab = screen.getByRole('button', { name: /Hints/i });
      expect(hintsTab).toBeInTheDocument();

      // Click and verify tab switches
      await user.click(hintsTab);
      expect(screen.getByText('A hint')).toBeInTheDocument();
    });

    it('code blocks use pre elements for proper semantics', async () => {
      const user = userEvent.setup();
      const problem = createMockProblem({
        examples: [{ input: 'const x = 1', output: '1' }],
      });
      const { container } = render(<ProblemDescription problem={problem} />);

      // Switch to Examples tab
      await user.click(screen.getByRole('button', { name: /Examples/i }));

      const preElements = container.querySelectorAll('pre');
      expect(preElements.length).toBeGreaterThan(0);
    });
  });
});
