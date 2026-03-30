import { useLayoutEffect, useRef } from 'react'
import { ensureGsap, gsap } from '../utils/gsap'

type UseScrollRevealOptions = {
  /** optional extra selectors to animate (staggered) */
  targets?: string[]
}

export function useScrollReveal<T extends HTMLElement>(options: UseScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    ensureGsap()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-parallax]'),
        { y: 0 },
        {
          y: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        el.querySelectorAll('[data-reveal]'),
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      for (const selector of options.targets ?? []) {
        const nodes = el.querySelectorAll(selector)
        if (!nodes.length) continue
        gsap.fromTo(
          nodes,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      }
    }, el)

    return () => ctx.revert()
  }, [options.targets])

  return ref
}

