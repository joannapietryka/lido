import { useLayoutEffect, useRef } from 'react'
import { ensureGsap, gsap, refreshScrollTriggers } from '../utils/gsap'

type UseScrollRevealOptions = {
  /** optional extra selectors to animate (staggered) */
  targets?: string[]
  /** Re-run animations when this value changes (e.g. apartment slug). */
  resetKey?: string | number
  /** `scroll` — reveal on scroll (default). `immediate` — play on mount (detail hero/gallery). */
  trigger?: 'scroll' | 'immediate'
}

const REVEAL_FROM = { autoAlpha: 0, y: 18 } as const
const REVEAL_TO = {
  autoAlpha: 1,
  y: 0,
  duration: 0.8,
  ease: 'power3.out',
  stagger: 0.08,
} as const

function markRevealed(nodes: NodeListOf<Element> | Element[]) {
  for (const node of nodes) {
    node.classList.add('is-revealed')
  }
}

function clearRevealNodes(nodes: NodeListOf<Element> | Element[]) {
  for (const node of nodes) {
    gsap.killTweensOf(node)
    gsap.set(node, { clearProps: 'all' })
    node.classList.remove('is-revealed')
  }
}

export function useScrollReveal<T extends HTMLElement>(options: UseScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null)
  const { trigger = 'scroll', resetKey } = options
  const extraTargets = options.targets?.join('\0') ?? ''

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    ensureGsap()

    const revealNodes = el.querySelectorAll('[data-reveal]')
    const revealWhen = trigger === 'immediate' ? 'immediate' : 'scroll'
    for (const node of revealNodes) {
      node.setAttribute('data-reveal-when', revealWhen)
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-parallax]'),
        { y: 0 },
        {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      )

      if (revealNodes.length) {
        gsap.set(revealNodes, REVEAL_FROM)

        if (trigger === 'immediate') {
          gsap.to(revealNodes, {
            ...REVEAL_TO,
            onComplete: () => markRevealed(revealNodes),
          })
        } else {
          gsap.fromTo(revealNodes, REVEAL_FROM, {
            ...REVEAL_TO,
            onComplete: () => markRevealed(revealNodes),
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          })
        }
      }

      for (const selector of options.targets ?? []) {
        const nodes = el.querySelectorAll(selector)
        if (!nodes.length) continue

        for (const node of nodes) {
          node.setAttribute('data-reveal-when', revealWhen)
        }

        gsap.set(nodes, REVEAL_FROM)

        if (trigger === 'immediate') {
          gsap.to(nodes, {
            ...REVEAL_TO,
            onComplete: () => markRevealed(nodes),
          })
        } else {
          gsap.fromTo(nodes, REVEAL_FROM, {
            ...REVEAL_TO,
            onComplete: () => markRevealed(nodes),
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          })
        }
      }
    }, el)

    requestAnimationFrame(() => refreshScrollTriggers())

    return () => {
      ctx.revert()
      clearRevealNodes(revealNodes)
      for (const selector of options.targets ?? []) {
        clearRevealNodes(el.querySelectorAll(selector))
      }
    }
  }, [trigger, resetKey, extraTargets])

  return ref
}
