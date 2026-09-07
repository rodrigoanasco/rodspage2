import process from 'node:process'
import { getBlogStore } from '../server/blog-store.js'

try {
  await getBlogStore().initialize()
  console.log('Blog database schema is ready. No existing posts were changed.')
} catch {
  console.error('Database setup failed. Check the server-only DATABASE_URL and database connection.')
  process.exitCode = 1
}
