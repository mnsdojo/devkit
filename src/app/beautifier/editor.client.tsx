"use client";
import CodeEditor from "react-simple-code-editor";
import { fonts } from "./options";
import hljs from "highlight.js";

interface EditorProps {
  fontStyle: string;
  fontSize: string;
  language: string;
  code: string;
  title: string;
  onChangeCode: (newCode: string) => void;
  onChangeTitle: (newTitle: string) => void;
}

function Editor({
  fontStyle,
  fontSize,
  language,
  code,
  title,
  onChangeCode,
  onChangeTitle,
}: EditorProps) {
  return (
    <div
      className={`shadow-2xl rounded-xl min-w-[600px] border-gray-800 dark:border-white/20 border-2 `}
    >
      <header className="grid grid-cols-6 gap-3 items-center py-3 px-4">
        <div className="flex gap-1.5">
          <div className="rounded-full h-3 w-3 bg-red-500 hover:bg-red-600 cursor-pointer"></div>
          <div className="rounded-full h-3 w-3 bg-yellow-500 hover:bg-yellow-600 cursor-pointer"></div>
          <div className="rounded-full h-3 w-3 bg-green-500 hover:bg-green-600 cursor-pointer"></div>
        </div>
        <div className="col-span-4 flex justify-center">
          <input
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
            type="text"
            placeholder="Untitled Snippet"
            className="bg-transparent text-zinc-900 dark:text-white/70 text-center focus:ring-0 focus:outline-none text-xl font-semibold w-full"
            maxLength={50}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => navigator.clipboard.writeText(code)}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors"
            title="Copy Code"
          >
            📋
          </button>
        </div>
      </header>
      <div className="px-4 pb-4">
        <CodeEditor
          value={code}
          onValueChange={onChangeCode}
          style={{
            fontFamily: fonts[fontStyle]?.name || fonts.monospace.name,
            fontSize: fontSize,
            lineHeight: "1.5",
          }}
          textareaClassName="bg-transparent text-white/70 focus:outline-none"
          preClassName="bg-transparent"
          highlight={(code) =>
            hljs.highlight(code, {
              language: language,
            }).value
          }
        />
      </div>
    </div>
  );
}

export default Editor;
