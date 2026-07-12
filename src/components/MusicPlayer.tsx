'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useUIStore } from '@/store/useUIStore'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { isMusicPlaying, setMusicPlaying, isEnvelopeOpen } = useUIStore()
  const [showPrompt, setShowPrompt] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Show the music prompt after the envelope opens
  useEffect(() => {
    if (isEnvelopeOpen && !hasInteracted) {
      const timer = setTimeout(() => setShowPrompt(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [isEnvelopeOpen, hasInteracted])

  // Play/pause audio
  useEffect(() => {
    if (!audioRef.current) return
    if (isMusicPlaying) {
      audioRef.current.volume = 0
      audioRef.current.play().catch(() => {
        console.log('Audio autoplay prevented')
      })
      // Gentle fade in for an aesthetic ambient feel (low volume)
      let vol = 0
      const targetVol = 0.15 // 15% maximum volume
      const fadeIn = setInterval(() => {
        vol = Math.min(vol + 0.005, targetVol)
        if (audioRef.current) audioRef.current.volume = vol
        if (vol >= targetVol) clearInterval(fadeIn)
      }, 100)
      return () => clearInterval(fadeIn)
    } else {
      audioRef.current.pause()
    }
  }, [isMusicPlaying])

  const enableMusic = useCallback(() => {
    setHasInteracted(true)
    setShowPrompt(false)
    setMusicPlaying(true)
  }, [setMusicPlaying])

  const toggleMusic = useCallback(() => {
    setMusicPlaying(!isMusicPlaying)
  }, [isMusicPlaying, setMusicPlaying])

  return (
    <>
      <audio ref={audioRef} loop preload="none" src="/music/perfect.mp3" />

      {/* Initial prompt — appears after envelope opens */}
      {showPrompt && (
        <button
          onClick={enableMusic}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 py-3 px-8 border border-charcoal/10 bg-ivory/90 backdrop-blur-sm font-sans text-[10px] tracking-[0.3em] uppercase text-stone hover:text-charcoal hover:border-gold-light transition-all duration-700 animate-[fadeIn_1.5s_ease]"
        >
          ♫&ensp;Enable Music
        </button>
      )}

      {/* Persistent mini player — only after interaction */}
      {hasInteracted && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-8 left-8 z-50 w-9 h-9 flex items-center justify-center group"
          aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
        >
          <div className="flex items-end justify-center gap-[2px] h-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-[1.5px] bg-stone/50 group-hover:bg-gold transition-colors duration-500 ${
                  isMusicPlaying ? 'animate-[musicBar_0.8s_ease-in-out_infinite_alternate]' : 'h-[2px]'
                }`}
                style={{
                  animationDelay: isMusicPlaying ? `${i * 0.15}s` : undefined,
                  height: isMusicPlaying ? undefined : '2px',
                }}
              />
            ))}
          </div>
        </button>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes musicBar {
          0% { height: 3px; }
          100% { height: 12px; }
        }
      `}</style>
    </>
  )
}
