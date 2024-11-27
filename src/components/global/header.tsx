import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";
import ToggleTheme from "../ui/toggle-theme";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div
        className="container flex items-center justify-between px-4 md:px-6 max-w-7xl mx-auto h-14"
        // className="max-w-7xl mx-auto flex h-14 items-center justify-between"
      >
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">DevKit</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="https:://github.com/mnsdojo/devkit"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            <Github />
          </Link>
          <ToggleTheme />
        </nav>
      </div>
    </header>
  );
}

export default Header;
