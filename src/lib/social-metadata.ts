import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site'

export const DEFAULT_SOCIAL_IMAGE_PATH = '/og'

export interface GenerateSocialMetadataOptions {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  siteName?: string
  twitterHandle?: string
}

export const DEFAULT_METADATA = {
  title: 'Henry\'s Blog',
  description: 'Notes about software engineering, life and technology',
  image: DEFAULT_SOCIAL_IMAGE_PATH,
  siteName: 'Henry Ge',
  type: 'website',
} as const satisfies Required<Pick<
  GenerateSocialMetadataOptions,
  'title' | 'description' | 'image' | 'siteName' | 'type'
>>

export const DEFAULT_SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const

interface SocialMetaTagAttributes {
  content: string
  name?: string
  property?: string
}

interface SocialLinkTagAttributes {
  href: string
  rel: 'canonical'
}

interface SocialMetaTag {
  tag: 'meta'
  key: string
  attributes: SocialMetaTagAttributes
}

interface SocialLinkTag {
  tag: 'link'
  key: string
  attributes: SocialLinkTagAttributes
}

export type SocialMetadataTag = SocialMetaTag | SocialLinkTag

export interface ResolvedSocialMetadata {
  title: string
  description: string
  image: string
  url: string
  type: 'website' | 'article'
  siteName: string
  twitterHandle?: string
  imageWidth: number
  imageHeight: number
}

export interface SocialMetadataResult {
  resolved: ResolvedSocialMetadata
  metadata: Metadata
  tags: SocialMetadataTag[]
}

export function getPostSocialImagePath(slug: string) {
  return `/posts/${encodeURIComponent(slug)}/og`
}

function toAbsoluteUrl(value: string) {
  return new URL(value, siteConfig.url).toString()
}

function normalizeTwitterHandle(value?: string) {
  if (!value) {
    return undefined
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    const pathname = new URL(value).pathname.replace(/^\/+/, '')
    const handle = pathname.split('/')[0]

    return handle ? `@${handle}` : undefined
  }

  return value.startsWith('@') ? value : `@${value}`
}

function buildNextMetadata(resolved: ResolvedSocialMetadata): Metadata {
  return {
    title: resolved.title,
    description: resolved.description,
    alternates: {
      canonical: resolved.url,
    },
    openGraph: {
      type: resolved.type,
      title: resolved.title,
      description: resolved.description,
      url: resolved.url,
      siteName: resolved.siteName,
      images: [
        {
          url: resolved.image,
          width: resolved.imageWidth,
          height: resolved.imageHeight,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolved.title,
      description: resolved.description,
      images: [
        {
          url: resolved.image,
          width: resolved.imageWidth,
          height: resolved.imageHeight,
        },
      ],
      site: resolved.twitterHandle,
      creator: resolved.twitterHandle,
    },
  }
}

function buildTags(resolved: ResolvedSocialMetadata): SocialMetadataTag[] {
  return [
    {
      tag: 'meta',
      key: 'description',
      attributes: {
        name: 'description',
        content: resolved.description,
      },
    },
    {
      tag: 'link',
      key: 'canonical',
      attributes: {
        rel: 'canonical',
        href: resolved.url,
      },
    },
    {
      tag: 'meta',
      key: 'og:type',
      attributes: {
        property: 'og:type',
        content: resolved.type,
      },
    },
    {
      tag: 'meta',
      key: 'og:title',
      attributes: {
        property: 'og:title',
        content: resolved.title,
      },
    },
    {
      tag: 'meta',
      key: 'og:description',
      attributes: {
        property: 'og:description',
        content: resolved.description,
      },
    },
    {
      tag: 'meta',
      key: 'og:image',
      attributes: {
        property: 'og:image',
        content: resolved.image,
      },
    },
    {
      tag: 'meta',
      key: 'og:url',
      attributes: {
        property: 'og:url',
        content: resolved.url,
      },
    },
    {
      tag: 'meta',
      key: 'og:site_name',
      attributes: {
        property: 'og:site_name',
        content: resolved.siteName,
      },
    },
    {
      tag: 'meta',
      key: 'og:image:width',
      attributes: {
        property: 'og:image:width',
        content: String(resolved.imageWidth),
      },
    },
    {
      tag: 'meta',
      key: 'og:image:height',
      attributes: {
        property: 'og:image:height',
        content: String(resolved.imageHeight),
      },
    },
    {
      tag: 'meta',
      key: 'twitter:card',
      attributes: {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    },
    {
      tag: 'meta',
      key: 'twitter:title',
      attributes: {
        name: 'twitter:title',
        content: resolved.title,
      },
    },
    {
      tag: 'meta',
      key: 'twitter:description',
      attributes: {
        name: 'twitter:description',
        content: resolved.description,
      },
    },
    {
      tag: 'meta',
      key: 'twitter:image',
      attributes: {
        name: 'twitter:image',
        content: resolved.image,
      },
    },
    {
      tag: 'meta',
      key: 'twitter:site',
      attributes: {
        name: 'twitter:site',
        content: resolved.twitterHandle ?? '',
      },
    },
    {
      tag: 'meta',
      key: 'twitter:creator',
      attributes: {
        name: 'twitter:creator',
        content: resolved.twitterHandle ?? '',
      },
    },
    {
      tag: 'meta',
      key: 'twitter:image:width',
      attributes: {
        name: 'twitter:image:width',
        content: String(resolved.imageWidth),
      },
    },
    {
      tag: 'meta',
      key: 'twitter:image:height',
      attributes: {
        name: 'twitter:image:height',
        content: String(resolved.imageHeight),
      },
    },
  ]
}

export function generateSocialMetadata(
  options: GenerateSocialMetadataOptions = {},
): SocialMetadataResult {
  const resolved: ResolvedSocialMetadata = {
    title: options.title ?? DEFAULT_METADATA.title,
    description: options.description ?? DEFAULT_METADATA.description,
    image: toAbsoluteUrl(options.image ?? DEFAULT_METADATA.image),
    url: toAbsoluteUrl(options.url ?? siteConfig.url),
    type: options.type ?? DEFAULT_METADATA.type,
    siteName: options.siteName ?? DEFAULT_METADATA.siteName,
    twitterHandle: normalizeTwitterHandle(
      options.twitterHandle ?? siteConfig.twitterHandle ?? siteConfig.links.twitter,
    ),
    imageWidth: DEFAULT_SOCIAL_IMAGE_SIZE.width,
    imageHeight: DEFAULT_SOCIAL_IMAGE_SIZE.height,
  }

  return {
    resolved,
    metadata: buildNextMetadata(resolved),
    tags: buildTags(resolved),
  }
}
