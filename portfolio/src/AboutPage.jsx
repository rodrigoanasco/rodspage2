import { useEffect } from 'react'
import aboutBurnabyMountainImage from './assets/images/about_me_images/burnaby_mountain_park.JPG'
import aboutCevicheImage from './assets/images/about_me_images/ceviche.JPG'
import aboutCooperImage from './assets/images/about_me_images/studying2.jpg'
import aboutEatingSunImage from './assets/images/about_me_images/eating_the_sun.jpeg'
import aboutJiuJitsuImage from './assets/images/about_me_images/JiuJitsu.png'
import aboutLynnParkImage from './assets/images/about_me_images/lynn_park.JPG'
import aboutObjectRecognitionImage from './assets/images/about_me_images/object_recognition.JPG'
import aboutPlaneImage from './assets/images/about_me_images/plane.JPG'
import aboutSnowImage from './assets/images/about_me_images/me_in_snow.png'
import aboutVictoriaImage from './assets/images/about_me_images/me_in_victoria.jpg'
import aboutDogImage from './assets/images/about_me_images/me_with_dog.jpeg'
import aboutPeruFlag from './assets/images/about_me_images/peru_flag.png'
import aboutTableTennisImage from './assets/images/about_me_images/table_tennis.png'
import aboutTryingThingsImage from './assets/images/about_me_images/trying_new_things.JPG'
import instagramLogo from './assets/images/tech_stack/instagram 1.png'
import linkedinLogo from './assets/images/tech_stack/linkedin-original.svg'
import ThemeToggle from './ThemeToggle'
import './AboutPage.css'

function AboutPage({ onHome, onAbout, onProjects, onContact, theme, onThemeToggle }) {
  const values = [
    {
      label: 'Product-minded',
      text: 'I like building things that are clear, useful, and easy for people to understand.',
    },
    {
      label: 'Systems-driven',
      text: 'I enjoy the logic behind software: data flow, structure, performance, and clean implementation.',
    },
    {
      label: 'Curious by default',
      text: 'I move between mobile, backend, data, AI, and robotics because I like connecting ideas across domains.',
    },
  ]

  const gallery = [
    { src: aboutLynnParkImage, alt: 'Lynn Canyon park forest view', label: 'hikes' },
    { src: aboutCevicheImage, alt: 'Ceviche dish', label: 'food' },
    { src: aboutBurnabyMountainImage, alt: 'Burnaby Mountain Park view', label: 'weekend walks' },
    { src: aboutTryingThingsImage, alt: 'Trying something new', label: 'trying things' },
  ]

  const hobbies = [
    { title: 'Traveling', image: aboutPlaneImage },
    { title: 'The beach', image: aboutEatingSunImage },
    { title: 'The snow', image: aboutSnowImage },
    { title: 'Jiu-Jitsu', image: aboutJiuJitsuImage },
    { title: 'Table Tennis', image: aboutTableTennisImage },
    { title: 'My Dog', image: aboutDogImage },
  ]

  useEffect(() => {
    window.scrollTo(0, 0)

    const nodes = document.querySelectorAll('.about-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.16 },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="about-page">
      <header className="top-nav about-top-nav">
        <a className="left-logo-home about-logo-link" href="/" onClick={onHome}>Rodrigo.A</a>
        <div className="nav-actions">
          <nav>
            <a href="/" onClick={onHome}>Home</a>
            <a className="is-active" href="/about" onClick={onAbout}>About me</a>
            <a href="/projects" onClick={onProjects}>Projects</a>
            <a href="/contact" onClick={onContact}>Contact</a>
          </nav>
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </header>

      <main className="about-main">
        <section className="about-hero about-reveal">
          <div className="about-hero-copy">
            <p className="about-eyebrow">Get to know me</p>
            <h1>About me</h1>
            <p className="about-hero-text">
              I&apos;m Rodrigo, a Computer Science student at Simon Fraser University. I care about building software
              that feels practical, polished, and genuinely useful.
            </p>
            <p className="about-hero-support">
              My work usually sits somewhere between full stack development, data-driven systems, and product thinking.
              I like turning loose ideas into real interfaces and reliable systems.
            </p>
          </div>

          <div className="about-portrait-group" aria-label="Personal photos">
            <figure className="about-main-photo">
              <img
                src={aboutVictoriaImage}
                alt="Rodrigo near the waterfront in Victoria"
                decoding="async"
                fetchPriority="high"
              />
            </figure>
            <figure className="about-side-photo about-side-photo-top">
              <img src={aboutCooperImage} alt="Cooper" loading="lazy" decoding="async" />
            </figure>
            <figure className="about-side-photo about-side-photo-bottom">
              <img src={aboutObjectRecognitionImage} alt="Object recognition project preview" loading="lazy" decoding="async" />
            </figure>
          </div>
        </section>

        <section className="about-intro-grid about-reveal">
          <article>
            <span>01</span>
            <h2>Problems I like to solve</h2>
            <p>
              I enjoy applications where user experience and technical depth meet: dashboards, onboarding flows,
              automation tools, intelligent features, and systems that make complicated tasks feel lighter.
            </p>
          </article>
          <article>
            <span>02</span>
            <h2>What I am aiming for</h2>
            <p>
              I want to grow into engineering work that combines AI, data, and full stack product development,
              especially projects where thoughtful implementation can make a real difference.
            </p>
          </article>
        </section>

        <section className="about-values about-reveal">
          <div className="about-section-heading">
            <p className="about-eyebrow">How I work</p>
            <h2>A simple way to describe my taste in projects.</h2>
          </div>
          <div className="about-value-list">
            {values.map((value) => (
              <article key={value.label}>
                <h3>{value.label}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-personal about-reveal">
          <div className="about-personal-copy">
            <p className="about-eyebrow">A personal side</p>
            <h2>Peru, Canada, and finding my rhythm here.</h2>
            <p>
              I moved to Canada in the summer of 2022 and quickly fell in love with Vancouver.
              The city has this calm mix of mountains, ocean, and movement that keeps me grounded.
            </p>
            <p>
              I am from Peru, and that is still a big part of me: family, food, culture, and the way I think about
              community. I like carrying both places with me.
            </p>
            <div className="about-peru-chip">
              <img src={aboutPeruFlag} alt="Peru flag" loading="lazy" decoding="async" />
              <span>Peru</span>
            </div>
          </div>

          <div className="about-gallery">
            {gallery.map((item) => (
              <figure key={item.label}>
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                <figcaption>{item.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="about-hobbies about-reveal">
          <div className="about-section-heading">
            <p className="about-eyebrow">Outside tech</p>
            <h2>Things that keep me balanced.</h2>
          </div>
          <div className="about-hobby-strip">
            {hobbies.map((hobby) => (
              <figure key={hobby.title}>
                <img src={hobby.image} alt={hobby.title} loading="lazy" decoding="async" />
                <figcaption>{hobby.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>

      <footer className="about-footer">
        <div className="footer-inner">
          <div className="footer-socials">
            <a href="https://www.instagram.com/rodr_1201/" target="_blank" rel="noreferrer">
              <img src={instagramLogo} alt="Instagram" loading="lazy" decoding="async" />
            </a>
            <a href="https://www.linkedin.com/in/rodrigo-anasco/" target="_blank" rel="noreferrer">
              <img src={linkedinLogo} alt="LinkedIn" loading="lazy" decoding="async" />
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

export default AboutPage
