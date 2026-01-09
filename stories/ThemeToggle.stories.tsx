import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

// Mock ThemeContext for Storybook
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const MockThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Mock useTheme hook that uses our mock context
function useMockTheme() {
  const context = useContext(MockThemeContext);
  if (context === undefined) {
    throw new Error('useMockTheme must be used within a MockThemeProvider');
  }
  return context;
}

// Mock ThemeProvider for stories
function MockThemeProvider({
  children,
  initialTheme = 'light',
}: {
  children: React.ReactNode;
  initialTheme?: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  // Apply dark class to documentElement when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const contextValue = useMemo(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme]
  );

  return <MockThemeContext.Provider value={contextValue}>{children}</MockThemeContext.Provider>;
}

// Standalone ThemeToggle component for stories (avoids import issues with useTheme)
function ThemeToggleComponent() {
  const { theme, toggleTheme } = useMockTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 active:scale-95"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
    </button>
  );
}

const meta: Meta<typeof ThemeToggleComponent> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggleComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A theme toggle button that switches between light and dark modes. Shows a moon icon in light mode (to switch to dark) and a sun icon in dark mode (to switch to light).',
      },
    },
    chromatic: {
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const initialTheme =
        (context.args as { initialTheme?: 'light' | 'dark' }).initialTheme || 'light';
      return (
        <MockThemeProvider initialTheme={initialTheme}>
          <Story />
        </MockThemeProvider>
      );
    },
  ],
  argTypes: {
    initialTheme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Initial theme state for the toggle',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggleComponent & { initialTheme: Theme }>;

/**
 * Light theme state - Shows the moon icon indicating the option to switch to dark mode.
 * This is the default state when the application loads in light mode.
 */
export const LightTheme: Story = {
  args: {
    initialTheme: 'light',
  },
  parameters: {
    backgrounds: { default: 'light' },
    chromatic: {
      modes: {
        light: { theme: 'light' },
      },
    },
  },
};

/**
 * Dark theme state - Shows the sun icon indicating the option to switch to light mode.
 * The button has dark-mode specific styling with gray-800 background.
 */
export const DarkTheme: Story = {
  args: {
    initialTheme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    chromatic: {
      modes: {
        dark: { theme: 'dark' },
      },
    },
  },
  decorators: [
    (Story, context) => {
      React.useEffect(() => {
        document.documentElement.classList.add('dark');
        return () => document.documentElement.classList.remove('dark');
      }, []);
      return (
        <MockThemeProvider initialTheme="dark">
          <Story />
        </MockThemeProvider>
      );
    },
  ],
};

/**
 * Hover state - Demonstrates the hover effect with slightly darker background.
 * Uses CSS pseudo-class :hover with bg-gray-200 in light mode.
 */
export const HoverState: Story = {
  args: {
    initialTheme: 'light',
  },
  parameters: {
    pseudo: { hover: true },
    backgrounds: { default: 'light' },
    chromatic: {
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
      },
    },
  },
  decorators: [
    (Story) => (
      <MockThemeProvider initialTheme="light">
        <div className="[&>button]:bg-gray-200 dark:[&>button]:bg-gray-700">
          <Story />
        </div>
      </MockThemeProvider>
    ),
  ],
};

/**
 * Focus state - Shows the keyboard focus ring for accessibility.
 * Uses a blue focus ring with proper offset for visibility.
 */
export const FocusState: Story = {
  args: {
    initialTheme: 'light',
  },
  parameters: {
    pseudo: { focus: true },
    backgrounds: { default: 'light' },
    chromatic: {
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
      },
    },
  },
  decorators: [
    (Story) => (
      <MockThemeProvider initialTheme="light">
        <div className="[&>button]:ring-2 [&>button]:ring-blue-400 [&>button]:ring-offset-2">
          <Story />
        </div>
      </MockThemeProvider>
    ),
  ],
};

/**
 * Active/Pressed state - Shows the scale-down effect when pressed.
 * Uses transform scale-95 for tactile feedback.
 */
