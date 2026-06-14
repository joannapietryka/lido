import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import heroVideo from '../assets/video/download.mp4'
import { useScrollReveal } from '../hooks/useScrollReveal'
import buildingImg from '../assets/building.webp'
import heroBuildingMobile from '../assets/hero-building-mobile.webp'
import salonImg from '../assets/salon.webp'
import { useTranslation } from 'react-i18next'

const HERO_BUILDING_SRC = '/hero-building.webp'
const HERO_BUILDING_SRCSET = `${HERO_BUILDING_SRC} 800w, ${buildingImg} 1200w`
const HERO_BUILDING_SIZES = '(max-width: 1024px) 100vw, 580px'

function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        video.src = heroVideo
        void video.play()
        observer.disconnect()
      },
      { rootMargin: '200px' },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      autoPlay
      loop
      muted
      playsInline
      preload="none"
    />
  )
}

export function Hero() {
  const ref = useScrollReveal<HTMLDivElement>({ trigger: 'immediate' })
  const { t } = useTranslation()

  return (
    <div ref={ref}>
      <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-8 lg:mb-16">
        <h1 data-reveal className="text-[44px] lg:text-[88px] leading-[0.95] font-light tracking-[-0.02em] lg:w-2/3">
          {t('hero.titleLine1')} <br />
          <span className="font-medium">{t('hero.titleEmphasis')}</span>
        </h1>
        <div data-reveal className="lg:w-1/3 pb-4">
          <p className="text-gray-600 font-inter text-[17px] leading-relaxed border-l-2 border-brand-dark pl-6">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[550px]">
        <div data-reveal className="col-span-1 lg:col-span-5 rounded-[2.5rem] relative overflow-hidden group h-[400px] lg:h-full">
          <picture>
            <source media="(max-width: 1023px)" srcSet={heroBuildingMobile} type="image/webp" />
            <img
              src={HERO_BUILDING_SRC}
              srcSet={HERO_BUILDING_SRCSET}
              sizes={HERO_BUILDING_SIZES}
              alt={t('hero.address')}
              width={800}
              height={1207}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          <div className="absolute top-8 left-8 bg-white px-4 py-2.5 rounded-full flex items-center gap-2 shadow-sm z-10">
            <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="text-[11px] font-bold tracking-widest uppercase text-brand-dark">{t('hero.badgeNew')}</span>
          </div>

          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
            <div className="text-white">
              <h2 className="text-[32px] font-medium mb-1 tracking-tight">{t('hero.areaTitle')}</h2>
              <p className="text-[11px] font-inter text-white/80 uppercase tracking-widest">
                {t('hero.address')}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-7 flex flex-col gap-6 h-full">
          <div data-reveal className="relative rounded-[2.5rem] overflow-hidden group h-[240px] lg:h-[250px]">
            <HeroVideo />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-auto sm:h-[300px] lg:h-[270px]">
            <div data-reveal className="rounded-[2.5rem] overflow-hidden group h-[240px] sm:h-full">
              <img
                src={salonImg}
                alt="Interior Detail"
                width={800}
                height={519}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

            <div data-reveal className="bg-[#EBEBEB] rounded-[2.5rem] p-8 flex flex-col justify-center relative h-auto sm:h-full">
              <h3 className="text-[56px] font-medium text-brand-dark leading-none mb-2 tracking-tight">{t('hero.statsCount')}</h3>
              <p className="text-[12px] font-bold tracking-widest text-gray-500 uppercase mb-4">{t('hero.statsLabel')}</p>
              <p className="text-[14px] font-inter text-gray-600 leading-relaxed max-w-[200px]">
                {t('hero.statsDescription')}
              </p>
              <Link
                to="/mieszkania/2-pokoje"
                aria-label={t('floorPlans.viewDetails')}
                className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-dark shadow-sm transition-all hover:scale-105 hover:bg-brand-dark hover:text-white"
              >
                <svg
                  className="w-5 h-5"
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
