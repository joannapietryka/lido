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

function StarPill({ label }: { label: string }) {
  return (
    <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
      <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
      <span className="text-[11px] font-bold tracking-widest uppercase text-brand-dark">{label}</span>
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
    <div className="bg-brand-dark rounded-[32px] p-8 flex flex-col justify-between flex-[45] min-h-0 overflow-hidden">
      <div>
        <h4 className="text-white text-[18px] font-medium mb-3">{t('floorPlans.premiumFeatures')}</h4>
        <p className="text-gray-400 text-[14px] font-inter leading-relaxed">{description}</p>
      </div>
      <div className="flex items-center gap-6 mt-6">
        <div className="text-center">
          <span className="block text-white text-[24px] font-medium">{t('floorPlans.equipmentValue')}</span>
          <span className="text-gray-500 text-[11px] font-inter uppercase tracking-wider">{t('floorPlans.equipment')}</span>
        </div>
        <div className="w-px h-8 bg-gray-700" />
        <div className="text-center">
          <span className="block text-white text-[24px] font-medium">{energy}</span>
          <span className="text-gray-500 text-[11px] font-inter uppercase tracking-wider">{t('floorPlans.energy')}</span>
        </div>
        <div className="w-px h-8 bg-gray-700" />
        <div className="text-center">
          <span className="block text-white text-[24px] font-medium">{concierge}</span>
          <span className="text-gray-500 text-[11px] font-inter uppercase tracking-wider">{t('floorPlans.concierge')}</span>
        </div>
      </div>
    </div>
  )
}

function SideImages({ leftSrc, rightSrc }: { leftSrc: string; rightSrc: string }) {
  return (
    <div className="flex gap-5 flex-[55] min-h-0">
      <div className="relative rounded-[24px] overflow-hidden group flex-1">
        <img
          src={leftSrc}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt=""
        />
      </div>
      <div className="relative rounded-[24px] overflow-hidden group flex-1">
        <img
          src={rightSrc}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt=""
        />
      </div>
    </div>
  )
}

