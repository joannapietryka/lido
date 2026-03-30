import { useScrollReveal } from '../hooks/useScrollReveal'
import zakrzowekImg from '../assets/zakrzowek.png'

export function Neighborhood() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="lokalizacja" className="py-24 bg-white overflow-hidden scroll-mt-32">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div data-reveal className="order-2 lg:order-1 lg:pr-12">
          <h2 className="text-[48px] font-medium leading-[1.05] mb-6 tracking-tight text-brand-dark">
            O lokalizacji
          </h2>
          <p className="text-gray-500 font-inter text-lg mb-12 leading-relaxed max-w-lg">
            Situated in the heart of the city's most vibrant district, Realty places you steps away from
            world-class dining, cultural landmarks, and serene green spaces. Experience the perfect balance of
            urban excitement and tranquil living.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4 items-start group">
              <div className="w-12 h-12 bg-[#F3F4F6] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-brand-dark transition-colors duration-300">
                <svg
                  className="w-5 h-5 text-brand-dark group-hover:text-white transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3h8M4 19h16M4 15h16M12 15v4M7 3v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V3z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[16px] font-medium mb-1 text-brand-dark">Transit Hub</h4>
                <p className="text-gray-500 font-inter text-[14px] leading-relaxed">
                  2 min walk to Central Station connecting all major lines.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="w-12 h-12 bg-[#F3F4F6] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-brand-dark transition-colors duration-300">
                <svg
                  className="w-5 h-5 text-brand-dark group-hover:text-white transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z M6 1v3M10 1v3M14 1v3" />
                </svg>
              </div>
              <div>
                <h4 className="text-[16px] font-medium mb-1 text-brand-dark">Cafes &amp; Dining</h4>
                <p className="text-gray-500 font-inter text-[14px] leading-relaxed">
                  Over 50 premium restaurants and artisan cafes nearby.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="w-12 h-12 bg-[#F3F4F6] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-brand-dark transition-colors duration-300">
                <svg
                  className="w-5 h-5 text-brand-dark group-hover:text-white transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22v-8m0-12a6 6 0 0 0-6 6c0 2.5 1.5 4.5 3.5 5.5v2.5a2.5 2.5 0 0 0 5 0v-2.5c2-1 3.5-3 3.5-5.5a6 6 0 0 0-6-6z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[16px] font-medium mb-1 text-brand-dark">Urban Parks</h4>
                <p className="text-gray-500 font-inter text-[14px] leading-relaxed">
                  Direct access to Riverside Park for morning jogs.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="w-12 h-12 bg-[#F3F4F6] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-brand-dark transition-colors duration-300">
                <svg
                  className="w-5 h-5 text-brand-dark group-hover:text-white transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <div>
                <h4 className="text-[16px] font-medium mb-1 text-brand-dark">Retail District</h4>
                <p className="text-gray-500 font-inter text-[14px] leading-relaxed">
                  High-end boutiques and everyday essentials just around the corner.
                </p>
              </div>
            </div>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-2 text-[15px] font-medium text-brand-dark hover:opacity-70 transition-opacity"
          >
            View Interactive Map
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div data-reveal className="order-1 lg:order-2 relative h-[500px] lg:h-[600px] w-full rounded-[40px] overflow-hidden">
          <img
            src={zakrzowekImg}
            alt="zakrzowek View"
            className="w-full h-full object-cover"
            data-parallax
          />

          <div className="absolute top-[15%] right-[-5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="bg-[#1A1A1A] text-white text-[13px] font-medium px-4 py-2 rounded-xl shadow-lg whitespace-nowrap hidden sm:block mb-2">
              Przemiarki 15
            </div>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
              <div className="w-3 h-3 bg-brand-dark rounded-full" />
            </div>
          </div>

          <div className="absolute top-[55%] left-[30%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
            <div className="bg-[#1A1A1A] text-white text-[13px] font-medium px-4 py-2 rounded-xl shadow-lg whitespace-nowrap hidden sm:block">
             Zakrzówek Kraków
            </div>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform relative z-10">
              <div className="w-3 h-3 bg-brand-dark rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

