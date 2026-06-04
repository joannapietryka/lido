import { useLayoutEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTranslation } from 'react-i18next'
import { ensureGsap, gsap } from '../utils/gsap'
import { Cctv, FingerprintPattern, CarFront, VolumeOff, Sofa, Refrigerator } from 'lucide-react'

const INITIAL_VISIBLE_COUNT = 6

type CardKey =
  | 'fullyFurnished'
  | 'fullyEquippedKitchen'
  | 'elevatorAndMonitoring'
  | 'smartLiving'
  | 'undergroundParking'
  | 'conciergeService'
  | 'premiumMaterials'
  | 'optimalLayout'
  | 'soundproofDesign'
  | 'spaciousStorage'
  | 'balconyEach'
  | 'energyEfficiency'

const CARD_KEYS: CardKey[] = [
  'fullyFurnished',
  'fullyEquippedKitchen',
  'elevatorAndMonitoring',
  'smartLiving',
  'undergroundParking',
  'conciergeService',
  'premiumMaterials',
  'optimalLayout',
  'soundproofDesign',
  'spaciousStorage',
  'balconyEach',
  'energyEfficiency',
]

const iconClassName =
  'w-6 h-6 text-brand-dark group-hover:text-white transition-colors duration-500'

const lucideIconProps = {
  className: iconClassName,
  strokeWidth: 1.5,
  'aria-hidden': true,
} as const

function CardIcon({ cardKey }: { cardKey: CardKey }) {
  switch (cardKey) {
    case 'premiumMaterials':
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
          <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
        </svg>
      )
    case 'smartLiving':
      return (
        <FingerprintPattern {...lucideIconProps} />
      )
    case 'optimalLayout':
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <path d="M3 12h9v9M12 3v9h9" />
        </svg>
      )
    case 'soundproofDesign':
      return (
        <VolumeOff {...lucideIconProps} />
      )
    case 'fullyEquippedKitchen':
      return (
        <Refrigerator {...lucideIconProps} />
      )
    case 'spaciousStorage':
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="1" />
          <path d="M12 2v20M8 7h.01M16 7h.01M8 12h.01M16 12h.01M8 17h.01M16 17h.01" />
        </svg>
      )
    case 'elevatorAndMonitoring':
      return (
        <Cctv {...lucideIconProps} />
      )
    case 'undergroundParking':
      return (
        <CarFront {...lucideIconProps} />
      )
    case 'balconyEach':
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M5 21V9l7-4 7 4v12" />
          <path d="M9 21v-4h6v4" />
          <path d="M16 5a2 2 0 104 0" />
        </svg>
      )
    case 'fullyFurnished':
      return (
        <Sofa {...lucideIconProps} />
      )
    case 'conciergeService':
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      )
    case 'energyEfficiency':
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      )
  }
}

function Card({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="group flex h-full min-h-[220px] flex-col bg-[#F8F9FA] rounded-[32px] p-8 hover:bg-brand-dark transition-colors duration-500">
      <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white group-hover:bg-white/10 transition-colors duration-500">
        {icon}
      </div>
      <h4 className="mb-3 shrink-0 text-[20px] font-medium text-brand-dark group-hover:text-white transition-colors duration-500">
        {title}
      </h4>
      <p className="flex-1 font-inter text-[14px] leading-relaxed text-gray-500 group-hover:text-gray-400 transition-colors duration-500">
        {description}
      </p>
    </div>
  )
}

export function OurStandard() {
  const ref = useScrollReveal<HTMLElement>({ targets: ['[data-card]'] })
  const gridRef = useRef<HTMLDivElement>(null)
  const [showAll, setShowAll] = useState(false)
  const { t } = useTranslation()

  const hasMore = CARD_KEYS.length > INITIAL_VISIBLE_COUNT
  const initialKeys = CARD_KEYS.slice(0, INITIAL_VISIBLE_COUNT)
  const extraKeys = CARD_KEYS.slice(INITIAL_VISIBLE_COUNT)

  useLayoutEffect(() => {
    if (!showAll) return

    const grid = gridRef.current
    if (!grid) return

    ensureGsap()

    const extras = grid.querySelectorAll('[data-card-extra]')
    if (!extras.length) return

    gsap.fromTo(
      extras,
      { autoAlpha: 0, y: 32 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.08,
      },
    )
  }, [showAll])

  return (
    <section ref={ref} id="standard" className="py-24 bg-white overflow-hidden scroll-mt-32">
      <div className="max-w-[1440px] mx-auto px-6">
        <div data-reveal className="mb-16 text-center md:text-left">
          <h2 className="text-[48px] font-medium tracking-tight mb-4">{t('ourStandard.title')}</h2>
          <p className="text-gray-500 font-inter text-lg">{t('ourStandard.subtitle')}</p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {initialKeys.map((key) => (
            <div key={key} data-card className="h-full">
              <Card
                title={t(`ourStandard.cards.${key}.title`)}
                description={t(`ourStandard.cards.${key}.description`)}
                icon={<CardIcon cardKey={key} />}
              />
            </div>
          ))}
          {showAll &&
            extraKeys.map((key) => (
              <div key={key} data-card-extra className="h-full">
                <Card
                  title={t(`ourStandard.cards.${key}.title`)}
                  description={t(`ourStandard.cards.${key}.description`)}
                  icon={<CardIcon cardKey={key} />}
                />
              </div>
            ))}
        </div>

        {hasMore && (
          <div data-reveal className="mt-12 text-left">
            <button
              type="button"
              onClick={() => setShowAll((open) => !open)}
              aria-expanded={showAll}
              className="inline-flex items-center gap-2 text-[15px] font-medium text-brand-dark hover:opacity-70 transition-opacity"
            >
              {showAll ? t('ourStandard.viewLess') : t('ourStandard.viewAll')}
              <svg
                className={['w-4 h-4 transition-transform duration-300', showAll ? 'rotate-90' : ''].join(' ')}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
