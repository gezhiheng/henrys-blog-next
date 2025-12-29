import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PostMeta } from "../lib/posts";

type PostCardProps = {
  post: PostMeta;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="group relative overflow-hidden border-border/60 bg-card/60 p-6 transition-shadow hover:shadow-[0_10px_30px_rgba(15,15,15,0.08)]">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>{post.formattedDate}</span>
          <span aria-hidden>•</span>
          <span>{post.readingTime}</span>
        </div>
        <Link href={`/posts/${post.slug}`} className="text-xl font-semibold">
          <span className="absolute inset-0" aria-hidden />
          {post.title}
        </Link>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {post.description}
        </p>
        {post.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
