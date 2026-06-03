import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { GalleryPhoto } from '../../data/apartments'

type ApartmentGalleryLightboxProps = {
  photos: GalleryPhoto[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function ApartmentGalleryLightbox({ photos, index, onClose, onPrev, onNext }: ApartmentGalleryLightboxProps) {
  const { t } = useTranslation()
  const photo = photos[index]

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, onPrev, onNext])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={t('apartmentDetail.galleryLightboxLabel')}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
        aria-label={t('apartmentDetail.closeGallery')}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        className="absolute left-4 md:left-8 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
        aria-label={t('apartmentDetail.prevPhoto')}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        className="absolute right-4 md:right-8 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
        aria-label={t('apartmentDetail.nextPhoto')}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="relative max-w-5xl w-full max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
        <img
          src={photo.src}
          alt={t(`apartmentDetail.${photo.altKey}`)}
          className="w-full h-full max-h-[85vh] object-contain rounded-2xl"
        />
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm font-inter bg-black/40 px-4 py-1.5 rounded-full">
          {t('apartmentDetail.photoCounter', { current: index + 1, total: photos.length })}
        </p>
      </div>
    </div>
  )
}
