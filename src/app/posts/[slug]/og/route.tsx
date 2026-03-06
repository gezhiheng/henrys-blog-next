/* eslint-disable react-refresh/only-export-components */
import { getPostBySlug } from '@/lib/posts'
import {
  createSocialCardImage,
  SOCIAL_CARD_CONTENT_TYPE,
  SOCIAL_CARD_SIZE,
} from '@/lib/social-card'

export const runtime = 'nodejs'
export const contentType = SOCIAL_CARD_CONTENT_TYPE
export const size = SOCIAL_CARD_SIZE

interface PostOgRouteProps {
  params: Promise<{
    slug: string
  }>
}

export async function GET(_request: Request, { params }: PostOgRouteProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return new Response('Not found', { status: 404 })
  }

  return createSocialCardImage({
    variant: 'post',
    title: post.title,
    description: post.description,
    date: post.formattedDate,
    readingTime: post.readingTime,
  })
}
