import { useEffect, useMemo, useState } from 'react'
import AboutPage from './AboutPage'
import ContactPage from './ContactPage'
import ProjectsPage from './ProjectsPage'
import ThemeToggle from './ThemeToggle'
import landingImage from './assets/images/landing_page_image.png'
import unifyLogo from './assets/images/Experience/unify_logo.png'
import subvisionLogo from './assets/images/Experience/subvision_logo.png'
import ficLogo from './assets/images/Experience/fic_logo.png'
import yresLogo from './assets/images/Experience/york_region_educational_services 1.png'
import instagramLogo from './assets/images/tech_stack/instagram 1.png'
import linkedinLogo from './assets/images/tech_stack/linkedin-original.svg'
import cLogo from './assets/images/tech_stack/c-original.svg'
import cPlusPlusLogo from './assets/images/tech_stack/cplusplus-original.svg'
import cssLogo from './assets/images/tech_stack/css3-original.svg'
import dockerLogo from './assets/images/tech_stack/docker-original.svg'
import firebaseLogo from './assets/images/tech_stack/firebase-original.svg'
import githubLogo from './assets/images/tech_stack/github-original.svg'
import javaLogo from './assets/images/tech_stack/java-original.svg'
import javascriptLogo from './assets/images/tech_stack/javascript-original.svg'
import kaggleLogo from './assets/images/tech_stack/kaggle-original.svg'
import latexLogo from './assets/images/tech_stack/latex-original.svg'
import linuxLogo from './assets/images/tech_stack/linux-original.svg'
import mysqlLogo from './assets/images/tech_stack/mysql-original.svg'
import nodeLogo from './assets/images/tech_stack/nodejs-original.svg'
import numpyLogo from './assets/images/tech_stack/numpy-original.svg'
import pandasLogo from './assets/images/tech_stack/pandas-original.svg'
import postgresLogo from './assets/images/tech_stack/postgresql-original.svg'
import awsLogo from './assets/images/tech_stack/amazonwebservices-original-wordmark.svg'
import pythonLogo from './assets/images/tech_stack/python-original.svg'
import reactLogo from './assets/images/tech_stack/react-original.svg'
import slackLogo from './assets/images/tech_stack/slack-original.svg'
import tailwindLogo from './assets/images/tech_stack/tailwindcss-original.svg'
import vscodeLogo from './assets/images/tech_stack/vscode-original.svg'
import jupyterLogo from './assets/images/tech_stack/jupyter-original.svg'
import openapiLogo from './assets/images/tech_stack/openapi-original.svg'
import cmakeLogo from './assets/images/tech_stack/cmake-original.svg'
import androidStudioLogo from './assets/images/tech_stack/androidstudio-original.svg'
import supabaseLogo from './assets/images/tech_stack/supabase-original.svg'
import opencvLogo from './assets/images/tech_stack/opencv-original.svg'
import bashLogo from './assets/images/tech_stack/bash-original.svg'
import pytorchLogo from './assets/images/tech_stack/pytorch-original.svg'
import matplotlibLogo from './assets/images/tech_stack/matplotlib-original.svg'
import './App.css'

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const scrollToPageTop = (behavior = 'auto') => {
  window.scrollTo({ top: 0, left: 0, behavior })
}

