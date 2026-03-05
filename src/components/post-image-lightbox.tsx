'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface PostImageLightboxProps {
  containerId: string
}

interface ActiveImage {
  alt: string
  src: string
}

export default function PostImageLightbox ({
  containerId
}: PostImageLightboxProps) {
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof HTMLImageElement)) {
        return
      }

      const container = document.getElementById(containerId)
      if (!container || !container.contains(target)) {
        return
      }

      if (!target.classList.contains('post-image')) {
        return
      }

      const src = target.getAttribute('src')
      if (!src) {
        return
      }

      setActiveImage({
        src,
        alt: target.getAttribute('alt') ?? 'Post image'
      })
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [containerId])

  useEffect(() => {
    if (!activeImage) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeImage])

  if (!isMounted || !activeImage) {
    return null
  }

  return createPortal(
    <div
      className='fixed inset-0 z-100 flex items-center justify-center bg-background/70 backdrop-blur-xl p-4 animate-in fade-in'
      onClick={() => setActiveImage(null)}
      role='dialog'
      aria-modal='true'
      aria-label='Image preview'
    >
      <div
        className='relative h-[90vh] w-[min(96vw,1600px)] cursor-zoom-out'
        onClick={() => setActiveImage(null)}
      >
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          sizes='96vw'
          className='object-contain'
          priority
          unoptimized
        />
      </div>
    </div>,
    document.body
  )
}
