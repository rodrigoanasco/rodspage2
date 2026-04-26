import { useEffect, useMemo, useState } from 'react'
import landingImage from './assets/images/landing_page_image.png'
import unifyLogo from './assets/images/Experience/unify_logo.png'
import subvisionLogo from './assets/images/Experience/subvision_logo.png'
import ficLogo from './assets/images/Experience/fic_logo.png'
import yresLogo from './assets/images/Experience/york_region_educational_services 1.png'
import arrowLeft from './assets/images/Experience/Arrow left.png'
import arrowRight from './assets/images/Experience/Arrow right.png'
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

function App() {
  const [activeExperience, setActiveExperience] = useState(0)
  const [introVisible, setIntroVisible] = useState(false)
  const [workVisible, setWorkVisible] = useState(false)
  const [stackVisible, setStackVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState({
    hero: 0,
  })

  const experiences = useMemo(
    () => [
      {
        period: 'August 2025 - Present',
        company: 'Unify Social',
        role: 'Software Coordinator',
        description:
          'Developing Unify, a React Native app supporting immigrants in Canada. Integrated Supabase for secure authentication and real-time data, built AI-driven features, and managed Agile sprints and technical documentation.',
        logo: unifyLogo,
        logoAlt: 'Unify Social logo',
      },
      {
        period: 'March 2024 - Present',
        company: 'YRES',
        role: 'Data Analytics & Web Design',
        description:
          'Assisted with data collection, cleaning, and analysis to support decision making while contributing to design and maintenance of user-friendly websites and improving overall user experience through data informed insights.',
        logo: yresLogo,
        logoAlt: 'York Region Educational Services logo',
      },
      {
        period: 'August 2023 - April 2026',
        company: 'Fraser International College',
        role: 'Peer Educator',
        description:
          'Tutored computing and math courses, created study materials, and helped students improve understanding and performance through personalized guidance and collaboration with instructors.',
        logo: ficLogo,
        logoAlt: 'Fraser International College logo',
      },
      {
        period: 'February 2019 - January 2020',
        company: 'SubVision Robotics',
        role: 'Software Developer',
        description:
          'Implemented a coverage path planning algorithm using RRT in simulation, generated waypoints for robotic movement, and visualized robot navigation through real-time 3D environments.',
        logo: subvisionLogo,
        logoAlt: 'SubVision Robotics logo',
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

  const previousExperience = () =>
    setActiveExperience((current) =>
      current === 0 ? experiences.length - 1 : current - 1,
    )
  const nextExperience = () =>
    setActiveExperience((current) =>
      current === experiences.length - 1 ? 0 : current + 1,
    )

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
              <a href="#">Home</a>
              <a href="#">About me</a>
              <a href="#">Projects</a>
              <a href="#">Contact</a>
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
            <p className="intro-line from-left">
              Computer science student
            </p>
            <p className="intro-line from-right">
              building full stack applications and
            </p>
            <p className="intro-line from-left">
              data driven systems, turning ideas
            </p>
            <p className="intro-line from-right">
              into real working solutions.
            </p>
          </section>

          <section id="experience" className={`experience-wrapper ${workVisible ? 'is-visible' : ''}`}>
            <div className="experience-card">
              <div className="green-rectangle-behind">
                <h2>Work and Volunteer Experience</h2>
              </div>
              <div key={activeExperience} className="experience-content">
                <div className="experience-text">
                  <p className="experience-period">{experiences[activeExperience].period}</p>
                  <h3 className="experience-company">{experiences[activeExperience].company}</h3>
                  <h4 className="experience-role">{experiences[activeExperience].role}</h4>
                  <p className="experience-description">
                    {experiences[activeExperience].description}
                  </p>
                </div>
                <img
                  src={experiences[activeExperience].logo}
                  alt={experiences[activeExperience].logoAlt}
                  className="experience-logo"
                />
              </div>
              <div className="experience-controls">
                <button onClick={previousExperience} aria-label="Previous experience">
                  <img src={arrowLeft} alt="" />
                </button>
                <button onClick={nextExperience} aria-label="Next experience">
                  <img src={arrowRight} alt="" />
                </button>
              </div>
            </div>
          </section>

          <section id="stack" className={`stack-section ${stackVisible ? 'is-visible' : ''}`}>
            <h2 className="stack-title">My Tech Stack</h2>
            <div id="projects" className="stack-grid">
              {techStack.map((logo, index) => (
                <img
                  key={`${logo}-${index}`}
                  src={logo}
                  alt="Technology logo"
                  style={{ transitionDelay: `${index * 12}ms` }}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer id="contact">
        <div className="footer-inner">
          <div className="footer-socials">
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <img src={instagramLogo} alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              <img src={linkedinLogo} alt="LinkedIn" />
            </a>
          </div>
          <p>© 2025 Rodrigo Anasco. All rights reserved</p>
        </div>
      </footer>
    </div>
  )
}

export default App
