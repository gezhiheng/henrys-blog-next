"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpenText,
  FolderKanban,
  Home,
  Github,
  Twitter,
  Moon,
  Sun,
} from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <header
      className={`sticky top-0 z-20 transition-colors duration-300 ${
        isScrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-2xl items-center justify-end px-6 py-3 md:px-0">
        <nav className="flex items-center gap-2 md:gap-3">
          <Link
            href="/"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Home"
          >
            <Home className="h-4.5 w-4.5" />
          </Link>
          <Link
            href="/posts"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Blog"
          >
            <BookOpenText className="h-4.5 w-4.5" />
          </Link>
          <Link
            href="/projects"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Projects"
          >
            <FolderKanban className="h-4.5 w-4.5" />
          </Link>
          <Link
            href={siteConfig.links.github}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Github"
          >
            <Github className="h-4.5 w-4.5" />
          </Link>
          <Link
            href={siteConfig.links.twitter}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Twitter"
          >
            <Twitter className="h-4.5 w-4.5" />
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? (
              <Sun className="h-4.5 w-4.5" />
            ) : (
              <Moon className="h-4.5 w-4.5" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
