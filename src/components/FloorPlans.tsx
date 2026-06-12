import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTranslation } from 'react-i18next'
import pokoj1aImg from '../assets/pokoj-1a.png'
import pokoj1bImg from '../assets/pokoj-1b.png'
import pokoj1cImg from '../assets/pokoj-1c.jpeg'
import pokoj2aImg from '../assets/pokoj-2a.jpeg'
import pokoj2bImg from '../assets/pokoj-2b.png'
import pokoj2cImg from '../assets/pokoj-2c.png'

type TabId = '1bed' | '2bed'

type TabConfig = {
  area: string
  price: string
  heroSrc: string
  energy: string
  concierge: string
  leftImg: string
  rightImg: string
  detailHref: string
  titleKey: 'oneRoomApartment' | 'twoRoomApartment'
  bedsKey: 'oneRoom' | 'twoRooms'
  featureKey: 'featureStudio' | 'featureTwoRooms'
}

const CARD_RADIUS = 'rounded-[2.5rem]'
const MEDIA_RADIUS = 'rounded-[2.5rem] lg:rounded-[24px]'

function StarPill({ label }: { label: string }) {
  return (
    <div className="absolute top-4 left-4 lg:top-6 lg:left-6 bg-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full flex items-center gap-2 shadow-sm">
      <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-black" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
      <span className="text-[10px] lg:text-[11px] font-bold tracking-widest uppercase text-brand-dark">{label}</span>
    </div>
  )
}

function FeatureCard({
  description,
  energy,
  concierge,
}: {
  description: string
  energy: string
  concierge: string
}) {
  const { t } = useTranslation()
  return (
    <div
      className={[
        'bg-brand-dark p-6 lg:p-8 flex flex-col gap-6 lg:justify-between lg:flex-[45] lg:min-h-0 overflow-hidden',
        CARD_RADIUS,
      ].join(' ')}
    >
      <div>
        <h4 className="text-white text-[17px] lg:text-[18px] font-medium mb-2 lg:mb-3">
          {t('floorPlans.premiumFeatures')}
        </h4>
        <p className="text-gray-400 text-[14px] font-inter leading-relaxed">{description}</p>
      </div>
      <div className="grid grid-cols-3 gap-3 lg:flex lg:items-center lg:gap-6 lg:mt-6">
        <div className="text-center lg:text-center">
          <span className="block text-white text-[20px] lg:text-[24px] font-medium">{t('floorPlans.equipmentValue')}</span>
          <span className="text-gray-500 text-[10px] lg:text-[11px] font-inter uppercase tracking-wider">
            {t('floorPlans.equipment')}
          </span>
        </div>
        <div className="hidden lg:block w-px h-8 bg-gray-700" />
        <div className="text-center">
          <span className="block text-white text-[20px] lg:text-[24px] font-medium">{energy}</span>
          <span className="text-gray-500 text-[10px] lg:text-[11px] font-inter uppercase tracking-wider">
            {t('floorPlans.energy')}
          </span>
        </div>
        <div className="hidden lg:block w-px h-8 bg-gray-700" />
        <div className="text-center">
          <span className="block text-white text-[20px] lg:text-[24px] font-medium">{concierge}</span>
          <span className="text-gray-500 text-[10px] lg:text-[11px] font-inter uppercase tracking-wider">
            {t('floorPlans.concierge')}
          </span>
        </div>
      </div>
    </div>
  )
}

function SideImages({ leftSrc, rightSrc }: { leftSrc: string; rightSrc: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:flex lg:gap-5 lg:flex-[55] lg:min-h-0">
      {[leftSrc, rightSrc].map((src) => (
        <div
          key={src}
          className={['relative overflow-hidden group aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-0', MEDIA_RADIUS].join(' ')}
        >
          <img
            src={src}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt=""
          />
        </div>
      ))}
    </div>
  )
}

