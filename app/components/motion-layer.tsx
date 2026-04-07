'use client'

import { useEffect } from 'react'

export function MotionLayer() {
  useEffect(() => {
    const root = document.documentElement
    const cursor = document.getElementById('cursor-halo')
    const hoverCards = Array.from(document.querySelectorAll<HTMLElement>('[data-spotlight]'))
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal, .reveal-line'))
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    if (prefersReducedMotion) {
      reveals.forEach((element) => element.classList.add('in'))
      return
    }

    let frame = 0
    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2

    const updateCursor = () => {
      frame = 0
      if (!cursor) return
      cursor.style.transform = `translate3d(${pointerX - 170}px, ${pointerY - 170}px, 0)`
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!supportsHover) return
      pointerX = event.clientX
      pointerY = event.clientY
      root.style.setProperty('--pointer-x', `${event.clientX}px`)
      root.style.setProperty('--pointer-y', `${event.clientY}px`)
      if (!frame) {
        frame = window.requestAnimationFrame(updateCursor)
      }
    }

    const handleCardMove = (event: Event) => {
      const target = event.currentTarget as HTMLElement
      const { left, top, width, height } = target.getBoundingClientRect()
      const pointerEvent = event as PointerEvent
      const x = ((pointerEvent.clientX - left) / width) * 100
      const y = ((pointerEvent.clientY - top) / height) * 100
      target.style.setProperty('--spotlight-x', `${x}%`)
      target.style.setProperty('--spotlight-y', `${y}%`)
    }

    const clearCardMove = (event: Event) => {
      const target = event.currentTarget as HTMLElement
      target.style.removeProperty('--spotlight-x')
      target.style.removeProperty('--spotlight-y')
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    reveals.forEach((element) => io.observe(element))

    if (supportsHover) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      hoverCards.forEach((card) => {
        card.addEventListener('pointermove', handleCardMove, { passive: true })
        card.addEventListener('pointerleave', clearCardMove)
      })
    } else if (cursor) {
      cursor.style.display = 'none'
    }

    return () => {
      io.disconnect()
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
      window.removeEventListener('pointermove', handlePointerMove)
      hoverCards.forEach((card) => {
        card.removeEventListener('pointermove', handleCardMove)
        card.removeEventListener('pointerleave', clearCardMove)
      })
    }
  }, [])

  return (
    <div
      id="cursor-halo"
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),rgba(0,55,255,0.16)_28%,rgba(0,55,255,0.08)_48%,transparent_72%)] mix-blend-screen blur-3xl transition-transform duration-200"
    >
      <div className="cursor-halo-ring" />
      <div className="cursor-halo-core" />
    </div>
  )
}
