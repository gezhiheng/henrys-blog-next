import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Merriweather } from 'next/font/google'
import DotsBackground from '@/components/dots-background'
import SiteFooter from '@/components/site-footer'
import SiteHeader from '@/components/site-header'
import { siteConfig } from '@/lib/site'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const merriweather = Merriweather({
  variable: '--font-merriweather',
  weight: ['400', '700'],
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = storedTheme === "dark" || (!storedTheme && prefersDark) ? "dark" : "light";
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
})();`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${merriweather.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <div className="min-h-screen">
          <DotsBackground />
          <SiteHeader />
          <main className="mx-auto w-full max-w-5xl px-6 pb-16 pt-10">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
