"use client";
import { useState, useRef } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MarkDownToolbar from "./markdown-toolbar";

export function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(
    '# Hello, Markdown!\n\nThis is a live preview with syntax highlighting.\n\n## Features\n\n- Real-time preview\n- Supports all Markdown syntax\n- Styled output\n- Syntax highlighting for code blocks\n\n```javascript\nconst greeting = "Hello, World!";\nconsole.log(greeting);\n\nfunction example() {\n return "This is a syntax highlighted code block";\n}\n```\n\n> This is a blockquote.\n\n[Learn more about Markdown](https://www.markdownguide.org/)'
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (text: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newMarkdown =
        markdown.substring(0, start) + text + markdown.substring(end);
      setMarkdown(newMarkdown);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart =
            textareaRef.current.selectionEnd = start + text.length;
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  const components: any = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          language={match[1]}
          style={vscDarkPlus}
          wrapLongLines
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Markdown Previewer</CardTitle>
        <CardDescription>
          Use the toolbar to format your Markdown, or write it directly in the
          text area
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <MarkDownToolbar onInsert={insertMarkdown} />
            <Textarea
              ref={textareaRef}
              placeholder="Write your Markdown here..."
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="min-h-[500px] font-mono"
            />
          </div>
          <ScrollArea className="h-[500px] w-full rounded-md border p-4">
            <div className="markdown-preview">
              <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
