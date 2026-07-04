'use client'

import { useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { content } from '@/config/content'
import ParallaxHero from './ParallaxHero'
import VenueShowcase from './VenueShowcase'
import FlipCountdown from './FlipCountdown'

gsap.registerPlugin(ScrollTrigger)

const ForestFireflies = dynamic(
  () => import('@/components/3d/ForestFireflies'),
  { ssr: false }
)
const JungleParticles = dynamic(
  () => import('@/components/3d/JungleParticles'),
  { ssr: false }
)

/**
 * Destination — the immersive orchestrator section.
 *
 * Structure:
 * 1. ParallaxHero — full-viewport jungle canopy entry
 * 2. Resort Introduction — poetic description with 3D firefly overlay
 * 3. Venue Showcase — glassmorphism cards with venue images
 * 4. Flip Countdown — animated countdown to the wedding
 * 5. Getting There — travel info with directions
 */
export default function Destination() {
  const introRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const travelRef = useRef<HTMLDivElement>(null)
  const fireflySectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!introRef.current) return

    const ctx = gsap.context(() => {
      // Description reveal
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: descRef.current,
              start: 'top 75%',
            },
          }
        )
      }

      // Details reveal
      if (detailsRef.current) {
        const items = detailsRef.current.querySelectorAll('.detail-item')
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: detailsRef.current,
              start: 'top 80%',
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
    <section className="destination-section">
      {/* ═══ 1. PARALLAX HERO ═══ */}
      <ParallaxHero />

      {/* ═══ 2. RESORT INTRODUCTION ═══ */}
      <div
        ref={introRef}
        className="relative bg-[#0a0f05] overflow-hidden"
      >
        {/* 3D Firefly Canvas — ambient background */}
        <div
          ref={fireflySectionRef}
          className="absolute inset-0 z-[1] pointer-events-none"
        >
          <Canvas
            camera={{ position: [0, 0, 4], fov: 50 }}
            gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
            style={{ background: 'transparent' }}
            dpr={[1, 1.5]}
          >
            <Suspense fallback={null}>
              <ForestFireflies count={150} />
              <JungleParticles count={60} />
            </Suspense>
          </Canvas>
        </div>

        {/* Content over fireflies */}
        <div className="relative z-[2] max-w-3xl mx-auto px-6 py-32 md:py-48 text-center">
          {/* Poetic description */}
          <p
            ref={descRef}
            className="font-serif font-light italic text-white/70 leading-[1.8] md:leading-[2] opacity-0"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}
          >
            {content.weddingDetails.venueDescription}
          </p>

          {/* Gold divider */}
          <div className="mx-auto w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent my-12 md:my-16" />

          {/* Quick facts */}
          <div
            ref={detailsRef}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
          >
            <div className="detail-item flex flex-col items-center gap-1 opacity-0">
              <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/30">
                Venue
              </span>
              <span className="font-serif text-sm md:text-base text-white/70 italic">
                {content.weddingDetails.venue}
              </span>
            </div>
            <span className="text-[#D4AF37]/30 hidden md:inline">·</span>
            <div className="detail-item flex flex-col items-center gap-1 opacity-0">
              <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/30">
                Climate
              </span>
              <span className="font-serif text-sm md:text-base text-white/70 italic">
                {content.weddingDetails.weather}
              </span>
            </div>
            <span className="text-[#D4AF37]/30 hidden md:inline">·</span>
            <div className="detail-item flex flex-col items-center gap-1 opacity-0">
              <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/30">
                Altitude
              </span>
              <span className="font-serif text-sm md:text-base text-white/70 italic">
                {content.weddingDetails.altitude}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ 3. VENUE SHOWCASE ═══ */}
      <div className="bg-ivory relative">
        <VenueShowcase />
      </div>

      {/* ═══ 4. FLIP COUNTDOWN ═══ */}
      <div className="bg-parchment relative">
        <FlipCountdown />
      </div>

      {/* ═══ 5. GETTING THERE ═══ */}
      <div className="bg-ivory relative px-6 py-20 md:py-28">
        <div
          ref={travelRef}
          className="max-w-3xl mx-auto text-center opacity-0"
        >
          <span className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-stone block mb-8">
            Getting There
          </span>

          <div className="card gold-frame px-8 py-12 md:px-12 md:py-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-8">
              {/* Airport */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">✈️</span>
                <span className="font-serif text-sm md:text-base text-charcoal/80 italic">
                  {content.travel.airport}
                </span>
              </div>

              <span className="text-gold-light hidden md:inline text-lg">·</span>

              {/* Railway */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">🚂</span>
                <span className="font-serif text-sm md:text-base text-charcoal/80 italic">
                  {content.travel.railway}
                </span>
              </div>
            </div>

            <div className="gold-line w-24 mx-auto mb-6" />

            <p className="font-sans text-xs text-stone/70 mb-2">
              {content.travel.driveTime}
            </p>
            <p className="font-sans text-xs text-stone/60">
              Accommodation at{' '}
              <span className="text-charcoal/70">{content.travel.accommodation}</span>{' '}
              · {content.travel.checkIn} – {content.travel.checkOut}
            </p>
          </div>

          {/* Map link */}
          <a
            href="https://maps.app.goo.gl/bJzE9ScdsuBR7aFc8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 py-3 px-8 border border-charcoal/10 font-sans text-[10px] tracking-[0.3em] uppercase text-stone hover:text-charcoal hover:border-gold-light transition-all duration-700"
          >
            <span>📍</span>
            View on Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}
