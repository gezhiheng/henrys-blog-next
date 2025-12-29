import { siteConfig } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mx-auto flex w-full flex-col gap-4 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
      <p className="w-full text-center">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </p>
    </footer>
  );
}
