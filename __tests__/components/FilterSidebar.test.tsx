import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import FilterSidebar from '@/components/FilterSidebar';
import { ProgressContext } from '@/components/ProgressProvider';

// Mock ProgressContext values
const createMockProgressContext = (
  overrides: Partial<{
    solvedProblems: Set<string>;
    solvedCount: number;
    totalProblems: number;
    streak: number;
    markSolved: (problemId: string) => void;
    markUnsolved: (problemId: string) => void;
    isSolved: (problemId: string) => boolean;
    lastSolvedDate: string | null;
    resetProgress: () => void;
  }> = {}
) => ({
  solvedProblems: new Set<string>(),
  solvedCount: 0,
  totalProblems: 10,
  streak: 0,
  markSolved: jest.fn(),
  markUnsolved: jest.fn(),
  isSolved: jest.fn().mockReturnValue(false),
  lastSolvedDate: null,
  resetProgress: jest.fn(),
  ...overrides,
});

// Helper to render with mocked ProgressProvider
const renderWithProgress = (
  ui: ReactNode,
  progressOverrides: Parameters<typeof createMockProgressContext>[0] = {}
) => {
  const mockContext = createMockProgressContext(progressOverrides);
  return {
    ...render(<ProgressContext.Provider value={mockContext}>{ui}</ProgressContext.Provider>),
    mockContext,
  };
};

// Helper to get the radio button associated with a label text
const getRadioByLabelText = (text: string): HTMLInputElement => {
  const label = screen.getByText(text).closest('label');
  if (!label) throw new Error(`Label containing "${text}" not found`);
  const radio = label.querySelector('input[type="radio"]');
  if (!radio) throw new Error(`Radio button in label "${text}" not found`);
  return radio as HTMLInputElement;
};

// Helper to query radio button (returns null if not found)
const queryRadioByLabelText = (text: string): HTMLInputElement | null => {
  const textElement = screen.queryByText(text);
  if (!textElement) return null;
  const label = textElement.closest('label');
  if (!label) return null;
  return label.querySelector('input[type="radio"]') as HTMLInputElement | null;
};

// Default props factory
const createDefaultProps = (
  overrides: Partial<React.ComponentProps<typeof FilterSidebar>> = {}
) => ({
  categories: ['Arrays', 'Strings', 'Objects', 'Functions'],
  selectedDifficulty: 'all',
  selectedCategory: 'all',
  selectedStatus: 'all',
  onDifficultyChange: jest.fn(),
  onCategoryChange: jest.fn(),
  onStatusChange: jest.fn(),
  onClearFilters: jest.fn(),
  problemCounts: {
    easy: 5,
    medium: 3,
    hard: 2,
    total: 10,
  },
  ...overrides,
});

