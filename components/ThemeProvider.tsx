'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to get initial theme (works on both client and server)
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark'; // Default for SSR
  }
  
  // Check localStorage first (inline script should have set this)
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored && (stored === 'light' || stored === 'dark')) {
    return stored;
  }
  
  // Fall back to what the inline script set (check DOM class)
  const hasDarkClass = document.documentElement.classList.contains('dark');
  if (hasDarkClass) {
    return 'dark';
  }
  
  // Final fallback to system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Sync with the theme that was set by the inline script
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setThemeState(currentTheme);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Always provide context, even during SSR
  const contextValue = mounted 
    ? { theme, toggleTheme, setTheme }
    : { theme, toggleTheme: () => {}, setTheme: () => {} };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
