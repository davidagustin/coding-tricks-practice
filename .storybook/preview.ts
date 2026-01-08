import type { Preview } from '@storybook/nextjs-vite';
import React from 'react';
import '../app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f9fafb' },
        { name: 'dark', value: '#030712' },
      ],
    },
    chromatic: {
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      React.useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }, [theme]);

      return React.createElement('div', {
        className: theme === 'dark' ? 'dark bg-gray-950 min-h-screen p-4' : 'bg-gray-50 min-h-screen p-4',
      }, React.createElement(Story));
    },
  ],
};

export default preview;
