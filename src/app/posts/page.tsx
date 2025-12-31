import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Posts",
  description: "Where I share thoughts, life, and more.",
};

export default function PostsPage() {
  const posts = getAllPosts();
  const postsByYear = posts.reduce<Record<string, typeof posts>>(
    (grouped, post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(post);
      return grouped;
    },
    {},
  );
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="space-y-12 min-h-screen max-w-2xl mx-auto">
      <div className="space-y-3" id="archive">
        <h1 className="text-3xl font-semibold md:text-4xl">Posts</h1>
        <p className="text-base text-muted-foreground">
          Where i share thoughts, life, and more.
        </p>
      </div>

      <div className="space-y-16">
        {years.map((year) => (
          <section key={year} className="relative">
            <div className="pointer-events-none absolute -top-6 left-0 -z-10 text-[4.5rem] font-semibold leading-none text-foreground/5 md:text-[6rem]">
              {year}
            </div>
            <div className="space-y-5">
              {postsByYear[year].map((post) => (
                <article key={post.slug} className="space-y-2">
                  <div className="flex md:flex-row flex-col flex-wrap items-baseline gap-3">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-lg font-medium text-foreground transition-colors hover:text-muted-foreground"
                    >
                      {post.title}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {post.formattedDate} · {post.readingTime}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
