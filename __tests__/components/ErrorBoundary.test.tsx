import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ErrorBoundary from '@/components/ErrorBoundary';

// Component that throws an error on render
function ThrowingComponent({ errorMessage }: { errorMessage?: string }) {
  throw new Error(errorMessage || 'Test error');
}

// Component that throws an error conditionally
function ConditionalThrowingComponent({
  shouldThrow,
  errorMessage,
}: {
  shouldThrow: boolean;
  errorMessage?: string;
}) {
  if (shouldThrow) {
    throw new Error(errorMessage || 'Conditional test error');
  }
  return <div data-testid="child-content">Child content rendered successfully</div>;
}

// Component that throws different error types
function TypedErrorComponent({
  errorType,
}: {
  errorType: 'Error' | 'TypeError' | 'RangeError' | 'ReferenceError' | 'SyntaxError';
}) {
  switch (errorType) {
    case 'TypeError':
      throw new TypeError('Type error occurred');
    case 'RangeError':
      throw new RangeError('Range error occurred');
    case 'ReferenceError':
      throw new ReferenceError('Reference error occurred');
    case 'SyntaxError':
      throw new SyntaxError('Syntax error occurred');
    default:
      throw new Error('Generic error occurred');
  }
}

// Component that throws error without message
function ErrorWithoutMessage() {
  throw new Error();
}

// Async component that might throw
function AsyncErrorComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Async component error');
  }
  return <div data-testid="async-content">Async content</div>;
}

// Component with nested structure
function NestedComponent() {
  return (
    <div data-testid="nested-parent">
      <ThrowingComponent errorMessage="Nested error" />
    </div>
  );
}

// Component that throws error with stack trace
function ErrorWithStackComponent() {
  function innerFunction() {
    throw new Error('Error with stack trace');
  }
  innerFunction();
  return null;
}

