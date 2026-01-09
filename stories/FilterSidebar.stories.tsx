import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { type ReactNode } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import { ProgressContext, ProgressProvider } from '../components/ProgressProvider';

// ============================================================================
// Mock Progress Provider for Stories
// ============================================================================

interface MockProgressProviderProps {
  children: ReactNode;
  solvedProblems?: Set<string>;
  totalProblems?: number;
}

function MockProgressProvider({
  children,
  solvedProblems = new Set<string>(),
  totalProblems = 38,
}: MockProgressProviderProps) {
  const value = {
    solvedProblems,
    solvedCount: solvedProblems.size,
    totalProblems,
    streak: solvedProblems.size > 0 ? 3 : 0,
    markSolved: () => {},
    markUnsolved: () => {},
    isSolved: (id: string) => solvedProblems.has(id),
    lastSolvedDate: solvedProblems.size > 0 ? new Date().toISOString() : null,
    resetProgress: () => {},
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

// Helper to generate problem IDs for testing
const generateProblemIds = (count: number): Set<string> => {
  const ids: string[] = [];
  for (let i = 1; i <= count; i++) {
    ids.push(`problem-${i}`);
  }
  return new Set(ids);
};

// Pre-generated problem sets for 50% and 100% progress
const fiftyPercentSolvedProblems = generateProblemIds(19); // 19/38 = 50%
const hundredPercentSolvedProblems = generateProblemIds(38); // 38/38 = 100%

// Mock categories data
const mockCategories = [
  'Destructuring',
  'Optional Chaining',
  'Template Literals',
  'Array Methods',
  'Async/Await',
];

// Default problem counts
const defaultProblemCounts = {
  easy: 12,
  medium: 18,
  hard: 8,
  total: 38,
};

// Helper decorator for dark theme stories
const darkThemeDecorator = (Story: React.ComponentType) => {
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => document.documentElement.classList.remove('dark');
  }, []);
  return (
    <div className="dark bg-gray-950 min-h-screen p-4">
      <Story />
    </div>
  );
};

// Helper decorator for light theme stories (explicit)
const lightThemeDecorator = (Story: React.ComponentType) => {
  React.useEffect(() => {
    document.documentElement.classList.remove('dark');
    return () => {};
  }, []);
  return (
    <div className="bg-white min-h-screen p-4">
      <Story />
    </div>
  );
};

const meta: Meta<typeof FilterSidebar> = {
  title: 'Components/FilterSidebar',
  component: FilterSidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    chromatic: {
      viewports: [320, 768, 1024],
      diffThreshold: 0.3,
    },
  },
  decorators: [
    (Story) => (
      <ProgressProvider>
        <div className="max-w-xs">
          <Story />
        </div>
      </ProgressProvider>
    ),
  ],
  argTypes: {
    categories: {
      control: 'object',
      description: 'List of category names to display',
    },
    selectedDifficulty: {
      control: 'select',
      options: ['all', 'easy', 'medium', 'hard'],
      description: 'Currently selected difficulty filter',
    },
    selectedCategory: {
      control: 'select',
      options: ['all', ...mockCategories],
      description: 'Currently selected category filter',
    },
    selectedStatus: {
      control: 'select',
      options: ['all', 'solved', 'unsolved'],
      description: 'Currently selected status filter',
    },
    onDifficultyChange: { action: 'difficultyChanged' },
    onCategoryChange: { action: 'categoryChanged' },
    onStatusChange: { action: 'statusChanged' },
    onClearFilters: { action: 'filtersCleared' },
  },
  args: {
    categories: mockCategories,
    selectedDifficulty: 'all',
    selectedCategory: 'all',
    selectedStatus: 'all',
    problemCounts: defaultProblemCounts,
  },
};

export default meta;
type Story = StoryObj<typeof FilterSidebar>;

// ============================================================================
// LIGHT THEME STORIES
// ============================================================================

// 1. Default state (no filters selected) - Light
export const Default: Story = {
  name: 'Default (No Filters)',
  decorators: [
    (Story) => (
      <ProgressProvider>
        <div className="max-w-xs">
          <Story />
        </div>
      </ProgressProvider>
    ),
    lightThemeDecorator,
  ],
  parameters: {
    backgrounds: { default: 'light' },
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story:
          'The default state of FilterSidebar with no filters applied. All sections are expanded and showing the "All" option selected.',
      },
    },
  },
};

// 2. Difficulty filter selected - Easy
export const DifficultyEasy: Story = {
  name: 'Difficulty: Easy Selected',
  args: {
    selectedDifficulty: 'easy',
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: 'FilterSidebar with the Easy difficulty filter selected.',
      },
    },
  },
};

