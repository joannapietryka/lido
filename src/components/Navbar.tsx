export function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-6 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto bg-white/80 backdrop-blur-md border border-white/40 shadow-sm rounded-full px-6 py-3 w-full max-w-7xl flex justify-between items-center transition-all duration-300 hover:bg-white/95">
        <div className="flex items-center gap-12">
          <a href="#top" className="flex items-center gap-2 group" aria-label="Lido strona główna">
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b7dba5b91d?w=120&q=80"
              alt="Lido logo"
              className="h-8 object-contain"
            />
          </a>

          <div className="hidden lg:flex gap-8 text-[15px] font-medium">
            <a href="#mieszkania" className="text-gray-500 hover:text-brand-dark transition-colors">
              Mieszkania
            </a>
            <a href="#standard" className="text-gray-500 hover:text-brand-dark transition-colors">
              Nasz standard
            </a>
            <a href="#lokalizacja" className="text-gray-500 hover:text-brand-dark transition-colors">
              O lokalizacji
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#kontakt"
            className="bg-brand-dark text-white px-7 py-2.5 rounded-full text-[15px] font-medium hover:bg-gray-800 transition-transform active:scale-95"
          >
            Kontakt
          </a>
        </div>
      </nav>
    </div>
  )
}

