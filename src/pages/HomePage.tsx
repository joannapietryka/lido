import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { refreshScrollTriggers } from '../utils/gsap'
import { scrollToHashWhenReady, scrollWindowToTop } from '../utils/scrollToHash'
import { Hero } from '../components/Hero'
import { Navbar } from '../components/Navbar'

const FloorPlans = lazy(() => import('../components/FloorPlans').then((m) => ({ default: m.FloorPlans })))
const OurStandard = lazy(() => import('../components/OurStandard').then((m) => ({ default: m.OurStandard })))
const WhoWeAre = lazy(() => import('../components/WhoWeAre').then((m) => ({ default: m.WhoWeAre })))
const Faq = lazy(() => import('../components/Faq').then((m) => ({ default: m.Faq })))
const Neighborhood = lazy(() => import('../components/Neighborhood').then((m) => ({ default: m.Neighborhood })))
const Contact = lazy(() => import('../components/Contact').then((m) => ({ default: m.Contact })))
const SiteFooter = lazy(() => import('../components/SiteFooter').then((m) => ({ default: m.SiteFooter })))

export function HomePage() {
  const { hash, key } = useLocation()

  useEffect(() => {
    requestAnimationFrame(() => refreshScrollTriggers())
  }, [])

  useEffect(() => {
    if (!hash) {
      scrollWindowToTop()
      return
    }
    scrollToHashWhenReady(hash, { resetFirst: true })
  }, [hash, key])

  return (
    <div id="top" className="w-full min-h-screen">
      <Navbar />
      <main className="pt-40 pb-20 px-6 max-w-[1440px] mx-auto w-full">
        <Hero />
      </main>
      <Suspense fallback={null}>
        <FloorPlans />
        <OurStandard />
        <WhoWeAre />
        <Faq />
        <Neighborhood />
        <Contact />
        <SiteFooter />
      </Suspense>
    </div>
  )
}
