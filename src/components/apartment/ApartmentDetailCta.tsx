import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import elevatorVideo from '../../assets/video/elevator.mp4'

export function ApartmentDetailCta() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 mb-12">
      <div className="bg-[#F8F9FA] rounded-[32px] overflow-hidden grid md:grid-cols-2 md:min-h-0">
        <div data-reveal className="p-8 md:py-10 md:px-12 flex flex-col justify-center items-start">
          <h2 className="text-[26px] md:text-[30px] font-medium leading-tight mb-3 whitespace-pre-line text-brand-dark">
            {t('apartmentDetail.cta.title')}
          </h2>
          <p className="text-gray-500 font-inter text-[14px] md:text-[15px] leading-relaxed mb-5 max-w-md">
            {t('apartmentDetail.cta.subtitle')}
          </p>
          <Link
            to="/#kontakt"
            className="bg-brand-dark text-white px-7 py-3 rounded-full text-[14px] font-medium hover:bg-gray-800 transition-colors"
          >
            {t('apartmentDetail.cta.button')}
          </Link>
        </div>
        <div data-reveal className="relative h-[280px] md:h-[500px] overflow-hidden">
          <video
            src={elevatorVideo}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            aria-label={t('apartmentDetail.amenities.elevator')}
          />
        </div>
      </div>
    </section>
  )
}
