'use client';

import Editor, { type OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language?: string;
  readOnly?: boolean;
}

export default function CodeEditor({
  code,
  onChange,
  language = 'typescript',
  readOnly = false,
}: CodeEditorProps) {
  const { theme } = useTheme();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const isSettingValueRef = useRef(false); // Track when we're programmatically setting value
  const modelUriRef = useRef<string | null>(null); // Store unique URI for this editor instance

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Create a unique model URI for this editor instance to prevent conflicts
    // This ensures each editor has its own isolated TypeScript language service context
    if (!modelUriRef.current) {
      const uniqueId = `file:///editor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.ts`;
      modelUriRef.current = uniqueId;

      // Create a new model with the unique URI to isolate it from other editors
      // Use the current code value (which should be set by the time editor mounts)
      const model = monaco.editor.createModel(code || '', language, monaco.Uri.parse(uniqueId));
      editor.setModel(model);
    }

    // Configure TypeScript/JavaScript settings
    // IMPORTANT: Set allowJs to false when language is 'typescript' to prevent enum errors
    const isTypeScript = language === 'typescript';

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: !isTypeScript, // Don't allow JS when TS is expected
      typeRoots: ['node_modules/@types'],
      // Enable enum support
      preserveConstEnums: false,
      // Allow all TypeScript features
      strict: false,
      // Ensure TypeScript syntax is allowed
      skipLibCheck: true,
    });

    // Configure JavaScript defaults separately
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      allowJs: true,
      checkJs: false,
    });

    // Set diagnostics options to suppress enum errors when in TypeScript mode
    if (isTypeScript) {
      // Configure diagnostics - ignore duplicate function errors for read-only solution editors
      const diagnosticCodesToIgnore = [
        8006, // Ignore "enum declarations can only be used in TypeScript files"
        2451, // Ignore "Cannot redeclare block-scoped variable" (for isolated editors)
        2300, // Ignore "Duplicate identifier" (for isolated editors)
      ];

      if (readOnly) {
        // For solution editors, also ignore duplicate function implementation errors
        // since they share the TypeScript language service with the main editor
        diagnosticCodesToIgnore.push(
          2393, // Ignore "Duplicate function implementation"
          2300 // Ignore "Duplicate identifier"
        );
      }

      // Create isolated diagnostics options for this editor instance
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
        noSuggestionDiagnostics: false,
        diagnosticCodesToIgnore,
      });

      // Set model-specific diagnostics to ensure isolation
      const model = editor.getModel();
      if (model) {
        // Enable validation but with isolated context
        monaco.editor.setModelMarkers(model, 'typescript', []);
      }
    }

    // Enable auto-formatting
    editor.addAction({
      id: 'format-document',
      label: 'Format Document',
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK,
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF,
      ],
      contextMenuGroupId: '1_modification',
      contextMenuOrder: 1.5,
      run: async () => {
        await editor.getAction('editor.action.formatDocument')?.run();
      },
    });

    // Format on paste
    editor.onDidPaste(async () => {
      setTimeout(async () => {
        await editor.getAction('editor.action.formatDocument')?.run();
      }, 100);
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    // Don't trigger onChange if we're programmatically setting the value
    if (value !== undefined && !isSettingValueRef.current) {
      onChange(value);
    }
  };

  // Update code when it changes externally (e.g., when starter code loads or showing solution)
  useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        const currentValue = model.getValue();
        // Only update if the code has actually changed
        if (code !== currentValue) {
          isSettingValueRef.current = true; // Mark that we're setting value programmatically
          model.setValue(code || '');
          // Reset flag after a brief delay to allow Monaco to process the change
          setTimeout(() => {
            isSettingValueRef.current = false;
            // Auto-format after setting value (only if not read-only)
            if (!readOnly && code && code.trim()) {
              editorRef.current?.getAction('editor.action.formatDocument')?.run();
            }
          }, 50);
        }
      } else if (code) {
        // If model doesn't exist yet but we have code, wait a bit and try again
        // This handles the case where code is set before editor mounts
        const timeoutId = setTimeout(() => {
          const model = editorRef.current?.getModel();
          if (model && model.getValue() !== code) {
            isSettingValueRef.current = true;
            model.setValue(code);
            setTimeout(() => {
              isSettingValueRef.current = false;
            }, 50);
          }
        }, 100);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [code, readOnly]);

  // Cleanup: dispose of the model when component unmounts
  useEffect(() => {
    return () => {
      if (editorRef.current && modelUriRef.current) {
        const model = editorRef.current.getModel();
        if (model) {
          model.dispose();
        }
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme={theme === 'dark' ? 'vs-dark' : 'vs'}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          formatOnPaste: true,
          formatOnType: true,
          autoIndent: 'full',
          bracketPairColorization: { enabled: true },
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: 'on',
          tabCompletion: 'on',
          quickSuggestions: {
            other: true,
            comments: false,
            strings: true,
          },
          suggestSelection: 'first',
          snippetSuggestions: 'top',
          renderWhitespace: 'selection',
          showFoldingControls: 'always',
          folding: true,
          foldingStrategy: 'indentation',
          matchBrackets: 'always',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          fontFamily: 'var(--font-geist-mono), "Fira Code", "Cascadia Code", "Consolas", monospace',
          fontLigatures: true,
        }}
        loading={
          <div className="flex items-center justify-center h-full bg-white dark:bg-[#1e1e1e] text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              <span>Loading editor...</span>
            </div>
          </div>
        }
      />
    </div>
  );
}
