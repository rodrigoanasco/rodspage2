import { useState } from 'react'
import emailjs from '@emailjs/browser'

const initialForm = {
  name: '',
  email: '',
  message: '',
}

const emailConfig = {
  serviceId: 'service_km52in2',
  templateId: 'template_lif4lqp',
  publicKey: 'cbqICtdLPho06yW9w',
  toName: 'Rodrigo',
  toEmail: 'ro.anasco.s@gmail.com',
}

function ContactSection({ isVisible }) {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const handleChange = ({ target }) => {
    setForm((currentForm) => ({
      ...currentForm,
      [target.name]: target.value,
    }))

    if (status) setStatus(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: form.name,
          to_name: emailConfig.toName,
          from_email: form.email,
          to_email: emailConfig.toEmail,
          message: form.message,
        },
        emailConfig.publicKey,
      )

      setForm(initialForm)
      setStatus({ type: 'success', message: 'Message sent. I will get back to you soon.' })
    } catch (error) {
      console.error(error)
      setStatus({ type: 'error', message: 'Something went wrong. You can still email me directly.' })
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
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </label>

            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label>
              <span>Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Hi Rodrigo, I wanted to reach out about..."
                rows="5"
                required
              />
            </label>

            <button type="submit" disabled={loading}>
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
      </div>
    </section>
  )
}

export default ContactSection
