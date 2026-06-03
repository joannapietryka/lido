import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { APARTMENT_SLUGS, type ApartmentSlug } from '../../data/apartments'
import { ApartmentAmenityIcon, AMENITY_KEYS } from './ApartmentAmenityIcon'

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
    <main ref={ref} className="px-6 lg:px-12 max-w-[1440px] mx-auto w-full pb-24">
      <div className="max-w-4xl">
        <div data-reveal className="mb-8">
          <div className="inline-flex bg-brand-lighter rounded-full p-1 mb-6">
            {APARTMENT_SLUGS.map((id) => (
              <Link
                key={id}
                to={`/mieszkania/${id}`}
                className={[
                  'px-6 py-2 rounded-full text-[13px] font-medium transition-all',
                  activeSlug === id ? 'bg-brand-dark text-white' : 'text-gray-600 hover:text-brand-dark',
                ].join(' ')}
              >
                {t(`apartmentDetail.tabs.${id}`)}
              </Link>
            ))}
          </div>
          <h1 className="text-[40px] lg:text-[48px] font-medium leading-none mb-4">
            {t(`apartmentDetail.units.${activeSlug}.title`)}
          </h1>
          <p className="text-gray-500 font-inter text-lg flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            {t('apartmentDetail.address')}
          </p>
        </div>

        <div data-reveal className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-gray-100 mb-10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={['text-center', i < stats.length - 1 ? 'md:border-r border-gray-100' : ''].join(' ')}
            >
              <p className="text-gray-400 text-xs font-inter uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-xl md:text-2xl font-medium">{stat.value}</p>
            </div>
          ))}
        </div>

        <div data-reveal className="mb-12">
          <h3 className="text-2xl font-medium mb-6">{t('apartmentDetail.descriptionTitle')}</h3>
          <p className="text-gray-600 font-inter text-lg leading-relaxed whitespace-pre-line">
            {t(`apartmentDetail.units.${activeSlug}.description`)}
          </p>
        </div>

        <div>
          <h3 data-reveal className="text-2xl font-medium mb-8">{t('apartmentDetail.amenitiesTitle')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4">
            {AMENITY_KEYS.map((key) => (
              <div key={key} data-reveal className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-lighter rounded-2xl flex items-center justify-center text-brand-dark shrink-0">
                  <ApartmentAmenityIcon type={key} />
                </div>
                <span className="font-inter font-medium">{t(`apartmentDetail.amenities.${key}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
