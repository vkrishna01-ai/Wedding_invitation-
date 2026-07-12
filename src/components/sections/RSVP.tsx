'use client'
import { useRef, useEffect, useState, useCallback, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import type { Guest } from '@/config/guests'
import { content } from '@/config/content'
import { revealOnScroll, staggerReveal } from '@/lib/animations'
import gsap from 'gsap'
import SacredRSVPScene from '@/components/3d/SacredRSVPScene'

export default function RSVP({ guest }: { guest?: Guest }) {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)
  const thankYouRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [attendance, setAttendance] = useState<'yes' | 'no'>('yes')

  useEffect(() => {
    revealOnScroll(labelRef.current, { y: 15 })
    revealOnScroll(sceneRef.current, { y: 20, duration: 2.5 })
    revealOnScroll(cardRef.current, { y: 30, duration: 2.5 })

    const ornaments = gsap.utils.toArray('.rsvp-ornament') as HTMLElement[]
    staggerReveal(ornaments, { y: 10, stagger: 0.2, start: 'top 85%' })
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    // Seal confirmation animation
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
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-24 md:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--color-ivory) 0%, var(--color-parchment) 30%, var(--color-parchment) 70%, var(--color-ivory) 100%)' }}
    >
      {/* Background sacred pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-gold) 1px, transparent 1px),
                            radial-gradient(circle at 75% 75%, var(--color-gold) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Chapter label */}
      <div ref={labelRef} className="flex flex-col items-center gap-3 mb-12 md:mb-16 opacity-0 z-10">
        <span className="font-serif text-2xl md:text-3xl text-gold italic">V</span>
        <span className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-stone">
          Kindly Respond
        </span>
        <div className="gold-line w-24 mt-1" />
      </div>

      {/* 3D Sacred Scene */}
      <div
        ref={sceneRef}
        className="relative w-full max-w-md mx-auto opacity-0 z-10"
        style={{ height: '200px' }}
      >
        <Canvas
          camera={{ position: [0, 0, 4], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <SacredRSVPScene />
          </Suspense>
        </Canvas>

        {/* Sacred text over 3D scene */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p
            className="font-serif text-lg md:text-xl text-charcoal/60 italic text-center leading-relaxed"
            style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}
          >
            ॐ शुभ विवाह
          </p>
          <p className="font-sans text-[8px] md:text-[9px] tracking-[0.3em] uppercase text-stone/50 mt-1">
            Sacred Union
          </p>
        </div>
      </div>

      {/* ═══════════════════ MAIN INVITATION CARD ═══════════════════ */}
      <div
        ref={cardRef}
        className="relative w-full max-w-2xl z-10 opacity-0 mt-6"
      >
        {/* Outer ornamental border */}
        <div className="absolute inset-0 rounded-sm border border-gold/20 pointer-events-none" />
        <div className="absolute inset-2 rounded-sm border border-gold/10 pointer-events-none" />

        {/* Corner ornaments */}
        <div className="rsvp-ornament absolute top-3 left-3 w-8 h-8 opacity-0">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-gold/40 to-transparent" />
          <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-gold/40 to-transparent" />
        </div>
        <div className="rsvp-ornament absolute top-3 right-3 w-8 h-8 opacity-0">
          <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-gold/40 to-transparent" />
          <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-gold/40 to-transparent" />
        </div>
        <div className="rsvp-ornament absolute bottom-3 left-3 w-8 h-8 opacity-0">
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-gold/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-[1px] h-full bg-gradient-to-t from-gold/40 to-transparent" />
        </div>
        <div className="rsvp-ornament absolute bottom-3 right-3 w-8 h-8 opacity-0">
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-gold/40 to-transparent" />
          <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-t from-gold/40 to-transparent" />
        </div>

        {/* Card body */}
        <div
          className="relative px-8 py-14 md:px-14 md:py-20"
          style={{
            background: 'linear-gradient(135deg, var(--color-warm-white) 0%, #FAF7F0 50%, var(--color-warm-white) 100%)',
            boxShadow: '0 4px 40px rgba(197, 165, 90, 0.08), 0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              {/* Top decorative motif */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold/30" />
                <span className="font-serif text-gold/50 text-lg">✦</span>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold/30" />
              </div>

              {/* Sanskrit invocation */}
              <p className="font-serif text-sm md:text-base text-charcoal/40 mb-2 tracking-wider">
                शुभ मंगल सावधान
              </p>

              {/* Title */}
              <h2
                className="font-serif font-light text-3xl md:text-4xl text-charcoal text-center tracking-[0.08em] letterpress mb-3"
              >
                Répondez S&apos;il Vous Plaît
              </h2>

              {/* Subtitle */}
              <p className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-stone mb-4">
                We request the honour of your reply
              </p>

              {/* Date reminder */}
              <div className="flex items-center gap-3 mb-10 md:mb-14">
                <div className="w-8 h-[1px] bg-gold/20" />
                <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-stone/60">
                  {content.weddingDetails.date}
                </span>
                <div className="w-8 h-[1px] bg-gold/20" />
              </div>

              {/* Personalized message for guest */}
              {guest?.personalizedMessage && (
                <p className="font-serif text-sm text-charcoal/60 italic text-center mb-10 max-w-sm">
                  &ldquo;{guest.personalizedMessage}&rdquo;
                </p>
              )}

              {/* ─── Name Field ─── */}
              <div className="w-full max-w-md mb-10">
                <label className="font-sans text-[9px] tracking-[0.35em] uppercase text-stone/70 block mb-3">
                  The honour of
                </label>
                <div className="relative">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 font-serif text-xl text-gold/40 italic">
                    M.
                  </span>
                  <input
                    type="text"
                    required
                    id="rsvp-name"
                    className="w-full bg-transparent border-b border-gold/15 pb-3 pl-8 text-charcoal focus:outline-none focus:border-gold/40 transition-colors duration-700 font-serif text-xl md:text-2xl italic placeholder:text-stone/20"
                    placeholder="Your Full Name"
                    defaultValue={guest?.name || ''}
                  />
                </div>
              </div>

              {/* ─── Attendance ─── */}
              <div className="w-full max-w-md mb-10">
                <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-stone/70 mb-5">
                  Your gracious response
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {/* Accepts */}
                  <button
                    type="button"
                    onClick={() => setAttendance('yes')}
                    className={`
                      relative py-5 px-4 rounded-sm border transition-all duration-700 group
                      ${attendance === 'yes'
                        ? 'border-gold/30 bg-gold/[0.04]'
                        : 'border-charcoal/8 bg-transparent hover:border-gold/15 hover:bg-gold/[0.02]'
                      }
                    `}
                  >
                    {/* Selected indicator */}
                    <div
                      className={`
                        absolute top-3 right-3 w-2.5 h-2.5 rounded-full border transition-all duration-500
                        ${attendance === 'yes' ? 'border-gold bg-gold/30' : 'border-stone/20'}
                      `}
                    >
                      <div
                        className={`
                          absolute inset-0.5 rounded-full bg-gold transition-transform duration-500
                          ${attendance === 'yes' ? 'scale-100' : 'scale-0'}
                        `}
                      />
                    </div>
                    <span className="font-serif text-sm md:text-base text-charcoal/80 italic block">
                      Accepts
                    </span>
                    <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-stone/50 block mt-1">
                      with pleasure
                    </span>
                  </button>

                  {/* Declines */}
                  <button
                    type="button"
                    onClick={() => setAttendance('no')}
                    className={`
                      relative py-5 px-4 rounded-sm border transition-all duration-700 group
                      ${attendance === 'no'
                        ? 'border-gold/30 bg-gold/[0.04]'
                        : 'border-charcoal/8 bg-transparent hover:border-gold/15 hover:bg-gold/[0.02]'
                      }
                    `}
                  >
                    <div
                      className={`
                        absolute top-3 right-3 w-2.5 h-2.5 rounded-full border transition-all duration-500
                        ${attendance === 'no' ? 'border-gold bg-gold/30' : 'border-stone/20'}
                      `}
                    >
                      <div
                        className={`
                          absolute inset-0.5 rounded-full bg-gold transition-transform duration-500
                          ${attendance === 'no' ? 'scale-100' : 'scale-0'}
                        `}
                      />
                    </div>
                    <span className="font-serif text-sm md:text-base text-charcoal/80 italic block">
                      Declines
                    </span>
                    <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-stone/50 block mt-1">
                      with regret
                    </span>
                  </button>
                </div>
                <input type="hidden" name="attendance" value={attendance} />
              </div>

              {/* ─── Number of Guests ─── */}
              {attendance === 'yes' && (
                <div className="w-full max-w-md mb-10 flex items-end gap-6">
                  <div className="flex-1">
                    <label
                      htmlFor="rsvp-guests"
                      className="font-sans text-[9px] tracking-[0.35em] uppercase text-stone/70 block mb-3"
                    >
                      Number of guests attending
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        id="rsvp-guests"
                        min="1"
                        max={guest?.allowedGuests || 4}
                        defaultValue="1"
                        className="w-20 bg-transparent border-b border-gold/15 pb-3 text-charcoal focus:outline-none focus:border-gold/40 transition-colors duration-700 font-serif text-2xl text-center"
                      />
                      <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-stone/40">
                        {guest?.allowedGuests ? `of ${guest.allowedGuests} allowed` : 'guests'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── Dietary / Special Notes ─── */}
              {attendance === 'yes' && (
                <div className="w-full max-w-md mb-12">
                  <label
                    htmlFor="rsvp-notes"
                    className="font-sans text-[9px] tracking-[0.35em] uppercase text-stone/70 block mb-3"
                  >
                    Any special dietary requirements or notes
                  </label>
                  <textarea
                    id="rsvp-notes"
                    rows={2}
                    className="w-full bg-transparent border-b border-gold/15 pb-3 text-charcoal focus:outline-none focus:border-gold/40 transition-colors duration-700 font-serif text-base italic placeholder:text-stone/20 resize-none"
                    placeholder="Optional"
                  />
                </div>
              )}

              {/* Divider before submit */}
              <div className="flex items-center gap-4 mb-8 w-full max-w-md">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-gold/15" />
                <span className="font-serif text-gold/30 text-xs">☙</span>
                <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-gold/15" />
              </div>

              {/* ─── Submit Button ─── */}
              <button
                type="submit"
                id="rsvp-submit"
                className="
                  relative py-4 px-14 border border-gold/20 font-sans text-[10px] tracking-[0.35em] uppercase text-charcoal/80
                  overflow-hidden rounded-sm
                  transition-all duration-700
                  hover:border-gold/40 hover:text-charcoal hover:shadow-lg hover:shadow-gold/5
                  active:scale-[0.98]
                  group
                "
              >
                {/* Hover fill */}
                <span className="absolute inset-0 bg-gradient-to-r from-gold/[0.03] via-gold/[0.06] to-gold/[0.03] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                <span className="relative z-10">
                  {attendance === 'yes' ? 'Accept with Joy' : 'Send Reply'}
                </span>
              </button>

              {/* Respond-by note */}
              <p className="font-sans text-[8px] tracking-[0.25em] uppercase text-stone/40 mt-6">
                Kindly respond by the fifteenth of January, 2027
              </p>
            </form>
          ) : (
            /* ═══════════════ THANK YOU STATE ═══════════════ */
            <div className="flex flex-col items-center text-center py-8">
              {/* Gold wax seal */}
              <div
                ref={sealRef}
                className="relative w-24 h-24 md:w-28 md:h-28 mb-10 opacity-0"
              >
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-gold/30" />
                <div className="absolute inset-1 rounded-full border border-gold/20" />
                {/* Inner seal */}
                <div
                  className="absolute inset-3 rounded-full flex flex-col items-center justify-center"
                  style={{
                    background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)',
                  }}
                >
                  <span className="font-serif text-gold text-2xl md:text-3xl">✓</span>
                  <span className="font-sans text-[6px] tracking-[0.3em] uppercase text-gold/60 mt-0.5">
                    Sealed
                  </span>
                </div>
              </div>

              <div ref={thankYouRef} className="opacity-0">
                {/* Sanskrit blessing */}
                <p className="font-serif text-sm text-charcoal/30 mb-4 tracking-wider">
                  शुभं भवतु ✦ May it be auspicious
                </p>

                <h3 className="font-serif text-3xl md:text-4xl text-charcoal letterpress mb-4 tracking-[0.08em]">
                  Thank You
                </h3>

                <div className="gold-line w-16 mx-auto mb-6" />

                {attendance === 'yes' ? (
                  <>
                    <p className="font-serif text-lg text-charcoal/70 italic mb-3 max-w-md">
                      We are overjoyed that you will be joining us in celebration.
                    </p>
                    <p className="font-sans text-xs text-stone/60 max-w-sm">
                      Mark your calendar — {content.weddingDetails.date} at {content.weddingDetails.venue}, {content.weddingDetails.city}.
                      We shall send you further details soon.
                    </p>
                  </>
                ) : (
                  <p className="font-serif text-lg text-charcoal/70 italic mb-3 max-w-md">
                    You will be dearly missed. We send our love and best wishes your way.
                  </p>
                )}

                {/* Contact info */}
                <div className="mt-10 flex flex-col items-center gap-2">
                  <p className="font-sans text-[8px] tracking-[0.3em] uppercase text-stone/40">
                    For inquiries
                  </p>
                  <p className="font-serif text-sm text-charcoal/50 italic">
                    {content.contacts.helpline}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom decorative motif */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold/20" />
            <span className="font-serif text-gold/30 text-xs">❧</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold/20" />
          </div>
        </div>
      </div>

      {/* Bottom families info */}
      <div className="rsvp-ornament mt-12 md:mt-16 text-center opacity-0 z-10">
        <p className="font-sans text-[8px] tracking-[0.4em] uppercase text-stone/40 mb-3">
          With the blessings of
        </p>
        <p className="font-serif text-sm text-charcoal/50 italic">
          {content.family.groom.parents.join(' & ')}
        </p>
        <p className="font-serif text-[10px] text-stone/30 my-1">&</p>
        <p className="font-serif text-sm text-charcoal/50 italic">
          {content.family.bride.parents.join(' & ')}
        </p>
      </div>
    </section>
  )
}
