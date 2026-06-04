import type { LucideProps } from 'lucide-react'

const ICON_SIZES = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
} as const

export type IconSize = keyof typeof ICON_SIZES

export type LucideIconOptions = {
  size?: IconSize
  className?: string
  strokeWidth?: number
  ariaHidden?: boolean
}

/** Shared props for Lucide icons; use the same `className` on native `<svg>` for consistency. */
export function lucideIconProps({
  size = 'md',
  className = '',
  strokeWidth = 1.5,
  ariaHidden = true,
}: LucideIconOptions = {}): LucideProps {
  const props: LucideProps = {
    className: [ICON_SIZES[size], className].filter(Boolean).join(' '),
    strokeWidth,
  }

  if (ariaHidden) {
    props['aria-hidden'] = true
  }

  return props
}

/** `className` only — handy for inline `<svg>` next to Lucide icons. */
export function svgIconClassName(options: LucideIconOptions = {}): string {
  return lucideIconProps(options).className ?? ''
}
