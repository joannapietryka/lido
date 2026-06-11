const HASH_SCROLL_RETRY_MS = [0, 100, 300, 600]

let activeScroll: { rafIds: number[]; timeoutIds: number[] } | null = null

function cancelPendingHashScroll() {
  if (!activeScroll) return
  for (const id of activeScroll.rafIds) cancelAnimationFrame(id)
  for (const id of activeScroll.timeoutIds) clearTimeout(id)
  activeScroll = null
}

export function scrollWindowToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

export function scrollToHashElement(hash: string, behavior: ScrollBehavior = 'smooth') {
  const id = hash.replace(/^#/, '')
  if (!id) return false

  const el = document.getElementById(id)
  if (!el) return false

  el.scrollIntoView({ behavior, block: 'start' })
  return true
}

/** Scroll after route + layout settle (e.g. navigating from /ruczaj to /#kontakt). */
export function scrollToHashWhenReady(hash: string, options?: { resetFirst?: boolean }) {
  cancelPendingHashScroll()

  const state = { rafIds: [] as number[], timeoutIds: [] as number[] }
  activeScroll = state

  if (options?.resetFirst) {
    scrollWindowToTop()
  }

  const attempt = () => {
    if (activeScroll !== state) return
    scrollToHashElement(hash)
  }

  const runAttempts = () => {
    if (activeScroll !== state) return
    attempt()
    for (const delay of HASH_SCROLL_RETRY_MS) {
      state.timeoutIds.push(window.setTimeout(attempt, delay))
    }
  }

  state.rafIds.push(
    requestAnimationFrame(() => {
      if (activeScroll !== state) return
      state.rafIds.push(requestAnimationFrame(runAttempts))
    }),
  )
}
