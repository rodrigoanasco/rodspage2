# Portfolio code structure

The portfolio uses React and Vite. This organization separates page composition, reusable views, content, and state while retaining the existing design, route URLs, CSS hooks, and privacy behavior.

## Where code belongs

```text
portfolio/
  src/
    App.jsx                    Application composition and lazy page boundaries
    *Page.jsx                  Public route entry points
    BlogEditor.jsx             Author editor composition; isolated fixture entry point
    BlogPosts.jsx              Public blog list composition
    blog-api.js                Authenticated/public blog request boundary
    components/
      layout/                  Header, footer, navigation, social/policy links, theme control
      home/                    Hero, experience, volunteering, certificates, technology stack
      about/                   About sections and photo galleries
      projects/                Project cards, lazy video, hero and report section
      contact/                 Contact introduction, form, fields and privacy notice
      blog/                    Author dialog, authentication, post cards/composer/preview
      legal/                   Policy header, footer and section presentation
      media/                   Shared decorative media window chrome
    data/                      Portfolio content, navigation and public site identity
    hooks/                     Navigation, theme, reveal, media query, form/editor/list state
    lib/                       Pure draft factory and blog authentication helpers
    assets/                    Existing images, videos and document imports
  shared/blog-video.js          Pure video-URL policy shared by browser and server
  api/                         Vercel request handlers and server validation
  server/                      Authorization, database ownership and bounded abuse limiter
  tests/                       Node tests and Playwright browser scenarios
  scripts/                     Explicit database operations and local visual verification
  public/                      Directly served assets and font license notices
```

Page entry points stay at `src/*Page.jsx` so route composition is easy to find. Feature components live together rather than mixing unrelated cards and hooks in a generic folder. Page-specific CSS stays beside the page entry point; component extraction preserves its existing selectors.

## Adding or changing content

- Home experience, volunteering, certificates and technologies: `src/data/homeContent.js`.
- About text groups, photos and hobbies: `src/data/aboutContent.js` and the named About sections.
- Project case studies and imported media: `src/data/projectContent.js`.
- Policy copy and its update date: `src/data/legalContent.jsx`. This is JSX because legal paragraphs contain intentional links and emphasis.
- Main/policy route definitions: `src/data/navigation.js`.
- Public brand/contact/social information used by shared layout: `src/data/site.js`.

Content records use named properties rather than positional arrays where appropriate. Never put credentials, private inquiries, provider configuration secrets, or unpublished blog data in these browser modules.

The About page is a continuous personal article. `AboutIntroduction`, `AboutWorkNotes`, `AboutPersonalSection`, and `AboutHobbiesSection` compose first-person paragraphs, plain topic headings, and contextual photo spreads. Desktop work photos sit beside the writing; narrower screens place them below it. `AboutPhoto` owns image dimensions, accessible descriptions, loading priority, and plain captions; `AboutPhotoGallery` lays out photo records. Keep copy specific; avoid reintroducing numbered goal cards, personality cards, or decorative section labels. All 13 photos and the Peru flag remain in the page, with the surfing photo grouped with the hobbies.

## Reusing views

`SiteHeader` and `SiteFooter` are the single implementations used by the five main public pages. Their `variant` retains each page's CSS classes, and `navigation` maps route names to the application's existing navigation handlers. `SiteNavigation` owns link ordering; `LegalLinks` also serves the policy-to-policy navigation through its `className` prop.

Repeatable content uses domain components such as `ExperienceCard`, `VolunteerCard`, `CertificateCard`, `ProjectCard`, `PublishedPostCard`, and `AboutPhotoGallery`. `WindowChrome` is shared by the contact form and project videos. Reuse a component when its behavior or structure actually repeats. A single paragraph or a layout-only wrapper does not need a separate component.

## State and effects

- `usePortfolioNavigation`: route reading, browser history, home section links and project-detail navigation.
- `useThemePreference`: local theme preference and document theme attributes.
- `useHomeScrollPresentation`: existing hero/reveal behavior; state remains above page mount boundaries.
- `useRevealOnScroll`, `useScrollToTop`, `useMediaQuery`: small reusable browser behaviors with effect cleanup.
- `useContactForm`: input state, explicit acknowledgement, token lifecycle, submission and feedback.
- `usePublishedPosts`: public pagination, loading/errors/retry and aborted request cleanup.
- `useBlogEditor`: draft selection, dirty/busy state, save/publish/unpublish and discard guards.

Keep state at the lowest owner that preserves the required lifetime. Presentational components receive data and callbacks. Do not copy live server data into static content modules or replace the established server-side access checks with client state.

## HTML and accessibility

Use sections for named page topics, articles for independently meaningful cards/posts, headings for hierarchy, paragraphs for prose, lists for collections, figures/captions for media, and navigation landmarks for link or pagination groups. Layout-only `div` and inline `span` elements remain appropriate. Preserve existing class names, IDs, labels and focus behavior when changing a tag; native margins can otherwise change the UI.

The blog text view is a paragraph with preserved whitespace and zero added margin. It still renders submitted text safely through React. Public and editor pagination share a named navigation component. The author workspace keeps the native dialog, Escape/Close behavior, focus restoration, body-scroll restoration, URL state and unsaved/busy guards.

## Server and privacy boundaries

API handlers remain server-only. Clerk session verification, verified manager email/MFA requirements, storage authorization and contact validation retain their existing interfaces. The browser's video-link policy is also applied by server validation through `shared/blog-video.js`; browser checks never replace server checks.

Turnstile mounts only after explicit contact acknowledgement, and withdrawing acknowledgement clears the token. Clerk initializes inside the explicitly opened author workspace. Raw provider errors, credentials, draft content and contact messages must not be logged or added to browser storage.

Database setup scripts remain explicit operations. Formatting or testing does not run them or send real contact messages.

## Formatting and verification

Projects uses the same journal typography as About. Its route is lazy-loaded; project
videos use an explicit Play button and pause offscreen. Media derivatives, regeneration,
and measured checks are documented in [PROJECTS_PERFORMANCE.md](PROJECTS_PERFORMANCE.md).

Run from `portfolio/`:

```sh
npm run format
npm run format:check
npm run lint
npm test
npm run build
npm run test:e2e
```

Prettier configuration lives in `.prettierrc.json`. Formatting covers first-party frontend/server code, tests, scripts and root configuration. Dependency/build output, media, license files and generated browser evidence are excluded. ESLint also ignores generated evidence directories so it cannot race Playwright while those directories are recreated.

`scripts/verify-refactor.mjs` can capture a local visual/DOM baseline before a structural change and compare afterward:

```sh
node scripts/verify-refactor.mjs capture
# Make the intended structural changes.
node scripts/verify-refactor.mjs compare
```

Capture runs before editing; never overwrite the baseline to conceal a regression. The script owns local port 5174, stubs public blog data, masks video frames, and writes screenshots/contracts into ignored `.refactor-verification/`. These artifacts are local evidence and are not part of the website. Normal browser tests use port 5173 and stub provider/API interactions.

The obsolete, unreferenced `ExperienceChapters` alternative was removed. The active home page uses the original experience collages and volunteer cards. No portfolio photos, project videos, certificates or public assets were removed in this refactor.
