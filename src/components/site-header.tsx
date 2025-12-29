import Link from "next/link";
import { BookOpenText, FolderKanban, Home, Github, Twitter } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="top-0 z-20">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-end px-6 py-3">
        <nav className="flex items-center gap-3 md:gap-6">
          <Link
            href="/"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Home"
          >
            <Home className="h-5 w-5" />
          </Link>
          <Link
            href="/posts"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Blog"
          >
            <BookOpenText className="h-5 w-5" />
          </Link>
          <Link
            href="/projects"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Projects"
          >
            <FolderKanban className="h-5 w-5" />
          </Link>
          <Link
            href={siteConfig.links.github}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Github"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href={siteConfig.links.twitter}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
