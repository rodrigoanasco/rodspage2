# Rodrigo Anasco Portfolio

A personal portfolio website for Rodrigo Anasco, built to present projects, work and volunteer experience, technical skills, personal background, and contact information in a polished responsive interface.

The app is a React single page application powered by Vite. It uses lightweight custom CSS instead of a component framework, with hand-built page layouts, dark/light mode, media-rich project cards, and a contact form powered by EmailJS.

## Tech Stack

- **React 19** for UI components and page state.
- **Vite 8** for local development, bundling, and production builds.
- **Custom CSS** split by page through files such as `App.css`, `AboutPage.css`, and `ProjectsPage.css`.
- **EmailJS** through `@emailjs/browser` for the contact form.
- **ESLint 9** for code quality checks.
- **Vercel** for deployment.

## Main Features

- Responsive landing page with animated hero, intro, experience, and tech stack sections.
- Dedicated pages for About, Projects, and Contact.
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
        |-- ContactSection.jsx
        |-- ThemeToggle.jsx
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

- `portfolio/src/App.jsx`: Home page, custom routing, theme state, landing hero, experience section, tech stack, and footer.
- `portfolio/src/ThemeToggle.jsx`: Reusable dark/light mode toggle.
- `portfolio/src/AboutPage.jsx`: About page content, personal gallery, values, and hobbies.
- `portfolio/src/ProjectsPage.jsx`: Project list, lazy-loaded project videos, case study cards, and stock report download.
- `portfolio/src/ContactPage.jsx`: Contact page wrapper and page footer.
- `portfolio/src/ContactSection.jsx`: Contact form and EmailJS submission logic.
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

The contact form uses EmailJS in `ContactSection.jsx`. The service ID, template ID, public key, recipient name, and recipient email are configured in that file.

If these values change, update:

```text
portfolio/src/ContactSection.jsx
```

## Notes for Future Updates

- Keep page-specific styling in the matching CSS file when possible.
- Reuse `ThemeToggle.jsx` if adding another page with navigation.
- Compress new media before committing it.
- Run `npm run lint` and `npm run build` before deploying.