const getInitialTheme = () => {
  try {
    const savedTheme = window.localStorage.getItem('theme')
    return savedTheme === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function OptionalExperienceImage({ src, fallback, alt, label, className = '', style }) {
  const [failed, setFailed] = useState(false)
  const imageSource = failed ? fallback : src

  return (
    <figure className={`experience-image-card ${className}`} style={style}>
      <img src={imageSource} alt={alt} onError={() => setFailed(true)} />
      <figcaption>{label}</figcaption>
    </figure>
  )
}

function App() {
  const [route, setRoute] = useState(() => {
    if (window.location.pathname === '/about') return 'about'
    if (window.location.pathname === '/projects') return 'projects'
    if (window.location.pathname === '/contact') return 'contact'
    return 'home'
  })
  const [pendingHash, setPendingHash] = useState(null)
  const [theme, setTheme] = useState(getInitialTheme)
  const [introVisible, setIntroVisible] = useState(false)
  const [workVisible, setWorkVisible] = useState(false)
  const [stackVisible, setStackVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState({
    hero: 0,
  })

  const featuredExperiences = useMemo(
    () => [
      {
        id: 'unify',
        period: 'Aug 2025 - Present',
        company: 'Unify Social',
        role: 'Software Coordinator',
        location: 'Burnaby, BC',
        headline: 'A newcomer platform built around guidance, community, and confidence.',
        summary:
          'Unify helps newcomers in Canada navigate disconnected resources by bringing learning content, personalized settlement tasks, AI support, community spaces, and local events into one digital experience.',
        highlights: [
          'Translated Figma product flows into responsive React Native and TypeScript mobile screens.',
          'Connected Supabase, Sanity CMS, APIs, and Resend workflows for dynamic onboarding and checklist experiences.',
          'Supported product iteration across mobile, content, and community features for a launched newcomer support app.',
        ],
        facts: ['Digital settlement platform', 'Learn + checklist + community', 'In-person newcomer events'],
        projectHash: 'unify',
        logo: unifyLogo,
        accent: 'warm',
        media: [
          {
            src: '/experience/unify-phone.png',
            fallback: unifyLogo,
            alt: 'Unify Social mobile app screen',
            label: 'Mobile learning flow',
            className: 'portrait-card contain-card',
            fromX: -170,
            fromY: 70,
            rotate: -8,
            delay: 0,
            zIndex: 2,
          },
          {
            src: '/experience/unify-group-formal.jpg',
            fallback: unifyLogo,
            alt: 'Unify Social formal team group photo',
            label: 'Launch team',
            className: 'wide-card',
            fromX: 190,
            fromY: 45,
            rotate: 5,
            delay: 0.015,
            zIndex: 4,
          },
          {
            src: '/experience/unify-group-social.jpg',
            fallback: unifyLogo,
            alt: 'Unify Social community group photo',
            label: 'Team Social',
            className: 'small-card',
            fromX: -110,
            fromY: 190,
            rotate: 7,
            delay: 0.03,
            zIndex: 3,
          },
          {
            src: '/experience/unify-live-appstore.jpg',
            fallback: unifyLogo,
            alt: 'Unify Social is live on the App Store',
            label: 'App Store launch',
            className: 'wide-card lower-card contain-card',
            fromX: 130,
            fromY: 170,
            rotate: -5,
            delay: 0.045,
            zIndex: 1,
          },
        ],
      },
      {
        id: 'subvision',
        period: 'Feb 2025 - Jan 2026',
        company: 'Subvision Robotics',
        role: 'Software Developer',
        location: 'Burnaby, BC',
        headline: 'A subsea robotics company taking a prevention-first approach to hull maintenance.',
        summary:
          'Subvision is building ZIMA, a hull-climbing subsea rover designed to stop early-stage biofouling before it becomes drag, using repeatable maintenance passes, close-range UV-C treatment, and real-world hardware iteration.',
        highlights: [
          'Worked on autonomous coverage planning for complex 3D ship hull surfaces.',
          'Built Python, NumPy, and KDTree pipelines that convert mesh data into point-cloud graph structures.',
          'Created simulation and visualization tooling to study coverage efficiency, repeated traversal, and dead-zone recovery.',
        ],
        facts: ['ZIMA subsea rover', 'Hull-climbing mobility', 'Coverage planning software'],
        projectHash: 'subvision',
        logo: subvisionLogo,
        accent: 'cool',
        media: [
          {
            src: '/experience/subvision-robot.jpg',
            fallback: subvisionLogo,
            alt: 'Subvision Robotics wheeled robot prototype',
            label: 'Prototype hardware',
            className: 'portrait-card',
            fromX: 170,
            fromY: 50,
            rotate: 6,
            delay: 0.015,
            zIndex: 2,
          },
          {
            src: '/experience/subvision-cad.jpg',
            fallback: subvisionLogo,
            alt: 'Subvision Robotics CAD assembly',
            label: 'Mechanical model',
            className: 'wide-card',
            fromX: -130,
            fromY: 190,
            rotate: 4,
            delay: 0.03,
            zIndex: 3,
          },
          {
            src: '/experience/subvision-hull-points.jpg',
            fallback: subvisionLogo,
            alt: '3D point cloud graph of a ship hull',
            label: 'Coverage simulation',
            className: 'wide-card lower-card',
            fromX: 120,
            fromY: 180,
            rotate: -5,
            delay: 0.045,
            zIndex: 1,
          },
        ],
      },
    ],
    [],
  )

  const volunteerExperiences = useMemo(
    () => [
      {
        period: 'Mar 2024 - Present',
        company: 'York Region Educational Services',
        role: 'Data Analytics & Web Design',
        description:
          'Collected, cleaned, and analyzed data for decision making while supporting user-friendly website design and maintenance.',
        logo: yresLogo,
      },
      {
        period: 'Aug 2023 - Apr 2026',
        company: 'Fraser International College',
        role: 'Peer Educator',
        description:
          'Tutored computing and math courses, created study materials, and helped students build confidence through personalized guidance.',
        logo: ficLogo,
      },
    ],
    [],
  )

  const techStack = useMemo(
    () => [
      cLogo,
      cPlusPlusLogo,
      cssLogo,
      dockerLogo,
      firebaseLogo,
      githubLogo,
      javaLogo,
      javascriptLogo,
      kaggleLogo,
      latexLogo,
      linuxLogo,
      mysqlLogo,
      nodeLogo,
      numpyLogo,
      pandasLogo,
      postgresLogo,
      awsLogo,
      pythonLogo,
      reactLogo,
      slackLogo,
      tailwindLogo,
      vscodeLogo,
      jupyterLogo,
      openapiLogo,
      cmakeLogo,
      androidStudioLogo,
      supabaseLogo,
      opencvLogo,
      bashLogo,
      pytorchLogo,
      matplotlibLogo,
    ],
    [],
  )
  const techTrackA = useMemo(() => techStack.slice(0, Math.ceil(techStack.length / 2)), [techStack])
  const techTrackB = useMemo(() => techStack.slice(Math.ceil(techStack.length / 2)), [techStack])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    try {
      window.localStorage.setItem('theme', theme)
    } catch {
      // Theme still updates even if storage is unavailable.
    }
  }, [theme])

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return undefined

    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useEffect(() => {
    const onPopState = () => {
      let nextRoute = 'home'
      if (window.location.pathname === '/about') nextRoute = 'about'
      if (window.location.pathname === '/projects') nextRoute = 'projects'
      if (window.location.pathname === '/contact') nextRoute = 'contact'
      if (nextRoute !== 'home') scrollToPageTop()

      setRoute(nextRoute)
      setPendingHash({ hash: window.location.hash })
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    if (route !== 'home') return
    if (pendingHash === null) return

    const hash = pendingHash.hash

    if (!hash) {
      scrollToPageTop('smooth')
      return
    }

    window.requestAnimationFrame(() => {
      const target = document.querySelector(hash)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    })
  }, [pendingHash, route])

  useEffect(() => {
    if (route !== 'home') return undefined

    const readProgress = (id, offset = 0) => {
      const node = document.getElementById(id)
      if (!node) return 0
      const rect = node.getBoundingClientRect()
      const total = rect.height + window.innerHeight
      return clamp((window.innerHeight - rect.top + offset) / total)
    }

    const readHeroProgress = () => {
      const node = document.getElementById('home')
      if (!node) return 0
      const heroStart = node.offsetTop
      const heroScrollable = Math.max(node.offsetHeight - window.innerHeight, 1)
      return clamp((window.scrollY - heroStart) / heroScrollable)
    }

    const onScroll = () => {
      const hero = readHeroProgress()
      const intro = readProgress('about', 80)
      const work = readProgress('experience', 100)
      const stack = readProgress('stack', 120)

      setScrollProgress({
        hero,
      })

      if (intro > 0.2) setIntroVisible(true)
      if (work > 0.2) setWorkVisible(true)
      if (stack > 0.2) setStackVisible(true)

      if (hero < 0.42) {
        setIntroVisible(false)
        setWorkVisible(false)
        setStackVisible(false)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [route])

  const navigateToHomeSection = (hash = '') => (event) => {
    event.preventDefault()
    const nextPath = hash ? `/${hash}` : '/'

    if (window.location.pathname !== '/' || window.location.hash !== hash) {
      window.history.pushState({}, '', nextPath)
    }

    if (!hash) scrollToPageTop()
    setRoute('home')
    setPendingHash({ hash })
  }

  const navigateToAbout = (event) => {
    event.preventDefault()

    if (window.location.pathname !== '/about') {
      window.history.pushState({}, '', '/about')
    }

    scrollToPageTop()
    setRoute('about')
    setPendingHash(null)
  }

  const navigateToProjects = (event) => {
    event.preventDefault()

    if (window.location.pathname !== '/projects' || window.location.hash) {
      window.history.pushState({}, '', '/projects')
    }

    scrollToPageTop()
    setRoute('projects')
    setPendingHash(null)
  }

  const navigateToProjectDetail = (hash) => (event) => {
    event.preventDefault()
    window.history.pushState({}, '', `/projects#${hash}`)
    scrollToPageTop()
    setRoute('projects')
    setPendingHash(null)
  }

  const navigateToContact = (event) => {
    event.preventDefault()

    if (window.location.pathname !== '/contact') {
      window.history.pushState({}, '', '/contact')
    }

    scrollToPageTop()
    setRoute('contact')
    setPendingHash(null)
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  const heroTextOpacity = clamp(1 - scrollProgress.hero / 0.35)
  const heroImageOpacity =
    scrollProgress.hero < 0.2625
      ? 1
      : clamp(1 - (scrollProgress.hero - 0.2625) / 0.17)
  const welcomeOpacity =
    scrollProgress.hero < 0.48
      ? 0
      : clamp((scrollProgress.hero - 0.48) / 0.1)

  if (route === 'about') {
    return (
      <AboutPage
        onHome={navigateToHomeSection()}
        onAbout={navigateToAbout}
        onProjects={navigateToProjects}
        onContact={navigateToContact}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
    )
  }

  if (route === 'projects') {
    return (
      <ProjectsPage
        onHome={navigateToHomeSection()}
        onAbout={navigateToAbout}
        onProjects={navigateToProjects}
        onContact={navigateToContact}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
    )
  }

  if (route === 'contact') {
    return (
      <ContactPage
        onHome={navigateToHomeSection()}
        onAbout={navigateToAbout}
        onProjects={navigateToProjects}
        onContact={navigateToContact}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
    )
  }

  return (
    <div className="page">
      <section id="home" className="hero-section">
        <div className="hero-sticky">
          <img
            src={landingImage}
            alt="Rodrigo Anasco portrait"
            className="hero-background-image"
            style={{ opacity: heroImageOpacity }}
          />
          <header className="top-nav">
            <span className="left-logo-home">Rodrigo.A</span>
            <div className="nav-actions">
              <nav>
                <a href="/" onClick={navigateToHomeSection()}>Home</a>
                <a href="/about" onClick={navigateToAbout}>About me</a>
                <a href="/projects" onClick={navigateToProjects}>Projects</a>
                <a href="/contact" onClick={navigateToContact}>Contact</a>
              </nav>
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
          </header>

          <div className="hero-title-layer" style={{ opacity: heroTextOpacity }}>
            <div className="hero-name-row">
              <div className="rectangle rectangle-1">
                <div className="name-and-email">
                  <h1 className="rodrigo">Rodrigo</h1>
                  <p className="hero-email">ro.anasco.s@gmail.com</p>
                </div>
              </div>
              <div className="rectangle rectangle-2">
                <div className="name-text-wrap">
                  <h1 className="anasco">Añasco</h1>
                </div>
              </div>
            </div>
          </div>
          <div
            className="welcome-overlay"
            style={{
              opacity: welcomeOpacity,
              transform: `translateY(${(1 - welcomeOpacity) * 14}px)`,
            }}
          >
            welcome to my page :)
          </div>
        </div>
      </section>

      <main className="background">
        <div className="content-shell">
          <section id="about" className={`about-section ${introVisible ? 'is-visible' : ''}`}>
            <div className="about-copy">
              <p className="intro-kicker from-left">I enjoy...</p>
              <h2 className="intro-statement">
                <span className="intro-line from-right">building full stack applications and</span>
                <span className="intro-line from-left">data driven systems, turning ideas</span>
                <span className="intro-line from-right">into real working solutions.</span>
              </h2>
              <p className="intro-support from-left">
                I move between product, mobile, backend, and robotics work, with a focus on clean interfaces and useful systems.
              </p>
            </div>
          </section>

          <section id="experience" className={`experience-wrapper ${workVisible ? 'is-visible' : ''}`}>
            <div className="experience-inner">
              <div className="experience-section-heading">
                <p>Work & volunteer experience</p>
                <h2>Building with people, products, and machines.</h2>
              </div>

              <div className="experience-showcase">
                {featuredExperiences.map((experience, index) => {
                  const mainMediaIndex = experience.id === 'unify' ? 1 : 0
                  const mainMedia = experience.media[mainMediaIndex]
                  const supportingMedia = experience.media.filter((_, mediaIndex) => mediaIndex !== mainMediaIndex)

                  return (
                    <article
                      key={experience.id}
                      className={`experience-panel experience-panel-${experience.accent} ${index % 2 ? 'experience-panel-reverse' : ''}`}
                    >
                      <div className="experience-media-cloud">
                        <OptionalExperienceImage
                          src={mainMedia.src}
                          fallback={mainMedia.fallback}
                          alt={mainMedia.alt}
                          label={mainMedia.label}
                          className={`${mainMedia.className} experience-media-main`}
                        />

                        <div className="experience-media-strip">
                          {supportingMedia.map((item) => (
                            <OptionalExperienceImage
                              key={`${experience.id}-${item.label}`}
                              src={item.src}
                              fallback={item.fallback}
                              alt={item.alt}
                              label={item.label}
                              className={`${item.className} experience-media-thumb`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="experience-copy">
                        <div className="experience-company-row">
                          <img src={experience.logo} alt={`${experience.company} logo`} />
                          <div>
                            <p className="experience-period">{experience.period} / {experience.location}</p>
                            <h3>{experience.company}</h3>
                            <p className="experience-role">{experience.role}</p>
                          </div>
                        </div>
                        <h4>{experience.headline}</h4>
                        <p className="experience-summary">{experience.summary}</p>
                        <ul className="experience-highlights">
                          {experience.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                        <div className="experience-facts">
                          {experience.facts.map((fact) => (
                            <span key={fact}>{fact}</span>
                          ))}
                        </div>
                        <a
                          className="experience-cta"
                          href={`/projects#${experience.projectHash}`}
                          onClick={navigateToProjectDetail(experience.projectHash)}
                        >
                          Learn more about what I did
                          <span aria-hidden="true">-&gt;</span>
                        </a>
                      </div>
                    </article>
                  )
                })}

                <article className="volunteer-panel">
                  <div className="volunteer-story">
                    <div className="volunteer-intro">
                      <p className="experience-period">Community-facing work</p>
                      <h3>Helping others learn, feel supported, and move forward.</h3>
                    </div>
                    <div className="volunteer-grid">
                      {volunteerExperiences.map((experience) => (
                        <article className="volunteer-card" key={experience.company}>
                          <img src={experience.logo} alt={`${experience.company} logo`} />
                          <div>
                            <p className="experience-period">{experience.period}</p>
                            <h3>{experience.company}</h3>
                            <h4>{experience.role}</h4>
                          </div>
                          <p>{experience.description}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section id="stack" className={`stack-section ${stackVisible ? 'is-visible' : ''}`}>
            <h2 className="stack-title">My Tech Stack</h2>
            <p className="stack-subtitle">Tools and technologies I work with</p>

            <div id="projects" className="stack-carousel">
              <div className="stack-track stack-track-a">
                {[...techTrackA, ...techTrackA].map((logo, index) => (
                  <div className="stack-pill" key={`${logo}-a-${index}`}>
                    <img src={logo} alt="Technology logo" />
                  </div>
                ))}
              </div>
              <div className="stack-track stack-track-b">
                {[...techTrackB, ...techTrackB].map((logo, index) => (
                  <div className="stack-pill" key={`${logo}-b-${index}`}>
                    <img src={logo} alt="Technology logo" />
                  </div>
                ))}
              </div>
            </div>
            <a className="stack-projects-teaser" href="/projects" onClick={navigateToProjects}>
              <span>Come see my projects</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </section>
        </div>
      </main>

      <footer>
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
            <a href="/" onClick={navigateToHomeSection()}>Home</a>
            <a href="/about" onClick={navigateToAbout}>About me</a>
            <a href="/projects" onClick={navigateToProjects}>Projects</a>
            <a href="/contact" onClick={navigateToContact}>Contact</a>
          </nav>
          <p>&copy; 2025 Rodrigo Anasco. All rights reserved</p>
        </div>
      </footer>
    </div>
  )
}

export default App
