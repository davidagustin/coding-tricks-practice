'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { problems } from '@/lib/problems';

interface ProgressContextType {
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

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'js-ts-tricks-progress';
const STREAK_KEY = 'js-ts-tricks-streak';
const LAST_SOLVED_KEY = 'js-ts-tricks-last-solved';

interface StoredProgress {
  solvedProblems: string[];
  streak: number;
  lastSolvedDate: string | null;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());
  const [streak, setStreak] = useState(0);
  const [lastSolvedDate, setLastSolvedDate] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: StoredProgress = JSON.parse(stored);
        setSolvedProblems(new Set(data.solvedProblems));
        setStreak(data.streak || 0);
        setLastSolvedDate(data.lastSolvedDate || null);

        // Check if streak should reset (more than 1 day since last solved)
        if (data.lastSolvedDate) {
          const lastDate = new Date(data.lastSolvedDate);
          const today = new Date();
          const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
          if (diffDays > 1) {
            setStreak(0);
          }
        }
      }
    } catch (e) {
      console.error('Failed to load progress:', e);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((solved: Set<string>, newStreak: number, lastDate: string | null) => {
    try {
      const data: StoredProgress = {
        solvedProblems: Array.from(solved),
        streak: newStreak,
        lastSolvedDate: lastDate,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  }, []);

  const markSolved = useCallback((problemId: string) => {
    setSolvedProblems((prev) => {
      const newSet = new Set(prev);
      if (!newSet.has(problemId)) {
        newSet.add(problemId);

        // Update streak
        const today = new Date().toISOString().split('T')[0];
        let newStreak = streak;

        if (lastSolvedDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          if (lastSolvedDate === yesterdayStr || lastSolvedDate === null) {
            newStreak = streak + 1;
          } else {
            newStreak = 1;
          }

          setStreak(newStreak);
          setLastSolvedDate(today);
        }

        saveProgress(newSet, newStreak, today);
      }
      return newSet;
    });
  }, [streak, lastSolvedDate, saveProgress]);

  const markUnsolved = useCallback((problemId: string) => {
    setSolvedProblems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(problemId);
      saveProgress(newSet, streak, lastSolvedDate);
      return newSet;
    });
  }, [streak, lastSolvedDate, saveProgress]);

  const isSolved = useCallback((problemId: string) => {
    return solvedProblems.has(problemId);
  }, [solvedProblems]);

  const resetProgress = useCallback(() => {
    setSolvedProblems(new Set());
    setStreak(0);
    setLastSolvedDate(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to reset progress:', e);
    }
  }, []);

  // Return default values during SSR
  if (!mounted) {
    return (
      <ProgressContext.Provider
        value={{
          solvedProblems: new Set(),
          solvedCount: 0,
          totalProblems: problems.length,
          streak: 0,
          markSolved: () => {},
          markUnsolved: () => {},
          isSolved: () => false,
          lastSolvedDate: null,
          resetProgress: () => {},
        }}
      >
        {children}
      </ProgressContext.Provider>
    );
  }

  return (
    <ProgressContext.Provider
      value={{
        solvedProblems,
        solvedCount: solvedProblems.size,
        totalProblems: problems.length,
        streak,
        markSolved,
        markUnsolved,
        isSolved,
        lastSolvedDate,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
