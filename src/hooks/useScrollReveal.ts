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

function toElementArray(nodes: NodeListOf<Element> | Element[]): Element[] {
  return Array.from(nodes)
}

function markRevealed(nodes: Element[]) {
  for (const node of nodes) {
    node.classList.add('is-revealed')
  }
}

function clearRevealNodes(nodes: Element[]) {
  for (const node of nodes) {
    if (!node.isConnected) continue
    gsap.killTweensOf(node)
    gsap.set(node, { clearProps: 'all' })
    node.classList.remove('is-revealed')
  }
}

function animateReveal(
  nodes: Element[],
  trigger: 'scroll' | 'immediate',
  section: HTMLElement,
) {
  if (!nodes.length) return

  gsap.set(nodes, REVEAL_FROM)

  if (trigger === 'immediate') {
    gsap.to(nodes, {
      ...REVEAL_TO,
      onComplete: () => markRevealed(nodes),
    })
    return
  }

  gsap.fromTo(nodes, REVEAL_FROM, {
    ...REVEAL_TO,
    onComplete: () => markRevealed(nodes),
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true,
    },
  })
}

export function useScrollReveal<T extends HTMLElement>(options: UseScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null)
  const { trigger = 'scroll', resetKey } = options
  const extraTargets = options.targets?.join('\0') ?? ''

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    ensureGsap()

    const revealNodes = toElementArray(el.querySelectorAll('[data-reveal]'))
    const revealWhen = trigger === 'immediate' ? 'immediate' : 'scroll'
    for (const node of revealNodes) {
      node.setAttribute('data-reveal-when', revealWhen)
    }

    const extraNodeGroups: Element[][] = []

    const ctx = gsap.context(() => {
      const parallaxNodes = toElementArray(el.querySelectorAll('[data-parallax]'))
      if (parallaxNodes.length) {
        gsap.fromTo(
          parallaxNodes,
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
      }

      animateReveal(revealNodes, trigger, el)

      for (const selector of options.targets ?? []) {
        const nodes = toElementArray(el.querySelectorAll(selector))
        if (!nodes.length) continue

        for (const node of nodes) {
          node.setAttribute('data-reveal-when', revealWhen)
        }

        extraNodeGroups.push(nodes)
        animateReveal(nodes, trigger, el)
      }
    }, el)

    refreshScrollTriggers()

    return () => {
      ctx.revert()
      clearRevealNodes(revealNodes)
      for (const nodes of extraNodeGroups) {
        clearRevealNodes(nodes)
      }
    }
  }, [trigger, resetKey, extraTargets])

  return ref
}
