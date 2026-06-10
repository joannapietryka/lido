import {
  Archive,
  Bike,
  CarFront,
  FingerprintPattern,
  Refrigerator,
  ShieldCheck,
  Wifi,
  Wrench,
  Zap,
  Sofa
} from 'lucide-react'
import { lucideIconProps, svgIconClassName } from '../../utils/iconProps'

type AmenityKey =
  | 'security'
  | 'fingerprint'
  | 'elevator'
  | 'parking'
  | 'kitchen'
  | 'balcony'
  | 'energy'
  | 'handyman'
  | 'storage'
  | 'bikeStorage'
  | 'internetIncluded'
  | 'fullyFurnished'

const amenityLucideProps = lucideIconProps({ size: 'lg', className: 'text-brand-dark' })
const amenitySvgClass = svgIconClassName({ size: 'lg', className: 'text-brand-dark' })

export function ApartmentAmenityIcon({ type }: { type: AmenityKey }) {
  switch (type) {
    case 'security':
      return <ShieldCheck {...amenityLucideProps} />
    case 'fullyFurnished':
        return <Sofa {...amenityLucideProps} />
    case 'fingerprint':
      return <FingerprintPattern {...amenityLucideProps} />
    case 'elevator':
      return (
        <svg
          className={amenitySvgClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="7" y="3" width="10" height="18" rx="1.5" />
          <path d="M12 7v10M9.5 9.5L12 7l2.5 2.5M9.5 14.5L12 17l2.5-2.5" />
        </svg>
      )
    case 'parking':
      return <CarFront {...amenityLucideProps} />
    case 'bikeStorage':
      return <Bike {...amenityLucideProps} />
    case 'internetIncluded':
      return <Wifi {...amenityLucideProps} />
    case 'kitchen':
      return <Refrigerator {...amenityLucideProps} />
    case 'balcony':
      return (
        <svg
          className={amenitySvgClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 21h18M5 21V9l7-4 7 4v12" />
        </svg>
      )
    case 'energy':
      return <Zap {...amenityLucideProps} />
    case 'handyman':
      return <Wrench {...amenityLucideProps} />
    case 'storage':
      return <Archive {...amenityLucideProps} />
  }
}

export const AMENITY_KEYS: AmenityKey[] = [
  'fullyFurnished',
  'kitchen',
  'internetIncluded',
  'parking',
  'bikeStorage',
  'elevator',
  'balcony',
  'security',
  'fingerprint',
  'handyman',
  'storage',
  'energy',
]
