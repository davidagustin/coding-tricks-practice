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
    // On mount, ensure DOM and state are in sync
    // The inline script should have already set the DOM class
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      const domHasDark = document.documentElement.classList.contains('dark');
      const domTheme = domHasDark ? 'dark' : 'light';
      
      // Use stored theme if available, otherwise use what's in the DOM
      const actualTheme = storedTheme || domTheme;
      
      // Update state to match what's actually in the DOM/localStorage
      // This ensures consistency after the inline script runs
      setThemeState((currentTheme) => {
        // Only update if there's a mismatch
        return actualTheme !== currentTheme ? actualTheme : currentTheme;
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !mounted) return;
    
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Always provide working functions, even during SSR
  // The theme state will sync properly once mounted
  const contextValue = { theme, toggleTheme, setTheme };

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
