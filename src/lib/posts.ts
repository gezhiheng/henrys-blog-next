import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import { visit } from 'unist-util-visit'
import { formatDate, formatReadingTime } from '@/lib/format'

export interface PostFrontmatter {
  title: string
  description: string
  date: string
  tags?: string[]
}

export type PostMeta = PostFrontmatter & {
  slug: string
  readingTime: string
  formattedDate: string
}

export type Post = PostMeta & {
  content: string
  contentHtml: string
}

const postsDirectory = path.join(process.cwd(), 'content')

function getPostFilePaths() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  return fs
    .readdirSync(postsDirectory)
    .filter(fileName => fileName.endsWith('.md'))
}

function getSlugFromFileName(fileName: string) {
  return fileName.replace(/\.md$/, '')
}

function rehypeImageDefaults() {
  return (tree: unknown) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'img') {
        return
      }

      node.properties = {
        ...node.properties,
        loading: 'lazy',
        decoding: 'async',
        className: ['post-image'],
      }
    })
  }
}

export function getAllPosts(): PostMeta[] {
  const fileNames = getPostFilePaths()

  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const slug = getSlugFromFileName(fileName)
    const stats = readingTime(content)

    return {
      slug,
      title: String(data.title),
      description: String(data.description),
      date: String(data.date),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      readingTime: formatReadingTime(stats.minutes),
      formattedDate: formatDate(String(data.date)),
    }
  })

  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getPostBySlug(slug: string): Post | null {
  const normalizedSlug = decodeURIComponent(slug).replace(/\.md$/, '')
  const fullPath = path.join(postsDirectory, `${normalizedSlug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const stats = readingTime(content)

  const processedContent = remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        className: ['heading-anchor'],
      },
    })
    .use(rehypeImageDefaults)
    .use(rehypeStringify)
    .processSync(content)
    .toString()

  return {
    slug: normalizedSlug,
    title: String(data.title),
    description: String(data.description),
    date: String(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTime: formatReadingTime(stats.minutes),
    formattedDate: formatDate(String(data.date)),
    content,
    contentHtml: processedContent,
  }
}
