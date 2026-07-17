'use client'
import { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import DivineMandalaRing from '@/components/3d/DivineMandalaRing'
import { content } from '@/config/content'
import gsap from 'gsap'
import { useInView } from 'react-intersection-observer'

export default function Farewell() {
  const containerRef = useRef<HTMLDivElement>(null)
  const omRef = useRef<HTMLDivElement>(null)
  const sanskritRef = useRef<HTMLParagraphElement>(null)
  const englishRef = useRef<HTMLParagraphElement>(null)
  const thankRef = useRef<HTMLParagraphElement>(null)
  const ornamentRef = useRef<HTMLDivElement>(null)
  const familiesRef = useRef<HTMLParagraphElement>(null)
  const coupleRef = useRef<HTMLParagraphElement>(null)

  const { ref: canvasRef, inView } = useInView({
    triggerOnce: false,
    rootMargin: '200px 0px',
  })

  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 65%',
        end: 'top 20%',
        scrub: 1,
      }
    })

    if (omRef.current) {
      tl.fromTo(omRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 }, 0)
    }

    if (sanskritRef.current) {
      tl.fromTo(sanskritRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.2)
    }

    if (englishRef.current) {
      tl.fromTo(englishRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.4)
    }

    if (thankRef.current) {
      tl.fromTo(thankRef.current, { opacity: 0 }, { opacity: 1 }, 0.6)
    }

    if (ornamentRef.current) {
      tl.fromTo(ornamentRef.current, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1 }, 0.8)
    }

    if (familiesRef.current) {
      tl.fromTo(familiesRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, 1.0)
    }

    if (coupleRef.current) {
      tl.fromTo(coupleRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, 1.2)
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="min-h-[150vh] flex flex-col items-center justify-center px-6 py-48 md:py-64 text-center bg-cream relative overflow-hidden"
    >
      {/* Very faint background mandala or Om for cultural depth */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <span className="text-[40vw] text-rose font-serif leading-none">ॐ</span>
      </div>

      {/* 3D Glowing Mandala Background */}
      <div ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40">
        {inView && (
          <Canvas camera={{ position: [0, 0, 3], fov: 50 }} dpr={[1, 1.5]}>
            <DivineMandalaRing />
          </Canvas>
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-2xl">
        {/* Sacred Symbol */}
        <div ref={omRef} className="mb-12 opacity-0">
          <span className="text-5xl md:text-6xl text-rose/80 font-serif">ॐ</span>
        </div>

        {/* Sanskrit Cultural Quote */}
        <p
          ref={sanskritRef}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal/90 mb-4 opacity-0 tracking-wide"
          style={{ letterSpacing: '0.05em' }}
        >
          अतिथिदेवो भव:
        </p>

        {/* English Translation */}
        <p
          ref={englishRef}
          className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-rose mb-16 opacity-0"
        >
          The Guest is Equivalent to God
        </p>

        {/* Traditional Gratitude */}
        <p
          ref={thankRef}
          className="font-serif text-lg md:text-xl text-charcoal/70 italic leading-relaxed mb-20 md:mb-28 opacity-0 px-4"
        >
          With folded hands and hearts full of joy, we deeply thank you for gracing our sacred union with your presence, love, and timeless blessings.
        </p>

        {/* Traditional Ornament */}
        <div ref={ornamentRef} className="flex items-center gap-4 mb-20 md:mb-24 opacity-0 w-full max-w-xs justify-center">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-rose/30" />
          <span className="text-rose/50 text-sm">❀</span>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-rose/30" />
        </div>

        {/* Signatures in traditional hierarchy */}
        <div ref={familiesRef} className="mb-10 opacity-0 flex flex-col items-center gap-3">
          <p className="font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-stone/60">
            In Heartfelt Gratitude
          </p>
          <p className="font-serif text-xl md:text-2xl text-charcoal/80">
            The Sah & Sachdeva Families
          </p>
        </div>

        <div ref={coupleRef} className="opacity-0">
          <p className="font-script text-4xl md:text-5xl text-rose mt-4">
            {content.couple.groom.split(' ')[0]} & {content.couple.bride.split(' ')[0]}
          </p>
        </div>
      </div>
    </section>
  )
}
