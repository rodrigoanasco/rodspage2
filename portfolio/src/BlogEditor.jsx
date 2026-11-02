import PostComposer from './components/blog/PostComposer'
import SavedPostList from './components/blog/SavedPostList'
import useBlogEditor from './hooks/useBlogEditor'

export default function BlogEditor({ getToken, onDirtyChange, onPublished }) {
  const editor = useBlogEditor({ getToken, onDirtyChange, onPublished })

  return (
    <div className="blog-editor-layout">
      <SavedPostList
        posts={editor.posts}
        selectedId={editor.selected.id}
        page={editor.page}
        hasMore={editor.hasMore}
        loading={editor.loading}
        busy={editor.busy}
        onCreate={editor.createPost}
        onSelect={editor.select}
        onRefresh={editor.refreshList}
        onPrevious={editor.previousPage}
        onNext={editor.nextPage}
      />
      <PostComposer
        selected={editor.selected}
        content={editor.content}
        dirty={editor.dirty}
        busy={editor.busy}
        error={editor.error}
        notice={editor.notice}
        preview={editor.preview}
        titleInput={editor.titleInput}
        onContentChange={editor.updateContent}
        onSave={editor.save}
        onTogglePreview={editor.togglePreview}
      />
    </div>
  )
}
