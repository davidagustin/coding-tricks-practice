import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Navbar from '../components/Navbar';
import { ProgressContext } from '../components/ProgressProvider';
import { ThemeContext } from '../components/ThemeProvider';
import React from 'react';

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

/**
 * Default state with no problems solved.
 * Shows the initial state of the navbar when a user first visits.
 */
export const Default: Story = {
  parameters: {
    nextjs: {
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
};

/**
 * Progress state showing some problems solved.
 * Demonstrates the solved count display with partial progress (5/20).
 */
export const WithProgress: Story = {
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
          streak: 0,
          solvedProblems: new Set(['problem-1', 'problem-2', 'problem-3', 'problem-4', 'problem-5']),
        }}
      >
        <Story />
      </CombinedProviders>
    ),
  ],
};

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
 * With active streak showing.
 * Demonstrates the streak counter with a 7-day streak.
 */
export const WithStreak: Story = {
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
          solvedCount: 12,
          totalProblems: 20,
          streak: 7,
          lastSolvedDate: new Date().toISOString().split('T')[0],
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
 * Mobile viewport version.
 * Tests the responsive design on small screens (320px width).
 * Note: The logo text is hidden on mobile, progress stats are also hidden.
 */
export const Mobile: Story = {
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
 * Dark theme variant.
 * Tests the navbar appearance in dark mode.
 */
export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
  globals: {
    theme: 'dark',
  },
  decorators: [
    (Story) => (
      <CombinedProviders
        progressValue={{
          solvedCount: 10,
          totalProblems: 20,
          streak: 5,
        }}
        theme="dark"
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
  parameters: {
    backgrounds: { default: 'dark' },
    nextjs: {
      navigation: {
        pathname: '/problems',
      },
    },
  },
  globals: {
    theme: 'dark',
  },
  decorators: [
    (Story) => (
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
    ),
  ],
};

/**
 * Mobile with dark theme.
 * Tests mobile layout in dark mode.
 */
export const MobileDark: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    backgrounds: { default: 'dark' },
    chromatic: { viewports: [320] },
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
  globals: {
    theme: 'dark',
  },
  decorators: [
    (Story) => (
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
    ),
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
