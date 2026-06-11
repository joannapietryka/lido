import { useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { FAQ_ITEMS, getFaqText, type FaqItem } from '../data/faq'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { ensureGsap, gsap } from '../utils/gsap'
import cupsImg from '../assets/cups.jpg'
import plantImg from '../assets/plant.jpg'
import balconyImg from '../assets/balcony.jpg'
import bikeImg from '../assets/bike.jpg'
import catImg from '../assets/cat.jpg'

const FAQ_PHOTOS = [
  {
    src: cupsImg,
    altKey: 'cups',
    className: 'top-0 left-[4%] w-[46%] h-[38%] -rotate-3',
  },
  {
    src: plantImg,
    altKey: 'plant',
    className: 'top-[6%] right-[4%] w-[40%] h-[34%] rotate-[5deg]',
  },
  {
    src: balconyImg,
    altKey: 'balcony',
    className: 'top-[38%] left-[6%] w-[44%] h-[32%] -rotate-2',
  },
  {
    src: bikeImg,
    altKey: 'bike',
    className: 'top-[44%] right-[6%] w-[42%] h-[30%] rotate-[6deg]',
  },
  {
    src: catImg,
    altKey: 'cat',
    className: 'bottom-[2%] left-[20%] w-[44%] h-[28%] -rotate-[4deg]',
  },
] as const

const FAQ_PHOTO_MOTION = [
  { fromY: 56, duration: 0.72, ease: 'power2.out', at: 0 },
  { fromY: 68, duration: 1.05, ease: 'power3.out', at: 0.14 },
  { fromY: 48, duration: 0.88, ease: 'power4.out', at: 0.28 },
  { fromY: 76, duration: 1.15, ease: 'back.out(1.35)', at: 0.2 },
  { fromY: 52, duration: 0.95, ease: 'power3.out', at: 0.38 },
] as const

function FaqItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  const { i18n } = useTranslation()
  const { question, answer } = getFaqText(item, i18n.language)
  const panelId = `faq-panel-${item.id}`
  const buttonId = `faq-button-${item.id}`

  return (
    <div className="bg-[#F8F9FA] rounded-[32px] overflow-hidden transition-colors hover:bg-[#F3F4F6]">
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 text-left px-6 py-5 sm:px-8 sm:py-6"
      >
        <span className="text-[16px] sm:text-[17px] font-medium text-brand-dark leading-snug pr-2">
          {question}
        </span>
        <span
          className={[
            'shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-dark shadow-sm transition-transform duration-300',
            isOpen ? 'rotate-180' : '',
          ].join(' ')}
          aria-hidden
        >
          <ChevronDown className="w-5 h-5" strokeWidth={2} />
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={[
          'grid transition-[grid-template-rows] duration-300 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        ].join(' ')}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 sm:px-8 sm:pb-6 pt-0 font-inter text-[15px] leading-relaxed text-gray-600">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function Faq() {
  const ref = useScrollReveal<HTMLElement>()
  const { t } = useTranslation()
  const [openKey, setOpenKey] = useState<string | null>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    ensureGsap()

    const collage = el.querySelector('[data-faq-collage]')
    const photos = el.querySelectorAll('[data-faq-photo]')
    if (!collage || !photos.length) return

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        delay: 0.2,
        scrollTrigger: {
          trigger: collage,
          start: 'top 62%',
          toggleActions: 'play none none none',
          once: true,
        },
        onComplete: () => {
          for (const photo of photos) {
            photo.classList.add('is-revealed')
          }
        },
      })

      photos.forEach((photo, index) => {
        const motion = FAQ_PHOTO_MOTION[index] ?? FAQ_PHOTO_MOTION[FAQ_PHOTO_MOTION.length - 1]
        const fromScale = 0.86 + index * 0.02

        gsap.set(photo, { autoAlpha: 0, y: motion.fromY, scale: fromScale })

        timeline.to(
          photo,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: motion.duration,
            ease: motion.ease,
          },
          motion.at,
        )
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="faq" className="py-24 bg-white overflow-hidden scroll-mt-32">
      <div className="max-w-[1440px] mx-auto px-6">
        <div data-reveal className="mb-10 lg:mb-14 text-left max-w-3xl">
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-medium tracking-tight text-brand-dark leading-[1.15]">
            {t('faq.title')}
          </h2>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 xl:gap-x-14 items-start">
          <div
            data-faq-collage
            className="relative w-full max-w-[420px] mx-auto lg:mx-0 mt-10 sm:mt-12 lg:mt-16 min-h-[220px] sm:min-h-[280px] lg:min-h-[480px] mb-10 lg:mb-0 lg:col-span-4 xl:col-span-4"
            aria-hidden
          >
            {FAQ_PHOTOS.map((photo) => (
              <div
                key={photo.altKey}
                data-faq-photo
                className={['absolute overflow-hidden rounded-[24px] shadow-[0_12px_32px_rgba(17,19,21,0.1)]', photo.className].join(' ')}
              >
                <img
                  src={photo.src}
                  alt={t(`faq.photos.${photo.altKey}`)}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="lg:col-span-8 lg:col-start-5 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              {FAQ_ITEMS.map((item) => (
                <div key={item.id} data-reveal>
                  <FaqItem
                    item={item}
                    isOpen={openKey === item.id}
                    onToggle={() => setOpenKey((current) => (current === item.id ? null : item.id))}
                  />
                </div>
              ))}
            </div>

            <div
              data-reveal
              className="bg-brand-dark rounded-[32px] p-8 lg:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
            >
              <p className="text-white text-[18px] lg:text-[20px] font-medium leading-snug max-w-md">
                {t('faq.ctaText')}
              </p>
              <Link
                to="/#kontakt"
                className="inline-flex shrink-0 justify-center items-center bg-white text-brand-dark px-8 py-3.5 rounded-full text-[15px] font-medium hover:bg-gray-100 transition-colors"
              >
                {t('faq.ctaButton')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
