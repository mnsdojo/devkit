"use client";

import React, { useState, useCallback } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism-tomorrow.css";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Download, Clipboard, ArrowRight } from "lucide-react";
import { convertJsonToTypescript } from "./converter";

function Json2Typescript() {
  const [jsonInput, setJsonInput] = useState<string>(
    '{\n  "name": "John Doe",\n  "age": 30,\n  "isStudent": false\n}'
  );
  const [typescriptOutput, setTypescriptOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const downloadTypescript = useCallback(() => {
    if (!typescriptOutput) return;

    try {
      const blob = new Blob([typescriptOutput], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "types.ts";
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
      setError("Failed to download file");
    }
  }, [typescriptOutput]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(typescriptOutput);
    } catch (err) {
      console.error("Copy failed", err);
      setError("Failed to copy to clipboard");
    }
  }, [typescriptOutput]);

  const handleConvert = useCallback(() => {
    try {
      setError(null);


      setTypescriptOutput("Something went wrong....");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";

      console.error(err);
      setError(`Conversion failed: ${errorMessage}`);
      setTypescriptOutput("");
    }
  }, [jsonInput]);

  // Custom highlighting function for TypeScript
  const highlightTypeScript = (code: string) => {
    return highlight(code, languages.typescript, "typescript")
      .replace(
        /\b(interface|string|number|boolean)\b/g,
        '<span class="token keyword">$1</span>'
      )
      .replace(
        /(\w+)(?=\s*[?]?\s*:)/g,
        '<span class="token property">$1</span>'
      );
  };

  return (
    <Card className="max-w-3xl mx-auto w-full p-6">
      <CardHeader>
        <CardTitle>JSON2TypeScript</CardTitle>
        <CardDescription>
          Paste your JSON here and see it transform to TypeScript interfaces
        </CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

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
                backgroundColor: "#2d2d2d",
                color: "#ccc",
                borderRadius: "0.375rem",
                minHeight: "300px",
              }}
              className="border border-gray-700"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">TypeScript Output</h2>
            <Editor
              value={typescriptOutput}
              onValueChange={setTypescriptOutput}
              highlight={highlightTypeScript}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                backgroundColor: "#2d2d2d",
                color: "#ccc",
                borderRadius: "0.375rem",
                minHeight: "300px",
              }}
              className="border border-gray-700"
              readOnly
            />
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button onClick={handleConvert}>
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
