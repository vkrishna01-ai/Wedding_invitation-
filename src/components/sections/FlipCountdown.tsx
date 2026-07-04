'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { content } from '@/config/content'

gsap.registerPlugin(ScrollTrigger)

function calculateCountdown() {
  const target = new Date(content.weddingDetails.targetCountdown).getTime()
  const now = Date.now()
  const diff = Math.max(0, target - now)

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

/**
 * Elegant animated flip countdown timer.
 * Each digit card has a 3D flip animation on change,
 * gold-accented cards with soft shadows.
 */
export default function FlipCountdown() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [countdown, setCountdown] = useState(() => calculateCountdown())

  // Update every second — no dependency on countdown state to avoid render loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Entry animation
  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('.countdown-unit')
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.15,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
            },
          }
        )
      }
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const units = [
    { value: countdown.days, label: 'Days' },
    { value: countdown.hours, label: 'Hours' },
    { value: countdown.minutes, label: 'Minutes' },
    { value: countdown.seconds, label: 'Seconds' },
  ]

  return (
    <div ref={containerRef} className="py-16 md:py-24">
      {/* Heading */}
      <div className="text-center mb-12 md:mb-16">
        <span className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-stone">
          Counting Down To Forever
        </span>
      </div>

      {/* Countdown grid */}
      <div className="flex items-center justify-center gap-3 md:gap-6 lg:gap-8 px-4">
        {units.map((unit, idx) => (
          <div key={unit.label} className="flex items-center gap-3 md:gap-6 lg:gap-8">
            <div className="countdown-unit flex flex-col items-center gap-3 opacity-0">
              {/* Digit card */}
              <div
                className="flip-card-container"
                style={{ perspective: '600px' }}
              >
                <div className="flip-digit-card">
                  <span className="flip-digit-value">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  {/* Horizontal split line */}
                  <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-charcoal/5 z-10" />
                  {/* Inner shadow for depth */}
                  <div className="absolute inset-0 rounded-lg shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] pointer-events-none" />
                </div>
              </div>

              {/* Label */}
              <span className="font-sans text-[8px] md:text-[9px] tracking-[0.3em] uppercase text-stone/70">
                {unit.label}
              </span>
            </div>

            {/* Separator dots (not after last) */}
            {idx < units.length - 1 && (
              <div className="flex flex-col gap-2 pb-6">
                <span className="w-1 h-1 rounded-full bg-gold/40" />
                <span className="w-1 h-1 rounded-full bg-gold/40" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Wedding date display */}
      <div className="text-center mt-12 md:mt-16">
        <p className="font-serif font-light italic text-charcoal/60 text-sm md:text-base tracking-wider">
          {content.weddingDetails.dateWritten.weekday},{' '}
          {content.weddingDetails.date}
        </p>
      </div>
    </div>
  )
}