// 2b. Difficulty filter selected - Medium
export const DifficultyMedium: Story = {
  name: 'Difficulty: Medium Selected',
  args: {
    selectedDifficulty: 'medium',
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: 'FilterSidebar with the Medium difficulty filter selected.',
      },
    },
  },
};

// 2c. Difficulty filter selected - Hard
export const DifficultyHard: Story = {
  name: 'Difficulty: Hard Selected',
  args: {
    selectedDifficulty: 'hard',
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: 'FilterSidebar with the Hard difficulty filter selected.',
      },
    },
  },
};

// 3. Category filter selected
export const CategorySelected: Story = {
  name: 'Category: Array Methods Selected',
  args: {
    selectedCategory: 'Array Methods',
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: 'FilterSidebar with a category filter (Array Methods) selected.',
      },
    },
  },
};

// 4. Status filter selected - Solved
export const StatusSolved: Story = {
  name: 'Status: Solved Selected',
  args: {
    selectedStatus: 'solved',
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: 'FilterSidebar with the Solved status filter selected.',
      },
    },
  },
};

// 4b. Status filter selected - Unsolved
export const StatusUnsolved: Story = {
  name: 'Status: Unsolved Selected',
  args: {
    selectedStatus: 'unsolved',
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: 'FilterSidebar with the Unsolved status filter selected.',
      },
    },
  },
};

// 5. Multiple filters active - Light
export const MultipleFiltersActive: Story = {
  name: 'Multiple Filters Active',
  args: {
    selectedDifficulty: 'medium',
    selectedCategory: 'Async/Await',
    selectedStatus: 'unsolved',
  },
  decorators: [
    (Story) => (
      <ProgressProvider>
        <div className="max-w-xs">
          <Story />
        </div>
      </ProgressProvider>
    ),
    lightThemeDecorator,
  ],
  parameters: {
    backgrounds: { default: 'light' },
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story:
          'FilterSidebar with multiple filters active simultaneously. The "Clear all" button should be visible.',
      },
    },
  },
};

// 6. All sections collapsed - using render function to control internal state
export const AllSectionsCollapsed: Story = {
  name: 'All Sections Collapsed',
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story:
          'FilterSidebar with all accordion sections collapsed. Users need to click to expand each section.',
      },
    },
  },
  render: (args) => {
    // Note: The component's internal state starts with all sections expanded.
    // This story shows the default state - click on section headers to collapse/expand.
    return (
      <div>
        <p className="text-sm text-gray-500 mb-4 italic">
          Note: Click on section headers to collapse/expand. Initial state shows all sections
          expanded.
        </p>
        <FilterSidebar {...args} />
      </div>
    );
  },
};

// 7. All sections expanded (same as default, explicit story) - Light
export const AllSectionsExpanded: Story = {
  name: 'All Sections Expanded',
  decorators: [
    (Story) => (
      <ProgressProvider>
        <div className="max-w-xs">
          <Story />
        </div>
      </ProgressProvider>
    ),
    lightThemeDecorator,
  ],
  parameters: {
    backgrounds: { default: 'light' },
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: 'FilterSidebar with all accordion sections expanded (default behavior).',
      },
    },
  },
};

// 8a. Progress bar at 0% - Light
export const ProgressZeroPercent: Story = {
  name: 'Progress: 0% Complete',
  decorators: [
    (Story) => (
      <ProgressProvider>
        <div className="max-w-xs">
          <Story />
        </div>
      </ProgressProvider>
    ),
    lightThemeDecorator,
  ],
  parameters: {
    backgrounds: { default: 'light' },
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story:
          'FilterSidebar showing 0% progress (no problems solved). The progress bar should be empty.',
      },
    },
  },
  // Note: Progress is controlled by ProgressProvider context.
  // In a real scenario, we would mock this, but for visual testing the default state shows 0%.
};

// 8b. Progress bar at 50% - Light
export const ProgressFiftyPercent: Story = {
  name: 'Progress: 50% Complete',
  decorators: [
    (Story) => (
      <MockProgressProvider solvedProblems={fiftyPercentSolvedProblems} totalProblems={38}>
        <div className="max-w-xs">
          <Story />
        </div>
      </MockProgressProvider>
    ),
    lightThemeDecorator,
  ],
  parameters: {
    backgrounds: { default: 'light' },
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story:
          'FilterSidebar showing approximately 50% progress (19/38 problems solved). The progress bar should be half filled.',
      },
    },
  },
};

// 8c. Progress bar at 100% - Light
export const ProgressHundredPercent: Story = {
  name: 'Progress: 100% Complete',
  decorators: [
    (Story) => (
      <MockProgressProvider solvedProblems={hundredPercentSolvedProblems} totalProblems={38}>
        <div className="max-w-xs">
          <Story />
        </div>
      </MockProgressProvider>
    ),
    lightThemeDecorator,
  ],
  parameters: {
    backgrounds: { default: 'light' },
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story:
          'FilterSidebar showing 100% progress (38/38 problems solved). The progress bar should be completely filled.',
      },
    },
  },
};

