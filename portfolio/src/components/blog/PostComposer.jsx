import PostPreview from './PostPreview'

export default function PostComposer({
  selected,
  content,
  dirty,
  busy,
  error,
  notice,
  preview,
  titleInput,
  onContentChange,
  onSave,
  onTogglePreview,
}) {
  function updateField(event) {
    const { name, value } = event.target
    onContentChange({ ...content, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSave('save')
  }

  return (
    <section className="blog-composer" aria-labelledby="post-editor-title">
      <h3 id="post-editor-title">{selected.revision === 0 ? 'Write a new post' : 'Edit post'}</h3>
      <p className="blog-editor-hint">
        {dirty
          ? 'Unsaved changes'
          : selected.revision
            ? 'All editor changes saved'
            : 'Not saved yet'}
        . Drafts are private. Publishing makes this version public.
      </p>
      {error && (
        <p className="blog-editor-error" role="alert">
          {error}
        </p>
      )}
      {notice && <p role="status">{notice}</p>}
      <form onSubmit={handleSubmit}>
        <fieldset disabled={busy}>
          <label htmlFor="post-title">Title</label>
          <input
            ref={titleInput}
            id="post-title"
            name="title"
            required
            maxLength={160}
            value={content.title}
            onChange={updateField}
          />
          <label htmlFor="post-body">Post text</label>
          <textarea
            id="post-body"
            name="body"
            rows={14}
            maxLength={50000}
            value={content.body}
            onChange={updateField}
            aria-describedby="post-text-help"
          />
          <p id="post-text-help" className="blog-editor-hint">
            Plain text with line breaks. HTML is displayed as text, not executed.{' '}
            {content.body.length.toLocaleString()} / 50,000 characters.
          </p>
          <label htmlFor="post-video">YouTube or Vimeo link (optional)</label>
          <input
            id="post-video"
            name="videoUrl"
            type="url"
            maxLength={500}
            placeholder="https://www.youtube.com/watch?v=…"
            value={content.videoUrl}
            onChange={updateField}
            aria-describedby="post-video-help"
          />
          <p id="post-video-help" className="blog-editor-hint">
            An external video link, not an upload. Readers choose whether to open it.
          </p>
          <div className="blog-editor-actions">
            <button className="blog-button" type="submit">
              {busy ? 'Saving…' : 'Save draft'}
            </button>
            <button
              className="blog-button"
              type="button"
              disabled={!content.title.trim() || !content.body.trim()}
              onClick={() => onSave('publish')}
            >
              {selected.isPublished ? 'Publish update' : 'Publish post'}
            </button>
            <button
              className="blog-button blog-button-secondary"
              type="button"
              aria-expanded={preview}
              aria-controls="post-preview"
              onClick={onTogglePreview}
            >
              {preview ? 'Hide preview' : 'Preview post'}
            </button>
            {selected.isPublished && (
              <button
                className="blog-button blog-button-secondary"
                type="button"
                onClick={() => onSave('unpublish')}
              >
                Unpublish
              </button>
            )}
          </div>
        </fieldset>
      </form>
      {preview && <PostPreview content={content} />}
    </section>
  )
}
