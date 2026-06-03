import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { refreshScrollTriggers } from '../utils/gsap'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { ApartmentGallery } from '../components/apartment/ApartmentGallery'
import { ApartmentDetailMain } from '../components/apartment/ApartmentDetailMain'
import { ApartmentDetailCta } from '../components/apartment/ApartmentDetailCta'
import { APARTMENTS, isApartmentSlug } from '../data/apartments'

export function ApartmentDetailPage() {
  const { slug } = useParams()

  if (!isApartmentSlug(slug)) {
    return <Navigate to="/mieszkania/studio" replace />
  }

  const apartment = APARTMENTS[slug]

  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => refreshScrollTriggers())
  }, [slug])

  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      <ApartmentGallery key={slug} apartment={apartment} />
      <ApartmentDetailMain key={slug} />
      <ApartmentDetailCta />
      <SiteFooter />
    </div>
  )
}
