import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import Navbar from '../components/Navbar';
import { ProgressContext } from '../components/ProgressProvider';
import { ThemeContext } from '../components/ThemeProvider';

// Mock context value interface
interface MockProgressValue {
  solvedProblems: Set<string>;
  solvedCount: number;
  totalProblems: number;
  streak: number;
  markSolved: (problemId: string) => void;
  markUnsolved: (problemId: string) => void;
  isSolved: (problemId: string) => boolean;
  lastSolvedDate: string | null;
  resetProgress: () => void;
}

// Create mock context wrapper for Progress
const MockProgressProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: Partial<MockProgressValue>;
}) => {
  const defaultValue: MockProgressValue = {
    solvedProblems: new Set(),
    solvedCount: 0,
    totalProblems: 20,
    streak: 0,
    markSolved: () => {},
    markUnsolved: () => {},
    isSolved: () => false,
    lastSolvedDate: null,
    resetProgress: () => {},
  };

  return (
    <ProgressContext.Provider value={{ ...defaultValue, ...value }}>
      {children}
    </ProgressContext.Provider>
  );
};

// Mock ThemeProvider for ThemeToggle component
type Theme = 'light' | 'dark';

const MockThemeProvider = ({
  children,
  theme = 'light',
}: {
  children: React.ReactNode;
  theme?: Theme;
}) => {
  const [currentTheme, setCurrentTheme] = React.useState<Theme>(theme);

  const value = {
    theme: currentTheme,
    toggleTheme: () => setCurrentTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    setTheme: setCurrentTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Combined wrapper for both contexts
const CombinedProviders = ({
  children,
  progressValue,
  theme = 'light',
}: {
  children: React.ReactNode;
  progressValue: Partial<MockProgressValue>;
  theme?: Theme;
}) => (
  <MockThemeProvider theme={theme}>
    <MockProgressProvider value={progressValue}>{children}</MockProgressProvider>
  </MockThemeProvider>
);

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 768, 1200] },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
  decorators: [
    (Story) => (
      <CombinedProviders progressValue={{ solvedCount: 0, totalProblems: 20, streak: 0 }}>
        <Story />
      </CombinedProviders>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

// ============================================================================
// LIGHT MODE STORIES
// ============================================================================

/**
 * Default state with no problems solved (Light Mode).
 * Shows the initial state of the navbar when a user first visits.
 */
export const Default: Story = {
  name: 'Default (Light)',
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
    backgrounds: { default: 'light' },
  },
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.documentElement.classList.remove('dark');
        return () => {};
      }, []);
      return (
        <div className="bg-white min-h-screen">
          <CombinedProviders
            progressValue={{ solvedCount: 0, totalProblems: 20, streak: 0 }}
            theme="light"
          >
            <Story />
          </CombinedProviders>
        </div>
      );
    },
  ],
};

/**
 * Default state with no problems solved (Dark Mode).
 * Shows the initial state of the navbar when a user first visits in dark mode.
 */
export const DefaultDark: Story = {
  name: 'Default (Dark)',
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.documentElement.classList.add('dark');
        return () => document.documentElement.classList.remove('dark');
      }, []);
      return (
        <div className="dark bg-gray-950 min-h-screen">
          <CombinedProviders
            progressValue={{ solvedCount: 0, totalProblems: 20, streak: 0 }}
            theme="dark"
          >
            <Story />
          </CombinedProviders>
        </div>
      );
    },
  ],
};

/**
 * Progress state showing some problems solved (Light Mode).
 * Demonstrates the solved count display with partial progress (5/20).
 */
export const WithProgress: Story = {
  name: 'With Progress (Light)',
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
    backgrounds: { default: 'light' },
  },
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.documentElement.classList.remove('dark');
        return () => {};
      }, []);
      return (
        <div className="bg-white min-h-screen">
          <CombinedProviders
            progressValue={{
              solvedCount: 5,
              totalProblems: 20,
              streak: 0,
              solvedProblems: new Set([
                'problem-1',
                'problem-2',
                'problem-3',
                'problem-4',
                'problem-5',
              ]),
            }}
            theme="light"
          >
            <Story />
          </CombinedProviders>
        </div>
      );
    },
  ],
};

/**
 * Progress state showing some problems solved (Dark Mode).
 * Demonstrates the solved count display with partial progress (5/20) in dark mode.
 */
export const WithProgressDark: Story = {
  name: 'With Progress (Dark)',
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.documentElement.classList.add('dark');
        return () => document.documentElement.classList.remove('dark');
      }, []);
      return (
        <div className="dark bg-gray-950 min-h-screen">
          <CombinedProviders
            progressValue={{
              solvedCount: 5,
              totalProblems: 20,
              streak: 0,
              solvedProblems: new Set([
                'problem-1',
                'problem-2',
                'problem-3',
                'problem-4',
                'problem-5',
              ]),
            }}
            theme="dark"
          >
            <Story />
          </CombinedProviders>
        </div>
      );
    },
  ],
};

/**
 * With active streak showing (Light Mode).
 * Demonstrates the streak counter with a 7-day streak.
 */
export const WithStreak: Story = {
  name: 'With Streak (Light)',
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
    backgrounds: { default: 'light' },
  },
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.documentElement.classList.remove('dark');
        return () => {};
      }, []);
      return (
        <div className="bg-white min-h-screen">
          <CombinedProviders
            progressValue={{
              solvedCount: 12,
              totalProblems: 20,
              streak: 7,
              lastSolvedDate: new Date().toISOString().split('T')[0],
            }}
            theme="light"
          >
            <Story />
          </CombinedProviders>
        </div>
      );
    },
  ],
};

