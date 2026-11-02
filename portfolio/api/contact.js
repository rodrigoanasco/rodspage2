import process from 'node:process'
import { createContactLimiter } from '../server/contact-rate-limit.js'

const OWNER_EMAIL = 'ro.anasco.s@gmail.com'
const isRateLimited = createContactLimiter()

const sendJson = (response, status, body, extraHeaders = {}) => {
  Object.entries({ 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extraHeaders }).forEach(([key, value]) => response.setHeader(key, value))
  return response.status(status).json(body)
}

const getIp = (request) => {
  const forwarded = request.headers['x-forwarded-for']
  return (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0])?.trim() || request.socket?.remoteAddress || 'unknown'
}

const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export const createContactHandler = ({ fetcher = fetch, limited = isRateLimited, env = process.env, logError = console.error } = {}) => async (request, response) => {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return sendJson(response, 405, { message: 'Method not allowed.' })
  }

  const ip = getIp(request)
  if (limited(ip)) {
    return sendJson(response, 429, { message: 'Too many messages. Please try again in 15 minutes.' }, { 'Retry-After': '900' })
  }

  if (!request.headers['content-type']?.startsWith('application/json')) {
    return sendJson(response, 415, { message: 'Use JSON for contact submissions.' })
  }

  const { name = '', email, message, website, turnstileToken, privacyConsent } = request.body || {}
  if (website) return sendJson(response, 200, { ok: true })

  if (
    privacyConsent !== true ||
    typeof name !== 'string' || (name.trim() && name.trim().length < 2) || name.length > 100 ||
    typeof email !== 'string' || email.length > 254 || !validEmail(email) ||
    typeof message !== 'string' || message.trim().length < 10 || message.length > 5000 ||
    typeof turnstileToken !== 'string' || !turnstileToken || turnstileToken.length > 2048
  ) {
    return sendJson(response, 400, { message: 'Please check the form fields and try again.' })
  }

  if (email.trim().toLowerCase() === OWNER_EMAIL) {
    return sendJson(response, 400, { message: 'Please use your own email address.' })
  }

  const requiredEnv = ['TURNSTILE_SECRET_KEY', 'EMAILJS_SERVICE_ID', 'EMAILJS_TEMPLATE_ID', 'EMAILJS_PUBLIC_KEY', 'EMAILJS_PRIVATE_KEY']
  if (requiredEnv.some((key) => !env[key])) {
    logError('Contact endpoint is missing required environment variables.')
    return sendJson(response, 503, { message: 'The contact form is temporarily unavailable.' })
  }

  try {
    const verificationResponse = await fetcher('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: turnstileToken, remoteip: ip }),
    })
    const verification = await verificationResponse.json()
    if (!verificationResponse.ok || !verification.success || verification.action !== 'contact') {
      return sendJson(response, 400, { message: 'Anti-spam verification failed. Please try again.' })
    }

    const emailResponse = await fetcher('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: env.EMAILJS_SERVICE_ID,
        template_id: env.EMAILJS_TEMPLATE_ID,
        user_id: env.EMAILJS_PUBLIC_KEY,
        accessToken: env.EMAILJS_PRIVATE_KEY,
        template_params: {
          from_name: name.trim(),
          reply_to: email.trim().toLowerCase(),
          to_name: 'Rodrigo',
          to_email: OWNER_EMAIL,
          message: message.trim(),
          privacy_consent: true,
          privacy_acknowledged_at: new Date().toISOString(),
        },
      }),
    })

    if (!emailResponse.ok) {
      throw new Error('Delivery unavailable')
    }
    return sendJson(response, 200, { ok: true })
  } catch {
    // Provider responses/errors can contain message content, tokens, or credentials.
    logError('Contact form delivery failed.')
    return sendJson(response, 502, { message: 'Something went wrong. You can still email me directly.' })
  }
}

export default createContactHandler()
