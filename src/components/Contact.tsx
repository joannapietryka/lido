export function Contact() {
  return (
    <section id="kontakt" className="py-24 bg-white scroll-mt-32">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[48px] font-medium text-brand-dark mb-4 tracking-tight">Skontaktuj się z nami</h2>
          <p className="text-gray-500 font-inter text-[17px] leading-relaxed">
            Masz pytania? Skontaktuj się z nami, a chętnie na nie odpowiemy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#F8F9FA] rounded-[32px] p-8">
              <div className="w-12 h-12 bg-brand-dark rounded-full flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h4 className="text-[16px] font-medium mb-1">Napisz</h4>
              <p className="text-gray-500 font-inter text-[14px]">hello@lido.com</p>
            </div>

            <div className="bg-[#F8F9FA] rounded-[32px] p-8">
              <div className="w-12 h-12 bg-brand-dark rounded-full flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h4 className="text-[16px] font-medium mb-1">Zadzwoń</h4>
              <p className="text-gray-500 font-inter text-[14px]">+1 (555) 123-4567</p>
            </div>

            <div className="bg-[#F8F9FA] rounded-[32px] p-8">
              <div className="w-12 h-12 bg-brand-dark rounded-full flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h4 className="text-[16px] font-medium mb-1">Nasze Biuro</h4>
              <p className="text-gray-500 font-inter text-[14px]">Przemiarki 15, Kraków</p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-[#F8F9FA] rounded-[40px] p-10 lg:p-12">
            <form className="space-y-6 font-inter">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] text-gray-500 font-medium mb-2">Imię</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full bg-white rounded-xl px-5 py-3.5 border border-gray-100 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all text-brand-dark placeholder-gray-400 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-[13px] text-gray-500 font-medium mb-2">Nazwisko</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-white rounded-xl px-5 py-3.5 border border-gray-100 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all text-brand-dark placeholder-gray-400 shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] text-gray-500 font-medium mb-2">Adres Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-white rounded-xl px-5 py-3.5 border border-gray-100 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all text-brand-dark placeholder-gray-400 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-[13px] text-gray-500 font-medium mb-2">Numer Telefonu</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white rounded-xl px-5 py-3.5 border border-gray-100 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all text-brand-dark placeholder-gray-400 shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] text-gray-500 font-medium mb-2">Wiadomość</label>
                <textarea
                  rows={5}
                  placeholder="I'm interested in the 2 bedroom floor plans..."
                  className="w-full bg-white rounded-xl px-5 py-3.5 border border-gray-100 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all text-brand-dark placeholder-gray-400 resize-none shadow-sm"
                />
              </div>

              <button
                type="button"
                className="bg-brand-dark text-white rounded-full px-8 py-4 font-medium text-[15px] hover:bg-black transition-colors shadow-sm w-full sm:w-auto"
              >
                Wyślij
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

