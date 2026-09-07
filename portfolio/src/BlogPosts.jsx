import { useEffect, useState } from 'react'
import { blogRequest } from './blog-api'

export function PostContent({ content }) {
  let safeVideo = false
  try {
    const url = new URL(content.videoUrl)
    safeVideo = url.protocol === 'https:' && !url.username && !url.password && !url.port && ['youtube.com', 'www.youtube.com', 'youtu.be', 'vimeo.com', 'www.vimeo.com'].includes(url.hostname)
  } catch { /* A missing or invalid preview link is not rendered. */ }
  return <div className="blog-post-content">
    <div className="blog-post-text">{content.body}</div>
    {safeVideo && <p><a href={content.videoUrl} target="_blank" rel="noopener noreferrer">Watch the video (opens a new tab)</a></p>}
  </div>
}

export default function BlogPosts({ refresh }) {
  const [page, setPage] = useState(0)
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState({ posts: [], hasMore: false, key: null })
  const [error, setError] = useState('')
  const key = `${refresh}:${page}:${attempt}`
  useEffect(() => {
    const controller = new AbortController()
    blogRequest(`/api/blog/posts?offset=${page * 20}`, { signal: controller.signal })
      .then((data) => { if (!controller.signal.aborted) { setResult({ ...data, key }); setError('') } })
      .catch((err) => { if (!controller.signal.aborted) { setResult({ posts: [], hasMore: false, key }); setError(err.message) } })
    return () => controller.abort()
  }, [page, key])
  return <section className="blog-posts" aria-labelledby="blog-posts-title">
    <h2 id="blog-posts-title">Latest entries</h2>
    {result.key !== key ? <p role="status">Loading posts…</p> : error ? <div role="alert"><p>{error}</p><button className="blog-button" onClick={() => setAttempt((n) => n + 1)}>Retry loading posts</button></div> : <>
      {result.posts.length === 0 && <p className="blog-empty">{page === 0 ? 'No posts yet. Check back soon.' : 'No more posts on this page.'}</p>}
      {result.posts.map((post) => <article className="blog-entry" key={post.id}>
        <p className="blog-panel-label"><time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</time></p>
        <details><summary><h3>{post.content.title}</h3><span>Read entry</span></summary><PostContent content={post.content} /></details>
      </article>)}
    </>}
    <div className="blog-pagination">
      {page > 0 && <button className="blog-button" onClick={() => setPage((n) => n - 1)}>Newer posts</button>}
      {result.key === key && result.hasMore && <button className="blog-button" onClick={() => setPage((n) => n + 1)}>Older posts</button>}
    </div>
  </section>
}
