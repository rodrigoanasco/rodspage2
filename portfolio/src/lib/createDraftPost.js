export const createDraftPost = () => ({
  id: crypto.randomUUID(),
  revision: 0,
  draft: { title: '', body: '', videoUrl: '' },
  isPublished: false,
})