function PlanImage({
  area,
  price,
  bedsText,
  bathsText,
  src,
  detailHref,
}: {
  area: string
  price: string
  bedsText: string
  bathsText: string
  src: string
  detailHref: string
}) {
  const { t } = useTranslation()
  return (
    <Link
      to={detailHref}
      className="lg:col-span-7 relative rounded-[40px] overflow-hidden group h-full block"
    >
      <img src={src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <StarPill label={t('floorPlans.availableNow')} />
      <div className="absolute bottom-8 left-8 right-8">
        <h3 className="text-[32px] lg:text-[40px] font-medium text-white mb-2 tracking-tight">{t('floorPlans.oneRoomApartment')}</h3>
        <p className="text-white/80 text-[13px] font-inter uppercase tracking-widest mb-4">
          Kraków Ruczaj • {area}
        </p>
        <div className="flex items-center gap-6 text-white/90 text-sm font-inter">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {bedsText}
          </span>
          <span className="w-1 h-1 bg-white/50 rounded-full" />
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
            {bathsText}
          </span>
          <span className="w-1 h-1 bg-white/50 rounded-full" />
          <span className="text-white font-semibold text-[16px]">{t('floorPlans.priceFrom', { price })}</span>
        </div>
        <span className="mt-4 inline-flex items-center gap-2 text-white/90 text-sm font-medium group-hover:text-white transition-colors">
          {t('floorPlans.viewDetails')}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export function FloorPlans() {
  const [tab, setTab] = useState<TabId>('1bed')
  const ref = useScrollReveal<HTMLElement>()
  const { t } = useTranslation()

  const config = useMemo(() => {
    return {
      '1bed': {
        area: '20 m²',
        price: '1 800 zł',
        heroSrc: pokoj1aImg,
        energy: 'A+',
        concierge: '24/7',
        leftImg: pokoj1bImg,
        rightImg: pokoj1cImg,
        rightColOrder: '',
      },
      '2bed': {
        area: '40 m²',
        price: '2 500 zł',
        heroSrc: pokoj2aImg,
        energy: 'A+',
        concierge: '24/7',
        leftImg: pokoj2bImg,
        rightImg: pokoj2cImg,
        rightColOrder: 'order-2 lg:order-1',
      },
    } satisfies Record<TabId, unknown>
  }, [])

  return (
    <section ref={ref} id="mieszkania" className="py-24 bg-white relative overflow-hidden scroll-mt-32">
      <div className="max-w-[1440px] mx-auto px-6">
        <div data-reveal className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left">
          <div>
            <h2 className="text-[48px] font-medium tracking-tight mb-4">{t('floorPlans.title')}</h2>
            <p className="text-gray-500 font-inter text-lg whitespace-pre-line">{t('floorPlans.subtitle')}</p>
          </div>

          <div className="bg-[#F8F9FA] p-1.5 rounded-full flex gap-1 border border-gray-100">
            <button
              type="button"
              onClick={() => setTab('1bed')}
              className={[
                'px-8 py-3 rounded-full text-[15px] font-medium transition-all duration-500',
                tab === '1bed' ? 'bg-brand-dark text-white shadow-md' : 'text-gray-500 hover:text-brand-dark',
              ].join(' ')}
            >
              {t('floorPlans.tabStudio')}
            </button>
            <button
              type="button"
              onClick={() => setTab('2bed')}
              className={[
                'px-8 py-3 rounded-full text-[15px] font-medium transition-all duration-500',
                tab === '2bed' ? 'bg-brand-dark text-white shadow-md' : 'text-gray-500 hover:text-brand-dark',
              ].join(' ')}
            >
              {t('floorPlans.tabTwoRooms')}
            </button>
          </div>
        </div>

        <div id="1bed" className={['tab-content', tab === '1bed' ? 'active' : ''].join(' ')}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[550px]">
            <PlanImage
              area={config['1bed'].area}
              price={config['1bed'].price}
              bedsText={t('floorPlans.oneRoom')}
              bathsText={t('floorPlans.oneBath')}
              src={config['1bed'].heroSrc}
              detailHref="/mieszkania/studio"
            />
            <div className="lg:col-span-5 flex flex-col gap-5 h-full min-h-0">
              <div data-reveal className="h-full flex flex-col gap-5 min-h-0">
                <FeatureCard
                description={t('floorPlans.featureStudio')}
                energy={config['1bed'].energy}
                concierge={config['1bed'].concierge}
                />
                <SideImages leftSrc={config['1bed'].leftImg} rightSrc={config['1bed'].rightImg} />
              </div>
            </div>
          </div>
        </div>

        <div id="2bed" className={['tab-content', tab === '2bed' ? 'active' : ''].join(' ')}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[550px]">
            <div className={['lg:col-span-5 flex flex-col gap-5 h-full min-h-0', config['2bed'].rightColOrder].join(' ')}>
              <div data-reveal className="h-full flex flex-col gap-5 min-h-0">
                <FeatureCard
                description={t('floorPlans.featureTwoRooms')}
                energy={config['2bed'].energy}
                concierge={config['2bed'].concierge}
                />
                <SideImages leftSrc={config['2bed'].leftImg} rightSrc={config['2bed'].rightImg} />
              </div>
            </div>
            <Link
              to="/mieszkania/2-pokoje"
              data-reveal
              className="order-1 lg:order-2 lg:col-span-7 relative rounded-[40px] overflow-hidden group h-full block"
            >
              <img
                src={config['2bed'].heroSrc}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <StarPill label={t('floorPlans.availableNow')} />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-[32px] lg:text-[40px] font-medium text-white mb-2 tracking-tight">
                  {t('floorPlans.twoRoomApartment')}
                </h3>
                <p className="text-white/80 text-[13px] font-inter uppercase tracking-widest mb-4">
                  Kraków Ruczaj • {config['2bed'].area}
                </p>
                <div className="flex items-center gap-6 text-white/90 text-sm font-inter">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    {t('floorPlans.twoRooms')}
                  </span>
                  <span className="w-1 h-1 bg-white/50 rounded-full" />
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                      />
                    </svg>
                    {t('floorPlans.oneBath')}
                  </span>
                  <span className="w-1 h-1 bg-white/50 rounded-full" />
                  <span className="text-white font-semibold text-[16px]">{t('floorPlans.priceFrom', { price: config['2bed'].price })}</span>
                </div>
                <span className="mt-4 inline-flex items-center gap-2 text-white/90 text-sm font-medium group-hover:text-white transition-colors">
                  {t('floorPlans.viewDetails')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div data-reveal className="mt-12">
          <Link
            to={tab === '1bed' ? '/mieszkania/studio' : '/mieszkania/2-pokoje'}
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

