# React + Vite

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
