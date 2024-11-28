import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Link,
} from "lucide-react";

import React from "react";

const tools = [
  { icon: Bold, markdown: "**Bold**" },
  { icon: Italic, markdown: "*Italic*" },
  { icon: List, markdown: "\n- List item" },
  { icon: ListOrdered, markdown: "\n1. Numbered item" },
  { icon: Quote, markdown: "\n> Blockquote" },
  { icon: Code, markdown: "`Code`" },
  { icon: Heading1, markdown: "\n# Heading 1" },
  { icon: Heading2, markdown: "\n## Heading 2" },
  { icon: Heading3, markdown: "\n### Heading 3" },
  { icon: Link, markdown: "[Link text](https://example.com)" },
];
interface MarkDownToolbarProps {
  onInsert: (markdown: string) => void;
}
function MarkDownToolbar({ onInsert }: MarkDownToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {tools.map((tool, index) => (
        <Button key={index} size="icon" onClick={() => onInsert(tool.markdown)}>
          <tool.icon className="w-4 h-4" />
        </Button>
      ))}
    </div>
  );
}

export default MarkDownToolbar;