describe('FilterSidebar', () => {
  describe('Rendering with default props', () => {
    it('should render the sidebar with Filters heading', () => {
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      expect(screen.getByRole('heading', { name: 'Filters' })).toBeInTheDocument();
    });

    it('should render all filter sections', () => {
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Difficulty')).toBeInTheDocument();
      expect(screen.getByText('Category')).toBeInTheDocument();
    });

    it('should render as an aside element', () => {
      const { container } = renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      expect(container.querySelector('aside')).toBeInTheDocument();
    });

    it('should not show Clear all button when no filters are active', () => {
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      expect(screen.queryByText('Clear all')).not.toBeInTheDocument();
    });

    it('should render all categories', () => {
      const props = createDefaultProps({
        categories: ['Arrays', 'Strings', 'Objects'],
      });
      renderWithProgress(<FilterSidebar {...props} />);

      expect(screen.getByText('Arrays')).toBeInTheDocument();
      expect(screen.getByText('Strings')).toBeInTheDocument();
      expect(screen.getByText('Objects')).toBeInTheDocument();
    });
  });

  describe('Filter changes - Difficulty', () => {
    it('should call onDifficultyChange when clicking Easy', async () => {
      const user = userEvent.setup();
      const onDifficultyChange = jest.fn();
      const props = createDefaultProps({ onDifficultyChange });

      renderWithProgress(<FilterSidebar {...props} />);

      await user.click(getRadioByLabelText('Easy'));

      expect(onDifficultyChange).toHaveBeenCalledWith('easy');
    });

    it('should call onDifficultyChange when clicking Medium', async () => {
      const user = userEvent.setup();
      const onDifficultyChange = jest.fn();
      const props = createDefaultProps({ onDifficultyChange });

      renderWithProgress(<FilterSidebar {...props} />);

      await user.click(getRadioByLabelText('Medium'));

      expect(onDifficultyChange).toHaveBeenCalledWith('medium');
    });

    it('should call onDifficultyChange when clicking Hard', async () => {
      const user = userEvent.setup();
      const onDifficultyChange = jest.fn();
      const props = createDefaultProps({ onDifficultyChange });

      renderWithProgress(<FilterSidebar {...props} />);

      await user.click(getRadioByLabelText('Hard'));

      expect(onDifficultyChange).toHaveBeenCalledWith('hard');
    });

    it('should call onDifficultyChange with all when clicking All difficulty', async () => {
      const user = userEvent.setup();
      const onDifficultyChange = jest.fn();
      const props = createDefaultProps({
        onDifficultyChange,
        selectedDifficulty: 'easy',
      });

      renderWithProgress(<FilterSidebar {...props} />);

      // Find the All option in the Difficulty section - it's the first radio with name="difficulty"
      const allRadios = screen
        .getAllByRole('radio')
        .filter((radio) => (radio as HTMLInputElement).name === 'difficulty');
      await user.click(allRadios[0]); // First one is "All"

      expect(onDifficultyChange).toHaveBeenCalledWith('all');
    });

    it('should show selected difficulty as checked', () => {
      const props = createDefaultProps({ selectedDifficulty: 'medium' });

      renderWithProgress(<FilterSidebar {...props} />);

      const mediumRadio = getRadioByLabelText('Medium');
      expect(mediumRadio.checked).toBe(true);
    });
  });

  describe('Filter changes - Category', () => {
    it('should call onCategoryChange when clicking a category', async () => {
      const user = userEvent.setup();
      const onCategoryChange = jest.fn();
      const props = createDefaultProps({ onCategoryChange });

      renderWithProgress(<FilterSidebar {...props} />);

      await user.click(getRadioByLabelText('Arrays'));

      expect(onCategoryChange).toHaveBeenCalledWith('Arrays');
    });

    it('should call onCategoryChange with all when clicking All Categories', async () => {
      const user = userEvent.setup();
      const onCategoryChange = jest.fn();
      const props = createDefaultProps({
        onCategoryChange,
        selectedCategory: 'Arrays',
      });

      renderWithProgress(<FilterSidebar {...props} />);

      await user.click(getRadioByLabelText('All Categories'));

      expect(onCategoryChange).toHaveBeenCalledWith('all');
    });

    it('should show selected category as checked', () => {
      const props = createDefaultProps({ selectedCategory: 'Strings' });

      renderWithProgress(<FilterSidebar {...props} />);

      const stringsRadio = getRadioByLabelText('Strings');
      expect(stringsRadio.checked).toBe(true);
    });
  });

  describe('Filter changes - Status', () => {
    it('should call onStatusChange when clicking Solved', async () => {
      const user = userEvent.setup();
      const onStatusChange = jest.fn();
      const props = createDefaultProps({ onStatusChange });

      renderWithProgress(<FilterSidebar {...props} />);

      await user.click(getRadioByLabelText('Solved'));

      expect(onStatusChange).toHaveBeenCalledWith('solved');
    });

    it('should call onStatusChange when clicking Unsolved', async () => {
      const user = userEvent.setup();
      const onStatusChange = jest.fn();
      const props = createDefaultProps({ onStatusChange });

      renderWithProgress(<FilterSidebar {...props} />);

      await user.click(getRadioByLabelText('Unsolved'));

      expect(onStatusChange).toHaveBeenCalledWith('unsolved');
    });

    it('should call onStatusChange with all when clicking All status', async () => {
      const user = userEvent.setup();
      const onStatusChange = jest.fn();
      const props = createDefaultProps({
        onStatusChange,
        selectedStatus: 'solved',
      });

      renderWithProgress(<FilterSidebar {...props} />);

      // Find the All option in the Status section - it's the first radio with name="status"
      const allRadios = screen
        .getAllByRole('radio')
        .filter((radio) => (radio as HTMLInputElement).name === 'status');
      await user.click(allRadios[0]); // First one is "All"

      expect(onStatusChange).toHaveBeenCalledWith('all');
    });

    it('should show selected status as checked', () => {
      const props = createDefaultProps({ selectedStatus: 'unsolved' });

      renderWithProgress(<FilterSidebar {...props} />);

      const unsolvedRadio = getRadioByLabelText('Unsolved');
      expect(unsolvedRadio.checked).toBe(true);
    });
  });

  describe('Problem count display', () => {
    it('should display easy count', () => {
      const props = createDefaultProps({
        problemCounts: { easy: 15, medium: 10, hard: 5, total: 30 },
      });

      renderWithProgress(<FilterSidebar {...props} />);

      expect(screen.getByText('15')).toBeInTheDocument();
    });

    it('should display medium count', () => {
      const props = createDefaultProps({
        problemCounts: { easy: 5, medium: 12, hard: 3, total: 20 },
      });

      renderWithProgress(<FilterSidebar {...props} />);

      expect(screen.getByText('12')).toBeInTheDocument();
    });

    it('should display hard count', () => {
      const props = createDefaultProps({
        problemCounts: { easy: 5, medium: 3, hard: 7, total: 15 },
      });

      renderWithProgress(<FilterSidebar {...props} />);

      expect(screen.getByText('7')).toBeInTheDocument();
    });

    it('should display total count next to All difficulty option', () => {
      const props = createDefaultProps({
        problemCounts: { easy: 5, medium: 3, hard: 2, total: 10 },
      });

      renderWithProgress(<FilterSidebar {...props} />);

      // Total count (10) appears next to "All" in difficulty section
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('should handle zero counts', () => {
      const props = createDefaultProps({
        problemCounts: { easy: 0, medium: 0, hard: 0, total: 0 },
      });

      renderWithProgress(<FilterSidebar {...props} />);

      // All zeros should be displayed
      const zeros = screen.getAllByText('0');
      expect(zeros.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Progress bar display', () => {
    it('should display progress text', () => {
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />, {
        solvedCount: 5,
        totalProblems: 10,
      });

      expect(screen.getByText('Your Progress')).toBeInTheDocument();
      expect(screen.getByText('5/10')).toBeInTheDocument();
    });

    it('should display 0/0 when no problems', () => {
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />, {
        solvedCount: 0,
        totalProblems: 0,
      });

      expect(screen.getByText('0/0')).toBeInTheDocument();
    });

    it('should display 100% progress when all solved', () => {
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />, {
        solvedCount: 10,
        totalProblems: 10,
      });

      expect(screen.getByText('10/10')).toBeInTheDocument();
    });

    it('should render progress bar with correct width style', () => {
      const { container } = renderWithProgress(<FilterSidebar {...createDefaultProps()} />, {
        solvedCount: 5,
        totalProblems: 10,
      });

      const progressBar = container.querySelector('.bg-green-500');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveStyle({ width: '50%' });
    });

    it('should render 0% width when no problems solved', () => {
      const { container } = renderWithProgress(<FilterSidebar {...createDefaultProps()} />, {
        solvedCount: 0,
        totalProblems: 10,
      });

      const progressBar = container.querySelector('.bg-green-500');
      expect(progressBar).toHaveStyle({ width: '0%' });
    });

    it('should render 100% width when all problems solved', () => {
      const { container } = renderWithProgress(<FilterSidebar {...createDefaultProps()} />, {
        solvedCount: 20,
        totalProblems: 20,
      });

      const progressBar = container.querySelector('.bg-green-500');
      expect(progressBar).toHaveStyle({ width: '100%' });
    });
  });

  describe('Collapsible sections', () => {
    it('should have all sections expanded by default', () => {
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      // All status options should be visible
      expect(getRadioByLabelText('Solved')).toBeVisible();
      expect(getRadioByLabelText('Unsolved')).toBeVisible();

      // All difficulty options should be visible
      expect(getRadioByLabelText('Easy')).toBeVisible();
      expect(getRadioByLabelText('Medium')).toBeVisible();
      expect(getRadioByLabelText('Hard')).toBeVisible();

      // All category options should be visible
      expect(getRadioByLabelText('All Categories')).toBeVisible();
    });

    it('should collapse Status section when clicking header', async () => {
      const user = userEvent.setup();
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      const statusButton = screen.getByRole('button', { name: /Status/i });
      await user.click(statusButton);

      // Status options should be hidden
      expect(queryRadioByLabelText('Solved')).toBeNull();
      expect(queryRadioByLabelText('Unsolved')).toBeNull();
    });

    it('should collapse Difficulty section when clicking header', async () => {
      const user = userEvent.setup();
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      const difficultyButton = screen.getByRole('button', { name: /Difficulty/i });
      await user.click(difficultyButton);

      // Difficulty options should be hidden
      expect(queryRadioByLabelText('Easy')).toBeNull();
      expect(queryRadioByLabelText('Medium')).toBeNull();
      expect(queryRadioByLabelText('Hard')).toBeNull();
    });

    it('should collapse Category section when clicking header', async () => {
      const user = userEvent.setup();
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      const categoryButton = screen.getByRole('button', { name: /Category/i });
      await user.click(categoryButton);

      // Category options should be hidden
      expect(queryRadioByLabelText('All Categories')).toBeNull();
      expect(queryRadioByLabelText('Arrays')).toBeNull();
    });

    it('should expand collapsed section when clicking header again', async () => {
      const user = userEvent.setup();
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      const statusButton = screen.getByRole('button', { name: /Status/i });

      // Collapse
      await user.click(statusButton);
      expect(queryRadioByLabelText('Solved')).toBeNull();

      // Expand
      await user.click(statusButton);
      expect(getRadioByLabelText('Solved')).toBeInTheDocument();
    });

    it('should toggle sections independently', async () => {
      const user = userEvent.setup();
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      const statusButton = screen.getByRole('button', { name: /Status/i });
      const difficultyButton = screen.getByRole('button', { name: /Difficulty/i });

      // Collapse status
      await user.click(statusButton);

      // Status collapsed, difficulty still expanded
      expect(queryRadioByLabelText('Solved')).toBeNull();
      expect(getRadioByLabelText('Easy')).toBeInTheDocument();

      // Collapse difficulty
      await user.click(difficultyButton);

      // Both collapsed
      expect(queryRadioByLabelText('Solved')).toBeNull();
      expect(queryRadioByLabelText('Easy')).toBeNull();
    });

    it('should rotate chevron icon when section is collapsed', async () => {
      const user = userEvent.setup();
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      const statusButton = screen.getByRole('button', { name: /Status/i });
      const chevron = statusButton.querySelector('svg');

      // Initially expanded - has rotate-180 class
      expect(chevron).toHaveClass('rotate-180');

      await user.click(statusButton);

      // After collapse - no rotate-180 class
      expect(chevron).not.toHaveClass('rotate-180');
    });
  });

  describe('Clear filters functionality', () => {
    it('should show Clear all button when difficulty filter is active', () => {
      const props = createDefaultProps({ selectedDifficulty: 'easy' });

      renderWithProgress(<FilterSidebar {...props} />);

      expect(screen.getByText('Clear all')).toBeInTheDocument();
    });

    it('should show Clear all button when category filter is active', () => {
      const props = createDefaultProps({ selectedCategory: 'Arrays' });

      renderWithProgress(<FilterSidebar {...props} />);

      expect(screen.getByText('Clear all')).toBeInTheDocument();
    });

    it('should show Clear all button when status filter is active', () => {
      const props = createDefaultProps({ selectedStatus: 'solved' });

      renderWithProgress(<FilterSidebar {...props} />);

      expect(screen.getByText('Clear all')).toBeInTheDocument();
    });

    it('should show Clear all button when multiple filters are active', () => {
      const props = createDefaultProps({
        selectedDifficulty: 'hard',
        selectedCategory: 'Objects',
        selectedStatus: 'unsolved',
      });

      renderWithProgress(<FilterSidebar {...props} />);

      expect(screen.getByText('Clear all')).toBeInTheDocument();
    });

    it('should call onClearFilters when Clear all is clicked', async () => {
      const user = userEvent.setup();
      const onClearFilters = jest.fn();
      const props = createDefaultProps({
        selectedDifficulty: 'easy',
        onClearFilters,
      });

      renderWithProgress(<FilterSidebar {...props} />);

      await user.click(screen.getByText('Clear all'));

      expect(onClearFilters).toHaveBeenCalledTimes(1);
    });

    it('should not show Clear all when all filters are set to all', () => {
      const props = createDefaultProps({
        selectedDifficulty: 'all',
        selectedCategory: 'all',
        selectedStatus: 'all',
      });

      renderWithProgress(<FilterSidebar {...props} />);

      expect(screen.queryByText('Clear all')).not.toBeInTheDocument();
    });
  });

  describe('Edge cases - No problems', () => {
    it('should handle empty categories array', () => {
      const props = createDefaultProps({
        categories: [],
        problemCounts: { easy: 0, medium: 0, hard: 0, total: 0 },
      });

      renderWithProgress(<FilterSidebar {...props} />);

      // Should still show "All Categories" option
      expect(getRadioByLabelText('All Categories')).toBeInTheDocument();
    });

    it('should handle zero total problems', () => {
      const props = createDefaultProps({
        problemCounts: { easy: 0, medium: 0, hard: 0, total: 0 },
      });

      renderWithProgress(<FilterSidebar {...props} />, { solvedCount: 0, totalProblems: 0 });

      expect(screen.getByText('0/0')).toBeInTheDocument();
    });

    it('should handle NaN progress calculation gracefully', () => {
      const { container } = renderWithProgress(<FilterSidebar {...createDefaultProps()} />, {
        solvedCount: 0,
        totalProblems: 0,
      });

      // Progress bar should still render
      const progressBar = container.querySelector('.bg-green-500');
      expect(progressBar).toBeInTheDocument();
    });
  });

  describe('Edge cases - All filtered out', () => {
    it('should display zero counts when no matches', () => {
      const props = createDefaultProps({
        problemCounts: { easy: 0, medium: 0, hard: 0, total: 0 },
        selectedDifficulty: 'hard',
        selectedCategory: 'NonexistentCategory',
      });

      renderWithProgress(<FilterSidebar {...props} />);

      // Should still render with zero counts
      const zeros = screen.getAllByText('0');
      expect(zeros.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Edge cases - Many categories', () => {
    it('should render many categories with scroll container', () => {
      const manyCategories = Array.from({ length: 20 }, (_, i) => `Category ${i + 1}`);
      const props = createDefaultProps({
        categories: manyCategories,
      });

      const { container } = renderWithProgress(<FilterSidebar {...props} />);

      // Should have overflow-y-auto class for scrolling
      const scrollContainer = container.querySelector('.overflow-y-auto');
      expect(scrollContainer).toBeInTheDocument();

      // All categories should be rendered
      expect(getRadioByLabelText('Category 1')).toBeInTheDocument();
      expect(getRadioByLabelText('Category 20')).toBeInTheDocument();
    });

    it('should have max-height on category container', () => {
      const manyCategories = Array.from({ length: 20 }, (_, i) => `Category ${i + 1}`);
      const props = createDefaultProps({
        categories: manyCategories,
      });

      const { container } = renderWithProgress(<FilterSidebar {...props} />);

      const scrollContainer = container.querySelector('.max-h-64');
      expect(scrollContainer).toBeInTheDocument();
    });
  });

  describe('Edge cases - Special characters in categories', () => {
    it('should handle categories with special characters', () => {
      const props = createDefaultProps({
        categories: ['C++', 'C#', 'ES6+', 'async/await'],
      });

      renderWithProgress(<FilterSidebar {...props} />);

      expect(getRadioByLabelText('C++')).toBeInTheDocument();
      expect(getRadioByLabelText('C#')).toBeInTheDocument();
      expect(getRadioByLabelText('ES6+')).toBeInTheDocument();
      expect(getRadioByLabelText('async/await')).toBeInTheDocument();
    });

    it('should handle categories with spaces', () => {
      const props = createDefaultProps({
        categories: ['Array Methods', 'Object Destructuring', 'Template Literals'],
      });

      renderWithProgress(<FilterSidebar {...props} />);

      expect(getRadioByLabelText('Array Methods')).toBeInTheDocument();
      expect(getRadioByLabelText('Object Destructuring')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should use radio buttons for filter options', () => {
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      const radioButtons = screen.getAllByRole('radio');
      expect(radioButtons.length).toBeGreaterThan(0);
    });

    it('should have labels associated with all radio buttons', () => {
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      // Each radio should be inside a label element with visible text
      expect(getRadioByLabelText('Easy')).toBeInTheDocument();
      expect(getRadioByLabelText('Medium')).toBeInTheDocument();
      expect(getRadioByLabelText('Hard')).toBeInTheDocument();
      expect(getRadioByLabelText('Solved')).toBeInTheDocument();
      expect(getRadioByLabelText('Unsolved')).toBeInTheDocument();
    });

    it('should group status filters with same name attribute', () => {
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      const statusRadios = screen
        .getAllByRole('radio')
        .filter((radio) => (radio as HTMLInputElement).name === 'status');
      expect(statusRadios.length).toBe(3); // All, Solved, Unsolved
    });

    it('should group difficulty filters with same name attribute', () => {
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      const difficultyRadios = screen
        .getAllByRole('radio')
        .filter((radio) => (radio as HTMLInputElement).name === 'difficulty');
      expect(difficultyRadios.length).toBe(4); // All, Easy, Medium, Hard
    });

    it('should group category filters with same name attribute', () => {
      const props = createDefaultProps({
        categories: ['Arrays', 'Strings'],
      });
      renderWithProgress(<FilterSidebar {...props} />);

      const categoryRadios = screen
        .getAllByRole('radio')
        .filter((radio) => (radio as HTMLInputElement).name === 'category');
      expect(categoryRadios.length).toBe(3); // All Categories + 2 categories
    });

    it('should have semantic heading for Filters', () => {
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      const heading = screen.getByRole('heading', { name: 'Filters' });
      expect(heading).toBeInTheDocument();
    });

    it('should use buttons for collapsible section headers', () => {
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      expect(screen.getByRole('button', { name: /Status/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Difficulty/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Category/i })).toBeInTheDocument();
    });

    it('should be keyboard accessible for section toggle', async () => {
      const user = userEvent.setup();
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      const statusButton = screen.getByRole('button', { name: /Status/i });

      // Focus and press Enter
      statusButton.focus();
      await user.keyboard('{Enter}');

      // Section should be collapsed
      expect(queryRadioByLabelText('Solved')).toBeNull();
    });

    it('should be keyboard accessible for filter selection', async () => {
      const user = userEvent.setup();
      const onDifficultyChange = jest.fn();
      const props = createDefaultProps({ onDifficultyChange });

      renderWithProgress(<FilterSidebar {...props} />);

      const easyRadio = getRadioByLabelText('Easy');
      easyRadio.focus();
      await user.keyboard(' ');

      expect(onDifficultyChange).toHaveBeenCalledWith('easy');
    });

    it('should maintain focus management when toggling sections', async () => {
      const user = userEvent.setup();
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      const statusButton = screen.getByRole('button', { name: /Status/i });

      await user.click(statusButton);

      // Button should still be in the document and focusable
      expect(statusButton).toBeInTheDocument();
      expect(document.activeElement).toBe(statusButton);
    });
  });

  describe('Visual styling', () => {
    it('should apply correct color classes for Easy difficulty', () => {
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      const easyLabel = screen.getByText('Easy');
      expect(easyLabel).toHaveClass('text-green-600');
    });

    it('should apply correct color classes for Medium difficulty', () => {
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      const mediumLabel = screen.getByText('Medium');
      expect(mediumLabel).toHaveClass('text-yellow-600');
    });

    it('should apply correct color classes for Hard difficulty', () => {
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      const hardLabel = screen.getByText('Hard');
      expect(hardLabel).toHaveClass('text-red-600');
    });

    it('should have proper width classes', () => {
      const { container } = renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      const aside = container.querySelector('aside');
      expect(aside).toHaveClass('w-full', 'lg:w-64');
    });

    it('should have rounded corners and shadow', () => {
      const { container } = renderWithProgress(<FilterSidebar {...createDefaultProps()} />);

      const card = container.querySelector('.rounded-lg.shadow-sm');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Integration with ProgressContext', () => {
    it('should display progress from context', () => {
      renderWithProgress(<FilterSidebar {...createDefaultProps()} />, {
        solvedCount: 7,
        totalProblems: 15,
      });

      expect(screen.getByText('7/15')).toBeInTheDocument();
    });

    it('should calculate progress percentage correctly', () => {
      const { container } = renderWithProgress(<FilterSidebar {...createDefaultProps()} />, {
        solvedCount: 3,
        totalProblems: 12,
      });

      const progressBar = container.querySelector('.bg-green-500');
      expect(progressBar).toHaveStyle({ width: '25%' });
    });
  });
});
