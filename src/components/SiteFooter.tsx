export function SiteFooter() {
  return (
    <footer className="px-6 pb-6 pt-12">
      <div className="max-w-[1440px] mx-auto bg-[#262626] text-white rounded-[40px] pt-16 pb-10 px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-16">
          <div className="lg:w-1/3">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://images.unsplash.com/photo-1580587771525-78b7dba5b91d?w=120&q=80"
                alt="Lido"
                className="h-8 object-contain"
              />
            </div>
            <p className="text-gray-400 font-inter text-[14px] leading-relaxed">
              Home is where the heart is and where the memories are made
            </p>
          </div>

          <div className="flex flex-wrap gap-8 font-inter text-[15px] text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
             Mieszkania
            </a>
            <a href="#" className="hover:text-white transition-colors">
             Nasz standard
            </a>
            <a href="#" className="hover:text-white transition-colors">
              O lokalizacji
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Kontakt
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-[13px] font-inter text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Lido. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

