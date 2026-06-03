import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

function scrollWindowToTop() {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

/** Resets scroll position when navigating between routes (not hash-only changes on home). */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useLayoutEffect(() => {
    scrollWindowToTop()
  }, [pathname])

  // After layout/GSAP refresh — browser may restore scroll from the previous page.
  useEffect(() => {
    scrollWindowToTop()
    const frame = requestAnimationFrame(scrollWindowToTop)
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  return null
}
