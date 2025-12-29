import PostCard from "@/components/post-card";
import { Separator } from "@/components/ui/separator";
import { getAllPosts } from "../../lib/posts";

export const metadata = {
  title: "Posts",
  description: "Where I share thoughts, life, and more.",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-10">
      <div className="space-y-4" id="archive">
        <h1 className="text-3xl font-semibold md:text-4xl">Posts</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Where I share thoughts, life, and more.
        </p>
      </div>

      <Separator />

      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
