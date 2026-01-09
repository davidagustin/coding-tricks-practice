import { act, render, screen, waitFor } from '@testing-library/react';
import { useContext, useRef } from 'react';
import { ProgressContext, ProgressProvider, useProgress } from '@/components/ProgressProvider';

// Mock the problems module
jest.mock('@/lib/problems', () => ({
  problems: [
    { id: 'problem-1', title: 'Problem 1' },
    { id: 'problem-2', title: 'Problem 2' },
    { id: 'problem-3', title: 'Problem 3' },
    { id: 'problem-4', title: 'Problem 4' },
    { id: 'problem-5', title: 'Problem 5' },
  ],
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: () => {
      store = {};
    },
    _getStore: () => store,
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Test component that exposes progress context
function TestComponent() {
  const {
    solvedProblems,
    solvedCount,
    totalProblems,
    streak,
    markSolved,
    markUnsolved,
    isSolved,
    lastSolvedDate,
    resetProgress,
  } = useProgress();

  return (
    <div>
      <div data-testid="solved-count">{solvedCount}</div>
      <div data-testid="total-problems">{totalProblems}</div>
      <div data-testid="streak">{streak}</div>
      <div data-testid="last-solved-date">{lastSolvedDate || 'null'}</div>
      <div data-testid="solved-problems">{Array.from(solvedProblems).join(',')}</div>
      <div data-testid="is-solved-1">{isSolved('problem-1') ? 'true' : 'false'}</div>
      <div data-testid="is-solved-2">{isSolved('problem-2') ? 'true' : 'false'}</div>
      <button onClick={() => markSolved('problem-1')} data-testid="mark-solved-1">
        Mark Solved 1
      </button>
      <button onClick={() => markSolved('problem-2')} data-testid="mark-solved-2">
        Mark Solved 2
      </button>
      <button onClick={() => markSolved('problem-3')} data-testid="mark-solved-3">
        Mark Solved 3
      </button>
      <button onClick={() => markUnsolved('problem-1')} data-testid="mark-unsolved-1">
        Mark Unsolved 1
      </button>
      <button onClick={() => markUnsolved('problem-2')} data-testid="mark-unsolved-2">
        Mark Unsolved 2
      </button>
      <button onClick={resetProgress} data-testid="reset">
        Reset
      </button>
    </div>
  );
}

// Component that directly accesses context for SSR testing
function ContextAccessorComponent() {
  const context = useContext(ProgressContext);

  if (!context) {
    return <div data-testid="context-undefined">undefined</div>;
  }

  return (
    <div>
      <div data-testid="context-solved-count">{context.solvedCount}</div>
      <div data-testid="context-streak">{context.streak}</div>
      <div data-testid="context-total">{context.totalProblems}</div>
    </div>
  );
}

describe('ProgressProvider', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
    // Reset Date mock if any
    jest.useRealTimers();
  });

  describe('Initial State (SSR vs Client)', () => {
    it('should provide default empty values before mounting (SSR state)', async () => {
      // The component should initially render with SSR values (empty state)
      // and then update after mounting
      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      // After mounting, should still show default values if no localStorage data
      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('0');
        expect(screen.getByTestId('streak')).toHaveTextContent('0');
        expect(screen.getByTestId('last-solved-date')).toHaveTextContent('null');
      });
    });

    it('should show totalProblems based on problems array length', async () => {
      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('total-problems')).toHaveTextContent('5');
      });
    });

    it('should load saved progress from localStorage after mounting', async () => {
      const today = new Date().toISOString().split('T')[0];
      const savedProgress = {
        solvedProblems: ['problem-1', 'problem-2'],
        streak: 3,
        lastSolvedDate: today,
      };
      localStorageMock.setItem('js-ts-tricks-progress', JSON.stringify(savedProgress));

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('2');
        expect(screen.getByTestId('streak')).toHaveTextContent('3');
        expect(screen.getByTestId('solved-problems')).toHaveTextContent('problem-1,problem-2');
      });
    });
  });

  describe('markSolved function', () => {
    it('should mark a problem as solved', async () => {
      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-solved-1')).toHaveTextContent('false');
      });

      await act(async () => {
        screen.getByTestId('mark-solved-1').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('is-solved-1')).toHaveTextContent('true');
        expect(screen.getByTestId('solved-count')).toHaveTextContent('1');
      });
    });

    it('should not duplicate when marking the same problem twice', async () => {
      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await act(async () => {
        screen.getByTestId('mark-solved-1').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('1');
      });

      await act(async () => {
        screen.getByTestId('mark-solved-1').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('1');
      });
    });

    it('should mark multiple different problems as solved', async () => {
      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await act(async () => {
        screen.getByTestId('mark-solved-1').click();
      });

      await act(async () => {
        screen.getByTestId('mark-solved-2').click();
      });

      await act(async () => {
        screen.getByTestId('mark-solved-3').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('3');
        expect(screen.getByTestId('is-solved-1')).toHaveTextContent('true');
        expect(screen.getByTestId('is-solved-2')).toHaveTextContent('true');
      });
    });

    it('should update lastSolvedDate when marking solved', async () => {
      const today = new Date().toISOString().split('T')[0];

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await act(async () => {
        screen.getByTestId('mark-solved-1').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('last-solved-date')).toHaveTextContent(today);
      });
    });

    it('should save to localStorage when marking solved', async () => {
      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await act(async () => {
        screen.getByTestId('mark-solved-1').click();
      });

      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'js-ts-tricks-progress',
          expect.any(String)
        );
        const storedData = JSON.parse(localStorageMock._getStore()['js-ts-tricks-progress']);
        expect(storedData.solvedProblems).toContain('problem-1');
      });
    });
  });

  describe('markUnsolved function', () => {
    it('should mark a solved problem as unsolved', async () => {
      const savedProgress = {
        solvedProblems: ['problem-1', 'problem-2'],
        streak: 1,
        lastSolvedDate: new Date().toISOString().split('T')[0],
      };
      localStorageMock.setItem('js-ts-tricks-progress', JSON.stringify(savedProgress));

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-solved-1')).toHaveTextContent('true');
      });

      await act(async () => {
        screen.getByTestId('mark-unsolved-1').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('is-solved-1')).toHaveTextContent('false');
        expect(screen.getByTestId('solved-count')).toHaveTextContent('1');
      });
    });

    it('should handle marking unsolved when problem was never solved', async () => {
      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('0');
      });

      await act(async () => {
        screen.getByTestId('mark-unsolved-1').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('0');
      });
    });

    it('should save to localStorage when marking unsolved', async () => {
      const savedProgress = {
        solvedProblems: ['problem-1'],
        streak: 1,
        lastSolvedDate: new Date().toISOString().split('T')[0],
      };
      localStorageMock.setItem('js-ts-tricks-progress', JSON.stringify(savedProgress));

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-solved-1')).toHaveTextContent('true');
      });

      jest.clearAllMocks();

      await act(async () => {
        screen.getByTestId('mark-unsolved-1').click();
      });

      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalled();
        const storedData = JSON.parse(localStorageMock._getStore()['js-ts-tricks-progress']);
        expect(storedData.solvedProblems).not.toContain('problem-1');
      });
    });
  });

  describe('isSolved function', () => {
    it('should return false for unsolved problems', async () => {
      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-solved-1')).toHaveTextContent('false');
        expect(screen.getByTestId('is-solved-2')).toHaveTextContent('false');
      });
    });

    it('should return true for solved problems', async () => {
      const savedProgress = {
        solvedProblems: ['problem-1'],
        streak: 1,
        lastSolvedDate: new Date().toISOString().split('T')[0],
      };
      localStorageMock.setItem('js-ts-tricks-progress', JSON.stringify(savedProgress));

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-solved-1')).toHaveTextContent('true');
        expect(screen.getByTestId('is-solved-2')).toHaveTextContent('false');
      });
    });

    it('should update correctly when problem status changes', async () => {
      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-solved-1')).toHaveTextContent('false');
      });

      await act(async () => {
        screen.getByTestId('mark-solved-1').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('is-solved-1')).toHaveTextContent('true');
      });

      await act(async () => {
        screen.getByTestId('mark-unsolved-1').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('is-solved-1')).toHaveTextContent('false');
      });
    });
  });

  describe('resetProgress function', () => {
    it('should reset all solved problems', async () => {
      const savedProgress = {
        solvedProblems: ['problem-1', 'problem-2', 'problem-3'],
        streak: 5,
        lastSolvedDate: new Date().toISOString().split('T')[0],
      };
      localStorageMock.setItem('js-ts-tricks-progress', JSON.stringify(savedProgress));

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('3');
        expect(screen.getByTestId('streak')).toHaveTextContent('5');
      });

      await act(async () => {
        screen.getByTestId('reset').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('0');
        expect(screen.getByTestId('streak')).toHaveTextContent('0');
        expect(screen.getByTestId('last-solved-date')).toHaveTextContent('null');
        expect(screen.getByTestId('is-solved-1')).toHaveTextContent('false');
        expect(screen.getByTestId('is-solved-2')).toHaveTextContent('false');
      });
    });

    it('should remove data from localStorage', async () => {
      const savedProgress = {
        solvedProblems: ['problem-1'],
        streak: 1,
        lastSolvedDate: new Date().toISOString().split('T')[0],
      };
      localStorageMock.setItem('js-ts-tricks-progress', JSON.stringify(savedProgress));

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('1');
      });

      jest.clearAllMocks();

      await act(async () => {
        screen.getByTestId('reset').click();
      });

      await waitFor(() => {
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('js-ts-tricks-progress');
      });
    });

    it('should allow new progress after reset', async () => {
      const savedProgress = {
        solvedProblems: ['problem-1'],
        streak: 5,
        lastSolvedDate: new Date().toISOString().split('T')[0],
      };
      localStorageMock.setItem('js-ts-tricks-progress', JSON.stringify(savedProgress));

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await act(async () => {
        screen.getByTestId('reset').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('0');
      });

      await act(async () => {
        screen.getByTestId('mark-solved-2').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('1');
        expect(screen.getByTestId('is-solved-2')).toHaveTextContent('true');
        expect(screen.getByTestId('streak')).toHaveTextContent('1');
      });
    });
  });

  describe('Streak Calculation', () => {
    it('should increment streak when solving first problem ever', async () => {
      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('streak')).toHaveTextContent('0');
      });

      await act(async () => {
        screen.getByTestId('mark-solved-1').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('streak')).toHaveTextContent('1');
      });
    });

    it('should maintain streak when solving on same day', async () => {
      const today = new Date().toISOString().split('T')[0];
      const savedProgress = {
        solvedProblems: ['problem-1'],
        streak: 3,
        lastSolvedDate: today,
      };
      localStorageMock.setItem('js-ts-tricks-progress', JSON.stringify(savedProgress));

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('streak')).toHaveTextContent('3');
      });

      await act(async () => {
        screen.getByTestId('mark-solved-2').click();
      });

      // Streak should stay the same when solving on the same day
      await waitFor(() => {
        expect(screen.getByTestId('streak')).toHaveTextContent('3');
      });
    });

    it('should increment streak when solving on consecutive days', async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      const savedProgress = {
        solvedProblems: ['problem-1'],
        streak: 5,
        lastSolvedDate: yesterdayStr,
      };
      localStorageMock.setItem('js-ts-tricks-progress', JSON.stringify(savedProgress));

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('streak')).toHaveTextContent('5');
      });

      await act(async () => {
        screen.getByTestId('mark-solved-2').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('streak')).toHaveTextContent('6');
      });
    });

    it('should reset streak to 1 when gap is more than one day', async () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const threeDaysAgoStr = threeDaysAgo.toISOString().split('T')[0];

      const savedProgress = {
        solvedProblems: ['problem-1'],
        streak: 10,
        lastSolvedDate: threeDaysAgoStr,
      };
      localStorageMock.setItem('js-ts-tricks-progress', JSON.stringify(savedProgress));

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      // Streak should be reset to 0 on load because more than 1 day passed
      await waitFor(() => {
        expect(screen.getByTestId('streak')).toHaveTextContent('0');
      });

      await act(async () => {
        screen.getByTestId('mark-solved-2').click();
      });

      // After solving, streak should be 1 (fresh start)
      await waitFor(() => {
        expect(screen.getByTestId('streak')).toHaveTextContent('1');
      });
    });

    it('should reset streak on load if more than 1 day has passed', async () => {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      const twoDaysAgoStr = twoDaysAgo.toISOString().split('T')[0];

      const savedProgress = {
        solvedProblems: ['problem-1', 'problem-2'],
        streak: 7,
        lastSolvedDate: twoDaysAgoStr,
      };
      localStorageMock.setItem('js-ts-tricks-progress', JSON.stringify(savedProgress));

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      // Streak should be reset to 0 because 2 days passed (more than 1)
      await waitFor(() => {
        expect(screen.getByTestId('streak')).toHaveTextContent('0');
        // Solved problems should still be preserved
        expect(screen.getByTestId('solved-count')).toHaveTextContent('2');
      });
    });

    it('should not reset streak if exactly 1 day has passed', async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      const savedProgress = {
        solvedProblems: ['problem-1'],
        streak: 5,
        lastSolvedDate: yesterdayStr,
      };
      localStorageMock.setItem('js-ts-tricks-progress', JSON.stringify(savedProgress));

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      // Streak should not be reset because only 1 day passed
      await waitFor(() => {
        expect(screen.getByTestId('streak')).toHaveTextContent('5');
      });
    });
  });

  describe('localStorage Persistence', () => {
    it('should persist solved problems to localStorage', async () => {
      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await act(async () => {
        screen.getByTestId('mark-solved-1').click();
      });

      await waitFor(() => {
        const storedData = JSON.parse(localStorageMock._getStore()['js-ts-tricks-progress']);
        expect(storedData.solvedProblems).toEqual(['problem-1']);
      });
    });

    it('should persist streak to localStorage', async () => {
      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await act(async () => {
        screen.getByTestId('mark-solved-1').click();
      });

      await waitFor(() => {
        const storedData = JSON.parse(localStorageMock._getStore()['js-ts-tricks-progress']);
        expect(storedData.streak).toBe(1);
      });
    });

    it('should persist lastSolvedDate to localStorage', async () => {
      const today = new Date().toISOString().split('T')[0];

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await act(async () => {
        screen.getByTestId('mark-solved-1').click();
      });

      await waitFor(() => {
        const storedData = JSON.parse(localStorageMock._getStore()['js-ts-tricks-progress']);
        expect(storedData.lastSolvedDate).toBe(today);
      });
    });

    it('should handle corrupted localStorage data gracefully', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      localStorageMock.setItem('js-ts-tricks-progress', 'invalid-json');

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      // Should fall back to default empty state
      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('0');
        expect(screen.getByTestId('streak')).toHaveTextContent('0');
      });

      expect(consoleError).toHaveBeenCalled();
      consoleError.mockRestore();
    });

    it('should handle localStorage errors gracefully on save', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      const originalSetItem = localStorageMock.setItem;
      localStorageMock.setItem = jest.fn(() => {
        throw new Error('Storage full');
      });

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      // Should still update state even if localStorage fails
      await act(async () => {
        screen.getByTestId('mark-solved-1').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('is-solved-1')).toHaveTextContent('true');
      });

      expect(consoleError).toHaveBeenCalled();
      consoleError.mockRestore();
      localStorageMock.setItem = originalSetItem;
    });

    it('should handle localStorage errors gracefully on reset', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

      const savedProgress = {
        solvedProblems: ['problem-1'],
        streak: 1,
        lastSolvedDate: new Date().toISOString().split('T')[0],
      };
      localStorageMock.setItem('js-ts-tricks-progress', JSON.stringify(savedProgress));

      const originalRemoveItem = localStorageMock.removeItem;
      localStorageMock.removeItem = jest.fn(() => {
        throw new Error('Storage error');
      });

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('1');
      });

      // Reset should still work in memory even if localStorage fails
      await act(async () => {
        screen.getByTestId('reset').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('0');
      });

      expect(consoleError).toHaveBeenCalled();
      consoleError.mockRestore();
      localStorageMock.removeItem = originalRemoveItem;
    });

    it('should load progress with missing streak field', async () => {
      const savedProgress = {
        solvedProblems: ['problem-1'],
        lastSolvedDate: new Date().toISOString().split('T')[0],
        // streak field is intentionally missing
      };
      localStorageMock.setItem('js-ts-tricks-progress', JSON.stringify(savedProgress));

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('1');
        expect(screen.getByTestId('streak')).toHaveTextContent('0');
      });
    });

    it('should load progress with missing lastSolvedDate field', async () => {
      const savedProgress = {
        solvedProblems: ['problem-1', 'problem-2'],
        streak: 3,
        // lastSolvedDate field is intentionally missing
      };
      localStorageMock.setItem('js-ts-tricks-progress', JSON.stringify(savedProgress));

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('2');
        expect(screen.getByTestId('last-solved-date')).toHaveTextContent('null');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty state correctly', async () => {
      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('0');
        expect(screen.getByTestId('streak')).toHaveTextContent('0');
        expect(screen.getByTestId('last-solved-date')).toHaveTextContent('null');
        expect(screen.getByTestId('solved-problems')).toHaveTextContent('');
      });
    });

    it('should handle rapid marking and unmarking', async () => {
      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      // Rapidly mark and unmark
      await act(async () => {
        screen.getByTestId('mark-solved-1').click();
        screen.getByTestId('mark-unsolved-1').click();
        screen.getByTestId('mark-solved-1').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('is-solved-1')).toHaveTextContent('true');
      });
    });

    it('should handle marking all problems as solved', async () => {
      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await act(async () => {
        screen.getByTestId('mark-solved-1').click();
      });
      await act(async () => {
        screen.getByTestId('mark-solved-2').click();
      });
      await act(async () => {
        screen.getByTestId('mark-solved-3').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('3');
      });
    });

    it('should handle empty solvedProblems array from localStorage', async () => {
      const savedProgress = {
        solvedProblems: [],
        streak: 0,
        lastSolvedDate: null,
      };
      localStorageMock.setItem('js-ts-tricks-progress', JSON.stringify(savedProgress));

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('0');
        expect(screen.getByTestId('solved-problems')).toHaveTextContent('');
      });
    });

    it('should handle problem IDs with special characters', async () => {
      // Create a test component that can mark arbitrary IDs
      function SpecialIdTestComponent() {
        const { markSolved, isSolved, solvedProblems } = useProgress();
        const specialId = 'problem-with-special_chars.v2';

        return (
          <div>
            <div data-testid="is-solved-special">{isSolved(specialId) ? 'true' : 'false'}</div>
            <div data-testid="solved-list">{Array.from(solvedProblems).join(',')}</div>
            <button onClick={() => markSolved(specialId)} data-testid="mark-special">
              Mark Special
            </button>
          </div>
        );
      }

      render(
        <ProgressProvider>
          <SpecialIdTestComponent />
        </ProgressProvider>
      );

      await act(async () => {
        screen.getByTestId('mark-special').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('is-solved-special')).toHaveTextContent('true');
        expect(screen.getByTestId('solved-list')).toHaveTextContent(
          'problem-with-special_chars.v2'
        );
      });
    });

    it('should maintain solved problems after unmarking one', async () => {
      const savedProgress = {
        solvedProblems: ['problem-1', 'problem-2', 'problem-3'],
        streak: 3,
        lastSolvedDate: new Date().toISOString().split('T')[0],
      };
      localStorageMock.setItem('js-ts-tricks-progress', JSON.stringify(savedProgress));

      render(
        <ProgressProvider>
          <TestComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('3');
      });

      await act(async () => {
        screen.getByTestId('mark-unsolved-1').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('solved-count')).toHaveTextContent('2');
        expect(screen.getByTestId('is-solved-1')).toHaveTextContent('false');
        expect(screen.getByTestId('is-solved-2')).toHaveTextContent('true');
      });
    });
  });

  describe('useProgress Hook', () => {
    it('should throw error when used outside ProgressProvider', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useProgress must be used within a ProgressProvider');

      consoleError.mockRestore();
    });

    it('should provide all expected functions from the hook', async () => {
      let hookResultRef: { current: ReturnType<typeof useProgress> | null } = { current: null };

      function HookInspectorComponent() {
        const result = useProgress();
        hookResultRef.current = result;

        return (
          <div>
            <div data-testid="has-functions">
              {hookResultRef.current &&
              typeof hookResultRef.current.markSolved === 'function' &&
              typeof hookResultRef.current.markUnsolved === 'function' &&
              typeof hookResultRef.current.isSolved === 'function' &&
              typeof hookResultRef.current.resetProgress === 'function'
                ? 'true'
                : 'false'}
            </div>
          </div>
        );
      }

      render(
        <ProgressProvider>
          <HookInspectorComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('has-functions')).toHaveTextContent('true');
      });

      // Verify all functions are present and are functions
      expect(hookResultRef.current).not.toBeNull();
      expect(typeof hookResultRef.current!.markSolved).toBe('function');
      expect(typeof hookResultRef.current!.markUnsolved).toBe('function');
      expect(typeof hookResultRef.current!.isSolved).toBe('function');
      expect(typeof hookResultRef.current!.resetProgress).toBe('function');
    });
  });

  describe('Context Value', () => {
    it('should provide undefined context when accessed outside provider', () => {
      render(<ContextAccessorComponent />);
      expect(screen.getByTestId('context-undefined')).toBeInTheDocument();
    });

    it('should provide context with all required properties', async () => {
      render(
        <ProgressProvider>
          <ContextAccessorComponent />
        </ProgressProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('context-solved-count')).toHaveTextContent('0');
        expect(screen.getByTestId('context-streak')).toHaveTextContent('0');
        expect(screen.getByTestId('context-total')).toHaveTextContent('5');
      });
    });
  });
});
