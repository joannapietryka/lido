import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { refreshScrollTriggers } from '../utils/gsap'
import { FloorPlans } from '../components/FloorPlans'
import { Hero } from '../components/Hero'
import { Navbar } from '../components/Navbar'
import { Neighborhood } from '../components/Neighborhood'
import { OurStandard } from '../components/OurStandard'
import { Contact } from '../components/Contact'
import { SiteFooter } from '../components/SiteFooter'

export function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    requestAnimationFrame(() => refreshScrollTriggers())
  }, [])

  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <div id="top" className="w-full min-h-screen">
      <Navbar />
      <main className="pt-40 pb-20 px-6 max-w-[1440px] mx-auto w-full">
        <Hero />
      </main>
      <FloorPlans />
      <OurStandard />
      <Neighborhood />
      <Contact />
      <SiteFooter />
    </div>
  )
}
