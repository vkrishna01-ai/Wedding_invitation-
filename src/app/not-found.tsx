import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <h2 className="font-serif text-5xl mb-4 text-champagne-gold">404 - Not Found</h2>
      <p className="font-sans text-soft-white/70 mb-8 max-w-md">
        It seems you&apos;ve wandered off the path. Let&apos;s get you back to the celebration.
      </p>
      <Link href="/">
        <button className="glass-card px-8 py-3 rounded-full text-champagne-gold hover:text-white transition-colors">
          Return Home
        </button>
      </Link>
    </div>
  )
}
