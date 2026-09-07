import process from 'node:process'
import { neon } from '@neondatabase/serverless'

export function getBlogStore() {
  if (!process.env.DATABASE_URL) throw Object.assign(new Error('Storage not connected'), { code: 'STORAGE_NOT_CONFIGURED' })
  const sql = neon(process.env.DATABASE_URL)
  return {
    async initialize() {
      // Only called after manager authorization. Idempotent, additive schema setup.
      await sql`CREATE TABLE IF NOT EXISTS blog_posts (
        id uuid PRIMARY KEY,
        draft jsonb NOT NULL,
        published jsonb,
        revision integer NOT NULL DEFAULT 1,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        published_at timestamptz
      )`
    },
    async list(manager, offset) {
      return manager
        ? sql`SELECT id, draft, published IS NOT NULL AS "isPublished", revision,
            updated_at AS "updatedAt", published_at AS "publishedAt"
            FROM blog_posts ORDER BY updated_at DESC, id LIMIT 21 OFFSET ${offset}`
        : sql`SELECT id, published AS content, published_at AS "publishedAt"
            FROM blog_posts WHERE published IS NOT NULL
            ORDER BY published_at DESC, id LIMIT 21 OFFSET ${offset}`
    },
    async write({ id, revision, action, content }) {
      const json = JSON.stringify(content)
      const publishing = action === 'publish'
      if (revision === 0) {
        if (action === 'unpublish') return null
        const rows = await sql`INSERT INTO blog_posts (id, draft, published, published_at)
          VALUES (${id}, ${json}::jsonb, ${publishing ? json : null}::jsonb,
            CASE WHEN ${publishing} THEN now() ELSE NULL END)
          ON CONFLICT (id) DO NOTHING
          RETURNING id, draft, revision, published IS NOT NULL AS "isPublished", updated_at AS "updatedAt", published_at AS "publishedAt"`
        return rows[0] || null
      }
      const rows = await sql`UPDATE blog_posts SET draft = ${json}::jsonb,
        published = CASE WHEN ${action} = 'publish' THEN ${json}::jsonb
          WHEN ${action} = 'unpublish' THEN NULL ELSE published END,
        published_at = CASE WHEN ${action} = 'publish' THEN COALESCE(published_at, now())
          WHEN ${action} = 'unpublish' THEN NULL ELSE published_at END,
        revision = revision + 1, updated_at = now()
        WHERE id = ${id} AND revision = ${revision}
        RETURNING id, draft, revision, published IS NOT NULL AS "isPublished", updated_at AS "updatedAt", published_at AS "publishedAt"`
      return rows[0] || null
    },
  }
}
