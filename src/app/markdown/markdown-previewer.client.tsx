"use client";

import React, { useState, useRef, ChangeEvent } from "react";
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

// Define types for code component props
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function MarkdownPreviewer() {
  // Default markdown content with type annotation
  const defaultMarkdown = `# Hello, Markdown!

This is a live preview with syntax highlighting.

## Features

- Real-time preview
- Supports all Markdown syntax
- Styled output
- Syntax highlighting for code blocks

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);

function example() {
  return "This is a syntax highlighted code block";
}
\`\`\`

> This is a blockquote.

[Learn more about Markdown](https://www.markdownguide.org/)`;

  const [markdown, setMarkdown] = useState<string>(defaultMarkdown);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (text: string): void => {
    if (textareaRef.current) {
      const { selectionStart, selectionEnd } = textareaRef.current;
      const newMarkdown =
        markdown.substring(0, selectionStart) +
        text +
        markdown.substring(selectionEnd);

      setMarkdown(newMarkdown);

      requestAnimationFrame(() => {
        if (textareaRef.current) {
          const newCursorPosition = selectionStart + text.length;
          textareaRef.current.setSelectionRange(
            newCursorPosition,
            newCursorPosition
          );
          textareaRef.current.focus();
        }
      });
    }
  };

  const handleMarkdownChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMarkdown(e.target.value);
  };

  const components: Components = {
    code({ node, inline, className, children, ...props }: CodeProps) {
      const match = className ? /language-(\w+)/.exec(className) : null;

      if (inline || !match) {
        return (
          <code {...props} className={className}>
            {children}
          </code>
        );
      }

      return (
        <SyntaxHighlighter
          {...props}
          language={match[1]}
          style={vscDarkPlus}
          wrapLongLines
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
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
              onChange={handleMarkdownChange}
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

export default MarkdownPreviewer;