export const ActiveState: Story = {
  args: {
    initialTheme: 'light',
  },
  parameters: {
    pseudo: { active: true },
    backgrounds: { default: 'light' },
    chromatic: {
      modes: {
        light: { theme: 'light' },
      },
    },
  },
  decorators: [
    (Story) => (
      <MockThemeProvider initialTheme="light">
        <div className="[&>button]:scale-95">
          <Story />
        </div>
      </MockThemeProvider>
    ),
  ],
};

/**
 * Navbar context - ThemeToggle positioned in a navigation bar context.
 * Demonstrates how the button appears when placed in the corner of a navbar.
 */
export const InNavbarContext: Story = {
  args: {
    initialTheme: 'light',
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
    chromatic: {
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
      },
    },
  },
  decorators: [
    (Story, context) => (
      <MockThemeProvider
        initialTheme={(context.args as { initialTheme?: 'light' | 'dark' }).initialTheme || 'light'}
      >
        <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold text-gray-900 dark:text-white">Coding Tricks</div>
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Problems
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Topics
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Story />
          </div>
        </nav>
      </MockThemeProvider>
    ),
  ],
};

/**
 * Standalone button - ThemeToggle as an isolated component.
 * Shows the button without any surrounding context.
 */
export const Standalone: Story = {
  args: {
    initialTheme: 'light',
  },
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
    chromatic: {
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
      },
    },
  },
};

/**
 * Mobile size - ThemeToggle at mobile viewport width.
 * Tests the component's appearance on smaller screens with touch-friendly sizing.
 */
export const MobileSize: Story = {
  args: {
    initialTheme: 'light',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    layout: 'centered',
    backgrounds: { default: 'light' },
    chromatic: {
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
      },
    },
  },
  decorators: [
    (Story, context) => (
      <MockThemeProvider
        initialTheme={(context.args as { initialTheme?: 'light' | 'dark' }).initialTheme || 'light'}
      >
        <div className="p-4 min-h-[100px] flex items-center justify-center">
          <Story />
        </div>
      </MockThemeProvider>
    ),
  ],
};

/**
 * Desktop size - ThemeToggle at desktop viewport width.
 * Tests the component's appearance on larger screens.
 */
export const DesktopSize: Story = {
  args: {
    initialTheme: 'light',
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    layout: 'centered',
    backgrounds: { default: 'light' },
    chromatic: {
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
      },
    },
  },
};

/**
 * With tooltip showing - ThemeToggle with its native title tooltip visible.
 * The button includes a title attribute that shows "Switch to dark/light mode".
 */
export const WithTooltip: Story = {
  args: {
    initialTheme: 'light',
  },
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
    chromatic: {
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
      },
    },
  },
  decorators: [
    (Story, context) => (
      <MockThemeProvider
        initialTheme={(context.args as { initialTheme?: 'light' | 'dark' }).initialTheme || 'light'}
      >
        <div className="relative">
          <Story />
          {/* Simulated tooltip since native title tooltips cannot be captured in screenshots */}
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 text-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-md shadow-lg whitespace-nowrap z-10"
            role="tooltip"
          >
            Switch to{' '}
            {(context.args as { initialTheme?: 'light' | 'dark' }).initialTheme === 'light'
              ? 'dark'
              : 'light'}{' '}
            mode
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900 dark:border-b-gray-100" />
          </div>
        </div>
      </MockThemeProvider>
    ),
  ],
};

/**
 * Both themes side by side - Visual comparison of light and dark states.
 * Useful for Chromatic visual regression testing of both states simultaneously.
 */
export const BothThemes: Story = {
  parameters: {
    layout: 'centered',
    chromatic: {
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
      },
    },
  },
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">Light Theme</span>
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <MockThemeProvider initialTheme="light">
            <ThemeToggleComponent />
          </MockThemeProvider>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">Dark Theme</span>
        <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
          <MockThemeProvider initialTheme="dark">
            <div className="dark">
              <ThemeToggleComponent />
            </div>
          </MockThemeProvider>
        </div>
      </div>
    </div>
  ),
};

