import test from 'node:test'
import assert from 'node:assert/strict'
import process from 'node:process'
import { createSessionHandler } from '../api/blog/session.js'

test('manager authorization distinguishes MFA enrollment from wrong identity', async (t) => {
  const original = { ...process.env }
  process.env.CLERK_SECRET_KEY = 'test-only-placeholder'
  process.env.BLOG_MANAGER_EMAIL = 'owner@example.com'
  process.env.BLOG_AUTHORIZED_ORIGINS = 'https://example.com'
  process.env.BLOG_REQUIRE_MFA = 'true'
  t.after(() => { process.env = original })

  const run = async ({ email = 'owner@example.com', verified = true, mfa = true, token = true, invalid = false, method = 'GET' } = {}) => {
    let lookedUp = false
    const handler = createSessionHandler({
      verify: async (_token, options) => {
        assert.ok(options.authorizedParties.includes('https://example.com'))
        if (invalid) throw new Error('Invalid token')
        return { sub: 'user_owner' }
      },
      createClient: () => ({ users: { getUser: async (id) => {
        lookedUp = true
        assert.equal(id, 'user_owner')
        return { primaryEmailAddress: { emailAddress: email, verification: { status: verified ? 'verified' : 'unverified' } }, twoFactorEnabled: mfa }
      } } }),
    })
    const response = { headers: {}, setHeader(k, v) { this.headers[k] = v }, status(value) { this.statusCode = value; return this }, json(body) { this.body = body; return this } }
    await handler({ method, headers: token ? { authorization: 'Bearer test-token' } : {} }, response)
    assert.equal(response.headers['Cache-Control'], 'no-store, max-age=0')
    return { ...response, lookedUp }
  }
  assert.equal((await run()).body.manager, true)
  assert.equal((await run({ email: ' OWNER@EXAMPLE.COM ' })).statusCode, 200)
  const mfa = await run({ mfa: false })
  assert.equal(mfa.statusCode, 403)
  assert.equal(mfa.body.code, 'MFA_REQUIRED')
  assert.equal((await run({ email: 'visitor@example.com', mfa: false })).body.code, 'MANAGER_REQUIRED')
  assert.equal((await run({ verified: false })).body.code, 'MANAGER_REQUIRED')
  assert.equal((await run({ token: false })).statusCode, 401)
  assert.equal((await run({ invalid: true })).lookedUp, false)
  assert.equal((await run({ invalid: true })).statusCode, 401)
  assert.equal((await run({ method: 'POST' })).statusCode, 405)
  delete process.env.CLERK_SECRET_KEY
  assert.equal((await run()).statusCode, 503)
})
