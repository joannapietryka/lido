import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { ApartmentSlug } from '../../data/apartments'
import { ApartmentAmenityIcon, AMENITY_KEYS } from './ApartmentAmenityIcon'
import { ApartmentAvailabilityTable } from './ApartmentAvailabilityTable'

export function ApartmentDetailMain() {
  const { slug } = useParams<{ slug: ApartmentSlug }>()
  const { t } = useTranslation()
  const activeSlug = slug ?? 'studio'
  const ref = useScrollReveal<HTMLElement>({ resetKey: activeSlug })

  const stats = [
    { label: t('apartmentDetail.stats.price'), value: t(`apartmentDetail.units.${activeSlug}.price`) },
    { label: t('apartmentDetail.stats.bedrooms'), value: t(`apartmentDetail.units.${activeSlug}.bedrooms`) },
    { label: t('apartmentDetail.stats.bathrooms'), value: t(`apartmentDetail.units.${activeSlug}.bathrooms`) },
    { label: t('apartmentDetail.stats.area'), value: t(`apartmentDetail.units.${activeSlug}.area`) },
  ]

  return (
    <main ref={ref} className="relative z-10 bg-white px-6 lg:px-12 max-w-[1440px] mx-auto w-full pb-24">
      <div className="max-w-4xl">
        <div
          data-reveal
          className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 md:gap-4 py-6 md:py-8 border-y border-gray-100 mb-8 md:mb-10"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                'text-left md:text-center',
                i < stats.length - 1 ? 'md:border-r md:border-gray-100' : '',
              ].join(' ')}
            >
              <p className="text-gray-400 text-[10px] md:text-xs font-inter uppercase tracking-widest mb-1">
                {stat.label}
              </p>
              <p className="text-lg sm:text-xl md:text-2xl font-medium text-brand-dark">{stat.value}</p>
            </div>
          ))}
        </div>

        <div data-reveal className="mb-10 md:mb-12">
          <h2 className="text-xl md:text-2xl font-medium mb-4 md:mb-6 text-brand-dark">
            {t('apartmentDetail.descriptionTitle')}
          </h2>
          <p className="text-gray-600 font-inter text-base md:text-lg leading-relaxed whitespace-pre-line">
            {t(`apartmentDetail.units.${activeSlug}.description`)}
          </p>
        </div>

        <div>
          <h2 data-reveal className="text-xl md:text-2xl font-medium mb-6 md:mb-8 text-brand-dark">
            {t('apartmentDetail.amenitiesTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-y-8 gap-x-4">
            {AMENITY_KEYS.map((key) => (
              <div key={key} data-reveal className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-lighter rounded-2xl flex items-center justify-center text-brand-dark shrink-0">
                  <ApartmentAmenityIcon type={key} />
                </div>
                <span className="font-inter font-medium text-[15px] md:text-base">{t(`apartmentDetail.amenities.${key}`)}</span>
              </div>
            ))}
          </div>
        </div>

        <ApartmentAvailabilityTable slug={activeSlug} />
      </div>
    </main>
  )
}
