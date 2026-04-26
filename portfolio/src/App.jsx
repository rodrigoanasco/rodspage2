import { useEffect, useMemo, useState } from 'react'
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
const phase = (value, start, end) => clamp((value - start) / (end - start))

const titleWordTimeline = [
  { label: 'Work', start: -0.02, end: 0.18 },
  { label: 'and', start: 0.19, end: 0.34 },
  { label: 'Volunteer', start: 0.35, end: 0.52 },
  { label: 'Experience', start: 0.53, end: 0.68 },
]

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
  const [introVisible, setIntroVisible] = useState(false)
  const [workVisible, setWorkVisible] = useState(false)
  const [stackVisible, setStackVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState({
    hero: 0,
    experience: 0,
  })

  const featuredExperiences = useMemo(
    () => [
      {
        id: 'unify',
        period: 'Aug 2025 - Present',
        company: 'Unify Social',
        role: 'Software Coordinator',
        location: 'Burnaby, BC',
        summary:
          'Building mobile experiences that help newcomers in Canada find guidance, community, and practical next steps.',
        highlights: [
          'Developed React Native and TypeScript features from Figma designs into production-ready mobile UI.',
          'Integrated Supabase and Sanity CMS for dynamic content, onboarding, and personalized checklist flows.',
          'Built API and Resend workflows for user submissions and internal communication.',
          'Contributed to a live product used by 170+ users across beta and launch.',
        ],
        logo: unifyLogo,
        accent: 'warm',
        media: [
          {
            src: '/experience/unify-phone.png',
            fallback: unifyLogo,
            alt: 'Unify Social mobile app screen',
            label: 'Mobile learning flow',
            className: 'portrait-card',
            fromX: -170,
            fromY: 70,
            rotate: -8,
            delay: 0,
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
          },
          {
            src: '/experience/unify-group-social.jpg',
            fallback: unifyLogo,
            alt: 'Unify Social community group photo',
            label: 'Community work',
            className: 'small-card',
            fromX: -110,
            fromY: 190,
            rotate: 7,
            delay: 0.03,
          },
          {
            src: '/experience/unify-live-appstore.jpg',
            fallback: unifyLogo,
            alt: 'Unify Social is live on the App Store',
            label: 'App Store launch',
            className: 'wide-card lower-card',
            fromX: 130,
            fromY: 170,
            rotate: -5,
            delay: 0.045,
          },
        ],
      },
      {
        id: 'subvision',
        period: 'Feb 2025 - Jan 2026',
        company: 'Subvision Robotics',
        role: 'Software Developer',
        location: 'Burnaby, BC',
        summary:
          'Designing autonomous navigation and coverage path planning tools for complex 3D ship hull environments.',
        highlights: [
          'Designed a graph-based neural network approach for efficient surface coverage on STL-derived point cloud graphs.',
          'Built Python, NumPy, and KDTree pipelines for spatial neighbor search and structured 3D graph generation.',
          'Implemented obstacle detection with plane fitting and geometric distance analysis for non-traversable regions.',
          'Created matplotlib simulations to validate coverage efficiency, repetition, and dead-zone recovery strategies.',
        ],
        logo: subvisionLogo,
        accent: 'cool',
        media: [
          {
            src: '/experience/subvision_logo.png',
            fallback: subvisionLogo,
            alt: 'Subvision Robotics logo',
            label: 'Robotics platform',
            className: 'logo-card',
            fromX: -160,
            fromY: 100,
            rotate: -6,
            delay: 0,
          },
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
      linkedinLogo,
    ],
    [],
  )
  const techTrackA = useMemo(() => techStack.slice(0, Math.ceil(techStack.length / 2)), [techStack])
  const techTrackB = useMemo(() => techStack.slice(Math.ceil(techStack.length / 2)), [techStack])

  useEffect(() => {
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

    const readStickyProgress = (id) => {
      const node = document.getElementById(id)
      if (!node) return 0
      const rect = node.getBoundingClientRect()
      const scrollable = Math.max(node.offsetHeight - window.innerHeight, 1)
      return clamp(-rect.top / scrollable)
    }

    const onScroll = () => {
      const hero = readHeroProgress()
      const intro = readProgress('about', 80)
      const work = readProgress('experience', 100)
      const stack = readProgress('stack', 120)
      const experience = readStickyProgress('experience')

      setScrollProgress({
        hero,
        experience,
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
  }, [])

  const heroTextOpacity = clamp(1 - scrollProgress.hero / 0.35)
  const heroImageOpacity =
    scrollProgress.hero < 0.2625
      ? 1
      : clamp(1 - (scrollProgress.hero - 0.2625) / 0.17)
  const welcomeOpacity =
    scrollProgress.hero < 0.48
      ? 0
      : clamp((scrollProgress.hero - 0.48) / 0.1)

  const getTitleWordStyle = ({ start, end }) => {
    const progress = phase(scrollProgress.experience, start, end)
    const opacity = progress <= 0 || progress >= 1 ? 0 : Math.sin(progress * Math.PI)
    const y = 120 - progress * 250

    return {
      opacity,
      transform: `translate3d(0, ${y}px, 0)`,
    }
  }

  const assembledTitleProgress = phase(scrollProgress.experience, 0.66, 0.74)
  const assembledTitleLift = phase(scrollProgress.experience, 0.78, 0.84)
  const assembledTitleOpacity = assembledTitleProgress * (1 - phase(scrollProgress.experience, 0.96, 1))
  const assembledTitleStyle = {
    opacity: assembledTitleOpacity,
    transform: `translate3d(0, ${(1 - assembledTitleProgress) * 52 - assembledTitleLift * 28}px, 0)`,
  }

  const getPanelStyle = (start, end) => {
    const enter = phase(scrollProgress.experience, start, start + 0.06)
    const exit = end >= 1 ? 0 : phase(scrollProgress.experience, end - 0.04, end)
    const opacity = enter * (1 - exit)

    return {
      opacity,
      transform: `translate3d(0, ${(1 - enter) * 46 - exit * 70}px, 0)`,
      pointerEvents: opacity > 0.12 ? 'auto' : 'none',
    }
  }

  const getTextStyle = (start) => {
    const enter = phase(scrollProgress.experience, start + 0.045, start + 0.085)

    return {
      opacity: enter,
      transform: `translate3d(0, ${(1 - enter) * 24}px, 0)`,
    }
  }

  const getMediaStyle = (panelStart, panelEnd, item) => {
    const enter = phase(scrollProgress.experience, panelStart + item.delay, panelStart + item.delay + 0.075)
    const exit = panelEnd >= 1 ? 0 : phase(scrollProgress.experience, panelEnd - 0.04, panelEnd)

    return {
      opacity: enter * (1 - exit),
      transform: `translate3d(${(1 - enter) * item.fromX}px, ${(1 - enter) * item.fromY - exit * 90}px, 0) rotate(${(1 - enter) * item.rotate}deg) scale(${0.88 + enter * 0.12})`,
    }
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
            <nav>
              <a href="#home">Home</a>
              <a href="#about">About me</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </nav>
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
              <p className="intro-kicker from-left">Computer science student</p>
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
            <div className="experience-sticky">
              <div className="experience-title-stage" aria-hidden="true">
                {titleWordTimeline.map((word) => (
                  <span key={word.label} className="experience-title-word" style={getTitleWordStyle(word)}>
                    {word.label}
                  </span>
                ))}
              </div>

              <h2 className="experience-title-assembled" style={assembledTitleStyle}>
                <span>Work</span>
                <span>and</span>
                <span>Volunteer</span>
                <span>Experience</span>
              </h2>

              <div className="experience-showcase">
                {featuredExperiences.map((experience, index) => {
                  const start = index === 0 ? 0.72 : 0.84
                  const end = index === 0 ? 0.9 : 0.99

                  return (
                    <article
                      key={experience.id}
                      className={`experience-panel experience-panel-${experience.accent}`}
                      style={getPanelStyle(start, end)}
                    >
                      <div className="experience-media-cloud">
                        {experience.media.map((item) => (
                          <OptionalExperienceImage
                            key={`${experience.id}-${item.label}`}
                            src={item.src}
                            fallback={item.fallback}
                            alt={item.alt}
                            label={item.label}
                            className={item.className}
                            style={getMediaStyle(start, end, item)}
                          />
                        ))}
                      </div>

                      <div className="experience-copy" style={getTextStyle(start)}>
                        <p className="experience-period">{experience.period} / {experience.location}</p>
                        <div className="experience-company-row">
                          <img src={experience.logo} alt={`${experience.company} logo`} />
                          <div>
                            <h3>{experience.company}</h3>
                            <p>{experience.role}</p>
                          </div>
                        </div>
                        <p className="experience-summary">{experience.summary}</p>
                        <ul className="experience-highlights">
                          {experience.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  )
                })}

                <article className="experience-panel volunteer-panel" style={getPanelStyle(0.92, 1)}>
                  <div className="volunteer-grid" style={getTextStyle(0.9)}>
                    {volunteerExperiences.map((experience) => (
                      <div className="volunteer-card" key={experience.company}>
                        <img src={experience.logo} alt={`${experience.company} logo`} />
                        <p className="experience-period">{experience.period}</p>
                        <h3>{experience.company}</h3>
                        <h4>{experience.role}</h4>
                        <p>{experience.description}</p>
                      </div>
                    ))}
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
          </section>
        </div>
      </main>

      <footer id="contact">
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
            <a href="#home">Home</a>
            <a href="#about">About me</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
          <p>&copy; 2025 Rodrigo Anasco. All rights reserved</p>
        </div>
      </footer>
    </div>
  )
}

export default App
