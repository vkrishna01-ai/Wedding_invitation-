'use client'
import { useRef, useCallback } from 'react'
import gsap from 'gsap'
import { useUIStore } from '@/store/useUIStore'

export default function Envelope() {
  const containerRef = useRef<HTMLDivElement>(null)
  const flapRef = useRef<HTMLDivElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)
  const letterRef = useRef<HTMLDivElement>(null)
  const promptRef = useRef<HTMLDivElement>(null)

  const setEnvelopeOpen = useUIStore((s) => s.setEnvelopeOpen)

  const handleOpen = useCallback(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({
      onComplete: () => {
        setEnvelopeOpen(true)
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1.5,
            ease: 'power2.inOut',
            onComplete: () => {
              if (containerRef.current) containerRef.current.style.display = 'none'
            },
          })
        }
      },
    })

    // 1. Fade out the prompt text
    tl.to(promptRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' })

    // 2. Break the wax seal — crack apart
    tl.to(sealRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.inOut',
    }, '-=0.1')

    // 3. Lift the envelope flap — slow, physical
    tl.to(flapRef.current, {
      rotateX: -180,
      duration: 2,
      ease: 'power2.inOut',
    }, '-=0.4')

    // 4. Letter rises out of the envelope
    tl.to(letterRef.current, {
      y: -60,
      opacity: 1,
      duration: 1.8,
      ease: 'power2.out',
    }, '-=1')
  }, [setEnvelopeOpen])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-parchment"
      style={{ perspective: '1200px' }}
    >
      {/* ─── Envelope Body ─── */}
      <div
        className="relative w-[90vw] max-w-[520px] aspect-[4/3] cursor-pointer"
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        aria-label="Open invitation envelope"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpen() }}
      >
        {/* Envelope base */}
        <div className="absolute inset-0 bg-warm-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] rounded-sm" />

        {/* Inner V-fold lines (decorative) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            background: `
              linear-gradient(to bottom right, transparent 49.5%, var(--color-stone) 49.5%, var(--color-stone) 50.5%, transparent 50.5%),
              linear-gradient(to bottom left, transparent 49.5%, var(--color-stone) 49.5%, var(--color-stone) 50.5%, transparent 50.5%)
            `,
          }}
        />

        {/* Top flap */}
        <div
          ref={flapRef}
          className="absolute top-0 left-0 right-0 z-20"
          style={{
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            height: '55%',
          }}
        >
          {/* Flap front */}
          <div
            className="absolute inset-0 bg-warm-white"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              backfaceVisibility: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          />
          {/* Flap back (visible when flipped) */}
          <div
            className="absolute inset-0 bg-parchment"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transform: 'rotateX(180deg)',
              backfaceVisibility: 'hidden',
            }}
          />
        </div>

        {/* Letter peeking out */}
        <div
          ref={letterRef}
          className="absolute left-[8%] right-[8%] bottom-[15%] h-[50%] bg-ivory border border-gold-light/20 opacity-0 z-10 flex items-center justify-center"
        >
          <p className="font-serif text-charcoal/40 text-sm tracking-[0.2em] italic">
            You are invited
          </p>
        </div>

        {/* ─── Wax Seal ─── */}
        <div
          ref={sealRef}
          className="absolute z-30 left-1/2 -translate-x-1/2 flex items-center justify-center"
          style={{ top: '48%' }}
        >
          {/* Outer ring */}
          <div className="w-[72px] h-[72px] rounded-full bg-deep-red flex items-center justify-center shadow-[0_4px_12px_rgba(123,45,38,0.3),inset_0_2px_4px_rgba(255,255,255,0.15)]">
            {/* Inner recessed circle */}
            <div className="w-[52px] h-[52px] rounded-full bg-deep-red flex items-center justify-center shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)]">
              {/* Monogram */}
              <span
                className="font-serif text-gold/80 text-xl tracking-wider select-none"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
              >
                R&thinsp;R
              </span>
            </div>
          </div>
        </div>

        {/* ─── Prompt ─── */}
        <div
          ref={promptRef}
          className="absolute bottom-4 left-0 right-0 text-center z-30 pointer-events-none"
        >
          <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-stone/60">
            Tap the seal to open
          </p>
        </div>
      </div>
    </div>
  )
}
