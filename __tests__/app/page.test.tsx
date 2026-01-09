import { render, screen, within } from '@testing-library/react';
import Home from '@/app/page';
import { ProgressContext } from '@/components/ProgressProvider';

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock the problems data
jest.mock('@/lib/problems', () => ({
  problems: [
    { id: 'problem-1', title: 'Problem 1', difficulty: 'easy', category: 'JavaScript Basics' },
    { id: 'problem-2', title: 'Problem 2', difficulty: 'easy', category: 'JavaScript Basics' },
    { id: 'problem-3', title: 'Problem 3', difficulty: 'medium', category: 'TypeScript' },
    { id: 'problem-4', title: 'Problem 4', difficulty: 'medium', category: 'TypeScript' },
    { id: 'problem-5', title: 'Problem 5', difficulty: 'hard', category: 'Async Patterns' },
  ],
}));

// Helper function to render with ProgressProvider context
function renderWithProgress(
  ui: React.ReactElement,
  progressValue?: Partial<{
    solvedProblems: Set<string>;
    solvedCount: number;
    totalProblems: number;
    streak: number;
    markSolved: (id: string) => void;
    markUnsolved: (id: string) => void;
    isSolved: (id: string) => boolean;
    lastSolvedDate: string | null;
    resetProgress: () => void;
  }>
) {
  const defaultValue = {
    solvedProblems: new Set<string>(),
    solvedCount: 0,
    totalProblems: 5,
    streak: 0,
    markSolved: jest.fn(),
    markUnsolved: jest.fn(),
    isSolved: jest.fn(() => false),
    lastSolvedDate: null,
    resetProgress: jest.fn(),
    ...progressValue,
  };

  return render(<ProgressContext.Provider value={defaultValue}>{ui}</ProgressContext.Provider>);
}

