import ContactSection from './components/contact/ContactSection'
import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import useScrollToTop from './hooks/useScrollToTop'
import './ContactPage.css'

export default function ContactPage({
  onHome,
  onAbout,
  onProjects,
  onBlog,
  onContact,
  theme,
  onThemeToggle,
}) {
  useScrollToTop()
  const navigation = {
    home: onHome,
    about: onAbout,
    projects: onProjects,
    blog: onBlog,
    contact: onContact,
  }

  return (
    <div className="contact-page">
      <SiteHeader
        variant="contact"
        activePage="contact"
        navigation={navigation}
        theme={theme}
        onThemeToggle={onThemeToggle}
      />
      <main className="contact-page-main">
        <ContactSection isVisible />
      </main>
      <SiteFooter variant="contact" navigation={navigation} />
    </div>
  )
}
