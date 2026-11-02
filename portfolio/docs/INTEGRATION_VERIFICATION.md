# Portfolio privacy integration verification

Date: November 1, 2026. Scope: existing pending portfolio components and the legal/privacy review's implementable source changes.

## Passed

- Full ESLint check (`npm run lint`).
- Production Vite build (`npm run build`). The upstream Turnstile package emits a non-fatal `use client` directive warning.
- All 13 Node backend tests (`npm test`). External providers and blog storage are stubbed. Tests cover input/consent validation, optional name, acknowledgement delivery parameters, anti-spam failure, redacted errors, throttle capacity/expiry, public-only post reads, draft/write guards, manager verified email and MFA.
- All eight Chromium browser tests (`npm run test:e2e`): existing home scrolling/chapter content, mobile volunteer layout, reduced motion, navigation/theme/project anchors, mobile legal direct/reload/back navigation, all public footer policy links, passive public third-party/font loading, and contact acknowledgement/challenge revocation/submission.
- Browser contact delivery and blog reads use mocked endpoints. Contact test proves optional-name payload and `privacyConsent: true`, challenge loading only after acknowledgement, token clearing after withdrawal, and form reset after success without delivering real mail.
- Production dependency audit: zero vulnerabilities (`npm audit --omit=dev`). Compatible updates resolved the four previously reported high-severity advisories. Full audit retains six moderate findings in the development-only ESLint/minimatch chain; no compatible automatic fix was available.
- `git diff --check`.

## Evidence

The Playwright tests save ignored local evidence under `test-results/`: `privacy-mobile.png` and `contact-consent-desktop.png`. These are test-environment captures. The contact screenshot includes a clearly labeled mocked anti-spam control. Generated screenshots and logs are deliberately excluded from the public commit.

## Not executed or established

- Production deployment, production merge, live contact email, provider dashboard changes, or database writes.
- Live Vercel routing/security-header enforcement. The source configuration includes all policy rewrites and shared security headers, but Vite does not execute Vercel configuration.
- Live Clerk login/MFA or Cloudflare challenge accessibility. Those still need account-configured verification.
- Comprehensive screen-reader/contrast/WCAG conformance review.
- Legal operator name, actual provider regions/retention, permission to publish each media asset, or operation of an inbox deletion schedule. The owner confirmed British Columbia, Canada and that most materials are their own; applicable legal obligations and individual third-party clearances remain unestablished. See [PRIVACY_OPERATIONS.md](PRIVACY_OPERATIONS.md).

These checks support implementation correctness. They do not certify legal compliance or substitute for the outstanding owner confirmations.
