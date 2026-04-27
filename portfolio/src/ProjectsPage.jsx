import { useEffect } from 'react'
import gdscGroupImage from './assets/images/projects_images/GDSC_all_group.jpg'
import gdscWinnersImage from './assets/images/projects_images/GDSC_us_winners.jpg'
import sfuAwardImage from './assets/images/projects_images/SFU_CS_AWARD.jpeg'
import bleetVideo from './assets/videos/project_videos/bLeet _ nwHacks 2026 _ Grind Blender Smarter.mp4'
import hungryDougVideo from './assets/videos/project_videos/hungry_doug_demo.mp4'
import learnverseVideo from './assets/videos/project_videos/learnverse.mp4'
import panoramizerVideo from './assets/videos/project_videos/panoramizer.mp4'
import pathplanningVideo from './assets/videos/project_videos/pathplanning.mp4'
import unifyVideo from './assets/videos/project_videos/unify.mp4'
import unifyPreviousVideo from './assets/videos/project_videos/unify_previous.mp4'
import stockReportPdf from './assets/videos/CMPT353_Project_Report_TERP-1.pdf'
import instagramLogo from './assets/images/tech_stack/instagram 1.png'
import linkedinLogo from './assets/images/tech_stack/linkedin-original.svg'
import ThemeToggle from './ThemeToggle'
import './ProjectsPage.css'

function ProjectVideo({ src, title, variant = 'wide' }) {
  return (
    <div className={`project-video-shell project-video-shell--${variant}`}>
      <div className="project-window-bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <video src={src} title={title} autoPlay muted loop playsInline controls preload="metadata" />
    </div>
  )
}

