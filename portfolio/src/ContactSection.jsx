import { useRef, useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'

const initialForm = {
  name: '',
  email: '',
  message: '',
  website: '',
  privacyConsent: false,
}

function ContactSection({ isVisible }) {
  const [form, setForm] = useState(initialForm)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const turnstileRef = useRef(null)
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

  const handleChange = ({ target }) => {
    setForm((currentForm) => ({
      ...currentForm,
      [target.name]: target.type === 'checkbox' ? target.checked : target.value,
    }))

    if (target.name === 'privacyConsent' && !target.checked) {
      setTurnstileToken('')
      turnstileRef.current?.reset()
    }

    if (status) setStatus(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (loading) return
    if (!form.privacyConsent) {
      setStatus({ type: 'error', message: 'Please acknowledge the privacy notice before sending.' })
      return
    }

    if (!turnstileToken) {
      setStatus({ type: 'error', message: 'Please complete the anti-spam check.' })
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken }),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok) throw new Error(result.message || 'Unable to send your message.')

      setForm(initialForm)
      setTurnstileToken('')
      turnstileRef.current?.reset()
      setStatus({ type: 'success', message: 'Message sent. I will get back to you soon.' })
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Something went wrong. You can still email me directly.' })
      setTurnstileToken('')
      turnstileRef.current?.reset()
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className={`contact-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="contact-shell">
        <div className="contact-copy">
          <p className="contact-eyebrow">Contact</p>
          <h2>Let&apos;s build something useful.</h2>
          <p>
            Whether you want to collaborate, talk about an internship, discuss a project, or just say hi,
            send me a note and I&apos;ll do my best to respond soon.
          </p>
          <a className="contact-email-link" href="mailto:ro.anasco.s@gmail.com">
            ro.anasco.s@gmail.com
            <span aria-hidden="true">-&gt;</span>
          </a>
        </div>

        <form className="contact-form-window" onSubmit={handleSubmit}>
          <div className="contact-window-bar" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="contact-form-body">
            <label>
              <span>Name (optional)</span>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" autoComplete="name" maxLength="100" disabled={loading} />
            </label>

            <label>
              <span>Email</span>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your.email@example.com" autoComplete="email" maxLength="254" required />
            </label>

            <label>
              <span>Message</span>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Hi Rodrigo, I wanted to reach out about..." rows="5" minLength="10" maxLength="5000" required />
            </label>

            <label className="contact-honeypot" aria-hidden="true">
              <span>Website</span>
              <input name="website" value={form.website} onChange={handleChange} tabIndex="-1" autoComplete="off" />
            </label>

            <p className="contact-privacy-note">Your email, message, and optional name are delivered through EmailJS so I can reply. After acknowledgement, Cloudflare processes technical signals for the anti-spam check. Please avoid sending sensitive or confidential information.</p>
            <label className="contact-privacy-consent">
              <input type="checkbox" name="privacyConsent" checked={form.privacyConsent} onChange={handleChange} required disabled={loading} />
              <span>I have read the <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> and understand how my inquiry is handled. The anti-spam check loads after I acknowledge this notice.</span>
            </label>

            {turnstileSiteKey && form.privacyConsent ? (
              <Turnstile
                ref={turnstileRef}
                siteKey={turnstileSiteKey}
                onSuccess={(token) => {
                  setTurnstileToken(token)
                  setStatus(null)
                }}
                onExpire={() => setTurnstileToken('')}
                onError={() => {
                  setTurnstileToken('')
                  setStatus({ type: 'error', message: 'The anti-spam check could not load. Please refresh and try again.' })
                }}
                options={{ action: 'contact', theme: 'auto', size: 'flexible' }}
              />
            ) : !turnstileSiteKey ? (
              <p className="contact-status contact-status--error" role="status">
                The contact form is not configured yet.
              </p>
            ) : null}

            <button type="submit" disabled={loading || !form.privacyConsent || !turnstileSiteKey || !turnstileToken}>
              {loading ? 'Sending...' : 'Send message'}
              <span aria-hidden="true">-&gt;</span>
            </button>

            {status && <p className={`contact-status contact-status--${status.type}`} role="status">{status.message}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}

export default ContactSection
