import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { matchPath, useLocation } from 'react-router-dom'
import { isApartmentSlug } from '../data/apartments'

function setMetaAttribute(
  key: string,
  content: string,
  attr: 'name' | 'property' = 'name',
) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

export function usePageMeta() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()

  useEffect(() => {
    const apartmentMatch = matchPath('/mieszkania/:slug', pathname)
    const slug = apartmentMatch?.params.slug

    let titleKey = 'meta.home.title'
    let descriptionKey = 'meta.home.description'

    if (slug && isApartmentSlug(slug)) {
      titleKey = `meta.apartment.${slug}.title`
      descriptionKey = `meta.apartment.${slug}.description`
    }

    const title = t(titleKey)
    const description = t(descriptionKey)
    const siteName = t('meta.siteName')
    const lang = i18n.language.startsWith('en') ? 'en' : 'pl'

    document.title = title
    document.documentElement.lang = lang

    setMetaAttribute('description', description)
    setMetaAttribute('og:title', title, 'property')
    setMetaAttribute('og:description', description, 'property')
    setMetaAttribute('og:site_name', siteName, 'property')
    setMetaAttribute('og:type', 'website', 'property')
    setMetaAttribute('og:locale', lang === 'en' ? 'en_GB' : 'pl_PL', 'property')
    setMetaAttribute('og:url', window.location.href, 'property')
    setMetaAttribute('twitter:card', 'summary_large_image')
    setMetaAttribute('twitter:title', title)
    setMetaAttribute('twitter:description', description)
  }, [pathname, i18n.language, t])
}
