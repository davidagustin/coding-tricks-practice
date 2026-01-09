import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/Navbar';
import { ProgressContext } from '@/components/ProgressProvider';
import { ThemeContext } from '@/components/ThemeProvider';
import type { ReactNode } from 'react';

// Mock the problems module (needed by ProgressProvider)
jest.mock('@/lib/problems', () => ({
  problems: [
    { id: 'problem-1', title: 'Problem 1' },
    { id: 'problem-2', title: 'Problem 2' },
    { id: 'problem-3', title: 'Problem 3' },
    { id: 'problem-4', title: 'Problem 4' },
    { id: 'problem-5', title: 'Problem 5' },
    { id: 'problem-6', title: 'Problem 6' },
    { id: 'problem-7', title: 'Problem 7' },
    { id: 'problem-8', title: 'Problem 8' },
    { id: 'problem-9', title: 'Problem 9' },
    { id: 'problem-10', title: 'Problem 10' },
  ],
}));

// Mock next/navigation
const mockPathname = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

// Track link instances for differentiation
let linkCounter = 0;

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ children, href, className }: { children: ReactNode; href: string; className?: string }) {
    const instanceId = linkCounter++;
    return (
      <a href={href} className={className} data-testid={`link-${href}-${instanceId}`} data-href={href}>
        {children}
      </a>
    );
  };
});

