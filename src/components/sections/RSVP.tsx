'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
import type { Guest } from '@/config/guests'
import { revealOnScroll } from '@/lib/animations'
import gsap from 'gsap'

export default function RSVP({ guest }: { guest?: Guest }) {
  const labelRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)
  const thankYouRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    revealOnScroll(labelRef.current, { y: 15 })
    revealOnScroll(cardRef.current, { y: 20, duration: 2.5 })
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    // Seal confirmation animation
    if (sealRef.current && thankYouRef.current) {
      const tl = gsap.timeline()
      tl.fromTo(sealRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.2)' }
      )
      tl.fromTo(thankYouRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' },
        '-=0.3'
      )
    }
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32 md:py-48">
      {/* Chapter label */}
      <div ref={labelRef} className="flex flex-col items-center gap-3 mb-20 md:mb-28 opacity-0">
        <span className="font-serif text-2xl md:text-3xl text-gold italic">V</span>
        <span className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-stone">
          Kindly Respond
        </span>
      </div>

      {/* Response card */}
      <div ref={cardRef} className="card gold-frame w-full max-w-2xl px-8 py-16 md:px-16 md:py-24 opacity-0">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <h2 className="font-serif font-light text-2xl md:text-3xl text-charcoal text-center tracking-[0.1em] letterpress mb-3">
              Répondez S&apos;il Vous Plaît
            </h2>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone mb-16 md:mb-20">
              Kindly respond by the first of October
            </p>

            {/* Name field */}
            <div className="w-full max-w-md mb-12">
              <label className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone block mb-2">
                M.
              </label>
              <input
                type="text"
                required
                className="w-full bg-transparent border-b border-charcoal/15 pb-3 text-charcoal focus:outline-none focus:border-gold transition-colors duration-500 font-serif text-xl md:text-2xl italic placeholder:text-stone/30"
                placeholder="Your Full Name"
                defaultValue={guest?.name || ''}
              />
            </div>

            {/* Attendance */}
            <div className="w-full max-w-md mb-12">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone mb-6">
                Attendance
              </p>
              <div className="flex flex-col gap-5">
                <label className="flex items-center gap-4 cursor-pointer group">
                  <input type="radio" name="attendance" value="yes" className="peer sr-only" defaultChecked />
                  <span className="w-3 h-3 rounded-full border border-stone/30 flex items-center justify-center peer-checked:border-gold transition-colors duration-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold scale-0 peer-checked:scale-100 transition-transform duration-500" />
                  </span>
                  <span className="font-serif text-lg text-charcoal/70 peer-checked:text-charcoal italic transition-colors duration-500">
                    Accepts with Pleasure
                  </span>
                </label>
                <label className="flex items-center gap-4 cursor-pointer group">
                  <input type="radio" name="attendance" value="no" className="peer sr-only" />
                  <span className="w-3 h-3 rounded-full border border-stone/30 flex items-center justify-center peer-checked:border-gold transition-colors duration-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold scale-0 peer-checked:scale-100 transition-transform duration-500" />
                  </span>
                  <span className="font-serif text-lg text-charcoal/70 peer-checked:text-charcoal italic transition-colors duration-500">
                    Declines with Regret
                  </span>
                </label>
              </div>
            </div>

            {/* Number of guests */}
            <div className="w-full max-w-md mb-16">
              <label className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone block mb-2">
                Number of Guests
              </label>
              <input
                type="number"
                min="1"
                max="4"
                defaultValue="1"
                className="w-20 bg-transparent border-b border-charcoal/15 pb-3 text-charcoal focus:outline-none focus:border-gold transition-colors duration-500 font-serif text-xl text-center"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="py-4 px-12 border border-charcoal/15 font-sans text-[10px] tracking-[0.3em] uppercase text-charcoal hover:bg-parchment hover:border-gold-light transition-all duration-700"
            >
              Send Reply
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center text-center py-8">
            {/* Gold seal confirmation */}
            <div ref={sealRef} className="w-20 h-20 rounded-full bg-gold/10 border border-gold-light/40 flex items-center justify-center mb-10 opacity-0">
              <span className="font-serif text-gold text-2xl italic">✓</span>
            </div>
            <div ref={thankYouRef} className="opacity-0">
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal letterpress mb-4">
                Thank You
              </h3>
              <p className="font-serif text-stone italic text-lg">
                We look forward to celebrating with you.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
