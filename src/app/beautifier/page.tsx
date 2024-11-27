"use client";

import { useRef, useState } from "react";
import Editor from "./editor.client";
import MenuBar from "./menu-bar";
import { fonts, themes } from "./options";

function Page() {
  const [fontStyle, setFontStyle] = useState("jetBrainsMono");
  const [fontSize, setFontSize] = useState<string>("16px"); // Keep font size as string
  const [theme, setTheme] = useState("ice");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const reff = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("");

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleFontChange = (newFont: string) => {
    setFontStyle(newFont);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  return (
    <div className="flex flex-col h-[100vh] justify-center items-center">
      <link rel="stylesheet" href={themes[theme].theme || ""} />
      <link
        rel="stylesheet"
        href={fonts[fontStyle]?.src}
        crossOrigin="anonymous"
      />
      <div>
        <Editor
          fontStyle={fontStyle}
          fontSize={fontSize.toString()}
          language={language}
          code={code}
          title={title}
          onChangeCode={handleCodeChange}
          onChangeTitle={handleTitleChange}
        />
      </div>
      <div className="absolute top-[80%] z-10">
        <MenuBar
          fontStyle={fontStyle}
          language={language}
          onFontChange={handleFontChange}
          onLanguageChange={handleLanguageChange}
          reff={reff}
          fontSize={fontSize}
          onFontSizeChange={(font) => setFontSize(font)} // Keep it as string
          theme={theme}
          onThemeChange={handleThemeChange}
        />
      </div>
    </div>
  );
}

export default Page;
