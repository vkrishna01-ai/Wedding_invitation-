'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { content } from '@/config/content'
import { revealOnScroll, staggerReveal } from '@/lib/animations'

export default function Events() {
  const labelRef = useRef<HTMLDivElement>(null)
  const travelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    revealOnScroll(labelRef.current, { y: 15 })
    revealOnScroll(travelRef.current, { y: 15 })

    const cards = document.querySelectorAll('.event-card') as NodeListOf<HTMLElement>
    staggerReveal(Array.from(cards), { y: 30, stagger: 0.18, start: 'top 85%' })
  }, [])

  return (
    <section id="events" className="min-h-screen flex flex-col items-center px-4 sm:px-6 py-24 md:py-40">
      {/* Chapter label */}
      <div ref={labelRef} className="flex flex-col items-center gap-3 mb-16 md:mb-24 opacity-0">
        <span className="font-serif text-2xl md:text-3xl text-gold italic">IV</span>
        <span className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-stone">
          The Celebration
        </span>
        <div className="gold-line w-24 mt-2" />
      </div>

      {/* Section heading */}
      <h2 className="font-serif font-light text-3xl md:text-4xl lg:text-5xl text-charcoal text-center tracking-[0.1em] uppercase letterpress mb-4">
        Schedule of Events
      </h2>
      <p className="font-sans text-sm text-stone text-center max-w-lg mb-16 md:mb-24">
        Two days of love, laughter and timeless traditions — nestled in the heart of Jim Corbett's enchanting wilderness.
      </p>

      {/* Date badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12 md:mb-16">
        <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-gold-light/30 bg-warm-white">
          <span className="font-serif text-sm text-charcoal">Saturday</span>
          <span className="text-gold-light">·</span>
          <span className="font-sans text-xs tracking-[0.15em] uppercase text-stone">7 February 2027</span>
        </div>
        <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-gold-light/30 bg-warm-white">
          <span className="font-serif text-sm text-charcoal">Sunday</span>
          <span className="text-gold-light">·</span>
          <span className="font-sans text-xs tracking-[0.15em] uppercase text-stone">8 February 2027</span>
        </div>
      </div>

      {/* Event cards grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {content.events.map((event) => (
          <div
            key={event.id}
            className="event-card group relative rounded-2xl overflow-hidden opacity-0"
            style={{ minHeight: '420px' }}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 z-[1]" />
            <div
              className="absolute inset-0 z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: `linear-gradient(to top, ${event.accent}22 0%, transparent 50%)`,
              }}
            />

            {/* Accent top border */}
            <div
              className="absolute top-0 left-0 right-0 h-1 z-[5] opacity-0 group-hover:opacity-100 transition-all duration-500"
              style={{ background: event.accent }}
            />

            {/* Date badge (top-right) */}
            <div className="absolute top-5 right-5 z-[5]">
              <div
                className="px-4 py-2 rounded-full backdrop-blur-md border transition-all duration-500 group-hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  borderColor: `${event.accent}40`,
                }}
              >
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/90">
                  {event.date}
                </span>
              </div>
            </div>

            {/* Content area */}
            <div className="absolute bottom-0 left-0 right-0 z-[3] p-6 md:p-8 flex flex-col">
              {/* Time & Venue */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: event.accent }}
                />
                <span className="font-sans text-[10px] md:text-xs tracking-[0.15em] uppercase text-white/70">
                  {event.time}
                </span>
                <span className="text-white/30">·</span>
                <span className="font-sans text-[10px] md:text-xs tracking-[0.15em] uppercase text-white/70">
                  {event.venue}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-serif text-3xl md:text-4xl text-white tracking-[0.06em] mb-3 transition-all duration-500 group-hover:tracking-[0.1em]"
                style={{
                  textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                }}
              >
                {event.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-sm text-white/60 leading-relaxed mb-4 max-w-md">
                {event.description}
              </p>

              {/* Dress code tag */}
              <div className="flex items-center gap-3">
                <div
                  className="px-4 py-1.5 rounded-full border backdrop-blur-sm transition-all duration-500 group-hover:border-opacity-60"
                  style={{
                    borderColor: `${event.accent}30`,
                    background: `${event.accent}10`,
                  }}
                >
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/80">
                    Dress Code
                  </span>
                </div>
                <span className="font-serif text-sm italic text-white/70">
                  {event.dressCode}
                </span>
              </div>
            </div>

            {/* Subtle inner border */}
            <div
              className="absolute inset-3 rounded-xl border pointer-events-none z-[4] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ borderColor: `${event.accent}15` }}
            />
          </div>
        ))}
      </div>

      {/* Travel details — folded in below */}
      <div ref={travelRef} className="w-full max-w-3xl mt-20 md:mt-32 text-center opacity-0">
        <p className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-stone mb-8">
          Getting There
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm">
          <span className="font-serif text-stone/80 italic">{content.travel.airport}</span>
          <span className="text-gold-light hidden md:inline">·</span>
          <span className="font-serif text-stone/80 italic">{content.travel.railway}</span>
        </div>
        <p className="font-sans text-xs text-stone/60 mt-4">
          {content.travel.driveTime}
        </p>
        <p className="font-sans text-xs text-stone/60 mt-2">
          Accommodation at {content.travel.accommodation} · {content.travel.checkIn} – {content.travel.checkOut}
        </p>
      </div>
    </section>
  )
}
