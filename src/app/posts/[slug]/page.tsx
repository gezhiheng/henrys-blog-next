import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BackLink from '@/components/back-link'
import PostImageLightbox from '@/components/post-image-lightbox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { generateSocialMetadata, getPostSocialImagePath } from '@/lib/social-metadata'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {}
  }

  const socialMetadata = generateSocialMetadata({
    title: post.title,
    description: post.description,
    image: post.image ?? getPostSocialImagePath(post.slug),
    url: `/posts/${post.slug}`,
    type: 'article',
  })

  return socialMetadata.metadata
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>{post.formattedDate}</span>
          <span aria-hidden>•</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="text-3xl font-semibold md:text-4xl">{post.title}</h1>
        <p className="text-lg text-muted-foreground">{post.description}</p>
        {post && post.tags && post.tags.length > 0
          ? (
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>
            )
          : null}
      </header>

      <Separator />

      <div
        id="post-content"
        className="prose"
        dangerouslySetInnerHTML={{
          __html: post.contentHtml.trim() ? post.contentHtml : post.content,
        }}
      />
      <PostImageLightbox containerId="post-content" />

      <BackLink
        fallbackHref="/posts"
        className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
        label="> cd .."
        ariaLabel="返回"
      />
    </article>
  )
}
