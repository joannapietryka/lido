import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import zakrzowekImg from '../assets/zakrzowek.webp'
import { useTranslation } from 'react-i18next'
import { Leaf, TramFront } from 'lucide-react'

const neighborhoodIconClassName =
  'w-5 h-5 text-brand-dark group-hover:text-white transition-colors duration-300'

const lucideIconProps = {
  className: neighborhoodIconClassName,
  strokeWidth: 1.5,
  'aria-hidden': true,
} as const

export function Neighborhood() {
  const ref = useScrollReveal<HTMLElement>()
  const { t } = useTranslation()

  return (
    <section ref={ref} id="lokalizacja" className="py-24 bg-white overflow-hidden scroll-mt-32">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div data-reveal className="order-2 lg:order-1 lg:pr-12">
          <h2 className="text-[48px] font-medium leading-[1.05] mb-6 tracking-tight text-brand-dark">
            {t('neighborhood.title')}
          </h2>
          <p className="text-gray-500 font-inter text-lg mb-12 leading-relaxed max-w-lg">
            {t('neighborhood.subtitle')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4 items-start group">
              <div className="w-12 h-12 bg-[#F3F4F6] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-brand-dark transition-colors duration-300">
                <TramFront {...lucideIconProps} />
              </div>
              <div>
                <h4 className="text-[16px] font-medium mb-1 text-brand-dark">{t('neighborhood.items.transit.title')}</h4>
                <p className="text-gray-500 font-inter text-[14px] leading-relaxed">
                  {t('neighborhood.items.transit.description')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="w-12 h-12 bg-[#F3F4F6] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-brand-dark transition-colors duration-300">
                <svg
                  className="w-5 h-5 text-brand-dark group-hover:text-white transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z M6 1v3M10 1v3M14 1v3" />
                </svg>
              </div>
              <div>
                <h4 className="text-[16px] font-medium mb-1 text-brand-dark">{t('neighborhood.items.dining.title')}</h4>
                <p className="text-gray-500 font-inter text-[14px] leading-relaxed">
                  {t('neighborhood.items.dining.description')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="w-12 h-12 bg-[#F3F4F6] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-brand-dark transition-colors duration-300">
                <Leaf {...lucideIconProps} />
              </div>
              <div>
                <h4 className="text-[16px] font-medium mb-1 text-brand-dark">{t('neighborhood.items.parks.title')}</h4>
                <p className="text-gray-500 font-inter text-[14px] leading-relaxed">
                  {t('neighborhood.items.parks.description')}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="w-12 h-12 bg-[#F3F4F6] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-brand-dark transition-colors duration-300">
                <svg
                  className="w-5 h-5 text-brand-dark group-hover:text-white transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <div>
                <h4 className="text-[16px] font-medium mb-1 text-brand-dark">{t('neighborhood.items.retail.title')}</h4>
                <p className="text-gray-500 font-inter text-[14px] leading-relaxed">
                  {t('neighborhood.items.retail.description')}
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/ruczaj"
            className="inline-flex items-center gap-2 text-[15px] font-medium text-brand-dark hover:opacity-70 transition-opacity"
          >
            {t('neighborhood.viewMap')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div data-reveal className="order-1 lg:order-2 relative w-full rounded-[40px] overflow-hidden lg:h-[600px]">
          <img
            src={zakrzowekImg}
            alt="Zakrzówek"
            width={962}
            height={817}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto lg:h-full lg:object-cover lg:object-center will-change-transform lg:scale-[1.06]"
          />

          <div className="absolute top-[20%] right-[10%] sm:top-[18%] sm:right-[12%] lg:top-[15%] lg:right-[-5%] lg:-translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
            <div className="bg-[#1A1A1A] text-white text-[11px] sm:text-[13px] font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-lg whitespace-nowrap mb-2">
              {t('neighborhood.pin1')}
            </div>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-3 h-3 bg-brand-dark rounded-full" />
            </div>
          </div>

          <div className="absolute top-[58%] left-[28%] sm:top-[55%] sm:left-[30%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <div className="bg-[#1A1A1A] text-white text-[11px] sm:text-[13px] font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-lg whitespace-nowrap order-1 sm:order-none">
              {t('neighborhood.pin2')}
            </div>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg order-2 sm:order-none shrink-0">
              <div className="w-3 h-3 bg-brand-dark rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

