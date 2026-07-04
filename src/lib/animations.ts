import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type RevealOptions = {
  delay?: number
  y?: number
  duration?: number
  start?: string
  scrub?: boolean | number
}

/**
 * Reveal a single element on scroll.
 * Uses a consistent, restrained animation language:
 * slow fade (2s default), gentle vertical shift (20px default).
 */
export function revealOnScroll(
  element: HTMLElement | null,
  options: RevealOptions = {}
) {
  if (!element) return

  const {
    delay = 0,
    y = 20,
    duration = 2,
    start = 'top 80%',
    scrub = false,
  } = options

  gsap.fromTo(
    element,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration: scrub ? undefined : duration,
      delay: scrub ? undefined : delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start,
        scrub: scrub === true ? 1 : scrub || undefined,
      },
    }
  )
}

/**
 * Stagger-reveal a group of elements on scroll.
 */
export function staggerReveal(
  elements: HTMLElement[],
  options: RevealOptions & { stagger?: number } = {}
) {
  if (!elements.length) return

  const {
    y = 20,
    duration = 2,
    start = 'top 85%',
    stagger = 0.15,
  } = options

  elements.forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay: i * stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start,
        },
      }
    )
  })
}
