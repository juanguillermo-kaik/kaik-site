'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export function IntroSequence() {
  const [visible, setVisible] = useState(true)
  const [previewMode, setPreviewMode] = useState(false)
  const [imageReady, setImageReady] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isPreview = new URLSearchParams(window.location.search).get('intro') === 'preview'

    if (isPreview) {
      if (previewMode) return
      const frame = window.requestAnimationFrame(() => setPreviewMode(true))
      return () => window.cancelAnimationFrame(frame)
    }

    if (!imageReady) return

    const timeout = window.setTimeout(() => setVisible(false), reducedMotion ? 80 : 2700)

    return () => window.clearTimeout(timeout)
  }, [imageReady, previewMode])

  if (!visible) return null

  return (
    <section className={`intro-sequence ${previewMode ? 'intro-sequence-preview' : ''} ${imageReady ? 'intro-sequence-ready' : ''}`} aria-label="Introducción KAIK">
      <div className="intro-sequence-grid" aria-hidden="true" />
      <div className="intro-sequence-copy" aria-hidden="true">
        <span className="intro-sequence-kicker">KAIK / CONNECTIONS</span>
        <span className="intro-sequence-line" />
      </div>
      <div className="intro-sequence-orb intro-sequence-orb-top" aria-hidden="true" />
      <div className="intro-sequence-orb intro-sequence-orb-bottom" aria-hidden="true" />
      <div className="intro-sequence-image" aria-hidden="true">
        <Image
          src="/hero-intro-dog.webp"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover object-[58%_center] md:object-center"
          unoptimized
          onLoad={() => setImageReady(true)}
          onError={() => setImageReady(true)}
        />
      </div>
      <div className="intro-sequence-visor" aria-hidden="true" />
      <div className="intro-sequence-flash" aria-hidden="true" />
      <button type="button" onClick={() => setVisible(false)} className="intro-sequence-skip">
        Saltar intro
      </button>
    </section>
  )
}
