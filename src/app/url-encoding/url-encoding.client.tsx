"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function URLEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isEncoding, setIsEncoding] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleEncodeDecode = () => {
    setError(null);
    try {
      if (isEncoding) {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (e) {
      console.error(e);
      setError(`Invalid input for ${isEncoding ? "encoding" : "decoding"}`);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          URL {isEncoding ? "Encoder" : "Decoder"}
        </h2>
        <div className="flex items-center space-x-2">
          <Switch
            id="encoding-mode"
            checked={isEncoding}
            onCheckedChange={setIsEncoding}
          />
          <Label htmlFor="encoding-mode">
            {isEncoding ? "Encoding" : "Decoding"}
          </Label>
        </div>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder={`Enter ${
            isEncoding ? "URL or text to encode" : "encoded URL to decode"
          }`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[100px]"
        />
        <div className="flex space-x-2">
          <Button onClick={handleEncodeDecode} className="flex-1">
            {isEncoding ? "Encode" : "Decode"}
          </Button>
          <Button onClick={handleClear} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>
        <Textarea
          placeholder="Result will appear here"
          value={output}
          readOnly
          className="min-h-[100px]"
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
