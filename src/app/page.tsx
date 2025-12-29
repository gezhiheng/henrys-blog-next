import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { getAllPosts } from "../lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="mx-auto max-w-2xl space-y-12">
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-3xl font-semibold md:text-4xl">
            Henry Ge
          </h1>
          <Image
            src="/avatar.svg"
            alt="Henry Ge avatar"
            width={44}
            height={44}
            className="rounded-full border border-border/60"
            priority
          />
        </div>
        <p className="text-base text-muted-foreground md:text-lg">
          Hey! 我是葛智恒，A.K.A. Henry Ge，一名前端开发工程师。
        </p>
        <p className="text-base text-muted-foreground md:text-lg">
          目前工作中主要使用 Vue 及其周边工具链，偶尔参与开源。做过 Java 开发，也曾在创业公司独立负责过项目。最近对 React / Next.js 感兴趣，正在系统学习中。
        </p>
        <p className="text-base text-muted-foreground md:text-lg">
          我一直以来的观念是「不给自己设限」，所以有什么感兴趣的技术都会接触。比如曾经学过一段时间 Rust，很喜欢它明确语义的设计哲学和优雅的错误处理。
        </p>
        <p className="text-base text-muted-foreground md:text-lg">
          代码之外和工作之余，我喜欢打游戏、追番、阅读、打篮球、看球赛和弹尤克里里。喜欢的书包括《只是为了好玩》、《哈利·波特》和《明朝那些事儿》。另外我还是斯蒂芬库里和金州勇士的忠实球迷，Let&apos;s go Warriors!
        </p>
        <p className="text-base text-muted-foreground md:text-lg">
          现在的人生目标是找到一个真正热爱的方向，长期深耕，同时也不牺牲对生活本身的享受。对我来说，在离开世界之前，一切都只是过程。
        </p>
      </section>

      <Separator />

      <section className="space-y-6" id="archive">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">最近</h2>
          </div>
          <Link
            href="/posts"
            className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
          >
            查看全部
          </Link>
        </div>
        <div className="space-y-5">
          {latestPosts.map((post) => (
            <article key={post.slug} className="space-y-2">
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
                <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  {post.formattedDate}
                </span>
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-lg font-semibold text-foreground transition-colors hover:text-muted-foreground"
                >
                  {post.title}
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                {post.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
