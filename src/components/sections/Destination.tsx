'use client'
import { useRef, useEffect, useState } from 'react'
import { content } from '@/config/content'
import { revealOnScroll } from '@/lib/animations'

function useCountdown(target: string) {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    const targetDate = new Date(target).getTime()

    function update() {
      const now = Date.now()
      const diff = Math.max(0, targetDate - now)
      setRemaining({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      })
    }

    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [target])

  return remaining
}

export default function Destination() {
  const labelRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const venueRef = useRef<HTMLDivElement>(null)
  const countdownRef = useRef<HTMLDivElement>(null)

  const countdown = useCountdown(content.weddingDetails.targetCountdown)

  useEffect(() => {
    revealOnScroll(labelRef.current, { y: 15 })
    revealOnScroll(titleRef.current, { y: 15, duration: 2.5 })
    revealOnScroll(venueRef.current, { y: 15 })
    revealOnScroll(countdownRef.current, { y: 15 })
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32 md:py-48 relative">
      {/* Subtle landscape gradient — evoking mountains without an image */}
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none opacity-[0.07]"
        style={{
          background: `
            radial-gradient(ellipse 120% 100% at 50% 0%, var(--color-sage), transparent 70%)
          `,
        }}
      />

      {/* Chapter label */}
      <div ref={labelRef} className="flex flex-col items-center gap-3 mb-20 md:mb-28 opacity-0">
        <span className="font-serif text-2xl md:text-3xl text-gold italic">II</span>
        <span className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-stone">
          The Destination
        </span>
      </div>

      {/* Location name */}
      <div ref={titleRef} className="text-center mb-16 md:mb-20 opacity-0">
        <h2
          className="font-serif font-light uppercase letterpress tracking-[0.2em]"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          {content.weddingDetails.city}
        </h2>
        <p className="font-serif text-xl md:text-2xl text-stone italic mt-4">
          {content.weddingDetails.state}, India
        </p>
      </div>

      <div className="gold-line w-16 mb-16 md:mb-20" />

      {/* Venue details */}
      <div ref={venueRef} className="text-center mb-20 md:mb-28 opacity-0">
        <p className="font-serif text-lg md:text-xl text-charcoal/80 mb-3">
          {content.weddingDetails.venue}
        </p>
        <p className="font-sans text-xs text-stone tracking-wider">
          {content.weddingDetails.address}
        </p>
        <div className="flex items-center justify-center gap-6 mt-6">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone/70">
            {content.weddingDetails.weather}
          </span>
          <span className="text-gold-light">·</span>
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone/70">
            {content.weddingDetails.altitude}
          </span>
        </div>
      </div>

      {/* Countdown */}
      <div ref={countdownRef} className="flex items-baseline gap-8 md:gap-12 opacity-0">
        {[
          { value: countdown.days, label: 'Days' },
          { value: countdown.hours, label: 'Hours' },
          { value: countdown.minutes, label: 'Minutes' },
        ].map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            <span className="font-serif font-light text-4xl md:text-5xl text-charcoal letterpress">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-stone mt-2">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
