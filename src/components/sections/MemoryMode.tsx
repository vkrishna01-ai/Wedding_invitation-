'use client'
import { useRef, useEffect } from 'react'
import { content } from '@/config/content'
import gsap from 'gsap'

export default function Farewell() {
  const containerRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLParagraphElement>(null)
  const thankRef = useRef<HTMLParagraphElement>(null)
  const ornamentRef = useRef<HTMLDivElement>(null)
  const namesRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Quote fades in tied to scroll
    if (quoteRef.current) {
      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: quoteRef.current, start: 'top 65%', end: 'top 35%', scrub: 1 },
        }
      )
    }

    // Thank you — appears after more scrolling
    if (thankRef.current) {
      gsap.fromTo(thankRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: { trigger: thankRef.current, start: 'top 60%', end: 'top 40%', scrub: 1 },
        }
      )
    }

    // Ornament
    if (ornamentRef.current) {
      gsap.fromTo(ornamentRef.current,
        { opacity: 0, scaleX: 0 },
        {
          opacity: 1, scaleX: 1,
          scrollTrigger: { trigger: ornamentRef.current, start: 'top 65%', end: 'top 45%', scrub: 1 },
        }
      )
    }

    // Final names
    if (namesRef.current) {
      gsap.fromTo(namesRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: { trigger: namesRef.current, start: 'top 70%', end: 'top 50%', scrub: 1 },
        }
      )
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="min-h-[150vh] flex flex-col items-center justify-center px-6 py-48 md:py-64 text-center bg-cream"
    >
      {/* The quote — the emotional peak */}
      <p
        ref={quoteRef}
        className="font-script leading-snug max-w-lg mb-32 md:mb-48 opacity-0"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'var(--color-rose)' }}
      >
        Every great story deserves witnesses.
      </p>

      {/* The gratitude */}
      <p
        ref={thankRef}
        className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-stone opacity-0 mb-20 md:mb-28"
      >
        Thank you for becoming a part of ours.
      </p>

      {/* Rose ornament */}
      <div ref={ornamentRef} className="rose-line w-24 mb-20 md:mb-28 opacity-0" />

      {/* Final signature */}
      <p
        ref={namesRef}
        className="font-serif text-sm md:text-base text-rose/60 tracking-[0.2em] uppercase opacity-0"
      >
        {content.couple.groom.split(' ')[0]} & {content.couple.bride.split(' ')[0]}
      </p>
    </section>
  )
}
