import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.classList.remove('dark');
  });

  const renderWithProvider = (initialTheme: 'light' | 'dark' = 'dark') => {
    localStorageMock.setItem('theme', initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
  };

  describe('Rendering', () => {
    it('should render the toggle button', async () => {
      renderWithProvider();
      await waitFor(() => {
        const button = screen.getByRole('button', { name: /switch to/i });
        expect(button).toBeInTheDocument();
      });
    });

    it('should show moon icon when theme is light', async () => {
      renderWithProvider('light');
      await waitFor(() => {
        const button = screen.getByRole('button', { name: /switch to dark mode/i });
        expect(button).toBeInTheDocument();
        // Check for moon icon (dark mode icon) - the SVG path for moon
        const svg = button.querySelector('svg');
        expect(svg).toBeInTheDocument();
      });
    });

    it('should show sun icon when theme is dark', async () => {
      renderWithProvider('dark');
      await waitFor(() => {
        const button = screen.getByRole('button', { name: /switch to light mode/i });
        expect(button).toBeInTheDocument();
        // Check for sun icon (light mode icon) - the SVG path for sun
        const svg = button.querySelector('svg');
        expect(svg).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have correct aria-label for light mode', async () => {
      renderWithProvider('light');
      await waitFor(() => {
        const button = screen.getByRole('button', { name: /switch to dark mode/i });
        expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
      });
    });

    it('should have correct aria-label for dark mode', async () => {
      renderWithProvider('dark');
      await waitFor(() => {
        const button = screen.getByRole('button', { name: /switch to light mode/i });
        expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
      });
    });

    it('should have title attribute', async () => {
      renderWithProvider('dark');
      await waitFor(() => {
        const button = screen.getByRole('button', { name: /switch to light mode/i });
        expect(button).toHaveAttribute('title', 'Switch to light mode');
      });
    });
  });

  describe('Theme Toggle Functionality', () => {
    it('should toggle from dark to light when clicked', async () => {
      const user = userEvent.setup();
      renderWithProvider('dark');

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
      });

      const button = screen.getByRole('button', { name: /switch to light mode/i });
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
        expect(localStorageMock.getItem('theme')).toBe('light');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
      });
    });

    it('should toggle from light to dark when clicked', async () => {
      const user = userEvent.setup();
      renderWithProvider('light');

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
      });

      const button = screen.getByRole('button', { name: /switch to dark mode/i });
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
        expect(localStorageMock.getItem('theme')).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
      });
    });

    it('should update icon when theme changes', async () => {
      const user = userEvent.setup();
      renderWithProvider('dark');

      await waitFor(() => {
        const button = screen.getByRole('button', { name: /switch to light mode/i });
        expect(button).toBeInTheDocument();
      });

      const button = screen.getByRole('button', { name: /switch to light mode/i });
      await user.click(button);

      await waitFor(() => {
        // After toggle, should show moon icon (for switching back to dark)
        expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
      });
    });
  });

  describe('Styling', () => {
    it('should have correct classes for styling', async () => {
      renderWithProvider();
      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveClass('p-2', 'rounded-lg');
      });
    });

    it('should have hover and focus states', async () => {
      renderWithProvider();
      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveClass('hover:bg-gray-200', 'dark:hover:bg-gray-700');
        expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
      });
    });
  });

  describe('SSR Handling', () => {
    it('should render placeholder during SSR', () => {
      // During SSR, mounted is false, so it should render a disabled button
      const { container } = render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );

      // Initially, before mount, there should be a button (might be disabled)
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });
  });
});
