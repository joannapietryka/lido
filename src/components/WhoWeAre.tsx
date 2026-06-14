import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../hooks/useScrollReveal'
import keysImg from '../assets/keys.webp'

const PERK_KEYS = ['commission', 'agentFees', 'directBooking'] as const

export function WhoWeAre() {
  const ref = useScrollReveal<HTMLElement>()
  const { t } = useTranslation()

  return (
    <section ref={ref} id="o-nas" className="py-24 bg-[#FAFAFA] overflow-hidden scroll-mt-32">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div data-reveal className="order-2 lg:order-1 lg:pr-8">
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-medium leading-[1.1] mb-6 tracking-tight text-brand-dark">
            {t('whoWeAre.title')}
          </h2>
          <p className="text-gray-500 font-inter text-base lg:text-lg leading-relaxed mb-10 max-w-lg whitespace-pre-line">
            {t('whoWeAre.description')}
          </p>

          <ul className="flex flex-col gap-4">
            {PERK_KEYS.map((key) => (
              <li
                key={key}
                data-reveal
                className="flex items-center gap-4 bg-white rounded-[24px] px-5 py-4 shadow-sm border border-gray-100"
              >
                <span className="shrink-0 w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                <span className="font-inter text-[15px] lg:text-[16px] font-medium text-brand-dark">
                  {t(`whoWeAre.perks.${key}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-reveal
          className="order-1 lg:order-2 relative w-full rounded-[40px] overflow-hidden bg-white lg:h-[520px]"
        >
          <img
            src={keysImg}
            alt={t('whoWeAre.imageAlt')}
            width={932}
            height={679}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto lg:h-full lg:object-cover lg:object-center will-change-transform lg:scale-[1.04]"
          />
        </div>
      </div>
    </section>
  )
}
