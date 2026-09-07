import process from 'node:process'
import { createClerkClient, verifyToken } from '@clerk/backend'

export const sendJson = (response, status, body) => {
  response.setHeader('Cache-Control', 'no-store, max-age=0')
  response.setHeader('Pragma', 'no-cache')
  response.setHeader('Vary', 'Authorization')
  response.setHeader('X-Content-Type-Options', 'nosniff')
  response.setHeader('Referrer-Policy', 'no-referrer')
  return response.status(status).json(body)
}

const getBearerToken = (request) => {
  const authorization = request.headers.authorization
  if (typeof authorization !== 'string' || !authorization.startsWith('Bearer ')) return null
  const token = authorization.slice(7).trim()
  return token || null
}

const getAuthorizedParties = () => {
  const configuredOrigins = (process.env.BLOG_AUTHORIZED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
  const vercelOrigin = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
  return [...new Set([...configuredOrigins, vercelOrigin].filter(Boolean))]
}

export const createManagerGuard = ({ verify = verifyToken, createClient = createClerkClient } = {}) => async (request, response) => {

  const secretKey = process.env.CLERK_SECRET_KEY
  const managerEmail = process.env.BLOG_MANAGER_EMAIL?.trim().toLowerCase()
  const authorizedParties = getAuthorizedParties()

  if (!secretKey || !managerEmail || authorizedParties.length === 0) {
    console.error('Blog authentication is missing required server environment variables.')
    return sendJson(response, 503, { message: 'Manager login is not configured yet.' })
  }

  const token = getBearerToken(request)
  if (!token) return sendJson(response, 401, { message: 'A valid session is required.' })

  try {
    const claims = await verify(token, {
      secretKey,
      jwtKey: process.env.CLERK_JWT_KEY || undefined,
      authorizedParties,
    })

    const clerk = createClient({ secretKey })
    const user = await clerk.users.getUser(claims.sub)
    const primaryEmail = user.primaryEmailAddress
    const isVerifiedManager =
      primaryEmail?.verification?.status === 'verified' &&
      primaryEmail.emailAddress.trim().toLowerCase() === managerEmail

    if (!isVerifiedManager) {
      return sendJson(response, 403, { code: 'MANAGER_REQUIRED', message: 'This account does not have manager access. Sign in with the designated manager account and make sure its email is verified and set as primary.' })
    }

    const requireMfa = process.env.BLOG_REQUIRE_MFA?.toLowerCase() !== 'false'
    if (requireMfa && !user.twoFactorEnabled) {
      return sendJson(response, 403, {
        code: 'MFA_REQUIRED',
        message: 'Your manager email is verified. Enable two-step verification in your account settings, then check access again.',
      })
    }

    return { userId: user.id || claims.sub }
  } catch {
    console.error('Blog session verification failed.')
    return sendJson(response, 401, { message: 'The session is invalid or expired. Please sign in again.' })
  }
}

export const requireManager = createManagerGuard()
