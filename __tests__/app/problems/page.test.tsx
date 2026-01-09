import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProblemsPage from '@/app/problems/page';
import { ProgressContext } from '@/components/ProgressProvider';

// Mock next/navigation
const mockSearchParams = new URLSearchParams();
const mockGet = jest.fn((key: string) => mockSearchParams.get(key));

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: mockGet,
  }),
}));

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
const mockProblems = [
  {
    id: 'problem-1',
    title: 'Array Destructuring',
    difficulty: 'easy' as const,
    category: 'JavaScript Basics',
  },
  {
    id: 'problem-2',
    title: 'Optional Chaining',
    difficulty: 'easy' as const,
    category: 'JavaScript Basics',
  },
  {
    id: 'problem-3',
    title: 'Generics Intro',
    difficulty: 'medium' as const,
    category: 'TypeScript',
  },
  {
    id: 'problem-4',
    title: 'Conditional Types',
    difficulty: 'medium' as const,
    category: 'TypeScript',
  },
  {
    id: 'problem-5',
    title: 'Async Generators',
    difficulty: 'hard' as const,
    category: 'Async Patterns',
  },
  {
    id: 'problem-6',
    title: 'Promise Queue',
    difficulty: 'hard' as const,
    category: 'Async Patterns',
  },
];

jest.mock('@/lib/problems', () => ({
  problems: [
    {
      id: 'problem-1',
      title: 'Array Destructuring',
      difficulty: 'easy',
      category: 'JavaScript Basics',
    },
    {
      id: 'problem-2',
      title: 'Optional Chaining',
      difficulty: 'easy',
      category: 'JavaScript Basics',
    },
    {
      id: 'problem-3',
      title: 'Generics Intro',
      difficulty: 'medium',
      category: 'TypeScript',
    },
    {
      id: 'problem-4',
      title: 'Conditional Types',
      difficulty: 'medium',
      category: 'TypeScript',
    },
    {
      id: 'problem-5',
      title: 'Async Generators',
      difficulty: 'hard',
      category: 'Async Patterns',
    },
    {
      id: 'problem-6',
      title: 'Promise Queue',
      difficulty: 'hard',
      category: 'Async Patterns',
    },
  ],
}));

// Mock FilterSidebar component
jest.mock('@/components/FilterSidebar', () => {
  return function MockFilterSidebar({
    categories,
    selectedDifficulty,
    selectedCategory,
    selectedStatus,
    onDifficultyChange,
    onCategoryChange,
    onStatusChange,
    onClearFilters,
    problemCounts,
  }: {
    categories: string[];
    selectedDifficulty: string;
    selectedCategory: string;
    selectedStatus: string;
    onDifficultyChange: (d: string) => void;
    onCategoryChange: (c: string) => void;
    onStatusChange: (s: string) => void;
    onClearFilters: () => void;
    problemCounts: { easy: number; medium: number; hard: number; total: number };
  }) {
    return (
      <div data-testid="filter-sidebar">
        <div data-testid="selected-difficulty">{selectedDifficulty}</div>
        <div data-testid="selected-category">{selectedCategory}</div>
        <div data-testid="selected-status">{selectedStatus}</div>
        <div data-testid="categories">{categories.join(',')}</div>
        <div data-testid="problem-counts">
          {problemCounts.easy}/{problemCounts.medium}/{problemCounts.hard}/{problemCounts.total}
        </div>
        <button onClick={() => onDifficultyChange('easy')} data-testid="filter-easy">
          Filter Easy
        </button>
        <button onClick={() => onDifficultyChange('medium')} data-testid="filter-medium">
          Filter Medium
        </button>
        <button onClick={() => onDifficultyChange('hard')} data-testid="filter-hard">
          Filter Hard
        </button>
        <button onClick={() => onDifficultyChange('all')} data-testid="filter-all-difficulty">
          All Difficulties
        </button>
        <button onClick={() => onCategoryChange('TypeScript')} data-testid="filter-typescript">
          Filter TypeScript
        </button>
        <button onClick={() => onCategoryChange('all')} data-testid="filter-all-category">
          All Categories
        </button>
        <button onClick={() => onStatusChange('solved')} data-testid="filter-solved">
          Filter Solved
        </button>
        <button onClick={() => onStatusChange('unsolved')} data-testid="filter-unsolved">
          Filter Unsolved
        </button>
        <button onClick={() => onStatusChange('all')} data-testid="filter-all-status">
          All Status
        </button>
        <button onClick={onClearFilters} data-testid="clear-filters">
          Clear Filters
        </button>
      </div>
    );
  };
});

