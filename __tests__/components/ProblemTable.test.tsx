import { render, screen, within } from '@testing-library/react';
import ProblemTable from '@/components/ProblemTable';
import { useProgress } from '@/components/ProgressProvider';
import type { Problem } from '@/lib/problems';

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock the ProgressProvider
jest.mock('@/components/ProgressProvider', () => ({
  useProgress: jest.fn(),
}));

const mockUseProgress = useProgress as jest.MockedFunction<typeof useProgress>;

// Helper function to create mock problems
function createMockProblem(overrides: Partial<Problem> = {}): Problem {
  return {
    id: 'test-problem-1',
    title: 'Test Problem',
    difficulty: 'easy',
    category: 'Arrays',
    description: 'Test description',
    examples: [],
    starterCode: '',
    solution: '',
    testCases: [],
    hints: [],
    ...overrides,
  };
}

// Default mock progress context
const defaultMockProgressContext = {
  solvedProblems: new Set<string>(),
  solvedCount: 0,
  totalProblems: 5,
  streak: 0,
  markSolved: jest.fn(),
  markUnsolved: jest.fn(),
  isSolved: jest.fn(() => false),
  lastSolvedDate: null,
  resetProgress: jest.fn(),
};

describe('ProblemTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseProgress.mockReturnValue(defaultMockProgressContext);
  });

  describe('Rendering table with problems', () => {
    it('should render a table element', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('should render table with multiple problems', () => {
      const problems = [
        createMockProblem({ id: 'problem-1', title: 'First Problem' }),
        createMockProblem({ id: 'problem-2', title: 'Second Problem' }),
        createMockProblem({ id: 'problem-3', title: 'Third Problem' }),
      ];
      render(<ProblemTable problems={problems} />);

      expect(screen.getByText('First Problem')).toBeInTheDocument();
      expect(screen.getByText('Second Problem')).toBeInTheDocument();
      expect(screen.getByText('Third Problem')).toBeInTheDocument();
    });

    it('should render the correct number of rows', () => {
      const problems = [
        createMockProblem({ id: 'problem-1' }),
        createMockProblem({ id: 'problem-2' }),
        createMockProblem({ id: 'problem-3' }),
        createMockProblem({ id: 'problem-4' }),
      ];
      render(<ProblemTable problems={problems} />);

      const rows = screen.getAllByRole('row');
      // 1 header row + 4 data rows
      expect(rows).toHaveLength(5);
    });

    it('should render the table within an overflow container', () => {
      const problems = [createMockProblem()];
      const { container } = render(<ProblemTable problems={problems} />);

      const overflowContainer = container.querySelector('.overflow-x-auto');
      expect(overflowContainer).toBeInTheDocument();
    });
  });

  describe('Column headers', () => {
    it('should render Status column header', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      expect(screen.getByRole('columnheader', { name: /status/i })).toBeInTheDocument();
    });

    it('should render Title column header', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      expect(screen.getByRole('columnheader', { name: /title/i })).toBeInTheDocument();
    });

    it('should render Difficulty column header', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      expect(screen.getByRole('columnheader', { name: /difficulty/i })).toBeInTheDocument();
    });

    it('should render Category column header', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      expect(screen.getByRole('columnheader', { name: /category/i })).toBeInTheDocument();
    });

    it('should render all four column headers in correct order', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      const headers = screen.getAllByRole('columnheader');
      expect(headers).toHaveLength(4);
      expect(headers[0]).toHaveTextContent('Status');
      expect(headers[1]).toHaveTextContent('Title');
      expect(headers[2]).toHaveTextContent('Difficulty');
      expect(headers[3]).toHaveTextContent('Category');
    });
  });

  describe('Difficulty badge colors', () => {
    it('should apply green color class for easy difficulty', () => {
      const problems = [createMockProblem({ difficulty: 'easy' })];
      render(<ProblemTable problems={problems} />);

      // There are two difficulty indicators: one for mobile (inline) and one for desktop
      const difficultySpans = screen.getAllByText('easy');
      difficultySpans.forEach((span) => {
        expect(span).toHaveClass('text-green-600');
      });
    });

    it('should apply yellow color class for medium difficulty', () => {
      const problems = [createMockProblem({ difficulty: 'medium' })];
      render(<ProblemTable problems={problems} />);

      const difficultySpans = screen.getAllByText('medium');
      difficultySpans.forEach((span) => {
        expect(span).toHaveClass('text-yellow-600');
      });
    });

    it('should apply red color class for hard difficulty', () => {
      const problems = [createMockProblem({ difficulty: 'hard' })];
      render(<ProblemTable problems={problems} />);

      const difficultySpans = screen.getAllByText('hard');
      difficultySpans.forEach((span) => {
        expect(span).toHaveClass('text-red-600');
      });
    });

    it('should display difficulty text capitalized in desktop view', () => {
      const problems = [
        createMockProblem({ id: 'easy-prob', difficulty: 'easy' }),
        createMockProblem({ id: 'medium-prob', difficulty: 'medium' }),
        createMockProblem({ id: 'hard-prob', difficulty: 'hard' }),
      ];
      render(<ProblemTable problems={problems} />);

      // Check that difficulty spans in the hidden desktop column have capitalize class
      const easySpans = screen.getAllByText('easy');
      const mediumSpans = screen.getAllByText('medium');
      const hardSpans = screen.getAllByText('hard');

      // Desktop version (in hidden td column) should have capitalize class
      easySpans.forEach((span) => {
        // The desktop difficulty span is inside a td with hidden class
        if (span.closest('td')?.classList.contains('hidden')) {
          expect(span).toHaveClass('capitalize');
        }
      });
      mediumSpans.forEach((span) => {
        if (span.closest('td')?.classList.contains('hidden')) {
          expect(span).toHaveClass('capitalize');
        }
      });
      hardSpans.forEach((span) => {
        if (span.closest('td')?.classList.contains('hidden')) {
          expect(span).toHaveClass('capitalize');
        }
      });
    });

    it('should apply dark mode color variants for all difficulties', () => {
      const problems = [
        createMockProblem({ id: 'easy-prob', difficulty: 'easy' }),
        createMockProblem({ id: 'medium-prob', difficulty: 'medium' }),
        createMockProblem({ id: 'hard-prob', difficulty: 'hard' }),
      ];
      render(<ProblemTable problems={problems} />);

      const easySpans = screen.getAllByText('easy');
      const mediumSpans = screen.getAllByText('medium');
      const hardSpans = screen.getAllByText('hard');

      easySpans.forEach((span) => {
        expect(span).toHaveClass('dark:text-green-400');
      });
      mediumSpans.forEach((span) => {
        expect(span).toHaveClass('dark:text-yellow-400');
      });
      hardSpans.forEach((span) => {
        expect(span).toHaveClass('dark:text-red-400');
      });
    });
  });

  describe('Status indicators (solved/unsolved)', () => {
    it('should show unsolved indicator (empty circle) for unsolved problems', () => {
      mockUseProgress.mockReturnValue({
        ...defaultMockProgressContext,
        isSolved: jest.fn(() => false),
      });

      const problems = [createMockProblem({ id: 'unsolved-problem' })];
      const { container } = render(<ProblemTable problems={problems} />);

      // Unsolved problems have an empty div with border
      const emptyCircle = container.querySelector('.border-gray-300');
      expect(emptyCircle).toBeInTheDocument();
      expect(emptyCircle).toHaveClass('rounded-full');
      expect(emptyCircle).toHaveClass('border-2');
    });

    it('should show solved indicator (checkmark SVG) for solved problems', () => {
      mockUseProgress.mockReturnValue({
        ...defaultMockProgressContext,
        isSolved: jest.fn((id) => id === 'solved-problem'),
      });

      const problems = [createMockProblem({ id: 'solved-problem' })];
      const { container } = render(<ProblemTable problems={problems} />);

      // Solved problems have an SVG with green color
      const checkmark = container.querySelector('svg.text-green-500');
      expect(checkmark).toBeInTheDocument();
    });

    it('should call isSolved with correct problem ID', () => {
      const mockIsSolved = jest.fn(() => false);
      mockUseProgress.mockReturnValue({
        ...defaultMockProgressContext,
        isSolved: mockIsSolved,
      });

      const problems = [
        createMockProblem({ id: 'problem-abc' }),
        createMockProblem({ id: 'problem-xyz' }),
      ];
      render(<ProblemTable problems={problems} />);

      expect(mockIsSolved).toHaveBeenCalledWith('problem-abc');
      expect(mockIsSolved).toHaveBeenCalledWith('problem-xyz');
    });

    it('should show mixed solved and unsolved states', () => {
      mockUseProgress.mockReturnValue({
        ...defaultMockProgressContext,
        isSolved: jest.fn((id) => id === 'solved-1' || id === 'solved-3'),
      });

      const problems = [
        createMockProblem({ id: 'solved-1', title: 'Solved 1' }),
        createMockProblem({ id: 'unsolved-2', title: 'Unsolved 2' }),
        createMockProblem({ id: 'solved-3', title: 'Solved 3' }),
      ];
      const { container } = render(<ProblemTable problems={problems} />);

      const checkmarks = container.querySelectorAll('svg.text-green-500');
      const emptyCircles = container.querySelectorAll('.border-gray-300.rounded-full');

      expect(checkmarks).toHaveLength(2);
      expect(emptyCircles).toHaveLength(1);
    });

    it('should display checkmark SVG with correct viewBox', () => {
      mockUseProgress.mockReturnValue({
        ...defaultMockProgressContext,
        isSolved: jest.fn(() => true),
      });

      const problems = [createMockProblem({ id: 'solved' })];
      const { container } = render(<ProblemTable problems={problems} />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 20 20');
      expect(svg).toHaveAttribute('fill', 'currentColor');
    });
  });

  describe('Click handling on rows (links)', () => {
    it('should render problem title as a link', () => {
      const problems = [createMockProblem({ id: 'test-link', title: 'Clickable Problem' })];
      render(<ProblemTable problems={problems} />);

      const link = screen.getByRole('link', { name: 'Clickable Problem' });
      expect(link).toBeInTheDocument();
    });

    it('should set correct href on problem links', () => {
      const problems = [createMockProblem({ id: 'my-problem', title: 'My Problem' })];
      render(<ProblemTable problems={problems} />);

      const link = screen.getByRole('link', { name: 'My Problem' });
      expect(link).toHaveAttribute('href', '/problems/my-problem');
    });

    it('should render links for all problems', () => {
      const problems = [
        createMockProblem({ id: 'problem-1', title: 'Problem One' }),
        createMockProblem({ id: 'problem-2', title: 'Problem Two' }),
        createMockProblem({ id: 'problem-3', title: 'Problem Three' }),
      ];
      render(<ProblemTable problems={problems} />);

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(3);
      expect(links[0]).toHaveAttribute('href', '/problems/problem-1');
      expect(links[1]).toHaveAttribute('href', '/problems/problem-2');
      expect(links[2]).toHaveAttribute('href', '/problems/problem-3');
    });

    it('should have hover styles on links', () => {
      const problems = [createMockProblem({ id: 'hover-test', title: 'Hover Test' })];
      render(<ProblemTable problems={problems} />);

      const link = screen.getByRole('link', { name: 'Hover Test' });
      expect(link).toHaveClass('hover:text-blue-600');
      expect(link).toHaveClass('dark:hover:text-blue-400');
    });
  });

  describe('Empty state handling', () => {
    it('should render empty state message when no problems', () => {
      render(<ProblemTable problems={[]} />);

      expect(screen.getByText('No problems found matching your filters.')).toBeInTheDocument();
    });

    it('should still render table structure with empty problems', () => {
      render(<ProblemTable problems={[]} />);

      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('should render table headers even when empty', () => {
      render(<ProblemTable problems={[]} />);

      const headers = screen.getAllByRole('columnheader');
      expect(headers).toHaveLength(4);
    });

    it('should not show empty state when problems exist', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      expect(
        screen.queryByText('No problems found matching your filters.')
      ).not.toBeInTheDocument();
    });

    it('should have centered text style for empty state', () => {
      render(<ProblemTable problems={[]} />);

      const emptyState = screen.getByText('No problems found matching your filters.');
      expect(emptyState).toHaveClass('text-center');
      expect(emptyState).toHaveClass('py-12');
    });

    it('should have muted text color for empty state', () => {
      render(<ProblemTable problems={[]} />);

      const emptyState = screen.getByText('No problems found matching your filters.');
      expect(emptyState).toHaveClass('text-gray-500');
      expect(emptyState).toHaveClass('dark:text-gray-400');
    });
  });

  describe('Row styling', () => {
    it('should apply alternating row colors', () => {
      const problems = [
        createMockProblem({ id: 'problem-1' }),
        createMockProblem({ id: 'problem-2' }),
        createMockProblem({ id: 'problem-3' }),
      ];
      render(<ProblemTable problems={problems} />);

      const rows = screen.getAllByRole('row');
      // Skip header row (index 0)
      const dataRows = rows.slice(1);

      // Even index rows (0, 2) should have bg-white
      expect(dataRows[0]).toHaveClass('bg-white');
      // Odd index rows (1) should have bg-gray-50/50
      expect(dataRows[1]).toHaveClass('bg-gray-50/50');
      expect(dataRows[2]).toHaveClass('bg-white');
    });

    it('should have hover styles on rows', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      const rows = screen.getAllByRole('row');
      const dataRow = rows[1]; // First data row

      expect(dataRow).toHaveClass('hover:bg-gray-50');
      expect(dataRow).toHaveClass('dark:hover:bg-gray-800/50');
    });

    it('should have transition styles on rows', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      const rows = screen.getAllByRole('row');
      const dataRow = rows[1];

      expect(dataRow).toHaveClass('transition-colors');
    });

    it('should apply group class for group-hover effects', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      const rows = screen.getAllByRole('row');
      const dataRow = rows[1];

      expect(dataRow).toHaveClass('group');
    });
  });

  describe('Category display', () => {
    it('should display category for each problem', () => {
      const problems = [
        createMockProblem({ id: 'p1', category: 'Arrays' }),
        createMockProblem({ id: 'p2', category: 'Strings' }),
        createMockProblem({ id: 'p3', category: 'Objects' }),
      ];
      render(<ProblemTable problems={problems} />);

      expect(screen.getByText('Arrays')).toBeInTheDocument();
      expect(screen.getByText('Strings')).toBeInTheDocument();
      expect(screen.getByText('Objects')).toBeInTheDocument();
    });

    it('should style category as a badge', () => {
      const problems = [createMockProblem({ category: 'Testing' })];
      render(<ProblemTable problems={problems} />);

      const categoryBadge = screen.getByText('Testing');
      expect(categoryBadge).toHaveClass('inline-flex');
      expect(categoryBadge).toHaveClass('rounded');
      expect(categoryBadge).toHaveClass('text-xs');
      expect(categoryBadge).toHaveClass('font-medium');
    });

    it('should have correct background color for category badge', () => {
      const problems = [createMockProblem({ category: 'Promises' })];
      render(<ProblemTable problems={problems} />);

      const categoryBadge = screen.getByText('Promises');
      expect(categoryBadge).toHaveClass('bg-gray-100');
      expect(categoryBadge).toHaveClass('dark:bg-gray-700');
    });
  });

  describe('Accessibility (table semantics)', () => {
    it('should use proper table element', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('should have thead element', () => {
      const problems = [createMockProblem()];
      const { container } = render(<ProblemTable problems={problems} />);

      expect(container.querySelector('thead')).toBeInTheDocument();
    });

    it('should have tbody element', () => {
      const problems = [createMockProblem()];
      const { container } = render(<ProblemTable problems={problems} />);

      expect(container.querySelector('tbody')).toBeInTheDocument();
    });

    it('should use th elements for headers', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      const headers = screen.getAllByRole('columnheader');
      expect(headers).toHaveLength(4);
    });

    it('should use td elements for data cells', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      const cells = screen.getAllByRole('cell');
      // 4 cells per row (Status, Title, Difficulty, Category)
      expect(cells).toHaveLength(4);
    });

    it('should have proper row structure', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      const rows = screen.getAllByRole('row');
      expect(rows.length).toBeGreaterThanOrEqual(2); // At least header and one data row
    });

    it('should have unique keys for each row', () => {
      const problems = [
        createMockProblem({ id: 'unique-1', title: 'Problem 1' }),
        createMockProblem({ id: 'unique-2', title: 'Problem 2' }),
      ];
      render(<ProblemTable problems={problems} />);

      // Verify both problems are rendered (keys are internal to React)
      expect(screen.getByText('Problem 1')).toBeInTheDocument();
      expect(screen.getByText('Problem 2')).toBeInTheDocument();
    });

    it('should be navigable by links', () => {
      const problems = [
        createMockProblem({ id: 'nav-1', title: 'Nav Problem 1' }),
        createMockProblem({ id: 'nav-2', title: 'Nav Problem 2' }),
      ];
      render(<ProblemTable problems={problems} />);

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(2);
    });
  });

  describe('Responsive design', () => {
    it('should hide difficulty column on small screens', () => {
      const problems = [createMockProblem()];
      const { container } = render(<ProblemTable problems={problems} />);

      // Difficulty header has sm:table-cell class (hidden by default, shown on sm+)
      const difficultyHeader = screen.getByRole('columnheader', { name: /difficulty/i });
      expect(difficultyHeader).toHaveClass('hidden');
      expect(difficultyHeader).toHaveClass('sm:table-cell');

      // Difficulty cell also has same classes
      const difficultyCell = container.querySelector('td.hidden.sm\\:table-cell');
      expect(difficultyCell).toBeInTheDocument();
    });

    it('should hide category column on medium screens and below', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      const categoryHeader = screen.getByRole('columnheader', { name: /category/i });
      expect(categoryHeader).toHaveClass('hidden');
      expect(categoryHeader).toHaveClass('md:table-cell');
    });

    it('should show inline difficulty on mobile', () => {
      const problems = [createMockProblem({ difficulty: 'medium' })];
      render(<ProblemTable problems={problems} />);

      // There should be a span with sm:hidden class showing difficulty inline
      const mobileDifficulty = screen
        .getAllByText('medium')
        .find((el) => el.classList.contains('sm:hidden'));
      expect(mobileDifficulty).toBeInTheDocument();
    });

    it('should have proper column widths defined', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      const statusHeader = screen.getByRole('columnheader', { name: /status/i });
      const difficultyHeader = screen.getByRole('columnheader', { name: /difficulty/i });
      const categoryHeader = screen.getByRole('columnheader', { name: /category/i });

      expect(statusHeader).toHaveClass('w-12');
      expect(difficultyHeader).toHaveClass('w-24');
      expect(categoryHeader).toHaveClass('w-40');
    });
  });

  describe('Table body styling', () => {
    it('should have divide styling on tbody', () => {
      const problems = [createMockProblem({ id: 'p1' }), createMockProblem({ id: 'p2' })];
      const { container } = render(<ProblemTable problems={problems} />);

      const tbody = container.querySelector('tbody');
      expect(tbody).toHaveClass('divide-y');
      expect(tbody).toHaveClass('divide-gray-100');
      expect(tbody).toHaveClass('dark:divide-gray-800');
    });
  });

  describe('Header styling', () => {
    it('should have border on header row', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      const headerRow = screen.getAllByRole('row')[0];
      expect(headerRow).toHaveClass('border-b');
      expect(headerRow).toHaveClass('border-gray-200');
    });

    it('should have text alignment left on headers', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      const headerRow = screen.getAllByRole('row')[0];
      expect(headerRow).toHaveClass('text-left');
    });

    it('should have small text size on headers', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      const headerRow = screen.getAllByRole('row')[0];
      expect(headerRow).toHaveClass('text-sm');
    });

    it('should have muted text color on headers', () => {
      const problems = [createMockProblem()];
      render(<ProblemTable problems={problems} />);

      const headerRow = screen.getAllByRole('row')[0];
      expect(headerRow).toHaveClass('text-gray-500');
      expect(headerRow).toHaveClass('dark:text-gray-400');
    });
  });

  describe('Link styling', () => {
    it('should have font-medium on links', () => {
      const problems = [createMockProblem({ title: 'Styled Link' })];
      render(<ProblemTable problems={problems} />);

      const link = screen.getByRole('link', { name: 'Styled Link' });
      expect(link).toHaveClass('font-medium');
    });

    it('should have transition styles on links', () => {
      const problems = [createMockProblem({ title: 'Transition Link' })];
      render(<ProblemTable problems={problems} />);

      const link = screen.getByRole('link', { name: 'Transition Link' });
      expect(link).toHaveClass('transition-colors');
    });

    it('should have correct text color on links', () => {
      const problems = [createMockProblem({ title: 'Color Link' })];
      render(<ProblemTable problems={problems} />);

      const link = screen.getByRole('link', { name: 'Color Link' });
      expect(link).toHaveClass('text-gray-900');
      expect(link).toHaveClass('dark:text-gray-100');
    });
  });

  describe('Status cell styling', () => {
    it('should center status indicators', () => {
      const problems = [createMockProblem()];
      const { container } = render(<ProblemTable problems={problems} />);

      const statusCell = container.querySelector('td.py-3.pl-4.pr-2');
      const flexContainer = statusCell?.querySelector('.flex.items-center.justify-center');
      expect(flexContainer).toBeInTheDocument();
    });
  });

  describe('Integration tests', () => {
    it('should render complete problem information', () => {
      mockUseProgress.mockReturnValue({
        ...defaultMockProgressContext,
        isSolved: jest.fn((id) => id === 'complete-problem'),
      });

      const problems = [
        createMockProblem({
          id: 'complete-problem',
          title: 'Complete Problem Title',
          difficulty: 'hard',
          category: 'Advanced TypeScript',
        }),
      ];
      render(<ProblemTable problems={problems} />);

      // Check title and link
      const link = screen.getByRole('link', { name: 'Complete Problem Title' });
      expect(link).toHaveAttribute('href', '/problems/complete-problem');

      // Check difficulty
      const difficultySpans = screen.getAllByText('hard');
      expect(difficultySpans.length).toBeGreaterThan(0);

      // Check category
      expect(screen.getByText('Advanced TypeScript')).toBeInTheDocument();

      // Check solved status (checkmark should be present)
      const { container } = render(<ProblemTable problems={problems} />);
      const checkmark = container.querySelector('svg.text-green-500');
      expect(checkmark).toBeInTheDocument();
    });

    it('should handle large number of problems', () => {
      const problems = Array.from({ length: 100 }, (_, i) =>
        createMockProblem({
          id: `problem-${i}`,
          title: `Problem ${i}`,
          difficulty: i % 3 === 0 ? 'easy' : i % 3 === 1 ? 'medium' : 'hard',
          category: `Category ${i % 5}`,
        })
      );
      render(<ProblemTable problems={problems} />);

      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(101); // 1 header + 100 data rows
    });

    it('should handle problems with special characters in title', () => {
      const problems = [
        createMockProblem({
          id: 'special-chars',
          title: 'Array<T> & Object.keys() | "Strings"',
        }),
      ];
      render(<ProblemTable problems={problems} />);

      expect(screen.getByText('Array<T> & Object.keys() | "Strings"')).toBeInTheDocument();
    });

    it('should handle problems with long category names', () => {
      const problems = [
        createMockProblem({
          id: 'long-category',
          category: 'Very Long Category Name That Might Cause Layout Issues',
        }),
      ];
      render(<ProblemTable problems={problems} />);

      expect(
        screen.getByText('Very Long Category Name That Might Cause Layout Issues')
      ).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should handle problem with empty title', () => {
      const problems = [createMockProblem({ id: 'empty-title', title: '' })];
      render(<ProblemTable problems={problems} />);

      const links = screen.getAllByRole('link');
      expect(links[0]).toHaveAttribute('href', '/problems/empty-title');
    });

    it('should handle problem with empty category', () => {
      const problems = [createMockProblem({ id: 'empty-category', category: '' })];
      const { container } = render(<ProblemTable problems={problems} />);

      // Should still render the category cell, just empty
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(2);
    });

    it('should handle rapid isSolved changes', () => {
      const mockIsSolved = jest.fn((id: string) => Math.random() > 0.5);
      mockUseProgress.mockReturnValue({
        ...defaultMockProgressContext,
        isSolved: mockIsSolved,
      });

      const problems = [
        createMockProblem({ id: 'rapid-1' }),
        createMockProblem({ id: 'rapid-2' }),
        createMockProblem({ id: 'rapid-3' }),
      ];

      // Should not throw
      expect(() => render(<ProblemTable problems={problems} />)).not.toThrow();
    });

    it('should handle problem IDs with special characters', () => {
      const problems = [
        createMockProblem({ id: 'problem-with-dashes' }),
        createMockProblem({ id: 'problem_with_underscores' }),
        createMockProblem({ id: 'problem.with.dots' }),
      ];
      render(<ProblemTable problems={problems} />);

      const links = screen.getAllByRole('link');
      expect(links[0]).toHaveAttribute('href', '/problems/problem-with-dashes');
      expect(links[1]).toHaveAttribute('href', '/problems/problem_with_underscores');
      expect(links[2]).toHaveAttribute('href', '/problems/problem.with.dots');
    });
  });

  describe('useProgress hook integration', () => {
    it('should use the isSolved function from useProgress', () => {
      const mockIsSolved = jest.fn(() => false);
      mockUseProgress.mockReturnValue({
        ...defaultMockProgressContext,
        isSolved: mockIsSolved,
      });

      const problems = [createMockProblem({ id: 'hook-test' })];
      render(<ProblemTable problems={problems} />);

      expect(mockIsSolved).toHaveBeenCalledWith('hook-test');
    });

    it('should re-render when isSolved results change', () => {
      const mockIsSolved = jest.fn(() => false);
      mockUseProgress.mockReturnValue({
        ...defaultMockProgressContext,
        isSolved: mockIsSolved,
      });

      const problems = [createMockProblem({ id: 'rerender-test' })];
      const { rerender, container } = render(<ProblemTable problems={problems} />);

      // Initially unsolved
      expect(container.querySelector('.border-gray-300')).toBeInTheDocument();

      // Change to solved
      mockUseProgress.mockReturnValue({
        ...defaultMockProgressContext,
        isSolved: jest.fn(() => true),
      });
      rerender(<ProblemTable problems={problems} />);

      // Now should show checkmark
      expect(container.querySelector('svg.text-green-500')).toBeInTheDocument();
    });
  });
});
