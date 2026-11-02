export const requestManagerSession = async (getToken, signal) => {
  const token = await getToken({ skipCache: true })
  if (!token) return { status: 'signed-out', message: '' }

  const response = await fetch('/api/blog/session', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
    signal,
  })
  if (!response.headers.get('content-type')?.includes('application/json')) {
    return {
      status: 'error',
      message: import.meta.env.DEV
        ? 'The local Vite server is not running the login-check API. Open the deployed website to sign in, or run this project with Vercel’s local server and its server-side environment variables.'
        : `The login-check API returned an unexpected response (HTTP ${response.status}). Please try again later; this is a server issue, not an account rejection.`,
    }
  }
  const result = await response.json().catch(() => ({}))

  if (response.ok && result.manager === true) return { status: 'authorized', message: '' }

  return {
    status:
      response.status === 403
        ? result.code === 'MFA_REQUIRED'
          ? 'mfa-required'
          : 'forbidden'
        : 'error',
    message: result.message || 'The manager session could not be verified.',
  }
}
