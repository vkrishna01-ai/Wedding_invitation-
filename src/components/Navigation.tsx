'use client'
import { useState, useCallback } from 'react'

const chapters = ['Invitation', 'Destination', 'Story', 'Events', 'RSVP']

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => setIsOpen((v) => !v), [])

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={toggle}
        className="fixed top-8 right-8 z-[110] w-10 h-10 flex flex-col items-center justify-center gap-[5px] group"
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        <span
          className={`block w-6 h-[1px] bg-charcoal transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? 'rotate-45 translate-y-[6px]' : 'group-hover:w-7'
          }`}
        />
        <span
          className={`block w-6 h-[1px] bg-charcoal transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-[1px] bg-charcoal transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? '-rotate-45 -translate-y-[6px]' : 'group-hover:w-5'
          }`}
        />
      </button>

      {/* Overlay */}
      <nav
        className={`fixed inset-0 z-[100] bg-cream-soft/97 backdrop-blur-sm flex items-center justify-center transition-opacity duration-1000 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        <ul className="flex flex-col items-center gap-8">
          {chapters.map((name, i) => (
            <li key={name}>
              <button
                onClick={() => setIsOpen(false)}
                className="font-script text-4xl md:text-5xl text-charcoal hover:text-rose transition-colors duration-500 tracking-wide"
                style={{
                  transitionDelay: isOpen ? `${i * 80 + 200}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 700ms ease ${isOpen ? i * 80 + 200 : 0}ms, transform 700ms ease ${isOpen ? i * 80 + 200 : 0}ms, color 500ms ease`,
                }}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
