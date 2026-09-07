import { useEffect, useRef, useState } from 'react'
import { blogRequest } from './blog-api'
import { PostContent } from './BlogPosts'

const newPost = () => ({ id: crypto.randomUUID(), revision: 0, draft: { title: '', body: '', videoUrl: '' }, isPublished: false })

export default function BlogEditor({ getToken, onDirtyChange, onPublished }) {
  const [posts, setPosts] = useState([])
  const [selected, setSelected] = useState(newPost)
  const [content, setContent] = useState(selected.draft)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [reload, setReload] = useState(0)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [preview, setPreview] = useState(false)
  const saving = useRef(false)
  const titleInput = useRef(null)
  const dirty = JSON.stringify(content) !== JSON.stringify(selected.draft)

  useEffect(() => {
    onDirtyChange({ dirty, busy })
    return () => onDirtyChange({ dirty: false, busy: false })
  }, [dirty, busy, onDirtyChange])

  useEffect(() => {
    if (!dirty) return
    const warn = (event) => { event.preventDefault(); event.returnValue = '' }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  useEffect(() => {
    const controller = new AbortController()
    blogRequest(`/api/blog/posts?manage=1&offset=${page * 20}`, { getToken, signal: controller.signal })
      .then((data) => { if (!controller.signal.aborted) { setPosts(data.posts); setHasMore(data.hasMore); setLoading(false) } })
      .catch((err) => { if (!controller.signal.aborted) { setError(err.message); setLoading(false) } })
    return () => controller.abort()
  }, [getToken, page, reload])

  function select(post) {
    if (busy || (dirty && !window.confirm('Discard the unsaved changes in this editor?'))) return
    setSelected(post); setContent(post.draft); setError(''); setNotice(''); setPreview(false)
    titleInput.current?.focus()
  }

  async function save(action) {
    if (saving.current) return
    if (action === 'unpublish' && !window.confirm('Remove this post from the public Blog? Your draft will be kept.')) return
    saving.current = true; setBusy(true); setError(''); setNotice('')
    try {
      const { post } = await blogRequest('/api/blog/posts', { getToken, post: { id: selected.id, revision: selected.revision, ...content, action } })
      setSelected(post); setContent(post.draft)
      setNotice(action === 'publish' ? 'Published. Your post is now visible on the Blog.' : action === 'unpublish' ? 'Unpublished. Your draft is still saved.' : 'Draft saved to your database. The public version has not changed.')
      setReload((n) => n + 1)
      if (action !== 'save') onPublished()
    } catch (err) { setError(err.message) }
    finally { saving.current = false; setBusy(false) }
  }

  function refreshList() { setLoading(true); setError(''); setReload((n) => n + 1) }
  return <div className="blog-editor-layout">
    <aside className="blog-draft-list" aria-label="Your saved posts">
      <button className="blog-button" disabled={busy} onClick={() => select(newPost())}>New post</button>
      <h3>Saved posts</h3>
      <button className="blog-button blog-button-secondary" disabled={busy || loading} onClick={refreshList}>Refresh list</button>
      {loading ? <p role="status">Loading saved posts…</p> : posts.length === 0 ? <p>No saved posts on this page.</p> : <ul>{posts.map((post) => <li key={post.id}>
        <button disabled={busy} className={post.id === selected.id ? 'is-selected' : ''} aria-current={post.id === selected.id ? 'true' : undefined} onClick={() => select(post)}>
          <strong>{post.draft.title}</strong><span>{post.isPublished ? 'Published · editable draft' : 'Draft'}</span>
        </button>
      </li>)}</ul>}
      <div className="blog-pagination">
        {page > 0 && <button className="blog-button" disabled={busy || loading} onClick={() => { setLoading(true); setPage((n) => n - 1) }}>Previous</button>}
        {hasMore && <button className="blog-button" disabled={busy || loading} onClick={() => { setLoading(true); setPage((n) => n + 1) }}>Next</button>}
      </div>
    </aside>
    <section className="blog-composer" aria-labelledby="post-editor-title">
      <h3 id="post-editor-title">{selected.revision === 0 ? 'Write a new post' : 'Edit post'}</h3>
      <p className="blog-editor-hint">{dirty ? 'Unsaved changes' : selected.revision ? 'All editor changes saved' : 'Not saved yet'}. Drafts are private. Publishing makes this version public.</p>
      {error && <p className="blog-editor-error" role="alert">{error}</p>}
      {notice && <p role="status">{notice}</p>}
      <form onSubmit={(event) => { event.preventDefault(); save('save') }}>
        <fieldset disabled={busy}>
          <label htmlFor="post-title">Title</label>
          <input ref={titleInput} id="post-title" required maxLength={160} value={content.title} onChange={(e) => setContent({ ...content, title: e.target.value })} />
          <label htmlFor="post-body">Post text</label>
          <textarea id="post-body" rows={14} maxLength={50000} value={content.body} onChange={(e) => setContent({ ...content, body: e.target.value })} aria-describedby="post-text-help" />
          <p id="post-text-help" className="blog-editor-hint">Plain text with line breaks. HTML is displayed as text, not executed. {content.body.length.toLocaleString()} / 50,000 characters.</p>
          <label htmlFor="post-video">YouTube or Vimeo link (optional)</label>
          <input id="post-video" type="url" maxLength={500} placeholder="https://www.youtube.com/watch?v=…" value={content.videoUrl} onChange={(e) => setContent({ ...content, videoUrl: e.target.value })} aria-describedby="post-video-help" />
          <p id="post-video-help" className="blog-editor-hint">An external video link, not an upload. Readers choose whether to open it.</p>
          <div className="blog-editor-actions">
            <button className="blog-button" type="submit">{busy ? 'Saving…' : 'Save draft'}</button>
            <button className="blog-button" type="button" disabled={!content.title.trim() || !content.body.trim()} onClick={() => save('publish')}>{selected.isPublished ? 'Publish update' : 'Publish post'}</button>
            <button className="blog-button blog-button-secondary" type="button" aria-expanded={preview} aria-controls="post-preview" onClick={() => setPreview((value) => !value)}>{preview ? 'Hide preview' : 'Preview post'}</button>
            {selected.isPublished && <button className="blog-button blog-button-secondary" type="button" onClick={() => save('unpublish')}>Unpublish</button>}
          </div>
        </fieldset>
      </form>
      {preview && <section className="blog-preview" id="post-preview" aria-label="Private preview">
        <p className="blog-panel-label">Private preview · not published</p><h3>{content.title || 'Untitled post'}</h3><PostContent content={content} />
      </section>}
    </section>
  </div>
}
