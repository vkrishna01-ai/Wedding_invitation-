'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { content } from '@/config/content'

gsap.registerPlugin(ScrollTrigger)

/**
 * Venue showcase section with glassmorphism cards.
 * Each card features a venue image with Ken Burns effect,
 * frosted glass overlay with details, and staggered reveal.
 */
export default function VenueShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const highlightsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
            },
          }
        )
      }

      // Cards staggered reveal
      const cards = gsap.utils.toArray('.venue-card') as HTMLElement[]
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            delay: i * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        )
      })

      // Highlights reveal
      if (highlightsRef.current) {
        const items = highlightsRef.current.querySelectorAll('.highlight-item')
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: highlightsRef.current,
              start: 'top 85%',
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="py-20 md:py-32 px-6 relative">
      {/* Section heading */}
      <div ref={headingRef} className="text-center mb-16 md:mb-24 opacity-0">
        <span className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-stone block mb-4">
          Where Dreams Come Alive
        </span>
        <h3
          className="font-serif font-light uppercase text-charcoal letterpress tracking-[0.15em]"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
        >
          The Venues
        </h3>
        <div className="gold-line w-16 mx-auto mt-6" />
      </div>

      {/* Venue cards grid */}
      <div
        ref={cardsRef}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
      >
        {content.destination.venues.map((venue) => (
          <div
            key={venue.id}
            className="venue-card group relative rounded-xl overflow-hidden opacity-0"
            style={{ aspectRatio: '3/4' }}
          >
            {/* Background image with Ken Burns */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={venue.image}
                alt={venue.title}
                fill
                className="object-cover transition-transform duration-[8000ms] ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={85}
              />
            </div>

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[1]" />

            {/* Gold border accent on hover */}
            <div className="absolute inset-0 z-[2] rounded-xl border border-transparent group-hover:border-[#D4AF37]/30 transition-colors duration-700" />

            {/* Glassmorphism content panel */}
            <div className="absolute bottom-0 left-0 right-0 z-[3] p-6 md:p-8">
              {/* Glass background */}
              <div className="absolute inset-0 glass-card rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Content */}
              <div className="relative z-[1]">
                <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#E8C864]/80 block mb-2">
                  {venue.subtitle}
                </span>
                <h4 className="font-serif text-xl md:text-2xl text-white font-light tracking-wider mb-3">
                  {venue.title}
                </h4>
                <p className="font-sans text-xs text-white/60 leading-relaxed line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  {venue.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resort highlights */}
      <div ref={highlightsRef} className="max-w-4xl mx-auto mt-20 md:mt-28">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-4">
          {content.destination.highlights.map((item) => (
            <div
              key={item.label}
              className="highlight-item flex flex-col items-center gap-2 opacity-0"
            >
              <span className="text-2xl md:text-3xl" role="img" aria-label={item.label}>
                {item.icon}
              </span>
              <span className="font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-stone text-center leading-snug">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
