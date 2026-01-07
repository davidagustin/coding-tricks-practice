'use client';

import { useEffect, useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language?: string;
  readOnly?: boolean;
}

export default function CodeEditor({ code, onChange, language = 'typescript', readOnly = false }: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Configure TypeScript/JavaScript settings
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
      typeRoots: ['node_modules/@types'],
    });

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
    if (value !== undefined) {
      onChange(value);
    }
  };

  // Format code when it changes externally (e.g., when showing solution)
  useEffect(() => {
    if (editorRef.current && code !== editorRef.current.getValue()) {
      editorRef.current.setValue(code);
      // Auto-format after setting value
      setTimeout(async () => {
        await editorRef.current?.getAction('editor.action.formatDocument')?.run();
      }, 100);
    }
  }, [code]);

  return (
    <div className="relative w-full h-full rounded-lg border border-gray-700 overflow-hidden">
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
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
          <div className="flex items-center justify-center h-full bg-[#1e1e1e] text-gray-400">
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
