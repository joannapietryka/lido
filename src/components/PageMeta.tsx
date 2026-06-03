import { usePageMeta } from '../hooks/usePageMeta'

/** Syncs document title and meta tags with the current route and language. */
export function PageMeta() {
  usePageMeta()
  return null
}
