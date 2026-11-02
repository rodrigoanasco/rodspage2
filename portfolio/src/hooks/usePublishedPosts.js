import { useEffect, useState } from 'react'
import { blogRequest } from '../blog-api'

export default function usePublishedPosts(refresh) {
  const [page, setPage] = useState(0)
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState({ posts: [], hasMore: false, key: null })
  const [error, setError] = useState('')
  const key = `${refresh}:${page}:${attempt}`
  useEffect(() => {
    const controller = new AbortController()
    blogRequest(`/api/blog/posts?offset=${page * 20}`, { signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted) {
          setResult({ ...data, key })
          setError('')
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setResult({ posts: [], hasMore: false, key })
          setError(err.message)
        }
      })
    return () => controller.abort()
  }, [page, key])
  return {
    page,
    posts: result.posts,
    hasMore: result.hasMore,
    loading: result.key !== key,
    error,
    retry: () => setAttempt((value) => value + 1),
    previousPage: () => setPage((value) => value - 1),
    nextPage: () => setPage((value) => value + 1),
  }
}
