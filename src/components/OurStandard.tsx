import { useScrollReveal } from '../hooks/useScrollReveal'

function Card({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="group bg-[#F8F9FA] rounded-[32px] p-8 hover:bg-brand-dark transition-colors duration-500">
      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors duration-500">
        {icon}
      </div>
      <h4 className="text-[20px] font-medium mb-3 text-brand-dark group-hover:text-white transition-colors duration-500">
        {title}
      </h4>
      <p className="text-gray-500 font-inter text-[14px] leading-relaxed group-hover:text-gray-400 transition-colors duration-500">
        {description}
      </p>
    </div>
  )
}

export function OurStandard() {
  const ref = useScrollReveal<HTMLElement>({ targets: ['[data-card]'] })

  return (
    <section ref={ref} id="standard" className="py-24 bg-white overflow-hidden scroll-mt-32">
      <div className="max-w-[1440px] mx-auto px-6">
        <div data-reveal className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left">
          <div>
            <h2 className="text-[48px] font-medium tracking-tight mb-4">Nasz Standard</h2>
            <p className="text-gray-500 font-inter text-lg">What sets us apart in every property we represent.</p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[15px] font-medium text-brand-dark hover:opacity-70 transition-opacity"
          >
            View All Features
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div data-card>
            <Card
            title="Premium Materials"
            description="Italian marble, European oak flooring, and designer fixtures in every residence."
            icon={
              <svg
                className="w-6 h-6 text-brand-dark group-hover:text-white transition-colors duration-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 21h18M4 18h16M6 18v-8a4 4 0 014-4h4a4 4 0 014 4v8M9 10h.01M15 10h.01" />
              </svg>
            }
            />
          </div>
          <div data-card>
            <Card
            title="Smart Living"
            description="Integrated home automation controlling lighting, climate, and security from your device."
            icon={
              <svg
                className="w-6 h-6 text-brand-dark group-hover:text-white transition-colors duration-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22v-8m0-12a6 6 0 0 0-6 6c0 2.5 1.5 4.5 3.5 5.5v2.5a2.5 2.5 0 0 0 5 0v-2.5c2-1 3.5-3 3.5-5.5a6 6 0 0 0-6-6z" />
              </svg>
            }
            />
          </div>
          <div data-card>
            <Card
            title="Optimal Layout"
            description="Thoughtfully designed floor plans maximizing natural light and functional space."
            icon={
              <svg
                className="w-6 h-6 text-brand-dark group-hover:text-white transition-colors duration-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v18M3 12h18M7 7l10 10M17 7L7 17" />
              </svg>
            }
            />
          </div>
          <div data-card>
            <Card
            title="Soundproof Design"
            description="Triple-glazed windows and acoustic insulation for absolute peace and privacy."
            icon={
              <svg
                className="w-6 h-6 text-brand-dark group-hover:text-white transition-colors duration-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            }
            />
          </div>
          <div data-card>
            <Card
            title="Energy Efficiency"
            description="A+ energy rating with solar-ready infrastructure and LED throughout."
            icon={
              <svg
                className="w-6 h-6 text-brand-dark group-hover:text-white transition-colors duration-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            }
            />
          </div>
          <div data-card>
            <Card
            title="Concierge Service"
            description="24/7 dedicated concierge team for reservations, deliveries, and assistance."
            icon={
              <svg
                className="w-6 h-6 text-brand-dark group-hover:text-white transition-colors duration-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
            />
          </div>
        </div>
      </div>
    </section>
  )
}

