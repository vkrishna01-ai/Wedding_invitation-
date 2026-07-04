'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { content } from '@/config/content'

gsap.registerPlugin(ScrollTrigger)

/**
 * Immersive parallax hero section for the destination.
 * Multi-layered depth effect with jungle canopy background,
 * mist overlay, and cinematic text reveal.
 */
export default function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const mistRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !bgRef.current || !textRef.current) return

    const ctx = gsap.context(() => {
      // Background parallax — moves slower than scroll
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Mist layer — moves at medium speed
      if (mistRef.current) {
        gsap.to(mistRef.current, {
          yPercent: 15,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      // Text parallax — moves faster for depth
      gsap.to(textRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Cinematic zoom on entry
      gsap.fromTo(
        bgRef.current,
        { scale: 1.15 },
        {
          scale: 1.0,
          duration: 8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Text stagger reveal
      const textElements = textRef.current?.querySelectorAll('.reveal-text')
      if (textElements) {
        gsap.fromTo(
          textElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.3,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Overlay fade — darkens on scroll for transition
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.7,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: '70% top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="destination-parallax-hero relative h-screen min-h-[600px] overflow-hidden"
    >
      {/* Layer 1: Background image */}
      <div ref={bgRef} className="destination-parallax-bg absolute -inset-y-[20%] inset-x-0 z-[1] will-change-transform">
        <Image
          src="/images/destination/jungle-canopy.png"
          alt="Himalayan foothills forest at golden hour"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      {/* Layer 2: Mist overlay */}
      <div
        ref={mistRef}
        className="destination-parallax-mist"
      />

      {/* Layer 3: Gradient overlay for text legibility */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-t from-[#0a0f05]/80 via-[#0a0f05]/20 to-transparent" />

      {/* Layer 4: Scroll-driven darken overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[4] bg-[#0a0f05] opacity-0 pointer-events-none"
      />

      {/* Layer 5: Content */}
      <div
        ref={textRef}
        className="absolute inset-0 z-[5] flex flex-col items-center justify-end pb-24 md:pb-32 lg:pb-40 px-6 text-center"
      >
        {/* Chapter marker */}
        <div className="reveal-text flex flex-col items-center gap-3 mb-10 md:mb-14">
          <span className="font-serif text-2xl md:text-3xl text-[#E8C864] italic opacity-90">
            II
          </span>
          <span className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-white/50">
            The Destination
          </span>
        </div>

        {/* Venue name — large display */}
        <h2
          className="reveal-text font-serif font-light uppercase text-white/95 tracking-[0.2em] leading-[1.1] mb-4 md:mb-6"
          style={{ fontSize: 'clamp(2.2rem, 7vw, 5.5rem)' }}
        >
          {content.weddingDetails.venue}
        </h2>

        {/* Location */}
        <p className="reveal-text font-serif text-lg md:text-xl text-white/60 italic mb-6 md:mb-8">
          {content.weddingDetails.city}, {content.weddingDetails.state}
        </p>

        {/* Tagline */}
        <p className="reveal-text font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#E8C864]/70">
          {content.weddingDetails.venueTagline}
        </p>

        {/* Scroll hint */}
        <div className="reveal-text mt-12 md:mt-16 flex flex-col items-center gap-2 animate-[gentleBounce_3s_ease-in-out_infinite]">
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-white/30">
            Explore
          </span>
        </div>
      </div>
    </div>
  )
}
