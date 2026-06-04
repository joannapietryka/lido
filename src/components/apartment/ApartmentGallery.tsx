import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { ApartmentData, GalleryPhoto } from '../../data/apartments'
import { GALLERY_PREVIEW_COUNT } from '../../data/apartments'
import { ApartmentGalleryLightbox } from './ApartmentGalleryLightbox'

const tileClass =
  'relative rounded-[32px] overflow-hidden group cursor-pointer border-0 p-0 w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2'

function GalleryTile({
  photo,
  alt,
  onClick,
  overlay,
}: {
  photo: GalleryPhoto
  alt: string
  onClick: () => void
  overlay?: React.ReactNode
}) {
  return (
    <button type="button" onClick={onClick} className={tileClass}>
      <img
        src={photo.src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {overlay}
    </button>
  )
}

export function ApartmentGallery({ apartment }: { apartment: ApartmentData }) {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLDivElement>({
    trigger: 'immediate',
    resetKey: apartment.slug,
  })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const photos = apartment.photos

  useEffect(() => {
    setLightboxIndex(null)
  }, [apartment.slug])
  const preview = photos.slice(0, GALLERY_PREVIEW_COUNT)
  const extraCount = Math.max(0, photos.length - GALLERY_PREVIEW_COUNT)

  const [main, topRight, topMid, bottomLeft, bottomRight] = preview

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length))
  }, [photos.length])

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length))
  }, [photos.length])

  return (
    <>
      <div ref={ref} className="order-2 md:order-1 px-6 lg:px-12 max-w-[1440px] mx-auto w-full mb-8 md:mb-12 md:pt-32">
        {/* Mobile: hero image + thumbnail strip */}
        <div className="flex flex-col gap-3 md:hidden">
          <div data-reveal className="w-full aspect-[4/3] min-h-[220px] max-h-[50vh]">
            <GalleryTile
              photo={main}
              alt={t(`apartmentDetail.${main.altKey}`)}
              onClick={() => openLightbox(0)}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[topRight, topMid, bottomLeft, bottomRight].map((photo, i) => (
              <div key={photo.src} data-reveal className="aspect-square min-h-[72px]">
                <GalleryTile
                  photo={photo}
                  alt={t(`apartmentDetail.${photo.altKey}`)}
                  onClick={() => openLightbox(i + 1)}
                  overlay={
                    i === 3 && extraCount > 0 ? (
                      <div className="absolute inset-0 bg-black/45 flex items-center justify-center pointer-events-none">
                        <span className="text-white font-medium text-xs sm:text-sm">
                          {t('apartmentDetail.morePhotos', { count: extraCount })}
                        </span>
                      </div>
                    ) : undefined
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: mosaic grid */}
        <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-4 h-[550px]">
          <div data-reveal className="col-span-2 row-span-2 h-full">
            <GalleryTile
              photo={main}
              alt={t(`apartmentDetail.${main.altKey}`)}
              onClick={() => openLightbox(0)}
            />
          </div>
          <div data-reveal className="h-full">
            <GalleryTile
              photo={topRight}
              alt={t(`apartmentDetail.${topRight.altKey}`)}
              onClick={() => openLightbox(1)}
            />
          </div>
          <div data-reveal className="h-full">
            <GalleryTile
              photo={topMid}
              alt={t(`apartmentDetail.${topMid.altKey}`)}
              onClick={() => openLightbox(2)}
            />
          </div>
          <div data-reveal className="h-full">
            <GalleryTile
              photo={bottomLeft}
              alt={t(`apartmentDetail.${bottomLeft.altKey}`)}
              onClick={() => openLightbox(3)}
            />
          </div>
          <div data-reveal className="h-full">
            <GalleryTile
              photo={bottomRight}
              alt={t(`apartmentDetail.${bottomRight.altKey}`)}
              onClick={() => openLightbox(extraCount > 0 ? GALLERY_PREVIEW_COUNT : 4)}
              overlay={
                extraCount > 0 ? (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                    <span className="text-white font-medium text-lg">
                      {t('apartmentDetail.morePhotos', { count: extraCount })}
                    </span>
                  </div>
                ) : undefined
              }
            />
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <ApartmentGalleryLightbox
          photos={photos}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  )
}
