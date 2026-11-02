import { useEffect } from 'react'
import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import ProjectsHero from './components/projects/ProjectsHero'
import ProjectCard from './components/projects/ProjectCard'
import ProjectReportSection from './components/projects/ProjectReportSection'
import ResearchProject from './components/projects/ResearchProject'
import { projects } from './data/projectContent'
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
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    const frame = window.requestAnimationFrame(() => {
      const target = hash && document.getElementById(hash)
      if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' })
      else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    })
    return () => window.cancelAnimationFrame(frame)
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
        <ResearchProject />
        <section className="projects-list" aria-label="Project case studies">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </section>
        <ProjectReportSection />
      </main>
      <SiteFooter variant="projects" navigation={navigation} />
    </div>
  )
}
