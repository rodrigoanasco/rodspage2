import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import AboutIntroduction from './components/about/AboutIntroduction'
import AboutWorkNotes from './components/about/AboutWorkNotes'
import AboutPersonalSection from './components/about/AboutPersonalSection'
import AboutHobbiesSection from './components/about/AboutHobbiesSection'
import useScrollToTop from './hooks/useScrollToTop'
import './AboutPage.css'

export default function AboutPage({
  onHome,
  onAbout,
  onProjects,
  onBlog,
  onContact,
  theme,
  onThemeToggle,
}) {
  const navigation = {
    home: onHome,
    about: onAbout,
    projects: onProjects,
    blog: onBlog,
    contact: onContact,
  }
  useScrollToTop()

  return (
    <div className="about-page">
      <SiteHeader
        variant="about"
        activePage="about"
        navigation={navigation}
        theme={theme}
        onThemeToggle={onThemeToggle}
      />
      <main id="about-content" className="about-main">
        <article className="about-journal" aria-labelledby="about-title">
          <AboutIntroduction />
          <AboutWorkNotes onProjects={onProjects} />
          <AboutPersonalSection />
          <AboutHobbiesSection />
          <div className="about-signoff">
            <p>
              That&apos;s a little bit about me. If you&apos;d like to see what I&apos;ve been
              building, check out my{' '}
              <a href="/projects" onClick={onProjects}>
                projects
              </a>
              , or have a look at my{' '}
              <a href="/blog" onClick={onBlog}>
                blog
              </a>
              , where I share things I&apos;m learning and working on.
            </p>
            <p>
              And if you&apos;d like to say hi, feel free to{' '}
              <a href="/contact" onClick={onContact}>
                reach out
              </a>
              !
            </p>
          </div>
        </article>
      </main>
      <SiteFooter variant="about" navigation={navigation} />
    </div>
  )
}
