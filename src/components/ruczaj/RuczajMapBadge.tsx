import { useLayoutEffect, useRef, type RefObject } from 'react'
import { ensureGsap, gsap } from '../../utils/gsap'

const LABEL = 'Ruczaj'
const LETTERS = LABEL.split('')

type RuczajMapBadgeProps = {
  mapTriggerRef: RefObject<HTMLElement | null>
}

export function RuczajMapBadge({ mapTriggerRef }: RuczajMapBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useLayoutEffect(() => {
    const trigger = mapTriggerRef.current
    const badge = badgeRef.current
    const panel = panelRef.current
    const line = lineRef.current
    const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[]

    if (!trigger || !badge || !panel || !line || !letters.length) return

    ensureGsap()

    const ctx = gsap.context(() => {
      gsap.set(panel, { autoAlpha: 0, scale: 0.88, y: 14 })
      gsap.set(line, { autoAlpha: 0, scaleX: 0, transformOrigin: 'left center' })
      gsap.set(letters, { yPercent: 115, autoAlpha: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: 'top 82%',
          once: true,
        },
      })

      tl.to(panel, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.75,
        ease: 'power2.out',
      })
        .to(
          line,
          {
            autoAlpha: 1,
            scaleX: 1,
            duration: 0.55,
            ease: 'power2.out',
          },
          0.18,
        )
        .to(
          letters,
          {
            yPercent: 0,
            duration: 0.65,
            stagger: 0.09,
            ease: 'power2.out',
          },
          0.32,
        )

      tl.call(() => {
        gsap.to(panel, {
          y: -5,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    }, badge)

    return () => ctx.revert()
  }, [mapTriggerRef])

  return (
    <div
      ref={badgeRef}
      className="absolute top-[2.5vh] left-[2.5vh] z-10 pointer-events-none select-none"
      aria-hidden
    >
      <div
        ref={panelRef}
        className="rounded-[1.75vh] border border-[#71b587]/25 px-[2.2vh] py-[1.4vh] shadow-[0_8px_32px_rgba(17,19,21,0.08)] backdrop-blur-[2px] will-change-transform"
        style={{
          backgroundColor: 'rgba(240, 249, 244, 0.94)',
        }}
      >
        <span
          ref={lineRef}
          className="mb-[1vh] block h-[0.35vh] w-[4.5vh] rounded-full bg-[#71b587] will-change-transform"
        />
        <p
          className="flex font-medium leading-none tracking-[-0.03em]"
          style={{ fontSize: '5.5vh', color: '#71b587' }}
        >
          {LETTERS.map((char, index) => (
            <span key={`${char}-${index}`} className="inline-block overflow-hidden align-bottom">
              <span
                ref={(el) => {
                  letterRefs.current[index] = el
                }}
                className="inline-block will-change-transform"
              >
                {char}
              </span>
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
