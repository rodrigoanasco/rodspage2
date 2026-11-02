import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import AboutHero from './components/about/AboutHero'
import AboutGoalsSection from './components/about/AboutGoalsSection'
import AboutValuesSection from './components/about/AboutValuesSection'
import AboutPersonalSection from './components/about/AboutPersonalSection'
import AboutHobbiesSection from './components/about/AboutHobbiesSection'
import useScrollToTop from './hooks/useScrollToTop'
import useRevealOnScroll from './hooks/useRevealOnScroll'
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
  useRevealOnScroll('.about-reveal', 0.16)

  return (
    <div className="about-page">
      <SiteHeader
        variant="about"
        activePage="about"
        navigation={navigation}
        theme={theme}
        onThemeToggle={onThemeToggle}
      />
      <main className="about-main">
        <AboutHero />
        <AboutGoalsSection />
        <AboutValuesSection />
        <AboutPersonalSection />
        <AboutHobbiesSection />
      </main>
      <SiteFooter variant="about" navigation={navigation} />
    </div>
  )
}
