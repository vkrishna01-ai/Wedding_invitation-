'use client'
import { useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { content } from '@/config/content'
import { revealOnScroll } from '@/lib/animations'

const GaneshScene = dynamic(() => import('@/components/3d/GaneshScene'), {
  ssr: false,
  loading: () => (
    <div className="ganesh-scene-container" style={{ opacity: 0.3 }} />
  ),
})

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null)
  const ganeshRef = useRef<HTMLDivElement>(null)
  const prefixRef = useRef<HTMLParagraphElement>(null)
  const namesRef = useRef<HTMLHeadingElement>(null)
  const requestRef = useRef<HTMLParagraphElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Staggered reveal — each element fades in sequentially
    revealOnScroll(ganeshRef.current, { delay: 0.2, y: 20, duration: 1.5 })
    revealOnScroll(prefixRef.current, { delay: 0.8, y: 15 })
    revealOnScroll(namesRef.current, { delay: 1.6, y: 0, duration: 3 })
    revealOnScroll(requestRef.current, { delay: 2.8, y: 15 })
    revealOnScroll(detailsRef.current, { delay: 3.6, y: 15 })
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24 md:py-32">
      <div
        ref={cardRef}
        className="card gold-frame w-full max-w-3xl px-8 py-20 md:px-16 md:py-32 lg:px-24 lg:py-40 flex flex-col items-center text-center"
      >
        {/* Shri Ganesh — 3D Scene */}
        <div ref={ganeshRef} className="flex flex-col items-center opacity-0 mb-8 md:mb-12">
          <GaneshScene />
          <p
            className="font-serif text-[10px] md:text-xs tracking-[0.25em] uppercase mt-2 gold-foil"
            style={{ letterSpacing: '0.25em' }}
          >
            ॥ श्री गणेशाय नमः ॥
          </p>
          <div className="gold-line w-20 mt-6" />
        </div>

        {/* Prefix */}
        <p
          ref={prefixRef}
          className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-stone opacity-0 mb-16 md:mb-20"
        >
          {content.invitation.prefix}
        </p>

        {/* Names */}
        <h1
          ref={namesRef}
          className="font-serif font-light leading-[1.1] mb-16 md:mb-20 opacity-0"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)', letterSpacing: '0.12em' }}
        >
          <span className="block uppercase letterpress">
            {content.couple.groom.split(' ')[0]}
          </span>
          <span className="block gold-foil my-6 md:my-10 italic font-light" style={{ fontSize: '0.45em', letterSpacing: '0.05em' }}>
            &amp;
          </span>
          <span className="block uppercase letterpress">
            {content.couple.bride.split(' ')[0]}
          </span>
        </h1>

        {/* Request */}
        <p
          ref={requestRef}
          className="font-serif text-base md:text-lg text-stone italic leading-relaxed max-w-sm opacity-0 whitespace-pre-line"
        >
          {content.invitation.request}
        </p>

        {/* Divider */}
        <div className="gold-line w-16 my-12 md:my-16" />

        {/* Date & Location */}
        <div ref={detailsRef} className="flex flex-col items-center gap-3 opacity-0">
          <p
            className="font-serif font-light uppercase tracking-[0.2em] text-charcoal"
            style={{ fontSize: 'clamp(0.875rem, 2vw, 1.25rem)' }}
          >
            {content.weddingDetails.dateWritten.day}
          </p>
          <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-stone">
            {content.weddingDetails.dateWritten.year}
          </p>
          <div className="gold-line w-8 my-4" />
          <p className="font-serif text-lg md:text-xl text-charcoal/70 italic">
            {content.weddingDetails.city}, {content.weddingDetails.state}
          </p>
        </div>
      </div>
    </section>
  )
}
