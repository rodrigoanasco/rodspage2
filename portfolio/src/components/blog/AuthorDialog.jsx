import { useEffect, useRef, useState } from 'react'
import BlogAuthentication from './BlogAuthentication'

export default function AuthorDialog({ theme, onClose, onPublished }) {
  const dialog = useRef(null)
  const [editing, setEditing] = useState({ dirty: false, busy: false })
  useEffect(() => {
    const element = dialog.current
    const previousOverflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      element.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])
  const close = () => {
    if (editing.busy) return
    if (editing.dirty && !window.confirm('Leave the workspace and discard unsaved changes?')) return
    dialog.current.close()
    onClose()
  }
  return (
    <dialog
      ref={dialog}
      className="blog-author-dialog"
      aria-labelledby="author-dialog-title"
      onCancel={(event) => {
        event.preventDefault()
        close()
      }}
    >
      <div className="blog-dialog-header">
        <h2 id="author-dialog-title">Author workspace</h2>
        <button
          className="blog-button blog-button-secondary"
          disabled={editing.busy}
          onClick={close}
        >
          Close
        </button>
      </div>
      <BlogAuthentication
        theme={theme}
        onDirtyChange={setEditing}
        onPublished={onPublished}
        dirty={editing.dirty}
        busy={editing.busy}
      />
    </dialog>
  )
}
