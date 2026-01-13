import process from 'node:process'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const siteConfig = {
  name: 'Henry Ge',
  title: 'Henry Ge',
  description:
    'Hey!我是葛智恒 A.K.A. Henry Ge',
  url: siteUrl,
  author: 'Henry',
  links: {
    twitter: 'https://x.com/h3nryge',
    github: 'https://github.com/gezhiheng',
  },
}
