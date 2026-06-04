import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logoLight from '../assets/lido-logo.png'
import { LanguageSwitch } from './LanguageSwitch'

const navLinkClass = 'text-gray-500 hover:text-brand-dark transition-colors'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (!mobileOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  return (
    <div className="fixed top-6 left-0 right-0 z-[70] px-6 flex justify-center pointer-events-none">
      <div className="w-full max-w-7xl pointer-events-none">
        <nav className="pointer-events-auto bg-white border border-gray-100 shadow-sm lg:bg-white/80 lg:backdrop-blur-md lg:border-white/40 rounded-full px-4 sm:px-6 py-3 w-full flex justify-between items-center gap-3 transition-all duration-300 lg:hover:bg-white/95 relative z-[80]">
          <div className="flex items-center gap-12 min-w-0">
            <Link
              to="/"
              className="flex items-center shrink-0 group"
              aria-label={t('navbar.homeAria')}
              onClick={closeMobile}
            >
              <img src={logoLight} alt="Lido logo" className="h-7 sm:h-8 w-auto object-contain" />
            </Link>

            <div className="hidden lg:flex gap-8 text-[15px] font-medium">
              <Link to="/mieszkania" className={navLinkClass}>
                {t('navbar.apartments')}
              </Link>
              <Link to="/#standard" className={navLinkClass}>
                {t('navbar.standard')}
              </Link>
              <Link to="/#lokalizacja" className={navLinkClass}>
                {t('navbar.location')}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitch />
            <Link
              to="/#kontakt"
              className="hidden lg:inline-flex bg-brand-dark text-white px-7 py-2.5 rounded-full text-[15px] font-medium hover:bg-gray-800 transition-transform active:scale-95"
            >
              {t('navbar.contact')}
            </Link>

            <button
              type="button"
              className="lg:hidden w-11 h-11 rounded-full bg-white/90 border border-white/60 shadow-sm flex items-center justify-center text-brand-dark hover:bg-white transition-transform active:scale-95"
              aria-label={mobileOpen ? t('navbar.closeMenu') : t('navbar.openMenu')}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        <div
          id="mobile-menu"
          className={[
            'pointer-events-auto lg:hidden mt-3 rounded-[28px] border border-white/40 bg-white/90 backdrop-blur-md shadow-sm overflow-hidden transition-all duration-300 relative z-[75]',
            mobileOpen ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-2 h-0',
          ].join(' ')}
        >
          <div className="p-4">
            <div className="flex flex-col gap-2 text-[20px] font-medium">
              <Link to="/mieszkania" onClick={closeMobile} className="px-4 py-3 rounded-2xl text-gray-700 hover:bg-white transition-colors">
                {t('navbar.apartments')}
              </Link>
              <Link to="/#standard" onClick={closeMobile} className="px-4 py-3 rounded-2xl text-gray-700 hover:bg-white transition-colors">
                {t('navbar.standard')}
              </Link>
              <Link to="/#lokalizacja" onClick={closeMobile} className="px-4 py-3 rounded-2xl text-gray-700 hover:bg-white transition-colors">
                {t('navbar.location')}
              </Link>
            </div>

            <div className="mt-4">
              <Link
                to="/#kontakt"
                onClick={closeMobile}
                className="inline-flex w-full justify-center bg-brand-dark text-white px-7 py-3 rounded-full text-[15px] font-medium hover:bg-gray-800 transition-transform active:scale-95"
              >
                {t('navbar.contact')}
              </Link>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <button
            type="button"
            aria-label={t('navbar.closeMenu')}
            className="lg:hidden fixed inset-0 bg-black/20 pointer-events-auto z-[60]"
            onClick={closeMobile}
          />
        )}
      </div>
    </div>
  )
}
