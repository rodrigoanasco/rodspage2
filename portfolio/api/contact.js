import process from 'node:process'

const OWNER_EMAIL = 'ro.anasco.s@gmail.com'
const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS = 5
const buckets = new Map()

const sendJson = (response, status, body, extraHeaders = {}) => {
  Object.entries({ 'Cache-Control': 'no-store', ...extraHeaders }).forEach(([key, value]) => response.setHeader(key, value))
  return response.status(status).json(body)
}

const getIp = (request) => {
  const forwarded = request.headers['x-forwarded-for']
  return (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0])?.trim() || request.socket?.remoteAddress || 'unknown'
}

const isRateLimited = (ip) => {
  const now = Date.now()
  const recent = (buckets.get(ip) || []).filter((timestamp) => now - timestamp < WINDOW_MS)
  recent.push(now)
  buckets.set(ip, recent)
  return recent.length > MAX_REQUESTS
}

const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return sendJson(response, 405, { message: 'Method not allowed.' })
  }

  const ip = getIp(request)
  if (isRateLimited(ip)) {
    return sendJson(response, 429, { message: 'Too many messages. Please try again in 15 minutes.' }, { 'Retry-After': '900' })
  }

  const { name, email, message, website, turnstileToken } = request.body || {}
  if (website) return sendJson(response, 200, { ok: true })

  if (
    typeof name !== 'string' || name.trim().length < 2 || name.length > 100 ||
    typeof email !== 'string' || email.length > 254 || !validEmail(email) ||
    typeof message !== 'string' || message.trim().length < 10 || message.length > 5000 ||
    typeof turnstileToken !== 'string' || !turnstileToken
  ) {
    return sendJson(response, 400, { message: 'Please check the form fields and try again.' })
  }

  if (email.trim().toLowerCase() === OWNER_EMAIL) {
    return sendJson(response, 400, { message: 'Please use your own email address.' })
  }

  const requiredEnv = ['TURNSTILE_SECRET_KEY', 'EMAILJS_SERVICE_ID', 'EMAILJS_TEMPLATE_ID', 'EMAILJS_PUBLIC_KEY', 'EMAILJS_PRIVATE_KEY']
  if (requiredEnv.some((key) => !process.env[key])) {
    console.error('Contact endpoint is missing required environment variables.')
    return sendJson(response, 503, { message: 'The contact form is temporarily unavailable.' })
  }

  try {
    const verificationResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: turnstileToken, remoteip: ip }),
    })
    const verification = await verificationResponse.json()
    if (!verification.success || verification.action !== 'contact') {
      return sendJson(response, 400, { message: 'Anti-spam verification failed. Please try again.' })
    }

    const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
          from_name: name.trim(),
          reply_to: email.trim().toLowerCase(),
          to_name: 'Rodrigo',
          to_email: OWNER_EMAIL,
          message: message.trim(),
        },
      }),
    })

    if (!emailResponse.ok) throw new Error(`EmailJS returned ${emailResponse.status}`)
    return sendJson(response, 200, { ok: true })
  } catch (error) {
    console.error('Contact form delivery failed:', error)
    return sendJson(response, 502, { message: 'Something went wrong. You can still email me directly.' })
  }
}
