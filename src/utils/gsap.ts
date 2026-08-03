import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false
let refreshTimer: ReturnType<typeof setTimeout> | null = null

export function ensureGsap() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger)
  gsap.config({ nullTargetWarn: false })
  registered = true
}

/** Coalesce frequent refreshes from many sections mounting (lazy home page). */
export function refreshScrollTriggers() {
  ensureGsap()
  if (refreshTimer !== null) clearTimeout(refreshTimer)
  refreshTimer = setTimeout(() => {
    refreshTimer = null
    ScrollTrigger.refresh()
  }, 80)
}

export { gsap, ScrollTrigger }
