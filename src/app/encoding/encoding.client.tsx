"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    setError(null);
    if (mode === "encode") {
      try {
        setOutput(btoa(input));
      } catch (e) {
        console.log(e);
        setError(
          "Error encoding the input. Make sure it contains valid characters."
        );
      }
    } else {
      try {
        setOutput(atob(input));
      } catch (e) {
        console.log(e);
        setError(
          "Error decoding the input. Make sure it's a valid Base64 string."
        );
      }
    }
  };

  const handleSwitch = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Base64 Encoder/Decoder</CardTitle>
        <CardDescription>
          {mode === "encode"
            ? "Convert text to Base64"
            : "Convert Base64 to text"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input">Input</Label>
          <Textarea
            id="input"
            placeholder={
              mode === "encode"
                ? "Enter text to encode"
                : "Enter Base64 to decode"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
          />
        </div>
        <div className="flex justify-between">
          <Button onClick={handleConvert}>
            {mode === "encode" ? "Encode" : "Decode"}
          </Button>
          <Button variant="outline" onClick={handleSwitch}>
            Switch to {mode === "encode" ? "Decode" : "Encode"}
          </Button>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="space-y-2">
          <Label htmlFor="output">Output</Label>
          <Textarea id="output" value={output} readOnly rows={5} />
        </div>
      </CardContent>
    </Card>
  );
}
