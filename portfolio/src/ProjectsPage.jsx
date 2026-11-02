import { useEffect } from 'react'
import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import ProjectsHero from './components/projects/ProjectsHero'
import ProjectCard from './components/projects/ProjectCard'
import ProjectReportSection from './components/projects/ProjectReportSection'
import { projects } from './data/projectContent'
import useScrollToTop from './hooks/useScrollToTop'
import useRevealOnScroll from './hooks/useRevealOnScroll'
import './ProjectsPage.css'

export default function ProjectsPage({
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
  useRevealOnScroll('.projects-reveal', 0.15)

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(hash)
        if (target) target.scrollIntoView({ block: 'start' })
      })
    }
  }, [])

  return (
    <div className="projects-page">
      <SiteHeader
        variant="projects"
        activePage="projects"
        navigation={navigation}
        theme={theme}
        onThemeToggle={onThemeToggle}
      />
      <main className="projects-main">
        <ProjectsHero />
        <section className="projects-list" aria-label="Project case studies">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </section>
        <ProjectReportSection />
      </main>
      <SiteFooter variant="projects" navigation={navigation} />
    </div>
  )
}
