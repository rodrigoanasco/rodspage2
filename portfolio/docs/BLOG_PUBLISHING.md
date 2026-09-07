# Blog publishing

Open `/blog` on the deployed site and choose **Author sign-in** in the top bar.
Google/Clerk sign-in opens in a keyboard-accessible dialog. Only the verified
manager account that passes the existing MFA requirement can open the editor.

## Writing

- **New post** starts an unsaved entry. A title is required to save it.
- **Save draft** writes to Neon, never browser storage. Draft edits do not change an existing public version.
- **Preview post** shows the current text privately. Text is escaped; HTML is not executed.
- **Publish post / Publish update** saves the editor content and makes that version public.
- **Unpublish** removes the public version but retains the draft. There is no permanent-delete control.
- Select a saved post to edit it. Refresh the list to retrieve changes made on another device.
- Conflicting revisions return HTTP 409 instead of overwriting another tab's work.
  Keep/copy the unsaved text, refresh the saved-post list, then select the latest version.
- Closing the workspace with unsaved text prompts for confirmation. Saving must finish before closing.

Optional HTTPS YouTube/Vimeo links open a separate tab on click. Video uploads,
embedded players, comments, and moderation are not part of this phase.

## Storage and security

The database is Neon Postgres, connected through Vercel Marketplace. `DATABASE_URL`
is server-only; never use a `VITE_` prefix for it. Clerk remains the sole auth provider.
Every private read and every write checks the verified primary manager email and
MFA setting through Clerk on the server. Public reads select only published snapshots.
All post API responses are uncached; SQL values are parameterized.

The additive table setup is also run on the first authorized editor request.
To initialize it explicitly from the repository root on Windows:

```powershell
vercel.cmd env run -e production -- node portfolio/scripts/setup-blog-db.js
```

No existing content is modified by setup. Review database backup/restore options
and retain your own copies of important writing; a Free-plan database is not a backup strategy.

## Verification

From `portfolio`:

```powershell
node --test tests/blog-session.test.js tests/blog-posts.test.js
npm run lint
npm run build
```

`tests/editor-harness.html` is an isolated, mocked UI fixture for the Vite development
server only. It is not bundled into the app and does not bypass production authentication.

The opt-in `scripts/verify-blog-db.js` checks the real database using one temporary
row, including a brief published state, then removes only that row. Run against a
test database when real readers are present. It must never be part of automatic production builds.

## Local development

`npm run dev` starts Vite only. It does not execute Vercel API functions. For complete
local auth and publishing, use `vercel dev` from the linked repository root and set up
Development-scoped credentials with a separate test database. Include the local
Vercel origin in Development's `BLOG_AUTHORIZED_ORIGINS`; do not add localhost to
production or reuse the live database for routine local testing.

On Windows, use `vercel.cmd` for commands that pass a `--` separator to a subprocess.
Do not paste secret values into chat, commit them, or log them.
