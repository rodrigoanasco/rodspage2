import { Turnstile } from '@marsidev/react-turnstile'
import useContactForm from '../../hooks/useContactForm'
import WindowChrome from '../media/WindowChrome'
import ContactFields from './ContactFields'
import ContactPrivacyNotice from './ContactPrivacyNotice'

export default function ContactForm() {
  const {
    form,
    loading,
    status,
    siteKey,
    turnstileRef,
    canSubmit,
    handleChange,
    handleSubmit,
    handleVerificationSuccess,
    handleVerificationExpiry,
    handleVerificationError,
  } = useContactForm()

  return (
    <form className="contact-form-window" onSubmit={handleSubmit}>
      <WindowChrome className="contact-window-bar" />
      <div className="contact-form-body">
        <ContactFields form={form} onChange={handleChange} loading={loading} />
        <ContactPrivacyNotice
          acknowledged={form.privacyConsent}
          onChange={handleChange}
          disabled={loading}
        />
        {siteKey && form.privacyConsent ? (
          <Turnstile
            ref={turnstileRef}
            siteKey={siteKey}
            onSuccess={handleVerificationSuccess}
            onExpire={handleVerificationExpiry}
            onError={handleVerificationError}
            options={{ action: 'contact', theme: 'auto', size: 'flexible' }}
          />
        ) : !siteKey ? (
          <p className="contact-status contact-status--error" role="status">
            The contact form is not configured yet.
          </p>
        ) : null}
        <button type="submit" disabled={!canSubmit}>
          {loading ? 'Sending...' : 'Send message'}
          <span aria-hidden="true">-&gt;</span>
        </button>
        {status && (
          <p className={`contact-status contact-status--${status.type}`} role="status">
            {status.message}
          </p>
        )}
      </div>
    </form>
  )
}
