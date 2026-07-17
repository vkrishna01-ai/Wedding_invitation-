'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { content } from '@/config/content'
import { revealOnScroll } from '@/lib/animations'

export default function Hero() {
  const ganeshRef = useRef<HTMLDivElement>(null)
  const shlokaRef = useRef<HTMLDivElement>(null)
  const blessingRef = useRef<HTMLParagraphElement>(null)
  const namesRef = useRef<HTMLDivElement>(null)
  const parentsRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    revealOnScroll(ganeshRef.current, { delay: 0.2, y: 10, duration: 1.8 })
    revealOnScroll(shlokaRef.current, { delay: 0.6, y: 10, duration: 2 })
    revealOnScroll(blessingRef.current, { delay: 1.0, y: 10, duration: 2 })
    revealOnScroll(namesRef.current, { delay: 1.4, y: 0, duration: 2.5 })
    revealOnScroll(parentsRef.current, { delay: 2.0, y: 10, duration: 2 })
    revealOnScroll(detailsRef.current, { delay: 2.6, y: 15, duration: 2 })
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 md:py-20 overflow-hidden bg-cream">
      {/* Subtle CSS background glow effects — replaces heavy 3D Canvas */}
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      <div className="hero-glow hero-glow-3" />

      {/* ═══ Ganesh Image ═══ */}
      <div ref={ganeshRef} className="flex flex-col items-center opacity-0 z-10 mb-4">
        <div className="relative w-20 h-20 md:w-24 md:h-24 ganesh-glow">
          <Image
            src="/images/ganesh.png"
            alt="Shri Ganesh"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* ═══ Sanskrit Shloka ═══ */}
      <div ref={shlokaRef} className="flex flex-col items-center opacity-0 z-10 mb-3 text-center max-w-xl px-4">
        <p className="font-serif text-sm md:text-base leading-[2] text-rose/80 font-medium tracking-wide">
          ॥ श्री गणेशाय नमः ॥<br />
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ<br />
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
        </p>
      </div>

      {/* ═══ Ornamental Divider ═══ */}
      <div className="ornament-divider z-10 mb-4">
        <span className="ornament-icon">✦</span>
      </div>

      {/* ═══ Blessing Text ═══ */}
      <p
        ref={blessingRef}
        className="font-serif text-sm md:text-base text-charcoal/65 italic tracking-wide leading-relaxed text-center max-w-lg px-4 z-10 mb-6 opacity-0"
      >
        With the blessings of Shri Ganesh and our beloved families,
        we joyfully invite you to celebrate the union of
      </p>

      {/* ═══ Couple Names — The Star ═══ */}
      <div ref={namesRef} className="z-10 mb-4 opacity-0">
        <h1
          className="font-serif font-light text-center leading-[1.1]"
          style={{ fontSize: 'clamp(2.5rem, 9vw, 6rem)', letterSpacing: '0.08em' }}
        >
          <span className="block uppercase text-charcoal">
            {content.couple.groom.split(' ')[0]}
          </span>
          <span
            className="couple-ampersand my-2 md:my-4"
            style={{ fontSize: '0.4em', letterSpacing: '0.02em' }}
          >
            &amp;
          </span>
          <span className="block uppercase text-charcoal">
            {content.couple.bride.split(' ')[0]}
          </span>
        </h1>
      </div>

      {/* ═══ Parents' Names ═══ */}
      <div ref={parentsRef} className="z-10 mb-6 opacity-0 text-center max-w-2xl px-4">
        <div className="parents-row">
          <p className="font-serif text-xs md:text-sm text-charcoal/55 italic leading-relaxed">
            Son of {content.family.groom.parents[0]} &amp; {content.family.groom.parents[1]}
          </p>
          <span className="parents-divider">♡</span>
          <p className="font-serif text-xs md:text-sm text-charcoal/55 italic leading-relaxed">
            Daughter of {content.family.bride.parents[0]} &amp; {content.family.bride.parents[1]}
          </p>
        </div>
      </div>

      {/* ═══ Ornamental Divider ═══ */}
      <div className="ornament-divider z-10 mb-6">
        <span className="ornament-icon">❀</span>
      </div>

      {/* ═══ Date & Venue ═══ */}
      <div ref={detailsRef} className="flex flex-col items-center gap-3 z-10 opacity-0">
        <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-stone/70">
          {content.invitation.prefix}
        </p>
        <p
          className="font-serif font-light uppercase tracking-[0.15em] text-charcoal/80"
          style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.3rem)' }}
        >
          {content.weddingDetails.dateWritten.day}
        </p>
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone/50">
          {content.weddingDetails.dateWritten.year}
        </p>
        <div className="rose-line w-10 my-1" />
        <p className="font-serif text-base md:text-lg text-charcoal/55 italic">
          {content.weddingDetails.venue}
        </p>
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone/40">
          {content.weddingDetails.city}, {content.weddingDetails.state}
        </p>
      </div>

      {/* ═══ Scroll Hint ═══ */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2" style={{ animation: 'gentleBounce 3s ease-in-out infinite' }}>
          <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-stone/40">
            Scroll
          </span>
          <span className="text-rose/30 text-sm">↓</span>
        </div>
      </div>
    </section>
  )
}
