import { useEffect, useRef, useState } from 'react'
import { blogRequest } from '../blog-api'
import { createDraftPost } from '../lib/createDraftPost'

export default function useBlogEditor({ getToken, onDirtyChange, onPublished }) {
  const [posts, setPosts] = useState([])
  const [selected, setSelected] = useState(createDraftPost)
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
    const warn = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  useEffect(() => {
    const controller = new AbortController()
    blogRequest(`/api/blog/posts?manage=1&offset=${page * 20}`, {
      getToken,
      signal: controller.signal,
    })
      .then((data) => {
        if (!controller.signal.aborted) {
          setPosts(data.posts)
          setHasMore(data.hasMore)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err.message)
          setLoading(false)
        }
      })
    return () => controller.abort()
  }, [getToken, page, reload])

  function select(post) {
    if (busy || (dirty && !window.confirm('Discard the unsaved changes in this editor?'))) return
    setSelected(post)
    setContent(post.draft)
    setError('')
    setNotice('')
    setPreview(false)
    titleInput.current?.focus()
  }

  async function save(action) {
    if (saving.current) return
    if (
      action === 'unpublish' &&
      !window.confirm('Remove this post from the public Blog? Your draft will be kept.')
    )
      return
    saving.current = true
    setBusy(true)
    setError('')
    setNotice('')
    try {
      const { post } = await blogRequest('/api/blog/posts', {
        getToken,
        post: { id: selected.id, revision: selected.revision, ...content, action },
      })
      setSelected(post)
      setContent(post.draft)
      setNotice(
        action === 'publish'
          ? 'Published. Your post is now visible on the Blog.'
          : action === 'unpublish'
            ? 'Unpublished. Your draft is still saved.'
            : 'Draft saved to your database. The public version has not changed.',
      )
      setReload((n) => n + 1)
      if (action !== 'save') onPublished()
    } catch (err) {
      setError(err.message)
    } finally {
      saving.current = false
      setBusy(false)
    }
  }

  function refreshList() {
    setLoading(true)
    setError('')
    setReload((n) => n + 1)
  }
  return {
    posts,
    selected,
    content,
    page,
    hasMore,
    loading,
    busy,
    error,
    notice,
    preview,
    dirty,
    titleInput,
    select,
    save,
    refreshList,
    createPost: () => select(createDraftPost()),
    updateContent: setContent,
    togglePreview: () => setPreview((value) => !value),
    previousPage: () => {
      setLoading(true)
      setPage((value) => value - 1)
    },
    nextPage: () => {
      setLoading(true)
      setPage((value) => value + 1)
    },
  }
}
