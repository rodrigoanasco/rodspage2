import { ClerkProvider } from '@clerk/react'
import { authAppearance } from '../../lib/blogAuthAppearance'
import ManagerSession from './ManagerSession'

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export default function BlogAuthentication({ theme, onDirtyChange, onPublished, dirty, busy }) {
  if (!clerkKey) {
    return (
      <div className="blog-auth-state blog-auth-state--setup" role="status">
        <span className="blog-auth-lock" aria-hidden="true">
          1
        </span>
        <h2>Manager login needs its deployment key.</h2>
        <p>
          Add <code>VITE_CLERK_PUBLISHABLE_KEY</code> to the local and Vercel environment settings
          to activate this secure login.
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
      <ManagerSession
        onDirtyChange={onDirtyChange}
        onPublished={onPublished}
        dirty={dirty}
        busy={busy}
      />
    </ClerkProvider>
  )
}