/**
 * With active streak showing (Dark Mode).
 * Demonstrates the streak counter with a 7-day streak in dark mode.
 */
export const WithStreakDark: Story = {
  name: 'With Streak (Dark)',
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.documentElement.classList.add('dark');
        return () => document.documentElement.classList.remove('dark');
      }, []);
      return (
        <div className="dark bg-gray-950 min-h-screen">
          <CombinedProviders
            progressValue={{
              solvedCount: 12,
              totalProblems: 20,
              streak: 7,
              lastSolvedDate: new Date().toISOString().split('T')[0],
            }}
            theme="dark"
          >
            <Story />
          </CombinedProviders>
        </div>
      );
    },
  ],
};

/**
 * Mobile viewport version (Light Mode).
 * Tests the responsive design on small screens (320px width).
 */
export const Mobile: Story = {
  name: 'Mobile (Light)',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    chromatic: { viewports: [320] },
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
    backgrounds: { default: 'light' },
  },
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.documentElement.classList.remove('dark');
        return () => {};
      }, []);
      return (
        <div className="bg-white min-h-screen">
          <CombinedProviders
            progressValue={{
              solvedCount: 8,
              totalProblems: 20,
              streak: 3,
            }}
            theme="light"
          >
            <Story />
          </CombinedProviders>
        </div>
      );
    },
  ],
};

/**
 * Mobile viewport version (Dark Mode).
 * Tests the responsive design on small screens (320px width) in dark mode.
 */
export const MobileDark: Story = {
  name: 'Mobile (Dark)',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    chromatic: { viewports: [320] },
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.documentElement.classList.add('dark');
        return () => document.documentElement.classList.remove('dark');
      }, []);
      return (
        <div className="dark bg-gray-950 min-h-screen">
          <CombinedProviders
            progressValue={{
              solvedCount: 8,
              totalProblems: 20,
              streak: 3,
            }}
            theme="dark"
          >
            <Story />
          </CombinedProviders>
        </div>
      );
    },
  ],
};

// ============================================================================
// ADDITIONAL STORIES
// ============================================================================

/**
 * All problems completed state.
 * Shows the navbar when a user has solved all available problems (20/20).
 */
export const AllProblemsSolved: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
  decorators: [
    (Story) => (
      <CombinedProviders
        progressValue={{
          solvedCount: 20,
          totalProblems: 20,
          streak: 7,
        }}
      >
        <Story />
      </CombinedProviders>
    ),
  ],
};

/**
 * High streak milestone.
 * Shows a longer streak (30 days) for milestone visual testing.
 */
export const HighStreak: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
  decorators: [
    (Story) => (
      <CombinedProviders
        progressValue={{
          solvedCount: 15,
          totalProblems: 20,
          streak: 30,
          lastSolvedDate: new Date().toISOString().split('T')[0],
        }}
      >
        <Story />
      </CombinedProviders>
    ),
  ],
};

/**
 * Tablet viewport version.
 * Tests the responsive design on tablet screens (768px width).
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    chromatic: { viewports: [768] },
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
  decorators: [
    (Story) => (
      <CombinedProviders
        progressValue={{
          solvedCount: 8,
          totalProblems: 20,
          streak: 3,
        }}
      >
        <Story />
      </CombinedProviders>
    ),
  ],
};

/**
 * Active navigation state on Home page.
 * Shows the "Home" link as active/highlighted.
 */
export const ActiveHome: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
  decorators: [
    (Story) => (
      <CombinedProviders
        progressValue={{
          solvedCount: 5,
          totalProblems: 20,
          streak: 2,
        }}
      >
        <Story />
      </CombinedProviders>
    ),
  ],
};

/**
 * Active navigation state on Problems page.
 * Shows the "Problems" link as active/highlighted.
 */
export const ActiveProblems: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/problems',
      },
    },
  },
  decorators: [
    (Story) => (
      <CombinedProviders
        progressValue={{
          solvedCount: 5,
          totalProblems: 20,
          streak: 2,
        }}
      >
        <Story />
      </CombinedProviders>
    ),
  ],
};

/**
 * Active navigation state on a specific problem page.
 * Shows the "Problems" link as active when viewing a problem detail page.
 */
export const ActiveProblemDetail: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/problems/optional-chaining',
      },
    },
  },
  decorators: [
    (Story) => (
      <CombinedProviders
        progressValue={{
          solvedCount: 5,
          totalProblems: 20,
          streak: 2,
        }}
      >
        <Story />
      </CombinedProviders>
    ),
  ],
};

/**
 * Dark theme with active Problems navigation.
 * Combines dark theme with active state on Problems page.
 */
export const DarkThemeActiveProblems: Story = {
  name: 'Active Problems (Dark)',
  parameters: {
    backgrounds: { default: 'dark' },
    nextjs: {
      navigation: {
        pathname: '/problems',
      },
    },
  },
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.documentElement.classList.add('dark');
        return () => document.documentElement.classList.remove('dark');
      }, []);
      return (
        <div className="dark bg-gray-950 min-h-screen">
          <CombinedProviders
            progressValue={{
              solvedCount: 15,
              totalProblems: 20,
              streak: 14,
            }}
            theme="dark"
          >
            <Story />
          </CombinedProviders>
        </div>
      );
    },
  ],
};

/**
 * Large screen desktop view.
 * Tests the navbar on large screens (1440px width).
 */
export const LargeDesktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'large',
    },
    chromatic: { viewports: [1440] },
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
  decorators: [
    (Story) => (
      <CombinedProviders
        progressValue={{
          solvedCount: 18,
          totalProblems: 20,
          streak: 21,
        }}
      >
        <Story />
      </CombinedProviders>
    ),
  ],
};
