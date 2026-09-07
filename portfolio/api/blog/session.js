import { createManagerGuard, sendJson } from '../../server/blog-auth.js'

export const createSessionHandler = (dependencies) => async (request, response) => {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return sendJson(response, 405, { message: 'Method not allowed.' })
  }
  const manager = await createManagerGuard(dependencies)(request, response)
  if (!manager?.userId) return
  return sendJson(response, 200, { manager: true })
}

export default createSessionHandler()