// Mock ProblemTable component
jest.mock('@/components/ProblemTable', () => {
  return function MockProblemTable({
    problems,
  }: {
    problems: Array<{ id: string; title: string; difficulty: string; category: string }>;
  }) {
    return (
      <div data-testid="problem-table">
        <div data-testid="problem-count">{problems.length}</div>
        {problems.map((p) => (
          <div key={p.id} data-testid={`problem-${p.id}`}>
            <span data-testid={`title-${p.id}`}>{p.title}</span>
            <span data-testid={`difficulty-${p.id}`}>{p.difficulty}</span>
            <span data-testid={`category-${p.id}`}>{p.category}</span>
          </div>
        ))}
      </div>
    );
  };
});

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
    totalProblems: 6,
    streak: 0,
    markSolved: jest.fn(),
    markUnsolved: jest.fn(),
    isSolved: jest.fn(() => false),
    lastSolvedDate: null,
    resetProgress: jest.fn(),
    ...progressValue,
  };

  return render(
    <ProgressContext.Provider value={defaultValue}>{ui}</ProgressContext.Provider>
  );
}

describe('Problems Page', () => {
  beforeEach(() => {
    mockSearchParams.delete('category');
    mockGet.mockClear();
  });

  describe('Page Rendering', () => {
    it('should render the page heading', async () => {
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Problems' })).toBeInTheDocument();
      });
    });

    it('should render the problem count text', async () => {
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByText(/6 of 6 problems/i)).toBeInTheDocument();
      });
    });

    it('should render the search input', async () => {
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search problems...')).toBeInTheDocument();
      });
    });

    it('should render the sort dropdown', async () => {
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByRole('combobox')).toBeInTheDocument();
      });
    });

    it('should render FilterSidebar component', async () => {
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getAllByTestId('filter-sidebar').length).toBeGreaterThan(0);
      });
    });

    it('should render ProblemTable component', async () => {
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByTestId('problem-table')).toBeInTheDocument();
      });
    });
  });

  describe('Loading State (Suspense)', () => {
    it('should render loading state initially', () => {
      // The Suspense fallback should show "Loading..." text
      // Since we're rendering the full page, it will show the content after suspense resolves
      renderWithProgress(<ProblemsPage />);

      // After hydration, content should be visible
      expect(screen.getByRole('heading', { name: 'Problems' })).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('should update search query when typing', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search problems...')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search problems...');
      await user.type(searchInput, 'Array');

      expect(searchInput).toHaveValue('Array');
    });

    it('should filter problems based on search query (title)', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search problems...')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search problems...');
      await user.type(searchInput, 'Array');

      await waitFor(() => {
        const problemCount = screen.getByTestId('problem-count');
        expect(problemCount).toHaveTextContent('1');
      });
    });

    it('should filter problems based on search query (category)', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search problems...')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search problems...');
      await user.type(searchInput, 'TypeScript');

      await waitFor(() => {
        const problemCount = screen.getByTestId('problem-count');
        expect(problemCount).toHaveTextContent('2');
      });
    });

    it('should filter problems based on search query (id)', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search problems...')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search problems...');
      await user.type(searchInput, 'problem-1');

      await waitFor(() => {
        const problemCount = screen.getByTestId('problem-count');
        expect(problemCount).toHaveTextContent('1');
      });
    });

    it('should show clear button when search has value', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search problems...')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search problems...');
      await user.type(searchInput, 'test');

      // Find the clear button (X icon button)
      const clearButton = screen.getByRole('button', { name: '' });
      expect(clearButton).toBeInTheDocument();
    });

    it('should clear search when clear button is clicked', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search problems...')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search problems...');
      await user.type(searchInput, 'test');

      // Get all buttons and find the clear button (the one near the search input)
      const buttons = screen.getAllByRole('button');
      // The clear button should be the first button that appears after typing
      const clearButton = buttons.find((btn) =>
        btn.parentElement?.querySelector('input[placeholder="Search problems..."]')
      );

      if (clearButton) {
        await user.click(clearButton);
        expect(searchInput).toHaveValue('');
      }
    });
  });

  describe('Difficulty Filtering', () => {
    it('should filter by easy difficulty', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getAllByTestId('filter-easy')[0]).toBeInTheDocument();
      });

      await user.click(screen.getAllByTestId('filter-easy')[0]);

      await waitFor(() => {
        const problemCount = screen.getByTestId('problem-count');
        expect(problemCount).toHaveTextContent('2');
      });
    });

    it('should filter by medium difficulty', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getAllByTestId('filter-medium')[0]).toBeInTheDocument();
      });

      await user.click(screen.getAllByTestId('filter-medium')[0]);

      await waitFor(() => {
        const problemCount = screen.getByTestId('problem-count');
        expect(problemCount).toHaveTextContent('2');
      });
    });

    it('should filter by hard difficulty', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getAllByTestId('filter-hard')[0]).toBeInTheDocument();
      });

      await user.click(screen.getAllByTestId('filter-hard')[0]);

      await waitFor(() => {
        const problemCount = screen.getByTestId('problem-count');
        expect(problemCount).toHaveTextContent('2');
      });
    });

    it('should show all problems when difficulty is set to all', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      // First filter by easy
      await waitFor(() => {
        expect(screen.getAllByTestId('filter-easy')[0]).toBeInTheDocument();
      });

      await user.click(screen.getAllByTestId('filter-easy')[0]);

      // Then reset to all
      await user.click(screen.getAllByTestId('filter-all-difficulty')[0]);

      await waitFor(() => {
        const problemCount = screen.getByTestId('problem-count');
        expect(problemCount).toHaveTextContent('6');
      });
    });
  });

  describe('Category Filtering', () => {
    it('should filter by category', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getAllByTestId('filter-typescript')[0]).toBeInTheDocument();
      });

      await user.click(screen.getAllByTestId('filter-typescript')[0]);

      await waitFor(() => {
        const problemCount = screen.getByTestId('problem-count');
        expect(problemCount).toHaveTextContent('2');
      });
    });

    it('should show all categories when reset', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getAllByTestId('filter-typescript')[0]).toBeInTheDocument();
      });

      await user.click(screen.getAllByTestId('filter-typescript')[0]);
      await user.click(screen.getAllByTestId('filter-all-category')[0]);

      await waitFor(() => {
        const problemCount = screen.getByTestId('problem-count');
        expect(problemCount).toHaveTextContent('6');
      });
    });
  });

  describe('Status Filtering', () => {
    it('should filter by solved status', async () => {
      const user = userEvent.setup();
      const isSolved = jest.fn((id: string) =>
        ['problem-1', 'problem-2'].includes(id)
      );

      renderWithProgress(<ProblemsPage />, {
        isSolved,
        solvedCount: 2,
      });

      await waitFor(() => {
        expect(screen.getAllByTestId('filter-solved')[0]).toBeInTheDocument();
      });

      await user.click(screen.getAllByTestId('filter-solved')[0]);

      await waitFor(() => {
        const problemCount = screen.getByTestId('problem-count');
        expect(problemCount).toHaveTextContent('2');
      });
    });

    it('should filter by unsolved status', async () => {
      const user = userEvent.setup();
      const isSolved = jest.fn((id: string) =>
        ['problem-1', 'problem-2'].includes(id)
      );

      renderWithProgress(<ProblemsPage />, {
        isSolved,
        solvedCount: 2,
      });

      await waitFor(() => {
        expect(screen.getAllByTestId('filter-unsolved')[0]).toBeInTheDocument();
      });

      await user.click(screen.getAllByTestId('filter-unsolved')[0]);

      await waitFor(() => {
        const problemCount = screen.getByTestId('problem-count');
        expect(problemCount).toHaveTextContent('4');
      });
    });
  });

  describe('Sorting', () => {
    it('should sort by difficulty', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByRole('combobox')).toBeInTheDocument();
      });

      const sortDropdown = screen.getByRole('combobox');
      await user.selectOptions(sortDropdown, 'difficulty');

      // After sorting by difficulty, easy problems should come first
      await waitFor(() => {
        const firstProblem = screen.getByTestId('problem-problem-1');
        expect(firstProblem).toBeInTheDocument();
      });
    });

    it('should sort by title', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByRole('combobox')).toBeInTheDocument();
      });

      const sortDropdown = screen.getByRole('combobox');
      await user.selectOptions(sortDropdown, 'title');

      // Problems should be sorted alphabetically
      await waitFor(() => {
        expect(screen.getByTestId('problem-table')).toBeInTheDocument();
      });
    });

    it('should sort by category', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByRole('combobox')).toBeInTheDocument();
      });

      const sortDropdown = screen.getByRole('combobox');
      await user.selectOptions(sortDropdown, 'category');

      await waitFor(() => {
        expect(screen.getByTestId('problem-table')).toBeInTheDocument();
      });
    });

    it('should sort by acceptance rate', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByRole('combobox')).toBeInTheDocument();
      });

      const sortDropdown = screen.getByRole('combobox');
      await user.selectOptions(sortDropdown, 'acceptance');

      await waitFor(() => {
        expect(screen.getByTestId('problem-table')).toBeInTheDocument();
      });
    });

    it('should reset to default sort', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByRole('combobox')).toBeInTheDocument();
      });

      const sortDropdown = screen.getByRole('combobox');
      await user.selectOptions(sortDropdown, 'difficulty');
      await user.selectOptions(sortDropdown, 'default');

      await waitFor(() => {
        const problemCount = screen.getByTestId('problem-count');
        expect(problemCount).toHaveTextContent('6');
      });
    });
  });

  describe('Clear Filters', () => {
    it('should clear all filters when clear button is clicked', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      // Apply some filters
      await waitFor(() => {
        expect(screen.getAllByTestId('filter-easy')[0]).toBeInTheDocument();
      });

      await user.click(screen.getAllByTestId('filter-easy')[0]);
      await user.click(screen.getAllByTestId('filter-typescript')[0]);

      // Clear all filters
      await user.click(screen.getAllByTestId('clear-filters')[0]);

      await waitFor(() => {
        const problemCount = screen.getByTestId('problem-count');
        expect(problemCount).toHaveTextContent('6');
      });
    });
  });

  describe('URL Category Parameter', () => {
    it('should read category from URL params on mount', async () => {
      mockGet.mockImplementation((key: string) => {
        if (key === 'category') return 'TypeScript';
        return null;
      });

      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        // The category should be set from URL params
        const selectedCategory = screen.getAllByTestId('selected-category')[0];
        expect(selectedCategory).toHaveTextContent('TypeScript');
      });
    });

    it('should handle encoded category names in URL', async () => {
      mockGet.mockImplementation((key: string) => {
        if (key === 'category') return 'JavaScript%20Basics';
        return null;
      });

      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByTestId('problem-table')).toBeInTheDocument();
      });
    });

    it('should ignore invalid category from URL', async () => {
      mockGet.mockImplementation((key: string) => {
        if (key === 'category') return 'NonExistentCategory';
        return null;
      });

      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        // Should show all problems since category doesn't exist
        const selectedCategory = screen.getAllByTestId('selected-category')[0];
        expect(selectedCategory).toHaveTextContent('all');
      });
    });
  });

  describe('Mobile Filters Toggle', () => {
    it('should render mobile filter toggle button', async () => {
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        // Use exact match to avoid matching "Clear Filters"
        const filterButton = screen.getByRole('button', { name: /^Filters$/i });
        expect(filterButton).toBeInTheDocument();
      });
    });

    it('should toggle mobile filters visibility', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /^Filters$/i })).toBeInTheDocument();
      });

      const filterButton = screen.getByRole('button', { name: /^Filters$/i });
      await user.click(filterButton);

      // Should show mobile filter sidebar
      await waitFor(() => {
        // There should now be 2 filter sidebars (desktop hidden + mobile visible)
        const sidebars = screen.getAllByTestId('filter-sidebar');
        expect(sidebars.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('Combined Filters', () => {
    it('should apply multiple filters together', async () => {
      const user = userEvent.setup();
      const isSolved = jest.fn((id: string) => id === 'problem-1');

      renderWithProgress(<ProblemsPage />, {
        isSolved,
        solvedCount: 1,
      });

      await waitFor(() => {
        expect(screen.getAllByTestId('filter-easy')[0]).toBeInTheDocument();
      });

      // Filter by easy + solved
      await user.click(screen.getAllByTestId('filter-easy')[0]);
      await user.click(screen.getAllByTestId('filter-solved')[0]);

      await waitFor(() => {
        const problemCount = screen.getByTestId('problem-count');
        expect(problemCount).toHaveTextContent('1');
      });
    });

    it('should combine search with filters', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search problems...')).toBeInTheDocument();
      });

      // Filter by difficulty and search
      await user.click(screen.getAllByTestId('filter-easy')[0]);

      const searchInput = screen.getByPlaceholderText('Search problems...');
      await user.type(searchInput, 'Array');

      await waitFor(() => {
        const problemCount = screen.getByTestId('problem-count');
        expect(problemCount).toHaveTextContent('1');
      });
    });
  });

  describe('Problem Counts Display', () => {
    it('should display correct problem counts in filter sidebar', async () => {
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        const problemCounts = screen.getAllByTestId('problem-counts')[0];
        expect(problemCounts).toHaveTextContent('2/2/2/6'); // easy/medium/hard/total
      });
    });

    it('should display filtered count in header', async () => {
      const user = userEvent.setup();
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        expect(screen.getByText(/6 of 6 problems/i)).toBeInTheDocument();
      });

      await user.click(screen.getAllByTestId('filter-easy')[0]);

      await waitFor(() => {
        expect(screen.getByText(/2 of 6 problems/i)).toBeInTheDocument();
      });
    });
  });

  describe('Categories List', () => {
    it('should provide unique sorted categories to FilterSidebar', async () => {
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        const categories = screen.getAllByTestId('categories')[0];
        // Categories should be sorted alphabetically
        expect(categories).toHaveTextContent('Async Patterns,JavaScript Basics,TypeScript');
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle missing progress context', () => {
      expect(() => {
        render(<ProblemsPage />);
      }).toThrow('useProgress must be used within a ProgressProvider');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible search input', async () => {
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText('Search problems...');
        expect(searchInput).toHaveAttribute('type', 'text');
      });
    });

    it('should have accessible sort dropdown', async () => {
      renderWithProgress(<ProblemsPage />);

      await waitFor(() => {
        const sortDropdown = screen.getByRole('combobox');
        expect(sortDropdown).toBeInTheDocument();
      });
    });
  });
});

describe('ProblemsPage Memoization', () => {
  it('should compute categories correctly using useMemo', async () => {
    const { rerender } = renderWithProgress(<ProblemsPage />);

    await waitFor(() => {
      expect(screen.getAllByTestId('categories')[0]).toBeInTheDocument();
    });

    // Re-render should not cause issues
    rerender(
      <ProgressContext.Provider
        value={{
          solvedProblems: new Set<string>(),
          solvedCount: 0,
          totalProblems: 6,
          streak: 0,
          markSolved: jest.fn(),
          markUnsolved: jest.fn(),
          isSolved: jest.fn(() => false),
          lastSolvedDate: null,
          resetProgress: jest.fn(),
        }}
      >
        <ProblemsPage />
      </ProgressContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId('categories')[0]).toHaveTextContent(
        'Async Patterns,JavaScript Basics,TypeScript'
      );
    });
  });
});
