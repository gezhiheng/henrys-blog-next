/* eslint-disable next/no-img-element, react-refresh/only-export-components */
import type { PostMeta } from '@/lib/posts'
import { Buffer } from 'node:buffer'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { ImageResponse } from '@vercel/og'
import { cache } from 'react'
import { siteConfig } from '@/lib/site'

export const SOCIAL_CARD_SIZE = {
  width: 1200,
  height: 630,
} as const

export const SOCIAL_CARD_CONTENT_TYPE = 'image/png'

interface HomeSocialCardOptions {
  description: string
  latestPosts: Pick<PostMeta, 'title' | 'description' | 'formattedDate'>[]
  title: string
  variant: 'home'
}

interface PostSocialCardOptions {
  date: string
  description: string
  readingTime?: string
  title: string
  variant: 'post'
}

type SocialCardOptions = HomeSocialCardOptions | PostSocialCardOptions

const siteDisplayUrl = siteConfig.url.includes('localhost')
  ? 'henryge.com'
  : siteConfig.url.replace(/^https?:\/\//, '')

function renderDotPattern() {
  const rows = 18
  const columns = 30
  const dots = []

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      dots.push(
        <div
          key={`${row}-${column}`}
          style={{
            backgroundColor: 'rgba(36, 45, 56, 0.16)',
            borderRadius: '9999px',
            display: 'flex',
            height: 4,
            left: `${(column / (columns - 1)) * 100}%`,
            position: 'absolute',
            top: `${(row / (rows - 1)) * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: 4,
          }}
        />,
      )
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        inset: 0,
        position: 'absolute',
      }}
    >
      {dots}
    </div>
  )
}

const getAvatarDataUri = cache(async () => {
  const avatarPath = path.join(process.cwd(), 'public', 'avatar.svg')
  const avatarSvg = await fs.readFile(avatarPath, 'utf8')
  const avatarBase64 = Buffer.from(avatarSvg).toString('base64')

  return `data:image/svg+xml;base64,${avatarBase64}`
})

function getCardTitleSize(title: string) {
  if (title.length > 32) {
    return 64
  }

  if (title.length > 20) {
    return 76
  }

  return 88
}

function getCardDescriptionSize(description: string) {
  return description.length > 90 ? 27 : 31
}

function trimCopy(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`
}

function renderTopNav() {
  return (
    <div
      style={{
        alignItems: 'center',
        color: 'rgba(33, 42, 52, 0.7)',
        display: 'flex',
        fontSize: 18,
        gap: 22,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}
    >
      <div>Home</div>
      <div>Posts</div>
      <div>X</div>
      <div>GitHub</div>
    </div>
  )
}

function renderHomeSection(
  latestPosts: Pick<PostMeta, 'title' | 'description' | 'formattedDate'>[],
  description: string,
  title: string,
  avatarDataUri: string,
) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: 20,
          }}
        >
          <div
            style={{
              color: '#171A20',
              display: 'flex',
              fontFamily: 'serif',
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {title}
          </div>
          <img
            alt='Henry Ge avatar'
            height='84'
            src={avatarDataUri}
            style={{
              border: '2px solid rgba(36, 45, 56, 0.12)',
              borderRadius: '9999px',
            }}
            width='84'
          />
        </div>

        <div
          style={{
            color: '#676E77',
            display: 'flex',
            flexDirection: 'column',
            fontSize: 29,
            gap: 12,
            lineHeight: 1.45,
            maxWidth: 820,
          }}
        >
          <div>Hey! 我是葛智恒，A.K.A. Henry Ge，一名前端开发工程师。</div>
          <div>{description}</div>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid rgba(36, 45, 56, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          paddingTop: 28,
        }}
      >
        <div
          style={{
            color: '#171A20',
            display: 'flex',
            fontFamily: 'serif',
            fontSize: 42,
            fontWeight: 700,
          }}
        >
          最近
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            width: '100%',
          }}
        >
          {latestPosts.slice(0, 2).map(post => (
            <div
              key={post.title}
              style={{
                display: 'flex',
                gap: 28,
                minWidth: 0,
                width: '100%',
              }}
            >
              <div
                style={{
                  color: '#8A9097',
                  display: 'flex',
                  fontSize: 20,
                  letterSpacing: '0.02em',
                  minWidth: 170,
                }}
              >
                {post.formattedDate}
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'column',
                  gap: 6,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    color: '#171A20',
                    display: 'flex',
                    fontSize: 30,
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  {trimCopy(post.title, 40)}
                </div>
                <div
                  style={{
                    color: '#6D737B',
                    display: 'flex',
                    fontSize: 20,
                    lineHeight: 1.35,
                  }}
                >
                  {trimCopy(post.description, 72)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function renderPostSection(
  date: string,
  description: string,
  readingTime: string | undefined,
  title: string,
  avatarDataUri: string,
) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 26,
        }}
      >
        <div
          style={{
            alignItems: 'center',
            color: '#7A8088',
            display: 'flex',
            fontSize: 20,
            gap: 14,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          <div>Post</div>
          <div
            style={{
              backgroundColor: 'rgba(36, 45, 56, 0.14)',
              borderRadius: 999,
              display: 'flex',
              height: 6,
              width: 6,
            }}
          />
          <div>Henry's Blog</div>
        </div>

        <div
          style={{
            color: '#171A20',
            display: 'flex',
            fontFamily: 'serif',
            fontSize: getCardTitleSize(title),
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.02,
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: '#656C75',
            display: 'flex',
            fontSize: getCardDescriptionSize(description),
            lineHeight: 1.4,
            maxWidth: 880,
          }}
        >
          {trimCopy(description, 120)}
        </div>
      </div>

      <div
        style={{
          alignItems: 'flex-end',
          borderTop: '1px solid rgba(36, 45, 56, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 26,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div
            style={{
              color: '#171A20',
              display: 'flex',
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {date}
            {readingTime ? ` / ${readingTime}` : ''}
          </div>
          <div
            style={{
              color: '#7A8189',
              display: 'flex',
              fontSize: 18,
            }}
          >
            Henry's Blog
          </div>
        </div>

        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: 16,
          }}
        >
          <div
            style={{
              alignItems: 'flex-end',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              minWidth: 230,
            }}
          >
            <div
              style={{
                color: '#171A20',
                display: 'flex',
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              Henry Ge
            </div>
            <div
              style={{
                color: '#7A8189',
                display: 'flex',
                fontSize: 18,
              }}
            >
              {siteDisplayUrl}
            </div>
          </div>
          <img
            alt='Henry Ge avatar'
            height='80'
            src={avatarDataUri}
            style={{
              border: '2px solid rgba(36, 45, 56, 0.12)',
              borderRadius: '9999px',
            }}
            width='80'
          />
        </div>
      </div>
    </div>
  )
}

async function renderSocialCard(options: SocialCardOptions) {
  const avatarDataUri = await getAvatarDataUri()

  return (
    <div
      style={{
        backgroundColor: '#F6F3ED',
        display: 'flex',
        height: '100%',
        padding: '38px 48px',
        position: 'relative',
        width: '100%',
      }}
    >
      {renderDotPattern()}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          margin: '0 auto',
          maxWidth: 930,
          padding: '8px 0 0',
          position: 'relative',
          width: '100%',
          zIndex: 1,
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 42,
          }}
        >
          <div
            style={{
              color: '#252C35',
              display: 'flex',
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: '0.06em',
            }}
          >
            HENRY GE
          </div>
          {renderTopNav()}
        </div>

        <div
          style={{
            display: 'flex',
            flex: 1,
          }}
        >
          {options.variant === 'home'
            ? renderHomeSection(
                options.latestPosts,
                options.description,
                options.title,
                avatarDataUri,
              )
            : renderPostSection(
                options.date,
                options.description,
                options.readingTime,
                options.title,
                avatarDataUri,
              )}
        </div>
      </div>
    </div>
  )
}

export async function createSocialCardImage(options: SocialCardOptions) {
  const card = await renderSocialCard(options)

  return new ImageResponse(card, {
    ...SOCIAL_CARD_SIZE,
  })
}
