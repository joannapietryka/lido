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

export function ApartmentAmenityIcon({ type }: { type: AmenityKey }) {
  const className = 'w-6 h-6'

  switch (type) {
    case 'security':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    case 'fingerprint':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 10a2 2 0 10-2 2v1a2 2 0 004 0v-1" />
          <path d="M12 6a6 6 0 00-6 6v1" />
          <path d="M12 6a6 6 0 016 6v1" />
          <path d="M12 2a10 10 0 00-10 10v1" />
          <path d="M12 2a10 10 0 0110 10v1" />
          <path d="M12 14v2" />
          <path d="M10 18a2 2 0 004 0" />
        </svg>
      )
    case 'elevator':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="3" width="10" height="18" rx="1.5" />
          <path d="M12 7v10M9.5 9.5L12 7l2.5 2.5M9.5 14.5L12 17l2.5-2.5" />
        </svg>
      )
    case 'parking':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11h18v9H3z" />
          <path d="M3 11l4-6h10l4 6" />
          <path d="M7 15h10l-1-3H8l-1 3z" />
          <circle cx="8.5" cy="17.5" r="1" />
          <circle cx="15.5" cy="17.5" r="1" />
        </svg>
      )
    case 'kitchen':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="9" height="20" rx="1.5" />
          <path d="M5 9h9M8 2v7" />
          <rect x="16" y="6" width="3" height="14" rx="0.5" />
          <path d="M17.5 10v4" />
        </svg>
      )
    case 'balcony':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M5 21V9l7-4 7 4v12" />
        </svg>
      )
    case 'energy':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case 'handyman':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      )
    case 'storage':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="18" rx="1.5" />
          <path d="M12 3v18" />
          <path d="M8 8h.01M16 8h.01M8 12h.01M16 12h.01M8 16h.01M16 16h.01" />
          <path d="M7 21h10" />
        </svg>
      )
  }
}

export const AMENITY_KEYS: AmenityKey[] = [
  'security',
  'fingerprint',
  'elevator',
  'parking',
  'kitchen',
  'balcony',
  'energy',
  'handyman',
  'storage',
]
