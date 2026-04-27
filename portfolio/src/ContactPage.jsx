import { useEffect } from 'react'
import ContactSection from './ContactSection'
import instagramLogo from './assets/images/tech_stack/instagram 1.png'
import linkedinLogo from './assets/images/tech_stack/linkedin-original.svg'
import ThemeToggle from './ThemeToggle'
import './ContactPage.css'

function ContactPage({ onHome, onAbout, onProjects, onContact, theme, onThemeToggle }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="contact-page">
      <header className="top-nav contact-top-nav">
        <a className="left-logo-home contact-logo-link" href="/" onClick={onHome}>Rodrigo.A</a>
        <div className="nav-actions">
          <nav>
            <a href="/" onClick={onHome}>Home</a>
            <a href="/about" onClick={onAbout}>About me</a>
            <a href="/projects" onClick={onProjects}>Projects</a>
            <a className="is-active" href="/contact" onClick={onContact}>Contact</a>
          </nav>
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </header>

      <main className="contact-page-main">
        <ContactSection isVisible />
      </main>

      <footer className="contact-footer">
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

export default ContactPage
