'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { revealOnScroll } from '@/lib/animations'

export default function Blessings() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const sanskritRef = useRef<HTMLParagraphElement>(null)
  const translationRef = useRef<HTMLParagraphElement>(null)
  const blessingRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    revealOnScroll(imageRef.current, { delay: 0.2, y: 30, duration: 2 })
    revealOnScroll(sanskritRef.current, { delay: 0.6, y: 20 })
    revealOnScroll(translationRef.current, { delay: 1.0, y: 20 })
    revealOnScroll(blessingRef.current, { delay: 1.4, y: 20 })
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 md:py-32 relative bg-parchment"
    >
      <div className="max-w-3xl w-full flex flex-col items-center text-center">
        
        {/* Image */}
        <div ref={imageRef} className="relative w-48 h-48 md:w-64 md:h-64 mb-16 opacity-0">
          <Image
            src="/mandala_blessing.png"
            alt="Divine Blessing Mandala"
            fill
            className="object-contain drop-shadow-xl"
            style={{ filter: 'sepia(0.2) saturate(1.1)' }}
          />
        </div>

        {/* Sanskrit Sloka */}
        <p
          ref={sanskritRef}
          className="font-serif text-2xl md:text-3xl lg:text-4xl text-charcoal leading-loose mb-8 opacity-0"
          style={{ letterSpacing: '0.05em' }}
        >
          मंगलम भगवान विष्णु, मंगलम गरुणध्वजः।<br />
          मंगलम पुण्डरीकाक्ष, मंगलाय तनो हरिः॥
        </p>

        {/* Gold Divider */}
        <div className="gold-line w-24 mb-8" />

        {/* Translation */}
        <p
          ref={translationRef}
          className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-stone mb-16 opacity-0 max-w-xl leading-relaxed"
        >
          May Lord Vishnu be auspicious, may the one with Garuda on his flag be auspicious.<br />
          May the lotus-eyed Lord be auspicious, may Lord Hari bestow auspiciousness upon us.
        </p>

        {/* Blessing Message */}
        <p
          ref={blessingRef}
          className="font-serif text-lg md:text-xl text-charcoal/80 italic leading-relaxed max-w-2xl opacity-0"
        >
          With the divine blessings of the Almighty and our beloved grandparents, 
          we step into a beautiful new chapter of togetherness and love.
        </p>

      </div>
    </section>
  )
}
