import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import mapaEnImg from '../assets/mapa-en.png'
import mapaPlImg from '../assets/mapa-pl.png'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { RuczajPerksSection } from '../components/ruczaj/RuczajPerksSection'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { refreshScrollTriggers } from '../utils/gsap'

export function RuczajPage() {
  const { t, i18n } = useTranslation()
  const heroRef = useScrollReveal<HTMLDivElement>()
  const mapRef = useScrollReveal<HTMLDivElement>()
  const ctaRef = useScrollReveal<HTMLDivElement>()

  const mapSrc = i18n.language.startsWith('en') ? mapaEnImg : mapaPlImg

  useEffect(() => {
    window.scrollTo(0, 0)
    const frame = requestAnimationFrame(() => refreshScrollTriggers())
    return () => cancelAnimationFrame(frame)
  }, [i18n.language])

  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">
      <Navbar />

      <main className="px-6 lg:px-12 max-w-[1440px] mx-auto w-full pb-24 pt-32">
        <div ref={heroRef} className="mb-10">
          <h1
            data-reveal
            className="text-[40px] lg:text-[56px] font-medium leading-[1.05] tracking-tight text-brand-dark mb-6 max-w-4xl"
          >
            {t('ruczajPage.title')}
          </h1>
          <p
            data-reveal
            className="text-gray-500 font-inter text-lg leading-relaxed max-w-3xl"
          >
            {t('ruczajPage.intro')}
          </p>
        </div>

        <div
          ref={mapRef}
          className="relative mb-16 lg:mb-20 rounded-[40px] overflow-hidden shadow-sm border border-gray-100"
        >
          <div data-reveal className="w-full">
            <img
              src={mapSrc}
              alt={t('ruczajPage.mapAlt')}
              className="block w-full h-auto will-change-transform scale-[1.02]"
              data-parallax
            />
          </div>
        </div>

        <RuczajPerksSection />

        <div ref={ctaRef} className="mt-16 flex flex-col sm:flex-row gap-4 sm:items-center">
          <Link
            data-reveal
            to="/mieszkania"
            className="inline-flex justify-center bg-brand-dark text-white px-8 py-3.5 rounded-full text-[15px] font-medium hover:bg-gray-800 transition-colors"
          >
            {t('ruczajPage.ctaApartments')}
          </Link>
          <Link
            data-reveal
            to="/#kontakt"
            className="inline-flex justify-center text-brand-dark px-8 py-3.5 rounded-full text-[15px] font-medium border border-gray-200 hover:border-brand-dark transition-colors"
          >
            {t('ruczajPage.ctaContact')}
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