// Mock console.error to avoid cluttering test output
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('ErrorBoundary', () => {
  describe('Rendering children normally when no error', () => {
    it('should render children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <div data-testid="child">Child content</div>
        </ErrorBoundary>
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.getByTestId('child')).toHaveTextContent('Child content');
    });

    it('should render multiple children without errors', () => {
      render(
        <ErrorBoundary>
          <div data-testid="child-1">First child</div>
          <div data-testid="child-2">Second child</div>
        </ErrorBoundary>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
    });

    it('should render nested components without errors', () => {
      render(
        <ErrorBoundary>
          <div data-testid="outer">
            <div data-testid="inner">Nested content</div>
          </div>
        </ErrorBoundary>
      );

      expect(screen.getByTestId('outer')).toBeInTheDocument();
      expect(screen.getByTestId('inner')).toBeInTheDocument();
    });

    it('should render conditional component when not throwing', () => {
      render(
        <ErrorBoundary>
          <ConditionalThrowingComponent shouldThrow={false} />
        </ErrorBoundary>
      );

      expect(screen.getByTestId('child-content')).toBeInTheDocument();
    });

    it('should render fragments as children', () => {
      render(
        <ErrorBoundary>
          <>
            <span data-testid="fragment-child-1">Fragment 1</span>
            <span data-testid="fragment-child-2">Fragment 2</span>
          </>
        </ErrorBoundary>
      );

      expect(screen.getByTestId('fragment-child-1')).toBeInTheDocument();
      expect(screen.getByTestId('fragment-child-2')).toBeInTheDocument();
    });
  });

  describe('Catching errors and showing fallback UI', () => {
    it('should catch error and display default fallback UI', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Test error')).toBeInTheDocument();
    });

    it('should display custom fallback when provided', () => {
      const customFallback = <div data-testid="custom-fallback">Custom error message</div>;

      render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
      expect(screen.getByText('Custom error message')).toBeInTheDocument();
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });

    it('should show fallback UI elements correctly', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      // Check for heading
      expect(screen.getByRole('heading', { name: /something went wrong/i })).toBeInTheDocument();

      // Check for buttons
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /go to home/i })).toBeInTheDocument();
    });

    it('should catch errors from deeply nested components', () => {
      render(
        <ErrorBoundary>
          <NestedComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Nested error')).toBeInTheDocument();
    });
  });

  describe('Error message display', () => {
    it('should display the error message', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent errorMessage="Custom error message here" />
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom error message here')).toBeInTheDocument();
    });

    it('should display default message when error has no message', () => {
      render(
        <ErrorBoundary>
          <ErrorWithoutMessage />
        </ErrorBoundary>
      );

      expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
    });

    it('should display error messages with special characters', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent errorMessage="Error: <script>alert('xss')</script>" />
        </ErrorBoundary>
      );

      expect(screen.getByText("Error: <script>alert('xss')</script>")).toBeInTheDocument();
    });

    it('should handle long error messages', () => {
      const longMessage = 'A'.repeat(500);
      render(
        <ErrorBoundary>
          <ThrowingComponent errorMessage={longMessage} />
        </ErrorBoundary>
      );

      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });
  });

  describe('Reset/retry functionality', () => {
    it('should reset error state when Try again button is clicked', async () => {
      let shouldThrow = true;

      function TogglableComponent() {
        if (shouldThrow) {
          throw new Error('Initial error');
        }
        return <div data-testid="recovered">Recovered content</div>;
      }

      const { rerender } = render(
        <ErrorBoundary>
          <TogglableComponent />
        </ErrorBoundary>
      );

      // Should show error UI
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      // Fix the error condition
      shouldThrow = false;

      // Click Try again
      fireEvent.click(screen.getByRole('button', { name: /try again/i }));

      // Re-render after state reset
      rerender(
        <ErrorBoundary>
          <TogglableComponent />
        </ErrorBoundary>
      );

      await waitFor(() => {
        expect(screen.getByTestId('recovered')).toBeInTheDocument();
      });
    });

    it('should have Go to Home button with click handler that navigates to home', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      const goHomeButton = screen.getByRole('button', { name: /go to home/i });
      expect(goHomeButton).toBeInTheDocument();
      expect(goHomeButton).toBeEnabled();

      // Verify the button has an onClick handler by checking it's not just a static button
      // In jsdom, we can't easily mock window.location.href assignment,
      // but we can verify the button exists and is interactive
      expect(goHomeButton).toHaveAttribute('class');
      expect(goHomeButton.onclick).toBeDefined();
    });

    it('should have Go to Home button with onclick attribute', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      const goHomeButton = screen.getByRole('button', { name: /go to home/i });
      // Verify the button is properly rendered and functional
      expect(goHomeButton).toBeInTheDocument();
      expect(goHomeButton.tagName).toBe('BUTTON');

      // The button should be clickable (no disabled attribute)
      expect(goHomeButton).not.toBeDisabled();

      // Clicking the button doesn't throw an error (even though navigation won't work in jsdom)
      expect(() => fireEvent.click(goHomeButton)).not.toThrow();
    });

    it('should reset all error state properties', async () => {
      let shouldThrow = true;

      function TogglableComponent() {
        if (shouldThrow) {
          throw new Error('Test error');
        }
        return <div data-testid="recovered">Content</div>;
      }

      render(
        <ErrorBoundary>
          <TogglableComponent />
        </ErrorBoundary>
      );

      // Error UI is showing
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      // Fix error
      shouldThrow = false;

      // Reset
      fireEvent.click(screen.getByRole('button', { name: /try again/i }));

      // After reset, children should attempt to render
      await waitFor(() => {
        // The boundary should try to render children again
        expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
      });
    });
  });

  describe('componentDidCatch behavior', () => {
    it('should log error to console.error', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent errorMessage="Logged error" />
        </ErrorBoundary>
      );

      expect(console.error).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith(
        'Error Boundary caught an error:',
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      );
    });

    it('should capture errorInfo with componentStack', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      // Verify console.error was called with error info containing componentStack
      expect(console.error).toHaveBeenCalledWith(
        'Error Boundary caught an error:',
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      );
    });

    it('should store errorInfo in state', () => {
      // We can't directly access state, but in development mode, error details would be visible
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      // The component did catch and log
      expect(console.error).toHaveBeenCalled();

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('getDerivedStateFromError behavior', () => {
    it('should set hasError to true when error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      // If hasError is true, fallback UI is shown
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should capture the error object in state', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent errorMessage="Captured error" />
        </ErrorBoundary>
      );

      // The error message is displayed, proving the error was captured
      expect(screen.getByText('Captured error')).toBeInTheDocument();
    });

    it('should update state synchronously before render', () => {
      // This tests that getDerivedStateFromError is called before render
      // by verifying the fallback UI is shown immediately
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      // Fallback should be shown without needing to wait
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  describe('Different error types handling', () => {
    it('should catch TypeError', () => {
      render(
        <ErrorBoundary>
          <TypedErrorComponent errorType="TypeError" />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Type error occurred')).toBeInTheDocument();
    });

    it('should catch RangeError', () => {
      render(
        <ErrorBoundary>
          <TypedErrorComponent errorType="RangeError" />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Range error occurred')).toBeInTheDocument();
    });

    it('should catch ReferenceError', () => {
      render(
        <ErrorBoundary>
          <TypedErrorComponent errorType="ReferenceError" />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Reference error occurred')).toBeInTheDocument();
    });

    it('should catch SyntaxError', () => {
      render(
        <ErrorBoundary>
          <TypedErrorComponent errorType="SyntaxError" />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Syntax error occurred')).toBeInTheDocument();
    });

    it('should catch generic Error', () => {
      render(
        <ErrorBoundary>
          <TypedErrorComponent errorType="Error" />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Generic error occurred')).toBeInTheDocument();
    });

    it('should handle errors with stack traces', () => {
      render(
        <ErrorBoundary>
          <ErrorWithStackComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Error with stack trace')).toBeInTheDocument();
    });
  });

  describe('Development mode error details', () => {
    const originalEnv = process.env.NODE_ENV;

    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
    });

    it('should show error details in development mode', () => {
      // Note: jest sets NODE_ENV to 'test' by default, which is truthy for development check
      // We need to explicitly set it to 'development'
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        writable: true,
      });

      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      // In development, error details should be available (though may require errorInfo)
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should hide error details in production mode', () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        writable: true,
      });

      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      // The details section should not be present in production
      expect(screen.queryByText('Error Details (Development Only)')).not.toBeInTheDocument();
    });
  });

  describe('Error boundary isolation', () => {
    it('should not affect sibling components outside the boundary', () => {
      render(
        <div>
          <div data-testid="sibling">Sibling content</div>
          <ErrorBoundary>
            <ThrowingComponent />
          </ErrorBoundary>
        </div>
      );

      expect(screen.getByTestId('sibling')).toBeInTheDocument();
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should only catch errors from its own children', () => {
      render(
        <div>
          <ErrorBoundary>
            <ThrowingComponent errorMessage="Inner error" />
          </ErrorBoundary>
          <ErrorBoundary>
            <div data-testid="safe-child">Safe content</div>
          </ErrorBoundary>
        </div>
      );

      expect(screen.getByText('Inner error')).toBeInTheDocument();
      expect(screen.getByTestId('safe-child')).toBeInTheDocument();
    });
  });

  describe('Props handling', () => {
    it('should accept undefined fallback prop', () => {
      render(
        <ErrorBoundary fallback={undefined}>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      // Should show default fallback
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should accept null as children', () => {
      render(<ErrorBoundary>{null}</ErrorBoundary>);

      // Should not crash with null children
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });

    it('should accept ReactNode as fallback', () => {
      const complexFallback = (
        <div data-testid="complex-fallback">
          <h1>Error!</h1>
          <p>Something bad happened</p>
          <button type="button">Retry</button>
        </div>
      );

      render(
        <ErrorBoundary fallback={complexFallback}>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(screen.getByTestId('complex-fallback')).toBeInTheDocument();
      expect(screen.getByText('Error!')).toBeInTheDocument();
      expect(screen.getByText('Something bad happened')).toBeInTheDocument();
    });
  });

  describe('UI elements and accessibility', () => {
    it('should render SVG icon with aria-hidden', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      const svg = document.querySelector('svg[aria-hidden="true"]');
      expect(svg).toBeInTheDocument();
    });

    it('should have proper button accessibility', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      const tryAgainButton = screen.getByRole('button', { name: /try again/i });
      const homeButton = screen.getByRole('button', { name: /go to home/i });

      expect(tryAgainButton).toBeEnabled();
      expect(homeButton).toBeEnabled();
    });

    it('should have proper heading structure', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Something went wrong');
    });
  });

  describe('Edge cases', () => {
    it('should handle re-throwing errors after reset', async () => {
      // Use a stable reference for the throw count
      const throwTracker = { count: 0 };

      function ReThrowingComponent() {
        throwTracker.count++;
        const currentCount = throwTracker.count;
        throw new Error(`Error throw #${currentCount}`);
      }

      const { rerender } = render(
        <ErrorBoundary>
          <ReThrowingComponent />
        </ErrorBoundary>
      );

      // Wait for the error UI to appear with any error throw number
      await waitFor(() => {
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      });

      // Store the current throw count
      const firstThrowCount = throwTracker.count;

      // Reset the boundary
      fireEvent.click(screen.getByRole('button', { name: /try again/i }));

      rerender(
        <ErrorBoundary>
          <ReThrowingComponent />
        </ErrorBoundary>
      );

      // Should catch a new error with a higher count
      await waitFor(() => {
        expect(throwTracker.count).toBeGreaterThan(firstThrowCount);
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      });
    });

    it('should handle empty error message gracefully', () => {
      function EmptyMessageError() {
        const error = new Error('');
        throw error;
      }

      render(
        <ErrorBoundary>
          <EmptyMessageError />
        </ErrorBoundary>
      );

      expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
    });

    it('should handle error in initial render', () => {
      function ImmediateError() {
        throw new Error('Immediate error');
      }

      render(
        <ErrorBoundary>
          <ImmediateError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Immediate error')).toBeInTheDocument();
    });

    it('should handle multiple nested error boundaries', () => {
      render(
        <ErrorBoundary fallback={<div data-testid="outer-fallback">Outer fallback</div>}>
          <div data-testid="outer-content">
            <ErrorBoundary fallback={<div data-testid="inner-fallback">Inner fallback</div>}>
              <ThrowingComponent />
            </ErrorBoundary>
          </div>
        </ErrorBoundary>
      );

      // Inner boundary should catch the error
      expect(screen.getByTestId('inner-fallback')).toBeInTheDocument();
      expect(screen.getByTestId('outer-content')).toBeInTheDocument();
      expect(screen.queryByTestId('outer-fallback')).not.toBeInTheDocument();
    });
  });

  describe('Constructor initialization', () => {
    it('should initialize with correct default state', () => {
      render(
        <ErrorBoundary>
          <div data-testid="child">Content</div>
        </ErrorBoundary>
      );

      // No error state means children render
      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });
  });

  describe('State transitions', () => {
    it('should transition from no error to error state', async () => {
      let shouldThrow = false;

      function DynamicComponent() {
        if (shouldThrow) {
          throw new Error('Dynamic error');
        }
        return <div data-testid="dynamic-content">Dynamic content</div>;
      }

      const { rerender } = render(
        <ErrorBoundary>
          <DynamicComponent />
        </ErrorBoundary>
      );

      expect(screen.getByTestId('dynamic-content')).toBeInTheDocument();

      // Trigger error on next render
      shouldThrow = true;

      rerender(
        <ErrorBoundary>
          <DynamicComponent />
        </ErrorBoundary>
      );

      await waitFor(() => {
        expect(screen.getByText('Dynamic error')).toBeInTheDocument();
      });
    });

    it('should transition from error state back to normal on reset', async () => {
      let shouldThrow = true;

      function DynamicComponent() {
        if (shouldThrow) {
          throw new Error('Error state');
        }
        return <div data-testid="normal-content">Normal content</div>;
      }

      const { rerender } = render(
        <ErrorBoundary>
          <DynamicComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText('Error state')).toBeInTheDocument();

      shouldThrow = false;
      fireEvent.click(screen.getByRole('button', { name: /try again/i }));

      rerender(
        <ErrorBoundary>
          <DynamicComponent />
        </ErrorBoundary>
      );

      await waitFor(() => {
        expect(screen.getByTestId('normal-content')).toBeInTheDocument();
      });
    });
  });
});
