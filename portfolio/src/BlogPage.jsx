import { useEffect, useRef, useState } from 'react'
import { ClerkProvider, SignIn, UserProfile, useAuth } from '@clerk/react'
import BlogEditor from './BlogEditor'
import BlogPosts from './BlogPosts'
import instagramLogo from './assets/images/tech_stack/instagram 1.png'
import linkedinLogo from './assets/images/tech_stack/linkedin-original.svg'
import ThemeToggle from './ThemeToggle'
import './BlogPage.css'

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const authAppearance = (theme) => ({
  variables: {
    colorPrimary: theme === 'light' ? '#4f6f5b' : '#91b69d',
    colorBackground: theme === 'light' ? '#ffffff' : '#11181d',
    colorForeground: theme === 'light' ? '#111111' : '#f3f0e8',
    colorMutedForeground: theme === 'light' ? '#5e665f' : '#aebbb3',
    colorInputBackground: theme === 'light' ? '#f7f7f4' : '#182126',
    colorInputForeground: theme === 'light' ? '#111111' : '#f3f0e8',
    borderRadius: '0.5rem',
    fontFamily: 'Inter, sans-serif',
  },
  elements: {
    rootBox: 'blog-clerk-root',
    cardBox: 'blog-clerk-card-box',
    card: 'blog-clerk-card',
    footer: 'blog-clerk-footer',
  },
})

const requestManagerSession = async (getToken, signal) => {
  const token = await getToken({ skipCache: true })
  if (!token) return { status: 'signed-out', message: '' }

  const response = await fetch('/api/blog/session', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
    signal,
  })
  if (!response.headers.get('content-type')?.includes('application/json')) {
    return {
      status: 'error',
      message: import.meta.env.DEV
        ? 'The local Vite server is not running the login-check API. Open the deployed website to sign in, or run this project with Vercel’s local server and its server-side environment variables.'
        : `The login-check API returned an unexpected response (HTTP ${response.status}). Please try again later; this is a server issue, not an account rejection.`,
    }
  }
  const result = await response.json().catch(() => ({}))

  if (response.ok && result.manager === true) return { status: 'authorized', message: '' }

  return {
    status: response.status === 403
      ? (result.code === 'MFA_REQUIRED' ? 'mfa-required' : 'forbidden')
      : 'error',
    message: result.message || 'The manager session could not be verified.',
  }
}

function ManagerSession({ onDirtyChange, onPublished, dirty, busy }) {
  const { getToken, isLoaded, isSignedIn, signOut, userId } = useAuth()
  const [settings, setSettings] = useState(false)
  const [verificationAttempt, setVerificationAttempt] = useState(0)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [checkedUserId, setCheckedUserId] = useState(null)

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return undefined

    const controller = new AbortController()
    requestManagerSession(getToken, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return
        setStatus(result.status)
        setMessage(result.message)
        setCheckedUserId(userId)
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        setStatus('error')
        setMessage('The manager session could not be verified. Please try again.')
        setCheckedUserId(userId)
      })

    return () => controller.abort()
  }, [getToken, isLoaded, isSignedIn, userId, verificationAttempt])

  const visibleStatus = checkedUserId === userId ? status : 'idle'

  const retryVerification = () => {
    setStatus('checking')
    setMessage('')
    setCheckedUserId(userId)

    setVerificationAttempt((attempt) => attempt + 1)
  }

  const openSettings = () => {
    if (dirty && !window.confirm('Discard unsaved editor changes to open account settings?')) return
    setSettings(true)
  }

  const leaveAccount = () => {
    if (dirty && !window.confirm('Discard unsaved editor changes and sign out?')) return
    signOut({ redirectUrl: '/blog' })
  }

  if (isLoaded && isSignedIn && settings) {
    return <div className="blog-account-settings">
      <button className="blog-button" onClick={() => { setSettings(false); retryVerification() }}>Back to author workspace</button>
      <UserProfile routing="virtual" />
    </div>
  }

  if (!isLoaded) {
    return (
      <div className="blog-auth-state" role="status">
        <span className="blog-auth-spinner" aria-hidden="true" />
        <p>Checking your secure session...</p>
      </div>
    )
  }

  if (!isSignedIn || visibleStatus === 'signed-out') {
    return (
      <div className="blog-sign-in-wrap">
        <SignIn routing="virtual" forceRedirectUrl="/blog?author=1" signUpForceRedirectUrl="/blog?author=1" />
      </div>
    )
  }

  if (visibleStatus === 'idle' || visibleStatus === 'checking') {
    return (
      <div className="blog-auth-state" role="status">
        <span className="blog-auth-spinner" aria-hidden="true" />
        <p>Checking your secure session...</p>
      </div>
    )
  }

  if (visibleStatus === 'authorized') {
    return (
      <div className="blog-manager-panel">
        <div className="blog-manager-heading">
          <span className="blog-manager-check" aria-hidden="true">&#10003;</span>
          <div>
            <p className="blog-panel-label">Manager session</p>
            <h2>Your writing workspace</h2>
          </div>
        </div>
        <div className="blog-manager-actions">
          <button type="button" disabled={busy} onClick={openSettings}>Account settings</button>
          <button type="button" disabled={busy} onClick={leaveAccount}>Sign out</button>
        </div>
        <BlogEditor key={userId} getToken={getToken} onDirtyChange={onDirtyChange} onPublished={onPublished} />
      </div>
    )
  }

  return (
    <div className={`blog-auth-state blog-auth-state--${visibleStatus}`} role="alert">
      <span className="blog-auth-lock" aria-hidden="true">!</span>
      <h2>{visibleStatus === 'mfa-required' ? 'One more step: secure your account.' : visibleStatus === 'forbidden' ? 'This account is not a manager.' : 'Session check unavailable.'}</h2>
      <p>{message}</p>
      {visibleStatus === 'mfa-required' && (
        <div className="blog-mfa-help">
          <ol>
            <li>Open account settings below and select <strong>Security</strong>.</li>
            <li>Add an authenticator app under two-step verification and save your backup codes privately.</li>
            <li>Close settings and select <strong>Check access again</strong>.</li>
          </ol>
          <p>Google account security settings do not enable this website’s Clerk two-step verification.</p>
          <details>
            <summary>No two-step verification option?</summary>
            <p>In your Clerk Dashboard, open User &amp; authentication → Multi-factor and enable Authenticator application and Backup codes for the same application instance used by this website. Then reload this page.</p>
          </details>
        </div>
      )}
      <div className="blog-auth-state-actions">
        <button type="button" onClick={openSettings}>Account settings</button>
        <button type="button" onClick={retryVerification}>Check access again</button>
        <button type="button" className="blog-secondary-button" onClick={leaveAccount}>
          Sign out
        </button>
      </div>
    </div>
  )
}

