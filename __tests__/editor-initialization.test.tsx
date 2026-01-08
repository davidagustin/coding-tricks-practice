import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProblemPage from '@/app/problems/[id]/page';
import { problems } from '@/lib/problems';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: () => ({ id: problems[0].id }),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

// Mock the CodeEditor component to check if it receives the starter code
let receivedCode: string | null = null;
jest.mock('@/components/CodeEditor', () => {
  return function MockCodeEditor({ code, onChange, readOnly }: any) {
    receivedCode = code;
    return (
      <div data-testid="code-editor" data-readonly={readOnly}>
        <textarea
          data-testid="code-textarea"
          value={code || ''}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
        />
      </div>
    );
  };
});

jest.mock('@/components/TestResults', () => {
  return function MockTestResults({ isRunning }: any) {
    return <div data-testid="test-results">{isRunning ? 'Running...' : 'Ready'}</div>;
  };
});

jest.mock('@/components/ProblemDescription', () => {
  return function MockProblemDescription({ problem }: any) {
    return <div data-testid="problem-description">{problem.title}</div>;
  };
});

describe('Editor Initialization', () => {
  beforeEach(() => {
    receivedCode = null;
  });


  it('should not show empty editor when starter code exists', async () => {
    const problem = problems.find(p => p.starterCode && p.starterCode.trim().length > 0);
    if (!problem) {
      // Skip if no problem with starter code
      return;
    }

    // Mock useParams to return the problem ID
    jest.doMock('next/navigation', () => ({
      useParams: () => ({ id: problem.id }),
      useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
      }),
    }));

    render(<ProblemPage />);
    
    await waitFor(() => {
      const textarea = screen.getByTestId('code-textarea');
      expect(textarea).toBeInTheDocument();
    });
    
    // Wait for starter code to be set
    await waitFor(() => {
      const textarea = screen.getByTestId('code-textarea') as HTMLTextAreaElement;
      expect(textarea.value).not.toBe('');
      expect(textarea.value.length).toBeGreaterThan(0);
    }, { timeout: 2000 });
  });

  it('should initialize with starter code immediately', async () => {
    const problem = problems[0];
    render(<ProblemPage />);
    
    // Check immediately that starter code is passed to editor
    await waitFor(() => {
      expect(receivedCode).toBe(problem.starterCode);
    }, { timeout: 1000 });
    
    // Also check the textarea value
    await waitFor(() => {
      const textarea = screen.getByTestId('code-textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe(problem.starterCode);
      expect(textarea.value.length).toBeGreaterThan(0);
    });
  });

  it('should have starter code for all problems', () => {
    problems.forEach(problem => {
      expect(problem.starterCode).toBeDefined();
      expect(typeof problem.starterCode).toBe('string');
      expect(problem.starterCode.trim().length).toBeGreaterThan(0);
    });
  });
});
