import { useEffect, useState } from 'react'
import { ClerkProvider, SignIn, UserButton, useAuth } from '@clerk/react'
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
  const token = await getToken()
  if (!token) return { status: 'signed-out', message: '' }

  const response = await fetch('/api/blog/session', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
    signal,
  })
  const result = await response.json().catch(() => ({}))

  if (response.ok && result.manager === true) return { status: 'authorized', message: '' }

  return {
    status: response.status === 403 ? 'forbidden' : 'error',
    message: result.message || 'The manager session could not be verified.',
  }
}

function ManagerSession() {
  const { getToken, isLoaded, isSignedIn, signOut, userId } = useAuth()
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [checkedUserId, setCheckedUserId] = useState(null)

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return undefined

    const controller = new AbortController()
    requestManagerSession(getToken, controller.signal)
      .then((result) => {
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
  }, [getToken, isLoaded, isSignedIn, userId])

  const visibleStatus = checkedUserId === userId ? status : 'idle'

  const retryVerification = async () => {
    setStatus('checking')
    setMessage('')
    setCheckedUserId(userId)

    try {
      const result = await requestManagerSession(getToken)
      setStatus(result.status)
      setMessage(result.message)
    } catch {
      setStatus('error')
      setMessage('The manager session could not be verified. Please try again.')
    }
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
        <SignIn routing="virtual" />
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
            <h2>You are securely signed in.</h2>
          </div>
          <UserButton />
        </div>
        <p>
          Your verified identity and manager email were confirmed by the server. The publishing workspace will be
          connected here in phase two.
        </p>
        <div className="blog-manager-actions">
          <span>Publishing controls coming next</span>
          <button type="button" onClick={() => signOut({ redirectUrl: '/blog' })}>Sign out</button>
        </div>
      </div>
    )
  }

  return (
    <div className={`blog-auth-state blog-auth-state--${visibleStatus}`} role="alert">
      <span className="blog-auth-lock" aria-hidden="true">!</span>
      <h2>{visibleStatus === 'forbidden' ? 'This is not the manager account.' : 'Session check unavailable.'}</h2>
      <p>{message}</p>
      <div className="blog-auth-state-actions">
        {visibleStatus === 'error' && (
          <button type="button" onClick={retryVerification}>Try again</button>
        )}
        <UserButton />
        <button type="button" className="blog-secondary-button" onClick={() => signOut({ redirectUrl: '/blog' })}>
          Sign out
        </button>
      </div>
    </div>
  )
}

function BlogAuth({ theme }) {
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
      <ManagerSession />
    </ClerkProvider>
  )
}

function BlogPage({ onHome, onAbout, onProjects, onBlog, onContact, theme, onThemeToggle }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const phases = [
    { number: '01', title: 'Secure access', text: 'Manager-only login, verified on the server.', active: true },
    { number: '02', title: 'Publishing', text: 'Create, edit, preview, and publish thoughts.' },
    { number: '03', title: 'Media & conversation', text: 'Video embeds, comments, moderation, and spam controls.' },
  ]

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
        </div>
      </header>

      <main className="blog-main">
        <section className="blog-hero">
          <div className="blog-hero-copy">
            <p className="blog-eyebrow">Notes, experiments & things worth sharing</p>
            <h1>A quieter place for unfinished thoughts.</h1>
            <p className="blog-intro">
              This will become a home for ideas, project notes, videos, and conversations. For now, the foundation is
              a secure author session that only the site manager can use.
            </p>
          </div>
          <div className="blog-orbit" aria-hidden="true">
            <span>thoughts</span>
            <span>videos</span>
            <span>notes</span>
            <div>R.A</div>
          </div>
        </section>

        <section className="blog-workspace" aria-labelledby="manager-access-title">
          <div className="blog-workspace-copy">
            <p className="blog-eyebrow">Phase 01 / Active</p>
            <h2 id="manager-access-title">Manager access</h2>
            <p>
              Sign in with the private manager account. Authentication is handled by Clerk; authorization is checked
              again by the server before any management controls are revealed.
            </p>
            <ul className="blog-security-list">
              <li>Verified email required</li>
              <li>Multi-factor authentication required</li>
              <li>Short-lived signed session tokens</li>
              <li>No passwords stored in this codebase</li>
            </ul>
          </div>
          <div className="blog-auth-window">
            <div className="blog-window-bar">
              <span />
              <span />
              <span />
              <p>manager.session</p>
            </div>
            <div className="blog-auth-body">
              <BlogAuth theme={theme} />
            </div>
          </div>
        </section>

        <section className="blog-roadmap" aria-labelledby="blog-roadmap-title">
          <div className="blog-roadmap-heading">
            <p className="blog-eyebrow">Build roadmap</p>
            <h2 id="blog-roadmap-title">One reliable layer at a time.</h2>
          </div>
          <div className="blog-phase-grid">
            {phases.map((phase) => (
              <article className={phase.active ? 'is-active' : ''} key={phase.number}>
                <span>{phase.number}</span>
                <h3>{phase.title}</h3>
                <p>{phase.text}</p>
                <small>{phase.active ? 'In progress' : 'Upcoming'}</small>
              </article>
            ))}
          </div>
        </section>
      </main>

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
          <p>&copy; 2025 Rodrigo Anasco. All rights reserved</p>
        </div>
      </footer>
    </div>
  )
}

export default BlogPage
