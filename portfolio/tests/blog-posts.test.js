import test from 'node:test'
import assert from 'node:assert/strict'
import { createPostsHandler, validatePost } from '../api/blog/posts.js'

const input = { id: 'a0b7d3c0-829b-4011-8391-ffffffffffff', revision: 0, action: 'save', title: 'A post', body: 'Hello', videoUrl: '' }
const response = () => ({ headers: {}, setHeader(k, v) { this.headers[k] = v }, status(code) { this.statusCode = code; return this }, json(body) { this.body = body; return this } })

test('post validation rejects unsafe input but allows incomplete private draft text', () => {
  assert.ok(validatePost(input))
  assert.ok(validatePost({ ...input, body: '' }))
  for (const change of [
    { body: '', action: 'publish' }, { title: ' ' }, { title: 'x'.repeat(161) },
    { body: 'x'.repeat(50001) }, { revision: -1 }, { revision: 1.5 }, { id: 'not-uuid' },
    { action: 'delete' }, { videoUrl: 'javascript:alert(1)' },
    { videoUrl: 'https://youtube.com.evil.example/a' }, { videoUrl: 'http://youtube.com/a' },
    { videoUrl: 'https://user:pass@youtube.com/a' }, { videoUrl: 'https://youtube.com:8443/a' },
  ]) assert.equal(validatePost({ ...input, ...change }), null)
  assert.ok(validatePost({ ...input, videoUrl: 'https://www.youtube.com/watch?v=example' }))
})

test('anonymous callers cannot read drafts or write; storage is never touched', async () => {
  let calls = 0
  const handler = createPostsHandler({ authorize: async (_req, res) => { res.status(401).json({ message: 'Denied' }) }, getStore: () => { calls++; throw new Error('Must not happen') } })
  for (const [method, url] of [['GET', '/api/blog/posts?manage=1'], ['PUT', '/api/blog/posts']]) {
    const res = response()
    await handler({ method, url, headers: {}, body: input }, res)
    assert.equal(res.statusCode, 401)
  }
  assert.equal(calls, 0)
})

test('public reads use published-only store path with no schema changes', async () => {
  const handler = createPostsHandler({ authorize: () => { throw Error('Unexpected auth') }, getStore: () => ({
    initialize: () => { throw Error('Unexpected DDL') },
    list: async (manager, offset) => { assert.equal(manager, false); assert.equal(offset, 20); return [{ id: input.id, content: { title: 'Published', body: 'Public text' } }] },
  }) })
  const res = response()
  await handler({ method: 'GET', url: '/api/blog/posts?offset=20', headers: {} }, res)
  assert.equal(res.statusCode, 200)
  assert.equal(res.headers['Cache-Control'], 'no-store, max-age=0')
  assert.equal(res.body.posts[0].draft, undefined)
})

test('manager writes preserve actions and report optimistic concurrency conflicts', async () => {
  let write
  const handler = createPostsHandler({ authorize: async () => ({ userId: 'owner' }), getStore: () => ({ initialize: async () => {}, write: async (post) => { write = post; return null } }) })
  const res = response()
  await handler({ method: 'PUT', url: '/api/blog/posts', headers: { 'content-type': 'application/json' }, body: { ...input, action: 'publish' } }, res)
  assert.equal(res.statusCode, 409)
  assert.equal(write.action, 'publish')
  assert.equal(write.content.title, input.title)
})

test('unsupported methods and bad content types are rejected', async () => {
  const handler = createPostsHandler({ authorize: async () => ({ userId: 'owner' }), getStore: () => { throw Error('Must not touch storage') } })
  for (const [method, status] of [['DELETE', 405], ['PUT', 415]]) {
    const res = response()
    await handler({ method, url: '/api/blog/posts', headers: {} }, res)
    assert.equal(res.statusCode, status)
  }
})