function ProjectsPage({ onHome, onAbout, onProjects, onContact, theme, onThemeToggle }) {
  const projects = [
    {
      name: 'Unify',
      slug: 'unify',
      type: 'Mobile product',
      year: '2025',
      summary:
        'A production React Native app helping newcomers in Canada access guidance, personalized checklists, learning modules, resources, and community support.',
      video: unifyVideo,
      videoVariant: 'phone',
      cardVariant: 'phone-video',
      tags: ['React Native', 'TypeScript', 'Supabase', 'Sanity CMS', 'Resend'],
      points: [
        'Translated Figma flows into responsive mobile UI for onboarding, learning, and resource discovery.',
        'Integrated Supabase, Sanity CMS, APIs, and Resend for dynamic content and user submissions.',
        'Contributed to a launched product used by 170+ users across beta and launch.',
      ],
      processVideo: {
        src: unifyPreviousVideo,
        label: 'Development process',
        title: 'Unify build process video',
      },
    },
    {
      name: 'Learnverse',
      slug: 'learnverse',
      type: 'Award-winning education platform',
      year: '2025',
      summary:
        'A full-stack skill-trading marketplace where users exchange knowledge as currency, recognized by GDSC and the SFU CS Diversity Awards.',
      video: learnverseVideo,
      tags: ['React', 'TypeScript', 'Firebase Auth', 'Firestore', 'Cloud Functions'],
      points: [
        'Built responsive marketplace flows with search, filtering, profiles, and skill exchange interactions.',
        'Integrated Firebase Authentication and Firestore for real-time messaging and user data.',
        'Won 2nd place at a Google Developer Student Club competition and earned SFU diversity recognition.',
      ],
      featureImages: [
        { src: gdscWinnersImage, alt: 'Learnverse team receiving GDSC recognition', label: 'GDSC 2nd place' },
        { src: gdscGroupImage, alt: 'GDSC competition group photo', label: 'competition day' },
        { src: sfuAwardImage, alt: 'SFU CS Diversity Award finalist recognition', label: 'Diversity award' },
      ],
    },
    {
      name: 'PathPlanning GBNN',
      slug: 'subvision',
      type: 'Robotics algorithm',
      year: '2025',
      summary:
        'A coverage path planning system for navigating complex 3D ship hull surfaces using graph-based neural activity propagation.',
      video: pathplanningVideo,
      tags: ['Python', 'NumPy', 'KDTree', 'Matplotlib', '3D Geometry'],
      points: [
        'Converted STL mesh data into structured point cloud graphs for surface coverage planning.',
        'Used KDTree neighbor search, plane fitting, and geometric distance checks to detect obstacles.',
        'Built simulations to evaluate coverage efficiency, repetition, and dead-zone recovery.',
      ],
    },
    {
      name: 'bLeet',
      slug: 'bleet',
      type: 'AI and 3D learning platform',
      year: '2026',
      summary:
        'A practice-driven Blender learning platform where users solve 3D modeling challenges with real-time validation and AI-guided hints.',
      video: bleetVideo,
      tags: ['Python', 'Blender API', 'FastAPI', 'Next.js', 'MongoDB', 'LLaVA'],
      links: [{ href: 'https://devpost.com/software/bleet?ref_content=my-projects-tab&ref_feature=my_projects', label: 'Devpost' }],
      points: [
        'Built a Blender add-on that tracks modeling operations and compares mesh state against target solutions.',
        'Connected FastAPI, JSON-to-FBX generation, and a Next.js platform for challenge and progress workflows.',
        'Integrated multimodal AI hints using viewport images, mesh state, and action history.',
      ],
    },
    {
      name: 'Panoramizer',
      slug: 'panoramizer',
      type: 'Computer vision',
      year: '2025',
      summary:
        'A feature-based panorama stitching pipeline built around keypoint detection, robust matching, homography estimation, and image blending.',
      video: panoramizerVideo,
      tags: ['C++17', 'OpenCV', 'SIFT', 'RANSAC', 'Homography'],
      points: [
        'Implemented custom FAST and Harris corner detection for robust keypoint extraction.',
        'Matched SIFT descriptors with KNN search and Lowe\'s ratio test to filter noisy correspondences.',
        'Estimated RANSAC homographies and warped images into seamless panoramic outputs.',
      ],
    },
    {
      name: 'Hungry Doug',
      slug: 'hungry-doug',
      type: 'Java game engine',
      year: '2024',
      summary:
        'A multi-threaded 2D Java game engine with synchronized rendering, enemy behavior, collision systems, game states, and tested core logic.',
      video: hungryDougVideo,
      tags: ['Java', 'Multithreading', 'JUnit', 'Mockito', 'Maven', 'OOP'],
      points: [
        'Engineered a synchronized game loop and rendering pipeline with Canvas and BufferStrategy.',
        'Implemented AI enemy behavior and collision detection using grid-based spatial partitioning.',
        'Covered core systems with JUnit and Mockito tests across collision, input, and state transitions.',
      ],
    },
  ]

  useEffect(() => {
    window.scrollTo(0, 0)

    const nodes = document.querySelectorAll('.projects-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.15 },
    )

    nodes.forEach((node) => observer.observe(node))

    const hash = window.location.hash.slice(1)
    if (hash) {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(hash)
        if (target) target.scrollIntoView({ block: 'start' })
      })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="projects-page">
      <header className="top-nav projects-top-nav">
        <a className="left-logo-home projects-logo-link" href="/" onClick={onHome}>Rodrigo.A</a>
        <div className="nav-actions">
          <nav>
            <a href="/" onClick={onHome}>Home</a>
            <a href="/about" onClick={onAbout}>About me</a>
            <a className="is-active" href="/projects" onClick={onProjects}>Projects</a>
            <a href="/contact" onClick={onContact}>Contact</a>
          </nav>
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </header>

      <main className="projects-main">
        <section className="projects-hero projects-reveal">
          <p className="projects-eyebrow">Selected work</p>
          <div className="projects-hero-grid">
            <h1>Projects that turn ideas into working systems.</h1>
            <div className="projects-hero-side">
              <div className="projects-hero-visual" aria-hidden="true">
                <figure className="projects-hero-frame projects-hero-frame-main">
                  <img src={gdscWinnersImage} alt="" />
                </figure>
                <figure className="projects-hero-frame projects-hero-frame-secondary">
                  <img src={sfuAwardImage} alt="" />
                </figure>
              </div>
              <p>
                A focused collection of mobile apps, computer vision tools, robotics algorithms, learning platforms,
                and data experiments. Together, they show how I approach software across product, algorithms, data,
                and real-time systems.
              </p>
            </div>
          </div>
        </section>

        <section className="projects-list" aria-label="Project case studies">
          {projects.map((project, index) => (
            <article id={project.slug} className={`project-case projects-reveal ${project.cardVariant ? `project-case--${project.cardVariant}` : ''}`} key={project.name}>
              <div className="project-copy">
                <div className="project-meta">
                  <span>{project.type}</span>
                  <span>{project.year}</span>
                </div>
                <h2>{project.name}</h2>
                <p className="project-summary">{project.summary}</p>
                <ul className="project-points">
                  {project.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {project.processVideo && (
                  <div className="project-process-video">
                    <div className="project-process-label">{project.processVideo.label}</div>
                    <ProjectVideo
                      src={project.processVideo.src}
                      title={project.processVideo.title}
                      variant="process"
                    />
                  </div>
                )}
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                {project.links && (
                  <div className="project-links">
                    {project.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                        <span aria-hidden="true">-&gt;</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="project-media" style={{ '--project-delay': `${index * 80}ms` }}>
                <ProjectVideo src={project.video} title={`${project.name} project video`} variant={project.videoVariant} />
                {project.featureImages && (
                  <div className="project-image-strip">
                    {project.featureImages.map((image) => (
                      <figure key={image.label}>
                        <img src={image.src} alt={image.alt} />
                        <figcaption>{image.label}</figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>

        <section className="project-report-card projects-reveal">
          <div>
            <p className="projects-eyebrow">Data project</p>
            <h2>Stock Market Predictor</h2>
            <p>
              A Python pipeline that combines FinBERT news sentiment, Reddit signals, macroeconomic indicators, and
              historical market data into time-aligned features for short-term stock movement prediction.
            </p>
          </div>
          <div className="project-report-panel">
            <span>Python / FinBERT / XGBoost</span>
            <strong>Sentiment Prediction Pipeline</strong>
            <p>Report covering data collection, feature engineering, ensemble modeling, and results analysis.</p>
            <a href={stockReportPdf} download>
              Download PDF
              <span aria-hidden="true">-&gt;</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="projects-footer">
        <div className="footer-inner">
          <div className="footer-socials">
            <a href="https://www.instagram.com/rodr_1201/" target="_blank" rel="noreferrer">
              <img src={instagramLogo} alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/in/rodrigo-anasco/" target="_blank" rel="noreferrer">
              <img src={linkedinLogo} alt="LinkedIn" />
            </a>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="/" onClick={onHome}>Home</a>
            <a href="/about" onClick={onAbout}>About me</a>
            <a href="/projects" onClick={onProjects}>Projects</a>
            <a href="/contact" onClick={onContact}>Contact</a>
          </nav>
          <p>&copy; 2025 Rodrigo Anasco. All rights reserved</p>
        </div>
      </footer>
    </div>
  )
}

export default ProjectsPage
