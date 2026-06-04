export function scrollToHashElement(hash: string, behavior: ScrollBehavior = 'smooth') {
  const id = hash.replace(/^#/, '')
  if (!id) return false

  const el = document.getElementById(id)
  if (!el) return false

  el.scrollIntoView({ behavior, block: 'start' })
  return true
}

/** Scroll after route + layout settle (e.g. navigating from /ruczaj to /#kontakt). */
export function scrollToHashWhenReady(hash: string) {
  const attempt = () => scrollToHashElement(hash)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!attempt()) {
        window.setTimeout(attempt, 150)
      }
    })
  })
}
