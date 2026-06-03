import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function ensureGsap() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

export function refreshScrollTriggers() {
  ensureGsap()
  ScrollTrigger.refresh()
}

export { gsap, ScrollTrigger }

