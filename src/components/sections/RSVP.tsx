'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import SacredRSVPScene from '@/components/3d/SacredRSVPScene'
import type { Guest } from '@/config/guests'
import { content } from '@/config/content'
import { revealOnScroll } from '@/lib/animations'
import gsap from 'gsap'

export default function RSVP({ guest }: { guest?: Guest }) {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)
  const thankYouRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  
  // Custom RSVP fields for whimsical design
  const [song, setSong] = useState('')
  const [dietary, setDietary] = useState('No specific preferences')
  const [advice, setAdvice] = useState('')

  useEffect(() => {
    revealOnScroll(labelRef.current, { y: 15 })
    revealOnScroll(cardRef.current, { y: 30, duration: 2.5 })
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    if (sealRef.current && thankYouRef.current) {
      const tl = gsap.timeline()
      tl.fromTo(sealRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.4, ease: 'back.out(1.4)' }
      )
      tl.fromTo(thankYouRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.8, ease: 'power2.out' },
        '-=0.4'
      )
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 md:py-32 px-4 md:px-8 bg-cream overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <SacredRSVPScene />
        </Canvas>
      </div>

      {/* Chapter label */}
      <div ref={labelRef} className="relative z-10 flex flex-col items-center gap-3 mb-12 md:mb-16 opacity-0">
        <span className="font-serif text-2xl md:text-3xl text-rose/60 italic">V</span>
        <span className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-stone">
          Kindly Respond
        </span>
        <div className="rose-line w-24 mt-1" />
      </div>

      {/* ═══════════════════ MAIN INVITATION CARD ═══════════════════ */}
      <div
        ref={cardRef}
        className="relative w-full max-w-xl z-10 opacity-0"
      >
        {/* Card body */}
        <div
          className="relative px-6 py-12 md:px-12 md:py-16 rounded-3xl"
          style={{
            background: 'var(--color-warm-white)',
            boxShadow: '0 4px 40px rgba(225, 29, 72, 0.08), 0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          {/* Decorative floating leaves/petals */}
          <div className="absolute top-10 left-10 text-xl float-leaf opacity-60 text-rose/30">🍂</div>
          <div className="absolute top-40 right-10 text-xl float-leaf opacity-60 text-rose/40" style={{ animationDelay: '1s' }}>🌸</div>
          <div className="absolute bottom-32 left-8 text-xl float-leaf opacity-60 text-amber/40" style={{ animationDelay: '2s' }}>🍃</div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col">
              
              {/* Title */}
              <h2
                className="font-script text-3xl md:text-4xl text-rose text-center mb-8"
              >
                Will you join us?
              </h2>

              {/* ─── Name Field ─── */}
              <div className="w-full mb-8 relative z-10">
                <input
                  type="text"
                  required
                  id="rsvp-name"
                  className="w-full bg-white/50 border border-stone/20 rounded-xl px-4 py-3 text-charcoal focus:outline-none focus:border-rose/40 focus:ring-1 focus:ring-rose/40 transition-colors font-serif text-lg placeholder:text-stone/40 placeholder:italic"
                  placeholder="Your Full Name"
                  defaultValue={guest?.name || ''}
                />
              </div>

              {/* ─── Song Request ─── */}
              <div className="w-full mb-8 relative z-10">
                <label className="font-serif text-lg text-charcoal/80 italic block mb-2">
                  A song for the dance floor 🎵
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={song}
                    onChange={(e) => setSong(e.target.value)}
                    className="w-full bg-white/50 border border-stone/20 rounded-xl px-4 py-3 text-charcoal focus:outline-none focus:border-rose/40 focus:ring-1 focus:ring-rose/40 transition-colors font-serif text-lg placeholder:text-stone/40"
                    placeholder="Kala Chashma"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30">
                    🎧
                  </div>
                </div>
              </div>

              {/* ─── Dietary Preferences ─── */}
              <div className="w-full mb-8 relative z-10">
                <label className="font-serif text-lg text-charcoal/80 italic block mb-2">
                  Dietary preferences 🍽️
                </label>
                <select
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="w-full bg-white/50 border border-stone/20 rounded-xl px-4 py-3 text-charcoal focus:outline-none focus:border-rose/40 focus:ring-1 focus:ring-rose/40 transition-colors font-serif text-lg appearance-none"
                >
                  <option>No specific preferences</option>
                  <option>Vegetarian</option>
                  <option>Vegan</option>
                  <option>Gluten-Free</option>
                  <option>Other (Will contact)</option>
                </select>
                <div className="absolute right-4 top-[65%] -translate-y-1/2 opacity-30 pointer-events-none">
                  ▼
                </div>
              </div>

              {/* ─── Marriage Advice ─── */}
              <div className="w-full mb-10 relative z-10">
                <label className="font-serif text-lg text-charcoal/80 italic block mb-2">
                  Marriage advice for us 💌
                </label>
                <textarea
                  value={advice}
                  onChange={(e) => setAdvice(e.target.value)}
                  rows={3}
                  className="w-full bg-white/50 border border-stone/20 rounded-xl px-4 py-3 text-charcoal focus:outline-none focus:border-rose/40 focus:ring-1 focus:ring-rose/40 transition-colors font-serif text-lg placeholder:text-stone/30 resize-none"
                  placeholder="Always remember to..."
                />
              </div>

              {/* ─── Submit Button ─── */}
              <button
                type="submit"
                id="rsvp-submit"
                className="btn-rose w-full py-4 text-sm relative z-10 shadow-lg"
              >
                Send RSVP 💌
              </button>
            </form>
          ) : (
            /* ═══════════════ THANK YOU STATE ═══════════════ */
            <div className="flex flex-col items-center text-center py-8 relative z-10">
              <div
                ref={sealRef}
                className="relative w-24 h-24 mb-8 opacity-0 bg-rose rounded-full flex items-center justify-center text-white text-3xl shadow-[0_4px_20px_rgba(225,29,72,0.4)]"
              >
                ✓
              </div>

              <div ref={thankYouRef} className="opacity-0">
                <h3 className="font-script text-4xl md:text-5xl text-rose mb-4">
                  Thank You!
                </h3>
                <p className="font-serif text-lg text-charcoal/70 italic mb-3 max-w-md">
                  Your response has been saved. We can&apos;t wait to celebrate with you!
                </p>
                <p className="font-sans text-xs text-stone/60 max-w-sm mx-auto">
                  Mark your calendar — {content.weddingDetails.date} at {content.weddingDetails.venue}.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
