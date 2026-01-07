'use client';

import { useState, useEffect } from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language?: string;
  readOnly?: boolean;
}

export default function CodeEditor({ code, onChange, language = 'typescript', readOnly = false }: CodeEditorProps) {
  const [value, setValue] = useState(code);

  useEffect(() => {
    setValue(code);
  }, [code]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="relative w-full h-full">
      <textarea
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
        className={`w-full h-full p-4 font-mono text-sm bg-[#1e1e1e] text-[#d4d4d4] rounded-lg border border-gray-700 resize-none ${
          readOnly 
            ? 'cursor-default opacity-75' 
            : 'focus:outline-none focus:ring-2 focus:ring-blue-500'
        }`}
        style={{
          fontFamily: 'var(--font-geist-mono), monospace',
          tabSize: 2,
        }}
        spellCheck={false}
        placeholder={readOnly ? "Solution code (read-only)" : "Write your code here..."}
      />
      <style jsx>{`
        textarea {
          scrollbar-width: thin;
          scrollbar-color: #555 #1e1e1e;
        }
        textarea::-webkit-scrollbar {
          width: 8px;
        }
        textarea::-webkit-scrollbar-track {
          background: #1e1e1e;
        }
        textarea::-webkit-scrollbar-thumb {
          background: #555;
          border-radius: 4px;
        }
        textarea::-webkit-scrollbar-thumb:hover {
          background: #666;
        }
      `}</style>
    </div>
  );
}
