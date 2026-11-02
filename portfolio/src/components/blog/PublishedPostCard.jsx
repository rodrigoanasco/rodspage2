import PostContent from './PostContent'

export default function PublishedPostCard({ post }) {
  return (
    <article className="blog-entry">
      <p className="blog-panel-label">
        <time dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </p>
      <details>
        <summary>
          <h3>{post.content.title}</h3>
          <span>Read entry</span>
        </summary>
        <PostContent content={post.content} />
      </details>
    </article>
  )
}
