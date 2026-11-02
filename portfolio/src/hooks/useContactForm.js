import { useRef, useState } from 'react'
import { initialContactForm } from '../data/contact'

export default function useContactForm() {
  const [form, setForm] = useState(initialContactForm)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const turnstileRef = useRef(null)
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

  function handleChange({ target }) {
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

  async function handleSubmit(event) {
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

      setForm(initialContactForm)
      setTurnstileToken('')
      turnstileRef.current?.reset()
      setStatus({ type: 'success', message: 'Message sent. I will get back to you soon.' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong. You can still email me directly.',
      })
      setTurnstileToken('')
      turnstileRef.current?.reset()
    } finally {
      setLoading(false)
    }
  }

  function handleVerificationSuccess(token) {
    setTurnstileToken(token)
    setStatus(null)
  }

  function handleVerificationExpiry() {
    setTurnstileToken('')
  }

  function handleVerificationError() {
    setTurnstileToken('')
    setStatus({
      type: 'error',
      message: 'The anti-spam check could not load. Please refresh and try again.',
    })
  }

  return {
    form,
    loading,
    status,
    siteKey,
    turnstileRef,
    canSubmit: !loading && form.privacyConsent && Boolean(siteKey) && Boolean(turnstileToken),
    handleChange,
    handleSubmit,
    handleVerificationSuccess,
    handleVerificationExpiry,
    handleVerificationError,
  }
}
