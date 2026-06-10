import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { refreshScrollTriggers } from '../utils/gsap'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { ApartmentGallery } from '../components/apartment/ApartmentGallery'
import { ApartmentDetailIntro, ApartmentTypeTabs } from '../components/apartment/ApartmentDetailIntro'
import { ApartmentDetailMain } from '../components/apartment/ApartmentDetailMain'
import { ApartmentDetailCta } from '../components/apartment/ApartmentDetailCta'
import { APARTMENTS, isApartmentSlug } from '../data/apartments'

export function ApartmentDetailPage() {
  const { slug } = useParams()

  if (!isApartmentSlug(slug)) {
    return <Navigate to="/mieszkania/2-pokoje" replace />
  }

  const apartment = APARTMENTS[slug]

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        refreshScrollTriggers()
        window.scrollTo(0, 0)
      })
    })
    return () => cancelAnimationFrame(frame)
  }, [slug])

  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      <div className="hidden lg:block px-6 lg:px-12 max-w-[1440px] mx-auto w-full pt-28 pb-6">
        <ApartmentTypeTabs activeSlug={slug} prominent />
      </div>
      <div key={slug} className="flex flex-col max-w-[1440px] mx-auto w-full overflow-hidden">
        <div className="order-1 shrink-0 lg:order-2">
          <ApartmentDetailIntro activeSlug={slug} />
        </div>
        <div className="order-2 lg:order-1">
          <ApartmentGallery apartment={apartment} />
        </div>
        <div className="order-3">
          <ApartmentDetailMain />
        </div>
      </div>
      <ApartmentDetailCta />
      <SiteFooter />
    </div>
  )
}
