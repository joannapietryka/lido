import { GraduationCap, Leaf, ShoppingBag, TramFront } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { lucideIconProps } from '../../utils/iconProps'
import './RuczajPerksSection.css'

const SECTION_KEYS = ['nature', 'connectivity', 'education', 'convenience'] as const

type SectionKey = (typeof SECTION_KEYS)[number]

const SECTION_ICONS: Record<SectionKey, LucideIcon> = {
  nature: Leaf,
  connectivity: TramFront,
  education: GraduationCap,
  convenience: ShoppingBag,
}

const iconProps = lucideIconProps({
  size: 'lg',
  className: 'text-brand-dark',
})

export function RuczajPerksSection() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className="flex flex-col gap-14 lg:gap-20 max-w-4xl mx-auto w-full overflow-hidden">
      {SECTION_KEYS.map((key, index) => {
        const Icon = SECTION_ICONS[key]
        const reversed = index % 2 === 1

        return (
          <article
            key={key}
            data-reveal
            className={['ruczaj-perk-row', reversed ? 'ruczaj-perk-row--reverse' : ''].join(' ')}
          >
            <div className={['ruczaj-perk-icon', `ruczaj-perk-icon--${index}`].join(' ')}>
              <Icon {...iconProps} />
            </div>

            <div className={['ruczaj-perk-bubble', `ruczaj-perk-bubble--${index}`].join(' ')}>
              <div className="ruczaj-perk-bubble__inner">
                <h2 className="ruczaj-perk-title">{t(`ruczajPage.sections.${key}.title`)}</h2>
                <p className="ruczaj-perk-desc">{t(`ruczajPage.sections.${key}.description`)}</p>
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}
