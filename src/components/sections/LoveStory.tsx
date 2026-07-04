'use client'
import { useRef, useEffect } from 'react'
import { content } from '@/config/content'
import gsap from 'gsap'

export default function LoveStory() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const moments = gsap.utils.toArray('.story-moment') as HTMLElement[]

    moments.forEach((moment) => {
      // Text fades in tied to scroll position
      const text = moment.querySelector('.story-text') as HTMLElement | null
      const number = moment.querySelector('.story-number') as HTMLElement | null
      const line = moment.querySelector('.story-line') as HTMLElement | null

      if (number) {
        gsap.fromTo(number,
          { opacity: 0 },
          { opacity: 1, duration: 1, scrollTrigger: { trigger: moment, start: 'top 70%', end: 'top 40%', scrub: 1 } }
        )
      }
      if (text) {
        gsap.fromTo(text,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: moment, start: 'top 60%', end: 'top 30%', scrub: 1 } }
        )
      }
      if (line) {
        gsap.fromTo(line,
          { scaleX: 0 },
          { scaleX: 1, scrollTrigger: { trigger: moment, start: 'bottom 60%', end: 'bottom 30%', scrub: 1 } }
        )
      }
    })
  }, [])

  return (
    <section ref={containerRef} className="py-32 md:py-48">
      {/* Chapter label */}
      <div className="flex flex-col items-center gap-3 mb-32 md:mb-48">
        <span className="font-serif text-2xl md:text-3xl text-gold italic">III</span>
        <span className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-stone">
          Our Story
        </span>
      </div>

      {/* Story moments — each occupies generous vertical space */}
      <div className="flex flex-col">
        {content.story.map((chapter, index) => (
          <div
            key={index}
            className="story-moment min-h-[70vh] flex flex-col items-center justify-center px-6 text-center"
          >
            <span className="story-number font-serif text-3xl md:text-4xl text-gold/60 italic mb-10 md:mb-14 opacity-0">
              {chapter.number}
            </span>
            <p
              className="story-text font-serif font-light italic leading-snug max-w-lg opacity-0"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', color: 'var(--color-charcoal)' }}
            >
              {chapter.text}
            </p>
            {/* Connecting gold line — grows between moments */}
            {index < content.story.length - 1 && (
              <div className="story-line gold-line w-12 mt-20 md:mt-28 origin-left" style={{ transform: 'scaleX(0)' }} />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
