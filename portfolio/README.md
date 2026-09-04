# React + Vite

## Blog manager authentication setup

The `/blog` page is public, but its manager workspace uses Clerk. The browser gets a short-lived Clerk session token and sends it to `/api/blog/session`; that serverless function verifies the token signature, fetches the user from Clerk, requires a verified primary email matching `BLOG_MANAGER_EMAIL`, and requires MFA by default. Future create, edit, upload, and moderation endpoints must call the same server-side authorization logic rather than trusting the UI.

1. Create a **React** application in Clerk and copy its publishable key, secret key, and PEM JWT public key.
2. In Clerk's **Access mode** settings, use invite-only access and invite only the manager email. If using the Allowlist feature instead, enable it and add only the manager email.
3. In **User & authentication**, require email verification and disable user email changes.
4. In **Multi-factor**, enable an authenticator app or passkeys, enable backup codes, and require MFA. The API also rejects a manager account that does not have two-factor authentication enabled unless `BLOG_REQUIRE_MFA=false` is explicitly set.
5. Copy `.env.example` to `.env.local`, replace all placeholder values, and set `BLOG_AUTHORIZED_ORIGINS` to the exact origins that may issue sessions. Typical local values are `http://localhost:5173` for Vite and `http://localhost:3000` for `vercel dev`.
6. Add the same values in the Vercel project's Environment Variables settings. Do not expose `CLERK_SECRET_KEY`, `CLERK_JWT_KEY`, or `BLOG_MANAGER_EMAIL` with a `VITE_` prefix.
7. Redeploy, sign in at `/blog`, and confirm that the page shows **You are securely signed in**. A different Clerk account must receive **This is not the manager account**.

The app deliberately fails closed when configuration is missing. In that case, the Blog page shows a setup notice and the API returns `503` without granting access.

### Blog phases

1. **Secure access (implemented):** Blog route, manager sign-in, signed sessions, verified-email authorization, and MFA enforcement.
2. **Publishing:** Persistent post storage plus manager-only create, edit, preview, publish, and delete actions.
3. **Media and conversation:** Video embeds/uploads, visitor comments, moderation, Turnstile, and distributed rate limits.

Cloudflare is useful as an additional layer later: proxy the production domain, use Full (strict) TLS, and add WAF/rate-limit rules for Blog APIs. Turnstile is appropriate when visitor comments are added. It is bot protection, not a replacement for identity or server-side authorization.

## Secure contact form setup

The contact form sends through the server-side `/api/contact` function and requires a Vercel deployment (or another host that supports Vercel-compatible functions).

1. Create a Cloudflare Turnstile widget for the production domain.
2. Copy `.env.example` to `.env.local` for local development and add all six values. Add the same values in the Vercel project's Environment Variables settings.
3. In the EmailJS template, use a verified address that you control as the fixed **From email**. Do not put `{{reply_to}}` or any visitor-controlled value in that field.
4. Set the template's **Reply-To** field to `{{reply_to}}`. The visitor address is deliberately sent only through that template variable.
5. Redeploy after adding or changing environment variables.

The endpoint validates Turnstile server-side, rejects the portfolio owner's address as a visitor address, validates input lengths, includes a honeypot, and permits at most five attempts per IP in a 15-minute warm-instance window. For a strict distributed quota across all serverless instances, also configure a Vercel Firewall rate-limit rule for `POST /api/contact`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
