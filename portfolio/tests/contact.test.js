import test from 'node:test'
import assert from 'node:assert/strict'
import { createContactHandler } from '../api/contact.js'
import { createContactLimiter } from '../server/contact-rate-limit.js'

const env = Object.fromEntries(['TURNSTILE_SECRET_KEY', 'EMAILJS_SERVICE_ID', 'EMAILJS_TEMPLATE_ID', 'EMAILJS_PUBLIC_KEY', 'EMAILJS_PRIVATE_KEY'].map((key) => [key, 'test-only']))
const form = { email: 'visitor@example.test', message: 'A private inquiry.', turnstileToken: 'test-token', privacyConsent: true }
const response = () => ({ headers: {}, setHeader(key, value) { this.headers[key] = value }, status(code) { this.statusCode = code; return this }, json(body) { this.body = body; return this } })
const request = (body = form) => ({ method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.1' }, body })

test('contact requires explicit boolean privacy acknowledgement before provider requests', async () => {
  const handler = createContactHandler({ env, limited: () => false, fetcher: () => { throw Error('Must not contact a provider') } })
  for (const privacyConsent of [undefined, false, 'true', 1]) {
    const res = response()
    await handler(request({ ...form, privacyConsent }), res)
    assert.equal(res.statusCode, 400)
    assert.equal(res.headers['Cache-Control'], 'no-store')
  }
})

test('optional name and consent metadata reach delivery without forwarding IP or token to email provider', async () => {
  const calls = []
  const handler = createContactHandler({ env, limited: () => false, fetcher: async (url, options) => {
    calls.push({ url, body: JSON.parse(options.body) })
    return { ok: true, json: async () => ({ success: true, action: 'contact' }) }
  } })
  const res = response()
  await handler(request(), res)
  assert.equal(res.statusCode, 200)
  assert.equal(calls.length, 2)
  const params = calls[1].body.template_params
  assert.equal(params.from_name, '')
  assert.equal(params.privacy_consent, true)
  assert.ok(Number.isFinite(Date.parse(params.privacy_acknowledged_at)))
  assert.equal(params.message, form.message)
  assert.ok(!JSON.stringify(calls[1].body).includes('192.0.2.1'))
  assert.ok(!JSON.stringify(calls[1].body).includes(form.turnstileToken))
})

test('invalid fields and oversized tokens are rejected before external calls', async () => {
  const handler = createContactHandler({ env, limited: () => false, fetcher: () => { throw Error('Unexpected fetch') } })
  for (const changes of [{ name: 'x' }, { name: 'x'.repeat(101) }, { email: 'bad' }, { email: 'ro.anasco.s@gmail.com' }, { message: 'short' }, { message: 'x'.repeat(5001) }, { turnstileToken: 'x'.repeat(2049) }]) {
    const res = response()
    await handler(request({ ...form, ...changes }), res)
    assert.equal(res.statusCode, 400)
  }
})

test('failed anti-spam check never attempts delivery', async () => {
  let calls = 0
  const handler = createContactHandler({ env, limited: () => false, fetcher: async () => {
    calls++
    return { ok: true, json: async () => ({ success: true, action: 'another-form' }) }
  } })
  const res = response()
  await handler(request(), res)
  assert.equal(res.statusCode, 400)
  assert.equal(calls, 1)
})

test('provider failures cannot expose response bodies, error details, or submitted data in logs', async () => {
  for (const networkError of [false, true]) {
    const logs = []
    let calls = 0
    const handler = createContactHandler({ env, limited: () => false, logError: (...args) => logs.push(args), fetcher: async () => {
      calls++
      if (networkError) throw Error(`${form.message} secret-token`)
      if (calls === 1) return { ok: true, json: async () => ({ success: true, action: 'contact' }) }
      return { ok: false, status: 400, text: () => { throw Error('Private response must not be read') } }
    } })
    const res = response()
    await handler(request(), res)
    assert.equal(res.statusCode, 502)
    assert.deepEqual(logs, [['Contact form delivery failed.']])
  }
})

test('method, media type, honeypot, configuration, and throttle guards fail safely', async () => {
  const logs = []
  const handler = createContactHandler({ env: {}, limited: () => false, logError: (...args) => logs.push(args), fetcher: () => { throw Error('Unexpected fetch') } })
  for (const [req, status] of [
    [{ ...request(), method: 'GET' }, 405],
    [{ ...request(), headers: {} }, 415],
    [request({ website: 'spam.test' }), 200],
    [request(), 503],
  ]) {
    const res = response()
    await handler(req, res)
    assert.equal(res.statusCode, status)
  }
  assert.equal(logs.length, 1)
  const res = response()
  await createContactHandler({ limited: () => true })(request(), res)
  assert.equal(res.statusCode, 429)
  assert.equal(res.headers['Retry-After'], '900')
})

test('limiter caps requests and storage, expires idle addresses, and does not extend blocked retention', () => {
  let timestamp = 1000
  const limited = createContactLimiter({ now: () => timestamp, maxEntries: 2, maxRequests: 2, windowMs: 100 })
  assert.equal(limited('192.0.2.1'), false)
  assert.equal(limited('192.0.2.1'), false)
  assert.equal(limited('192.0.2.1'), true)
  assert.equal(limited('192.0.2.2'), false)
  assert.equal(limited('192.0.2.3'), true)
  timestamp = 1099
  assert.equal(limited('192.0.2.1'), true)
  timestamp = 1100
  assert.equal(limited('192.0.2.3'), false)
  assert.equal(limited('192.0.2.1'), false)
  assert.equal(limited('192.0.2.4'), true)
})