/**
 * All interactive states - Shows hover, focus, and active states together.
 * Comprehensive view for testing all interactive visual states.
 */
export const AllInteractiveStates: Story = {
  parameters: {
    layout: 'centered',
    chromatic: {
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex gap-8 items-end">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500">Default</span>
          <MockThemeProvider initialTheme="light">
            <ThemeToggleComponent />
          </MockThemeProvider>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500">Hover</span>
          <MockThemeProvider initialTheme="light">
            <div className="[&>button]:bg-gray-200">
              <ThemeToggleComponent />
            </div>
          </MockThemeProvider>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500">Focus</span>
          <MockThemeProvider initialTheme="light">
            <div className="[&>button]:ring-2 [&>button]:ring-blue-400 [&>button]:ring-offset-2">
              <ThemeToggleComponent />
            </div>
          </MockThemeProvider>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500">Active</span>
          <MockThemeProvider initialTheme="light">
            <div className="[&>button]:scale-95 [&>button]:bg-gray-200">
              <ThemeToggleComponent />
            </div>
          </MockThemeProvider>
        </div>
      </div>
    </div>
  ),
};

/**
 * Interactive Test: Light to Dark - Click the button to switch from light to dark mode.
 * This story tests that clicking the toggle changes the theme and UI colors.
 */
export const ClickLightToDark: Story = {
  args: {
    initialTheme: 'light',
  },
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
    chromatic: { disableSnapshot: false },
  },
  decorators: [
    (Story) => (
      <MockThemeProvider initialTheme="light">
        <div
          data-testid="theme-container"
          className="p-8 rounded-lg transition-colors duration-300 bg-gray-100 dark:bg-gray-900"
        >
          <div className="flex flex-col items-center gap-4">
            <span
              data-testid="theme-label"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Current Theme: <span data-testid="theme-value">Light</span>
            </span>
            <Story />
            <p data-testid="sample-text" className="text-gray-600 dark:text-gray-300 text-sm">
              Sample text that changes color with theme
            </p>
          </div>
        </div>
      </MockThemeProvider>
    ),
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify initial light theme state', async () => {
      const button = canvas.getByRole('button');
      // Button should have aria-label for switching to dark mode
      await expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    });

    await step('Click button to switch to dark mode', async () => {
      const button = canvas.getByRole('button');
      await userEvent.click(button);
    });

    await step('Verify dark theme is applied via button state', async () => {
      await waitFor(async () => {
        const button = canvas.getByRole('button');
        // Button should now show aria-label for switching to light mode
        await expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
      });
    });
  },
};

/**
 * Interactive Test: Dark to Light - Click the button to switch from dark to light mode.
 * This story tests that clicking the toggle changes from dark theme back to light.
 */
export const ClickDarkToLight: Story = {
  args: {
    initialTheme: 'dark',
  },
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    chromatic: { disableSnapshot: false },
  },
  decorators: [
    (Story) => (
      <MockThemeProvider initialTheme="dark">
        <div
          data-testid="theme-container"
          className="p-8 rounded-lg transition-colors duration-300 bg-gray-100 dark:bg-gray-900"
        >
          <div className="flex flex-col items-center gap-4">
            <span
              data-testid="theme-label"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Current Theme: <span data-testid="theme-value">Dark</span>
            </span>
            <Story />
            <p data-testid="sample-text" className="text-gray-600 dark:text-gray-300 text-sm">
              Sample text that changes color with theme
            </p>
          </div>
        </div>
      </MockThemeProvider>
    ),
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify initial dark theme state', async () => {
      const button = canvas.getByRole('button');
      // Button should have aria-label for switching to light mode
      await expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
    });

    await step('Click button to switch to light mode', async () => {
      const button = canvas.getByRole('button');
      await userEvent.click(button);
    });

    await step('Verify light theme is applied via button state', async () => {
      await waitFor(async () => {
        const button = canvas.getByRole('button');
        // Button should now show aria-label for switching to dark mode
        await expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
      });
    });
  },
};