describe('Home Page', () => {
  describe('Rendering', () => {
    it('should render the main heading', () => {
      renderWithProgress(<Home />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'JavaScript & TypeScript Tricks'
      );
    });

    it('should render the subtitle description', () => {
      renderWithProgress(<Home />);

      expect(
        screen.getByText(/Master advanced JavaScript and TypeScript patterns/i)
      ).toBeInTheDocument();
    });

    it('should render the Start Practicing button with correct link', () => {
      renderWithProgress(<Home />);

      const startButton = screen.getByRole('link', { name: /Start Practicing/i });
      expect(startButton).toBeInTheDocument();
      expect(startButton).toHaveAttribute('href', '/problems');
    });

    it('should render the Features section', () => {
      renderWithProgress(<Home />);

      expect(screen.getByRole('heading', { name: /Features/i })).toBeInTheDocument();
    });

    it('should render all four feature cards', () => {
      renderWithProgress(<Home />);

      expect(screen.getByText('Interactive Code Editor')).toBeInTheDocument();
      expect(screen.getByText('Automated Testing')).toBeInTheDocument();
      expect(screen.getByText('Detailed Explanations')).toBeInTheDocument();
      expect(screen.getByText('Progressive Difficulty')).toBeInTheDocument();
    });

    it('should render the Topics Covered section', () => {
      renderWithProgress(<Home />);

      expect(screen.getByRole('heading', { name: /Topics Covered/i })).toBeInTheDocument();
    });
  });

  describe('Progress Display', () => {
    it('should display progress card with "Your Progress" label', () => {
      renderWithProgress(<Home />);

      expect(screen.getByText('Your Progress')).toBeInTheDocument();
    });

    it('should display solved count of 0 initially', () => {
      renderWithProgress(<Home />);

      // Look for the progress display showing 0/5
      expect(screen.getByText('0/5')).toBeInTheDocument();
    });

    it('should display correct progress when problems are solved', () => {
      renderWithProgress(<Home />, {
        solvedCount: 3,
        totalProblems: 5,
      });

      expect(screen.getByText('3/5')).toBeInTheDocument();
    });

    it('should display "Start solving problems" message when no progress', () => {
      renderWithProgress(<Home />, {
        solvedCount: 0,
      });

      expect(
        screen.getByText(/Start solving problems to track your progress/i)
      ).toBeInTheDocument();
    });

    it('should display percentage complete when there is progress', () => {
      renderWithProgress(<Home />, {
        solvedCount: 3,
        totalProblems: 5,
      });

      expect(screen.getByText('60% complete')).toBeInTheDocument();
    });

    it('should render progress bar with correct width', () => {
      const { container } = renderWithProgress(<Home />, {
        solvedCount: 2,
        totalProblems: 5,
      });

      const progressBar = container.querySelector('.bg-green-500');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveStyle({ width: '40%' });
    });
  });

  describe('Statistics Cards', () => {
    it('should render the Total stats card', () => {
      renderWithProgress(<Home />);

      const totalCard = screen.getByText('Total').closest('div');
      expect(totalCard).toBeInTheDocument();
      expect(within(totalCard!.parentElement!).getByText('5')).toBeInTheDocument();
    });

    it('should render the Easy stats card with correct count', () => {
      renderWithProgress(<Home />);

      const easyCard = screen.getByText('Easy').closest('div');
      expect(easyCard).toBeInTheDocument();
      expect(within(easyCard!.parentElement!).getByText('2')).toBeInTheDocument();
    });

    it('should render the Medium stats card with correct count', () => {
      renderWithProgress(<Home />);

      const mediumCard = screen.getByText('Medium').closest('div');
      expect(mediumCard).toBeInTheDocument();
      expect(within(mediumCard!.parentElement!).getByText('2')).toBeInTheDocument();
    });

    it('should render the Hard stats card with correct count', () => {
      renderWithProgress(<Home />);

      const hardCard = screen.getByText('Hard').closest('div');
      expect(hardCard).toBeInTheDocument();
      expect(within(hardCard!.parentElement!).getByText('1')).toBeInTheDocument();
    });
  });

  describe('Category Links', () => {
    it('should render category links for each unique category', () => {
      renderWithProgress(<Home />);

      // We have 3 unique categories in our mock data
      expect(screen.getByText('JavaScript Basics')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Async Patterns')).toBeInTheDocument();
    });

    it('should render correct problem count for each category', () => {
      renderWithProgress(<Home />);

      // JavaScript Basics has 2 problems, TypeScript has 2 problems
      const twoProblemsTexts = screen.getAllByText('2 problems');
      expect(twoProblemsTexts.length).toBe(2);
      // Async Patterns has 1 problem
      expect(screen.getByText('1 problem')).toBeInTheDocument();
    });

    it('should link categories to filtered problems page', () => {
      renderWithProgress(<Home />);

      const jsBasicsLink = screen.getByRole('link', { name: /JavaScript Basics/i });
      expect(jsBasicsLink).toHaveAttribute('href', '/problems?category=JavaScript%20Basics');

      const asyncLink = screen.getByRole('link', { name: /Async Patterns/i });
      expect(asyncLink).toHaveAttribute('href', '/problems?category=Async%20Patterns');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      renderWithProgress(<Home />);

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();

      const h2s = screen.getAllByRole('heading', { level: 2 });
      expect(h2s.length).toBeGreaterThan(0);

      const h3s = screen.getAllByRole('heading', { level: 3 });
      expect(h3s.length).toBeGreaterThan(0);
    });

    it('should have accessible links', () => {
      renderWithProgress(<Home />);

      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).toHaveAttribute('href');
      });
    });
  });

  describe('Memoization', () => {
    it('should compute stats correctly using memoization', () => {
      const { rerender } = renderWithProgress(<Home />);

      // Initial render
      expect(screen.getByText('5')).toBeInTheDocument(); // Total
      expect(screen.getAllByText('2').length).toBe(2); // Easy and Medium

      // Re-render with same props should not cause issues
      rerender(
        <ProgressContext.Provider
          value={{
            solvedProblems: new Set<string>(),
            solvedCount: 0,
            totalProblems: 5,
            streak: 0,
            markSolved: jest.fn(),
            markUnsolved: jest.fn(),
            isSolved: jest.fn(() => false),
            lastSolvedDate: null,
            resetProgress: jest.fn(),
          }}
        >
          <Home />
        </ProgressContext.Provider>
      );

      // Should still show same values
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle 100% completion', () => {
      renderWithProgress(<Home />, {
        solvedCount: 5,
        totalProblems: 5,
      });

      expect(screen.getByText('5/5')).toBeInTheDocument();
      expect(screen.getByText('100% complete')).toBeInTheDocument();
    });

    it('should render correctly with zero problems', () => {
      // This tests the edge case where stats might be computed on an empty array
      jest.doMock('@/lib/problems', () => ({
        problems: [],
      }));

      // For this specific test, we just verify the component doesn't crash
      // with the mocked data
      renderWithProgress(<Home />);

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should correctly integrate with progress context', () => {
      const mockMarkSolved = jest.fn();
      const mockIsSolved = jest.fn((id: string) => id === 'problem-1');

      renderWithProgress(<Home />, {
        solvedCount: 1,
        totalProblems: 5,
        markSolved: mockMarkSolved,
        isSolved: mockIsSolved,
      });

      // Verify progress is displayed based on context
      expect(screen.getByText('1/5')).toBeInTheDocument();
      expect(screen.getByText('20% complete')).toBeInTheDocument();
    });
  });

  describe('Visual Elements', () => {
    it('should render SVG icons in feature cards', () => {
      const { container } = renderWithProgress(<Home />);

      const svgElements = container.querySelectorAll('svg');
      expect(svgElements.length).toBeGreaterThan(0);
    });

    it('should have gradient background class', () => {
      const { container } = renderWithProgress(<Home />);

      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass('bg-gradient-to-br');
    });
  });
});

describe('Home Page Error Handling', () => {
  it('should handle missing progress context gracefully', () => {
    // This should throw because useProgress requires the context
    expect(() => {
      render(<Home />);
    }).toThrow('useProgress must be used within a ProgressProvider');
  });
});
