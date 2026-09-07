export async function blogRequest(url, { getToken, signal, post } = {}) {
  const headers = {}
  if (getToken) {
    const token = await getToken({ skipCache: true })
    if (!token) throw new Error('Please sign in again before accessing your posts.')
    headers.Authorization = `Bearer ${token}`
  }
  if (post) headers['Content-Type'] = 'application/json'
  const response = await fetch(url, {
    method: post ? 'PUT' : 'GET', headers, signal,
    body: post ? JSON.stringify(post) : undefined, cache: 'no-store',
  })
  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('The blog API is not running. Use the deployed website, or Vercel’s local server—not the Vite-only server on port 5173.')
  }
  const result = await response.json()
  if (!response.ok) throw new Error(result.message || 'The request failed. Please try again.')
  return result
}
