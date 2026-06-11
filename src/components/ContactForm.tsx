import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const CONTACT_EMAIL = 'fundacja.lido@outlook.com'
const FORM_SUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`

type FormFields = {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

type FormErrors = Partial<Record<keyof FormFields, string>>

const EMPTY_FORM: FormFields = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/

const inputClass = (hasError: boolean) =>
  [
    'w-full bg-white rounded-xl px-5 py-3.5 border focus:outline-none focus:ring-1 transition-all text-brand-dark placeholder-gray-400 shadow-sm',
    hasError
      ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
      : 'border-gray-100 focus:border-gray-300 focus:ring-gray-300',
  ].join(' ')

function validateForm(values: FormFields, t: (key: string) => string): FormErrors {
  const errors: FormErrors = {}

  if (!values.firstName.trim()) {
    errors.firstName = t('contact.validation.firstNameRequired')
  } else if (values.firstName.trim().length < 2) {
    errors.firstName = t('contact.validation.firstNameMin')
  }

  if (!values.lastName.trim()) {
    errors.lastName = t('contact.validation.lastNameRequired')
  } else if (values.lastName.trim().length < 2) {
    errors.lastName = t('contact.validation.lastNameMin')
  }

  if (!values.email.trim()) {
    errors.email = t('contact.validation.emailRequired')
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = t('contact.validation.emailInvalid')
  }

  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = t('contact.validation.phoneInvalid')
  }

  if (!values.message.trim()) {
    errors.message = t('contact.validation.messageRequired')
  } else if (values.message.trim().length < 10) {
    errors.message = t('contact.validation.messageMin')
  }

  return errors
}

export function ContactForm() {
  const { t } = useTranslation()
  const [form, setForm] = useState<FormFields>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const updateField = (field: keyof FormFields, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current }
        delete next[field]
        return next
      })
    }
    if (submitError) setSubmitError(null)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validateForm(form, t)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          name: `${form.firstName.trim()} ${form.lastName.trim()}`,
          email: form.email.trim(),
          phone: form.phone.trim() || '—',
          message: form.message.trim(),
          _subject: `Lido — wiadomość od ${form.firstName.trim()} ${form.lastName.trim()}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })

      const data = (await response.json()) as { success?: string }

      if (!response.ok || data.success !== 'true') {
        throw new Error('submit_failed')
      }

      setIsSuccess(true)
      setForm(EMPTY_FORM)
      setErrors({})
    } catch {
      setSubmitError(t('contact.validation.submitError'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div
        role="status"
        className="flex flex-col items-center justify-center text-center rounded-[32px] bg-white border border-gray-100 px-8 py-14 shadow-sm min-h-[420px]"
      >
        <div className="w-14 h-14 rounded-full bg-brand-dark flex items-center justify-center mb-6">
          <CheckCircle2 className="w-7 h-7 text-white" strokeWidth={2} aria-hidden />
        </div>
        <h3 className="text-[22px] font-medium text-brand-dark mb-3">{t('contact.successTitle')}</h3>
        <p className="text-gray-500 font-inter text-[15px] leading-relaxed max-w-sm">
          {t('contact.successMessage')}
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="mt-8 text-[14px] font-medium text-brand-dark hover:opacity-70 transition-opacity"
        >
          {t('contact.sendAnother')}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 font-inter">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-firstName" className="block text-[13px] text-gray-500 font-medium mb-2">
            {t('contact.firstName')}
          </label>
          <input
            id="contact-firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={form.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            placeholder={t('contact.placeholders.firstName')}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? 'contact-firstName-error' : undefined}
            className={inputClass(Boolean(errors.firstName))}
          />
          {errors.firstName && (
            <p id="contact-firstName-error" className="mt-1.5 text-[13px] text-red-500">
              {errors.firstName}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-lastName" className="block text-[13px] text-gray-500 font-medium mb-2">
            {t('contact.lastName')}
          </label>
          <input
            id="contact-lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            value={form.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            placeholder={t('contact.placeholders.lastName')}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? 'contact-lastName-error' : undefined}
            className={inputClass(Boolean(errors.lastName))}
          />
          {errors.lastName && (
            <p id="contact-lastName-error" className="mt-1.5 text-[13px] text-red-500">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-email" className="block text-[13px] text-gray-500 font-medium mb-2">
            {t('contact.email')}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder={t('contact.placeholders.email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={inputClass(Boolean(errors.email))}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-[13px] text-red-500">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-[13px] text-gray-500 font-medium mb-2">
            {t('contact.phone')}
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder={t('contact.placeholders.phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
            className={inputClass(Boolean(errors.phone))}
          />
          {errors.phone && (
            <p id="contact-phone-error" className="mt-1.5 text-[13px] text-red-500">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-[13px] text-gray-500 font-medium mb-2">
          {t('contact.message')}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={(e) => updateField('message', e.target.value)}
          placeholder={t('contact.placeholders.message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={[inputClass(Boolean(errors.message)), 'resize-none'].join(' ')}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-[13px] text-red-500">
            {errors.message}
          </p>
        )}
      </div>

      {submitError && (
        <p role="alert" className="text-[13px] text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 bg-brand-dark text-white rounded-full px-8 py-4 font-medium text-[15px] hover:bg-black transition-colors shadow-sm w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
            {t('contact.sending')}
          </>
        ) : (
          t('contact.send')
        )}
      </button>
    </form>
  )
}
