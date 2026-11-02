import BlogPagination from './components/blog/BlogPagination'
import PublishedPostCard from './components/blog/PublishedPostCard'
import usePublishedPosts from './hooks/usePublishedPosts'

export default function BlogPosts({ refresh }) {
  const { page, posts, hasMore, loading, error, retry, previousPage, nextPage } =
    usePublishedPosts(refresh)

  return (
    <section className="blog-posts" aria-labelledby="blog-posts-title">
      <h2 id="blog-posts-title">Latest entries</h2>
      {loading ? (
        <p role="status">Loading posts&#8230;</p>
      ) : error ? (
        <div role="alert">
          <p>{error}</p>
          <button className="blog-button" onClick={retry}>
            Retry loading posts
          </button>
        </div>
      ) : (
        <>
          {posts.length === 0 && (
            <p className="blog-empty">
              {page === 0 ? 'No posts yet. Check back soon.' : 'No more posts on this page.'}
            </p>
          )}
          {posts.map((post) => (
            <PublishedPostCard key={post.id} post={post} />
          ))}
        </>
      )}
      <BlogPagination
        label="Public blog pages"
        previousLabel="Newer posts"
        nextLabel="Older posts"
        onPrevious={page > 0 ? previousPage : undefined}
        onNext={!loading && hasMore ? nextPage : undefined}
      />
    </section>
  )
}
