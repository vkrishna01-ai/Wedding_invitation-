'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { Canvas } from '@react-three/fiber'
import GoldenParticles from '@/components/3d/GoldenParticles'
import { content } from '@/config/content'
import { revealOnScroll } from '@/lib/animations'



export default function Hero() {
  const photoRef = useRef<HTMLDivElement>(null)
  const namesRef = useRef<HTMLHeadingElement>(null)
  const scriptRef = useRef<HTMLParagraphElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const blessingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    revealOnScroll(blessingRef.current, { delay: 0.2, y: 10, duration: 1.5 })
    revealOnScroll(photoRef.current, { delay: 0.6, y: 20, duration: 2 })
    revealOnScroll(scriptRef.current, { delay: 1.2, y: 10, duration: 2 })
    revealOnScroll(namesRef.current, { delay: 1.8, y: 0, duration: 2.5 })
    revealOnScroll(detailsRef.current, { delay: 2.8, y: 15, duration: 2 })
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 md:py-28 overflow-hidden bg-cream">
      {/* 3D Background Sparkles */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <GoldenParticles count={150} />
        </Canvas>
      </div>


      {/* Shri Ganesh blessing */}
      <div ref={blessingRef} className="flex flex-col items-center opacity-0 mb-10 z-10 text-center max-w-2xl px-4 mt-8 md:mt-12">
        <div className="mb-6 relative w-24 h-24 md:w-32 md:h-32">
          <Image 
            src="/images/ganesh.png" 
            alt="Shri Ganesh" 
            fill 
            className="object-contain drop-shadow-md"
            priority
          />
        </div>
        <p className="font-serif text-sm md:text-base leading-relaxed text-rose/80 mb-6 font-medium">
          ॥ श्री गणेशाय नमः ॥<br/>
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ<br/>
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
        </p>
        <p className="font-serif text-sm md:text-base text-charcoal/70 italic tracking-wide leading-relaxed">
          With the blessings of Shri Ganesh and our beloved families, we joyfully invite you to celebrate the union of
        </p>
      </div>

      {/* Couple Photo Frame */}
      <div
        ref={photoRef}
        className="relative z-10 w-[280px] h-[360px] md:w-[340px] md:h-[440px] lg:w-[380px] lg:h-[480px] mb-8 opacity-0"
      >
        {/* Photo placeholder with gradient overlay */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 30%, #FECDD3 60%, #FFE4E6 100%)',
            boxShadow: '0 20px 60px rgba(225, 29, 72, 0.12), 0 4px 20px rgba(0,0,0,0.06)',
          }}
        >
          {/* Decorative couple silhouette area */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-7xl md:text-8xl opacity-20">💑</span>
            <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-rose/40 mt-4">
              Your photo here
            </p>
          </div>

          {/* Subtle inner border */}
          <div className="absolute inset-3 rounded-xl border border-white/40 pointer-events-none" />
        </div>

        {/* Decorative frame corner accents */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-rose/20 rounded-tl-md" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-rose/20 rounded-tr-md" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-rose/20 rounded-bl-md" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-rose/20 rounded-br-md" />
      </div>

      {/* "Forever" script text */}
      <p
        ref={scriptRef}
        className="font-script text-4xl md:text-5xl lg:text-6xl text-rose/70 z-10 mb-4 opacity-0"
      >
        Forever Us
      </p>

      {/* Couple Names */}
      <h1
        ref={namesRef}
        className="font-serif font-light text-center leading-[1.15] z-10 mb-6 opacity-0"
        style={{ fontSize: 'clamp(2rem, 7vw, 5rem)', letterSpacing: '0.08em' }}
      >
        <span className="block uppercase text-charcoal">
          {content.couple.groom.split(' ')[0]}
        </span>
        <span
          className="block font-script my-3 md:my-5 text-rose/60"
          style={{ fontSize: '0.5em', letterSpacing: '0.02em' }}
        >
          &amp;
        </span>
        <span className="block uppercase text-charcoal">
          {content.couple.bride.split(' ')[0]}
        </span>
      </h1>

      {/* Rose divider */}
      <div className="rose-line w-20 mb-6 z-10" />

      {/* Date & Location */}
      <div ref={detailsRef} className="flex flex-col items-center gap-2 z-10 opacity-0">
        <p className="font-sans text-[10px] md:text-xs tracking-[0.25em] uppercase text-stone">
          {content.invitation.prefix}
        </p>
        <p
          className="font-serif font-light uppercase tracking-[0.15em] text-charcoal/80"
          style={{ fontSize: 'clamp(0.875rem, 2vw, 1.2rem)' }}
        >
          {content.weddingDetails.dateWritten.day}
        </p>
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone/60">
          {content.weddingDetails.dateWritten.year}
        </p>
        <div className="rose-line w-8 my-2" />
        <p className="font-serif text-base md:text-lg text-charcoal/60 italic">
          {content.weddingDetails.city}, {content.weddingDetails.state}
        </p>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2" style={{ animation: 'gentleBounce 3s ease-in-out infinite' }}>
          <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-stone/40">
            Scroll
          </span>
          <span className="text-rose/30 text-sm">↓</span>
        </div>
      </div>
    </section>
  )
}
