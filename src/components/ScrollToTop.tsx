import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

function scrollWindowToTop() {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

/** Resets scroll position when navigating between routes (not when targeting a hash on home). */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const hasHashTarget = pathname === '/' && hash.length > 0

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useLayoutEffect(() => {
    if (hasHashTarget) return
    scrollWindowToTop()
  }, [pathname, hash, hasHashTarget])

  useEffect(() => {
    if (hasHashTarget) return
    scrollWindowToTop()
    const frame = requestAnimationFrame(scrollWindowToTop)
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, hasHashTarget])

  return null
}
