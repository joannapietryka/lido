import { useEffect, useState } from 'react'
import logoLight from '../assets/lido-logo.png'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

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
        <nav className="pointer-events-auto bg-white/80 backdrop-blur-md border border-white/40 shadow-sm rounded-full px-6 py-3 w-full flex justify-between items-center transition-all duration-300 hover:bg-white/95 relative z-[80]">
          <div className="flex items-center gap-12">
            <a
              href="#top"
              className="flex items-center gap-2 group"
              aria-label="Lido strona główna"
              onClick={closeMobile}
            >
              <img src={logoLight} alt="Lido logo" className="h-8 object-contain" />
            </a>

            <div className="hidden lg:flex gap-8 text-[15px] font-medium">
              <a href="#mieszkania" className="text-gray-500 hover:text-brand-dark transition-colors">
                Mieszkania
              </a>
              <a href="#standard" className="text-gray-500 hover:text-brand-dark transition-colors">
                Nasz standard
              </a>
              <a href="#lokalizacja" className="text-gray-500 hover:text-brand-dark transition-colors">
                O lokalizacji
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#kontakt"
              className="hidden lg:inline-flex bg-brand-dark text-white px-7 py-2.5 rounded-full text-[15px] font-medium hover:bg-gray-800 transition-transform active:scale-95"
            >
              Kontakt
            </a>

            <button
              type="button"
              className="lg:hidden w-11 h-11 rounded-full bg-white/90 border border-white/60 shadow-sm flex items-center justify-center text-brand-dark hover:bg-white transition-transform active:scale-95"
              aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
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
              <a
                href="#mieszkania"
                onClick={closeMobile}
                className="px-4 py-3 rounded-2xl text-gray-700 hover:bg-white transition-colors"
              >
                Mieszkania
              </a>
              <a
                href="#standard"
                onClick={closeMobile}
                className="px-4 py-3 rounded-2xl text-gray-700 hover:bg-white transition-colors"
              >
                Nasz standard
              </a>
              <a
                href="#lokalizacja"
                onClick={closeMobile}
                className="px-4 py-3 rounded-2xl text-gray-700 hover:bg-white transition-colors"
              >
                O lokalizacji
              </a>
            </div>

            <div className="mt-4">
              <a
                href="#kontakt"
                onClick={closeMobile}
                className="inline-flex w-full justify-center bg-brand-dark text-white px-7 py-3 rounded-full text-[15px] font-medium hover:bg-gray-800 transition-transform active:scale-95"
              >
                Kontakt
              </a>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <button
            type="button"
            aria-label="Zamknij menu"
            className="lg:hidden fixed inset-0 bg-black/20 pointer-events-auto z-[60]"
            onClick={closeMobile}
          />
        )}
      </div>
    </div>
  )
}

