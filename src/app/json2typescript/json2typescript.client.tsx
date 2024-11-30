"use client";
import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism.css";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Download, Clipboard, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
function Json2Typescript() {
  const [jsonInput, setJsonInput] = useState(
    '{\n  "name": "John Doe",\n  "age": 30,\n  "isStudent": false\n}'
  );
  const [typescriptOutput, setTypescriptOutput] = useState("");

  const downloadTypescript = () => {
    const blob = new Blob([typescriptOutput], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "types.ts";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(typescriptOutput);
  };
  return (
    <Card className="max-w-3xl mx-auto w-full p-6">
      <CardHeader>
        <CardTitle>JSON2Typescript</CardTitle>
        <CardDescription>
          Paste your JSON here and see it transform to typescript
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">JSON Input</h2>
            <Editor
              value={jsonInput}
              onValueChange={setJsonInput}
              highlight={(code) => highlight(code, languages.json, "json")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                backgroundColor: "#f5f5f5",
                borderRadius: "0.375rem",
                minHeight: "300px",
              }}
              className="border border-gray-300"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">TypeScript Output</h2>
            <Editor
              value={typescriptOutput}
              onValueChange={setTypescriptOutput}
              highlight={(code) =>
                highlight(code, languages.typescript, "typescript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                backgroundColor: "#f5f5f5",
                borderRadius: "0.375rem",
                minHeight: "300px",
              }}
              className="border border-gray-300"
              readOnly
            />
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button>
            <ArrowRight className="mr-2 h-4 w-4" /> Convert
          </Button>
          <Button onClick={downloadTypescript} disabled={!typescriptOutput}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
          <Button onClick={copyToClipboard} disabled={!typescriptOutput}>
            <Clipboard className="mr-2 h-4 w-4" /> Copy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Json2Typescript;
