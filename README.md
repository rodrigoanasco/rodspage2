# My Portfolio

This project is my personal portfolio, built to present projects, work and volunteer experience, technical skills, personal background, and contact information in a polished responsive interface.

The app is a React single page application powered by Vite. It uses lightweight custom CSS instead of a component framework, with hand-built page layouts, dark/light mode, media-rich project cards, and a contact form powered by EmailJS.

See [the architecture guide](portfolio/docs/ARCHITECTURE.md) for reusable components, content ownership, hooks, and how to extend the application.

## Tech Stack

- **React 19** for UI components and page state.
- **Vite 8** for local development, bundling, and production builds.
- **Custom CSS** split by page through files such as `App.css`, `AboutPage.css`, and `ProjectsPage.css`.
- **EmailJS** through the server-side contact API, with Cloudflare Turnstile and explicit privacy acknowledgement.
- **ESLint 9** for code quality checks.
- **Prettier** for consistent source formatting.
- **Clerk** for Blog-only identity sessions with server-side manager authorization.
- **Vercel** for deployment.

## Main Features

- Responsive landing page with animated hero, intro, experience, and tech stack sections.
- Dedicated pages for About, Projects, and Contact.
- A Blog foundation with a public landing page and manager-only authentication workspace.
- Dark/light mode toggle shared across pages.
- Project case studies with images, videos, tags, and report download links.
- Lazy-loaded videos and images to improve deployed page performance.
- Contact form with EmailJS integration.
- Custom footer and route-style navigation handled inside React.

## Project Structure

```text
rodspage2/
|-- README.md
`-- portfolio/
    |-- package.json
    |-- public/
    |   |-- favicon.svg
    |   |-- icons.svg
    |   `-- experience/
    |       `-- Work/experience images served as public assets
    `-- src/
        |-- App.jsx
        |-- App.css
        |-- AboutPage.jsx
        |-- AboutPage.css
        |-- ProjectsPage.jsx
        |-- ProjectsPage.css
        |-- ContactPage.jsx
        |-- ContactPage.css
        |-- BlogPage.jsx
        |-- BlogPage.css
        |-- components/          # Shared layout and feature components
        |-- data/                # Portfolio content and navigation definitions
        |-- hooks/               # Reusable state and browser behavior
        |-- lib/                 # Pure helpers
        |-- main.jsx
        |-- index.css
        `-- assets/
            |-- images/
            |   |-- about_me_images/
            |   |-- experience/
            |   |-- projects_images/
            |   `-- tech_stack/
            `-- videos/
                |-- CMPT353_Project_Report_TERP-1.pdf
                `-- project_videos/
```

## Key Files

- `portfolio/src/App.jsx`: Small application composition layer connecting route, theme, scroll hooks, and page entry points.
- `portfolio/src/components/home/`: The original landing hero, experience collages, volunteer cards, certificates, and technology sections.
- `portfolio/src/data/`: Static portfolio content and navigation definitions.
- `portfolio/src/components/layout/ThemeToggle.jsx`: Reusable dark/light mode toggle.
- `portfolio/src/AboutPage.jsx`: About page content, personal gallery, values, and hobbies.
- `portfolio/src/ProjectsPage.jsx`: Project list, lazy-loaded project videos, case study cards, and stock report download.
- `portfolio/src/ContactPage.jsx`: Contact page wrapper and page footer.
- `portfolio/src/BlogPage.jsx`: Public Blog landing page and manager-only Clerk session UI.
- `portfolio/api/blog/session.js`: Server-side token, verified-email, and MFA authorization check.
- `portfolio/src/components/contact/ContactSection.jsx`: Contact section composition; form behavior lives in `hooks/useContactForm.js`.
- `portfolio/src/App.css`: Global theme variables, shared nav/footer styles, home page sections, contact form styles, and responsive rules.

## Getting Started

From the repository root:

```bash
cd portfolio
npm install
npm run dev
```

The development server normally runs at:

```text
http://localhost:5173/
```

## Available Scripts

Run these from `portfolio/`:

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build in `portfolio/dist/`.

```bash
npm run lint
```

Runs ESLint across the project.

```bash
npm run preview
```

Serves the production build locally for testing.

## Deployment

The project is designed to deploy from the `portfolio/` directory.

Recommended Vercel settings:

- **Framework Preset:** Vite
- **Root Directory:** `portfolio`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

Because the app handles simple client-side routing, Vercel should serve the SPA fallback correctly for routes such as `/about`, `/projects`, and `/contact`.

## Media and Performance Notes

The portfolio uses many images and videos, so media optimization matters a lot in production.

Current code-level optimizations include:

- Lazy loading for non-critical images.
- Async image decoding.
- High fetch priority for important first-view images.
- Project videos only attach their `src` when they are near the viewport.

Recommended asset targets:

- Hero/large images: keep around **300 KB - 1 MB**.
- Gallery/card images: keep around **150 KB - 500 KB**.
- Project videos: aim for **3 MB - 8 MB** each when possible.

Example video compression command:

```bash
ffmpeg -i input.mp4 -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart output.mp4
```

## Contact Form

The contact form submits to the server-side `/api/contact` function after explicit privacy acknowledgement and a Turnstile check. Name is optional. EmailJS credentials remain in server environment variables; only the Turnstile site key is public. See `portfolio/README.md` for configuration and `portfolio/docs/LEGAL_AND_PRIVACY_REVIEW.md` for the implementation review and outstanding owner confirmations.

## Notes for Future Updates

- Keep page-specific styling in the matching CSS file when possible.
- Reuse `ThemeToggle.jsx` if adding another page with navigation.
- Compress new media before committing it.
- Run `npm run lint` and `npm run build` before deploying.