function BlogAuth({ theme, onDirtyChange, onPublished, dirty, busy }) {
  if (!clerkKey) {
    return (
      <div className="blog-auth-state blog-auth-state--setup" role="status">
        <span className="blog-auth-lock" aria-hidden="true">1</span>
        <h2>Manager login needs its deployment key.</h2>
        <p>
          Add <code>VITE_CLERK_PUBLISHABLE_KEY</code> to the local and Vercel environment settings to activate this
          secure login.
        </p>
      </div>
    )
  }

  return (
    <ClerkProvider
      publishableKey={clerkKey}
      afterSignOutUrl="/blog"
      appearance={authAppearance(theme)}
    >
      <ManagerSession onDirtyChange={onDirtyChange} onPublished={onPublished} dirty={dirty} busy={busy} />
    </ClerkProvider>
  )
}

function AuthorDialog({ theme, onClose, onPublished }) {
  const dialog = useRef(null)
  const [editing, setEditing] = useState({ dirty: false, busy: false })
  useEffect(() => {
    const element = dialog.current
    const previousOverflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => { element.close(); document.body.style.overflow = previousOverflow }
  }, [])
  const close = () => {
    if (editing.busy) return
    if (editing.dirty && !window.confirm('Leave the workspace and discard unsaved changes?')) return
    dialog.current.close()
    onClose()
  }
  return <dialog ref={dialog} className="blog-author-dialog" aria-labelledby="author-dialog-title" onCancel={(event) => { event.preventDefault(); close() }}>
    <div className="blog-dialog-header"><h2 id="author-dialog-title">Author workspace</h2><button className="blog-button blog-button-secondary" disabled={editing.busy} onClick={close}>Close</button></div>
    <BlogAuth theme={theme} onDirtyChange={setEditing} onPublished={onPublished} dirty={editing.dirty} busy={editing.busy} />
  </dialog>
}

function BlogPage({ onHome, onAbout, onProjects, onBlog, onContact, theme, onThemeToggle }) {
  const [authorOpen, setAuthorOpen] = useState(() => new URLSearchParams(window.location.search).get('author') === '1')
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
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="blog-page">
      <header className="top-nav blog-top-nav">
        <a className="left-logo-home blog-logo-link" href="/" onClick={onHome}>Rodrigo.A</a>
        <div className="nav-actions">
          <nav>
            <a href="/" onClick={onHome}>Home</a>
            <a href="/about" onClick={onAbout}>About me</a>
            <a href="/projects" onClick={onProjects}>Projects</a>
            <a className="is-active" href="/blog" onClick={onBlog}>Blog</a>
            <a href="/contact" onClick={onContact}>Contact</a>
          </nav>
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          <button ref={authorButton} className="blog-button blog-author-button" aria-haspopup="dialog" onClick={() => setAuthor(true)}>Author sign-in</button>
        </div>
      </header>

      <main className="blog-main">
        <section className="blog-hero">
          <div className="blog-hero-copy">
            <p className="blog-eyebrow">Rodrigo’s journal</p>
            <h1>Blog</h1>
            <p className="blog-intro">
              Thoughts, project notes, and things I’m learning along the way.
            </p>
          </div>
        </section>

        <BlogPosts refresh={refresh} />

      </main>
      {authorOpen && <AuthorDialog theme={theme} onClose={() => setAuthor(false)} onPublished={() => setRefresh((n) => n + 1)} />}

      <footer className="blog-footer">
        <div className="footer-inner">
          <div className="footer-socials">
            <a href="https://www.instagram.com/rodr_1201/" target="_blank" rel="noreferrer">
              <img src={instagramLogo} alt="Instagram" loading="lazy" decoding="async" />
            </a>
            <a href="https://www.linkedin.com/in/rodrigo-anasco/" target="_blank" rel="noreferrer">
              <img src={linkedinLogo} alt="LinkedIn" loading="lazy" decoding="async" />
            </a>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="/" onClick={onHome}>Home</a>
            <a href="/about" onClick={onAbout}>About me</a>
            <a href="/projects" onClick={onProjects}>Projects</a>
            <a href="/blog" onClick={onBlog}>Blog</a>
            <a href="/contact" onClick={onContact}>Contact</a>
          </nav>
          <p>&copy; {new Date().getFullYear()} Rodrigo Anasco. All rights reserved</p>
        </div>
      </footer>
    </div>
  )
}

export default BlogPage