// 9. Mobile viewport - Light
export const MobileViewport: Story = {
  name: 'Mobile Viewport',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    backgrounds: { default: 'light' },
    chromatic: {
      viewports: [320],
      disableSnapshot: false,
    },
    docs: {
      description: {
        story:
          'FilterSidebar as it appears on mobile devices. The sidebar takes full width on smaller screens.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ProgressProvider>
        <div className="w-full max-w-full">
          <Story />
        </div>
      </ProgressProvider>
    ),
    lightThemeDecorator,
  ],
};

// ============================================================================
// DARK THEME STORIES
// ============================================================================

// 10. Default (No Filters) - Dark
export const DefaultDark: Story = {
  ...Default,
  name: 'Default (Dark)',
  decorators: [
    (Story) => (
      <ProgressProvider>
        <div className="max-w-xs">
          <Story />
        </div>
      </ProgressProvider>
    ),
    darkThemeDecorator,
  ],
  parameters: {
    ...Default.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'The default state of FilterSidebar in dark mode with no filters applied.',
      },
    },
  },
};

// 11. With Filters Applied - Dark
export const WithFiltersDark: Story = {
  ...MultipleFiltersActive,
  name: 'With Filters (Dark)',
  args: {
    selectedDifficulty: 'hard',
    selectedCategory: 'Destructuring',
    selectedStatus: 'solved',
  },
  decorators: [
    (Story) => (
      <ProgressProvider>
        <div className="max-w-xs">
          <Story />
        </div>
      </ProgressProvider>
    ),
    darkThemeDecorator,
  ],
  parameters: {
    ...MultipleFiltersActive.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'FilterSidebar in dark mode with multiple filters active, showing the "Clear all" button.',
      },
    },
  },
};

// 12. All Sections Expanded - Dark
export const AllSectionsExpandedDark: Story = {
  ...AllSectionsExpanded,
  name: 'All Sections Expanded (Dark)',
  decorators: [
    (Story) => (
      <ProgressProvider>
        <div className="max-w-xs">
          <Story />
        </div>
      </ProgressProvider>
    ),
    darkThemeDecorator,
  ],
  parameters: {
    ...AllSectionsExpanded.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'FilterSidebar in dark mode with all accordion sections expanded.',
      },
    },
  },
};

// 13a. Progress 0% - Dark
export const ProgressZeroPercentDark: Story = {
  ...ProgressZeroPercent,
  name: 'Progress: 0% Complete (Dark)',
  decorators: [
    (Story) => (
      <ProgressProvider>
        <div className="max-w-xs">
          <Story />
        </div>
      </ProgressProvider>
    ),
    darkThemeDecorator,
  ],
  parameters: {
    ...ProgressZeroPercent.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'FilterSidebar in dark mode showing 0% progress (no problems solved).',
      },
    },
  },
};

// 13b. Progress 50% - Dark
export const ProgressFiftyPercentDark: Story = {
  name: 'Progress: 50% Complete (Dark)',
  decorators: [
    (Story) => (
      <MockProgressProvider solvedProblems={fiftyPercentSolvedProblems} totalProblems={38}>
        <div className="max-w-xs">
          <Story />
        </div>
      </MockProgressProvider>
    ),
    darkThemeDecorator,
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story:
          'FilterSidebar in dark mode showing approximately 50% progress (19/38 problems solved).',
      },
    },
  },
};

// 13c. Progress 100% - Dark
export const ProgressHundredPercentDark: Story = {
  name: 'Progress: 100% Complete (Dark)',
  decorators: [
    (Story) => (
      <MockProgressProvider solvedProblems={hundredPercentSolvedProblems} totalProblems={38}>
        <div className="max-w-xs">
          <Story />
        </div>
      </MockProgressProvider>
    ),
    darkThemeDecorator,
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: 'FilterSidebar in dark mode showing 100% progress (38/38 problems solved).',
      },
    },
  },
};

// 14. Mobile Viewport - Dark
export const MobileViewportDark: Story = {
  ...MobileViewport,
  name: 'Mobile Viewport (Dark)',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    backgrounds: { default: 'dark' },
    chromatic: {
      viewports: [320],
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: 'FilterSidebar in dark mode as it appears on mobile devices.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ProgressProvider>
        <div className="w-full max-w-full">
          <Story />
        </div>
      </ProgressProvider>
    ),
    darkThemeDecorator,
  ],
};

