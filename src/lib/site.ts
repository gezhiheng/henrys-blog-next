import process from 'node:process'

const PRODUCTION_SITE_URL = 'https://henryge.com'

function normalizeSiteUrl(value?: string) {
  if (!value) {
    return undefined
  }

  const withProtocol = value.startsWith('http://') || value.startsWith('https://')
    ? value
    : `https://${value}`

  return withProtocol.replace(/\/$/, '')
}

const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
  ?? normalizeSiteUrl(process.env.SITE_URL)
  ?? (
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : PRODUCTION_SITE_URL
  )

export const siteConfig = {
  name: 'Henry Ge',
  title: 'Henry Ge',
  description:
    'Hey!我是葛智恒 A.K.A. Henry Ge',
  url: siteUrl,
  author: 'Henry',
  twitterHandle: '@h3nryge',
  links: {
    twitter: 'https://x.com/h3nryge',
    github: 'https://github.com/gezhiheng',
  },
}
