import process from 'node:process'
import { randomUUID } from 'node:crypto'
import assert from 'node:assert/strict'
import { neon } from '@neondatabase/serverless'
import { getBlogStore } from '../server/blog-store.js'

// Opt-in integration check. Only this run's randomly generated test row is removed.
const id = randomUUID()
const store = getBlogStore()
const sql = neon(process.env.DATABASE_URL)
try {
  await store.initialize()
  let saved = await store.write({ id, revision: 0, action: 'save', content: { title: 'Database verification', body: 'Private original', videoUrl: '' } })
  assert.equal(saved.revision, 1)
  assert.equal((await sql`SELECT published FROM blog_posts WHERE id = ${id}`)[0].published, null)
  saved = await store.write({ id, revision: 1, action: 'publish', content: { title: 'Database verification', body: 'Published snapshot', videoUrl: '' } })
  assert.equal(saved.isPublished, true)
  saved = await store.write({ id, revision: 2, action: 'save', content: { title: 'Database verification', body: 'Private revision', videoUrl: '' } })
  const snapshot = (await sql`SELECT draft, published FROM blog_posts WHERE id = ${id}`)[0]
  assert.equal(snapshot.published.body, 'Published snapshot')
  assert.equal(snapshot.draft.body, 'Private revision')
  assert.equal(await store.write({ id, revision: 2, action: 'publish', content: snapshot.draft }), null)
  saved = await store.write({ id, revision: 3, action: 'unpublish', content: snapshot.draft })
  assert.equal(saved.isPublished, false)
  assert.equal(saved.draft.body, 'Private revision')
  console.log('Database checks passed: draft, publish, private revision, conflict rejection, and unpublish.')
} catch {
  console.error('Database verification failed. No credentials or post contents have been logged.')
  process.exitCode = 1
} finally {
  await sql`DELETE FROM blog_posts WHERE id = ${id}`
  console.log('Removed only the temporary verification post.')
}