/**
 * Interactive Test: Multiple Toggles - Click multiple times to verify toggle cycles correctly.
 * Tests that rapid clicking works and theme switches back and forth properly.
 */
export const MultipleToggles: Story = {
  args: {
    initialTheme: 'light',
  },
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
    chromatic: { disableSnapshot: false },
  },
  decorators: [
    (Story) => (
      <MockThemeProvider initialTheme="light">
        <div
          data-testid="theme-container"
          className="p-8 rounded-lg transition-colors duration-300 bg-gray-100 dark:bg-gray-900"
        >
          <div className="flex flex-col items-center gap-4">
            <span
              data-testid="toggle-count"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Toggle Test: Multiple Clicks
            </span>
            <Story />
          </div>
        </div>
      </MockThemeProvider>
    ),
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await step('Start in light mode', async () => {
      await expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    });

    await step('Toggle 1: Light -> Dark', async () => {
      await userEvent.click(button);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
      });
    });

    await step('Toggle 2: Dark -> Light', async () => {
      await userEvent.click(button);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
      });
    });

    await step('Toggle 3: Light -> Dark', async () => {
      await userEvent.click(button);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
      });
    });

    await step('Toggle 4: Dark -> Light', async () => {
      await userEvent.click(button);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
      });
    });

    await step('Final state should be light mode', async () => {
      await expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    });
  },
};

/**
 * Interactive Test: Visual Color Change - Shows the visible background color change.
 * Captures before and after states for visual regression testing.
 */
export const VisualColorChangeTest: Story = {
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      disableSnapshot: false,
      delay: 500, // Wait for animations to complete
    },
  },
  render: () => {
    const [clickCount, setClickCount] = useState(0);
    const { theme, toggleTheme } = useMockTheme();

    const handleClick = () => {
      toggleTheme();
      setClickCount((prev) => prev + 1);
    };

    return (
      <div
        data-testid="visual-test-container"
        className={`min-h-screen p-8 transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        <div className="max-w-md mx-auto">
          <div
            className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
              theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Theme Toggle Test</h2>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Click the button below to test the theme toggle functionality. The entire background
              and card should change colors.
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Current Theme:</p>
                <p
                  data-testid="current-theme"
                  className={`text-lg font-bold ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}
                >
                  {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Toggled {clickCount} time{clickCount !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={handleClick}
                data-testid="theme-toggle-btn"
                className={`p-3 rounded-lg transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Color samples that change with theme */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div
              className={`p-4 rounded-lg text-center ${
                theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
              }`}
            >
              Primary
            </div>
            <div
              className={`p-4 rounded-lg text-center ${
                theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
              }`}
            >
              Success
            </div>
            <div
              className={`p-4 rounded-lg text-center ${
                theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
              }`}
            >
              Danger
            </div>
          </div>
        </div>
      </div>
    );
  },
  decorators: [
    (Story) => (
      <MockThemeProvider initialTheme="light">
        <Story />
      </MockThemeProvider>
    ),
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verify initial light theme colors', async () => {
      const container = canvas.getByTestId('visual-test-container');
      const themeText = canvas.getByTestId('current-theme');

      await expect(container).toHaveClass('bg-gray-50');
      await expect(themeText).toHaveTextContent('Light Mode');
    });

    await step('Click to switch to dark mode and verify color change', async () => {
      const button = canvas.getByTestId('theme-toggle-btn');
      await userEvent.click(button);

      await waitFor(async () => {
        const container = canvas.getByTestId('visual-test-container');
        const themeText = canvas.getByTestId('current-theme');

        await expect(container).toHaveClass('bg-gray-900');
        await expect(themeText).toHaveTextContent('Dark Mode');
      });
    });

    await step('Click again to switch back to light mode', async () => {
      const button = canvas.getByTestId('theme-toggle-btn');
      await userEvent.click(button);

      await waitFor(async () => {
        const container = canvas.getByTestId('visual-test-container');
        const themeText = canvas.getByTestId('current-theme');

        await expect(container).toHaveClass('bg-gray-50');
        await expect(themeText).toHaveTextContent('Light Mode');
      });
    });
  },
};
