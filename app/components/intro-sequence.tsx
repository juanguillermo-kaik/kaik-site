'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export function IntroSequence() {
  const [visible, setVisible] = useState(true)
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isPreview = new URLSearchParams(window.location.search).get('intro') === 'preview'

    if (isPreview) {
      if (previewMode) return
      const frame = window.requestAnimationFrame(() => setPreviewMode(true))
      return () => window.cancelAnimationFrame(frame)
    }

    const timeout = window.setTimeout(() => setVisible(false), reducedMotion ? 80 : 2700)

    return () => window.clearTimeout(timeout)
  }, [previewMode])

  if (!visible) return null

  return (
    <section className={`intro-sequence ${previewMode ? 'intro-sequence-preview' : ''}`} aria-label="Introducción KAIK">
      <div className="intro-sequence-grid" aria-hidden="true" />
      <div className="intro-sequence-copy" aria-hidden="true">
        <span className="intro-sequence-kicker">KAIK / CONNECTIONS</span>
        <span className="intro-sequence-line" />
      </div>
      <div className="intro-sequence-orb intro-sequence-orb-top" aria-hidden="true" />
      <div className="intro-sequence-orb intro-sequence-orb-bottom" aria-hidden="true" />
      <div className="intro-sequence-image" aria-hidden="true">
        <Image
          src="/hero-intro-dog.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_center] md:object-center"
          unoptimized
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
