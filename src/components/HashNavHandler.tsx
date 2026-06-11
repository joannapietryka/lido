import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToHashWhenReady } from '../utils/scrollToHash'

/**
 * Same-page hash links (e.g. /#kontakt while already on /) do not change React Router
 * location when the hash is unchanged — force scroll on every click.
 */
export function HashNavHandler() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null
      if (!anchor || anchor.target === '_blank') return

      const rawHref = anchor.getAttribute('href')
      if (!rawHref?.includes('#')) return

      let url: URL
      try {
        url = new URL(rawHref, window.location.origin)
      } catch {
        return
      }

      if (url.origin !== window.location.origin) return

      const hash = url.hash
      if (!hash) return

      if (url.pathname !== location.pathname) return

      event.preventDefault()

      const hashId = hash.slice(1)
      if (location.hash !== hash) {
        navigate({ pathname: url.pathname, hash: hashId })
      } else {
        scrollToHashWhenReady(hash)
      }
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [location.pathname, location.hash, navigate])

  return null
}
