'use client'
import { useRef, useCallback, useMemo } from 'react'
import gsap from 'gsap'
import { useUIStore } from '@/store/useUIStore'

/**
 * Romantic envelope opening — a soft petal-adorned entry screen
 * that fades elegantly into the main invitation.
 */
export default function Envelope() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const promptRef = useRef<HTMLDivElement>(null)

  const setEnvelopeOpen = useUIStore((s) => s.setEnvelopeOpen)

  // Generate decorative petals for the opening screen
  const petals = useMemo(() => {
    const colors = ['#FFB4C2', '#FF8FA3', '#FDA4AF', '#FFC2D1', '#FECDD3']
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      size: `${8 + Math.random() * 12}px`,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      delay: i * 0.08,
    }))
  }, [])

  const handleOpen = useCallback(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({
      onComplete: () => {
        setEnvelopeOpen(true)
        if (containerRef.current) {
          containerRef.current.style.display = 'none'
        }
      },
    })

    // Fade out prompt
    tl.to(promptRef.current, { opacity: 0, duration: 0.3 })

    // Petals scatter outward
    const petalEls = containerRef.current.querySelectorAll('.entry-petal')
    tl.to(petalEls, {
      opacity: 0,
      scale: 2,
      x: () => (Math.random() - 0.5) * 200,
      y: () => (Math.random() - 0.5) * 200,
      duration: 1,
      stagger: 0.03,
      ease: 'power2.out',
    }, '-=0.1')

    // Text scales up and fades
    tl.to(textRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 1.2,
      ease: 'power2.inOut',
    }, '-=0.8')

    // Container fades to white
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    }, '-=0.5')
  }, [setEnvelopeOpen])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer"
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      aria-label="Open wedding invitation"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpen() }}
      style={{
        background: 'linear-gradient(180deg, #FFF9F5 0%, #FFE4E6 50%, #FFF1F2 100%)',
      }}
    >
      {/* Decorative petals scattered around */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="entry-petal absolute rounded-[50%_0_50%_50%] opacity-40"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}

      {/* Center content */}
      <div ref={textRef} className="flex flex-col items-center text-center px-8">
        {/* Decorative heart */}
        <span className="text-4xl md:text-5xl mb-6 opacity-60">💌</span>

        {/* Title */}
        <p className="font-script text-3xl md:text-4xl lg:text-5xl text-rose/70 mb-3">
          You&apos;re Invited
        </p>

        {/* Subtitle */}
        <p className="font-serif text-sm md:text-base text-charcoal/50 italic mb-2">
          to the wedding celebration of
        </p>

        {/* Names */}
        <p className="font-serif text-xl md:text-2xl text-charcoal/80 tracking-[0.1em] uppercase mb-8">
          Ravi & Rudrakshi
        </p>

        {/* Rose divider */}
        <div className="rose-line w-16 mb-8" />
      </div>

      {/* Tap prompt */}
      <div ref={promptRef} className="absolute bottom-12 left-0 right-0 text-center">
        <div className="inline-flex flex-col items-center gap-2">
          <span className="inline-block w-10 h-10 rounded-full border-2 border-rose/30 flex items-center justify-center pulse-glow">
            <span className="text-rose/50 text-sm">♡</span>
          </span>
          <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-stone/50">
            Tap to open
          </p>
        </div>
      </div>
    </div>
  )
}
