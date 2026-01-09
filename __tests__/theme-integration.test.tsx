import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import { useState, useEffect } from 'react';

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

// Component that displays theme-dependent content
function ThemeAwareComponent() {
  const { theme } = useTheme();
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    // Simulate theme-dependent styling
    setBgColor(theme === 'dark' ? 'dark-bg' : 'light-bg');
  }, [theme]);

  return (
    <div data-testid="theme-aware" className={bgColor}>
      <p>Current theme: {theme}</p>
      <div
        className={
          theme === 'dark'
            ? 'text-white bg-gray-900'
            : 'text-gray-900 bg-white'
        }
        data-testid="theme-content"
      >
        Theme-dependent content
      </div>
    </div>
  );
}

describe('Theme Integration', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.classList.remove('dark');
  });

  describe('ThemeProvider and ThemeToggle Integration', () => {
    it('should update theme-aware components when toggle is clicked', async () => {
      const user = userEvent.setup();
      localStorageMock.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');

      render(
        <ThemeProvider>
          <ThemeAwareComponent />
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme-aware')).toHaveTextContent('Current theme: dark');
        expect(screen.getByTestId('theme-content')).toHaveClass('text-white', 'bg-gray-900');
      });

      const toggleButton = screen.getByRole('button', { name: /switch to light mode/i });
      await user.click(toggleButton);

      await waitFor(() => {
        expect(screen.getByTestId('theme-aware')).toHaveTextContent('Current theme: light');
        expect(screen.getByTestId('theme-content')).toHaveClass('text-gray-900', 'bg-white');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
      });
    });

    it('should persist theme across multiple components', async () => {
      const user = userEvent.setup();
      localStorageMock.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');

      render(
        <ThemeProvider>
          <ThemeAwareComponent />
          <ThemeToggle />
          <ThemeAwareComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        const components = screen.getAllByTestId('theme-aware');
        components.forEach((component) => {
          expect(component).toHaveTextContent('Current theme: light');
        });
      });

      const toggleButton = screen.getByRole('button', { name: /switch to dark mode/i });
      await user.click(toggleButton);

      await waitFor(() => {
        const components = screen.getAllByTestId('theme-aware');
        components.forEach((component) => {
          expect(component).toHaveTextContent('Current theme: dark');
        });
        expect(document.documentElement.classList.contains('dark')).toBe(true);
      });
    });
  });

  describe('Theme Persistence Integration', () => {
    it('should restore theme from localStorage on mount', async () => {
      localStorageMock.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');

      render(
        <ThemeProvider>
          <ThemeAwareComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme-aware')).toHaveTextContent('Current theme: light');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
      });
    });

    it('should update localStorage when theme changes', async () => {
      const user = userEvent.setup();
      localStorageMock.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');

      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(localStorageMock.getItem('theme')).toBe('dark');
      });

      const toggleButton = screen.getByRole('button', { name: /switch to light mode/i });
      await user.click(toggleButton);

      await waitFor(() => {
        expect(localStorageMock.getItem('theme')).toBe('light');
      });
    });
  });

  describe('DOM and State Synchronization', () => {
    it('should keep DOM class and theme state in sync', async () => {
      const user = userEvent.setup();
      localStorageMock.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');

      render(
        <ThemeProvider>
          <ThemeAwareComponent />
          <ThemeToggle />
        </ThemeProvider>
      );

      // Initial state: dark
      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(screen.getByTestId('theme-aware')).toHaveTextContent('Current theme: dark');
      });

      // Toggle to light
      const toggleButton = screen.getByRole('button', { name: /switch to light mode/i });
      await user.click(toggleButton);

      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(false);
        expect(screen.getByTestId('theme-aware')).toHaveTextContent('Current theme: light');
      });

      // Toggle back to dark
      const toggleButton2 = screen.getByRole('button', { name: /switch to dark mode/i });
      await user.click(toggleButton2);

      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(screen.getByTestId('theme-aware')).toHaveTextContent('Current theme: dark');
      });
    });
  });

  describe('Multiple Theme Changes', () => {
    it('should handle rapid theme toggles correctly', async () => {
      const user = userEvent.setup();
      localStorageMock.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');

      render(
        <ThemeProvider>
          <ThemeAwareComponent />
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme-aware')).toHaveTextContent('Current theme: dark');
      });

      // Rapid toggles
      const toggleButton = screen.getByRole('button');
      await user.click(toggleButton);
      await user.click(toggleButton);
      await user.click(toggleButton);

      await waitFor(() => {
        // Should end up in light mode (3 toggles: dark -> light -> dark -> light)
        expect(screen.getByTestId('theme-aware')).toHaveTextContent('Current theme: light');
        expect(localStorageMock.getItem('theme')).toBe('light');
      });
    });
  });
});
