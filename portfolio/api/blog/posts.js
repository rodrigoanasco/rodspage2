import { Buffer } from 'node:buffer'
import { requireManager, sendJson } from '../../server/blog-auth.js'
import { getBlogStore } from '../../server/blog-store.js'

export function validatePost(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const { id, revision, action, title, body, videoUrl = '' } = value
  if (typeof id !== 'string' || !/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i.test(id)) return null
  if (!Number.isSafeInteger(revision) || revision < 0 || !['save', 'publish', 'unpublish'].includes(action)) return null
  if (typeof title !== 'string' || !title.trim() || title.length > 160) return null
  if (typeof body !== 'string' || body.length > 50000 || (action === 'publish' && !body.trim())) return null
  if (typeof videoUrl !== 'string' || videoUrl.length > 500) return null
  if (videoUrl) {
    try {
      const url = new URL(videoUrl)
      if (url.protocol !== 'https:' || url.username || url.password || url.port ||
          !['youtube.com', 'www.youtube.com', 'youtu.be', 'vimeo.com', 'www.vimeo.com'].includes(url.hostname)) return null
    } catch { return null }
  }
  return { id, revision, action, content: { title: title.trim(), body, videoUrl } }
}

export const createPostsHandler = ({ authorize = requireManager, getStore = getBlogStore } = {}) => async (request, response) => {
  if (!['GET', 'PUT'].includes(request.method)) {
    response.setHeader('Allow', 'GET, PUT')
    return sendJson(response, 405, { message: 'Method not allowed.' })
  }
  const query = new URL(request.url, 'https://blog.invalid').searchParams
  const manager = request.method === 'PUT' || query.get('manage') === '1'
  if (manager) {
    const identity = await authorize(request, response)
    if (!identity?.userId) return
  }
  const offset = Number(query.get('offset') || 0)
  if (!Number.isSafeInteger(offset) || offset < 0 || offset > 100000) return sendJson(response, 400, { message: 'Invalid page.' })
  let post
  if (request.method === 'PUT') {
    if (!request.headers['content-type']?.startsWith('application/json')) return sendJson(response, 415, { message: 'Use JSON for post updates.' })
    if (Buffer.byteLength(JSON.stringify(request.body ?? '')) > 210000) return sendJson(response, 413, { message: 'This post is too large.' })
    post = validatePost(request.body)
    if (!post) return sendJson(response, 400, { message: 'Check the title (1–160 characters), text (up to 50,000 characters), and optional HTTPS YouTube or Vimeo link. Published posts need text.' })
  }
  try {
    const store = getStore()
    if (manager) await store.initialize()
    if (request.method === 'GET') {
      const rows = await store.list(manager, offset)
      return sendJson(response, 200, { posts: rows.slice(0, 20), hasMore: rows.length > 20 })
    }
    const saved = await store.write(post)
    if (!saved) return sendJson(response, 409, { message: 'This post changed in another tab, or this save was already received. Reload the saved version before editing again. Your current text is still in the editor.' })
    return sendJson(response, 200, { post: saved })
  } catch (error) {
    // Never log draft text, database URLs, tokens, or provider error messages.
    console.error('Blog storage request failed.', { category: error.code === 'STORAGE_NOT_CONFIGURED' ? 'not-configured' : 'unavailable' })
    return sendJson(response, 503, {
      message: manager
        ? 'Blog storage is unavailable. Connect a Neon database with a server-only DATABASE_URL in Vercel and redeploy. Your unsaved text has not been cleared.'
        : 'Posts are temporarily unavailable. Please try again later.',
    })
  }
}

export default createPostsHandler()
