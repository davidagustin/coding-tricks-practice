import { act, render, screen, waitFor } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from '@/components/ThemeProvider';

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

// Test component that uses the theme
function TestComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setRenderCount((prev) => prev + 1);
  }, [theme]);

  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <div data-testid="render-count">{renderCount}</div>
      <button onClick={toggleTheme} data-testid="toggle">
        Toggle
      </button>
      <button onClick={() => setTheme('light')} data-testid="set-light">
        Set Light
      </button>
      <button onClick={() => setTheme('dark')} data-testid="set-dark">
        Set Dark
      </button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.classList.remove('dark');
    // Reset matchMedia mock
    (window.matchMedia as jest.Mock).mockReturnValue({
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });
  });

  describe('Initial Theme', () => {
    it('should default to dark theme when no localStorage value exists', async () => {
      // Set dark class on documentElement to simulate inline script behavior
      document.documentElement.classList.add('dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      });
    });

    it('should use localStorage theme if available', async () => {
      localStorageMock.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('light');
      });
    });

    it('should use system preference when localStorage is not set', async () => {
      // Set dark class on documentElement to simulate inline script behavior
      // The inline script would set this based on system preference
      document.documentElement.classList.add('dark');

      (window.matchMedia as jest.Mock).mockReturnValue({
        matches: true, // prefers dark
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      });
    });
  });

  describe('Theme Toggle', () => {
    it('should toggle from dark to light', async () => {
      localStorageMock.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      });

      const toggleButton = screen.getByTestId('toggle');
      await act(async () => {
        toggleButton.click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('light');
        expect(localStorageMock.getItem('theme')).toBe('light');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
      });
    });

    it('should toggle from light to dark', async () => {
      localStorageMock.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('light');
      });

      const toggleButton = screen.getByTestId('toggle');
      await act(async () => {
        toggleButton.click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
        expect(localStorageMock.getItem('theme')).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
      });
    });
  });

  describe('Set Theme', () => {
    it('should set theme to light', async () => {
      localStorageMock.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      });

      const setLightButton = screen.getByTestId('set-light');
      await act(async () => {
        setLightButton.click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('light');
        expect(localStorageMock.getItem('theme')).toBe('light');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
      });
    });

    it('should set theme to dark', async () => {
      localStorageMock.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('light');
      });

      const setDarkButton = screen.getByTestId('set-dark');
      await act(async () => {
        setDarkButton.click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
        expect(localStorageMock.getItem('theme')).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
      });
    });
  });

  describe('DOM Updates', () => {
    it('should add dark class to documentElement when theme is dark', async () => {
      localStorageMock.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(true);
      });
    });

    it('should remove dark class from documentElement when theme is light', async () => {
      localStorageMock.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(false);
      });
    });
  });

  describe('LocalStorage Persistence', () => {
    it('should persist theme to localStorage', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const setLightButton = screen.getByTestId('set-light');
      await act(async () => {
        setLightButton.click();
      });

      await waitFor(() => {
        expect(localStorageMock.getItem('theme')).toBe('light');
      });
    });

    it('should update localStorage when theme changes', async () => {
      localStorageMock.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      });

      const toggleButton = screen.getByTestId('toggle');
      await act(async () => {
        toggleButton.click();
      });

      await waitFor(() => {
        expect(localStorageMock.getItem('theme')).toBe('light');
      });
    });
  });

  describe('Error Handling', () => {
    it('should throw error when useTheme is used outside ThemeProvider', () => {
      // Suppress console.error for this test
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useTheme must be used within a ThemeProvider');

      consoleError.mockRestore();
    });
  });
});
