import PostContent from './PostContent'

export default function PostPreview({ content }) {
  return (
    <section className="blog-preview" id="post-preview" aria-label="Private preview">
      <p className="blog-panel-label">Private preview · not published</p>
      <h3>{content.title || 'Untitled post'}</h3>
      <PostContent content={content} />
    </section>
  )
}
