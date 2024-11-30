"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import Image from "next/image";

function SvgToClient() {
  const [svgInput, setSvgInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleConvert() {
    setError(null);
    setPngUrl(null);
    setLoading(true);
    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      } else if (svgInput) {
        const svgBlob = new Blob([svgInput], { type: "image/svg+xml" });
        formData.append("file", svgBlob, "input.svg");
      } else {
        throw new Error("Please provide an SVG file or SVG code");
      }
      const response = await fetch("/api/convert-svg-to-png", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Conversion failed");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPngUrl(url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>SVG to PNG Converter</CardTitle>
          <CardDescription>
            Convert SVG to PNG by uploading a file or pasting SVG code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="svg-file">Upload SVG File</Label>
            <Input
              id="svg-file"
              type="file"
              accept=".svg"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="svg-input">Or Paste SVG Code</Label>
            <Textarea
              id="svg-input"
              placeholder="Paste your SVG code here"
              value={svgInput}
              onChange={(e) => setSvgInput(e.target.value)}
              rows={10}
            />
          </div>
          <Button onClick={handleConvert} disabled={loading}>
            {loading ? "Converting..." : "Convert to PNG"}
          </Button>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {pngUrl && (
            <div className="space-y-2">
              <Label>Converted PNG</Label>
              <div className="relative w-full h-64">
                <Image
                  src={pngUrl}
                  alt="Converted PNG"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <Button asChild>
                <a href={pngUrl} download="converted.png">
                  Download PNG
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default SvgToClient;
