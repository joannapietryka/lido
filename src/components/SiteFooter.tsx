import { Link } from 'react-router-dom'
import logoDark from '../assets/lido-logo-dark.png'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function SiteFooter() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLElement>()

  return (
    <footer ref={ref} className="px-6 pb-6 pt-12">
      <div className="max-w-[1440px] mx-auto bg-[#262626] text-white rounded-[40px] pt-16 pb-10 px-10 lg:px-16">
        <div data-reveal className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-16">
          <div className="lg:w-1/3">
            <div className="flex items-center gap-3 mb-4">
              <Link to="/" className="inline-flex shrink-0" aria-label={t('navbar.homeAria')}>
                <img src={logoDark} alt="Lido" className="h-8 object-contain" />
              </Link>
            </div>
            <p className="text-gray-400 font-inter text-[14px] leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          <div className="flex flex-wrap gap-8 font-inter text-[15px] text-gray-400">
            <Link to="/mieszkania" className="hover:text-white transition-colors">
              {t('footer.links.apartments')}
            </Link>
            <Link to="/#standard" className="hover:text-white transition-colors">
              {t('footer.links.standard')}
            </Link>
            <Link to="/#o-nas" className="hover:text-white transition-colors">
              {t('footer.links.whoWeAre')}
            </Link>
            <Link to="/#faq" className="hover:text-white transition-colors">
              {t('footer.links.faq')}
            </Link>
            <Link to="/ruczaj" className="hover:text-white transition-colors">
              {t('footer.links.location')}
            </Link>
            <Link to="/#kontakt" className="hover:text-white transition-colors">
              {t('footer.links.contact')}
            </Link>
          </div>
        </div>

        <div data-reveal className="pt-8 border-t border-white/10 text-[13px] font-inter text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}

