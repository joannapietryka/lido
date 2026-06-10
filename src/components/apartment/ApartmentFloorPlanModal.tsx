import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import type { ApartmentAvailabilityUnit } from '../../data/apartmentAvailability'

type ApartmentFloorPlanModalProps = {
  unit: ApartmentAvailabilityUnit
  onClose: () => void
}

export function ApartmentFloorPlanModal({ unit, onClose }: ApartmentFloorPlanModalProps) {
  const { t } = useTranslation()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={t('apartmentDetail.availability.floorPlanLabel', { number: unit.number })}
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

      <div className="relative max-w-4xl w-full max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
        <p className="text-white text-center text-lg font-medium mb-4">
          {t('apartmentDetail.availability.floorPlanTitle', { number: unit.number })}
        </p>
        <img
          src={unit.floorPlanSrc}
          alt={t('apartmentDetail.availability.floorPlanAlt', { number: unit.number })}
          className="w-full h-full max-h-[75vh] object-contain rounded-2xl bg-white"
        />
      </div>
    </div>,
    document.body,
  )
}
