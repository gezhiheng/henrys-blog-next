import type { MetadataRoute } from 'next'
import { getAllPosts } from '../lib/posts'
import { siteConfig } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/posts`,
      lastModified: new Date(),
    },
    ...posts.map((post) => ({
      url: `${siteConfig.url}/posts/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ]
}
