# Reusable-component refactor verification

Baseline: merged `master` commit `66e3361`. Verification was completed locally before publication. The subsequent metadata-only title/description update from `master` commit `371bc55` was retained when preparing the refactor for release. The commit history and associated pull request record publication and merge status.

## Preservation boundary

Preserve the existing UI, factual/legal copy, images/videos, route URLs, hashes, theme preference, scrolling/reveal behavior, contact acknowledgement and anti-spam gate, public blog behavior, and private manager/editor security boundaries. Component extraction and layout-neutral HTML semantics are in scope. New features, replacement layouts, provider settings, and live data operations are outside scope.

The initial unmodified application passed the 13 backend tests, existing eight browser tests, production build and lint. A lint race with Playwright clearing generated screenshots was resolved by excluding generated directories from lint traversal.

## Static/server checks

- `npm run format:check`: passed with the shared Prettier configuration.
- `npm run lint`: passed.
- `npm test`: all 13 backend tests passed, including the extracted shared video-URL validation policy.
- `npm run build`: passed. The existing upstream Turnstile `use client` directive warning remains non-fatal.
- `git diff --check`: passed.
- Read-only review found equivalent authentication/MFA handling, manager session verification, editor save/unpublish payloads, dirty/busy/discard guards, contact consent and token transitions, and private-data logging/storage boundaries.

Formatting also covers API/server modules and scripts. Their behavior is unchanged, except that identical client/server video URL checks now use one pure helper with the existing restrictions.

## Visual and content comparison

Before/after capture covers all nine public routes at desktop/dark settings and the five main routes at mobile/light settings: 14 scenarios total. The script stubs blog reads, waits for fonts/images, masks moving video frames, and compares text, headings, links, image identities/geometry, controls, page dimensions and page-level landmarks.

- All 14 normalized content/layout contracts match.
- All 14 screenshots match within the deliberately narrow raster tolerance.
- Thirteen screenshots have identical PNG hashes.
- The mobile Projects screenshot differs by 15 anti-aliased border pixels out of 3,419,520 pixels, with a maximum channel difference of 6/255. Its content, dimensions and geometry match exactly. The utility permits at most 0.001% changed pixels and at most 8/255 channel variation; dimensions and contracts must still match.
- No page JavaScript errors occurred during capture/comparison.

Intentional, layout-neutral semantic changes include named pagination navigation, paragraph markup for blog text and the welcome message, and section headers. Only the known new pagination landmark is excluded from the old landmark-count comparison; page navigation/content/layout remain checked.

The whole-page home capture returns to the top and does not establish visibility of scroll-revealed sections. Separate settled captures compare the original `HEAD` source through a read-only Vite resolver with the current source, using identical static-reveal test styling in both contexts. The experience collages and mobile volunteer cards match exactly in both screenshot hashes and section contracts (2/2). Normal scroll/reveal behavior is separately covered by the browser suite. Do not infer visibility from a hidden full-page capture. Evidence: `.refactor-verification/settled-home-sections/results.json` and its original/current screenshots.

## Browser behavior coverage

`npm run test:e2e`: all 12 tests passed. The suite contains the original eight scenarios plus four focused regressions for shared navigation/history/theme, public blog error/retry/pagination/safe text, editor save/preview/publish/discard, and author dialog URL/focus/Escape/body-scroll restoration. The dialog test holds provider requests locally and does not authenticate a real account.

One initial concurrent run reached the navigation assertion while the cold local Vite server still displayed the blog loading boundary. A focused unchanged reproduction passed; the regression test now explicitly waits for the destination page before interacting with its theme control, with a bounded 15-second budget for local compilation. The subsequent full suite passed. No product behavior was changed for this test adjustment.

Live provider authentication, real email delivery, provider retention settings, deployed rewrites/security headers, real database writes, and full screen-reader conformance are not established by these local checks. Existing legal/operations handoff documents still apply.

## Local evidence and extension guide

Ignored `.refactor-verification/` holds the immutable before snapshots, current snapshots/contracts and comparison results. Ignored `test-results/` holds browser evidence. They are not website assets and should not be committed. See [ARCHITECTURE.md](ARCHITECTURE.md) for component ownership, content editing and the verification commands.
