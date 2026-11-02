import BlogPagination from './BlogPagination'

export default function SavedPostList({
  posts,
  selectedId,
  page,
  hasMore,
  loading,
  busy,
  onCreate,
  onSelect,
  onRefresh,
  onPrevious,
  onNext,
}) {
  return (
    <aside className="blog-draft-list" aria-label="Your saved posts">
      <button className="blog-button" disabled={busy} onClick={onCreate}>
        New post
      </button>
      <h3>Saved posts</h3>
      <button
        className="blog-button blog-button-secondary"
        disabled={busy || loading}
        onClick={onRefresh}
      >
        Refresh list
      </button>
      {loading ? (
        <p role="status">Loading saved posts…</p>
      ) : posts.length === 0 ? (
        <p>No saved posts on this page.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <button
                disabled={busy}
                className={post.id === selectedId ? 'is-selected' : ''}
                aria-current={post.id === selectedId ? 'true' : undefined}
                onClick={() => onSelect(post)}
              >
                <strong>{post.draft.title}</strong>
                <span>{post.isPublished ? 'Published · editable draft' : 'Draft'}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <BlogPagination
        label="Saved post pages"
        disabled={busy || loading}
        onPrevious={page > 0 ? onPrevious : undefined}
        onNext={hasMore ? onNext : undefined}
      />
    </aside>
  )
}
