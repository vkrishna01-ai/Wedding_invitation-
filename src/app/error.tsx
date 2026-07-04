'use client'
import { useEffect } from 'react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <h2 className="font-serif text-4xl mb-4 text-rose-gold">Something went wrong!</h2>
      <p className="font-sans text-soft-white/70 mb-8 max-w-md">
        We apologize for the inconvenience. A subtle hiccup in our cinematic journey.
      </p>
      <button
        onClick={() => reset()}
        className="glass-card px-8 py-3 rounded-full text-champagne-gold hover:text-white transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
