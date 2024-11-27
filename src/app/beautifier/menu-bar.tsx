"use client";

import React, { RefObject } from "react";
import { toJpeg } from "html-to-image";
import { fonts, languages } from "./options";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CameraIcon, GithubIcon } from "lucide-react";
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MenuBarProps {
  fontStyle: string;
  language: string;
  theme: string;
  fontSize: string;
  onFontChange: (newFont: string) => void;
  onLanguageChange: (newLanguage: string) => void;
  onThemeChange: (newTheme: string) => void;
  onFontSizeChange: (newFontSize: string) => void;
  reff: RefObject<HTMLDivElement>;
  onGithubClick?: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({
  fontStyle,
  language,
  fontSize,
  onFontChange,
  onLanguageChange,
  onThemeChange,
  onFontSizeChange,
  reff,
  onGithubClick,
}) => {
  const handleExport = async () => {
    const node = reff.current;
    if (!node) return;
    try {
      const url = await toJpeg(node, {
        quality: 0.95,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.href = url;
      link.download = `code-snippet-${new Date()
        .toISOString()
        .slice(0, 10)}.jpeg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Snippet exported successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to export image. Please try again.");
    }
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-[90%] md:max-w-[700px] z-20">
        <div className="bg-white dark:bg-[#1a1a1a] shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-800 p-3 flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-2">
            {/* Font Selector */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Select onValueChange={onFontChange} value={fontStyle}>
                    <SelectTrigger className="w-[120px] border-none hover:bg-gray-100 dark:hover:bg-gray-700">
                      <SelectValue
                        placeholder={fonts[fontStyle]?.name || "Font"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(fonts).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TooltipTrigger>
              <TooltipContent>Select Font</TooltipContent>
            </Tooltip>

            {/* Font Size Selector */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Select onValueChange={onFontSizeChange} value={fontSize}>
                    <SelectTrigger className="w-[100px] border-none hover:bg-gray-100 dark:hover:bg-gray-700">
                      <SelectValue placeholder={fontSize || "Size"} />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "12px",
                        "14px",
                        "16px",
                        "18px",
                        "20px",
                        "24px",
                        "28px",
                      ].map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TooltipTrigger>
              <TooltipContent>Select Font Size</TooltipContent>
            </Tooltip>

            {/* Language Selector */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Select onValueChange={onLanguageChange} value={language}>
                    <SelectTrigger className="w-[120px] border-none hover:bg-gray-100 dark:hover:bg-gray-700">
                      <SelectValue placeholder={"Language"} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(languages).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TooltipTrigger>
              <TooltipContent>Select Language</TooltipContent>
            </Tooltip>
            {/* Theme Selector
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Select onValueChange={onThemeChange} value={theme}>
                    <SelectTrigger className="w-[120px] border-none hover:bg-gray-100 dark:hover:bg-gray-700">
                      <SelectValue
                        placeholder={themes[theme]?.name || "Theme"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(themes).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TooltipTrigger>
              <TooltipContent>Select Theme</TooltipContent>
            </Tooltip> */}
          </div>

          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleExport}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <CameraIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Export Snippet</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onGithubClick}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <GithubIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>GitHub Repository</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MenuBar;