// Mock ThemeToggle component
jest.mock('@/components/ThemeToggle', () => {
  return function MockThemeToggle() {
    return (
      <button data-testid="theme-toggle" aria-label="Toggle theme">
        Theme Toggle
      </button>
    );
  };
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Helper to create mock progress context
const createMockProgressContext = (overrides = {}) => ({
  solvedProblems: new Set<string>(),
  solvedCount: 0,
  totalProblems: 10,
  streak: 0,
  markSolved: jest.fn(),
  markUnsolved: jest.fn(),
  isSolved: jest.fn(() => false),
  lastSolvedDate: null,
  resetProgress: jest.fn(),
  ...overrides,
});

// Helper to create mock theme context
const createMockThemeContext = (overrides = {}) => ({
  theme: 'dark' as const,
  toggleTheme: jest.fn(),
  setTheme: jest.fn(),
  ...overrides,
});

interface WrapperProps {
  children: ReactNode;
  progressContextValue?: ReturnType<typeof createMockProgressContext>;
  themeContextValue?: ReturnType<typeof createMockThemeContext>;
}

const renderWithProviders = (
  ui: React.ReactElement,
  {
    progressContextValue = createMockProgressContext(),
    themeContextValue = createMockThemeContext(),
  }: Partial<WrapperProps> = {}
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeContext.Provider value={themeContextValue}>
      <ProgressContext.Provider value={progressContextValue}>
        {children}
      </ProgressContext.Provider>
    </ThemeContext.Provider>
  );

  return render(ui, { wrapper: Wrapper });
};

// Helper functions to get specific links
const getLogoLink = () => {
  const links = screen.getAllByRole('link');
  return links.find((link) => link.textContent?.includes('JS/TS Tricks'));
};

const getHomeNavLink = () => {
  const links = screen.getAllByRole('link');
  return links.find((link) => link.textContent === 'Home');
};

const getProblemsNavLink = () => {
  return screen.getByText('Problems').closest('a');
};

describe('Navbar', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
    mockPathname.mockReturnValue('/');
    document.body.innerHTML = '';
    linkCounter = 0;
  });

  describe('Rendering', () => {
    it('should render the navbar element', () => {
      renderWithProviders(<Navbar />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('should render the logo with link to home', () => {
      renderWithProviders(<Navbar />);
      const logoLink = getLogoLink();
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('should render the logo text "JS/TS Tricks"', () => {
      renderWithProviders(<Navbar />);
      expect(screen.getByText('JS/TS Tricks')).toBeInTheDocument();
    });

    it('should render the logo SVG icon', () => {
      renderWithProviders(<Navbar />);
      const logoLink = getLogoLink();
      expect(logoLink).toBeInTheDocument();
      const svg = logoLink?.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('w-6', 'h-6', 'text-blue-600');
    });

    it('should render Home navigation link', () => {
      renderWithProviders(<Navbar />);
      const homeLink = getHomeNavLink();
      expect(homeLink).toBeInTheDocument();
    });

    it('should render Problems navigation link', () => {
      renderWithProviders(<Navbar />);
      expect(screen.getByText('Problems')).toBeInTheDocument();
    });

    it('should render the ThemeToggle component', () => {
      renderWithProviders(<Navbar />);
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    });

    it('should render the settings button', () => {
      renderWithProviders(<Navbar />);
      const settingsButton = screen.getByRole('button', { name: /settings/i });
      expect(settingsButton).toBeInTheDocument();
    });

    it('should render streak display', () => {
      const progressContext = createMockProgressContext({ streak: 5 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should render solved count display', () => {
      const progressContext = createMockProgressContext({ solvedCount: 3, totalProblems: 10 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });
      expect(screen.getByText('3/10')).toBeInTheDocument();
    });

    it('should render streak icon with correct title', () => {
      const progressContext = createMockProgressContext({ streak: 7 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });
      const streakContainer = screen.getByTitle('Current streak');
      expect(streakContainer).toBeInTheDocument();
    });

    it('should render solved count icon with correct title', () => {
      const progressContext = createMockProgressContext({ solvedCount: 5, totalProblems: 10 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });
      const solvedContainer = screen.getByTitle('Problems solved');
      expect(solvedContainer).toBeInTheDocument();
    });

    it('should render with correct container classes', () => {
      renderWithProviders(<Navbar />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('sticky', 'top-0', 'z-50');
    });
  });

  describe('Navigation Link Behavior', () => {
    it('should apply active styles to Home link when on home page', () => {
      mockPathname.mockReturnValue('/');
      renderWithProviders(<Navbar />);
      const homeLink = getHomeNavLink();
      expect(homeLink).toHaveClass('bg-blue-100');
    });

    it('should apply inactive styles to Problems link when on home page', () => {
      mockPathname.mockReturnValue('/');
      renderWithProviders(<Navbar />);
      const problemsLink = getProblemsNavLink();
      expect(problemsLink).toHaveClass('text-gray-600');
      expect(problemsLink).not.toHaveClass('bg-blue-100');
    });

    it('should apply active styles to Problems link when on problems page', () => {
      mockPathname.mockReturnValue('/problems');
      renderWithProviders(<Navbar />);
      const problemsLink = getProblemsNavLink();
      expect(problemsLink).toHaveClass('bg-blue-100');
    });

    it('should apply active styles to Problems link when on a specific problem page', () => {
      mockPathname.mockReturnValue('/problems/some-problem-id');
      renderWithProviders(<Navbar />);
      const problemsLink = getProblemsNavLink();
      expect(problemsLink).toHaveClass('bg-blue-100');
    });

    it('should apply inactive styles to Home link when on problems page', () => {
      mockPathname.mockReturnValue('/problems');
      renderWithProviders(<Navbar />);
      const homeLink = getHomeNavLink();
      expect(homeLink).not.toHaveClass('bg-blue-100');
    });

    it('should have correct href for Home link', () => {
      renderWithProviders(<Navbar />);
      const homeLink = getHomeNavLink();
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('should have correct href for Problems link', () => {
      renderWithProviders(<Navbar />);
      const problemsLink = getProblemsNavLink();
      expect(problemsLink).toHaveAttribute('href', '/problems');
    });

    it('should style inactive links with hover states', () => {
      mockPathname.mockReturnValue('/problems');
      renderWithProviders(<Navbar />);
      const homeLink = getHomeNavLink();
      expect(homeLink).toHaveClass('hover:bg-gray-100');
    });
  });

  describe('Settings Menu Toggle', () => {
    it('should not show settings dropdown initially', () => {
      renderWithProviders(<Navbar />);
      expect(screen.queryByText('Settings')).not.toBeInTheDocument();
    });

    it('should show settings dropdown when settings button is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navbar />);

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('should hide settings dropdown when settings button is clicked again', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navbar />);

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);
      expect(screen.getByText('Settings')).toBeInTheDocument();

      await user.click(settingsButton);
      expect(screen.queryByText('Settings')).not.toBeInTheDocument();
    });

    it('should show Reset Progress option in settings dropdown', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navbar />);

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      expect(screen.getByText('Reset Progress')).toBeInTheDocument();
    });

    it('should show solved count in settings dropdown when problems are solved', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 5 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      expect(screen.getByText('5 problems solved')).toBeInTheDocument();
    });

    it('should show singular "problem" when only one is solved', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 1 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      expect(screen.getByText('1 problem solved')).toBeInTheDocument();
    });

    it('should not show solved count section when no problems are solved', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 0 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      expect(screen.queryByText(/problem.*solved/i)).not.toBeInTheDocument();
    });

    it('should close settings and reset confirmation when clicking outside', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navbar />);

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      expect(screen.getByText('Settings')).toBeInTheDocument();

      // Click outside
      await act(async () => {
        fireEvent.mouseDown(document.body);
      });

      await waitFor(() => {
        expect(screen.queryByText('Settings')).not.toBeInTheDocument();
      });
    });

    it('should close settings dropdown when clicking reset progress', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navbar />);

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      const resetButton = screen.getByText('Reset Progress');
      await user.click(resetButton);

      // Settings dropdown should be closed (the "Settings" header should be gone)
      await waitFor(() => {
        // The Settings header in dropdown should not be present
        const settingsHeader = document.querySelector('.px-4.py-2.border-b p');
        expect(settingsHeader).not.toBeInTheDocument();
      });
    });

    it('should reset show reset confirm to false when toggling settings', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 3 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      // Click Reset Progress to show confirmation
      const resetButton = screen.getByText('Reset Progress');
      await user.click(resetButton);

      // Confirmation dialog should be shown
      expect(screen.getByRole('heading', { name: /reset progress/i })).toBeInTheDocument();

      // Toggle settings again
      await user.click(settingsButton);

      // Close the settings
      await user.click(settingsButton);

      // Open settings again - confirmation should be reset
      await user.click(settingsButton);
      expect(screen.queryByText('This action cannot be undone')).not.toBeInTheDocument();
    });
  });

  describe('Reset Progress Confirmation Dialog', () => {
    it('should show confirmation dialog when Reset Progress is clicked', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 5 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      const resetButton = screen.getByText('Reset Progress');
      await user.click(resetButton);

      expect(screen.getByRole('heading', { name: /reset progress/i })).toBeInTheDocument();
      expect(screen.getByText('This action cannot be undone')).toBeInTheDocument();
    });

    it('should show correct message with solved count in confirmation', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 5 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      const resetButton = screen.getByText('Reset Progress');
      await user.click(resetButton);

      expect(screen.getByText(/5 solved problems/i)).toBeInTheDocument();
    });

    it('should show singular form for 1 solved problem', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 1 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      const resetButton = screen.getByText('Reset Progress');
      await user.click(resetButton);

      expect(screen.getByText(/1 solved problem and your streak/i)).toBeInTheDocument();
    });

    it('should show Cancel and Reset Progress buttons in confirmation dialog', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 3 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      const resetButton = screen.getByText('Reset Progress');
      await user.click(resetButton);

      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
      // There are two "Reset Progress" texts - one in title, one in button
      const resetButtons = screen.getAllByText('Reset Progress');
      expect(resetButtons.length).toBeGreaterThanOrEqual(2);
    });

    it('should close confirmation dialog when Cancel is clicked', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 3 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      await waitFor(() => {
        expect(screen.getByText('Reset Progress')).toBeInTheDocument();
      });
      const resetButton = screen.getByText('Reset Progress');
      fireEvent.click(resetButton);

      // Wait for dialog to appear
      await waitFor(() => {
        expect(screen.getByText('This action cannot be undone')).toBeInTheDocument();
      });

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(screen.queryByText('This action cannot be undone')).not.toBeInTheDocument();
      });
    });

    it('should close confirmation dialog when clicking backdrop', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 3 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      const resetButton = screen.getByText('Reset Progress');
      await user.click(resetButton);

      // Find the backdrop and click it
      const backdrop = document.querySelector('.bg-black\\/50');
      expect(backdrop).toBeInTheDocument();
      if (backdrop) {
        await user.click(backdrop);
      }

      await waitFor(() => {
        expect(screen.queryByText('This action cannot be undone')).not.toBeInTheDocument();
      });
    });

    it('should call resetProgress when confirm Reset Progress is clicked', async () => {
      const user = userEvent.setup();
      const mockResetProgress = jest.fn();
      const progressContext = createMockProgressContext({
        solvedCount: 3,
        resetProgress: mockResetProgress,
      });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      // Open settings menu
      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      // Click "Reset Progress" in the menu to open the confirmation dialog
      // The menu item is a button, so we need to find and click it
      await waitFor(() => {
        expect(screen.getByText('Reset Progress')).toBeInTheDocument();
      });
      const resetButtonInMenu = screen.getByText('Reset Progress');

      // Use fireEvent.click instead of userEvent to ensure the click goes through
      fireEvent.click(resetButtonInMenu);

      // Wait for the dialog to appear
      await waitFor(() => {
        expect(screen.getByText('This action cannot be undone')).toBeInTheDocument();
      });

      // Now find and click the confirm button - it's the one with red background
      const allButtons = screen.getAllByRole('button');
      const confirmButton = allButtons.find(
        (btn) => btn.textContent === 'Reset Progress' && btn.className.includes('bg-red-600')
      );

      expect(confirmButton).toBeDefined();
      if (confirmButton) {
        fireEvent.click(confirmButton);
      }

      await waitFor(() => {
        expect(mockResetProgress).toHaveBeenCalledTimes(1);
      });
    });

    it('should close confirmation dialog after confirming reset', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 3 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      await waitFor(() => {
        expect(screen.getByText('Reset Progress')).toBeInTheDocument();
      });
      const resetButtonInMenu = screen.getByText('Reset Progress');
      fireEvent.click(resetButtonInMenu);

      // Wait for dialog to appear
      await waitFor(() => {
        expect(screen.getByText('This action cannot be undone')).toBeInTheDocument();
      });

      // Find the confirm button
      const allButtons = screen.getAllByRole('button');
      const confirmButton = allButtons.find(
        (btn) => btn.textContent === 'Reset Progress' && btn.className.includes('bg-red-600')
      );

      if (confirmButton) {
        fireEvent.click(confirmButton);
      }

      await waitFor(() => {
        expect(screen.queryByText('This action cannot be undone')).not.toBeInTheDocument();
      });
    });

    it('should show warning icon in confirmation dialog', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 3 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      const resetButton = screen.getByText('Reset Progress');
      await user.click(resetButton);

      // Check for the warning icon container
      const warningIconContainer = document.querySelector('.bg-red-100');
      expect(warningIconContainer).toBeInTheDocument();
    });
  });

  describe('Progress Display from Context', () => {
    it('should display streak value from context', () => {
      const progressContext = createMockProgressContext({ streak: 15 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });
      expect(screen.getByText('15')).toBeInTheDocument();
    });

    it('should display zero streak correctly', () => {
      const progressContext = createMockProgressContext({ streak: 0 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should display solved count and total from context', () => {
      const progressContext = createMockProgressContext({ solvedCount: 7, totalProblems: 20 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });
      expect(screen.getByText('7/20')).toBeInTheDocument();
    });

    it('should display zero solved problems correctly', () => {
      const progressContext = createMockProgressContext({ solvedCount: 0, totalProblems: 15 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });
      expect(screen.getByText('0/15')).toBeInTheDocument();
    });

    it('should update display when context values change', () => {
      const progressContext = createMockProgressContext({ solvedCount: 5, totalProblems: 10 });
      const { rerender } = renderWithProviders(<Navbar />, {
        progressContextValue: progressContext,
      });

      expect(screen.getByText('5/10')).toBeInTheDocument();

      const updatedContext = createMockProgressContext({ solvedCount: 6, totalProblems: 10 });
      rerender(
        <ThemeContext.Provider value={createMockThemeContext()}>
          <ProgressContext.Provider value={updatedContext}>
            <Navbar />
          </ProgressContext.Provider>
        </ThemeContext.Provider>
      );

      expect(screen.getByText('6/10')).toBeInTheDocument();
    });

    it('should display all solved problems correctly', () => {
      const progressContext = createMockProgressContext({ solvedCount: 10, totalProblems: 10 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });
      expect(screen.getByText('10/10')).toBeInTheDocument();
    });
  });

  describe('Theme Toggle Integration', () => {
    it('should render ThemeToggle component', () => {
      renderWithProviders(<Navbar />);
      const themeToggle = screen.getByTestId('theme-toggle');
      expect(themeToggle).toBeInTheDocument();
    });

    it('should position ThemeToggle in the right section', () => {
      renderWithProviders(<Navbar />);
      const themeToggle = screen.getByTestId('theme-toggle');
      // Check that it's in the flex container with other right-side elements
      const parentContainer = themeToggle.parentElement;
      expect(parentContainer).toHaveClass('flex', 'items-center', 'gap-4');
    });
  });

  describe('Responsive Behavior', () => {
    it('should hide logo text on small screens (sm:inline class)', () => {
      renderWithProviders(<Navbar />);
      const logoText = screen.getByText('JS/TS Tricks');
      expect(logoText).toHaveClass('hidden', 'sm:inline');
    });

    it('should hide progress stats on small screens', () => {
      const progressContext = createMockProgressContext({ streak: 5, solvedCount: 3, totalProblems: 10 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const streakContainer = screen.getByTitle('Current streak');
      const progressContainer = streakContainer.parentElement;
      expect(progressContainer).toHaveClass('hidden', 'sm:flex');
    });

    it('should always show settings button', () => {
      renderWithProviders(<Navbar />);
      const settingsButton = screen.getByRole('button', { name: /settings/i });
      // Settings button should not have hidden classes
      expect(settingsButton).not.toHaveClass('hidden');
    });

    it('should always show navigation links', () => {
      renderWithProviders(<Navbar />);
      const homeLink = getHomeNavLink();
      const problemsLink = getProblemsNavLink();

      // Navigation container should not have hidden class
      expect(homeLink?.parentElement).not.toHaveClass('hidden');
      expect(problemsLink?.parentElement).not.toHaveClass('hidden');
    });

    it('should have responsive padding classes', () => {
      renderWithProviders(<Navbar />);
      const nav = screen.getByRole('navigation');
      const innerContainer = nav.querySelector('.max-w-7xl');
      expect(innerContainer).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible settings button with aria-label', () => {
      renderWithProviders(<Navbar />);
      const settingsButton = screen.getByRole('button', { name: /settings/i });
      expect(settingsButton).toHaveAttribute('aria-label', 'Settings');
    });

    it('should render navigation element with role="navigation"', () => {
      renderWithProviders(<Navbar />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('should have focusable navigation links', () => {
      renderWithProviders(<Navbar />);
      const homeLink = getHomeNavLink();
      const problemsLink = getProblemsNavLink();

      expect(homeLink?.tagName).toBe('A');
      expect(problemsLink?.tagName).toBe('A');
    });

    it('should have title attributes for progress icons', () => {
      const progressContext = createMockProgressContext({ streak: 5, solvedCount: 3 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      expect(screen.getByTitle('Current streak')).toBeInTheDocument();
      expect(screen.getByTitle('Problems solved')).toBeInTheDocument();
    });

    it('should have accessible confirmation dialog', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 3 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      const resetButton = screen.getByText('Reset Progress');
      await user.click(resetButton);

      // Dialog should have heading
      const heading = screen.getByRole('heading', { name: /reset progress/i });
      expect(heading).toBeInTheDocument();

      // Should have accessible buttons
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    it('should have keyboard-accessible settings button', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navbar />);

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      settingsButton.focus();
      expect(document.activeElement).toBe(settingsButton);

      // Pressing Enter should open the menu
      await user.keyboard('{Enter}');
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('should have keyboard-accessible cancel button in dialog', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 3 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      const resetButton = screen.getByText('Reset Progress');
      await user.click(resetButton);

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      cancelButton.focus();
      expect(document.activeElement).toBe(cancelButton);
    });

    it('should support keyboard navigation through links', async () => {
      renderWithProviders(<Navbar />);

      const homeLink = getHomeNavLink();
      const problemsLink = getProblemsNavLink();

      homeLink?.focus();
      expect(document.activeElement).toBe(homeLink);

      problemsLink?.focus();
      expect(document.activeElement).toBe(problemsLink);
    });
  });

  describe('Click Outside Behavior', () => {
    it('should close settings menu when clicking outside', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navbar />);

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      expect(screen.getByText('Settings')).toBeInTheDocument();

      // Simulate clicking outside
      await act(async () => {
        fireEvent.mouseDown(document.body);
      });

      await waitFor(() => {
        expect(screen.queryByText('Settings')).not.toBeInTheDocument();
      });
    });

    it('should not close settings menu when clicking inside', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navbar />);

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      // Click inside the dropdown (on the Settings header text)
      const settingsHeader = screen.getByText('Settings');
      await act(async () => {
        fireEvent.mouseDown(settingsHeader);
      });

      // Menu should still be open
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('should close reset confirmation when clicking outside', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 3 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      const resetButton = screen.getByText('Reset Progress');
      await user.click(resetButton);

      expect(screen.getByText('This action cannot be undone')).toBeInTheDocument();

      // Click outside on the navbar itself
      await act(async () => {
        fireEvent.mouseDown(document.body);
      });

      await waitFor(() => {
        expect(screen.queryByText('This action cannot be undone')).not.toBeInTheDocument();
      });
    });

    it('should properly clean up event listener on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

      const { unmount } = renderWithProviders(<Navbar />);
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
      removeEventListenerSpy.mockRestore();
    });
  });

  describe('Styling Classes', () => {
    it('should apply dark mode border classes', () => {
      renderWithProviders(<Navbar />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('border-gray-200', 'dark:border-gray-800');
    });

    it('should apply correct background classes', () => {
      renderWithProviders(<Navbar />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('bg-white', 'dark:bg-gray-900');
    });

    it('should apply shadow to navbar', () => {
      renderWithProviders(<Navbar />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('shadow-sm');
    });

    it('should apply correct height to navbar', () => {
      renderWithProviders(<Navbar />);
      const nav = screen.getByRole('navigation');
      const innerContainer = nav.querySelector('.flex.items-center.justify-between');
      expect(innerContainer).toHaveClass('h-14');
    });

    it('should apply correct text colors to logo link', () => {
      renderWithProviders(<Navbar />);
      const logoLink = getLogoLink();
      expect(logoLink).toHaveClass('text-gray-900', 'dark:text-white');
    });

    it('should apply transition classes to navigation links', () => {
      renderWithProviders(<Navbar />);
      const homeLink = getHomeNavLink();
      expect(homeLink).toHaveClass('transition-colors');
    });

    it('should apply correct classes to streak display', () => {
      const progressContext = createMockProgressContext({ streak: 5 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });
      const streakContainer = screen.getByTitle('Current streak');
      expect(streakContainer).toHaveClass('text-orange-500');
    });

    it('should apply correct classes to solved count display', () => {
      const progressContext = createMockProgressContext({ solvedCount: 3 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });
      const solvedContainer = screen.getByTitle('Problems solved');
      expect(solvedContainer).toHaveClass('text-green-600', 'dark:text-green-400');
    });

    it('should apply correct classes to settings dropdown', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navbar />);

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      const dropdown = screen.getByText('Settings').closest('.absolute');
      expect(dropdown).toHaveClass('right-0', 'mt-2', 'w-56', 'rounded-lg', 'shadow-lg', 'z-50');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero total problems', () => {
      const progressContext = createMockProgressContext({ solvedCount: 0, totalProblems: 0 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });
      expect(screen.getByText('0/0')).toBeInTheDocument();
    });

    it('should handle large numbers in progress display', () => {
      const progressContext = createMockProgressContext({
        solvedCount: 999,
        totalProblems: 1000,
        streak: 365,
      });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });
      expect(screen.getByText('999/1000')).toBeInTheDocument();
      expect(screen.getByText('365')).toBeInTheDocument();
    });

    it('should handle rapid clicking of settings button', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navbar />);

      const settingsButton = screen.getByRole('button', { name: /settings/i });

      // Rapid clicks
      await user.click(settingsButton);
      await user.click(settingsButton);
      await user.click(settingsButton);

      // Should be in a consistent state (toggled 3 times = open)
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('should handle unmounting while settings menu is open', async () => {
      const user = userEvent.setup();
      const { unmount } = renderWithProviders(<Navbar />);

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      // Should not throw when unmounting with menu open
      expect(() => unmount()).not.toThrow();
    });

    it('should handle different pathnames correctly', () => {
      // Test with various pathnames
      const pathnames = ['/', '/problems', '/problems/test-id', '/settings', '/about'];

      pathnames.forEach((path) => {
        mockPathname.mockReturnValue(path);
        linkCounter = 0; // Reset link counter for each render
        const { unmount } = renderWithProviders(<Navbar />);

        const homeLink = getHomeNavLink();
        const problemsLink = getProblemsNavLink();

        if (path === '/') {
          expect(homeLink).toHaveClass('bg-blue-100');
        } else if (path.startsWith('/problems')) {
          expect(problemsLink).toHaveClass('bg-blue-100');
        } else {
          expect(homeLink).not.toHaveClass('bg-blue-100');
          expect(problemsLink).not.toHaveClass('bg-blue-100');
        }

        unmount();
      });
    });
  });

  describe('Settings Menu Content', () => {
    it('should render settings header with correct styling', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navbar />);

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      const settingsHeader = screen.getByText('Settings');
      expect(settingsHeader).toHaveClass('text-sm', 'font-semibold');
    });

    it('should have Reset Progress button with correct styling', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Navbar />);

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      const resetButton = screen.getByText('Reset Progress');
      expect(resetButton).toHaveClass('w-full', 'px-4', 'py-2', 'text-left', 'text-sm');
    });

    it('should show settings icon in the button', () => {
      renderWithProviders(<Navbar />);
      const settingsButton = screen.getByRole('button', { name: /settings/i });
      const svg = settingsButton.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('w-5', 'h-5');
    });
  });

  describe('Confirmation Dialog Content', () => {
    it('should show correct message about clearing streak', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 5 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      const resetButton = screen.getByText('Reset Progress');
      await user.click(resetButton);

      expect(screen.getByText(/and your streak/i)).toBeInTheDocument();
    });

    it('should have proper button styling in confirmation dialog', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 3 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      await waitFor(() => {
        expect(screen.getByText('Reset Progress')).toBeInTheDocument();
      });
      const resetButton = screen.getByText('Reset Progress');
      fireEvent.click(resetButton);

      // Wait for dialog to appear
      await waitFor(() => {
        expect(screen.getByText('This action cannot be undone')).toBeInTheDocument();
      });

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      expect(cancelButton).toHaveClass('bg-gray-100', 'dark:bg-gray-700');

      // Find the confirm button
      const allButtons = screen.getAllByRole('button');
      const confirmButton = allButtons.find(
        (btn) => btn.textContent === 'Reset Progress' && btn.className.includes('bg-red-600')
      );
      expect(confirmButton).toBeDefined();
      expect(confirmButton).toHaveClass('bg-red-600', 'hover:bg-red-700');
    });

    it('should have proper dialog container styling', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 3 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      const resetButton = screen.getByText('Reset Progress');
      await user.click(resetButton);

      const dialog = document.querySelector('.fixed.inset-0');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveClass('z-[100]', 'flex', 'items-center', 'justify-center');
    });

    it('should have backdrop blur effect', async () => {
      const user = userEvent.setup();
      const progressContext = createMockProgressContext({ solvedCount: 3 });
      renderWithProviders(<Navbar />, { progressContextValue: progressContext });

      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await user.click(settingsButton);

      const resetButton = screen.getByText('Reset Progress');
      await user.click(resetButton);

      const backdrop = document.querySelector('.backdrop-blur-sm');
      expect(backdrop).toBeInTheDocument();
    });
  });

  describe('Logo Link', () => {
    it('should render logo with correct styling classes', () => {
      renderWithProviders(<Navbar />);
      const logoLink = getLogoLink();
      expect(logoLink).toHaveClass(
        'flex',
        'items-center',
        'gap-2',
        'font-bold',
        'text-lg'
      );
    });

    it('should have hover color transition', () => {
      renderWithProviders(<Navbar />);
      const logoLink = getLogoLink();
      expect(logoLink).toHaveClass(
        'hover:text-blue-600',
        'dark:hover:text-blue-400',
        'transition-colors'
      );
    });
  });

  describe('isActive function behavior', () => {
    it('should only mark Home as active for exact root path match', () => {
      mockPathname.mockReturnValue('/');
      renderWithProviders(<Navbar />);

      const homeLink = getHomeNavLink();
      const problemsLink = getProblemsNavLink();

      expect(homeLink).toHaveClass('bg-blue-100');
      expect(problemsLink).not.toHaveClass('bg-blue-100');
    });

    it('should mark Problems as active for any path starting with /problems', () => {
      mockPathname.mockReturnValue('/problems/nested/deep/path');
      renderWithProviders(<Navbar />);

      const problemsLink = getProblemsNavLink();
      expect(problemsLink).toHaveClass('bg-blue-100');
    });

    it('should not mark Home as active for non-root paths', () => {
      mockPathname.mockReturnValue('/other');
      renderWithProviders(<Navbar />);

      const homeLink = getHomeNavLink();
      expect(homeLink).not.toHaveClass('bg-blue-100');
    });
  });
});
