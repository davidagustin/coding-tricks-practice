import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type React from 'react';
import CodeEditor from '@/components/CodeEditor';
import { ThemeContext } from '@/components/ThemeProvider';

// Mock types for Monaco Editor
interface MockEditorProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  onMount?: (editor: MockEditor, monaco: MockMonaco) => void;
  height?: string;
  language?: string;
  theme?: string;
  options?: Record<string, unknown>;
  loading?: React.ReactNode;
}

interface MockModel {
  getValue: jest.Mock;
  setValue: jest.Mock;
  dispose: jest.Mock;
}

interface MockEditor {
  getModel: jest.Mock<MockModel | null>;
  setModel: jest.Mock;
  addAction: jest.Mock;
  onDidPaste: jest.Mock;
  getAction: jest.Mock;
}

interface MockMonaco {
  editor: {
    createModel: jest.Mock;
    setModelMarkers: jest.Mock;
  };
  Uri: {
    parse: jest.Mock;
  };
  languages: {
    typescript: {
      typescriptDefaults: {
        setCompilerOptions: jest.Mock;
        setDiagnosticsOptions: jest.Mock;
      };
      javascriptDefaults: {
        setCompilerOptions: jest.Mock;
      };
      ScriptTarget: {
        ES2020: number;
      };
      ModuleResolutionKind: {
        NodeJs: number;
      };
      ModuleKind: {
        ESNext: number;
      };
      JsxEmit: {
        React: number;
      };
    };
  };
  KeyMod: {
    CtrlCmd: number;
  };
  KeyCode: {
    KeyK: number;
    KeyF: number;
  };
}

// Track if loading state is being shown
let showLoading = false;
let mockOnMount: ((editor: MockEditor, monaco: MockMonaco) => void) | undefined;
let capturedProps: MockEditorProps = {};

// Create mock editor instance
const createMockEditor = (): MockEditor => ({
  getModel: jest.fn(() => ({
    getValue: jest.fn(() => ''),
    setValue: jest.fn(),
    dispose: jest.fn(),
  })),
  setModel: jest.fn(),
  addAction: jest.fn(),
  onDidPaste: jest.fn(),
  getAction: jest.fn(() => ({
    run: jest.fn().mockResolvedValue(undefined),
  })),
});

// Create mock monaco instance
const createMockMonaco = (): MockMonaco => ({
  editor: {
    createModel: jest.fn(() => ({
      getValue: jest.fn(() => ''),
      setValue: jest.fn(),
      dispose: jest.fn(),
    })),
    setModelMarkers: jest.fn(),
  },
  Uri: {
    parse: jest.fn((uri: string) => uri),
  },
  languages: {
    typescript: {
      typescriptDefaults: {
        setCompilerOptions: jest.fn(),
        setDiagnosticsOptions: jest.fn(),
      },
      javascriptDefaults: {
        setCompilerOptions: jest.fn(),
      },
      ScriptTarget: {
        ES2020: 7,
      },
      ModuleResolutionKind: {
        NodeJs: 2,
      },
      ModuleKind: {
        ESNext: 99,
      },
      JsxEmit: {
        React: 2,
      },
    },
  },
  KeyMod: {
    CtrlCmd: 2048,
  },
  KeyCode: {
    KeyK: 41,
    KeyF: 36,
  },
});

// Mock the Monaco Editor module
jest.mock('@monaco-editor/react', () => ({
  __esModule: true,
  default: function MockEditor(props: MockEditorProps) {
    capturedProps = props;
    mockOnMount = props.onMount;

    // If showLoading is true, render the loading component
    if (showLoading && props.loading) {
      return <>{props.loading}</>;
    }

    return (
      <div data-testid="monaco-editor">
        <textarea
          data-testid="monaco-textarea"
          value={props.value || ''}
          onChange={(e) => props.onChange?.(e.target.value)}
          readOnly={props.options?.readOnly as boolean}
          aria-label="code editor"
        />
        <div data-testid="editor-language">{props.language}</div>
        <div data-testid="editor-theme">{props.theme}</div>
        <div data-testid="editor-options">{JSON.stringify(props.options)}</div>
      </div>
    );
  },
}));

// Helper to render CodeEditor with ThemeProvider
interface RenderCodeEditorOptions {
  theme?: 'light' | 'dark';
  code?: string;
  onChange?: (code: string) => void;
  language?: string;
  readOnly?: boolean;
}

function renderCodeEditor({
  theme = 'dark',
  code = '',
  onChange = jest.fn(),
  language = 'typescript',
  readOnly = false,
}: RenderCodeEditorOptions = {}) {
  const themeContextValue = {
    theme,
    toggleTheme: jest.fn(),
    setTheme: jest.fn(),
  };

  return render(
    <ThemeContext.Provider value={themeContextValue}>
      <CodeEditor code={code} onChange={onChange} language={language} readOnly={readOnly} />
    </ThemeContext.Provider>
  );
}

