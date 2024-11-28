"use client";

import { useState, useCallback } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Copy, Check } from "lucide-react";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
    } catch (err) {
      setError("Invalid JSON: " + (err as Error).message);
      setOutput("");
    }
  }, [input]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [output]);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>JSON Formatter</CardTitle>
        <CardDescription>
          Paste your JSON and click format to prettify it
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-md">
          <Editor
            value={input}
            onValueChange={setInput}
            highlight={(code) => highlight(code, languages.json, "json")}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              minHeight: "200px",
            }}
          />
        </div>
        <Button onClick={formatJson} className="w-full">
          Format JSON
        </Button>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {output && (
          <div className="relative">
            <div className="border rounded-md">
              <Editor
                value={output}
                onValueChange={() => {}}
                highlight={(code) => highlight(code, languages.json, "json")}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  minHeight: "200px",
                }}
                readOnly={true}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Part of the DevKit Toolkit
      </CardFooter>
    </Card>
  );
}
