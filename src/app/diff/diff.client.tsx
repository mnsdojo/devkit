"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tokenize = (text: string, level: "word" | "char" | "line" = "word") => {
  switch (level) {
    case "char":
      return text.split("");
    case "line":
      return text.split("\n");
    case "word":
    default:
      return text.split(/\s+/).filter(Boolean);
  }
};

const getDiffs = (arr1: string[], arr2: string[]) => {
  const unique1 = arr1.filter((v) => !arr2.includes(v));
  const unique2 = arr2.filter((v) => !arr1.includes(v));
  const common = arr1.filter((v) => arr2.includes(v));

  return { unique1, unique2, common };
};

function DiffViewer() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [tokenizeLevel, setTokenizeLevel] = useState<"word" | "char" | "line">(
    "word"
  );
  const [diffResults, setDiffResults] = useState<{
    unique1: string[];
    unique2: string[];
    common: string[];
  }>({
    unique1: [],
    unique2: [],
    common: [],
  });

  const handleDiffText = () => {
    if (!text1.trim() || !text2.trim()) return;

    const token1 = tokenize(text1, tokenizeLevel);
    const token2 = tokenize(text2, tokenizeLevel);
    const diffs = getDiffs(token1, token2);

    setDiffResults(diffs);
  };

  return (
    <Card className="mx-auto max-w-3xl w-full">
      <CardHeader>
        <CardTitle>Text Diff Viewer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Textarea
              className="flex-1"
              value={text1}
              placeholder="Enter first text here"
              onChange={(e) => setText1(e.target.value)}
            />
            <Textarea
              className="flex-1"
              value={text2}
              placeholder="Enter second text to compare"
              onChange={(e) => setText2(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4">
            <Tabs
              value={tokenizeLevel}
              onValueChange={(value) =>
                setTokenizeLevel(value as "word" | "char" | "line")
              }
              className="w-full max-w-[300px]"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="word">Word</TabsTrigger>
                <TabsTrigger value="char">Char</TabsTrigger>
                <TabsTrigger value="line">Line</TabsTrigger>
              </TabsList>
            </Tabs>

            <Button onClick={handleDiffText} className="ml-auto">
              Compare
            </Button>
          </div>
        </div>

        <Tabs defaultValue="summary">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="unique1">Unique in Text 1</TabsTrigger>
            <TabsTrigger value="unique2">Unique in Text 2</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="space-y-2">
            <div>Common Elements: {diffResults.common.length}</div>
            <div>Unique in Text 1: {diffResults.unique1.length}</div>
            <div>Unique in Text 2: {diffResults.unique2.length}</div>
          </TabsContent>
          <TabsContent value="unique1">
            <div className=" p-4 rounded-md max-h-[200px] overflow-auto">
              {diffResults.unique1.join(", ") || "No unique elements"}
            </div>
          </TabsContent>
          <TabsContent value="unique2">
            <div className=" p-4 rounded-md max-h-[200px] overflow-auto">
              {diffResults.unique2.join(", ") || "No unique elements"}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default DiffViewer;
