import { render } from '@testing-library/react';
import ErrorHandler from '@/components/ErrorHandler';

describe('ErrorHandler', () => {
  // Store original console methods and window event listeners
  const originalConsoleError = console.error;
  const originalAddEventListener = window.addEventListener;
  const originalRemoveEventListener = window.removeEventListener;

  // Track added event listeners
  let addedListeners: Map<string, EventListener>;
  let removedListeners: Map<string, EventListener>;

  beforeEach(() => {
    addedListeners = new Map();
    removedListeners = new Map();

    // Mock console.error
    console.error = jest.fn();

    // Mock addEventListener to track what listeners are added
    window.addEventListener = jest.fn((type: string, listener: EventListener) => {
      addedListeners.set(type, listener);
      originalAddEventListener.call(window, type, listener);
    }) as typeof window.addEventListener;

    // Mock removeEventListener to track what listeners are removed
    window.removeEventListener = jest.fn((type: string, listener: EventListener) => {
      removedListeners.set(type, listener);
      originalRemoveEventListener.call(window, type, listener);
    }) as typeof window.removeEventListener;
  });

  afterEach(() => {
    // Restore original methods
    console.error = originalConsoleError;
    window.addEventListener = originalAddEventListener;
    window.removeEventListener = originalRemoveEventListener;
  });

  describe('Rendering', () => {
    it('renders nothing (returns null)', () => {
      const { container } = render(<ErrorHandler />);

      // Should render nothing - container should be empty
      expect(container.firstChild).toBeNull();
    });

    it('does not add any visible DOM elements', () => {
      const { container } = render(<ErrorHandler />);

      expect(container.innerHTML).toBe('');
    });
  });

  describe('Event Listener Registration', () => {
    it('registers unhandledrejection listener on mount', () => {
      render(<ErrorHandler />);

      expect(window.addEventListener).toHaveBeenCalledWith(
        'unhandledrejection',
        expect.any(Function)
      );
    });

    it('registers error listener on mount', () => {
      render(<ErrorHandler />);

      expect(window.addEventListener).toHaveBeenCalledWith('error', expect.any(Function));
    });

    it('registers both listeners', () => {
      render(<ErrorHandler />);

      expect(addedListeners.has('unhandledrejection')).toBe(true);
      expect(addedListeners.has('error')).toBe(true);
    });
  });

  describe('Event Listener Cleanup', () => {
    it('removes unhandledrejection listener on unmount', () => {
      const { unmount } = render(<ErrorHandler />);

      unmount();

      expect(window.removeEventListener).toHaveBeenCalledWith(
        'unhandledrejection',
        expect.any(Function)
      );
    });

    it('removes error listener on unmount', () => {
      const { unmount } = render(<ErrorHandler />);

      unmount();

      expect(window.removeEventListener).toHaveBeenCalledWith('error', expect.any(Function));
    });

    it('removes the same listener functions that were added', () => {
      const { unmount } = render(<ErrorHandler />);

      const addedUnhandledRejection = addedListeners.get('unhandledrejection');
      const addedError = addedListeners.get('error');

      unmount();

      const removedUnhandledRejection = removedListeners.get('unhandledrejection');
      const removedError = removedListeners.get('error');

      expect(addedUnhandledRejection).toBe(removedUnhandledRejection);
      expect(addedError).toBe(removedError);
    });
  });

  describe('Unhandled Promise Rejection Handling', () => {
    it('logs unhandled promise rejections to console.error', () => {
      render(<ErrorHandler />);

      const handler = addedListeners.get('unhandledrejection') as (
        evt: PromiseRejectionEvent
      ) => void;

      // Create a mock PromiseRejectionEvent
      const mockEvent = {
        reason: new Error('Test rejection'),
        preventDefault: jest.fn(),
      } as unknown as PromiseRejectionEvent;

      handler(mockEvent);

      expect(console.error).toHaveBeenCalledWith('Unhandled promise rejection:', mockEvent.reason);
    });

    it('prevents default browser handling of unhandled rejections', () => {
      render(<ErrorHandler />);

      const handler = addedListeners.get('unhandledrejection') as (
        evt: PromiseRejectionEvent
      ) => void;

      const mockEvent = {
        reason: 'Some error',
        preventDefault: jest.fn(),
      } as unknown as PromiseRejectionEvent;

      handler(mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('handles various rejection reasons', () => {
      render(<ErrorHandler />);

      const handler = addedListeners.get('unhandledrejection') as (
        evt: PromiseRejectionEvent
      ) => void;

      // Test with string reason
      const stringEvent = {
        reason: 'String error message',
        preventDefault: jest.fn(),
      } as unknown as PromiseRejectionEvent;
      handler(stringEvent);
      expect(console.error).toHaveBeenCalledWith(
        'Unhandled promise rejection:',
        'String error message'
      );

      // Test with object reason
      const objectEvent = {
        reason: { code: 'ERR_001', message: 'Object error' },
        preventDefault: jest.fn(),
      } as unknown as PromiseRejectionEvent;
      handler(objectEvent);
      expect(console.error).toHaveBeenCalledWith('Unhandled promise rejection:', {
        code: 'ERR_001',
        message: 'Object error',
      });

      // Test with null reason
      const nullEvent = {
        reason: null,
        preventDefault: jest.fn(),
      } as unknown as PromiseRejectionEvent;
      handler(nullEvent);
      expect(console.error).toHaveBeenCalledWith('Unhandled promise rejection:', null);
    });
  });

  describe('Error Event Handling', () => {
    it('logs errors to console.error', () => {
      render(<ErrorHandler />);

      const handler = addedListeners.get('error') as (evt: ErrorEvent) => void;

      const mockError = new Error('Test error');
      const mockEvent = {
        error: mockError,
      } as ErrorEvent;

      handler(mockEvent);

      expect(console.error).toHaveBeenCalledWith('Unhandled error:', mockError);
    });

    it('handles errors with different error types', () => {
      render(<ErrorHandler />);

      const handler = addedListeners.get('error') as (evt: ErrorEvent) => void;

      // Test with TypeError
      const typeError = new TypeError('Type error occurred');
      handler({ error: typeError } as ErrorEvent);
      expect(console.error).toHaveBeenCalledWith('Unhandled error:', typeError);

      // Test with ReferenceError
      const refError = new ReferenceError('Reference error occurred');
      handler({ error: refError } as ErrorEvent);
      expect(console.error).toHaveBeenCalledWith('Unhandled error:', refError);

      // Test with SyntaxError
      const syntaxError = new SyntaxError('Syntax error occurred');
      handler({ error: syntaxError } as ErrorEvent);
      expect(console.error).toHaveBeenCalledWith('Unhandled error:', syntaxError);
    });

    it('handles null error in error event', () => {
      render(<ErrorHandler />);

      const handler = addedListeners.get('error') as (evt: ErrorEvent) => void;

      const mockEvent = {
        error: null,
      } as ErrorEvent;

      handler(mockEvent);

      expect(console.error).toHaveBeenCalledWith('Unhandled error:', null);
    });

    it('handles undefined error in error event', () => {
      render(<ErrorHandler />);

      const handler = addedListeners.get('error') as (evt: ErrorEvent) => void;

      const mockEvent = {
        error: undefined,
      } as ErrorEvent;

      handler(mockEvent);

      expect(console.error).toHaveBeenCalledWith('Unhandled error:', undefined);
    });
  });

  describe('Multiple Mounts/Unmounts', () => {
    it('properly cleans up and re-registers listeners on remount', () => {
      const { unmount, rerender } = render(<ErrorHandler />);

      // First mount should register listeners
      expect(window.addEventListener).toHaveBeenCalledTimes(2);

      unmount();

      // Should remove listeners on unmount
      expect(window.removeEventListener).toHaveBeenCalledTimes(2);

      // Clear mocks
      (window.addEventListener as jest.Mock).mockClear();
      (window.removeEventListener as jest.Mock).mockClear();

      // Re-render
      render(<ErrorHandler />);

      // Should register new listeners
      expect(window.addEventListener).toHaveBeenCalledTimes(2);
    });
  });

  describe('Component Lifecycle', () => {
    it('effect runs only on mount (empty dependency array)', () => {
      const { rerender } = render(<ErrorHandler />);

      // Clear the mock to track new calls
      (window.addEventListener as jest.Mock).mockClear();

      // Rerender the component
      rerender(<ErrorHandler />);

      // Should not add new listeners on rerender
      expect(window.addEventListener).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid mount/unmount cycles', () => {
      const renders = [];
      for (let i = 0; i < 5; i++) {
        const { unmount } = render(<ErrorHandler />);
        renders.push(unmount);
      }

      // All should have registered listeners
      expect(window.addEventListener).toHaveBeenCalledTimes(10); // 2 listeners x 5 renders

      // Unmount all
      renders.forEach((unmount) => unmount());

      expect(window.removeEventListener).toHaveBeenCalledTimes(10);
    });

    it('handles concurrent error handler instances', () => {
      const { unmount: unmount1 } = render(<ErrorHandler />);
      const { unmount: unmount2 } = render(<ErrorHandler />);
      const { unmount: unmount3 } = render(<ErrorHandler />);

      // All three should register their own listeners
      expect(window.addEventListener).toHaveBeenCalledTimes(6);

      unmount1();
      unmount2();
      unmount3();

      // All should clean up
      expect(window.removeEventListener).toHaveBeenCalledTimes(6);
    });
  });

  describe('Integration Behavior', () => {
    it('does not throw when used in a component tree', () => {
      const ParentComponent = () => (
        <div>
          <ErrorHandler />
          <span>Child content</span>
        </div>
      );

      expect(() => render(<ParentComponent />)).not.toThrow();
    });

    it('does not affect sibling components', () => {
      const { getByText } = render(
        <div>
          <ErrorHandler />
          <span>Sibling 1</span>
          <span>Sibling 2</span>
        </div>
      );

      expect(getByText('Sibling 1')).toBeInTheDocument();
      expect(getByText('Sibling 2')).toBeInTheDocument();
    });
  });
});
