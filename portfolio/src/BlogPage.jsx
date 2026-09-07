import { useEffect, useState } from 'react'
import { ClerkProvider, SignIn, UserButton, useAuth, useClerk } from '@clerk/react'
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

function ManagerSession() {
  const { getToken, isLoaded, isSignedIn, signOut, userId } = useAuth()
  const { openUserProfile } = useClerk()
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
            <h2>Manager access confirmed.</h2>
          </div>
          <UserButton />
        </div>
        <p>
          Your account has passed the server’s manager checks. Account security is available below.
          Creating, saving, and publishing posts is not connected yet; signing in alone does not enable those features.
        </p>
        <div className="blog-manager-actions">
          <button type="button" onClick={() => openUserProfile()}>Account settings</button>
          <button type="button" onClick={() => signOut({ redirectUrl: '/blog' })}>Sign out</button>
        </div>
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
        <button type="button" onClick={() => openUserProfile()}>Account settings</button>
        <button type="button" onClick={retryVerification}>Check access again</button>
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
            <p className="blog-eyebrow">Rodrigo’s journal</p>
            <h1>Blog</h1>
            <p className="blog-intro">
              Thoughts, project notes, and things I’m learning along the way.
            </p>
          </div>
        </section>

        <section className="blog-workspace" aria-labelledby="manager-access-title">
          <div className="blog-workspace-copy">
            <p className="blog-eyebrow">Author area</p>
            <h2 id="manager-access-title">Sign in to manage your account.</h2>
            <p>
              Only the verified manager account can access this area. Visitors do not need to sign in.
            </p>
          </div>
          <div className="blog-auth-window">
            <div className="blog-auth-body">
              <BlogAuth theme={theme} />
            </div>
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
          <p>&copy; {new Date().getFullYear()} Rodrigo Anasco. All rights reserved</p>
        </div>
      </footer>
    </div>
  )
}

export default BlogPage
