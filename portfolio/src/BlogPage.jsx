import { useRef, useState } from 'react'
import BlogPosts from './BlogPosts'
import AuthorDialog from './components/blog/AuthorDialog'
import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import useScrollToTop from './hooks/useScrollToTop'
import './BlogPage.css'

function BlogPage({ onHome, onAbout, onProjects, onBlog, onContact, theme, onThemeToggle }) {
  const navigation = {
    home: onHome,
    about: onAbout,
    projects: onProjects,
    blog: onBlog,
    contact: onContact,
  }
  const [authorOpen, setAuthorOpen] = useState(
    () => new URLSearchParams(window.location.search).get('author') === '1',
  )
  const [refresh, setRefresh] = useState(0)
  const authorButton = useRef(null)
  const setAuthor = (open) => {
    const url = new URL(window.location.href)
    if (open) url.searchParams.set('author', '1')
    else url.searchParams.delete('author')
    window.history.replaceState({}, '', url)
    setAuthorOpen(open)
    if (!open) authorButton.current?.focus()
  }
  useScrollToTop()

  return (
    <div className="blog-page">
      <SiteHeader
        variant="blog"
        activePage="blog"
        navigation={navigation}
        theme={theme}
        onThemeToggle={onThemeToggle}
      />

      <main className="blog-main">
        <section className="blog-hero">
          <div className="blog-hero-copy">
            <p className="blog-eyebrow">Rodrigo’s journal</p>
            <h1>Blog</h1>
            <p className="blog-intro">
              Thoughts, project notes, and things I’m learning along the way.
            </p>
          </div>
          <button
            ref={authorButton}
            className="blog-button blog-author-button"
            aria-haspopup="dialog"
            onClick={() => setAuthor(true)}
          >
            Author sign-in
          </button>
        </section>

        <BlogPosts refresh={refresh} />
      </main>
      {authorOpen && (
        <AuthorDialog
          theme={theme}
          onClose={() => setAuthor(false)}
          onPublished={() => setRefresh((n) => n + 1)}
        />
      )}

      <SiteFooter variant="blog" navigation={navigation} />
    </div>
  )
}

export default BlogPage
