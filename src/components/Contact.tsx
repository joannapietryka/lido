import { MapPin } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTranslation } from 'react-i18next'
import { ContactForm } from './ContactForm'

const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1281.727380240428!2d19.903694444444445!3d50.021583333333336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTDCsDAxJzE3LjciTiAxOcKwNTQnMTMuMyJF!5e0!3m2!1sen!2sfr!4v1781256258312!5m2!1sen!2sfr'

const MAP_LINK_URL = 'https://maps.google.com/?q=Przemiarki+15,+Kraków'

export function Contact() {
  const ref = useScrollReveal<HTMLElement>()
  const { t } = useTranslation()

  return (
    <section ref={ref} id="kontakt" className="py-24 bg-white scroll-mt-32">
      <div className="max-w-[1440px] mx-auto px-6">
        <div data-reveal className="text-center max-w-[18rem] lg:max-w-2xl mx-auto mb-16">
          <h2 className="text-[48px] font-medium text-brand-dark mb-4 tracking-tight leading-[1.2]">
            {t('contact.title')}
          </h2>
          <p className="text-gray-500 font-inter text-[17px] leading-relaxed whitespace-pre-line">
            {t('contact.subtitle')}
          </p>
        </div>

        <div data-reveal className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 lg:mb-10">
          <div className="bg-[#F8F9FA] rounded-[32px] p-6 lg:p-8 text-center sm:text-left">
            <div className="w-12 h-12 bg-brand-dark rounded-full flex items-center justify-center mb-4 mx-auto sm:mx-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h4 className="text-[16px] font-medium mb-1">{t('contact.write')}</h4>
            <a
              href="mailto:fundacja.lido@outlook.com"
              className="text-gray-500 font-inter text-[14px] hover:text-brand-dark transition-colors break-all"
            >
              fundacja.lido@outlook.com
            </a>
          </div>

          <div className="bg-[#F8F9FA] rounded-[32px] p-6 lg:p-8 text-center sm:text-left">
            <div className="w-12 h-12 bg-brand-dark rounded-full flex items-center justify-center mb-4 mx-auto sm:mx-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h4 className="text-[16px] font-medium mb-1">{t('contact.call')}</h4>
            <a
              href="tel:+48515139540"
              className="text-gray-500 font-inter text-[14px] hover:text-brand-dark transition-colors"
            >
              +48 515 139 540
            </a>
          </div>

          <div className="bg-[#F8F9FA] rounded-[32px] p-6 lg:p-8 text-center sm:text-left">
            <div className="w-12 h-12 bg-brand-dark rounded-full flex items-center justify-center mb-4 mx-auto sm:mx-0">
              <MapPin className="w-5 h-5 text-white" strokeWidth={1.5} aria-hidden />
            </div>
            <h4 className="text-[16px] font-medium mb-1">{t('contact.office')}</h4>
            <p className="text-gray-500 font-inter text-[14px]">{t('contact.address')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div data-reveal className="order-2 lg:order-1 flex flex-col gap-4">
            <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[520px] rounded-[40px] overflow-hidden shadow-sm border border-gray-100 bg-[#F8F9FA] leading-[0]">
              <iframe
                src={MAP_EMBED_URL}
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('contact.mapTitle')}
              />
            </div>
            <a
              href={MAP_LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0 inline-flex items-center justify-center gap-2 self-center text-[14px] font-inter font-medium text-gray-500 hover:text-brand-dark transition-colors"
            >
              <MapPin className="w-4 h-4 shrink-0" strokeWidth={1.5} aria-hidden />
              {t('contact.openInMaps')}
            </a>
          </div>

          <div data-reveal className="order-1 lg:order-2 bg-[#F8F9FA] rounded-[40px] p-8 lg:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