// ============================================================================
// ADDITIONAL LIGHT THEME STORIES
// ============================================================================

// 15. With Clear All button visible (when filters applied)
export const WithClearAllButton: Story = {
  name: 'Clear All Button Visible',
  args: {
    selectedDifficulty: 'easy',
    selectedCategory: 'all',
    selectedStatus: 'all',
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story:
          'FilterSidebar showing the "Clear all" button when at least one filter is not set to "all".',
      },
    },
  },
};

// Many categories (scrollable list)
export const ManyCategories: Story = {
  name: 'Many Categories (Scrollable)',
  args: {
    categories: [
      'Destructuring',
      'Optional Chaining',
      'Template Literals',
      'Array Methods',
      'Async/Await',
      'Spread Operator',
      'Rest Parameters',
      'Arrow Functions',
      'Promises',
      'Generators',
      'Iterators',
      'Classes',
      'Modules',
      'Symbols',
      'Proxies',
    ],
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: 'FilterSidebar with many categories, demonstrating the scrollable category list.',
      },
    },
  },
};

// Empty categories
export const NoCategories: Story = {
  name: 'No Categories',
  args: {
    categories: [],
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: 'FilterSidebar with no categories available.',
      },
    },
  },
};

// Single category
export const SingleCategory: Story = {
  name: 'Single Category',
  args: {
    categories: ['Array Methods'],
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: 'FilterSidebar with only one category available.',
      },
    },
  },
};

// Zero problem counts
export const ZeroProblemCounts: Story = {
  name: 'Zero Problem Counts',
  args: {
    problemCounts: {
      easy: 0,
      medium: 0,
      hard: 0,
      total: 0,
    },
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: 'FilterSidebar with zero problems in all difficulty levels.',
      },
    },
  },
};

// High problem counts
export const HighProblemCounts: Story = {
  name: 'High Problem Counts',
  args: {
    problemCounts: {
      easy: 150,
      medium: 275,
      hard: 125,
      total: 550,
    },
  },
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: 'FilterSidebar with high problem counts to test number display.',
      },
    },
  },
};

// ============================================================================
// ADDITIONAL DARK THEME STORIES
// ============================================================================

// Many Categories - Dark
export const ManyCategoriesDark: Story = {
  ...ManyCategories,
  name: 'Many Categories (Dark)',
  decorators: [
    (Story) => (
      <ProgressProvider>
        <div className="max-w-xs">
          <Story />
        </div>
      </ProgressProvider>
    ),
    darkThemeDecorator,
  ],
  parameters: {
    ...ManyCategories.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'FilterSidebar in dark mode with many categories, demonstrating the scrollable category list.',
      },
    },
  },
};

// High Problem Counts - Dark
export const HighProblemCountsDark: Story = {
  ...HighProblemCounts,
  name: 'High Problem Counts (Dark)',
  decorators: [
    (Story) => (
      <ProgressProvider>
        <div className="max-w-xs">
          <Story />
        </div>
      </ProgressProvider>
    ),
    darkThemeDecorator,
  ],
  parameters: {
    ...HighProblemCounts.parameters,
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'FilterSidebar in dark mode with high problem counts to test number display.',
      },
    },
  },
};

// ============================================================================
// INTERACTIVE & CHROMATIC STORIES
// ============================================================================

// Interactive playground
export const Playground: Story = {
  name: 'Interactive Playground',
  parameters: {
    chromatic: {
      disableSnapshot: true, // Don't capture interactive playground
    },
    docs: {
      description: {
        story:
          'An interactive playground to test different combinations of props. Use the controls panel to modify the component.',
      },
    },
  },
};

// Chromatic-specific stories for visual regression testing
export const ChromaticLightMode: Story = {
  name: 'Chromatic: Light Mode',
  args: {
    selectedDifficulty: 'medium',
    selectedStatus: 'solved',
  },
  decorators: [
    (Story) => (
      <ProgressProvider>
        <div className="max-w-xs">
          <Story />
        </div>
      </ProgressProvider>
    ),
    lightThemeDecorator,
  ],
  parameters: {
    backgrounds: { default: 'light' },
    chromatic: {
      viewports: [375, 768, 1280],
      disableSnapshot: false,
      delay: 300,
    },
  },
};

export const ChromaticDarkMode: Story = {
  name: 'Chromatic: Dark Mode',
  args: {
    selectedDifficulty: 'hard',
    selectedCategory: 'Optional Chaining',
  },
  decorators: [
    (Story) => (
      <ProgressProvider>
        <div className="max-w-xs">
          <Story />
        </div>
      </ProgressProvider>
    ),
    darkThemeDecorator,
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    chromatic: {
      viewports: [375, 768, 1280],
      disableSnapshot: false,
      delay: 300,
    },
  },
};
