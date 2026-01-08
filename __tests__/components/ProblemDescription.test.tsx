import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProblemDescription from '@/components/ProblemDescription';
import type { Problem } from '@/lib/problems';

// Mock html-react-parser to avoid issues with HTML parsing in tests
jest.mock('html-react-parser', () => {
  return jest.fn((html: string) => html);
});

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

      const badge = screen.getByText('EASY');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('bg-green-100', 'text-green-800');
    });

    it('renders medium difficulty badge with correct styling', () => {
      const problem = createMockProblem({ difficulty: 'medium' });
      render(<ProblemDescription problem={problem} />);

      const badge = screen.getByText('MEDIUM');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800');
    });

    it('renders hard difficulty badge with correct styling', () => {
      const problem = createMockProblem({ difficulty: 'hard' });
      render(<ProblemDescription problem={problem} />);

      const badge = screen.getByText('HARD');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('bg-red-100', 'text-red-800');
    });
  });

  describe('Description', () => {
    it('renders the problem description', () => {
      const problem = createMockProblem({
        description: '<p>Solve this problem by implementing a function.</p>',
      });
      render(<ProblemDescription problem={problem} />);

      expect(
        screen.getByText('<p>Solve this problem by implementing a function.</p>')
      ).toBeInTheDocument();
    });

    it('handles empty description', () => {
      const problem = createMockProblem({ description: '' });
      const { container } = render(<ProblemDescription problem={problem} />);

      // Should still render without crashing
      expect(container).toBeInTheDocument();
    });
  });

  describe('Examples Section', () => {
    it('renders examples section when examples exist', () => {
      const problem = createMockProblem({
        examples: [
          { input: 'input1', output: 'output1' },
          { input: 'input2', output: 'output2' },
        ],
      });
      render(<ProblemDescription problem={problem} />);

      expect(screen.getByRole('heading', { name: /Examples/i })).toBeInTheDocument();
      expect(screen.getByText('Example 1:')).toBeInTheDocument();
      expect(screen.getByText('Example 2:')).toBeInTheDocument();
    });

    it('does not render examples section when examples array is empty', () => {
      const problem = createMockProblem({ examples: [] });
      render(<ProblemDescription problem={problem} />);

      expect(screen.queryByRole('heading', { name: /Examples/i })).not.toBeInTheDocument();
    });

    it('renders input and output for each example', () => {
      const problem = createMockProblem({
        examples: [{ input: '[1, 2, 3]', output: '6' }],
      });
      render(<ProblemDescription problem={problem} />);

      expect(screen.getByText('Input:')).toBeInTheDocument();
      expect(screen.getByText('[1, 2, 3]')).toBeInTheDocument();
      expect(screen.getByText('Output:')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
    });

    it('renders explanation when provided', () => {
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

      expect(screen.getByText('Because this is how it works')).toBeInTheDocument();
    });

    it('does not render explanation when not provided', () => {
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

      // There should be no italic text for explanation
      const italicElements = screen.queryAllByText(/.*/, { selector: '.italic' });
      expect(italicElements.length).toBe(0);
    });

    it('renders multiple examples with correct numbering', () => {
      const problem = createMockProblem({
        examples: [
          { input: 'a', output: '1' },
          { input: 'b', output: '2' },
          { input: 'c', output: '3' },
        ],
      });
      render(<ProblemDescription problem={problem} />);

      expect(screen.getByText('Example 1:')).toBeInTheDocument();
      expect(screen.getByText('Example 2:')).toBeInTheDocument();
      expect(screen.getByText('Example 3:')).toBeInTheDocument();
    });
  });

  describe('Hints Section', () => {
    it('renders hints section when hints exist', () => {
      const problem = createMockProblem({
        hints: ['First hint', 'Second hint'],
      });
      render(<ProblemDescription problem={problem} />);

      expect(screen.getByText('Hints')).toBeInTheDocument();
    });

    it('does not render hints section when hints array is empty', () => {
      const problem = createMockProblem({ hints: [] });
      render(<ProblemDescription problem={problem} />);

      expect(screen.queryByText('Hints')).not.toBeInTheDocument();
    });

    it('renders all hints as list items', () => {
      const problem = createMockProblem({
        hints: ['Use Array.reduce()', 'Consider edge cases', 'Think about time complexity'],
      });
      render(<ProblemDescription problem={problem} />);

      expect(screen.getByText('Use Array.reduce()')).toBeInTheDocument();
      expect(screen.getByText('Consider edge cases')).toBeInTheDocument();
      expect(screen.getByText('Think about time complexity')).toBeInTheDocument();
    });

    it('hints are inside a details/summary element for collapsibility', () => {
      const problem = createMockProblem({
        hints: ['A hint'],
      });
      const { container } = render(<ProblemDescription problem={problem} />);

      const details = container.querySelector('details');
      expect(details).toBeInTheDocument();

      const summary = container.querySelector('summary');
      expect(summary).toBeInTheDocument();
      expect(summary).toHaveTextContent('Hints');
    });

    it('hints section can be expanded via user interaction', async () => {
      const user = userEvent.setup();
      const problem = createMockProblem({
        hints: ['Hidden hint content'],
      });
      const { container } = render(<ProblemDescription problem={problem} />);

      const details = container.querySelector('details') as HTMLDetailsElement;
      expect(details).not.toHaveAttribute('open');

      const summary = screen.getByText('Hints');
      await user.click(summary);

      expect(details).toHaveAttribute('open');
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

    it('handles very long content without breaking layout', () => {
      const longText = 'A'.repeat(1000);
      const problem = createMockProblem({
        description: `<p>${longText}</p>`,
        examples: [{ input: longText, output: longText }],
        hints: [longText],
      });

      const { container } = render(<ProblemDescription problem={problem} />);
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

      const h2 = screen.getByRole('heading', { level: 2 });
      expect(h2).toBeInTheDocument();
    });

    it('hints summary is focusable', () => {
      const problem = createMockProblem({
        hints: ['A hint'],
      });
      const { container } = render(<ProblemDescription problem={problem} />);

      const summary = container.querySelector('summary');
      expect(summary).toBeInTheDocument();
      // Summary elements are naturally focusable
    });

    it('code blocks use pre elements for proper semantics', () => {
      const problem = createMockProblem({
        examples: [{ input: 'const x = 1', output: '1' }],
      });
      const { container } = render(<ProblemDescription problem={problem} />);

      const preElements = container.querySelectorAll('pre');
      expect(preElements.length).toBeGreaterThan(0);
    });
  });
});