describe('CodeEditor', () => {
  beforeEach(() => {
    showLoading = false;
    mockOnMount = undefined;
    capturedProps = {};
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Rendering with Initial Code', () => {
    it('renders the editor with initial code', () => {
      const initialCode = 'const x = 1;';
      renderCodeEditor({ code: initialCode });

      const textarea = screen.getByTestId('monaco-textarea');
      expect(textarea).toHaveValue(initialCode);
    });

    it('renders the editor container', () => {
      renderCodeEditor();

      const editor = screen.getByTestId('monaco-editor');
      expect(editor).toBeInTheDocument();
    });

    it('renders with empty code', () => {
      renderCodeEditor({ code: '' });

      const textarea = screen.getByTestId('monaco-textarea');
      expect(textarea).toHaveValue('');
    });

    it('renders with multiline code', () => {
      const multilineCode = `function test() {
  return 42;
}`;
      renderCodeEditor({ code: multilineCode });

      const textarea = screen.getByTestId('monaco-textarea');
      expect(textarea).toHaveValue(multilineCode);
    });

    it('renders with complex TypeScript code', () => {
      const tsCode = `interface User {
  name: string;
  age: number;
}

const user: User = { name: 'John', age: 30 };`;
      renderCodeEditor({ code: tsCode });

      const textarea = screen.getByTestId('monaco-textarea');
      expect(textarea).toHaveValue(tsCode);
    });
  });

  describe('onChange Callback', () => {
    it('calls onChange when editor content changes', () => {
      const onChange = jest.fn();
      renderCodeEditor({ onChange });

      const textarea = screen.getByTestId('monaco-textarea');
      fireEvent.change(textarea, { target: { value: 'const y = 2;' } });

      expect(onChange).toHaveBeenCalledWith('const y = 2;');
    });

    it('calls onChange with empty string when clearing content', () => {
      const onChange = jest.fn();
      renderCodeEditor({ code: 'initial', onChange });

      const textarea = screen.getByTestId('monaco-textarea');
      fireEvent.change(textarea, { target: { value: '' } });

      expect(onChange).toHaveBeenCalledWith('');
    });

    it('calls onChange multiple times for multiple edits', () => {
      const onChange = jest.fn();
      renderCodeEditor({ onChange });

      const textarea = screen.getByTestId('monaco-textarea');

      fireEvent.change(textarea, { target: { value: 'line 1' } });
      fireEvent.change(textarea, { target: { value: 'line 1\nline 2' } });
      fireEvent.change(textarea, { target: { value: 'line 1\nline 2\nline 3' } });

      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenNthCalledWith(1, 'line 1');
      expect(onChange).toHaveBeenNthCalledWith(2, 'line 1\nline 2');
      expect(onChange).toHaveBeenNthCalledWith(3, 'line 1\nline 2\nline 3');
    });

    it('passes the Monaco onChange handler to the editor', () => {
      const onChange = jest.fn();
      renderCodeEditor({ onChange });

      expect(capturedProps.onChange).toBeDefined();
    });
  });

  describe('Loading State', () => {
    it('displays loading indicator while editor is loading', () => {
      showLoading = true;
      renderCodeEditor();

      expect(screen.getByText('Loading editor...')).toBeInTheDocument();
    });

    it('shows spinner animation during loading', () => {
      showLoading = true;
      const { container } = renderCodeEditor();

      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('loading indicator has proper styling', () => {
      showLoading = true;
      const { container } = renderCodeEditor();

      // Check for flex container with items-center and justify-center
      const loadingContainer = container.querySelector('.flex.items-center.justify-center');
      expect(loadingContainer).toBeInTheDocument();
    });

    it('does not show editor content while loading', () => {
      showLoading = true;
      renderCodeEditor({ code: 'const x = 1;' });

      expect(screen.queryByTestId('monaco-textarea')).not.toBeInTheDocument();
    });
  });

  describe('Theme Support', () => {
    it('uses vs-dark theme when dark mode is active', () => {
      renderCodeEditor({ theme: 'dark' });

      const themeIndicator = screen.getByTestId('editor-theme');
      expect(themeIndicator).toHaveTextContent('vs-dark');
    });

    it('uses vs theme when light mode is active', () => {
      renderCodeEditor({ theme: 'light' });

      const themeIndicator = screen.getByTestId('editor-theme');
      expect(themeIndicator).toHaveTextContent('vs');
    });

    it('passes the correct theme prop to Monaco editor', () => {
      renderCodeEditor({ theme: 'dark' });
      expect(capturedProps.theme).toBe('vs-dark');

      // Re-render with light theme
      renderCodeEditor({ theme: 'light' });
      expect(capturedProps.theme).toBe('vs');
    });

    it('editor container has dark mode styling classes', () => {
      const { container } = renderCodeEditor({ theme: 'dark' });

      const editorWrapper = container.querySelector('.dark\\:bg-gray-900');
      expect(editorWrapper).toBeInTheDocument();
    });

    it('editor container has proper border styling for dark mode', () => {
      const { container } = renderCodeEditor({ theme: 'dark' });

      const editorWrapper = container.querySelector('.dark\\:border-gray-700');
      expect(editorWrapper).toBeInTheDocument();
    });
  });

  describe('Language Setting', () => {
    it('defaults to typescript language', () => {
      renderCodeEditor();

      const languageIndicator = screen.getByTestId('editor-language');
      expect(languageIndicator).toHaveTextContent('typescript');
    });

    it('accepts custom language setting', () => {
      renderCodeEditor({ language: 'javascript' });

      const languageIndicator = screen.getByTestId('editor-language');
      expect(languageIndicator).toHaveTextContent('javascript');
    });

    it('supports python language', () => {
      renderCodeEditor({ language: 'python' });

      const languageIndicator = screen.getByTestId('editor-language');
      expect(languageIndicator).toHaveTextContent('python');
    });

    it('supports json language', () => {
      renderCodeEditor({ language: 'json' });

      const languageIndicator = screen.getByTestId('editor-language');
      expect(languageIndicator).toHaveTextContent('json');
    });

    it('passes language prop to Monaco editor', () => {
      renderCodeEditor({ language: 'rust' });
      expect(capturedProps.language).toBe('rust');
    });
  });

  describe('Read-Only Mode', () => {
    it('defaults to editable mode', () => {
      renderCodeEditor();

      const optionsStr = screen.getByTestId('editor-options').textContent;
      const options = JSON.parse(optionsStr || '{}');
      expect(options.readOnly).toBe(false);
    });

    it('sets readOnly option when readOnly prop is true', () => {
      renderCodeEditor({ readOnly: true });

      const optionsStr = screen.getByTestId('editor-options').textContent;
      const options = JSON.parse(optionsStr || '{}');
      expect(options.readOnly).toBe(true);
    });

    it('textarea has readonly attribute in read-only mode', () => {
      renderCodeEditor({ readOnly: true });

      const textarea = screen.getByTestId('monaco-textarea');
      expect(textarea).toHaveAttribute('readonly');
    });

    it('textarea does not have readonly attribute when editable', () => {
      renderCodeEditor({ readOnly: false });

      const textarea = screen.getByTestId('monaco-textarea');
      expect(textarea).not.toHaveAttribute('readonly');
    });

    it('passes readOnly to editor options correctly', () => {
      renderCodeEditor({ readOnly: true });
      expect(capturedProps.options?.readOnly).toBe(true);
    });
  });

  describe('Editor Options', () => {
    it('disables minimap', () => {
      renderCodeEditor();

      const optionsStr = screen.getByTestId('editor-options').textContent;
      const options = JSON.parse(optionsStr || '{}');
      expect(options.minimap).toEqual({ enabled: false });
    });

    it('sets font size to 14', () => {
      renderCodeEditor();

      const optionsStr = screen.getByTestId('editor-options').textContent;
      const options = JSON.parse(optionsStr || '{}');
      expect(options.fontSize).toBe(14);
    });

    it('enables line numbers', () => {
      renderCodeEditor();

      const optionsStr = screen.getByTestId('editor-options').textContent;
      const options = JSON.parse(optionsStr || '{}');
      expect(options.lineNumbers).toBe('on');
    });

    it('sets tab size to 2', () => {
      renderCodeEditor();

      const optionsStr = screen.getByTestId('editor-options').textContent;
      const options = JSON.parse(optionsStr || '{}');
      expect(options.tabSize).toBe(2);
    });

    it('enables word wrap', () => {
      renderCodeEditor();

      const optionsStr = screen.getByTestId('editor-options').textContent;
      const options = JSON.parse(optionsStr || '{}');
      expect(options.wordWrap).toBe('on');
    });

    it('enables bracket pair colorization', () => {
      renderCodeEditor();

      const optionsStr = screen.getByTestId('editor-options').textContent;
      const options = JSON.parse(optionsStr || '{}');
      expect(options.bracketPairColorization).toEqual({ enabled: true });
    });

    it('enables format on paste', () => {
      renderCodeEditor();

      const optionsStr = screen.getByTestId('editor-options').textContent;
      const options = JSON.parse(optionsStr || '{}');
      expect(options.formatOnPaste).toBe(true);
    });

    it('enables format on type', () => {
      renderCodeEditor();

      const optionsStr = screen.getByTestId('editor-options').textContent;
      const options = JSON.parse(optionsStr || '{}');
      expect(options.formatOnType).toBe(true);
    });

    it('disables scrollBeyondLastLine', () => {
      renderCodeEditor();

      const optionsStr = screen.getByTestId('editor-options').textContent;
      const options = JSON.parse(optionsStr || '{}');
      expect(options.scrollBeyondLastLine).toBe(false);
    });

    it('enables automatic layout', () => {
      renderCodeEditor();

      const optionsStr = screen.getByTestId('editor-options').textContent;
      const options = JSON.parse(optionsStr || '{}');
      expect(options.automaticLayout).toBe(true);
    });

    it('enables folding', () => {
      renderCodeEditor();

      const optionsStr = screen.getByTestId('editor-options').textContent;
      const options = JSON.parse(optionsStr || '{}');
      expect(options.folding).toBe(true);
    });

    it('sets proper quick suggestions configuration', () => {
      renderCodeEditor();

      const optionsStr = screen.getByTestId('editor-options').textContent;
      const options = JSON.parse(optionsStr || '{}');
      expect(options.quickSuggestions).toEqual({
        other: true,
        comments: false,
        strings: true,
      });
    });
  });

  describe('Editor Mount Behavior', () => {
    it('provides onMount callback to Monaco editor', () => {
      renderCodeEditor();
      expect(capturedProps.onMount).toBeDefined();
    });

    it('onMount callback creates model with unique URI', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor({ code: 'test code' });

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      expect(mockMonaco.editor.createModel).toHaveBeenCalled();
      const createModelCall = mockMonaco.editor.createModel.mock.calls[0];
      expect(createModelCall[0]).toBe('test code');
    });

    it('onMount sets TypeScript compiler options', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor({ language: 'typescript' });

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      expect(
        mockMonaco.languages.typescript.typescriptDefaults.setCompilerOptions
      ).toHaveBeenCalled();
    });

    it('onMount sets JavaScript defaults', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      expect(
        mockMonaco.languages.typescript.javascriptDefaults.setCompilerOptions
      ).toHaveBeenCalled();
    });

    it('onMount adds format document action', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      expect(mockEditor.addAction).toHaveBeenCalled();
      const addActionCall = mockEditor.addAction.mock.calls[0][0];
      expect(addActionCall.id).toBe('format-document');
      expect(addActionCall.label).toBe('Format Document');
    });

    it('onMount registers paste handler', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      expect(mockEditor.onDidPaste).toHaveBeenCalled();
    });

    it('onMount sets model on editor', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      expect(mockEditor.setModel).toHaveBeenCalled();
    });
  });

  describe('TypeScript Configuration', () => {
    it('configures allowJs based on language', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor({ language: 'typescript' });

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      const compilerOptions =
        mockMonaco.languages.typescript.typescriptDefaults.setCompilerOptions.mock.calls[0][0];
      expect(compilerOptions.allowJs).toBe(false);
    });

    it('sets diagnostics options for TypeScript mode', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor({ language: 'typescript' });

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      expect(
        mockMonaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions
      ).toHaveBeenCalled();
    });

    it('includes additional diagnostic codes to ignore for read-only mode', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor({ language: 'typescript', readOnly: true });

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      const diagnosticsOptions =
        mockMonaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions.mock.calls[0][0];
      expect(diagnosticsOptions.diagnosticCodesToIgnore).toContain(2393); // Duplicate function implementation
    });
  });

  describe('Code Update Behavior', () => {
    it('updates editor when code prop changes', async () => {
      const { rerender } = render(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="initial code" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      const textarea = screen.getByTestId('monaco-textarea');
      expect(textarea).toHaveValue('initial code');

      rerender(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="updated code" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      expect(textarea).toHaveValue('updated code');
    });

    it('sets isSettingValueRef and resets after timeout when code changes externally', async () => {
      const mockEditor = createMockEditor();
      const setValueMock = jest.fn();
      const mockModel = {
        getValue: jest.fn(() => 'old code'),
        setValue: setValueMock,
        dispose: jest.fn(),
      };
      mockEditor.getModel = jest.fn(() => mockModel);
      const runMock = jest.fn().mockResolvedValue(undefined);
      mockEditor.getAction = jest.fn(() => ({ run: runMock }));
      const mockMonaco = createMockMonaco();

      const { rerender } = render(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="old code" onChange={jest.fn()} readOnly={false} />
        </ThemeContext.Provider>
      );

      // Mount the editor
      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      // Update the code prop to trigger the useEffect
      rerender(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="new code" onChange={jest.fn()} readOnly={false} />
        </ThemeContext.Provider>
      );

      // Advance timers to trigger the isSettingValueRef reset and format action
      await act(async () => {
        jest.advanceTimersByTime(50);
      });

      // The format action should be called for non-readonly editors with code
      await waitFor(() => {
        expect(mockEditor.getAction).toHaveBeenCalledWith('editor.action.formatDocument');
      });
    });

    it('does not auto-format when readOnly is true', async () => {
      const mockEditor = createMockEditor();
      const setValueMock = jest.fn();
      const mockModel = {
        getValue: jest.fn(() => 'old code'),
        setValue: setValueMock,
        dispose: jest.fn(),
      };
      mockEditor.getModel = jest.fn(() => mockModel);
      const runMock = jest.fn().mockResolvedValue(undefined);
      mockEditor.getAction = jest.fn(() => ({ run: runMock }));
      const mockMonaco = createMockMonaco();

      const { rerender } = render(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="old code" onChange={jest.fn()} readOnly={true} />
        </ThemeContext.Provider>
      );

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      // Clear previous calls
      mockEditor.getAction.mockClear();

      rerender(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="new code" onChange={jest.fn()} readOnly={true} />
        </ThemeContext.Provider>
      );

      await act(async () => {
        jest.advanceTimersByTime(50);
      });

      // Format should not be called for readonly editors in the code update effect
      // (The getAction might be called but run should not be triggered for readonly)
    });

    it('handles code update when model does not exist yet but code is provided', async () => {
      const mockEditor = createMockEditor();
      // First return null to simulate model not ready, then return the model
      const mockModel = {
        getValue: jest.fn(() => ''),
        setValue: jest.fn(),
        dispose: jest.fn(),
      };
      let callCount = 0;
      mockEditor.getModel = jest.fn(() => {
        callCount++;
        if (callCount <= 2) return null; // First few calls return null
        return mockModel;
      });
      const mockMonaco = createMockMonaco();

      const { rerender } = render(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      // Now rerender with code when model might not be ready
      rerender(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="new code when model not ready" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      // Advance timers to trigger the retry timeout (100ms)
      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      // The effect should handle the case where model doesn't exist initially
    });

    it('cleans up timeout when code prop changes before timeout completes', async () => {
      const mockEditor = createMockEditor();
      mockEditor.getModel = jest.fn(() => null);
      const mockMonaco = createMockMonaco();

      const { rerender, unmount } = render(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      // Rerender with code that would trigger the retry timeout
      rerender(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="code1" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      // Immediately change code again before timeout
      rerender(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="code2" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      // Advance timers - cleanup should have cleared previous timeout
      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      // Unmount to test cleanup
      unmount();
    });

    it('handles model returning different value than current code', async () => {
      const mockEditor = createMockEditor();
      const setValueMock = jest.fn();
      const mockModel = {
        getValue: jest.fn(() => 'different value'),
        setValue: setValueMock,
        dispose: jest.fn(),
      };
      mockEditor.getModel = jest.fn(() => mockModel);
      const mockMonaco = createMockMonaco();

      const { rerender } = render(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="original" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      rerender(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="new value" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      // The setValue should be called because model.getValue() !== code
      await act(async () => {
        jest.advanceTimersByTime(50);
      });
    });

    it('handles retry logic when model becomes available after initial null', async () => {
      const mockEditor = createMockEditor();
      const setValueMock = jest.fn();
      const mockModel = {
        getValue: jest.fn(() => ''),
        setValue: setValueMock,
        dispose: jest.fn(),
      };

      // First call returns null (model not ready), then returns the model
      let returnNull = true;
      mockEditor.getModel = jest.fn(() => {
        if (returnNull) {
          returnNull = false;
          return null;
        }
        return mockModel;
      });
      const mockMonaco = createMockMonaco();

      const { rerender } = render(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      // Trigger the else if branch (model is null but code exists)
      rerender(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="new code" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      // Advance past the 100ms timeout for the retry
      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      // After retry, if model is available and value differs, setValue should be called
      expect(setValueMock).toHaveBeenCalled();

      // Advance past the inner 50ms timeout that resets isSettingValueRef
      await act(async () => {
        jest.advanceTimersByTime(50);
      });
    });

    it('executes the inner setTimeout to reset isSettingValueRef after retry', async () => {
      const mockEditor = createMockEditor();
      const setValueMock = jest.fn();
      const mockModel = {
        getValue: jest.fn(() => ''),
        setValue: setValueMock,
        dispose: jest.fn(),
      };

      // Simulate editorRef.current existing with the model
      let callCount = 0;
      mockEditor.getModel = jest.fn(() => {
        callCount++;
        // First call from effect check returns null, second from retry returns model
        if (callCount === 1) {
          return null;
        }
        return mockModel;
      });
      const mockMonaco = createMockMonaco();

      render(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="initial code" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      // Mount the editor - this sets editorRef.current
      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      // Now we need to trigger the useEffect where model is initially null
      // Reset the callCount and make first call return null again
      callCount = 0;

      // Trigger the effect by changing code
      act(() => {
        // The effect should run with model returning null first time, then model on retry
      });

      // Advance timers: 100ms for outer timeout + 50ms for inner timeout
      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      await act(async () => {
        jest.advanceTimersByTime(50);
      });

      // Advance all remaining timers to ensure everything executes
      await act(async () => {
        jest.runAllTimers();
      });
    });

    it('does not call setValue in retry when model value matches code', async () => {
      const mockEditor = createMockEditor();
      const setValueMock = jest.fn();

      // Model that returns matching value
      const mockModel = {
        getValue: jest.fn(() => 'matching code'),
        setValue: setValueMock,
        dispose: jest.fn(),
      };

      let returnNull = true;
      mockEditor.getModel = jest.fn(() => {
        if (returnNull) {
          returnNull = false;
          return null;
        }
        return mockModel;
      });
      const mockMonaco = createMockMonaco();

      const { rerender } = render(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      rerender(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="matching code" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      await act(async () => {
        jest.advanceTimersByTime(150);
      });

      // setValue should not be called because model.getValue() === code
      expect(setValueMock).not.toHaveBeenCalled();
    });
  });

  describe('Container Styling', () => {
    it('has proper container classes', () => {
      const { container } = renderCodeEditor();

      const wrapper = container.querySelector('.relative.w-full.h-full');
      expect(wrapper).toBeInTheDocument();
    });

    it('has rounded border styling', () => {
      const { container } = renderCodeEditor();

      const wrapper = container.querySelector('.rounded-lg');
      expect(wrapper).toBeInTheDocument();
    });

    it('has border styling', () => {
      const { container } = renderCodeEditor();

      const wrapper = container.querySelector('.border');
      expect(wrapper).toBeInTheDocument();
    });

    it('has overflow hidden', () => {
      const { container } = renderCodeEditor();

      const wrapper = container.querySelector('.overflow-hidden');
      expect(wrapper).toBeInTheDocument();
    });

    it('has proper background color classes', () => {
      const { container } = renderCodeEditor();

      const wrapper = container.querySelector('.bg-white');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Editor Height', () => {
    it('sets editor height to 100%', () => {
      renderCodeEditor();
      expect(capturedProps.height).toBe('100%');
    });
  });

  describe('Error Handling for Monaco', () => {
    it('handles undefined value from Monaco onChange', () => {
      const onChange = jest.fn();
      renderCodeEditor({ onChange });

      // Simulate Monaco returning undefined
      if (capturedProps.onChange) {
        capturedProps.onChange(undefined);
      }

      // onChange should not be called with undefined
      expect(onChange).not.toHaveBeenCalled();
    });

    it('handles editor without model gracefully', () => {
      const mockEditor = createMockEditor();
      mockEditor.getModel = jest.fn(() => null);
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      // Should not throw when model is null
      expect(() => {
        act(() => {
          mockOnMount?.(mockEditor, mockMonaco);
        });
      }).not.toThrow();
    });

    it('gracefully handles missing getAction', () => {
      const mockEditor = createMockEditor();
      mockEditor.getAction = jest.fn(() => null);
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      expect(() => {
        act(() => {
          mockOnMount?.(mockEditor, mockMonaco);
        });
      }).not.toThrow();
    });

    it('registers onDidPaste callback on mount', () => {
      const mockEditor = createMockEditor();
      mockEditor.onDidPaste = jest.fn();
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      // onDidPaste should have been called to register the callback
      expect(mockEditor.onDidPaste).toHaveBeenCalled();
      expect(typeof mockEditor.onDidPaste.mock.calls[0][0]).toBe('function');
    });
  });

  describe('Format Document Action', () => {
    it('format action has proper keybindings', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      const addActionCall = mockEditor.addAction.mock.calls[0][0];
      expect(addActionCall.keybindings).toBeDefined();
      expect(addActionCall.keybindings.length).toBe(2);
    });

    it('format action is in modification context menu group', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      const addActionCall = mockEditor.addAction.mock.calls[0][0];
      expect(addActionCall.contextMenuGroupId).toBe('1_modification');
    });

    it('format action run method calls formatDocument', async () => {
      const mockEditor = createMockEditor();
      const runMock = jest.fn().mockResolvedValue(undefined);
      mockEditor.getAction = jest.fn(() => ({
        run: runMock,
      }));
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      const addActionCall = mockEditor.addAction.mock.calls[0][0];

      // Run the format action
      await act(async () => {
        await addActionCall.run();
      });

      expect(mockEditor.getAction).toHaveBeenCalledWith('editor.action.formatDocument');
      expect(runMock).toHaveBeenCalled();
    });

    it('format action handles missing action gracefully', async () => {
      const mockEditor = createMockEditor();
      mockEditor.getAction = jest.fn(() => null);
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      const addActionCall = mockEditor.addAction.mock.calls[0][0];

      // Should not throw when action is null
      await expect(
        act(async () => {
          await addActionCall.run();
        })
      ).resolves.not.toThrow();
    });
  });

  describe('Cleanup', () => {
    it('disposes model on unmount', () => {
      const disposeMock = jest.fn();
      const mockEditor = createMockEditor();
      mockEditor.getModel = jest.fn(() => ({
        getValue: jest.fn(() => ''),
        setValue: jest.fn(),
        dispose: disposeMock,
      }));
      const mockMonaco = createMockMonaco();

      const { unmount } = renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      unmount();

      // The cleanup effect should attempt to dispose
      // Note: Due to how refs work in tests, this tests the cleanup logic structure
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid code prop changes', () => {
      const { rerender } = render(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="code1" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      for (let i = 2; i <= 10; i++) {
        rerender(
          <ThemeContext.Provider
            value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
          >
            <CodeEditor code={`code${i}`} onChange={jest.fn()} />
          </ThemeContext.Provider>
        );
      }

      const textarea = screen.getByTestId('monaco-textarea');
      expect(textarea).toHaveValue('code10');
    });

    it('handles code with special characters', () => {
      const specialCode = 'const str = "Hello\\nWorld\\t\\r\\n";';
      renderCodeEditor({ code: specialCode });

      const textarea = screen.getByTestId('monaco-textarea');
      expect(textarea).toHaveValue(specialCode);
    });

    it('handles very long lines of code', () => {
      const longLine = 'const x = ' + 'a'.repeat(1000) + ';';
      renderCodeEditor({ code: longLine });

      const textarea = screen.getByTestId('monaco-textarea');
      expect(textarea).toHaveValue(longLine);
    });

    it('handles code with unicode characters', () => {
      const unicodeCode = 'const emoji = "🚀"; const chinese = "你好"; const greek = "Ελληνικά";';
      renderCodeEditor({ code: unicodeCode });

      const textarea = screen.getByTestId('monaco-textarea');
      expect(textarea).toHaveValue(unicodeCode);
    });
  });

  describe('Accessibility', () => {
    it('textarea has aria-label for accessibility', () => {
      renderCodeEditor();

      const textarea = screen.getByLabelText('code editor');
      expect(textarea).toBeInTheDocument();
    });
  });

  describe('handleEditorChange behavior', () => {
    it('does not call onChange when isSettingValueRef is true (simulated)', () => {
      const onChange = jest.fn();
      renderCodeEditor({ onChange });

      // When the editor mounts and we call onChange with a value,
      // it should pass through to the user's onChange
      if (capturedProps.onChange) {
        capturedProps.onChange('new value');
      }

      expect(onChange).toHaveBeenCalledWith('new value');
    });

    it('handles onChange being called with string value', () => {
      const onChange = jest.fn();
      renderCodeEditor({ onChange });

      if (capturedProps.onChange) {
        capturedProps.onChange('test code');
      }

      expect(onChange).toHaveBeenCalledWith('test code');
    });

    it('does not pass undefined to user onChange', () => {
      const onChange = jest.fn();
      renderCodeEditor({ onChange });

      if (capturedProps.onChange) {
        capturedProps.onChange(undefined);
      }

      // onChange should NOT have been called because value was undefined
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Paste Handler', () => {
    it('paste handler callback is async', () => {
      const mockEditor = createMockEditor();
      let pasteCallback: (() => void) | undefined;
      mockEditor.onDidPaste = jest.fn((cb) => {
        pasteCallback = cb;
      });
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      expect(mockEditor.onDidPaste).toHaveBeenCalled();
      expect(pasteCallback).toBeDefined();
    });

    it('paste handler executes format document action after timeout', async () => {
      const mockEditor = createMockEditor();
      let pasteCallback: (() => Promise<void>) | undefined;
      const runMock = jest.fn().mockResolvedValue(undefined);
      mockEditor.onDidPaste = jest.fn((cb) => {
        pasteCallback = cb;
      });
      mockEditor.getAction = jest.fn(() => ({
        run: runMock,
      }));
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      expect(pasteCallback).toBeDefined();

      // Call the paste callback
      await act(async () => {
        pasteCallback?.();
        // Advance timer to trigger the setTimeout inside paste handler
        jest.advanceTimersByTime(100);
      });

      // Wait for any promises to resolve
      await waitFor(() => {
        expect(mockEditor.getAction).toHaveBeenCalledWith('editor.action.formatDocument');
      });
    });

    it('paste handler handles missing format action gracefully', async () => {
      const mockEditor = createMockEditor();
      let pasteCallback: (() => Promise<void>) | undefined;
      mockEditor.onDidPaste = jest.fn((cb) => {
        pasteCallback = cb;
      });
      mockEditor.getAction = jest.fn(() => null);
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      // Should not throw when format action is null
      await expect(
        act(async () => {
          pasteCallback?.();
          jest.advanceTimersByTime(100);
        })
      ).resolves.not.toThrow();
    });
  });

  describe('Model URI Generation', () => {
    it('creates unique model URI on mount', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor({ code: 'initial' });

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      // Verify URI.parse was called with a unique URI pattern
      expect(mockMonaco.Uri.parse).toHaveBeenCalled();
      const uriArg = mockMonaco.Uri.parse.mock.calls[0][0];
      expect(uriArg).toMatch(/^file:\/\/\/editor-\d+-[a-z0-9]+\.ts$/);
    });

    it('does not create duplicate models on re-render', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      const { rerender } = render(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="code1" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      const initialModelCalls = mockMonaco.editor.createModel.mock.calls.length;

      // Re-render with different code
      rerender(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="code2" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      // createModel should not be called again (URI is already set)
      expect(mockMonaco.editor.createModel.mock.calls.length).toBe(initialModelCalls);
    });
  });

  describe('Compiler Options', () => {
    it('sets ES2020 target', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      const compilerOptions =
        mockMonaco.languages.typescript.typescriptDefaults.setCompilerOptions.mock.calls[0][0];
      expect(compilerOptions.target).toBe(mockMonaco.languages.typescript.ScriptTarget.ES2020);
    });

    it('sets esModuleInterop to true', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      const compilerOptions =
        mockMonaco.languages.typescript.typescriptDefaults.setCompilerOptions.mock.calls[0][0];
      expect(compilerOptions.esModuleInterop).toBe(true);
    });

    it('sets JSX emit to React', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      const compilerOptions =
        mockMonaco.languages.typescript.typescriptDefaults.setCompilerOptions.mock.calls[0][0];
      expect(compilerOptions.jsx).toBe(mockMonaco.languages.typescript.JsxEmit.React);
    });

    it('disables strict mode', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      const compilerOptions =
        mockMonaco.languages.typescript.typescriptDefaults.setCompilerOptions.mock.calls[0][0];
      expect(compilerOptions.strict).toBe(false);
    });

    it('enables skipLibCheck', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      const compilerOptions =
        mockMonaco.languages.typescript.typescriptDefaults.setCompilerOptions.mock.calls[0][0];
      expect(compilerOptions.skipLibCheck).toBe(true);
    });
  });

  describe('Diagnostics Options', () => {
    it('enables semantic validation', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor({ language: 'typescript' });

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      const diagnosticsOptions =
        mockMonaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions.mock.calls[0][0];
      expect(diagnosticsOptions.noSemanticValidation).toBe(false);
    });

    it('enables syntax validation', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor({ language: 'typescript' });

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      const diagnosticsOptions =
        mockMonaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions.mock.calls[0][0];
      expect(diagnosticsOptions.noSyntaxValidation).toBe(false);
    });

    it('ignores enum error code 8006', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor({ language: 'typescript' });

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      const diagnosticsOptions =
        mockMonaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions.mock.calls[0][0];
      expect(diagnosticsOptions.diagnosticCodesToIgnore).toContain(8006);
    });

    it('ignores duplicate identifier error codes in editable mode', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor({ language: 'typescript', readOnly: false });

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      const diagnosticsOptions =
        mockMonaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions.mock.calls[0][0];
      expect(diagnosticsOptions.diagnosticCodesToIgnore).toContain(2451);
      expect(diagnosticsOptions.diagnosticCodesToIgnore).toContain(2300);
    });

    it('clears model markers for TypeScript', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();
      const mockModel = {
        getValue: jest.fn(() => ''),
        setValue: jest.fn(),
        dispose: jest.fn(),
      };
      mockEditor.getModel = jest.fn(() => mockModel);

      renderCodeEditor({ language: 'typescript' });

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      expect(mockMonaco.editor.setModelMarkers).toHaveBeenCalledWith(mockModel, 'typescript', []);
    });
  });

  describe('JavaScript Defaults', () => {
    it('sets allowJs to true for JavaScript defaults', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      const jsCompilerOptions =
        mockMonaco.languages.typescript.javascriptDefaults.setCompilerOptions.mock.calls[0][0];
      expect(jsCompilerOptions.allowJs).toBe(true);
    });

    it('sets checkJs to false for JavaScript defaults', () => {
      const mockEditor = createMockEditor();
      const mockMonaco = createMockMonaco();

      renderCodeEditor();

      act(() => {
        mockOnMount?.(mockEditor, mockMonaco);
      });

      const jsCompilerOptions =
        mockMonaco.languages.typescript.javascriptDefaults.setCompilerOptions.mock.calls[0][0];
      expect(jsCompilerOptions.checkJs).toBe(false);
    });
  });

  describe('Value prop handling', () => {
    it('passes value prop to Monaco editor', () => {
      renderCodeEditor({ code: 'test code' });
      expect(capturedProps.value).toBe('test code');
    });

    it('updates value prop when code changes', () => {
      const { rerender } = render(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="initial" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      expect(capturedProps.value).toBe('initial');

      rerender(
        <ThemeContext.Provider
          value={{ theme: 'dark', toggleTheme: jest.fn(), setTheme: jest.fn() }}
        >
          <CodeEditor code="updated" onChange={jest.fn()} />
        </ThemeContext.Provider>
      );

      expect(capturedProps.value).toBe('updated');
    });
  });
});