function PlanHeroCard({
  titleKey,
  area,
  price,
  bedsText,
  bathsText,
  src,
  detailHref,
  reveal,
  heroOnRightDesktop = false,
}: {
  titleKey: TabConfig['titleKey']
  area: string
  price: string
  bedsText: string
  bathsText: string
  src: string
  detailHref: string
  reveal?: boolean
  heroOnRightDesktop?: boolean
}) {
  const { t } = useTranslation()

  return (
    <Link
      to={detailHref}
      data-reveal={reveal ? true : undefined}
      className={[
        'lg:col-span-7 relative overflow-hidden group block w-full aspect-[4/3] lg:aspect-auto lg:h-full',
        heroOnRightDesktop ? 'order-1 lg:order-2' : '',
        CARD_RADIUS,
        'lg:rounded-[40px]',
      ].join(' ')}
    >
      <img src={src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <StarPill label={t('floorPlans.availableNow')} />
      <div className="absolute bottom-5 left-5 right-5 lg:bottom-8 lg:left-8 lg:right-8">
        <h3 className="text-[20px] sm:text-[28px] lg:text-[40px] font-medium text-white mb-1.5 lg:mb-2 tracking-tight leading-[1.15] max-w-[16rem] sm:max-w-none">
          {t(`floorPlans.${titleKey}`)}
        </h3>
        <p className="text-white/80 text-[10px] sm:text-[13px] font-inter uppercase tracking-widest mb-3 lg:mb-4">
          Kraków Ruczaj • {area}
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2 text-white/90 text-xs sm:text-sm font-inter">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {bedsText}
            </span>
            <span className="hidden sm:inline w-1 h-1 bg-white/50 rounded-full" />
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
              {bathsText}
            </span>
          </div>
          <span className="text-white font-semibold text-[15px] sm:text-[16px]">
            {t('floorPlans.priceFrom', { price })}
          </span>
        </div>
        <span className="mt-3 hidden lg:inline-flex items-center gap-2 text-white/90 text-sm font-medium group-hover:text-white transition-colors">
          {t('floorPlans.viewDetails')}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

function TabPanel({ config, heroOnRightDesktop = false }: { config: TabConfig; heroOnRightDesktop?: boolean }) {
  const { t } = useTranslation()

  const sidebar = (
    <div
      className={[
        'lg:col-span-5 flex flex-col gap-5 h-full min-h-0',
        heroOnRightDesktop ? 'order-2 lg:order-1' : '',
      ].join(' ')}
    >
      <div data-reveal className="h-full flex flex-col gap-5 min-h-0">
        <FeatureCard
          description={t(`floorPlans.${config.featureKey}`)}
          energy={config.energy}
          concierge={config.concierge}
        />
        <SideImages leftSrc={config.leftImg} rightSrc={config.rightImg} />
      </div>
    </div>
  )

  const hero = (
    <PlanHeroCard
      titleKey={config.titleKey}
      area={config.area}
      price={config.price}
      bedsText={t(`floorPlans.${config.bedsKey}`)}
      bathsText={t('floorPlans.oneBath')}
      src={config.heroSrc}
      detailHref={config.detailHref}
      reveal
      heroOnRightDesktop={heroOnRightDesktop}
    />
  )

  return (
    <>
      <div className="lg:hidden flex flex-col gap-4">
        <PlanHeroCard
          titleKey={config.titleKey}
          area={config.area}
          price={config.price}
          bedsText={t(`floorPlans.${config.bedsKey}`)}
          bathsText={t('floorPlans.oneBath')}
          src={config.heroSrc}
          detailHref={config.detailHref}
        />
        <FeatureCard description={t(`floorPlans.${config.featureKey}`)} energy={config.energy} concierge={config.concierge} />
        <SideImages leftSrc={config.leftImg} rightSrc={config.rightImg} />
      </div>

      <div className="hidden lg:grid lg:grid-cols-12 gap-6 h-[550px]">
        {heroOnRightDesktop ? (
          <>
            {sidebar}
            {hero}
          </>
        ) : (
          <>
            {hero}
            {sidebar}
          </>
        )}
      </div>
    </>
  )
}

export function FloorPlans() {
  const [tab, setTab] = useState<TabId>('2bed')
  const ref = useScrollReveal<HTMLElement>()
  const { t } = useTranslation()

  const tabs = useMemo(
    (): Record<TabId, TabConfig> => ({
      '1bed': {
        area: '20 m²',
        price: '2 500 zł',
        heroSrc: pokoj1aImg,
        energy: 'A+',
        concierge: '24/7',
        leftImg: pokoj1bImg,
        rightImg: pokoj1cImg,
        detailHref: '/mieszkania/studio',
        titleKey: 'oneRoomApartment',
        bedsKey: 'oneRoom',
        featureKey: 'featureStudio',
      },
      '2bed': {
        area: '35 m²',
        price: '2 700 zł',
        heroSrc: pokoj2aImg,
        energy: 'A+',
        concierge: '24/7',
        leftImg: pokoj2bImg,
        rightImg: pokoj2cImg,
        detailHref: '/mieszkania/2-pokoje',
        titleKey: 'twoRoomApartment',
        bedsKey: 'twoRooms',
        featureKey: 'featureTwoRooms',
      },
    }),
    [],
  )

  return (
    <section ref={ref} id="mieszkania" className="py-16 lg:py-24 bg-white relative overflow-hidden scroll-mt-32">
      <div className="max-w-[1440px] mx-auto px-6">
        <div data-reveal className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-16 gap-5 lg:gap-8 text-left">
          <div>
            <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-medium tracking-tight mb-3 lg:mb-4">
              {t('floorPlans.title')}
            </h2>
            <p className="text-gray-500 font-inter text-base lg:text-lg whitespace-pre-line">
              {t('floorPlans.subtitle')}
            </p>
          </div>

          <div className="bg-[#F8F9FA] p-1 rounded-full flex gap-1 border border-gray-100 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setTab('2bed')}
              className={[
                'flex-1 sm:flex-none px-5 py-2.5 lg:px-8 lg:py-3 rounded-full text-[13px] lg:text-[15px] font-medium transition-all duration-500',
                tab === '2bed' ? 'bg-brand-dark text-white shadow-md' : 'text-gray-500 hover:text-brand-dark',
              ].join(' ')}
            >
              {t('floorPlans.tabTwoRooms')}
            </button>
            <button
              type="button"
              onClick={() => setTab('1bed')}
              className={[
                'flex-1 sm:flex-none px-5 py-2.5 lg:px-8 lg:py-3 rounded-full text-[13px] lg:text-[15px] font-medium transition-all duration-500',
                tab === '1bed' ? 'bg-brand-dark text-white shadow-md' : 'text-gray-500 hover:text-brand-dark',
              ].join(' ')}
            >
              {t('floorPlans.tabStudio')}
            </button>
          </div>
        </div>

        <div id="2bed" className={['tab-content', tab === '2bed' ? 'active' : ''].join(' ')}>
          <TabPanel config={tabs['2bed']} />
        </div>

        <div id="1bed" className={['tab-content', tab === '1bed' ? 'active' : ''].join(' ')}>
          <TabPanel config={tabs['1bed']} heroOnRightDesktop />
        </div>

        <div data-reveal className="mt-8 lg:mt-12">
          <Link
            to={tabs[tab].detailHref}
            className="inline-flex items-center gap-2 text-[15px] font-medium text-brand-dark hover:opacity-70 transition-opacity"
          >
            {t('floorPlans.viewDetails')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
