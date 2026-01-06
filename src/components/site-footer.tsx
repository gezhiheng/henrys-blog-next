import { siteConfig } from '@/lib/site'

export default function SiteFooter() {
  return (
    <footer className='flex w-full py-10 md:text-sm text-xs text-muted-foreground'>
      <p className='w-full text-center'>
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </p>
    </footer>
  )
}
