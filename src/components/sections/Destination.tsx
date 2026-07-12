'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { content } from '@/config/content'
import VenueShowcase from './VenueShowcase'
import FlipCountdown from './FlipCountdown'

gsap.registerPlugin(ScrollTrigger)

export default function Destination() {
  const introRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const travelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!introRef.current) return

    const ctx = gsap.context(() => {
      // Image reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: introRef.current,
              start: 'top 75%',
            },
          }
        )
      }

      // Description reveal
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: descRef.current,
              start: 'top 85%',
            },
          }
        )
      }

      // Travel section reveal
      if (travelRef.current) {
        gsap.fromTo(
          travelRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: travelRef.current,
              start: 'top 80%',
            },
          }
        )
      }
    }, introRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="destination-section bg-cream">
      {/* ═══ 1. RESORT INTRODUCTION ═══ */}
      <div ref={introRef} className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 max-w-4xl mx-auto text-center">
        {/* Chapter marker */}
        <div className="flex flex-col items-center gap-3 mb-10 md:mb-14">
          <span className="font-serif text-2xl md:text-3xl text-rose/60 italic">
            II
          </span>
          <span className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-stone">
            The Destination
          </span>
        </div>

        {/* Venue Image */}
        <div ref={imageRef} className="relative w-full aspect-[4/3] md:aspect-[16/9] mb-12 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(225,29,72,0.1)] border-4 border-white opacity-0">
          <Image
            src="/images/destination/watercolor-venue.png"
            alt="Beautiful watercolor painting of the wedding venue"
            fill
            className="object-cover hover:scale-105 transition-transform duration-1000 ease-in-out"
            priority
          />
        </div>

        {/* Title */}
        <h2
          className="font-script text-4xl md:text-5xl text-rose mb-6"
        >
          {content.weddingDetails.venue}
        </h2>

        {/* Poetic description */}
        <p
          ref={descRef}
          className="font-serif font-light text-charcoal/80 leading-[1.8] md:leading-[2] opacity-0 max-w-2xl mx-auto mb-10"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}
        >
          {content.weddingDetails.venueDescription}
        </p>

        {/* Quick facts */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-12">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl mb-1">🌤️</span>
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-stone/70">
              Climate
            </span>
            <span className="font-serif text-sm text-charcoal italic">
              {content.weddingDetails.weather}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl mb-1">⛰️</span>
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-stone/70">
              Altitude
            </span>
            <span className="font-serif text-sm text-charcoal italic">
              {content.weddingDetails.altitude}
            </span>
          </div>
        </div>

        {/* Red CTA Button */}
        <a
          href="https://maps.app.goo.gl/bJzE9ScdsuBR7aFc8"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-rose"
        >
          <span>📍</span>
          Get Directions
        </a>
      </div>

      {/* ═══ 2. VENUE SHOWCASE ═══ */}
      <div className="bg-cream-soft relative pb-12">
        <VenueShowcase />
      </div>

      {/* ═══ 3. FLIP COUNTDOWN ═══ */}
      <div className="bg-blush-light relative border-t border-rose/10">
        <FlipCountdown />
      </div>

      {/* ═══ 4. GETTING THERE ═══ */}
      <div className="bg-cream relative px-6 py-20 md:py-28">
        <div
          ref={travelRef}
          className="max-w-3xl mx-auto text-center opacity-0"
        >
          <span className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-stone block mb-8">
            Travel Details
          </span>

          <div className="card rose-frame px-8 py-12 md:px-12 md:py-16 bg-white">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-8">
              {/* Airport */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">✈️</span>
                <span className="font-serif text-sm md:text-base text-charcoal/80 italic">
                  {content.travel.airport}
                </span>
              </div>

              <span className="text-rose-soft hidden md:inline text-lg">♡</span>

              {/* Railway */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">🚂</span>
                <span className="font-serif text-sm md:text-base text-charcoal/80 italic">
                  {content.travel.railway}
                </span>
              </div>
            </div>

            <div className="rose-line w-24 mx-auto mb-6" />

            <p className="font-sans text-xs text-stone/70 mb-2">
              {content.travel.driveTime}
            </p>
            <p className="font-sans text-xs text-stone/60">
              Accommodation at{' '}
              <span className="text-rose font-medium">{content.travel.accommodation}</span>{' '}
              · {content.travel.checkIn} – {content.travel.checkOut}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
