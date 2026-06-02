import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import type { SupportedLanguage } from '../i18n'
import { SUPPORTED_LANGUAGES } from '../i18n'

const LABELS: Record<SupportedLanguage, string> = {
  en: 'EN',
  pl: 'PL',
}

export function LanguageSwitch() {
  const { i18n } = useTranslation()

  const current = (i18n.resolvedLanguage || i18n.language || 'pl') as SupportedLanguage

  const setLanguage = useCallback(
    async (lng: SupportedLanguage) => {
      localStorage.setItem('lang', lng)
      await i18n.changeLanguage(lng)
      document.documentElement.lang = lng
    },
    [i18n],
  )

  return (
    <div className="flex items-center gap-1 bg-white/70 border border-white/60 rounded-full p-1">
      {SUPPORTED_LANGUAGES.map((lng) => {
        const active = current === lng
        return (
          <button
            key={lng}
            type="button"
            onClick={() => void setLanguage(lng)}
            className={[
              'px-3 py-1.5 rounded-full text-[12px] font-semibold tracking-widest transition-colors',
              active ? 'bg-brand-dark text-white shadow-sm' : 'text-gray-600 hover:text-brand-dark',
            ].join(' ')}
            aria-pressed={active}
          >
            {LABELS[lng]}
          </button>
        )
      })}
    </div>
  )
}

