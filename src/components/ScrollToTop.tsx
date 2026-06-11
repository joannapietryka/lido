import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollWindowToTop } from '../utils/scrollToHash'

/** Resets scroll position when navigating between routes (hash targets on home are handled separately). */
export function ScrollToTop() {
  const { pathname, hash, key } = useLocation()
  const isHomeHash = pathname === '/' && hash.length > 0

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useLayoutEffect(() => {
    if (isHomeHash) return
    scrollWindowToTop()
  }, [pathname, hash, key, isHomeHash])

  useEffect(() => {
    if (isHomeHash) return

    scrollWindowToTop()
    const timeouts = [50, 150, 300].map((ms) => window.setTimeout(scrollWindowToTop, ms))
    return () => timeouts.forEach(clearTimeout)
  }, [pathname, hash, key, isHomeHash])

  return null
}
