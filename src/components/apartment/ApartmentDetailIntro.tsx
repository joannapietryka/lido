import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MapPin } from 'lucide-react'
import { APARTMENT_SLUGS, type ApartmentSlug } from '../../data/apartments'
import { lucideIconProps } from '../../utils/iconProps'

const addressIconProps = lucideIconProps({ size: 'md', className: 'shrink-0' })

type ApartmentTypeTabsProps = {
  activeSlug: ApartmentSlug
  prominent?: boolean
  className?: string
}

export function ApartmentTypeTabs({ activeSlug, prominent = false, className = '' }: ApartmentTypeTabsProps) {
  const { t } = useTranslation()

  return (
    <div
      className={[
        'inline-flex bg-brand-lighter rounded-full mt-5',
        prominent ? 'p-1.5 shadow-sm border border-gray-100' : 'p-1',
        className,
      ].join(' ')}
    >
      {APARTMENT_SLUGS.map((id) => (
        <Link
          key={id}
          to={`/mieszkania/${id}`}
          className={[
            'rounded-full font-medium transition-all',
            prominent
              ? 'px-8 py-3.5 text-[15px] lg:px-10 lg:py-4 lg:text-[16px]'
              : 'px-4 py-2 text-[12px] md:px-6 md:py-2.5 md:text-[13px]',
            activeSlug === id ? 'bg-brand-dark text-white shadow-md' : 'text-gray-600 hover:text-brand-dark',
          ].join(' ')}
        >
          {t(`apartmentDetail.tabs.${id}`)}
        </Link>
      ))}
    </div>
  )
}

type ApartmentDetailIntroProps = {
  activeSlug: ApartmentSlug
}

export function ApartmentDetailIntro({ activeSlug }: ApartmentDetailIntroProps) {
  const { t } = useTranslation()

  return (
    <header className="relative z-10 bg-white px-6 lg:px-12 max-w-[1440px] mx-auto w-full pt-28 pb-6 lg:pt-0 lg:pb-8">
      <div className="lg:hidden mb-4">
        <ApartmentTypeTabs activeSlug={activeSlug} />
      </div>
      <h1 className="text-[26px] sm:text-[32px] lg:text-[48px] font-medium leading-[1.15] tracking-tight text-brand-dark mb-3 lg:mb-4">
        {t(`apartmentDetail.units.${activeSlug}.title`)}
      </h1>
      <p className="text-gray-500 font-inter text-base md:text-lg flex items-center gap-2">
        <MapPin {...addressIconProps} />
        {t('apartmentDetail.address')}
      </p>
    </header>
  )
}
