import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProblemPage from '@/app/problems/[id]/page';
import { problems } from '@/lib/problems';

interface MockCodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  readOnly?: boolean;
}

interface MockTestResultsProps {
  isRunning: boolean;
}

interface MockProblemDescriptionProps {
  problem: { title: string };
}

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: () => ({ id: problems[0].id }),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

// Mock the components
jest.mock('@/components/CodeEditor', () => {
  return function MockCodeEditor({ code, onChange, readOnly }: MockCodeEditorProps) {
    return (
      <div data-testid="code-editor" data-readonly={readOnly}>
        <textarea
          data-testid="code-textarea"
          value={code}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
        />
      </div>
    );
  };
});

jest.mock('@/components/TestResults', () => {
  return function MockTestResults({ isRunning }: MockTestResultsProps) {
    return <div data-testid="test-results">{isRunning ? 'Running...' : 'Ready'}</div>;
  };
});

jest.mock('@/components/ProblemDescription', () => {
  return function MockProblemDescription({ problem }: MockProblemDescriptionProps) {
    return <div data-testid="problem-description">{problem.title}</div>;
  };
});

describe('Show/Hide Solution Toggle', () => {
  it('should show starter code initially', async () => {
    const problem = problems[0];
    render(<ProblemPage />);

    await waitFor(() => {
      const textarea = screen.getByTestId('code-textarea');
      expect(textarea).toHaveValue(problem.starterCode);
    });
  });

  it('should show solution when "Show Solution" is clicked', async () => {
    const user = userEvent.setup();
    const problem = problems[0];

    render(<ProblemPage />);

    await waitFor(() => {
      expect(screen.getByText('Show Solution')).toBeInTheDocument();
    });

    const showSolutionButton = screen.getByText('Show Solution');
    await user.click(showSolutionButton);

    await waitFor(() => {
      const textarea = screen.getByTestId('code-textarea');
      expect(textarea).toHaveValue(problem.solution);
      expect(textarea).toHaveAttribute('readonly');
      expect(screen.getByText('Hide Solution')).toBeInTheDocument();
    });
  });

  it('should restore user code when "Hide Solution" is clicked', async () => {
    const user = userEvent.setup();
    const problem = problems[0];
    const userCode = 'function test() { return "user code"; }';

    render(<ProblemPage />);

    // Wait for initial render
    await waitFor(() => {
      expect(screen.getByText('Show Solution')).toBeInTheDocument();
    });

    // User types some code - use fireEvent for code with special characters
    const textarea = screen.getByTestId('code-textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: userCode } });

    // Verify user code is there
    expect(textarea).toHaveValue(userCode);

    // Click "Show Solution"
    const showButton = screen.getByText('Show Solution');
    await user.click(showButton);

    await waitFor(() => {
      expect(screen.getByTestId('code-textarea')).toHaveValue(problem.solution);
    });

    // Click "Hide Solution"
    const hideButton = screen.getByText('Hide Solution');
    await user.click(hideButton);

    // Should restore user's code
    await waitFor(() => {
      const restoredTextarea = screen.getByTestId('code-textarea') as HTMLTextAreaElement;
      expect(restoredTextarea).toHaveValue(userCode);
      expect(restoredTextarea).not.toHaveAttribute('readonly');
    });
  });

  it('should preserve user code when toggling solution multiple times', async () => {
    const user = userEvent.setup();
    const problem = problems[0];
    const userCode = 'function myFunction() { return 42; }';

    render(<ProblemPage />);

    await waitFor(() => {
      expect(screen.getByText('Show Solution')).toBeInTheDocument();
    });

    // User types code - use fireEvent for code with special characters
    const textarea = screen.getByTestId('code-textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: userCode } });

    // Toggle solution on
    await user.click(screen.getByText('Show Solution'));
    await waitFor(() => {
      expect(screen.getByTestId('code-textarea')).toHaveValue(problem.solution);
    });

    // Toggle solution off
    await user.click(screen.getByText('Hide Solution'));
    await waitFor(() => {
      expect(screen.getByTestId('code-textarea')).toHaveValue(userCode);
    });

    // Toggle solution on again
    await user.click(screen.getByText('Show Solution'));
    await waitFor(() => {
      expect(screen.getByTestId('code-textarea')).toHaveValue(problem.solution);
    });

    // Toggle solution off again - should still have user code
    await user.click(screen.getByText('Hide Solution'));
    await waitFor(() => {
      expect(screen.getByTestId('code-textarea')).toHaveValue(userCode);
    });
  });

  it('should make editor read-only when showing solution', async () => {
    const user = userEvent.setup();

    render(<ProblemPage />);

    await waitFor(() => {
      expect(screen.getByText('Show Solution')).toBeInTheDocument();
    });

    const editor = screen.getByTestId('code-editor');
    expect(editor).toHaveAttribute('data-readonly', 'false');

    await user.click(screen.getByText('Show Solution'));

    await waitFor(() => {
      expect(editor).toHaveAttribute('data-readonly', 'true');
    });
  });

  it('should make editor editable when hiding solution', async () => {
    const user = userEvent.setup();

    render(<ProblemPage />);

    await waitFor(() => {
      expect(screen.getByText('Show Solution')).toBeInTheDocument();
    });

    // Show solution
    await user.click(screen.getByText('Show Solution'));

    await waitFor(() => {
      const editor = screen.getByTestId('code-editor');
      expect(editor).toHaveAttribute('data-readonly', 'true');
    });

    // Hide solution
    await user.click(screen.getByText('Hide Solution'));

    await waitFor(() => {
      const editor = screen.getByTestId('code-editor');
      expect(editor).toHaveAttribute('data-readonly', 'false');
    });
  });

  it('should handle rapid toggling without losing user code', async () => {
    const user = userEvent.setup();
    const userCode = 'const myCode = "test";';

    render(<ProblemPage />);

    await waitFor(() => {
      expect(screen.getByText('Show Solution')).toBeInTheDocument();
    });

    // User types code
    const textarea = screen.getByTestId('code-textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: userCode } });

    // Rapidly toggle solution multiple times
    await user.click(screen.getByText('Show Solution'));
    await user.click(screen.getByText('Hide Solution'));
    await user.click(screen.getByText('Show Solution'));
    await user.click(screen.getByText('Hide Solution'));

    // After all toggles, user code should be preserved
    await waitFor(() => {
      const finalTextarea = screen.getByTestId('code-textarea') as HTMLTextAreaElement;
      expect(finalTextarea).toHaveValue(userCode);
    });
  });

  it('should not lose user code when showing solution immediately after typing', async () => {
    const user = userEvent.setup();
    const problem = problems[0];
    const userCode = 'function test() { return true; }';

    render(<ProblemPage />);

    await waitFor(() => {
      expect(screen.getByText('Show Solution')).toBeInTheDocument();
    });

    // User types code
    const textarea = screen.getByTestId('code-textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: userCode } });

    // Immediately show solution
    await user.click(screen.getByText('Show Solution'));

    await waitFor(() => {
      expect(screen.getByTestId('code-textarea')).toHaveValue(problem.solution);
    });

    // Hide solution - should restore user code
    await user.click(screen.getByText('Hide Solution'));

    await waitFor(() => {
      const restoredTextarea = screen.getByTestId('code-textarea') as HTMLTextAreaElement;
      expect(restoredTextarea).toHaveValue(userCode);
    });
  });
});
