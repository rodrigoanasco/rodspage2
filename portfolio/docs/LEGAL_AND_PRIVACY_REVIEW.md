# Privacy, accessibility, and launch review

Reviewed against the source tree on November 1, 2026. This is an implementation checklist, not a legal opinion or a certification of compliance. The earlier October 19 draft described changes that were not wired into the committed app; this integration implements and verifies the code items below.

## Verified in this repository

- No Google Analytics, ad pixels, session replay, or marketing tracking code was found. Google Fonts was remote before this review and is now loaded from installed local font packages.
- The theme choice is the only first-party browser preference and is stored in local storage, not a cookie.
- The contact form sends an optional name, email, message, honeypot, Cloudflare Turnstile token, and an explicit privacy-acknowledgement boolean to `/api/contact`. The endpoint requires the boolean to be exactly `true`, validates fields, and verifies the Turnstile token/action before delivery. It sends acknowledgement metadata and a server timestamp as EmailJS template parameters; retaining those in delivered email requires adding the parameters to the live template.
- Cloudflare Turnstile is mounted only after acknowledgement. Withdrawing acknowledgement unmounts the challenge and clears its token; it does not reverse information already processed by Cloudflare. Clerk initializes only when the private author sign-in/workspace is opened. Passive public browsing does not need either provider to initialize.
- The contact endpoint passes the visitor IP to Cloudflare for verification. Its abuse limiter stores per-instance salted HMAC identifiers instead of raw addresses, caps storage at 10,000 entries, and uses a fixed 15-minute window with at most five attempts. Expired entries are removed on the next request, or when the instance ends; no timer-based deletion is claimed. Provider bodies, submitted messages, and error details are not written to application delivery logs.
- Clerk is used by the private blog manager when configured. Neon stores published posts. Readers are not asked to sign in. YouTube and Vimeo references open as external links; the page does not embed their players.
- The portfolio links to Instagram and LinkedIn; their icons are local files and the links do not embed social widgets.
- Footer links now expose the privacy, terms, cookie, and refund pages from each main route. Vercel rewrites serve the SPA on those paths.
- Contact form labels, required privacy acknowledgement, technology-logo alternative text, stronger placeholder contrast, and visible keyboard focus styles were added.

## Resolve before treating this as final legal copy

- Confirm who operates the site and whether Rodrigo Anasco is the legal name to publish. The code only establishes a public contact email; it does not establish a business name, mailing address, business status, or privacy-officer title.
- The owner confirmed British Columbia, Canada during this integration. Vercel is the hosting provider; the person responsible for the portfolio is its operator. BC PIPA and, depending on context, PIPEDA are relevant possibilities; confirm the site's personal/business use and where it is offered before determining applicability. California's CCPA/CPRA applies only if its business tests are met; confirm revenue, data volumes, and business model before asserting applicability or exemption.
- Confirm the actual Vercel, EmailJS, Cloudflare, Clerk, and Neon account configuration, data-region choices, log settings, and retention periods. Policies should track the live provider setup.
- Set and follow a real retention/deletion schedule for contact email, operational logs, and provider records. The current site has no automated inquiry deletion workflow.
- The owner states that most portfolio materials are their own and intended for publication. This supports use of their original work but does not individually clear group photos, employer/school materials, coauthored work, logos, or identifiable third parties. Source, releases, and licenses are not recorded for these assets; confirm them using the operations checklist.
- Review factual project and award statements with the relevant organizations. No testimonial or review section was found; this review did not independently substantiate every portfolio claim.
- The contact endpoint's bounded, pseudonymous in-memory throttle resets across serverless instances and is not a durable or distributed quota. Configure a provider firewall/distributed limiter if a strict cross-instance quota is required. Code cleanup is implemented; provider configuration is not verified.
- If analytics, advertising, video embeds, or other non-essential tracking is introduced, update the policies and add consent controls before loading those technologies where required by applicable law. Reassess cookie consent after every vendor or tracking change.

## Accessibility handoff

Code changes improve keyboard focus visibility and accessible image naming, but do not establish conformance. Perform a manual keyboard and screen-reader review, inspect color contrast on rendered surfaces in both themes, and check responsive zoom/reflow and the Cloudflare challenge. The DOJ's ADA guidance recommends keyboard access, sufficient contrast, semantic headings, and manual review in addition to automated checking.

## Evidence and operational handoff

- `npm run lint`: passed.
- `npm test`: 13 backend tests passed, including consent rejection before provider calls, optional name, anti-spam action verification, private log redaction, bounded limiter expiry, public-only blog reads, and manager authorization.
- `npm run build`: passed. Vite reports an upstream Turnstile `use client` directive warning; the static build completes.
- Browser results are recorded in `docs/INTEGRATION_VERIFICATION.md`. Tests use stubbed providers and local APIs; they do not prove live inbox delivery, database connectivity, account configuration, or real Turnstile accessibility.
- Compatible dependency updates removed the four reported high-severity advisories. `npm audit --omit=dev` reports zero vulnerabilities. The full audit still reports six moderate findings in the development-only ESLint/minimatch chain with no compatible automatic fix; no forced major-version override was applied.
- Local screenshots, browser logs, test output, environment files, and build output are excluded from commits. Public fonts are served from installed packages rather than Google Fonts.

The owner must complete [PRIVACY_OPERATIONS.md](PRIVACY_OPERATIONS.md) before final publication sign-off. British Columbia, Canada is owner-confirmed. No individual media permission, provider retention schedule, or fixed inbox deletion deadline has been invented.

## Guidance consulted

Canadian guidance is a reference for implementation, not a finding that a particular Canadian law applies to this operator.

- [OPC: Guidelines for obtaining meaningful consent](https://www.priv.gc.ca/en/privacy-topics/privacy-for-businesses/appropriate-handling-of-personal-information/collecting-personal-information-and-consent/consent/gl_omc_201805/): make collection, recipients, and purposes understandable at the point of submission; consent does not remove other privacy obligations.
- [OPC: Limiting use, disclosure, and retention](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_use/): document retention/disposal procedures and retain information only while its identified purpose requires it.
