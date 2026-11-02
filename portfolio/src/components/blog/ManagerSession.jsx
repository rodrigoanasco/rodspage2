import { useEffect, useState } from 'react'
import { SignIn, UserProfile, useAuth } from '@clerk/react'
import BlogEditor from '../../BlogEditor'
import { requestManagerSession } from '../../lib/requestManagerSession'

export default function ManagerSession({ onDirtyChange, onPublished, dirty, busy }) {
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
    return (
      <div className="blog-account-settings">
        <button
          className="blog-button"
          onClick={() => {
            setSettings(false)
            retryVerification()
          }}
        >
          Back to author workspace
        </button>
        <UserProfile routing="virtual" />
      </div>
    )
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
        <SignIn
          routing="virtual"
          forceRedirectUrl="/blog?author=1"
          signUpForceRedirectUrl="/blog?author=1"
        />
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
          <span className="blog-manager-check" aria-hidden="true">
            &#10003;
          </span>
          <div>
            <p className="blog-panel-label">Manager session</p>
            <h2>Your writing workspace</h2>
          </div>
        </div>
        <div className="blog-manager-actions">
          <button type="button" disabled={busy} onClick={openSettings}>
            Account settings
          </button>
          <button type="button" disabled={busy} onClick={leaveAccount}>
            Sign out
          </button>
        </div>
        <BlogEditor
          key={userId}
          getToken={getToken}
          onDirtyChange={onDirtyChange}
          onPublished={onPublished}
        />
      </div>
    )
  }

  return (
    <div className={`blog-auth-state blog-auth-state--${visibleStatus}`} role="alert">
      <span className="blog-auth-lock" aria-hidden="true">
        !
      </span>
      <h2>
        {visibleStatus === 'mfa-required'
          ? 'One more step: secure your account.'
          : visibleStatus === 'forbidden'
            ? 'This account is not a manager.'
            : 'Session check unavailable.'}
      </h2>
      <p>{message}</p>
      {visibleStatus === 'mfa-required' && (
        <div className="blog-mfa-help">
          <ol>
            <li>
              Open account settings below and select <strong>Security</strong>.
            </li>
            <li>
              Add an authenticator app under two-step verification and save your backup codes
              privately.
            </li>
            <li>
              Close settings and select <strong>Check access again</strong>.
            </li>
          </ol>
          <p>
            Google account security settings do not enable this website’s Clerk two-step
            verification.
          </p>
          <details>
            <summary>No two-step verification option?</summary>
            <p>
              In your Clerk Dashboard, open User &amp; authentication → Multi-factor and enable
              Authenticator application and Backup codes for the same application instance used by
              this website. Then reload this page.
            </p>
          </details>
        </div>
      )}
      <div className="blog-auth-state-actions">
        <button type="button" onClick={openSettings}>
          Account settings
        </button>
        <button type="button" onClick={retryVerification}>
          Check access again
        </button>
        <button type="button" className="blog-secondary-button" onClick={leaveAccount}>
          Sign out
        </button>
      </div>
    </div>
  )
}
