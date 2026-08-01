import { useRef, useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'

const initialForm = {
  name: '',
  email: '',
  message: '',
  website: '',
}

function ContactSection({ isVisible }) {
  const [form, setForm] = useState(initialForm)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const turnstileRef = useRef(null)

  const handleChange = ({ target }) => {
    setForm((currentForm) => ({
      ...currentForm,
      [target.name]: target.value,
    }))

    if (status) setStatus(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

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
              <span>Full name</span>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" autoComplete="name" minLength="2" maxLength="100" required />
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

            <Turnstile
              ref={turnstileRef}
              siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
              onSuccess={setTurnstileToken}
              onExpire={() => setTurnstileToken('')}
              onError={() => setTurnstileToken('')}
              options={{ action: 'contact', theme: 'auto', size: 'flexible' }}
            />

            <button type="submit" disabled={loading || !turnstileToken}>
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
