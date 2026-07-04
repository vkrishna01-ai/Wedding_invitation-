'use client'
import { useRef, useEffect } from 'react'
import { content } from '@/config/content'
import { revealOnScroll, staggerReveal } from '@/lib/animations'
import gsap from 'gsap'

export default function Events() {
  const labelRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const travelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    revealOnScroll(labelRef.current, { y: 15 })
    revealOnScroll(cardRef.current, { y: 20, duration: 2.5 })
    revealOnScroll(travelRef.current, { y: 15 })

    const rows = gsap.utils.toArray('.event-row') as HTMLElement[]
    staggerReveal(rows, { y: 15, stagger: 0.12, start: 'top 85%' })
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center px-6 py-32 md:py-48">
      {/* Chapter label */}
      <div ref={labelRef} className="flex flex-col items-center gap-3 mb-20 md:mb-28 opacity-0">
        <span className="font-serif text-2xl md:text-3xl text-gold italic">IV</span>
        <span className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-stone">
          The Celebration
        </span>
      </div>

      {/* Single itinerary card */}
      <div ref={cardRef} className="card gold-frame w-full max-w-3xl px-8 py-16 md:px-16 md:py-24 opacity-0">
        <h2 className="font-serif font-light text-2xl md:text-3xl text-charcoal text-center tracking-[0.15em] uppercase letterpress mb-16 md:mb-20">
          Schedule of Events
        </h2>

        <div className="flex flex-col">
          {content.events.map((event, index) => (
            <div key={event.id}>
              <div className="event-row flex flex-col md:flex-row md:items-baseline gap-2 md:gap-0 py-6 md:py-8 opacity-0">
                {/* Date */}
                <div className="md:w-[140px] flex-shrink-0">
                  <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-stone">
                    {event.date}
                  </span>
                </div>

                {/* Event name */}
                <div className="flex-1">
                  <h3 className="font-serif text-xl md:text-2xl text-charcoal">
                    {event.title}
                  </h3>
                  <p className="font-sans text-xs text-stone mt-1">
                    {event.venue} · {event.time}
                  </p>
                </div>

                {/* Dress code */}
                <div className="md:text-right mt-2 md:mt-0">
                  <span className="font-serif text-sm text-stone/80 italic">
                    {event.dressCode}
                  </span>
                </div>
              </div>

              {/* Gold hairline divider */}
              {index < content.events.length - 1 && (
                <div className="gold-line w-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Travel details — folded in below */}
      <div ref={travelRef} className="w-full max-w-3xl mt-16 md:mt-24 text-center opacity-0">
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
